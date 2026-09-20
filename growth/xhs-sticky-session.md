# 小红书 Sticky Session Plan · chinaPTE

Dedicated Chrome profile for Xiaohongshu (XHS / 小红书) creator ops.  
**Never mix** with TikTok or the shared general profile.

---

## Memory one-liner (routines)

> **All XHS computerUse must pass `user-data-dir=/home/box/xhs-chrome-profile`.**

Do not use `tiktok-chrome-profile`, `chrome-profile-4`, or `chrome-profile` for XHS.

---

## Profile map

| Profile path | Purpose | Mix with XHS? |
|--------------|---------|---------------|
| `/home/box/xhs-chrome-profile` | **XHS only** (creator.rednote.com / xiaohongshu) | — |
| `/home/box/tiktok-chrome-profile` | TikTok only | **Never** |
| `/home/box/chrome-profile-4` | Shared / legacy (may hold old XHS cookies) | **Do not launch XHS here**; clone cookies out when safe, then stay on xhs profile |
| `/home/box/chrome-profile` | Other / default | **Never** for XHS |

---

## Sticky rules

1. **Dedicated profile only**  
   Launch Chrome for XHS with:
   ```bash
   --user-data-dir=/home/box/xhs-chrome-profile
   ```
   computerUse / agent browser for XHS must use the same path every time.

2. **After each successful login**  
   Keep using `/home/box/xhs-chrome-profile`. Do not rotate profiles, do not “fresh” wipe, do not copy session into TikTok or chrome-profile-4.

3. **Weekly soft keepalive**  
   About once per week, open `https://creator.rednote.com` (or creator center equivalent) in the XHS profile, confirm still logged in, then close. Soft only — no mass actions.

4. **If kicked / session expired**  
   One **human** SMS login into **`/home/box/xhs-chrome-profile` only**.  
   Do not SMS-login into tiktok-chrome-profile or chrome-profile-4 for XHS.  
   After login succeeds, resume sticky use of the XHS profile.

---

## Bootstrap / clone status (2026-09-20 Asia/Shanghai)

| Item | Status |
|------|--------|
| Target dir `/home/box/xhs-chrome-profile` | **Created empty** |
| `cp -a` from logged-in profile | **Skipped — unsafe** |
| Reason | Chrome was open with SingletonLock on `chrome-profile-4` and `tiktok-chrome-profile`; Cookies DBs locked. Prefer **not** clobbering tiktok profile. |
| Parent follow-up | When Chrome is **fully closed** on `chrome-profile-4`, clone cookies/session from `chrome-profile-4/Default` into `xhs-chrome-profile/Default` (or full `cp -a` of user-data into the empty xhs dir), then **one human re-login / SMS** into `/home/box/xhs-chrome-profile` if clone alone is not enough. |

### Safe clone procedure (parent, Chrome closed)

```bash
# Only when NO Chrome process holds chrome-profile-4 SingletonLock
# Prefer not touching tiktok-chrome-profile at all
cp -a /home/box/chrome-profile-4/. /home/box/xhs-chrome-profile/
# Then launch ONLY with --user-data-dir=/home/box/xhs-chrome-profile
# Verify creator.rednote.com; if kicked → human SMS into THIS profile only
```

If a full copy feels too heavy, copy at least `Default/Cookies`, `Default/Network/Cookies` (if present), and related Local Storage / Session Storage for `*.xiaohongshu.com` / `*.rednote.com` into the XHS profile Default, then verify login.

---

## Agent checklist (every XHS computerUse)

- [ ] `user-data-dir=/home/box/xhs-chrome-profile`
- [ ] Not using tiktok-chrome-profile or chrome-profile-4 for XHS tabs
- [ ] Soft keepalive weekly via creator.rednote.com
- [ ] Kick → human SMS into xhs-chrome-profile only

---

## Related docs

- `growth/xhs-playbook.md` — cadence / creative
- `growth/xhs-fuqing-playbook.md` — 福清向内容
- `growth/xhs-posted-log.md` / `growth/xhs-comment-log.md` — publish & comment logs
