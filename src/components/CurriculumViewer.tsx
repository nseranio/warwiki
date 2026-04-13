import React, { useState } from 'react';
import { CURRICULA, type Curriculum, type CurriculumSection } from '../data/curriculum';

function CurriculumPane({ curriculum }: { curriculum: Curriculum }) {
  const [allOpen, setAllOpen] = useState(false);
  const [key, setKey] = useState(0);

  function toggleAll() {
    setAllOpen(o => !o);
    setKey(k => k + 1);
  }

  return (
    <div className="cv-pane">
      <div className="cv-pane-header">
        <div className="cv-pane-meta">
          <span className="cv-pane-label" style={{ color: curriculum.color }}>
            {curriculum.label}
          </span>
          <span className="cv-pane-fullname">{curriculum.fullName}</span>
        </div>
        <button className="cv-expand-all" onClick={toggleAll}>
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </div>

      <div className="cv-sections" key={key}>
        {curriculum.sections.map(section => (
          <ExpandableSection
            key={`${section.number}-${key}`}
            section={section}
            accentColor={curriculum.color}
            forceOpen={allOpen}
          />
        ))}
      </div>
    </div>
  );
}

function ExpandableSection({
  section,
  accentColor,
  forceOpen,
}: {
  section: CurriculumSection;
  accentColor: string;
  forceOpen: boolean;
}) {
  const [open, setOpen] = useState(forceOpen);

  // Sync with forceOpen when parent toggles
  React.useEffect(() => {
    setOpen(forceOpen);
  }, [forceOpen]);

  return (
    <div className={`cv-section${open ? ' cv-section--open' : ''}`}>
      <button
        className="cv-section-header"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="cv-section-num" style={{ background: accentColor }}>
          {section.number}
        </span>
        <span className="cv-section-title">{section.title}</span>
        <span className="cv-section-chevron" aria-hidden>
          {open ? '▲' : '▼'}
        </span>
      </button>

      {open && (
        <div className="cv-section-body">
          {section.content.map((item, i) => (
            <div key={i} className="cv-item">
              <div className="cv-item-title" style={{ color: accentColor }}>
                {item.title}
              </div>
              <ul className="cv-item-list">
                {item.items.map((bullet, j) => (
                  <li key={j}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CurriculumViewer() {
  const [activeId, setActiveId] = useState(CURRICULA[0].id);
  const active = CURRICULA.find(c => c.id === activeId)!;

  return (
    <div className="cv-wrapper">
      {/* Toggle bar */}
      <div className="cv-toggle-bar">
        {CURRICULA.map(c => (
          <button
            key={c.id}
            className={`cv-toggle-btn${activeId === c.id ? ' cv-toggle-btn--active' : ''}`}
            style={activeId === c.id ? { background: c.color, borderColor: c.color } : undefined}
            onClick={() => setActiveId(c.id)}
          >
            <span className="cv-toggle-label">{c.label}</span>
            <span className="cv-toggle-full">{c.fullName}</span>
          </button>
        ))}
      </div>

      {/* Curriculum content */}
      <CurriculumPane key={activeId} curriculum={active} />
    </div>
  );
}
