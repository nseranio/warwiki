import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import groups from '../data/clinical-evidence/timeline-groups.json';
import {decisionById, decisions, events, primaryReport, trialById, trials} from '../data/clinical-evidence';
import type {Trial} from '../data/clinical-evidence/types';
import {areaMatches, families, familyOf} from '../data/clinical-evidence/families';
import {VerdictChip} from './EvidenceBits';
import TrialQuickHit from './TrialQuickHit';
import styles from './EvidenceExplorer.module.css';

/** Clinical Evidence library (owner, November 18, after the WHITWIKI Clinical Trial Library: "being able to nimbly go
 *  between searching and looking at trials is the goal"). One search and one result list with the selected trial's
 *  summary beside it; on phones the summary replaces the list. A decision question is a filter that turns the list into
 *  its timeline (oldest first, by year, with approvals inline). Search, area, question, order, result and trial live in
 *  the URL (?q=&area=&question=&sort=&result=&trial=), so Back and shared links return to the same place. Older links
 *  still land: #<decision id> opens that question, #<trial id> selects the trial, and Journal Club's #trial-<id>
 *  (used by the retired Anki decks) goes on to the trial's page. */
type Group = {id: string; label: string; items: [string, string][]};
type Sort = 'auto' | 'new' | 'old';
type State = {q: string; area: string; question: string; trial: string | null; sort: Sort; result: string};

const timelineGroups = groups as Group[];
const EMPTY: State = {q: '', area: 'all', question: 'all', trial: null, sort: 'auto', result: 'all'};
// Result filter order and labels (verdict values in the trial records).
const RESULTS: {id: string; label: string}[] = [{id: 'positive', label: 'Positive'}, {id: 'negative', label: 'Negative'}, {id: 'noninferior', label: 'Noninferior'}, {id: 'mixed', label: 'Mixed'}, {id: 'inconclusive', label: 'Inconclusive'}, {id: 'descriptive', label: 'Descriptive'}];
const NARROW = '(max-width: 996px)';

const year = (trial: Trial) => primaryReport(trial).published.slice(0, 4);
const words = (value: string) => value.toLowerCase().trim().split(/\s+/).filter(Boolean);
const questionTitle = (id: string) => timelineGroups.flatMap(group => group.items).find(([key]) => key === id)?.[1] ?? decisionById(id)?.question ?? id;
const haystacks = new Map(trials.map(trial => [trial.id, `${trial.name} ${trial.aliases.join(' ')} ${trial.nct ?? ''} ${trial.takeaway} ${trial.question} ${trial.design.population ?? ''} ${trial.design.arms.map(arm => arm.label).join(' ')} ${trial.decisions.map(item => `${questionTitle(item.id)} ${decisionById(item.id)?.title ?? ''}`).join(' ')}`.toLowerCase()]));
const areaLabel = (id: string) => timelineGroups.find(group => group.id === id)?.label ?? id;
const validArea = (value: string) => value === 'all' || timelineGroups.some(group => group.id === value) || families.some(family => family.id === value);

function readUrl(): State {
  const params = new URLSearchParams(window.location.search);
  const hash = decodeURIComponent(window.location.hash.slice(1));
  const area = params.get('area') ?? 'all';
  let question = params.get('question') ?? 'all';
  let trial = params.get('trial');
  // Older links: #<decision id> opened a timeline; #<trial id> pointed at a trial.
  if (hash && decisions.some(item => item.id === hash)) question = hash;
  else if (hash && !trial && trialById(hash)) trial = hash;
  const sort = params.get('sort');
  const result = params.get('result');
  return {
    q: params.get('q') ?? '',
    area: validArea(area) ? area : 'all',
    question: question === 'all' || decisions.some(item => item.id === question) ? question : 'all',
    trial,
    sort: sort === 'new' || sort === 'old' ? sort : 'auto',
    result: RESULTS.some(item => item.id === result) ? result! : 'all',
  };
}

function writeUrl(state: State, push: boolean) {
  const url = new URL(window.location.href);
  url.search = '';
  url.hash = '';
  const set = (key: string, value: string | null, empty: string | null) => { if (value && value !== empty) url.searchParams.set(key, value); };
  set('q', state.q.trim(), '');
  set('area', state.area, 'all');
  set('question', state.question, 'all');
  set('sort', state.sort, 'auto');
  set('result', state.result, 'all');
  set('trial', state.trial, null);
  if (url.toString() === window.location.href) return;
  window.history[push ? 'pushState' : 'replaceState'](null, '', url.toString());
}

function useNarrow() {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const query = window.matchMedia(NARROW);
    const update = () => setNarrow(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return narrow;
}

export default function EvidenceExplorer() {
  const [state, setState] = useState<State>(EMPTY);
  const [ready, setReady] = useState(false);
  const narrow = useNarrow();
  const [detail, setDetail] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    // Journal Club links (/docs/journal-club#trial-<id>, redirected here) go on to the trial's own page.
    const legacy = decodeURIComponent(window.location.hash.slice(1)).match(/^trial-(.+)$/);
    const target = legacy ? trialById(legacy[1]) : undefined;
    if (target?.page) {
      window.location.replace(target.page);
      return;
    }
    const load = () => { const next = readUrl(); setState(next); setDetail(Boolean(next.trial) && window.matchMedia(NARROW).matches); };
    load();
    // An older #decision or #trial link becomes the equivalent query string, so the address bar is shareable.
    if (window.location.hash) writeUrl(readUrl(), false);
    setReady(true);
    window.addEventListener('popstate', load);
    return () => window.removeEventListener('popstate', load);
  }, []);

  const update = useCallback((patch: Partial<State>, push = false) => {
    setState(prev => {
      const next = {...prev, ...patch};
      writeUrl(next, push);
      return next;
    });
  }, []);

  const family = familyOf(state.area);
  const areaQuestions = useMemo(() => decisions.filter(item => areaMatches(state.area, item.area)), [state.area]);
  const query = words(state.q);
  // Newest first by default; a question opens oldest first, as a timeline. The switch overrides either.
  const newest = state.sort === 'auto' ? state.question === 'all' : state.sort === 'new';

  const {shown, counts} = useMemo(() => {
    const pool = trials.filter(trial => trial.area.some(value => areaMatches(state.area, value))
      && (state.question === 'all' || trial.decisions.some(item => item.id === state.question))
      && query.every(word => haystacks.get(trial.id)!.includes(word)));
    const sign = newest ? -1 : 1;
    const order = (a: Trial, b: Trial) => sign * primaryReport(a).published.localeCompare(primaryReport(b).published) || a.name.localeCompare(b.name);
    return {
      counts: Object.fromEntries(RESULTS.map(item => [item.id, pool.filter(trial => trial.verdict === item.id).length])) as Record<string, number>,
      shown: pool.filter(trial => state.result === 'all' || trial.verdict === state.result).sort(order),
    };
  }, [state.q, state.area, state.question, state.result, newest]);

  const ids = shown.map(item => item.id);
  const selected = state.trial && ids.includes(state.trial) ? state.trial : (narrow ? null : ids[0] ?? null);
  const timeline = state.question !== 'all';
  const approvals = timeline && !query.length && state.result === 'all'
    ? events.filter(event => event.kind === 'regulatory' && event.decisions.includes(state.question)) : [];

  // The area filter clears a question that belongs to another area.
  useEffect(() => {
    if (ready && state.question !== 'all' && !areaQuestions.some(item => item.id === state.question)) update({question: 'all'});
  }, [state.area]);

  const choose = (id: string) => {
    if (narrow) {
      update({trial: id}, true);
      pushed.current = true;
      setDetail(true);
      // The pane replaces the list: bring its top (the Results link) into view.
      requestAnimationFrame(() => frameRef.current?.scrollIntoView({block: 'start'}));
    } else update({trial: id});
  };
  const step = (delta: number) => {
    if (!ids.length) return;
    const index = Math.max(0, Math.min(ids.length - 1, ids.indexOf(selected ?? '') + delta));
    update({trial: ids[index]});
    requestAnimationFrame(() => listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({block: 'nearest'}));
  };
  const showQuestion = (id: string) => {
    const owner = timelineGroups.find(group => group.items.some(([key]) => key === id));
    update({question: id, q: '', result: 'all', sort: 'auto', area: owner && !areaMatches(state.area, owner.id) ? owner.id : state.area});
    setDetail(false);
    pushed.current = false;
    requestAnimationFrame(() => { if (narrow) topRef.current?.scrollIntoView({block: 'start'}); listRef.current?.scrollTo({top: 0}); });
  };
  const setArea = (value: string) => update({area: value, trial: null});
  const sortNote = newest ? 'newest first' : timeline ? 'oldest first, as a timeline' : 'oldest first';

  return <div className={`${styles.explorer} wk-wide-tool`} ref={topRef}>
    <div className={styles.toolbar}>
      <input className={styles.search} type="search" value={state.q} aria-label="Search trials"
        placeholder="Search trials, treatments, NCT"
        onChange={event => update({q: event.target.value, trial: null})}
        onKeyDown={event => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); step(event.key === 'ArrowDown' ? 1 : -1); }
          if (event.key === 'Enter' && narrow && selected) choose(selected);
        }} />
      <div className="wk-ev-tlb-filter" role="group" aria-label="Show area">
        <div className="wk-ev-tlb-families">
          {[{id: 'all', label: 'All'}, ...families].map(item => <button type="button" key={item.id}
            aria-pressed={item.id === 'all' ? state.area === 'all' : family?.id === item.id}
            onClick={() => setArea(item.id)}>{item.label}</button>)}
        </div>
        {family && <div className="wk-ev-tlb-areas">
          <button type="button" aria-pressed={state.area === family.id} onClick={() => setArea(family.id)}>All {family.label.toLowerCase()}</button>
          {family.areas.map(id => <button type="button" key={id} aria-pressed={state.area === id} onClick={() => setArea(id)}>{areaLabel(id)}</button>)}
        </div>}
      </div>
      <div className={styles.row}>
        <label className={styles.question}>
          <span className={styles.visuallyHidden}>Question</span>
          <select value={state.question} onChange={event => { update({question: event.target.value, sort: 'auto', trial: null}); setDetail(false); listRef.current?.scrollTo({top: 0}); }}>
            <option value="all">All questions</option>
            {timelineGroups.filter(group => areaMatches(state.area, group.id)).map(group => <optgroup key={group.id} label={group.label}>
              {group.items.filter(([id]) => areaQuestions.some(item => item.id === id)).map(([id, title]) => <option key={id} value={id}>{title}</option>)}
            </optgroup>)}
          </select>
        </label>
        <div className={styles.sort} role="group" aria-label="Order">
          <button type="button" aria-pressed={newest} onClick={() => update({sort: timeline ? 'new' : 'auto', trial: null})}>Newest</button>
          <button type="button" aria-pressed={!newest} onClick={() => update({sort: timeline ? 'auto' : 'old', trial: null})}>Oldest</button>
        </div>
      </div>
      <div className={styles.chips} role="group" aria-label="Result">
        <button type="button" aria-pressed={state.result === 'all'} onClick={() => update({result: 'all', trial: null})}>All results</button>
        {RESULTS.filter(item => counts[item.id] > 0 || state.result === item.id).map(item => <button type="button" key={item.id} aria-pressed={state.result === item.id}
          onClick={() => update({result: state.result === item.id ? 'all' : item.id, trial: null})}>{item.label} <span className={styles.n}>{counts[item.id]}</span></button>)}
      </div>
    </div>

    <div className={`${styles.frame} ${narrow && detail ? styles.showPane : ''}`} ref={frameRef}>
      <div className={styles.list} ref={listRef} role="listbox" aria-label="Trials">
        <p className={styles.count} role="status" aria-live="polite">{shown.length} {shown.length === 1 ? 'trial' : 'trials'} · {sortNote}</p>
        <Rows items={shown} selected={selected} onChoose={choose} timeline={timeline} newest={newest} approvals={approvals} />
        {!shown.length && <div className={styles.empty}>
          <p>No trials match.</p>
          {(state.q || state.question !== 'all' || state.result !== 'all' || state.area !== 'all') && <button type="button" className="wk-ev-link-button" onClick={() => update({q: '', question: 'all', result: 'all', area: 'all', trial: null})}>Clear search and filters</button>}
        </div>}
      </div>
      <div className={styles.pane} aria-live="polite">
        {narrow && <button type="button" className={`wk-ev-link-button ${styles.back}`} onClick={() => { if (pushed.current) { pushed.current = false; window.history.back(); } else update({trial: null}); setDetail(false); }}>← Results</button>}
        {selected ? <TrialPane trial={trials.find(item => item.id === selected)!} onQuestion={showQuestion} /> : !narrow && <p className={styles.note}>Choose a trial to read its summary here.</p>}
      </div>
    </div>
  </div>;
}

function Rows({items, selected, onChoose, timeline, newest, approvals}: {items: Trial[]; selected: string | null; onChoose: (id: string) => void; timeline: boolean; newest: boolean; approvals: typeof events}) {
  type Line = {date: string; trial?: Trial; event?: (typeof events)[number]};
  const lines: Line[] = items.map(trial => ({date: primaryReport(trial).published, trial}));
  if (timeline) lines.push(...approvals.map(event => ({date: event.date, event})));
  if (timeline) lines.sort((a, b) => (newest ? -1 : 1) * a.date.localeCompare(b.date));
  let last = '';
  return <>{lines.map(line => {
    const y = line.date.slice(0, 4);
    const header = timeline && y !== last ? <div className={styles.year} key={`y${y}`} aria-hidden="true">{y}</div> : null;
    last = y;
    if (line.event) return [header, <div className={styles.event} key={line.event.id}>{line.event.url ? <a href={line.event.url}>{line.event.title}</a> : line.event.title}</div>];
    const t = line.trial!;
    return [header, <button type="button" role="option" key={t.id} aria-selected={t.id === selected} className={styles.item} onClick={() => onChoose(t.id)}>
      <span className={styles.name}>{t.name}</span> <span className={styles.meta}>{year(t)}</span> <VerdictChip verdict={t.verdict} />
      <span className={styles.take}>{t.takeaway || t.question}</span>
    </button>];
  })}</>;
}

function TrialPane({trial, onQuestion}: {trial: Trial; onQuestion: (id: string) => void}) {
  const primary = primaryReport(trial);
  const questions = [...new Set(trial.decisions.map(item => item.id))];
  return <section className={styles.detail} aria-label={trial.name}>
    <header>
      <h2 className={styles.title}>{trial.page ? <Link to={trial.page}>{trial.name}</Link> : trial.name}</h2>
      <p className={styles.dateline}>{trial.area.map(areaLabel).join(' / ')} · {primary.published.slice(0, 4)} main report{trial.reports.length > 1 ? ` · ${trial.reports.length} reports` : ''} · <VerdictChip verdict={trial.verdict} /></p>
    </header>
    <p className={styles.bottom}>{trial.takeaway || trial.question}</p>
    <TrialQuickHit id={trial.id} />
    {questions.length > 0 && <div className={styles.questions}>
      <span>Timeline{questions.length > 1 ? 's' : ''}:</span>
      {questions.map(id => <button type="button" className="wk-ev-link-button" key={id} onClick={() => onQuestion(id)}>{questionTitle(id)}</button>)}
    </div>}
    {trial.page && <p><Link className={styles.open} to={trial.page}>Open the full trial page →</Link></p>}
  </section>;
}
