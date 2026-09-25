import { createHash } from 'node:crypto';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { head, put } from '@vercel/blob';
import OpenAI from 'openai';

// Accepted OpenAI TTS voices. Default to 'nova' (professional female — clear for clinical content).
const ALLOWED_VOICES = new Set(['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer']);
const DEFAULT_VOICE = 'nova';

// OpenAI TTS per-request input limit
const MAX_INPUT_CHARS = 4096;

// Allowed models and their list price in micro-dollars (USD * 1e6) per character.
// tts-1 is $15 / 1M characters; tts-1-hd is $30 / 1M characters.
const MODEL_PRICE_MICRO_USD_PER_CHAR: Record<string, number> = { 'tts-1': 15, 'tts-1-hd': 30 };
const DEFAULT_MODEL = 'tts-1';

// Hard monthly ceiling. Stays below the $50 OpenAI project limit.
const DEFAULT_MONTHLY_BUDGET_USD = 45;
// Blob Hobby storage is 1 GB; leave headroom for the budget file and other use.
const DEFAULT_CACHE_MAX_MB = 700;
// Conservative bytes of mp3 per input character, used to cap the shared cache
// before the audio exists (about 15 chars/s of speech at up to ~10 kB/s of mp3).
const EST_MP3_BYTES_PER_CHAR = 700;

// Per-IP limit on cache misses (each miss is paid audio). In-memory, so it is
// per function instance: a soft brake. The monthly budget is the hard cap.
const MISS_LIMIT = 30;
const MISS_WINDOW_MS = 10 * 60 * 1000;

const BUDGET_RETRIES = 5;

type SpeechRequest = IncomingMessage & { body?: unknown };

function sendJson(res: ServerResponse, status: number, payload: Record<string, unknown>): void {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function firstHeader(value: string | string[] | undefined): string {
  return Array.isArray(value) ? value[0] || '' : value || '';
}

// Accept only warwiki.org, this project's Vercel preview domains and localhost.
export function isAllowedOrigin(req: IncomingMessage): boolean {
  const raw = firstHeader(req.headers?.origin) || firstHeader(req.headers?.referer);
  if (!raw) return false;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return false;
  }
  const host = url.hostname.toLowerCase();
  if (host === 'localhost' || host === '127.0.0.1') return true;
  if (url.protocol !== 'https:') return false;
  if (host === 'warwiki.org' || host === 'www.warwiki.org') return true;
  if (/^warwiki[a-z0-9-]*\.vercel\.app$/.test(host)) return true;
  return [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL].some((own) => own && own.toLowerCase() === host);
}

const misses = new Map<string, number[]>();
function overMissLimit(ip: string): boolean {
  const now = Date.now();
  const recent = (misses.get(ip) || []).filter((t) => now - t < MISS_WINDOW_MS);
  if (recent.length >= MISS_LIMIT) {
    misses.set(ip, recent);
    return true;
  }
  recent.push(now);
  misses.set(ip, recent);
  return false;
}

type Ledger = { month: string; spentMicroUsd: number; cacheBytes: number };

function isConflict(err: unknown): boolean {
  const { name = '', message = '' } = (err as { name?: string; message?: string }) || {};
  return /Precondition|AlreadyExists|Conflict/i.test(name) || /already exists/i.test(message);
}

function isNotFound(err: unknown): boolean {
  return /NotFound/i.test((err as { name?: string })?.name || '');
}

function readEnvNumber(name: string, fallback: number): number {
  const parsed = Number(process.env[name]);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

async function readLedger(path: string, month: string): Promise<{ ledger: Ledger; etag?: string }> {
  let meta;
  try {
    meta = await head(path);
  } catch (err) {
    if (isNotFound(err)) return { ledger: { month, spentMicroUsd: 0, cacheBytes: 0 } };
    throw err;
  }
  // The etag in the URL defeats CDN caching, so we read the exact version the etag names.
  const response = await fetch(`${meta.url}?v=${encodeURIComponent(meta.etag)}`, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Ledger read failed (${response.status})`);
  const data = (await response.json()) as Partial<Ledger>;
  if (!Number.isFinite(data.spentMicroUsd) || !Number.isFinite(data.cacheBytes)) throw new Error('Ledger corrupt');
  return { ledger: { month, spentMicroUsd: data.spentMicroUsd!, cacheBytes: data.cacheBytes! }, etag: meta.etag };
}

async function writeLedger(path: string, ledger: Ledger, etag?: string): Promise<void> {
  await put(path, JSON.stringify(ledger), {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json',
    cacheControlMaxAge: 60,
    ...(etag ? { allowOverwrite: true, ifMatch: etag } : { allowOverwrite: false }),
  });
}

type Reservation = { ok: true; store: boolean } | { ok: false; reason: 'budget' | 'error' };

// Optimistic-concurrency update of the monthly ledger. A lost race retries; any
// unreadable or unwritable ledger fails closed, so a fault never permits spending.
async function adjustLedger(
  deltaMicroUsd: number,
  deltaBytes: number,
  limitMicroUsd: number,
  cacheMaxBytes: number,
): Promise<Reservation> {
  const month = new Date().toISOString().slice(0, 7);
  const path = `tts/budget/${month}.json`;
  for (let attempt = 0; attempt < BUDGET_RETRIES; attempt++) {
    try {
      const { ledger, etag } = await readLedger(path, month);
      if (deltaMicroUsd > 0 && ledger.spentMicroUsd + deltaMicroUsd > limitMicroUsd) return { ok: false, reason: 'budget' };
      const store = ledger.cacheBytes + deltaBytes <= cacheMaxBytes;
      const next: Ledger = {
        month,
        spentMicroUsd: Math.max(0, ledger.spentMicroUsd + deltaMicroUsd),
        cacheBytes: Math.max(0, ledger.cacheBytes + (store || deltaBytes < 0 ? deltaBytes : 0)),
      };
      await writeLedger(path, next, etag);
      return { ok: true, store };
    } catch (err) {
      if (!isConflict(err)) return { ok: false, reason: 'error' };
      await new Promise((resolve) => setTimeout(resolve, 40 + Math.random() * 120));
    }
  }
  return { ok: false, reason: 'error' };
}

export default async function handler(req: SpeechRequest, res: ServerResponse) {
  // POST bodies are not part of a reusable public CDN cache key. The client
  // keeps successful audio in its own content-addressed browser cache; the
  // shared cache below lives in Vercel Blob.
  res.setHeader('Cache-Control', 'private, no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  if (!isAllowedOrigin(req)) {
    sendJson(res, 403, { error: 'Origin not allowed' });
    return;
  }

  // Cloud audio stays off until explicitly enabled with the guardrails below.
  if (process.env.WARWIKI_ENABLE_CLOUD_TTS !== 'true') {
    sendJson(res, 503, { error: 'Cloud audio is disabled. Use the device voice.' });
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    sendJson(res, 503, {
      error: 'TTS not configured',
      hint: 'Set OPENAI_API_KEY in Vercel environment variables.',
    });
    return;
  }

  const body = (req.body || {}) as { text?: string; voice?: string; model?: string };

  const text = typeof body.text === 'string' ? body.text.trim() : '';
  if (!text) {
    sendJson(res, 400, { error: 'Missing "text" field' });
    return;
  }

  if (text.length > MAX_INPUT_CHARS) {
    sendJson(res, 400, {
      error: `Text exceeds ${MAX_INPUT_CHARS} characters`,
      hint: 'Split into smaller chunks and request separately.',
    });
    return;
  }

  const voice = body.voice && ALLOWED_VOICES.has(body.voice) ? body.voice : DEFAULT_VOICE;
  const model = body.model && body.model in MODEL_PRICE_MICRO_USD_PER_CHAR ? body.model : DEFAULT_MODEL;

  // Same key the browser computes: SHA-256(model|voice|text).
  const hash = createHash('sha256').update(`${model}|${voice}|${text}`).digest('hex');
  const audioPath = `tts/audio/${hash}.mp3`;

  // Shared cache: a hit never calls OpenAI and never touches the budget.
  try {
    const cached = await head(audioPath);
    const stored = await fetch(cached.url);
    if (stored.ok) {
      const buffer = Buffer.from(await stored.arrayBuffer());
      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Length', buffer.length.toString());
      res.setHeader('X-TTS-Cache', 'HIT');
      res.statusCode = 200;
      res.end(buffer);
      return;
    }
  } catch (err) {
    // Not found is an ordinary miss. Any other cache fault is also treated as a
    // miss; the budget check below still fails closed if storage is unavailable.
    if (!isNotFound(err)) console.error('[api/tts] cache lookup failed');
  }

  const ip = firstHeader(req.headers?.['x-real-ip']) || firstHeader(req.headers?.['x-forwarded-for']).split(',')[0].trim() || 'unknown';
  if (overMissLimit(ip)) {
    res.setHeader('Retry-After', '600');
    sendJson(res, 429, { error: 'Too many audio requests. Use the device voice for now.' });
    return;
  }

  // Reserve the worst-case cost before calling OpenAI (rounded up to a micro-dollar).
  const costMicroUsd = Math.ceil(text.length * MODEL_PRICE_MICRO_USD_PER_CHAR[model]);
  const limitMicroUsd = Math.floor(readEnvNumber('WARWIKI_TTS_MONTHLY_BUDGET_USD', DEFAULT_MONTHLY_BUDGET_USD) * 1_000_000);
  const cacheMaxBytes = readEnvNumber('WARWIKI_TTS_CACHE_MAX_MB', DEFAULT_CACHE_MAX_MB) * 1024 * 1024;
  const estBytes = text.length * EST_MP3_BYTES_PER_CHAR;
  const reservation = await adjustLedger(costMicroUsd, estBytes, limitMicroUsd, cacheMaxBytes);
  if (!reservation.ok) {
    sendJson(res, 503, { error: 'Cloud audio paused' });
    return;
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const mp3 = await client.audio.speech.create({
      model,
      voice: voice as any,
      input: text,
      response_format: 'mp3',
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    if (reservation.store) {
      try {
        await put(audioPath, buffer, {
          access: 'public',
          addRandomSuffix: false,
          allowOverwrite: true,
          contentType: 'audio/mpeg',
          cacheControlMaxAge: 31536000,
        });
      } catch {
        console.error('[api/tts] cache write failed');
      }
    }

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', buffer.length.toString());
    res.setHeader('X-TTS-Cache', 'MISS');
    res.statusCode = 200;
    res.end(buffer);
  } catch (err: any) {
    // The request produced no audio, so return the reservation (best effort).
    await adjustLedger(-costMicroUsd, reservation.store ? -estBytes : 0, limitMicroUsd, cacheMaxBytes).catch(() => undefined);
    const msg = err?.message || 'TTS generation failed';
    const status = Number.isInteger(err?.status) && err.status >= 400 && err.status <= 599 ? err.status : 502;
    console.error('[api/tts] error:', msg);
    sendJson(res, status, { error: msg });
  }
}
