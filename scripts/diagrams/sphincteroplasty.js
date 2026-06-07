#!/usr/bin/env node
/**
 * WARWIKI original schematic — overlapping anal sphincteroplasty.
 *
 * The retracted ends of a disrupted external anal sphincter (anterior defect
 * after obstetric injury) are mobilized, the intervening scar divided, and the
 * two ends overlapped ("vest-over-pants") with two rows of horizontal mattress
 * sutures — restoring a continuous ring with extra anterior bulk.
 *
 * Output: static/img/diagrams/sphincteroplasty.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', eas: '#E7B6AC', easEdge: '#C0705E',
  ias: '#D9CCE3', iasEdge: '#9B7FB8', lumen: '#FBF3EF', lumenEdge: '#94A3B8', scar: '#64748B',
  suture: '#185FA5', body: '#ECE4D4', bodyEdge: '#B6A98C', arrow: '#0F766E' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 416;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}
const P = (cx, cy, r, deg) => [cx + r * Math.cos(deg * Math.PI / 180), cy + r * Math.sin(deg * Math.PI / 180)];

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Overlapping anal sphincteroplasty &#8212; repair the disrupted sphincter ring', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'perineal view (anterior up): mobilize the retracted EAS ends, divide the scar, and overlap them', false));

const cy = 210;
function annulus(cx) {
  // lumen + internal anal sphincter (intact, thin)
  push(`<circle cx="${cx}" cy="${cy}" r="22" fill="${C.lumen}" stroke="${C.lumenEdge}" stroke-width="1.2"/>`);
  push(`<circle cx="${cx}" cy="${cy}" r="32" fill="none" stroke="${C.ias}" stroke-width="9"/>`);
  // perineal body (anterior, top)
  push(`<ellipse cx="${cx}" cy="${cy - 78}" rx="22" ry="12" fill="${C.body}" stroke="${C.bodyEdge}" stroke-width="1.2"/>`);
}

// ============ PANEL A: defect ============
const ax = 200;
annulus(ax);
// EAS ring interrupted anteriorly (gap at top, ~50 deg)
const aStart = P(ax, cy, 52, -65), aEnd = P(ax, cy, 52, -115);
push(`<path d="M ${f(aStart[0])} ${f(aStart[1])} A 52 52 0 1 1 ${f(aEnd[0])} ${f(aEnd[1])}" fill="none" stroke="${C.eas}" stroke-width="18" stroke-linecap="round"/>`);
push(`<path d="M ${f(aStart[0])} ${f(aStart[1])} A 52 52 0 1 1 ${f(aEnd[0])} ${f(aEnd[1])}" fill="none" stroke="${C.easEdge}" stroke-width="18" stroke-linecap="round" opacity="0"/>`);
// retracted ends (caps) + scar between
push(`<circle cx="${f(aStart[0])}" cy="${f(aStart[1])}" r="9" fill="${C.eas}" stroke="${C.easEdge}" stroke-width="1.4"/>`);
push(`<circle cx="${f(aEnd[0])}" cy="${f(aEnd[1])}" r="9" fill="${C.eas}" stroke="${C.easEdge}" stroke-width="1.4"/>`);
push(`<path d="M ${f(aEnd[0] + 4)} ${f(aEnd[1] - 2)} Q ${ax} ${cy - 66} ${f(aStart[0] - 4)} ${f(aStart[1] - 2)}" fill="none" stroke="${C.scar}" stroke-width="2" stroke-dasharray="3 3"/>`);
push(txt(ax, cy - 40, 9, 700, C.scar, 'middle', 'anterior defect'));
push(txt(ax - 60, cy + 6, 9, 700, C.easEdge, 'middle', 'EAS'));
push(txt(ax + 56, cy + 30, 8.5, 600, C.iasEdge, 'middle', 'IAS'));
push(txt(ax, cy - 96, 8.5, 600, C.bodyEdge, 'middle', 'perineal body'));
push(txt(ax, 330, 12.5, 700, C.ink, 'middle', '1. Disrupted EAS', false));

// ============ arrow ============
push(`<line x1="300" y1="${cy}" x2="346" y2="${cy}" stroke="${C.arrow}" stroke-width="2.6" marker-end="url(#sp)"/>`);
push(txt(323, cy - 10, 9, 600, C.arrow, 'middle', 'overlap', false));

// ============ PANEL B: overlapping repair ============
const bx = 470;
annulus(bx);
// EAS ring closed (continuous) most of the way
const bStart = P(bx, cy, 52, -55), bEnd = P(bx, cy, 52, -125);
push(`<path d="M ${f(bStart[0])} ${f(bStart[1])} A 52 52 0 1 1 ${f(bEnd[0])} ${f(bEnd[1])}" fill="none" stroke="${C.eas}" stroke-width="18" stroke-linecap="round"/>`);
// overlap segment at the top (double-thickness, vest-over-pants)
push(`<path d="M ${f(bEnd[0])} ${f(bEnd[1])} Q ${bx} ${cy - 70} ${f(bStart[0])} ${f(bStart[1])}" fill="none" stroke="${C.eas}" stroke-width="20" stroke-linecap="round"/>`);
push(`<path d="M ${bx - 30} ${cy - 56} Q ${bx} ${cy - 64} ${bx + 30} ${cy - 56}" fill="none" stroke="${C.easEdge}" stroke-width="1.4"/>`);
// two rows of mattress sutures across the overlap
for (const dx of [-14, 14]) for (const dy of [0, 10]) {
  push(`<line x1="${bx + dx - 5}" y1="${cy - 60 + dy}" x2="${bx + dx + 5}" y2="${cy - 60 + dy}" stroke="${C.suture}" stroke-width="1.8"/>`);
}
push(txt(bx, cy - 38, 9, 700, C.suture, 'middle', 'overlapped + mattress sutures'));
push(txt(bx, 330, 12.5, 700, C.ink, 'middle', '2. Overlapping repair', false));

// ============ detail inset: vest-over-pants ============
const ix = 700, iy = 150;
push(`<rect x="${ix - 78}" y="${iy - 36}" width="156" height="150" rx="12" fill="#F8FAFC" stroke="#EAEDF1" stroke-width="1.2"/>`);
push(txt(ix, iy - 18, 10.5, 700, C.ink, 'middle', '"Vest-over-pants"', false));
// two muscle flaps overlapped
push(`<path d="M ${ix - 60} ${iy + 16} L ${ix + 18} ${iy + 16} Q ${ix + 30} ${iy + 16} ${ix + 30} ${iy + 28} L ${ix + 30} ${iy + 30}" fill="none" stroke="${C.eas}" stroke-width="12" stroke-linecap="round"/>`);
push(`<path d="M ${ix + 60} ${iy + 40} L ${ix - 18} ${iy + 40} Q ${ix - 30} ${iy + 40} ${ix - 30} ${iy + 28} L ${ix - 30} ${iy + 26}" fill="none" stroke="${C.eas}" stroke-width="12" stroke-linecap="round"/>`);
// mattress sutures through both layers (2)
for (const sx of [ix - 8, ix + 8]) push(`<path d="M ${sx} ${iy + 10} L ${sx} ${iy + 46} M ${sx - 6} ${iy + 10} L ${sx + 6} ${iy + 10} M ${sx - 6} ${iy + 46} L ${sx + 6} ${iy + 46}" fill="none" stroke="${C.suture}" stroke-width="1.6"/>`);
push(txt(ix, iy + 74, 8.5, 500, C.muted, 'middle', 'ends double-breasted &#8594;'));
push(txt(ix, iy + 86, 8.5, 500, C.muted, 'middle', 'more bulk + circumference'));
push(txt(ix, iy + 100, 8.5, 500, C.muted, 'middle', 'than end-to-end apposition'));

// ============ key ============
push(`<line x1="40" y1="362" x2="780" y2="362" stroke="${C.border}" stroke-width="1"/>`);
push(txt(40, 381, 11, 600, C.ink, 'start', 'For symptomatic EAS defects (obstetric OASIS or trauma). Mobilize the scarred ends fully and keep the scar on the muscle for suture purchase.', false));
push(txt(40, 399, 10.5, 500, C.muted, 'start', 'Overlapping and end-to-end give similar long-term continence (Cochrane); continence often deteriorates over years &#8212; counsel accordingly.', false));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Overlapping anal sphincteroplasty in perineal view with anterior at top. Panel 1: the external anal sphincter ring is disrupted by an anterior defect, its two ends retracted with scar between them, around an intact internal anal sphincter and anal lumen, below the perineal body. Panel 2: the ends are mobilized and overlapped vest-over-pants, secured with two rows of horizontal mattress sutures, restoring a continuous ring with extra anterior bulk. A detail inset shows the double-breasted overlap with mattress sutures passing through both muscle layers, giving more bulk and circumference than an end-to-end apposition. Key: used for symptomatic external-sphincter defects after obstetric injury or trauma; mobilize the scarred ends fully and keep the scar on the muscle for suture purchase; overlapping and end-to-end repairs give similar long-term continence per Cochrane, and continence often deteriorates over years.">
<defs>
<marker id="sp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.arrow}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'sphincteroplasty.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
