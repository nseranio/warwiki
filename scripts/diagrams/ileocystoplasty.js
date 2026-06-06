#!/usr/bin/env node
/**
 * WARWIKI original schematic — clam ileocystoplasty (cup-patch).
 *
 * Three steps: (1) detubularize the ileal segment along its antimesenteric
 * border into a flat plate; (2) reconfigure it into a U/S-shaped cup; (3) sew
 * the cup onto the bivalved ("clam") native bladder to create a low-pressure,
 * high-capacity reservoir.
 *
 * Output: static/img/diagrams/ileocystoplasty.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', bowel: '#E9D6BE', bowelEdge: '#B89B7A',
  mucosa: '#F3E2D6', mesentery: '#F3C7C0', mesEdge: '#D89B92', bladder: '#DCE7F2', bladderEdge: '#5B7FA6',
  suture: '#185FA5', arrow: '#94A3B8', cut: '#B91C1C' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 860, H = 384;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.2" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 38, 16, 700, C.ink, 'start', 'Clam ileocystoplasty &#8212; the cup-patch', false));
push(txt(40, 57, 12.5, 500, C.muted, 'start', 'a detubularized ileal cup sewn onto the bivalved bladder makes a low-pressure, high-capacity reservoir', false));

const cy = 172;
const cx1 = 150, cx2 = 430, cx3 = 706;

// arrows between steps
function arrow(x) { push(`<line x1="${x - 18}" y1="${cy}" x2="${x + 18}" y2="${cy}" stroke="${C.arrow}" stroke-width="2.2" marker-end="url(#ar)"/>`); }
arrow(294);
arrow(566);

// ---- step 1: detubularized plate ----------------------------------------
push(`<rect x="${cx1 - 58}" y="${cy - 40}" width="116" height="66" rx="10" fill="${C.mucosa}" stroke="${C.bowelEdge}" stroke-width="2"/>`);
for (const yy of [cy - 22, cy - 6, cy + 10]) push(`<path d="M ${cx1 - 50} ${yy} Q ${cx1} ${yy + 5} ${cx1 + 50} ${yy}" fill="none" stroke="${C.bowelEdge}" stroke-width="1" opacity="0.5"/>`);
// mesentery fan along the bottom
push(`<path d="M ${cx1 - 40} ${cy + 26} L ${cx1} ${cy + 64} L ${cx1 + 40} ${cy + 26} Z" fill="${C.mesentery}" stroke="${C.mesEdge}" stroke-width="1.2"/>`);
for (const dx of [-22, 0, 22]) push(`<line x1="${cx1 + dx}" y1="${cy + 26}" x2="${cx1 + dx * 0.4}" y2="${cy + 58}" stroke="${C.mesEdge}" stroke-width="1"/>`);
// antimesenteric cut edge
push(`<line x1="${cx1 - 58}" y1="${cy - 40}" x2="${cx1 + 58}" y2="${cy - 40}" stroke="${C.cut}" stroke-width="2.4" stroke-dasharray="5 3"/>`);
push(txt(cx1, cy - 50, 10, 600, C.cut, 'middle', 'antimesenteric border opened', false));
push(txt(cx1, cy + 84, 13, 700, C.ink, 'middle', '1. Detubularize', false));
push(txt(cx1, cy + 100, 10, 500, C.muted, 'middle', 'open the ileal segment flat', false));

// ---- step 2: reconfigured U-cup -----------------------------------------
push(`<path d="M ${cx2 - 46} ${cy - 42} L ${cx2 - 46} ${cy + 6} Q ${cx2 - 46} ${cy + 40} ${cx2} ${cy + 40} Q ${cx2 + 46} ${cy + 40} ${cx2 + 46} ${cy + 6} L ${cx2 + 46} ${cy - 42} L ${cx2 + 30} ${cy - 42} L ${cx2 + 30} ${cy + 6} Q ${cx2 + 30} ${cy + 24} ${cx2} ${cy + 24} Q ${cx2 - 30} ${cy + 24} ${cx2 - 30} ${cy + 6} L ${cx2 - 30} ${cy - 42} Z" fill="${C.bowel}" stroke="${C.bowelEdge}" stroke-width="2"/>`);
push(txt(cx2, cy + 84, 13, 700, C.ink, 'middle', '2. Reconfigure', false));
push(txt(cx2, cy + 100, 10, 500, C.muted, 'middle', 'fold into a U / S-shaped cup', false));

// ---- step 3: augmented bladder ------------------------------------------
// ileal cup (top)
push(`<path d="M ${cx3 - 52} ${cy} Q ${cx3 - 52} ${cy - 56} ${cx3} ${cy - 56} Q ${cx3 + 52} ${cy - 56} ${cx3 + 52} ${cy} Z" fill="${C.bowel}" stroke="${C.bowelEdge}" stroke-width="2"/>`);
// native bladder (bottom, bivalved open at the equator)
push(`<path d="M ${cx3 - 52} ${cy} Q ${cx3 - 52} ${cy + 60} ${cx3} ${cy + 60} Q ${cx3 + 52} ${cy + 60} ${cx3 + 52} ${cy} Z" fill="${C.bladder}" stroke="${C.bladderEdge}" stroke-width="2"/>`);
// anastomosis (suture line at the equator)
push(`<line x1="${cx3 - 52}" y1="${cy}" x2="${cx3 + 52}" y2="${cy}" stroke="${C.suture}" stroke-width="2"/>`);
for (let i = -44; i <= 44; i += 14) push(`<line x1="${cx3 + i}" y1="${cy - 4}" x2="${cx3 + i + 4}" y2="${cy + 4}" stroke="${C.suture}" stroke-width="1.4"/>`);
push(txt(cx3, cy - 36, 10.5, 600, C.bowelEdge, 'middle', 'ileal cup-patch', false));
push(txt(cx3, cy + 40, 10.5, 600, C.bladderEdge, 'middle', 'native bladder', false));
push(txt(cx3 + 58, cy, 10, 600, C.suture, 'start', 'anastomosis'));
push(txt(cx3, cy + 84, 13, 700, C.ink, 'middle', '3. Augment', false));
push(txt(cx3, cy + 100, 10, 500, C.muted, 'middle', 'sew the cup onto the bivalved bladder', false));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Three-step clam ileocystoplasty: detubularize the ileal segment along its antimesenteric border into a flat plate; reconfigure it into a U-shaped cup; and sew the cup onto the bivalved native bladder at an equatorial anastomosis to form a high-capacity low-pressure reservoir.">
<defs>
<marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.arrow}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'ileocystoplasty.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
