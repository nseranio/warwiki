import type { IncomingMessage, ServerResponse } from 'node:http';
import { head, put, BlobNotFoundError } from '@vercel/blob';

// Cross-site progress sync for the Rounds question bank (warwiki.org/rounds and
// whitwiki.org/rounds). No accounts: a reader turns on sync and gets a random
// 12-character code; progress is stored under that code. The data is only
// per-question study state (attempts, last result, next review date, flags).

type SyncRequest = IncomingMessage & { body?: unknown; query?: Record<string, string | string[]> };

const CODE_RE = /^[A-HJ-NP-Z2-9]{12}$/;
const KEY_RE = /^[A-Za-z0-9_-]{1,64}$/;
const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_KEYS = 6000;
const MAX_BODY_CHARS = 900_000;
const WRITE_LIMIT = 120; // per IP per window (soft, per function instance)
const WRITE_WINDOW_MS = 10 * 60 * 1000;

function sendJson(res: ServerResponse, status: number, payload: Record<string, unknown>): void {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function firstHeader(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] || '' : value || '';
}

function allowedHost(host: string, protocol: string): boolean {
  if (host === 'localhost' || host === '127.0.0.1') return true;
  if (protocol !== 'https:') return false;
  if (['warwiki.org', 'www.warwiki.org', 'whitwiki.org', 'www.whitwiki.org'].includes(host)) return true;
  return /^(warwiki|whitwiki)[a-z0-9-]*\.vercel\.app$/.test(host);
}

export function allowedOrigin(req: IncomingMessage): string | null {
  const raw = firstHeader(req.headers?.origin);
  if (!raw) {
    // Browsers leave Origin off same-origin GET requests (the app on warwiki.org reads
    // /api/rounds-sync that way); they mark them with Sec-Fetch-Site instead.
    if (firstHeader(req.headers?.['sec-fetch-site']) !== 'same-origin') return null;
    const host = firstHeader(req.headers?.host).toLowerCase().replace(/:\d+$/, '');
    const local = host === 'localhost' || host === '127.0.0.1';
    return host && allowedHost(host, local ? 'http:' : 'https:') ? `${local ? 'http' : 'https'}://${host}` : null;
  }
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  return allowedHost(url.hostname.toLowerCase(), url.protocol) ? raw : null;
}

const writes = new Map<string, number[]>();
function overWriteLimit(ip: string): boolean {
  const now = Date.now();
  const recent = (writes.get(ip) || []).filter((t) => now - t < WRITE_WINDOW_MS);
  if (recent.length >= WRITE_LIMIT) {
    writes.set(ip, recent);
    return true;
  }
  recent.push(now);
  writes.set(ip, recent);
  return false;
}

const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : undefined);

// Keep only the fields the app writes, so the store cannot be used for anything else.
export function cleanProgress(input: unknown): Record<string, unknown> | null {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const out: Record<string, unknown> = {};
  const entries = Object.entries(input as Record<string, unknown>);
  if (entries.length > MAX_KEYS) return null;
  for (const [key, value] of entries) {
    if (!KEY_RE.test(key) || !value || typeof value !== 'object' || Array.isArray(value)) continue;
    const v = value as Record<string, unknown>;
    if (key === '_days') {
      const days: Record<string, number> = {};
      for (const [d, n] of Object.entries(v)) {
        if (d === 'at' && num(n) !== undefined) days.at = n as number;
        else if (DAY_RE.test(d) && num(n) !== undefined) days[d] = n as number;
      }
      out._days = days;
      continue;
    }
    const rec: Record<string, unknown> = {};
    // ft = when the flag last changed, so a flag set or cleared on one device wins over an older answer record.
    for (const f of ['n', 'right', 'ivl', 'at', 'due', 'ft'] as const) if (num(v[f]) !== undefined) rec[f] = v[f];
    if (v.last === 'c' || v.last === 'w') rec.last = v.last;
    if (typeof v.flag === 'boolean') rec.flag = v.flag;
    if (typeof v.mis === 'boolean') rec.mis = v.mis; // M&M conference: missed when sure
    if (Number.isInteger(v.conf) && (v.conf as number) >= 0 && (v.conf as number) <= 2) rec.conf = v.conf; // how sure
    if (Number.isInteger(v.pick) && (v.pick as number) >= 0 && (v.pick as number) <= 4) rec.pick = v.pick; // chosen answer
    out[key] = rec;
  }
  return out;
}

const blobPath = (code: string) => `rounds-sync/${code}.json`;

type Prog = Record<string, Record<string, number | boolean | string>>;
const stamp = (r: unknown) => {
  const o = (r || {}) as {at?: unknown; ft?: unknown};
  return Math.max(num(o.at) ?? 0, num(o.ft) ?? 0);
};
const resetAt = (p: Prog) => num(p._reset?.at) ?? 0;

/** Same rule as the app's mergeInto: a reset removes older records; otherwise the newer record (answer or flag change) wins
 *  and daily counts keep the higher value. Saving merges into the stored copy, so a device that has not pulled recently
 *  cannot erase answers made elsewhere. */
export function mergeProgress(base: Prog, inc: Prog): Prog {
  const out: Prog = {...base};
  const r = Math.max(resetAt(base), resetAt(inc));
  const keep = (p: Prog) => Object.entries(p).filter(([k, v]) => k === '_reset' || k === '_days' || !r || (num((v as {at?: unknown}).at) ?? 0) > r);
  const merged: Prog = Object.fromEntries(keep(out));
  for (const [k, b] of keep(inc)) {
    const a = merged[k];
    if (k === '_reset') continue;
    if (k === '_days') {
      const m: Record<string, number> = {...((a as Record<string, number>) || {})};
      for (const [d, v] of Object.entries(b as Record<string, number>)) if (d !== 'at') m[d] = Math.max(v, m[d] || 0);
      m.at = Math.max(num(a?.at) ?? 0, num((b as Record<string, number>).at) ?? 0);
      merged[k] = m;
      continue;
    }
    if (!a || stamp(b) > stamp(a)) merged[k] = b;
  }
  if (r) merged._reset = {at: r};
  return merged;
}

/** Read the stored copy. Overwritten blobs stay cached at the CDN for up to a minute and head() can report the old
 *  upload time, so the read always carries a fresh query string. */
async function readStored(code: string): Promise<{prog: Prog; updated: number}> {
  try {
    const meta = await head(blobPath(code));
    const r = await fetch(`${meta.url}?r=${Date.now()}-${Math.random().toString(36).slice(2)}`, {cache: 'no-store'});
    if (!r.ok) throw new Error(`blob fetch ${r.status}`);
    const data = (await r.json()) as {prog?: unknown; updated?: number};
    return {prog: (cleanProgress(data.prog) || {}) as Prog, updated: data.updated || 0};
  } catch (err) {
    if (err instanceof BlobNotFoundError) return {prog: {}, updated: 0};
    throw err;
  }
}

export default async function handler(req: SyncRequest, res: ServerResponse) {
  res.setHeader('Cache-Control', 'private, no-store');
  res.setHeader('Vary', 'Origin');
  const origin = allowedOrigin(req);
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Max-Age', '86400');
  }
  if (req.method === 'OPTIONS') {
    res.statusCode = origin ? 204 : 403;
    res.end();
    return;
  }
  if (!origin) {
    sendJson(res, 403, { error: 'Origin not allowed' });
    return;
  }

  if (req.method === 'GET') {
    const q = req.query || {};
    const code = (Array.isArray(q.code) ? q.code[0] : q.code || new URL(req.url || '/', 'http://x').searchParams.get('code') || '').toUpperCase();
    if (!CODE_RE.test(code)) {
      sendJson(res, 400, { error: 'Invalid sync code' });
      return;
    }
    try {
      const stored = await readStored(code);
      sendJson(res, 200, { prog: stored.prog, updated: stored.updated });
    } catch {
      sendJson(res, 502, { error: 'Sync store unavailable' });
    }
    return;
  }

  if (req.method === 'PUT' || req.method === 'POST') {
    const ip = firstHeader(req.headers['x-forwarded-for']).split(',')[0].trim() || 'unknown';
    if (overWriteLimit(ip)) {
      sendJson(res, 429, { error: 'Too many sync writes; try again shortly' });
      return;
    }
    const body = (typeof req.body === 'string' ? safeParse(req.body) : req.body) as { code?: unknown; prog?: unknown } | null;
    const code = typeof body?.code === 'string' ? body.code.toUpperCase() : '';
    if (!CODE_RE.test(code)) {
      sendJson(res, 400, { error: 'Invalid sync code' });
      return;
    }
    const prog = cleanProgress(body?.prog);
    if (!prog) {
      sendJson(res, 400, { error: 'Invalid progress data' });
      return;
    }
    let merged: Prog;
    try {
      merged = mergeProgress((await readStored(code)).prog, prog as Prog);
    } catch {
      sendJson(res, 502, { error: 'Sync store unavailable' });
      return;
    }
    const payload = JSON.stringify({ prog: merged, updated: Date.now() });
    if (payload.length > MAX_BODY_CHARS) {
      sendJson(res, 413, { error: 'Progress data too large' });
      return;
    }
    try {
      await put(blobPath(code), payload, {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: 'application/json',
        cacheControlMaxAge: 60,
      });
      sendJson(res, 200, { ok: true, prog: merged });
    } catch {
      sendJson(res, 502, { error: 'Sync store unavailable' });
    }
    return;
  }

  res.setHeader('Allow', 'GET, PUT, OPTIONS');
  sendJson(res, 405, { error: 'Method not allowed' });
}

function safeParse(s: string): unknown {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
