import React, { useState, useMemo } from 'react';

export interface ColumnDef {
  key: string;
  header: string;
  badge?: boolean;
  badgeColors?: Record<string, string>;
  fallback?: string;
}

interface GenericDatabaseProps {
  data: Record<string, string>[];
  columns: ColumnDef[];
  filterKey?: string;
  filterLabel?: string;
  entityLabel?: string;
}

const DEFAULT_BADGE_COLOR = '#6b7280';

function SubtleBadge({ label, color }: { label: string; color: string }) {
  return (
    <span style={{
      display: 'inline-block',
      fontSize: '0.62rem',
      fontWeight: 600,
      letterSpacing: '0.03em',
      padding: '0.15em 0.5em',
      borderRadius: '4px',
      backgroundColor: color + '18',
      color: color,
      border: `1px solid ${color}44`,
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

function BadgeCell({ value, colors }: { value: string; colors?: Record<string, string> }) {
  if (!value || value === '—') return <span style={{ color: '#9ca3af' }}>—</span>;
  const color = colors?.[value] ?? DEFAULT_BADGE_COLOR;
  return <SubtleBadge label={value} color={color} />;
}

export default function GenericDatabase({
  data,
  columns,
  filterKey,
  filterLabel = 'Filter',
  entityLabel = 'procedures',
}: GenericDatabaseProps) {
  const [search, setSearch] = useState('');
  const [filterValue, setFilterValue] = useState('All');

  const filterOptions = useMemo(() => {
    if (!filterKey) return [];
    const vals = Array.from(new Set(data.map(d => d[filterKey]).filter(Boolean))).sort();
    return ['All', ...vals];
  }, [data, filterKey]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return data.filter(d => {
      if (filterKey && filterValue !== 'All' && d[filterKey] !== filterValue) return false;
      if (q) {
        return columns.some(col => d[col.key]?.toLowerCase().includes(q));
      }
      return true;
    });
  }, [data, search, filterValue, filterKey, columns]);

  return (
    <div className="td-wrapper">
      <div className="td-controls">
        <input
          type="search"
          placeholder={`Search ${entityLabel}…`}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="td-search"
          aria-label={`Search ${entityLabel}`}
        />
        {filterKey && filterOptions.length > 1 && (
          <div className="td-filters">
            <select
              value={filterValue}
              onChange={e => setFilterValue(e.target.value)}
              className="td-select"
              aria-label={`Filter by ${filterLabel}`}
            >
              {filterOptions.map(opt => (
                <option key={opt} value={opt}>
                  {opt === 'All' ? `All ${filterLabel}s` : opt}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="td-count">
          {filtered.length} of {data.length} {entityLabel}
        </div>
      </div>

      <div className="td-scroll">
        {filtered.length === 0 ? (
          <div className="td-empty">No {entityLabel} match your search.</div>
        ) : (
          <table className="td-table">
            <thead>
              <tr>
                {columns.map(col => (
                  <th key={col.key}>{col.header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr key={i}>
                  {columns.map((col, j) => {
                    const val = row[col.key] || col.fallback || '—';
                    if (col.badge) {
                      return (
                        <td key={col.key}>
                          <BadgeCell value={val} colors={col.badgeColors} />
                        </td>
                      );
                    }
                    if (j === 0) {
                      return (
                        <td key={col.key} className="td-name-cell">
                          {row.slug ? (
                            <a href={row.slug} className="td-name-link">{val}</a>
                          ) : (
                            <span className="td-name-text">{val}</span>
                          )}
                        </td>
                      );
                    }
                    return (
                      <td key={col.key} className="td-notes">
                        {val === '—' ? <span style={{ color: '#9ca3af' }}>—</span> : val}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
