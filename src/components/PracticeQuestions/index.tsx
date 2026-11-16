import React from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import data from '@site/src/data/rounds-pages.json';
import styles from './styles.module.css';

// Shown on any page with at least MIN Rounds questions written from it (each question
// records its source file); counts come from Rounds tools/page_counts.py.
const MIN = 5;

export function usePractice(): {href: string; count: number} | null {
  const {metadata} = useDoc();
  const file = metadata.source.replace(/^@site\//, '');
  const count = (data.pages as Record<string, number>)[file] ?? 0;
  if (count < MIN) return null;
  const q = new URLSearchParams({page: file, from: metadata.permalink, title: metadata.title});
  return {href: `/rounds?${q.toString()}`, count};
}

// The Rounds logo ring: a track, the arc in the link color and an amber tip.
function RoundsRing(): React.ReactElement {
  return (
    <svg className={styles.ring} viewBox="0 0 40 40" aria-hidden="true">
      <circle className={styles.ringTrack} cx="20" cy="20" r="15" fill="none" strokeWidth="6" />
      <path className={styles.ringArc} d="M20 5 A15 15 0 1 1 7.9 28.8" fill="none" strokeWidth="6" />
      <path className={styles.ringTip} d="M7.9 28.8 A15 15 0 0 1 5.7 24.6" fill="none" strokeWidth="6" />
    </svg>
  );
}

// Sits beside "Listen to article" in the row PageTools draws above the title.
export function PracticeChip(): React.ReactElement | null {
  const p = usePractice();
  if (!p) return null;
  return (
    <a
      className={styles.chip}
      href={p.href}
      aria-label={`Practice ${p.count} questions from this page in Rounds`}
      title="Practice questions from this page in Rounds"
    >
      <RoundsRing />
      {p.count} questions
    </a>
  );
}

// One row for the article tools (listener and practice link); wraps when the player opens.
export function PageTools({children}: {children: React.ReactNode}): React.ReactElement {
  return <div className={styles.tools}>{children}</div>;
}

export function PracticeCard(): React.ReactElement | null {
  const p = usePractice();
  if (!p) return null;
  return (
    <aside className={styles.card} aria-label="Practice questions">
      <div>
        <p className={styles.kicker}>Rounds</p>
        <p className={styles.title}>Test yourself on this page</p>
        <p className={styles.desc}>{p.count} board-style questions written from this article, each with an explanation and its source.</p>
      </div>
      <a className={styles.button} href={p.href}>Start {p.count} questions</a>
    </aside>
  );
}
