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
- Bucket: 行业英语（今日已发 PTE技巧 RS；避开连发考试桶）
- Draft title: 奥克兰通勤 15 分钟：WFD 只抓锚点 — 或 养老护理班次 3 句
- Angle: tt-wfd-commute 或 tt-care-3lines（见 content-bank）
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

## 2026-09-18 15:00 run (TikTok NZ routine)
- Preflight: `tt-next-2026-09-18.mp4` 24.0s 1080×1920 h264+aac stereo PASS
- vs XHS today: XHS bucket 福清同乡×工地安全 (blocked noon); TT = PTE技巧 RS 3秒 — differentiated
- Benchmark: keep death-hook「3秒关麦」+ 三法则; NZ evening window 15:00 SH = ~19:00 NZST
- API: NO tokens.json → browser fallback `/home/box/tiktok-chrome-profile` only
- Package caption: `growth/tiktok-out/tt-next-2026-09-18-PACKAGE.md`

| 2026-09-18 | PTE技巧 | PTE RS 卡了 3 秒？录音直接没了 | tt-rs-3sec | Remotion+VO+BGM preflight PASS; browser fallback (no tokens.json); https://www.tiktok.com/@chinapte/video/7686767917685443861 · Studio briefly「审核/仅自己」但公网 URL 可开 |

## Package status update 2026-09-18 15:00 AWST
- **tt-next / tt-rs-3sec**: **PUBLISHED** @chinapte
  URL: https://www.tiktok.com/@chinapte/video/7686767917685443861
  Path: `growth/tiktok-out/tt-next-2026-09-18.mp4`
  Path: API still blocked until one-time OAuth → write `/home/box/secrets/tiktok/tokens.json`

## 2026-09-19 ~15:10 Asia/Shanghai run (tt-care-3lines)
- Preflight: `tt-care-3lines-2026-09-19.mp4` **PASS** — 28.05s · 1080×1920 · h264 + aac stereo
- vs XHS today: XHS 福清家属向; TT = 行业英语 Care 3 lines — differentiated
- Benchmark: borrow death-hook + 3 beats from prior winners; window ~15:00 SH ≈ NZ evening
- API: NO `/home/box/secrets/tiktok/tokens.json` → skip publish.mjs
- Fastlane: not used (no reliable session in this executor; avoid AI Studio burn)
- Browser publish: computerUse hit **login wall** — TikTok redirected to `https://www.tiktok.com/login/qrcode` with “Verify it’s really you” (email/password). Upload never reached. Sticky profile session dead until user re-auth.
- Asset ready:
  - Video: `growth/tiktok-out/tt-care-3lines-2026-09-19.mp4`
  - Caption: `growth/tiktok-out/tt-care-3lines-2026-09-19-CAPTION.txt`
  - Package: `growth/tiktok-out/tt-care-3lines-2026-09-19-PACKAGE.md`
  - Cover: `growth/tiktok-out/tt-care-3lines-2026-09-19-cover.jpg`
  - Audio: `growth/tiktok-out/audio/care-mix.m4a` (VO XiaoxiaoNeural + bgm-soft)

| 2026-09-19 | 行业英语 | 新西兰养老护理？先会这 3 句 | tt-care-3lines | Remotion+VO+BGM preflight PASS; **PUBLISHED** @chinapte; https://www.tiktok.com/@chinapte/video/7687163440728657173 (was BLOCKED_LOGIN sticky Chrome) |

## Package status 2026-09-19
- **tt-care-3lines**: **PUBLISHED** @chinapte (was BLOCKED_LOGIN)
  URL: https://www.tiktok.com/@chinapte/video/7687163440728657173
  Path: `/workspace/chinaPTE-deploy/growth/tiktok-out/tt-care-3lines-2026-09-19.mp4`


## Incident · 2026-09-19 sticky login (15:12 SH)
- Sticky `/home/box/tiktok-chrome-profile` session expired → QR/login “Verify it’s really you”.
- No Fastlane upload attempted this run (session unknown; avoid AI Studio).
- Unblock: (1) user complete verify in sticky Chrome, then agent re-upload same mp4; or (2) finish TikTok OAuth → `/home/box/secrets/tiktok/tokens.json`.

## Incident · tt-care-3lines v1 rejected (2026-09-19)
- **User reject:** v1 boring (classroom 普及感) + **A/V desync**.
- v1 path: `growth/tiktok-out/tt-care-3lines-2026-09-19.mp4` (was published https://www.tiktok.com/@chinapte/video/7687163440728657173 — creative reject; replace with v2).
- **Remake:** `tt-care-3lines-v2` retention-first hook「第一天上班听不懂？直接丢人！」· 16.0s · EN VO-locked Remotion Sequences · Δ=0ms.
- Asset ready (parent publishes; this agent does NOT publish):
  - Video: `growth/tiktok-out/tt-care-3lines-v2-2026-09-19.mp4`
  - Cover: `growth/tiktok-out/tt-care-3lines-v2-2026-09-19-cover.jpg`
  - Caption: `growth/tiktok-out/tt-care-3lines-v2-2026-09-19-CAPTION.txt`
  - Package: `growth/tiktok-out/tt-care-3lines-v2-2026-09-19-PACKAGE.md`

| 2026-09-19 | 行业英语 | 第一天上班听不懂？直接丢人！ | tt-care-3lines-v2 | Remotion CareThreeLinesV2 + segmented edge-tts EN sync Δ=0ms; ffprobe PASS 16.0s; **READY — parent publish**; v1 rejected boring/desync |

## Package status 2026-09-19 (v2)
- **tt-care-3lines-v2**: ready-for-parent-publish (do not auto-publish)
  Path: `/workspace/chinaPTE-deploy/growth/tiktok-out/tt-care-3lines-v2-2026-09-19.mp4`

