import {trialById} from '../data/clinical-evidence';
import {VerdictChip} from './EvidenceBits';
import styles from './TrialBottomLine.module.css';

/** The trial's bottom line, shown first on its page: what was compared and what it showed. */
export default function TrialBottomLine({id}: {id: string}) {
  const trial = trialById(id);
  if (!trial) throw new Error(`Unknown trial: ${id}`);
  // Dateline first (owner, November 16): the year of the main report, and the span of all reports when there are others,
  // so a reader can tell a modern trial from an older one at a glance. Corrections are left out of the span.
  const years = trial.reports.filter(report => report.kind !== 'correction').map(report => Number(report.published.slice(0, 4)));
  const main = Number((trial.reports.find(report => report.kind === 'primary') ?? trial.reports[0]).published.slice(0, 4));
  const first = Math.min(...years), last = Math.max(...years);
  return <>
  <p className={styles.dateline}><span className={styles.year}>{main}</span> <span>main report{first < main || last > main ? <> · all reports {first}–{last}</> : null}</span></p>
  <aside className={styles.box} aria-label="Bottom line">
    <p className={styles.label}>Bottom line <VerdictChip verdict={trial.verdict} /></p>
    <p className={styles.takeaway}>{trial.takeaway}</p>
    {trial.verdictNote && <p className={styles.note}>{trial.verdictNote}</p>}
  </aside>
  </>;
}
