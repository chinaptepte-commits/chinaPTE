# chinaPTE · PTE Academic 全题型零成本练习站

华人 PTE 备考静态站：日间/夜间主题（自动跟本地时间 06:00–18:59）+ 耳机随身听（HTML5 MP3 优先 + Web Speech 回退）+ PTE直通车软性留资。

## 快速打开

1. 解压本文件夹
2. Chrome / Edge 打开 `index.html`、`practice.html` 或 `体验全部功能.html`
3. 单文件双击：
   - `chinaPTE-随身听.html` — WFD
   - `chinaPTE-RS随身听.html` — RS
   - `chinaPTE-单词随身听.html` — 单词库

详见 `打开说明.txt`。


## 主题（日间 / 夜间）

导航栏可切换 **自动 / 日间 / 夜间**（`localStorage` 键 `chinaPTE_theme_mode`）。

- **自动**：按本机时钟，约 06:00–18:59 用日间皮肤，其余用夜间（当前暗色）；切到前台或定时会重算，无需刷新。
- **日间 / 夜间**：手动覆盖并持久化。
- 通过 `<html data-theme="day|night">` + `styles.css` / `theme.js` 生效。

## PTE直通车页 + 出国咨询 + 后台

| 页面 | 说明 |
|------|------|
| `labor.html` | 公开「考不过怎么办 / PTE直通车」引导页（读 `content/labor.json`） |
| `consult.html` | 出国咨询留资页（读 `content/consult.json`） |
| `admin/` | 零成本后台：PTE直通车 + 出国咨询文案（GitHub Contents API） |
| `admin/config.js` | **改密码**：`window.ADMIN_PASSWORD`（默认 `chinaPTE2026`，请尽快修改） |
| `content/labor.json` | 直通车页可编辑文案 |
| `content/consult.json` | 出国咨询页可编辑文案（标题/表单/微信/声明/CTA） |
| `content/vocab.json` | 单词库源数据（≥2000 核心词）；前台优先加载 |
| `data-vocab.js` | 嵌入式词库（与 vocab.json 同步；离线单文件用） |

线上：

- https://chinaptepte-commits.github.io/chinaPTE/labor.html
- https://chinaptepte-commits.github.io/chinaPTE/consult.html
- https://chinaptepte-commits.github.io/chinaPTE/admin/
- 自定义域：https://chinapte.net/labor.html · https://chinapte.net/consult.html · https://chinapte.net/admin/

后台保存需要你自己的 GitHub classic PAT（`repo` scope），Token 只存在浏览器 session/localStorage。

## 题型

| 类型 | 页面 | 题量约 |
|------|------|--------|
| WFD | wfd.html | 133+ |
| RS | rs.html | 85+ |
| RL | rl.html | 26+ |
| ASQ | asq.html | 42+ |
| SST | sst.html | 21+ |
| HIW | hiw.html | 21+ |
| RA | ra.html | 41+ |
| DI | di.html | 21+ |
| SWT | swt.html | 20+ |
| Essay | essay.html | 16+ |
| Reading | reading.html | 30+ |
| Listening | listening.html | 32+ |

共享播放器：`player.js`（Play All / 语速 / 中文开关 / 今日计数 / 续听 / 筛选）

## 本地预览

```bash
cd chinaPTE-wfd-listen && python3 -m http.server 8080
```

## 澳新行业英语

| 页面 | 说明 |
|------|------|
| `industry.html` | 澳新行业英语总览 |
| `industry-*.html` | 日常 / 建筑 / 肉类 / 石材 / 橱柜 / 电焊 / 护理 |
| `data-industry.js` | 词汇与沟通句子数据 |

线上：https://chinaptepte-commits.github.io/chinaPTE/industry.html


## SEO（零成本静态优化）

面向 **中国大陆 + 澳大利亚 / 新西兰华人** 在 Baidu / Bing / Google 搜索 PTE 备考、行业英语、合规出国路径 / PTE直通车等信息。

已落实（不买广告、不承诺排名、不宣称「百度第一」）：

- 各页独立中文 `<title>` + meta description（合并大陆意图词：PTE考试 / PTE题库 / PTE练习 / WFD听写 / RS跟读 / 华人留学移民英语 / 澳洲新西兰打工英语 / 行业英语，与既有 AU/NZ 表述并存，避免堆砌）
- 关键页可选 `meta name="keywords"`（百度仍轻度参考；短列表、按页相关）
- Open Graph / Twitter 基础标签、canonical → `https://chinaptepte-commits.github.io/chinaPTE/...`
- `robots.txt`（`*` / `Baiduspider` / `bingbot` 允许抓取；`/admin/` 禁止）+ `sitemap.xml`
- 首页 JSON-LD：`WebSite` + `Organization` + `LearningResource`；主要栏目 `BreadcrumbList`
- `lang="zh-CN"`；单语站点未加 hreflang
- 首页描述性内链 + 「国内访问说明」（诚实说明 github.io 在大陆可能不稳定；不承诺备案）
- 首页预留 `baidu-site-verification` 注释槽（拿到验证码后再填，勿编造）
- 可选友好页：`404.html`

### 提交 sitemap（上线后）

Sitemap URL：`https://chinaptepte-commits.github.io/chinaPTE/sitemap.xml`

1. **百度搜索资源平台**（[ziyuan.baidu.com](https://ziyuan.baidu.com/)）  
   - 添加网站（填写 github.io 站点 URL）→ 完成验证（HTML 标签：把验证码填进首页 `baidu-site-verification` 并取消注释）  
   - 普通收录 / sitemap 提交上述地址；可再手动推送重要 URL  
   - 说明：github.io 在大陆可达性不稳定，收录与抓取可能受影响；这是托管限制，不是本站「已备案」——本站**未宣称 ICP 备案**。
2. **Bing Webmaster Tools**（[bing.com/webmasters](https://www.bing.com/webmasters)）  
   - 添加站点 → 验证 → 提交 sitemap  
   - 对中文搜索亦有帮助，且 Bing 对 github.io 抓取通常更稳。
3. **Google Search Console**（可选，AU/NZ 受众）→ 提交同一 sitemap。

### 国内访问与可选加固（非必须）

- 收藏常用页；打开慢或失败时换网络 / 稍后再试  
- 可选：自有域名 + Cloudflare（或其它合规 CDN/节点）指向本站静态资源，改善可达性——**需自行合规办理，本 README 不承诺也不指导虚假备案**

## 合规

仅提供 PTE 练习与正规出国路径 / 海外就业信息咨询（PTE直通车）。禁止考试舞弊相关内容。不承诺签证或工作结果。

**版权：** 题库/词库为本站自有版权内容，未经授权禁止转载、镜像、爬取或商用，盗版必究。

## 技术

- 纯静态 · 无后端 · HTML5 audio（edge-tts MP3）+ Web Speech 回退 · localStorage（按题型分 key）
- 留资 mock：`consult.html` + `lead.js`
- 劳务文案：`content/labor.json` + `admin/`（GitHub API 更新）
