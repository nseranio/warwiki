import {useEffect, useMemo, useState} from 'react';
import Link from '@docusaurus/Link';
import {decisions, primaryReport, trials} from '../data/clinical-evidence';
import {areaMatches} from '../data/clinical-evidence/families';
import groups from '../data/clinical-evidence/timeline-groups.json';
import {cap, effectText, reportYear, TrialName, VerdictChip} from './EvidenceBits';
import styles from './TrialsLibrary.module.css';

const areaLabel = (id: string) => (groups as {id: string; label: string}[]).find(group => group.id === id)?.label ?? cap(id);

/** Trial cards: the takeaway (what the trial showed) leads, the headline numbers follow. On the combined evidence
 *  page the area filter and the timeline jump come from EvidenceExplorer (ported from WHITWIKI, October 18). */
export default function TrialsLibrary({area: shared, onShowTimeline}: {area?: string; onShowTimeline?: (decision: string) => void} = {}) {
  const [query, setQuery] = useState('');
  const [ownArea, setArea] = useState('all');
  const area = shared === undefined ? ownArea : shared;
  const inArea = (value: string) => areaMatches(area, value);
  // The decision menu lists only the chosen area's decisions; a decision from another area is cleared.
  const areaDecisions = decisions.filter(item => inArea(item.area));
  const [decision, setDecision] = useState('All decisions');
  const [verdict, setVerdict] = useState('All verdicts');
  const areas = ['all', ...new Set(trials.flatMap(trial => trial.area))];
  const verdicts = ['All verdicts', ...new Set(trials.map(trial => trial.verdict))];
  const filtered = useMemo(() => {
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return trials.filter(trial => trial.area.some(inArea) && (decision === 'All decisions' || trial.decisions.some(item => item.id === decision)) && (verdict === 'All verdicts' || trial.verdict === verdict) && words.every(word => `${trial.name} ${trial.takeaway} ${trial.question} ${trial.design.population ?? ''} ${trial.design.arms.map(arm => arm.label).join(' ')} ${trial.nct ?? ''} ${trial.aliases.join(' ')}`.toLowerCase().includes(word))).sort((a, b) => reportYear(b).localeCompare(reportYear(a)) || a.name.localeCompare(b.name));
  }, [query, area, decision, verdict]);
  useEffect(() => {
    if (decision !== 'All decisions' && !areaDecisions.some(item => item.id === decision)) setDecision('All decisions');
  }, [area]);
  return <div className="wk-ev-library">
    <div className="wk-ev-search-controls"><label>Study or question<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="ROSETTA, midurethral sling, botulinum…" /></label>{shared === undefined && <label>Area<select value={area} onChange={event => setArea(event.target.value)}>{areas.map(option => <option key={option} value={option}>{option === 'all' ? 'All areas' : areaLabel(option)}</option>)}</select></label>}<label>Decision point<select value={decision} onChange={event => setDecision(event.target.value)}><option>All decisions</option>{areaDecisions.map(item => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label><label>Verdict<select value={verdict} onChange={event => setVerdict(event.target.value)}>{verdicts.map(option => <option key={option} value={option}>{cap(option)}</option>)}</select></label></div>
    <p role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'trial' : 'trials'}</p>
    {filtered.map(trial => {
      const primary = primaryReport(trial);
      const analyzed = primary.results.length ? primary : trial.reports.find(item => item.results.length) ?? primary;
      const headline = analyzed.results.find(item => item.role === 'primary') ?? analyzed.results[0];
      return <article className="wk-ev-trial" id={trial.id} key={trial.id}><p className="wk-ev-eyebrow">{trial.area.map(areaLabel).join(' / ')} · {reportYear(trial)} <VerdictChip verdict={trial.verdict} /></p><h2><TrialName trial={trial} /></h2><p className={`wk-ev-study-result ${styles.takeaway}`}>{trial.takeaway || trial.question}</p><p className={styles.numbers}>{headline ? [`${headline.measure}: ${headline.values ? Object.values(headline.values).join(' vs ') : headline.note || ''}`, effectText(headline)].filter(part => part !== '—').join('; ') : trial.verdictNote}</p><div className="wk-ev-study-links">{trial.page && <Link to={trial.page}>Read the full appraisal →</Link>}{primary.doi && <a href={`https://doi.org/${primary.doi}`}>Primary report</a>}{trial.decisions[0] && (onShowTimeline
        ? <button type="button" className="wk-ev-link-button" onClick={() => onShowTimeline(trial.decisions[0].id)}>See timeline</button>
        : <Link to={`/docs/clinical-evidence#${trial.decisions[0].id}`}>See timeline</Link>)}</div></article>;
    })}
    {!filtered.length && <p>No matching studies. Try another term.</p>}
  </div>;
}
