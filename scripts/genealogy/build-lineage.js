#!/usr/bin/env node
/**
 * GURS fellowship lineage data.
 *
 * Source: Lee Zhao's Reconstructive Urology Fellowship Family Tree
 * (https://fellowshiptree.leezhaomd.org/), compiled by Dr. Zhao from public
 * sources. The raw extraction (reports/surgical-genealogy/fellowship-tree.json)
 * stays out of git; this script writes the trimmed fields the site uses to
 * src/data/gurs-lineage.generated.json.
 *
 * Kept: name, mentor, co-mentor, fellowship completion year, international
 * flag, and the latest listed position. The position is dropped when the
 * source marks the placement as unconfirmed (verify: true).
 *
 * Usage: node scripts/genealogy/build-lineage.js [path/to/fellowship-tree.json]
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const SRC = process.argv[2] || path.join(ROOT, 'reports/surgical-genealogy/fellowship-tree.json');
const OUT = path.join(ROOT, 'src/data/gurs-lineage.generated.json');

const raw = JSON.parse(fs.readFileSync(SRC, 'utf8'));

const fellows = raw.fellows.map(f => {
  const first = f.stops[0] || {};
  const last = f.stops[f.stops.length - 1] || {};
  const row = { name: f.name };
  if (f.mentor) row.mentor = f.mentor;
  if (f.mentor2) row.coMentor = f.mentor2;
  if (!f.founder && first.year) row.year = first.year;
  if (f.intl) row.intl = true;
  if (!f.verify && !f.founder && last.institution) {
    row.position = last.city ? `${last.institution}, ${last.city}` : last.institution;
  }
  return row;
}).sort((a, b) => a.name.localeCompare(b.name));

const out = {
  source: raw.source,
  compiledBy: raw.compiledBy,
  retrieved: raw.retrieved,
  fellows,
};
fs.writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n');
console.log(`GURS lineage: ${fellows.length} fellows, ${fellows.filter(f => f.position).length} with confirmed positions.`);
