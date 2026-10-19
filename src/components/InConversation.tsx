import {events, trialById, trials} from '../data/clinical-evidence';
import type {RelationType, Trial} from '../data/clinical-evidence/types';
import {reportYear, TrialName} from './EvidenceBits';

type Connection = {trial: Trial; type: RelationType; note: string; inverse: boolean};
const order: RelationType[] = ['builds-on', 'confirms', 'conflicts', 'supersedes', 'extends', 'parallel'];
const wording: Record<RelationType, [string, string]> = {
  'builds-on': ['Builds on', 'Built on by'], confirms: ['Confirms', 'Confirmed by'], conflicts: ['Conflicts with', 'Conflicts with'],
  supersedes: ['Supersedes', 'Superseded by'], parallel: ['Parallel to', 'Parallel to'], extends: ['Extends', 'Extended by'],
};
export default function InConversation({id}: {id: string}) {
  const trial = trialById(id);
  if (!trial) throw new Error(`Unknown trial: ${id}`);
  const links: Connection[] = [
    ...trial.relations.filter(relation => trialById(relation.target)).map(relation => ({trial: trialById(relation.target)!, type: relation.type, note: relation.note, inverse: false})),
    ...trials.flatMap(other => other.relations.filter(relation => relation.target === id).map(relation => ({trial: other, type: relation.type, note: relation.note, inverse: true}))),
  ].sort((a, b) => order.indexOf(a.type) - order.indexOf(b.type));
  const explicit = new Set(links.map(link => link.trial.id));
  const same = trials.filter(other => other.id !== id && !explicit.has(other.id) && other.decisions.some(placement => trial.decisions.some(own => own.id === placement.id && own.lane === placement.lane))).sort((a, b) => reportYear(a).localeCompare(reportYear(b)));
  const approvals = events.filter(event => event.kind === 'regulatory' && event.trials.includes(id)).sort((a, b) => a.date.localeCompare(b.date));
  return <div className="wk-ev-convo">
    {links.length > 0 && <ul>{links.map((link, index) => <li key={`${link.trial.id}-${link.type}-${index}`}><span className="wk-ev-convo-rel">{wording[link.type][link.inverse ? 1 : 0]}</span> <TrialName trial={link.trial} /> ({reportYear(link.trial)}). {link.note}</li>)}</ul>}
    {same.length > 0 && <p><span className="wk-ev-convo-rel">Same setting</span> {same.map((other, index) => <span key={other.id}>{index > 0 && ', '}<TrialName trial={other} /> ({reportYear(other)})</span>)}</p>}
    {approvals.length > 0 && <p><span className="wk-ev-convo-rel">Approvals</span> {approvals.map((event, index) => <span key={event.id}>{index > 0 && '; '}{event.url ? <a href={event.url}>{event.title}</a> : event.title} ({event.date.slice(0, 4)})</span>)}</p>}
  </div>;
}
