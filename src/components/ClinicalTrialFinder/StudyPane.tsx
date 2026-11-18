import React, {useEffect, useMemo, useState} from 'react';
import clsx from 'clsx';
import {enrollingExclusionReason, siteDistance, statusConflict, statusLabel, type Origin, type StudyHit} from '@site/src/lib/clinical-trials/filter';
import {STATE_NAMES, evaluateStudy} from '@site/src/lib/clinical-trials/match';
import {unescapeRegistryText} from '@site/src/lib/clinical-trials/normalize';
import {hydrateDetail} from '@site/src/lib/clinical-trials/detail';
import {contactLine, formatRegistryDate, formatTimestamp, referralSummary, roleLabel} from '@site/src/lib/clinical-trials/summary';
import type {ClinicalContext, Contact, DetailSite, Manifest, MatchOutcome, StudyAnnotation, StudyDetail, StudyMatch} from '@site/src/lib/clinical-trials/types';
import {liveLookup, loadDetail, siteKey, type LiveRecord} from './data';
import {BookmarkIcon, ChevronIcon, CopyIcon, ExternalIcon, LinkIcon, MailIcon, PhoneIcon, PinIcon} from './Icons';
import styles from './styles.module.css';

export function StatusChip({status, site}: {status?: string; site?: boolean}) {
  const cls = !status ? styles.stUnreported
    : status === 'RECRUITING' ? styles.stRecruiting
      : status === 'NOT_YET_RECRUITING' || status === 'ENROLLING_BY_INVITATION' ? styles.stUpcoming
        : status === 'SUSPENDED' || status === 'TEMPORARILY_NOT_AVAILABLE' ? styles.stPaused
          : styles.stClosed;
  return (
    <span className={clsx(styles.chip, cls)}>
      <span className={styles.dot} aria-hidden />
      {site ? `Site: ${statusLabel(status).toLowerCase()}` : `Study: ${statusLabel(status).toLowerCase()}`}
    </span>
  );
}

export const OUTCOME_LABEL: Record<MatchOutcome, string> = {
  relevant: 'Potentially relevant',
  clarify: 'Needs clarification',
  excluded: 'Excluded by a cohort rule',
  unreviewed: 'Registry text only',
};

export function OutcomePill({outcome}: {outcome: MatchOutcome}) {
  return <span className={clsx(styles.pill, styles[`out_${outcome}`])}>{OUTCOME_LABEL[outcome]}</span>;
}

const ARM_PREVIEW = 4;

function phaseText(ph?: string[]): string | undefined {
  if (!ph?.length || ph.includes('NA')) return undefined;
  return ph.map(p => p.replace('EARLY_PHASE1', 'Early phase 1').replace(/^PHASE(\d)$/, 'Phase $1')).join('/');
}

function miles(d?: number): string {
  if (d === undefined) return '';
  return d < 1 ? '<1 mi' : `${Math.round(d)} mi`;
}

function ContactList({contacts, central}: {contacts: Contact[]; central?: boolean}) {
  return (
    <ul className={styles.contactList}>
      {contacts.map((c, i) => (
        <li key={i}>
          <span className={styles.contactName}>{c.name ?? (central ? 'Central contact' : 'Listed contact')}{c.role && c.role !== 'CONTACT' ? <span className={styles.contactRole}> · {roleLabel(c.role)}</span> : null}</span>
          {c.phone ? <a className={styles.contactLink} href={`tel:${c.phone.replace(/[^\d+]/g, '')}${c.ext ? `,${c.ext.replace(/\D/g, '')}` : ''}`}><PhoneIcon />{c.phone}{c.ext ? ` ext. ${c.ext}` : ''}</a> : null}
          {c.email ? <a className={styles.contactLink} href={`mailto:${c.email}`}><MailIcon />{c.email}</a> : null}
        </li>
      ))}
    </ul>
  );
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  }
}

export interface StudyPaneProps {
  hit: StudyHit;
  match: StudyMatch;
  annotation?: StudyAnnotation;
  ctx: ClinicalContext;
  ctxLabel?: string;
  origin?: Origin;
  manifest?: Manifest;
  saved: boolean;
  /** Phones: return to the result list. */
  onBack?: () => void;
  /** Check the live registry record on open (false for the study shown by default before anyone picks one). */
  autoLive?: boolean;
  onSave: (site?: string) => void;
  /** Initial live record (direct NCT lookup outside the snapshot). */
  live?: LiveRecord;
  notInSnapshot?: boolean;
}

export default function StudyPane({hit, match, annotation, ctx, ctxLabel, origin, manifest, saved, onSave, onBack, autoLive = true, live: initialLive, notInSnapshot}: StudyPaneProps) {
  const {study} = hit;
  const [detail, setDetail] = useState<StudyDetail | null>(initialLive?.detail ?? null);
  const [detailState, setDetailState] = useState<'idle' | 'loading' | 'ready' | 'error'>(initialLive ? 'ready' : 'idle');
  const [live, setLive] = useState<LiveRecord | null>(initialLive ?? null);
  const [liveState, setLiveState] = useState<'idle' | 'checking' | 'done' | 'failed' | 'missing'>(initialLive ? 'done' : 'idle');
  // Default to the nearest recruiting site when there is one (direct lookups list every status).
  const firstSite = hit.sites.find(h => h.site.st === 'RECRUITING') ?? hit.sites[0];
  const firstKey = firstSite ? siteKey(firstSite.site) : undefined;
  const [picked, setPicked] = useState<string | undefined>();
  // Until the reader picks a site, the nearest qualifying site is selected (it changes with the ZIP and filters).
  const selected = picked ?? firstKey;
  const setSelected = (key: string) => setPicked(key);
  const [showAllSites, setShowAllSites] = useState(false);
  const [openArms, setOpenArms] = useState<Record<number, boolean>>({});
  const [allArms, setAllArms] = useState(false);
  const [liveWanted, setLiveWanted] = useState(autoLive);
  useEffect(() => { if (autoLive) setLiveWanted(true); }, [autoLive]);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (initialLive) return;
    // Wait until the selection settles (arrowing through the list), then load; a superseded
    // response is ignored rather than aborted.
    let current = true;
    setDetailState('loading');
    const timer = window.setTimeout(() => {
      loadDetail(study.id)
        .then(d => {
          if (!current) return;
          setDetail(d ? hydrateDetail(d, study) : null);
          setDetailState(d ? 'ready' : 'error');
        })
        .catch(() => current && setDetailState('error'));
    }, 250);
    return () => {
      current = false;
      window.clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [study.id, initialLive]);

  // Live registry recheck: only for a study someone opened (sends the NCT ID only).
  useEffect(() => {
    if (initialLive || !liveWanted) return;
    let current = true;
    const timer = window.setTimeout(() => {
      setLiveState('checking');
      liveLookup(study.id)
        .then(r => {
          if (!current) return;
          setLive(r);
          setLiveState(r ? 'done' : 'missing');
        })
        .catch(() => current && setLiveState('failed'));
    }, 250);
    return () => {
      current = false;
      window.clearTimeout(timer);
    };
  }, [study.id, initialLive, liveWanted]);

  const liveChanged = !!live && !!detail && !initialLive && (
    live.detail.status.lastUpdatePosted?.d !== detail.status.lastUpdatePosted?.d || live.detail.status.overall !== detail.status.overall || live.detail.eh !== detail.eh
  );
  /** Show the live record when it differs from the snapshot. */
  const shown: StudyDetail | null = liveChanged ? live.detail : detail;

  const liveMatch: StudyMatch = useMemo(() => {
    if (!liveChanged || !live) return match;
    return evaluateStudy({...study, eh: live.detail.eh}, ctx, annotation);
  }, [liveChanged, live, match, study, ctx, annotation]);
  const m = liveChanged ? liveMatch : match;

  const sitesByKey = useMemo(() => new Map((shown?.sites ?? []).map(s => [siteKey(s), s])), [shown]);
  const selectedSite: DetailSite | undefined = selected ? sitesByKey.get(selected) : undefined;
  const selectedDistance = selectedSite ? siteDistance(selectedSite, origin) : undefined;

  const ivs = study.iv.filter(i => !/^(PROCEDURE|OTHER|BEHAVIORAL|DIAGNOSTIC_TEST)$/.test(i.ty ?? '')).slice(0, 4);
  const nearest = hit.sites[0];
  const phase = phaseText(study.ph);
  const exclusion = enrollingExclusionReason(study);
  const titleId = `tf-${study.id}-title`;

  const summary = () => shown ? referralSummary({
    detail: shown,
    site: selectedSite,
    distance: selectedDistance,
    match: m.annotated ? m : undefined,
    manifest,
    diseaseState: ctxLabel,
    liveCheckedAt: live?.checkedAt,
  }) : '';

  const flash = (what: string) => {
    setCopied(what);
    window.setTimeout(() => setCopied(null), 2200);
  };

  const otherSites = (shown?.sites ?? []).filter(s => !hit.sites.some(h => siteKey(h.site) === siteKey(s)));

  return (
    <section className={styles.paneInner} aria-labelledby={titleId}>
      {onBack ? <button type="button" className={styles.backButton} onClick={onBack}><ChevronIcon className={styles.backChev} />Back to results</button> : null}
      <div className={styles.cardTop}>
        <StatusChip status={study.st} />
        {phase ? <span className={styles.meta}>{phase}</span> : null}
        {study.type !== 'INTERVENTIONAL' ? <span className={styles.tag}>{study.type === 'OBSERVATIONAL' ? 'Observational' : study.type.toLowerCase()}</span> : null}
        {study.pp && study.pp !== 'TREATMENT' && study.type === 'INTERVENTIONAL' ? <span className={styles.tag}>{study.pp.replace(/_/g, ' ').toLowerCase()}</span> : null}
        <span className={styles.nct}>{study.id}</span>
      </div>
      <h2 id={titleId} className={styles.paneTitle} tabIndex={-1}>
        {study.acr && !study.t.toLowerCase().startsWith(study.acr.toLowerCase()) ? <span className={styles.acr}>{study.acr}</span> : null}
        {study.t}
      </h2>
      {ivs.length ? (
        <div className={styles.ivRow}>
          {ivs.map((i, k) => <span key={k} className={styles.iv}>{i.n}</span>)}
        </div>
      ) : null}
      {nearest?.conflict ? <p className={styles.conflict}>{nearest.conflict}</p> : null}
      {notInSnapshot ? <p className={styles.note}>Found by live NCT lookup; not in the current GU snapshot. {exclusion ?? ''}</p> : null}
      {m.annotated || (!!ctx.state && ctx.state !== 'any') ? (
        <div className={styles.matchRow}>
          <OutcomePill outcome={m.outcome} />
          <span className={styles.matchReason}>{m.cohorts.length ? m.cohorts.filter(c => c.outcome === m.outcome).map(c => c.label).join('; ') : m.unknowns[0] ?? m.reasons[0]}</span>
        </div>
      ) : null}
      <div className={styles.actions}>
        <button type="button" className={styles.btn} onClick={async () => (await copyText(summary())) && flash('summary')}>
          <CopyIcon />{copied === 'summary' ? 'Copied' : 'Copy referral summary'}
        </button>
        <button type="button" className={clsx(styles.btnGhost, saved && styles.btnSaved)} aria-pressed={saved} onClick={() => onSave(selected)}>
          <BookmarkIcon filled={saved} />{saved ? 'Saved' : 'Save with this site'}
        </button>
        <a className={styles.btnGhost} href={`https://clinicaltrials.gov/study/${study.id}`} target="_blank" rel="noopener noreferrer">
          Registry<ExternalIcon />
        </a>
      </div>

      {(
        <div className={styles.detail}>
          <div className={styles.liveLine} role="status">
            {liveState === 'idle' && !initialLive ? <>Snapshot of {formatTimestamp(manifest?.refreshedAt)}. <button type="button" className={styles.linkButton} onClick={() => setLiveWanted(true)}>Check the live registry record</button></>
              : liveState === 'checking' ? 'Checking the live registry record…'
              : liveState === 'failed' ? `Live check unavailable; showing the snapshot of ${formatTimestamp(manifest?.refreshedAt)}.`
                : liveState === 'missing' ? 'ClinicalTrials.gov did not return this record on a live check.'
                  : live && liveChanged ? <strong className={styles.liveChanged}>The registry record changed after the snapshot (last update posted {formatRegistryDate(live.detail.status.lastUpdatePosted)}). Showing the live record, checked {formatTimestamp(live.checkedAt)}.</strong>
                    : live ? `Live registry check ${formatTimestamp(live.checkedAt)}: matches the snapshot.` : null}
          </div>

          {detailState === 'loading' && !shown ? <p className={styles.note}>Loading study record…</p> : null}
          {detailState === 'error' && !shown ? <p className={styles.note}>The study record could not be loaded. The registry link above opens it on ClinicalTrials.gov.</p> : null}

          {shown ? (
            <>
              <dl className={styles.facts}>
                {shown.status.whyStopped || shown.status.overall !== study.st ? <div><dt>Overall status</dt><dd><StatusChip status={shown.status.overall} />{shown.status.whyStopped ? <span className={styles.small}> {shown.status.whyStopped}</span> : null}</dd></div> : null}
                <div><dt>Last update posted</dt><dd>{formatRegistryDate(shown.status.lastUpdatePosted)}</dd></div>
                <div><dt>Status verified</dt><dd>{formatRegistryDate(shown.status.verified)}</dd></div>
                {shown.design.enrollment?.count ? <div><dt>Enrollment</dt><dd>{shown.design.enrollment.count}{shown.design.enrollment.type === 'ESTIMATED' ? ' (target)' : ''}</dd></div> : null}
                {shown.sponsor ? <div><dt>Sponsor</dt><dd>{shown.sponsor}</dd></div> : null}
                {shown.ids?.length ? <div><dt>Other IDs</dt><dd>{shown.ids.join(', ')}</dd></div> : null}
              </dl>

              {shown.arms?.length || shown.interventions.length ? (
                <section className={styles.block}>
                  <h4 className={styles.h4}>Arms and interventions</h4>
                  {shown.arms?.length ? (
                    <>
                      <ul className={styles.armList}>
                        {(allArms ? shown.arms : shown.arms.slice(0, ARM_PREVIEW)).map((a, i) => {
                          const named = (a.interventions ?? []).filter(n => !/^(Procedure|Other|Behavioral|Diagnostic Test):/i.test(n)).map(n => n.replace(/^[A-Za-z ]+: /, ''));
                          const rest = (a.interventions ?? []).length - named.length;
                          const open = !!openArms[i];
                          return (
                            <li key={i} className={styles.arm}>
                              <div className={styles.armHead}>
                                <span className={styles.armLabel}>{a.label}</span>
                                {a.type ? <span className={styles.tag}>{a.type.replace(/_/g, ' ').toLowerCase()}</span> : null}
                                {a.description ? (
                                  <button type="button" className={styles.armToggle} aria-expanded={open} onClick={() => setOpenArms(o => ({...o, [i]: !o[i]}))}>
                                    {open ? 'Hide details' : 'Details'}<ChevronIcon className={clsx(styles.chev, open && styles.chevOpen)} />
                                  </button>
                                ) : null}
                              </div>
                              {named.length || rest ? <p className={styles.armIvs}>{named.join(' · ')}{rest ? <span className={styles.armRest}>{named.length ? ' · ' : ''}+{rest} {rest === 1 ? 'procedure' : 'procedures'}</span> : null}</p> : null}
                              {open && a.description ? <p className={styles.armDesc}>{a.description}</p> : null}
                            </li>
                          );
                        })}
                      </ul>
                      <div className={styles.armFoot}>
                        {shown.arms.length > ARM_PREVIEW ? <button type="button" className={styles.linkButton} aria-expanded={allArms} onClick={() => setAllArms(v => !v)}>{allArms ? 'Show fewer arms' : `Show all ${shown.arms.length} arms`}</button> : null}
                        {shown.arms.some(a => a.description) ? (
                          <button type="button" className={styles.linkButton} onClick={() => {
                            const every = shown.arms!.every((x, i) => !x.description || openArms[i]);
                            setOpenArms(every ? {} : Object.fromEntries(shown.arms!.map((_, i) => [i, true])));
                            if (!every) setAllArms(true);
                          }}>{shown.arms.every((x, i) => !x.description || openArms[i]) ? 'Collapse all details' : 'Expand all details'}</button>
                        ) : null}
                      </div>
                    </>
                  ) : <p className={styles.armIvs}>{shown.interventions.map(i => i.name).join(' · ')}</p>}
                </section>
              ) : null}

              <div className={styles.twoCol}>
                <section>
                  <h4 className={styles.h4}>Why it is listed</h4>
                  <ul className={styles.reasons}>
                    {(m.reasons.length ? m.reasons : ['Retrieved by the registry search for this cancer.']).map((r, i) => <li key={i}>{r}</li>)}
                    {nearest && nearest.site.st === 'RECRUITING' && study.st === 'RECRUITING' ? <li>Registry lists {nearest.site.f} as recruiting.</li> : null}
                  </ul>
                </section>
                <section>
                  <h4 className={styles.h4}>Still to confirm with the study team</h4>
                  <ul className={styles.unknowns}>
                    {m.unknowns.map((u, i) => <li key={`u${i}`}>{u}</li>)}
                    <li>Cohort opening at the chosen site: unconfirmed.</li>
                    <li>Slot availability: not reported by the registry.</li>
                    <li>Eligibility: decided by the study team on the full protocol.</li>
                  </ul>
                </section>
              </div>

              {annotation ? (
                <section className={styles.block}>
                  <h4 className={styles.h4}>Cohorts described in the eligibility criteria</h4>
                  {m.annotationState === 'criteriaChanged' ? (
                    <p className={styles.warn}>The eligibility text changed after these cohorts were read on {formatRegistryDate(annotation.reviewedOn)}. They are shown for reference and are not used to sort or exclude until rechecked.</p>
                  ) : null}
                  {[...annotation.cohorts].sort((a, b) => {
                    const rank = {relevant: 0, clarify: 1, excluded: 2} as Record<string, number>;
                    return (rank[m.cohorts.find(x => x.label === a.label)?.outcome ?? ''] ?? 3) - (rank[m.cohorts.find(x => x.label === b.label)?.outcome ?? ''] ?? 3);
                  }).map((c, i) => {
                    const r = m.cohorts.find(x => x.label === c.label);
                    return (
                      <div key={i} className={styles.cohort}>
                        <div className={styles.cohortHead}>
                          <span className={styles.cohortLabel}>{c.label}</span>
                          {r ? <OutcomePill outcome={r.outcome} /> : null}
                          <span className={styles.tagMuted}>Cohort opening unconfirmed</span>
                        </div>
                        <p className={styles.cohortDesc}>{c.description}</p>
                        {r ? (
                          <ul className={styles.cohortReasons}>
                            {r.reasons.map((x, k) => <li key={`r${k}`}>{x}</li>)}
                            {r.unknowns.map((x, k) => <li key={`k${k}`} className={styles.unknownItem}>{x}</li>)}
                          </ul>
                        ) : null}
                        {c.passages.map((p, k) => <blockquote key={k} className={styles.passage}>{unescapeRegistryText(p)}</blockquote>)}
                        <p className={styles.source}>{c.section}, ClinicalTrials.gov record posted {formatRegistryDate(annotation.sourceUpdate)}.{c.openingNote ? ` ${c.openingNote}` : ''}</p>
                      </div>
                    );
                  })}
                  {(annotation.notFor ?? []).map((n, i) => (
                    <div key={`n${i}`} className={styles.cohort}>
                      <div className={styles.cohortHead}><span className={styles.cohortLabel}>Not a {STATE_NAMES[n.state]} study</span><OutcomePill outcome="excluded" /></div>
                      <p className={styles.cohortDesc}>{n.reason}</p>
                      <blockquote className={styles.passage}>{unescapeRegistryText(n.passage)}</blockquote>
                    </div>
                  ))}
                  <p className={styles.source}>Read against the registry text on {formatRegistryDate(annotation.reviewedOn)} ({annotation.reviewer}). {annotation.reviewStatus === 'clinician-reviewed' ? 'Clinician reviewed.' : 'Not clinician reviewed.'}</p>
                  {annotation.notes?.length ? <ul className={styles.notesList}>{annotation.notes.map((n, i) => <li key={i}>{n}</li>)}</ul> : null}
                </section>
              ) : null}

              <section className={styles.block}>
                <h4 className={styles.h4}>{hit.sites.length ? `Sites in this search (${hit.sites.length})` : 'Sites'}</h4>
                {hit.sites.length ? (
                  <ul className={styles.siteList}>
                    {hit.sites.map(h => {
                      const key = siteKey(h.site);
                      return (
                        <li key={key}>
                          <button type="button" className={clsx(styles.siteButton, selected === key && styles.siteSelected)} aria-pressed={selected === key} onClick={() => setSelected(key)}>
                            <span className={styles.siteName}>{h.site.f}</span>
                            <span className={styles.siteMeta}>{[h.site.c, h.site.s].filter(Boolean).join(', ')}{h.distance !== undefined ? ` · ${miles(h.distance)}` : ''}</span>
                            <StatusChip status={h.site.st} site />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : <p className={styles.note}>No site in this search. Other US sites are listed below with their registry status.</p>}
                {otherSites.length ? (
                  <>
                    <button type="button" className={styles.linkButton} onClick={() => setShowAllSites(v => !v)} aria-expanded={showAllSites}>
                      {showAllSites ? 'Hide other US sites' : `Show the other ${otherSites.length} US ${otherSites.length === 1 ? 'site' : 'sites'} (any status)`}
                    </button>
                    {showAllSites ? (
                      <ul className={styles.siteList}>
                        {otherSites.sort((a, b) => (siteDistance(a, origin) ?? Infinity) - (siteDistance(b, origin) ?? Infinity) || a.f.localeCompare(b.f)).map(s => {
                          const key = siteKey(s);
                          const d = siteDistance(s, origin);
                          const conflict = statusConflict(study, s);
                          return (
                            <li key={key}>
                              <button type="button" className={clsx(styles.siteButton, selected === key && styles.siteSelected)} aria-pressed={selected === key} onClick={() => setSelected(key)}>
                                <span className={styles.siteName}>{s.f}</span>
                                <span className={styles.siteMeta}>{[s.c, s.s].filter(Boolean).join(', ')}{d !== undefined ? ` · ${miles(d)}` : s.g === 'bad' ? ' · distance withheld (registry coordinates and ZIP disagree)' : ''}</span>
                                <StatusChip status={s.st} site />
                                {conflict ? <span className={styles.conflictSmall}>{conflict}</span> : null}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </>
                ) : null}
                {shown.nonUs ? <p className={styles.small}>{shown.nonUs} non-US {shown.nonUs === 1 ? 'site is' : 'sites are'} listed on the registry and not shown here.</p> : null}
              </section>

              <section className={styles.contactPanel} aria-live="polite">
                {selectedSite ? (
                  <>
                    <h4 className={styles.h4}>{selectedSite.f}</h4>
                    <p className={styles.siteMeta}>
                      {[selectedSite.c, selectedSite.s, selectedSite.z].filter(Boolean).join(', ')}
                      {selectedDistance !== undefined ? ` · about ${miles(selectedDistance)} straight-line` : selectedSite.g === 'bad' ? ' · distance withheld: registry coordinates and ZIP disagree' : ''}
                    </p>
                    <p><StatusChip status={selectedSite.st} site /> {statusConflict(study, selectedSite) ? <span className={styles.conflictSmall}>{statusConflict(study, selectedSite)}</span> : null}</p>
                    {(selectedSite.contacts ?? []).some(c => c.phone || c.email) ? (
                      <>
                        <p className={styles.contactHead}>Listed for this site</p>
                        <ContactList contacts={(selectedSite.contacts ?? []).filter(c => c.phone || c.email)} />
                      </>
                    ) : <p className={styles.note}>The registry lists no phone or email for this site.</p>}
                    {(selectedSite.pi ?? []).length ? <p className={styles.small}>Site principal investigator: {(selectedSite.pi ?? []).join(', ')}</p> : null}
                  </>
                ) : <p className={styles.note}>Choose a site to see its listed contacts.</p>}
                {(shown.central ?? []).some(c => c.phone || c.email) ? (
                  <>
                    <p className={styles.contactHead}>Central study contact (not site-specific)</p>
                    <ContactList contacts={(shown.central ?? []).filter(c => c.phone || c.email)} central />
                  </>
                ) : null}
                {shown.officials?.length ? <p className={styles.small}>Study leadership: {shown.officials.map(o => [o.name, o.role && roleLabel(o.role), o.affiliation].filter(Boolean).join(', ')).join('; ')}</p> : null}
              </section>

              <details className={styles.disclosure}>
                <summary>Eligibility criteria (registry text)</summary>
                <p className={styles.small}>
                  {[shown.eligibility.sex && `Sex: ${shown.eligibility.sex.toLowerCase()}`, shown.eligibility.minimumAge && `Minimum age: ${shown.eligibility.minimumAge}`, shown.eligibility.maximumAge && `Maximum age: ${shown.eligibility.maximumAge}`].filter(Boolean).join(' · ')}
                </p>
                <div className={styles.criteria}>{unescapeRegistryText(shown.eligibility.text) ?? 'No eligibility text in the registry record.'}</div>
              </details>
              {shown.documents?.length ? (
                <p className={styles.small}>Registry documents: {shown.documents.map((d, i) => <React.Fragment key={d.url}>{i ? ' · ' : ''}<a href={d.url} target="_blank" rel="noopener noreferrer">{d.label}</a></React.Fragment>)}</p>
              ) : null}

              <div className={styles.actions}>
                <button type="button" className={styles.btnGhost} onClick={async () => (await copyText(`${window.location.origin}${window.location.pathname}?nct=${study.id}`)) && flash('link')}>
                  <LinkIcon />{copied === 'link' ? 'Link copied' : 'Copy study link'}
                </button>
              </div>
            </>
          ) : null}
        </div>
      )}
    </section>
  );
}
