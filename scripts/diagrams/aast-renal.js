#!/usr/bin/env node
/**
 * WARWIKI original schematic — AAST renal injury grades (2018).
 *
 * Five stylized kidney panels (I-V), each showing the grade-defining injury,
 * with a legend so every element is identifiable: the collecting system (blue),
 * subcapsular vs perirenal hematoma (red, inside vs outside the capsule),
 * laceration (dark red), and urinary extravasation (amber). Key fix: grade III
 * is a deep laceration that stops SHORT of the collecting system; grade IV
 * breaches it and leaks urine.
 *
 * Output: static/img/diagrams/aast-renal.svg
 */
const fs = require('fs');
const path = require('path');

const C = {
  ink: '#1E293B', muted: '#64748B', border: '#E2E8F0',
  cortex: '#F4F1EC', cortexEdge: '#6B7280', gerota: '#AEB7C2',
  cs: '#C2DBF2', csEdge: '#5B9BD5', hema: '#DC2626', hemaEdge: '#991B1B',
  lac: '#7F1D1D', urine: '#F59E0B', tear: '#B91C1C', devasc: '#94A3B8',
};
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 900, H = 408;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.2" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

const bean = (cx, cy) => `M ${cx} ${cy - 36} C ${cx + 22} ${cy - 35}, ${cx + 34} ${cy - 18}, ${cx + 34} ${cy} C ${cx + 34} ${cy + 18}, ${cx + 22} ${cy + 35}, ${cx} ${cy + 36} C ${cx - 16} ${cy + 35}, ${cx - 27} ${cy + 24}, ${cx - 25} ${cy + 13} C ${cx - 23} ${cy + 5}, ${cx - 13} ${cy + 5}, ${cx - 11} ${cy} C ${cx - 13} ${cy - 5}, ${cx - 23} ${cy - 5}, ${cx - 25} ${cy - 13} C ${cx - 27} ${cy - 24}, ${cx - 16} ${cy - 35}, ${cx} ${cy - 36} Z`;
const csPath = (cx, cy) => `M ${cx - 12} ${cy} L ${cx - 1} ${cy - 16} L ${cx + 4} ${cy - 13} L ${cx} ${cy - 3} L ${cx + 9} ${cy} L ${cx} ${cy + 3} L ${cx + 4} ${cy + 13} L ${cx - 1} ${cy + 16} Z`;
const wedge = (cx, cy, ax, ay) => `<path d="M ${cx + 34} ${cy - 7} L ${f(ax)} ${f(ay)} L ${cx + 33} ${cy + 3} Z" fill="${C.lac}"/>`;
const crescent = (x0, x1, cx, cy) => `M ${cx + x0} ${cy - 20} C ${cx + x1} ${cy - 11}, ${cx + x1} ${cy + 11}, ${cx + x0} ${cy + 20} C ${cx + (x0 + x1) / 2 + 1} ${cy + 9}, ${cx + (x0 + x1) / 2 + 1} ${cy - 9}, ${cx + x0} ${cy - 20} Z`;

function kidney(cx, cy) {
  push(`<ellipse cx="${cx + 4}" cy="${cy}" rx="48" ry="50" fill="none" stroke="${C.gerota}" stroke-width="1.2" stroke-dasharray="3 4"/>`);
  push(`<path d="${bean(cx, cy)}" fill="${C.cortex}" stroke="${C.cortexEdge}" stroke-width="1.8"/>`);
  push(`<path d="${csPath(cx, cy)}" fill="${C.cs}" stroke="${C.csEdge}" stroke-width="1.3"/>`);
}
function injury(g, cx, cy) {
  if (g === 1) {
    push(`<path d="${crescent(20, 32, cx, cy)}" fill="${C.hema}" fill-opacity="0.6" stroke="${C.hemaEdge}" stroke-width="1"/>`);
  } else if (g === 2) {
    push(wedge(cx, cy, cx + 22, cy - 3));
    push(`<path d="${crescent(37, 47, cx, cy)}" fill="${C.hema}" fill-opacity="0.6" stroke="${C.hemaEdge}" stroke-width="1"/>`);
  } else if (g === 3) {
    push(wedge(cx, cy, cx + 16, cy - 1));
  } else if (g === 4) {
    push(wedge(cx, cy, cx + 1, cy));
    for (const [dx, dy, r] of [[10, -7, 3], [20, 4, 2.6], [31, -3, 2.6], [40, 5, 2.2]]) push(`<circle cx="${cx + dx}" cy="${cy + dy}" r="${r}" fill="${C.urine}"/>`);
  } else if (g === 5) {
    push(`<path d="${bean(cx, cy)}" fill="${C.devasc}" fill-opacity="0.28"/>`);
    for (const d of [`M ${cx + 30} ${cy - 22} L ${cx - 14} ${cy + 14}`, `M ${cx + 26} ${cy + 20} L ${cx - 10} ${cy - 16}`, `M ${cx + 6} ${cy - 32} L ${cx + 2} ${cy + 32}`])
      push(`<path d="${d}" stroke="${C.lac}" stroke-width="2.4" fill="none"/>`);
    push(`<path d="M ${cx - 12} ${cy - 4} l -10 3 l 8 3 l -10 3" stroke="${C.tear}" stroke-width="2.4" fill="none" stroke-linejoin="round"/>`);
    push(`<circle cx="${cx - 22}" cy="${cy + 5}" r="3" fill="${C.tear}"/>`);
  }
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 38, 16, 700, C.ink, 'start', 'AAST renal injury scale (2018)', false));
push(txt(40, 57, 12.5, 500, C.muted, 'start', 'severity rises with laceration depth, then with collecting-system and vascular involvement', false));

const panels = [
  { g: 1, lbl: 'I', c: '#16A34A', d1: 'contusion /', d2: 'subcapsular hematoma' },
  { g: 2, lbl: 'II', c: '#4D7C0F', d1: 'laceration &#8804; 1 cm +', d2: 'perirenal hematoma' },
  { g: 3, lbl: 'III', c: '#D97706', d1: 'laceration > 1 cm,', d2: 'collecting system spared' },
  { g: 4, lbl: 'IV', c: '#EA580C', d1: 'laceration into', d2: 'collecting system (+ urine)' },
  { g: 5, lbl: 'V', c: '#B91C1C', d1: 'shattered / hilar', d2: 'avulsion, devascularized' },
];
const cxs = [124, 292, 460, 628, 796];
const cy = 150;
panels.forEach((p, i) => {
  const cx = cxs[i];
  kidney(cx, cy);
  injury(p.g, cx, cy);
  push(`<circle cx="${cx}" cy="${cy + 78}" r="15" fill="${p.c}"/>`);
  push(txt(cx, cy + 83, 14, 700, '#FFFFFF', 'middle', p.lbl, false));
  push(txt(cx, cy + 110, 10.2, 500, C.muted, 'middle', p.d1, false));
  push(txt(cx, cy + 123, 10.2, 500, C.muted, 'middle', p.d2, false));
});

// ---- legend --------------------------------------------------------------
push(`<line x1="150" y1="312" x2="750" y2="312" stroke="${C.border}" stroke-width="1"/>`);
const ly = 338;
function legend(x, kind, label) {
  if (kind === 'cs') push(`<path d="M ${x} ${ly} l 6 -7 l 6 7 l -6 7 Z" fill="${C.cs}" stroke="${C.csEdge}" stroke-width="1.2"/>`);
  else if (kind === 'hema') push(`<ellipse cx="${x + 6}" cy="${ly}" rx="7.5" ry="5.5" fill="${C.hema}" fill-opacity="0.6" stroke="${C.hemaEdge}" stroke-width="1"/>`);
  else if (kind === 'lac') push(`<path d="M ${x} ${ly - 6} L ${x + 13} ${ly} L ${x} ${ly + 6} Z" fill="${C.lac}"/>`);
  else if (kind === 'urine') push(`<circle cx="${x + 6}" cy="${ly}" r="5" fill="${C.urine}"/>`);
  else if (kind === 'gerota') push(`<path d="M ${x} ${ly + 6} Q ${x + 6} ${ly - 7} ${x + 13} ${ly + 6}" fill="none" stroke="${C.gerota}" stroke-width="1.4" stroke-dasharray="3 3"/>`);
  push(txt(x + 19, ly + 4, 11, 500, C.ink, 'start', label, false));
}
legend(192, 'cs', 'collecting system');
legend(342, 'hema', 'hematoma');
legend(454, 'lac', 'laceration');
legend(562, 'urine', 'urine leak');
legend(668, 'gerota', "Gerota&#8217;s fascia");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Five stylized kidney panels showing AAST renal injury grades I-V with a legend. Each kidney has a blue collecting system and dashed Gerota's fascia. Grade I: subcapsular hematoma. Grade II: shallow laceration plus perirenal hematoma. Grade III: deep laceration sparing the collecting system. Grade IV: laceration into the collecting system with amber urinary extravasation. Grade V: shattered kidney with hilar avulsion, devascularized.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'aast-renal.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
