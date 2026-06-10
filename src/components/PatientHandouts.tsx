import React, {useState} from 'react';
import {
  PATIENT_HANDOUTS,
  HANDOUT_CATEGORY_ORDER,
  HANDOUT_LANGUAGES,
  DEFAULT_LANGUAGE,
  handoutHasLanguage,
  handoutPdfPath,
  handoutThumbPath,
} from '@site/src/data/handouts';

/**
 * Gallery of WARWIKI Original Patient Handouts, grouped by category.
 * A language tab bar at the top swaps every card's thumbnail and download
 * link to the selected language. Handouts without a translation yet fall back
 * to English and show a "translation coming soon" note. Data + language list
 * + asset-path helpers live in src/data/handouts.ts.
 */
export default function PatientHandouts(): React.ReactElement {
  const [lang, setLang] = useState(DEFAULT_LANGUAGE);

  const groups = HANDOUT_CATEGORY_ORDER.map((category) => ({
    category,
    items: PATIENT_HANDOUTS.filter((h) => h.category === category),
  })).filter((g) => g.items.length > 0);

  // A language tab is "live" when at least one handout offers it; otherwise it
  // is shown disabled so the gallery advertises what is coming.
  const liveCount = (code: string) =>
    PATIENT_HANDOUTS.filter((h) => handoutHasLanguage(h, code)).length;

  return (
    <div className="ph-wrap">
      <div className="ph-langbar" role="tablist" aria-label="Handout language">
        {HANDOUT_LANGUAGES.map((l) => {
          const available = l.code === DEFAULT_LANGUAGE || liveCount(l.code) > 0;
          const active = lang === l.code;
          return (
            <button
              key={l.code}
              type="button"
              role="tab"
              aria-selected={active}
              className={
                'ph-lang' +
                (active ? ' is-active' : '') +
                (available ? '' : ' ph-lang--soon')
              }
              onClick={() => setLang(l.code)}
              title={available ? l.englishLabel : `${l.englishLabel} — coming soon`}
            >
              <span className="ph-lang-name" dir={l.dir}>
                {l.label}
              </span>
              <span className="ph-lang-en">{l.englishLabel}</span>
            </button>
          );
        })}
      </div>

      {groups.map(({category, items}) => (
        <section className="ph-group" key={category}>
          <h2 className="ph-group-title">
            {category}
            <span className="ph-count">{items.length}</span>
          </h2>
          <div className="ph-grid">
            {items.map((h) => {
              const has = handoutHasLanguage(h, lang);
              const effective = has ? lang : DEFAULT_LANGUAGE;
              const langMeta = HANDOUT_LANGUAGES.find((l) => l.code === lang);
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
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
