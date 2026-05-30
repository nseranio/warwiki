import React, { useMemo, useState } from 'react';
import { trials, Trial } from '@site/src/data/trials';

/**
 * Searchable, filterable table of landmark trials. Each row expands in place
 * to a structured key-facts panel — bottom line first, then only the facts
 * that change practice. No navigation; the whole database lives on one page.
 */

const DOMAIN_ORDER = [
  'Stress Incontinence',
  'Mixed Incontinence',
  'OAB / Urgency Incontinence',
  'Fecal Incontinence',
  'Pelvic Organ Prolapse',
  'Urethral Stricture',
  'Urinary Diversion',
  'Male SUI / Prosthetics',
  'Sexual Medicine',
  'BPH / Male LUTS',
  'Infection / Prophylaxis',
  'Surgical / Perioperative',
];

function doiHref(doi?: string) {
  if (!doi) return null;
  return doi.startsWith('http') ? doi : `https://doi.org/${doi}`;
}

function Fact({ label, children }: { label: string; children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <div className="lt-fact">
      <div className="lt-fact-label">{label}</div>
      <div className="lt-fact-value">{children}</div>
    </div>
  );
}

function Detail({ t }: { t: Trial }) {
  const href = doiHref(t.doi);
  return (
    <div className="lt-detail">
      <p className="lt-detail-name">{t.name}</p>
      <p className="lt-detail-meta">
        {t.authors} · <span className="lt-journal">{t.journal}</span> · {t.year}
        {t.n > 0 && <> · n = {t.n.toLocaleString()}</>}
      </p>

      <div className="lt-bottomline">
        <span className="lt-bottomline-tag">Bottom line</span>
        <p>{t.bottomLine}</p>
      </div>

      <div className="lt-facts">
        <Fact label="Population">{t.population}</Fact>
        <Fact label="Comparison">{t.comparison}</Fact>
        <Fact label="Primary outcome">{t.primaryOutcome}</Fact>
        <Fact label="Key result">{t.result}</Fact>
        <Fact label="Guideline impact">{t.guidelineImpact}</Fact>
        <Fact label="Worth knowing">{t.caveat}</Fact>
      </div>

      {href && (
        <a className="lt-paper-link" href={href} target="_blank" rel="noopener noreferrer">
          Read the paper ↗
        </a>
      )}
    </div>
  );
}

export default function LandmarkTrials() {
  const [search, setSearch] = useState('');
  const [domain, setDomain] = useState('All');
  const [open, setOpen] = useState<string | null>(null);

  const domains = useMemo(() => {
    const present = new Set(trials.map(t => t.domain));
    const ordered = DOMAIN_ORDER.filter(d => present.has(d));
    const extra = Array.from(present).filter(d => !DOMAIN_ORDER.includes(d)).sort();
    return ['All', ...ordered, ...extra];
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return trials
      .filter(t => {
        if (domain !== 'All' && t.domain !== domain) return false;
        if (!q) return true;
        return (
          t.acronym.toLowerCase().includes(q) ||
          t.name.toLowerCase().includes(q) ||
          t.authors.toLowerCase().includes(q) ||
          t.domain.toLowerCase().includes(q) ||
          t.bottomLine.toLowerCase().includes(q) ||
          t.result.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        const da = DOMAIN_ORDER.indexOf(a.domain);
        const db = DOMAIN_ORDER.indexOf(b.domain);
        const oa = da < 0 ? 99 : da;
        const ob = db < 0 ? 99 : db;
        if (oa !== ob) return oa - ob;
        return a.acronym.localeCompare(b.acronym);
      });
  }, [search, domain]);

  return (
    <div className="lt-wrapper">
      <div className="lt-controls">
        <input
          type="search"
          className="lt-search"
          placeholder="Search trials — acronym, topic, finding…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          aria-label="Search landmark trials"
        />
        <select
          className="lt-select"
          value={domain}
          onChange={e => setDomain(e.target.value)}
          aria-label="Filter by domain"
        >
          {domains.map(d => (
            <option key={d} value={d}>{d === 'All' ? 'All domains' : d}</option>
          ))}
        </select>
        <span className="lt-count">{filtered.length} of {trials.length} trials</span>
      </div>

      <div className="lt-table">
        <div className="lt-row lt-head">
          <span>Trial</span>
          <span>Domain</span>
          <span>Design · Year</span>
        </div>
        {filtered.length === 0 ? (
          <div className="lt-empty">No trials match your search.</div>
        ) : (
          filtered.map(t => {
            const isOpen = open === t.id;
            return (
              <div key={t.id} className={`lt-item${isOpen ? ' lt-item-open' : ''}`}>
                <button
                  className="lt-row lt-rowbtn"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : t.id)}
                >
                  <span className="lt-trial">
                    <span className="lt-caret" aria-hidden>{isOpen ? '▾' : '▸'}</span>
                    <strong>{t.acronym}</strong>
                    <span className="lt-sub">{t.bottomLine}</span>
                  </span>
                  <span className="lt-domain">{t.domain}</span>
                  <span className="lt-design">{t.design} · {t.year}</span>
                </button>
                {isOpen && <Detail t={t} />}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
