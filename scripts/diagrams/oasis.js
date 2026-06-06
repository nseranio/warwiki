#!/usr/bin/env node
/**
 * WARWIKI original schematic — perineal laceration grades (Sultan / OASIS).
 *
 * A depth ladder: the perineal tissue planes stacked by depth (surface at top
 * to anorectal epithelium at the bottom) on the left, and one severity bar per
 * grade (1, 2, 3a, 3b, 3c, 4) on the right showing how deep each tear reaches.
 *
 * Output: static/img/diagrams/oasis-grades.svg
 */
const fs = require('fs');
const path = require('path');

const C = {
  ink: '#1E293B', axis: '#334155', muted: '#64748B', border: '#E2E8F0',
  grid: '#E2E8F0', hymen: '#C0392B',
};
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 446;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.2" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

const LX = 150, LR = 452;                 // layer band x-range
const TOP = 116;                          // surface y
const layers = [
  { n: 'Perineal skin / vaginal mucosa', y0: 116, y1: 160, fill: '#F1F5F9' },
  { n: 'Perineal muscles', sub: 'bulbospongiosus · transverse perinei', y0: 160, y1: 206, fill: '#E6EDF4' },
  { n: 'External anal sphincter (EAS)', sub: '3a &lt; 50% · 3b &gt; 50% thickness', y0: 206, y1: 256, fill: '#DBE6F0', eas: true },
  { n: 'Internal anal sphincter (IAS)', y0: 256, y1: 300, fill: '#D0DEEC' },
  { n: 'Anorectal epithelium', y0: 300, y1: 344, fill: '#C6D8EA' },
];

// ---- card + titles -------------------------------------------------------
push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 40, 16, 700, C.ink, 'start', 'Perineal laceration grades &#8212; depth of injury', false));
push(txt(40, 59, 12.5, 500, C.muted, 'start', 'Sultan classification (ACOG / RCOG); the third-degree tier (OASIS) is subclassified by anal-sphincter involvement', false));

// ---- depth arrow (far left) ---------------------------------------------
push(`<line x1="58" y1="${TOP + 6}" x2="58" y2="344" stroke="${C.muted}" stroke-width="1.4" marker-end="url(#dn)"/>`);
push(`<text transform="translate(48,230) rotate(-90)" text-anchor="middle" font-family="${FONT}" font-size="10.5" font-weight="600" fill="${C.muted}">increasing depth</text>`);

// ---- layer bands ---------------------------------------------------------
for (const L of layers) {
  push(`<rect x="${LX}" y="${L.y0}" width="${LR - LX}" height="${L.y1 - L.y0}" fill="${L.fill}" stroke="#FFFFFF" stroke-width="1.5"/>`);
  const ymid = (L.y0 + L.y1) / 2;
  if (L.sub) {
    push(txt(LX + 14, ymid - 2, 11.5, 600, C.axis, 'start', L.n));
    push(txt(LX + 14, ymid + 13, 10, 500, C.muted, 'start', L.sub));
  } else {
    push(txt(LX + 14, ymid + 4, 11.5, 600, C.axis, 'start', L.n));
  }
  if (L.eas) push(`<line x1="${LX}" y1="${(L.y0 + L.y1) / 2}" x2="${LR}" y2="${(L.y0 + L.y1) / 2}" stroke="${C.muted}" stroke-width="1" stroke-dasharray="3 3"/>`);
}
// faint alignment gridlines from bands across to the bars
for (const yb of [160, 206, 256, 300, 344]) {
  push(`<line x1="${LR}" y1="${yb}" x2="710" y2="${yb}" stroke="${C.grid}" stroke-width="1" stroke-dasharray="2 4"/>`);
}

// ---- severity bars (right) ----------------------------------------------
push(txt(610, 102, 11, 600, C.muted, 'middle', 'how deep each grade reaches', false));
const bars = [
  { deg: '1°', y: 160, c: '#16A34A' },
  { deg: '2°', y: 206, c: '#4D7C0F' },
  { deg: '3a', y: 231, c: '#D97706' },
  { deg: '3b', y: 256, c: '#EA580C' },
  { deg: '3c', y: 300, c: '#DC2626' },
  { deg: '4°', y: 344, c: '#991B1B' },
];
const bx0 = 506, pitch = 36, bw = 26;
push(`<line x1="${bx0 - 8}" y1="${TOP}" x2="${bx0 + 5 * pitch + bw + 8}" y2="${TOP}" stroke="${C.muted}" stroke-width="1" stroke-dasharray="2 3"/>`);
bars.forEach((b, i) => {
  const x = bx0 + i * pitch;
  push(`<rect x="${x}" y="${TOP}" width="${bw}" height="${f(b.y - TOP)}" rx="4" fill="${b.c}" opacity="0.88"/>`);
  push(txt(x + bw / 2, 134, 12, 700, '#FFFFFF', 'middle', b.deg, false));
});

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Depth ladder of perineal laceration grades: tissue planes stacked by depth (perineal skin/mucosa, perineal muscles, external anal sphincter, internal anal sphincter, anorectal epithelium) with a severity bar for each grade (1, 2, 3a, 3b, 3c, 4) showing how deep the tear extends.">
<defs>
<marker id="dn" viewBox="0 0 10 10" refX="5" refY="9" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L5,9 L10,0" fill="none" stroke="${C.muted}" stroke-width="1.6"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'oasis-grades.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
