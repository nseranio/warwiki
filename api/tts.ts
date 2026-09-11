import type { IncomingMessage, ServerResponse } from 'node:http';
import OpenAI from 'openai';

// Accepted OpenAI TTS voices. Default to 'nova' (professional female — clear for clinical content).
const ALLOWED_VOICES = new Set(['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer']);
const DEFAULT_VOICE = 'nova';

// OpenAI TTS per-request input limit
const MAX_INPUT_CHARS = 4096;

// Allowed models
const ALLOWED_MODELS = new Set(['tts-1', 'tts-1-hd']);
const DEFAULT_MODEL = 'tts-1';

// Vercel supplies the parsed body on its standard Node request. Native Node
// response methods avoid installing Vercel's entire builder for two types.
type SpeechRequest = IncomingMessage & { body?: unknown };

function sendJson(res: ServerResponse, status: number, payload: Record<string, unknown>): void {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

export default async function handler(req: SpeechRequest, res: ServerResponse) {
  // POST bodies are not part of a reusable public CDN cache key. The client
  // keeps successful audio in its own content-addressed browser cache.
  res.setHeader('Cache-Control', 'private, no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    sendJson(res, 405, { error: 'Method not allowed' });
    return;
  }

  // An API key alone must not turn this public route into a paid text-to-audio
  // service. Configure access/rate controls before explicitly enabling it.
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
  const model = body.model && ALLOWED_MODELS.has(body.model) ? body.model : DEFAULT_MODEL;

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const mp3 = await client.audio.speech.create({
      model,
      voice: voice as any,
      input: text,
      response_format: 'mp3',
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', buffer.length.toString());
    res.statusCode = 200;
    res.end(buffer);
  } catch (err: any) {
    const msg = err?.message || 'TTS generation failed';
    const status = Number.isInteger(err?.status) && err.status >= 400 && err.status <= 599 ? err.status : 502;
    console.error('[api/tts] error:', msg);
    sendJson(res, status, { error: msg });
  }
}
