/**
 * chinaPTE · lightweight UTM helper
 * Captures first-touch UTM from URL into localStorage; last-touch into session.
 * Feeds attribution into ChinaPTEAnalytics when present.
 * Links: https://chinapte.net/?utm_source=xiaohongshu&utm_medium=social&utm_campaign=<slug>
 */
(function (global) {
  "use strict";

  var FIRST_KEY = "chinaPTE_utm_first";
  var LAST_KEY = "chinaPTE_utm_last";
  var SITE_ORIGIN = "https://chinapte.net";
  var UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

  function safeParse(raw) {
    try {
      var o = JSON.parse(raw);
      return o && typeof o === "object" ? o : null;
    } catch (e) {
      return null;
    }
  }

  function readStore(storage, key) {
    try {
      return safeParse(storage.getItem(key));
    } catch (e) {
      return null;
    }
  }

  function writeStore(storage, key, val) {
    try {
      storage.setItem(key, JSON.stringify(val));
      return true;
    } catch (e) {
      return false;
    }
  }

  function parseFromSearch(search) {
    var q = search || "";
    if (q.charAt(0) === "?") q = q.slice(1);
    if (!q) return null;
    var params;
    try {
      params = new URLSearchParams(q);
    } catch (e) {
      return null;
    }
    var out = {};
    var any = false;
    UTM_KEYS.forEach(function (k) {
      var v = params.get(k);
      if (v) {
        out[k] = String(v).slice(0, 120);
        any = true;
      }
    });
    if (!any) return null;
    out.capturedAt = new Date().toISOString();
    out.landingPath = (location.pathname || "/") + (location.search || "");
    return out;
  }

  function capture() {
    var fromUrl = parseFromSearch(location.search || "");
    if (fromUrl) {
      writeStore(sessionStorage, LAST_KEY, fromUrl);
      var existing = readStore(localStorage, FIRST_KEY);
      if (!existing) {
        writeStore(localStorage, FIRST_KEY, fromUrl);
      }
    }
    return {
      first: getFirst(),
      last: getLast(),
    };
  }

  function getFirst() {
    return readStore(localStorage, FIRST_KEY);
  }

  function getLast() {
    return readStore(sessionStorage, LAST_KEY) || getFirst();
  }

  function attributionProps() {
    var first = getFirst();
    var last = getLast();
    var props = {};
    if (first) {
      props.utm_first_source = first.utm_source || "";
      props.utm_first_medium = first.utm_medium || "";
      props.utm_first_campaign = first.utm_campaign || "";
      props.utm_first_content = first.utm_content || "";
      props.utm_first_term = first.utm_term || "";
      props.utm_first_at = first.capturedAt || "";
    }
    if (last) {
      props.utm_source = last.utm_source || "";
      props.utm_medium = last.utm_medium || "";
      props.utm_campaign = last.utm_campaign || "";
      props.utm_content = last.utm_content || "";
      props.utm_term = last.utm_term || "";
    }
    return props;
  }

  /**
   * Build a tracked chinapte.net URL.
   * @param {string} [path] pathname e.g. "/" or "/practice.html"
   * @param {object} [opts] { campaign, source, medium, content, term }
   */
  function buildUrl(path, opts) {
    opts = opts || {};
    var p = path == null || path === "" ? "/" : String(path);
    if (p.charAt(0) !== "/") p = "/" + p;
    var u;
    try {
      u = new URL(p, SITE_ORIGIN);
    } catch (e) {
      u = new URL(SITE_ORIGIN + "/");
    }
    u.searchParams.set("utm_source", opts.source || "xiaohongshu");
    u.searchParams.set("utm_medium", opts.medium || "social");
    if (opts.campaign) u.searchParams.set("utm_campaign", String(opts.campaign).slice(0, 80));
    if (opts.content) u.searchParams.set("utm_content", String(opts.content).slice(0, 80));
    if (opts.term) u.searchParams.set("utm_term", String(opts.term).slice(0, 80));
    return u.toString();
  }

  function xhsDefaults(pageKey) {
    var map = {
      home: { path: "/", campaign: "xhs-home-share" },
      practice: { path: "/practice.html", campaign: "xhs-practice-share" },
      mazu: { path: "/mazu.html", campaign: "xhs-mazu-share" },
      wfd: { path: "/wfd.html", campaign: "xhs-wfd-tip" },
      bank: { path: "/bank.html", campaign: "xhs-free-bank" },
      industry: { path: "/industry.html", campaign: "xhs-industry-en" },
    };
    return map[pageKey] || map.home;
  }

  global.ChinaPTEUtm = {
    capture: capture,
    getFirst: getFirst,
    getLast: getLast,
    attributionProps: attributionProps,
    buildUrl: buildUrl,
    xhsDefaults: xhsDefaults,
    SITE_ORIGIN: SITE_ORIGIN,
  };

  capture();
})(typeof window !== "undefined" ? window : globalThis);
