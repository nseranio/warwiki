import React from 'react';
import {getPathwayEvidence} from '../data/evidence';
import styles from './EvidenceTable.module.css';

const accessLabels: Record<string, string> = {
  abstract: 'Published abstract and source metadata',
  'full-main-text': 'Complete main article and tables; supplements assessed separately',
  'selected-full-text': 'Selected full-text methods/results and source metadata',
};
const correctionLabels: Record<string, string> = {
  'not-identified': 'No notice identified in the checked metadata',
  'correction-notice': 'Correction notice recorded',
  'not-assessed': 'Correction status not assessed',
  retracted: 'Retraction recorded — do not use for treatment recommendations',
  'expression-of-concern': 'Expression of concern recorded',
};

/** Static, source-linked comparisons. Native details keep the audit trail accessible without JS. */
export default function EvidenceTable({pathwayId}: {pathwayId: string}): React.ReactElement {
  const {label, records} = getPathwayEvidence(pathwayId);
  return <section className={styles.evidence} aria-label={`${label}: selected evidence`}>
    <p className={styles.scope}>Selected studies, not a systematic review. Outcomes and populations differ;
      percentages across studies should not be ranked as if they were directly comparable.
      These source checks do not record a clinician review of the full article.</p>
    <div className={styles.scroll} role="region" aria-label={`${label} evidence comparison`} tabIndex={0}>
      <table>
        <caption>{label} — key study comparisons</caption>
        <thead><tr><th scope="col">Study and population</th><th scope="col">Comparison and results</th><th scope="col">Use and limitations</th></tr></thead>
        <tbody>{records.map(record => <tr key={record.id} id={`evidence-${record.id}`}>
          <th scope="row">
            <a href={record.source.url}>{record.label}</a>
            <p>{record.population}</p>
            <p>{record.sampleSize.randomized === null ? 'Follow-up cohort' : `Randomized n=${record.sampleSize.randomized}`}</p>
            <details>
              <summary>Source and methods: {record.label}</summary>
              <dl>
                <dt>Source</dt><dd>{record.source.authors} {record.source.title} ({record.source.year}). <a href={`https://doi.org/${record.source.doi}`}>DOI: {record.source.doi}</a></dd>
                <dt>Design</dt><dd>{record.design}</dd>
                <dt>Denominators</dt><dd>{record.sampleSize.analysis}</dd>
                <dt>Follow-up</dt><dd>{record.followUp}</dd>
                <dt>Source access</dt><dd><a href={record.access.url}>{accessLabels[record.access.level] ?? record.access.level}</a>; checked {record.access.checkedAt}.</dd>
                <dt>Corrections and retractions</dt><dd><strong>{correctionLabels[record.correction.status] ?? record.correction.status}.</strong> {record.correction.note} Checked {record.correction.checkedAt}.{record.correction.url && <> <a href={record.correction.url}>Notice record</a></>}</dd>
              </dl>
            </details>
          </th>
          <td><strong>{record.comparison}</strong>{record.endpoints.map((endpoint, i) => <div className={styles.endpoint} key={i}>
            <p><strong>{endpoint.name}</strong> · {endpoint.timepoint}</p>
            <p>{endpoint.result}</p><p className={styles.uncertainty}>{endpoint.uncertainty}</p>
          </div>)}</td>
          <td><p>{record.applicability}</p><ul>{record.limitations.map(limit => <li key={limit}>{limit}</li>)}</ul>
            {record.correction.status !== 'not-identified' && <p className={styles.notice}><strong>{correctionLabels[record.correction.status] ?? record.correction.status}.</strong> See source and methods.</p>}
          </td>
        </tr>)}</tbody>
      </table>
    </div>
  </section>;
}
