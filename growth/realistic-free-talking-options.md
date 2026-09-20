# Realistic free talking / dialogue options · chinaPTE

> **Context (2026-09-20 CST):** User rejected **Wav2Lip-on-still** as *obviously fake* (static head + soft mouth warp).  
> **Constraint:** this shared box = **8× CPU · ~15 GB RAM · NO NVIDIA**. No paid Runway video · no Fastlane Talking Head (60 credits).  
> **Bar:** content that does **not** read as “AI still with fake lips.”

Related (older, Wav2Lip-centric): `growth/free-talking-video-stack.md` — keep as archive; do **not** ship that path for talking TikToks.

---

## Ranking: can it hit “not obvious AI still” on *this* CPU box?

Scores are for **chinaPTE TikTok dialogue / tip clips** (CN+EN VO, 12–20 s, 9:16), free/$0 paid video.

| Rank | Option | Hits bar? | Runs on this box? | Free? | Effort | Honest notes |
|------|--------|-----------|-------------------|-------|--------|--------------|
| **1** | **Stock B-roll + edge-tts VO + burn-in captions** (real humans / hands / commute — **no lip claim**) | **Yes** | **Yes** (ffmpeg only) | Yes (Mixkit Free License clips) | Low | Best interim. Never fakes a mouth. Audience sees real motion. Proof produced today. |
| **2** | **Real phone selfie / tutor VO** (you or friend) | **Yes (best)** | N/A (human shoot) | Yes | Med | Gold standard authenticity. Not automatable on the box. |
| **3** | **CapCut Web / Dreamina free AI avatar** (OmniHuman / Seedance credits) | Maybe | Cloud UI (agent-fragile) | Daily free credits; limits/watermarks vary | Med–High | Better than Wav2Lip-still when credits work. Still *AI face* — some viewers sniff it. Not reliable for agent batch. |
| **4** | **HF ZeroGPU Spaces via Gradio API** (e.g. KlingTeam/LivePortrait, LongCat-Video-Avatar 1.5) | Maybe | Remote GPU queue | Free tier ~**5 min GPU/day** (unauth ~2 min) | Med | LivePortrait = **motion transfer** (needs driving talking video), not pure audio→lip. Queues / cold starts / quota. Quality > Wav2Lip but often still “AI avatar.” |
| **5** | **Canva talking avatars (HeyGen / D-ID apps)** | Maybe | Cloud + separate accounts | HeyGen free ≈ **1–3 videos/mo**; D-ID needs own login | Med | Canva MCP has **no native talking-avatar tool**. Magic Video ≠ talking head. Apps are third-party, watermark/credit risk. |
| **6** | **LivePortrait CPU local** (ONNX / CPU forks) | Weak–Maybe | Possible but **slow** (minutes+/clip) + large weights | Yes (OSS) | High | Needs **driving video** of a real talker. Still→animate alone still uncanny. Not worth install vs stock+VO. |
| **7** | **EchoMimic / Hallo2 / MuseTalk local** | Better quality *if* GPU | **No** — need CUDA (A10/V100-class) | OSS weights free | Blocked | Documented GPU-only. Do not attempt on this box. |
| **8** | **Wav2Lip ONNX on still photo** | **No (rejected)** | Yes (~6–7 fps CPU) | Yes | Done | Mouth-only; head/eyes dead → “obviously fake.” Archive only. |
| — | Runway Free `generate_video` / Fastlane Talking Head | — | — | Paid / credits | — | Explicitly out of scope. |

### Box reality check (measured)

- Hardware: **no `/dev/nvidia*`**, 8 cores, ~15 GiB RAM (often ~5 GiB free under load).
- Local diffusion talking-heads (EchoMimic / Hallo2 / MuseTalk): **not feasible**.
- Local LivePortrait ONNX: theoretically CPU-possible; **not** the fastest path to “not fake,” and still needs a good driving clip.
- HF Spaces checked live (CST 2026-09-20): `KlingTeam/LivePortrait` and `victor/LongCat-Video-Avatar-1.5` both **RUNNING on zero-a10g** — usable as *optional* cloud experiments, not daily volume.

### CapCut / Canva (agent view)

| Product | Talking avatar? | Free path |
|---------|-----------------|-----------|
| CapCut Web “Avatar video” / Dreamina OmniHuman | Yes (marketing) | Daily free credits; UI + login; not MCP-automatable cleanly |
| Canva Magic Video / Magic Media | Assembles clips / short gen — **not** lip-sync avatar | Free Magic Video; Magic Media uses AI allowance |
| Canva Apps: HeyGen, D-ID | Yes | Separate account + free quota; Canva MCP cannot drive these apps |

---

## Proof clip produced (interim quality bar)

**Path:** `growth/tiktok-out/talk-real-proof/`

| File | What |
|------|------|
| `proof-stock-dialogue-2026-09-20.mp4` | ~15.6 s · 1080×1920 · h264+aac · **real stock humans** + CN/EN VO + captions |
| `cover.jpg` | Cover frame |
| `frames/01-bus.jpg` … `03-type.jpg` | Spot-checks |
| `audio/vo-full.wav` | edge-tts mix (Xiaoxiao + Jenny) |
| `stock/*.mp4` | Mixkit sources (bus / study / typing) |

**Script (same WFD hook as prior talk-free):**  
1. CN — 公交上又空白？WFD 第一遍别死磕整句。  
2. EN — Just grab Subject. Verb. End.  
3. CN — 奥克兰通勤也能练。主页跟读，chinapte.net  

**Why this clears the bar:** zero fake lips; motion is filmed humans; VO carries the dialogue; captions carry the tip. Viewers cannot call the *face* AI-fake because we never claim a talking head.

**Caveats for production:** pick more **East-Asian / NZ-student** Mixkit·Pexels clips for brand fit; current proof used available free license bus/study/typing. Prefer Mixkit **Free License** (commercial) over Restricted.

**Rebuild (box):**

```bash
# VO already in talk-real-proof/audio/; montage via ffmpeg scale/crop 1080x1920 + ass=captions.ass
# Stock: Mixkit assets.mixkit.co/videos/<id>/<id>-720.mp4
```

---

## ONE next experiment (recommend)

### → Ship **Stock dialogue scenes + dual VO** as the default free talking format for the next 5–10 TikToks

**Why this one (not CapCut / HF / LivePortrait):**

1. **Only free path that reliably clears “not obvious AI still” today on this CPU box.**  
2. Proof already exists — iterate casting/stock choice, not tooling.  
3. CapCut/Dreamina free avatar = better *if* credits + UI cooperate, but agent-fragile and still AI-face risk.  
4. HF ZeroGPU = good *secondary* A/B (one LongCat or LivePortrait clip/week under free quota), not the pipeline.  
5. Local MuseTalk/EchoMimic/Hallo2 = **blocked** without GPU.

**Success criteria for experiment:**

- [ ] 3 posts using stock+VO (no Wav2Lip face)  
- [ ] East-Asian / student-coded B-roll preference  
- [ ] Same CN hook → EN SVE → CN CTA pattern  
- [ ] Optional A/B: 1 CapCut free-avatar OR 1 HF LongCat clip in the same week (manual)  
- [ ] Retention / comments: any “AI假” complaints? (expect near-zero vs Wav2Lip)

**Do not do next:** re-polish Wav2Lip-on-still; install EchoMimic/Hallo2/MuseTalk on this box; burn Fastlane Talking Head credits.

---

## Decision tree (quick)

```
Need dialogue TikTok this week, $0 video?
├─ Must look human / not AI-still? → Stock B-roll + edge-tts (Rank 1)  ← DEFAULT
├─ Can shoot real face once? → Phone selfie library (Rank 2)
├─ Have CapCut login + free credits + 20 min UI? → CapCut avatar A/B (Rank 3)
├─ Have HF free quota + driving video? → LivePortrait / LongCat Space (Rank 4)
└─ Need MuseTalk-class local quality? → Need a GPU box (or paid) — stop
```

---

## Changelog

- **2026-09-20 CST** — Research after Wav2Lip-still rejection; proof clip under `tiktok-out/talk-real-proof/`; recommend stock+VO as default free path.
