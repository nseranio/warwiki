import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import {siteDistance, type Origin} from '@site/src/lib/clinical-trials/filter';
import {referralSummary} from '@site/src/lib/clinical-trials/summary';
import type {IndexStudy, Manifest, StudyDetail, StudyMatch} from '@site/src/lib/clinical-trials/types';
import {hydrateDetail} from '@site/src/lib/clinical-trials/detail';
import {loadDetail, liveLookup, siteKey, type ShortlistItem} from './data';
import {CloseIcon, CopyIcon, PrintIcon, BookmarkIcon} from './Icons';
import styles from './styles.module.css';

interface Props {
  items: ShortlistItem[];
  onRemove: (nct: string) => void;
  onClear: () => void;
  manifest?: Manifest;
  origin?: Origin;
  ctxLabel?: string;
  getMatch: (nct: string) => StudyMatch | undefined;
  getStudy: (nct: string) => IndexStudy | undefined;
}

export default function Shortlist({items, onRemove, onClear, manifest, origin, ctxLabel, getMatch, getStudy}: Props) {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState<Record<string, StudyDetail | null>>({});
  const [printing, setPrinting] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const ctrl = new AbortController();
    for (const item of items) {
      if (item.nct in details) continue;
      loadDetail(item.nct, ctrl.signal)
        .then(async d => {
          const study = getStudy(item.nct);
          // Compact snapshot detail needs the index entry for its site list; otherwise ask the registry.
          if (d && (d.sites.length || study)) return hydrateDetail(d, study);
          return (await liveLookup(item.nct, ctrl.signal))?.detail ?? d;
        })
        .then(d => !ctrl.signal.aborted && setDetails(prev => ({...prev, [item.nct]: d})))
        .catch(() => !ctrl.signal.aborted && setDetails(prev => ({...prev, [item.nct]: null})));
    }
    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, items]);

  useEffect(() => {
    if (!printing) return;
    document.body.classList.add('tf-printing');
    const done = () => {
      document.body.classList.remove('tf-printing');
      setPrinting(false);
    };
    window.addEventListener('afterprint', done, {once: true});
    const t = window.setTimeout(() => window.print(), 50);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('afterprint', done);
      document.body.classList.remove('tf-printing');
    };
  }, [printing]);

  if (!items.length) return null;

  const summaries = items.map(item => {
    const d = details[item.nct];
    if (!d) return {item, text: d === null ? `${item.nct}\nRecord not available; open https://clinicaltrials.gov/study/${item.nct}` : undefined};
    const site = d.sites.find(s => siteKey(s) === item.site);
    return {item, d, text: referralSummary({detail: d, site, distance: site ? siteDistance(site, origin) : undefined, match: getMatch(item.nct)?.annotated ? getMatch(item.nct) : undefined, manifest, diseaseState: ctxLabel})};
  });
  const ready = summaries.every(s => s.text !== undefined);
  const allText = summaries.map(s => s.text ?? '').join('\n\n――――――――――――――――――――\n\n');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(allText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <>
      <div className={clsx(styles.shortlistBar, open && styles.shortlistBarOpen)}>
        <button type="button" className={styles.shortlistToggle} aria-expanded={open} onClick={() => setOpen(v => !v)}>
          <BookmarkIcon filled />
          Shortlist · {items.length} {items.length === 1 ? 'study' : 'studies'}
          <span className={styles.shortlistHint}>{open ? 'Close' : 'Review, copy or print'}</span>
        </button>
        {open ? (
          <div className={styles.shortlistPanel}>
            <p className={styles.small}>Saved on this device: study and site only. Disease details stay on this page and are not saved.</p>
            <ul className={styles.shortlistItems}>
              {summaries.map(({item, d}) => {
                const site = d?.sites.find(s => siteKey(s) === item.site);
                return (
                  <li key={item.nct}>
                    <div>
                      <span className={styles.nct}>{item.nct}</span>
                      <span className={styles.shortlistTitle}>{d ? (d.acronym ? `${d.acronym}: ` : '') + d.briefTitle : 'Loading…'}</span>
                      <span className={styles.siteMeta}>{site ? `${site.f}${site.c ? `, ${site.c}` : ''}${site.s ? `, ${site.s}` : ''}` : 'No site chosen'}</span>
                    </div>
                    <button type="button" className={styles.iconButton} onClick={() => onRemove(item.nct)} aria-label={`Remove ${item.nct} from shortlist`}><CloseIcon /></button>
                  </li>
                );
              })}
            </ul>
            <div className={styles.actions}>
              <button type="button" className={styles.btn} disabled={!ready} onClick={copy}><CopyIcon />{copied ? 'Copied' : 'Copy summaries'}</button>
              <button type="button" className={styles.btnGhost} disabled={!ready} onClick={() => setPrinting(true)}><PrintIcon />Print</button>
              <button type="button" className={styles.linkButton} onClick={onClear}>Clear shortlist</button>
            </div>
          </div>
        ) : null}
      </div>
      {printing ? (
        <div className={styles.printArea}>
          <h1>Reconstructive &amp; Functional Urology Trial Finder: referral preparation</h1>
          <p>Printed {new Date().toLocaleString()} from WARWIKI. Registry information only; eligibility and enrollment are decided by each study team.</p>
          {summaries.map(s => <pre key={s.item.nct} className={styles.printSummary}>{s.text}</pre>)}
        </div>
      ) : null}
    </>
  );
}
