/* chinaPTE admin — labor/consult via GitHub Contents API + password hash */
(function () {
  "use strict";

  var AUTH_KEY = "chinaPTE_admin_ok";
  var TOKEN_KEY = "chinaPTE_gh_token";

  var el = {
    loginPanel: document.getElementById("loginPanel"),
    editorPanel: document.getElementById("editorPanel"),
    loginForm: document.getElementById("loginForm"),
    loginPass: document.getElementById("loginPass"),
    loginStatus: document.getElementById("loginStatus"),
    logoutBtn: document.getElementById("logoutBtn"),
    form: document.getElementById("laborForm"),
    status: document.getElementById("saveStatus"),
    loadBtn: document.getElementById("btnReload"),
    downloadBtn: document.getElementById("btnDownload"),
    saveBtn: document.getElementById("btnSaveGithub"),
    clearTokenBtn: document.getElementById("btnClearToken"),
    tokenInput: document.getElementById("ghToken"),
    rememberToken: document.getElementById("rememberToken"),
    panelLabor: document.getElementById("panelLabor"),
    panelConsult: document.getElementById("panelConsult"),
    consultForm: document.getElementById("consultForm"),
    consultStatus: document.getElementById("consultStatus"),
    btnConsultSave: document.getElementById("btnConsultSave"),
    btnConsultReload: document.getElementById("btnConsultReload"),
    btnConsultDownload: document.getElementById("btnConsultDownload"),
    panelAnalytics: document.getElementById("panelAnalytics"),
    analyticsStatus: document.getElementById("analyticsStatus"),
    analyticsHonesty: document.getElementById("analyticsHonesty"),
    analyticsAdminKey: document.getElementById("analyticsAdminKey"),
    analyticsDays: document.getElementById("analyticsDays"),
    btnAnalyticsRefresh: document.getElementById("btnAnalyticsRefresh"),
    btnAnalyticsCsvRaw: document.getElementById("btnAnalyticsCsvRaw"),
    btnAnalyticsCsvDaily: document.getElementById("btnAnalyticsCsvDaily"),
    btnAnalyticsLocal: document.getElementById("btnAnalyticsLocal"),
    panelPassword: document.getElementById("panelPassword"),
    passwordForm: document.getElementById("passwordForm"),
    passwordStatus: document.getElementById("passwordStatus"),
    btnSavePassword: document.getElementById("btnSavePassword"),
    pwdCurrent: document.getElementById("pwdCurrent"),
    pwdNew: document.getElementById("pwdNew"),
    pwdConfirm: document.getElementById("pwdConfirm")
  };

  var consultLoaded = false;

  function showStatus(node, msg, type) {
    if (!node) return;
    node.textContent = msg;
    node.className = "status is-show is-" + (type || "info");
  }

  function clearStatus(node) {
    if (!node) return;
    node.textContent = "";
    node.className = "status";
  }

  function isLoggedIn() {
    return sessionStorage.getItem(AUTH_KEY) === "1";
  }

  function setLoggedIn(ok) {
    if (ok) sessionStorage.setItem(AUTH_KEY, "1");
    else sessionStorage.removeItem(AUTH_KEY);
  }

  function bytesToHex(buf) {
    var bytes = new Uint8Array(buf);
    var out = "";
    for (var i = 0; i < bytes.length; i++) {
      out += bytes[i].toString(16).padStart(2, "0");
    }
    return out;
  }

  async function sha256Hex(text) {
    var data = new TextEncoder().encode(String(text || ""));
    var digest = await crypto.subtle.digest("SHA-256", data);
    return bytesToHex(digest);
  }

  function hasPasswordHash() {
    return !!(window.ADMIN_PASSWORD_HASH && String(window.ADMIN_PASSWORD_HASH).trim());
  }

  function hasPlainPassword() {
    return !!(window.ADMIN_PASSWORD && String(window.ADMIN_PASSWORD).trim());
  }

  async function verifyPassword(pass) {
    var p = String(pass || "");
    if (hasPasswordHash()) {
      var hash = await sha256Hex(p);
      return hash === String(window.ADMIN_PASSWORD_HASH).trim().toLowerCase();
    }
    if (hasPlainPassword()) {
      return p === String(window.ADMIN_PASSWORD);
    }
    return false;
  }

  function jsString(s) {
    return JSON.stringify(String(s == null ? "" : s));
  }

  function buildConfigJs(passwordHash) {
    var g = window.ADMIN_GITHUB || {};
    var a = window.CHINAPTE_ANALYTICS || {};
    var lines = [];
    lines.push("/* chinaPTE admin auth — prefer ADMIN_PASSWORD_HASH (SHA-256 hex).");
    lines.push("   Change password after login in the「修改管理员密码」tab (writes this file via GitHub).");
    lines.push("   Do not publish plaintext passwords in docs or on the login page. */");
    lines.push("window.ADMIN_PASSWORD_HASH = " + jsString(passwordHash) + ";");
    lines.push("/* Legacy plaintext fallback (unused when HASH is set). Leave empty. */");
    lines.push('window.ADMIN_PASSWORD = "";');
    lines.push("");
    lines.push("/* GitHub 仓库配置（一般无需修改） */");
    lines.push("window.ADMIN_GITHUB = {");
    lines.push('  owner: ' + jsString(g.owner || "chinaptepte-commits") + ",");
    lines.push('  repo: ' + jsString(g.repo || "chinaPTE") + ",");
    lines.push('  branch: ' + jsString(g.branch || "main") + ",");
    lines.push('  laborPath: ' + jsString(g.laborPath || g.path || "content/labor.json") + ",");
    lines.push('  consultPath: ' + jsString(g.consultPath || "content/consult.json") + ",");
    lines.push('  configPath: ' + jsString(g.configPath || "admin/config.js") + ",");
    lines.push("  /* 兼容旧字段 */");
    lines.push('  path: ' + jsString(g.path || g.laborPath || "content/labor.json"));
    lines.push("};");
    lines.push("");
    lines.push("/* Analytics（招商数据看板） */");
    lines.push("window.CHINAPTE_ANALYTICS = {");
    lines.push('  endpoint: ' + jsString(a.endpoint || "https://chinapte.net/api/analytics") + ",");
    lines.push("  /* 与 Worker secret ADMIN_KEY 保持一致；仅本机 admin 页使用 */");
    lines.push('  adminKey: ' + jsString(a.adminKey || "") + ",");
    lines.push("  /* 可选：第三方 webhook（Notion/Sheets 中转等） */");
    lines.push('  webhook: ' + jsString(a.webhook || window.CHINAPTE_ANALYTICS_WEBHOOK || "") + ",");
    lines.push("  /* 可选 GA4 Measurement ID，例如 G-XXXXXXXX */");
    lines.push('  ga4MeasurementId: ' + jsString(a.ga4MeasurementId || ""));
    lines.push("};");
    lines.push("/* 兼容旧字段名 */");
    lines.push('window.CHINAPTE_ANALYTICS_WEBHOOK = window.CHINAPTE_ANALYTICS.webhook || "";');
    lines.push('window.ANALYTICS_ADMIN_KEY = window.CHINAPTE_ANALYTICS.adminKey || "";');
    lines.push("");
    return lines.join("\n");
  }

  function getGithubCfg() {
    var g = window.ADMIN_GITHUB || {};
    return {
      owner: g.owner || "chinaptepte-commits",
      repo: g.repo || "chinaPTE",
      branch: g.branch || "main",
      laborPath: g.laborPath || g.path || "content/labor.json",
      consultPath: g.consultPath || "content/consult.json",
      configPath: g.configPath || "admin/config.js"
    };
  }

  function getStoredToken() {
    return (
      sessionStorage.getItem(TOKEN_KEY) ||
      localStorage.getItem(TOKEN_KEY) ||
      ""
    );
  }

  function storeToken(token, persist) {
    sessionStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
    if (!token) return;
    if (persist) localStorage.setItem(TOKEN_KEY, token);
    else sessionStorage.setItem(TOKEN_KEY, token);
  }

  function resolveToken() {
    var tokenFromInput = (el.tokenInput.value || "").trim();
    var token = tokenFromInput || getStoredToken();
    if (tokenFromInput) {
      storeToken(tokenFromInput, !!(el.rememberToken && el.rememberToken.checked));
    }
    return token;
  }

  function utf8ToBase64(str) {
    var bytes = new TextEncoder().encode(str);
    var bin = "";
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }

  function linesToArray(text) {
    return String(text || "")
      .split(/\r?\n/)
      .map(function (s) {
        return s.trim();
      })
      .filter(Boolean);
  }

  function arrayToLines(arr) {
    return (arr || []).join("\n");
  }

  function prettyJson(obj) {
    return JSON.stringify(obj, null, 2) + "\n";
  }

  function val(id) {
    var node = document.getElementById(id);
    return node ? node.value : "";
  }

  function setVal(id, value) {
    var node = document.getElementById(id);
    if (node) node.value = value == null ? "" : value;
  }

  function fillLaborForm(data) {
    setVal("f_title", data.title || "");
    setVal("f_subtitle", data.subtitle || "");
    setVal("f_intro", data.intro || "");
    setVal("f_whoFor", arrayToLines(data.whoFor));
    setVal("f_whatWeOffer", arrayToLines(data.whatWeOffer));
    setVal("f_disclaimer", data.disclaimer || "");
    setVal("f_ctaText", data.ctaText || "");
    setVal("f_ctaHref", data.ctaHref || "consult.html");
    setVal("f_wechatPlaceholder", data.wechatPlaceholder || "");
    setVal("f_updatedAt", data.updatedAt || "");
  }

  function readLaborForm() {
    return {
      title: val("f_title").trim(),
      subtitle: val("f_subtitle").trim(),
      intro: val("f_intro").trim(),
      whoFor: linesToArray(val("f_whoFor")),
      whatWeOffer: linesToArray(val("f_whatWeOffer")),
      disclaimer: val("f_disclaimer").trim(),
      ctaText: val("f_ctaText").trim(),
      ctaHref: val("f_ctaHref").trim() || "consult.html",
      wechatPlaceholder: val("f_wechatPlaceholder").trim(),
      updatedAt: new Date().toISOString()
    };
  }

  function fillConsultForm(data) {
    setVal("c_pageTitle", data.pageTitle || "");
    setVal("c_brandName", data.brandName || "");
    setVal("c_brandSub", data.brandSub || "");
    setVal("c_introTitle", data.introTitle || "");
    setVal("c_intro", data.intro || "");
    setVal("c_disclaimerShort", data.disclaimerShort || "");
    setVal("c_wechatLabel", data.wechatLabel || "");
    setVal("c_wechatId", data.wechatId || "");
    setVal("c_copyWechatBtn", data.copyWechatBtn || "");
    setVal("c_nameLabel", data.nameLabel || "");
    setVal("c_namePlaceholder", data.namePlaceholder || "");
    setVal("c_contactLabel", data.contactLabel || "");
    setVal("c_contactPlaceholder", data.contactPlaceholder || "");
    setVal("c_countryLabel", data.countryLabel || "");
    setVal("c_countryPlaceholder", data.countryPlaceholder || "");
    setVal("c_countryOptions", arrayToLines(data.countryOptions));
    setVal("c_noteLabel", data.noteLabel || "");
    setVal("c_notePlaceholder", data.notePlaceholder || "");
    setVal("c_submitText", data.submitText || "");
    setVal("c_successTitle", data.successTitle || "");
    setVal("c_successDetail", data.successDetail || "");
    setVal("c_formNote", data.formNote || "");
    setVal("c_ctaPracticeText", data.ctaPracticeText || "");
    setVal("c_ctaPracticeHref", data.ctaPracticeHref || "practice.html");
    setVal("c_ctaLaborText", data.ctaLaborText || "");
    setVal("c_ctaLaborHref", data.ctaLaborHref || "labor.html");
    setVal("c_disclaimerFooter", data.disclaimerFooter || "");
    setVal("c_footer", data.footer || "");
    setVal("c_updatedAt", data.updatedAt || "");
  }

  function readConsultForm() {
    return {
      pageTitle: val("c_pageTitle").trim(),
      brandName: val("c_brandName").trim(),
      brandSub: val("c_brandSub").trim(),
      introTitle: val("c_introTitle").trim(),
      intro: val("c_intro").trim(),
      disclaimerShort: val("c_disclaimerShort").trim(),
      wechatLabel: val("c_wechatLabel").trim(),
      wechatId: val("c_wechatId").trim(),
      copyWechatBtn: val("c_copyWechatBtn").trim(),
      nameLabel: val("c_nameLabel").trim(),
      namePlaceholder: val("c_namePlaceholder").trim(),
      contactLabel: val("c_contactLabel").trim(),
      contactPlaceholder: val("c_contactPlaceholder").trim(),
      countryLabel: val("c_countryLabel").trim(),
      countryPlaceholder: val("c_countryPlaceholder").trim(),
      countryOptions: linesToArray(val("c_countryOptions")),
      noteLabel: val("c_noteLabel").trim(),
      notePlaceholder: val("c_notePlaceholder").trim(),
      submitText: val("c_submitText").trim(),
      successTitle: val("c_successTitle").trim(),
      successDetail: val("c_successDetail").trim(),
      formNote: val("c_formNote").trim(),
      ctaPracticeText: val("c_ctaPracticeText").trim(),
      ctaPracticeHref: val("c_ctaPracticeHref").trim() || "practice.html",
      ctaLaborText: val("c_ctaLaborText").trim(),
      ctaLaborHref: val("c_ctaLaborHref").trim() || "labor.html",
      disclaimerFooter: val("c_disclaimerFooter").trim(),
      footer: val("c_footer").trim(),
      updatedAt: new Date().toISOString()
    };
  }

  async function githubGet(path, token, branch) {
    var cfg = getGithubCfg();
    var apiBase =
      "https://api.github.com/repos/" +
      cfg.owner +
      "/" +
      cfg.repo +
      "/contents/" +
      path;
    var getRes = await fetch(apiBase + "?ref=" + encodeURIComponent(branch || cfg.branch), {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: "Bearer " + token,
        "X-GitHub-Api-Version": "2022-11-28"
      }
    });
    if (getRes.status === 401 || getRes.status === 403) {
      throw new Error("Token 无效或权限不足（需要 classic PAT + repo 权限）");
    }
    if (getRes.status === 404) {
      return { sha: null, exists: false };
    }
    if (!getRes.ok) {
      var getErr = await getRes.text();
      throw new Error("读取失败 HTTP " + getRes.status + " " + getErr.slice(0, 200));
    }
    var meta = await getRes.json();
    return { sha: meta.sha, exists: true, meta: meta };
  }

  async function githubPut(path, token, contentText, message, sha) {
    var cfg = getGithubCfg();
    var apiBase =
      "https://api.github.com/repos/" +
      cfg.owner +
      "/" +
      cfg.repo +
      "/contents/" +
      path;
    var body = {
      message: message,
      content: utf8ToBase64(contentText),
      branch: cfg.branch
    };
    if (sha) body.sha = sha;
    var putRes = await fetch(apiBase, {
      method: "PUT",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28"
      },
      body: JSON.stringify(body)
    });
    if (!putRes.ok) {
      var putErr = await putRes.text();
      throw new Error("保存失败 " + path + " HTTP " + putRes.status + " " + putErr.slice(0, 240));
    }
    return putRes.json();
  }

  async function loadJson(relPath, fillFn, statusNode, label) {
    clearStatus(statusNode);
    showStatus(statusNode, "正在加载 " + label + " …", "info");
    try {
      var res = await fetch("../" + relPath + "?t=" + Date.now(), {
        cache: "no-store"
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      var data = await res.json();
      fillFn(data);
      showStatus(statusNode, "已加载当前线上 / 站点内容。可编辑后保存。", "ok");
      return true;
    } catch (err) {
      showStatus(
        statusNode,
        "加载失败：" +
          (err && err.message ? err.message : err) +
          "。请用 http 打开本页（勿用 file://），或先本地下载后再改。",
        "err"
      );
      return false;
    }
  }

  function downloadNamed(data, filename, statusNode) {
    var blob = new Blob([prettyJson(data)], {
      type: "application/json;charset=utf-8"
    });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 500);
    showStatus(
      statusNode,
      "已下载 " + filename + "。可手动上传到仓库 content/" + filename + "。",
      "ok"
    );
  }

  async function savePath(relPath, data, statusNode, saveBtn, okHint, commitMsg) {
    var token = resolveToken();
    if (!token) {
      showStatus(
        statusNode,
        "请先粘贴 GitHub Personal Access Token（classic，勾选 repo 权限）。",
        "err"
      );
      el.tokenInput.focus();
      return;
    }
    var bodyText = prettyJson(data);
    if (saveBtn) saveBtn.disabled = true;
    showStatus(statusNode, "正在读取文件 SHA…", "info");
    try {
      var meta = await githubGet(relPath, token);
      showStatus(statusNode, "正在写入 GitHub…", "info");
      await githubPut(relPath, token, bodyText, commitMsg, meta.sha || undefined);
      showStatus(statusNode, okHint, "ok");
    } catch (err) {
      showStatus(
        statusNode,
        "保存失败：" + (err && err.message ? err.message : err),
        "err"
      );
    } finally {
      if (saveBtn) saveBtn.disabled = false;
    }
  }

  function loadLabor() {
    return loadJson("content/labor.json", fillLaborForm, el.status, "content/labor.json");
  }

  function loadConsult() {
    return loadJson(
      "content/consult.json",
      fillConsultForm,
      el.consultStatus,
      "content/consult.json"
    ).then(function (ok) {
      if (ok) consultLoaded = true;
      return ok;
    });
  }

  function saveLabor() {
    var data = readLaborForm();
    fillLaborForm(data);
    return savePath(
      getGithubCfg().laborPath,
      data,
      el.status,
      el.saveBtn,
      "保存成功！GitHub Pages 通常 1–2 分钟后刷新。可打开 labor.html 查看。",
      "Update labor.json via chinaPTE admin"
    );
  }

  function saveConsult() {
    var data = readConsultForm();
    fillConsultForm(data);
    return savePath(
      getGithubCfg().consultPath,
      data,
      el.consultStatus,
      el.btnConsultSave,
      "保存成功！GitHub Pages 通常 1–2 分钟后刷新。可打开 consult.html 查看。",
      "Update consult.json via chinaPTE admin"
    );
  }

  function switchTab(name) {
    var tab = name || "labor";
    el.panelLabor.classList.toggle("hidden", tab !== "labor");
    el.panelConsult.classList.toggle("hidden", tab !== "consult");
    if (el.panelAnalytics) el.panelAnalytics.classList.toggle("hidden", tab !== "analytics");
    if (el.panelPassword) el.panelPassword.classList.toggle("hidden", tab !== "password");
    // Token card mainly for content editors + password save
    var tokenCard = document.getElementById("tokenCard");
    if (tokenCard) tokenCard.classList.toggle("hidden", tab === "analytics");
    document.querySelectorAll(".admin-tab").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-tab") === tab);
    });
    if (tab === "consult" && !consultLoaded) loadConsult();
    if (tab === "analytics") refreshAnalytics(false);
  }

  async function savePasswordChange() {
    var statusNode = el.passwordStatus;
    var current = (el.pwdCurrent && el.pwdCurrent.value) || "";
    var next = (el.pwdNew && el.pwdNew.value) || "";
    var confirm = (el.pwdConfirm && el.pwdConfirm.value) || "";
    clearStatus(statusNode);
    if (!current || !next || !confirm) {
      showStatus(statusNode, "请填写当前密码、新密码与确认。", "err");
      return;
    }
    if (next.length < 8) {
      showStatus(statusNode, "新密码至少 8 位。", "err");
      return;
    }
    if (next !== confirm) {
      showStatus(statusNode, "两次输入的新密码不一致。", "err");
      return;
    }
    var okCurrent = await verifyPassword(current);
    if (!okCurrent) {
      showStatus(statusNode, "当前密码不正确。", "err");
      return;
    }
    if (next === current) {
      showStatus(statusNode, "新密码不能与当前密码相同。", "err");
      return;
    }
    var token = resolveToken();
    if (!token) {
      showStatus(
        statusNode,
        "请先粘贴 GitHub Personal Access Token（classic，勾选 repo 权限）。",
        "err"
      );
      if (el.tokenInput) el.tokenInput.focus();
      return;
    }
    var newHash = await sha256Hex(next);
    var bodyText = buildConfigJs(newHash);
    var relPath = getGithubCfg().configPath;
    if (el.btnSavePassword) el.btnSavePassword.disabled = true;
    showStatus(statusNode, "正在读取 config.js SHA…", "info");
    try {
      var meta = await githubGet(relPath, token);
      showStatus(statusNode, "正在写入 GitHub…", "info");
      await githubPut(
        relPath,
        token,
        bodyText,
        "Update admin password hash via chinaPTE admin",
        meta.sha || undefined
      );
      window.ADMIN_PASSWORD_HASH = newHash;
      window.ADMIN_PASSWORD = "";
      if (el.pwdCurrent) el.pwdCurrent.value = "";
      if (el.pwdNew) el.pwdNew.value = "";
      if (el.pwdConfirm) el.pwdConfirm.value = "";
      showStatus(
        statusNode,
        "密码已更新并写入 GitHub。请硬刷新本页（Ctrl/Cmd+Shift+R）以加载新 config；当前会话仍保持登录。",
        "ok"
      );
    } catch (err) {
      showStatus(
        statusNode,
        "保存失败：" + (err && err.message ? err.message : err),
        "err"
      );
    } finally {
      if (el.btnSavePassword) el.btnSavePassword.disabled = false;
    }
  }

  function analyticsEndpoint() {
    var c = window.CHINAPTE_ANALYTICS || {};
    return c.endpoint || "https://chinapte.net/api/analytics";
  }

  function analyticsAdminKey() {
    var fromInput = el.analyticsAdminKey && el.analyticsAdminKey.value.trim();
    if (fromInput) return fromInput;
    var c = window.CHINAPTE_ANALYTICS || {};
    return c.adminKey || window.ANALYTICS_ADMIN_KEY || "";
  }

  function formatMs(ms) {
    if (!ms || ms < 0) return "—";
    if (ms < 1000) return ms + " ms";
    var s = Math.round(ms / 1000);
    if (s < 60) return s + " 秒";
    var m = Math.floor(s / 60);
    var r = s % 60;
    return m + " 分 " + r + " 秒";
  }

  function topN(obj, n) {
    return Object.keys(obj || {})
      .map(function (k) { return { label: k, value: obj[k] || 0 }; })
      .sort(function (a, b) { return b.value - a.value; })
      .slice(0, n || 8);
  }

  function renderBars(node, rows) {
    if (!node) return;
    if (!rows || !rows.length) {
      node.innerHTML = '<div class="hint">暂无数据</div>';
      return;
    }
    var max = Math.max.apply(null, rows.map(function (r) { return r.value; }).concat([1]));
    node.innerHTML = rows
      .map(function (r) {
        var pct = Math.max(4, Math.round((r.value / max) * 100));
        return (
          '<div class="bar-row">' +
          '<div class="bar-label" title="' + String(r.label).replace(/"/g, "&quot;") + '">' +
          String(r.label) +
          "</div>" +
          '<div class="bar-track"><div class="bar-fill" style="width:' + pct + '%"></div></div>' +
          '<div class="bar-num">' + r.value + "</div>" +
          "</div>"
        );
      })
      .join("");
  }

  function applySummary(data, meta) {
    meta = meta || {};
    var pv = data.pv || 0;
    var uv = data.uv || 0;
    var dwell = data.avgDwellMs || 0;
    var evCount = data.eventCount != null ? data.eventCount : (data.daily ? data.daily.reduce(function (a, d) { return a + (d.pv || 0); }, 0) : "—");
    var kpiPv = document.getElementById("kpiPv");
    var kpiUv = document.getElementById("kpiUv");
    var kpiDwell = document.getElementById("kpiDwell");
    var kpiEvents = document.getElementById("kpiEvents");
    if (kpiPv) kpiPv.textContent = String(pv);
    if (kpiUv) kpiUv.textContent = String(uv);
    if (kpiDwell) kpiDwell.textContent = formatMs(dwell);
    if (kpiEvents) kpiEvents.textContent = String(evCount);

    var pm = data.playModes || {};
    renderBars(document.getElementById("playModeChart"), [
      { label: "听题目", value: pm.prompt || 0 },
      { label: "随身听", value: pm.walkman || 0 }
    ]);
    renderBars(document.getElementById("topPagesChart"), topN(data.topPages, 8));
    renderBars(document.getElementById("topFeaturesChart"), topN(data.topFeatures, 8));
    var daily = (data.daily || []).slice(0, 14).map(function (d) {
      return { label: d.day, value: d.pv || 0 };
    });
    renderBars(document.getElementById("dailyChart"), daily);

    if (el.analyticsHonesty) {
      if (data.source === "worker") {
        el.analyticsHonesty.textContent =
          "数据来源：Cloudflare Worker 汇总（跨用户）。可用于招商材料；请注明统计口径为匿名会话。";
      } else {
        el.analyticsHonesty.textContent =
          "诚实说明：当前显示的是本机浏览器缓冲 / 本会话数据（非全站跨用户）。" +
          "部署 workers/analytics 并配置 chinapte.net/api/analytics 后，点「刷新汇总」即可拉取全站 KPI。" +
          (meta.error ? " 最近请求： " + meta.error : "");
      }
    }
  }

  function localSummary() {
    if (window.ChinaPTEAnalytics && ChinaPTEAnalytics.getLocalSummary) {
      return ChinaPTEAnalytics.getLocalSummary();
    }
    return {
      source: "local",
      pv: 0,
      uv: 0,
      avgDwellMs: 0,
      topPages: {},
      topFeatures: {},
      playModes: { prompt: 0, walkman: 0 },
      eventCount: 0,
      events: []
    };
  }

  function downloadText(filename, text, mime) {
    var blob = new Blob([text], { type: mime || "text/csv;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 500);
  }

  function eventsToCsv(events) {
    var rows = events || [];
    var keys = ["ts", "type", "path", "sessionId", "feature", "playMode", "dwellMs", "screenWidth", "referrer"];
    function esc(v) {
      var s = v == null ? "" : String(v);
      if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
      return s;
    }
    var lines = [keys.join(",")];
    rows.forEach(function (ev) {
      lines.push(keys.map(function (k) { return esc(ev[k]); }).join(","));
    });
    return lines.join("\n") + "\n";
  }

  async function fetchWorkerSummary() {
    var key = analyticsAdminKey();
    var days = (el.analyticsDays && el.analyticsDays.value) || 30;
    var url = analyticsEndpoint() + "?summary=1&days=" + encodeURIComponent(days);
    var res = await fetch(url, {
      method: "GET",
      headers: key ? { "X-Admin-Key": key } : {}
    });
    if (!res.ok) {
      var errText = await res.text().catch(function () { return ""; });
      throw new Error("HTTP " + res.status + " " + (errText || "").slice(0, 120));
    }
    return res.json();
  }

  async function fetchWorkerCsv(kind) {
    var key = analyticsAdminKey();
    var url = analyticsEndpoint() + "?csv=1&kind=" + encodeURIComponent(kind || "raw");
    var res = await fetch(url, {
      method: "GET",
      headers: key ? { "X-Admin-Key": key } : {}
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    return res.text();
  }

  async function refreshAnalytics(forceLocal) {
    clearStatus(el.analyticsStatus);
    if (el.analyticsAdminKey && !el.analyticsAdminKey.value) {
      var c = window.CHINAPTE_ANALYTICS || {};
      if (c.adminKey) el.analyticsAdminKey.value = c.adminKey;
    }
    if (forceLocal) {
      applySummary(localSummary());
      showStatus(el.analyticsStatus, "已加载本机缓冲数据。", "info");
      return;
    }
    showStatus(el.analyticsStatus, "正在请求 Worker 汇总…", "info");
    try {
      var data = await fetchWorkerSummary();
      applySummary(data);
      showStatus(el.analyticsStatus, "已从 Worker 刷新汇总。", "ok");
    } catch (err) {
      applySummary(localSummary(), { error: String(err && err.message ? err.message : err) });
      showStatus(
        el.analyticsStatus,
        "Worker 暂不可用，已回退本机数据。部署后填写 Admin Key 再刷新。",
        "err"
      );
    }
  }

  function showEditor() {
    el.loginPanel.classList.add("hidden");
    el.editorPanel.classList.remove("hidden");
    var t = getStoredToken();
    if (t) el.tokenInput.value = t;
    loadLabor();
  }

  function showLogin() {
    el.editorPanel.classList.add("hidden");
    el.loginPanel.classList.remove("hidden");
    clearStatus(el.loginStatus);
  }

  el.loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    var pass = el.loginPass.value || "";
    clearStatus(el.loginStatus);
    showStatus(el.loginStatus, "正在验证…", "info");
    try {
      var ok = await verifyPassword(pass);
      if (ok) {
        setLoggedIn(true);
        el.loginPass.value = "";
        showEditor();
        if (hasPlainPassword() && !hasPasswordHash()) {
          // Encourage migration away from plaintext config
          setTimeout(function () {
            try {
              switchTab("password");
              showStatus(
                el.passwordStatus,
                "检测到配置仍使用明文密码。建议在此改成新密码（将写入 SHA-256 哈希）。",
                "info"
              );
            } catch (e2) {}
          }, 400);
        }
      } else {
        showStatus(el.loginStatus, "密码不正确。", "err");
      }
    } catch (err) {
      showStatus(el.loginStatus, "验证失败，请重试。", "err");
    }
  });

  if (el.passwordForm) {
    el.passwordForm.addEventListener("submit", function (e) {
      e.preventDefault();
      savePasswordChange();
    });
  }

  el.logoutBtn.addEventListener("click", function () {
    setLoggedIn(false);
    showLogin();
  });

  el.loadBtn.addEventListener("click", function () {
    loadLabor();
  });
  el.downloadBtn.addEventListener("click", function () {
    downloadNamed(readLaborForm(), "labor.json", el.status);
  });
  el.saveBtn.addEventListener("click", function () {
    saveLabor();
  });
  el.form.addEventListener("submit", function (e) {
    e.preventDefault();
    saveLabor();
  });

  el.btnConsultReload.addEventListener("click", function () {
    loadConsult();
  });
  el.btnConsultDownload.addEventListener("click", function () {
    downloadNamed(readConsultForm(), "consult.json", el.consultStatus);
  });
  el.btnConsultSave.addEventListener("click", function () {
    saveConsult();
  });
  el.consultForm.addEventListener("submit", function (e) {
    e.preventDefault();
    saveConsult();
  });

  el.clearTokenBtn.addEventListener("click", function () {
    storeToken("", false);
    el.tokenInput.value = "";
    showStatus(el.status, "已清除本机保存的 Token（session / localStorage）。", "info");
    showStatus(el.consultStatus, "已清除本机 Token。", "info");
  });

  document.querySelectorAll(".admin-tab").forEach(function (btn) {
    btn.addEventListener("click", function () {
      switchTab(btn.getAttribute("data-tab") || "labor");
    });
  });

  if (el.btnAnalyticsRefresh) {
    el.btnAnalyticsRefresh.addEventListener("click", function () {
      refreshAnalytics(false);
    });
  }
  if (el.btnAnalyticsLocal) {
    el.btnAnalyticsLocal.addEventListener("click", function () {
      refreshAnalytics(true);
    });
  }
  if (el.btnAnalyticsCsvRaw) {
    el.btnAnalyticsCsvRaw.addEventListener("click", async function () {
      try {
        var csv = await fetchWorkerCsv("raw");
        downloadText("chinapte-analytics-raw.csv", csv, "text/csv;charset=utf-8");
        showStatus(el.analyticsStatus, "已下载 Worker 原始事件 CSV。", "ok");
      } catch (err) {
        var local = localSummary();
        downloadText("chinapte-analytics-local-raw.csv", eventsToCsv(local.events || []), "text/csv;charset=utf-8");
        showStatus(el.analyticsStatus, "Worker CSV 失败，已导出本机事件。", "info");
      }
    });
  }
  if (el.btnAnalyticsCsvDaily) {
    el.btnAnalyticsCsvDaily.addEventListener("click", async function () {
      try {
        var csv = await fetchWorkerCsv("daily");
        downloadText("chinapte-analytics-daily.csv", csv, "text/csv;charset=utf-8");
        showStatus(el.analyticsStatus, "已下载按日汇总 CSV。", "ok");
      } catch (err) {
        var local = localSummary();
        var lines = ["day,pv,uv\n", new Date().toISOString().slice(0, 10) + "," + (local.pv || 0) + "," + (local.uv || 0) + "\n"];
        downloadText("chinapte-analytics-daily-local.csv", lines.join(""), "text/csv;charset=utf-8");
        showStatus(el.analyticsStatus, "Worker CSV 失败，已导出本机按日占位。", "info");
      }
    });
  }

  if (isLoggedIn()) showEditor();
  else showLogin();
})();
