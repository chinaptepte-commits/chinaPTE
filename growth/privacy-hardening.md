# chinaPTE 创作者可见度 / IP 收口清单

访客打开 chinapte.net **看不到你家宽带 IP**：流量先走 Cloudflare 边缘，再回源 GitHub Pages。能藏的是「身份痕迹」，不是「互联网完全匿名」。

## 已由站点侧处理
- 页面 canonical / schema / sitemap 统一为 `https://chinapte.net/`（不再指向 `*.github.io`）
- 本地 git `user.email` 使用 `chinaptepte-commits@users.noreply.github.com`
- 自定义域 CNAME：`chinapte.net`

## 仍需你在面板完成（一次即可）
1. **域名注册商 Whois 隐私**：打开 Privacy / Redacted，避免公开姓名、邮箱、电话、地址。
2. **Cloudflare DNS**：`chinapte.net` / `www` 必须是 **橙色云（Proxied）**，不要 DNS-only 灰色云（灰色会暴露源站解析）。
3. **GitHub 账号资料**：`chinaptepte-commits` 保持空资料；Settings → Emails 勾选 Keep my email addresses private；勿把个人 Gmail 设为 Public。
4. **免费 GitHub Pages 限制**：仓库通常必须 **Public** 才能白嫖 Pages。想整库 Private，需要改托管（Cloudflare Pages / 别家）——那是另一次迁移，不是开关。
5. **旧 commit 里的个人邮箱**：公开历史上可能仍有 `chinaptepte@gmail.com`。彻底抹掉要 rewrite + force-push，会伤协作记录；需要的话再说一声我再做。
6. **社媒实名**：TikTok / 小红书注册手机、支付实名在平台侧，外人难直接看见，但品牌一致仍可能被关联——业务微信用号与个人号分开。

## 不要做的
- 不要给整站加 `noindex`（获客站需要搜索流量）
- 不要为了「藏 IP」关掉 Cloudflare 代理
