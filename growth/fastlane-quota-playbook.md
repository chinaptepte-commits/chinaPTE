# Fastlane Free 额度玩法（chinaPTE TikTok）

> 产品：[usefastlane.ai](https://www.usefastlane.ai/) · 调研日：2026-09-18（UTC+8）  
> 配套：`tiktok-playbook.md` § Fastlane 穿插 · Remotion 主产 · Fastlane 仅探帖

公开定价页与对比文会改；**登录后以 Dashboard 实数为准**。本页是 chinaPTE 的省额度作战手册。

---

## 1. Known Free limits（公开口径）

来源：官网 Pricing 页脚、`/pricing/*` 对比表、TikTok Scheduler 产品页（约 2026-06～2026-09）。

| 项 | Free（公开） | 备注 |
|----|--------------|------|
| 价格 | **$0**，无需信用卡 | 真·可试用，不是纯 landing |
| **AI Studio credits** | **10** | 极紧；约够 1～2 次浅试，不够日更 |
| 消耗公式（官网脚注） | **4 credits / image** · **10 credits / second of video** | 例：1s 视频 = 10 cr → Free 一次用尽；5s 视频需 50 cr（需付费） |
| **Blitz** | 有访问（Tinder 式左右滑） | 「浏览/滑动」≠ 免费无限生成；保存/触发生成会吃 **content save** 或 credits，见下 |
| **Content** | **Limited content**（未公布精确 save 数） | Starter=20 saves · Growth=100 · Pro=无限 → Free 明显更严 |
| 排期 / 原生发布 | 营销页写 Free **含** TikTok / Reels / Shorts（+ LinkedIn）原生排期 | Pro 才写 **Unlimited scheduling** → Free/低档有上限，**以 Dashboard 为准** |
| 自有视频上传 | 产品页：可 **Drop in your own videos** 再排期 | 理想路径：Remotion 成片上传排期，**尽量不烧 AI Studio** |
| 社交账号 / workspace | 未在 Free 行展开 | Starter 起：1 workspace、TikTok+IG+YT |
| 人设 / UGC 库 | Free 未列大库 | Starter 25 AI UGC · Growth 500+ · Pro 2000+ human UGC |
| Credits 是否月重置 | **公开未写清** | 当「一次性试用量」对待；**勿假设每月自动回血** |

### 付费对照（省额度决策用）

| Plan | $/mo | Content saves | AI Studio credits | 其他 |
|------|------|---------------|-------------------|------|
| Free | 0 | Limited | 10 | Blitz + browse |
| Starter | 29 | 20 | 250 | 1 workspace · 25 AI UGC · Blitz |
| Growth | 49 | 100 | 500 | Unlimited socials · 3 WS · 100 human UGC |
| Pro | 149 | Unlimited | 2000 | Unlimited scheduling · 多语言 |

年付约省 20%（第三方汇总）。Warmed accounts 另计 $100/mo + $1.50/post（需有效订阅）。

**Developer API（参考）**：创建内容创建类调用吃 **content-save 池**；排期/发布本身通常不按「生成」计费。Free 是否开 API 以站内为准——chinaPTE **当前不依赖 Fastlane API**。

---

## 2. Spend priority（什么烧额度 vs 相对「便宜」）

### 会烧 / 高风险（优先避免）

| 动作 | 为何贵 |
|------|--------|
| **AI Studio 视频生成 / 重生成** | 10 cr / 秒；Free 10 cr ≈ **最多 ~1s 量级**，一次失败即清空 |
| **AI Studio 出图 + 迭代** | 4 cr / 图；连出 3 张草稿 = 12 > Free 总量 |
| **Blitz 右滑「要这条」触发 build / save** | 队列里的自动生成若落盘，吃 **content save**；反复滑选 = 浪费 Limited content |
| **一键 Automation 填满日历** | 批量生成，对 Free 是自杀式消耗 |
| **同一创意反复 Regen「再好看一点」** | 结构已够用时再烧 = 纯浪费 |

### 相对不烧 AI Studio / 优先用

| 动作 | 说明 |
|------|------|
| **Browse / 看趋势库 / 看竞品样式** | 学习钩子与版式，不生成 |
| **Remotion（本仓库）出片** | 日更主路径；不碰 Fastlane credits |
| **上传自有成片再 Schedule**（若 Dashboard 允许且不扣 Studio） | 用 Fastlane 当排期器，不当工厂 |
| **对已保存内容改文案 / 改排期时间** | 通常不重生视频；仍注意 save 上限 |
| **Analytics 只读** | 看哪条探帖赢，再回 Remotion 复刻结构 |

**经验法则**：Credits = 生成燃料；Content saves = 库存格子。chinaPTE Free 两边都紧 → **生成极少、排期尽量用自制片**。

---

## 3. Save strategy（chinaPTE 省分规则）

### 3.1 Probe → Remake（核心）

1. **每周最多 1～2 次 Fastlane 探帖（probe）**，明确假设（钩子类型 / 时长 / 人设），一次只验证一个变量。  
2. 探帖若在播放/收藏上 **打赢** → 用 Remotion **只复刻 STRUCTURE**（钩子、节奏、版式），填入 **自有 chinaPTE 干货** + audio preflight。  
3. **禁止**整段照搬 Fastlane 成片当日更；**禁止**为「再试一版脸/音色」连环 Regen。

### 3.2 上传自有视频排期（若可用）

1. Remotion 导出 → 登录 Fastlane → **Upload / Drop in your own video** → Calendar 排期。  
2. 上传前在 Dashboard 确认：该操作 **是否扣 AI Studio credits**、是否占 **content save**。  
3. 若上传仍占 save：把 save 留给「已验证要发」的片，草稿不进 Fastlane。  
4. 若 Free 不能稳定上传/排期 → 退回 **TikTok 原生或本仓库 API 路径**（见 `tiktok-api-playbook.md`），Fastlane 仅作灵感探针。

### 3.3 避免浪费 Blitz / Regen

- Blitz：**先滑看结构，不急着右滑保存**；决定保存前想好「这条能否被 Remotion 复刻」。  
- 同一 prompt **最多 1 次生成 + 0～1 次有明确理由的 regen**；第三次起改走 Remotion。  
- 关掉/勿用「fill entire calendar」类自动化。  
- 失败生成（黑屏、错品牌、违规模板）记一笔原因，**不要无盲重试**。

### 3.4 与日更关系

- **日更主路径 = Remotion + 本仓库发布流程**。  
- Fastlane = **有限探帖 / 排期备援**，不替代日更。穿插节奏见 `tiktok-playbook.md`。

---

## 4. Weekly budget suggestion（chinaPTE）

| 周预算 | 建议 |
|--------|------|
| **Fastlane AI Studio 探帖** | **≤ 1～2 次/周**（默认 1；有明确 A/B 假设才到 2） |
| **Blitz 保存** | **≤ 探帖次数**；多数滑动只浏览不保存 |
| **Automation 填日历** | **0**（Free 禁用） |
| **Regen** | **默认 0**；仅「明显坏片且假设仍成立」时 +1 |
| **Remotion 日更** | 按 `tiktok-playbook.md`（主量） |
| **Credits 告警线** | 剩余 **&lt; 4** → 本周停止一切 Studio / 视频生成 |

若 10 credits 为一次性且不回血：**整月总探帖预算仍按 1～2 次规划**，用完即停，改纯 Remotion。

---

## 5. Agent 登录后应在 Dashboard 核对的清单

登录 [usefastlane.ai](https://www.usefastlane.ai/) 后，agent / 运营按序检查并记到本周笔记（数字以 UI 为准）：

1. **Plan badge**：确认仍是 Free（或是否误开试用/付费）。  
2. **AI Studio credits 余额** + 是否显示重置日 / 过期说明。  
3. **Content saves 已用 / 上限**（Free 的「Limited」具体数字）。  
4. **Scheduling 配额**：本周/本月还可排几条；是否「Unlimited」仅 Pro。  
5. **Upload own video**：入口是否在；上传是否扣 credits / save。  
6. **Blitz**：滑一次后余额是否变动（区分「浏览」与「生成/保存」）。  
7. **Connected accounts**：chinaPTE TikTok（及是否误连多余社媒）。  
8. **Automations**：确认未开启「一键填满日历」。  
9. **Workspace / brand URL**：是否指向 chinapte 站点，避免错品牌生成。  
10. **Analytics**：仅读探帖表现，用于 Remotion 复刻优先级——不触发再生。

核对后更新本节「实测附录」（可追加日期行）；**公开表与实测冲突时以实测为准**。

### 实测附录（待填）

| 日期 (CST) | Credits 余 | Saves 余 | 上传扣费？ | 排期上限 | 备注 |
|------------|------------|----------|-----------|----------|------|
| _登录后补_ | | | | | |

---

## 6. 一句话决策树

```
要发日更？ → Remotion（默认）
只要灵感/结构探针？ → Fastlane ≤1–2/周 → 赢了用 Remotion 复刻结构
只想排期自制片？ → 先试 Fastlane Upload；不行就走 TikTok/API 主路径
Credits < 4 或 Saves 见底？ → 本周停 Fastlane 生成，只做 Remotion
```

---

*版本：2026-09-18 · Free=10 AI Studio cr · 4/image · 10/sec video · chinaPTE 周探帖 ≤1–2*
