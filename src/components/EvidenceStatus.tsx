import React from 'react';

function dateLabel(value?: unknown): string | null {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) return null;
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}

/** A targeted evidence update is not a full clinical review or a Git edit date. */
export default function EvidenceStatus({ evidenceUpdated, evidenceNote, lastReviewed, reviewer }: {
  evidenceUpdated?: unknown; evidenceNote?: unknown; lastReviewed?: unknown; reviewer?: unknown;
}): React.ReactElement | null {
  const evidence = dateLabel(evidenceUpdated);
  const reviewed = dateLabel(lastReviewed);
  if (!evidence && !reviewed) return null;
  return (
    <aside className="evidence-status" aria-label="Evidence and review dates">
      {evidence && <div><strong>Evidence update:</strong> {evidence}
        {typeof evidenceNote === 'string' && evidenceNote ? ` — ${evidenceNote}` : ''}</div>}
      {reviewed ? <div><strong>Clinical review recorded:</strong> {reviewed}
        {typeof reviewer === 'string' && reviewer ? ` · ${reviewer}` : ''}</div>
        : <div className="evidence-status-note">Targeted source update; a full clinical review is not recorded.</div>}
    </aside>
  );
}
