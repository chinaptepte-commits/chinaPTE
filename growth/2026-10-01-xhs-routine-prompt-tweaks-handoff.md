# Handoff · chinapte-xhs-weekday-growth prompt tweaks · 2026-10-01

Executor **无** UpdateState。请 **parent** 用 `UpdateState`（target=`routine`, action=`update`）落盘。  
映射见既有：`growth/2026-10-01-routine-update-handoff.md`（folder 可能是 `chinapte-xhs-weekday-growth` 或 automation-1789648184347 / 1789636713892）。  
**不要改 schedule**，除非用户明示。

---

## 为何改（对接零浏览诊断）

- Soft-verify 截图：近期笔记多为 **0 浏览**；冷启未起。
- 修复主杠杆：**搜索关键词靠前的标题/封面** → 用搜索曝光补推荐空白。
- 禁复读近 7 日同钩；晚槽 WFD 必须 ≠ 9/28「听完一片空白」钩。

---

## Prompt 全文（替换 routine prompt）

```
chinaPTE 小红书工作日获客（Asia/Shanghai）。权威：
- /workspace/chinaPTE-deploy/growth/2026-10-01-xhs-acquisition-content-playbook.md
- /workspace/chinaPTE-deploy/growth/2026-10-01-nz-chinese-search-seo.md
- /workspace/chinaPTE-deploy/growth/2026-10-01-xhs-zero-views-diagnosis.md
（/workspace/growth/ 镜像同步可读）

目标漏斗：搜索命中 → 收藏/关注 → 主页 → chinapte.net UTM → 站内练习。
当前瓶颈：账号冷启、近帖近 0 曝光 → **每帖必须搜索优先**，不要赌推荐。

【搜索关键词（标题前段必吃其一簇）】
P0：PTE练习 / PTE题库 / 免费刷题 / 华人PTE
P0 题型：WFD听写 / WFD技巧 / RS跟读 / PTE口语
P0 场景：新西兰打工英语 / 澳洲打工英语 / 工地英语 / 护理英语 / 酒店英语
P1：PTE 58（仅事实说明，非法代）/ PTE还是雅思
Avoid 永不写：保分、包过、代考、泄题、微信硬CTA、妈祖绑考试、默认「…听懵？」开场

标题规则：
- 核心搜索词放标题前约 14 字内；形态优先「{词}｜{数字}{资料包|速查}」
- 近 7 日同钩禁用（发前读 xhs-posted-log.md）
- 封面字 ≤15：搜索词 + 数字利益；资料包承诺与内页一致

槽位（勿改 cron，按触发时刻选桶）：
- 午 ~11:09：图文资料包 ≥6 页（题型速查或行业词表）
- 晚 ~18:09：短视频优先（TT occupational 双发）；无成片 → 高密度资料包
- 同日午≠晚同桶同钩；妈祖若排期仅出海平安且不与 PTE CTA 混写；近周降频妈祖（曝光弱）

生产与发布：
1) 写 PACKAGE + CAPTION 到 growth/xhs-out/；评分表总分≥14 才发
2) 软 CTA 一次：https://chinapte.net/<path>?utm_source=xiaohongshu&utm_medium=social&utm_campaign=<slug>&utm_content=noon|evening
3) 发布经 /home/box/xhs-chrome-profile；发前 soft-verify note-manager（截图）；publish-preflight
4) 无 computerUse 时：只备包，上报 parent 发布
5) 发后记 xhs-posted-log（growth + chinaPTE-deploy 镜像）；+1h 短提问互动（禁合规说教）
6) 简报用户：链 + 一句话趋势（不编造数字）。连续 0 浏览时引用诊断文档动作，勿盲目加日更量。
```

### UpdateState 参数

```
target: routine
action: update
id: chinapte-xhs-weekday-growth
# 若不存在：automation-1789648184347（午）与 automation-1789636713892（晚）各 update 同一 prompt 意图
prompt: <上方全文>
# 不要传 schedule
```

午/晚分 folder 时：同一 prompt，结尾加「本触发若是午槽则只发资料包；晚槽优先视频」。

---

## 本回合已落盘（executor）

- 诊断：`growth/2026-10-01-xhs-zero-views-diagnosis.md`（+ deploy 镜像）
- 晚包升级：`growth/xhs-out/2026-10-01-evening-PACKAGE.md` + CAPTION + COVER-PROMPTS
- 本 handoff

**未** UpdateState · **未** 发布
