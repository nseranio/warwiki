import Link from '@docusaurus/Link';
import type {Result, Trial, Verdict} from '../data/clinical-evidence/types';

/** Button, toggle and chip labels start with a capital letter even when the data value is lowercase. */
export const cap = (value: string) => value ? value[0].toUpperCase() + value.slice(1) : value;

export function VerdictChip({verdict}: {verdict: Verdict}) {
  return <span className={`wk-ev-verdict wk-ev-verdict--${verdict}`}>{cap(verdict)}</span>;
}
export function ResultStatus({result}: {result: Result}) {
  const label = result.role === 'descriptive' ? 'Descriptive' : result.met === true ? 'Met' : result.met === false ? 'Not met' : result.met === 'not-tested' ? 'Not tested' : '';
  if (!label) return null;
  return <span className={`wk-ev-result-status wk-ev-result-status--${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</span>;
}
export function TrialName({trial}: {trial: Trial}) {
  return trial.page ? <Link to={trial.page}>{trial.name}</Link> : <span className="wk-ev-no-page">{trial.name} <small>(no page yet)</small></span>;
}
export function reportYear(trial: Trial) {
  return trial.reports.find(report => report.kind === 'primary')?.published.slice(0, 4) ?? '';
}
export function effectText(result: Result) {
  const e = result.effect;
  if (!e) return '—';
  return [e.type !== 'none' ? `${e.type} ${e.value ?? ''}`.trim() : '', e.ci ? `${e.ciLevel ?? 'CI'} ${e.ci.join('–')}` : '', e.p ? `P ${e.p}` : ''].filter(Boolean).join('; ') || '—';
}
