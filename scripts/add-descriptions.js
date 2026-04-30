#!/usr/bin/env node
/**
 * One-off: insert `description:` frontmatter into a curated set of priority
 * landing pages. Idempotent — skips files that already have a description.
 *
 * Run: node scripts/add-descriptions.js
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');

const ENTRIES = [
  // Top-level section landings
  ['docs/01-foundations/index.mdx',
    'Anatomy, surgical principles, perioperative care, pharmacology, instruments, and technology — the foundational reference layer for functional urology and reconstruction.'],
  ['docs/02-evaluation/index.mdx',
    'History and physical, imaging, laboratory studies, urodynamics, and ancillary testing — clinical evaluation for the reconstructive urologist and urogynecologist.'],
  ['docs/03-clinical-conditions/index.mdx',
    'Storage, voiding, pelvic support, neurogenic, upper tract, fistula, genital, pelvic pain, and defecatory disorders — the clinical conditions the reconstructive surgeon manages.'],
  ['docs/04-surgical-techniques/index.mdx',
    'The Treatment Atlas — searchable, decision-framework-anchored reference for every operation in functional urology and pelvic reconstruction.'],
  ['docs/05-special-populations/index.mdx',
    'Trauma and emergencies, gender-affirming surgery, women’s health, cancer survivorship, and lifelong urologic care for transitional and geriatric populations.'],
  ['docs/06-journal-club/index.mdx',
    'Curated literature and guideline references for functional urology, GU reconstruction, and pelvic floor medicine — separated from the operative-technique atlas.'],
  ['docs/07-roots/index.mdx',
    'Surgical genealogy and history of reconstructive urology and urogynecology — surgeon profiles, lineage tree, and the schools that shaped the field.'],
  ['docs/08-resources/index.mdx',
    'Textbooks, videos, podcasts, websites, patient resources, and the hidden curriculum of operational literacy for the reconstructive surgeon.'],

  // Treatment Atlas section landings
  ['docs/04-surgical-techniques/04a-urethral-reconstruction/index.mdx',
    'Male and female urethroplasty, anastomotic and substitution repairs, posterior urethroplasty, and minimally invasive urethral procedures.'],
  ['docs/04-surgical-techniques/04ab-bladder-neck-reconstruction/index.mdx',
    'Reconstruction of bladder-neck contracture and vesicourethral anastomotic stenosis after prostate surgery, with endoscopic and open-reconstruction frameworks.'],
  ['docs/04-surgical-techniques/04b-bladder-reconstruction/index.mdx',
    'Augmentation cystoplasty, bladder-neck reconstruction, and continent catheterizable channels (Mitrofanoff, Monti) for refractory bladder dysfunction.'],
  ['docs/04-surgical-techniques/04c-urinary-diversion/index.mdx',
    'Ileal conduit, colon conduit, orthotopic neobladder, continent cutaneous pouch, and cutaneous ureterostomy — selection framework and operative reference.'],
  ['docs/04-surgical-techniques/04d-upper-tract-reconstruction/index.mdx',
    'Pyeloplasty, ureteral reimplantation, Boari flap, ileal ureter, BMG ureteroplasty, and salvage upper-tract reconstruction.'],
  ['docs/04-surgical-techniques/04e-genital-reconstruction/index.mdx',
    'Penile, scrotal, and vulvar reconstruction — Fournier’s salvage, oncologic and post-traumatic repair, buried penis, and aesthetic-functional restoration.'],
  ['docs/04-surgical-techniques/04f-incontinence-procedures/index.mdx',
    'Female and male stress incontinence and OAB / urgency UI — slings, AUS, bulking agents, neuromodulation, and behavioral therapy.'],
  ['docs/04-surgical-techniques/04g-prolapse-repair/index.mdx',
    'Native-tissue, sacrocolpopexy, hysteropexy, mesh-augmented, and obliterative pelvic-organ-prolapse repair.'],
  ['docs/04-surgical-techniques/04h-fistula-repair/index.mdx',
    'Vesicovaginal, ureterovaginal, urethrovaginal, rectovaginal, rectourethral, and obstetric-fistula repair — transvaginal, transabdominal, and salvage approaches.'],
  ['docs/04-surgical-techniques/04i-tissue-transfer/index.mdx',
    'Cross-cutting flap and graft toolkit for genitourinary reconstruction — buccal mucosa, pedicled flaps, free flaps, and graft-substitution principles.'],
  ['docs/04-surgical-techniques/04j-sexual-dysfunction/index.mdx',
    'Erectile dysfunction and Peyronie’s disease — medical, mechanical, regenerative, and surgical management including penile prosthesis and plaque surgery.'],
  ['docs/04-surgical-techniques/04k-gender-affirming-surgery/index.mdx',
    'Masculinizing, feminizing, and non-binary genitourinary gender-affirming surgery — phalloplasty, vaginoplasty, vulvoplasty, and revision-salvage.'],
  ['docs/04-surgical-techniques/04l-cosmetic-genital-surgery/index.mdx',
    'Elective male and female cosmetic genital surgery — framed against SMSNA, ACOG, FIGO, and FDA position statements.'],
  ['docs/04-surgical-techniques/04m-bph-male-luts/index.mdx',
    'Treatment selection across BPH and male LUTS — endoscopic, minimally invasive, and surgical procedures with comparative outcome anchors.'],

  // Lifelong Urologic Care
  ['docs/05-special-populations/05f-lifelong-care/index.mdx',
    'Transitional and geriatric urologic care — the age-bookend overlays the reconstructive surgeon increasingly owns.'],
  ['docs/05-special-populations/05f-lifelong-care/transitional-urology.mdx',
    'Adult care of patients with congenital GU conditions — spina bifida, PUV, BEEC, DSD, complex hypospadias — transition vs transfer, readiness, and lifelong surveillance.'],
  ['docs/05-special-populations/05f-lifelong-care/geriatric-urology.mdx',
    'Frailty screening, anticholinergic-burden risk, ERAS, colpocleisis vs reconstruction in elderly POP, GSM and recurrent UTI in older women.'],
  ['docs/05-special-populations/05f-lifelong-care/hypospadias-epispadias.mdx',
    'Adult presentation of hypospadias and epispadias — master decision framework for primary, proximal, and reoperative repair, plus exstrophy-epispadias complex management.'],
];

let added = 0;
let skipped = 0;

for (const [relPath, description] of ENTRIES) {
  const full = path.join(REPO_ROOT, relPath);
  if (!fs.existsSync(full)) {
    console.warn(`MISSING: ${relPath}`);
    continue;
  }
  let content = fs.readFileSync(full, 'utf8');
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fmMatch) {
    console.warn(`NO FRONTMATTER: ${relPath}`);
    continue;
  }
  const fm = fmMatch[1];
  if (/^description:/m.test(fm)) {
    skipped++;
    continue;
  }
  // Insert description after title (or at end of frontmatter)
  let newFm;
  if (/^title:/m.test(fm)) {
    newFm = fm.replace(/^(title:[^\n]*)\n/m, `$1\ndescription: ${description}\n`);
  } else {
    newFm = `description: ${description}\n${fm}`;
  }
  const newContent = content.replace(fmMatch[0], `---\n${newFm}\n---\n`);
  fs.writeFileSync(full, newContent);
  added++;
  console.log(`+ ${relPath}`);
}

console.log(`\nAdded: ${added}, Skipped (already had description): ${skipped}`);
