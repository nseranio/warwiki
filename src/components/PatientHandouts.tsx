import React, {useMemo, useState} from 'react';
import {
  PATIENT_HANDOUTS,
  HANDOUT_CATEGORY_ORDER,
  HANDOUT_SUBCATEGORY_ORDER,
  HANDOUT_LANGUAGES,
  HANDOUT_AUDIENCES,
  DEFAULT_LANGUAGE,
  handoutHasLanguage,
  handoutMatchesAudience,
  handoutPdfPath,
  handoutThumbPath,
} from '@site/src/data/handouts';
import type {HandoutAudience} from '@site/src/data/handouts';

/**
 * Gallery of WARWIKI Original Patient Handouts.
 * - A search box + category filter narrow the list (matches title, description,
 *   category, subcategory).
 * - A language dropdown swaps every card's thumbnail and download link;
 *   handouts without a translation yet fall back to English and show a
 *   "translation coming soon" note. A language is selectable once at least one
 *   handout offers it.
 * Cards are grouped category → subcategory. Data + helpers live in
 * src/data/handouts.ts.
 */
export default function PatientHandouts(): React.ReactElement {
  const [lang, setLang] = useState(DEFAULT_LANGUAGE);
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('all');
  const [audience, setAudience] = useState<HandoutAudience>('all');

  // A language is selectable once at least one handout offers it.
  const liveCount = (code: string) =>
    PATIENT_HANDOUTS.filter((h) => handoutHasLanguage(h, code)).length;
  const isLive = (code: string) =>
    code === DEFAULT_LANGUAGE || liveCount(code) > 0;
  const langMeta = HANDOUT_LANGUAGES.find((l) => l.code === lang);

  // Categories present in the data, in defined order.
  const categories = HANDOUT_CATEGORY_ORDER.filter((c) =>
    PATIENT_HANDOUTS.some((h) => h.category === c),
  );

  const q = query.trim().toLowerCase();
  const matches = useMemo(
    () =>
      PATIENT_HANDOUTS.filter((h) => {
        if (cat !== 'all' && h.category !== cat) return false;
        if (!handoutMatchesAudience(h, audience)) return false;
        if (!q) return true;
        return `${h.title} ${h.description} ${h.category} ${h.subcategory}`
          .toLowerCase()
          .includes(q);
      }),
    [q, cat, audience],
  );

  const groups = HANDOUT_CATEGORY_ORDER.map((category) => {
    const inCat = matches.filter((h) => h.category === category);
    const subgroups = HANDOUT_SUBCATEGORY_ORDER.map((subcategory) => ({
      subcategory,
      items: inCat.filter((h) => h.subcategory === subcategory),
    })).filter((s) => s.items.length > 0);
    return {category, count: inCat.length, subgroups};
  }).filter((g) => g.count > 0);

  const filtered = q !== '' || cat !== 'all' || audience !== 'all';

  const renderCard = (h: (typeof PATIENT_HANDOUTS)[number], category: string) => {
    const has = handoutHasLanguage(h, lang);
    const effective = has ? lang : DEFAULT_LANGUAGE;
    return (
      <a
        className="ph-card"
        key={h.slug}
        href={handoutPdfPath(h.slug, effective)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="ph-thumb">
          <img
            src={handoutThumbPath(h.slug, effective)}
            alt={`${h.title} — patient handout, page 1`}
            loading="lazy"
          />
        </div>
        <div className="ph-body">
          <div className="ph-cat">{category}</div>
          <div className="ph-title">{h.title}</div>
          <div className="ph-desc">{h.description}</div>
          {!has && lang !== DEFAULT_LANGUAGE && langMeta && (
            <div className="ph-soon">
              {langMeta.englishLabel} coming soon — showing English
            </div>
          )}
          <div className="ph-dl">Download PDF · {h.pages} pages</div>
        </div>
      </a>
    );
  };

  return (
    <div className="ph-wrap">
      <div className="ph-controls">
        <input
          type="search"
          className="ph-search"
          placeholder="Search handouts…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search handouts"
        />
        <div className="ph-selectwrap">
          <select
            className="ph-filter"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            aria-label="Filter by category"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="ph-selectwrap">
          <select
            className="ph-filter"
            value={audience}
            onChange={(e) => setAudience(e.target.value as HandoutAudience)}
            aria-label="Filter by audience"
          >
            {HANDOUT_AUDIENCES.map((a) => (
              <option key={a.value} value={a.value}>
                {a.label}
              </option>
            ))}
          </select>
        </div>
        <div className="ph-selectwrap">
          <select
            className="ph-filter"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            aria-label="Language"
          >
            {HANDOUT_LANGUAGES.map((l) => {
              const live = isLive(l.code);
              return (
                <option key={l.code} value={l.code} disabled={!live}>
                  {l.code === DEFAULT_LANGUAGE
                    ? l.label
                    : `${l.label} — ${l.englishLabel}`}
                  {live ? '' : ' (coming soon)'}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {filtered && (
        <div className="ph-resultcount">
          {matches.length} of {PATIENT_HANDOUTS.length} handouts
        </div>
      )}

      {groups.length === 0 ? (
        <p className="ph-empty">
          No handouts match your search. Try a different word or clear the
          filters.
        </p>
      ) : (
        groups.map(({category, count, subgroups}) => (
          <section className="ph-group" key={category}>
            <h2 className="ph-group-title">
              {category}
              <span className="ph-count">{count}</span>
            </h2>
            {subgroups.map(({subcategory, items}) => (
              <div className="ph-subgroup" key={subcategory}>
                {subgroups.length > 1 && (
                  <h3 className="ph-subtitle">{subcategory}</h3>
                )}
                <div className="ph-grid">
                  {items.map((h) => renderCard(h, category))}
                </div>
              </div>
            ))}
          </section>
        ))
      )}
    </div>
  );
}
