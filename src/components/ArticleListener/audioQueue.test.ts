import { describe, it, expect, vi } from 'vitest';
import { AudioQueue } from './audioQueue';

describe('on-demand audio generation', () => {
  it('requests only the played chunk and reuses it for repeat playback', async () => {
    const load = vi.fn(async (_text: string, _signal: AbortSignal) => new Blob(['audio']));
    const queue = new AudioQueue(['intro', 'technique', 'follow-up'], load);
    expect(load).not.toHaveBeenCalled();
    await queue.get(1);
    await queue.get(1);
    expect(load).toHaveBeenCalledTimes(1);
    expect(load.mock.calls[0][0]).toBe('technique');
  });

  it('aborts in-flight generation on Stop and never generates later chunks', async () => {
    let requestedSignal: AbortSignal | undefined;
    const load = vi.fn((_text: string, signal: AbortSignal) => {
      requestedSignal = signal;
      return new Promise<Blob>((_resolve, reject) => {
        signal.addEventListener('abort', () => reject(new DOMException('Stopped', 'AbortError')));
      });
    });
    const queue = new AudioQueue(['intro', 'technique'], load);
    const first = queue.get(0);
    queue.dispose();
    await expect(first).rejects.toMatchObject({name: 'AbortError'});
    await expect(queue.get(1)).rejects.toMatchObject({name: 'AbortError'});
    expect(requestedSignal?.aborted).toBe(true);
    expect(load).toHaveBeenCalledTimes(1);
  });
});
