/**
 * chinaPTE · RA 一句话模式
 * Split passage into sentences; score one at a time via speak-score getTarget.
 */
(function (global) {
  "use strict";

  function splitSentences(text) {
    var raw = String(text || "").trim();
    if (!raw) return [];
    // Split on sentence-final punctuation followed by space / end
    var parts = raw.match(/[^.!?。！？]+[.!?。！？]+|[^.!?。！？]+$/g);
    if (!parts) return [raw];
    return parts
      .map(function (s) {
        return s.trim();
      })
      .filter(Boolean);
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /**
   * opts: {
   *   rootId,
   *   getPlayer,
   *   onModeChange: function({ sentenceMode, index, sentences, getTarget, getItemId })
   * }
   */
  function mount(opts) {
    opts = opts || {};
    var root = document.getElementById(opts.rootId || "raSentenceRoot");
    if (!root) return null;

    var sentenceMode = false;
    var sentences = [];
    var index = 0;
    var bestBySentence = {}; // key itemId:sN -> score (mirrors speak-score storage display)

    root.innerHTML = "";
    root.classList.add("ra-sentence-panel");

    var modeRow = el("div", "ra-sentence-mode-row");
    modeRow.appendChild(el("span", "ra-sentence-label", "跟读范围"));
    var btnWhole = el("button", "ra-mode-btn is-active", "整段");
    btnWhole.type = "button";
    btnWhole.setAttribute("aria-pressed", "true");
    var btnSent = el("button", "ra-mode-btn", "一句话");
    btnSent.type = "button";
    btnSent.setAttribute("aria-pressed", "false");
    modeRow.appendChild(btnWhole);
    modeRow.appendChild(btnSent);
    root.appendChild(modeRow);

    var nav = el("div", "ra-sentence-nav");
    nav.hidden = true;
    var btnPrev = el("button", "ra-sentence-nav-btn", "上一句");
    btnPrev.type = "button";
    var progress = el("span", "ra-sentence-progress", "1 / 1");
    var btnNext = el("button", "ra-sentence-nav-btn", "下一句");
    btnNext.type = "button";
    nav.appendChild(btnPrev);
    nav.appendChild(progress);
    nav.appendChild(btnNext);
    root.appendChild(nav);

    var preview = el("p", "ra-sentence-preview", "");
    preview.hidden = true;
    root.appendChild(preview);

    var agg = el("div", "ra-sentence-agg", "");
    agg.hidden = true;
    root.appendChild(agg);

    function passageText() {
      var p = opts.getPlayer && opts.getPlayer();
      if (p && typeof p.getTargetText === "function") return p.getTargetText() || "";
      var en = document.getElementById("sentenceEn");
      return en ? en.getAttribute("data-full-passage") || en.textContent || "" : "";
    }

    function itemId() {
      var p = opts.getPlayer && opts.getPlayer();
      if (p && typeof p.getItemId === "function") return p.getItemId();
      return null;
    }

    function loadBests() {
      bestBySentence = {};
      try {
        var map = JSON.parse(localStorage.getItem("chinaPTE_speak_best") || "{}");
        var id = itemId();
        if (id == null) return;
        var prefix = "ra:" + String(id) + ":s";
        Object.keys(map).forEach(function (k) {
          if (k.indexOf(prefix) === 0) {
            bestBySentence[k] = map[k];
          }
        });
      } catch (e) {}
    }

    function renderAgg() {
      if (!sentenceMode || !sentences.length) {
        agg.hidden = true;
        agg.innerHTML = "";
        return;
      }
      loadBests();
      var id = itemId();
      var parts = [];
      var sum = 0;
      var n = 0;
      for (var i = 0; i < sentences.length; i++) {
        var key = "ra:" + String(id) + ":s" + i;
        var b = bestBySentence[key];
        if (typeof b === "number") {
          parts.push("第" + (i + 1) + "句 " + b);
          sum += b;
          n++;
        } else {
          parts.push("第" + (i + 1) + "句 —");
        }
      }
      var avg = n ? Math.round(sum / n) : null;
      agg.textContent =
        "各句最佳：" +
        parts.join(" · ") +
        (avg != null ? " ｜ 已练均分 " + avg : "");
      agg.hidden = false;
    }

    function highlightPassage() {
      var en = document.getElementById("sentenceEn");
      if (!en) return;
      var full = passageText();
      if (!full || /点击「随身听」|暂无|无匹配/.test(full)) return;
      en.setAttribute("data-full-passage", full);

      if (!sentenceMode || !sentences.length) {
        en.textContent = full;
        en.classList.remove("ra-has-sentence-hl");
        preview.hidden = true;
        return;
      }

      en.innerHTML = "";
      en.classList.add("ra-has-sentence-hl");
      sentences.forEach(function (s, i) {
        var span = document.createElement("span");
        span.className = "ra-sent" + (i === index ? " is-current" : "");
        span.textContent = s + (i < sentences.length - 1 ? " " : "");
        en.appendChild(span);
      });
      preview.hidden = false;
      preview.textContent = "当前句：" + sentences[index];
    }

    function syncNav() {
      nav.hidden = !sentenceMode;
      if (!sentenceMode) {
        progress.textContent = "";
        return;
      }
      var total = Math.max(sentences.length, 1);
      var i = Math.min(index + 1, total);
      progress.textContent = i + " / " + total;
      btnPrev.disabled = index <= 0;
      btnNext.disabled = index >= sentences.length - 1;
    }

    function notify() {
      if (typeof opts.onModeChange === "function") {
        opts.onModeChange({
          sentenceMode: sentenceMode,
          index: index,
          sentences: sentences.slice(),
          getTarget: getTarget,
          getItemId: getScoreItemId,
        });
      }
      // Custom event for speak-score refresh listeners
      try {
        document.dispatchEvent(
          new CustomEvent("chinapte:rasentence", {
            detail: {
              sentenceMode: sentenceMode,
              index: index,
              count: sentences.length,
              target: getTarget(),
            },
          })
        );
      } catch (e) {}
    }

    function getTarget() {
      if (sentenceMode && sentences.length) {
        return sentences[index] || "";
      }
      return passageText();
    }

    function getScoreItemId() {
      var id = itemId();
      if (id == null) return null;
      if (sentenceMode) return String(id) + ":s" + index;
      return id;
    }

    function reloadFromItem() {
      var full = passageText();
      sentences = splitSentences(full);
      if (index >= sentences.length) index = 0;
      syncNav();
      highlightPassage();
      renderAgg();
      notify();
    }

    function setMode(on) {
      sentenceMode = !!on;
      btnWhole.classList.toggle("is-active", !sentenceMode);
      btnSent.classList.toggle("is-active", sentenceMode);
      btnWhole.setAttribute("aria-pressed", sentenceMode ? "false" : "true");
      btnSent.setAttribute("aria-pressed", sentenceMode ? "true" : "false");
      index = 0;
      reloadFromItem();
    }

    btnWhole.addEventListener("click", function () {
      setMode(false);
    });
    btnSent.addEventListener("click", function () {
      setMode(true);
    });
    btnPrev.addEventListener("click", function () {
      if (index > 0) {
        index--;
        syncNav();
        highlightPassage();
        renderAgg();
        notify();
      }
    });
    btnNext.addEventListener("click", function () {
      if (index < sentences.length - 1) {
        index++;
        syncNav();
        highlightPassage();
        renderAgg();
        notify();
      }
    });

    document.addEventListener("chinapte:itemchange", function (ev) {
      if (ev && ev.detail && ev.detail.mode && ev.detail.mode !== "ra") return;
      index = 0;
      setTimeout(reloadFromItem, 0);
    });

    // After speak-score saves best, refresh aggregate
    document.addEventListener("chinapte:rasentence", function () {});
    // Poll best map lightly after focus / visibility
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) renderAgg();
    });

    setTimeout(reloadFromItem, 80);

    return {
      getTarget: getTarget,
      getItemId: getScoreItemId,
      isSentenceMode: function () {
        return sentenceMode;
      },
      refreshAgg: renderAgg,
      splitSentences: splitSentences,
    };
  }

  global.ChinaPTERaSentence = {
    mount: mount,
    splitSentences: splitSentences,
  };
})(typeof window !== "undefined" ? window : globalThis);
