#!/usr/bin/env node
/**
 * chinaPTE TikTok Content Posting API — publish stub
 *
 * Primary publish path for @chinapte. Browser profile is fallback only.
 *
 * Secrets (NEVER commit):
 *   /home/box/secrets/tiktok/.env
 *   or env vars TIKTOK_*
 *
 * Usage:
 *   node growth/tiktok-api/publish.mjs --dry-run \
 *     --video growth/tiktok-out/tt-nz-induction-v2-audio-2026-09-17.mp4 \
 *     --caption "NZ 工地 induction…"
 *
 *   node growth/tiktok-api/publish.mjs --video PATH --caption "..." [--privacy SELF_ONLY]
 *
 * Docs: growth/tiktok-api-playbook.md
 * API:  https://developers.tiktok.com/doc/content-posting-api-get-started
 */

import { readFileSync, existsSync, writeFileSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SECRETS_DIR = process.env.TIKTOK_SECRETS_DIR || '/home/box/secrets/tiktok';
const SECRETS_ENV = `${SECRETS_DIR}/.env`;
const TOKENS_JSON = `${SECRETS_DIR}/tokens.json`;

const API = {
  token: 'https://open.tiktokapis.com/v2/oauth/token/',
  creatorInfo: 'https://open.tiktokapis.com/v2/post/publish/creator_info/query/',
  videoInit: 'https://open.tiktokapis.com/v2/post/publish/video/init/',
  status: 'https://open.tiktokapis.com/v2/post/publish/status/fetch/',
  // Inbox/upload (draft) — scope video.upload
  inboxInit: 'https://open.tiktokapis.com/v2/post/publish/inbox/video/init/',
};

function parseArgs(argv) {
  const out = {
    dryRun: false,
    video: null,
    caption: '',
    privacy: 'SELF_ONLY', // unaudited apps must use private/self
    coverMs: 1000,
    mode: 'direct', // direct | inbox
    refreshOnly: false,
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--dry-run') out.dryRun = true;
    else if (a === '--refresh-only') out.refreshOnly = true;
    else if (a === '--video') out.video = argv[++i];
    else if (a === '--caption') out.caption = argv[++i];
    else if (a === '--privacy') out.privacy = argv[++i];
    else if (a === '--cover-ms') out.coverMs = Number(argv[++i]);
    else if (a === '--mode') out.mode = argv[++i];
    else if (a === '--help' || a === '-h') out.help = true;
  }
  return out;
}

function loadEnvFile(path) {
  if (!existsSync(path)) return {};
  const env = {};
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i < 0) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    env[k] = v;
  }
  return env;
}

function loadConfig() {
  const fileEnv = { ...loadEnvFile(SECRETS_ENV), ...loadEnvFile(resolve(__dirname, '.env')) };
  const tokensFile = existsSync(TOKENS_JSON)
    ? JSON.parse(readFileSync(TOKENS_JSON, 'utf8'))
    : {};
  return {
    clientKey: process.env.TIKTOK_CLIENT_KEY || fileEnv.TIKTOK_CLIENT_KEY || tokensFile.client_key,
    clientSecret: process.env.TIKTOK_CLIENT_SECRET || fileEnv.TIKTOK_CLIENT_SECRET || tokensFile.client_secret,
    accessToken: process.env.TIKTOK_ACCESS_TOKEN || fileEnv.TIKTOK_ACCESS_TOKEN || tokensFile.access_token,
    refreshToken: process.env.TIKTOK_REFRESH_TOKEN || fileEnv.TIKTOK_REFRESH_TOKEN || tokensFile.refresh_token,
    openId: process.env.TIKTOK_OPEN_ID || fileEnv.TIKTOK_OPEN_ID || tokensFile.open_id,
    redirectUri:
      process.env.TIKTOK_REDIRECT_URI ||
      fileEnv.TIKTOK_REDIRECT_URI ||
      'https://chinapte.net/oauth/tiktok-callback.html',
  };
}

function persistTokens(cfg, tokenResp) {
  const next = {
    client_key: cfg.clientKey,
    // never write client_secret into tokens.json — keep in .env only
    open_id: tokenResp.open_id || cfg.openId,
    access_token: tokenResp.access_token,
    refresh_token: tokenResp.refresh_token || cfg.refreshToken,
    scope: tokenResp.scope,
    expires_in: tokenResp.expires_in,
    refresh_expires_in: tokenResp.refresh_expires_in,
    updated_at: new Date().toISOString(),
  };
  writeFileSync(TOKENS_JSON, JSON.stringify(next, null, 2) + '\n', { mode: 0o600 });
  console.log(`[ok] wrote ${TOKENS_JSON}`);
  return next;
}

async function refreshAccessToken(cfg) {
  if (!cfg.clientKey || !cfg.clientSecret || !cfg.refreshToken) {
    throw new Error('Need TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET, TIKTOK_REFRESH_TOKEN to refresh');
  }
  const body = new URLSearchParams({
    client_key: cfg.clientKey,
    client_secret: cfg.clientSecret,
    grant_type: 'refresh_token',
    refresh_token: cfg.refreshToken,
  });
  const res = await fetch(API.token, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Cache-Control': 'no-cache' },
    body,
  });
  const json = await res.json();
  if (json.error || !json.access_token) {
    throw new Error(`token refresh failed: ${JSON.stringify(json)}`);
  }
  persistTokens(cfg, json);
  cfg.accessToken = json.access_token;
  if (json.refresh_token) cfg.refreshToken = json.refresh_token;
  if (json.open_id) cfg.openId = json.open_id;
  return json;
}

async function apiJson(url, { token, body }) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(body ?? {}),
  });
  const json = await res.json();
  return { status: res.status, json };
}

function help() {
  console.log(`chinaPTE TikTok Content Posting API publish stub

  --dry-run          Print plan + validate secrets/video; no network mutate
  --refresh-only     Refresh access_token via refresh_token and exit
  --video PATH       Local MP4 (FILE_UPLOAD)
  --caption TEXT     post_info.title (max ~2200 UTF-16)
  --privacy LEVEL    PUBLIC_TO_EVERYONE | MUTUAL_FOLLOW_FRIENDS |
                     FOLLOWER_OF_CREATOR | SELF_ONLY (default SELF_ONLY)
  --mode direct|inbox  Direct Post (video.publish) or inbox draft (video.upload)
  --cover-ms N       Cover frame timestamp

Secrets: ${SECRETS_ENV} or ${TOKENS_JSON}
Redirect URI: https://chinapte.net/oauth/tiktok-callback.html
`);
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    help();
    process.exit(0);
  }

  const cfg = loadConfig();
  const videoPath = args.video ? resolve(process.cwd(), args.video) : null;

  console.log('=== chinaPTE TikTok publish ===');
  console.log(`dry-run: ${args.dryRun}`);
  console.log(`mode: ${args.mode}`);
  console.log(`privacy: ${args.privacy}`);
  console.log(`secrets dir: ${SECRETS_DIR}`);
  console.log(`client_key set: ${Boolean(cfg.clientKey)}`);
  console.log(`client_secret set: ${Boolean(cfg.clientSecret)}`);
  console.log(`access_token set: ${Boolean(cfg.accessToken)}`);
  console.log(`refresh_token set: ${Boolean(cfg.refreshToken)}`);
  console.log(`open_id: ${cfg.openId || '(none)'}`);
  console.log(`redirect_uri: ${cfg.redirectUri}`);
  if (videoPath) {
    console.log(`video: ${videoPath}`);
    console.log(`video exists: ${existsSync(videoPath)}`);
    if (existsSync(videoPath)) {
      const st = statSync(videoPath);
      console.log(`video_size: ${st.size} bytes`);
    }
  }
  if (args.caption) console.log(`caption: ${args.caption.slice(0, 80)}${args.caption.length > 80 ? '…' : ''}`);

  if (args.refreshOnly) {
    if (args.dryRun) {
      console.log('[dry-run] would POST refresh_token →', API.token);
      process.exit(0);
    }
    await refreshAccessToken(cfg);
    console.log('[ok] access_token refreshed');
    process.exit(0);
  }

  if (!args.video) {
    console.error('Missing --video PATH (or use --refresh-only / --help)');
    process.exit(1);
  }
  if (!existsSync(videoPath)) {
    console.error(`Video not found: ${videoPath}`);
    process.exit(1);
  }

  const videoSize = statSync(videoPath).size;
  const chunkSize = videoSize; // single-chunk for typical short-form < ~64MB
  const totalChunkCount = 1;

  const initBody =
    args.mode === 'inbox'
      ? {
          source_info: {
            source: 'FILE_UPLOAD',
            video_size: videoSize,
            chunk_size: chunkSize,
            total_chunk_count: totalChunkCount,
          },
        }
      : {
          post_info: {
            title: args.caption || '',
            privacy_level: args.privacy,
            disable_duet: false,
            disable_comment: false,
            disable_stitch: false,
            video_cover_timestamp_ms: args.coverMs,
            brand_content_toggle: false,
            brand_organic_toggle: false,
          },
          source_info: {
            source: 'FILE_UPLOAD',
            video_size: videoSize,
            chunk_size: chunkSize,
            total_chunk_count: totalChunkCount,
          },
        };

  const initUrl = args.mode === 'inbox' ? API.inboxInit : API.videoInit;

  if (args.dryRun) {
    console.log('\n[dry-run] planned steps:');
    console.log('1. (optional) refresh access_token if near expiry');
    console.log('2. POST', API.creatorInfo, '(direct mode only)');
    console.log('3. POST', initUrl);
    console.log('   body:', JSON.stringify(initBody, null, 2));
    console.log('4. PUT upload_url with Content-Type video/mp4 + Content-Range');
    console.log('5. POST', API.status, 'with publish_id until PUBLISH_COMPLETE / FAILED');
    console.log('\n[dry-run] no network writes performed.');
    if (!cfg.accessToken && !cfg.refreshToken) {
      console.log('\nBLOCKER: no tokens yet. Complete one-time OAuth (see tiktok-api-playbook.md).');
      process.exit(2);
    }
    process.exit(0);
  }

  if (!cfg.accessToken) {
    if (cfg.refreshToken) {
      await refreshAccessToken(cfg);
    } else {
      console.error('No access_token / refresh_token. Run OAuth first.');
      process.exit(1);
    }
  }

  // Creator info (required UX for direct post)
  if (args.mode === 'direct') {
    const info = await apiJson(API.creatorInfo, { token: cfg.accessToken, body: {} });
    console.log('creator_info:', JSON.stringify(info.json, null, 2));
    if (info.json?.error?.code && info.json.error.code !== 'ok') {
      console.error('creator_info failed');
      process.exit(1);
    }
    const opts = info.json?.data?.privacy_level_options || [];
    if (opts.length && !opts.includes(args.privacy)) {
      console.error(`privacy ${args.privacy} not in creator options: ${opts.join(', ')}`);
      process.exit(1);
    }
  }

  const init = await apiJson(initUrl, { token: cfg.accessToken, body: initBody });
  console.log('init:', JSON.stringify(init.json, null, 2));
  if (init.json?.error?.code && init.json.error.code !== 'ok') {
    console.error('init failed');
    process.exit(1);
  }

  const publishId = init.json?.data?.publish_id;
  const uploadUrl = init.json?.data?.upload_url;
  if (!uploadUrl) {
    console.error('No upload_url in init response');
    process.exit(1);
  }

  const buf = readFileSync(videoPath);
  const put = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'video/mp4',
      'Content-Length': String(buf.length),
      'Content-Range': `bytes 0-${buf.length - 1}/${buf.length}`,
    },
    body: buf,
  });
  console.log(`upload HTTP ${put.status}`);
  if (!put.ok) {
    console.error(await put.text());
    process.exit(1);
  }

  // Poll status a few times
  for (let i = 0; i < 12; i++) {
    await new Promise((r) => setTimeout(r, 3000));
    const st = await apiJson(API.status, {
      token: cfg.accessToken,
      body: { publish_id: publishId },
    });
    const status = st.json?.data?.status;
    console.log(`status[${i}]:`, status || JSON.stringify(st.json));
    if (status === 'PUBLISH_COMPLETE' || status === 'FAILED') break;
  }

  console.log('[ok] publish flow finished. publish_id=', publishId);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
