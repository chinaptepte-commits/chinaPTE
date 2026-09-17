/**
 * chinaPTE · 小红书分享条（复制文案 + UTM 链接，无外部 API）
 * Mounts on [data-xhs-share] containers (homepage / practice / mazu).
 */
(function (global) {
  "use strict";

  var CAPTIONS = {
    home: {
      title: "华人 PTE 免费练习站",
      body:
        "备考 PTE 不想再花冤枉钱？\n" +
        "chinaPTE 免费题库 + WFD听写 / RS跟读随身听，关屏也能刷。\n" +
        "还有澳新打工行业英语、合规出国路径说明。\n" +
        "零广告轰炸，打开就能练👇",
      hashtags: "#PTE #PTE备考 #华人留学 #澳洲英语 #新西兰打工 #免费题库",
    },
    practice: {
      title: "PTE 练习中心一站入口",
      body:
        "口语听力读写主要题型都在这：\n" +
        "WFD听写 · RS跟读 · RA · SST · HIW · 单词库…\n" +
        "耳机记忆法：英文 → 中文解读 → 难词拼写。\n" +
        "适合碎片时间刷题，完全免费👇",
      hashtags: "#PTE练习 #WFD #RS跟读 #PTE题库 #备考干货",
    },
    mazu: {
      title: "妈祖祈福 · 备考出海平安",
      body:
        "备考压力大、远行心里没底时，\n" +
        "可以先来 chinaPTE 妈祖祈福页留一句心意留言。\n" +
        "文化敬意，不是分数承诺；练题还是靠练习中心。\n" +
        "愿备考顺遂、出海平安、学业有成🙏",
      hashtags: "#妈祖祈福 #出海平安 #PTE备考 #华人留学 #学业有成",
    },
  };

  function pageKey(el) {
    return (el && el.getAttribute("data-xhs-share")) || "home";
  }

  function campaignFor(key) {
    if (global.ChinaPTEUtm && global.ChinaPTEUtm.xhsDefaults) {
      return global.ChinaPTEUtm.xhsDefaults(key);
    }
    var fallback = {
      home: { path: "/", campaign: "xhs-home-share" },
      practice: { path: "/practice.html", campaign: "xhs-practice-share" },
      mazu: { path: "/mazu.html", campaign: "xhs-mazu-share" },
    };
    return fallback[key] || fallback.home;
  }

  function buildCaption(key) {
    var cap = CAPTIONS[key] || CAPTIONS.home;
    var def = campaignFor(key);
    var url;
    if (global.ChinaPTEUtm && global.ChinaPTEUtm.buildUrl) {
      url = global.ChinaPTEUtm.buildUrl(def.path, {
        source: "xiaohongshu",
        medium: "social",
        campaign: def.campaign,
      });
    } else {
      url =
        "https://chinapte.net" +
        def.path +
        (def.path.indexOf("?") >= 0 ? "&" : "?") +
        "utm_source=xiaohongshu&utm_medium=social&utm_campaign=" +
        encodeURIComponent(def.campaign);
    }
    return (
      "【" +
      cap.title +
      "】\n" +
      cap.body +
      "\n\n🔗 " +
      url +
      "\n\n" +
      cap.hashtags
    );
  }

  function showToast(msg) {
    var toast = document.getElementById("xhsCopyToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "xhsCopyToast";
      toast.className = "copy-toast";
      toast.setAttribute("role", "status");
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add("is-show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      toast.classList.remove("is-show");
    }, 2200);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(
        function () {
          return true;
        },
        function () {
          return fallbackCopy(text);
        }
      );
    }
    return Promise.resolve(fallbackCopy(text));
  }

  function fallbackCopy(text) {
    try {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      var ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch (e) {
      return false;
    }
  }

  function track(type, props) {
    try {
      if (global.ChinaPTEAnalytics && global.ChinaPTEAnalytics.track) {
        global.ChinaPTEAnalytics.track(type, props || {});
      }
    } catch (e) {}
  }

  function onCopy(el) {
    var key = pageKey(el);
    var text = buildCaption(key);
    copyText(text).then(function (ok) {
      showToast(ok ? "已复制小红书文案，去粘贴发布吧" : "复制失败，请长按手动选择");
      track("feature_use", {
        feature: "xhs_copy_caption",
        xhs_page: key,
        ok: !!ok,
      });
    });
  }

  function bind(root) {
    var btn = root.querySelector("[data-xhs-copy]");
    if (!btn || btn.__xhsBound) return;
    btn.__xhsBound = true;
    btn.addEventListener("click", function () {
      onCopy(root);
    });
  }

  function init() {
    var nodes = document.querySelectorAll("[data-xhs-share]");
    for (var i = 0; i < nodes.length; i++) bind(nodes[i]);
  }

  global.ChinaPTEXHS = {
    init: init,
    buildCaption: buildCaption,
    captions: CAPTIONS,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(typeof window !== "undefined" ? window : globalThis);
