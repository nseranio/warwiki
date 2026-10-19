import {decisionById, primaryReport, trials} from '../data/clinical-evidence';
import {effectText, ResultStatus, reportYear, TrialName} from './EvidenceBits';

export default function TrialComparison({decision, lane, report}: {decision: string; lane?: string; report?: string}) {
  const point = decisionById(decision);
  if (!point) throw new Error(`Unknown decision: ${decision}`);
  const rows = trials.filter(trial => trial.decisions.some(item => item.id === decision && (!lane || item.lane === lane))).sort((a, b) => reportYear(a).localeCompare(reportYear(b)));
  return <div className="wk-ev-table-scroll wk-ev-compare"><table><thead><tr><th scope="col">Trial</th><th scope="col">Patients</th><th scope="col">Control</th><th scope="col">Primary result</th></tr></thead><tbody>
    {rows.map(trial => {
      const selected = trial.reports.find(item => item.id === report || item.kind === report) ?? primaryReport(trial);
      const endpoint = selected.results.find(item => item.role === 'primary');
      const values = endpoint?.values ? Object.values(endpoint.values).join(' vs ') : endpoint?.note;
      const effect = endpoint ? effectText(endpoint) : '—';
      return <tr key={trial.id}>
        <th scope="row"><TrialName trial={trial} /><span className="wk-ev-compare-year">{selected.published.slice(0, 4)}</span></th>
        <td>{trial.design.population ?? '—'}</td>
        <td>{trial.design.arms.find(arm => arm.role === 'control')?.label ?? 'None (single arm)'}</td>
        <td>{endpoint ? <><span className="wk-ev-compare-measure">{endpoint.measure}</span> {values}{effect !== '—' && <span className="wk-ev-compare-effect">{effect}</span>} <ResultStatus result={endpoint} /></> : '—'}</td>
      </tr>;
    })}
  </tbody></table></div>;
}
