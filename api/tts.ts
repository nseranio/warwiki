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
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method not allowed' });
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

    // Content-addressable response — since the client hashes the input and sends
    // the same text for the same hash, browsers and CDN layers can cache aggressively.
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', buffer.length.toString());
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=604800, immutable');
    res.status(200).send(buffer);
  } catch (err: any) {
    const msg = err?.message || 'TTS generation failed';
    const status = err?.status || 500;
    console.error('[api/tts] error:', msg);
    res.status(status).json({ error: msg });
  }
}
