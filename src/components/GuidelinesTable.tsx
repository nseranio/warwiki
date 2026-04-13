import React, { useState, useMemo } from 'react';

export interface Guideline {
  title: string;
  organization: string;
  topic: string;
  year: string | number;
  type: 'Guideline' | 'White Paper' | 'Position Statement' | 'Consensus Statement' | 'Best Practice Statement' | 'Terminology';
  link: string;
  summary?: string;
}

const ORG_COLORS: Record<string, string> = {
  AUA:    '#185FA5',
  EAU:    '#1d4ed8',
  AUGS:   '#0D9373',
  SUFU:   '#047857',
  IUGA:   '#059669',
  ICS:    '#0e7490',
  ACOG:   '#7c3aed',
  WPATH:  '#b45309',
  ACS:    '#64748b',
  ISAKOS: '#374151',
};

const TYPE_COLORS: Record<string, string> = {
  'Guideline':             '#185FA5',
  'White Paper':           '#7c3aed',
  'Position Statement':    '#0D9373',
  'Consensus Statement':   '#b45309',
  'Best Practice Statement': '#0369a1',
  'Terminology':           '#6b7280',
};

function OrgBadge({ org }: { org: string }) {
  const color = ORG_COLORS[org] ?? '#6b7280';
  return (
    <span style={{
      display: 'inline-block',
      fontSize: '0.65rem',
      fontWeight: 800,
      letterSpacing: '0.05em',
      padding: '0.1em 0.5em',
      borderRadius: '4px',
      backgroundColor: color,
      color: '#fff',
      whiteSpace: 'nowrap',
      flexShrink: 0,
    }}>
      {org}
    </span>
  );
}

function TypeBadge({ type }: { type: string }) {
  const color = TYPE_COLORS[type] ?? '#6b7280';
  return (
    <span style={{
      display: 'inline-block',
      fontSize: '0.62rem',
      fontWeight: 600,
      letterSpacing: '0.03em',
      padding: '0.1em 0.45em',
      borderRadius: '4px',
      backgroundColor: color + '18',
      color: color,
      border: `1px solid ${color}44`,
      whiteSpace: 'nowrap',
      flexShrink: 0,
    }}>
      {type}
    </span>
  );
}

interface GuidelinesTableProps {
  data: Guideline[];
}

export default function GuidelinesTable({ data }: GuidelinesTableProps) {
  const [search, setSearch] = useState('');
  const [org, setOrg] = useState('All');
  const [topic, setTopic] = useState('All');
  const [type, setType] = useState('All');
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const allOrgs   = useMemo(() => ['All', ...Array.from(new Set(data.map(d => d.organization))).sort()], [data]);
  const allTopics = useMemo(() => ['All', ...Array.from(new Set(data.map(d => d.topic))).sort()], [data]);
  const allTypes  = useMemo(() => ['All', ...Array.from(new Set(data.map(d => d.type))).sort()], [data]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return data.filter(d => {
      if (org   !== 'All' && d.organization !== org)   return false;
      if (topic !== 'All' && d.topic !== topic)         return false;
      if (type  !== 'All' && d.type  !== type)          return false;
      if (q) {
        return (
          d.title.toLowerCase().includes(q) ||
          d.organization.toLowerCase().includes(q) ||
          d.topic.toLowerCase().includes(q) ||
          (d.summary?.toLowerCase().includes(q) ?? false)
        );
      }
      return true;
    });
  }, [data, search, org, topic, type]);

  return (
    <div className="jt-wrapper">
      <div className="jt-controls">
        <input
          type="search"
          placeholder="Search guidelines, societies, topics…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="jt-search"
          aria-label="Search guidelines"
        />
        <div className="jt-filters">
          <select value={org}   onChange={e => setOrg(e.target.value)}   className="jt-select">
            {allOrgs.map(o   => <option key={o} value={o}>{o === 'All' ? 'All Societies' : o}</option>)}
          </select>
          <select value={topic} onChange={e => setTopic(e.target.value)} className="jt-select">
            {allTopics.map(t => <option key={t} value={t}>{t === 'All' ? 'All Topics'    : t}</option>)}
          </select>
          <select value={type}  onChange={e => setType(e.target.value)}  className="jt-select">
            {allTypes.map(ty  => <option key={ty} value={ty}>{ty === 'All' ? 'All Types' : ty}</option>)}
          </select>
        </div>
        <div className="jt-count">{filtered.length} of {data.length} documents</div>
      </div>

      <div className="jt-list">
        {filtered.length === 0 ? (
          <div className="jt-empty">No documents match your search.</div>
        ) : (
          filtered.map((g, i) => (
            <div key={i} className="jt-card">
              <div className="jt-card-header">
                <div className="jt-card-badges">
                  <OrgBadge org={g.organization} />
                  <TypeBadge type={g.type} />
                  <span className="jt-topic-tag">{g.topic}</span>
                </div>
                <div className="jt-card-meta">
                  <span className="jt-authors">{g.organization}</span>
                  {g.year && <><span className="jt-sep">·</span><span className="jt-year">{g.year}</span></>}
                </div>
                <div className="jt-card-title">
                  {g.link ? (
                    <a href={g.link} target="_blank" rel="noopener noreferrer">{g.title}</a>
                  ) : g.title}
                </div>
              </div>
              {g.summary && (
                <div className="jt-card-footer">
                  <button
                    className="jt-abstract-toggle"
                    onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
                    aria-expanded={expandedIdx === i}
                  >
                    {expandedIdx === i ? '▲ Hide summary' : '▼ Show summary'}
                  </button>
                  {expandedIdx === i && (
                    <p className="jt-abstract-text">{g.summary}</p>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
