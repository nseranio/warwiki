#!/usr/bin/env node
/**
 * Surgeon citation index.
 *
 * Scans every reference list on the site and finds the papers on which each
 * profiled surgeon (src/data/surgeons.ts) is a listed author, then writes
 * src/data/surgeon-citations.generated.json for the "Cited on WARWIKI"
 * section of the profile pages.
 *
 * Matching rules:
 *  - Only the leading author list of a reference counts. Book editors
 *    ("In: Brandes SB, Morey AF, eds.") and authors hidden behind "et al."
 *    are not matched.
 *  - Surname must match exactly (accents ignored). The first initial must
 *    match; when both the reference and the surgeon's name carry a second
 *    initial, it must match too. Surnames in COMMON_SURNAMES need two
 *    matching initials.
 *  - scripts/surgeon-citations.overrides.json can replace a surgeon's
 *    author key ("key"), add exact-match aliases ("aliases", e.g. the
 *    two-initial form a common surname needs) or exclude a paper ("exclude":
 *    a DOI, or "title:<normalized title key>" for references without one).
 *
 * Usage: node scripts/gen-surgeon-citations.js [--report]
 *   --report prints every matched author string per surgeon for review.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DOCS = path.join(ROOT, 'docs');
const OUT_DIR = path.join(ROOT, 'src/data/surgeon-citations');
const OVERRIDES = path.join(__dirname, 'surgeon-citations.overrides.json');

const jiti = require('jiti')(__filename);
const { SURGEONS } = jiti(path.join(ROOT, 'src/data/surgeons.ts'));

const COMMON_SURNAMES = new Set([
  'lee', 'kim', 'park', 'wang', 'zhang', 'li', 'liu', 'chen', 'yang', 'zhao', 'wu',
  'smith', 'brown', 'jones', 'miller', 'davis', 'wilson', 'taylor', 'white', 'scott',
  'walter', 'mark', 'ramon', 'gonzalez', 'wright', 'cohen', 'shaw', 'garcia', 'ruiz', 'gomez',
  'jun', 'carr', 'burton', 'rude', 'eun', 'raz',
]);

// ── Routing (mirrors scripts/check-internal-links.js) ─────────────────────
function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, files);
    else if (/\.mdx?$/.test(e.name)) files.push(full);
  }
  return files;
}

function frontmatter(content) {
  const m = content.match(/^---\n([\s\S]*?)\n---/);
  const data = {};
  if (!m) return data;
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].trim().replace(/^['"]|['"]$/g, '');
  }
  return data;
}

function fileToUrl(file, content) {
  const fm = frontmatter(content);
  if (fm.slug) {
    let slug = fm.slug.startsWith('/') ? fm.slug : `/${fm.slug}`;
    if (slug !== '/' && slug.endsWith('/')) slug = slug.slice(0, -1);
    return `/docs${slug}`;
  }
  const parts = path.relative(DOCS, file).replace(/\.mdx?$/, '').split(path.sep)
    .map(p => p.replace(/^\d+-/, ''));
  if (parts[parts.length - 1] === 'index') parts.pop();
  if (parts.length >= 2 && parts[parts.length - 1] === parts[parts.length - 2]) parts.pop();
  return `/docs/${parts.join('/')}`.replace(/\/$/, '');
}

function pageTitle(content) {
  const h1 = content.match(/^# (.+)$/m);
  const fm = frontmatter(content);
  return (h1 ? h1[1] : fm.title || '').replace(/[*_`]/g, '').trim();
}

// ── Reference parsing ─────────────────────────────────────────────────────
const fold = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function plain(md) {
  return md
    .replace(/<[^>]+>/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_]/g, '')
    .replace(/\\([()])/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Return [{ref, text}] for every numbered reference entry in a page. */
function references(content) {
  const out = [];
  const re = /^(?:<a id="(ref\d+)"><\/a>\s*\d+\.\s*|\d+\.\s*<a id="(ref\d+)"><\/a>\s*)(.+)$/gm;
  let m;
  while ((m = re.exec(content)) !== null) out.push({ ref: m[1] || m[2], text: m[3] });
  return out;
}

/** Leading author list as [{last, initials}], or [] when not author-formatted. */
function authors(text) {
  const t = plain(text).replace(/^["“]/, '');
  const m = t.match(/^(.*?(?:\b[A-Z][A-Za-z-]{0,4}|et al))\.(?:\s|$)/);
  if (!m) return [];
  const list = [];
  for (const raw of m[1].split(/,\s*/)) {
    const tok = raw.replace(/\b(Jr|Sr|II|III|IV)\.?$/, '').trim();
    if (!tok || /^et al/.test(tok)) continue;
    const a = tok.match(/^(.+?)\s+([A-Z](?:[A-Z]|-[A-Z]){0,3})$/);
    if (!a) return list.length ? list : [];
    list.push({ last: fold(a[1]), initials: a[2].replace(/-/g, '') });
  }
  return list;
}

function doiOf(text) {
  const m = text.match(/doi:\s*\[(10\.[^\]\s]+)\]/i)
    || text.match(/doi\.org\/(10\.\S+?)\)(?:[.,;]?\s*$|\s)/i)
    || text.match(/doi:\s*(10\.\S+)/i);
  return m ? m[1].replace(/[.,;]+$/, '').toLowerCase() : null;
}

function yearOf(text) {
  const m = plain(text).match(/\b(19|20)\d{2}\b/);
  return m ? Number(m[0]) : null;
}

/** Citation text without the trailing DOI link, as plain text. */
function citationText(text) {
  const head = text.split(/\.?\s*(?:\[?doi:|https?:\/\/(?:dx\.)?doi\.org)/i)[0];
  return plain(head).replace(/\s+\./g, '.').replace(/\.?$/, '.');
}

/** Normalized title: the sentence after the author list. */
function titleKey(cite) {
  const rest = cite.replace(/^.*?(?:\b[A-Z][A-Za-z-]{0,4}|et al)\.\s+/, '');
  return fold(rest.split(/[.?!]\s/)[0]).replace(/[^a-z0-9]/g, '').slice(0, 80);
}

// ── Surgeon keys ──────────────────────────────────────────────────────────
function surgeonKey(name) {
  const words = name.replace(/\b(Jr|Sr)\.?|\b(II|III|IV)\b/g, '').replace(/,/g, ' ').trim().split(/\s+/);
  const last = words.pop();
  const initials = words.flatMap(w => w.replace(/\./g, ' ').trim().split(/\s+/)).map(w => w[0]).join('').toUpperCase();
  return { last: fold(last), initials };
}

function initialsMatch(ref, s, strict) {
  if (!ref || !s || ref[0] !== s[0]) return false;
  if (ref.length > 1 && s.length > 1) return ref[1] === s[1];
  return !strict;
}

module.exports = { walk, references, authors, surgeonKey, initialsMatch, fold, titleKey, citationText, doiOf, COMMON_SURNAMES, DOCS };

if (require.main === module) {
// ── Main ──────────────────────────────────────────────────────────────────
const overrides = fs.existsSync(OVERRIDES) ? JSON.parse(fs.readFileSync(OVERRIDES, 'utf8')) : {};

const keys = SURGEONS.filter(s => s.path).map(s => {
  const o = overrides[s.id] || {};
  const base = o.key ? { last: fold(o.key.last), initials: o.key.initials, strict: true } : surgeonKey(s.name);
  const all = [base, ...(o.aliases || []).map(a => ({ last: fold(a.last), initials: a.initials, exact: true }))];
  return { id: s.id, keys: all, exclude: new Set((o.exclude || []).map(x => x.toLowerCase())) };
});

const pubs = {}; // id -> [pub]
const seen = {}; // id -> Set(author strings) for --report
const files = walk(DOCS).filter(f => !f.includes(`${path.sep}07-roots${path.sep}surgeons${path.sep}`)).sort();

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const refs = references(content);
  if (!refs.length) continue;
  const page = { title: pageTitle(content), url: fileToUrl(file, content) };
  for (const { ref, text } of refs) {
    const list = authors(text);
    if (!list.length) continue;
    for (const k of keys) {
      const hit = list.find(a => k.keys.some(key => a.last === key.last && (key.exact
        ? a.initials === key.initials
        : initialsMatch(a.initials, key.initials, key.strict || COMMON_SURNAMES.has(key.last)))));
      if (!hit) continue;
      const doi = doiOf(text);
      if (doi && k.exclude.has(doi)) continue;
      const cite = citationText(text);
      const tKey = titleKey(cite);
      if (k.exclude.has(`title:${tKey}`)) continue;
      const bucket = (pubs[k.id] ||= []);
      let pub = bucket.find(p => (doi && p.doi === doi) || p.tKey === tKey);
      if (!pub) bucket.push(pub = { cite, doi, year: yearOf(text), pages: [], tKey });
      if (!pub.doi && doi) pub.doi = doi;
      if (!pub.pages.some(p => p.url === page.url)) pub.pages.push({ ...page, ref });
      (seen[k.id] ||= new Set()).add(`${hit.last} ${hit.initials}`);
    }
  }
}

const out = {};
fs.mkdirSync(OUT_DIR, { recursive: true });
const ids = new Set(SURGEONS.filter(s => s.path).map(s => s.id));
for (const f of fs.readdirSync(OUT_DIR)) {
  if (f.endsWith('.json') && !ids.has(f.slice(0, -5))) fs.unlinkSync(path.join(OUT_DIR, f));
}
for (const s of SURGEONS.filter(s => s.path)) {
  const list = (pubs[s.id] || []).map(({ tKey, ...p }) => p).sort((a, b) =>
    b.pages.length - a.pages.length || (b.year || 0) - (a.year || 0) || a.cite.localeCompare(b.cite));
  if (list.length) out[s.id] = list;
  const file = path.join(OUT_DIR, `${s.id}.json`);
  const json = JSON.stringify(list, null, 1) + '\n';
  if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== json) fs.writeFileSync(file, json);
}

const total = Object.values(out).reduce((n, l) => n + l.length, 0);
console.log(`Surgeon citations: ${total} publications across ${Object.keys(out).length} of ${ids.size} profiles.`);
if (process.argv.includes('--report')) {
  for (const s of SURGEONS) {
    const n = out[s.id]?.length || 0;
    console.log(`${String(n).padStart(4)}  ${s.name}  [${[...(seen[s.id] || [])].join('; ')}]`);
  }
}
}
