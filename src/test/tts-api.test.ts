import {beforeEach, afterEach, describe, expect, it, vi} from 'vitest';
import handler from '../../api/tts';

const {generateSpeech} = vi.hoisted(() => ({generateSpeech: vi.fn()}));
vi.mock('openai', () => ({default: class OpenAI {
  audio = {speech: {create: generateSpeech}};
}}));

async function request(method: string, body?: unknown) {
  const response = {statusCode: 200, setHeader: vi.fn(), end: vi.fn()};
  await handler({method, body} as Parameters<typeof handler>[0], response as unknown as Parameters<typeof handler>[1]);
  return response;
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv('WARWIKI_ENABLE_CLOUD_TTS', 'false');
  vi.stubEnv('OPENAI_API_KEY', 'test-only-key');
});
afterEach(() => vi.unstubAllEnvs());

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

  it('preserves MP3 response and allowed defaults when explicitly enabled', async () => {
    vi.stubEnv('WARWIKI_ENABLE_CLOUD_TTS', 'true');
    generateSpeech.mockResolvedValue({arrayBuffer: async () => new Uint8Array([1, 2, 3]).buffer});
    const response = await request('POST', {text: '  test speech  ', voice: 'unknown', model: 'unknown'});
    expect(generateSpeech).toHaveBeenCalledWith({model: 'tts-1', voice: 'nova', input: 'test speech', response_format: 'mp3'});
    expect(response.statusCode).toBe(200);
    expect(response.setHeader).toHaveBeenCalledWith('Content-Type', 'audio/mpeg');
    expect(response.setHeader).toHaveBeenCalledWith('Content-Length', '3');
    expect(response.end).toHaveBeenCalledWith(Buffer.from([1, 2, 3]));
  });
});
