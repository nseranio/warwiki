// Term registry for the automatic first-mention linker (plugins/autolink/remark-autolink.js).
// Terms come from page titles; src/data/autolink.json adds aliases and removes terms that are too generic to link.
const fs = require('fs');
const path = require('path');

const SECTION_RANK = ['03-clinical-conditions', '04-surgical-techniques', '02-evaluation', '05-special-populations',
  '01-foundations', '06-clinical-evidence', '07-roots', '08-resources'];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (/\.mdx?$/.test(e.name)) out.push(full);
  }
  return out;
}

function frontmatter(content) {
  const m = content.match(/^---\n([\s\S]*?)\n---/);
  const fm = {};
  if (!m) return fm;
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z_]+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return fm;
}

// Same rules as scripts/check-internal-links.js.
function fileToUrl(docsDir, file, fm) {
  if (fm.slug) {
    let slug = fm.slug.startsWith('/') ? fm.slug : `/${fm.slug}`;
    if (slug.startsWith('/docs/')) slug = slug.slice(5);
    if (slug !== '/' && slug.endsWith('/')) slug = slug.slice(0, -1);
    return `/docs${slug}`;
  }
  const parts = path.relative(docsDir, file).replace(/\.mdx?$/, '').split(path.sep).map((p) => p.replace(/^\d+-/, ''));
  if (parts[parts.length - 1] === 'index') parts.pop();
  if (parts.length >= 2 && parts[parts.length - 1] === parts[parts.length - 2]) parts.pop();
  return `/docs/${parts.join('/')}`.replace(/\/$/, '');
}

const norm = (s) => s.replace(/[\u2018\u2019]/g, "'").replace(/[\u2010\u2011]/g, '-').replace(/\s+/g, ' ').trim();
// A word keeps its exact case when it is an acronym or has a capital inside it (eCoin, SISTEr, HoLEP, PDE5, WATER).
// Every other word may start with a capital or a small letter, so "Sacral Neuromodulation" also matches the lowercase form.
const isExactWord = (w) => /[A-Z].*[A-Z]/.test(w) || /[a-z][A-Z]/.test(w) || /^[A-Z]\d/.test(w);
const keyOf = (t) => norm(t).split(' ').map((w) => (isExactWord(w) ? w : w.toLowerCase())).join(' ');
const escWord = (w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/'/g, "['\u2019]").replace(/-/g, '[-\u2010\u2011]');
const wordPattern = (w) => {
  if (isExactWord(w) || !/^[A-Za-z]/.test(w)) return escWord(w);
  const c = w[0];
  return `[${c.toUpperCase()}${c.toLowerCase()}]${escWord(w.slice(1).toLowerCase())}`;
};
const termPattern = (t) => {
  const words = norm(t).split(' ');
  const last = words[words.length - 1];
  const plural = !isExactWord(last) && /[a-z]$/.test(last) && !/s$/.test(last) ? 's?' : '';
  return words.map(wordPattern).join('\\s+') + plural;
};

function buildRegistry(docsDir, configPath) {
  const cfg = configPath && fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath, 'utf8')) : {};
  const exclude = new Set((cfg.exclude || []).map((t) => keyOf(t).toLowerCase()));
  const pages = new Map(); // url -> file
  const byKey = new Map(); // key -> {term, url, file, sensitive, rank}
  const collisions = [];
  const rankOf = (file) => {
    const top = path.relative(docsDir, file).split(path.sep)[0];
    const i = SECTION_RANK.indexOf(top);
    return i < 0 ? 99 : i;
  };
  const add = (term, url, file, source) => {
    term = norm(term);
    if (!term) return;
    const key = keyOf(term);
    if (exclude.has(key.toLowerCase()) && source !== 'alias') return;
    const entry = {term, key, url, file, rank: source === 'alias' ? -1 : rankOf(file), source};
    const prev = byKey.get(key);
    if (prev && prev.url !== url) {
      const keepPrev = prev.rank <= entry.rank;
      collisions.push({term, kept: keepPrev ? prev.url : url, dropped: keepPrev ? url : prev.url});
      if (keepPrev) return;
    }
    byKey.set(key, entry);
  };

  for (const file of walk(docsDir)) {
    const content = fs.readFileSync(file, 'utf8');
    const fm = frontmatter(content);
    const url = fileToUrl(docsDir, file, fm);
    pages.set(url, file);
    if (/(^|\/)index\.mdx?$/.test(file) || fm.hide_title === 'true' || fm.autolink_target === 'false') continue;
    if (!fm.title) continue;
    const title = norm(fm.title.replace(/\s*\([^)]*\)\s*$/, '').replace(/^The\s+/, ''));
    const words = title.split(' ').length;
    if (title.length < 4 || words > 5) continue;
    add(title, url, file, 'title');
  }
  for (const [term, url] of Object.entries(cfg.aliases || {})) {
    const clean = url.split('#')[0];
    if (!pages.has(clean)) throw new Error(`autolink alias "${term}" points to a page that does not exist: ${url}`);
    add(term, url, pages.get(clean), 'alias');
  }

  const entries = [...byKey.values()].sort((x, y) => y.term.length - x.term.length);
  const pattern = entries.length
    ? new RegExp(`(?<![\\p{L}\\p{N}/@.-])(?:${entries.map((e) => termPattern(e.term)).join('|')})(?![\\p{L}\\p{N}/-])`, 'gu')
    : null;
  return {
    pages,
    entries,
    collisions,
    pattern,
    lookup(match) {
      const k = keyOf(match);
      return byKey.get(k) || byKey.get(k.replace(/s$/, ''));
    },
  };
}

module.exports = {buildRegistry, fileToUrl, frontmatter, norm, keyOf};
