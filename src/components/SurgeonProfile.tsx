import React, { useState } from 'react';
import { SURGEONS_BY_ID, getInitials, type Surgeon } from '../data/surgeons';

const PAGE_BASE = '/docs/roots/surgeons/';

function ComingSoon() {
  return <p className="sp-coming-soon">Content coming soon.</p>;
}

export default function SurgeonProfile({ id, children }: { id: string; children?: React.ReactNode }) {
  const [imgError, setImgError] = useState(false);
  const surgeon = SURGEONS_BY_ID.get(id);

  if (!surgeon) {
    return <p>Surgeon not found: <code>{id}</code></p>;
  }

  const mentor = surgeon.mentorId ? SURGEONS_BY_ID.get(surgeon.mentorId) : undefined;
  const trainees = (surgeon.traineeIds ?? []).map(tid => SURGEONS_BY_ID.get(tid)).filter(Boolean) as Surgeon[];

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
            {surgeon.institution && (
              <span className="sp-hero-meta-item">🏥 {surgeon.institution}</span>
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
      <div className="sp-lineage">
        {mentor && (
          <div className="sp-lineage-item sp-lineage-item--mentor">
            <div className="sp-lineage-label">Mentored by</div>
            <a href={`${PAGE_BASE}${mentor.id}`} className="sp-lineage-name">{mentor.name}</a>
          </div>
        )}
        {!mentor && (
          <div className="sp-lineage-item sp-lineage-item--root">
            <div className="sp-lineage-label">Role</div>
            <div className="sp-lineage-name">Foundational figure</div>
          </div>
        )}
        {trainees.length > 0 && (
          <div className="sp-lineage-item sp-lineage-item--trainees">
            <div className="sp-lineage-label">Trainees ({trainees.length})</div>
            <div className="sp-lineage-trainees">
              {trainees.map(t => (
                <a key={t.id} href={`${PAGE_BASE}${t.id}`} className="sp-trainee-chip">
                  {t.countryFlag} {t.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Content sections ── */}
      <div className="sp-sections">

        <section className="sp-section">
          <h2>Biography</h2>
          {children ?? <ComingSoon />}
        </section>

        <section className="sp-section">
          <h2>Key Publications</h2>
          {surgeon.keyPubs && surgeon.keyPubs.length > 0 ? (
            <ol className="sp-pubs">
              {surgeon.keyPubs.map((pub, i) => <li key={i}>{pub}</li>)}
            </ol>
          ) : <ComingSoon />}
        </section>

        <section className="sp-section">
          <h2>Preferred Instruments & Setup</h2>
          {surgeon.instruments && surgeon.instruments.length > 0 ? (
            <ul className="sp-instruments">
              {surgeon.instruments.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          ) : <ComingSoon />}
        </section>

        <section className="sp-section">
          <h2>Videos & Media</h2>
          <ComingSoon />
        </section>

      </div>
    </div>
  );
}
