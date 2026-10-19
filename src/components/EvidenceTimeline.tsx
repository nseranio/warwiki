import {useState} from 'react';
import {decisionById, events, primaryReport, trials} from '../data/clinical-evidence';
import type {Event, Trial} from '../data/clinical-evidence/types';
import {TrialName, VerdictChip} from './EvidenceBits';

type Row = {date: string; trial?: Trial; event?: Event};

export default function EvidenceTimeline({decision}: {decision: string}) {
  const point = decisionById(decision);
  if (!point) throw new Error(`Unknown decision: ${decision}`);
  const [lane, setLane] = useState('all');
  const inLane = (trial: Trial) => trial.decisions.some(item => item.id === decision && (lane === 'all' || item.lane === lane));
  const rows: Row[] = [
    ...trials.filter(inLane).map(trial => ({date: primaryReport(trial).published, trial})),
    ...(lane === 'all' ? events.filter(event => event.kind === 'regulatory' && event.decisions.includes(decision)).map(event => ({date: event.date, event})) : []),
  ].sort((a, b) => a.date.localeCompare(b.date));
  let lastYear = '';
  return <div className="wk-ev-tl" aria-label={`${point.title}: trials and approvals in order of publication`}>
    {point.lanes.length > 1 && <div className="wk-ev-tl-filter" role="group" aria-label="Show">
      {[{id: 'all', label: 'All'}, ...point.lanes].map(item => <button type="button" key={item.id} aria-pressed={lane === item.id} onClick={() => setLane(item.id)}>{item.label}</button>)}
    </div>}
    <ol className="wk-ev-tl-list">
      {rows.map(row => {
        const year = row.date.slice(0, 4);
        const showYear = year !== lastYear;
        lastYear = year;
        const yearCell = <span className="wk-ev-tl-year">{showYear ? year : ''}</span>;
        if (row.event) return <li key={row.event.id} className="wk-ev-tl-item wk-ev-tl-item--event">{yearCell}<span className="wk-ev-tl-mark" aria-hidden="true" /><div className="wk-ev-tl-body">{row.event.url ? <a href={row.event.url}>{row.event.title}</a> : row.event.title}</div></li>;
        const trial = row.trial!;
        return <li key={trial.id} className={`wk-ev-tl-item wk-ev-tl-item--${trial.verdict}`}>{yearCell}<span className="wk-ev-tl-mark" aria-hidden="true" /><div className="wk-ev-tl-body"><span className="wk-ev-tl-name"><TrialName trial={trial} /></span> <VerdictChip verdict={trial.verdict} /><p>{trial.takeaway || trial.verdictNote}</p></div></li>;
      })}
    </ol>
  </div>;
}
