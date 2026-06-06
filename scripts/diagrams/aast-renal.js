#!/usr/bin/env node
/**
 * WARWIKI original schematic — AAST renal injury grades (2018).
 *
 * Five stylized kidney panels (I-V), each showing the grade-defining injury:
 * contusion/subcapsular hematoma, shallow laceration, deep laceration,
 * laceration into the collecting system with extravasation, and shattered /
 * hilar avulsion. Colour-coded by severity.
 *
 * Output: static/img/diagrams/aast-renal.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', cortex: '#F3F4F6', edge: '#64748B',
  cs: '#CBD7E6', gerota: '#B6C0CC', injury: '#DC2626', hema: 'rgba(220,38,38,0.30)' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 900, H = 384;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.2" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}
const bean = (cx, cy) => `M ${cx} ${cy - 32} C ${cx + 18} ${cy - 31}, ${cx + 31} ${cy - 17}, ${cx + 31} ${cy} C ${cx + 31} ${cy + 17}, ${cx + 18} ${cy + 31}, ${cx} ${cy + 32} C ${cx - 14} ${cy + 31}, ${cx - 23} ${cy + 22}, ${cx - 21} ${cy + 12} C ${cx - 19} ${cy + 5}, ${cx - 11} ${cy + 5}, ${cx - 9} ${cy} C ${cx - 11} ${cy - 5}, ${cx - 19} ${cy - 5}, ${cx - 21} ${cy - 12} C ${cx - 23} ${cy - 22}, ${cx - 14} ${cy - 31}, ${cx} ${cy - 32} Z`;

function kidney(cx, cy) {
  push(`<ellipse cx="${cx + 2}" cy="${cy}" rx="42" ry="48" fill="none" stroke="${C.gerota}" stroke-width="1.2" stroke-dasharray="3 4"/>`);
  push(`<path d="${bean(cx, cy)}" fill="${C.cortex}" stroke="${C.edge}" stroke-width="1.8"/>`);
  push(`<path d="M ${cx - 8} ${cy} L ${cx + 8} ${cy - 9} L ${cx + 13} ${cy} L ${cx + 8} ${cy + 9} Z" fill="${C.cs}" stroke="none"/>`);
}
const wedge = (cx, cy, apexX, apexY) => `<path d="M ${cx + 31} ${cy - 9} L ${f(apexX)} ${f(apexY)} L ${cx + 30} ${cy + 2} Z" fill="${C.injury}"/>`;

function injury(g, cx, cy) {
  if (g === 1) {
    push(`<ellipse cx="${cx + 15}" cy="${cy - 8}" rx="9" ry="12" fill="${C.hema}"/>`);
    push(`<path d="M ${cx + 26} ${cy - 22} C ${cx + 33} ${cy - 14}, ${cx + 33} ${cy + 14}, ${cx + 26} ${cy + 22}" fill="none" stroke="${C.injury}" stroke-width="2.4" opacity="0.55"/>`);
  } else if (g === 2) {
    push(`<path d="M ${cx + 34} ${cy - 20} C ${cx + 44} ${cy - 12}, ${cx + 44} ${cy + 12}, ${cx + 34} ${cy + 20}" fill="none" stroke="${C.injury}" stroke-width="6" stroke-linecap="round" opacity="0.30"/>`);
    push(wedge(cx, cy, cx + 20, cy - 3));
  } else if (g === 3) {
    push(wedge(cx, cy, cx + 4, cy - 2));
  } else if (g === 4) {
    push(wedge(cx, cy, cx - 4, cy));
    for (const [dx, dy, r] of [[-13, -9, 2.6], [-18, 3, 2.2], [-22, -3, 1.9]]) push(`<circle cx="${cx + dx}" cy="${cy + dy}" r="${r}" fill="${C.injury}"/>`);
  } else if (g === 5) {
    for (const d of [`M ${cx + 26} ${cy - 20} L ${cx - 14} ${cy + 12}`, `M ${cx + 22} ${cy + 18} L ${cx - 8} ${cy - 16}`, `M ${cx + 4} ${cy - 30} L ${cx + 1} ${cy + 30}`])
      push(`<path d="${d}" stroke="${C.injury}" stroke-width="2.2" fill="none"/>`);
    push(`<path d="M ${cx - 9} ${cy - 4} l -9 3 l 7 3 l -9 3" stroke="${C.injury}" stroke-width="2.2" fill="none" stroke-linejoin="round"/>`);
  }
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 40, 16, 700, C.ink, 'start', 'AAST renal injury scale (2018)', false));
push(txt(40, 59, 12.5, 500, C.muted, 'start', 'grade rises with depth and with collecting-system and vascular involvement (dashed outline = Gerota&#8217;s fascia)', false));

const panels = [
  { g: 1, lbl: 'I', c: '#16A34A', d1: 'contusion /', d2: 'subcapsular hematoma' },
  { g: 2, lbl: 'II', c: '#4D7C0F', d1: 'laceration &#8804; 1 cm +', d2: 'perirenal hematoma' },
  { g: 3, lbl: 'III', c: '#D97706', d1: 'laceration > 1 cm,', d2: 'collecting system intact' },
  { g: 4, lbl: 'IV', c: '#EA580C', d1: 'into collecting system', d2: '(urine leak) or vascular' },
  { g: 5, lbl: 'V', c: '#B91C1C', d1: 'shattered / hilar', d2: 'avulsion, devascularized' },
];
const cxs = [122, 290, 458, 626, 794];
const cy = 168;
panels.forEach((p, i) => {
  const cx = cxs[i];
  kidney(cx, cy);
  injury(p.g, cx, cy);
  push(`<circle cx="${cx}" cy="${cy + 78}" r="15" fill="${p.c}"/>`);
  push(txt(cx, cy + 83, 14, 700, '#FFFFFF', 'middle', p.lbl, false));
  push(txt(cx, cy + 112, 10.3, 500, C.muted, 'middle', p.d1, false));
  push(txt(cx, cy + 125, 10.3, 500, C.muted, 'middle', p.d2, false));
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Five stylized kidney panels showing AAST renal injury grades one through five: contusion or subcapsular hematoma, shallow laceration with perirenal hematoma, deep laceration sparing the collecting system, laceration into the collecting system with urinary extravasation, and shattered kidney or hilar avulsion.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'aast-renal.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
