# TikTok 运营 Playbook · chinaPTE（NZ 华人优先）

面向：**零成本**获客（PTE 免费练习 + 合规出国/打工英语线索）。  
主受众：新西兰华人（打工 / 学习 / 签证语言分相关）。  
次受众：澳洲及其他华人圈（同语种、同题型，弱化本地专属表述即可复用）。  
配套：`growth/tiktok-content-bank.md` 脚本库 · `growth/tiktok-posted-log.md` 已发记录。

---

## 1. 发帖节奏（Cadence）

| 频率 | 内容类型 | 来源 |
|------|----------|------|
| **每天 1 条短视频** | 主更新（15–40s） | `tiktok-content-bank.md` 轮换 |
| 每周 ≤ 1 条 | 软转化 / 合规路径 | 练习中心 / 合规说明入口 |
| 可选 | 直播或连麦 | 答疑「卡在哪一题型」；口播不承诺分数 |

**固定时段**  
- **每天 11:30**（用户本地 **Asia/Shanghai**；对 NZ 观众约为同日早间，对 AU 东岸约为傍晚前）  
- 同日不发第二条 TikTok（起号期控密度）

**账号原则**  
- Bio 固定：免费 PTE 练习 · 新西兰打工英语 · 合规咨询入口  
- Bio / 置顶链接（务必带 UTM）：
  ```
  https://chinapte.net/?utm_source=tiktok&utm_medium=social&utm_campaign=<slug>
  ```
  单条视频落地页可换 path，例如：
  `https://chinapte.net/practice.html?utm_source=tiktok&utm_medium=social&utm_campaign=tt-rs-tip`
- 置顶：1 条「免费题库怎么进」+ 1 条「NZ 工地/护理常用英语」  
- **禁止（内部红线）**：代考、替考、保分、包过、恐吓式焦虑、虚假上岸案例、售卖「机经内幕」——**永不做、永不承诺**；同时**不要**把「无代考」「无保分」印在每条字幕/文案末尾（合规靠省略违规承诺，不是靠刷免责词）

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
`PTE技巧` · `行业英语` · `备考节奏` · `工具入口` · `合规路径` · `轻文化`（妈祖向 TikTok 每月 ≤ 2，且必须「非分数承诺」）

---


---

## 3. 创意标准（Creative · 必读）

拍前 / 生成视频前加载 skill：**`short-form-social-video`**（`sand-data/workflows/short-form-social-video`）。

| 要求 | 做法 |
|------|------|
| 强钩子 | 前 **1–2 秒**必须抓住：痛点 / 数字 / 反常识 / 大字幕主张 |
| Kinetic text | 每 2–3 秒换画面或大字；一镜一事；≤12 字/屏 |
| 禁静态幻灯 | 禁止满屏小字 PPT、墙式段落；要 snap cuts / ken burns / 贴纸动效 |
| 结构 | Hook → 3 个 beats → payoff → 软 CTA（主页 / 下一条），**15–35s** |
| 文案收尾 | **禁止**以「无代考 · 无保分」等法律免责块收尾；一句好奇 CTA 即可 |
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
1. **11:30** 发；文案区放 1 行 CTA + 话题（**文案不得以法律免责块收尾**）；评论置顶「免费站见主页链接」——**不要**加「无代考无保分」。  
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

文案区不要堆长链；统一「完整链接在主页」。**不要**在文案末尾加「无代考 · 无保分」类免责块。

---

## 8. 合规速查（拍前 / 发前 10 秒）

- [ ] **内部红线**：永不做 / 不承诺代考、替考、保分、包过（记忆用；**勿把这些词印上每条帖**）  
- [ ] 文案 / 字幕 / 评论置顶**没有**「无代考」「无保分」免责刷屏；不以法律免责块收尾  
- [ ] 无虚假高分截图、「内幕题」、恐吓式话术  
- [ ] 出国 / 打工相关只做英语练习与**合规信息**，不承诺签证或录用结果  
- [ ] 妈祖 / 轻文化：语气为文化敬意，不暗示分数捷径  
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

*版本：2026-09-17b · NZ 华人主受众 · 日更 11:30 · 与 XHS 防重叠 · 创意/免责词更新*
