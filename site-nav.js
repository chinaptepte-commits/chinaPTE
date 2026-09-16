/**
 * chinaPTE — shared site nav (single source of truth)
 */
(function () {
  "use strict";
  var ASSET_VER = "20260916r3";
  var ITEMS = [
    { href: "index.html", label: "首页", match: ["index.html", ""] },
    { href: "practice.html", label: "练习中心", match: ["practice.html", "wfd.html", "rs.html", "ra.html", "rl.html", "asq.html", "sst.html", "hiw.html", "di.html", "swt.html", "essay.html", "reading.html", "listening.html", "体验全部功能.html", "chinaPTE-体验全部功能.html", "chinaPTE-随身听.html", "chinaPTE-RS随身听.html"] },
    { href: "vocab.html", label: "单词库", match: ["vocab.html", "chinaPTE-单词随身听.html"] },
    { href: "industry.html", label: "行业英语", match: ["industry.html", "industry-"] },
    { href: "bank.html", label: "题库", match: ["bank.html"] },
    { href: "labor.html", label: "PTE直通车", match: ["labor.html"] },
    { href: "consult.html", label: "出国咨询", match: ["consult.html"] },
    { href: "mazu.html", label: "妈祖祈福", match: ["mazu.html"] }
  ];

  function fileName() {
    var p = (location.pathname || "").split("/").pop() || "index.html";
    try { p = decodeURIComponent(p); } catch (e) {}
    return p || "index.html";
  }

  function isActive(item, file) {
    for (var i = 0; i < item.match.length; i++) {
      var m = item.match[i];
      if (!m && (file === "index.html" || file === "")) return true;
      if (m.indexOf("-") === m.length - 1 || m === "industry-") {
        if (file.indexOf("industry-") === 0) return true;
      } else if (file === m) return true;
    }
    if (item.href === "industry.html" && file.indexOf("industry-") === 0) return true;
    return false;
  }

  function render() {
    var nav = document.querySelector("nav.site-nav");
    if (!nav) return;
    var file = fileName();
    var brand =
      '<a class="site-nav-brand" href="index.html">' +
      '<img class="site-nav-logo" src="logo.svg" width="36" height="36" alt="" />' +
      "chinaPTE</a>";
    var lis = ITEMS.map(function (it) {
      var active = isActive(it, file) ? ' class="is-active"' : "";
      return "<li><a href=\"" + it.href + "\"" + active + ">" + it.label + "</a></li>";
    }).join("");
    nav.setAttribute("aria-label", "站点导航");
    nav.innerHTML = brand + '<ul class="site-nav-links">' + lis + "</ul>";
  }

  function loadScript(src, attrs) {
    if (document.querySelector('script[src="' + src + '"]')) return null;
    var s = document.createElement("script");
    s.src = src;
    s.defer = true;
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        s.setAttribute(k, attrs[k]);
      });
    }
    (document.head || document.documentElement).appendChild(s);
    return s;
  }

  function loadAnalytics() {
    if (window.ChinaPTEAnalytics) return;
    if (document.querySelector("script[data-chinapte-analytics]")) return;
    loadScript("analytics.js?v=" + ASSET_VER, { "data-chinapte-analytics": "1" });
  }

  function loadAuth() {
    if (window.ChinaPTEAuth) {
      try { window.ChinaPTEAuth.initGate(); } catch (e) {}
      return;
    }
    if (document.querySelector("script[data-chinapte-auth]")) return;
    if (!window.CHINAPTE_MAZU) {
      loadScript("mazu-config.js?v=" + ASSET_VER, { "data-chinapte-mazu-config": "1" });
    }
    loadScript("auth-modal.js?v=" + ASSET_VER, { "data-chinapte-auth": "1" });
  }

  function boot() {
    render();
    loadAnalytics();
    loadAuth();
    if (window.ChinaPTEAuth) {
      try { window.ChinaPTEAuth.renderAccountChip(); } catch (e) {}
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
