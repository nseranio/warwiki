#!/usr/bin/env node
/**
 * suggest-page-videos.js
 *
 * For each WARWIKI page, rank candidate Video Library videos by topical
 * relevance, breaking ties on a views + recency blend. Output is a review
 * report — it does NOT edit any page. Use it to pick the 1-2 best videos to
 * embed on a page, per the convention of 1-2 videos preferring high-view,
 * recently-uploaded content.
 *
 * Usage:
 *   node scripts/suggest-page-videos.js [--dir docs/03-clinical-conditions] [--json out.json] [--top 5] [--min 4]
 *   node scripts/suggest-page-videos.js docs/03-clinical-conditions/03f-fistulas/in-females/vesicovaginal.mdx
 *
 * Defaults: scans the "clinical core" — docs/03-clinical-conditions and
 * docs/04-surgical-techniques — and prints the top 5 candidates per page that
 * clear a relevance floor.
 *
 * Relevance is keyword overlap between the page (title + H1 + slug) and each
 * video's (playlist title + video title). Playlist-title matches weigh more
 * because WARWIKI's playlist taxonomy mirrors the atlas structure. Blend is
 * 0.6*log-normalized-views + 0.4*recency(0..1 over 8 yr).
 */

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const GEN = path.join(ROOT, 'src/data/videos.generated.json');

const argv = process.argv.slice(2);
function opt(name, fallback) {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : fallback;
}
const TOP = parseInt(opt('top', '5'), 10);
const MIN = parseInt(opt('min', '4'), 10); // relevance floor to be a candidate
const JSON_OUT = opt('json', null);
// --lectures restricts candidates to lecture/didactic content (a "*: Lectures"
// playlist or a lecture-style title) — used for condition pages, which read
// better with an overview talk than a step-by-step technique clip.
const LECTURES_ONLY = argv.includes('--lectures');
const LECTURE_TITLE_RE =
  /\b(lecture|overview|didactic|grand rounds|webinar|principles|evaluation and management|management of|approach to|update|state of the art|masterclass|how i|tips and tricks|review)\b/i;
function isLecture(v) {
  return /lectures?\b/i.test(v.playlist) || LECTURE_TITLE_RE.test(v.title);
}
const explicitFiles = argv.filter(a => a.endsWith('.mdx'));
const DIRS = explicitFiles.length
  ? []
  : [opt('dir', null)].filter(Boolean).length
    ? [opt('dir', null)]
    : ['docs/03-clinical-conditions', 'docs/04-surgical-techniques'];

const STOP = new Set(
  ('a an and or of for the to in with vs versus on at by from into as is are be ' +
    'approach approaches technique techniques procedure procedures repair repairs ' +
    'surgery surgical management treatment treatments disorder disorders disease ' +
    'core video videos overview introduction part using use new all patient patients ' +
    'male female men women adult adults clinical reconstruction reconstructive ' +
    'and lecture lectures').split(/\s+/),
);

// Acronym → expansion so a page titled "AUS" matches "Artificial Urinary Sphincter".
const EXPAND = {
  aus: ['artificial', 'urinary', 'sphincter'],
  ipp: ['penile', 'prosthesis', 'implant'],
  bmg: ['buccal', 'mucosa', 'graft'],
  sui: ['stress', 'incontinence', 'sling'],
  oab: ['overactive', 'bladder'],
  uui: ['urgency', 'incontinence'],
  vvf: ['vesicovaginal', 'fistula'],
  rvf: ['rectovaginal', 'fistula'],
  ruf: ['rectourethral', 'fistula'],
  bnc: ['bladder', 'neck', 'contracture'],
  vuas: ['vesicourethral', 'anastomotic', 'stenosis'],
  upj: ['ureteropelvic', 'junction'],
  bph: ['prostate', 'prostatic'],
  nlutd: ['neurogenic', 'bladder'],
  gas: ['gender', 'affirming'],
  dviu: ['urethrotomy'],
  pfpt: ['pelvic', 'floor'],
  ptns: ['tibial', 'nerve', 'stimulation'],
  snm: ['sacral', 'neuromodulation'],
  mus: ['midurethral', 'sling'],
  pvs: ['pubovaginal', 'sling'],
};

function tokenize(s) {
  if (!s) return [];
  const out = [];
  for (let w of s.toLowerCase().split(/[^a-z0-9]+/)) {
    if (!w || w.length < 3 || STOP.has(w)) continue;
    if (EXPAND[w]) out.push(...EXPAND[w]);
    else out.push(w);
  }
  return out;
}

function pageMeta(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const fm = raw.match(/^---\n([\s\S]*?)\n---/);
  let title = null;
  if (fm) {
    const t = fm[1].match(/^title:\s*(.+)$/m);
    if (t) title = t[1].trim().replace(/^["']|["']$/g, '');
  }
  const h1 = raw.match(/^#\s+(.+)$/m);
  const slug = path.basename(file, '.mdx').replace(/-/g, ' ');
  const hasVideos = /^##\s+Videos\b/m.test(raw);
  return {
    title: title || (h1 ? h1[1] : slug),
    h1: h1 ? h1[1] : '',
    slug,
    hasVideos,
  };
}

function collectFiles(dirs) {
  const files = [];
  const walk = d => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith('.mdx') && e.name !== 'index.mdx') files.push(p);
    }
  };
  for (const d of dirs) walk(path.join(ROOT, d));
  return files.sort();
}

function loadVideos() {
  const data = JSON.parse(fs.readFileSync(GEN, 'utf8'));
  const seen = new Set();
  const vids = [];
  let maxLogViews = 1;
  for (const pl of data.playlists) {
    for (const it of pl.items) {
      if (seen.has(it.videoId)) continue;
      seen.add(it.videoId);
      const views = it.views ?? 0;
      const year = it.publishedAt ? new Date(it.publishedAt).getUTCFullYear() : null;
      const lv = Math.log10(views + 1);
      if (lv > maxLogViews) maxLogViews = lv;
      vids.push({
        id: it.videoId,
        title: it.title,
        playlist: pl.title,
        views,
        year,
        publishedAt: it.publishedAt || null,
        plTokens: new Set(tokenize(pl.title)),
        titleTokens: new Set(tokenize(it.title)),
        _lv: lv,
      });
    }
  }
  const NOW_YEAR = 2026;
  for (const v of vids) {
    const viewsScore = v._lv / maxLogViews; // 0..1
    const recency = v.year ? Math.max(0, 1 - (NOW_YEAR - v.year) / 8) : 0;
    v.blend = 0.6 * viewsScore + 0.4 * recency;
  }
  return vids;
}

function relevance(pageTokens, v) {
  let score = 0;
  for (const t of pageTokens) {
    if (v.plTokens.has(t)) score += 3;
    else if (v.titleTokens.has(t)) score += 1;
  }
  return score;
}

function main() {
  const files = explicitFiles.length
    ? explicitFiles.map(f => path.resolve(ROOT, f))
    : collectFiles(DIRS);
  const vids = loadVideos();
  const report = [];

  for (const file of files) {
    const meta = pageMeta(file);
    const pageTokens = Array.from(
      new Set([...tokenize(meta.title), ...tokenize(meta.h1), ...tokenize(meta.slug)]),
    );
    const pool = LECTURES_ONLY ? vids.filter(isLecture) : vids;
    const scored = pool
      .map(v => ({ v, rel: relevance(pageTokens, v) }))
      .filter(x => x.rel >= MIN)
      .sort((a, b) => b.rel - a.rel || b.v.blend - a.v.blend)
      .slice(0, TOP);
    report.push({
      file: path.relative(ROOT, file),
      title: meta.title,
      hasVideos: meta.hasVideos,
      candidates: scored.map(x => ({
        id: x.v.id,
        title: x.v.title,
        playlist: x.v.playlist,
        views: x.v.views,
        year: x.v.year,
        rel: x.rel,
        blend: Number(x.v.blend.toFixed(3)),
      })),
    });
  }

  const withCands = report.filter(r => r.candidates.length);
  const noCands = report.filter(r => !r.candidates.length);

  for (const r of withCands) {
    const flag = r.hasVideos ? ' [already has ## Videos]' : '';
    console.log(`\n### ${r.title}${flag}\n${r.file}`);
    for (const c of r.candidates) {
      console.log(
        `  rel ${String(c.rel).padStart(2)} | ${String(c.views).padStart(6)} views | ${c.year} | ${c.id}  ${c.title}  «${c.playlist}»`,
      );
    }
  }
  console.log(
    `\n=== ${withCands.length} pages with candidates, ${noCands.length} with none (min rel=${MIN}) ===`,
  );
  if (noCands.length) {
    console.log('Pages with no candidate video (likely no matching playlist):');
    for (const r of noCands) console.log(`  - ${r.file}`);
  }

  if (JSON_OUT) {
    fs.writeFileSync(path.resolve(ROOT, JSON_OUT), JSON.stringify(report, null, 2));
    console.log(`\nWrote ${JSON_OUT}`);
  }
}

main();
