#!/usr/bin/env node
/**
 * WARWIKI original schematic — midurethral-sling trajectories.
 *
 * AP view of the anterior pelvis comparing the three routes a suburethral sling
 * takes: retropubic (behind the pubis, suprapubic exit), transobturator (through
 * the obturator foramen, groin exit), and single-incision (anchored in obturator
 * internus, no exit). Same hammock under the midurethra; different passage risks.
 *
 * Output: static/img/diagrams/sling-trajectories.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', bone: '#ECE4D4', boneEdge: '#B6A98C',
  uret: '#64748B', lumen: '#FFFFFF', sling: '#185FA5',
  rp: '#B91C1C', to: '#0F766E', si: '#B45309', vag: '#F3DBDC', vagEdge: '#CF9DA3' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 860, H = 341;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Midurethral sling &#8212; three trajectories, one hammock', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'anterior-pelvis view: same suburethral sling, different passage (and different risks)', false));

const cx = 340; // pelvis midline
// ---- bony pelvis (anterior ring) ----
// pubic symphysis
push(`<rect x="${cx - 9}" y="150" width="18" height="46" rx="4" fill="${C.bone}" stroke="${C.boneEdge}" stroke-width="1.4"/>`);
push(txt(cx, 142, 9, 700, C.boneEdge, 'middle', 'pubic symphysis'));
// superior pubic rami (sweep up-lateral) + obturator foramina + ischiopubic rami
function hemi(sgn) {
  const fx = cx + sgn * 96; // foramen center x
  // bone body around the obturator foramen (donut-ish): outer shape minus inner hole
  push(`<path d="M ${cx + sgn * 6} 156
    C ${cx + sgn * 70} 150, ${fx + sgn * 52} 168, ${fx + sgn * 56} 212
    C ${fx + sgn * 58} 300, ${fx - sgn * 8} 332, ${fx - sgn * 30} 326
    C ${cx + sgn * 18} 318, ${cx + sgn * 10} 250, ${cx + sgn * 8} 200 Z"
    fill="${C.bone}" stroke="${C.boneEdge}" stroke-width="1.4" stroke-linejoin="round"/>`);
  // obturator foramen (hole)
  push(`<ellipse cx="${fx}" cy="248" rx="34" ry="48" fill="#FFFFFF" stroke="${C.boneEdge}" stroke-width="1.3"/>`);
  push(txt(fx, 250, 8.5, 600, C.boneEdge, 'middle', 'obturator'));
  push(txt(fx, 261, 8.5, 600, C.boneEdge, 'middle', 'foramen'));
}
hemi(-1); hemi(1);

// ---- midline urethra + vagina + sling ----
const su = 286; // suburethral level
push(`<rect x="${cx - 9}" y="214" width="18" height="92" rx="9" fill="${C.uret}"/>`);
push(`<rect x="${cx - 3}" y="214" width="6" height="92" rx="3" fill="${C.lumen}"/>`);
push(txt(cx, 322, 9, 600, C.uret, 'middle', 'urethra'));
// sling hammock under midurethra
push(`<path d="M ${cx - 40} ${su + 6} Q ${cx} ${su + 22} ${cx + 40} ${su + 6}" fill="none" stroke="${C.sling}" stroke-width="5" stroke-linecap="round"/>`);
push(txt(cx, su + 38, 9.5, 700, C.sling, 'middle', 'suburethral sling'));

// ---- trajectories ----
function dot(x, y, c) { push(`<circle cx="${x}" cy="${y}" r="3.4" fill="${c}"/>`); }
// retropubic: from suburethral up behind pubis, suprapubic exit
for (const s of [-1, 1]) {
  push(`<path d="M ${cx + s * 26} ${su} C ${cx + s * 30} 230, ${cx + s * 24} 150, ${cx + s * 30} 96" fill="none" stroke="${C.rp}" stroke-width="2.6" stroke-linecap="round"/>`);
  dot(cx + s * 30, 96, C.rp);
}
push(txt(cx, 88, 9.5, 700, C.rp, 'middle', 'retropubic exit (suprapubic)'));
// transobturator: from suburethral laterally through foramina to groin
for (const s of [-1, 1]) {
  push(`<path d="M ${cx + s * 30} ${su + 2} C ${cx + s * 60} ${su + 6}, ${cx + s * 96} 268, ${cx + s * 150} 250" fill="none" stroke="${C.to}" stroke-width="2.6" stroke-linecap="round"/>`);
  dot(cx + s * 150, 250, C.to);
}
push(txt(cx - 150, 234, 9, 700, C.to, 'middle', 'groin'));
push(txt(cx + 150, 234, 9, 700, C.to, 'middle', 'groin'));
// single-incision: short, anchored in obturator internus (medial foramen edge)
for (const s of [-1, 1]) {
  push(`<path d="M ${cx + s * 28} ${su + 2} C ${cx + s * 44} ${su}, ${cx + s * 56} 262, ${cx + s * 64} 250" fill="none" stroke="${C.si}" stroke-width="2.6" stroke-linecap="round"/>`);
  push(`<path d="M ${cx + s * 60} 244 l ${s * 8} 0 l ${-s * 4} 10 z" fill="${C.si}"/>`);
}

// ---- legend (right) ----
const lx = 600, ly = 130;
push(`<rect x="${lx - 16}" y="${ly - 26}" width="244" height="206" rx="12" fill="#F8FAFC" stroke="#EAEDF1" stroke-width="1.2"/>`);
push(txt(lx, ly - 6, 12.5, 700, C.ink, 'start', 'Route &#8594; trade-off', false));
function row(y, c, name, note) {
  push(`<line x1="${lx}" y1="${y}" x2="${lx + 22}" y2="${y}" stroke="${c}" stroke-width="3.4" stroke-linecap="round"/>`);
  push(txt(lx + 30, y - 3, 11, 700, c, 'start', name));
  push(txt(lx + 30, y + 11, 9.5, 500, C.muted, 'start', note));
}
row(ly + 24, C.rp, 'Retropubic (TVT)', 'behind pubis; bladder-perf');
push(txt(lx + 30, ly + 47, 9.5, 500, C.muted, 'start', 'and vascular risk &#8594; do cysto'));
row(ly + 74, C.to, 'Transobturator (TOT)', 'through foramen; less bladder');
push(txt(lx + 30, ly + 97, 9.5, 500, C.muted, 'start', 'injury, more groin/thigh pain'));
row(ly + 124, C.si, 'Single-incision (SIMS)', 'anchored in obturator');
push(txt(lx + 30, ly + 147, 9.5, 500, C.muted, 'start', 'internus; no exit, least pain'));


const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Anterior-pelvis view comparing three midurethral-sling trajectories around the pubic symphysis and obturator foramina. All place a tension-free tape as a hammock under the midurethra. The retropubic (TVT) route passes behind the pubis to a suprapubic exit, carrying bladder-perforation and vascular risk so cystoscopy is mandatory. The transobturator (TOT) route passes through the obturator foramen to a groin exit, with less bladder injury but more groin and thigh pain. The single-incision (SIMS) route is anchored in the obturator internus with no skin exit and the least pain. Key notes comparable cure rates and non-inferior modern single-incision slings.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'sling-trajectories.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
