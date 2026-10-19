import {trialById} from '../data/clinical-evidence';
import {VerdictChip} from './EvidenceBits';
import styles from './TrialBottomLine.module.css';

/** The trial's bottom line, shown first on its page: what was compared and what it showed. */
export default function TrialBottomLine({id}: {id: string}) {
  const trial = trialById(id);
  if (!trial) throw new Error(`Unknown trial: ${id}`);
  return <aside className={styles.box} aria-label="Bottom line">
    <p className={styles.label}>Bottom line <VerdictChip verdict={trial.verdict} /></p>
    <p className={styles.takeaway}>{trial.takeaway}</p>
    {trial.verdictNote && <p className={styles.note}>{trial.verdictNote}</p>}
  </aside>;
}
