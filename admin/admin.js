/* chinaPTE admin — edit labor.json via GitHub Contents API */
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
    rememberToken: document.getElementById("rememberToken")
  };

  var fields = [
    "title",
    "subtitle",
    "intro",
    "whoFor",
    "whatWeOffer",
    "disclaimer",
    "ctaText",
    "ctaHref",
    "wechatPlaceholder"
  ];

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
    return window.ADMIN_GITHUB || {
      owner: "chinaptepte-commits",
      repo: "chinaPTE",
      branch: "main",
      path: "content/labor.json"
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

  function fillForm(data) {
    document.getElementById("f_title").value = data.title || "";
    document.getElementById("f_subtitle").value = data.subtitle || "";
    document.getElementById("f_intro").value = data.intro || "";
    document.getElementById("f_whoFor").value = arrayToLines(data.whoFor);
    document.getElementById("f_whatWeOffer").value = arrayToLines(data.whatWeOffer);
    document.getElementById("f_disclaimer").value = data.disclaimer || "";
    document.getElementById("f_ctaText").value = data.ctaText || "";
    document.getElementById("f_ctaHref").value = data.ctaHref || "consult.html";
    document.getElementById("f_wechatPlaceholder").value =
      data.wechatPlaceholder || "";
    document.getElementById("f_updatedAt").value = data.updatedAt || "";
  }

  function readForm() {
    return {
      title: document.getElementById("f_title").value.trim(),
      subtitle: document.getElementById("f_subtitle").value.trim(),
      intro: document.getElementById("f_intro").value.trim(),
      whoFor: linesToArray(document.getElementById("f_whoFor").value),
      whatWeOffer: linesToArray(document.getElementById("f_whatWeOffer").value),
      disclaimer: document.getElementById("f_disclaimer").value.trim(),
      ctaText: document.getElementById("f_ctaText").value.trim(),
      ctaHref: document.getElementById("f_ctaHref").value.trim() || "consult.html",
      wechatPlaceholder: document
        .getElementById("f_wechatPlaceholder")
        .value.trim(),
      updatedAt: new Date().toISOString()
    };
  }

  function prettyJson(obj) {
    return JSON.stringify(obj, null, 2) + "\n";
  }

  async function loadFromSite() {
    clearStatus(el.status);
    showStatus(el.status, "正在加载 content/labor.json …", "info");
    try {
      var res = await fetch("../content/labor.json?t=" + Date.now(), {
        cache: "no-store"
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      var data = await res.json();
      fillForm(data);
      showStatus(el.status, "已加载当前线上 / 站点内容。可编辑后保存。", "ok");
    } catch (err) {
      showStatus(
        el.status,
        "加载失败：" +
          (err && err.message ? err.message : err) +
          "。请用 http 打开本页（勿用 file://），或先本地下载后再改。",
        "err"
      );
    }
  }

  function downloadJson() {
    var data = readForm();
    var blob = new Blob([prettyJson(data)], {
      type: "application/json;charset=utf-8"
    });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "labor.json";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 500);
    showStatus(
      el.status,
      "已下载 labor.json。可手动上传到仓库 content/labor.json。",
      "ok"
    );
  }

  async function saveToGithub() {
    var cfg = getGithubCfg();
    var tokenFromInput = (el.tokenInput.value || "").trim();
    var token = tokenFromInput || getStoredToken();
    if (!token) {
      showStatus(
        el.status,
        "请先粘贴 GitHub Personal Access Token（classic，勾选 repo 权限）。",
        "err"
      );
      el.tokenInput.focus();
      return;
    }

    if (tokenFromInput) {
      storeToken(tokenFromInput, !!(el.rememberToken && el.rememberToken.checked));
    }

    var data = readForm();
    var bodyText = prettyJson(data);
    var apiBase =
      "https://api.github.com/repos/" +
      cfg.owner +
      "/" +
      cfg.repo +
      "/contents/" +
      cfg.path;

    el.saveBtn.disabled = true;
    showStatus(el.status, "正在读取文件 SHA…", "info");

    try {
      var getRes = await fetch(apiBase + "?ref=" + encodeURIComponent(cfg.branch), {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: "Bearer " + token,
          "X-GitHub-Api-Version": "2022-11-28"
        }
      });

      if (getRes.status === 401 || getRes.status === 403) {
        throw new Error("Token 无效或权限不足（需要 classic PAT + repo 权限）");
      }
      if (!getRes.ok) {
        var getErr = await getRes.text();
        throw new Error("读取失败 HTTP " + getRes.status + " " + getErr.slice(0, 200));
      }

      var meta = await getRes.json();
      var sha = meta.sha;
      if (!sha) throw new Error("未拿到文件 SHA");

      showStatus(el.status, "正在写入 GitHub…", "info");

      var putRes = await fetch(apiBase, {
        method: "PUT",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          "X-GitHub-Api-Version": "2022-11-28"
        },
        body: JSON.stringify({
          message: "Update labor.json via chinaPTE admin",
          content: utf8ToBase64(bodyText),
          sha: sha,
          branch: cfg.branch
        })
      });

      if (!putRes.ok) {
        var putErr = await putRes.text();
        throw new Error("保存失败 HTTP " + putRes.status + " " + putErr.slice(0, 240));
      }

      fillForm(data);
      showStatus(
        el.status,
        "保存成功！GitHub Pages 通常 1–2 分钟后刷新。可打开 labor.html 查看。",
        "ok"
      );
    } catch (err) {
      showStatus(
        el.status,
        "保存失败：" + (err && err.message ? err.message : err),
        "err"
      );
    } finally {
      el.saveBtn.disabled = false;
    }
  }

  function showEditor() {
    el.loginPanel.classList.add("hidden");
    el.editorPanel.classList.remove("hidden");
    var t = getStoredToken();
    if (t) el.tokenInput.value = t;
    loadFromSite();
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
    loadFromSite();
  });

  el.downloadBtn.addEventListener("click", function () {
    downloadJson();
  });

  el.saveBtn.addEventListener("click", function () {
    saveToGithub();
  });

  el.clearTokenBtn.addEventListener("click", function () {
    storeToken("", false);
    el.tokenInput.value = "";
    showStatus(el.status, "已清除本机保存的 Token（session / localStorage）。", "info");
  });

  el.form.addEventListener("submit", function (e) {
    e.preventDefault();
    saveToGithub();
  });

  // boot
  if (isLoggedIn()) showEditor();
  else showLogin();

  // silence unused lint for fields list reference
  void fields;
})();
