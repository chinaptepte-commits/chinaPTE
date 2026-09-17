# 小红书运营 Playbook · chinaPTE（Agent 周循环）

面向：**零成本**获客（PTE 免费练习 + 合规出国劳务线索）。  
站内基建：`utm.js` 首触归因 · `xhs-share.js` 一键文案 · `growth/xhs-content-bank.md` 草稿库。

---

## 1. 发帖节奏（Cadence）

| 频率 | 内容类型 | 来源 |
|------|----------|------|
| 每周 4–5 条 | 主更新 | 内容库轮换（技巧 / 行业词 / 免费题库 / 妈祖品味向） |
| 每周 1 条 | 软转化 | 练习中心入口或合规路径说明（`xhs-practice-hub` / `xhs-labor-path`） |
| 可选 | 互动贴 | 征集「你卡在哪一题型」；评论区只给免费站链接 |

**时段建议（澳洲珀斯 PT / 对国内流量可试晚高峰）**  
- 工作日：12:00–13:30 或 20:00–22:30（PT）  
- 周末：10:00–11:30 再发 1 条行业英语

**账号原则**  
- 主页简介固定：免费 PTE 练习 + 澳新打工英语 + 合规咨询入口（chinapte.net）  
- 置顶：免费题库 / 练习中心说明帖  
- 禁止：代考、保分、恐吓式「不过就完了」、虚假上岸案例

---

## 2. 笔记打分（Scorecard）

每条笔记发布 **24h / 72h** 各记一次（小红书创作者中心或截图归档）：

| 指标 | 权重 | 说明 |
|------|------|------|
| 曝光 / 观看 Views | 1× | 基础分母 |
| 收藏 Saves | 3× | 强意向；技巧帖通常更高 |
| 评论 Comments | 2× | 含提问/求链接 |
| 主页访问 Profile clicks | 4× | 最接近「会去站点」 |
| 站内 UTM（同 campaign） | 加分 | `utm_campaign=<slug>` 落地 PV / 留资 |

**综合分（简式）**  
`Score = views + 3*saves + 2*comments + 4*profile_clicks`  
再看 **Saves/Views**、**Profile/Views** 比率。

**健康阈值（起步期参考，非 KPI 承诺）**  
- Saves/Views ≥ 2%  
- Profile/Views ≥ 1%  
- 同 slug 站内首次落地 ≥ 数次（有即加分）

---

## 3. Kill / Double-down 规则

在 **72h** 后决策（不足 200 曝光可延长到 7 天）：

### Kill（停发同结构）
- Score 明显低于账号中位，且 Saves/Views < 1%  
- 评论区负面集中在「硬广/迷信/焦虑」——立刻改话术，该角度停更 2 周  
- 触发平台限流关键词或违规提示 → 下架同类，换合规角度

### Double-down（加码）
- Saves/Views ≥ 3% **或** Profile/Views ≥ 1.5%  
- 同主题连续 2 条进中位以上 → 复制结构换封面/换例子，**保留同一 utm_campaign 前缀**（如 `xhs-wfd-tip-b`）  
- 行业词帖若评论「要护理/建筑」→ 下周优先发对应专题

### Hold（观察）
- 曝光高但收藏低：改封面/标题，正文结构可保留  
- 收藏高但主页低：简介与置顶不够清晰，先改主页再发

---

## 4. 每周优化循环（Agent Routine）

**周一 · 盘点**  
1. 拉取上周笔记 24h/72h 指标，写入简表（可用 `growth/xhs-weekly-log.md` 自建）。  
2. 对照站内 analytics：按 `utm_campaign` 聚合 page_view / feature_use / 留资。  
3. 标出 Kill / Double-down / Hold。

**周二 · 选题**  
1. 从 `xhs-content-bank.md` 选 4–5 条未发或高分主题变体。  
2. 至少 1 条技巧（WFD/RS）、1 条行业英语、1 条免费入口；妈祖向每月 ≤ 2 条，保持品味。  
3. 生成 UTM：`utm_source=xiaohongshu&utm_medium=social&utm_campaign=<slug>`。

**周三–周日 · 发布与互动**  
1. 发帖；评论区统一：免费站链接（带 UTM）+「无代考无保分」。  
2. 站内可用「复制小红书文案」按钮校验文案与链接。  
3. 高赞评论可二次做成下周帖。

**周日晚 · 复盘**  
1. 更新内容库：淘汰 Kill 结构，把 Double-down 结构写成新草稿。  
2. 若某 slug 站内转化好：下周同 slug 只换封面做 A/B。  
3. 检查首页/练习中心/妈祖分享条是否仍可用。

---

## 5. 站内追踪清单

| 组件 | 路径 | 作用 |
|------|------|------|
| UTM 助手 | `/utm.js` | 首触写入 `localStorage`（`chinaPTE_utm_first`），事件带归因 |
| 分析 | `/analytics.js` | `page_view` 等事件自动合并 UTM 字段 |
| 分享条 | `index` / `practice` / `mazu` + `/xhs-share.js` | 「复制小红书文案」→ `feature_use: xhs_copy_caption` |
| 内容库 | `growth/xhs-content-bank.md` | 12 条草稿 |
| 本手册 | `growth/xhs-playbook.md` | 节奏与决策 |

**归因解读**  
- `utm_first_*`：首次从哪条笔记来的（长期）  
- 当前 `utm_*`：本会话最后一次落地参数  

---

## 6. 合规速查（发前 10 秒）

- [ ] 无代考 / 替考 / 保分 / 包过  
- [ ] 无虚假高分截图与「内幕题」  
- [ ] 妈祖文案含「非分数承诺 / 文化敬意」语气  
- [ ] 出国相关指向合规说明或咨询留资，不承诺签证结果  
- [ ] 链接含 UTM，campaign 与内容库 slug 一致  

---

*版本：2026-09-17 · 与站点 UTM / 分享条同批上线*

## Cadence (updated 2026-09-17)
- **1 图文 / 天**（新号起号常见最佳密度；同日不发第二篇）
- 定时：每天 10:00（用户本地 Asia/Shanghai）

## Anti-homogenization
- 连续笔记不得同选题桶；近 7 篇标题/开头/封面模板不得复用
- 每天轮换：PTE技巧 / 行业英语 / 备考节奏 / 轻文化 / 工具入口
- 记录见 `xhs-posted-log.md`

