#!/usr/bin/env node
/**
 * WARWIKI original schematic — extraperitoneal vs intraperitoneal bladder rupture.
 *
 * Two coronal bladder panels. The tear location relative to the peritoneal
 * reflection drives the urine-leak pattern and management: an extraperitoneal
 * base tear confines urine to the perivesical space (catheter drainage), while
 * an intraperitoneal dome tear spills urine into the peritoneal cavity
 * (urinary ascites; operative repair).
 *
 * Output: static/img/diagrams/bladder-rupture.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', bladder: '#DCE7F2', bladderEdge: '#5B7FA6',
  perit: '#94A3B8', bowel: '#EDE3D3', bowelEdge: '#B8A888', urine: 'rgba(250,204,21,0.55)', tear: '#B91C1C', lead: '#475569' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 432;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.2" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}
function lead(x1, y1, x2, y2) { push(`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${C.lead}" stroke-width="1"/>`); push(`<circle cx="${f(x2)}" cy="${f(y2)}" r="1.8" fill="${C.lead}"/>`); }
const zig = (x, y) => `M ${x - 9} ${y - 7} l 5 6 l -5 5 l 7 6`;

function panel(cx, cy, mode) {
  // bowel loops (peritoneal cavity, above)
  for (const [dx, dy] of [[-24, -94], [20, -100], [-2, -78]]) push(`<ellipse cx="${cx + dx}" cy="${cy + dy}" rx="15" ry="11" fill="${C.bowel}" stroke="${C.bowelEdge}" stroke-width="1.4"/>`);
  // urine extravasation
  const urine = mode === 'ipb'
    ? [[-26, -86, 14, 10], [24, -92, 13, 9], [0, -106, 12, 8], [-4, -70, 16, 9]]
    : [[-52, 30, 14, 10], [50, 26, 13, 9], [-8, 52, 18, 9], [32, 46, 12, 8]];
  for (const [dx, dy, rx, ry] of urine) push(`<ellipse cx="${cx + dx}" cy="${cy + dy}" rx="${rx}" ry="${ry}" fill="${C.urine}"/>`);
  // peritoneum drape over the dome
  push(`<path d="M ${cx - 64} ${cy - 26} C ${cx - 48} ${cy - 70}, ${cx + 48} ${cy - 70}, ${cx + 64} ${cy - 26}" fill="none" stroke="${C.perit}" stroke-width="2" stroke-dasharray="5 3"/>`);
  // bladder
  push(`<path d="M ${cx - 58} ${cy + 8} C ${cx - 64} ${cy - 38}, ${cx - 30} ${cy - 62}, ${cx} ${cy - 62} C ${cx + 30} ${cy - 62}, ${cx + 64} ${cy - 38}, ${cx + 58} ${cy + 8} C ${cx + 54} ${cy + 42}, ${cx + 24} ${cy + 56}, ${cx} ${cy + 56} C ${cx - 24} ${cy + 56}, ${cx - 54} ${cy + 42}, ${cx - 58} ${cy + 8} Z" fill="${C.bladder}" stroke="${C.bladderEdge}" stroke-width="2"/>`);
  // tear
  if (mode === 'ipb') push(`<path d="${zig(cx - 2, cy - 60)}" fill="none" stroke="${C.tear}" stroke-width="2.6" stroke-linejoin="round"/>`);
  else push(`<path d="${zig(cx - 50, cy + 26)}" fill="none" stroke="${C.tear}" stroke-width="2.6" stroke-linejoin="round"/>`);
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 38, 16, 700, C.ink, 'start', 'Bladder rupture &#8212; extraperitoneal vs intraperitoneal', false));
push(txt(40, 57, 12.5, 500, C.muted, 'start', 'the tear&#8217;s position relative to the peritoneal reflection drives the urine-leak pattern and the management', false));

const ax = 224, bx = 596, cy = 218;
panel(ax, cy, 'epb');
panel(bx, cy, 'ipb');

// shared labels (left panel)
lead(ax + 46, cy - 56, ax + 96, cy - 78); push(txt(ax + 100, cy - 80, 10.5, 600, C.ink, 'start', 'peritoneum'));
lead(ax + 20, cy - 100, ax + 92, cy - 112); push(txt(ax + 96, cy - 110, 10.5, 600, C.ink, 'start', 'bowel'));
lead(ax - 50, cy + 26, ax - 96, cy + 8); push(txt(ax - 100, cy + 10, 10.5, 700, C.tear, 'end', 'tear at base'));
push(txt(ax - 100, cy + 24, 10, 500, C.muted, 'end', '(extraperitoneal)'));
// right panel labels
lead(bx - 2, cy - 60, bx - 70, cy - 78); push(txt(bx - 74, cy - 80, 10.5, 700, C.tear, 'end', 'tear at dome'));
push(txt(bx - 74, cy - 66, 10, 500, C.muted, 'end', '(intraperitoneal)'));
push(txt(bx + 78, cy - 96, 10.5, 600, C.ink, 'start', 'urinary'));
push(txt(bx + 78, cy - 82, 10.5, 600, C.ink, 'start', 'ascites'));
lead(bx + 30, cy - 92, bx + 74, cy - 90);

// panel titles + management chips
function foot(cx, title, pct, chipColor, chipBg, chipTxt) {
  push(txt(cx, cy + 96, 13, 700, C.ink, 'middle', `${title}  ${pct}`, false));
  push(`<rect x="${cx - 86}" y="${cy + 108}" width="172" height="24" rx="12" fill="${chipBg}" stroke="${chipColor}" stroke-width="1.2"/>`);
  push(txt(cx, cy + 124, 11, 700, chipColor, 'middle', chipTxt, false));
}
foot(ax, 'Extraperitoneal', '~63%', '#166534', '#DCFCE7', 'usually catheter drainage');
foot(bx, 'Intraperitoneal', '~32%', '#991B1B', '#FEE2E2', 'always operative repair');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Two coronal bladder panels. Extraperitoneal rupture: a tear at the bladder base leaks urine into the perivesical space below the peritoneal reflection, usually managed by catheter drainage. Intraperitoneal rupture: a dome tear spills urine into the peritoneal cavity among bowel loops as urinary ascites, requiring operative repair.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'bladder-rupture.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
