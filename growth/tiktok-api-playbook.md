# TikTok Content Posting API · chinaPTE playbook

**Goal:** End constant browser logout. **API is primary**; sticky Chrome profile `/home/box/tiktok-chrome-profile` is **fallback only**.

Account: **@chinapte / chinaPTE**  
One-time human OAuth → agent owns refresh + publish forever (until refresh_token revoked / 365d).

Docs consulted (2026):
- [Get Started — Direct Post](https://developers.tiktok.com/doc/content-posting-api-get-started)
- [Direct Post reference](https://developers.tiktok.com/doc/content-posting-api-reference-direct-post)
- [Upload / inbox](https://developers.tiktok.com/doc/content-posting-api-get-started-upload-content)
- [Login Kit Web](https://developers.tiktok.com/doc/login-kit-web)
- [User Access Token Management](https://developers.tiktok.com/doc/oauth-user-access-token-management)

---

## 0. Architecture (who does what)

| Step | Owner | Notes |
|------|--------|--------|
| Create developer app + add products | **Human once** (parent: computerUse + box_help) | developers.tiktok.com |
| Authorize @chinapte | **Human once** | OAuth consent in TikTok login |
| Store tokens | Agent | `/home/box/secrets/tiktok/` — **never git** |
| Daily publish | Agent | `growth/tiktok-api/publish.mjs` |
| Browser upload | Agent only if API blocked | dedicated profile only |

---

## 1. Create TikTok developer app (exact flow for parent → user)

See also **§8 Exact clicks** at the bottom (hand to user).

### 1.1 App type / products

1. Open https://developers.tiktok.com/ → Log in with the **same TikTok identity** that can manage the chinaPTE brand (developer account).
2. **Manage apps** → **Create an app** (or use existing chinaPTE app if any).
3. App name suggestion: `chinaPTE Publisher` (internal; not shown as caption).
4. Add products:
   - **Login Kit** (Web) — required for OAuth redirect
   - **Content Posting API** — required for upload/publish
5. Under Content Posting API config, enable **Direct Post** (needed for `video.publish` timeline post). Without Direct Post you only get inbox draft (`video.upload`).

### 1.2 Scopes to request / get approved

| Scope | Purpose | Endpoint family |
|-------|---------|-----------------|
| `user.info.basic` | Avatar / display name | Login Kit baseline |
| `video.upload` | Upload to creator **inbox** (manual finish in app) | `/v2/post/publish/inbox/video/init/` |
| `video.publish` | **Direct Post** to timeline | `/v2/post/publish/video/init/` |

chinaPTE target: **`user.info.basic,video.publish`** (and optionally `video.upload` as safer draft path while unaudited).

**Audit note:** Unaudited clients can only post with restricted visibility (`SELF_ONLY` / private). Public timeline needs TikTok app audit after a working integration. Until then use `--privacy SELF_ONLY` or inbox mode.

### 1.3 Redirect URI (canonical)

**Use (register exactly):**

```
https://chinapte.net/oauth/tiktok-callback.html
```

Static page lives in repo: `oauth/tiktok-callback.html` (shows `code` for agent exchange).

**Do not use** bare `http://localhost…` as TikTok Login Kit Web rejects non-HTTPS / localhost for production redirect registration. If box-only testing is needed, use a stable HTTPS tunnel and register that URI — prefer chinapte.net for permanence.

Also register the same URI under **Login Kit → Redirect domain / Redirect URI** fields in the portal (exact string match required on authorize + token exchange).

### 1.4 Client credentials

After create, copy:
- `client_key`
- `client_secret`

Store only under:

```
/home/box/secrets/tiktok/.env
```

Template: `growth/tiktok-api/.env.example`  
Mode `0600`. **Never** commit to git / PR / chat logs.

---

## 2. One-time OAuth authorize @chinapte

### 2.1 Authorize URL

```
https://www.tiktok.com/v2/auth/authorize/?client_key=CLIENT_KEY&response_type=code&scope=user.info.basic,video.publish,video.upload&redirect_uri=https%3A%2F%2Fchinapte.net%2Foauth%2Ftiktok-callback.html&state=chinapte-ONCE
```

User must be logged into TikTok as **@chinapte**, review scopes, Allow.

### 2.2 Capture code → exchange token

Callback lands on chinapte.net page → copy `code`.

Exchange (agent, server-side):

```bash
curl -sS -X POST 'https://open.tiktokapis.com/v2/oauth/token/' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Cache-Control: no-cache' \
  --data-urlencode 'client_key=…' \
  --data-urlencode 'client_secret=…' \
  --data-urlencode 'code=…' \
  --data-urlencode 'grant_type=authorization_code' \
  --data-urlencode 'redirect_uri=https://chinapte.net/oauth/tiktok-callback.html'
```

Persist response fields:

| Field | TTL |
|-------|-----|
| `access_token` | ~24h |
| `refresh_token` | ~365d (may rotate on refresh — always save new value) |
| `open_id` | stable user id |
| `scope` | granted list |

Write to `/home/box/secrets/tiktok/tokens.json` (script does this) + keep secrets in `.env`.

### 2.3 Refresh (agent, no human)

```bash
node growth/tiktok-api/publish.mjs --refresh-only
# or dry-run:
node growth/tiktok-api/publish.mjs --refresh-only --dry-run
```

Endpoint: same `POST /v2/oauth/token/` with `grant_type=refresh_token`.

---

## 3. Publish endpoints (cheat sheet)

Base: `https://open.tiktokapis.com`

| Action | Method | Path | Scope |
|--------|--------|------|-------|
| Creator info | POST | `/v2/post/publish/creator_info/query/` | `video.publish` |
| Direct Post init | POST | `/v2/post/publish/video/init/` | `video.publish` |
| Inbox upload init | POST | `/v2/post/publish/inbox/video/init/` | `video.upload` |
| Binary upload | PUT | `upload_url` from init | — |
| Status | POST | `/v2/post/publish/status/fetch/` | same |

**FILE_UPLOAD** (preferred for local Remotion exports):

1. Init with `source_info.source=FILE_UPLOAD`, `video_size`, `chunk_size`, `total_chunk_count`
2. PUT bytes to `upload_url` with `Content-Type: video/mp4` and `Content-Range`
3. Poll status with `publish_id`

**PULL_FROM_URL** requires domain ownership verification on chinapte.net (meta/DNS) — optional later; local FILE_UPLOAD avoids that for day-1.

Rate: ~6 init requests / user access_token / minute.

---

## 4. Token storage paths (box)

```
/home/box/secrets/tiktok/          # chmod 700
  .env                             # CLIENT_KEY, CLIENT_SECRET, optional tokens
  tokens.json                      # access/refresh/open_id (0600) — written by script
```

Repo paths (safe to commit):

```
growth/tiktok-api/
  publish.mjs
  .gitignore          # ignores .env, tokens.json, *.secret
  .env.example
growth/tiktok-api-playbook.md
oauth/tiktok-callback.html
```

Root `.gitignore` also ignores `_build/`; secrets live **outside** the git worktree.

---

## 5. Publish script outline

```bash
cd /workspace/chinaPTE-deploy

# Validate only (no network mutate)
node growth/tiktok-api/publish.mjs --dry-run \
  --video growth/tiktok-out/tt-nz-induction-v2-audio-2026-09-17.mp4 \
  --caption "NZ 工地 induction 全听不懂？先抓这 5 个安全词 👷 …"

# After tokens exist — unaudited → SELF_ONLY
node growth/tiktok-api/publish.mjs \
  --video growth/tiktok-out/tt-nz-induction-v2-audio-2026-09-17.mp4 \
  --caption "…" \
  --privacy SELF_ONLY \
  --mode direct
```

Inbox draft alternative while waiting for Direct Post / audit:

```bash
node growth/tiktok-api/publish.mjs --mode inbox --video … --caption "…"
```

Then creator finishes in TikTok mobile inbox (still better than full browser login for upload).

---

## 6. Session hygiene (browser fallback)

If API is unavailable (scope pending, audit, outage):

1. Use **only** `/home/box/tiktok-chrome-profile` — never default Chrome / shared agent profiles.
2. Do not clear that profile casually; do not log into personal TikTok accounts there.
3. Prefer mobile App handoff package (`*-PACKAGE.md`) over fragile web upload when session dies.
4. After API works: stop browser publish except emergency.

---

## 7. Next video ready

```
growth/tiktok-out/tt-nz-induction-v2-audio-2026-09-17.mp4
```

Caption / UTM: see `growth/tiktok-out/tt-nz-induction-v2-PACKAGE.md`.  
Do **not** publish the silent `tt-nz-induction-v2-2026-09-17.mp4`.

---

## 8. Exact clicks (parent → user once)

Hand these to Roc Lin / operator. Parent runs computerUse + box_help; user completes login/consent.

### A. Developer portal — create app

1. Browser → **https://developers.tiktok.com/**
2. Click **Log in** (top right) → complete TikTok / developer login (user).
3. Click **Manage apps** (or avatar menu → Manage apps).
4. Click **Create an app** / **Connect an app**.
5. Fill **App name**: `chinaPTE Publisher`.
6. Fill description: `Publish educational PTE / NZ workplace English videos for @chinapte`.
7. Accept ToS → **Create**.
8. Open the new app → **Add products**:
   - Toggle / add **Login Kit**
   - Toggle / add **Content Posting API**
9. Login Kit config:
   - Platforms: enable **Web**
   - **Redirect URI**: paste `https://chinapte.net/oauth/tiktok-callback.html`
   - Save.
10. Content Posting API config:
    - Enable **Direct Post**
    - Request scopes **`video.publish`** and **`video.upload`**
    - Submit for review if portal requires (may stay sandbox/unaudited first).
11. **App details** / Credentials → copy **Client key** + **Client secret** → paste into box `/home/box/secrets/tiktok/.env` via agent (user never pastes into git).

### B. Authorize @chinapte (OAuth)

1. Ensure callback page is live: open `https://chinapte.net/oauth/tiktok-callback.html` (after this PR deploys to Pages / hosting). Until live, deploy/push site first.
2. Agent builds authorize URL with real `client_key`.
3. User opens URL in browser where they can log in as **@chinapte**.
4. If prompted, switch account to **@chinapte** (not personal).
5. Review scopes → click **Authorize** / **Allow**.
6. Land on chinapte.net callback → page shows **code**.
7. User / parent copies `code` to agent chat **once**.
8. Agent exchanges code → writes `/home/box/secrets/tiktok/tokens.json`.
9. Agent runs `publish.mjs --dry-run` then first real publish (`SELF_ONLY` until audited).

### C. Done criteria

- [ ] `tokens.json` has `access_token` + `refresh_token` + `open_id`
- [ ] `--dry-run` exits 0 with video path
- [ ] Browser profile demoted to fallback in routine
- [ ] First API publish logged in `tiktok-posted-log.md`

---

## 9. Blockers (human once)

1. **Login to developers.tiktok.com** (credentials / 2FA).
2. **Create or select app** + add Login Kit + Content Posting API + Direct Post.
3. **Register redirect URI** `https://chinapte.net/oauth/tiktok-callback.html` (requires site deploy of `oauth/tiktok-callback.html`).
4. **Scope approval** for `video.publish` / `video.upload` (portal may delay).
5. **Authorize as @chinapte** and hand `code` to agent once.
6. Optional later: **App audit** for public `PUBLIC_TO_EVERYONE` posts.
7. Optional: domain verify chinapte.net if switching to `PULL_FROM_URL`.

Until 1–5 complete, do **not** expect API publish; use mobile App / browser fallback.

---

*Version: 2026-09-17 · API primary · browser secondary · secrets outside git*
