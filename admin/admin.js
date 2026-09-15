/* chinaPTE admin — labor.json + vocab.json via GitHub Contents API */
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
    panelVocab: document.getElementById("panelVocab"),
    vocabStatus: document.getElementById("vocabStatus"),
    vocabSearch: document.getElementById("vocabSearch"),
    vocabList: document.getElementById("vocabList"),
    vocabCount: document.getElementById("vocabCount"),
    vocabForm: document.getElementById("vocabForm"),
    btnVocabReload: document.getElementById("btnVocabReload"),
    btnVocabAdd: document.getElementById("btnVocabAdd"),
    btnVocabSave: document.getElementById("btnVocabSave"),
    btnVocabDownload: document.getElementById("btnVocabDownload"),
    btnVocabApply: document.getElementById("btnVocabApply"),
    btnVocabDelete: document.getElementById("btnVocabDelete")
  };

  var vocabState = {
    items: [],
    filtered: [],
    selectedId: null,
    dirty: false
  };

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
      vocabPath: g.vocabPath || "content/vocab.json",
      vocabJsPath: g.vocabJsPath || "data-vocab.js"
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
    var token = resolveToken();
    if (!token) {
      showStatus(
        el.status,
        "请先粘贴 GitHub Personal Access Token（classic，勾选 repo 权限）。",
        "err"
      );
      el.tokenInput.focus();
      return;
    }

    var data = readForm();
    var bodyText = prettyJson(data);

    el.saveBtn.disabled = true;
    showStatus(el.status, "正在读取文件 SHA…", "info");

    try {
      var meta = await githubGet(cfg.laborPath, token, cfg.branch);
      if (!meta.sha) throw new Error("未拿到文件 SHA");
      showStatus(el.status, "正在写入 GitHub…", "info");
      await githubPut(
        cfg.laborPath,
        token,
        bodyText,
        "Update labor.json via chinaPTE admin",
        meta.sha
      );
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

  /* ---------- vocab ---------- */

  function spellingOf(word) {
    return String(word || "")
      .split("")
      .filter(function (c) {
        return /[a-zA-Z]/.test(c);
      })
      .map(function (c) {
        return c.toUpperCase();
      })
      .join("-");
  }

  function reindexVocab() {
    vocabState.items.forEach(function (it, i) {
      it.id = i + 1;
    });
  }

  function updateVocabCount() {
    if (!el.vocabCount) return;
    el.vocabCount.textContent =
      "显示 " +
      vocabState.filtered.length +
      " / 共 " +
      vocabState.items.length +
      " 词" +
      (vocabState.dirty ? " · 未保存" : "");
  }

  function fillVocabForm(item) {
    if (!item) return;
    document.getElementById("v_id").value = item.id || "";
    document.getElementById("v_word").value = item.word || "";
    document.getElementById("v_phonetic").value = item.phonetic || "";
    document.getElementById("v_pos").value = item.pos || "";
    document.getElementById("v_spelling").value = item.spelling || "";
    document.getElementById("v_gloss").value = item.gloss || "";
    document.getElementById("v_tip").value = item.tip || "";
    document.getElementById("v_example").value = item.example || "";
    document.getElementById("v_exampleZh").value = item.exampleZh || "";
    document.getElementById("v_tags").value = (item.tags || []).join(",");
    document.getElementById("v_tier").value = item.tier || "core";
  }

  function readVocabForm() {
    var tags = String(document.getElementById("v_tags").value || "")
      .split(/[,，\s]+/)
      .map(function (s) {
        return s.trim();
      })
      .filter(Boolean);
    var word = document.getElementById("v_word").value.trim();
    var spelling = document.getElementById("v_spelling").value.trim() || spellingOf(word);
    var phonetic = document.getElementById("v_phonetic").value.trim();
    if (phonetic && phonetic.charAt(0) !== "/") phonetic = "/" + phonetic;
    if (phonetic && phonetic.charAt(phonetic.length - 1) !== "/") phonetic += "/";
    return {
      id: Number(document.getElementById("v_id").value) || 0,
      word: word,
      spelling: spelling,
      phonetic: phonetic || "/" + word + "/",
      pos: document.getElementById("v_pos").value.trim() || "n. 名词",
      gloss: document.getElementById("v_gloss").value.trim(),
      tip: document.getElementById("v_tip").value.trim(),
      example: document.getElementById("v_example").value.trim(),
      exampleZh: document.getElementById("v_exampleZh").value.trim(),
      tags: tags.length ? tags : ["academic"],
      tier: document.getElementById("v_tier").value || "core"
    };
  }

  function renderVocabList() {
    var q = (el.vocabSearch.value || "").trim().toLowerCase();
    vocabState.filtered = vocabState.items.filter(function (it) {
      if (!q) return true;
      return (
        String(it.id).indexOf(q) >= 0 ||
        String(it.word || "")
          .toLowerCase()
          .indexOf(q) >= 0 ||
        String(it.gloss || "").toLowerCase().indexOf(q) >= 0 ||
        String(it.phonetic || "").toLowerCase().indexOf(q) >= 0
      );
    });
    var html = "";
    var maxShow = 400;
    var slice = vocabState.filtered.slice(0, maxShow);
    slice.forEach(function (it) {
      var active = it.id === vocabState.selectedId ? " is-active" : "";
      html +=
        '<button type="button" class="vocab-list-item' +
        active +
        '" data-id="' +
        it.id +
        '">' +
        '<div class="vl-word">' +
        escapeHtml(it.word) +
        "</div>" +
        '<div class="vl-meta">#' +
        it.id +
        " · " +
        escapeHtml(it.phonetic || "") +
        " · " +
        escapeHtml(it.gloss || "") +
        "</div>" +
        "</button>";
    });
    if (vocabState.filtered.length > maxShow) {
      html +=
        '<div class="vl-meta" style="padding:10px">仅显示前 ' +
        maxShow +
        " 条，请缩小搜索范围。</div>";
    }
    el.vocabList.innerHTML = html || '<div class="vl-meta" style="padding:12px">无匹配词条</div>';
    updateVocabCount();
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function selectVocab(id) {
    var item = vocabState.items.find(function (it) {
      return it.id === id;
    });
    if (!item) return;
    vocabState.selectedId = id;
    fillVocabForm(item);
    renderVocabList();
  }

  function applyVocabForm() {
    var data = readVocabForm();
    if (!data.word) {
      showStatus(el.vocabStatus, "英文单词不能为空。", "err");
      return;
    }
    var idx = vocabState.items.findIndex(function (it) {
      return it.id === vocabState.selectedId;
    });
    if (idx < 0) {
      showStatus(el.vocabStatus, "请先在左侧选择词条，或点「新增词条」。", "err");
      return;
    }
    var dup = vocabState.items.find(function (it, i) {
      return i !== idx && String(it.word).toLowerCase() === data.word.toLowerCase();
    });
    if (dup) {
      showStatus(el.vocabStatus, "已存在同名词条 #" + dup.id + "：" + dup.word, "err");
      return;
    }
    data.id = vocabState.items[idx].id;
    vocabState.items[idx] = data;
    vocabState.dirty = true;
    vocabState.selectedId = data.id;
    renderVocabList();
    showStatus(el.vocabStatus, "已应用到本地列表（尚未保存到 GitHub）。", "ok");
  }

  function addVocab() {
    var word = window.prompt("新词英文（小写 headword）", "");
    if (word == null) return;
    word = String(word).trim().toLowerCase();
    if (!word) return;
    var dup = vocabState.items.find(function (it) {
      return String(it.word).toLowerCase() === word;
    });
    if (dup) {
      showStatus(el.vocabStatus, "已存在：" + dup.word + " (#" + dup.id + ")", "err");
      selectVocab(dup.id);
      return;
    }
    var item = {
      id: vocabState.items.length + 1,
      word: word,
      spelling: spellingOf(word),
      phonetic: "/" + word + "/",
      pos: "n. 名词",
      gloss: "",
      tip: "the " + word,
      example: "Check the " + word + " in the text.",
      exampleZh: "核对文本中的该词。",
      tags: ["academic"],
      tier: "high"
    };
    vocabState.items.push(item);
    reindexVocab();
    vocabState.dirty = true;
    vocabState.selectedId = item.id;
    fillVocabForm(item);
    if (el.vocabSearch) el.vocabSearch.value = word;
    renderVocabList();
    showStatus(el.vocabStatus, "已新增 " + word + "，请补全释义后「应用到列表」再保存。", "info");
  }

  function deleteVocab() {
    if (vocabState.selectedId == null) {
      showStatus(el.vocabStatus, "请先选择要删除的词条。", "err");
      return;
    }
    var item = vocabState.items.find(function (it) {
      return it.id === vocabState.selectedId;
    });
    if (!item) return;
    if (!window.confirm("确认删除「" + item.word + "」(#" + item.id + ")？")) return;
    vocabState.items = vocabState.items.filter(function (it) {
      return it.id !== item.id;
    });
    reindexVocab();
    vocabState.dirty = true;
    vocabState.selectedId = vocabState.items.length ? vocabState.items[0].id : null;
    if (vocabState.selectedId) {
      fillVocabForm(
        vocabState.items.find(function (it) {
          return it.id === vocabState.selectedId;
        })
      );
    }
    renderVocabList();
    showStatus(el.vocabStatus, "已删除（本地）。记得保存到 GitHub。", "ok");
  }

  async function loadVocab() {
    clearStatus(el.vocabStatus);
    showStatus(el.vocabStatus, "正在加载 content/vocab.json …", "info");
    try {
      var res = await fetch("../content/vocab.json?t=" + Date.now(), {
        cache: "no-store"
      });
      if (!res.ok) throw new Error("HTTP " + res.status);
      var data = await res.json();
      if (!Array.isArray(data)) throw new Error("vocab.json 不是数组");
      vocabState.items = data.map(function (it, i) {
        return Object.assign({}, it, { id: it.id || i + 1 });
      });
      vocabState.dirty = false;
      vocabState.selectedId = vocabState.items.length ? vocabState.items[0].id : null;
      if (vocabState.selectedId) {
        fillVocabForm(vocabState.items[0]);
      }
      renderVocabList();
      showStatus(
        el.vocabStatus,
        "已加载 " + vocabState.items.length + " 词。可搜索 / 编辑后保存。",
        "ok"
      );
    } catch (err) {
      showStatus(
        el.vocabStatus,
        "加载失败：" + (err && err.message ? err.message : err),
        "err"
      );
    }
  }

  function buildVocabJs(items) {
    var header =
      "/**\n" +
      " * chinaPTE · PTE Academic 高频核心词\n" +
      " * Total: " +
      items.length +
      "\n" +
      " * Domains: academic research, campus/admin (WFD/RS), environment/society/economy, dictation verbs/adverbs\n" +
      " * Fields: word, spelling, phonetic (IPA /slashes/), pos (e.g. n. 名词), gloss, tip, example, exampleZh, tags, tier, id\n" +
      " * Admin source of truth: content/vocab.json (keep in sync with this file)\n" +
      " */\n" +
      "(function (global) {\n" +
      '  "use strict";\n' +
      "  var VOCAB_BANK = \n";
    var footer =
      "\n;\n  global.VOCAB_BANK = VOCAB_BANK;\n})(typeof window !== \"undefined\" ? window : globalThis);\n";
    return header + JSON.stringify(items, null, 2) + footer;
  }

  function downloadVocab() {
    var blob = new Blob([prettyJson(vocabState.items)], {
      type: "application/json;charset=utf-8"
    });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "vocab.json";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
      URL.revokeObjectURL(a.href);
      a.remove();
    }, 500);
    showStatus(el.vocabStatus, "已下载 vocab.json。", "ok");
  }

  async function saveVocabToGithub() {
    var cfg = getGithubCfg();
    var token = resolveToken();
    if (!token) {
      showStatus(el.vocabStatus, "请先粘贴 GitHub Personal Access Token。", "err");
      el.tokenInput.focus();
      return;
    }
    if (!vocabState.items.length) {
      showStatus(el.vocabStatus, "词库为空，取消保存。", "err");
      return;
    }
    // merge current form into selected item silently
    if (vocabState.selectedId != null) {
      var draft = readVocabForm();
      var ix = vocabState.items.findIndex(function (it) { return it.id === vocabState.selectedId; });
      if (ix >= 0 && draft.word) {
        draft.id = vocabState.items[ix].id;
        vocabState.items[ix] = draft;
      }
    }
    reindexVocab();
    el.btnVocabSave.disabled = true;
    showStatus(el.vocabStatus, "正在保存 vocab.json …", "info");
    try {
      var jsonText = prettyJson(vocabState.items);
      var jsText = buildVocabJs(vocabState.items);
      var metaJson = await githubGet(cfg.vocabPath, token, cfg.branch);
      await githubPut(
        cfg.vocabPath,
        token,
        jsonText,
        "Update vocab.json via chinaPTE admin (" + vocabState.items.length + " words)",
        metaJson.sha || undefined
      );
      showStatus(el.vocabStatus, "vocab.json 已写。正在同步 data-vocab.js …", "info");
      var metaJs = await githubGet(cfg.vocabJsPath, token, cfg.branch);
      await githubPut(
        cfg.vocabJsPath,
        token,
        jsText,
        "Sync data-vocab.js with vocab.json (" + vocabState.items.length + " words)",
        metaJs.sha || undefined
      );
      vocabState.dirty = false;
      updateVocabCount();
      showStatus(
        el.vocabStatus,
        "保存成功！共 " +
          vocabState.items.length +
          " 词。Pages 约 1–2 分钟后刷新 vocab.html。",
        "ok"
      );
    } catch (err) {
      showStatus(
        el.vocabStatus,
        "保存失败：" + (err && err.message ? err.message : err),
        "err"
      );
    } finally {
      el.btnVocabSave.disabled = false;
    }
  }

  function switchTab(name) {
    var isLabor = name === "labor";
    el.panelLabor.classList.toggle("hidden", !isLabor);
    el.panelVocab.classList.toggle("hidden", isLabor);
    document.querySelectorAll(".admin-tab").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-tab") === name);
    });
    if (!isLabor && !vocabState.items.length) loadVocab();
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
    showStatus(el.vocabStatus, "已清除本机 Token。", "info");
  });
  el.form.addEventListener("submit", function (e) {
    e.preventDefault();
    saveToGithub();
  });

  document.querySelectorAll(".admin-tab").forEach(function (btn) {
    btn.addEventListener("click", function () {
      switchTab(btn.getAttribute("data-tab") || "labor");
    });
  });

  el.vocabList.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-id]");
    if (!btn) return;
    selectVocab(Number(btn.getAttribute("data-id")));
  });
  el.vocabSearch.addEventListener("input", function () {
    renderVocabList();
  });
  el.btnVocabReload.addEventListener("click", function () {
    loadVocab();
  });
  el.btnVocabAdd.addEventListener("click", addVocab);
  el.btnVocabSave.addEventListener("click", saveVocabToGithub);
  el.btnVocabDownload.addEventListener("click", downloadVocab);
  el.btnVocabApply.addEventListener("click", applyVocabForm);
  el.btnVocabDelete.addEventListener("click", deleteVocab);
  el.vocabForm.addEventListener("submit", function (e) {
    e.preventDefault();
    applyVocabForm();
  });

  if (isLoggedIn()) showEditor();
  else showLogin();
})();
