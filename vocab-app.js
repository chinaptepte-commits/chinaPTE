/**
 * chinaPTE · 单词库 / 单词随身听
 * Flow: EN word → spelling → Chinese gloss → example → exampleZh → next
 * Does NOT speak tip fields (memory tips shown in UI only).
 */
(function (global) {
  "use strict";

  var PREFIX = "chinaPTE_vocab";
  var STORAGE_TODAY = PREFIX + "_today";
  var STORAGE_RESUME = PREFIX + "_resume";
  var STORAGE_MASTERED = PREFIX + "_mastered";
  var STORAGE_NOTEBOOK = PREFIX + "_notebook";

  function $(id) { return document.getElementById(id); }

  function todayKey() {
    var d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function loadSet(key) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return {};
      var arr = JSON.parse(raw);
      var o = {};
      (arr || []).forEach(function (id) { o[id] = true; });
      return o;
    } catch (e) { return {}; }
  }
  function saveSet(key, obj) {
    try {
      localStorage.setItem(key, JSON.stringify(Object.keys(obj).filter(function (k) { return obj[k]; }).map(Number)));
    } catch (e) {}
  }

  function loadToday() {
    try {
      var raw = localStorage.getItem(STORAGE_TODAY);
      if (!raw) return 0;
      var data = JSON.parse(raw);
      return data.date === todayKey() ? (data.count || 0) : 0;
    } catch (e) { return 0; }
  }
  function bumpToday() {
    var c = loadToday() + 1;
    try { localStorage.setItem(STORAGE_TODAY, JSON.stringify({ date: todayKey(), count: c })); } catch (e) {}
    if (els.todayCount) els.todayCount.textContent = String(c);
  }

  var allItems = (global.VOCAB_BANK || []).slice();
  var mastered = loadSet(STORAGE_MASTERED);
  var notebook = loadSet(STORAGE_NOTEBOOK);
  var items = allItems.slice();

  var state = {
    index: 0,
    rate: 1,
    exampleOn: true,
    spellOn: true,
    playing: false,
    playAll: false,
    paused: false,
    mode: "all", // all | notebook | unmastered
    filterQuery: "",
    enVoice: null,
    zhVoice: null,
  };

  var els = {};
  var playToken = 0;
  var pauseTimer = null;

  function current() { return items[state.index] || null; }

  function pickVoices() {
    if (!window.speechSynthesis) return;
    var voices = speechSynthesis.getVoices();
    if (!voices.length) return;
    function scoreEn(v) {
      var lang = (v.lang || "").replace(/_/g, "-").toLowerCase();
      var name = (v.name || "").toLowerCase();
      if (!/^en\b/.test(lang) && !/^en-/.test(lang)) return -1;
      var s = 0;
      if (lang.indexOf("en-gb") === 0 || lang.indexOf("en-au") === 0) s += 100;
      else if (lang.indexOf("en-us") === 0) s += 35;
      else s += 15;
      if (/google\s*uk|uk\s*english|english\s*uk|british/.test(name)) s += 55;
      if (/australian|en-au|google\s*au|australia/.test(name)) s += 50;
      if (v.localService) s += 3;
      return s;
    }
    var bestEn = null, bestScore = -1, i, sc;
    for (i = 0; i < voices.length; i++) {
      sc = scoreEn(voices[i]);
      if (sc > bestScore) { bestScore = sc; bestEn = voices[i]; }
    }
    if (!bestEn) {
      bestEn = voices.find(function (v) { return /^en(-|_)US/i.test(v.lang); })
        || voices.find(function (v) { return /^en/i.test(v.lang); }) || null;
    }
    state.enVoice = bestEn;
    state.zhVoice = voices.find(function (v) { return /zh(-|_)CN|cmn/i.test(v.lang); })
      || voices.find(function (v) { return /zh|cmn/i.test(v.lang); }) || null;
  }

  function enSpeakLang() {
    return (state.enVoice && state.enVoice.lang) || "en-GB";
  }

  function cancelSpeech() {
    if (pauseTimer) { clearTimeout(pauseTimer); pauseTimer = null; }
    if (window.speechSynthesis) speechSynthesis.cancel();
  }

  function speak(text, opts) {
    return new Promise(function (resolve, reject) {
      if (!window.speechSynthesis) { reject(new Error("no tts")); return; }
      var u = new SpeechSynthesisUtterance(text);
      u.lang = opts.lang || "en-US";
      u.rate = opts.rate != null ? opts.rate : state.rate;
      u.pitch = 1;
      if (opts.voice) u.voice = opts.voice;
      u.onend = function () { resolve(); };
      u.onerror = function (e) {
        if (e.error === "interrupted" || e.error === "canceled") resolve({ interrupted: true });
        else reject(e);
      };
      speechSynthesis.cancel();
      setTimeout(function () {
        if (!state.playing && !opts.force) { resolve({ interrupted: true }); return; }
        speechSynthesis.speak(u);
      }, 40);
    });
  }

  function wait(ms) {
    return new Promise(function (resolve) {
      pauseTimer = setTimeout(function () { pauseTimer = null; resolve(); }, ms);
    });
  }

  function lettersOf(spelling) {
    if (!spelling) return "";
    if (spelling.indexOf("-") >= 0) return spelling.split("-").join(" ");
    return spelling.split("").join(" ");
  }

  function newToken() { playToken += 1; return playToken; }
  function isActive(token) { return token === playToken && state.playing; }

  function setPhase(label) {
    if (els.phaseText) els.phaseText.textContent = label;
    var idle = label === "准备就绪" || label === "已停止" || label === "已暂停" || label === "本条完成" || label === "全部完成";
    if (els.statusBadge) els.statusBadge.classList.toggle("is-idle", idle);
    if (els.statusText) els.statusText.textContent = idle ? "待机" : "播放中";
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function applyFilter() {
    var q = (state.filterQuery || "").trim().toLowerCase();
    items = allItems.filter(function (it) {
      if (state.mode === "notebook" && !notebook[it.id]) return false;
      if (state.mode === "unmastered" && mastered[it.id]) return false;
      if (!q) return true;
      var hay = (it.word + " " + (it.gloss || "") + " " + (it.example || "") + " " + (it.exampleZh || "") + " " + (it.tags || []).join(" ")).toLowerCase();
      return hay.indexOf(q) >= 0;
    });
    if (state.index >= items.length) state.index = Math.max(0, items.length - 1);
  }

  function saveResume() {
    try {
      var it = current();
      localStorage.setItem(STORAGE_RESUME, JSON.stringify({
        id: it ? it.id : null,
        index: state.index,
        filter: state.filterQuery,
        mode: state.mode,
      }));
    } catch (e) {}
  }

  function loadResume() {
    try {
      var raw = localStorage.getItem(STORAGE_RESUME);
      if (!raw) return;
      var data = JSON.parse(raw);
      if (data.mode) state.mode = data.mode;
      if (data.filter) {
        state.filterQuery = data.filter;
        if (els.search) els.search.value = data.filter;
      }
      applyFilter();
      if (typeof data.index === "number" && data.index >= 0 && data.index < items.length) {
        state.index = data.index;
      } else if (data.id != null) {
        var idx = items.findIndex(function (it) { return it.id === data.id; });
        if (idx >= 0) state.index = idx;
      }
    } catch (e) {}
  }

  function renderList() {
    if (!els.wordList) return;
    var html = "";
    var max = Math.min(items.length, 80);
    for (var i = 0; i < max; i++) {
      var it = items[i];
      var cls = "vocab-row" + (i === state.index ? " is-active" : "") + (mastered[it.id] ? " is-mastered" : "") + (notebook[it.id] ? " is-note" : "");
      html += '<button type="button" class="' + cls + '" data-idx="' + i + '">' +
        '<span class="vr-word">' + escapeHtml(it.word) + '</span>' +
        '<span class="vr-gloss">' + escapeHtml(it.gloss || "") + '</span>' +
        (it.phonetic ? '<span class="vr-ph">' + escapeHtml(it.phonetic) + '</span>' : "") +
        "</button>";
    }
    if (items.length > max) html += '<p class="privacy">…共 ' + items.length + ' 词，输入搜索缩小范围</p>';
    els.wordList.innerHTML = html;
    els.wordList.querySelectorAll(".vocab-row").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.index = Number(btn.dataset.idx);
        renderItem();
        stopAll();
      });
    });
  }

  function renderItem() {
    var it = current();
    if (!it) {
      if (els.sentenceEn) els.sentenceEn.textContent = items.length ? "无匹配" : "暂无数据";
      if (els.sentenceZh) els.sentenceZh.textContent = "";
      if (els.progressText) els.progressText.textContent = "0 / " + allItems.length;
      renderList();
      return;
    }
    var n = items.length;
    var i = state.index + 1;
    if (els.progressText) els.progressText.textContent = i + " / " + n + (state.filterQuery || state.mode !== "all" ? "（筛选）" : "");
    if (els.progressFill) els.progressFill.style.width = ((i / Math.max(n, 1)) * 100) + "%";
    if (els.sentenceEn) {
      els.sentenceEn.innerHTML = escapeHtml(it.word) +
        (it.phonetic ? ' <span style="color:var(--text-muted);font-size:0.85rem">' + escapeHtml(it.phonetic) + "</span>" : "");
    }
    var zhParts = [it.gloss || ""];
    if (it.tip) zhParts.push(it.tip);
    if (state.exampleOn && it.example) zhParts.push(it.example);
    if (state.exampleOn && it.exampleZh) zhParts.push(it.exampleZh);
    if (els.sentenceZh) els.sentenceZh.textContent = zhParts.filter(Boolean).join(" · ");
    if (els.btnMastered) {
      els.btnMastered.classList.toggle("is-on", !!mastered[it.id]);
      els.btnMastered.setAttribute("aria-pressed", mastered[it.id] ? "true" : "false");
    }
    if (els.btnNotebook) {
      els.btnNotebook.classList.toggle("is-on", !!notebook[it.id]);
      els.btnNotebook.setAttribute("aria-pressed", notebook[it.id] ? "true" : "false");
    }
    if (els.metaStats) {
      els.metaStats.textContent = "已掌握 " + Object.keys(mastered).length + " · 生词本 " + Object.keys(notebook).length + " · 词库 " + allItems.length;
    }
    renderList();
    saveResume();
  }

  function updateTransport() {
    var playing = state.playing && !state.paused;
    if (els.playPauseIcon) els.playPauseIcon.textContent = playing ? "⏸" : "▶";
    if (els.playPauseLabel) els.playPauseLabel.textContent = playing ? "暂停" : "播放";
    if (els.playAll) {
      if (state.playAll && state.playing) {
        els.playAll.classList.add("is-playing");
        if (els.playAllIcon) els.playAllIcon.textContent = "⏸";
        if (els.playAllLabel) els.playAllLabel.textContent = "随身听播放中…";
      } else {
        els.playAll.classList.remove("is-playing");
        if (els.playAllIcon) els.playAllIcon.textContent = "▶";
        if (els.playAllLabel) els.playAllLabel.textContent = "单词随身听 · Play All";
      }
    }
  }

  async function playCurrent(opts) {
    var token = newToken();
    var continueAll = opts && opts.continueAll;
    state.playing = true;
    state.paused = false;
    if (continueAll) state.playAll = true;
    updateTransport();
    var it = current();
    if (!it) { stopAll(); return; }
    try {
      setPhase("单词");
      var r1 = await speak(it.word, { lang: enSpeakLang(), rate: Math.max(0.7, state.rate * 0.88), voice: state.enVoice });
      if (!isActive(token) || (r1 && r1.interrupted)) return;
      await wait(280);
      if (!isActive(token)) return;

      if (state.spellOn && it.spelling) {
        setPhase("拼读");
        var r2 = await speak(lettersOf(it.spelling), { lang: enSpeakLang(), rate: Math.max(0.55, state.rate * 0.72), voice: state.enVoice });
        if (!isActive(token) || (r2 && r2.interrupted)) return;
        await wait(280);
        if (!isActive(token)) return;
      }

      if (it.gloss) {
        setPhase("释义");
        // Speak gloss only — never tip
        var r3 = await speak(it.gloss, { lang: "zh-CN", rate: state.rate, voice: state.zhVoice });
        if (!isActive(token) || (r3 && r3.interrupted)) return;
        await wait(320);
        if (!isActive(token)) return;
      }

      if (state.exampleOn && it.example) {
        setPhase("例句");
        var r4 = await speak(it.example, { lang: enSpeakLang(), rate: Math.max(0.7, state.rate * 0.88), voice: state.enVoice });
        if (!isActive(token) || (r4 && r4.interrupted)) return;
        await wait(250);
        if (!isActive(token)) return;
        if (it.exampleZh) {
          setPhase("例句中文");
          var r5 = await speak(it.exampleZh, { lang: "zh-CN", rate: state.rate, voice: state.zhVoice });
          if (!isActive(token) || (r5 && r5.interrupted)) return;
          await wait(350);
        }
      }

      bumpToday();
      saveResume();

      if (state.playAll && isActive(token)) {
        if (state.index < items.length - 1) {
          state.index += 1;
          renderItem();
          await wait(600);
          if (!isActive(token)) return;
          playCurrent({ continueAll: true });
          return;
        }
        state.playAll = false;
        state.playing = false;
        setPhase("全部完成");
        updateTransport();
        return;
      }
      state.playing = false;
      state.playAll = false;
      setPhase("本条完成");
      updateTransport();
    } catch (err) {
      console.warn(err);
      state.playing = false;
      state.playAll = false;
      setPhase("播放中断");
      updateTransport();
    }
  }

  function stopAll() {
    newToken();
    state.playing = false;
    state.paused = false;
    state.playAll = false;
    cancelSpeech();
    setPhase("已停止");
    updateTransport();
  }

  function pausePlayback() {
    if (!state.playing) return;
    state.paused = true;
    state.playing = false;
    newToken();
    cancelSpeech();
    setPhase("已暂停");
    updateTransport();
  }

  function bind() {
    els = {
      playAll: $("btnPlayAll"),
      playAllIcon: $("playAllIcon"),
      playAllLabel: $("playAllLabel"),
      prev: $("btnPrev"),
      next: $("btnNext"),
      playPause: $("btnPlayPause"),
      playPauseIcon: $("playPauseIcon"),
      playPauseLabel: $("playPauseLabel"),
      replay: $("btnReplay"),
      stop: $("btnStop"),
      sentenceEn: $("sentenceEn"),
      sentenceZh: $("sentenceZh"),
      progressText: $("progressText"),
      progressFill: $("progressFill"),
      phaseText: $("phaseText"),
      statusBadge: $("statusBadge"),
      statusText: $("statusText"),
      todayCount: $("todayCount"),
      speechWarn: $("speechWarn"),
      search: $("itemSearch"),
      clearSearch: $("btnClearSearch"),
      wordList: $("wordList"),
      btnMastered: $("btnMastered"),
      btnNotebook: $("btnNotebook"),
      btnToggleExample: $("btnToggleExample"),
      btnToggleSpell: $("btnToggleSpell"),
      metaStats: $("metaStats"),
      modeBtns: document.querySelectorAll("[data-vocab-mode]"),
      speedBtns: document.querySelectorAll(".speed-btn"),
    };

    if (!window.speechSynthesis && els.speechWarn) els.speechWarn.style.display = "block";
    pickVoices();
    if (window.speechSynthesis) {
      speechSynthesis.onvoiceschanged = pickVoices;
    }

    if (els.todayCount) els.todayCount.textContent = String(loadToday());

    loadResume();
    document.querySelectorAll("[data-vocab-mode]").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-vocab-mode") === state.mode);
    });
    applyFilter();
    renderItem();
    setPhase("准备就绪");

    if (els.playAll) els.playAll.addEventListener("click", function () {
      if (state.playAll && state.playing) { pausePlayback(); return; }
      cancelSpeech();
      state.playAll = true;
      playCurrent({ continueAll: true });
    });
    if (els.playPause) els.playPause.addEventListener("click", function () {
      if (state.playing && !state.paused) { pausePlayback(); return; }
      var was = state.playAll;
      cancelSpeech();
      playCurrent({ continueAll: was });
    });
    if (els.replay) els.replay.addEventListener("click", function () {
      cancelSpeech();
      playCurrent({ continueAll: state.playAll });
    });
    if (els.stop) els.stop.addEventListener("click", stopAll);
    if (els.prev) els.prev.addEventListener("click", function () {
      if (state.index > 0) { state.index -= 1; renderItem(); if (state.playing) { cancelSpeech(); playCurrent({ continueAll: state.playAll }); } }
    });
    if (els.next) els.next.addEventListener("click", function () {
      if (state.index < items.length - 1) { state.index += 1; renderItem(); if (state.playing) { cancelSpeech(); playCurrent({ continueAll: state.playAll }); } }
    });

    els.speedBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.rate = Number(btn.getAttribute("data-speed")) || 1;
        els.speedBtns.forEach(function (b) { b.classList.toggle("is-active", b === btn); });
      });
    });

    if (els.btnToggleExample) {
      els.btnToggleExample.classList.add("is-on");
      els.btnToggleExample.addEventListener("click", function () {
        state.exampleOn = !state.exampleOn;
        els.btnToggleExample.classList.toggle("is-on", state.exampleOn);
        els.btnToggleExample.setAttribute("aria-pressed", state.exampleOn ? "true" : "false");
        renderItem();
      });
    }
    if (els.btnToggleSpell) {
      els.btnToggleSpell.classList.add("is-on");
      els.btnToggleSpell.addEventListener("click", function () {
        state.spellOn = !state.spellOn;
        els.btnToggleSpell.classList.toggle("is-on", state.spellOn);
        els.btnToggleSpell.setAttribute("aria-pressed", state.spellOn ? "true" : "false");
      });
    }

    if (els.btnMastered) els.btnMastered.addEventListener("click", function () {
      var it = current(); if (!it) return;
      if (mastered[it.id]) delete mastered[it.id]; else mastered[it.id] = true;
      saveSet(STORAGE_MASTERED, mastered);
      applyFilter(); renderItem();
    });
    if (els.btnNotebook) els.btnNotebook.addEventListener("click", function () {
      var it = current(); if (!it) return;
      if (notebook[it.id]) delete notebook[it.id]; else notebook[it.id] = true;
      saveSet(STORAGE_NOTEBOOK, notebook);
      applyFilter(); renderItem();
    });

    document.querySelectorAll("[data-vocab-mode]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        state.mode = btn.getAttribute("data-vocab-mode") || "all";
        document.querySelectorAll("[data-vocab-mode]").forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
        state.index = 0;
        applyFilter();
        renderItem();
        stopAll();
      });
    });

    if (els.search) {
      els.search.addEventListener("input", function () {
        state.filterQuery = els.search.value || "";
        state.index = 0;
        applyFilter();
        renderItem();
      });
    }
    if (els.clearSearch) els.clearSearch.addEventListener("click", function () {
      if (els.search) els.search.value = "";
      state.filterQuery = "";
      applyFilter();
      renderItem();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bind);
  else bind();
})(typeof window !== "undefined" ? window : globalThis);
