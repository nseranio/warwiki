# TTS (Text-to-Speech) Setup

The Article Listener uses **OpenAI TTS** via a Vercel serverless function with a browser-native `speechSynthesis` fallback.

## One-time Vercel Setup

1. Get an OpenAI API key at https://platform.openai.com/api-keys
2. In the Vercel dashboard for this project:
   - **Settings → Environment Variables**
   - Add a new variable:
     - **Name:** `OPENAI_API_KEY`
     - **Value:** your OpenAI API key (`sk-...`)
     - **Environments:** Production, Preview, Development (all)
3. **Redeploy** the site (trigger a new deployment, or push any commit)

That's it. Once the key is set, the `/api/tts` endpoint will synthesize audio on demand.

## Behavior

### With `OPENAI_API_KEY` set:

- Click "Listen to article" → loading spinner → high-quality OpenAI voice
- Six voice options: Nova (default, professional female), Shimmer, Alloy, Echo, Fable, Onyx
- Two quality tiers: `tts-1` (standard, $15/1M chars) and `tts-1-hd` (HD, $30/1M chars)
- Audio cached per article + voice + model combination (browser Cache API)
- Same article + same voice + same model on the same browser → **instant replay, no API cost**

### Without `OPENAI_API_KEY` (or on API failure):

- Automatic fallback to browser's native `speechSynthesis`
- Status bar shows "Playing (fallback)"
- Voice and quality dropdowns are disabled
- No cloud cost incurred

## Cost Guidance

- Average WARWIKI article: 5,000–8,000 characters
- Per listen (uncached), `tts-1`: $0.08–0.12
- Per listen (uncached), `tts-1-hd`: $0.15–0.24
- Same user re-listening: **$0** (client cache)
- Different users listening to same article: each pays once (no shared server-side cache yet — can add via Vercel KV if needed)

## Files

- **`api/tts.ts`** — Vercel serverless function (POST endpoint)
- **`src/components/ArticleListener/index.tsx`** — React component (cloud + fallback)
- **`src/theme/DocItem/Content/index.tsx`** — Docusaurus swizzle that injects the listener on every doc article

## Adding server-side caching (future optimization)

If cross-user traffic increases, add Vercel KV:

1. Enable Vercel KV on the project
2. In `api/tts.ts`, hash the request `(model, voice, text)` → check KV for cached audio → if miss, synthesize and store → return
3. Each unique article+voice combination is paid for only **once** across all users

Current architecture:
```
Browser Cache (per-user, instant replay)
         ↓
    /api/tts
         ↓
    OpenAI TTS API (per-call cost)
```

With KV caching:
```
Browser Cache (per-user, instant replay)
         ↓
    /api/tts
         ↓
    Vercel KV (shared, near-zero latency)
         ↓
    OpenAI TTS API (only on cache miss)
```
