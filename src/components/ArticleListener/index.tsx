import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './styles.module.css';

const STORAGE_KEY = 'warwiki-tts-voice-name';

// macOS novelty / musical voices — exclude from the picker
const NOVELTY_VOICE_REGEX =
  /^(Albert|Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Deranged|Good News|Hysterical|Jester|Junior|Organ|Pipe Organ|Ralph|Superstar|Trinoids|Whisper|Wobble|Zarvox)\b/i;

/** Score a voice — higher is better. Used to pick a smart default. */
function scoreVoice(v: SpeechSynthesisVoice): number {
  let score = 0;
  const name = v.name;
  const lang = v.lang || '';

  // Strongly prefer English
  if (lang.startsWith('en-')) score += 100;
  else if (lang.startsWith('en')) score += 80;
  else score -= 1000; // non-English disqualified

  if (lang === 'en-US') score += 5;

  // Neural / natural voices are the big quality jump
  if (/neural/i.test(name)) score += 60;
  if (/natural/i.test(name)) score += 55;
  if (/online/i.test(name)) score += 40; // Microsoft Online (Natural) voices

  // Apple tiered voices
  if (/\(Premium\)/i.test(name)) score += 50;
  if (/\(Enhanced\)/i.test(name)) score += 40;

  // Chrome's Google voices
  if (/^Google /i.test(name)) score += 30;

  // Known-good OS default voices
  if (/Samantha/i.test(name)) score += 15;
  if (/Alex/i.test(name)) score += 15;
  if (/Karen|Daniel|Moira|Tessa/i.test(name)) score += 10;
  if (/Ava|Allison|Susan|Tom|Nicky/i.test(name)) score += 10;

  if (NOVELTY_VOICE_REGEX.test(name)) score -= 500;

  if (v.localService) score += 2;

  return score;
}

/** Filter to voices the user might actually want to listen to. */
function isListenableVoice(v: SpeechSynthesisVoice): boolean {
  const lang = v.lang || '';
  if (!lang.startsWith('en')) return false;
  if (NOVELTY_VOICE_REGEX.test(v.name)) return false;
  return true;
}

export default function ArticleListener(): JSX.Element | null {
  const [supported, setSupported] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1.0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Feature detection + voice loading + persisted-voice restore
  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setSupported(false);
      return;
    }

    const loadVoices = () => {
      const all = window.speechSynthesis.getVoices();
      if (!all.length) return;

      const listenable = all.filter(isListenableVoice).sort((a, b) => scoreVoice(b) - scoreVoice(a));
      setVoices(listenable);

      const stored = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
      if (stored && listenable.some((v) => v.name === stored)) {
        setSelectedVoiceName(stored);
      } else if (listenable.length) {
        setSelectedVoiceName(listenable[0].name);
      }
    };

    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  const currentVoice = voices.find((v) => v.name === selectedVoiceName) ?? null;

  const extractText = useCallback((): string => {
    const content = document.querySelector('article .markdown') as HTMLElement | null;
    if (!content) return '';

    const clone = content.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('pre, code, nav, aside, .theme-doc-toc-mobile, button').forEach((n) => n.remove());
    clone.querySelectorAll('td, th').forEach((cell) => {
      cell.textContent = (cell.textContent || '') + '. ';
    });

    return (clone.textContent || '').replace(/\s+/g, ' ').trim();
  }, []);

  const speak = useCallback(
    (text: string, rateOverride?: number, voiceOverride?: SpeechSynthesisVoice | null) => {
      const synth = window.speechSynthesis;
      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rateOverride ?? rate;
      utterance.pitch = 1.0;
      const voice = voiceOverride !== undefined ? voiceOverride : currentVoice;
      if (voice) utterance.voice = voice;

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
    [rate, currentVoice],
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
    setShowSettings(false);
  }, []);

  const handleRateChange = useCallback(
    (newRate: number) => {
      setRate(newRate);
      if (isPlaying) {
        const text = extractText();
        if (text) speak(text, newRate);
      }
    },
    [isPlaying, extractText, speak],
  );

  const handleVoiceChange = useCallback(
    (voiceName: string) => {
      setSelectedVoiceName(voiceName);
      try {
        localStorage.setItem(STORAGE_KEY, voiceName);
      } catch {
        /* localStorage unavailable — fail silently */
      }
      const newVoice = voices.find((v) => v.name === voiceName) ?? null;
      if (isPlaying) {
        const text = extractText();
        if (text) speak(text, undefined, newVoice);
      }
    },
    [voices, isPlaying, extractText, speak],
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
          {voices.length > 1 && (
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
          )}
        </div>
      )}
      {isPlaying && showSettings && voices.length > 1 && (
        <div className={styles.settingsPanel}>
          <label htmlFor="warwiki-voice-picker" className={styles.settingsLabel}>
            Voice
          </label>
          <select
            id="warwiki-voice-picker"
            className={styles.voiceSelect}
            value={selectedVoiceName}
            onChange={(e) => handleVoiceChange(e.target.value)}
          >
            {voices.map((v) => (
              <option key={v.name} value={v.name}>
                {v.name} — {v.lang}
                {v.localService ? '' : ' (online)'}
              </option>
            ))}
          </select>
          <p className={styles.settingsHint}>
            For better voice quality, install premium voices via your OS: on macOS go to System Settings →
            Accessibility → Spoken Content → System Voice → Manage Voices, and download a voice labeled
            (Premium) or (Enhanced). On Windows 11, install Microsoft Natural voices via Settings →
            Accessibility → Narrator → Add natural voices.
          </p>
        </div>
      )}
    </div>
  );
}
