/**
 * chinaPTE · shared speech player module
 * Used by WFD / RS / RL / ASQ / SST / HIW / RA
 * Zero-cost: Web Speech API + localStorage only
 */
(function (global) {
  "use strict";

  function createPlayer(cfg) {
    const STORAGE_TODAY = cfg.storagePrefix + "_today";
    const STORAGE_RESUME = cfg.storagePrefix + "_resume";
    const STORAGE_STREAK = cfg.storagePrefix + "_streak";
    const mode = cfg.mode || "wfd"; // wfd|rs|rl|asq|sst|hiw|ra
    const enRateMul = cfg.enRateMul != null ? cfg.enRateMul : 0.88;
    const bankName = cfg.bankName || "BANK";

    const allItems = cfg.bank || global[cfg.bankGlobal] || [];
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
      searchInput: $("wfdSearch") || $("itemSearch"),
      clearSearch: $("btnClearSearch"),
      answerReveal: $("answerReveal"),
      tipBanner: $("tipBanner"),
      speedBtns: document.querySelectorAll(".speed-btn"),
      keepAlive: $("btnKeepAlive"),
      wakeLock: $("btnWakeLock"),
    };

    let keepAlive = null;
    let resumePending = false;

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
      if (window.speechSynthesis) speechSynthesis.cancel();
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
        els.progressFill.style.width = `${(i / Math.max(n, 1)) * 100}%`;
        if (els.progressFill.parentElement) {
          els.progressFill.parentElement.setAttribute(
            "aria-valuenow",
            String(Math.round((i / Math.max(n, 1)) * 100))
          );
        }
      }

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

    async function playVocabBlock(item, token, startV) {
      const vocab = item.vocab || [];
      for (let vi = startV; vi < vocab.length; vi++) {
        if (!isActive(token)) return false;
        state.vocabIdx = vi;
        const v = vocab[vi];
        highlightVocab(vi);
        setPhase("vocab-word", `词汇 · ${v.word}`);
        const rw = await speak(v.word, {
          lang: enSpeakLang(),
          rate: Math.max(0.7, state.rate * 0.95),
          voice: state.enVoice,
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
          });
          if (!isActive(token) || (rs && rs.interrupted)) return false;
          await wait(280);
          if (!isActive(token)) return false;
        }

        if (state.zhOn && v.gloss) {
          setPhase("vocab-gloss", `释义 · ${v.gloss}`);
          const glossText = v.gloss; // zh-CN gloss only — never speak tip/跟读技巧
          const rg = await speak(glossText, {
            lang: "zh-CN",
            rate: state.rate,
            voice: state.zhVoice,
          });
          if (!isActive(token) || (rg && rg.interrupted)) return false;
          await wait(350);
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

      state.playing = true;
      state.paused = false;
      if (continueAll) state.playAll = true;
      updateTransportUI();

      const item = currentItem();
      if (!item) {
        stopAll();
        return;
      }

      const kaStart = ensureKeepAlive();
      if (kaStart) kaStart.onSessionStart(sessionTitle());

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
          });
          if (!isActive(token) || (r1 && r1.interrupted)) return;

          setPhase("pause", "…");
          await wait(mode === "rs" ? 700 : 550);
          if (!isActive(token)) return;

          // Chinese analysis / tip
          const analysis = itemZh(item);
          if (state.zhOn && analysis) {
            setPhase("zh", mode === "rs" ? "句意" : "中文解读");
            const r2 = await speak(analysis, {
              lang: "zh-CN",
              rate: state.rate,
              voice: state.zhVoice,
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

        const startV = fromVocab != null ? fromVocab : 0;
        const ok = await playVocabBlock(item, token, startV);
        if (!ok) return;

        // RS / general: short beep-like pause before next
        if (mode === "rs" || mode === "rl" || mode === "sst") {
          setPhase("beep", "间隔");
          await wait(500);
          if (!isActive(token)) return;
        }

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
          { const ka = ensureKeepAlive(); if (ka) ka.onSessionStop(); }
          return;
        }

        state.playing = false;
        state.playAll = false;
        setPhase("idle", "本条完成");
        updateTransportUI();
        { const ka = ensureKeepAlive(); if (ka) ka.onSessionStop(); }
      } catch (err) {
        console.warn("speech error", err);
        state.playing = false;
        state.playAll = false;
        setPhase("idle", "播放中断");
        updateTransportUI();
        { const ka = ensureKeepAlive(); if (ka) ka.onSessionStop(); }
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

      const kaInit = ensureKeepAlive();
      if (kaInit) kaInit.bindToggles();
      if (els.tipBanner && !els.tipBanner.dataset.keepAliveTip) {
        els.tipBanner.dataset.keepAliveTip = "1";
        const base = (els.tipBanner.textContent || "").trim();
        const tip =
          "iPhone 关屏后系统仍可能暂停网页朗读；安卓 Chrome 开「息屏续听」通常可继续；或用保持常亮。";
        els.tipBanner.textContent = base ? base + " · " + tip : "💡 " + tip;
      }

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

    return { stopAll, renderItem, state };
  }

  global.ChinaPTEPlayer = { create: createPlayer };
})(typeof window !== "undefined" ? window : globalThis);
