import React from 'react';

/**
 * ResponsiveTable — opt-in comparison-table component for the highest-value
 * tables (segment selection, urethroplasty triad, NLUTD ladder, etc.) where
 * the mobile horizontal-scroll fallback genuinely hurts comprehension.
 *
 * On desktop: renders a normal styled table.
 * On mobile (<= 640px): renders as a stack of cards, one per row, with the
 * column header above each value. Uses the existing `.markdown table`
 * styles for consistency on desktop.
 *
 * Usage:
 *
 *   import ResponsiveTable from '@site/src/components/ResponsiveTable';
 *
 *   <ResponsiveTable
 *     columns={[
 *       { key: 'segment', header: 'Segment' },
 *       { key: 'use', header: 'Primary Use' },
 *       { key: 'pros', header: 'Pros' },
 *       { key: 'cons', header: 'Cons' },
 *     ]}
 *     data={[
 *       { segment: 'Ileum', use: '...', pros: '...', cons: '...' },
 *     ]}
 *   />
 */

export type ResponsiveColumn = {
  key: string;
  header: string;
  emphasize?: boolean; // bold the value on cards
};

export type ResponsiveRow = Record<string, React.ReactNode>;

export default function ResponsiveTable({
  columns,
  data,
  caption,
}: {
  columns: ResponsiveColumn[];
  data: ResponsiveRow[];
  caption?: string;
}) {
  return (
    <div className="responsive-table-wrapper">
      {caption && <div className="responsive-table-caption">{caption}</div>}

      {/* Desktop table */}
      <table className="responsive-table-desktop">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map(col => (
                <td key={col.key} style={col.emphasize ? { fontWeight: 600 } : undefined}>
                  {row[col.key] ?? '—'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile card stack */}
      <div className="responsive-table-mobile">
        {data.map((row, i) => (
          <div key={i} className="responsive-table-card">
            {columns.map(col => (
              <div key={col.key} className="responsive-table-card-field">
                <div className="responsive-table-card-label">{col.header}</div>
                <div
                  className="responsive-table-card-value"
                  style={col.emphasize ? { fontWeight: 600 } : undefined}
                >
                  {row[col.key] ?? '—'}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
