# Video / stills tool stack · minimize Grok Bot (chinaPTE)

> 2026-09-18 (CST) · Pair with `tiktok-stable-publish-options.md`  
> Goal: **daily TikTok + XHS** with **least Grok Bot tokens/credits**, quality + **audio preflight** intact.

---

## Principle

| Prefer | Avoid |
|--------|--------|
| Box **Shell** scripts (Remotion, ffmpeg, edge-tts, node publish) | Long **computerUse** sessions |
| **MCP one-shot** (Canva export, rare Runway still) | **Vision loops** (screenshot → decide → click → repeat) |
| Template / props edit → render | Rebuilding UI in CapCut/Canva every day |
| Original VO (edge-tts) | Chasing TikTok trending sounds via phone tools |

**What burns Grok Bot most:** multi-minute remote desktop driving, repeated screenshot/vision “is the button there?”, login recovery, CapCut timeline scrubbing, TikTok web upload wizards.

**What is cheap:** `npm run` / `npx remotion` / `ffmpeg` / `edge-tts` / `node publish.mjs` — one command, text stdout, no pixels.

---

## Tool cards

### Remotion (`growth/remotion-tt-v2`) — **daily default**

| | |
|--|--|
| Cost | **$0** · local box CPU |
| Grok | **Low** if agent only edits `src/*.tsx` / props / public assets then Shell-renders |
| Quality | Controlled typography, hooks, brand; compositions already exist (`NzInduction`, `RsThreeSecond`, …) |
| Audio | **Required** via `AudioTracks` + `public/audio/` — silent export = bug |
| Use when | Every scheduled TikTok day |
| Don’t | Redesign composition from scratch each day; don’t open Remotion Studio in browser for routine |

### edge-tts + ffmpeg (box) — **audio preflight**

| | |
|--|--|
| Paths | `edge-tts` → `/workspace/chinaPTE-tts-venv/bin/edge-tts` · `ffmpeg` → `/usr/bin/ffmpeg` |
| Voice | zh-CN-XiaoxiaoNeural (playbook default) |
| Grok | Near-zero (Shell) |
| Preflight | `ffprobe` streams; reject if no audio track / near-zero duration / silent mux miss |
| Use when | Script text changes; always before publish |

### Fastlane Free — **schedule only**

| | |
|--|--|
| Role | Upload **finished** Remotion MP4 → calendar · native TikTok |
| Grok | Low if Dashboard/API; **high** if agent drives UI with computerUse |
| Credits | **Do not** use AI Studio / Blitz save / fill-calendar (see `fastlane-quota-playbook.md`) |
| Status | **TikTok already connected** |

### Canva MCP (`user-Canva`) — **XHS / stills**

| | |
|--|--|
| Good for | Covers, carousels, brand banners, one-off social stills |
| Bad for | Daily 9:16 talking-head TikTok (Remotion faster + cheaper Grok) |
| Grok | Medium (MCP round-trips + thumbnails); still far better than CapCut computerUse |
| Tip | Prefer brand template / copy-design → edit text → export PNG; avoid generate-design loops |

### Runway MCP (`user-Runway`) — **rare spice**

| | |
|--|--|
| Good for | Occasional B-roll, product hero, image edit, bg remove |
| Bad for | Daily PTE tip videos (paid video models, credit burn) |
| Grok | Tool calls cheaper than computerUse, but **Runway credits** are separate spend |
| Rule | Default **off** for chinaPTE daily; ask before any `generate_video` |

### CapCut / free timeline editors

| | |
|--|--|
| Human CapCut | OK for one-off polish |
| Agent CapCut | **Kill** — vision + clicks = max Grok tokens |
| Alternative | Remotion props + ffmpeg filters |

### TikTok Studio / Buffer / own API

Publish layer only — see `tiktok-stable-publish-options.md`. Publishing via API = tiny Grok; publishing via browser = huge Grok.

---

## Ranked daily pipeline (least Grok → still ship)

```text
1. Pick slug from tiktok-content-bank / posted-log (text only)
2. Patch Remotion composition props / on-screen copy (few file edits)
3. edge-tts → VO wav/mp3 into public/audio/
4. ffmpeg mux / loudnorm if needed
5. npx remotion render … → growth/tiktok-out/*.mp4
6. Audio preflight: ffprobe -show_streams | require audio; spot-check duration
7. Publish:
     IF tokens.json exists → node growth/tiktok-api/publish.mjs …
     ELSE → Fastlane upload+schedule OR TikTok Studio schedule
8. Append growth/tiktok-posted-log.md
```

**XHS same day (anti-overlap):** Canva MCP cover **or** existing PNG pipeline → human/App post · avoid same tip bucket as TikTok.

**Target Grok shape:** 1 focused agent turn, mostly Shell + Read/Edit · **zero** desktop vision unless emergency.

---

## Anti-patterns (Grok credit killers)

1. “Just open TikTok web and upload” every day  
2. CapCut project rebuild via screenshots  
3. Fastlane Blitz / regen until it “looks viral”  
4. Runway 10s+ video for a vocabulary tip that Remotion already covers  
5. Re-login loops when OAuth code paste would fix permanence  

---

## Decision cheatsheet

| Need | Use |
|------|-----|
| Daily TT tip / NZ English | Remotion + edge-tts + ffmpeg |
| Queue without API tokens yet | Fastlane schedule **own** MP4 |
| Permanent unattended publish | Finish TikTok OAuth → `publish.mjs` |
| XHS cover | Canva MCP or static PNG |
| Fancy B-roll once | Runway (explicit OK) |
| Trending TikTok sound | Human App only (API can’t) — usually skip for chinaPTE |

---

*Version: 2026-09-18 · Remotion primary · MCP secondary · computerUse last resort*
