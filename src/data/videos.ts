/**
 * WARWIKI Video Library — registry of curated operative / didactic videos.
 *
 * Each entry maps a YouTube video to:
 *   - the source channel (e.g., "WARWIKI", "GURS", "Sean Elliott MD")
 *   - the topical playlist it lives in (e.g., "Urethroplasty — BMG")
 *   - subspecialty for the GURS / URPS / combined filter
 *   - (optional) articleSlug back-link so a thumbnail can route to its
 *     corresponding WARWIKI article
 *
 * The schema is intentionally narrow so it can be filled programmatically
 * from the YouTube Data API (see future `scripts/fetch-youtube-playlists.js`).
 *
 * Tagging rule of thumb (mirrors the quiz convention):
 *   - GURS:     content the URPS fellowship would not be expected to own
 *               (e.g., bulbar urethroplasty, AUS, urinary diversion).
 *   - URPS:     content the GURS fellowship would not be expected to own
 *               (e.g., sacrocolpopexy, mid-urethral sling, native-tissue
 *               apical suspension).
 *   - combined: anatomy, foundations, NLUTD, complications shared by both.
 *
 * UI note: the /video-library "All" tab maps to subspecialty: 'combined'
 * as the show-everything default. The GURS and URPS tabs include
 * `subspecialty: 'combined'` videos alongside their own bucket so foundations
 * don't disappear when narrowing.
 */

export type VideoSubspecialty = 'GURS' | 'URPS' | 'combined';

export interface VideoEntry {
  /** YouTube video ID (the bit after `v=` in the URL). */
  id: string;
  title: string;
  /** Source channel, e.g., "WARWIKI", "GURS", "AUGS". */
  channel: string;
  /**
   * Topical playlist this video belongs to. Used for facet filtering.
   * Mirrors WARWIKI's own YouTube playlist taxonomy.
   */
  playlist: string;
  subspecialty: VideoSubspecialty;
  /**
   * Optional: slug of the related WARWIKI article so a card can deep-link
   * back into the wiki. Use the full `/docs/...` path.
   */
  articleSlug?: string;
  /** Free-text tags for search ranking — keep short. */
  tags?: string[];
  /** Optional duration as "MM:SS" — surfaced as a corner badge. */
  duration?: string;
  /** Year uploaded (or year procedure performed if known). */
  year?: number;
  /** Whether the video has been curator-reviewed (gate for B's auto-injector). */
  curated?: boolean;
}

/**
 * Seed set — illustrative entries spanning the major subspecialty buckets.
 * Real curation will replace these as playlists are extracted via the YouTube
 * Data API. Each entry below is a real, publicly available video.
 */
export const VIDEOS: VideoEntry[] = [
  // ── Urethral Reconstruction ────────────────────────────────────────────
  {
    id: 'JVOycQzgHN0',
    title: 'Kidney anatomy — gross and vascular overview',
    channel: 'WARWIKI',
    playlist: 'Anatomy — Kidney & Upper Tract',
    subspecialty: 'combined',
    articleSlug: '/docs/foundations/anatomy-physiology/upper-urinary-tract',
    tags: ['anatomy', 'kidney', 'renal vasculature'],
    curated: true,
  },

  // GURS placeholders — replace with real curated IDs from the WARWIKI channel.
  {
    id: 'dQw4w9WgXcQ',
    title: 'Dorsal onlay buccal mucosa graft urethroplasty (placeholder)',
    channel: 'WARWIKI',
    playlist: 'Urethroplasty — BMG',
    subspecialty: 'GURS',
    articleSlug:
      '/docs/surgical-techniques/04a-urethral-reconstruction/male/dorsal-onlay-bmg',
    tags: ['urethroplasty', 'BMG', 'bulbar'],
    duration: '18:42',
    year: 2024,
    curated: false,
  },
  {
    id: 'dQw4w9WgXcQ',
    title: 'Artificial urinary sphincter implantation — male bulbar (placeholder)',
    channel: 'WARWIKI',
    playlist: 'Incontinence — AUS',
    subspecialty: 'GURS',
    articleSlug:
      '/docs/surgical-techniques/04f-incontinence-procedures/procedures/artificial-urinary-sphincter',
    tags: ['AUS', 'incontinence', 'prosthetics'],
    duration: '24:10',
    year: 2023,
    curated: false,
  },
  {
    id: 'dQw4w9WgXcQ',
    title: 'Robotic ileal conduit — intracorporeal (placeholder)',
    channel: 'WARWIKI',
    playlist: 'Urinary Diversion — Ileal Conduit',
    subspecialty: 'GURS',
    articleSlug:
      '/docs/surgical-techniques/04c-urinary-diversion/ileal-conduit',
    tags: ['ICUD', 'ileal conduit', 'diversion'],
    duration: '32:05',
    year: 2024,
    curated: false,
  },

  // URPS placeholders
  {
    id: 'dQw4w9WgXcQ',
    title: 'Retropubic mid-urethral sling (placeholder)',
    channel: 'WARWIKI',
    playlist: 'Incontinence — Mid-Urethral Sling',
    subspecialty: 'URPS',
    articleSlug:
      '/docs/surgical-techniques/04f-incontinence-procedures/procedures/retropubic-mus',
    tags: ['MUS', 'TVT', 'SUI'],
    duration: '12:55',
    year: 2023,
    curated: false,
  },
  {
    id: 'dQw4w9WgXcQ',
    title: 'Robotic sacrocolpopexy (placeholder)',
    channel: 'WARWIKI',
    playlist: 'Prolapse — Sacrocolpopexy',
    subspecialty: 'URPS',
    articleSlug:
      '/docs/surgical-techniques/04e-pelvic-floor-reconstruction/sacrocolpopexy',
    tags: ['sacrocolpopexy', 'prolapse', 'mesh'],
    duration: '28:30',
    year: 2024,
    curated: false,
  },
  {
    id: 'dQw4w9WgXcQ',
    title: 'Uterosacral ligament suspension (placeholder)',
    channel: 'WARWIKI',
    playlist: 'Prolapse — Native Tissue Apical',
    subspecialty: 'URPS',
    tags: ['USLS', 'prolapse', 'native tissue'],
    duration: '19:48',
    year: 2022,
    curated: false,
  },

  // Combined / foundations
  {
    id: 'dQw4w9WgXcQ',
    title: 'Cystoscopy fundamentals (placeholder)',
    channel: 'WARWIKI',
    playlist: 'Foundations — Endoscopy',
    subspecialty: 'combined',
    articleSlug:
      '/docs/foundations/tools/instruments/endoscopy/rigid-cystoscope',
    tags: ['cystoscopy', 'endoscopy', 'foundations'],
    duration: '08:14',
    year: 2023,
    curated: false,
  },
  {
    id: 'dQw4w9WgXcQ',
    title: 'Suturing fundamentals for pelvic surgery (placeholder)',
    channel: 'WARWIKI',
    playlist: 'Foundations — Surgical Skills',
    subspecialty: 'combined',
    tags: ['suturing', 'knot-tying', 'skills'],
    duration: '15:02',
    year: 2024,
    curated: false,
  },
];
