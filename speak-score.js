/**
 * chinaPTE · zero-cost speaking practice + scoring
 * Uses Web Speech API SpeechRecognition (Chrome/Edge).
 * Compare recognition transcript to target English (normalized).
 * Extendable: mount({ mode, getTarget, getItemId, stopPlayer, playPrompt }).
 */
(function (global) {
  "use strict";

  var STORAGE_BEST = "chinaPTE_speak_best";

  function getRecognitionCtor() {
    return (
      global.SpeechRecognition ||
      global.webkitSpeechRecognition ||
      null
    );
  }

  function isSupported() {
    return !!getRecognitionCtor();
  }

  function normalize(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[’']/g, "'")
      .replace(/\b(don't|doesn't|didn't|won't|can't|couldn't|wouldn't|shouldn't|isn't|aren't|wasn't|weren't|haven't|hasn't|hadn't|I'm|I've|I'd|I'll|you're|you've|you'd|you'll|we're|we've|we'd|we'll|they're|they've|they'd|they'll|it's|that's|what's|who's|here's|there's)\b/gi, function (m) {
        var map = {
          "don't": "do not", "doesn't": "does not", "didn't": "did not",
          "won't": "will not", "can't": "can not", "couldn't": "could not",
          "wouldn't": "would not", "shouldn't": "should not",
          "isn't": "is not", "aren't": "are not", "wasn't": "was not",
          "weren't": "were not", "haven't": "have not", "hasn't": "has not",
          "hadn't": "had not", "i'm": "i am", "i've": "i have", "i'd": "i would",
          "i'll": "i will", "you're": "you are", "you've": "you have",
          "you'd": "you would", "you'll": "you will", "we're": "we are",
          "we've": "we have", "we'd": "we would", "we'll": "we will",
          "they're": "they are", "they've": "they have", "they'd": "they would",
          "they'll": "they will", "it's": "it is", "that's": "that is",
          "what's": "what is", "who's": "who is", "here's": "here is",
          "there's": "there is"
        };
        return map[m.toLowerCase()] || m;
      })
      .replace(/[^a-z0-9\s']/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function tokenize(text) {
    var n = normalize(text);
    if (!n) return [];
    return n.split(" ").filter(Boolean);
  }

  /** Multiset coverage: fraction of target tokens found in hyp (order-free). */
  function coverageScore(refToks, hypToks) {
    if (!refToks.length) return 0;
    var bag = {};
    hypToks.forEach(function (t) {
      bag[t] = (bag[t] || 0) + 1;
    });
    var hit = 0;
    refToks.forEach(function (t) {
      if (bag[t] > 0) {
        bag[t]--;
        hit++;
      }
    });
    return hit / refToks.length;
  }

  /** Token precision / recall / F1 (multiset). */
  function tokenF1(refToks, hypToks) {
    if (!refToks.length && !hypToks.length) return 1;
    if (!refToks.length || !hypToks.length) return 0;
    var bag = {};
    refToks.forEach(function (t) {
      bag[t] = (bag[t] || 0) + 1;
    });
    var hit = 0;
    hypToks.forEach(function (t) {
      if (bag[t] > 0) {
        bag[t]--;
        hit++;
      }
    });
    var prec = hit / hypToks.length;
    var rec = hit / refToks.length;
    if (prec + rec === 0) return 0;
    return (2 * prec * rec) / (prec + rec);
  }

  /** Longest common subsequence length / ref length — order-ish. */
  function lcsRatio(refToks, hypToks) {
    if (!refToks.length) return 0;
    var n = refToks.length;
    var m = hypToks.length;
    if (!m) return 0;
    // Rolling DP to save memory
    var prev = new Array(m + 1).fill(0);
    var cur = new Array(m + 1).fill(0);
    for (var i = 1; i <= n; i++) {
      for (var j = 1; j <= m; j++) {
        if (refToks[i - 1] === hypToks[j - 1]) cur[j] = prev[j - 1] + 1;
        else cur[j] = Math.max(prev[j], cur[j - 1]);
      }
      var tmp = prev;
      prev = cur;
      cur = tmp;
      cur.fill(0);
    }
    return prev[m] / n;
  }

  /**
   * Score 0–90 (display style). Blend coverage, F1, and order (LCS).
   */
  function scoreTranscript(target, hypothesis) {
    var refToks = tokenize(target);
    var hypToks = tokenize(hypothesis);
    if (!refToks.length) {
      return { score: 0, coverage: 0, f1: 0, order: 0, refToks: [], hypToks: [] };
    }
    if (!hypToks.length) {
      return { score: 0, coverage: 0, f1: 0, order: 0, refToks: refToks, hypToks: [] };
    }
    var cov = coverageScore(refToks, hypToks);
    var f1 = tokenF1(refToks, hypToks);
    var order = lcsRatio(refToks, hypToks);
    // Weighted blend → 0..1 then scale to 0–90
    var raw = cov * 0.45 + f1 * 0.35 + order * 0.2;
    var score = Math.round(Math.min(90, Math.max(0, raw * 90)));
    return { score: score, coverage: cov, f1: f1, order: order, refToks: refToks, hypToks: hypToks };
  }

  function feedbackFor(result, hypEmpty) {
    if (hypEmpty) return "未识别到语音，请检查麦克风并大声清晰跟读";
    var s = result.score;
    var cov = result.coverage;
    if (s >= 80) return "关键词覆盖很好，继续保持";
    if (s >= 65) return "关键词覆盖较好，注意个别漏词";
    if (s >= 45) {
      if (cov < 0.55) return "漏词较多，请对照原文再试";
      return "基本跟上，建议放慢语速、咬字清晰";
    }
    if (s >= 25) return "漏词较多，请大声清晰跟读";
    return "请靠近麦克风，大声清晰跟读";
  }

  function listenDurationMs(target, mode) {
    var words = tokenize(target).length || 8;
    var perWord = mode === "ra" ? 520 : 420;
    var base = mode === "ra" ? 4000 : 2500;
    var ms = base + words * perWord;
    var max = mode === "ra" ? 45000 : 18000;
    var min = mode === "ra" ? 6000 : 4000;
    return Math.min(max, Math.max(min, ms));
  }

  function loadBestMap() {
    try {
      var raw = localStorage.getItem(STORAGE_BEST);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveBest(mode, id, score) {
    if (id == null || id === "") return null;
    var key = mode + ":" + String(id);
    var map = loadBestMap();
    var prev = map[key];
    if (prev == null || score > prev) {
      map[key] = score;
      try {
        localStorage.setItem(STORAGE_BEST, JSON.stringify(map));
      } catch (e) {}
      return score;
    }
    return prev;
  }

  function getBest(mode, id) {
    if (id == null || id === "") return null;
    var map = loadBestMap();
    var v = map[mode + ":" + String(id)];
    return typeof v === "number" ? v : null;
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /**
   * Mount speak-score UI into rootEl.
   * opts: {
   *   mode: "ra"|"rs",
   *   getTarget: () => string,
   *   getItemId: () => id,
   *   stopPlayer: () => void,
   *   playPrompt: optional () => Promise  // RS: play EN then resolve
   * }
   */
  function mount(rootEl, opts) {
    if (!rootEl) return null;
    opts = opts || {};
    var mode = opts.mode || "ra";
    var supported = isSupported();

    rootEl.innerHTML = "";
    rootEl.classList.add("speak-score");
    rootEl.setAttribute("data-mode", mode);

    var title = el("div", "speak-score-title", "跟读评分");
    var disclaimer = el(
      "p",
      "speak-score-disclaimer",
      "非官方 PTE 评分，仅供练习参考"
    );
    rootEl.appendChild(title);
    rootEl.appendChild(disclaimer);

    if (!supported) {
      var warn = el(
        "div",
        "speak-score-unsupported",
        "当前浏览器不支持语音识别。请用 Chrome / Edge 打开（Safari 通常不可用）。"
      );
      rootEl.appendChild(warn);
      return { supported: false, refresh: function () {} };
    }

    var actions = el("div", "speak-score-actions");
    var btnStart = el("button", "speak-score-btn speak-score-btn-primary", "开始跟读评分");
    btnStart.type = "button";
    var btnStop = el("button", "speak-score-btn speak-score-btn-danger", "停止");
    btnStop.type = "button";
    btnStop.hidden = true;
    var btnRetry = el("button", "speak-score-btn", "再试一次");
    btnRetry.type = "button";
    btnRetry.hidden = true;
    actions.appendChild(btnStart);
    actions.appendChild(btnStop);
    actions.appendChild(btnRetry);

    var playFirstWrap = null;
    var playFirstChk = null;
    if (mode === "rs" && typeof opts.playPrompt === "function") {
      playFirstWrap = el("label", "speak-score-playfirst");
      playFirstChk = document.createElement("input");
      playFirstChk.type = "checkbox";
      playFirstChk.checked = true;
      playFirstWrap.appendChild(playFirstChk);
      playFirstWrap.appendChild(document.createTextNode(" 先听提示再跟读"));
      rootEl.appendChild(playFirstWrap);
    }

    rootEl.appendChild(actions);

    var status = el("p", "speak-score-status", "");
    status.hidden = true;
    rootEl.appendChild(status);

    var card = el("div", "speak-score-card");
    card.hidden = true;
    var scoreNum = el("div", "speak-score-num", "—");
    var scoreLabel = el("div", "speak-score-label", "得分");
    var bestLine = el("div", "speak-score-best", "");
    var transcriptLabel = el("div", "speak-score-sublabel", "识别文本");
    var transcript = el("p", "speak-score-transcript", "");
    var comment = el("p", "speak-score-comment", "");
    card.appendChild(scoreLabel);
    card.appendChild(scoreNum);
    card.appendChild(bestLine);
    card.appendChild(transcriptLabel);
    card.appendChild(transcript);
    card.appendChild(comment);
    rootEl.appendChild(card);

    var session = null; // { recognition, timer, finalText, interim }

    function setStatus(msg, show) {
      status.textContent = msg || "";
      status.hidden = !show;
    }

    function setListeningUI(on) {
      btnStart.hidden = on;
      btnStop.hidden = !on;
      btnRetry.hidden = on || card.hidden;
      if (playFirstWrap) playFirstWrap.classList.toggle("is-disabled", on);
      if (playFirstChk) playFirstChk.disabled = on;
    }

    function refreshBest() {
      var id = opts.getItemId ? opts.getItemId() : null;
      var best = getBest(mode, id);
      if (best != null) {
        bestLine.textContent = "本题最佳 " + best;
        bestLine.hidden = false;
      } else {
        bestLine.textContent = "";
        bestLine.hidden = true;
      }
    }

    function showResult(hyp, result) {
      card.hidden = false;
      scoreNum.textContent = String(result.score);
      scoreNum.className =
        "speak-score-num" +
        (result.score >= 65 ? " is-good" : result.score >= 40 ? " is-mid" : " is-low");
      transcript.textContent = hyp || "（无）";
      comment.textContent = feedbackFor(result, !hyp);
      var id = opts.getItemId ? opts.getItemId() : null;
      var best = saveBest(mode, id, result.score);
      if (best != null) {
        bestLine.textContent = "本题最佳 " + best;
        bestLine.hidden = false;
      }
      btnRetry.hidden = false;
      setStatus("", false);
      try {
        document.dispatchEvent(
          new CustomEvent("chinapte:speakscored", {
            detail: { mode: mode, id: id, score: result.score },
          })
        );
      } catch (e) {}
    }

    function cleanupSession() {
      if (!session) return;
      try {
        if (session.timer) clearTimeout(session.timer);
      } catch (e) {}
      try {
        if (session.recognition) {
          session.recognition.onresult = null;
          session.recognition.onerror = null;
          session.recognition.onend = null;
          session.recognition.stop();
        }
      } catch (e) {}
      session = null;
    }

    function finishWith(hyp) {
      cleanupSession();
      setListeningUI(false);
      var target = opts.getTarget ? opts.getTarget() : "";
      var result = scoreTranscript(target, hyp);
      showResult(hyp, result);
    }

    function startRecognition(target) {
      var Ctor = getRecognitionCtor();
      var rec = new Ctor();
      rec.lang = "en-US";
      rec.continuous = true;
      rec.interimResults = true;
      rec.maxAlternatives = 1;

      var finalText = "";
      var interim = "";
      var ended = false;

      session = { recognition: rec, timer: null, finalText: "", interim: "" };

      rec.onresult = function (ev) {
        interim = "";
        for (var i = ev.resultIndex; i < ev.results.length; i++) {
          var r = ev.results[i];
          var t = (r[0] && r[0].transcript) || "";
          if (r.isFinal) finalText += (finalText ? " " : "") + t;
          else interim += t;
        }
        session.finalText = finalText;
        session.interim = interim;
        var live = (finalText + " " + interim).trim();
        setStatus("正在听…" + (live ? " " + live : ""), true);
      };

      rec.onerror = function (ev) {
        var err = (ev && ev.error) || "";
        if (err === "aborted") return;
        if (err === "no-speech") {
          // Let onend / timer handle empty
          return;
        }
        if (err === "not-allowed" || err === "service-not-allowed") {
          ended = true;
          cleanupSession();
          setListeningUI(false);
          setStatus("无法使用麦克风，请在浏览器中允许麦克风权限", true);
          return;
        }
        setStatus("识别异常：" + err + "，可再试一次", true);
      };

      rec.onend = function () {
        if (ended) return;
        ended = true;
        var hyp = (finalText || interim || "").trim();
        finishWith(hyp);
      };

      var dur = listenDurationMs(target, mode);
      setStatus("请跟读（约 " + Math.round(dur / 1000) + " 秒）…", true);
      setListeningUI(true);
      card.hidden = true;
      btnRetry.hidden = true;

      try {
        rec.start();
      } catch (e) {
        setListeningUI(false);
        setStatus("无法启动语音识别，请刷新后用 Chrome 再试", true);
        cleanupSession();
        return;
      }

      session.timer = setTimeout(function () {
        try {
          rec.stop();
        } catch (e) {}
      }, dur);
    }

    function onStart() {
      var target = opts.getTarget ? opts.getTarget() : "";
      if (!target || !String(target).trim()) {
        setStatus("当前没有可跟读的句子", true);
        return;
      }
      // Ignore placeholder idle copy
      if (/点击「随身听」|暂无数据|无匹配/.test(target)) {
        setStatus("请先选择题号或播放一条题目", true);
        return;
      }

      if (typeof opts.stopPlayer === "function") {
        try {
          opts.stopPlayer();
        } catch (e) {}
      }

      cleanupSession();
      setListeningUI(true);
      setStatus("准备中…", true);
      card.hidden = true;

      var wantPrompt =
        mode === "rs" &&
        playFirstChk &&
        playFirstChk.checked &&
        typeof opts.playPrompt === "function";

      var chain = Promise.resolve();
      if (wantPrompt) {
        setStatus("播放提示音频…", true);
        chain = Promise.resolve()
          .then(function () {
            return opts.playPrompt();
          })
          .then(function () {
            return new Promise(function (r) {
              setTimeout(r, 400);
            });
          });
      }

      chain
        .then(function () {
          startRecognition(target);
        })
        .catch(function () {
          setStatus("提示播放失败，直接开始跟读", true);
          startRecognition(target);
        });
    }

    function onStop() {
      if (!session || !session.recognition) {
        setListeningUI(false);
        return;
      }
      try {
        session.recognition.stop();
      } catch (e) {
        finishWith((session.finalText || session.interim || "").trim());
      }
    }

    btnStart.addEventListener("click", onStart);
    btnStop.addEventListener("click", onStop);
    btnRetry.addEventListener("click", onStart);

    function refresh() {
      refreshBest();
      if (!session) {
        // Keep last result visible but update best for new item
      }
    }

    document.addEventListener("chinapte:itemchange", function (ev) {
      var d = ev && ev.detail;
      if (d && d.mode && d.mode !== mode) return;
      // Reset card when item changes (avoid showing prior item's transcript as current)
      if (session) {
        try {
          session.recognition.abort();
        } catch (e) {}
        cleanupSession();
        setListeningUI(false);
      }
      card.hidden = true;
      btnRetry.hidden = true;
      setStatus("", false);
      refreshBest();
    });

    document.addEventListener("chinapte:rasentence", function () {
      if (mode !== "ra") return;
      if (session) {
        try {
          session.recognition.abort();
        } catch (e) {}
        cleanupSession();
        setListeningUI(false);
      }
      card.hidden = true;
      btnRetry.hidden = true;
      setStatus("", false);
      refreshBest();
    });

    refreshBest();
    return {
      supported: true,
      refresh: refresh,
      scoreTranscript: scoreTranscript,
    };
  }

  global.ChinaPTESpeakScore = {
    isSupported: isSupported,
    normalize: normalize,
    tokenize: tokenize,
    scoreTranscript: scoreTranscript,
    mount: mount,
    getBest: getBest,
  };
})(typeof window !== "undefined" ? window : globalThis);
