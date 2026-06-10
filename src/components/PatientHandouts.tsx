import React from 'react';
import {PATIENT_HANDOUTS, HANDOUT_CATEGORY_ORDER} from '@site/src/data/handouts';

/**
 * Gallery of WARWIKI Original Patient Handouts, grouped by category.
 * Each card shows a page-1 thumbnail and links to the printable PDF.
 * Data lives in src/data/handouts.ts.
 */
export default function PatientHandouts(): React.ReactElement {
  const groups = HANDOUT_CATEGORY_ORDER.map((category) => ({
    category,
    items: PATIENT_HANDOUTS.filter((h) => h.category === category),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="ph-wrap">
      {groups.map(({category, items}) => (
        <section className="ph-group" key={category}>
          <h2 className="ph-group-title">
            {category}
            <span className="ph-count">{items.length}</span>
          </h2>
          <div className="ph-grid">
            {items.map((h) => (
              <a
                className="ph-card"
                key={h.slug}
                href={`/handouts/${h.slug}.pdf`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="ph-thumb">
                  <img
                    src={`/img/handouts/${h.slug}.png`}
                    alt={`${h.title} — patient handout, page 1`}
                    loading="lazy"
                  />
                </div>
                <div className="ph-body">
                  <div className="ph-cat">{category}</div>
                  <div className="ph-title">{h.title}</div>
                  <div className="ph-desc">{h.description}</div>
                  <div className="ph-dl">Download PDF · {h.pages} pages</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
