import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './styles.module.css';

/**
 * ArticleListener — text-to-speech for the current article.
 * Uses the browser's native Web Speech API (SpeechSynthesis).
 * Graceful: renders nothing if the browser lacks speechSynthesis support.
 */
export default function ArticleListener(): JSX.Element | null {
  const [supported, setSupported] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1.0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const preferredVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Feature detection + voice selection
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setSupported(false);
      return;
    }

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      // Preference order: Natural / Enhanced / Premium voices; then common OS defaults; then any en-US
      const preferred =
        voices.find((v) => v.lang.startsWith('en') && /natural|enhanced|premium|online/i.test(v.name)) ||
        voices.find((v) => v.lang.startsWith('en') && /Samantha|Alex|Karen|Daniel/i.test(v.name)) ||
        voices.find((v) => v.lang === 'en-US') ||
        voices.find((v) => v.lang.startsWith('en'));

      preferredVoiceRef.current = preferred ?? null;
    };

    pickVoice();
    window.speechSynthesis.addEventListener('voiceschanged', pickVoice);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', pickVoice);
      // Cancel any in-flight speech when navigating away
      window.speechSynthesis.cancel();
    };
  }, []);

  // Extract the article's readable text from the DOM
  const extractText = useCallback((): string => {
    // Docusaurus renders the article markdown under <article>...<div class="markdown">...
    const content = document.querySelector('article .markdown') as HTMLElement | null;
    if (!content) return '';

    const clone = content.cloneNode(true) as HTMLElement;

    // Strip non-speech elements
    clone.querySelectorAll('pre, code, nav, aside, .theme-doc-toc-mobile, button').forEach((n) => n.remove());

    // Replace table cells with spoken separators so it reads more naturally
    clone.querySelectorAll('td, th').forEach((cell) => {
      cell.textContent = (cell.textContent || '') + '. ';
    });

    // Collapse repeated whitespace
    return (clone.textContent || '').replace(/\s+/g, ' ').trim();
  }, []);

  const speak = useCallback(
    (text: string, rateOverride?: number) => {
      const synth = window.speechSynthesis;
      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rateOverride ?? rate;
      utterance.pitch = 1.0;
      if (preferredVoiceRef.current) utterance.voice = preferredVoiceRef.current;

      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };
      utterance.onerror = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };

      utteranceRef.current = utterance;
      synth.speak(utterance);
      setIsPlaying(true);
      setIsPaused(false);
    },
    [rate],
  );

  const handlePlay = useCallback(() => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }
    const text = extractText();
    if (!text) return;
    speak(text);
  }, [isPaused, extractText, speak]);

  const handlePause = useCallback(() => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  }, []);

  const handleStop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  }, []);

  const handleRateChange = useCallback(
    (newRate: number) => {
      setRate(newRate);
      // If already playing, restart from current position at new rate
      if (isPlaying) {
        const text = extractText();
        if (text) speak(text, newRate);
      }
    },
    [isPlaying, extractText, speak],
  );

  if (!supported) return null;

  return (
    <div className={styles.listener} aria-label="Article listener">
      {!isPlaying ? (
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
          {isPaused ? (
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
          <span className={styles.status}>{isPaused ? 'Paused' : 'Playing'}</span>
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
        </div>
      )}
    </div>
  );
}
