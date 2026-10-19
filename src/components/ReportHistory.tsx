import {trialById} from '../data/clinical-evidence';
import {effectText, ResultStatus} from './EvidenceBits';

export default function ReportHistory({id}: {id: string}) {
  const trial = trialById(id);
  if (!trial) throw new Error(`Unknown trial: ${id}`);
  return <div className="wk-ev-table-scroll"><table><caption>{trial.name} report history</caption><thead><tr><th scope="col">Published</th><th scope="col">Report</th><th scope="col">Cutoff</th><th scope="col">Headline results</th><th scope="col">Citation</th></tr></thead><tbody>
    {trial.reports.map(report => <tr key={report.id}><td>{report.dateApprox ? report.published.slice(0, 4) : report.published}</td><td>{report.label} · {report.kind}</td><td>{report.cutoff ?? '—'}</td><td>{report.results.length ? report.results.map((result, index) => <div key={index}>{result.measure}: {result.values ? Object.values(result.values).join(' vs ') : result.note || '—'}; {effectText(result)} <ResultStatus result={result} /></div>) : '—'}</td><td>{report.citation}{report.doi && <> <a href={`https://doi.org/${report.doi}`}>DOI</a></>}</td></tr>)}
  </tbody></table></div>;
}
