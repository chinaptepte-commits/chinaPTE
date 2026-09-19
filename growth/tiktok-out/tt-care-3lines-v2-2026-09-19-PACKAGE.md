# PACKAGE · tt-care-3lines-v2 · 2026-09-19

## Why remake
- **v1 rejected** by user: boring (classroom 普及) + A/V desync.
- v1 slug `tt-care-3lines` / URL was published then rejected creatively → ship v2 retention remake; parent publishes.

## Creative brief (retention-first)
- **Slug:** tt-care-3lines-v2
- **Bucket:** 行业英语
- **Hook:** 第一天上班听不懂？直接丢人！
- **Angle:** survival / cheat-card — NOT 普及课
- **Beats:** I'll help you sit up. / Are you in pain? / Please use the call bell.
- **Pattern interrupt:** numbered flash cards (起身/疼痛/呼叫铃) every ~2–3s before each EN
- **CTA:** 主页跟读 · chinapte.net
- **Path:** /industry-care.html
- **UTM:** https://chinapte.net/industry-care.html?utm_source=tiktok&utm_medium=social&utm_campaign=tt-care-3lines-v2-20260919

## Assets
- Video: `growth/tiktok-out/tt-care-3lines-v2-2026-09-19.mp4`
- Cover: `growth/tiktok-out/tt-care-3lines-v2-2026-09-19-cover.jpg`
- Caption: `growth/tiktok-out/tt-care-3lines-v2-2026-09-19-CAPTION.txt`
- Audio: `growth/tiktok-out/audio/care-v2-vo.mp3` + `care-v2-mix.m4a`
- Timeline: `growth/tiktok-out/audio/care-v2-timeline.json`
- Remotion: `/workspace/chinapte-tt-v2` composition `CareThreeLinesV2` (16.0s @ 30fps)

## Audio pipeline
- VO: edge-tts zh-CN-XiaoxiaoNeural (CN) + en-US-JennyNeural (EN lines)
- Segmented clips → silence-trim → concat with measured gaps → loudnorm
- BGM: `bgm-soft.mp3` @ volume 0.12 (~-18dB)
- Mix: `care-v2-mix.m4a`

## A/V sync method (documented)
1. Generate each EN line as its own edge-tts clip; measure duration with ffprobe.
2. Concatenate with known gaps → write `care-v2-timeline.json` with `en_sync.start_frame`.
3. Remotion `Sequence.from` for each Beat = that `start_frame` (EN text opacity→1 at frame 0 of Sequence).
4. Resulting delta: en1/en2/en3 = **0 ms** (≤200ms PASS).
5. Still check: `growth/tiktok-out/v2-sync-check/en{1,2,3}.jpg` show English on-screen at VO onset.

| EN line | VO start_frame | Visual from | Δ ms |
|---------|----------------|-------------|------|
| I'll help you sit up. | 129 | 129 | 0 |
| Are you in pain? | 204 | 204 | 0 |
| Please use the call bell. | 268 | 268 | 0 |

## ffprobe preflight (2026-09-19 Asia/Shanghai)
- **PASS**
- duration: **16.00s**
- video: h264 **1080×1920**
- audio: aac 48kHz stereo (present)
- size: ~2.0 MB
- silent: **no**
- mean_volume ≈ -24 dB / max ≈ -10 dB (VO intelligible over bed)

## Compliance
- No「无代考」「无保分」
- No WeChat divert
- Soft CTA only

## Publish status
- **DO NOT PUBLISH from this agent** — parent will publish.
- tokens.json: may still be absent; browser session may need re-auth.
