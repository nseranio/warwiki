#!/usr/bin/env node
/**
 * WARWIKI original schematic — RUG urethral silhouette.
 *
 * The male anterior-urethra contrast column as seen on a retrograde
 * urethrogram (RPO view): the segments (fossa navicularis, penile, bulbar,
 * membranous, prostatic) with a bulbar stricture, and the teaching point that
 * RUG underestimates true length because spongiofibrosis is not opacified.
 *
 * Output: static/img/diagrams/rug-urethra.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', contrast: '#8C99A8', contrastEdge: '#475569',
  bladder: '#DCE7F2', bladderEdge: '#5B7FA6', stricture: '#B91C1C', fibrosis: '#C0392B', lead: '#475569' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 384;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.4" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}
function lead(x1, y1, x2, y2, col) { push(`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${col || C.lead}" stroke-width="1"/>`); push(`<circle cx="${f(x1)}" cy="${f(y1)}" r="1.8" fill="${col || C.lead}"/>`); }

const cy = 196;
// (x, half-width) along the urethra, bladder (left) -> meatus (right)
const prof = [[182, 15], [216, 18], [246, 13], [266, 8], [292, 9], [326, 21], [380, 18], [402, 13], [411, 4], [420, 4], [429, 13], [452, 17], [505, 13], [598, 12], [658, 15], [690, 8], [700, 4]];

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 38, 16, 700, C.ink, 'start', 'Retrograde urethrogram &#8212; reading the urethral silhouette', false));
push(txt(40, 57, 12.5, 500, C.muted, 'start', 'the contrast column (RPO 45&#176; view); a stricture is a focal narrowing &#8212; and RUG underestimates its true length', false));

// bladder
push(`<ellipse cx="120" cy="${cy}" rx="42" ry="46" fill="${C.bladder}" stroke="${C.bladderEdge}" stroke-width="2"/>`);
push(txt(112, cy + 66, 11, 600, C.bladderEdge, 'middle', 'bladder', false));

// spongiofibrosis (true extent, dashed — not opacified)
push(`<rect x="388" y="${cy - 26}" width="64" height="52" rx="10" fill="none" stroke="${C.fibrosis}" stroke-width="1.4" stroke-dasharray="4 3"/>`);

// contrast column
const top = prof.map(([x, hw]) => `${x},${cy - hw}`).join(' ');
const bot = prof.slice().reverse().map(([x, hw]) => `${x},${cy + hw}`).join(' ');
push(`<polygon points="${top} ${bot}" fill="${C.contrast}" stroke="${C.contrastEdge}" stroke-width="1.5" stroke-linejoin="round"/>`);

// ---- labels --------------------------------------------------------------
lead(216, cy - 18, 216, 112); push(txt(216, 108, 10.8, 600, C.ink, 'middle', 'prostatic'));
lead(326, cy - 21, 332, 112); push(txt(332, 108, 10.8, 600, C.ink, 'middle', 'bulbar'));
lead(560, cy - 12, 560, 112); push(txt(560, 108, 10.8, 600, C.ink, 'middle', 'penile (pendulous)'));

lead(266, cy + 8, 250, 300); push(txt(250, 304, 10.8, 600, C.ink, 'middle', 'membranous'));
push(txt(250, 318, 9.5, 500, C.muted, 'middle', '(normal narrowing)', false));
lead(674, cy + 14, 690, 300); push(txt(700, 304, 10.8, 600, C.ink, 'start', 'fossa navicularis'));
push(txt(715, cy, 10.8, 600, C.ink, 'start', 'meatus'));

// stricture callout
lead(415, cy + 4, 415, 286, C.stricture); push(txt(415, 300, 11.5, 700, C.stricture, 'middle', 'stricture'));
push(`<path d="M 450 ${cy - 24} C 505 ${cy - 62}, 550 ${cy - 58}, 568 ${cy - 50}" fill="none" stroke="${C.fibrosis}" stroke-width="1.1" marker-end="url(#fa)"/>`);
push(txt(574, cy - 56, 10.5, 700, C.fibrosis, 'start', 'spongiofibrosis'));
push(txt(574, cy - 42, 9.8, 500, C.muted, 'start', 'not opacified &#8212; true length is'));
push(txt(574, cy - 29, 9.8, 500, C.muted, 'start', '~1 cm longer at each shoulder'));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Retrograde urethrogram urethral silhouette: the contrast column from the bladder through the prostatic, membranous (a normal narrowing), bulbar, and penile urethra to the fossa navicularis and meatus, with a focal bulbar stricture and a dashed outline marking the spongiofibrosis that is not opacified, so RUG underestimates the true stricture length.">
<defs>
<marker id="fa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.fibrosis}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'rug-urethra.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
