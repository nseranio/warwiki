import React, { useState, useMemo } from 'react';

export interface CodeRow {
  code: string;
  description: string;
  notes?: string;
  category?: string;
  wrvus?: string | number;
}

interface ColDef {
  key: keyof CodeRow;
  label: string;
  width?: string;
  mono?: boolean;
  align?: 'left' | 'center' | 'right';
}

interface CodeSearchTableProps {
  data: CodeRow[];
  columns: ColDef[];
  categoryLabel?: string;
  placeholder?: string;
}

export default function CodeSearchTable({
  data,
  columns,
  categoryLabel = 'Category',
  placeholder = 'Search codes, descriptions, notes…',
}: CodeSearchTableProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = new Set(data.map((r) => r.category).filter(Boolean) as string[]);
    return ['All', ...Array.from(cats).sort()];
  }, [data]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return data.filter((row) => {
      const matchSearch =
        !q ||
        row.code.toLowerCase().includes(q) ||
        row.description.toLowerCase().includes(q) ||
        (row.notes?.toLowerCase().includes(q) ?? false) ||
        (row.category?.toLowerCase().includes(q) ?? false);
      const matchCategory =
        selectedCategory === 'All' || row.category === selectedCategory;
      return matchSearch && matchCategory;
    });
  }, [data, search, selectedCategory]);

  return (
    <div className="cst-wrapper">
      <div className="cst-controls">
        <input
          type="search"
          placeholder={placeholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="cst-search"
          aria-label="Search codes"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="cst-filter"
          aria-label={`Filter by ${categoryLabel}`}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'All' ? `All ${categoryLabel}s` : cat}
            </option>
          ))}
        </select>
        <span className="cst-count">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="cst-scroll">
        <table className="cst-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  style={{
                    width: col.width,
                    textAlign: col.align ?? 'left',
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="cst-empty">
                  No results for "{search}"
                  {selectedCategory !== 'All' ? ` in "${selectedCategory}"` : ''}.
                </td>
              </tr>
            ) : (
              filtered.map((row, i) => (
                <tr key={i}>
                  {columns.map((col) => {
                    const val = row[col.key];
                    return (
                      <td
                        key={col.key}
                        className={col.mono ? 'cst-mono' : undefined}
                        style={{ textAlign: col.align ?? 'left' }}
                      >
                        {val !== undefined && val !== null && val !== '' ? String(val) : '—'}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
