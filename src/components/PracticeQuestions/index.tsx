import React from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import data from '@site/src/data/rounds-pages.json';
import styles from './styles.module.css';

// Pilot: the link shows only on these pages, and only with the count of Rounds
// questions written from this exact page (each question records its source file).
const PILOT = new Set([
  'docs/02-evaluation/ancillary-tests/urodynamics.mdx',
  'docs/03-clinical-conditions/03b-voiding-outlet/urethral-stricture.mdx',
  'docs/03-clinical-conditions/03a-storage-incontinence/sui-male.mdx',
  'docs/05-special-populations/05e-womens-health/recurrent-uti.mdx',
  'docs/04-surgical-techniques/04b-bladder-reconstruction/catheterizable-channels.mdx',
]);
const MIN = 5;

export function usePractice(): {href: string; count: number} | null {
  const {metadata} = useDoc();
  const file = metadata.source.replace(/^@site\//, '');
  const count = (data.pages as Record<string, number>)[file] ?? 0;
  if (!PILOT.has(file) || count < MIN) return null;
  const q = new URLSearchParams({page: file, from: metadata.permalink, title: metadata.title});
  return {href: `/rounds?${q.toString()}`, count};
}

export function PracticeChip(): React.ReactElement | null {
  const p = usePractice();
  if (!p) return null;
  return (
    <a className={styles.chip} href={p.href}>
      <span className={styles.chipDot} aria-hidden="true" />
      Practice {p.count} questions from this page
      <span aria-hidden="true"> →</span>
    </a>
  );
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
