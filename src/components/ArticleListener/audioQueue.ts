/**
 * Audio is generated only as playback approaches a chunk (the current one plus
 * one prefetched), never for the whole article.
 */
export class AudioQueue {
  readonly length: number;
  private controller = new AbortController();
  private requests = new Map<number, Promise<Blob>>();

  constructor(
    private chunks: string[],
    private load: (text: string, signal: AbortSignal) => Promise<Blob>,
  ) {
    this.length = chunks.length;
  }

  get(index: number): Promise<Blob> {
    if (this.controller.signal.aborted) return Promise.reject(new DOMException('Playback stopped', 'AbortError'));
    if (index < 0 || index >= this.length) return Promise.reject(new RangeError('Unknown audio chunk'));
    let request = this.requests.get(index);
    if (!request) {
      request = this.load(this.chunks[index], this.controller.signal);
      this.requests.set(index, request);
    }
    return request;
  }

  /** Start generating a chunk without waiting for it; failures surface on a later get(). */
  prefetch(index: number): void {
    this.get(index).catch(() => undefined);
  }

  dispose(): void {
    this.controller.abort();
    this.requests.clear();
  }
}
