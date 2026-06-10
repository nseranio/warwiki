import React, {useState} from 'react';
import {
  PATIENT_HANDOUTS,
  HANDOUT_CATEGORY_ORDER,
  HANDOUT_SUBCATEGORY_ORDER,
  HANDOUT_LANGUAGES,
  DEFAULT_LANGUAGE,
  handoutHasLanguage,
  handoutPdfPath,
  handoutThumbPath,
} from '@site/src/data/handouts';

/**
 * Gallery of WARWIKI Original Patient Handouts, grouped category → subcategory.
 * A language dropdown swaps every card's thumbnail and download link to the
 * selected language; handouts without a translation yet fall back to English
 * and show a "translation coming soon" note. A language option is disabled
 * until at least one handout offers it. Data + language list + asset-path
 * helpers live in src/data/handouts.ts.
 */
export default function PatientHandouts(): React.ReactElement {
  const [lang, setLang] = useState(DEFAULT_LANGUAGE);

  // A language is selectable once at least one handout offers it.
  const liveCount = (code: string) =>
    PATIENT_HANDOUTS.filter((h) => handoutHasLanguage(h, code)).length;
  const isLive = (code: string) =>
    code === DEFAULT_LANGUAGE || liveCount(code) > 0;

  const langMeta = HANDOUT_LANGUAGES.find((l) => l.code === lang);

  const groups = HANDOUT_CATEGORY_ORDER.map((category) => {
    const inCat = PATIENT_HANDOUTS.filter((h) => h.category === category);
    const subgroups = HANDOUT_SUBCATEGORY_ORDER.map((subcategory) => ({
      subcategory,
      items: inCat.filter((h) => h.subcategory === subcategory),
    })).filter((s) => s.items.length > 0);
    return {category, count: inCat.length, subgroups};
  }).filter((g) => g.count > 0);

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
      <div className="ph-langrow">
        <label className="ph-langlabel" htmlFor="ph-lang">
          Language
        </label>
        <div className="ph-langselect-wrap">
          <select
            id="ph-lang"
            className="ph-langselect"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
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

      {groups.map(({category, count, subgroups}) => (
        <section className="ph-group" key={category}>
          <h2 className="ph-group-title">
            {category}
            <span className="ph-count">{count}</span>
          </h2>
          {subgroups.map(({subcategory, items}) => (
            <div className="ph-subgroup" key={subcategory}>
              <h3 className="ph-subtitle">{subcategory}</h3>
              <div className="ph-grid">
                {items.map((h) => renderCard(h, category))}
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
