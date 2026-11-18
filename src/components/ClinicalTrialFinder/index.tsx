import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import clsx from 'clsx';
import {
  VIEW_LABELS, countSites, enrollingExclusionReason, isDefaultType, matchesQuery, parseNct, studyHaystack, studySites,
  type Origin, type StatusView, type StudyHit,
} from '@site/src/lib/clinical-trials/filter';
import {lookupZip, type ZipLookup} from '@site/src/lib/clinical-trials/geo';
import {OUTCOME_ORDER, evaluateStudy, inDiseaseState} from '@site/src/lib/clinical-trials/match';
import {POOL_LABELS, POOL_ORDER} from '@site/src/lib/clinical-trials/pools';
import {formatTimestamp} from '@site/src/lib/clinical-trials/summary';
import type {
  ClinicalContext, IndexStudy, Manifest, MatchOutcome, PoolId, StudyAnnotation, StudyMatch,
} from '@site/src/lib/clinical-trials/types';
import annotationsJson from '@site/src/data/clinical-trial-finder/annotations.json';
import aliasesJson from '@site/src/data/clinical-trial-finder/aliases.json';
import {liveLookup, loadManifest, loadPool, loadZcta, readShortlist, writeShortlist, type LiveRecord, type ShortlistItem} from './data';
import {ChevronIcon, PinIcon, RefreshIcon, SearchIcon} from './Icons';
import Shortlist from './Shortlist';
import StudyPane, {OUTCOME_LABEL} from './StudyPane';
import StudyRow from './StudyRow';
import SiteMap from './SiteMap';
import {ContextFields, DEEP_DEFAULTS, STATE_LABELS, bits, contextLabel, statesFor, type DeepContexts, type State} from './contexts';
import styles from './styles.module.css';

const ANNOTATIONS = new Map((annotationsJson as StudyAnnotation[]).map(a => [a.nct, a]));
const ALIASES: string[][] = (aliasesJson as {groups: string[][]}).groups;
const RADII = [25, 50, 100, 250, 500];
const PAGE = 40;

type Sort = 'nearest' | 'updated' | 'sites';
function Segmented<T extends string>({label, value, options, onChange, compact}: {label: string; value: T; options: {value: T; label: string}[]; onChange: (v: T) => void; compact?: boolean}) {
  return (
    <div className={clsx(styles.segmented, compact && styles.segmentedCompact)} role="group" aria-label={label}>
      {options.map(o => (
        <button key={o.value} type="button" aria-pressed={value === o.value} className={clsx(styles.segment, value === o.value && styles.segmentOn)} onClick={() => onChange(o.value)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Select<T extends string>({id, label, value, options, onChange}: {id: string; label: string; value: T; options: {value: T; label: string}[]; onChange: (v: T) => void}) {
  return (
    <label className={styles.field} htmlFor={id}>
      <span className={styles.fieldLabel}>{label}</span>
      <select id={id} className={clsx(styles.select, value !== 'unknown' && styles.selectSet)} value={value} onChange={e => onChange(e.target.value as T)}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </label>
  );
}

function hoursSince(iso?: string): number | undefined {
  if (!iso) return undefined;
  const t = Date.parse(iso);
  return Number.isNaN(t) ? undefined : (Date.now() - t) / 3.6e6;
}

interface Row {
  hit: StudyHit;
  match: StudyMatch;
}

export default function ClinicalTrialFinder() {
  const [manifest, setManifest] = useState<Manifest>();
  const [manifestError, setManifestError] = useState(false);
  const [pools, setPools] = useState<Partial<Record<PoolId, IndexStudy[]>>>({});
  const [poolErrors, setPoolErrors] = useState<PoolId[]>([]);
  const [reloadKey, setReloadKey] = useState(0);

  const [pool, setPool] = useState<PoolId | 'all'>('continence');
  const [state, setState] = useState<State>('any');
  const [deep, setDeep] = useState<DeepContexts>(DEEP_DEFAULTS);

  const [zipInput, setZipInput] = useState('');
  const [zip, setZip] = useState<ZipLookup | null>(null);
  const [radius, setRadius] = useState(100);
  const [nationwide, setNationwide] = useState(false);
  const [siteQuery, setSiteQuery] = useState('');
  const [query, setQuery] = useState('');
  const [view, setView] = useState<StatusView>('recruiting');
  const [includeObservational, setIncludeObservational] = useState(false);
  const [includeNonTreatment, setIncludeNonTreatment] = useState(false);
  const [sort, setSort] = useState<Sort>('nearest');
  const [shown, setShown] = useState(PAGE);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showPane, setShowPane] = useState(false);
  const [picked, setPicked] = useState(false);
  const [tab, setTab] = useState<'list' | 'map'>('list');
  const [panel, setPanel] = useState<'disease' | 'distance' | 'status' | 'type' | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [showExcluded, setShowExcluded] = useState(false);
  const [shortlist, setShortlist] = useState<ShortlistItem[]>([]);
  const [live, setLive] = useState<{nct: string; state: 'loading' | 'done' | 'missing' | 'failed'; record?: LiveRecord} | null>(null);
  const liveSeq = useRef(0);

  const poolStates = statesFor(pool);
  const activeState: State = state !== 'any' && poolStates.includes(state) ? state : 'any';
  const ctx: ClinicalContext = useMemo(() => ({
    pool,
    state: activeState,
    ...(activeState !== 'any' ? {[activeState]: deep[activeState]} : {}),
  }), [pool, activeState, deep]);

  // Manifest, then only the pools the current view needs.
  useEffect(() => {
    const ctrl = new AbortController();
    setManifestError(false);
    loadManifest(ctrl.signal).then(m => setManifest(m)).catch(() => !ctrl.signal.aborted && setManifestError(true));
    return () => ctrl.abort();
  }, [reloadKey]);

  const needed: PoolId[] = pool === 'all' ? POOL_ORDER : [pool];
  useEffect(() => {
    if (!manifest) return;
    const ctrl = new AbortController();
    for (const p of needed) {
      if (pools[p]) continue;
      loadPool(p, ctrl.signal)
        .then(file => {
          if (file.version !== manifest.version) {
            // A deploy landed between the two requests: reload the manifest so dates and data agree.
            setReloadKey(k => k + 1);
          }
          setPools(prev => ({...prev, [p]: file.studies}));
          setPoolErrors(prev => prev.filter(x => x !== p));
        })
        .catch(() => !ctrl.signal.aborted && setPoolErrors(prev => [...new Set([...prev, p])]));
    }
    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [manifest, pool, reloadKey]);

  // Shortlist and ?nct= deep link (study identifier only).
  useEffect(() => {
    setShortlist(readShortlist());
    const nct = new URLSearchParams(window.location.search).get('nct');
    const parsed = nct ? parseNct(nct) : null;
    if (nct) {
      // Keep the study open, but drop the parameter so later searches do not carry it.
      window.history.replaceState(null, '', window.location.pathname + window.location.hash);
    }
    if (parsed) {
      setPool('all');
      setQuery(parsed);
      setView('all');
      setSelectedId(parsed);
      setPicked(true);
      setShowPane(true);
    }
  }, []);

  // ZIP lookup (the coordinate table loads only once a ZIP is entered).
  useEffect(() => {
    const value = zipInput.trim();
    if (!value) {
      setZip(null);
      return;
    }
    if (!/^\d{5}(-\d{4})?$/.test(value)) {
      setZip(value.length >= 5 ? {kind: 'invalid'} : null);
      return;
    }
    let cancelled = false;
    loadZcta()
      .then(table => !cancelled && setZip(lookupZip(value, table)))
      .catch(() => !cancelled && setZip({kind: 'noCoordinates', zip: value.slice(0, 5)}));
    return () => {
      cancelled = true;
    };
  }, [zipInput]);

  const origin: Origin | undefined = !nationwide && zip?.kind === 'ok' ? {lat: zip.lat, lon: zip.lon} : undefined;
  const zipBlocked = !nationwide && !!zip && zip.kind !== 'ok';
  const effectiveSort: Sort = !origin && sort === 'nearest' ? 'updated' : sort;

  const studies = useMemo(() => {
    const byId = new Map<string, IndexStudy>();
    for (const p of needed) for (const s of pools[p] ?? []) if (!byId.has(s.id)) byId.set(s.id, s);
    return [...byId.values()];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pools, pool]);
  const haystacks = useMemo(() => new Map(studies.map(s => [s.id, studyHaystack(s, ALIASES)])), [studies]);
  const annotationCurrent = useCallback((nct: string) => {
    const checks = manifest?.annotationChecks.filter(c => c.nct === nct) ?? [];
    return checks.length > 0 && checks.every(c => c.state === 'current');
  }, [manifest]);

  const loading = !manifestError && (!manifest || needed.some(p => !pools[p] && !poolErrors.includes(p)));
  const nctQuery = parseNct(query);

  const result = useMemo(() => {
    const rows: Row[] = [];
    const unlocatedOnly: Row[] = [];
    const hidden = {type: 0, sites: 0};
    const textActive = !!query.trim();
    for (const s of studies) {
      if (nctQuery ? s.id !== nctQuery : textActive && !matchesQuery(haystacks.get(s.id) ?? '', query)) continue;
      const annotation = ANNOTATIONS.get(s.id);
      if (!nctQuery && activeState !== 'any' && !inDiseaseState(s, activeState, annotation)) continue;
      if (!nctQuery && !isDefaultType(s, includeObservational, includeNonTreatment)) {
        hidden.type++;
        continue;
      }
      // A direct NCT lookup shows every US site, nearest first when a ZIP is set, with no radius.
      const hit = studySites(s, {view: nctQuery ? 'all' : view, origin, radius: nctQuery ? undefined : radius, siteQuery: nctQuery ? undefined : siteQuery});
      if (!hit) {
        hidden.sites++;
        continue;
      }
      const match = evaluateStudy(s, ctx, annotation, annotationCurrent(s.id));
      (hit.sites.length ? rows : unlocatedOnly).push({hit, match});
    }
    const cmp = (a: Row, b: Row) => {
      if (effectiveSort === 'nearest') return (a.hit.nearest ?? Infinity) - (b.hit.nearest ?? Infinity);
      if (effectiveSort === 'sites') return b.hit.sites.length - a.hit.sites.length;
      return (b.hit.study.upd?.d ?? '').localeCompare(a.hit.study.upd?.d ?? '');
    };
    rows.sort(cmp);
    return {rows, unlocatedOnly, hidden};
  }, [studies, haystacks, query, nctQuery, pool, activeState, includeObservational, includeNonTreatment, view, origin, radius, siteQuery, ctx, annotationCurrent, effectiveSort]);

  // Direct NCT lookup outside the snapshot: one live request for that NCT ID, newest request wins.
  useEffect(() => {
    if (!nctQuery || loading) {
      setLive(null);
      return;
    }
    const inSnapshot = studies.some(s => s.id === nctQuery) || POOL_ORDER.some(p => pools[p]?.some(s => s.id === nctQuery));
    if (inSnapshot) {
      setLive(null);
      return;
    }
    const seq = ++liveSeq.current;
    const ctrl = new AbortController();
    setLive({nct: nctQuery, state: 'loading'});
    liveLookup(nctQuery, ctrl.signal)
      .then(record => seq === liveSeq.current && setLive({nct: nctQuery, state: record ? 'done' : 'missing', record: record ?? undefined}))
      .catch(() => seq === liveSeq.current && !ctrl.signal.aborted && setLive({nct: nctQuery, state: 'failed'}));
    return () => ctrl.abort();
  }, [nctQuery, loading, studies, pools]);

  useEffect(() => {
    setShown(PAGE);
    // New filters: start again from the top result (a deep-linked NCT stays open).
    setSelectedId(id => (nctQuery && id === nctQuery ? id : null));
    if (!nctQuery) setShowPane(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool, activeState, deep, zip, radius, nationwide, siteQuery, query, view, includeObservational, includeNonTreatment, sort]);

  const detailed = activeState !== 'any';
  const groups = useMemo(() => {
    if (!detailed) return [{outcome: null as MatchOutcome | null, rows: result.rows}];
    return OUTCOME_ORDER.map(o => ({outcome: o as MatchOutcome | null, rows: result.rows.filter(r => r.match.outcome === o)})).filter(g => g.rows.length);
  }, [detailed, result.rows]);
  const counted = detailed ? result.rows.filter(r => r.match.outcome !== 'excluded') : result.rows;
  const excludedCount = result.rows.length - counted.length;
  const studyCount = counted.length;
  const siteCount = countSites(counted.map(r => r.hit));

  const save = (nct: string, site?: string) => {
    setShortlist(prev => {
      const exists = prev.find(i => i.nct === nct);
      const next = exists ? (site && exists.site !== site ? prev.map(i => (i.nct === nct ? {nct, site} : i)) : prev.filter(i => i.nct !== nct)) : [...prev, {nct, site}];
      writeShortlist(next);
      return next;
    });
  };
  const matchFor = (nct: string) => result.rows.find(r => r.hit.study.id === nct)?.match;

  const age = hoursSince(manifest?.refreshedAt);
  const stale = age !== undefined && manifest ? age > manifest.staleAfterHours : false;
  const ctxLabel = contextLabel(ctx, deep);


  /* ---------- Live lookup as a row, visible rows, selection ---------- */
  const liveRow: Row | null = useMemo(() => {
    if (!live || live.nct !== nctQuery || live.state !== 'done' || !live.record) return null;
    const hit = studySites(live.record.index, {view: 'all', origin}) ?? {study: live.record.index, sites: [], unlocated: 0};
    return {hit, match: evaluateStudy(live.record.index, ctx, ANNOTATIONS.get(live.nct))};
  }, [live, nctQuery, origin, ctx]);

  // Visual order: match groups first (relevant, clarify, registry text only, excluded), then the chosen sort.
  const orderedRows = groups.flatMap(g => (g.outcome === 'excluded' && !showExcluded ? [] : g.rows));
  const listRows: Row[] = liveRow ? [liveRow] : orderedRows;
  const paged = listRows.slice(0, shown);
  const selectedRow = listRows.find(r => r.hit.study.id === selectedId) ?? null;

  const isWide = () => typeof window !== 'undefined' && window.matchMedia('(min-width: 997px)').matches;

  // On wide screens the pane always shows a study: keep the selection inside the current results.
  useEffect(() => {
    if (loading || !listRows.length) return;
    if (selectedId && listRows.some(r => r.hit.study.id === selectedId)) return;
    if (isWide()) setSelectedId(listRows[0].hit.study.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, listRows.map(r => r.hit.study.id).join(','), selectedId]);

  const select = (nct: string, fromMap = false) => {
    setPicked(true);
    setSelectedId(nct);
    if (fromMap) setTab('list');
    if (!isWide()) {
      setShowPane(true);
      frameRef.current?.scrollIntoView({block: 'start'});
    }
    if (fromMap) {
      const i = listRows.findIndex(r => r.hit.study.id === nct);
      if (i >= shown) setShown(i + PAGE);
      window.setTimeout(() => listRef.current?.querySelector<HTMLButtonElement>(`[data-nct="${nct}"]`)?.scrollIntoView({block: 'nearest'}), 50);
    }
  };

  // Arrow keys move through the list; "/" jumps to search.
  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    e.preventDefault();
    const ids = paged.map(r => r.hit.study.id);
    const i = Math.max(0, ids.indexOf(selectedId ?? ''));
    const next = ids[Math.min(ids.length - 1, Math.max(0, i + (e.key === 'ArrowDown' ? 1 : -1)))];
    if (!next) return;
    setPicked(true);
    setSelectedId(next);
    window.setTimeout(() => listRef.current?.querySelector<HTMLButtonElement>(`[data-nct="${next}"]`)?.focus(), 0);
  };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key === '/' && !/^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName) && !t.isContentEditable) {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === 'Escape') setPanel(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* ---------- Chip labels ---------- */
  const diseaseChip = pool === 'all' ? 'All topics' : [
    activeState !== 'any' ? STATE_LABELS[activeState] : POOL_LABELS[pool],
    activeState !== 'any' ? (bits(activeState, deep).join(', ') || 'add details') : null,
  ].filter(Boolean).join(' · ');
  const distanceChip = `${nationwide || !origin ? 'Nationwide' : `Within ${radius} mi of ${zip?.kind === 'ok' ? zip.zip : ''}`}${siteQuery.trim() ? ` · ${siteQuery.trim()}` : ''}`;
  const typeChip = `${includeObservational || includeNonTreatment ? 'More study types' : 'Treatment studies'} · ${effectiveSort === 'nearest' ? 'nearest first' : effectiveSort === 'sites' ? 'most sites' : 'newest update'}`;

  const Chip = ({id, label, value, set}: {id: NonNullable<typeof panel>; label: string; value: string; set?: boolean}) => (
    <button type="button" className={clsx(styles.fchip, set && styles.fchipSet, panel === id && styles.fchipOpen)} aria-expanded={panel === id} aria-controls="tf-panel" onClick={() => setPanel(p => (p === id ? null : id))}>
      <span className={styles.fchipLabel}>{label}</span>
      <span className={styles.fchipValue}>{value}</span>
      <ChevronIcon className={clsx(styles.chev, panel === id && styles.chevOpen)} />
    </button>
  );

  const groupHint: Record<MatchOutcome, string> = {
    relevant: 'A cohort read against the registry text fits what you entered.',
    clarify: 'A cohort could fit; something it requires is not recorded or needs checking.',
    unreviewed: 'Registry wording places it in this setting; cohorts not yet read.',
    excluded: 'A known input contradicts every reviewed cohort.',
  };

  const renderList = () => {
    let left = shown;
    const blocks: React.ReactNode[] = [];
    const sourceGroups = liveRow ? [{outcome: null as MatchOutcome | null, rows: [liveRow]}] : groups;
    for (const g of sourceGroups) {
      if (g.outcome === 'excluded' && !showExcluded) {
        blocks.push(<button key="ex" type="button" className={styles.listMore} onClick={() => setShowExcluded(true)}>Show {g.rows.length} excluded by a cohort rule</button>);
        continue;
      }
      if (left <= 0) break;
      const rows = g.rows.slice(0, left);
      left -= rows.length;
      blocks.push(
        <div key={g.outcome ?? 'all'} role="group" aria-label={g.outcome ? OUTCOME_LABEL[g.outcome] : 'Results'}>
          {g.outcome ? <p className={clsx(styles.listGroup, styles[`grp_${g.outcome}`])} title={groupHint[g.outcome]}>{OUTCOME_LABEL[g.outcome]} <span className={styles.groupCount}>{g.rows.length}</span></p> : null}
          {rows.map(r => (
            <StudyRow key={r.hit.study.id} hit={r.hit} outcome={detailed ? r.match.outcome : undefined} selected={r.hit.study.id === selectedId} saved={shortlist.some(i => i.nct === r.hit.study.id)} located={!!origin} onSelect={() => select(r.hit.study.id)} />
          ))}
        </div>,
      );
    }
    if (listRows.length > shown) blocks.push(<button key="more" type="button" className={styles.listMore} onClick={() => setShown(n => n + PAGE)}>Show {Math.min(PAGE, listRows.length - shown)} more of {listRows.length - shown}</button>);
    if (result.unlocatedOnly.length && !liveRow) {
      blocks.push(
        <details key="unloc" className={styles.listUnlocated}>
          <summary>{result.unlocatedOnly.length} with sites lacking usable coordinates</summary>
          {result.unlocatedOnly.slice(0, 50).map(r => (
            <StudyRow key={r.hit.study.id} hit={r.hit} selected={r.hit.study.id === selectedId} saved={shortlist.some(i => i.nct === r.hit.study.id)} located={!!origin} onSelect={() => setSelectedId(r.hit.study.id)} />
          ))}
        </details>,
      );
    }
    return blocks;
  };
  const paneRow = selectedRow ?? result.unlocatedOnly.find(r => r.hit.study.id === selectedId) ?? null;

  const summaryLine = loading ? 'Loading registry snapshot…'
    : nctQuery && live?.nct === nctQuery ? `${nctQuery}: not in the WARWIKI snapshot; ${live.state === 'done' ? 'shown from a live registry lookup' : live.state === 'loading' ? 'looking it up live' : 'live lookup did not return a record'}`
      : zipBlocked ? 'No results until the ZIP is resolved'
        : `${studyCount} ${studyCount === 1 ? 'study' : 'studies'} · ${siteCount.toLocaleString()} ${siteCount === 1 ? 'site' : 'sites'}${origin ? ` within ${radius} mi` : ' nationwide'}${excludedCount ? ` · ${excludedCount} excluded` : ''}`;

  const zipNote = nationwide ? null
    : zip?.kind === 'invalid' ? 'Enter a 5-digit US ZIP.'
      : zip?.kind === 'noCoordinates' ? `ZIP ${zip.zip} has no Census ZIP Code Tabulation Area, so its location is unknown (often a PO-box or single-building ZIP). Enter a nearby residential ZIP, search by institution or city, or choose Nationwide.`
        : null;

  return (
    <div className={clsx(styles.finder, 'wk-wide-tool')}>
      <div className={clsx(styles.freshness, stale && styles.freshnessStale, manifestError && styles.freshnessError)} role="status">
        {manifestError ? (
          <>
            <span>The trial snapshot could not be loaded. Nothing below reflects the registry.</span>
            <button type="button" className={styles.linkButton} onClick={() => setReloadKey(k => k + 1)}><RefreshIcon />Try again</button>
          </>
        ) : manifest ? (
          <>
            <span className={styles.freshDot} aria-hidden />
            <span>
              {stale ? <strong>Snapshot is {Math.floor((age ?? 0) / 24)} days old; the daily refresh has not succeeded since. </strong> : null}
              ClinicalTrials.gov snapshot {formatTimestamp(manifest.refreshedAt)} · {manifest.totals.studies.toLocaleString()} US studies, {manifest.totals.sites.toLocaleString()} sites · opened studies are rechecked live
            </span>
          </>
        ) : <span>Loading registry snapshot…</span>}
      </div>

      <div className={styles.searchBar} role="search" aria-label="Find reconstructive and functional urology trials">
        <label className={styles.searchField} htmlFor="tf-q">
          <SearchIcon className={styles.searchIcon} />
          <span className={styles.srOnly}>Search studies</span>
          <input id="tf-q" ref={searchRef} className={styles.searchInput} type="search" placeholder="NCT number, acronym, drug, institution or investigator" value={query} onChange={e => setQuery(e.target.value)} autoComplete="off" />
          <kbd className={styles.kbd} aria-hidden>/</kbd>
        </label>
        <label className={styles.zipField} htmlFor="tf-zip">
          <PinIcon className={styles.searchIcon} />
          <span className={styles.srOnly}>US ZIP</span>
          <input id="tf-zip" className={styles.zipInputBar} inputMode="numeric" autoComplete="off" maxLength={10} placeholder="ZIP" value={zipInput}
            onChange={e => { setZipInput(e.target.value.replace(/[^\d-]/g, '')); if (nationwide) setNationwide(false); }} aria-describedby="tf-zip-msg" />
        </label>
      </div>
      {zipNote ? <p id="tf-zip-msg" className={clsx(styles.zipMsg, styles.zipMsgError)} aria-live="polite">{zipNote}</p> : <span id="tf-zip-msg" className={styles.srOnly} aria-live="polite">{origin ? `Searching within ${radius} miles of ${zip?.kind === 'ok' ? zip.zip : ''}` : ''}</span>}

      <div className={styles.chipRow}>
        <Chip id="disease" label="Disease" value={diseaseChip} set={pool !== 'all'} />
        <Chip id="distance" label="Where" value={distanceChip} set={!!origin || !!siteQuery.trim()} />
        <Chip id="status" label="Status" value={VIEW_LABELS[view]} set={view !== 'recruiting'} />
        <Chip id="type" label="Studies" value={typeChip} set={includeObservational || includeNonTreatment} />
      </div>

      {panel ? (
        <div id="tf-panel" className={styles.chipPanel}>
          {panel === 'disease' ? (
            <>
              <div className={styles.row}>
                <span className={styles.rowLabel}>Topic</span>
                <Segmented<PoolId | 'all'> label="Topic" value={pool} onChange={v => { setPool(v); setState('any'); setSelectedId(null); }}
                  options={[...POOL_ORDER.map(p => ({value: p as PoolId | 'all', label: POOL_LABELS[p]})), {value: 'all', label: 'All topics'}]} />
              </div>
              {poolStates.length ? (
                <div className={styles.row}>
                  <span className={styles.rowLabel}>Detailed filters</span>
                  <Segmented<State> label="Disease state" value={activeState} onChange={setState} compact
                    options={(['any', ...poolStates] as State[]).map(v => ({value: v, label: v === 'any' ? 'All in this group' : STATE_LABELS[v]}))} />
                </div>
              ) : null}
              {activeState !== 'any' ? <ContextFields state={activeState} deep={deep} onChange={setDeep} /> : null}
            </>
          ) : null}
          {panel === 'distance' ? (
            <div className={styles.locationRow}>
              <label className={styles.field} htmlFor="tf-radius">
                <span className={styles.fieldLabel}>Within</span>
                <select id="tf-radius" className={styles.select} value={radius} disabled={nationwide} onChange={e => setRadius(Number(e.target.value))}>
                  {RADII.map(r => <option key={r} value={r}>{r} miles</option>)}
                </select>
              </label>
              <label className={styles.toggle}>
                <input type="checkbox" checked={nationwide} onChange={e => setNationwide(e.target.checked)} />
                <span>Nationwide (ignore the ZIP)</span>
              </label>
              <label className={clsx(styles.field, styles.grow)} htmlFor="tf-site">
                <span className={styles.fieldLabel}>Institution or city</span>
                <input id="tf-site" className={styles.input} placeholder="Stanford, MD Anderson, Philadelphia" value={siteQuery} onChange={e => setSiteQuery(e.target.value)} autoComplete="off" />
              </label>
              <p className={styles.small}>{origin ? 'Distances are approximate straight-line miles from the ZIP centre to each site, not travel distance.' : 'Enter a ZIP in the search bar to sort by distance and set a radius.'}</p>
            </div>
          ) : null}
          {panel === 'status' ? (
            <div className={styles.row}>
              <span className={styles.rowLabel}>Show</span>
              <div>
                <Segmented<StatusView> label="Recruitment status" value={view} onChange={setView} compact
                  options={(['recruiting', 'unreported', 'upcoming', 'all'] as StatusView[]).map(v => ({value: v, label: VIEW_LABELS[v]}))} />
                <p className={styles.small}>
                  {view === 'recruiting' ? 'Study and site both listed as recruiting on ClinicalTrials.gov. Cohort openings and slots are confirmed only by the study team.'
                    : view === 'unreported' ? 'Recruiting studies whose registry entry gives no status for these sites. They are not counted as recruiting.'
                      : view === 'upcoming' ? 'Studies or sites listed as not yet recruiting or enrolling by invitation.'
                        : 'Every retrieved study and site, whatever its status; conflicts between study and site status are flagged.'}
                </p>
              </div>
            </div>
          ) : null}
          {panel === 'type' ? (
            <div className={styles.moreRow}>
              <label className={styles.toggle}><input type="checkbox" checked={includeNonTreatment} onChange={e => setIncludeNonTreatment(e.target.checked)} /><span>Include interventional studies that are not treatment (diagnostic, supportive care, screening)</span></label>
              <label className={styles.toggle}><input type="checkbox" checked={includeObservational} onChange={e => setIncludeObservational(e.target.checked)} /><span>Include observational studies</span></label>
              <label className={styles.field} htmlFor="tf-sort">
                <span className={styles.fieldLabel}>Sort</span>
                <select id="tf-sort" className={styles.select} value={sort} onChange={e => setSort(e.target.value as Sort)}>
                  <option value="nearest">Nearest site{!origin ? ' (needs a ZIP)' : ''}</option>
                  <option value="updated">Newest registry update</option>
                  <option value="sites">Most sites</option>
                </select>
              </label>
            </div>
          ) : null}
          <div className={styles.panelFoot}><button type="button" className={styles.btnGhost} onClick={() => setPanel(null)}>Done</button></div>
        </div>
      ) : null}

      <div className={styles.resultsHead}>
        <p className={styles.count} aria-live="polite">{summaryLine}</p>
        <div className={clsx(styles.segmented, styles.segmentedCompact, styles.tabs)} role="tablist" aria-label="Results view">
          <button type="button" role="tab" aria-selected={tab === 'list'} className={clsx(styles.segment, tab === 'list' && styles.segmentOn)} onClick={() => setTab('list')}>List</button>
          <button type="button" role="tab" aria-selected={tab === 'map'} className={clsx(styles.segment, tab === 'map' && styles.segmentOn)} onClick={() => setTab('map')}>Map</button>
        </div>
      </div>
      {poolErrors.length ? <p className={styles.warn}>Could not load {poolErrors.map(p => POOL_LABELS[p]).join(', ')}. Results are incomplete. <button type="button" className={styles.linkButton} onClick={() => { setPoolErrors([]); setReloadKey(k => k + 1); }}>Try again</button></p> : null}
      {live && live.nct === nctQuery && live.state === 'failed' ? <p className={styles.warn}>Live lookup for {live.nct} failed. Open it on <a href={`https://clinicaltrials.gov/study/${live.nct}`} target="_blank" rel="noopener noreferrer">ClinicalTrials.gov</a>.</p> : null}
      {live && live.nct === nctQuery && live.state === 'missing' ? <p className={styles.note}>ClinicalTrials.gov has no record {live.nct}.</p> : null}
      {nctQuery && result.rows.length === 1 && enrollingExclusionReason(result.rows[0].hit.study) ? <p className={styles.warn}>Not in enrolling results: {enrollingExclusionReason(result.rows[0].hit.study)}</p> : null}

      {loading && !manifestError ? <div className={styles.skeleton} aria-hidden><span /><span /><span /></div> : null}

      {!loading && !zipBlocked && !manifestError && listRows.length ? (
        tab === 'map' ? (
          <SiteMap hits={listRows.map(r => r.hit)} origin={origin} radius={origin ? radius : undefined} selectedNct={selectedId} onOpenStudy={nct => select(nct, true)} />
        ) : (
          <div ref={frameRef} className={clsx(styles.frame, showPane && styles.showPane)}>
            <div ref={listRef} className={styles.list} onKeyDown={onListKey} aria-label="Results">
              {renderList()}
            </div>
            <div className={styles.pane} aria-live="polite">
              {paneRow ? (
                <StudyPane
                  key={paneRow.hit.study.id}
                  hit={paneRow.hit}
                  match={paneRow.match}
                  annotation={ANNOTATIONS.get(paneRow.hit.study.id)}
                  ctx={ctx}
                  ctxLabel={ctxLabel}
                  origin={origin}
                  manifest={manifest}
                  saved={shortlist.some(i => i.nct === paneRow.hit.study.id)}
                  onSave={site => save(paneRow.hit.study.id, site)}
                  onBack={() => setShowPane(false)}
                  autoLive={picked}
                  live={liveRow && liveRow.hit.study.id === paneRow.hit.study.id ? live?.record : undefined}
                  notInSnapshot={!!liveRow && liveRow.hit.study.id === paneRow.hit.study.id}
                />
              ) : <p className={styles.paneEmpty}>Choose a study to see its arms, cohorts, sites and contacts.</p>}
            </div>
          </div>
        )
      ) : null}

      {!loading && !zipBlocked && !manifestError && !listRows.length && !(live && live.nct === nctQuery && live.state === 'loading') ? (
        <div className={styles.empty}>
          <p><strong>No studies match.</strong> The snapshot loaded completely; this is a real zero for these filters.</p>
          <div className={styles.emptyActions}>
            {origin && radius < 500 ? <button type="button" className={styles.btnGhost} onClick={() => setRadius(RADII[RADII.indexOf(radius) + 1] ?? 500)}>Widen to {RADII[RADII.indexOf(radius) + 1] ?? 500} miles</button> : null}
            {view === 'recruiting' ? <button type="button" className={styles.btnGhost} onClick={() => setView('unreported')}>Check sites with unreported status</button> : null}
            {view !== 'all' ? <button type="button" className={styles.btnGhost} onClick={() => setView('all')}>Show all statuses</button> : null}
            {pool !== 'all' ? <button type="button" className={styles.btnGhost} onClick={() => setPool('all')}>Search all topics</button> : null}
          </div>
        </div>
      ) : null}
      {live && live.nct === nctQuery && live.state === 'loading' ? <p className={styles.note}>{live.nct} is not in the WARWIKI snapshot. Looking it up on ClinicalTrials.gov…</p> : null}

      {(query || siteQuery) && (result.hidden.type || result.hidden.sites) && !nctQuery ? (
        <p className={styles.small}>
          {result.hidden.type ? `${result.hidden.type} more ${result.hidden.type === 1 ? 'study matches' : 'studies match'} but ${result.hidden.type === 1 ? 'is' : 'are'} not interventional treatment studies (see Studies). ` : ''}
          {result.hidden.sites ? `${result.hidden.sites} more ${result.hidden.sites === 1 ? 'matches' : 'match'} with no site in this status view${origin ? ' and radius' : ''}. ` : ''}
          {view !== 'all' && result.hidden.sites ? <button type="button" className={styles.linkButton} onClick={() => setView('all')}>Show all statuses</button> : null}
        </p>
      ) : null}

      <Shortlist
        items={shortlist}
        onRemove={nct => setShortlist(prev => { const next = prev.filter(i => i.nct !== nct); writeShortlist(next); return next; })}
        onClear={() => { setShortlist([]); writeShortlist([]); }}
        manifest={manifest}
        origin={origin}
        ctxLabel={ctxLabel}
        getMatch={matchFor}
        getStudy={nct => POOL_ORDER.map(p => pools[p]?.find(s => s.id === nct)).find(Boolean)}
      />
    </div>
  );
}
