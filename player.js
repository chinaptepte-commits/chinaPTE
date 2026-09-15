/**
 * chinaPTE · shared speech player module
 * Used by WFD / RS / RL / ASQ / SST / HIW / RA
 * Prefers HTML5 MP3 clips (edge-tts); speechSynthesis fallback + localStorage
 */
(function (global) {
  "use strict";

  function createPlayer(cfg) {
    const STORAGE_TODAY = cfg.storagePrefix + "_today";
    const STORAGE_RESUME = cfg.storagePrefix + "_resume";
    const STORAGE_STREAK = cfg.storagePrefix + "_streak";
    const STORAGE_LOOP = "chinaPTE_loop_count";
    const STORAGE_PLAY_MODE = "chinaPTE_play_mode"; // prompt=听题目 | walkman=随身听
    const mode = cfg.mode || "wfd"; // wfd|rs|rl|asq|sst|hiw|ra
    const enRateMul = cfg.enRateMul != null ? cfg.enRateMul : 0.88;
    const bankName = cfg.bankName || "BANK";

    const allItems = cfg.bank || global[cfg.bankGlobal] || [];
    let items = allItems.slice();

    const state = {
      index: 0,
      rate: 1,
      zhOn: true,
      playMode: "walkman", // prompt | walkman
      playing: false,
      playAll: false,
      paused: false,
      phase: "idle",
      vocabIdx: 0,
      voicesReady: false,
      enVoice: null,
      zhVoice: null,
      filterQuery: "",
      loopCount: 1,
      loopPass: 0,
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
      progressRange: $("progressRange"),
      jumpInput: $("jumpInput"),
      btnJump: $("btnJump"),
      jumpError: $("jumpError"),
      phaseText: $("phaseText"),
      statusBadge: $("statusBadge"),
      statusText: $("statusText"),
      todayCount: $("todayCount"),
      streakCount: $("streakCount"),
      speechWarn: $("speechWarn"),
      searchInput: $("wfdSearch") || $("itemSearch"),
      clearSearch: $("btnClearSearch"),
      answerReveal: $("answerReveal"),
      tipBanner: $("tipBanner"),
      speedBtns: document.querySelectorAll(".speed-btn"),
      keepAlive: $("btnKeepAlive"),
      wakeLock: $("btnWakeLock"),
      loopCount: $("loopCount"),
      loopMinus: $("btnLoopMinus"),
      loopPlus: $("btnLoopPlus"),
      loopIndicator: $("loopIndicator"),
    };

    let keepAlive = null;
    let resumePending = false;
    let seekDrag = null;
    let jumpErrorTimer = null;

    function ensureKeepAlive() {
      if (keepAlive) return keepAlive;
      if (!global.ChinaPTEKeepAlive) return null;
      keepAlive = global.ChinaPTEKeepAlive.create({
        artist: "chinaPTE 随身听",
        isPlaying: () => state.playing && !state.paused,
        onPlay: () => onPlayPause(),
        onPause: () => pausePlayback(),
        onNext: () => onNext(),
        onPrev: () => onPrev(),
        onResumeSpeech: () => {
          if (state.paused || resumePending) return;
          // Recover even if a mid-utterance interrupt cleared the loop but left UI "playing"
          if (!state.playing && !state.playAll) return;
          resumePending = true;
          const wasAll = state.playAll;
          state.playing = true;
          cancelSpeech();
          setTimeout(() => {
            resumePending = false;
            playCurrentSequence({ continueAll: wasAll, resume: true });
          }, 80);
        },
      });
      return keepAlive;
    }

    function sessionTitle() {
      const item = currentItem();
      if (!item) return mode.toUpperCase() + " 随身听";
      const en = itemEn(item);
      return (en || "").slice(0, 80) || mode.toUpperCase() + " 随身听";
    }

    function itemEn(item) {
      return item.en || item.sentence || item.question || item.passage || item.transcript || "";
    }
    function itemZh(item) {
      return item.zhAnalysis || item.analysis || "";
    }
    function itemAnswer(item) {
      return item.answer || item.correct || "";
    }

    function isPromptMode() {
      return state.playMode === "prompt";
    }

    function defaultPlayMode() {
      // WFD dictation defaults to exam-like 听题目; others default to study 随身听
      return mode === "wfd" ? "prompt" : "walkman";
    }

    function loadPlayMode() {
      try {
        const raw = localStorage.getItem(STORAGE_PLAY_MODE);
        if (raw === "prompt" || raw === "walkman") return raw;
      } catch (e) {}
      return defaultPlayMode();
    }

    function trackPlayMode(modeName, meta) {
      try {
        if (global.ChinaPTEAnalytics && typeof global.ChinaPTEAnalytics.track === "function") {
          global.ChinaPTEAnalytics.track("feature_use", {
            feature: "play_mode",
            playMode: modeName,
            pageMode: mode,
            ...(meta || {}),
          });
        }
      } catch (e) {}
    }

    function trackPlayStart(opts) {
      try {
        if (global.ChinaPTEAnalytics && typeof global.ChinaPTEAnalytics.track === "function") {
          global.ChinaPTEAnalytics.track("play_start", {
            playMode: state.playMode,
            pageMode: mode,
            continueAll: !!(opts && opts.continueAll),
            fromVocab: opts && opts.fromVocab != null,
          });
        }
      } catch (e) {}
    }

    function playModeSubtitle() {
      if (isPromptMode()) {
        if (mode === "asq") return "听题目 · 仅英文问题";
        if (mode === "ra") return "听题目 · 仅英文朗读一遍";
        if (mode === "wfd") return "听题目 · 仅英文句子（适合听写）";
        if (mode === "rs") return "听题目 · 仅英文句子一遍";
        return "听题目 · 仅目标英文音频";
      }
      if (mode === "asq") return "随身听 · 问题 → 中文 → 答案";
      if (mode === "ra") return "随身听 · 朗读 → 中文 → 词汇";
      if (mode === "rs") return "随身听 · EN → 句意 → 词汇";
      if (mode === "wfd") return "随身听 · EN → 中文解读 → 拼写";
      return "随身听 · EN → 中文 → 词汇";
    }

    function syncPlayModeUI() {
      const root = document.getElementById("playModeSeg");
      if (root) {
        root.querySelectorAll("[data-play-mode]").forEach((btn) => {
          const on = btn.getAttribute("data-play-mode") === state.playMode;
          btn.classList.toggle("is-active", on);
          btn.setAttribute("aria-pressed", on ? "true" : "false");
        });
      }
      const sub = document.querySelector(".btn-play-all .label-en");
      if (sub) sub.textContent = playModeSubtitle();
      if (els.playAllLabel && !(state.playAll && state.playing)) {
        els.playAllLabel.textContent = isPromptMode()
          ? "听题目 · Play All"
          : "随身听 · Play All";
      }
    }

    function setPlayMode(next, opts) {
      opts = opts || {};
      const m = next === "prompt" ? "prompt" : "walkman";
      const prev = state.playMode;
      state.playMode = m;
      try {
        localStorage.setItem(STORAGE_PLAY_MODE, m);
      } catch (e) {}
      syncPlayModeUI();
      if (!opts.silent && prev !== m) {
        trackPlayMode(m, { source: opts.source || "toggle" });
      }
      // Soft-stop so next play uses new sequence rules
      if (!opts.keepPlaying && (state.playing || state.playAll)) {
        stopAll();
        setPhase("idle", m === "prompt" ? "听题目模式" : "随身听模式");
      }
      return m;
    }

    function ensurePlayModeUI() {
      if (document.getElementById("playModeSeg")) return;
      const host =
        document.querySelector("nav.controls") ||
        document.querySelector(".options") ||
        document.querySelector(".hero");
      if (!host) return;
      const wrap = document.createElement("div");
      wrap.className = "play-mode-seg";
      wrap.id = "playModeSeg";
      wrap.setAttribute("role", "group");
      wrap.setAttribute("aria-label", "播放模式：听题目｜随身听");
      wrap.innerHTML =
        '<button type="button" class="play-mode-btn" data-play-mode="prompt" aria-pressed="false">听题目</button>' +
        '<button type="button" class="play-mode-btn" data-play-mode="walkman" aria-pressed="false">随身听</button>' +
        '<span class="play-mode-hint" id="playModeHint"></span>';
      if (host.classList.contains("controls")) {
        host.insertAdjacentElement("afterend", wrap);
      } else {
        host.insertAdjacentElement("beforebegin", wrap);
      }
      wrap.querySelectorAll("[data-play-mode]").forEach((btn) => {
        btn.addEventListener("click", () => {
          setPlayMode(btn.getAttribute("data-play-mode"), { source: "ui" });
        });
      });
    }

    function todayKey() {
      const d = new Date();
      return (
        d.getFullYear() +
        "-" +
        String(d.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(d.getDate()).padStart(2, "0")
      );
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
        localStorage.setItem(STORAGE_TODAY, JSON.stringify({ date: todayKey(), count }));
      } catch {}
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
        localStorage.setItem(STORAGE_STREAK, JSON.stringify({ lastDate: today, days }));
        if (els.streakCount) els.streakCount.textContent = String(days);
      } catch {}
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
      } catch {}
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
      } catch {}
    }

    function pickVoices() {
      if (!window.speechSynthesis) return;
      const voices = speechSynthesis.getVoices();
      if (!voices.length) return;

      function scoreEn(v) {
        const lang = (v.lang || "").replace(/_/g, "-").toLowerCase();
        const name = (v.name || "").toLowerCase();
        if (!/^en\b/.test(lang) && !/^en-/.test(lang)) return -1;
        let s = 0;
        if (lang.startsWith("en-gb") || lang.startsWith("en-au")) s += 100;
        else if (lang.startsWith("en-us")) s += 35;
        else s += 15;
        if (/google\s*uk|uk\s*english|english\s*uk|british/.test(name)) s += 55;
        if (/australian|en-au|google\s*au|australia/.test(name)) s += 50;
        if (/en-gb/.test(lang) && /google|microsoft|premium|enhanced|neural/.test(name)) s += 20;
        if (/en-au/.test(lang) && /google|microsoft|premium|enhanced|neural/.test(name)) s += 18;
        if (v.localService) s += 3;
        return s;
      }

      const zhPrefs = ["zh-CN", "zh_CN", "zh-Hans", "cmn-Hans", "zh"];
      let bestEn = null;
      let bestScore = -1;
      for (const v of voices) {
        const sc = scoreEn(v);
        if (sc > bestScore) {
          bestScore = sc;
          bestEn = v;
        }
      }
      if (!bestEn) {
        bestEn =
          voices.find((v) => /^en(-|_)US/i.test(v.lang)) ||
          voices.find((v) => /en/i.test(v.lang)) ||
          null;
      }

      function findZh() {
        for (const p of zhPrefs) {
          const exact = voices.find(
            (v) => v.lang === p || v.lang.replace("_", "-") === p
          );
          if (exact) return exact;
        }
        return (
          voices.find((v) => /zh(-|_)CN|cmn/i.test(v.lang)) ||
          voices.find((v) => /zh|cmn/i.test(v.lang)) ||
          null
        );
      }

      state.enVoice = bestEn;
      state.zhVoice = findZh();
      state.voicesReady = true;
    }

    function enSpeakLang() {
      return (state.enVoice && state.enVoice.lang) || "en-GB";
    }

    let pauseTimer = null;
    let currentUtter = null;

    function cancelSpeech() {
      if (pauseTimer) {
        clearTimeout(pauseTimer);
        pauseTimer = null;
      }
      if (global.ChinaPTEAudio) {
        try { global.ChinaPTEAudio.cancel(); } catch (e) {}
      }
      if (window.speechSynthesis) speechSynthesis.cancel();
      currentUtter = null;
    }

    function speak(text, opts) {
      opts = opts || {};
      // Prefer TTS when item marks audioPreferTts (e.g. lengthened RA passages)
      // or when caller sets preferTts — avoids mismatched short MP3s.
      const cur = typeof currentItem === "function" ? currentItem() : null;
      const forceTts = !!(opts.preferTts || (cur && cur.audioPreferTts && opts.clipKey && /\/(?:\d+|[^/]+)-en$/.test(String(opts.clipKey))));
      if (forceTts) {
        return speakViaTts(text, opts);
      }
      const engine = global.ChinaPTEAudio;
      if (engine) {
        const url = opts.audioUrl || engine.resolveClipUrl(opts.clipKey);
        if (url) {
          const pr = opts.playbackRate != null ? opts.playbackRate : state.rate;
          return engine.speak(text, Object.assign({}, opts, { audioUrl: url, rate: pr })).then((r) => {
            if (r && r.error) return speakViaTts(text, opts);
            return r || {};
          });
        }
      }
      return speakViaTts(text, opts);
    }

    function speakViaTts(text, opts) {
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
      if (!spelling) return "";
      if (spelling.includes("-")) return spelling.split("-").join(" ");
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
      const ka = ensureKeepAlive();
      if (ka && !idle) {
        const lab = label || phaseLabel(phase);
        ka.updateMetadata(sessionTitle() + (lab ? " · " + lab : ""));
      }
    }

    function phaseLabel(phase) {
      const map = {
        idle: "准备就绪",
        en: "英文",
        pause: "…",
        zh: "中文解读",
        "vocab-word": "词汇",
        "vocab-spell": "拼写",
        "vocab-gloss": "释义",
        answer: "答案",
        tip: "技巧",
        beep: "间隔",
        loop: "循环",
      };
      return map[phase] || phase;
    }

    function escapeHtml(s) {
      return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    function notifyItemChange() {
      try {
        document.dispatchEvent(
          new CustomEvent("chinapte:itemchange", {
            detail: { mode: mode, item: currentItem(), index: state.index },
          })
        );
      } catch (e) {}
    }

    function renderItem() {
      const item = currentItem();
      if (!item) {
        if (els.sentenceEn) els.sentenceEn.textContent = items.length ? "无匹配条目" : "暂无数据";
        if (els.sentenceZh) els.sentenceZh.textContent = "";
        if (els.vocabChips) els.vocabChips.innerHTML = "";
        if (els.answerReveal) {
          els.answerReveal.hidden = true;
          els.answerReveal.textContent = "";
        }
        if (els.progressText) els.progressText.textContent = `当前 0 / ${allItems.length}`;
        syncProgressControls();
        notifyItemChange();
        return;
      }

      const n = items.length;
      const i = state.index + 1;
      if (els.progressText) {
        const filterNote = state.filterQuery ? `（筛选 ${n}/${allItems.length}）` : "";
        els.progressText.textContent = `当前 ${i} / ${n}${filterNote}`;
      }
      if (els.progressFill) {
        els.progressFill.style.width = `${(i / Math.max(n, 1)) * 100}%`;
        if (els.progressFill.parentElement) {
          els.progressFill.parentElement.setAttribute(
            "aria-valuenow",
            String(Math.round((i / Math.max(n, 1)) * 100))
          );
        }
      }
      syncProgressControls();

      if (els.sentenceEn) els.sentenceEn.textContent = itemEn(item);
      if (els.sentenceZh) {
        els.sentenceZh.textContent = itemZh(item);
        els.sentenceZh.classList.toggle("hidden", !state.zhOn);
      }

      if (els.answerReveal) {
        els.answerReveal.hidden = true;
        els.answerReveal.textContent = "";
        els.answerReveal.classList.remove("is-shown");
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
            `<span class="chip-gloss">${escapeHtml(v.gloss || "")}</span>` +
            `<span class="chip-spelling">${escapeHtml(v.spelling || "")}</span>`;
          btn.addEventListener("click", () => playVocabOnly(idx));
          els.vocabChips.appendChild(btn);
        });
      }

      highlightVocab(-1);
      saveResume();
      notifyItemChange();
    }

    function highlightVocab(idx) {
      if (!els.vocabChips) return;
      els.vocabChips.querySelectorAll(".chip").forEach((el, i) => {
        el.classList.toggle("is-active", i === idx);
      });
    }

    function updateTransportUI() {
      const playing = state.playing && !state.paused;
      if (els.playPauseIcon) els.playPauseIcon.textContent = playing ? "⏸" : "▶";
      if (els.playPauseLabel) els.playPauseLabel.textContent = playing ? "暂停" : "播放";
      if (els.playAll) {
        if (state.playAll && state.playing) {
          els.playAll.classList.add("is-playing");
          if (els.playAllIcon) els.playAllIcon.textContent = "⏸";
          if (els.playAllLabel) {
            els.playAllLabel.textContent = isPromptMode()
              ? "听题目播放中…"
              : "随身听播放中…";
          }
        } else {
          els.playAll.classList.remove("is-playing");
          if (els.playAllIcon) els.playAllIcon.textContent = "▶";
          if (els.playAllLabel) {
            els.playAllLabel.textContent = isPromptMode()
              ? "听题目 · Play All"
              : "随身听 · Play All";
          }
        }
      }
      syncPlayModeUI();
    }

    let playToken = 0;
    function newToken() {
      playToken += 1;
      return playToken;
    }
    function isActive(token) {
      return token === playToken && state.playing;
    }

    function clampLoop(n) {
      n = parseInt(n, 10);
      if (isNaN(n) || n < 1) return 1;
      if (n > 20) return 20;
      return n;
    }

    function loadLoopCount() {
      try {
        const raw = localStorage.getItem(STORAGE_LOOP);
        if (raw == null || raw === "") return 1;
        return clampLoop(raw);
      } catch (e) {
        return 1;
      }
    }

    function saveLoopCount(n) {
      state.loopCount = clampLoop(n);
      try {
        localStorage.setItem(STORAGE_LOOP, String(state.loopCount));
      } catch (e) {}
      if (els.loopCount) els.loopCount.value = String(state.loopCount);
      updateLoopIndicator();
    }

    function updateLoopIndicator() {
      if (!els.loopIndicator) return;
      const total = clampLoop(state.loopCount);
      const pass = state.loopPass || 0;
      if (state.playing && total > 1 && pass > 0) {
        els.loopIndicator.hidden = false;
        els.loopIndicator.textContent = "本轮 " + pass + "/" + total;
      } else {
        els.loopIndicator.hidden = true;
        els.loopIndicator.textContent = "";
      }
    }

    async function playVocabBlock(item, token, startV) {
      const vocab = item.vocab || [];
      for (let vi = startV; vi < vocab.length; vi++) {
        if (!isActive(token)) return false;
        state.vocabIdx = vi;
        const v = vocab[vi];
        highlightVocab(vi);
        if (state.zhOn && v.gloss) {
          setPhase("vocab-gloss", `释义 · ${v.gloss}`);
          const glossText = v.gloss; // zh-CN gloss only — never speak tip/跟读技巧
          const rg = await speak(glossText, {
            lang: "zh-CN",
            rate: state.rate,
            voice: state.zhVoice,
            clipKey: mode + "/" + item.id + "-v" + vi + "-gloss",
            playbackRate: state.rate,
          });
          if (!isActive(token) || (rg && rg.interrupted)) return false;
          await wait(350);
          if (!isActive(token)) return false;
        }

        setPhase("vocab-word", `词汇 · ${v.word}`);
        const rw = await speak(v.word, {
          lang: enSpeakLang(),
          rate: Math.max(0.7, state.rate * 0.95),
          voice: state.enVoice,
          clipKey: mode + "/" + item.id + "-v" + vi + "-word",
          playbackRate: state.rate,
        });
        if (!isActive(token) || (rw && rw.interrupted)) return false;
        await wait(280);
        if (!isActive(token)) return false;

        if (v.spelling) {
          setPhase("vocab-spell", `拼写 · ${v.spelling}`);
          const rs = await speak(lettersOf(v.spelling), {
            lang: enSpeakLang(),
            rate: Math.max(0.6, state.rate * 0.75),
            voice: state.enVoice,
            clipKey: mode + "/" + item.id + "-v" + vi + "-spell",
            playbackRate: state.rate,
          });
          if (!isActive(token) || (rs && rs.interrupted)) return false;
          await wait(280);
          if (!isActive(token)) return false;
        }
      }
      highlightVocab(-1);
      return true;
    }

    async function playCurrentSequence(opts) {
      const token = newToken();
      const fromVocab = opts && opts.fromVocab;
      const continueAll = opts && opts.continueAll;
      const loopTotal = clampLoop(state.loopCount);
      // fromVocab (chip tap) plays once; full item respects 单题循环
      const loopPass =
        fromVocab != null
          ? 1
          : clampLoop((opts && opts.loopPass) || 1);

      state.playing = true;
      state.paused = false;
      if (continueAll) state.playAll = true;
      state.loopPass = fromVocab != null ? 0 : loopPass;
      updateTransportUI();
      updateLoopIndicator();

      const item = currentItem();
      if (!item) {
        stopAll();
        return;
      }

      const kaStart = ensureKeepAlive();
      if (kaStart) kaStart.onSessionStart(sessionTitle());
      trackPlayStart(opts);

      try {
        if (fromVocab == null) {
          // EN audio
          setPhase("en", mode === "asq" ? "听问题" : mode === "hiw" ? "正确朗读" : "英文");
          highlightVocab(-1);
          const enRate = Math.max(0.6, state.rate * enRateMul);
          const r1 = await speak(itemEn(item), {
            lang: enSpeakLang(),
            rate: enRate,
            voice: state.enVoice,
            clipKey: mode + "/" + item.id + "-en",
            playbackRate: state.rate,
          });
          if (!isActive(token) || (r1 && r1.interrupted)) return;

          setPhase("pause", "…");
          await wait(mode === "rs" ? 700 : 550);
          if (!isActive(token)) return;

          // 听题目 (prompt): English target only — no zh / vocab / answer TTS
          if (isPromptMode()) {
            // ASQ exam-like: optionally show answer text without narrating study tips
            if (mode === "asq") {
              await wait(600);
              if (!isActive(token)) return;
              const ans = itemAnswer(item);
              if (ans && els.answerReveal) {
                els.answerReveal.hidden = false;
                els.answerReveal.classList.add("is-shown");
                els.answerReveal.textContent = "答案：" + ans;
              }
            }
          } else {
            // 随身听 (walkman): full study sequence
            const analysis = itemZh(item);
            if (state.zhOn && analysis) {
              setPhase("zh", mode === "rs" ? "句意" : "中文解读");
              const r2 = await speak(analysis, {
                lang: "zh-CN",
                rate: state.rate,
                voice: state.zhVoice,
                clipKey: mode + "/" + item.id + "-zh",
                playbackRate: state.rate,
              });
              if (!isActive(token) || (r2 && r2.interrupted)) return;
              await wait(400);
              if (!isActive(token)) return;
            }

            // ASQ: reveal answer after delay
            if (mode === "asq") {
              await wait(900);
              if (!isActive(token)) return;
              const ans = itemAnswer(item);
              if (ans) {
                setPhase("answer", "答案");
                if (els.answerReveal) {
                  els.answerReveal.hidden = false;
                  els.answerReveal.classList.add("is-shown");
                  els.answerReveal.textContent = "答案：" + ans;
                }
                if (state.zhOn) {
                  await speak("答案是 " + ans, {
                    lang: "zh-CN",
                    rate: state.rate,
                    voice: state.zhVoice,
                  });
                } else {
                  await speak(String(ans), {
                    lang: enSpeakLang(),
                    rate: state.rate,
                    voice: state.enVoice,
                  });
                }
                if (!isActive(token)) return;
                await wait(400);
              }
            }
          }
        }

        // Vocab block: only in 随身听, or when user taps a vocab chip (fromVocab)
        if (!isPromptMode() || fromVocab != null) {
          const startV = fromVocab != null ? fromVocab : 0;
          const ok = await playVocabBlock(item, token, startV);
          if (!ok) return;
        }

        // RS / general: short beep-like pause before next
        if (mode === "rs" || mode === "rl" || mode === "sst") {
          setPhase("beep", "间隔");
          await wait(isPromptMode() ? 350 : 500);
          if (!isActive(token)) return;
        }

        // Per-item loop: replay full sequence N times before advancing
        if (fromVocab == null && loopPass < loopTotal && isActive(token)) {
          setPhase("loop", "本轮 " + loopPass + "/" + loopTotal);
          updateLoopIndicator();
          await wait(450);
          if (!isActive(token)) return;
          playCurrentSequence({
            continueAll: !!state.playAll || !!continueAll,
            loopPass: loopPass + 1,
          });
          return;
        }

        bumpTodayCount();
        saveResume();
        state.loopPass = 0;
        updateLoopIndicator();

        if (state.playAll && isActive(token)) {
          if (state.index < items.length - 1) {
            state.index += 1;
            renderItem();
            await wait(700);
            if (!isActive(token)) return;
            playCurrentSequence({ continueAll: true, loopPass: 1 });
            return;
          }
          state.playAll = false;
          state.playing = false;
          setPhase("idle", "全部完成");
          updateTransportUI();
          updateLoopIndicator();
          { const ka = ensureKeepAlive(); if (ka) ka.onSessionStop(); }
          return;
        }

        state.playing = false;
        state.playAll = false;
        setPhase("idle", "本条完成");
        updateTransportUI();
        updateLoopIndicator();
        { const ka = ensureKeepAlive(); if (ka) ka.onSessionStop(); }
      } catch (err) {
        console.warn("speech error", err);
        state.playing = false;
        state.playAll = false;
        state.loopPass = 0;
        setPhase("idle", "播放中断");
        updateTransportUI();
        updateLoopIndicator();
        { const ka = ensureKeepAlive(); if (ka) ka.onSessionStop(); }
      }
    }

    function stopAll() {
      newToken();
      state.playing = false;
      state.paused = false;
      state.playAll = false;
      state.loopPass = 0;
      cancelSpeech();
      highlightVocab(-1);
      setPhase("idle", "已停止");
      updateTransportUI();
      updateLoopIndicator();
      const ka = ensureKeepAlive();
      if (ka) ka.onSessionStop();
    }

    function pausePlayback() {
      if (!state.playing || state.paused) return;
      state.paused = true;
      state.playing = false;
      newToken();
      cancelSpeech();
      setPhase("idle", "已暂停");
      updateTransportUI();
      updateLoopIndicator();
      const ka = ensureKeepAlive();
      if (ka) ka.onSessionPause();
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
          const ans = String(itemAnswer(it)).toLowerCase();
          const vocabHit = (it.vocab || []).some(
            (v) =>
              (v.word || "").toLowerCase().includes(q) ||
              (v.gloss || "").toLowerCase().includes(q)
          );
          return en.includes(q) || zh.includes(q) || ans.includes(q) || vocabHit;
        });
      }
      if (resetIndex !== false) {
        state.index = 0;
      } else if (state.index >= items.length) {
        state.index = Math.max(0, items.length - 1);
      }
      saveResume();
    }


    function syncProgressControls() {
      const n = Math.max(items.length, 1);
      const i = items.length ? state.index + 1 : 1;
      if (els.progressRange) {
        els.progressRange.min = "1";
        els.progressRange.max = String(n);
        els.progressRange.value = String(i);
        els.progressRange.disabled = !items.length;
      }
      if (els.jumpInput) {
        els.jumpInput.min = "1";
        els.jumpInput.max = String(Math.max(items.length, 1));
        if (document.activeElement !== els.jumpInput) {
          els.jumpInput.value = items.length ? String(i) : "";
        }
      }
    }

    function showJumpError(msg) {
      if (!els.jumpError) return;
      els.jumpError.textContent = msg || "超出范围";
      els.jumpError.hidden = false;
      if (jumpErrorTimer) clearTimeout(jumpErrorTimer);
      jumpErrorTimer = setTimeout(() => {
        if (els.jumpError) els.jumpError.hidden = true;
      }, 1800);
    }

    function softStopForSeek() {
      newToken();
      state.playing = false;
      state.paused = false;
      state.playAll = false;
      state.loopPass = 0;
      cancelSpeech();
      highlightVocab(-1);
      setPhase("idle", "选题中");
      updateTransportUI();
      updateLoopIndicator();
      const ka = ensureKeepAlive();
      if (ka) ka.onSessionStop();
    }

    function jumpToNumber(num, opts) {
      opts = opts || {};
      const n = items.length;
      if (!n) {
        showJumpError("暂无条目");
        return false;
      }
      const one = parseInt(num, 10);
      if (isNaN(one) || one < 1 || one > n) {
        showJumpError("请输入 1–" + n);
        return false;
      }
      if (els.jumpError) els.jumpError.hidden = true;
      const wasPlaying =
        opts.wasPlaying != null ? !!opts.wasPlaying : !!(state.playing && !state.paused);
      const wasAll = opts.wasAll != null ? !!opts.wasAll : !!state.playAll;
      stopAll();
      state.index = one - 1;
      renderItem();
      if (wasAll) {
        state.playAll = true;
        playCurrentSequence({ continueAll: true });
      } else if (wasPlaying) {
        playCurrentSequence({ continueAll: false });
      } else {
        setPhase("idle", "已跳转");
      }
      return true;
    }

    function onProgressInput() {
      if (!els.progressRange || !items.length) return;
      if (!seekDrag) {
        seekDrag = {
          wasPlaying: !!(state.playing && !state.paused),
          wasAll: !!state.playAll,
        };
        softStopForSeek();
      }
      const one = parseInt(els.progressRange.value, 10);
      if (!isNaN(one) && one >= 1 && one <= items.length) {
        state.index = one - 1;
        renderItem();
      }
    }

    function onProgressChange() {
      if (!els.progressRange || !items.length) return;
      const drag = seekDrag;
      seekDrag = null;
      const one = parseInt(els.progressRange.value, 10);
      jumpToNumber(one, {
        wasPlaying: drag ? drag.wasPlaying : !!(state.playing && !state.paused),
        wasAll: drag ? drag.wasAll : !!state.playAll,
      });
    }

    function onJumpSubmit() {
      const raw = els.jumpInput ? els.jumpInput.value : "";
      jumpToNumber(raw, {
        wasPlaying: !!(state.playing && !state.paused),
        wasAll: !!state.playAll,
      });
    }

    function onPlayAll() {
      if (state.playAll && state.playing) {
        pausePlayback();
        return;
      }
      cancelSpeech();
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

    function applyQueryParam() {
      try {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        if (id) {
          const num = parseInt(id, 10);
          if (!isNaN(num)) jumpToId(num);
        }
      } catch {}
    }

    function init() {
      if (!allItems.length) {
        if (els.sentenceEn) els.sentenceEn.textContent = "暂无数据（" + bankName + "）";
        return;
      }

      if (global.ChinaPTEAudio && global.ChinaPTEAudio.loadManifest) {
        global.ChinaPTEAudio.loadManifest();
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
      state.playMode = loadPlayMode();
      ensurePlayModeUI();
      syncPlayModeUI();
      renderItem();
      setPhase("idle", "准备就绪");
      updateTransportUI();

      const kaInit = ensureKeepAlive();
      if (kaInit) kaInit.bindToggles();
      state.loopCount = loadLoopCount();
      if (els.loopCount) els.loopCount.value = String(state.loopCount);
      function onLoopInput() {
        saveLoopCount(els.loopCount ? els.loopCount.value : 1);
      }
      if (els.loopMinus) {
        els.loopMinus.addEventListener("click", () => {
          saveLoopCount(state.loopCount - 1);
        });
      }
      if (els.loopPlus) {
        els.loopPlus.addEventListener("click", () => {
          saveLoopCount(state.loopCount + 1);
        });
      }
      if (els.loopCount) {
        els.loopCount.addEventListener("change", onLoopInput);
        els.loopCount.addEventListener("input", onLoopInput);
      }

      if (els.playAll) els.playAll.addEventListener("click", onPlayAll);
      if (els.playPause) els.playPause.addEventListener("click", onPlayPause);
      if (els.replay) els.replay.addEventListener("click", onReplay);
      if (els.prev) els.prev.addEventListener("click", onPrev);
      if (els.next) els.next.addEventListener("click", onNext);
      if (els.stop) els.stop.addEventListener("click", stopAll);
      if (els.progressRange) {
        els.progressRange.addEventListener("input", onProgressInput);
        els.progressRange.addEventListener("change", onProgressChange);
      }
      if (els.btnJump) els.btnJump.addEventListener("click", onJumpSubmit);
      if (els.jumpInput) {
        els.jumpInput.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onJumpSubmit();
          }
        });
      }

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

    async function playPromptEn() {
      const item = currentItem();
      if (!item) return;
      stopAll();
      state.playing = true;
      state.paused = false;
      updateTransportUI();
      setPhase("en", "提示音频");
      const enRate = Math.max(0.6, state.rate * enRateMul);
      try {
        await speak(itemEn(item), {
          lang: enSpeakLang(),
          rate: enRate,
          voice: state.enVoice,
          clipKey: mode + "/" + item.id + "-en",
          playbackRate: state.rate,
        });
      } finally {
        state.playing = false;
        state.paused = false;
        updateTransportUI();
        setPhase("idle", "准备跟读");
      }
    }

    return {
      stopAll,
      renderItem,
      state,
      getCurrentItem: currentItem,
      getTargetText: function () {
        const it = currentItem();
        return it ? itemEn(it) : "";
      },
      getItemId: function () {
        const it = currentItem();
        return it ? it.id : null;
      },
      playPromptEn,
      setPlayMode,
      getPlayMode: function () {
        return state.playMode;
      },
      isPromptMode,
    };
  }

  global.ChinaPTEPlayer = { create: createPlayer };
})(typeof window !== "undefined" ? window : globalThis);
