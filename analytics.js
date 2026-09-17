/**
 * chinaPTE · lightweight anonymous analytics collector
 * Events buffered locally; POST to Worker / webhook when available.
 */
(function (global) {
  "use strict";

  var SESSION_KEY = "chinaPTE_analytics_sid";
  var BUFFER_KEY = "chinaPTE_analytics_buf";
  var MAX_BUFFER = 400;
  var HEARTBEAT_MS = 25000;
  var FLUSH_MS = 12000;
  var DEFAULT_ENDPOINT = "https://chinapte.net/api/analytics";

  function uuid() {
    if (global.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      var v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function getSessionId() {
    try {
      var sid = localStorage.getItem(SESSION_KEY);
      if (sid) return sid;
      sid = uuid();
      localStorage.setItem(SESSION_KEY, sid);
      return sid;
    } catch (e) {
      return uuid();
    }
  }

  function cfg() {
    var c = global.CHINAPTE_ANALYTICS || {};
    return {
      endpoint: c.endpoint || DEFAULT_ENDPOINT,
      webhook: c.webhook || global.CHINAPTE_ANALYTICS_WEBHOOK || "",
      ga4: c.ga4MeasurementId || global.CHINAPTE_GA4_ID || "",
      enabled: c.enabled !== false,
    };
  }

  function readBuffer() {
    try {
      var raw = localStorage.getItem(BUFFER_KEY);
      if (!raw) return [];
      var arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function writeBuffer(arr) {
    try {
      if (arr.length > MAX_BUFFER) arr = arr.slice(arr.length - MAX_BUFFER);
      localStorage.setItem(BUFFER_KEY, JSON.stringify(arr));
    } catch (e) {}
  }

  var sessionId = getSessionId();
  var pageEnteredAt = Date.now();
  var lastHeartbeat = pageEnteredAt;
  var path = (location.pathname || "/") + (location.search || "");

  function baseProps() {
    var props = {
      sessionId: sessionId,
      path: path,
      referrer: document.referrer || "",
      screenWidth: (screen && screen.width) || (window.innerWidth || 0),
      ts: new Date().toISOString(),
      href: location.href || "",
    };
    try {
      if (global.ChinaPTEUtm && typeof global.ChinaPTEUtm.attributionProps === "function") {
        var utm = global.ChinaPTEUtm.attributionProps();
        if (utm) Object.assign(props, utm);
      }
    } catch (e) {}
    return props;
  }

  function track(type, props) {
    if (!cfg().enabled) return;
    var ev = Object.assign(baseProps(), props || {}, { type: type || "event" });
    var buf = readBuffer();
    buf.push(ev);
    writeBuffer(buf);
    // Also mirror into session buffer for admin live view
    try {
      var live = JSON.parse(sessionStorage.getItem("chinaPTE_analytics_live") || "[]");
      if (!Array.isArray(live)) live = [];
      live.push(ev);
      if (live.length > 200) live = live.slice(live.length - 200);
      sessionStorage.setItem("chinaPTE_analytics_live", JSON.stringify(live));
    } catch (e) {}
    sendGa4(ev);
    return ev;
  }

  function sendGa4(ev) {
    var id = cfg().ga4;
    if (!id || typeof global.gtag !== "function") return;
    try {
      global.gtag("event", ev.type, {
        event_category: "chinapte",
        event_label: ev.feature || ev.path || "",
        play_mode: ev.playMode || "",
        page_path: ev.path,
      });
    } catch (e) {}
  }

  function ensureGa4() {
    var id = cfg().ga4;
    if (!id || global.__chinaPTEGa4) return;
    global.__chinaPTEGa4 = true;
    global.dataLayer = global.dataLayer || [];
    global.gtag =
      global.gtag ||
      function () {
        global.dataLayer.push(arguments);
      };
    global.gtag("js", new Date());
    global.gtag("config", id, { anonymize_ip: true });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(s);
  }

  function postJson(url, body) {
    if (!url) return Promise.resolve({ ok: false, reason: "no-url" });
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
      mode: "cors",
    })
      .then(function (r) {
        return { ok: r.ok, status: r.status };
      })
      .catch(function (err) {
        return { ok: false, error: String(err && err.message ? err.message : err) };
      });
  }

  function flush() {
    var conf = cfg();
    var buf = readBuffer();
    if (!buf.length) return Promise.resolve({ ok: true, empty: true });
    var payload = { events: buf.slice(), sentAt: new Date().toISOString() };
    var targets = [];
    if (conf.endpoint) targets.push(conf.endpoint);
    if (conf.webhook && conf.webhook !== conf.endpoint) targets.push(conf.webhook);

    if (!targets.length) return Promise.resolve({ ok: false, reason: "no-endpoint" });

    return Promise.all(
      targets.map(function (url) {
        return postJson(url, payload);
      })
    ).then(function (results) {
      var anyOk = results.some(function (r) {
        return r && r.ok;
      });
      if (anyOk) {
        // drop flushed events (best-effort; if partial fail we still clear to avoid infinite growth)
        writeBuffer([]);
      }
      return { ok: anyOk, results: results };
    });
  }

  function dwellMs() {
    return Math.max(0, Date.now() - pageEnteredAt);
  }

  function onLeave() {
    track("page_leave", { dwellMs: dwellMs() });
    flush();
  }

  function heartbeat() {
    var now = Date.now();
    track("page_heartbeat", {
      dwellMs: dwellMs(),
      sinceLastMs: now - lastHeartbeat,
    });
    lastHeartbeat = now;
    flush();
  }

  function bindNavClicks() {
    document.addEventListener(
      "click",
      function (e) {
        var a = e.target && e.target.closest ? e.target.closest("a") : null;
        if (!a || !a.href) return;
        var href = a.getAttribute("href") || "";
        track("nav_click", {
          href: href,
          text: (a.textContent || "").trim().slice(0, 80),
        });
      },
      true
    );
  }

  function init() {
    if (global.__chinaPTEAnalyticsInit) return;
    global.__chinaPTEAnalyticsInit = true;
    ensureGa4();
    track("page_view", {});
    bindNavClicks();
    setInterval(heartbeat, HEARTBEAT_MS);
    setInterval(flush, FLUSH_MS);
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden") onLeave();
    });
    global.addEventListener("pagehide", onLeave);
    // first flush attempt shortly after load
    setTimeout(flush, 3000);
  }

  function getLocalSummary() {
    var buf = readBuffer();
    var live = [];
    try {
      live = JSON.parse(sessionStorage.getItem("chinaPTE_analytics_live") || "[]");
    } catch (e) {}
    var all = buf.concat(live);
    var sessions = {};
    var pages = {};
    var features = {};
    var playModes = { prompt: 0, walkman: 0 };
    var dwell = [];
    all.forEach(function (ev) {
      if (!ev) return;
      if (ev.sessionId) sessions[ev.sessionId] = true;
      if (ev.path) pages[ev.path] = (pages[ev.path] || 0) + (ev.type === "page_view" ? 1 : 0);
      if (ev.type === "feature_use" && ev.feature) {
        features[ev.feature] = (features[ev.feature] || 0) + 1;
      }
      if (ev.type === "play_start" || (ev.feature === "play_mode" && ev.playMode)) {
        var pm = ev.playMode;
        if (pm === "prompt" || pm === "walkman") playModes[pm] += 1;
      }
      if (ev.type === "page_leave" && typeof ev.dwellMs === "number") dwell.push(ev.dwellMs);
    });
    var avgDwell = dwell.length
      ? Math.round(dwell.reduce(function (a, b) { return a + b; }, 0) / dwell.length)
      : 0;
    return {
      source: "local",
      pv: all.filter(function (e) { return e && e.type === "page_view"; }).length,
      uv: Object.keys(sessions).length,
      avgDwellMs: avgDwell,
      topPages: pages,
      topFeatures: features,
      playModes: playModes,
      eventCount: all.length,
      events: all,
    };
  }

  global.ChinaPTEAnalytics = {
    track: track,
    flush: flush,
    getSessionId: getSessionId,
    getLocalSummary: getLocalSummary,
    readBuffer: readBuffer,
    init: init,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(typeof window !== "undefined" ? window : globalThis);
