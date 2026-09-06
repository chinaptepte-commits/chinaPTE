/**
 * chinaPTE · 出国咨询留资（本地 mock）
 * Stores to localStorage; copies summary for WeChat; no backend.
 */
(function () {
  "use strict";

  const STORAGE_LEADS = "chinaPTE_leads";
  const WECHAT_PLACEHOLDER = "chinaPTE顾问";

  const form = document.getElementById("leadForm");
  const success = document.getElementById("formSuccess");
  const successDetail = document.getElementById("successDetail");
  const toast = document.getElementById("copyToast");
  const wechatId = document.getElementById("wechatId");
  const btnCopyWx = document.getElementById("btnCopyWx");

  if (wechatId) wechatId.textContent = WECHAT_PLACEHOLDER;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-show");
    setTimeout(() => toast.classList.remove("is-show"), 2200);
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch {
      /* fall through */
    }
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }

  function buildSummary(data) {
    return [
      "【chinaPTE 出国评估留资】",
      "姓名：" + data.name,
      "微信/手机：" + data.contact,
      "目标国家：" + data.country,
      data.note ? "补充：" + data.note : null,
      "时间：" + data.time,
      "请添加微信：" + WECHAT_PLACEHOLDER,
    ]
      .filter(Boolean)
      .join("\n");
  }

  function saveLead(data) {
    let list = [];
    try {
      const raw = localStorage.getItem(STORAGE_LEADS);
      if (raw) list = JSON.parse(raw);
      if (!Array.isArray(list)) list = [];
    } catch {
      list = [];
    }
    list.push(data);
    try {
      localStorage.setItem(STORAGE_LEADS, JSON.stringify(list));
    } catch {
      /* quota */
    }
  }

  if (btnCopyWx) {
    btnCopyWx.addEventListener("click", async () => {
      const ok = await copyText(WECHAT_PLACEHOLDER);
      showToast(ok ? "微信号已复制" : "复制失败，请长按手动复制");
    });
  }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = (document.getElementById("leadName").value || "").trim();
      const contact = (document.getElementById("leadContact").value || "").trim();
      const country = (document.getElementById("leadCountry").value || "").trim();
      const note = (document.getElementById("leadNote").value || "").trim();

      if (!name || !contact || !country) {
        showToast("请填写姓名、联系方式与目标国家");
        return;
      }

      const data = {
        name,
        contact,
        country,
        note,
        time: new Date().toISOString(),
        source: "consult.html",
      };

      saveLead(data);
      const summary = buildSummary(data);
      const copied = await copyText(summary);

      if (success) {
        success.classList.add("is-visible");
        if (successDetail) {
          successDetail.textContent = copied
            ? "摘要已复制到剪贴板。请添加微信「" +
              WECHAT_PLACEHOLDER +
              "」并粘贴发送。本机 localStorage 已保存一份。"
            : "本机已保存。请手动复制下方信息发给顾问微信「" +
              WECHAT_PLACEHOLDER +
              "」。\n\n" +
              summary;
        }
        success.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      showToast(copied ? "已提交并复制" : "已提交（请手动复制）");
      form.reset();
    });
  }
})();
