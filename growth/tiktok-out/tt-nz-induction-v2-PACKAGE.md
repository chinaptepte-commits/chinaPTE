# TikTok 上传包 · 2026-09-17 · tt-nz-induction-v2

> 状态：**ready · AUDIO FIX** · **优先 Content Posting API**（`growth/tiktok-api/publish.mjs`）；App/浏览器仅 fallback
> ⚠️ **silent v2 为缺陷（非故意）** —— 已 remake 带中文口播+轻 BGM；请用下方 **audio** 文件重传。  
> 选题：行业英语 · NZ site induction（与当日 XHS 错开）  
> 时长：25.0s · 1080×1920 · Remotion kinetic · **有音轨（AAC stereo）**  
> 对标结论：赢在「全听不懂」痛点钩子 + 一词一切 + 怼脸中英大字（见 BENCHMARK）
> 音频：edge-tts 中文口播（XiaoxiaoNeural）+ soft BGM @ ~-18dB；**silent=bug**

---

## Creative brief（20–30s）

| 段 | 时间 | 画面 |
|----|------|------|
| Hook | 0–2s | **NZ 工地 induction / 全听不懂？** → 胶囊「先抓这 5 个安全词」 |
| Beat 1 | ~2–5.4s | **PPE** · 个人防护装备 · Got your PPE? |
| Beat 2 | ~5.4–8.8s | **hard hat** · 安全帽 |
| Beat 3 | ~8.8–12.2s | **hazard** · 危险/隐患 · Report the hazard |
| Beat 4 | ~12.2–15.6s | **scaffold** · 脚手架 |
| Beat 5 | ~15.6–19s | **emergency exit** · 紧急出口 |
| Payoff | ~19–22s | 听懂安全词，比多干半小时更重要 |
| Soft CTA | ~22–25s | **主页有跟读** · chinapte.net · 建筑专题免费练 |

硬规则：屏上/文案 **不出现** 无代考/无保分/不包过；不承诺代考或分数保证。

---

## 口播稿（已烧入音轨 · ~25s）

刚到新西兰工地，最慌的是 site induction 全听不懂。  
先抓五个：PPE、hard hat、hazard、scaffold、emergency exit。  
听懂安全词，比多干半小时更重要。  
跟读在主页——chinapte.net 建筑专题，免费练。

---

## 文案区（复制粘贴）

NZ 工地 induction 全听不懂？先抓这 5 个安全词 👷  
PPE / hard hat / hazard / scaffold / emergency exit  
听懂比多干半小时更重要。  
建筑专题免费跟读 → 完整链接在主页

#新西兰打工 #工地英语 #siteinduction #华人NZ #奥克兰 #PTE #打工英语 #chinaPTE

---

## 上传检查清单

- [ ] **优先 API**：`node growth/tiktok-api/publish.mjs --dry-run --video growth/tiktok-out/tt-nz-induction-v2-audio-2026-09-17.mp4`（见 `tiktok-api-playbook.md`）
- [ ] API 未通时：TikTok **手机 App** 上传
- [ ] 视频：**`tt-nz-induction-v2-audio-2026-09-17.mp4`**（勿用无声 v2）
- [ ] 封面：`tt-nz-induction-v2-cover.jpg`（或 App 截 Hook 帧）
- [ ] 粘贴上方文案区
- [ ] Bio UTM：`https://chinapte.net/industry-construction.html?utm_source=tiktok&utm_medium=social&utm_campaign=tt-nz-induction-v2`
- [ ] 评论置顶：`免费跟读见主页链接`
- [ ] 建议发布时间：当天 **11:30**（Asia/Shanghai）
- [ ] 发后写入 `growth/tiktok-posted-log.md`

---

## 文件

- 视频（有声 remake）：`growth/tiktok-out/tt-nz-induction-v2-audio-2026-09-17.mp4`
- 视频（无声原件·勿发）：`growth/tiktok-out/tt-nz-induction-v2-2026-09-17.mp4`
- 封面：`growth/tiktok-out/tt-nz-induction-v2-cover.jpg`
- 对标：`growth/tiktok-out/tt-nz-induction-v2-BENCHMARK.md`
- 工程：`growth/remotion-tt-v2`（vendored；工作区亦可 `/workspace/chinapte-tt-v2`）（Remotion · composition `NzInduction` · **AudioTracks 默认开**）
- 音轨素材：`growth/tiktok-out/audio/`（nz-vo / bgm-soft / nz-mix）
- **规则：silent TikTok = bug，禁止再发无声成片**
