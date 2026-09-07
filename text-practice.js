/**
 * chinaPTE · text / light-audio practice pages
 */
(function (global) {
  "use strict";

  function init(cfg) {
    const bank = global[cfg.bankGlobal] || [];
    let items = bank.slice();
    let index = 0;
    let revealed = false;
    const storageKey = cfg.storageKey + "_idx";

    const $ = (id) => document.getElementById(id);
    const els = {
      total: $("totalCount"),
      progress: $("progressText"),
      en: $("itemEn"),
      zh: $("itemZh"),
      answerBox: $("answerBox"),
      answer: $("itemAnswer"),
      chips: $("vocabChips"),
      badge: $("typeBadge"),
      search: $("textSearch"),
      typeFilter: $("typeFilter"),
      clear: $("btnClear"),
      prev: $("btnPrev"),
      next: $("btnNext"),
      reveal: $("btnReveal"),
      speak: $("btnSpeak"),
      imageWrap: $("itemImageWrap"),
      image: $("itemImage"),
    };

    try {
      const saved = parseInt(localStorage.getItem(storageKey) || "0", 10);
      if (!isNaN(saved) && saved >= 0 && saved < bank.length) index = saved;
    } catch {}

    if (cfg.typeFilter && els.typeFilter) {
      const types = Array.from(new Set(bank.map((b) => b.type).filter(Boolean)));
      if (types.length) {
        els.typeFilter.hidden = false;
        els.typeFilter.innerHTML =
          '<option value="">全部题型</option>' +
          types.map((t) => `<option value="${t}">${t}</option>`).join("");
        els.typeFilter.addEventListener("change", applyFilter);
      }
    }

    function applyFilter() {
      const q = (els.search && els.search.value || "").trim().toLowerCase();
      const t = els.typeFilter && !els.typeFilter.hidden ? els.typeFilter.value : "";
      items = bank.filter((it) => {
        if (t && it.type !== t) return false;
        if (!q) return true;
        const hay = [
          it.en, it.zhAnalysis, it.answer, it.type, it.scene, it.prompt
        ].join(" ").toLowerCase();
        return hay.includes(q);
      });
      index = 0;
      revealed = false;
      render();
    }

    function save() {
      try { localStorage.setItem(storageKey, String(index)); } catch {}
    }

    function render() {
      if (els.total) els.total.textContent = String(bank.length);
      const it = items[index];
      if (!it) {
        if (els.en) els.en.textContent = "无匹配条目";
        if (els.zh) els.zh.textContent = "";
        if (els.progress) els.progress.textContent = `0 / ${items.length}`;
        if (els.imageWrap) els.imageWrap.hidden = true;
        return;
      }
      if (els.progress) els.progress.textContent = `${index + 1} / ${items.length}`;
      if (els.badge) els.badge.textContent = it.type || "练习";
      if (els.en) els.en.textContent = it.en || it.scene || it.prompt || "";
      if (els.zh) {
        els.zh.textContent = revealed ? (it.zhAnalysis || "") : "（先自己练习，再点「看提示/答案」）";
        els.zh.classList.toggle("hidden", false);
      }
      if (els.answerBox) {
        const ans = it.answer || it.samplePoints || "";
        if (revealed && ans) {
          els.answerBox.hidden = false;
          if (els.answer) els.answer.textContent = ans;
        } else {
          els.answerBox.hidden = true;
        }
      }
      if (els.imageWrap && els.image) {
        const src = it.image || it.imageUrl || "";
        const show = !!(src && (cfg.showImage !== false));
        if (show) {
          els.image.src = src;
          els.image.alt = it.en || it.scene || "Describe Image";
          els.imageWrap.hidden = false;
        } else {
          els.image.removeAttribute("src");
          els.image.alt = "";
          els.imageWrap.hidden = true;
        }
      }
      if (els.chips) {
        els.chips.innerHTML = "";
        (it.vocab || []).forEach((v) => {
          const span = document.createElement("span");
          span.className = "chip";
          span.innerHTML = `<span class="chip-word">${v.word}</span><span class="chip-gloss">${v.gloss || ""}</span>`;
          els.chips.appendChild(span);
        });
      }
      save();
    }

    function speakEn() {
      const it = items[index];
      if (!it || !window.speechSynthesis) return;
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(it.en || "");
      u.lang = "en-US";
      u.rate = 0.9;
      speechSynthesis.speak(u);
    }

    if (els.prev) els.prev.addEventListener("click", () => {
      index = Math.max(0, index - 1); revealed = false; render();
    });
    if (els.next) els.next.addEventListener("click", () => {
      index = Math.min(items.length - 1, index + 1); revealed = false; render();
    });
    if (els.reveal) els.reveal.addEventListener("click", () => {
      revealed = !revealed; render();
    });
    if (els.speak) els.speak.addEventListener("click", speakEn);
    if (els.search) {
      let t = null;
      els.search.addEventListener("input", () => {
        clearTimeout(t);
        t = setTimeout(applyFilter, 160);
      });
    }
    if (els.clear) els.clear.addEventListener("click", () => {
      if (els.search) els.search.value = "";
      if (els.typeFilter) els.typeFilter.value = "";
      applyFilter();
    });

    render();
  }

  global.ChinaPTETextPractice = { init };
})(typeof window !== "undefined" ? window : globalThis);
