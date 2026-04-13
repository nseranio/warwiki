import React, { useState, useMemo } from 'react';
import { journals, JournalArticle } from '@site/src/data/journals';

const DESIGN_COLORS: Record<string, string> = {
  RCT:         '#16a34a',
  Review:      '#0369a1',
  Prospective: '#7c3aed',
  Cohort:      '#b45309',
};

function DesignBadge({ design }: { design: string }) {
  if (!design) return null;
  const color = DESIGN_COLORS[design] ?? '#6b7280';
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: '0.65rem',
        fontWeight: 700,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        padding: '0.1em 0.5em',
        borderRadius: '4px',
        backgroundColor: color,
        color: '#fff',
        marginLeft: '0.4rem',
        verticalAlign: 'middle',
        flexShrink: 0,
      }}
    >
      {design}
    </span>
  );
}

function CategoryPill({ category }: { category: string }) {
  const colors: Record<string, string> = {
    GURS:    '#7c3aed',
    URPS:    '#0d9373',
    General: '#374151',
  };
  const bg = colors[category] ?? '#6b7280';
  return (
    <span
      style={{
        fontSize: '0.65rem',
        fontWeight: 700,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        padding: '0.1em 0.45em',
        borderRadius: '4px',
        backgroundColor: bg + '22',
        color: bg,
        border: `1px solid ${bg}44`,
        flexShrink: 0,
      }}
    >
      {category}
    </span>
  );
}

function ArticleCard({ article }: { article: JournalArticle }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="jt-card">
      <div className="jt-card-header">
        <div className="jt-card-badges">
          <CategoryPill category={article.category} />
          <span className="jt-topic-tag">{article.topic}</span>
          <DesignBadge design={article.design} />
        </div>
        <div className="jt-card-meta">
          <span className="jt-authors">{article.authors}</span>
          <span className="jt-sep">·</span>
          <span className="jt-journal">{article.journal}</span>
          {article.year && (
            <>
              <span className="jt-sep">·</span>
              <span className="jt-year">{article.year}</span>
            </>
          )}
        </div>
        <div className="jt-card-title">
          {article.link ? (
            <a href={article.link} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          ) : (
            article.title
          )}
        </div>
      </div>

      {article.abstract && (
        <div className="jt-card-footer">
          <button
            className="jt-abstract-toggle"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            {expanded ? '▲ Hide abstract' : '▼ Show abstract'}
          </button>
          {expanded && (
            <p className="jt-abstract-text">{article.abstract}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function JournalTable() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [topic, setTopic] = useState('All');
  const [design, setDesign] = useState('All');

  const allTopics = useMemo(() => {
    const s = new Set(journals.map(j => j.topic).filter(Boolean));
    return ['All', ...Array.from(s).sort()];
  }, []);

  const allDesigns = useMemo(() => {
    const s = new Set(journals.map(j => j.design).filter(Boolean));
    return ['All', ...Array.from(s).sort()];
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return journals.filter(j => {
      if (category !== 'All' && j.category !== category) return false;
      if (topic !== 'All' && j.topic !== topic) return false;
      if (design !== 'All' && j.design !== design) return false;
      if (q) {
        return (
          j.title.toLowerCase().includes(q) ||
          j.authors.toLowerCase().includes(q) ||
          j.journal.toLowerCase().includes(q) ||
          j.abstract.toLowerCase().includes(q) ||
          j.topic.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [search, category, topic, design]);

  return (
    <div className="jt-wrapper">
      <div className="jt-controls">
        <input
          type="search"
          placeholder="Search titles, authors, journals, abstracts…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="jt-search"
          aria-label="Search journal database"
        />
        <div className="jt-filters">
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="jt-select"
            aria-label="Filter by specialty"
          >
            <option value="All">All Specialties</option>
            <option value="GURS">GURS</option>
            <option value="URPS">URPS</option>
            <option value="General">General</option>
          </select>
          <select
            value={topic}
            onChange={e => setTopic(e.target.value)}
            className="jt-select"
            aria-label="Filter by topic"
          >
            {allTopics.map(t => (
              <option key={t} value={t}>{t === 'All' ? 'All Topics' : t}</option>
            ))}
          </select>
          <select
            value={design}
            onChange={e => setDesign(e.target.value)}
            className="jt-select"
            aria-label="Filter by study design"
          >
            {allDesigns.map(d => (
              <option key={d} value={d}>{d === 'All' ? 'All Designs' : d}</option>
            ))}
          </select>
        </div>
        <div className="jt-count">
          {filtered.length} of {journals.length} articles
        </div>
      </div>

      <div className="jt-list">
        {filtered.length === 0 ? (
          <div className="jt-empty">No articles match your search.</div>
        ) : (
          filtered.map((article, i) => (
            <ArticleCard key={i} article={article} />
          ))
        )}
      </div>
    </div>
  );
}
