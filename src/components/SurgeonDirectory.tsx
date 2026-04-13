import React, { useState, useMemo } from 'react';
import { SURGEONS, SURGEONS_BY_ID, getInitials, type Surgeon } from '../data/surgeons';

const PAGE_BASE = '/docs/roots/surgeons/';

function Avatar({ surgeon }: { surgeon: Surgeon }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="sd-avatar">
      {surgeon.photo && !imgError ? (
        <img src={surgeon.photo} alt={surgeon.name} onError={() => setImgError(true)} />
      ) : (
        <span className="sd-avatar-initials">{getInitials(surgeon.name)}</span>
      )}
    </div>
  );
}

export default function SurgeonDirectory() {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return SURGEONS.filter(s => {
      if (!q) return true;
      const mentor = s.mentorId ? SURGEONS_BY_ID.get(s.mentorId) : undefined;
      return (
        s.name.toLowerCase().includes(q) ||
        (s.country?.toLowerCase().includes(q) ?? false) ||
        (mentor?.name.toLowerCase().includes(q) ?? false)
      );
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [search]);

  return (
    <div className="sd-wrapper">
      <div className="sd-controls">
        <input
          type="search"
          placeholder="Search surgeons, mentors, countries…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="sd-search"
          aria-label="Search surgeons"
        />
        <div className="sd-count">{filtered.length} of {SURGEONS.length} surgeons</div>
      </div>

      {filtered.length === 0 ? (
        <div className="sd-empty">No surgeons match your search.</div>
      ) : (
        <ul className="sd-list">
          {filtered.map(s => {
            const mentor = s.mentorId ? SURGEONS_BY_ID.get(s.mentorId) : undefined;
            const traineeCount = s.traineeIds?.length ?? 0;
            return (
              <li key={s.id} className="sd-row">
                <a href={`${PAGE_BASE}${s.id}`} className="sd-row-avatar-link">
                  <Avatar surgeon={s} />
                </a>
                <div className="sd-row-body">
                  <a href={`${PAGE_BASE}${s.id}`} className="sd-row-name">{s.name}</a>
                  <div className="sd-row-meta">
                    {s.countryFlag && <span className="sd-meta-flag">{s.countryFlag}</span>}
                    {s.country && <span className="sd-meta-country">{s.country}</span>}
                    {mentor && (
                      <>
                        <span className="sd-meta-sep">·</span>
                        <span className="sd-meta-mentor">
                          Trained by <a href={`${PAGE_BASE}${mentor.id}`}>{mentor.name}</a>
                        </span>
                      </>
                    )}
                    {traineeCount > 0 && (
                      <>
                        <span className="sd-meta-sep">·</span>
                        <span className="sd-meta-trainees">{traineeCount} trainee{traineeCount !== 1 ? 's' : ''}</span>
                      </>
                    )}
                    {(s.born || s.died) && (
                      <>
                        <span className="sd-meta-sep">·</span>
                        <span className="sd-meta-dates">
                          {s.born && `b. ${s.born}`}
                          {s.born && s.died && ' – '}
                          {s.died && `d. ${s.died}`}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
