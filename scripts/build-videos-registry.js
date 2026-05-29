#!/usr/bin/env node
/**
 * build-videos-registry.js
 *
 * Reads src/data/videos.generated.json (produced by fetch-youtube-playlists.js)
 * and emits src/data/videos.ts — the typed array consumed by VideoLibrary.tsx.
 *
 * Why a separate build step (rather than importing the JSON directly in TS):
 *   - Keeps the runtime registry small and tree-shakable.
 *   - Lets us apply subspecialty tagging deterministically at build time.
 *   - Produces a stable, reviewable diff in git when the playlist set changes.
 *
 * Subspecialty tagging is keyword-based on playlist title. The rule of thumb
 * mirrors the quiz convention (`feedback_subspecialty_prove_it`):
 *   GURS  — content the URPS fellowship would not be expected to own
 *   URPS  — content the GURS fellowship would not be expected to own
 *   combined — foundations / anatomy / shared workflow
 *
 * URPS patterns are checked first because some titles ("Urethral Mass:
 * Urethral Diverticulectomy") would otherwise mis-match a broader GURS rule.
 */

const fs = require('node:fs');
const path = require('node:path');

const IN = path.resolve(__dirname, '..', 'src/data/videos.generated.json');
const OUT = path.resolve(__dirname, '..', 'src/data/videos.ts');

const URPS_PATTERNS = [
  /^Female SUI/i,
  /^Female: Bladder Outlet/i,
  /^Prolapse/i,
  /^OAB:/i,
  /^Pelvic Pain/i,
  /^Women's Health/i,
  /Mesh Compilation/i,
  /Urethrolysis/i,
  /Urethral Mass:/i,
  /Manchester/i,
  /GSM/i,
];

const GURS_PATTERNS = [
  /^Male SUI/i,
  /^Urethroplas[ty]y/i,
  /^Urethrectomy/i,
  /^Genital Reconstruction/i,
  /^Trauma/i,
  /^GAS/i,
  /^Buried Penis/i,
  /^BPH/i,
  /^Upper Tract/i,
  /^Urinary Diversion/i,
  /^Lower Tract: Bladder Augmentation/i,
  /^Lower Tract: Bladder Diverticulectomy/i,
  /^Lower Tract: Bladder Neck/i,
  /^Lower Tract: Catheterizable/i,
  /^Bladder Neck Closure/i,
  /^Flaps: Gracilis/i,
  /Hypospadias/i,
  /Hyposadias/i, // common misspelling preserved in source playlists
  /^Fistula/i,
  /Replantation/i,
  /Priapism/i,
];

const COMBINED_PATTERNS = [
  /^Plastic Surgery Principles/i,
  /^Neurourology/i,
  /^Grafts:/i,
  /^Hidden Curriculum/i,
  /^WARWIKI Original/i,
];

function classify(playlistTitle) {
  for (const r of URPS_PATTERNS) if (r.test(playlistTitle)) return 'URPS';
  for (const r of GURS_PATTERNS) if (r.test(playlistTitle)) return 'GURS';
  for (const r of COMBINED_PATTERNS) if (r.test(playlistTitle)) return 'combined';
  return 'combined';
}

/**
 * Topic classifier — consolidates the ~120 playlist prefixes into a clean
 * facet set of ~17 buckets. First match wins, so order patterns from most
 * specific to most general.
 */
const TOPIC_RULES = [
  [/^Trauma/i, 'Trauma & Emergencies'],
  [/^Urethrectomy/i, 'Urethrectomy'],
  // Permissive prefix catches both "Urethroplasty" and the misspelled
  // "Urethroplasy" present in one playlist title.
  [/^Urethroplas/i, 'Urethroplasty'],
  [/Hypospadias/i, 'Urethroplasty'],
  [/Hyposadias/i, 'Urethroplasty'],
  [/^Urethral Mass/i, 'Urethral Mass'],
  [/^Genital Reconstruction/i, 'Genital Reconstruction'],
  [/^Buried Penis/i, 'Genital Reconstruction'],
  [/^Penile Implant/i, 'Penile Prosthesis'],
  [/^Testicular Prosthesis/i, 'Penile Prosthesis'],
  [/^Peyronie/i, "Peyronie's Disease"],
  [/^Female SUI/i, 'Female SUI'],
  [/^Female: Bladder Outlet/i, 'Female SUI'],
  [/^Male SUI/i, 'Male SUI'],
  [/^OAB/i, 'OAB / UUI'],
  [/Mesh Compilation/i, 'Mesh Complications'],
  [/^Prolapse/i, 'Prolapse'],
  [/^Pelvic Pain/i, 'Pelvic Pain'],
  // Parastomal hernia is a urinary-diversion complication — group with it.
  [/^Parastomal/i, 'Urinary Diversion'],
  [/^Urinary Diversion/i, 'Urinary Diversion'],
  [/^Upper Tract/i, 'Upper Tract Reconstruction'],
  [/^Lower Tract/i, 'Bladder Reconstruction'],
  [/^Bladder Neck Closure/i, 'Bladder Reconstruction'],
  [/^GAS/i, 'Gender-Affirming Surgery'],
  [/^BPH/i, 'BPH'],
  [/^Fistula/i, 'Fistula'],
  [/^Neurourology/i, 'Neurourology'],
  [/^Women's Health/i, "Women's Health"],
  [/^Vaginal Wall Masses/i, 'Vaginal Masses'],
  [/^Grafts/i, 'Grafts & Flaps'],
  [/^Flaps/i, 'Grafts & Flaps'],
  [/^Plastic Surgery Principles/i, 'Surgical Technique'],
  [/^Technique:/i, 'Surgical Technique'],
  [/^Radiation/i, 'Radiation Therapy'],
  [/^Hidden Curriculum/i, 'Hidden Curriculum'],
  [/^Evaluation/i, 'Evaluation'],
];

function classifyTopic(playlistTitle) {
  for (const [r, topic] of TOPIC_RULES) {
    if (r.test(playlistTitle)) return topic;
  }
  return 'Other';
}

function tsString(s) {
  return JSON.stringify(s);
}

function tsEntry(v) {
  // Compact one-line-per-field formatting matches journals.ts / surgeons.ts house style.
  const fields = [
    `id: ${tsString(v.id)}`,
    `title: ${tsString(v.title)}`,
    `channel: ${tsString(v.channel)}`,
    `playlist: ${tsString(v.playlist)}`,
    `topic: ${tsString(v.topic)}`,
    `subspecialty: ${tsString(v.subspecialty)}`,
  ];
  if (v.duration) fields.push(`duration: ${tsString(v.duration)}`);
  if (v.year) fields.push(`year: ${v.year}`);
  if (v.views != null) fields.push(`views: ${v.views}`);
  return `  { ${fields.join(', ')} },`;
}

function main() {
  const raw = JSON.parse(fs.readFileSync(IN, 'utf8'));
  const { channelTitle, playlists, fetchedAt } = raw;

  // Flatten across playlists. Dedupe by videoId — the same video can appear
  // in multiple playlists; the first occurrence wins (deterministic by
  // playlist order from the API).
  const seen = new Set();
  const entries = [];
  const breakdown = { GURS: 0, URPS: 0, combined: 0 };

  const topicBreakdown = {};
  for (const pl of playlists) {
    const subspecialty = classify(pl.title);
    const topic = classifyTopic(pl.title);
    for (const item of pl.items) {
      if (seen.has(item.videoId)) continue;
      seen.add(item.videoId);
      const year = item.publishedAt
        ? new Date(item.publishedAt).getUTCFullYear()
        : undefined;
      entries.push({
        id: item.videoId,
        title: item.title,
        channel: channelTitle,
        playlist: pl.title,
        topic,
        subspecialty,
        duration: item.duration ?? undefined,
        year,
        views: item.views ?? undefined,
      });
      breakdown[subspecialty]++;
      topicBreakdown[topic] = (topicBreakdown[topic] ?? 0) + 1;
    }
  }

  // Sort by subspecialty (combined first, then GURS, then URPS) then by
  // topic then playlist then title — gives a stable, reviewable diff.
  const order = { combined: 0, GURS: 1, URPS: 2 };
  entries.sort((a, b) => {
    if (order[a.subspecialty] !== order[b.subspecialty]) {
      return order[a.subspecialty] - order[b.subspecialty];
    }
    if (a.topic !== b.topic) return a.topic.localeCompare(b.topic);
    if (a.playlist !== b.playlist) return a.playlist.localeCompare(b.playlist);
    return a.title.localeCompare(b.title);
  });

  const header = `/**
 * WARWIKI Video Library — registry of curated operative / didactic videos.
 *
 * AUTO-GENERATED by scripts/build-videos-registry.js from
 * src/data/videos.generated.json. Do not edit by hand — re-run
 *   npm run videos:sync
 * to refresh from the YouTube channel.
 *
 * Source channel: ${channelTitle}
 * Fetched at:     ${fetchedAt}
 * Entries:        ${entries.length} (combined ${breakdown.combined} / GURS ${breakdown.GURS} / URPS ${breakdown.URPS})
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
 * \`subspecialty: 'combined'\` videos alongside their own bucket so foundations
 * don't disappear when narrowing.
 */

export type VideoSubspecialty = 'GURS' | 'URPS' | 'combined';

export interface VideoEntry {
  /** YouTube video ID (the bit after \`v=\` in the URL). */
  id: string;
  title: string;
  /** Source channel, e.g., "WARWIKI", "GURS", "AUGS". */
  channel: string;
  /**
   * Topical playlist this video belongs to. Used for facet filtering.
   * Mirrors WARWIKI's own YouTube playlist taxonomy.
   */
  playlist: string;
  /**
   * Coarse topic facet (e.g., "Urethroplasty", "Prolapse", "Upper Tract
   * Reconstruction") derived from the playlist prefix. Used as the third
   * filter axis in the Video Library alongside subspecialty and playlist.
   */
  topic: string;
  subspecialty: VideoSubspecialty;
  /**
   * Optional: slug of the related WARWIKI article so a card can deep-link
   * back into the wiki. Use the full \`/docs/...\` path.
   */
  articleSlug?: string;
  /** Free-text tags for search ranking — keep short. */
  tags?: string[];
  /** Optional duration as "MM:SS" — surfaced as a corner badge. */
  duration?: string;
  /** Year uploaded (or year procedure performed if known). */
  year?: number;
  /** Lifetime YouTube view count at last sync — used to rank video selection. */
  views?: number;
  /** Whether the video has been curator-reviewed (gate for B's auto-injector). */
  curated?: boolean;
}

// The array is chunked because TypeScript otherwise produces a union type
// too complex to represent at this cardinality (TS2590). Chunking keeps the
// inferred element-tuple small enough per chunk while the public VIDEOS
// constant remains a flat \`VideoEntry[]\`.
`;

  const CHUNK = 250;
  const chunks = [];
  for (let i = 0; i < entries.length; i += CHUNK) {
    chunks.push(entries.slice(i, i + CHUNK));
  }
  const chunkDecls = chunks
    .map((c, i) => `const CHUNK_${i}: VideoEntry[] = [\n${c.map(tsEntry).join('\n')}\n];\n`)
    .join('\n');
  const concat = `\nexport const VIDEOS: VideoEntry[] = [${chunks
    .map((_, i) => `...CHUNK_${i}`)
    .join(', ')}];\n`;

  fs.writeFileSync(OUT, header + chunkDecls + concat);
  console.log(`Wrote ${OUT}`);
  console.log(
    `${entries.length} entries — combined: ${breakdown.combined}, GURS: ${breakdown.GURS}, URPS: ${breakdown.URPS}`,
  );
}

main();
