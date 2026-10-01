# Routine Update Handoff · 2026-10-01

Executor **没有** UpdateState 工具。请 parent 用 `UpdateState`（target=`routine`, action=`update`）落盘。  
若文件夹名与下文不同，按「现网映射」改 id。

## 现网映射（2026-10-01 箱内实测）

| 用户口述 id | 箱内实际 folder | 现 schedule（automation.json） | 备注 |
|-------------|-----------------|--------------------------------|------|
| `chinapte-xhs-weekday-growth`（11:09 & 18:09） | **未找到同名**；近义为 `automation-1789648184347`（午）+ `automation-1789636713892`（晚） | 午 `15 12 * * *`；晚 `30 19 * * *` | **不要改 schedule**，除非用户确认已迁到 11:09/18:09 |
| `chinapte-douyin-day1-hotel` | **未找到** | — | 仅有文档包；若 routine 在其他 agent，parent 自查 |

建议：若已创建 `chinapte-xhs-weekday-growth`（cron `9 11,18 * * 1-5`），直接 update 该 id；否则分别 update 上述两个 XHS folder 的 **prompt only**。

---

## A. Prompt 草案 · XHS weekday（单 routine 双槽 或 午/晚共用此意图）

```
chinaPTE 小红书工作日获客（Asia/Shanghai）。权威内容方向：
- /workspace/chinaPTE-deploy/growth/2026-10-01-xhs-acquisition-content-playbook.md
- /workspace/chinaPTE-deploy/growth/2026-10-01-nz-chinese-search-seo.md
（/workspace/growth/ 有镜像则同步可读）

目标漏斗：搜索命中 → 收藏/关注 → 主页 → chinapte.net UTM → 站内练习。

槽位默认（勿改 cron，只按触发时刻选桶）：
- ~11:09 / 午：优先「图文资料包」或搜索向 PTE 技巧速查（WFD/RS/练习中心地图）。
- ~18:09 / 晚：优先短视频（TT occupational 同成片双发，或技巧口播）；无成片则高密度资料包。

选题硬规则：
1) 搜索意图标题：核心词靠前；优先 PTE技巧资料包 / NZ-AU 工作英语 / 题型痛点。
2) 禁止：保分/包过/代考/泄题/微信硬 CTA/刷量；妈祖仅出海旅途平安、禁止绑考试学业；禁止无差异复读厨房对话与 daily-pack 薄钩。
3) 软 CTA 一次：https://chinapte.net/<path>?utm_source=xiaohongshu&utm_medium=social&utm_campaign=<slug>
4) 发前读 xhs-posted-log 避让近 7 日同钩；写 PACKAGE 到 growth/xhs-out/；视频跑 publish-preflight。
5) 发布经 /home/box/xhs-chrome-profile（或现行 xhs-sticky-session）；仅登录/验证码/敏感私信时打断用户。
6) 简报用户：链 + 一句话数据趋势（不编造数字）。
```

### UpdateState 参数示例

```
target: routine
action: update
id: chinapte-xhs-weekday-growth   # 或 automation-1789636713892 / automation-1789648184347
prompt: <上方全文>
# 不要传新的 schedule，除非用户明示改点
```

午/晚若是两个 folder：同一 prompt 意图，结尾加一句「本触发若是午槽则只发资料包；晚槽优先视频」。

---

## B. Prompt 轻量对齐 · Douyin Day1 hotel

```
chinaPTE 抖音冷启动（日程不变）。执行时引用：
- growth/2026-10-01-douyin-cold-start-7d.md
- growth/2026-10-01-douyin-day1-PACKAGE.md
- 获客研究：growth/2026-10-01-nz-chinese-search-seo.md 、growth/2026-10-01-xhs-acquisition-content-playbook.md（跨平台合规同红线）
红线：无保分/代考；软链 utm_source=douyin；妈祖不进本冷启动。
按 PACKAGE 发布酒店对话成片；缺登录则手递用户。
```

`id: chinapte-douyin-day1-hotel`（若存在）

---

## C. Executor 已落盘

- 研究文档 ×2 + 索引  
- 晚槽 PACKAGE + CAPTION  
- 本 handoff  

未代为 UpdateState。
