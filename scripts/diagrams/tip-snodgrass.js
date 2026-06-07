#!/usr/bin/env node
/**
 * WARWIKI original schematic — Tubularized Incised Plate (TIP / Snodgrass).
 *
 * The single deep dorsal-midline relaxing incision of the urethral plate is the
 * trick: it converts a plate too narrow to roll into one wide enough to
 * tubularize tension-free over a catheter; the incised midline re-epithelializes.
 *
 * Output: static/img/diagrams/tip-snodgrass.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', skin: '#F4EEEA', skinEdge: '#D8C3B6',
  plate: '#E2ECF5', plateEdge: '#7FA3C4', cut: '#334155', incise: '#B91C1C', suture: '#185FA5',
  cath: '#0F766E', corpora: '#E7D9CB', corporaEdge: '#B99873', raw: '#C6485B', arrow: '#0F766E' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 880, H = 446;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.1" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}
// ventral penis outline (glans cap + shaft)
function penis(cx) {
  push(`<path d="M ${cx - 26} 320 L ${cx - 26} 168 A 26 26 0 0 1 ${cx - 18} 134 A 34 40 0 0 1 ${cx + 18} 134 A 26 26 0 0 1 ${cx + 26} 168 L ${cx + 26} 320 A 26 18 0 0 1 ${cx - 26} 320 Z" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="1.6" stroke-linejoin="round"/>`);
  // glans groove hint
  push(`<path d="M ${cx - 22} 150 A 22 16 0 0 0 ${cx + 22} 150" fill="none" stroke="${C.skinEdge}" stroke-width="1"/>`);
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Tubularized Incised Plate (TIP / Snodgrass)', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'a single deep dorsal-midline incision widens a narrow urethral plate so it can be tubularized tension-free', false));

// ============ COL 1: incise plate (ventral view) ============
const c1 = 150;
penis(c1);
// ectopic meatus (proximal)
push(`<ellipse cx="${c1}" cy="276" rx="8" ry="5" fill="#FFFFFF" stroke="${C.cut}" stroke-width="1.6"/>`);
push(txt(c1 + 14, 280, 9, 600, C.muted, 'start', 'ectopic'));
push(txt(c1 + 14, 291, 9, 600, C.muted, 'start', 'meatus'));
// urethral plate strip meatus -> glans tip
push(`<rect x="${c1 - 9}" y="124" width="18" height="150" rx="6" fill="${C.plate}" stroke="none"/>`);
// parallel incisions flanking the plate
push(`<line x1="${c1 - 11}" y1="124" x2="${c1 - 11}" y2="272" stroke="${C.cut}" stroke-width="2.2"/>`);
push(`<line x1="${c1 + 11}" y1="124" x2="${c1 + 11}" y2="272" stroke="${C.cut}" stroke-width="2.2"/>`);
push(txt(c1 - 40, 200, 9, 600, C.cut, 'middle', 'parallel'));
push(txt(c1 - 40, 211, 9, 600, C.cut, 'middle', 'incisions'));
// dorsal midline relaxing incision (red)
push(`<line x1="${c1}" y1="132" x2="${c1}" y2="266" stroke="${C.incise}" stroke-width="2.4" stroke-dasharray="6 3"/>`);
push(txt(c1 + 40, 196, 9.5, 700, C.incise, 'middle', 'midline'));
push(txt(c1 + 40, 207, 9.5, 700, C.incise, 'middle', 'incision'));
push(txt(c1, 200, 9, 700, C.plateEdge, 'middle', 'plate'));
push(txt(c1, 352, 12.5, 700, C.ink, 'middle', '1. Incise the plate', false));

// ============ COL 2: tubularize (ventral view) ============
const c2 = 360;
penis(c2);
// tubularized neourethra: midline suture line meatus->glans with ticks
push(`<line x1="${c2}" y1="126" x2="${c2}" y2="300" stroke="${C.suture}" stroke-width="2.6" stroke-linecap="round"/>`);
for (let y = 140; y <= 290; y += 22) push(`<line x1="${c2 - 6}" y1="${y}" x2="${c2 + 6}" y2="${y}" stroke="${C.suture}" stroke-width="1.3"/>`);
// new slit meatus at glans tip
push(`<line x1="${c2}" y1="120" x2="${c2}" y2="132" stroke="${C.cut}" stroke-width="2.6" stroke-linecap="round"/>`);
push(txt(c2 + 30, 124, 9, 600, C.muted, 'start', 'new meatus'));
push(txt(c2 + 30, 135, 9, 600, C.muted, 'start', '(glans tip)'));
push(txt(c2 + 40, 210, 9.5, 700, C.suture, 'middle', 'neourethra'));
push(txt(c2 - 40, 250, 9, 600, C.muted, 'middle', '2-layer'));
push(txt(c2 - 40, 261, 9, 600, C.muted, 'middle', 'closure +'));
push(txt(c2 - 40, 272, 9, 600, C.muted, 'middle', 'dartos'));
push(txt(c2, 352, 12.5, 700, C.ink, 'middle', '2. Tubularize over catheter', false));

// ============ COL 3: cross-section ladder (why incise) ============
const c3 = 660, cw = 70;
push(txt(c3 + 30, 96, 12, 700, C.ink, 'middle', 'Why incise?  (cross-section)', false));
// helper: corpora base
function corpora(yb, x0, x1) {
  push(`<path d="M ${x0} ${yb} Q ${(x0 + x1) / 2} ${yb + 20} ${x1} ${yb}" fill="${C.corpora}" stroke="${C.corporaEdge}" stroke-width="1.4"/>`);
}
// (a) narrow flat plate
let ya = 138;
corpora(ya, c3 - cw, c3 + cw);
push(`<path d="M ${c3 - 18} ${ya - 1} Q ${c3} ${ya - 12} ${c3 + 18} ${ya - 1}" fill="none" stroke="${C.plateEdge}" stroke-width="4" stroke-linecap="round"/>`);
push(txt(c3 + cw + 16, ya - 4, 9.5, 600, C.muted, 'start', 'narrow plate'));
push(txt(c3 + cw + 16, ya + 8, 8.5, 500, C.muted, 'start', '(too tight to roll)'));
// (b) incised -> widens
let yb = 206;
corpora(yb, c3 - cw, c3 + cw);
push(`<path d="M ${c3 - 30} ${yb - 1} Q ${c3 - 14} ${yb - 12} ${c3 - 4} ${yb - 2}" fill="none" stroke="${C.plateEdge}" stroke-width="4" stroke-linecap="round"/>`);
push(`<path d="M ${c3 + 4} ${yb - 2} Q ${c3 + 14} ${yb - 12} ${c3 + 30} ${yb - 1}" fill="none" stroke="${C.plateEdge}" stroke-width="4" stroke-linecap="round"/>`);
push(`<line x1="${c3}" y1="${yb - 8}" x2="${c3}" y2="${yb + 4}" stroke="${C.incise}" stroke-width="2.2"/>`);
push(txt(c3 + cw + 16, yb - 4, 9.5, 600, C.incise, 'start', 'incised &#8594; widens'));
push(txt(c3 + cw + 16, yb + 8, 8.5, 500, C.muted, 'start', 'midline split opens it'));
// (c) tubularized over catheter
let yc = 286;
corpora(yc, c3 - cw, c3 + cw);
push(`<circle cx="${c3}" cy="${yc - 22}" r="22" fill="${C.plate}" stroke="${C.plateEdge}" stroke-width="3"/>`);
// dorsal raw strip (toward corpora) that re-epithelializes
push(`<path d="M ${c3 - 8} ${yc - 2} A 22 22 0 0 1 ${c3 + 8} ${yc - 2}" fill="none" stroke="${C.raw}" stroke-width="3" stroke-linecap="round"/>`);
push(`<circle cx="${c3}" cy="${yc - 22}" r="6" fill="none" stroke="${C.cath}" stroke-width="2" stroke-dasharray="2 3"/>`);
push(txt(c3 + cw + 16, yc - 30, 9.5, 600, C.suture, 'start', 'tubularized'));
push(txt(c3 + cw + 16, yc - 18, 8.5, 500, C.muted, 'start', 'over catheter'));
push(txt(c3 + cw + 16, yc - 4, 8.5, 600, C.raw, 'start', 'raw strip'));
push(txt(c3 + cw + 16, yc + 8, 8.5, 500, C.muted, 'start', 're-epithelializes'));
// down arrows linking stages
push(`<line x1="${c3 - 44}" y1="${ya + 14}" x2="${c3 - 44}" y2="${yb - 26}" stroke="${C.arrow}" stroke-width="1.6" marker-end="url(#at)"/>`);
push(`<line x1="${c3 - 44}" y1="${yb + 14}" x2="${c3 - 44}" y2="${yc - 50}" stroke="${C.arrow}" stroke-width="1.6" marker-end="url(#at)"/>`);

// ============ key ============
push(`<line x1="40" y1="392" x2="840" y2="392" stroke="${C.border}" stroke-width="1"/>`);
push(txt(40, 412, 11, 600, C.ink, 'start', 'Default single-stage distal repair. Correct chordee first. Lowest urethrocutaneous-fistula rate vs Mathieu; main risk is meatal stenosis.', false));
push(txt(40, 429, 10.5, 500, C.muted, 'start', 'Adult series (n = 620): ~12.7% overall complications; distal repairs ~7%. For thin/narrow plates an onlay (Mathieu) or dorsal inlay graft is preferred.', false));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Tubularized incised plate (TIP / Snodgrass) hypospadias repair. Step 1, ventral view: the urethral plate from the ectopic meatus to the glans tip is outlined by two parallel incisions and a single deep dorsal-midline relaxing incision. Step 2: the plate is tubularized over a catheter with a two-layer midline closure and dartos cover, creating a neourethra with a new slit meatus at the glans tip. A cross-section ladder shows why the plate is incised: a narrow flat plate is too tight to roll; the midline incision splays it wider; it then tubularizes over a catheter, the raw dorsal strip re-epithelializing. Key: default single-stage distal repair, correct chordee first, lowest fistula rate versus Mathieu, main risk meatal stenosis.">
<defs>
<marker id="at" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.arrow}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'tip-snodgrass.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
