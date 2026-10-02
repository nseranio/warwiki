#!/usr/bin/env node
/**
 * URPS fellowship lineage data.
 *
 * Source: WARWIKI's own research (October 2026) into urology-based and
 * OB/GYN-based URPS / FPMRS / urogynecology fellowships: program alumni
 * pages, faculty biographies, program histories, and the trainee appendix to
 * Schulz and Drutz, "History of Urogynecology and Female Urology" (Textbook
 * of Female Urology and Urogynecology, 5th ed., companion website), which
 * lists the trainees of Stanton, Cardozo, Ostergard, Drutz and Dwyer. The
 * working file (reports/surgical-genealogy/urps-tree.json, with a source URL
 * and evidence for every person) stays out of git; this script writes the
 * trimmed fields the site uses to src/data/urps-lineage.generated.json.
 *
 * Kept: name, mentor, co-mentor, fellowship completion year, fellowship
 * program, international flag, and the latest listed position.
 * Dropped: people already in the GURS tree (they appear there), records a
 * verification pass could not support, and low-confidence records with no
 * mentor.
 *
 * Usage: node scripts/genealogy/build-urps-lineage.js [path/to/urps-tree.json]
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const SRC = process.argv[2] || path.join(ROOT, 'reports/surgical-genealogy/urps-tree.json');
const OUT = path.join(ROOT, 'src/data/urps-lineage.generated.json');

const raw = JSON.parse(fs.readFileSync(SRC, 'utf8'));

const clean = s => (s || '').replace(/\s+/g, ' ').trim();

const fellows = raw.fellows
  .filter(f => !f.inGURS && f.sourceCheck !== 'unsupported')
  .filter(f => f.mentor || f.confidence !== 'low')
  .map(f => {
    const row = { name: clean(f.name) };
    if (f.mentor) row.mentor = clean(f.mentor);
    if (f.mentor2) row.coMentor = clean(f.mentor2);
    if (f.fellowshipYear && !(f.isFounderOrDirector && !f.mentor)) row.year = f.fellowshipYear;
    if (f.fellowshipInstitution) row.program = clean(f.fellowshipInstitution);
    if (f.intl) row.intl = true;
    const last = (f.stops || [])[f.stops.length - 1];
    if (last && last.institution && f.confidence !== 'low') {
      const inst = clean(last.institution);
      if (inst.length <= 90) row.position = last.city ? `${inst}, ${clean(last.city)}` : inst;
    }
    return row;
  })
  .sort((a, b) => a.name.localeCompare(b.name));

// Point each mentor at the spelling of that person's own row (e.g. "Donald R. Ostergard" -> "Donald Ostergard").
const NICK = { mickey: 'michael', micky: 'michael', bob: 'robert', bill: 'william', jim: 'james', tom: 'thomas', steve: 'steven', stephen: 'steven', chris: 'christopher', ted: 'edward', ed: 'edward', don: 'donald', charlie: 'charles', dick: 'richard', rick: 'richard', dave: 'david', larry: 'lawrence', tony: 'anthony', cathy: 'catherine', nikki: 'nicola' };
const tokens = n => n.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\([^)]*\)/g, ' ')
  .replace(/\b(dr|md|do|phd|mph|jr|sr|ii|iii|iv)\b\.?/g, ' ').split(/[^a-z-]+/).filter(w => w.length > 1);
const key = n => { const t = tokens(n); return t.length ? `${NICK[t[0]] || t[0]} ${t[t.length - 1]}` : ''; };
const byKey = new Map(fellows.map(f => [key(f.name), f.name]));
for (const f of fellows) {
  for (const k of ['mentor', 'coMentor']) {
    if (f[k] && byKey.has(key(f[k]))) f[k] = byKey.get(key(f[k]));
    if (f[k] && key(f[k]) === key(f.name)) delete f[k];
  }
}

const out = {
  source: 'WARWIKI URPS fellowship research (program alumni pages, faculty biographies, program histories; Schulz & Drutz trainee appendix)',
  compiledBy: 'WARWIKI',
  retrieved: raw.retrieved,
  fellows,
};
fs.writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n');
console.log(`URPS lineage: ${fellows.length} people, ${fellows.filter(f => f.mentor).length} with a mentor, ${fellows.filter(f => f.position).length} with a position.`);
