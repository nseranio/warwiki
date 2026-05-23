import React, { useEffect, useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import { QUIZ_QUESTIONS } from '@site/src/data/quiz/questions';
import {
  applyRating,
  clearProgress,
  loadProgress,
  pickNext,
  saveProgress,
} from '@site/src/data/quiz/scheduler';
import type { ProgressMap, QuizQuestion, Rating, Subspecialty } from '@site/src/data/quiz/types';

const TABS: Array<{ id: Subspecialty; label: string; help: string }> = [
  { id: 'GURS', label: 'GURS', help: 'Genitourinary reconstruction (urethroplasty, ureteral, diversion, GAS)' },
  { id: 'URPS', label: 'URPS', help: 'Urogynecology / female pelvic medicine & reconstructive surgery' },
  { id: 'combined', label: 'Combined', help: 'Foundations, NLUTD, ERAS, complications — common to both fellowships' },
];

const SUBSPEC_STORE_KEY = 'warwiki:quiz:subspecialty';

function getInitialSubspec(): Subspecialty {
  if (typeof window === 'undefined') return 'combined';
  const stored = window.localStorage.getItem(SUBSPEC_STORE_KEY);
  if (stored === 'GURS' || stored === 'URPS' || stored === 'combined') return stored;
  return 'combined';
}

export default function QuizPage() {
  const [subspec, setSubspec] = useState<Subspecialty>('combined');
  const [progress, setProgress] = useState<ProgressMap>({});
  const [current, setCurrent] = useState<QuizQuestion | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [sessionStats, setSessionStats] = useState({ answered: 0, correct: 0 });

  // Initial mount: load state from localStorage.
  useEffect(() => {
    const initial = getInitialSubspec();
    setSubspec(initial);
    const p = loadProgress();
    setProgress(p);
    setCurrent(pickNext(QUIZ_QUESTIONS, initial, p));
  }, []);

  // Persist subspecialty changes.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(SUBSPEC_STORE_KEY, subspec);
    }
  }, [subspec]);

  function changeSubspec(s: Subspecialty) {
    setSubspec(s);
    setSelected(null);
    setRevealed(false);
    setCurrent(pickNext(QUIZ_QUESTIONS, s, progress));
  }

  function rate(rating: Rating) {
    if (!current) return;
    const updated = { ...progress, [current.id]: applyRating(progress[current.id], rating) };
    setProgress(updated);
    saveProgress(updated);
    setSessionStats(s => ({
      answered: s.answered + 1,
      correct: s.correct + (rating !== 'wrong' ? 1 : 0),
    }));
    setSelected(null);
    setRevealed(false);
    setCurrent(pickNext(QUIZ_QUESTIONS, subspec, updated, current.id));
  }

  const poolSize = useMemo(
    () =>
      QUIZ_QUESTIONS.filter(q =>
        subspec === 'combined' ? true : q.subspecialty === subspec || q.subspecialty === 'combined',
      ).length,
    [subspec],
  );

  const isCorrect = current && selected ? selected === current.answer : null;

  return (
    <Layout
      title="Quiz"
      description="Spaced-repetition quiz over the WARWIKI corpus. Pick GURS, URPS, or Combined questions; progress is stored locally in your browser."
    >
      <main className="container margin-vert--lg" style={{ maxWidth: 760 }}>
        <h1>Quiz</h1>
        <p style={{ color: 'var(--ifm-color-emphasis-700)', fontSize: '0.95rem' }}>
          Spaced-repetition over the WARWIKI corpus. Pick a subspecialty and answer; your rating
          (Wrong / Hard / Good / Easy) drives how soon you'll see the question again. Progress is
          stored in your browser only — no account, no sync.
        </p>

        <div role="tablist" aria-label="Subspecialty" style={{ display: 'flex', gap: 8, margin: '1.25rem 0 0.5rem' }}>
          {TABS.map(t => {
            const active = subspec === t.id;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active}
                onClick={() => changeSubspec(t.id)}
                title={t.help}
                style={{
                  padding: '0.45rem 0.95rem',
                  fontSize: '0.92rem',
                  fontWeight: active ? 700 : 500,
                  background: active ? 'var(--ifm-color-primary)' : 'transparent',
                  color: active ? '#fff' : 'var(--ifm-color-emphasis-800)',
                  border: '1px solid ' + (active ? 'var(--ifm-color-primary)' : 'var(--warwiki-border)'),
                  borderRadius: 6,
                  cursor: 'pointer',
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div style={{ fontSize: '0.78rem', color: 'var(--ifm-color-emphasis-600)', marginBottom: '1rem' }}>
          {poolSize} questions in this pool · Session: {sessionStats.correct}/{sessionStats.answered} correct
        </div>

        {!current ? (
          <div
            style={{
              padding: '2rem',
              border: '1px dashed var(--warwiki-border)',
              borderRadius: 8,
              textAlign: 'center',
              color: 'var(--ifm-color-emphasis-700)',
            }}
          >
            No questions available for this subspecialty yet. Switch tabs or contribute one via
            <code> src/data/quiz/questions.ts</code>.
          </div>
        ) : (
          <article
            style={{
              border: '1px solid var(--warwiki-border)',
              borderRadius: 8,
              padding: '1.25rem 1.5rem',
              background: 'var(--ifm-background-color)',
              boxShadow: 'var(--warwiki-shadow-sm)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.72rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--ifm-color-emphasis-600)',
                marginBottom: '0.6rem',
              }}
            >
              <span>{current.subspecialty === 'combined' ? 'Combined' : current.subspecialty}</span>
              {current.tags && current.tags.length > 0 && <span>{current.tags.join(' · ')}</span>}
            </div>

            <div style={{ fontSize: '1.05rem', lineHeight: 1.5, marginBottom: '1rem' }}>
              {current.prompt}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {current.choices.map(c => {
                const isPick = selected === c.letter;
                const showRight = revealed && c.letter === current.answer;
                const showWrong = revealed && isPick && c.letter !== current.answer;
                const bg = showRight ? '#16a34a18' : showWrong ? '#dc262618' : isPick ? 'var(--warwiki-note-bg)' : 'transparent';
                const border = showRight
                  ? '#16a34a'
                  : showWrong
                  ? '#dc2626'
                  : isPick
                  ? 'var(--ifm-color-primary)'
                  : 'var(--warwiki-border)';
                return (
                  <button
                    key={c.letter}
                    type="button"
                    disabled={revealed}
                    onClick={() => setSelected(c.letter)}
                    style={{
                      textAlign: 'left',
                      padding: '0.6rem 0.9rem',
                      background: bg,
                      border: `1px solid ${border}`,
                      borderRadius: 6,
                      cursor: revealed ? 'default' : 'pointer',
                      fontSize: '0.95rem',
                      display: 'flex',
                      gap: '0.7rem',
                    }}
                  >
                    <span style={{ fontWeight: 700, color: 'var(--ifm-color-primary)' }}>{c.letter}.</span>
                    <span>{c.text}</span>
                  </button>
                );
              })}
            </div>

            {!revealed ? (
              <div style={{ display: 'flex', gap: 8, marginTop: '1rem' }}>
                <button
                  type="button"
                  disabled={!selected}
                  onClick={() => setRevealed(true)}
                  style={{
                    padding: '0.5rem 1rem',
                    fontSize: '0.92rem',
                    background: selected ? 'var(--ifm-color-primary)' : '#d1d5db',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 6,
                    cursor: selected ? 'pointer' : 'not-allowed',
                  }}
                >
                  Reveal answer
                </button>
              </div>
            ) : (
              <>
                <div
                  style={{
                    marginTop: '1rem',
                    padding: '0.75rem 1rem',
                    background: isCorrect ? '#16a34a12' : '#dc262612',
                    border: `1px solid ${isCorrect ? '#16a34a44' : '#dc262644'}`,
                    borderRadius: 6,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      color: isCorrect ? '#16a34a' : '#dc2626',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {isCorrect ? '✓ Correct' : '✗ Incorrect'} — answer: {current.answer}
                  </div>
                  <div style={{ fontSize: '0.92rem', lineHeight: 1.5 }}>{current.explanation}</div>
                  <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                    Source: <a href={current.source.href}>{current.source.label}</a>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 8,
                    marginTop: '1rem',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--ifm-color-emphasis-700)',
                      marginRight: 4,
                    }}
                  >
                    Rate to schedule next review:
                  </span>
                  {([
                    ['wrong', 'Wrong', '#dc2626'],
                    ['hard', 'Hard', '#d97706'],
                    ['good', 'Good', '#185FA5'],
                    ['easy', 'Easy', '#16a34a'],
                  ] as Array<[Rating, string, string]>).map(([r, label, color]) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => rate(r)}
                      style={{
                        padding: '0.4rem 0.9rem',
                        fontSize: '0.88rem',
                        background: color + '14',
                        color,
                        border: `1px solid ${color}66`,
                        borderRadius: 6,
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </article>
        )}

        <details style={{ marginTop: '2rem', fontSize: '0.85rem' }}>
          <summary>About this quiz</summary>
          <p>
            Questions are stored in <code>src/data/quiz/questions.ts</code> and tagged by subspecialty.
            Scheduling is SM-2-lite: Easy widens the interval the most, Wrong resets it. All state lives
            in your browser's localStorage.
          </p>
          <button
            type="button"
            onClick={() => {
              if (confirm('Reset all quiz progress?')) {
                clearProgress();
                setProgress({});
                setSessionStats({ answered: 0, correct: 0 });
                setCurrent(pickNext(QUIZ_QUESTIONS, subspec, {}));
              }
            }}
            style={{
              padding: '0.35rem 0.8rem',
              fontSize: '0.82rem',
              background: 'transparent',
              border: '1px solid var(--warwiki-border)',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            Reset progress
          </button>
        </details>
      </main>
    </Layout>
  );
}
