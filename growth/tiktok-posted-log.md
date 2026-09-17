# TikTok 已发记录（防同质化 · 对照 XHS）

> 发前：查本表近 7 行 + `xhs-posted-log.md` 当日桶，避免撞车。  
> 节奏：每天 **11:30**（Asia/Shanghai）1 条。  
> slug 前缀：`tt-…`

> 流程：发前自观数据+对标爆款发布时间
| 日期 | 选题桶 | 标题 | slug | 备注 |
|------|--------|------|------|------|
| 2026-09-17 | 行业英语 | NZ 工地 induction 听不懂？先抓这 5 个词 | tt-nz-induction | 首包 ready-for-user-upload；手机 App 上传；与当日 XHS WFD 错开 |

| 2026-09-17 | 行业英语 | NZ 工地 induction 5 安全词 v2 | tt-nz-induction-v2 | Remotion remake after benchmark; public; no disclaimer spam; UTM tt-nz-induction-v2; https://www.tiktok.com/@chinapte/video/7686477033064582420 |


## Incident · silent v2 defect (2026-09-17 PT evening)

- **Defect:** `tt-nz-induction-v2-2026-09-17.mp4` shipped **silent** — **NOT intentional**. TikTok URL already public: https://www.tiktok.com/@chinapte/video/7686477033064582420
- **Fix:** remake with Mandarin VO (edge-tts XiaoxiaoNeural) + soft BGM (~-18dB) → `growth/tiktok-out/tt-nz-induction-v2-audio-2026-09-17.mp4` (25.0s, AAC stereo). **Pending parent reupload** (do not publish from this agent).
- **Also fixed:** tomorrow cold-start `tt-next-2026-09-18.mp4` (RS 3秒法则) overwritten with audio; backup `tt-next-2026-09-18-audio.mp4`.
- **Remotion:** `/workspace/chinapte-tt-v2` now defaults `AudioTracks` on `NzInduction` / `RsThreeSecond`. **silent = bug**.
- Policy note: never ship TikTok without VO+bed music.

## Next queued
- Bucket: PTE技巧（避开 XHS 若仍在技巧桶）
- Draft title: RS：别抢嘴，听完再复述
- Angle: tt-rs-tip · 口播节奏演示
- Status: queued

## Package status
- **2026-09-17 tt-nz-induction**: ready-for-user-upload  
  路径：`growth/tiktok-out/tt-nz-induction-2026-09-17.mp4`  
  文案包：`growth/tiktok-out/tt-nz-induction-PACKAGE.md`

- **2026-09-17 tt-nz-induction-v2**: SILENT DEFECT → audio remake ready; pending reupload  
  有声：`growth/tiktok-out/tt-nz-induction-v2-audio-2026-09-17.mp4`  
  文案包：`growth/tiktok-out/tt-nz-induction-v2-PACKAGE.md`
- **2026-09-18 tt-next (RS 3秒法则)**: ready-for-cold-start · AUDIO FIXED · DO NOT PUBLISH YET  
  路径：`growth/tiktok-out/tt-next-2026-09-18.mp4` (+ `-audio` backup)  
  文案包：`growth/tiktok-out/tt-next-2026-09-18-PACKAGE.md`
