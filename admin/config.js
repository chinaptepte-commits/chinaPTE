/* chinaPTE admin auth — prefer ADMIN_PASSWORD_HASH (SHA-256 hex).
   Change password after login in the「修改管理员密码」tab (writes this file via GitHub).
   Do not publish plaintext passwords in docs or on the login page. */
window.ADMIN_PASSWORD_HASH = "aa73686fd6d80f224186beedc21172ec917cb03e72de0ce3303aea244a9030f1";
/* Legacy plaintext fallback (unused when HASH is set). Leave empty. */
window.ADMIN_PASSWORD = "";

/* GitHub 仓库配置（一般无需修改） */
window.ADMIN_GITHUB = {
  owner: "chinaptepte-commits",
  repo: "chinaPTE",
  branch: "main",
  laborPath: "content/labor.json",
  consultPath: "content/consult.json",
  configPath: "admin/config.js",
  /* 兼容旧字段 */
  path: "content/labor.json"
};

/* Analytics（招商数据看板） */
window.CHINAPTE_ANALYTICS = {
  endpoint: "https://chinapte.net/api/analytics",
  /* 与 Worker secret ADMIN_KEY 保持一致；仅本机 admin 页使用 */
  adminKey: "",
  /* 可选：第三方 webhook（Notion/Sheets 中转等） */
  webhook: "",
  /* 可选 GA4 Measurement ID，例如 G-XXXXXXXX */
  ga4MeasurementId: ""
};
/* 兼容旧字段名 */
window.CHINAPTE_ANALYTICS_WEBHOOK = window.CHINAPTE_ANALYTICS.webhook || "";
window.ANALYTICS_ADMIN_KEY = window.CHINAPTE_ANALYTICS.adminKey || "";
