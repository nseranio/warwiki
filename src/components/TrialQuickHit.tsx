import {primaryReport, trialById} from '../data/clinical-evidence';
import {effectText, ResultStatus} from './EvidenceBits';

export default function TrialQuickHit({id}: {id: string}) {
  const trial = trialById(id);
  if (!trial) throw new Error(`Unknown trial: ${id}`);
  const primary = primaryReport(trial);
  const report = primary.results.some(item => item.values) ? primary : trial.reports.find(item => item.results.some(result => result.values)) ?? trial.reports.find(item => item.results.length) ?? primary;
  const priorityResults = report.results.filter(item => ['primary','key-secondary','descriptive'].includes(item.role));
  const results = priorityResults.length ? priorityResults : report.results;
  const description = trial.design.description ?? '';
  const designDescription = /[.!?]$/.test(description) ? description : `${description}.`;
  return <div className="wk-ev-trial-facts">
    <dl className="wk-ev-fact-grid">
      <div><dt>Design and population</dt><dd>{designDescription} {trial.design.population}</dd></div>
      <div><dt>Arms</dt><dd>{trial.design.arms.map(arm => arm.label).join(' versus ')}</dd></div>
      <div><dt>Report and follow-up</dt><dd>{report.published.slice(0, 4)} · {report.followUp}{report !== primary ? ' (analyzed update)' : ''}</dd></div>
    </dl>
    <div className="wk-ev-table-scroll"><table><thead><tr><th scope="col">Endpoint</th><th scope="col">Results</th><th scope="col">Effect</th><th scope="col">Finding</th></tr></thead><tbody>
      {results.map((result, index) => <tr key={index}><th scope="row">{result.measure}</th><td>{result.values ? Object.values(result.values).join(' vs ') : result.note || '—'}</td><td>{effectText(result)}</td><td><ResultStatus result={result} /></td></tr>)}
    </tbody></table></div>
    {report.harms.length > 0 && <p><strong>Harms:</strong> {report.harms.slice(0, 3).map(item => `${item.label}: ${item.values ? Object.values(item.values).join(' vs ') : item.note ?? ''}`).join('; ')}</p>}
    <p className="wk-ev-trial-registration">{trial.nct ? <a href={`https://clinicaltrials.gov/study/${trial.nct}`}>{trial.nct}</a> : trial.registry ?? 'Registry not recorded'}{report.doi && <> · <a href={`https://doi.org/${report.doi}`}>Report DOI</a></>}</p>
  </div>;
}
