import {beforeEach, afterEach, describe, expect, it, vi} from 'vitest';
import handler from '../../api/tts';

const {generateSpeech, head, put, fetchMock} = vi.hoisted(() => ({
  generateSpeech: vi.fn(),
  head: vi.fn(),
  put: vi.fn(),
  fetchMock: vi.fn(),
}));
vi.mock('openai', () => ({default: class OpenAI {
  audio = {speech: {create: generateSpeech}};
}}));
vi.mock('@vercel/blob', () => ({head, put}));

const notFound = () => Object.assign(new Error('not found'), {name: 'BlobNotFoundError'});
const origin = 'https://warwiki.org';

async function request(method: string, body?: unknown, headers: Record<string, string> = {origin}) {
  const response = {statusCode: 200, setHeader: vi.fn(), end: vi.fn()};
  await handler({method, body, headers} as unknown as Parameters<typeof handler>[0], response as unknown as Parameters<typeof handler>[1]);
  return response;
}

// Blob store double: audio starts uncached; the ledger reads back what was last written.
function blobStore(ledger: {spentMicroUsd: number; cacheBytes: number} | null, audio: Buffer | null = null) {
  let current = ledger;
  head.mockImplementation(async (path: string) => {
    if (path.startsWith('tts/audio/')) {
      if (!audio) throw notFound();
      return {url: 'https://blob.test/audio.mp3', etag: 'a'};
    }
    if (!current) throw notFound();
    return {url: 'https://blob.test/ledger.json', etag: 'e1'};
  });
  put.mockImplementation(async (_path: string, body: string | Buffer) => {
    if (typeof body === 'string') current = JSON.parse(body);
  });
  fetchMock.mockImplementation(async (url: string) => {
    if (String(url).includes('audio.mp3')) return {ok: true, arrayBuffer: async () => new Uint8Array(audio!).buffer};
    return {ok: true, json: async () => current};
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal('fetch', fetchMock);
  vi.stubEnv('WARWIKI_ENABLE_CLOUD_TTS', 'false');
  vi.stubEnv('WARWIKI_TTS_MONTHLY_BUDGET_USD', '');
  vi.stubEnv('OPENAI_API_KEY', 'test-only-key');
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('cloud speech API contract', () => {
  it('rejects other methods and marks every response private', async () => {
    const response = await request('GET');
    expect(response.statusCode).toBe(405);
    expect(response.setHeader).toHaveBeenCalledWith('Allow', 'POST');
    expect(response.setHeader).toHaveBeenCalledWith('Cache-Control', 'private, no-store');
    expect(generateSpeech).not.toHaveBeenCalled();
  });

  it('makes no paid request from an API key alone', async () => {
    const response = await request('POST', {text: 'hello'});
    expect(response.statusCode).toBe(503);
    expect(generateSpeech).not.toHaveBeenCalled();
  });

  it('requires a server key after opt-in', async () => {
    vi.stubEnv('WARWIKI_ENABLE_CLOUD_TTS', 'true');
    vi.stubEnv('OPENAI_API_KEY', '');
    const response = await request('POST', {text: 'hello'});
    expect(response.statusCode).toBe(503);
    expect(generateSpeech).not.toHaveBeenCalled();
  });

  it('rejects empty and oversized input before generation', async () => {
    vi.stubEnv('WARWIKI_ENABLE_CLOUD_TTS', 'true');
    expect((await request('POST', {text: '  '})).statusCode).toBe(400);
    expect((await request('POST', {text: 'x'.repeat(4097)})).statusCode).toBe(400);
    expect(generateSpeech).not.toHaveBeenCalled();
  });
});

describe('origin check', () => {
  beforeEach(() => vi.stubEnv('WARWIKI_ENABLE_CLOUD_TTS', 'true'));

  it.each([
    ['a foreign origin', {origin: 'https://evil.example'}],
    ['a lookalike host', {origin: 'https://warwiki.org.evil.example'}],
    ['a foreign vercel.app host', {origin: 'https://someone-else.vercel.app'}],
    ['no origin or referer', {}],
  ])('rejects %s without touching storage or OpenAI', async (_name, headers) => {
    const response = await request('POST', {text: 'hello'}, headers);
    expect(response.statusCode).toBe(403);
    expect(head).not.toHaveBeenCalled();
    expect(generateSpeech).not.toHaveBeenCalled();
  });

  it.each([
    'https://warwiki.org',
    'https://www.warwiki.org',
    'https://warwiki-git-feature-team.vercel.app',
    'http://localhost:3000',
  ])('accepts %s', async (allowed) => {
    blobStore({spentMicroUsd: 0, cacheBytes: 0}, Buffer.from([1]));
    expect((await request('POST', {text: 'hello'}, {origin: allowed})).statusCode).toBe(200);
  });

  it('accepts an allowed Referer when Origin is absent', async () => {
    blobStore({spentMicroUsd: 0, cacheBytes: 0}, Buffer.from([1]));
    expect((await request('POST', {text: 'hello'}, {referer: 'https://warwiki.org/docs/x'})).statusCode).toBe(200);
  });
});

describe('shared cache and monthly budget', () => {
  beforeEach(() => vi.stubEnv('WARWIKI_ENABLE_CLOUD_TTS', 'true'));

  it('serves a cache hit without calling OpenAI or spending budget', async () => {
    blobStore({spentMicroUsd: 44_999_999, cacheBytes: 0}, Buffer.from([9, 8, 7]));
    const response = await request('POST', {text: 'cached sentence'});
    expect(response.statusCode).toBe(200);
    expect(response.end).toHaveBeenCalledWith(Buffer.from([9, 8, 7]));
    expect(response.setHeader).toHaveBeenCalledWith('X-TTS-Cache', 'HIT');
    expect(generateSpeech).not.toHaveBeenCalled();
    expect(put).not.toHaveBeenCalled();
  });

  it('keys the cache by SHA-256 of model|voice|text', async () => {
    blobStore({spentMicroUsd: 0, cacheBytes: 0}, Buffer.from([1]));
    await request('POST', {text: 'hello', voice: 'nova', model: 'tts-1'});
    const {createHash} = await import('node:crypto');
    const hash = createHash('sha256').update('tts-1|nova|hello').digest('hex');
    expect(head).toHaveBeenCalledWith(`tts/audio/${hash}.mp3`);
  });

  it('on a miss reserves cost, generates, stores and reports MISS', async () => {
    blobStore({spentMicroUsd: 0, cacheBytes: 0});
    generateSpeech.mockResolvedValue({arrayBuffer: async () => new Uint8Array([1, 2, 3]).buffer});
    const response = await request('POST', {text: '  test speech  ', voice: 'unknown', model: 'unknown'});
    expect(generateSpeech).toHaveBeenCalledWith({model: 'tts-1', voice: 'nova', input: 'test speech', response_format: 'mp3'});
    expect(response.statusCode).toBe(200);
    expect(response.setHeader).toHaveBeenCalledWith('Content-Type', 'audio/mpeg');
    expect(response.setHeader).toHaveBeenCalledWith('Content-Length', '3');
    expect(response.setHeader).toHaveBeenCalledWith('X-TTS-Cache', 'MISS');
    expect(response.end).toHaveBeenCalledWith(Buffer.from([1, 2, 3]));
    const ledgerWrite = put.mock.calls.find(([path]) => String(path).startsWith('tts/budget/'));
    // 11 characters at tts-1's 15 micro-dollars per character, rounded up.
    expect(JSON.parse(ledgerWrite![1]).spentMicroUsd).toBe(165);
    expect(put.mock.calls.some(([path]) => String(path).startsWith('tts/audio/'))).toBe(true);
  });

  it('returns 503 "Cloud audio paused" with no OpenAI call once the budget is reached', async () => {
    blobStore({spentMicroUsd: 44_999_990, cacheBytes: 0});
    const response = await request('POST', {text: 'a sentence that would exceed the ceiling'});
    expect(response.statusCode).toBe(503);
    expect(response.end).toHaveBeenCalledWith(JSON.stringify({error: 'Cloud audio paused'}));
    expect(generateSpeech).not.toHaveBeenCalled();
    expect(put).not.toHaveBeenCalled();
  });

  it('honors WARWIKI_TTS_MONTHLY_BUDGET_USD', async () => {
    vi.stubEnv('WARWIKI_TTS_MONTHLY_BUDGET_USD', '1');
    blobStore({spentMicroUsd: 999_990, cacheBytes: 0});
    expect((await request('POST', {text: 'over one dollar now'})).statusCode).toBe(503);
    expect(generateSpeech).not.toHaveBeenCalled();
  });

  it('fails closed when the budget cannot be read', async () => {
    blobStore({spentMicroUsd: 0, cacheBytes: 0});
    head.mockImplementation(async (path: string) => {
      if (path.startsWith('tts/audio/')) throw notFound();
      throw new Error('blob store unavailable');
    });
    const response = await request('POST', {text: 'hello'});
    expect(response.statusCode).toBe(503);
    expect(generateSpeech).not.toHaveBeenCalled();
  });

  it('fails closed when the budget cannot be written', async () => {
    blobStore({spentMicroUsd: 0, cacheBytes: 0});
    put.mockRejectedValue(new Error('blob write failed'));
    const response = await request('POST', {text: 'hello'});
    expect(response.statusCode).toBe(503);
    expect(generateSpeech).not.toHaveBeenCalled();
  });

  it('stops storing new audio when the cache cap is reached but still serves it', async () => {
    vi.stubEnv('WARWIKI_TTS_CACHE_MAX_MB', '1');
    blobStore({spentMicroUsd: 0, cacheBytes: 1024 * 1024});
    generateSpeech.mockResolvedValue({arrayBuffer: async () => new Uint8Array([1]).buffer});
    const response = await request('POST', {text: 'hello'});
    expect(response.statusCode).toBe(200);
    expect(put.mock.calls.some(([path]) => String(path).startsWith('tts/audio/'))).toBe(false);
  });

  it('returns the reservation when OpenAI fails', async () => {
    blobStore({spentMicroUsd: 0, cacheBytes: 0});
    generateSpeech.mockRejectedValue(Object.assign(new Error('upstream'), {status: 500}));
    const response = await request('POST', {text: 'hello'});
    expect(response.statusCode).toBe(500);
    const ledgerWrites = put.mock.calls.filter(([path]) => String(path).startsWith('tts/budget/'));
    expect(JSON.parse(ledgerWrites.at(-1)![1]).spentMicroUsd).toBe(0);
  });
});

describe('per-IP miss limit', () => {
  it('returns 429 after too many misses from one address', async () => {
    vi.stubEnv('WARWIKI_ENABLE_CLOUD_TTS', 'true');
    blobStore({spentMicroUsd: 0, cacheBytes: 0});
    generateSpeech.mockResolvedValue({arrayBuffer: async () => new Uint8Array([1]).buffer});
    const headers = {origin, 'x-real-ip': '203.0.113.9'};
    const statuses: number[] = [];
    for (let i = 0; i < 32; i++) statuses.push((await request('POST', {text: `sentence ${i}`}, headers)).statusCode);
    expect(statuses.slice(0, 30).every((s) => s === 200)).toBe(true);
    expect(statuses.slice(30)).toEqual([429, 429]);
  });
});
