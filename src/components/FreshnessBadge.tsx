import React from 'react';

/**
 * FreshnessBadge — renders a small colored chip showing when an article
 * was last reviewed and flags it as fresh / warn / stale.
 *
 * Usage in MDX (after the H1):
 *
 *   import FreshnessBadge from '@site/src/components/FreshnessBadge';
 *
 *   <FreshnessBadge lastReviewed="2026-05-22" reviewer="NS" />
 *
 * Renders nothing when `lastReviewed` is missing or unparseable, so
 * legacy pages without the convention degrade silently.
 *
 * Thresholds mirror `scripts/check-freshness.js`:
 *   <= 12 mo  →  fresh  (green)
 *   13-18 mo  →  current (blue)
 *   19-30 mo  →  warn   (yellow)
 *   > 30 mo   →  stale  (red)
 */

const WARN_MONTHS = 18;
const STALE_MONTHS = 30;
const CURRENT_MONTHS = 12;

function monthsSince(iso: string): number | null {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;
  const now = new Date();
  return (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
}

function tierFor(months: number) {
  if (months > STALE_MONTHS) return { label: 'STALE', color: '#dc2626' };
  if (months > WARN_MONTHS) return { label: 'STALE SOON', color: '#d97706' };
  if (months > CURRENT_MONTHS) return { label: 'CURRENT', color: '#185FA5' };
  return { label: 'FRESH', color: '#16a34a' };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function FreshnessBadge({
  lastReviewed,
  reviewer,
}: {
  lastReviewed?: string;
  reviewer?: string;
}) {
  if (!lastReviewed) return null;
  const months = monthsSince(lastReviewed);
  if (months == null) return null;
  const tier = tierFor(months);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        margin: '0 0 1rem 0',
        padding: '0.25rem 0.6rem',
        borderRadius: 6,
        background: tier.color + '12',
        border: `1px solid ${tier.color}44`,
        fontSize: '0.78rem',
      }}
      title={`Last reviewed ${formatDate(lastReviewed)}${reviewer ? ` by ${reviewer}` : ''} — ${months} mo ago`}
    >
      <span style={{ fontWeight: 700, color: tier.color, letterSpacing: '0.04em' }}>
        {tier.label}
      </span>
      <span style={{ color: 'var(--ifm-color-emphasis-700)' }}>
        Reviewed {formatDate(lastReviewed)}
        {reviewer ? ` · ${reviewer}` : ''}
      </span>
    </div>
  );
}
