/**
 * chinaPTE — render AU/NZ industry English category pages
 * Expects window.INDUSTRY_KEY and window.INDUSTRY_DATA
 * Vocab: en + ipa + zh (+ spell / 朗读)
 * Phrases: en + zh + keys block (en / ipa / zh)
 * Tabs: 常用词汇 | 常用句子 (default vocab; only one section visible)
 */
(function () {
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function speak(text) {
    try {
      if (!window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(String(text || ""));
      u.lang = "en-AU";
      u.rate = 0.92;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  function renderKeys(keys) {
    if (!keys || !keys.length) return "";
    var items = keys
      .map(function (k) {
        return (
          '<li class="ind-key">' +
          '<span class="ind-key-en">' +
          esc(k.en) +
          "</span>" +
          (k.ipa ? '<span class="ind-key-ipa">' + esc(k.ipa) + "</span>" : "") +
          '<span class="ind-key-zh">' +
          esc(k.zh || "") +
          "</span>" +
          "</li>"
        );
      })
      .join("");
    return (
      '<div class="ind-keys" aria-label="句中关键词">' +
      '<div class="ind-keys-label">关键词</div>' +
      "<ul>" +
      items +
      "</ul>" +
      "</div>"
    );
  }

  function setPanel(root, mode) {
    var isVocab = mode !== "phrases";
    var panelVocab = root.querySelector("#indPanelVocab");
    var panelPhrases = root.querySelector("#indPanelPhrases");
    if (panelVocab) panelVocab.hidden = !isVocab;
    if (panelPhrases) panelPhrases.hidden = isVocab;
    root.querySelectorAll(".ind-tab").forEach(function (btn) {
      var active = btn.getAttribute("data-ind-tab") === (isVocab ? "vocab" : "phrases");
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  function render() {
    var key = window.INDUSTRY_KEY;
    var data = (window.INDUSTRY_DATA || {})[key];
    var root = document.getElementById("industryRoot");
    if (!root || !data) {
      if (root) root.innerHTML = '<p class="labor-intro">内容加载失败。</p>';
      return;
    }

    var vocabCount = (data.vocab || []).length;
    var phraseCount = (data.phrases || []).length;

    var vocabHtml = (data.vocab || [])
      .map(function (w) {
        var spell = w.spell
          ? '<span class="ind-spell">' + esc(w.spell) + "</span>"
          : "";
        var ipa = w.ipa
          ? '<span class="ind-ipa">' + esc(w.ipa) + "</span>"
          : "";
        return (
          '<li class="ind-item">' +
          '<div class="ind-main">' +
          '<span class="ind-en">' +
          esc(w.en) +
          "</span>" +
          ipa +
          '<span class="ind-zh">' +
          esc(w.zh) +
          "</span>" +
          spell +
          "</div>" +
          '<button type="button" class="ind-speak" data-speak="' +
          esc(w.en) +
          '" aria-label="朗读">朗读</button>' +
          "</li>"
        );
      })
      .join("");

    var phraseHtml = (data.phrases || [])
      .map(function (p) {
        return (
          '<li class="ind-item ind-item-phrase">' +
          '<div class="ind-main">' +
          '<span class="ind-en">' +
          esc(p.en) +
          "</span>" +
          '<span class="ind-zh">' +
          esc(p.zh) +
          "</span>" +
          renderKeys(p.keys) +
          "</div>" +
          '<button type="button" class="ind-speak" data-speak="' +
          esc(p.en) +
          '" aria-label="朗读">朗读</button>' +
          "</li>"
        );
      })
      .join("");

    root.innerHTML =
      '<section class="home-hero" style="padding-top:8px">' +
      "<h1>" +
      esc(data.title) +
      "</h1>" +
      '<p class="tagline">' +
      esc(data.titleEn || "") +
      " · 澳新职场英语</p>" +
      "</section>" +
      '<p class="labor-intro">' +
      esc(data.intro || "") +
      "</p>" +
      (data.softNote
        ? '<p class="tip-banner">' + esc(data.softNote) + "</p>"
        : "") +
      '<p class="ind-back"><a href="industry.html">← 返回行业英语总览</a></p>' +
      '<div class="ind-tabs" role="tablist" aria-label="词汇与句子切换">' +
      '<button type="button" class="ind-tab is-active" role="tab" aria-selected="true" data-ind-tab="vocab" id="indTabVocab">常用词汇 · ' +
      vocabCount +
      "</button>" +
      '<button type="button" class="ind-tab" role="tab" aria-selected="false" data-ind-tab="phrases" id="indTabPhrases">常用句子 · ' +
      phraseCount +
      "</button>" +
      "</div>" +
      '<div id="indPanelVocab" class="ind-panel" role="tabpanel" aria-labelledby="indTabVocab">' +
      '<h2 class="section-title">常用词汇 · ' +
      vocabCount +
      " 词</h2>" +
      '<ul class="ind-list">' +
      vocabHtml +
      "</ul>" +
      "</div>" +
      '<div id="indPanelPhrases" class="ind-panel" role="tabpanel" aria-labelledby="indTabPhrases" hidden>' +
      '<h2 class="section-title">常用沟通句子 · ' +
      phraseCount +
      " 句</h2>" +
      '<ul class="ind-list">' +
      phraseHtml +
      "</ul>" +
      "</div>" +
      '<div class="bridge-card" style="margin-top:20px">' +
      '<a class="btn-soft" href="labor.html">了解 PTE直通车</a>' +
      '<a class="btn-secondary-link" href="consult.html" style="margin-left:8px">免费咨询留资</a>' +
      '<a class="btn-secondary-link" href="practice.html" style="margin-left:8px">继续练 PTE</a>' +
      "</div>";

    root.addEventListener("click", function (ev) {
      var tabBtn = ev.target.closest("[data-ind-tab]");
      if (tabBtn) {
        setPanel(root, tabBtn.getAttribute("data-ind-tab") === "phrases" ? "phrases" : "vocab");
        return;
      }
      var btn = ev.target.closest("[data-speak]");
      if (!btn) return;
      speak(btn.getAttribute("data-speak"));
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
