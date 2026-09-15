/**
 * chinaPTE · WFD 听写练习
 * Listen → type → 确定/核对 → word-level green/red comparison
 */
(function (global) {
  "use strict";

  function normalizeToken(t) {
    return String(t || "")
      .toLowerCase()
      .replace(/[’']/g, "'")
      .replace(/^[^a-z0-9']+|[^a-z0-9']+$/g, "")
      .trim();
  }

  function tokenizeDisplay(text) {
    var raw = String(text || "").trim();
    if (!raw) return [];
    // Keep display forms; split on whitespace
    return raw.split(/\s+/).filter(Boolean);
  }

  function tokenizeNorm(text) {
    return tokenizeDisplay(text)
      .map(normalizeToken)
      .filter(Boolean);
  }

  /**
   * Align target vs user tokens (edit distance DP).
   * Returns list of { type: 'match'|'sub'|'del'|'ins', target?, user? }
   */
  function alignTokens(targetToks, userToks) {
    var n = targetToks.length;
    var m = userToks.length;
    var dp = [];
    var i, j;
    for (i = 0; i <= n; i++) {
      dp[i] = new Array(m + 1);
      dp[i][0] = i;
    }
    for (j = 0; j <= m; j++) dp[0][j] = j;
    for (i = 1; i <= n; i++) {
      for (j = 1; j <= m; j++) {
        var cost = targetToks[i - 1] === userToks[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
      }
    }
    var ops = [];
    i = n;
    j = m;
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && targetToks[i - 1] === userToks[j - 1] && dp[i][j] === dp[i - 1][j - 1]) {
        ops.push({ type: "match", ti: i - 1, ui: j - 1 });
        i--;
        j--;
      } else if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + 1) {
        ops.push({ type: "sub", ti: i - 1, ui: j - 1 });
        i--;
        j--;
      } else if (j > 0 && dp[i][j] === dp[i][j - 1] + 1) {
        ops.push({ type: "ins", ui: j - 1 });
        j--;
      } else {
        ops.push({ type: "del", ti: i - 1 });
        i--;
      }
    }
    ops.reverse();
    return ops;
  }

  function compareDictation(target, userInput) {
    var tDisp = tokenizeDisplay(target);
    var uDisp = tokenizeDisplay(userInput);
    var tNorm = tDisp.map(normalizeToken).filter(Boolean);
    // Rebuild display lists aligned to normalized tokens (drop pure-punct tokens)
    var tWords = [];
    var uWords = [];
    tDisp.forEach(function (w) {
      var n = normalizeToken(w);
      if (n) tWords.push(w);
    });
    uDisp.forEach(function (w) {
      var n = normalizeToken(w);
      if (n) uWords.push(w);
    });
    var tN = tWords.map(normalizeToken);
    var uN = uWords.map(normalizeToken);
    var ops = alignTokens(tN, uN);
    var correct = 0;
    var total = tN.length || 1;
    ops.forEach(function (op) {
      if (op.type === "match") correct++;
    });
    return {
      ops: ops,
      tWords: tWords,
      uWords: uWords,
      correct: correct,
      total: tN.length,
      score: tN.length ? Math.round((correct / tN.length) * 100) : 0,
    };
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function mount(opts) {
    opts = opts || {};
    var root = document.getElementById(opts.rootId || "wfdDictationRoot");
    if (!root) return null;

    var hideOn = true;
    var checked = false;
    var lastTarget = "";

    root.innerHTML = "";
    root.classList.add("wfd-dictation");

    var head = el("div", "wfd-dictation-head");
    head.appendChild(el("h3", "wfd-dictation-title", "听写练习"));
    var hideLabel = el("label", "wfd-dictation-hide-toggle");
    var hideChk = document.createElement("input");
    hideChk.type = "checkbox";
    hideChk.checked = true;
    hideLabel.appendChild(hideChk);
    hideLabel.appendChild(document.createTextNode(" 隐藏答案（练习模式）"));
    head.appendChild(hideLabel);
    root.appendChild(head);

    var hint = el(
      "p",
      "wfd-dictation-hint",
      "先听音频，在下方输入你听到的英文，再点「确定 / 核对」。练习模式不会提前显示原文。"
    );
    root.appendChild(hint);

    var actionsTop = el("div", "wfd-dictation-actions");
    var btnListen = el("button", "wfd-dictation-btn", "▶ 再听一遍");
    btnListen.type = "button";
    actionsTop.appendChild(btnListen);
    root.appendChild(actionsTop);

    var ta = document.createElement("textarea");
    ta.id = "wfdDictationInput";
    ta.className = "wfd-dictation-input";
    ta.rows = 3;
    ta.placeholder = "在此输入你听到的句子…";
    ta.setAttribute("autocomplete", "off");
    ta.setAttribute("autocapitalize", "sentences");
    ta.setAttribute("spellcheck", "true");
    root.appendChild(ta);

    var actions = el("div", "wfd-dictation-actions");
    var btnCheck = el("button", "wfd-dictation-btn wfd-dictation-btn-primary", "确定 / 核对");
    btnCheck.type = "button";
    var btnReset = el("button", "wfd-dictation-btn", "清空重写");
    btnReset.type = "button";
    var btnReveal = el("button", "wfd-dictation-btn", "显示原文");
    btnReveal.type = "button";
    actions.appendChild(btnCheck);
    actions.appendChild(btnReset);
    actions.appendChild(btnReveal);
    root.appendChild(actions);

    var result = el("div", "wfd-dictation-result");
    result.hidden = true;
    var scoreLine = el("div", "wfd-dictation-score", "");
    var compareBox = el("div", "wfd-dictation-compare", "");
    var targetLine = el("p", "wfd-dictation-target", "");
    var zhLine = el("p", "wfd-dictation-zh", "");
    result.appendChild(scoreLine);
    result.appendChild(el("div", "wfd-dictation-sublabel", "对照（绿=正确 · 红=错误/多余 · 灰=漏写）"));
    result.appendChild(compareBox);
    result.appendChild(el("div", "wfd-dictation-sublabel", "正确答案"));
    result.appendChild(targetLine);
    result.appendChild(zhLine);
    root.appendChild(result);

    function getPlayer() {
      return opts.getPlayer ? opts.getPlayer() : null;
    }

    function currentTarget() {
      var p = getPlayer();
      if (p && typeof p.getTargetText === "function") return p.getTargetText() || "";
      var en = document.getElementById("sentenceEn");
      return en ? en.getAttribute("data-full-en") || "" : "";
    }

    function currentZh() {
      var p = getPlayer();
      if (p && typeof p.getCurrentItem === "function") {
        var it = p.getCurrentItem();
        if (it) return it.zhAnalysis || it.zh || "";
      }
      return "";
    }

    function applyHideToCard() {
      var card = document.querySelector(".now-card");
      var en = document.getElementById("sentenceEn");
      var zh = document.getElementById("sentenceZh");
      var vocab = document.querySelector(".vocab-section");
      if (!en) return;
      if (!en.getAttribute("data-full-en") && en.textContent && !/听写模式|点击「随身听」|无匹配|暂无/.test(en.textContent)) {
        en.setAttribute("data-full-en", en.textContent);
      }
      var target = currentTarget() || en.getAttribute("data-full-en") || "";
      if (hideOn && !checked) {
        if (card) card.classList.add("is-dictation-hide");
        en.textContent = "（听写模式：听音频后输入，核对后显示原文）";
        en.classList.add("is-spoiler-hidden");
        if (zh) {
          zh.textContent = "中文解读已隐藏";
          zh.classList.add("is-spoiler-hidden");
        }
        if (vocab) vocab.hidden = true;
      } else {
        if (card) card.classList.remove("is-dictation-hide");
        en.classList.remove("is-spoiler-hidden");
        if (zh) zh.classList.remove("is-spoiler-hidden");
        if (vocab) vocab.hidden = false;
        if (target) en.textContent = target;
        var z = currentZh();
        if (zh && z) zh.textContent = z;
      }
    }

    function resetForItem() {
      checked = false;
      ta.value = "";
      result.hidden = true;
      compareBox.innerHTML = "";
      scoreLine.textContent = "";
      targetLine.textContent = "";
      zhLine.textContent = "";
      lastTarget = currentTarget();
      var en = document.getElementById("sentenceEn");
      if (en && lastTarget) en.setAttribute("data-full-en", lastTarget);
      applyHideToCard();
    }

    function renderCompare(cmp) {
      compareBox.innerHTML = "";
      cmp.ops.forEach(function (op) {
        var span = document.createElement("span");
        span.className = "wfd-word";
        if (op.type === "match") {
          span.classList.add("is-correct");
          span.textContent = cmp.tWords[op.ti];
        } else if (op.type === "sub") {
          span.classList.add("is-wrong");
          span.textContent = cmp.uWords[op.ui];
          span.title = "应为：" + cmp.tWords[op.ti];
        } else if (op.type === "ins") {
          span.classList.add("is-extra");
          span.textContent = cmp.uWords[op.ui];
          span.title = "多余";
        } else if (op.type === "del") {
          span.classList.add("is-missing");
          span.textContent = cmp.tWords[op.ti];
          span.title = "漏写";
        }
        compareBox.appendChild(span);
        compareBox.appendChild(document.createTextNode(" "));
      });
    }

    function doCheck() {
      var target = currentTarget();
      if (!target || /听写模式|点击「随身听」|暂无|无匹配/.test(target)) {
        // try data-full-en
        var en = document.getElementById("sentenceEn");
        target = (en && en.getAttribute("data-full-en")) || target;
      }
      if (!target || /听写模式|点击「随身听」|暂无|无匹配/.test(target)) {
        scoreLine.textContent = "当前没有可核对的句子";
        result.hidden = false;
        return;
      }
      var user = ta.value;
      if (!String(user).trim()) {
        scoreLine.textContent = "请先输入你听到的内容";
        result.hidden = false;
        compareBox.innerHTML = "";
        return;
      }
      var cmp = compareDictation(target, user);
      checked = true;
      scoreLine.textContent =
        "正确 " + cmp.correct + " / " + cmp.total + " 词（" + cmp.score + "%）";
      renderCompare(cmp);
      targetLine.textContent = target;
      var z = currentZh();
      zhLine.textContent = z ? z : "";
      zhLine.hidden = !z;
      result.hidden = false;
      applyHideToCard();
    }

    hideChk.addEventListener("change", function () {
      hideOn = !!hideChk.checked;
      applyHideToCard();
    });

    btnCheck.addEventListener("click", doCheck);
    btnReset.addEventListener("click", function () {
      ta.value = "";
      checked = false;
      result.hidden = true;
      applyHideToCard();
      ta.focus();
    });
    btnReveal.addEventListener("click", function () {
      checked = true;
      hideOn = false;
      hideChk.checked = false;
      var target = currentTarget();
      var en = document.getElementById("sentenceEn");
      if ((!target || /听写模式/.test(target)) && en) {
        target = en.getAttribute("data-full-en") || target;
      }
      targetLine.textContent = target || "";
      zhLine.textContent = currentZh() || "";
      result.hidden = false;
      applyHideToCard();
    });

    btnListen.addEventListener("click", function () {
      var p = getPlayer();
      if (p && typeof p.playPromptEn === "function") {
        p.playPromptEn();
      }
    });

    ta.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        doCheck();
      }
    });

    document.addEventListener("chinapte:itemchange", function (ev) {
      if (ev && ev.detail && ev.detail.mode && ev.detail.mode !== "wfd") return;
      // Defer so player.renderItem finishes writing sentenceEn
      setTimeout(resetForItem, 0);
    });

    // Initial
    setTimeout(resetForItem, 50);

    return {
      reset: resetForItem,
      check: doCheck,
      compareDictation: compareDictation,
    };
  }

  global.ChinaPTEWfdDictation = {
    mount: mount,
    compareDictation: compareDictation,
    alignTokens: alignTokens,
    normalizeToken: normalizeToken,
  };
})(typeof window !== "undefined" ? window : globalThis);
