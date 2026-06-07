#!/usr/bin/env node
/**
 * WARWIKI original schematic — sacral neuromodulation (S3 lead).
 *
 * Posterior sacrum: a tined quadripolar lead through the S3 foramen, tunneled to
 * a buttock IPG. The S3 motor/sensory responses (bellows + great-toe plantar
 * flexion + perineal sensation) confirm correct placement on the test stimulation.
 *
 * Output: static/img/diagrams/sacral-neuromodulation.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', bone: '#ECE4D4', boneEdge: '#B6A98C',
  foramen: '#FBF5EF', foramenEdge: '#C4B79A', lead: '#334155', elec: '#185FA5', s3: '#B91C1C',
  ipg: '#CBD5E1', ipgEdge: '#64748B', resp: '#15803D', wire: '#475569' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 860, H = 374;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Sacral neuromodulation &#8212; tined lead in the S3 foramen', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'posterior sacrum: a quadripolar lead through S3, tunneled to a buttock pulse generator; the S3 response confirms placement', false));

// ---- posterior sacrum (shield, wide top -> apex) ----
const cx = 250;
push(`<path d="M ${cx - 88} 108 C ${cx - 96} 150, ${cx - 70} 250, ${cx - 30} 320 L ${cx - 8} 344 L ${cx + 8} 344 L ${cx + 30} 320 C ${cx + 70} 250, ${cx + 96} 150, ${cx + 88} 108 C ${cx + 40} 96, ${cx - 40} 96, ${cx - 88} 108 Z" fill="${C.bone}" stroke="${C.boneEdge}" stroke-width="1.8" stroke-linejoin="round"/>`);
// median crest
push(`<line x1="${cx}" y1="116" x2="${cx}" y2="330" stroke="${C.boneEdge}" stroke-width="1.4"/>`);
// foramina S1-S4 (pairs), converging toward apex
const rows = [['S1', 140, 40], ['S2', 178, 36], ['S3', 216, 31], ['S4', 252, 26]];
const s3y = 216, s3x = cx + 31;
rows.forEach(([lab, y, dx]) => {
  for (const s of [-1, 1]) {
    const isS3 = lab === 'S3';
    push(`<ellipse cx="${cx + s * dx}" cy="${y}" rx="9" ry="6.5" fill="${C.foramen}" stroke="${isS3 ? C.s3 : C.foramenEdge}" stroke-width="${isS3 ? 2 : 1.2}"/>`);
  }
  push(txt(cx, y + 3.5, 8.5, 700, lab === 'S3' ? C.s3 : C.muted, 'middle', lab));
});
// highlight S3 target
push(`<circle cx="${s3x}" cy="${s3y}" r="15" fill="none" stroke="${C.s3}" stroke-width="1.3" stroke-dasharray="3 3"/>`);
push(txt(cx, 92, 9.5, 600, C.boneEdge, 'middle', 'posterior sacrum'));
push(txt(cx, 358, 9, 600, C.boneEdge, 'middle', 'coccyx'));

// ---- tined quadripolar lead through S3 ----
// lead body curving from IPG up to the S3 foramen
push(`<path d="M 470 250 C 400 250, 360 235, ${s3x + 18} ${s3y + 8}" fill="none" stroke="${C.lead}" stroke-width="3.4" stroke-linecap="round"/>`);
// 4 electrode contacts straddling the foramen
for (let i = 0; i < 4; i++) {
  const t = i;
  const ex = s3x + 16 - i * 9, ey = s3y + 7 - i * 3.4;
  push(`<rect x="${f(ex - 3)}" y="${f(ey - 3)}" width="6" height="6" rx="1.5" fill="${C.elec}"/>`);
}
// tines (anchor barbs) just proximal to the foramen
for (let i = 0; i < 3; i++) {
  const tx = s3x + 22 + i * 8, ty = s3y + 9 + i * 2;
  push(`<path d="M ${f(tx)} ${f(ty)} l 7 -5 M ${f(tx)} ${f(ty)} l 7 5" fill="none" stroke="${C.lead}" stroke-width="1.2"/>`);
}
push(txt(s3x + 4, s3y - 22, 9.5, 700, C.elec, 'middle', 'quadripolar lead'));
push(txt(s3x + 70, s3y + 30, 9, 600, C.lead, 'middle', 'tines anchor it'));

// ---- IPG in buttock ----
push(`<rect x="468" y="232" width="52" height="40" rx="10" fill="${C.ipg}" stroke="${C.ipgEdge}" stroke-width="1.8"/>`);
push(`<circle cx="494" cy="252" r="9" fill="none" stroke="${C.ipgEdge}" stroke-width="1.4"/>`);
push(txt(494, 290, 9.5, 700, C.ink, 'middle', 'IPG'));
push(txt(494, 303, 8.5, 500, C.muted, 'middle', 'pulse generator', false));
push(txt(494, 316, 8.5, 500, C.muted, 'middle', '(upper buttock)', false));

// ---- S3 response callout ----
const rx = 588, ry = 120;
push(`<rect x="${rx}" y="${ry}" width="234" height="180" rx="12" fill="#F0FAF3" stroke="#CDEBD7" stroke-width="1.3"/>`);
push(txt(rx + 16, ry + 24, 12.5, 700, '#166534', 'start', 'S3 response = correct lead', false));
push(txt(rx + 16, ry + 40, 9.5, 500, C.muted, 'start', 'seen on intraoperative test stimulation', false));
const items = [
  ['Bellows', 'inward levator/perineal contraction'],
  ['Great-toe', 'plantar flexion of the ipsilateral hallux'],
  ['Sensation', 'pulling in rectum / perineum / genitals'],
];
items.forEach(([h, d], i) => {
  const y = ry + 66 + i * 34;
  push(`<circle cx="${rx + 22}" cy="${y - 4}" r="3.4" fill="${C.resp}"/>`);
  push(txt(rx + 34, y, 11, 700, C.ink, 'start', h));
  push(txt(rx + 34, y + 13, 9.5, 500, C.muted, 'start', d));
});
push(txt(rx + 16, ry + 170, 9, 500, C.muted, 'start', 'S2 = clamp/heel rotation; S4 = bellows only, no toe.', false));


const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Sacral neuromodulation shown on a posterior sacrum with the S1 through S4 foramina. A tined quadripolar lead is placed through the S3 foramen, with four electrode contacts straddling the foramen and tines anchoring it, tunneled to an implantable pulse generator in the upper buttock. A callout lists the S3 responses that confirm correct placement on test stimulation: the bellows (inward levator and perineal contraction), plantar flexion of the great toe, and a pulling sensation in the rectum, perineum, or genitals; S2 gives clamp and heel rotation, S4 gives bellows without toe movement. Key: two-stage or PNE testing for refractory urgency-frequency, urge incontinence, non-obstructive retention, and fecal incontinence, progressing to implant only after at least 50 percent symptom improvement.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'sacral-neuromodulation.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
