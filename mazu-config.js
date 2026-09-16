/**
 * chinaPTE · 妈祖祈福 API 配置（无密钥；仅公开 endpoint）
 * Worker 未部署时，mazu.js 自动回退到本机 localStorage。
 */
window.CHINAPTE_MAZU = {
  endpoint: "https://chinapte.net/api/mazu",
  /* 留言字数上限（与 Worker 一致） */
  maxTextLen: 160,
  /* 客户端限流：每用户每小时 1 条（Worker 侧亦有） */
  rateLimitMs: 60 * 60 * 1000,
  /* 密码最短长度（明文，提交前做 SHA-256） */
  minPasswordLen: 6,
};
