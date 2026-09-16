# chinaPTE 妈祖祈福 Worker

Stores site-member accounts (password **SHA-256 hash only**) and shared 祈福留言 in Cloudflare KV.
Zero paid services — free Worker + free KV tier is enough.

## One-time setup (Cloudflare dashboard / CLI)

1. Install wrangler: `npm i -g wrangler` (or use `npx wrangler`)
2. Login: `npx wrangler login`
3. Create KV namespace:
   ```bash
   npx wrangler kv namespace create CHINAPTE_MAZU
   npx wrangler kv namespace create CHINAPTE_MAZU --preview
   ```
   Paste the ids into `wrangler.toml`.
4. Deploy:
   ```bash
   npx wrangler deploy
   ```
5. Attach route on zone `chinapte.net`:
   - Route: `chinapte.net/api/mazu*`
   - Worker: `chinapte-mazu`
   - Or use Workers Custom Domain / proxied DNS so `https://chinapte.net/api/mazu/*` hits this Worker.
   - Ensure GitHub Pages origin does **not** catch `/api/*` (Cloudflare Worker route takes priority when configured).

Front-end endpoint (see `mazu-config.js`): `https://chinapte.net/api/mazu`

## API

| Method | Path | Body / notes |
|--------|------|----------------|
| `POST` | `/api/mazu/register` | `{ "nickname", "passwordHash", "note?" }` |
| `POST` | `/api/mazu/login` | `{ "nickname", "passwordHash" }` → `{ token, nickname }` |
| `POST` | `/api/mazu/logout` | `{ "token" }` (optional cleanup) |
| `GET`  | `/api/mazu/blessings` | Recent blessings (public read) |
| `POST` | `/api/mazu/blessings` | `{ "token", "text" }` — requires login; ~1 post / hour / user |

No secrets in public HTML. Passwords never sent in plaintext from the client (SHA-256 hex only).

## Until Worker is live

`mazu.html` still supports local register / login / 「本机留言」 via localStorage, and seeds the wall from `content/mazu-blessings.json`. Shared cross-user wall needs the route above.
