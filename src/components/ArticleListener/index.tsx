import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './styles.module.css';

/**
 * ArticleListener — cloud TTS (OpenAI) with browser-TTS fallback.
 *
 * Behavior:
 *   1. On play, extract the article text and chunk it into ≤3500-char pieces
 *      at sentence boundaries.
 *   2. Fetch each chunk's audio from /api/tts in parallel, cached via the
 *      browser Cache API keyed by SHA-256(model|voice|text).
 *   3. Play chunks sequentially via an HTMLAudioElement; advance on 'ended'.
 *   4. On any API failure or missing API key, fall back to native
 *      speechSynthesis so the feature still works without cloud backing.
 */

const VOICE_STORAGE_KEY = 'warwiki-tts-voice';
const MODEL_STORAGE_KEY = 'warwiki-tts-model';
const CACHE_NAME = 'warwiki-tts-v1';
const MAX_CHUNK_CHARS = 3500;
const API_ENDPOINT = '/api/tts';

type Voice = 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer';
type Model = 'tts-1' | 'tts-1-hd';

const VOICES: { id: Voice; label: string; description: string }[] = [
  { id: 'nova', label: 'Nova', description: 'Professional female — default' },
  { id: 'shimmer', label: 'Shimmer', description: 'Soft female' },
  { id: 'alloy', label: 'Alloy', description: 'Neutral' },
  { id: 'echo', label: 'Echo', description: 'Male, measured' },
  { id: 'fable', label: 'Fable', description: 'British male' },
  { id: 'onyx', label: 'Onyx', description: 'Deep male' },
];

// SHA-256 hex digest (SubtleCrypto — browser-only)
async function sha256(text: string): Promise<string> {
  const buf = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// Split at sentence boundaries, keeping each chunk ≤ maxLen
function chunkText(text: string, maxLen = MAX_CHUNK_CHARS): string[] {
  const sentences = text.match(/[^.!?]+[.!?]+|\s*[^.!?]+$/g) || [text];
  const chunks: string[] = [];
  let current = '';

  for (const raw of sentences) {
    const sentence = raw.trim();
    if (!sentence) continue;

    if (sentence.length > maxLen) {
      if (current) {
        chunks.push(current.trim());
        current = '';
      }
      let remaining = sentence;
      while (remaining.length > maxLen) {
        const cut = remaining.lastIndexOf(' ', maxLen);
        const split = cut > 0 ? cut : maxLen;
        chunks.push(remaining.slice(0, split).trim());
        remaining = remaining.slice(split);
      }
      current = remaining;
      continue;
    }

    if (current.length + sentence.length + 1 > maxLen) {
      chunks.push(current.trim());
      current = sentence;
    } else {
      current = current ? current + ' ' + sentence : sentence;
    }
  }

  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

// Fetch one chunk's audio as a Blob, with Cache API read-through
async function fetchChunkAudio(text: string, voice: Voice, model: Model): Promise<Blob> {
  const hash = await sha256(`${model}|${voice}|${text}`);
  const cacheKey = `/tts-audio/${hash}.mp3`;

  if ('caches' in window) {
    try {
      const cache = await caches.open(CACHE_NAME);
      const hit = await cache.match(cacheKey);
      if (hit) return await hit.blob();
    } catch {
      /* cache unavailable — fall through */
    }
  }

  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, voice, model }),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({ error: `HTTP ${response.status}` }));
    throw new Error(payload.error || `TTS request failed (${response.status})`);
  }

  const blob = await response.blob();

  if ('caches' in window) {
    try {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(
        cacheKey,
        new Response(blob, { headers: { 'Content-Type': 'audio/mpeg' } }),
      );
    } catch {
      /* ignore cache write failure */
    }
  }

  return blob;
}

// Tiny silent MP3 used to "unlock" an Audio element during a user gesture,
// working around Chrome/Safari autoplay restrictions that otherwise reject
// a .play() call made after an awaited fetch.
const SILENT_MP3 =
  'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//uQwAAAAAAAAAAAAAAAAAAAAAAASW5mbwAAAA8AAAAEAAABIADAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDA//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjEzNAAAAAAAAAAAAAAAACQCgAAAAAAAAAEg4wPBn8AAAAAAAAAAAAAAAAAAAAAA//sQxAADwAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxCQDwAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxEYDwAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxGgDwAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxIoDwAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxKwDwAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxM4DwAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQxPADwAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV';

// Browser-native fallback
function speakFallback(text: string, rate: number, onEnd: () => void): void {
  const synth = window.speechSynthesis;
  synth.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = rate;
  utt.pitch = 1.0;
  utt.onend = onEnd;
  utt.onerror = onEnd;
  synth.speak(utt);
}

export default function ArticleListener(): JSX.Element | null {
  const [supported, setSupported] = useState(true);
  const [state, setState] = useState<'idle' | 'loading' | 'playing' | 'paused' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [rate, setRate] = useState(1.0);
  const [voice, setVoice] = useState<Voice>('nova');
  const [model, setModel] = useState<Model>('tts-1');
  const [usingFallback, setUsingFallback] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [chunkProgress, setChunkProgress] = useState<{ current: number; total: number } | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const chunkPromisesRef = useRef<Promise<Blob>[]>([]);
  const chunkUrlsRef = useRef<Map<number, string>>(new Map());
  const currentIndexRef = useRef<number>(0);
  const cancelledRef = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setSupported(false);
      return;
    }

    const hasAudio = typeof Audio !== 'undefined';
    const hasSpeech = !!window.speechSynthesis;
    if (!hasAudio && !hasSpeech) {
      setSupported(false);
      return;
    }

    try {
      const storedVoice = localStorage.getItem(VOICE_STORAGE_KEY);
      if (storedVoice && VOICES.some((v) => v.id === storedVoice)) setVoice(storedVoice as Voice);
      const storedModel = localStorage.getItem(MODEL_STORAGE_KEY);
      if (storedModel === 'tts-1' || storedModel === 'tts-1-hd') setModel(storedModel);
    } catch {
      /* localStorage unavailable */
    }

    return () => {
      cancelledRef.current = true;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      chunkUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      chunkUrlsRef.current.clear();
      chunkPromisesRef.current = [];
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, []);

  const extractText = useCallback((): string => {
    const content = document.querySelector('article .markdown') as HTMLElement | null;
    if (!content) return '';
    const clone = content.cloneNode(true) as HTMLElement;
    clone
      .querySelectorAll('pre, code, nav, aside, .theme-doc-toc-mobile, button')
      .forEach((n) => n.remove());
    clone.querySelectorAll('td, th').forEach((cell) => {
      cell.textContent = (cell.textContent || '') + '. ';
    });
    return (clone.textContent || '').replace(/\s+/g, ' ').trim();
  }, []);

  const disposeQueue = useCallback(() => {
    chunkUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    chunkUrlsRef.current.clear();
    chunkPromisesRef.current = [];
    currentIndexRef.current = 0;
  }, []);

  // Await chunk i's promise, create an object URL, cache it, return the URL.
  const getChunkUrl = useCallback(async (i: number): Promise<string> => {
    const existing = chunkUrlsRef.current.get(i);
    if (existing) return existing;
    const blob = await chunkPromisesRef.current[i];
    const url = URL.createObjectURL(blob);
    chunkUrlsRef.current.set(i, url);
    return url;
  }, []);

  const playIndex = useCallback(
    async (i: number) => {
      if (cancelledRef.current) return;
      if (i >= chunkPromisesRef.current.length) {
        setState('idle');
        setChunkProgress(null);
        disposeQueue();
        return;
      }

      setChunkProgress({ current: i + 1, total: chunkPromisesRef.current.length });

      // If this chunk's audio isn't ready yet, show loading while we wait
      if (!chunkUrlsRef.current.has(i)) setState('loading');

      let url: string;
      try {
        url = await getChunkUrl(i);
      } catch (err: any) {
        // Handled centrally in startCloudPlayback's fallback path on chunk 0.
        // On chunks >0 (mid-article failure), surface as error.
        if (cancelledRef.current) return;
        if (i === 0) {
          // startCloudPlayback's .catch handler owns fallback for chunk 0 —
          // silently bail here so we don't double-set error state.
          return;
        }
        setState('error');
        setErrorMsg(err?.message || 'Audio chunk failed');
        disposeQueue();
        return;
      }
      if (cancelledRef.current) return;

      if (!audioRef.current) audioRef.current = new Audio();
      const audio = audioRef.current;
      audio.src = url;
      audio.playbackRate = rate;
      audio.onended = () => {
        currentIndexRef.current = i + 1;
        playIndex(i + 1);
      };
      audio.onerror = () => {
        setState('error');
        setErrorMsg('Audio playback failed');
        disposeQueue();
      };
      setState('playing');
      audio.play().catch((err) => {
        // If autoplay is rejected, surface a friendly error and stop.
        setState('error');
        setErrorMsg(
          err?.message?.includes('user') || err?.name === 'NotAllowedError'
            ? 'Browser blocked autoplay — click Listen again.'
            : err?.message || 'Audio play failed',
        );
      });
    },
    [rate, disposeQueue, getChunkUrl],
  );

  const startCloudPlayback = useCallback(
    (text: string) => {
      cancelledRef.current = false;
      setErrorMsg('');
      setUsingFallback(false);

      const chunks = chunkText(text);
      if (!chunks.length) return;

      disposeQueue();
      // Fire all fetches in parallel up front. Each becomes available as it resolves.
      chunkPromisesRef.current = chunks.map((c) =>
        fetchChunkAudio(c, voice, model).catch((err) => {
          throw err;
        }),
      );
      currentIndexRef.current = 0;

      // Start playing chunk 0 as soon as its promise resolves.
      // If all fetches fail, fall back to speechSynthesis.
      chunkPromisesRef.current[0].catch(() => {
        if (cancelledRef.current) return;
        if (typeof window !== 'undefined' && window.speechSynthesis) {
          setUsingFallback(true);
          setState('playing');
          setChunkProgress(null);
          speakFallback(text, rate, () => {
            setState('idle');
            setUsingFallback(false);
          });
        } else {
          setState('error');
          setErrorMsg('TTS unavailable');
        }
      });

      playIndex(0);
    },
    [voice, model, rate, playIndex, disposeQueue],
  );

  const handlePlay = useCallback(() => {
    if (state === 'paused') {
      if (usingFallback) {
        window.speechSynthesis.resume();
      } else if (audioRef.current) {
        audioRef.current.play();
      }
      setState('playing');
      return;
    }

    // Synchronously unlock the Audio element while still inside the user
    // gesture. Priming with a silent data URL prevents the NotAllowedError
    // when we later assign the real src after an awaited fetch.
    if (!audioRef.current) audioRef.current = new Audio();
    try {
      audioRef.current.src = SILENT_MP3;
      const playPromise = audioRef.current.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          /* swallow autoplay errors on the silent primer */
        });
      }
    } catch {
      /* noop — element priming failed but we'll still try the real play */
    }

    setState('loading');
    setChunkProgress(null);

    const text = extractText();
    if (!text) return;
    startCloudPlayback(text);
  }, [state, usingFallback, extractText, startCloudPlayback]);

  const handlePause = useCallback(() => {
    if (usingFallback) {
      window.speechSynthesis.pause();
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
    setState('paused');
  }, [usingFallback]);

  const handleStop = useCallback(() => {
    cancelledRef.current = true;
    if (usingFallback) {
      window.speechSynthesis.cancel();
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
    }
    disposeQueue();
    setState('idle');
    setUsingFallback(false);
    setShowSettings(false);
  }, [usingFallback, disposeQueue]);

  const handleRateChange = useCallback(
    (newRate: number) => {
      setRate(newRate);
      if (audioRef.current && !usingFallback) audioRef.current.playbackRate = newRate;
    },
    [usingFallback],
  );

  const handleVoiceChange = useCallback((newVoice: Voice) => {
    setVoice(newVoice);
    try {
      localStorage.setItem(VOICE_STORAGE_KEY, newVoice);
    } catch {
      /* */
    }
  }, []);

  const handleModelChange = useCallback((newModel: Model) => {
    setModel(newModel);
    try {
      localStorage.setItem(MODEL_STORAGE_KEY, newModel);
    } catch {
      /* */
    }
  }, []);

  if (!supported) return null;

  const isLoading = state === 'loading';
  const isPlaying = state === 'playing';
  const isPaused = state === 'paused';
  const isActive = isLoading || isPlaying || isPaused;
  const isError = state === 'error';

  return (
    <div className={styles.listener} aria-label="Article listener">
      {!isActive && !isError ? (
        <button
          type="button"
          onClick={handlePlay}
          className={styles.playButton}
          aria-label="Listen to this article"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
          Listen to article
        </button>
      ) : (
        <div className={styles.controls}>
          {isLoading ? (
            <span className={styles.spinner} aria-label="Loading audio" />
          ) : isPaused ? (
            <button type="button" onClick={handlePlay} className={styles.controlButton} aria-label="Resume">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          ) : (
            <button type="button" onClick={handlePause} className={styles.controlButton} aria-label="Pause">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </button>
          )}
          <button type="button" onClick={handleStop} className={styles.controlButton} aria-label="Stop">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6 6h12v12H6z" />
            </svg>
          </button>
          <span className={styles.status}>
            {isLoading
              ? chunkProgress
                ? `Loading ${chunkProgress.current}/${chunkProgress.total}…`
                : 'Loading…'
              : isPaused
                ? 'Paused'
                : usingFallback
                  ? 'Playing (fallback)'
                  : chunkProgress && chunkProgress.total > 1
                    ? `Playing ${chunkProgress.current}/${chunkProgress.total}`
                    : 'Playing'}
          </span>
          <div className={styles.rateSelector} role="group" aria-label="Playback speed">
            {[1.0, 1.25, 1.5, 1.75].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleRateChange(r)}
                className={`${styles.rateButton} ${rate === r ? styles.rateActive : ''}`}
                aria-label={`${r}× speed`}
                aria-pressed={rate === r}
              >
                {r}×
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setShowSettings((s) => !s)}
            className={`${styles.controlButton} ${showSettings ? styles.active : ''}`}
            aria-label="Voice settings"
            aria-expanded={showSettings}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94 0 .31.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
            </svg>
          </button>
        </div>
      )}
      {isError && (
        <div className={styles.errorBar} role="alert">
          <span>{errorMsg || 'TTS error'}</span>
          <button
            type="button"
            onClick={() => {
              setState('idle');
              setErrorMsg('');
            }}
            className={styles.controlButton}
          >
            Dismiss
          </button>
        </div>
      )}
      {isActive && showSettings && (
        <div className={styles.settingsPanel}>
          <div>
            <label htmlFor="warwiki-tts-voice" className={styles.settingsLabel}>
              Voice
            </label>
            <select
              id="warwiki-tts-voice"
              className={styles.voiceSelect}
              value={voice}
              onChange={(e) => handleVoiceChange(e.target.value as Voice)}
              disabled={usingFallback}
            >
              {VOICES.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.label} — {v.description}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="warwiki-tts-model" className={styles.settingsLabel}>
              Quality
            </label>
            <select
              id="warwiki-tts-model"
              className={styles.voiceSelect}
              value={model}
              onChange={(e) => handleModelChange(e.target.value as Model)}
              disabled={usingFallback}
            >
              <option value="tts-1">Standard (tts-1)</option>
              <option value="tts-1-hd">High Definition (tts-1-hd)</option>
            </select>
          </div>
          <p className={styles.settingsHint}>
            {usingFallback
              ? "Using your browser's built-in voice (cloud TTS unavailable). Voice and quality settings don't apply in fallback mode."
              : 'Changes take effect on the next play. Audio is cached per article + voice; the same combination replays instantly.'}
          </p>
        </div>
      )}
    </div>
  );
}
