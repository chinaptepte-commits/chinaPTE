/* chinaPTE admin — labor.json + consult.json via GitHub Contents API */
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
    btnConsultDownload: document.getElementById("btnConsultDownload")
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

  function getExpectedPassword() {
    return String(window.ADMIN_PASSWORD || "chinaPTE2026");
  }

  function getGithubCfg() {
    var g = window.ADMIN_GITHUB || {};
    return {
      owner: g.owner || "chinaptepte-commits",
      repo: g.repo || "chinaPTE",
      branch: g.branch || "main",
      laborPath: g.laborPath || g.path || "content/labor.json",
      consultPath: g.consultPath || "content/consult.json"
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
    var isLabor = name === "labor";
    el.panelLabor.classList.toggle("hidden", !isLabor);
    el.panelConsult.classList.toggle("hidden", isLabor);
    document.querySelectorAll(".admin-tab").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-tab") === name);
    });
    if (!isLabor && !consultLoaded) loadConsult();
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

  el.loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var pass = (el.loginPass.value || "").trim();
    if (pass === getExpectedPassword()) {
      setLoggedIn(true);
      el.loginPass.value = "";
      showEditor();
    } else {
      showStatus(el.loginStatus, "密码不正确。请检查 admin/config.js 中的 ADMIN_PASSWORD。", "err");
    }
  });

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

  if (isLoggedIn()) showEditor();
  else showLogin();
})();
