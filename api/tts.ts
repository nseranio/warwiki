import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

// Accepted OpenAI TTS voices. Default to 'nova' (professional female — clear for clinical content).
const ALLOWED_VOICES = new Set(['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer']);
const DEFAULT_VOICE = 'nova';

// OpenAI TTS per-request input limit
const MAX_INPUT_CHARS = 4096;

// Allowed models
const ALLOWED_MODELS = new Set(['tts-1', 'tts-1-hd']);
const DEFAULT_MODEL = 'tts-1';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // POST bodies are not part of a reusable public CDN cache key. The client
  // keeps successful audio in its own content-addressed browser cache.
  res.setHeader('Cache-Control', 'private, no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // An API key alone must not turn this public route into a paid text-to-audio
  // service. Configure access/rate controls before explicitly enabling it.
  if (process.env.WARWIKI_ENABLE_CLOUD_TTS !== 'true') {
    res.status(503).json({ error: 'Cloud audio is disabled. Use the device voice.' });
    return;
  }

  if (!process.env.OPENAI_API_KEY) {
    res.status(503).json({
      error: 'TTS not configured',
      hint: 'Set OPENAI_API_KEY in Vercel environment variables.',
    });
    return;
  }

  const body = (req.body || {}) as { text?: string; voice?: string; model?: string };

  const text = typeof body.text === 'string' ? body.text.trim() : '';
  if (!text) {
    res.status(400).json({ error: 'Missing "text" field' });
    return;
  }

  if (text.length > MAX_INPUT_CHARS) {
    res.status(400).json({
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
    res.status(200).send(buffer);
  } catch (err: any) {
    const msg = err?.message || 'TTS generation failed';
    const status = err?.status || 500;
    console.error('[api/tts] error:', msg);
    res.status(status).json({ error: msg });
  }
}
