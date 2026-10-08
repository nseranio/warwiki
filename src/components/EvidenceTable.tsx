import React from 'react';
import {getPathwayEvidence} from '../data/evidence';
import styles from './EvidenceTable.module.css';

// Only notices that change how a reader should weigh a study are shown; routine
// correction checks and source-access notes stay in the registry for maintainers.
const noticeLabels: Record<string, string> = {
  retracted: 'Retracted',
  'expression-of-concern': 'Expression of concern',
};

/** Static, source-linked comparisons. */
export default function EvidenceTable({pathwayId}: {pathwayId: string}): React.ReactElement {
  const {label, records} = getPathwayEvidence(pathwayId);
  return <section className={styles.evidence} aria-label={`${label}: selected evidence`}>
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
                {noticeLabels[record.correction.status] && <><dt>Notice</dt><dd><strong>{noticeLabels[record.correction.status]}.</strong>{record.correction.url && <> <a href={record.correction.url}>Notice record</a></>}</dd></>}
              </dl>
            </details>
          </th>
          <td><strong>{record.comparison}</strong>{record.endpoints.map((endpoint, i) => <div className={styles.endpoint} key={i}>
            <p><strong>{endpoint.name}</strong> · {endpoint.timepoint}</p>
            <p>{endpoint.result}</p>{endpoint.uncertainty && <p className={styles.uncertainty}>{endpoint.uncertainty}</p>}
          </div>)}</td>
          <td><p>{record.applicability}</p><ul>{record.limitations.map(limit => <li key={limit}>{limit}</li>)}</ul>
            {noticeLabels[record.correction.status] && <p className={styles.notice}><strong>{noticeLabels[record.correction.status]}.</strong> See source and methods.</p>}
          </td>
        </tr>)}</tbody>
      </table>
    </div>
  </section>;
}
