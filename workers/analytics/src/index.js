/**
 * chinaPTE Analytics Worker
 * POST /api/analytics  — ingest events (public)
 * GET  /api/analytics?summary=1  — aggregate (requires X-Admin-Key)
 * GET  /api/analytics?csv=1&kind=raw|daily — CSV download (requires X-Admin-Key)
 *
 * KV keys:
 *   evt:{yyyy-mm-dd}:{uuid} → JSON event
 *   day:{yyyy-mm-dd} → JSON { pv, sessions:{}, pages:{}, features:{}, playModes:{} }
 */
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Admin-Key",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...CORS },
  });
}

function dayKey(ts) {
  try {
    return new Date(ts || Date.now()).toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

function unauthorized() {
  return json({ error: "unauthorized" }, 401);
}

function checkAdmin(req, env) {
  const key = req.headers.get("X-Admin-Key") || "";
  const expect = env.ADMIN_KEY || "";
  return expect && key && key === expect;
}

async function ingest(req, env) {
  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid json" }, 400);
  }
  const events = Array.isArray(body)
    ? body
    : Array.isArray(body.events)
      ? body.events
      : body.type
        ? [body]
        : [];
  if (!events.length) return json({ ok: true, stored: 0 });

  let stored = 0;
  for (const ev of events.slice(0, 200)) {
    if (!ev || typeof ev !== "object") continue;
    const day = dayKey(ev.ts);
    const id = crypto.randomUUID();
    const key = `evt:${day}:${id}`;
    const record = { ...ev, _id: id, _day: day, _ingestedAt: new Date().toISOString() };
    await env.ANALYTICS_KV.put(key, JSON.stringify(record), {
      expirationTtl: 60 * 60 * 24 * 120, // ~120 days
    });

    const dKey = `day:${day}`;
    let agg = { pv: 0, sessions: {}, pages: {}, features: {}, playModes: { prompt: 0, walkman: 0 }, leaveDwells: [] };
    try {
      const raw = await env.ANALYTICS_KV.get(dKey);
      if (raw) agg = { ...agg, ...JSON.parse(raw) };
    } catch {}
    if (!agg.sessions) agg.sessions = {};
    if (!agg.pages) agg.pages = {};
    if (!agg.features) agg.features = {};
    if (!agg.playModes) agg.playModes = { prompt: 0, walkman: 0 };
    if (!agg.leaveDwells) agg.leaveDwells = [];

    if (ev.sessionId) agg.sessions[ev.sessionId] = true;
    if (ev.type === "page_view") {
      agg.pv = (agg.pv || 0) + 1;
      if (ev.path) agg.pages[ev.path] = (agg.pages[ev.path] || 0) + 1;
    }
    if (ev.type === "feature_use" && ev.feature) {
      agg.features[ev.feature] = (agg.features[ev.feature] || 0) + 1;
    }
    if (ev.playMode === "prompt" || ev.playMode === "walkman") {
      if (ev.type === "play_start" || ev.feature === "play_mode") {
        agg.playModes[ev.playMode] = (agg.playModes[ev.playMode] || 0) + 1;
      }
    }
    if (ev.type === "page_leave" && typeof ev.dwellMs === "number") {
      agg.leaveDwells.push(ev.dwellMs);
      if (agg.leaveDwells.length > 500) agg.leaveDwells = agg.leaveDwells.slice(-500);
    }
    await env.ANALYTICS_KV.put(dKey, JSON.stringify(agg), {
      expirationTtl: 60 * 60 * 24 * 180,
    });
    stored++;
  }
  return json({ ok: true, stored });
}

async function listDayKeys(env, days) {
  const out = [];
  const now = Date.now();
  for (let i = 0; i < days; i++) {
    const d = new Date(now - i * 86400000).toISOString().slice(0, 10);
    out.push(`day:${d}`);
  }
  return out;
}

async function summary(env, days = 30) {
  const keys = await listDayKeys(env, days);
  const totals = {
    pv: 0,
    uv: 0,
    avgDwellMs: 0,
    topPages: {},
    topFeatures: {},
    playModes: { prompt: 0, walkman: 0 },
    daily: [],
  };
  const sessionSet = {};
  const dwells = [];

  for (const k of keys) {
    const raw = await env.ANALYTICS_KV.get(k);
    if (!raw) continue;
    let agg;
    try {
      agg = JSON.parse(raw);
    } catch {
      continue;
    }
    const day = k.replace(/^day:/, "");
    const uvDay = Object.keys(agg.sessions || {}).length;
    totals.pv += agg.pv || 0;
    Object.assign(sessionSet, agg.sessions || {});
    for (const [p, n] of Object.entries(agg.pages || {})) {
      totals.topPages[p] = (totals.topPages[p] || 0) + n;
    }
    for (const [f, n] of Object.entries(agg.features || {})) {
      totals.topFeatures[f] = (totals.topFeatures[f] || 0) + n;
    }
    totals.playModes.prompt += (agg.playModes && agg.playModes.prompt) || 0;
    totals.playModes.walkman += (agg.playModes && agg.playModes.walkman) || 0;
    if (Array.isArray(agg.leaveDwells)) dwells.push(...agg.leaveDwells);
    totals.daily.push({ day, pv: agg.pv || 0, uv: uvDay });
  }
  totals.uv = Object.keys(sessionSet).length;
  totals.avgDwellMs = dwells.length
    ? Math.round(dwells.reduce((a, b) => a + b, 0) / dwells.length)
    : 0;
  totals.daily.sort((a, b) => (a.day < b.day ? 1 : -1));
  totals.source = "worker";
  totals.days = days;
  return totals;
}

function toCsv(rows) {
  if (!rows.length) return "empty\n";
  const keys = Object.keys(rows[0]);
  const esc = (v) => {
    const s = v == null ? "" : String(v);
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  return [keys.join(","), ...rows.map((r) => keys.map((k) => esc(r[k])).join(","))].join("\n") + "\n";
}

async function csvExport(env, kind) {
  if (kind === "daily") {
    const s = await summary(env, 90);
    return toCsv(
      s.daily.map((d) => ({
        day: d.day,
        pv: d.pv,
        uv: d.uv,
      }))
    );
  }
  // raw: list recent event keys via day prefix scan (limited)
  const rows = [];
  const now = Date.now();
  for (let i = 0; i < 14 && rows.length < 2000; i++) {
    const day = new Date(now - i * 86400000).toISOString().slice(0, 10);
    let cursor;
    do {
      const listed = await env.ANALYTICS_KV.list({
        prefix: `evt:${day}:`,
        cursor,
        limit: 100,
      });
      for (const key of listed.keys) {
        const raw = await env.ANALYTICS_KV.get(key.name);
        if (!raw) continue;
        try {
          const ev = JSON.parse(raw);
          rows.push({
            ts: ev.ts || "",
            type: ev.type || "",
            path: ev.path || "",
            sessionId: ev.sessionId || "",
            feature: ev.feature || "",
            playMode: ev.playMode || "",
            dwellMs: ev.dwellMs ?? "",
            screenWidth: ev.screenWidth ?? "",
            referrer: ev.referrer || "",
          });
        } catch {}
        if (rows.length >= 2000) break;
      }
      cursor = listed.list_complete ? undefined : listed.cursor;
    } while (cursor && rows.length < 2000);
  }
  return toCsv(rows);
}

export default {
  async fetch(req, env) {
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS });
    }
    const url = new URL(req.url);

    if (req.method === "POST") {
      return ingest(req, env);
    }

    if (req.method === "GET") {
      if (!checkAdmin(req, env)) return unauthorized();
      if (url.searchParams.get("summary") === "1") {
        const days = Math.min(90, Math.max(1, parseInt(url.searchParams.get("days") || "30", 10) || 30));
        return json(await summary(env, days));
      }
      if (url.searchParams.get("csv") === "1") {
        const kind = url.searchParams.get("kind") || "raw";
        const body = await csvExport(env, kind);
        return new Response(body, {
          status: 200,
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="chinapte-analytics-${kind}.csv"`,
            ...CORS,
          },
        });
      }
      return json({ ok: true, service: "chinapte-analytics" });
    }

    return json({ error: "method not allowed" }, 405);
  },
};
