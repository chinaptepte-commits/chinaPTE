# TikTok 运营 Playbook · chinaPTE（NZ 华人优先）

面向：**零成本**获客（PTE 免费练习 + 合规出国/打工英语线索）。  
主受众：新西兰华人（打工 / 学习 / 签证语言分相关）。  
次受众：澳洲及其他华人圈（同语种、同题型，弱化本地专属表述即可复用）。  
配套：`growth/tiktok-content-bank.md` 脚本库 · `growth/tiktok-posted-log.md` 已发记录。

---

## 0. 发布通道（API 主 · 浏览器备）

| 优先级 | 通道 | 说明 |
|--------|------|------|
| **P0 主路径** | **Content Posting API** | 一次性 OAuth 后 agent 持 refresh_token 日更发布；见 `growth/tiktok-api-playbook.md` + `growth/tiktok-api/publish.mjs` |
| P1 备援 | 手机 App 上传 | PACKAGE.md 交人工；API scope/审计未通时 |
| P2 末选 | Sticky browser | **仅** `/home/box/tiktok-chrome-profile`；禁止用默认/共享 profile；会话掉线优先修 API 而非重登 |

**Session hygiene**
- 浏览器只作 fallback；不在共享 Chrome 里登 @chinapte。
- Token 只存 `/home/box/secrets/tiktok/`（`.env` / `tokens.json`），**永不进 git**。
- Redirect URI：`https://chinapte.net/oauth/tiktok-callback.html`
- 未审计 app：Direct Post 用 `--privacy SELF_ONLY`；公开需 TikTok audit。
- 日常命令：`node growth/tiktok-api/publish.mjs --dry-run --video … --caption "…"`

**Agent routine（发布日）**
1. 确认成片有声（silent = bug）。
2. `publish.mjs --dry-run` → 有 token 则 `--privacy SELF_ONLY`（或 audit 后公开）。
3. 失败再考虑 App / browser fallback。
4. 写入 `tiktok-posted-log.md`。


---

## 1. 发帖节奏（Cadence）

| 频率 | 内容类型 | 来源 |
|------|----------|------|
| **每天 1 条短视频** | 主更新（15–40s） | `tiktok-content-bank.md` 轮换 |
| 每周 ≤ 1 条 | 软转化 / 合规路径 | 练习中心 / 合规说明入口 |
| 可选 | 直播或连麦 | 答疑「卡在哪一题型」；口播不承诺分数 |

**固定时段**  
- **建议每天 15:00**（Asia/Shanghai；见「发布时间」）；旧 cron 11:30 可作实验档  
- 同日不发第二条 TikTok（起号期控密度）

### 发布时间
- 详表与时区换算：`growth/posting-time-insights.md`
- **主推 15:00** / 备用 **19:30**（Asia/Shanghai = 珀斯）；主推对齐 NZ 晚间（NZST≈19:00 / NZDT≈20:00）
- 当前 cron 11:30 对 NZ 晚间偏早，建议改 15:00；每周自观 Analytics + 对标账号发布时间

**账号原则**  
- Bio 固定：免费 PTE 练习 · 新西兰打工英语 · 合规咨询入口  
- Bio / 置顶链接（务必带 UTM）：
  ```
  https://chinapte.net/?utm_source=tiktok&utm_medium=social&utm_campaign=<slug>
  ```
  单条视频落地页可换 path，例如：
  `https://chinapte.net/practice.html?utm_source=tiktok&utm_medium=social&utm_campaign=tt-rs-tip`
- 置顶：1 条「免费题库怎么进」+ 1 条「NZ 工地/护理常用英语」  
- **禁止（内部红线）**：代考、替考、保分、包过、恐吓式焦虑、虚假上岸案例、售卖「机经内幕」——**永不做、永不承诺**
- **妈祖语义红线（硬）**：妈祖 = **仅**出海/旅途保平安。禁止保考/保分/PTE/学业祝福挂钩。考试祈愿 → **文曲星**。禁止「拜妈祖就能过」类考试绑钩（含反讽）。

---

## Fastlane 穿插

- **Free Fastlane** = 有限探帖（probe）/ 排期备援，不替代日更主路径。
- **额度与省分**：详见 [`fastlane-quota-playbook.md`](./fastlane-quota-playbook.md)（Free ≈ **10 AI Studio credits**；**4 cr/图 · 10 cr/秒视频**；周探帖 **≤1–2**；赢了用 Remotion 复刻，优先上传自制片排期）。
- **打赢再复刻结构**：某条 Fastlane 帖在播放/收藏上胜出时，agent 用 Remotion **只复刻 STRUCTURE**（钩子、节奏、版式），填入 **自有 chinaPTE 干货** + **audio preflight**——**禁止整段照搬**；省 Fastlane 额度。
- **穿插节奏**：Fastlane 探帖与 agent 自制片交错排期，不连发堆量。
- **合规不变**：禁止代考/保分等 spam；红线同 §8。

---

## 2. 与小红书防重叠（Anti-overlap）

小红书节奏见 `xhs-playbook.md`（图文 **10:00** · 1 条/天）。TikTok 与 XHS **同日不得撞同一选题桶 + 同一核心技巧点**。

| 规则 | 做法 |
|------|------|
| 选题桶错开 | 查 `xhs-posted-log.md` 当日/近 2 天桶；TikTok 选另一桶（见下表） |
| 形式错开 | XHS = 图文清单；TikTok = 口播 + 字幕 + 跟读/屏幕演示 |
| 受众侧重 | TikTok 优先 **NZ 场景**（奥克兰通勤、工地 induction、养老院班次）；XHS 可偏 AU/泛华人 |
| slug 前缀 | TikTok 一律 `tt-…`；小红书 `xhs-…`，互不混用 |
| 日志双记 | 发前扫一眼两边 posted-log，避免「同一天 WFD 三步法」双平台复读 |

**选题桶（与 XHS 共用分类名，方便对照）**  
`PTE技巧` · `行业英语` · `备考节奏` · `工具入口` · `合规路径` · `轻文化`（妈祖向 TikTok 每月 ≤ 2，且 **仅**出海/旅途保平安；考试祈愿用文曲星）

---


---

## 对标爆款（发前 5 分钟）

每条 TikTok 拍摄/生成前，先对标再动刀（详见当日 `growth/tiktok-out/*-BENCHMARK.md` 若有）：

- **搜 3 条**：同垂类 TikTok / 小红书 / Shorts 高互动样本（华人打工英语、工地安全、NZ/AU 场景），只记钩子句 + 前 3 秒画面，不抄旁白全文。
- **拆 4 点**：钩子类型（痛点/数字/问句）、屏上字数（≤12 字/卡）、切镜节奏（是否 2–3s 一打断）、CTA 软硬。
- **写 1 句对标结论**：本条要「赢」在哪（更快钩子 / 更大字 / 更短 beats），写进 PACKAGE.md。
- **禁区**：不刮盗版 PTE 机经；不承诺代考/保分；对标的是节奏与信息密度，不是话术照搬。

## 3. 创意标准（Creative · 必读）

拍前 / 生成视频前加载 skill：**`short-form-social-video`**（`sand-data/workflows/short-form-social-video`）。

| 要求 | 做法 |
|------|------|
| 强钩子 | 前 **1–2 秒**必须抓住：痛点 / 数字 / 反常识 / 大字幕主张 |
| Kinetic text | 每 2–3 秒换画面或大字；一镜一事；≤12 字/屏 |
| 禁静态幻灯 | 禁止满屏小字 PPT、墙式段落；要 snap cuts / ken burns / 贴纸动效 |
| 结构 | Hook → 3 个 beats → payoff → 软 CTA（主页 / 下一条），**15–35s** |
| 文案收尾 | 一句好奇 CTA 即可；勿堆法律免责收尾 |
| 一视频一念头 | 不堆多技巧；与当日 XHS 桶错开 |

**Anti-patterns**：静态 slide deck、每条片尾免责声明、连续三天同封面模板。

## 4. 视频打分（Scorecard）

每条发布后 **24h / 72h** 各记一次（TikTok Analytics 或截图）：

| 指标 | 权重 | 说明 |
|------|------|------|
| 播放 Plays | 1× | 基础分母 |
| 完播 / 平均观看时长 | 3× | 短视频核心；&lt;15s 片完播应更高 |
| 赞 Likes | 1× | 弱意向 |
| 评论 Comments | 2× | 含提问 / 求链接 |
| 分享 Shares | 3× | 强意向 |
| 主页访问 Profile views | 4× | 接近「会点 bio」 |
| 站内 UTM（同 campaign） | 加分 | `utm_campaign=<slug>` 落地 PV / 留资 |

**综合分（简式）**  
`Score = plays + 3*avg_watch_proxy + likes + 2*comments + 3*shares + 4*profile_views`  
（`avg_watch_proxy` 可用完播率×100 或平均观看秒数，团队内固定一种即可。）

**健康阈值（起步期参考，非 KPI 承诺）**  
- 完播率：15–25s 片 ≥ 25%；30–40s 片 ≥ 18%  
- Profile/Plays ≥ 0.8%  
- 同 slug 站内首次落地有记录即加分  

---

## 5. Kill / Double-down 规则

在 **72h** 后决策（播放 &lt; 500 可延长到 7 天）：

### Kill（停发同结构）
- Score 明显低于账号中位，且完播差、Profile/Plays &lt; 0.4%  
- 评论集中吐槽「硬广 / 焦虑 / 假案例」→ 立刻改话术，该角度停 2 周  
- 平台违规提示 / 限流关键词 → 下架同类，换合规角度  

### Double-down（加码）
- 完播优秀 **或** Profile/Plays ≥ 1.2% **或** Shares 明显高于中位  
- 同结构连续 2 条进中位以上 → 换例子 / 换 B-roll，**保留 slug 前缀**（如 `tt-wfd-tip-b`）  
- NZ 行业词评论要「护理 / 建筑 / 肉类」→ 下周优先对应专题  

### Hold（观察）
- 播放高、完播低：砍前 3 秒废话，重做钩子  
- 完播高、主页低：改 bio 与置顶，口播末尾明确「链接在主页」  

---

## 6. 每周优化循环（Agent Routine）

**周一 · 盘点**  
1. 拉取上周视频 24h/72h，写入周记（可自建 `tiktok-weekly-log.md`）。  
2. 对照站内 analytics：按 `utm_source=tiktok` + `utm_campaign` 聚合。  
3. 对照 `xhs-posted-log.md`，标出本周应避开的撞车桶。  
4. 标 Kill / Double-down / Hold。

**周二 · 选题**  
1. 从 `tiktok-content-bank.md` 选未发或高分变体，填满本周 7 天。  
2. 每天一桶轮换；与 XHS 当日桶错开。  
3. 生成 UTM：`utm_source=tiktok&utm_medium=social&utm_campaign=<slug>`。

**周三–周日 · 拍摄发布**  
1. **15:00**（或 Insights 备用窗）发；文案区放 1 行 CTA + 话题；评论置顶「免费站见主页链接」。  
2. 字幕必须可读（嘈杂通勤场景）；口播语速略慢于日常；过一遍创意 checklist（钩子 + kinetic，见 §3）。  
3. 高赞评论可拆成下周 15s 片。

**周日晚 · 复盘**  
1. 更新内容库：淘汰 Kill 结构，Double-down 写成新脚本。  
2. 检查 bio 链接 UTM 是否仍指向正确 campaign（可用通用 `tt-bio`）。  
3. 与 XHS 复盘对齐：下周桶排期表。

---

## 7. Bio / 链接规范

| 用途 | 示例 |
|------|------|
| Bio 默认 | `https://chinapte.net/?utm_source=tiktok&utm_medium=social&utm_campaign=tt-bio` |
| 单条视频对应落地 | `https://chinapte.net/<path>?utm_source=tiktok&utm_medium=social&utm_campaign=<slug>` |
| 评论导流咨询 | `…/consult.html?utm_source=tiktok&utm_medium=social&utm_campaign=<slug>&utm_content=comment` |

文案区不要堆长链；统一「完整链接在主页」。

---

## 8. 合规速查（拍前 / 发前 10 秒）

- [ ] **内部红线**：永不做 / 不承诺代考、替考、保分、包过  
- [ ] 无虚假高分截图、「内幕题」、恐吓式话术  
- [ ] 出国 / 打工相关只做英语练习与**合规信息**，不承诺签证或录用结果  
- [ ] **妈祖语义红线**：仅出海/旅途保平安；无保考/保分/PTE/学业挂钩；考试祈愿用文曲星
- [ ] 妈祖 / 轻文化：文化敬意，不作迷信推销；钩子亦不得把妈祖绑考试  
- [ ] 创意：强钩子 + kinetic text；非静态幻灯（skill `short-form-social-video`）  
- [ ] 链接含 `utm_source=tiktok&utm_medium=social&utm_campaign=<slug>`  
- [ ] 已查 XHS 当日选题，确认不撞车  
- [ ] 已写入 `tiktok-posted-log.md`

---

## 9. 站内追踪清单

| 组件 | 路径 | 作用 |
|------|------|------|
| UTM 助手 | `/utm.js` | 首触 `chinaPTE_utm_first` |
| 分析 | `/analytics.js` | 事件带 UTM |
| 内容库 | `growth/tiktok-content-bank.md` | 10 条短视频脚本 |
| 已发日志 | `growth/tiktok-posted-log.md` | 防同质化 + 与 XHS 对照 |
| 本手册 | `growth/tiktok-playbook.md` | 节奏与决策 |

**归因解读**  
- `utm_first_*`：首次从哪条 TikTok 来的（长期）  
- 当前 `utm_*`：本会话最后一次落地参数  

---

*版本：2026-09-18 · Fastlane 额度指针 → fastlane-quota-playbook · API 主路径 · NZ 华人主受众 · 日更建议 15:00 · 与 XHS 防重叠 · 合规措辞精简*
