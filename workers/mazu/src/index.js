/**
 * chinaPTE Mazu (妈祖祈福) Worker
 * POST /api/mazu/register
 * POST /api/mazu/login
 * POST /api/mazu/logout
 * GET  /api/mazu/blessings
 * POST /api/mazu/blessings
 *
 * KV keys:
 *   user:{nickLower} → { nickname, passwordHash, note, createdAt, lastPostAt }
 *   session:{token} → { nickname, createdAt }  (TTL ~30d)
 *   blessing:{id} → { id, nickname, text, createdAt }
 *   blessings:index → JSON string[] of ids (newest first, capped)
 */
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const MAX_BLESSING_LEN = 160;
const MIN_PASSWORD_HASH_LEN = 64; // sha-256 hex
const MIN_NICK = 2;
const MAX_NICK = 16;
const RATE_MS = 60 * 60 * 1000; // 1 hour
const SESSION_TTL = 60 * 60 * 24 * 30;
const INDEX_CAP = 200;
const BLESSING_TTL = 60 * 60 * 24 * 365; // ~1 year

const BANNED = [
  "代考", "替考", "作弊", "泄题", "赌球", "博彩", "色情", "约炮", "操你", "傻逼",
  "fuck", "shit", "casino", "porn", "http://", "https://", "www.",
];

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...CORS },
  });
}

function normalizeNick(raw) {
  return String(raw || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, MAX_NICK);
}

function nickKey(nick) {
  return "user:" + nick.toLowerCase();
}

function isValidNick(nick) {
  if (!nick || nick.length < MIN_NICK || nick.length > MAX_NICK) return false;
  // letters, numbers, CJK, underscore, hyphen, middle dot
  return /^[\u4e00-\u9fff\u3400-\u4dbfa-zA-Z0-9_\-·．.]+$/.test(nick);
}

function isValidHash(h) {
  return typeof h === "string" && /^[a-f0-9]{64}$/i.test(h);
}

function bannedHit(text) {
  const lower = String(text || "").toLowerCase();
  for (const w of BANNED) {
    if (lower.includes(w.toLowerCase())) return true;
  }
  // repeated same char spam
  if (/(.)\1{8,}/.test(text)) return true;
  return false;
}

function spammy(text) {
  const t = String(text || "").trim();
  if (!t) return true;
  if (t.length < 2) return true;
  const unique = new Set(t.replace(/\s/g, "")).size;
  if (t.length >= 8 && unique <= 2) return true;
  return false;
}

async function readJson(req) {
  try {
    return await req.json();
  } catch {
    return null;
  }
}

async function getIndex(env) {
  try {
    const raw = await env.MAZU_KV.get("blessings:index");
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

async function putIndex(env, ids) {
  if (ids.length > INDEX_CAP) ids = ids.slice(0, INDEX_CAP);
  await env.MAZU_KV.put("blessings:index", JSON.stringify(ids));
}

async function register(req, env) {
  const body = await readJson(req);
  if (!body) return json({ error: "invalid json" }, 400);
  const nickname = normalizeNick(body.nickname);
  const passwordHash = String(body.passwordHash || "").toLowerCase();
  const note = String(body.note || "").trim().slice(0, 80);

  if (!isValidNick(nickname)) {
    return json({ error: "昵称需 2–16 字，可用中文/字母/数字" }, 400);
  }
  if (!isValidHash(passwordHash)) {
    return json({ error: "密码哈希无效" }, 400);
  }
  if (bannedHit(nickname) || bannedHit(note)) {
    return json({ error: "内容不合规，请换个昵称或备注" }, 400);
  }

  const key = nickKey(nickname);
  const existing = await env.MAZU_KV.get(key);
  if (existing) return json({ error: "该昵称已被注册" }, 409);

  const record = {
    nickname,
    passwordHash,
    note,
    createdAt: new Date().toISOString(),
    lastPostAt: 0,
  };
  await env.MAZU_KV.put(key, JSON.stringify(record));
  return json({ ok: true, nickname });
}

async function login(req, env) {
  const body = await readJson(req);
  if (!body) return json({ error: "invalid json" }, 400);
  const nickname = normalizeNick(body.nickname);
  const passwordHash = String(body.passwordHash || "").toLowerCase();
  if (!isValidNick(nickname) || !isValidHash(passwordHash)) {
    return json({ error: "账号或密码不正确" }, 401);
  }
  const raw = await env.MAZU_KV.get(nickKey(nickname));
  if (!raw) return json({ error: "账号或密码不正确" }, 401);
  let user;
  try {
    user = JSON.parse(raw);
  } catch {
    return json({ error: "账号异常" }, 500);
  }
  if (String(user.passwordHash || "").toLowerCase() !== passwordHash) {
    return json({ error: "账号或密码不正确" }, 401);
  }
  const token = crypto.randomUUID();
  await env.MAZU_KV.put(
    "session:" + token,
    JSON.stringify({ nickname: user.nickname, createdAt: new Date().toISOString() }),
    { expirationTtl: SESSION_TTL }
  );
  return json({ ok: true, token, nickname: user.nickname });
}

async function logout(req, env) {
  const body = await readJson(req);
  const token = body && body.token ? String(body.token) : "";
  if (token) {
    await env.MAZU_KV.delete("session:" + token);
  }
  return json({ ok: true });
}

async function sessionUser(env, token) {
  if (!token) return null;
  const raw = await env.MAZU_KV.get("session:" + token);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function listBlessings(env) {
  const ids = await getIndex(env);
  const out = [];
  for (const id of ids.slice(0, 80)) {
    const raw = await env.MAZU_KV.get("blessing:" + id);
    if (!raw) continue;
    try {
      const b = JSON.parse(raw);
      out.push({
        id: b.id,
        nickname: b.nickname,
        text: b.text,
        createdAt: b.createdAt,
        source: "shared",
      });
    } catch {}
  }
  return json({ ok: true, blessings: out, source: "worker" });
}

async function postBlessing(req, env) {
  const body = await readJson(req);
  if (!body) return json({ error: "invalid json" }, 400);
  const token = String(body.token || "");
  const text = String(body.text || "").trim().slice(0, MAX_BLESSING_LEN);
  const sess = await sessionUser(env, token);
  if (!sess || !sess.nickname) return json({ error: "请先登录" }, 401);
  if (spammy(text) || bannedHit(text)) {
    return json({ error: "留言内容不合规或过于空泛，请修改后再试" }, 400);
  }

  const uKey = nickKey(sess.nickname);
  const uRaw = await env.MAZU_KV.get(uKey);
  if (!uRaw) return json({ error: "用户不存在" }, 401);
  let user;
  try {
    user = JSON.parse(uRaw);
  } catch {
    return json({ error: "用户异常" }, 500);
  }
  const now = Date.now();
  if (user.lastPostAt && now - Number(user.lastPostAt) < RATE_MS) {
    const waitMin = Math.ceil((RATE_MS - (now - Number(user.lastPostAt))) / 60000);
    return json({ error: `祈福过于频繁，请约 ${waitMin} 分钟后再试`, retryAfterMin: waitMin }, 429);
  }

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const record = {
    id,
    nickname: user.nickname,
    text,
    createdAt,
  };
  await env.MAZU_KV.put("blessing:" + id, JSON.stringify(record), {
    expirationTtl: BLESSING_TTL,
  });
  const ids = await getIndex(env);
  ids.unshift(id);
  await putIndex(env, ids);

  user.lastPostAt = now;
  await env.MAZU_KV.put(uKey, JSON.stringify(user));

  return json({ ok: true, blessing: { ...record, source: "shared" } });
}

function routePath(url) {
  let p = url.pathname || "/";
  // strip trailing slash (except root)
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p;
}

export default {
  async fetch(req, env) {
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS });
    }
    if (!env.MAZU_KV) {
      return json({ error: "KV not bound" }, 500);
    }

    const url = new URL(req.url);
    const path = routePath(url);

    // Health
    if (req.method === "GET" && (path === "/api/mazu" || path === "/")) {
      return json({ ok: true, service: "chinapte-mazu" });
    }

    if (path === "/api/mazu/register" && req.method === "POST") {
      return register(req, env);
    }
    if (path === "/api/mazu/login" && req.method === "POST") {
      return login(req, env);
    }
    if (path === "/api/mazu/logout" && req.method === "POST") {
      return logout(req, env);
    }
    if (path === "/api/mazu/blessings") {
      if (req.method === "GET") return listBlessings(env);
      if (req.method === "POST") return postBlessing(req, env);
    }

    return json({ error: "not found" }, 404);
  },
};
