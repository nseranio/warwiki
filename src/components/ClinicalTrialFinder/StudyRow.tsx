import React from 'react';
import clsx from 'clsx';
import type {StudyHit} from '@site/src/lib/clinical-trials/filter';
import type {MatchOutcome} from '@site/src/lib/clinical-trials/types';
import {OUTCOME_LABEL} from './StudyPane';
import styles from './styles.module.css';

function miles(d?: number): string {
  if (d === undefined) return '';
  return d < 1 ? '<1 mi' : `${Math.round(d)} mi`;
}

function siteLine(hit: StudyHit, located: boolean): string {
  const first = hit.sites[0];
  if (!first) return hit.unlocated ? `${hit.unlocated} ${hit.unlocated === 1 ? 'site' : 'sites'} without usable coordinates` : 'No site in this view';
  if (located) {
    const more = hit.sites.length - 1;
    return `${first.site.f}${first.distance !== undefined ? ` · ${miles(first.distance)}` : ''}${more ? ` · +${more}` : ''}`;
  }
  if (hit.sites.length === 1) return `${first.site.f}${first.site.s ? `, ${first.site.s}` : ''}`;
  const states = new Set(hit.sites.map(h => h.site.s).filter(Boolean));
  return `${hit.sites.length} sites${states.size ? ` in ${states.size} ${states.size === 1 ? 'state' : 'states'}` : ''}`;
}

interface Props {
  hit: StudyHit;
  outcome?: MatchOutcome;
  selected: boolean;
  saved: boolean;
  located: boolean;
  onSelect: () => void;
}

/** One compact, keyboard-reachable row in the result list. */
export default function StudyRow({hit, outcome, selected, saved, located, onSelect}: Props) {
  const {study} = hit;
  const st = study.st === 'RECRUITING' ? 'rec' : study.st === 'NOT_YET_RECRUITING' || study.st === 'ENROLLING_BY_INVITATION' ? 'up' : study.st === 'SUSPENDED' ? 'paused' : 'closed';
  const drug = study.iv.filter(i => !/^(PROCEDURE|OTHER|BEHAVIORAL|DIAGNOSTIC_TEST)$/.test(i.ty ?? '')).slice(0, 2).map(i => i.n).join(', ');
  return (
    <button type="button" className={clsx(styles.srow, selected && styles.srowOn)} aria-current={selected ? 'true' : undefined} onClick={onSelect} data-nct={study.id}>
      <span className={styles.rowTop}>
        <span className={clsx(styles.rowDot, styles[`rowDot_${st}`])} aria-hidden />
        <span className={styles.rowId}>{study.acr ?? study.id}</span>
        {outcome && outcome !== 'unreviewed' ? <span className={clsx(styles.rowPill, styles[`out_${outcome}`])}>{OUTCOME_LABEL[outcome]}</span> : null}
        {saved ? <span className={styles.rowSaved}>Saved</span> : null}
      </span>
      <span className={styles.rowTitle}>{study.t}</span>
      {drug ? <span className={styles.rowDrug}>{drug}</span> : null}
      <span className={styles.rowSite}>{siteLine(hit, located)}</span>
    </button>
  );
}
