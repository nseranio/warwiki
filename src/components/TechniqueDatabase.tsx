import React, { useState, useMemo } from 'react';

export interface Technique {
  name: string;
  eponym?: string;
  aka?: string;
  location: string;
  notes: string;
  slug?: string;
}

const LOCATION_COLORS: Record<string, string> = {
  'Bulbar':                      '#185FA5',
  'Penile':                      '#7c3aed',
  'Panurethral':                 '#b45309',
  'Fossa Navicularis / Meatal':  '#047857',
  'Posterior / PFUI':            '#b91c1c',
  'Any':                         '#374151',
};

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

  const allLocations = useMemo(
    () => ['All', ...Array.from(new Set(data.map(d => d.location))).sort()],
    [data]
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return data.filter(d => {
      if (locationFilter !== 'All' && d.location !== locationFilter) return false;
      if (q) {
        return (
          d.name.toLowerCase().includes(q) ||
          (d.eponym?.toLowerCase().includes(q) ?? false) ||
          (d.aka?.toLowerCase().includes(q) ?? false) ||
          d.notes.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [data, search, locationFilter]);

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
              {filtered.map((t, i) => (
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
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
