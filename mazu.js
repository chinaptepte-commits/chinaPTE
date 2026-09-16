/**
 * chinaPTE · 妈祖祈福 — 祈福墙
 * 会员登录/注册走全局 ChinaPTEAuth 弹窗；本页不再内嵌登录注册区。
 * 会话键与 Worker 对齐：chinaPTE_mazu_session
 */
(function () {
  "use strict";

  var LOCAL_BLESS_KEY = "chinaPTE_mazu_local_blessings";
  var LAST_POST_KEY = "chinaPTE_mazu_last_post";

  var BANNED = [
    "代考", "替考", "作弊", "泄题", "赌球", "博彩", "色情", "约炮", "操你", "傻逼",
    "fuck", "shit", "casino", "porn", "http://", "https://", "www.",
  ];

  function auth() {
    return window.ChinaPTEAuth || null;
  }

  function cfg() {
    var c = window.CHINAPTE_MAZU || {};
    return {
      endpoint: (c.endpoint || "https://chinapte.net/api/mazu").replace(/\/$/, ""),
      maxTextLen: c.maxTextLen || 160,
      rateLimitMs: c.rateLimitMs || 3600000,
      minPasswordLen: c.minPasswordLen || 6,
    };
  }

  function $(id) {
    return document.getElementById(id);
  }

  function toast(msg) {
    var el = $("mazuToast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("is-show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () {
      el.classList.remove("is-show");
    }, 2400);
  }

  function bannedHit(text) {
    var lower = String(text || "").toLowerCase();
    for (var i = 0; i < BANNED.length; i++) {
      if (lower.indexOf(BANNED[i].toLowerCase()) !== -1) return true;
    }
    if (/(.)\1{8,}/.test(text)) return true;
    return false;
  }

  function spammy(text) {
    var t = String(text || "").trim();
    if (t.length < 2) return true;
    var compact = t.replace(/\s/g, "");
    var uniq = {};
    for (var i = 0; i < compact.length; i++) uniq[compact.charAt(i)] = 1;
    if (compact.length >= 8 && Object.keys(uniq).length <= 2) return true;
    return false;
  }

  function uuid() {
    if (crypto.randomUUID) return crypto.randomUUID();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      var v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function readSession() {
    var a = auth();
    if (a && a.getSession) return a.getSession();
    try {
      var raw = localStorage.getItem("chinaPTE_mazu_session");
      if (!raw) return null;
      var s = JSON.parse(raw);
      if (!s || !s.nickname) return null;
      return s;
    } catch (e) {
      return null;
    }
  }

  function writeSession(s) {
    var a = auth();
    if (a && a.writeSession) {
      a.writeSession(s);
      return;
    }
    try {
      if (!s) localStorage.removeItem("chinaPTE_mazu_session");
      else localStorage.setItem("chinaPTE_mazu_session", JSON.stringify(s));
    } catch (e) {}
  }

  function readLocalBlessings() {
    try {
      var raw = localStorage.getItem(LOCAL_BLESS_KEY);
      if (!raw) return [];
      var arr = JSON.parse(raw);
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }

  function writeLocalBlessings(arr) {
    try {
      if (arr.length > 100) arr = arr.slice(0, 100);
      localStorage.setItem(LOCAL_BLESS_KEY, JSON.stringify(arr));
    } catch (e) {}
  }

  function getLastPostMap() {
    try {
      return JSON.parse(localStorage.getItem(LAST_POST_KEY) || "{}") || {};
    } catch (e) {
      return {};
    }
  }

  function setLastPost(nick) {
    var m = getLastPostMap();
    m[nick.toLowerCase()] = Date.now();
    try {
      localStorage.setItem(LAST_POST_KEY, JSON.stringify(m));
    } catch (e) {}
  }

  function clientRateOk(nick) {
    var m = getLastPostMap();
    var t = m[nick.toLowerCase()];
    if (!t) return { ok: true };
    var left = cfg().rateLimitMs - (Date.now() - t);
    if (left <= 0) return { ok: true };
    return { ok: false, waitMin: Math.ceil(left / 60000) };
  }

  function api(path, opts) {
    var a = auth();
    if (a && a.api) return a.api(path, opts);
    var url = cfg().endpoint + path;
    var o = opts || {};
    return fetch(url, {
      method: o.method || "GET",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: o.body ? JSON.stringify(o.body) : undefined,
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
    }).then(function (res) {
      return res.json().then(
        function (data) {
          return { ok: res.ok, status: res.status, data: data || {} };
        },
        function () {
          return { ok: res.ok, status: res.status, data: {} };
        }
      );
    });
  }

  function getWorkerOk() {
    var a = auth();
    if (a && typeof a.getWorkerOk === "function") return a.getWorkerOk();
    return null;
  }

  function setWorkerOk(v) {
    var a = auth();
    if (a && typeof a.setWorkerOk === "function") a.setWorkerOk(v);
  }

  function probeWorker() {
    var a = auth();
    if (a && a.probeWorker) return a.probeWorker();
    return api("/blessings", { method: "GET" })
      .then(function (r) {
        var ok = !!(r.ok && r.data && Array.isArray(r.data.blessings));
        setWorkerOk(ok);
        return ok;
      })
      .catch(function () {
        setWorkerOk(false);
        return false;
      });
  }

  function loadSeed() {
    return fetch("content/mazu-blessings.json?v=20260916r4", { cache: "no-store" })
      .then(function (r) {
        return r.ok ? r.json() : { blessings: [] };
      })
      .then(function (data) {
        return Array.isArray(data.blessings) ? data.blessings : [];
      })
      .catch(function () {
        return [];
      });
  }

  function mergeWall(shared, local, seed) {
    var map = {};
    function add(list) {
      (list || []).forEach(function (b) {
        if (!b || !b.id) return;
        map[b.id] = b;
      });
    }
    add(seed);
    add(local);
    add(shared);
    var arr = Object.keys(map).map(function (k) {
      return map[k];
    });
    arr.sort(function (a, b) {
      return String(b.createdAt || "").localeCompare(String(a.createdAt || ""));
    });
    return arr;
  }

  function loadWall() {
    var local = readLocalBlessings();
    return Promise.all([
      probeWorker().then(function (ok) {
        if (!ok) return [];
        return api("/blessings", { method: "GET" }).then(function (r) {
          if (r.ok && r.data && Array.isArray(r.data.blessings)) return r.data.blessings;
          return [];
        });
      }),
      loadSeed(),
    ]).then(function (pair) {
      return {
        blessings: mergeWall(pair[0], local, pair[1]),
        sharedCount: (pair[0] || []).length,
        localCount: local.length,
        workerOk: !!getWorkerOk(),
      };
    });
  }

  function postBlessing(text) {
    var s = readSession();
    if (!s || !s.nickname) return Promise.reject(new Error("请先登录后再祈福"));
    text = String(text || "").trim().slice(0, cfg().maxTextLen);
    if (spammy(text) || bannedHit(text)) {
      return Promise.reject(new Error("留言内容不合规或过于空泛，请修改后再试"));
    }
    var rate = clientRateOk(s.nickname);
    if (!rate.ok) {
      return Promise.reject(new Error("祈福过于频繁，请约 " + rate.waitMin + " 分钟后再试"));
    }

    function saveLocal() {
      var b = {
        id: "local-" + uuid(),
        nickname: s.nickname,
        text: text,
        createdAt: new Date().toISOString(),
        source: "local",
      };
      var arr = readLocalBlessings();
      arr.unshift(b);
      writeLocalBlessings(arr);
      setLastPost(s.nickname);
      return b;
    }

    var workerOk = getWorkerOk();
    if (s.mode === "remote" && s.token && workerOk !== false) {
      return api("/blessings", {
        method: "POST",
        body: { token: s.token, text: text },
      })
        .then(function (r) {
          if (r.ok && r.data && r.data.blessing) {
            setLastPost(s.nickname);
            return r.data.blessing;
          }
          if (r.status === 401) {
            writeSession(null);
            return Promise.reject(new Error("登录已失效，请重新登录"));
          }
          if (r.status === 429) {
            return Promise.reject(new Error((r.data && r.data.error) || "祈福过于频繁"));
          }
          var b = saveLocal();
          b._hint = (r.data && r.data.error) || "共享墙暂不可用，已存为本机留言";
          return b;
        })
        .catch(function (err) {
          if (err && err.message && /登录|频繁|不合规/.test(err.message)) throw err;
          var b = saveLocal();
          b._hint = "共享墙暂不可用，已存为本机留言";
          return b;
        });
    }

    return Promise.resolve(saveLocal());
  }

  function formatTime(iso) {
    if (!iso) return "";
    try {
      var d = new Date(iso);
      if (isNaN(d.getTime())) return String(iso).slice(0, 16);
      var y = d.getFullYear();
      var m = String(d.getMonth() + 1).padStart(2, "0");
      var day = String(d.getDate()).padStart(2, "0");
      var h = String(d.getHours()).padStart(2, "0");
      var mi = String(d.getMinutes()).padStart(2, "0");
      return y + "-" + m + "-" + day + " " + h + ":" + mi;
    } catch (e) {
      return "";
    }
  }

  function sourceLabel(b) {
    if (!b) return "";
    if (b.source === "local") return "本机留言";
    if (b.source === "seed") return "示例";
    if (b.source === "shared" || b.source === "worker") return "祈福墙";
    if (String(b.id || "").indexOf("local-") === 0) return "本机留言";
    if (String(b.id || "").indexOf("seed-") === 0) return "示例";
    return "祈福墙";
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* —— Shrine stage FX: under-portrait chips + wave-band danmaku —— */
  var WALL_COMPACT_MAX = 12;
  var DANMAKU_LANES = 6;
  var chipLayer = null;
  var danmakuLayer = null;
  var feedPool = [];
  var feedIdx = 0;
  var danmakuTimer = null;
  var laneBusyUntil = [0, 0, 0, 0];
  var reduceMotion = false;

  try {
    reduceMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  } catch (e) {}

  function truncateChip(text, max) {
    var t = String(text || "").replace(/\s+/g, " ").trim();
    max = max || 28;
    if (t.length <= max) return t;
    return t.slice(0, max - 1) + "…";
  }

  function ensureStageEls() {
    chipLayer = $("mazuChipLayer");
    danmakuLayer = $("mazuDanmakuLayer");
  }

  function setFeed(blessings) {
    feedPool = (blessings || []).filter(function (b) {
      return b && b.text;
    });
    if (feedIdx >= feedPool.length) feedIdx = 0;
  }

  function nextFeedItem() {
    if (!feedPool.length) return null;
    var b = feedPool[feedIdx % feedPool.length];
    feedIdx = (feedIdx + 1) % feedPool.length;
    return b;
  }

  function spawnChip(text, opts) {
    ensureStageEls();
    if (!chipLayer || !text) return;
    opts = opts || {};
    var el = document.createElement("span");
    el.className = "mazu-chip" + (opts.fresh ? " is-fresh" : "");
    el.textContent = truncateChip(text, opts.fresh ? 36 : 28);
    var left = 4 + Math.random() * 70;
    var top = 8 + Math.random() * 70;
    el.style.left = left + "%";
    el.style.top = top + "%";
    chipLayer.appendChild(el);
    var life = reduceMotion ? 3200 : 4800;
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, life + 80);
  }

  function pickLane() {
    var now = Date.now();
    var best = 0;
    var bestT = Infinity;
    for (var i = 0; i < DANMAKU_LANES; i++) {
      var t = laneBusyUntil[i] || 0;
      if (t <= now) return i;
      if (t < bestT) {
        bestT = t;
        best = i;
      }
    }
    return best;
  }

  function spawnDanmaku(text, opts) {
    ensureStageEls();
    if (!danmakuLayer || !text) return;
    opts = opts || {};
    var el = document.createElement("span");
    el.className = "mazu-danmaku" + (opts.fresh ? " is-fresh" : "");
    el.textContent = truncateChip(text, opts.fresh ? 40 : 32);
    var lane = typeof opts.lane === "number" ? opts.lane : pickLane();
    var laneH = 100 / DANMAKU_LANES;
    var topPct = lane * laneH + laneH * 0.18;
    el.style.top = topPct + "%";
    var dur = opts.fresh ? 9 + Math.random() * 3 : 11 + Math.random() * 6;
    if (reduceMotion) {
      el.style.left = 6 + Math.random() * 40 + "%";
      el.style.opacity = "0.9";
      danmakuLayer.appendChild(el);
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 2800);
      return;
    }
    danmakuLayer.appendChild(el);
    var travel = (danmakuLayer.clientWidth || 320) + (el.offsetWidth || 120) + 48;
    el.style.setProperty("--mazu-travel", travel + "px");
    el.style.animationDuration = dur + "s";
    laneBusyUntil[lane] = Date.now() + Math.min(2800, dur * 220);
    el.addEventListener("animationend", function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
  }

  function celebrateBlessing(b) {
    if (!b || !b.text) return;
    spawnChip(b.text, { fresh: true });
    spawnDanmaku(b.text, { fresh: true });
  }

  function pulseAmbient() {
    var b = nextFeedItem();
    if (!b) return;
    if (Math.random() < 0.45) spawnChip(b.text, { fresh: false });
    spawnDanmaku(b.text, { fresh: false });
  }

  function startAmbientLoop() {
    if (danmakuTimer) clearInterval(danmakuTimer);
    // Seed a few immediately
    var n = Math.min(3, feedPool.length || 0);
    for (var i = 0; i < n; i++) {
      (function (delay) {
        setTimeout(function () {
          var b = nextFeedItem();
          if (b) spawnDanmaku(b.text, { fresh: false });
        }, delay);
      })(i * 700);
    }
    if (feedPool.length && Math.random() < 0.7) {
      var c = nextFeedItem();
      if (c) spawnChip(c.text, { fresh: false });
    }
    danmakuTimer = setInterval(function () {
      if (document.hidden) return;
      pulseAmbient();
    }, reduceMotion ? 4200 : 2600);
  }

  function ensureVideoPlay() {
    var v = $("mazuVideo");
    if (!v) return;
    try {
      v.muted = true;
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    } catch (e) {}
  }

  function renderAuth() {
    var s = readSession();
    var postLock = $("mazuPostLock");
    var postForm = $("mazuPostForm");
    if (s && s.nickname) {
      if (postLock) postLock.hidden = true;
      if (postForm) postForm.hidden = false;
    } else {
      if (postLock) postLock.hidden = false;
      if (postForm) postForm.hidden = true;
    }
  }

  function renderWall(state) {
    var list = $("mazuWall");
    var meta = $("mazuWallMeta");
    var hint = $("mazuWorkerHint");
    if (!list) return;
    var blessings = (state && state.blessings) || [];
    setFeed(blessings);
    if (meta) {
      meta.textContent =
        "共 " +
        blessings.length +
        " 条" +
        (state && state.workerOk ? " · 含共享墙" : " · 本机/示例") +
        " · 神龛海浪弹幕同步";
    }
    if (hint) {
      hint.hidden = !!(state && state.workerOk);
    }
    if (!blessings.length) {
      list.innerHTML = '<li class="mazu-empty">神龛上一时还安静，登录后留下你的第一句祈福吧。</li>';
      return;
    }
    var shown = blessings.slice(0, WALL_COMPACT_MAX);
    list.innerHTML = shown
      .map(function (b) {
        var tag = sourceLabel(b);
        return (
          '<li class="mazu-blessing">' +
          '<div class="mazu-blessing-head">' +
          '<span class="mazu-blessing-name">' +
          escapeHtml(b.nickname) +
          "</span>" +
          '<span class="mazu-blessing-time">' +
          escapeHtml(formatTime(b.createdAt)) +
          "</span>" +
          (tag
            ? '<span class="mazu-blessing-tag">' + escapeHtml(tag) + "</span>"
            : "") +
          "</div>" +
          '<p class="mazu-blessing-text">' +
          escapeHtml(b.text) +
          "</p>" +
          "</li>"
        );
      })
      .join("");
  }

  function refresh(opts) {
    opts = opts || {};
    renderAuth();
    return loadWall().then(function (state) {
      renderWall(state);
      if (opts.restartAmbient !== false) startAmbientLoop();
      return state;
    });
  }

  function openAuthModal(tab) {
    var a = auth();
    if (a && a.openModal) {
      a.openModal({
        tab: tab || "login",
        onSuccess: function () {
          toast("登录成功");
          refresh();
        },
      });
      return;
    }
    toast("请稍候，登录组件加载中…");
  }

  function bind() {
    document.querySelectorAll("[data-mazu-goto]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        var t = el.getAttribute("data-mazu-goto");
        openAuthModal(t === "register" ? "register" : "login");
      });
    });

    var postForm = $("mazuPostForm");
    var textArea = $("mazuPostText");
    var counter = $("mazuCharCount");
    function updateCount() {
      if (!textArea || !counter) return;
      var n = (textArea.value || "").length;
      counter.textContent = n + " / " + cfg().maxTextLen;
    }
    if (textArea) {
      textArea.setAttribute("maxlength", String(cfg().maxTextLen));
      textArea.addEventListener("input", updateCount);
      updateCount();
    }
    if (postForm) {
      postForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var s = readSession();
        if (!s || !s.nickname) {
          openAuthModal("login");
          return;
        }
        var text = textArea ? textArea.value : "";
        postBlessing(text)
          .then(function (b) {
            if (textArea) textArea.value = "";
            updateCount();
            toast((b && b._hint) || "祈福已送出");
            celebrateBlessing(b);
            return refresh({ restartAmbient: true });
          })
          .catch(function (err) {
            var msg = (err && err.message) || "发送失败";
            toast(msg);
            if (/登录/.test(msg)) openAuthModal("login");
          });
      });
    }

    document.addEventListener("chinapte:auth", function () {
      refresh();
    });
  }

  function waitAuthThen(fn) {
    if (auth()) {
      fn();
      return;
    }
    var n = 0;
    var t = setInterval(function () {
      n++;
      if (auth() || n > 40) {
        clearInterval(t);
        fn();
      }
    }, 50);
  }

  function init() {
    ensureStageEls();
    ensureVideoPlay();
    bind();
    waitAuthThen(function () {
      refresh();
    });
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) ensureVideoPlay();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
