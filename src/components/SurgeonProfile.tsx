import React, { useState } from 'react';
import type { Surgeon } from '../data/surgeons';

const PAGE_BASE = '/docs/roots/surgeons/';
const CITES_SHOWN = 12;
const PAGES_SHOWN = 3;

export interface SurgeonCitation {
  cite: string;
  doi?: string | null;
  year?: number | null;
  pages: { title: string; url: string; ref: string }[];
}

/**
 * Precomputed by scripts/genealogy/gen-profile-lineage.js
 * (src/data/surgeon-profiles/<id>.json), so a profile page does not bundle
 * the full lineage trees.
 */
export interface ProfileData {
  surgeon: Partial<Surgeon> & { name: string };
  position: string | null;
  year: number | null;
  mentor: ProfilePerson | null;
  coMentor: ProfilePerson | null;
  school: string | null;
  trainees: (ProfilePerson & { id: string; year?: number; flag?: string })[];
}

interface ProfilePerson {
  name: string;
  path?: string;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(w => !w.match(/^(Jr\.|Sr\.|III|II|IV|MD|DO|FACS|FRCSC)$/i))
    .map(w => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

function PersonLink({ node, className }: { node: ProfilePerson; className?: string }) {
  return node.path
    ? <a href={`${PAGE_BASE}${node.path}`} className={className}>{node.name}</a>
    : <span className={className}>{node.name}</span>;
}

function CitedOn({ pages }: { pages: SurgeonCitation['pages'] }) {
  const [open, setOpen] = useState(false);
  const shown = open ? pages : pages.slice(0, PAGES_SHOWN);
  return (
    <div className="sp-cite-pages">
      <span className="sp-cite-pages-label">Cited on:</span>{' '}
      {shown.map((p, i) => (
        <React.Fragment key={p.url}>
          {i > 0 && ' · '}
          <a href={`${p.url}#${p.ref}`}>{p.title}</a>
        </React.Fragment>
      ))}
      {pages.length > PAGES_SHOWN && (
        <button type="button" className="sp-cite-more" onClick={() => setOpen(!open)}>
          {open ? 'fewer' : `+${pages.length - PAGES_SHOWN} more pages`}
        </button>
      )}
    </div>
  );
}

function Citations({ name, citations }: { name: string; citations: SurgeonCitation[] }) {
  const [showAll, setShowAll] = useState(false);
  const list = showAll ? citations : citations.slice(0, CITES_SHOWN);
  return (
    <section className="sp-section">
      <h2>Cited on WARWIKI</h2>
      <p className="sp-cites-intro">
        {citations.length} {citations.length === 1 ? 'publication' : 'publications'} with {name} as a listed author{' '}
        {citations.length === 1 ? 'is' : 'are'} cited on WARWIKI, ordered by the number of pages that cite them.
        Papers whose author list is shortened to "et al." before this name are not included.
      </p>
      <ol className="sp-cites">
        {list.map(c => (
          <li key={c.doi ?? c.cite}>
            <span className="sp-cite-text">{c.cite}</span>
            {c.doi && (
              <>
                {' '}
                <a href={`https://doi.org/${c.doi}`} target="_blank" rel="noopener noreferrer" className="sp-cite-doi">
                  doi
                </a>
              </>
            )}
            <CitedOn pages={c.pages} />
          </li>
        ))}
      </ol>
      {citations.length > CITES_SHOWN && (
        <button type="button" className="sp-cites-toggle" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Show fewer' : `Show all ${citations.length} publications`}
        </button>
      )}
    </section>
  );
}

export default function SurgeonProfile({
  id,
  profile,
  citations = [],
  children,
}: {
  id: string;
  profile?: ProfileData;
  citations?: SurgeonCitation[];
  children?: React.ReactNode;
}) {
  const [imgError, setImgError] = useState(false);

  if (!profile) {
    return <p>Surgeon not found: <code>{id}</code></p>;
  }

  const { surgeon, mentor, coMentor, school, trainees } = profile;
  const institution = surgeon.institution ?? profile.position;
  const hasLineage = Boolean(mentor || school || trainees.length);

  return (
    <div className="sp-wrapper">
      {/* ── Hero ── */}
      <div className="sp-hero">
        <div className="sp-photo">
          {surgeon.photo && !imgError ? (
            <img src={surgeon.photo} alt={surgeon.name} onError={() => setImgError(true)} />
          ) : (
            <span className="sp-initials">{getInitials(surgeon.name)}</span>
          )}
        </div>
        <div className="sp-hero-info">
          <h1 className="sp-name">{surgeon.name}</h1>
          <div className="sp-hero-meta">
            {surgeon.country && (
              <span className="sp-hero-meta-item">{surgeon.countryFlag} {surgeon.country}</span>
            )}
            {institution && (
              <span className="sp-hero-meta-item">🏥 {institution}</span>
            )}
            {surgeon.title && (
              <span className="sp-hero-meta-item">{surgeon.title}</span>
            )}
            {(surgeon.born || surgeon.died) && (
              <span className="sp-hero-meta-item sp-dates">
                {surgeon.born && `b. ${surgeon.born}`}
                {surgeon.born && surgeon.died && ' – '}
                {surgeon.died && `d. ${surgeon.died}`}
              </span>
            )}
          </div>
          {/* Social / external links */}
          <div className="sp-links">
            {surgeon.website && (
              <a href={surgeon.website} target="_blank" rel="noopener noreferrer" className="sp-link sp-link--web">
                🌐 Website
              </a>
            )}
            {surgeon.youtube && (
              <a href={surgeon.youtube} target="_blank" rel="noopener noreferrer" className="sp-link sp-link--yt">
                ▶ YouTube
              </a>
            )}
            {surgeon.twitter && (
              <a href={`https://twitter.com/${surgeon.twitter}`} target="_blank" rel="noopener noreferrer" className="sp-link sp-link--tw">
                𝕏 {surgeon.twitter}
              </a>
            )}
            {surgeon.instagram && (
              <a href={`https://instagram.com/${surgeon.instagram}`} target="_blank" rel="noopener noreferrer" className="sp-link sp-link--ig">
                📷 {surgeon.instagram}
              </a>
            )}
            {surgeon.bioUrl && (
              <a href={surgeon.bioUrl} target="_blank" rel="noopener noreferrer" className="sp-link sp-link--bio">
                Biography ↗
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Lineage strip ── */}
      {hasLineage && (
      <div className="sp-lineage">
        {mentor && (
          <div className="sp-lineage-item sp-lineage-item--mentor">
            <div className="sp-lineage-label">Mentored by{profile.year ? ` · fellowship ${profile.year}` : ''}</div>
            <PersonLink node={mentor} className="sp-lineage-name" />
            {coMentor && (
              <div className="sp-lineage-co">with <PersonLink node={coMentor} /></div>
            )}
          </div>
        )}
        {school && (
          <div className="sp-lineage-item sp-lineage-item--root">
            <div className="sp-lineage-label">Role</div>
            <div className="sp-lineage-name">Founder, {school}</div>
          </div>
        )}
        {trainees.length > 0 && (
          <div className="sp-lineage-item sp-lineage-item--trainees">
            <div className="sp-lineage-label">Trainees ({trainees.length})</div>
            <div className="sp-lineage-trainees">
              {trainees.map(t => t.path ? (
                <a key={t.id} href={`${PAGE_BASE}${t.path}`} className="sp-trainee-chip">
                  {t.flag} {t.name}{t.year ? ` · ${t.year}` : ''}
                </a>
              ) : (
                <span key={t.id} className="sp-trainee-chip sp-trainee-chip--plain">
                  {t.name}{t.year ? ` · ${t.year}` : ''}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      )}

      {/* ── Content sections ── */}
      <div className="sp-sections">

        {/* Biography MDX supplies its own headings. */}
        {children && <section className="sp-section sp-bio">{children}</section>}

        {surgeon.keyPubs && surgeon.keyPubs.length > 0 && (
          <section className="sp-section">
            <h2>Key Publications</h2>
            <ol className="sp-pubs">
              {surgeon.keyPubs.map((pub, i) => <li key={i}>{pub}</li>)}
            </ol>
          </section>
        )}

        {citations.length > 0 && <Citations name={surgeon.name} citations={citations} />}

        {surgeon.instruments && surgeon.instruments.length > 0 && (
          <section className="sp-section">
            <h2>Preferred Instruments & Setup</h2>
            <ul className="sp-instruments">
              {surgeon.instruments.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>
        )}

      </div>
    </div>
  );
}
