import type { ProgressMap, ProgressRecord, QuizQuestion, Rating, Subspecialty } from './types';

const STORAGE_KEY = 'warwiki:quiz:v1';
const DEFAULT_EASE = 2.3;
const MIN_EASE = 1.3;
const MAX_EASE = 2.7;
const DAY_MS = 24 * 60 * 60 * 1000;

export function loadProgress(): ProgressMap {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveProgress(p: ProgressMap) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* localStorage full / blocked — silently ignore */
  }
}

export function clearProgress() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(STORAGE_KEY);
}

function clampEase(x: number) {
  return Math.max(MIN_EASE, Math.min(MAX_EASE, x));
}

/**
 * SM-2-lite: apply a rating to a record and return the updated record.
 *
 * - wrong → interval reset to 1d, ease −0.2, reps reset
 * - hard  → interval × 1.2, ease −0.15
 * - good  → interval × ease (or 1d → 3d on first pass)
 * - easy  → interval × ease × 1.3, ease +0.15
 */
export function applyRating(prev: ProgressRecord | undefined, rating: Rating): ProgressRecord {
  const cur: ProgressRecord = prev ?? {
    lastSeenISO: new Date().toISOString(),
    intervalDays: 0,
    ease: DEFAULT_EASE,
    reps: 0,
  };
  let { intervalDays, ease, reps } = cur;
  switch (rating) {
    case 'wrong':
      intervalDays = 1;
      ease = clampEase(ease - 0.2);
      reps = 0;
      break;
    case 'hard':
      intervalDays = Math.max(1, Math.round(intervalDays * 1.2));
      ease = clampEase(ease - 0.15);
      reps += 1;
      break;
    case 'good':
      intervalDays = reps === 0 ? 3 : Math.max(1, Math.round(intervalDays * ease));
      reps += 1;
      break;
    case 'easy':
      intervalDays = reps === 0 ? 5 : Math.max(1, Math.round(intervalDays * ease * 1.3));
      ease = clampEase(ease + 0.15);
      reps += 1;
      break;
  }
  return {
    lastSeenISO: new Date().toISOString(),
    intervalDays,
    ease,
    reps,
  };
}

function dueScore(q: QuizQuestion, progress: ProgressMap): number {
  // Lower score = higher priority.
  const rec = progress[q.id];
  if (!rec) return -1000; // never seen → top priority
  const last = new Date(rec.lastSeenISO).getTime();
  const dueAt = last + rec.intervalDays * DAY_MS;
  return dueAt - Date.now(); // negative = overdue (good); positive = future
}

export function pickNext(
  pool: QuizQuestion[],
  subspecialty: Subspecialty,
  progress: ProgressMap,
  excludeId?: string,
): QuizQuestion | null {
  const filtered = pool.filter(q => {
    if (q.id === excludeId) return false;
    if (subspecialty === 'combined') return true;
    return q.subspecialty === subspecialty || q.subspecialty === 'combined';
  });
  if (filtered.length === 0) return null;
  // Sort by due score (most overdue / never seen first); break ties randomly.
  const scored = filtered
    .map(q => ({ q, score: dueScore(q, progress) + Math.random() * 0.5 }))
    .sort((a, b) => a.score - b.score);
  return scored[0].q;
}
