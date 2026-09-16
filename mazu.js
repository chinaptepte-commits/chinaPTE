/**
 * chinaPTE · 妈祖祈福 — 会员注册/登录 + 祈福墙
 * 优先 Cloudflare Worker；不可用时回退本机 localStorage。
 */
(function () {
  "use strict";

  var SESSION_KEY = "chinaPTE_mazu_session";
  var USERS_KEY = "chinaPTE_mazu_users";
  var LOCAL_BLESS_KEY = "chinaPTE_mazu_local_blessings";
  var LAST_POST_KEY = "chinaPTE_mazu_last_post";

  var BANNED = [
    "代考", "替考", "作弊", "泄题", "赌球", "博彩", "色情", "约炮", "操你", "傻逼",
    "fuck", "shit", "casino", "porn", "http://", "https://", "www.",
  ];

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

  function normalizeNick(raw) {
    return String(raw || "")
      .trim()
      .replace(/\s+/g, " ")
      .slice(0, 16);
  }

  function isValidNick(nick) {
    if (!nick || nick.length < 2 || nick.length > 16) return false;
    return /^[\u4e00-\u9fff\u3400-\u4dbfa-zA-Z0-9_\-·．.]+$/.test(nick);
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

  function sha256Hex(str) {
    var enc = new TextEncoder().encode(str);
    return crypto.subtle.digest("SHA-256", enc).then(function (buf) {
      var arr = Array.from(new Uint8Array(buf));
      return arr
        .map(function (b) {
          return b.toString(16).padStart(2, "0");
        })
        .join("");
    });
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
    try {
      var raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      var s = JSON.parse(raw);
      if (!s || !s.nickname) return null;
      return s;
    } catch (e) {
      return null;
    }
  }

  function writeSession(s) {
    try {
      if (!s) localStorage.removeItem(SESSION_KEY);
      else localStorage.setItem(SESSION_KEY, JSON.stringify(s));
    } catch (e) {}
  }

  function readLocalUsers() {
    try {
      var raw = localStorage.getItem(USERS_KEY);
      if (!raw) return {};
      var o = JSON.parse(raw);
      return o && typeof o === "object" ? o : {};
    } catch (e) {
      return {};
    }
  }

  function writeLocalUsers(map) {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(map));
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

  var workerOk = null; // null unknown, true/false

  function api(path, opts) {
    var url = cfg().endpoint + path;
    var o = opts || {};
    var ctrl = typeof AbortController !== "undefined" ? new AbortController() : null;
    var timer = ctrl
      ? setTimeout(function () {
          try {
            ctrl.abort();
          } catch (e) {}
        }, 4500)
      : null;
    return fetch(url, {
      method: o.method || "GET",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: o.body ? JSON.stringify(o.body) : undefined,
      mode: "cors",
      credentials: "omit",
      cache: "no-store",
      signal: ctrl ? ctrl.signal : undefined,
    })
      .then(function (res) {
        return res.json().then(
          function (data) {
            return { ok: res.ok, status: res.status, data: data || {} };
          },
          function () {
            return { ok: res.ok, status: res.status, data: {} };
          }
        );
      })
      .finally(function () {
        if (timer) clearTimeout(timer);
      });
  }

  function probeWorker() {
    return api("/blessings", { method: "GET" })
      .then(function (r) {
        workerOk = !!(r.ok && r.data && Array.isArray(r.data.blessings));
        return workerOk;
      })
      .catch(function () {
        workerOk = false;
        return false;
      });
  }

  /* ---------- Auth ---------- */

  function registerLocal(nickname, passwordHash, note) {
    var users = readLocalUsers();
    var key = nickname.toLowerCase();
    if (users[key]) return Promise.reject(new Error("该昵称已在本机注册"));
    users[key] = {
      nickname: nickname,
      passwordHash: passwordHash,
      note: note || "",
      createdAt: new Date().toISOString(),
    };
    writeLocalUsers(users);
    return Promise.resolve({ mode: "local", nickname: nickname });
  }

  function loginLocal(nickname, passwordHash) {
    var users = readLocalUsers();
    var u = users[nickname.toLowerCase()];
    if (!u || String(u.passwordHash).toLowerCase() !== passwordHash) {
      return Promise.reject(new Error("账号或密码不正确"));
    }
    var sess = {
      nickname: u.nickname,
      token: "local-" + uuid(),
      mode: "local",
    };
    writeSession(sess);
    return Promise.resolve(sess);
  }

  function doRegister(nickname, password, note) {
    nickname = normalizeNick(nickname);
    note = String(note || "").trim().slice(0, 80);
    if (!isValidNick(nickname)) return Promise.reject(new Error("昵称需 2–16 字，可用中文/字母/数字"));
    if (String(password || "").length < cfg().minPasswordLen) {
      return Promise.reject(new Error("密码至少 " + cfg().minPasswordLen + " 位"));
    }
    if (bannedHit(nickname) || bannedHit(note)) {
      return Promise.reject(new Error("内容不合规，请换个昵称或备注"));
    }
    return sha256Hex(password).then(function (hash) {
      function afterLocal() {
        return registerLocal(nickname, hash, note).then(function () {
          return loginLocal(nickname, hash);
        });
      }
      if (workerOk === false) return afterLocal();
      return api("/register", {
        method: "POST",
        body: { nickname: nickname, passwordHash: hash, note: note },
      })
        .then(function (r) {
          if (r.ok && r.data && r.data.ok) {
            workerOk = true;
            return api("/login", {
              method: "POST",
              body: { nickname: nickname, passwordHash: hash },
            }).then(function (lr) {
              if (lr.ok && lr.data && lr.data.token) {
                var sess = {
                  nickname: lr.data.nickname || nickname,
                  token: lr.data.token,
                  mode: "remote",
                };
                writeSession(sess);
                // mirror local for offline fallback
                try {
                  registerLocal(nickname, hash, note).catch(function () {});
                } catch (e) {}
                return sess;
              }
              return Promise.reject(new Error((lr.data && lr.data.error) || "登录失败"));
            });
          }
          if (r.status === 409) return Promise.reject(new Error(r.data.error || "昵称已被注册"));
          // Worker missing / error → local
          workerOk = false;
          return afterLocal();
        })
        .catch(function (err) {
          if (err && err.message && err.message.indexOf("昵称") !== -1) throw err;
          workerOk = false;
          return afterLocal();
        });
    });
  }

  function doLogin(nickname, password) {
    nickname = normalizeNick(nickname);
    if (!isValidNick(nickname)) return Promise.reject(new Error("请输入有效昵称"));
    if (!password) return Promise.reject(new Error("请输入密码"));
    return sha256Hex(password).then(function (hash) {
      function localPath() {
        return loginLocal(nickname, hash);
      }
      if (workerOk === false) return localPath();
      return api("/login", {
        method: "POST",
        body: { nickname: nickname, passwordHash: hash },
      })
        .then(function (r) {
          if (r.ok && r.data && r.data.token) {
            workerOk = true;
            var sess = {
              nickname: r.data.nickname || nickname,
              token: r.data.token,
              mode: "remote",
            };
            writeSession(sess);
            return sess;
          }
          // try local
          return localPath().catch(function () {
            return Promise.reject(new Error((r.data && r.data.error) || "账号或密码不正确"));
          });
        })
        .catch(function () {
          workerOk = false;
          return localPath();
        });
    });
  }

  function doLogout() {
    var s = readSession();
    writeSession(null);
    if (s && s.mode === "remote" && s.token) {
      api("/logout", { method: "POST", body: { token: s.token } }).catch(function () {});
    }
    return Promise.resolve();
  }

  /* ---------- Blessings ---------- */

  function loadSeed() {
    return fetch("content/mazu-blessings.json?v=20260916r2", { cache: "no-store" })
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
        workerOk: !!workerOk,
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
          // fallback local
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

  /* ---------- UI ---------- */

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

  function renderAuth() {
    var s = readSession();
    var guest = $("mazuGuestPanel");
    var user = $("mazuUserPanel");
    var postLock = $("mazuPostLock");
    var postForm = $("mazuPostForm");
    var nameEl = $("mazuUserName");
    if (s && s.nickname) {
      if (guest) guest.hidden = true;
      if (user) user.hidden = false;
      if (postLock) postLock.hidden = true;
      if (postForm) postForm.hidden = false;
      if (nameEl) nameEl.textContent = s.nickname + (s.mode === "local" ? " · 本机" : "");
    } else {
      if (guest) guest.hidden = false;
      if (user) user.hidden = true;
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
    if (meta) {
      meta.textContent =
        "共 " +
        blessings.length +
        " 条" +
        (state && state.workerOk ? " · 含共享墙" : " · 当前以本机/示例为主");
    }
    if (hint) {
      if (state && state.workerOk) {
        hint.hidden = true;
      } else {
        hint.hidden = false;
      }
    }
    if (!blessings.length) {
      list.innerHTML = '<li class="mazu-empty">墙上一时还空着，登录后留下你的第一句祈福吧。</li>';
      return;
    }
    list.innerHTML = blessings
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

  function setAuthTab(tab) {
    var loginForm = $("mazuLoginForm");
    var regForm = $("mazuRegisterForm");
    var tabLogin = $("mazuTabLogin");
    var tabReg = $("mazuTabRegister");
    var isLogin = tab !== "register";
    if (loginForm) loginForm.hidden = !isLogin;
    if (regForm) regForm.hidden = isLogin;
    if (tabLogin) {
      tabLogin.classList.toggle("is-active", isLogin);
      tabLogin.setAttribute("aria-selected", isLogin ? "true" : "false");
    }
    if (tabReg) {
      tabReg.classList.toggle("is-active", !isLogin);
      tabReg.setAttribute("aria-selected", !isLogin ? "true" : "false");
    }
  }

  function refresh() {
    renderAuth();
    return loadWall().then(function (state) {
      renderWall(state);
      return state;
    });
  }

  function bind() {
    var tabLogin = $("mazuTabLogin");
    var tabReg = $("mazuTabRegister");
    if (tabLogin) tabLogin.addEventListener("click", function () { setAuthTab("login"); });
    if (tabReg) tabReg.addEventListener("click", function () { setAuthTab("register"); });

    var loginForm = $("mazuLoginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var nick = ($("mazuLoginNick") || {}).value;
        var pass = ($("mazuLoginPass") || {}).value;
        doLogin(nick, pass)
          .then(function () {
            toast("登录成功");
            loginForm.reset();
            return refresh();
          })
          .catch(function (err) {
            toast((err && err.message) || "登录失败");
          });
      });
    }

    var regForm = $("mazuRegisterForm");
    if (regForm) {
      regForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var nick = ($("mazuRegNick") || {}).value;
        var pass = ($("mazuRegPass") || {}).value;
        var note = ($("mazuRegNote") || {}).value;
        doRegister(nick, pass, note)
          .then(function () {
            toast("注册并已登录");
            regForm.reset();
            return refresh();
          })
          .catch(function (err) {
            toast((err && err.message) || "注册失败");
          });
      });
    }

    var btnLogout = $("mazuLogout");
    if (btnLogout) {
      btnLogout.addEventListener("click", function () {
        doLogout().then(function () {
          toast("已退出");
          refresh();
        });
      });
    }

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
        var text = textArea ? textArea.value : "";
        postBlessing(text)
          .then(function (b) {
            if (textArea) textArea.value = "";
            updateCount();
            toast((b && b._hint) || "祈福已送出");
            return refresh();
          })
          .catch(function (err) {
            toast((err && err.message) || "发送失败");
          });
      });
    }

    document.querySelectorAll("[data-mazu-goto]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        var t = el.getAttribute("data-mazu-goto");
        setAuthTab(t === "register" ? "register" : "login");
        var box = $("mazuAuthCard");
        if (box) box.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  function init() {
    bind();
    setAuthTab("login");
    refresh();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
