import React, { useState, useMemo } from 'react';

export interface Technique {
  name: string;
  eponym?: string;
  aka?: string;
  location: string;
  notes: string;
  slug?: string;
  category?: string;
}

const LOCATION_COLORS: Record<string, string> = {
  'Bulbar':                      '#185FA5',
  'Penile':                      '#7c3aed',
  'Panurethral':                 '#b45309',
  'Fossa Navicularis / Meatal':  '#047857',
  'Posterior / PFUI':            '#b91c1c',
  'Any':                         '#374151',
  'Bulbomembranous':             '#0f766e',
};

// Order in which categories should appear when grouping is on.
// Both male- and female-urethroplasty category strings live here; each tab
// only shows the categories present in its own data set.
const CATEGORY_ORDER: string[] = [
  // Male urethroplasty
  '1. Anastomotic (no substitute tissue)',
  '2. Substitution — Free Grafts',
  '3. Substitution — Pedicled Flaps',
  '4. Combined (Graft + Flap)',
  '5. Staged Urethroplasty',
  '6. Posterior Urethroplasty (PFUI)',
  '7. Distal / Meatal / Perineal Urethrostomy',
  '8. Minimally Invasive / Emerging',
  // Female urethroplasty
  'F1. Endoscopic / Minimally Invasive',
  'F2. Distal Urethrectomy + Meatal Advancement',
  'F3. Flap Urethroplasty',
  'F4. Free Graft Urethroplasty',
  'F5. Combined / Hybrid Techniques',
  'F6. Urethral Loss / Obliteration Repair',
  'F7. Emerging / Investigational',
  'F8. Other Female Reconstructive Procedures',
];

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

function LocationBadge({ location }: { location: string }) {
  const color = LOCATION_COLORS[location] ?? '#6b7280';
  return <SubtleBadge label={location} color={color} />;
}

interface TechniqueDatabaseProps {
  data: Technique[];
}

export default function TechniqueDatabase({ data }: TechniqueDatabaseProps) {
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const hasCategories = useMemo(
    () => data.some(d => !!d.category),
    [data]
  );

  const allLocations = useMemo(
    () => ['All', ...Array.from(new Set(data.map(d => d.location))).sort()],
    [data]
  );

  const allCategories = useMemo(() => {
    if (!hasCategories) return ['All'];
    const present = new Set(data.map(d => d.category).filter(Boolean) as string[]);
    const ordered = CATEGORY_ORDER.filter(c => present.has(c));
    const extras = Array.from(present).filter(c => !CATEGORY_ORDER.includes(c)).sort();
    return ['All', ...ordered, ...extras];
  }, [data, hasCategories]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return data.filter(d => {
      if (locationFilter !== 'All' && d.location !== locationFilter) return false;
      if (categoryFilter !== 'All' && d.category !== categoryFilter) return false;
      if (q) {
        return (
          d.name.toLowerCase().includes(q) ||
          (d.eponym?.toLowerCase().includes(q) ?? false) ||
          (d.aka?.toLowerCase().includes(q) ?? false) ||
          (d.category?.toLowerCase().includes(q) ?? false) ||
          d.notes.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [data, search, locationFilter, categoryFilter]);

  // Group filtered rows by category, preserving CATEGORY_ORDER then any extras
  const grouped = useMemo(() => {
    if (!hasCategories) return null;
    const map = new Map<string, Technique[]>();
    for (const t of filtered) {
      const key = t.category ?? 'Uncategorized';
      const arr = map.get(key) ?? [];
      arr.push(t);
      map.set(key, arr);
    }
    const ordered: { category: string; rows: Technique[] }[] = [];
    for (const c of CATEGORY_ORDER) {
      if (map.has(c)) ordered.push({ category: c, rows: map.get(c)! });
    }
    for (const [c, rows] of map.entries()) {
      if (!CATEGORY_ORDER.includes(c)) ordered.push({ category: c, rows });
    }
    return ordered;
  }, [filtered, hasCategories]);

  return (
    <div className="td-wrapper">
      <div className="td-controls">
        <input
          type="search"
          placeholder="Search techniques, eponyms, descriptions…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="td-search"
          aria-label="Search techniques"
        />
        <div className="td-filters">
          {hasCategories && (
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="td-select"
              aria-label="Filter by category"
              style={{ marginRight: '0.5rem' }}
            >
              {allCategories.map(c => (
                <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
              ))}
            </select>
          )}
          <select
            value={locationFilter}
            onChange={e => setLocationFilter(e.target.value)}
            className="td-select"
            aria-label="Filter by location"
          >
            {allLocations.map(l => (
              <option key={l} value={l}>{l === 'All' ? 'All Locations' : l}</option>
            ))}
          </select>
        </div>
        <div className="td-count">{filtered.length} of {data.length} techniques</div>
      </div>

      <div className="td-scroll">
        {filtered.length === 0 ? (
          <div className="td-empty">No techniques match your search.</div>
        ) : (
          <table className="td-table">
            <thead>
              <tr>
                <th>Technique</th>
                <th>Eponym / Origin</th>
                <th>Location</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {hasCategories && grouped ? (
                grouped.flatMap(({ category, rows }) => [
                  <tr key={`hdr-${category}`} className="td-category-header">
                    <td colSpan={4} style={{
                      backgroundColor: 'var(--warwiki-bg-subtle, #EEF2F8)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      letterSpacing: '0.02em',
                      color: 'var(--ifm-color-primary, #185FA5)',
                      padding: '0.6rem 0.75rem',
                      borderTop: '2px solid var(--warwiki-border, #DDE3ED)',
                    }}>
                      {category}
                    </td>
                  </tr>,
                  ...rows.map((t, i) => (
                    <tr key={`${category}-${i}`}>
                      <td className="td-name-cell">
                        {t.slug ? (
                          <a href={t.slug} className="td-name-link">{t.name}</a>
                        ) : (
                          <span className="td-name-text">{t.name}</span>
                        )}
                        {t.aka && (
                          <div className="td-aka">{t.aka}</div>
                        )}
                      </td>
                      <td className="td-eponym">{t.eponym ?? '—'}</td>
                      <td><LocationBadge location={t.location} /></td>
                      <td className="td-notes">{t.notes}</td>
                    </tr>
                  )),
                ])
              ) : (
                filtered.map((t, i) => (
                  <tr key={i}>
                    <td className="td-name-cell">
                      {t.slug ? (
                        <a href={t.slug} className="td-name-link">{t.name}</a>
                      ) : (
                        <span className="td-name-text">{t.name}</span>
                      )}
                      {t.aka && (
                        <div className="td-aka">{t.aka}</div>
                      )}
                    </td>
                    <td className="td-eponym">{t.eponym ?? '—'}</td>
                    <td><LocationBadge location={t.location} /></td>
                    <td className="td-notes">{t.notes}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
