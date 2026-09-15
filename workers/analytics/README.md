# chinaPTE Analytics Worker

Stores anonymous usage events in Cloudflare KV for the admin 「数据看板」.

## One-time setup (Cloudflare dashboard / CLI)

1. Install wrangler: `npm i -g wrangler` (or use `npx wrangler`)
2. Login: `npx wrangler login`
3. Create KV namespace:
   ```bash
   npx wrangler kv namespace create CHINAPTE_ANALYTICS
   npx wrangler kv namespace create CHINAPTE_ANALYTICS --preview
   ```
   Paste the ids into `wrangler.toml`.
4. Set admin key secret (same value as `admin/config.js` → `ANALYTICS_ADMIN_KEY`):
   ```bash
   npx wrangler secret put ADMIN_KEY
   ```
5. Deploy:
   ```bash
   npx wrangler deploy
   ```
6. Attach route on zone `chinapte.net`:
   - Route: `chinapte.net/api/analytics*`
   - Worker: `chinapte-analytics`
   - Or use Workers Custom Domain / proxied DNS so `https://chinapte.net/api/analytics` hits this Worker.
   - Ensure GitHub Pages origin does **not** catch `/api/*` (Cloudflare Worker route takes priority when configured).

## API

- `POST /api/analytics` body `{ "events": [ ... ] }`
- `GET /api/analytics?summary=1&days=30` header `X-Admin-Key: …`
- `GET /api/analytics?csv=1&kind=raw|daily` header `X-Admin-Key: …`

Until the Worker is live, the site still buffers events in localStorage and the admin dashboard shows **本机会话** stats.
