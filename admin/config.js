/* chinaPTE 后台简易密码 — 请改成你自己的密码后保存并重新部署 */
window.ADMIN_PASSWORD = "chinaPTE2026";

/* GitHub 仓库配置（一般无需修改） */
window.ADMIN_GITHUB = {
  owner: "chinaptepte-commits",
  repo: "chinaPTE",
  branch: "main",
  laborPath: "content/labor.json",
  consultPath: "content/consult.json",
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
