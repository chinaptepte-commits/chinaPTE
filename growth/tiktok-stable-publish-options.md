# TikTok stable publish options · chinaPTE (@chinapte)

> Research date: **2026-09-18 (CST / Asia/Shanghai)**  
> Goal: **permanent native publish** without flaky remote-browser logins · **$0 preferred**  
> Companion: `tiktok-api-playbook.md` · `fastlane-quota-playbook.md` · `video-tool-stack.md`

---

## Ranked recommendation (chinaPTE)

### 1. Best permanent path — **own TikTok Content Posting API**

| | |
|--|--|
| **Why** | One-time OAuth → agent holds `refresh_token` (~365d) → `publish.mjs` Direct Post / inbox. No browser session. Official, free (no per-call fee). |
| **Cost** | **$0** API · human time for app + OAuth + later audit |
| **Native publish** | Yes (`video.publish` Direct Post; `video.upload` inbox draft) |
| **Blocker now** | `tokens.json` **missing** — need user paste OAuth `code` once (client `.env` already on box) |
| **Until audit** | `--privacy SELF_ONLY`; public needs TikTok app audit |

**This is the only path that fully ends remote-browser login fragility for daily Remotion exports.**

### 2. Best free stack *now* (while OAuth unfinished)

| Layer | Tool | Role |
|-------|------|------|
| Produce | **Remotion** + **edge-tts** + **ffmpeg** (box) | Daily TikTok MP4 + audio preflight |
| XHS stills | **Canva MCP** (sparingly) or Remotion/PNG scripts | Covers / carousels |
| Schedule / publish | **Fastlane Free** (already connected) **upload own video → schedule** | Native TikTok publish if Dashboard allows; **do not burn AI Studio** |
| Backup schedule | **TikTok Studio** native schedule (Creator/Business, ~10–30d) | Free, true auto-publish, original audio only |
| Optional free queue | **Buffer Free** (3 channels, 10 queued/channel) or **Metricool Free** (1 brand, ~20 posts/mo) | True auto-publish for Business; prefer original VO |

**Do not** make Buffer/Metricool/Later the long-term brain — they are bridges until API OAuth is done.

### 3. Finish vs already done

| Status | Item |
|--------|------|
| **DONE** | Developer app + Login Kit + Content Posting API products |
| **DONE** | Redirect `https://chinapte.net/oauth/tiktok-callback.html` + URL-prefix verify file |
| **DONE** | `client_key` / `client_secret` in `/home/box/secrets/tiktok/.env` |
| **DONE** | Authorize URL ready (`authorize-url.txt`) |
| **DONE** | `growth/tiktok-api/publish.mjs` + playbook |
| **DONE** | **Fastlane connected** to chinaPTE TikTok (use as Free schedule / probe only) |
| **DONE** | Remotion `remotion-tt-v2` + ffmpeg + edge-tts on box |
| **TODO (human once)** | Open authorize URL as **@chinapte** → Allow → land on callback → **paste `code` to agent** |
| **TODO (agent)** | Exchange code → write `tokens.json` → `--dry-run` → first `SELF_ONLY` publish |
| **TODO (later)** | TikTok **app audit** for `PUBLIC_TO_EVERYONE` |
| **TODO (optional)** | Domain verify for `PULL_FROM_URL` (FILE_UPLOAD works without it) |

### 4. Kill list (do not rely on)

| Kill | Why |
|------|-----|
| Remote **browser login** / sticky Chrome as daily path | Flaky 2FA / captcha / session death — demote to emergency only |
| Tools that only **ping the phone** (“notification publish” / companion-app tap) as the *primary* path | Not unattended; same failure mode as manual |
| **Later** unpaid forever | No real free plan (14-day trial only) — not chinaPTE $0 stack |
| Unpaid “unlimited” schedulers that are **inbox reminder only** | Marketing blur; verify Auto vs Notify before queueing |
| **Fastlane AI Studio / Blitz regen / calendar fill** on Free | Burns 10 credits / Limited saves — probe ≤1–2/week max |
| **Runway generate_video** for daily TikTok | Paid-gated / credit-heavy; wrong for day-1 Remotion cadence |
| CapCut desktop driven by **computerUse + vision loops** | High Grok token burn; human CapCut OK, agent CapCut = last resort |
| Hootsuite / Sprout-class paid suites | Cost vs chinaPTE zero-cost preference |

---

## Comparison matrix

Legend: **Native** = API Direct Post / auto-publish · **Remind** = phone ping · **$0** = usable free forever for chinaPTE scale

| Option | One-time OAuth | Native publish | Free tier usable? | Notes for @chinapte |
|--------|----------------|----------------|-------------------|---------------------|
| **TikTok Content Posting API** (own app) | Yes (once) | **Yes** Direct + inbox | **Yes** (no API fee) | **P0 permanent.** Unaudited → SELF_ONLY. Rate ~6 init/min/user. |
| **Fastlane** | Connect TikTok | **Yes** (claims native) | **Yes** Free (tight) | **Already connected.** Prefer upload-own-video schedule; AI Studio = probe only. Unlimited schedule is Pro. |
| **TikTok Studio** native schedule | N/A (logged-in Studio) | **Yes** | **Yes** | Creator/Business; ~10d desktop (Studio app often cited ~30d); original audio; no edit after schedule. |
| **Buffer** | TikTok OAuth | **Yes** auto (or Notify) | **Yes**: 3 channels, 10 queued/channel | Good free bridge; choose **Automatic** not Notify. |
| **Metricool** | TikTok OAuth | **Yes** (or off → reminder) | **Yes**: 1 brand, ~20 scheduled/mo | Analytics-strong; daily TT alone can fill monthly cap. |
| **Publer** | TikTok OAuth | **Yes** (typical) | **Yes**: 3 accounts, 10 queued each | History vanishes ~24h on Free — awkward ops. |
| **Later** | TikTok OAuth | **Yes** (Business auto) | **No** free forever | Trial only → **kill for $0**. |
| Sticky remote browser | Session cookie | Manual upload | “Free” | **Kill as primary.** |
| Mobile App PACKAGE handoff | — | Manual | Free | P1 human backup when API/Fastlane blocked. |

### TikTok API nuance (2026)

- Scopes: `video.publish` (timeline Direct Post) · `video.upload` (inbox draft).
- Unaudited clients: restricted visibility (`SELF_ONLY` / private).
- Tokens: access ~24h · refresh ~365d (persist rotated refresh).
- chinaPTE scripts: `node growth/tiktok-api/publish.mjs …`

### Third-party nuance

- Auto-publish generally **cannot** attach TikTok-library trending sounds → chinaPTE **original edge-tts VO** is the right fit.
- If a tool defaults to **Notify Me**, treat as kill-list for unattended days.

---

## Recommended operating modes

```
PERMANENT (target)
  Remotion → audio preflight → publish.mjs (API) → log

NOW (OAuth pending)
  Remotion → audio preflight → Fastlane upload+schedule
    OR TikTok Studio schedule
    OR Buffer Free Automatic (optional)

EMERGENCY
  PACKAGE.md → human phone App
  sticky Chrome profile ONLY if App blocked
```

---

## Part B — Minimize Grok Bot tokens (video / XHS stack)

Full detail: **[`video-tool-stack.md`](./video-tool-stack.md)**. Summary ranking for **least Grok Bot** while keeping quality + audio preflight:

| Rank | Tool | Grok cost | When |
|------|------|-----------|------|
| **1** | Remotion + scripts on box | **Lowest** (short Shell turns) | Daily TikTok |
| **2** | edge-tts + ffmpeg | Near-zero | VO + mux + loudness check |
| **3** | Fastlane Free schedule-only | Low (if API/UI scripted) / high if computerUse | Queue finished MP4 |
| **4** | Canva MCP | Medium | XHS covers / one-off brand stills — not daily TT video |
| **5** | Runway MCP | High credits + paid video | Hero B-roll / rare experiments only |
| **Kill** | CapCut via computerUse+vision | **Highest** Grok burn | Human-only if needed |
| **Kill** | Long TikTok web upload via vision loops | Highest | Replaced by API |

**Daily pipeline (least Grok):** content-bank pick → edit Remotion props/text → edge-tts → ffmpeg mux → Remotion render → `ffprobe` audio preflight → Fastlane/API publish → append posted-log. **One short agent turn**; no browser.

---

*Version: 2026-09-18 · API = permanent · Fastlane = connected free bridge · kill reminder-only & browser-primary*
