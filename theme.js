/**
 * chinaPTE day/night theme
 * Mode: auto | day | night  (localStorage key: chinaPTE_theme_mode)
 * Auto: local clock 06:00–18:59 → day, otherwise night
 * UI: one small button — tap cycles day → night → auto
 */
(function () {
  var KEY = "chinaPTE_theme_mode";
  var DAY_START = 6;
  var DAY_END = 19;
  var META_DAY = "#f4f6fb";
  var META_NIGHT = "#0c0f14";
  var ORDER = ["day", "night", "auto"];
  var LABEL = { day: "日间", night: "夜间", auto: "自动" };

  function resolveTheme(mode) {
    if (mode === "day" || mode === "night") return mode;
    var h = new Date().getHours();
    return h >= DAY_START && h < DAY_END ? "day" : "night";
  }

  function getMode() {
    try {
      var m = localStorage.getItem(KEY);
      if (m === "day" || m === "night" || m === "auto") return m;
    } catch (e) {}
    return "auto";
  }

  function setMode(mode) {
    if (mode !== "auto" && mode !== "day" && mode !== "night") mode = "auto";
    try {
      localStorage.setItem(KEY, mode);
    } catch (e) {}
    apply();
  }

  function cycleMode() {
    var cur = getMode();
    var i = ORDER.indexOf(cur);
    setMode(ORDER[(i < 0 ? 0 : i + 1) % ORDER.length]);
  }

  function updateMeta(theme) {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "day" ? META_DAY : META_NIGHT);
  }

  function syncButtons(mode) {
    var buttons = document.querySelectorAll(".theme-toggle-cycle");
    for (var i = 0; i < buttons.length; i++) {
      var btn = buttons[i];
      btn.setAttribute("data-theme-mode", mode);
      btn.textContent = LABEL[mode] || mode;
      btn.setAttribute(
        "aria-label",
        "皮肤：" + (LABEL[mode] || mode) + "（点按切换 日间→夜间→自动）"
      );
      btn.title =
        "当前：" +
        (LABEL[mode] || mode) +
        " · 点按切换 日间→夜间→自动（自动=06:00–18:59 日间）";
    }
  }

  function apply() {
    var mode = getMode();
    var theme = resolveTheme(mode);
    document.documentElement.setAttribute("data-theme", theme);
    updateMeta(theme);
    syncButtons(mode);
  }

  function createToggle(opts) {
    var wrap = document.createElement("div");
    wrap.className = "theme-toggle" + (opts.extraClass ? " " + opts.extraClass : "");
    if (opts.id) wrap.id = opts.id;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "theme-toggle-cycle";
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      cycleMode();
    });
    wrap.appendChild(btn);
    return wrap;
  }

  function buildToggle() {
    if (!document.getElementById("themeToggle")) {
      document.body.appendChild(
        createToggle({ id: "themeToggle", extraClass: "theme-toggle--sticky" })
      );
    }
    var nav = document.querySelector(".site-nav");
    if (nav && !document.getElementById("themeToggleNav")) {
      nav.appendChild(
        createToggle({ id: "themeToggleNav", extraClass: "theme-toggle--nav" })
      );
    }
  }

  function boot() {
    apply();
    buildToggle();
    syncButtons(getMode());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  setInterval(function () {
    if (getMode() === "auto") apply();
  }, 30000);
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) apply();
  });

  window.ChinaPTETheme = {
    getMode: getMode,
    setMode: setMode,
    cycleMode: cycleMode,
    apply: apply,
    resolveTheme: resolveTheme
  };
})();
