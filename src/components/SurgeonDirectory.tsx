import React, { useState, useMemo } from 'react';
import { getInitials, type Subspecialty } from '../data/surgeons';
import { LINEAGE, LINEAGE_BY_ID, childrenOf, lineageBySubspecialty, type LineageNode } from '../data/lineage';

const PAGE_BASE = '/docs/roots/surgeons/';
const PAGE_SIZE = 60;

function Avatar({ node }: { node: LineageNode }) {
  const [imgError, setImgError] = useState(false);
  const photo = node.surgeon?.photo;
  return (
    <div className="sd-avatar">
      {photo && !imgError ? (
        <img src={photo} alt={node.name} onError={() => setImgError(true)} />
      ) : (
        <span className="sd-avatar-initials">{getInitials(node.name)}</span>
      )}
    </div>
  );
}

function PersonLink({ node }: { node: LineageNode }) {
  return node.path ? <a href={`${PAGE_BASE}${node.path}`}>{node.name}</a> : <>{node.name}</>;
}

export default function SurgeonDirectory({ subspecialty }: { subspecialty?: Subspecialty } = {}) {
  const [search, setSearch] = useState('');
  const [profilesOnly, setProfilesOnly] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const pool = useMemo(
    () => (subspecialty ? lineageBySubspecialty(subspecialty) : LINEAGE),
    [subspecialty],
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return pool.filter(n => {
      if (profilesOnly && !n.path) return false;
      if (!q) return true;
      const mentor = n.mentorId ? LINEAGE_BY_ID.get(n.mentorId) : undefined;
      return (
        n.name.toLowerCase().includes(q) ||
        (n.surgeon?.country?.toLowerCase().includes(q) ?? false) ||
        (n.position?.toLowerCase().includes(q) ?? false) ||
        (mentor?.name.toLowerCase().includes(q) ?? false)
      );
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [search, pool, profilesOnly]);

  const visible = showAll || search ? filtered : filtered.slice(0, PAGE_SIZE);

  return (
    <div className="sd-wrapper">
      <div className="sd-controls">
        <input
          type="search"
          placeholder="Search surgeons, mentors, institutions…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="sd-search"
          aria-label="Search surgeons"
        />
        <label className="sd-filter">
          <input type="checkbox" checked={profilesOnly} onChange={e => setProfilesOnly(e.target.checked)} />
          Profiles only
        </label>
        <div className="sd-count">{filtered.length} of {pool.length} surgeons</div>
      </div>

      {pool.length === 0 ? (
        <div className="sd-empty">No surgeons have been added for this subspecialty.</div>
      ) : filtered.length === 0 ? (
        <div className="sd-empty">No surgeons match your search.</div>
      ) : (
        <>
          <ul className="sd-list">
            {visible.map(n => {
              const mentor = n.mentorId ? LINEAGE_BY_ID.get(n.mentorId) : undefined;
              const coMentor = n.coMentorId ? LINEAGE_BY_ID.get(n.coMentorId) : undefined;
              const traineeCount = childrenOf(n.id).length;
              const s = n.surgeon;
              const position = s?.institution ?? n.position;
              return (
                <li key={n.id} className="sd-row">
                  {n.path ? (
                    <a href={`${PAGE_BASE}${n.path}`} className="sd-row-avatar-link" tabIndex={-1}>
                      <Avatar node={n} />
                    </a>
                  ) : (
                    <Avatar node={n} />
                  )}
                  <div className="sd-row-body">
                    {n.path ? (
                      <a href={`${PAGE_BASE}${n.path}`} className="sd-row-name">{n.name}</a>
                    ) : (
                      <span className="sd-row-name sd-row-name--plain">{n.name}</span>
                    )}
                    <div className="sd-row-meta">
                      {s?.countryFlag && <span className="sd-meta-flag">{s.countryFlag}</span>}
                      {s?.country && <span className="sd-meta-country">{s.country}</span>}
                      {mentor && (
                        <>
                          {s?.country && <span className="sd-meta-sep">·</span>}
                          <span className="sd-meta-mentor">
                            Trained by <PersonLink node={mentor} />
                            {coMentor && <> and <PersonLink node={coMentor} /></>}
                            {n.year && ` (${n.year})`}
                          </span>
                        </>
                      )}
                      {traineeCount > 0 && (
                        <>
                          <span className="sd-meta-sep">·</span>
                          <span className="sd-meta-trainees">{traineeCount} trainee{traineeCount !== 1 ? 's' : ''}</span>
                        </>
                      )}
                      {(s?.born || s?.died) && (
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
                    {position && <div className="sd-row-position">{position}</div>}
                  </div>
                </li>
              );
            })}
          </ul>
          {visible.length < filtered.length && (
            <button type="button" className="sd-show-all" onClick={() => setShowAll(true)}>
              Show all {filtered.length} surgeons
            </button>
          )}
        </>
      )}
    </div>
  );
}
