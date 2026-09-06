/**
 * chinaPTE · WFD 随身听
 * Audio-first Write From Dictation trainer using browser Web Speech API only.
 */
(function () {
  "use strict";

  const STORAGE_TODAY = "chinaPTE_wfd_today";
  const STORAGE_RESUME = "chinaPTE_wfd_resume";
  const STORAGE_STREAK = "chinaPTE_wfd_streak";

  const allItems = window.WFD_BANK || window.WFD_DATA || [];
  let items = allItems.slice();

  const state = {
    index: 0,
    rate: 1,
    zhOn: true,
    playing: false,
    playAll: false,
    paused: false,
    phase: "idle",
    vocabIdx: 0,
    voicesReady: false,
    enVoice: null,
    zhVoice: null,
    filterQuery: "",
  };

  const $ = (id) => document.getElementById(id);

  const els = {
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
    toggleZh: $("btnToggleZh"),
    sentenceEn: $("sentenceEn"),
    sentenceZh: $("sentenceZh"),
    vocabChips: $("vocabChips"),
    progressText: $("progressText"),
    progressFill: $("progressFill"),
    phaseText: $("phaseText"),
    statusBadge: $("statusBadge"),
    statusText: $("statusText"),
    todayCount: $("todayCount"),
    streakCount: $("streakCount"),
    speechWarn: $("speechWarn"),
    searchInput: $("wfdSearch"),
    clearSearch: $("btnClearSearch"),
    speedBtns: document.querySelectorAll(".speed-btn"),
  };

  function itemEn(item) {
    return item.en || item.sentence || "";
  }

  function itemZh(item) {
    return item.zhAnalysis || item.analysis || "";
  }

  function todayKey() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function loadTodayCount() {
    try {
      const raw = localStorage.getItem(STORAGE_TODAY);
      if (!raw) return 0;
      const data = JSON.parse(raw);
      if (data.date !== todayKey()) return 0;
      return data.count || 0;
    } catch {
      return 0;
    }
  }

  function bumpTodayCount() {
    const count = loadTodayCount() + 1;
    try {
      localStorage.setItem(
        STORAGE_TODAY,
        JSON.stringify({ date: todayKey(), count })
      );
    } catch {
      /* ignore */
    }
    if (els.todayCount) els.todayCount.textContent = String(count);
    updateStreak();
  }

  function refreshTodayUI() {
    if (els.todayCount) els.todayCount.textContent = String(loadTodayCount());
    if (els.streakCount) els.streakCount.textContent = String(loadStreak());
  }

  function loadStreak() {
    try {
      const raw = localStorage.getItem(STORAGE_STREAK);
      if (!raw) return 0;
      const data = JSON.parse(raw);
      const today = todayKey();
      if (data.lastDate === today) return data.days || 0;
      // yesterday?
      const yest = new Date();
      yest.setDate(yest.getDate() - 1);
      const yk =
        yest.getFullYear() +
        "-" +
        String(yest.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(yest.getDate()).padStart(2, "0");
      if (data.lastDate === yk) return data.days || 0;
      return 0;
    } catch {
      return 0;
    }
  }

  function updateStreak() {
    try {
      const today = todayKey();
      const raw = localStorage.getItem(STORAGE_STREAK);
      let days = 1;
      if (raw) {
        const data = JSON.parse(raw);
        if (data.lastDate === today) {
          days = data.days || 1;
        } else {
          const yest = new Date();
          yest.setDate(yest.getDate() - 1);
          const yk =
            yest.getFullYear() +
            "-" +
            String(yest.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(yest.getDate()).padStart(2, "0");
          if (data.lastDate === yk) days = (data.days || 0) + 1;
          else days = 1;
        }
      }
      localStorage.setItem(
        STORAGE_STREAK,
        JSON.stringify({ lastDate: today, days })
      );
      if (els.streakCount) els.streakCount.textContent = String(days);
    } catch {
      /* ignore */
    }
  }

  function saveResume() {
    try {
      const item = currentItem();
      localStorage.setItem(
        STORAGE_RESUME,
        JSON.stringify({
          id: item ? item.id : null,
          index: state.index,
          filter: state.filterQuery,
        })
      );
    } catch {
      /* ignore */
    }
  }

  function loadResume() {
    try {
      const raw = localStorage.getItem(STORAGE_RESUME);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data.filter) {
        state.filterQuery = data.filter;
        if (els.searchInput) els.searchInput.value = data.filter;
        applyFilter(false);
      }
      if (typeof data.index === "number" && data.index >= 0 && data.index < items.length) {
        state.index = data.index;
      } else if (data.id != null) {
        const idx = items.findIndex((it) => it.id === data.id);
        if (idx >= 0) state.index = idx;
      }
    } catch {
      /* ignore */
    }
  }

  function pickVoices() {
    if (!window.speechSynthesis) return;
    const voices = speechSynthesis.getVoices();
    if (!voices.length) return;

    const enPrefs = ["en-US", "en_US", "en-GB", "en_GB", "en"];
    const zhPrefs = ["zh-CN", "zh_CN", "zh-Hans", "cmn-Hans", "zh"];

    function find(prefs, langPrefix) {
      for (const p of prefs) {
        const exact = voices.find(
          (v) => v.lang === p || v.lang.replace("_", "-") === p
        );
        if (exact) return exact;
      }
      return (
        voices.find((v) =>
          v.lang.toLowerCase().startsWith(langPrefix.toLowerCase())
        ) || null
      );
    }

    state.enVoice = find(enPrefs, "en") || voices.find((v) => /en/i.test(v.lang));
    state.zhVoice = find(zhPrefs, "zh") || voices.find((v) => /zh|cmn/i.test(v.lang));
    state.voicesReady = true;
  }

  let pauseTimer = null;
  let currentUtter = null;

  function cancelSpeech() {
    if (pauseTimer) {
      clearTimeout(pauseTimer);
      pauseTimer = null;
    }
    if (window.speechSynthesis) {
      speechSynthesis.cancel();
    }
    currentUtter = null;
  }

  function speak(text, opts) {
    return new Promise((resolve, reject) => {
      if (!window.speechSynthesis) {
        reject(new Error("no speechSynthesis"));
        return;
      }
      const u = new SpeechSynthesisUtterance(text);
      u.lang = opts.lang || "en-US";
      u.rate = opts.rate != null ? opts.rate : state.rate;
      u.pitch = opts.pitch != null ? opts.pitch : 1;
      u.volume = 1;
      if (opts.voice) u.voice = opts.voice;

      u.onend = () => {
        currentUtter = null;
        resolve();
      };
      u.onerror = (e) => {
        currentUtter = null;
        if (e.error === "interrupted" || e.error === "canceled") {
          resolve({ interrupted: true });
        } else {
          reject(e);
        }
      };

      currentUtter = u;
      speechSynthesis.cancel();
      setTimeout(() => {
        if (!state.playing && !opts.force) {
          resolve({ interrupted: true });
          return;
        }
        speechSynthesis.speak(u);
      }, 40);
    });
  }

  function wait(ms) {
    return new Promise((resolve) => {
      pauseTimer = setTimeout(() => {
        pauseTimer = null;
        resolve();
      }, ms);
    });
  }

  function lettersOf(spelling) {
    if (spelling.includes("-")) {
      return spelling.split("-").join(" ");
    }
    return spelling.split("").join(" ");
  }

  function currentItem() {
    return items[state.index] || null;
  }

  function setPhase(phase, label) {
    state.phase = phase;
    if (els.phaseText) els.phaseText.textContent = label || phaseLabel(phase);
    const idle = phase === "idle";
    if (els.statusBadge) els.statusBadge.classList.toggle("is-idle", idle);
    if (els.statusText) els.statusText.textContent = idle ? "待机" : "播放中";
  }

  function phaseLabel(phase) {
    const map = {
      idle: "准备就绪",
      en: "英文句子",
      pause: "…",
      zh: "中文解读",
      "vocab-word": "词汇",
      "vocab-spell": "拼写",
      "vocab-gloss": "释义",
    };
    return map[phase] || phase;
  }

  function renderItem() {
    const item = currentItem();
    if (!item) {
      if (els.sentenceEn) els.sentenceEn.textContent = items.length ? "无匹配句子" : "暂无数据";
      if (els.sentenceZh) els.sentenceZh.textContent = "";
      if (els.vocabChips) els.vocabChips.innerHTML = "";
      if (els.progressText) els.progressText.textContent = `0 / ${allItems.length}`;
      return;
    }

    const n = items.length;
    const i = state.index + 1;
    if (els.progressText) {
      const filterNote = state.filterQuery ? `（筛选 ${n}/${allItems.length}）` : "";
      els.progressText.textContent = `${i} / ${n}${filterNote}`;
    }
    if (els.progressFill) {
      els.progressFill.style.width = `${(i / n) * 100}%`;
      if (els.progressFill.parentElement) {
        els.progressFill.parentElement.setAttribute(
          "aria-valuenow",
          String(Math.round((i / n) * 100))
        );
      }
    }

    if (els.sentenceEn) els.sentenceEn.textContent = itemEn(item);
    if (els.sentenceZh) {
      els.sentenceZh.textContent = itemZh(item);
      els.sentenceZh.classList.toggle("hidden", !state.zhOn);
    }

    if (els.vocabChips) {
      els.vocabChips.innerHTML = "";
      (item.vocab || []).forEach((v, idx) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "chip";
        btn.dataset.idx = String(idx);
        btn.innerHTML =
          `<span class="chip-word">${escapeHtml(v.word)}</span>` +
          `<span class="chip-gloss">${escapeHtml(v.gloss)}</span>` +
          `<span class="chip-spelling">${escapeHtml(v.spelling)}</span>`;

        btn.addEventListener("click", () => playVocabOnly(idx));
        els.vocabChips.appendChild(btn);
      });
    }

    highlightVocab(-1);
    saveResume();
  }

  function highlightVocab(idx) {
    if (!els.vocabChips) return;
    els.vocabChips.querySelectorAll(".chip").forEach((el, i) => {
      el.classList.toggle("is-active", i === idx);
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function updateTransportUI() {
    const playing = state.playing && !state.paused;
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
        if (els.playAllLabel) els.playAllLabel.textContent = "随身听 · Play All";
      }
    }
  }

  let playToken = 0;

  function newToken() {
    playToken += 1;
    return playToken;
  }

  function isActive(token) {
    return token === playToken && state.playing;
  }

  async function playCurrentSequence(opts) {
    const token = newToken();
    const fromVocab = opts && opts.fromVocab;
    const continueAll = opts && opts.continueAll;

    state.playing = true;
    state.paused = false;
    if (continueAll) state.playAll = true;
    updateTransportUI();

    const item = currentItem();
    if (!item) {
      stopAll();
      return;
    }

    try {
      if (!fromVocab) {
        setPhase("en", "英文句子");
        highlightVocab(-1);
        const enRate = Math.max(0.65, state.rate * 0.9);
        const r1 = await speak(itemEn(item), {
          lang: "en-US",
          rate: enRate,
          voice: state.enVoice,
        });
        if (!isActive(token) || (r1 && r1.interrupted)) return;

        setPhase("pause", "…");
        await wait(550);
        if (!isActive(token)) return;

        const analysis = itemZh(item);
        if (state.zhOn && analysis) {
          setPhase("zh", "中文解读");
          const r2 = await speak(analysis, {
            lang: "zh-CN",
            rate: state.rate,
            voice: state.zhVoice,
          });
          if (!isActive(token) || (r2 && r2.interrupted)) return;
          await wait(400);
          if (!isActive(token)) return;
        }
      }

      const startV = fromVocab != null ? fromVocab : 0;
      const vocab = item.vocab || [];
      for (let vi = startV; vi < vocab.length; vi++) {
        if (!isActive(token)) return;
        state.vocabIdx = vi;
        const v = vocab[vi];
        highlightVocab(vi);

        setPhase("vocab-word", `词汇 · ${v.word}`);
        const rw = await speak(v.word, {
          lang: "en-US",
          rate: Math.max(0.7, state.rate * 0.95),
          voice: state.enVoice,
        });
        if (!isActive(token) || (rw && rw.interrupted)) return;
        await wait(280);
        if (!isActive(token)) return;

        setPhase("vocab-spell", `拼写 · ${v.spelling}`);
        const letters = lettersOf(v.spelling);
        const rs = await speak(letters, {
          lang: "en-US",
          rate: Math.max(0.6, state.rate * 0.75),
          voice: state.enVoice,
        });
        if (!isActive(token) || (rs && rs.interrupted)) return;
        await wait(280);
        if (!isActive(token)) return;

        if (state.zhOn && v.gloss) {
          setPhase("vocab-gloss", `释义 · ${v.gloss}`);
          const glossText = v.gloss;
          const rg = await speak(glossText, {
            lang: "zh-CN",
            rate: state.rate,
            voice: state.zhVoice,
          });
          if (!isActive(token) || (rg && rg.interrupted)) return;
          await wait(350);
          if (!isActive(token)) return;
        }
      }

      highlightVocab(-1);
      bumpTodayCount();
      saveResume();

      if (state.playAll && isActive(token)) {
        if (state.index < items.length - 1) {
          state.index += 1;
          renderItem();
          await wait(700);
          if (!isActive(token)) return;
          playCurrentSequence({ continueAll: true });
          return;
        }
        state.playAll = false;
        state.playing = false;
        setPhase("idle", "全部完成");
        updateTransportUI();
        return;
      }

      state.playing = false;
      state.playAll = false;
      setPhase("idle", "本句完成");
      updateTransportUI();
    } catch (err) {
      console.warn("speech error", err);
      state.playing = false;
      state.playAll = false;
      setPhase("idle", "播放中断");
      updateTransportUI();
    }
  }

  function stopAll() {
    newToken();
    state.playing = false;
    state.paused = false;
    state.playAll = false;
    cancelSpeech();
    highlightVocab(-1);
    setPhase("idle", "已停止");
    updateTransportUI();
  }

  function pausePlayback() {
    if (!state.playing || state.paused) return;
    state.paused = true;
    state.playing = false;
    newToken();
    cancelSpeech();
    setPhase("idle", "已暂停");
    updateTransportUI();
  }

  async function playVocabOnly(idx) {
    stopAll();
    state.playing = true;
    state.playAll = false;
    updateTransportUI();
    await playCurrentSequence({ fromVocab: idx });
  }

  function applyFilter(resetIndex) {
    const q = (state.filterQuery || "").trim().toLowerCase();
    if (!q) {
      items = allItems.slice();
    } else {
      items = allItems.filter((it) => {
        const en = itemEn(it).toLowerCase();
        const zh = itemZh(it).toLowerCase();
        const vocabHit = (it.vocab || []).some(
          (v) =>
            (v.word || "").toLowerCase().includes(q) ||
            (v.gloss || "").toLowerCase().includes(q)
        );
        return en.includes(q) || zh.includes(q) || vocabHit;
      });
    }
    if (resetIndex !== false) {
      state.index = 0;
    } else if (state.index >= items.length) {
      state.index = Math.max(0, items.length - 1);
    }
    saveResume();
  }

  function onPlayAll() {
    if (state.playAll && state.playing) {
      pausePlayback();
      return;
    }
    cancelSpeech();
    // Play All from current index (resume-friendly); if at end, restart
    if (state.index >= items.length - 1 && !state.playing) {
      // if user finished, restart from 0
    }
    // Fresh Play All from start of current filtered list when not mid-resume play
    // Spec: Play All through entire bank — start from beginning of current list
    state.playAll = true;
    state.index = 0;
    renderItem();
    playCurrentSequence({ continueAll: true });
  }

  function onPlayPause() {
    if (state.playing && !state.paused) {
      pausePlayback();
      return;
    }
    const wasAll = state.playAll;
    cancelSpeech();
    playCurrentSequence({ continueAll: wasAll });
  }

  function onReplay() {
    cancelSpeech();
    playCurrentSequence({ continueAll: state.playAll });
  }

  function onPrev() {
    const keepAll = state.playAll;
    stopAll();
    state.index = Math.max(0, state.index - 1);
    renderItem();
    if (keepAll) {
      state.playAll = true;
      playCurrentSequence({ continueAll: true });
    }
  }

  function onNext() {
    const keepAll = state.playAll;
    stopAll();
    state.index = Math.min(items.length - 1, state.index + 1);
    renderItem();
    if (keepAll) {
      state.playAll = true;
      playCurrentSequence({ continueAll: true });
    }
  }

  function onSpeed(rate) {
    state.rate = rate;
    els.speedBtns.forEach((b) => {
      b.classList.toggle("is-active", parseFloat(b.dataset.speed) === rate);
    });
  }

  function onToggleZh() {
    state.zhOn = !state.zhOn;
    if (els.toggleZh) {
      els.toggleZh.classList.toggle("is-on", state.zhOn);
      els.toggleZh.setAttribute("aria-pressed", state.zhOn ? "true" : "false");
    }
    if (els.sentenceZh) els.sentenceZh.classList.toggle("hidden", !state.zhOn);
  }

  function onSearchInput() {
    state.filterQuery = els.searchInput ? els.searchInput.value : "";
    stopAll();
    applyFilter(true);
    renderItem();
    setPhase("idle", state.filterQuery ? "已筛选" : "准备就绪");
  }

  function jumpToId(id) {
    applyFilter(true);
    const idx = items.findIndex((it) => it.id === id);
    if (idx >= 0) {
      state.index = idx;
      renderItem();
    }
  }

  // Deep link: wfd.html?id=12
  function applyQueryParam() {
    try {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
      if (id) {
        const num = parseInt(id, 10);
        if (!isNaN(num)) jumpToId(num);
      }
    } catch {
      /* ignore */
    }
  }

  function init() {
    if (!allItems.length) {
      if (els.sentenceEn) els.sentenceEn.textContent = "暂无数据";
      return;
    }

    if (!window.speechSynthesis) {
      if (els.speechWarn) els.speechWarn.classList.add("is-visible");
    } else {
      pickVoices();
      speechSynthesis.onvoiceschanged = () => pickVoices();
      setTimeout(pickVoices, 200);
    }

    loadResume();
    applyQueryParam();
    refreshTodayUI();
    renderItem();
    setPhase("idle", "准备就绪");
    updateTransportUI();

    if (els.playAll) els.playAll.addEventListener("click", onPlayAll);
    if (els.playPause) els.playPause.addEventListener("click", onPlayPause);
    if (els.replay) els.replay.addEventListener("click", onReplay);
    if (els.prev) els.prev.addEventListener("click", onPrev);
    if (els.next) els.next.addEventListener("click", onNext);
    if (els.stop) els.stop.addEventListener("click", stopAll);
    if (els.toggleZh) els.toggleZh.addEventListener("click", onToggleZh);

    els.speedBtns.forEach((b) => {
      b.addEventListener("click", () => onSpeed(parseFloat(b.dataset.speed)));
    });

    if (els.searchInput) {
      let t = null;
      els.searchInput.addEventListener("input", () => {
        clearTimeout(t);
        t = setTimeout(onSearchInput, 180);
      });
    }
    if (els.clearSearch) {
      els.clearSearch.addEventListener("click", () => {
        if (els.searchInput) els.searchInput.value = "";
        state.filterQuery = "";
        stopAll();
        applyFilter(true);
        renderItem();
        setPhase("idle", "准备就绪");
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        onPlayPause();
      }
    });
  }

  setInterval(function () {
    if (
      state.playing &&
      window.speechSynthesis &&
      speechSynthesis.speaking &&
      speechSynthesis.paused
    ) {
      speechSynthesis.resume();
    }
  }, 5000);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
