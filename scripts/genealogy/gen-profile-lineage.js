#!/usr/bin/env node
/**
 * Per-profile lineage data for surgeon profile pages.
 *
 * Profile pages used to import src/data/lineage.ts, which pulls in both
 * fellowship trees (GURS and URPS). Docusaurus only moves a module into a
 * shared chunk when most pages use it, so every profile page carried its own
 * copy of the full lineage (about 230 KB each). This script precomputes what
 * a profile shows (the surgeon's own fields, mentor, co-mentor, school role
 * and trainees) into src/data/surgeon-profiles/<id>.json, which the profile
 * MDX imports alongside its citations file.
 *
 * Runs in prebuild. Usage: node scripts/genealogy/gen-profile-lineage.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');
const OUT_DIR = path.join(ROOT, 'src/data/surgeon-profiles');
const jiti = require('jiti')(__filename);
const { SURGEONS, DYNASTIES } = jiti(path.join(ROOT, 'src/data/surgeons.ts'));
const { LINEAGE_BY_ID, childrenOf } = jiti(path.join(ROOT, 'src/data/lineage.ts'));

const SURGEON_FIELDS = ['name', 'photo', 'country', 'countryFlag', 'institution', 'title', 'born', 'died',
  'website', 'youtube', 'twitter', 'instagram', 'bioUrl', 'keyPubs', 'instruments'];

const person = n => (n ? { name: n.name, ...(n.path ? { path: n.path } : {}) } : null);

fs.mkdirSync(OUT_DIR, { recursive: true });
const keep = new Set();
for (const s of SURGEONS.filter(x => x.path)) {
  const node = LINEAGE_BY_ID.get(s.id);
  const surgeon = {};
  for (const f of SURGEON_FIELDS) if (s[f] !== undefined) surgeon[f] = s[f];
  const mentor = node?.mentorId ? LINEAGE_BY_ID.get(node.mentorId) : undefined;
  const coMentor = node?.coMentorId ? LINEAGE_BY_ID.get(node.coMentorId) : undefined;
  const school = DYNASTIES.find(d => d.rootId === s.id);
  const data = {
    surgeon,
    position: node?.position ?? null,
    year: node?.year ?? null,
    mentor: person(mentor),
    coMentor: person(coMentor),
    school: school ? school.label : null,
    trainees: (node ? childrenOf(s.id) : []).map(t => ({
      id: t.id, name: t.name,
      ...(t.path ? { path: t.path } : {}),
      ...(t.year ? { year: t.year } : {}),
      ...(t.surgeon?.countryFlag ? { flag: t.surgeon.countryFlag } : {}),
    })),
  };
  const file = path.join(OUT_DIR, `${s.id}.json`);
  const text = JSON.stringify(data, null, 1) + '\n';
  if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== text) fs.writeFileSync(file, text);
  keep.add(`${s.id}.json`);
}
for (const f of fs.readdirSync(OUT_DIR)) if (!keep.has(f)) fs.unlinkSync(path.join(OUT_DIR, f));
console.log(`Surgeon profiles: lineage data for ${keep.size} profiles.`);
