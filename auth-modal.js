/**
 * chinaPTE · site-wide member auth modal
 * Reuses mazu session keys (chinaPTE_mazu_session / chinaPTE_mazu_users)
 * so Worker tokens stay valid. Zero-cost; Worker optional with local fallback.
 */
(function () {
  "use strict";

  var SESSION_KEY = "chinaPTE_mazu_session";
  var USERS_KEY = "chinaPTE_mazu_users";
  var ASSET_VER = "20260916r3";

  var BANNED = [
    "代考", "替考", "作弊", "泄题", "赌球", "博彩", "色情", "约炮", "操你", "傻逼",
    "fuck", "shit", "casino", "porn", "http://", "https://", "www.",
  ];

  var PUBLIC_FILES = {
    "index.html": 1,
    "": 1,
    "labor.html": 1,
    "consult.html": 1,
    "mazu.html": 1,
    "404.html": 1,
  };

  var workerOk = null;
  var pendingAction = null;
  var modalReady = false;
  var cssReady = false;

  function cfg() {
    var c = window.CHINAPTE_MAZU || {};
    return {
      endpoint: (c.endpoint || "https://chinapte.net/api/mazu").replace(/\/$/, ""),
      minPasswordLen: c.minPasswordLen || 6,
    };
  }

  function $(id) {
    return document.getElementById(id);
  }

  function fileName() {
    var p = (location.pathname || "").split("/").pop() || "index.html";
    try {
      p = decodeURIComponent(p);
    } catch (e) {}
    return p || "index.html";
  }

  function isHomepage() {
    var f = fileName();
    return f === "index.html" || f === "";
  }

  function isPublicFile(name) {
    if (!name) return true;
    name = String(name).split("?")[0].split("#")[0];
    try {
      name = decodeURIComponent(name);
    } catch (e) {}
    name = name.split("/").pop() || name;
    return !!PUBLIC_FILES[name];
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
                try {
                  registerLocal(nickname, hash, note).catch(function () {});
                } catch (e) {}
                return sess;
              }
              return Promise.reject(new Error((lr.data && lr.data.error) || "登录失败"));
            });
          }
          if (r.status === 409) return Promise.reject(new Error(r.data.error || "昵称已被注册"));
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

  function ensureCss() {
    if (cssReady) return;
    if (document.querySelector('link[data-chinapte-auth-css]')) {
      cssReady = true;
      return;
    }
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "auth-modal.css?v=" + ASSET_VER;
    link.setAttribute("data-chinapte-auth-css", "1");
    (document.head || document.documentElement).appendChild(link);
    cssReady = true;
  }

  function setMsg(text, isErr) {
    var el = $("cpaAuthMsg");
    if (!el) return;
    el.textContent = text || "";
    el.hidden = !text;
    el.classList.toggle("is-error", !!isErr);
  }

  function setTab(tab) {
    var isLogin = tab !== "register";
    var loginForm = $("cpaLoginForm");
    var regForm = $("cpaRegisterForm");
    var tabLogin = $("cpaTabLogin");
    var tabReg = $("cpaTabRegister");
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
    setMsg("");
  }

  function ensureModal() {
    ensureCss();
    if (modalReady && $("cpaAuthModal")) return;
    if ($("cpaAuthModal")) {
      modalReady = true;
      return;
    }
    var wrap = document.createElement("div");
    wrap.id = "cpaAuthModal";
    wrap.className = "cpa-auth-modal";
    wrap.hidden = true;
    wrap.setAttribute("role", "dialog");
    wrap.setAttribute("aria-modal", "true");
    wrap.setAttribute("aria-labelledby", "cpaAuthTitle");
    wrap.innerHTML =
      '<div class="cpa-auth-backdrop" data-cpa-close="1"></div>' +
      '<div class="cpa-auth-panel">' +
      '<button type="button" class="cpa-auth-close" data-cpa-close="1" aria-label="关闭">×</button>' +
      '<h2 id="cpaAuthTitle" class="cpa-auth-title">站点会员</h2>' +
      '<p class="cpa-auth-lead">登录后继续练习与功能。密码仅在本机做 SHA-256 后再发送；与后台管理员无关。</p>' +
      '<div class="cpa-auth-tabs" role="tablist">' +
      '<button type="button" class="cpa-auth-tab is-active" id="cpaTabLogin" role="tab" aria-selected="true">登录</button>' +
      '<button type="button" class="cpa-auth-tab" id="cpaTabRegister" role="tab" aria-selected="false">注册</button>' +
      "</div>" +
      '<form class="cpa-auth-form" id="cpaLoginForm" autocomplete="on">' +
      "<label><span>昵称</span>" +
      '<input type="text" id="cpaLoginNick" name="nickname" required maxlength="16" placeholder="你的显示昵称" autocomplete="username" /></label>' +
      "<label><span>密码</span>" +
      '<input type="password" id="cpaLoginPass" name="password" required minlength="6" maxlength="64" placeholder="至少 6 位" autocomplete="current-password" /></label>' +
      '<button type="submit" class="cpa-auth-submit">登录</button>' +
      "</form>" +
      '<form class="cpa-auth-form" id="cpaRegisterForm" hidden autocomplete="on">' +
      "<label><span>昵称（显示名）</span>" +
      '<input type="text" id="cpaRegNick" name="nickname" required maxlength="16" placeholder="2–16 字" autocomplete="nickname" /></label>' +
      "<label><span>密码</span>" +
      '<input type="password" id="cpaRegPass" name="password" required minlength="6" maxlength="64" placeholder="至少 6 位，仅存哈希" autocomplete="new-password" /></label>' +
      "<label><span>简短备注（可选）</span>" +
      '<input type="text" id="cpaRegNote" name="note" maxlength="80" placeholder="例如：备考中 / 即将出国" /></label>' +
      '<button type="submit" class="cpa-auth-submit">注册并登录</button>' +
      "</form>" +
      '<p class="cpa-auth-msg" id="cpaAuthMsg" hidden></p>' +
      "</div>";
    document.body.appendChild(wrap);

    wrap.addEventListener("click", function (e) {
      var t = e.target;
      if (t && t.getAttribute && t.getAttribute("data-cpa-close")) {
        closeModal(false);
      }
    });

    var tabLogin = $("cpaTabLogin");
    var tabReg = $("cpaTabRegister");
    if (tabLogin) tabLogin.addEventListener("click", function () { setTab("login"); });
    if (tabReg) tabReg.addEventListener("click", function () { setTab("register"); });

    var loginForm = $("cpaLoginForm");
    if (loginForm) {
      loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var nick = ($("cpaLoginNick") || {}).value;
        var pass = ($("cpaLoginPass") || {}).value;
        setMsg("登录中…");
        doLogin(nick, pass)
          .then(function () {
            setMsg("");
            loginForm.reset();
            onAuthSuccess();
          })
          .catch(function (err) {
            setMsg((err && err.message) || "登录失败", true);
          });
      });
    }

    var regForm = $("cpaRegisterForm");
    if (regForm) {
      regForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var nick = ($("cpaRegNick") || {}).value;
        var pass = ($("cpaRegPass") || {}).value;
        var note = ($("cpaRegNote") || {}).value;
        setMsg("注册中…");
        doRegister(nick, pass, note)
          .then(function () {
            setMsg("");
            regForm.reset();
            onAuthSuccess();
          })
          .catch(function (err) {
            setMsg((err && err.message) || "注册失败", true);
          });
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        var m = $("cpaAuthModal");
        if (m && !m.hidden) closeModal(false);
      }
    });

    modalReady = true;
  }

  function runPending() {
    var act = pendingAction;
    pendingAction = null;
    if (!act) return;
    try {
      if (typeof act === "function") {
        act();
        return;
      }
      if (act.type === "href" && act.href) {
        window.location.href = act.href;
        return;
      }
      if (act.type === "click" && act.el) {
        var el = act.el;
        if (el.tagName === "A" && el.href) {
          window.location.href = el.href;
          return;
        }
        if (typeof el.click === "function") el.click();
      }
    } catch (e) {}
  }

  function onAuthSuccess() {
    closeModal(true);
    renderAccountChip();
    try {
      document.dispatchEvent(new CustomEvent("chinapte:auth", { detail: readSession() }));
    } catch (e) {}
    runPending();
  }

  function openModal(opts) {
    opts = opts || {};
    ensureModal();
    if (!readSession()) {
      /* keep pending if already set by requireAuth */
    }
    if (opts.onSuccess) {
      var prev = pendingAction;
      pendingAction = function () {
        if (typeof prev === "function") prev();
        else if (prev) {
          var p = prev;
          pendingAction = p;
          runPending();
        }
        opts.onSuccess();
      };
    }
    setTab(opts.tab === "register" ? "register" : "login");
    var m = $("cpaAuthModal");
    if (m) {
      m.hidden = false;
      document.documentElement.classList.add("cpa-auth-open");
      var focusEl = opts.tab === "register" ? $("cpaRegNick") : $("cpaLoginNick");
      if (focusEl) {
        setTimeout(function () {
          try {
            focusEl.focus();
          } catch (e) {}
        }, 30);
      }
    }
    if (workerOk === null) probeWorker();
  }

  function closeModal(success) {
    var m = $("cpaAuthModal");
    if (m) m.hidden = true;
    document.documentElement.classList.remove("cpa-auth-open");
    setMsg("");
    if (!success) pendingAction = null;
  }

  function requireAuth(actionOrOpts) {
    var sess = readSession();
    if (sess && sess.nickname) {
      if (typeof actionOrOpts === "function") actionOrOpts();
      else if (actionOrOpts && typeof actionOrOpts.onSuccess === "function") actionOrOpts.onSuccess();
      return true;
    }
    if (typeof actionOrOpts === "function") {
      pendingAction = actionOrOpts;
      openModal({ tab: "login" });
    } else if (actionOrOpts && actionOrOpts.type) {
      pendingAction = actionOrOpts;
      openModal({ tab: actionOrOpts.tab || "login" });
    } else {
      openModal(actionOrOpts || { tab: "login" });
    }
    return false;
  }

  function isExternalHref(href) {
    if (!href) return false;
    if (href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0) return true;
    if (href.indexOf("//") === 0 || /^https?:/i.test(href)) {
      try {
        var u = new URL(href, location.href);
        return u.origin !== location.origin;
      } catch (e) {
        return true;
      }
    }
    return false;
  }

  function resolveFileFromHref(href) {
    if (!href || href.charAt(0) === "#") return fileName();
    try {
      var u = new URL(href, location.href);
      var name = (u.pathname || "").split("/").pop() || "index.html";
      try {
        name = decodeURIComponent(name);
      } catch (e2) {}
      return name || "index.html";
    } catch (e) {
      return String(href).split("?")[0].split("#")[0].split("/").pop() || "";
    }
  }

  function shouldGateHref(href) {
    if (!href) return false;
    if (href.charAt(0) === "#") return false;
    if (isExternalHref(href)) return false;
    var target = resolveFileFromHref(href);
    if (isHomepage()) {
      /* homepage: gate any in-site navigation away from pure hash */
      if (target === "index.html" || target === "") return false;
      return true;
    }
    /* elsewhere: only gate feature/practice destinations */
    return !isPublicFile(target);
  }

  function isIgnorableTarget(el) {
    if (!el || !el.closest) return true;
    if (el.closest("#cpaAuthModal")) return true;
    if (el.closest(".site-nav-account")) return true;
    if (el.closest(".site-footer") && !el.closest("a.btn-soft, a.btn-secondary-link, a.btn-primary-link")) {
      /* footer plain links rare; still gate feature links in footer via href check */
    }
    if (el.getAttribute && el.getAttribute("data-cpa-skip-gate") != null) return true;
    return false;
  }

  function findActionable(el) {
    if (!el || !el.closest) return null;
    return el.closest(
      "a[href], button, [role='button'], .practice-card, .btn-primary-link, .btn-secondary-link, .btn-soft, .btn-submit, input[type='submit'], input[type='button']"
    );
  }

  function gateClick(e) {
    if (e.defaultPrevented) return;
    if (e.button != null && e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var sess = readSession();
    if (sess && sess.nickname) return;

    var raw = e.target;
    if (isIgnorableTarget(raw)) return;
    var el = findActionable(raw);
    if (!el) return;
    if (isIgnorableTarget(el)) return;

    /* theme toggle etc. */
    if (el.id === "themeToggle" || (el.classList && el.classList.contains("theme-toggle"))) return;
    if (el.getAttribute && el.getAttribute("data-cpa-skip-gate") != null) return;

    var tag = (el.tagName || "").toUpperCase();
    var href = el.getAttribute && el.getAttribute("href");

    if (tag === "A" && href) {
      if (!shouldGateHref(href)) return;
      e.preventDefault();
      e.stopPropagation();
      pendingAction = { type: "href", href: el.href || href };
      openModal({ tab: "login" });
      return;
    }

    if (isHomepage()) {
      /* aggressive: any button / role=button on homepage */
      if (tag === "BUTTON" || tag === "INPUT" || (el.getAttribute && el.getAttribute("role") === "button")) {
        e.preventDefault();
        e.stopPropagation();
        pendingAction = { type: "click", el: el };
        openModal({ tab: "login" });
        return;
      }
      if (el.classList && (el.classList.contains("practice-card") || el.classList.contains("trust-card"))) {
        e.preventDefault();
        e.stopPropagation();
        pendingAction = { type: "click", el: el };
        openModal({ tab: "login" });
      }
      return;
    }

    /* other pages: gate nav to features + primary practice controls */
    if (tag === "A" && href && shouldGateHref(href)) {
      e.preventDefault();
      e.stopPropagation();
      pendingAction = { type: "href", href: el.href || href };
      openModal({ tab: "login" });
      return;
    }
    if (isPublicFile(fileName())) return;
    /* on feature pages: require login for interactive controls */
    if (tag === "BUTTON" || tag === "INPUT" || (el.getAttribute && el.getAttribute("role") === "button")) {
      e.preventDefault();
      e.stopPropagation();
      pendingAction = { type: "click", el: el };
      openModal({ tab: "login" });
      return;
    }
    if (el.classList && el.classList.contains("practice-card")) {
      e.preventDefault();
      e.stopPropagation();
      if (href) pendingAction = { type: "href", href: el.href || href };
      else pendingAction = { type: "click", el: el };
      openModal({ tab: "login" });
    }
  }

  function renderAccountChip() {
    var nav = document.querySelector("nav.site-nav");
    if (!nav) return;
    var slot = nav.querySelector(".site-nav-account");
    if (!slot) {
      slot = document.createElement("div");
      slot.className = "site-nav-account";
      nav.appendChild(slot);
    }
    var s = readSession();
    if (s && s.nickname) {
      slot.innerHTML =
        '<span class="site-nav-nick" title="已登录">' +
        escapeHtml(s.nickname) +
        (s.mode === "local" ? '<span class="site-nav-nick-mode">本机</span>' : "") +
        "</span>" +
        '<button type="button" class="site-nav-logout" id="cpaNavLogout">退出</button>';
      var btn = slot.querySelector("#cpaNavLogout");
      if (btn) {
        btn.addEventListener("click", function (ev) {
          ev.preventDefault();
          doLogout().then(function () {
            renderAccountChip();
            try {
              document.dispatchEvent(new CustomEvent("chinapte:auth", { detail: null }));
            } catch (e) {}
          });
        });
      }
    } else {
      slot.innerHTML =
        '<button type="button" class="site-nav-login" id="cpaNavLogin">登录</button>';
      var loginBtn = slot.querySelector("#cpaNavLogin");
      if (loginBtn) {
        loginBtn.addEventListener("click", function (ev) {
          ev.preventDefault();
          openModal({ tab: "login" });
        });
      }
    }
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function initGate() {
    ensureCss();
    ensureModal();
    renderAccountChip();
    if (!initGate._bound) {
      document.addEventListener("click", gateClick, true);
      initGate._bound = true;
    }
    /* observe nav re-render from site-nav */
    var nav = document.querySelector("nav.site-nav");
    if (nav && !initGate._obs) {
      try {
        var obs = new MutationObserver(function () {
          if (!nav.querySelector(".site-nav-account")) renderAccountChip();
        });
        obs.observe(nav, { childList: true, subtree: false });
        initGate._obs = obs;
      } catch (e) {}
    }
    if (workerOk === null) probeWorker();
  }

  window.ChinaPTEAuth = {
    SESSION_KEY: SESSION_KEY,
    USERS_KEY: USERS_KEY,
    getSession: readSession,
    writeSession: writeSession,
    login: doLogin,
    register: doRegister,
    logout: doLogout,
    openModal: openModal,
    closeModal: closeModal,
    requireAuth: requireAuth,
    initGate: initGate,
    renderAccountChip: renderAccountChip,
    probeWorker: probeWorker,
    isLoggedIn: function () {
      var s = readSession();
      return !!(s && s.nickname);
    },
    api: api,
    getWorkerOk: function () {
      return workerOk;
    },
    setWorkerOk: function (v) {
      workerOk = v;
    },
  };

  function boot() {
    initGate();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
