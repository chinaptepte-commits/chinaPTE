/**
 * chinaPTE · multi-type bank browser
 */
(function () {
  "use strict";

  const SOURCES = [
    { key: "WFD", page: "wfd.html", bank: () => window.WFD_BANK || [] },
    { key: "RS", page: "rs.html", bank: () => window.RS_BANK || [] },
    { key: "RL", page: "rl.html", bank: () => window.RL_BANK || [] },
    { key: "ASQ", page: "asq.html", bank: () => window.ASQ_BANK || [] },
    { key: "SST", page: "sst.html", bank: () => window.SST_BANK || [] },
    { key: "HIW", page: "hiw.html", bank: () => window.HIW_BANK || [] },
    { key: "RA", page: "ra.html", bank: () => window.RA_BANK || [] },
    { key: "DI", page: "di.html", bank: () => window.DI_BANK || [] },
    { key: "SWT", page: "swt.html", bank: () => window.SWT_BANK || [] },
    { key: "Essay", page: "essay.html", bank: () => window.ESSAY_BANK || [] },
    { key: "Reading", page: "reading.html", bank: () => window.READING_BANK || [] },
    { key: "Listening", page: "listening.html", bank: () => window.LISTENING_BANK || [] },
  ];

  let active = "WFD";
  const listEl = document.getElementById("bankList");
  const metaEl = document.getElementById("bankMeta");
  const emptyEl = document.getElementById("bankEmpty");
  const searchEl = document.getElementById("bankSearch");
  const clearEl = document.getElementById("bankClear");
  const tabsEl = document.getElementById("typeTabs");

  function en(item) {
    return item.en || item.sentence || item.question || item.passage || item.scene || item.prompt || "";
  }
  function zh(item) {
    return item.zhAnalysis || item.analysis || item.tip || "";
  }

  function currentSrc() {
    return SOURCES.find((s) => s.key === active) || SOURCES[0];
  }

  function renderTabs() {
    if (!tabsEl) return;
    tabsEl.innerHTML = "";
    SOURCES.forEach((s) => {
      const n = (s.bank() || []).length;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "type-tab" + (s.key === active ? " is-active" : "");
      btn.textContent = s.key + " (" + n + ")";
      btn.addEventListener("click", () => {
        active = s.key;
        renderTabs();
        render(searchEl ? searchEl.value : "");
      });
      tabsEl.appendChild(btn);
    });
  }

  function render(q) {
    const src = currentSrc();
    const bank = src.bank() || [];
    const query = (q || "").trim().toLowerCase();
    const filtered = !query
      ? bank
      : bank.filter((it) => {
          const hay =
            en(it).toLowerCase() +
            " " +
            zh(it).toLowerCase() +
            " " +
            String(it.answer || "").toLowerCase() +
            " " +
            (it.vocab || []).map((v) => (v.word || "") + " " + (v.gloss || "")).join(" ").toLowerCase();
          return hay.includes(query);
        });

    metaEl.textContent = query
      ? active + "：找到 " + filtered.length + " / " + bank.length
      : active + "：共 " + bank.length + " 条 · 点击跳转练习";

    listEl.innerHTML = "";
    emptyEl.hidden = filtered.length > 0;

    filtered.forEach((it) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "bank-item";
      const typeTag = it.type ? " · " + it.type : "";
      btn.innerHTML =
        '<div class="bi-id">#' + it.id + typeTag + "</div>" +
        '<div class="bi-en"></div>' +
        '<div class="bi-zh"></div>';
      btn.querySelector(".bi-en").textContent = en(it);
      btn.querySelector(".bi-zh").textContent = zh(it);
      btn.addEventListener("click", () => {
        window.location.href = src.page + "?id=" + encodeURIComponent(it.id);
      });
      li.appendChild(btn);
      listEl.appendChild(li);
    });
  }

  let timer = null;
  if (searchEl) {
    searchEl.addEventListener("input", () => {
      clearTimeout(timer);
      timer = setTimeout(() => render(searchEl.value), 160);
    });
  }
  if (clearEl) {
    clearEl.addEventListener("click", () => {
      if (searchEl) searchEl.value = "";
      render("");
    });
  }

  renderTabs();
  render("");
})();
