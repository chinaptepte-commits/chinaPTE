/**
 * chinaPTE — render AU/NZ industry English category pages
 * Expects window.INDUSTRY_KEY and window.INDUSTRY_DATA
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

  function render() {
    var key = window.INDUSTRY_KEY;
    var data = (window.INDUSTRY_DATA || {})[key];
    var root = document.getElementById("industryRoot");
    if (!root || !data) {
      if (root) root.innerHTML = '<p class="labor-intro">内容加载失败。</p>';
      return;
    }

    var vocabHtml = (data.vocab || [])
      .map(function (w, i) {
        var spell = w.spell
          ? '<span class="ind-spell">' + esc(w.spell) + "</span>"
          : "";
        return (
          '<li class="ind-item">' +
          '<div class="ind-main">' +
          '<span class="ind-en">' +
          esc(w.en) +
          "</span>" +
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
          '<li class="ind-item">' +
          '<div class="ind-main">' +
          '<span class="ind-en">' +
          esc(p.en) +
          "</span>" +
          '<span class="ind-zh">' +
          esc(p.zh) +
          "</span>" +
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
      '<h2 class="section-title">常用词汇 · ' +
      (data.vocab || []).length +
      " 词</h2>" +
      '<ul class="ind-list">' +
      vocabHtml +
      "</ul>" +
      '<h2 class="section-title">常用沟通句子 · ' +
      (data.phrases || []).length +
      " 句</h2>" +
      '<ul class="ind-list">' +
      phraseHtml +
      "</ul>" +
      '<div class="bridge-card" style="margin-top:20px">' +
      "<h2>出国劳务 · 落地英语</h2>" +
      "<p>这些用语可配合出国劳务咨询一起了解。继续免费练 PTE，或查看正规出国路径说明。</p>" +
      '<a class="btn-soft" href="labor.html">了解出国劳务</a>' +
      '<a class="btn-secondary-link" href="consult.html" style="margin-left:8px">免费咨询留资</a>' +
      '<a class="btn-secondary-link" href="practice.html" style="margin-left:8px">继续练 PTE</a>' +
      "</div>";

    root.addEventListener("click", function (ev) {
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
