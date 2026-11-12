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

export function allowedOrigin(req: IncomingMessage): string | null {
  const raw = firstHeader(req.headers?.origin);
  if (!raw) return null;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  const host = url.hostname.toLowerCase();
  if (host === 'localhost' || host === '127.0.0.1') return raw;
  if (url.protocol !== 'https:') return null;
  if (['warwiki.org', 'www.warwiki.org', 'whitwiki.org', 'www.whitwiki.org'].includes(host)) return raw;
  if (/^(warwiki|whitwiki)[a-z0-9-]*\.vercel\.app$/.test(host)) return raw;
  return null;
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
    for (const f of ['n', 'right', 'ivl', 'at', 'due'] as const) if (num(v[f]) !== undefined) rec[f] = v[f];
    if (v.last === 'c' || v.last === 'w') rec.last = v.last;
    if (v.flag === true) rec.flag = true;
    out[key] = rec;
  }
  return out;
}

const blobPath = (code: string) => `rounds-sync/${code}.json`;

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
      const meta = await head(blobPath(code));
      const r = await fetch(`${meta.url}?v=${new Date(meta.uploadedAt).getTime()}`, { cache: 'no-store' });
      if (!r.ok) throw new Error(`blob fetch ${r.status}`);
      const data = (await r.json()) as { prog?: unknown; updated?: number };
      sendJson(res, 200, { prog: cleanProgress(data.prog) || {}, updated: data.updated || 0 });
    } catch (err) {
      if (err instanceof BlobNotFoundError) {
        sendJson(res, 200, { prog: {}, updated: 0 });
        return;
      }
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
    const payload = JSON.stringify({ prog, updated: Date.now() });
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
      sendJson(res, 200, { ok: true });
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
