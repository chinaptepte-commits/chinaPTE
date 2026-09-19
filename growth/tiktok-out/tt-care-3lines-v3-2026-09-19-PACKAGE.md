# PACKAGE · tt-care-3lines-v3 · 2026-09-19

## Why remake (v3)
- **v2 rejected**: still “slide deck + 丢人 text” — not hot enough for NZ Chinese scrollers.
- **User pivot**: 有人物的故事 — character story, not kinetic lecture.

## Approach used
- **Runway Free**: no video models → used **image models** (`nano-banana-2`) for 1 character ref + 6 story stills (consistent Chinese caregiver in NZ aged care).
- **Remotion**: Ken Burns + punch-ins + dialogue speech bubbles over stills.
- **edge-tts**: bilingual skit VO (CN narrative + EN dialogue lines + ZH gloss) + soft BGM + cut SFX.
- **Did NOT** use Fastlane AI Studio credits; **Did NOT** upgrade Runway for video.

## Creative brief (retention-first · character story)
- **Slug:** tt-care-3lines-v3
- **Bucket:** 行业英语
- **Format:** day-1 immigrant workplace humiliation skit → 3 dialogue saves
- **Characters:** nervous Chinese caregiver + elderly resident + coworker/boss stares
- **Hook (cold open):** resident stares → caregiver freezes
- **Beats as dialogue:** I'll help you sit up. / Are you in pain? / Please use the call bell.
- **Payoff:** 听懂了就不丢人
- **CTA:** 主页跟读 · chinapte.net
- **Path:** /industry-care.html
- **UTM:** https://chinapte.net/industry-care.html?utm_source=tiktok&utm_medium=social&utm_campaign=tt-care-3lines-v3-20260919

## Assets
- Video: `growth/tiktok-out/tt-care-3lines-v3-2026-09-19.mp4`
- Cover: `growth/tiktok-out/tt-care-3lines-v3-2026-09-19-cover.jpg`
- Caption: `growth/tiktok-out/tt-care-3lines-v3-2026-09-19-CAPTION.txt`
- Stills: `growth/tiktok-out/audio/v3/story/` (+ Remotion `public/story/v3/`)
- Audio: `growth/tiktok-out/audio/v3/care-v3-mix.m4a`
- Timeline: `growth/tiktok-out/audio/v3/care-v3-timeline.json`
- Remotion: `/workspace/chinapte-tt-v2` composition `CareThreeLinesV3` (16.83s @ 30fps)

## A/V sync (VO-locked)
| EN line | VO start_frame | Visual from | Δ ms |
|---------|----------------|-------------|------|
| I'll help you sit up. | 216 | 216 | 0 |
| Are you in pain? | 297 | 297 | 0 |
| Please use the call bell. | 368 | 368 | 0 |

Sync stills: `growth/tiktok-out/v3-sync-check/en{1,2,3}.jpg`

## ffprobe preflight (2026-09-19 Asia/Shanghai)
- **PASS**
- duration: **16.83s**
- video: h264 **1080×1920** @ 30fps
- audio: aac 48kHz stereo (**PASS**)
- size: ~16.3 MB
- loudnorm integrated ≈ **-16.0 LUFS** / true peak ≈ -2.0 dBTP
- A/V EN sync: on-screen English visible by VO+~100ms (≤200ms)

## Compliance
- No「无代考」「无保分」
- No WeChat divert
- Soft CTA only

## Publish status
- **DO NOT PUBLISH from this agent** — push only; parent publishes.
