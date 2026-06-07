#!/usr/bin/env node
/**
 * WARWIKI original schematic — Blandy U-flap female vaginal-flap urethroplasty.
 *
 * A U-shaped anterior-vaginal-wall flap (proximal pedicle) is raised, the
 * strictured urethra is opened ventrally at 6 o'clock, and the flap is inlaid
 * as a ventral onlay augmenting the urethral circumference. Cross-section inset
 * shows the native dorsal plate + ventral vaginal-flap onlay around the catheter.
 *
 * Output: static/img/diagrams/blandy-u-flap.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', wall: '#F4EEF0', wallEdge: '#D9C6CC',
  flap: '#DCE7F1', flapEdge: '#7FA3C4', cut: '#334155', suture: '#185FA5', lumen: '#E2ECF5',
  stric: '#B91C1C', cath: '#0F766E', arrow: '#0F766E', native: '#94A3B8' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 840, H = 360;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.2" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Blandy U-flap &#8212; female ventral-onlay vaginal-flap urethroplasty', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'anterior-vaginal-wall flap (proximal pedicle) inlaid into a ventral (6 o&#8217;clock) urethrotomy to widen the lumen', false));

// ============ PANEL A: U-flap design ============
const aL = 70, aR = 250, ax = (aL + aR) / 2, aTop = 92, aBot = 320;
push(`<rect x="${aL}" y="${aTop}" width="${aR - aL}" height="${aBot - aTop}" rx="16" fill="${C.wall}" stroke="${C.wallEdge}" stroke-width="1.3"/>`);
push(txt(ax, aTop + 18, 10, 600, C.muted, 'middle', 'anterior vaginal wall'));
// U-flap outline: two limbs from proximal (top) down around the meatus (bottom), pedicle open at top
const fx = 34; // half-width of flap
const ufTop = aTop + 58, mY = aBot - 50;
// urethral axis (faint centerline)
push(`<line x1="${ax}" y1="${ufTop + 2}" x2="${ax}" y2="${mY + 10}" stroke="${C.native}" stroke-width="1" stroke-dasharray="3 4"/>`);
push(`<path d="M ${ax - fx} ${ufTop} L ${ax - fx} ${mY} Q ${ax - fx} ${mY + 22} ${ax} ${mY + 22} Q ${ax + fx} ${mY + 22} ${ax + fx} ${mY} L ${ax + fx} ${ufTop}" fill="${C.flap}" fill-opacity="0.7" stroke="${C.cut}" stroke-width="2.6" stroke-linejoin="round"/>`);
push(txt(ax, ufTop + 24, 12, 700, C.flapEdge, 'middle', 'U-flap'));
// stricture marker on the axis (mid)
push(`<ellipse cx="${ax}" cy="${(ufTop + mY) / 2 + 18}" rx="20" ry="24" fill="none" stroke="${C.stric}" stroke-width="1.4" stroke-dasharray="3 3"/>`);
push(txt(ax + 26, (ufTop + mY) / 2 + 22, 10, 700, C.stric, 'start', 'stricture'));
// ventral urethrotomy planned line (dashed, 6 o'clock)
push(`<line x1="${ax}" y1="${ufTop + 36}" x2="${ax}" y2="${mY - 6}" stroke="${C.suture}" stroke-width="2" stroke-dasharray="5 4"/>`);
// proximal pedicle bracket (top, open end of U)
push(`<path d="M ${ax - fx} ${ufTop - 7} L ${ax - fx} ${ufTop - 13} L ${ax + fx} ${ufTop - 13} L ${ax + fx} ${ufTop - 7}" fill="none" stroke="${C.flapEdge}" stroke-width="1.4"/>`);
push(txt(ax, ufTop - 19, 10, 700, C.flapEdge, 'middle', 'proximal pedicle'));
// meatus
push(`<ellipse cx="${ax}" cy="${mY + 22}" rx="9" ry="6" fill="#FFFFFF" stroke="${C.cut}" stroke-width="1.6"/>`);
push(txt(ax + 18, mY + 26, 10, 600, C.muted, 'start', 'meatus'));
push(txt(ax, aBot + 22, 12.5, 700, C.ink, 'middle', '1. U-flap raised, ventral urethrotomy', false));

// ============ arrow A -> B ============
push(`<line x1="270" y1="206" x2="320" y2="206" stroke="${C.arrow}" stroke-width="2.6" marker-end="url(#ab)"/>`);

// ============ PANEL B: flap inlaid ============
const bL = 340, bR = 520, bx = (bL + bR) / 2, bTop = 92, bBot = 320;
push(`<rect x="${bL}" y="${bTop}" width="${bR - bL}" height="${bBot - bTop}" rx="16" fill="${C.wall}" stroke="${C.wallEdge}" stroke-width="1.3"/>`);
// opened urethra (spade) with flap inlaid as ventral onlay
const oTop = bTop + 42, oBot = bBot - 54;
// urethral plate edges (native, opened) - a widened lens
push(`<path d="M ${bx - 30} ${oTop} C ${bx - 46} ${(oTop + oBot) / 2}, ${bx - 46} ${(oTop + oBot) / 2}, ${bx - 18} ${oBot}" fill="none" stroke="${C.native}" stroke-width="2.4"/>`);
push(`<path d="M ${bx + 30} ${oTop} C ${bx + 46} ${(oTop + oBot) / 2}, ${bx + 46} ${(oTop + oBot) / 2}, ${bx + 18} ${oBot}" fill="none" stroke="${C.native}" stroke-width="2.4"/>`);
// inlaid flap (ventral onlay) - filled tongue
push(`<path d="M ${bx - 22} ${oTop + 6} C ${bx - 34} ${(oTop + oBot) / 2}, ${bx - 34} ${(oTop + oBot) / 2}, ${bx - 12} ${oBot - 4} L ${bx + 12} ${oBot - 4} C ${bx + 34} ${(oTop + oBot) / 2}, ${bx + 34} ${(oTop + oBot) / 2}, ${bx + 22} ${oTop + 6} Z" fill="${C.flap}" stroke="${C.flapEdge}" stroke-width="1.6"/>`);
// Foley catheter inside (dashed)
push(`<line x1="${bx}" y1="${oTop + 2}" x2="${bx}" y2="${oBot + 2}" stroke="${C.cath}" stroke-width="3" stroke-dasharray="2 4" stroke-linecap="round"/>`);
// suture ticks along the two onlay seams
for (let t = 0.2; t <= 0.82; t += 0.2) {
  const ly = oTop + 6 + (oBot - 10 - oTop) * t;
  push(`<line x1="${f(bx - 28)}" y1="${f(ly)}" x2="${f(bx - 18)}" y2="${f(ly)}" stroke="${C.suture}" stroke-width="1.3"/>`);
  push(`<line x1="${f(bx + 18)}" y1="${f(ly)}" x2="${f(bx + 28)}" y2="${f(ly)}" stroke="${C.suture}" stroke-width="1.3"/>`);
}
push(txt(bx, oTop - 10, 10, 700, C.flapEdge, 'middle', 'inlaid flap'));
push(txt(bx + 40, (oTop + oBot) / 2 - 8, 9.5, 600, C.cath, 'start', 'Foley'));
push(txt(bx + 40, (oTop + oBot) / 2 + 6, 9.5, 600, C.cath, 'start', '16&#8211;18 Fr'));
// meatus
push(`<ellipse cx="${bx}" cy="${oBot + 16}" rx="9" ry="6" fill="#FFFFFF" stroke="${C.cut}" stroke-width="1.6"/>`);
push(txt(bx, bBot + 22, 12.5, 700, C.ink, 'middle', '2. Flap inlaid as ventral onlay', false));

// ============ cross-section inset ============
const ix = 690, iy = 196, ir = 50;
push(`<rect x="${ix - 90}" y="${iy - 86}" width="180" height="200" rx="12" fill="#F8FAFC" stroke="#EAEDF1" stroke-width="1.2"/>`);
push(txt(ix, iy - 66, 11.5, 700, C.ink, 'middle', 'Cross-section', false));
push(txt(ix, iy - 51, 9.5, 500, C.muted, 'middle', 'ventral-onlay augmentation', false));
// lumen circle
push(`<circle cx="${ix}" cy="${iy + 6}" r="${ir}" fill="${C.lumen}"/>`);
// dorsal half = native urethral plate (top arc, slate)
push(`<path d="M ${ix - ir} ${iy + 6} A ${ir} ${ir} 0 0 1 ${ix + ir} ${iy + 6}" fill="none" stroke="${C.native}" stroke-width="5" stroke-linecap="round"/>`);
// ventral half = vaginal flap onlay (bottom arc, blue)
push(`<path d="M ${ix - ir} ${iy + 6} A ${ir} ${ir} 0 0 0 ${ix + ir} ${iy + 6}" fill="none" stroke="${C.suture}" stroke-width="5" stroke-linecap="round"/>`);
// catheter dot
push(`<circle cx="${ix}" cy="${iy + 6}" r="9" fill="none" stroke="${C.cath}" stroke-width="2" stroke-dasharray="2 3"/>`);
push(txt(ix, iy - 18, 9.5, 700, C.native, 'middle', 'native dorsal plate'));
push(txt(ix, iy + 40, 9.5, 700, C.suture, 'middle', 'vaginal flap (ventral)'));


const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Blandy U-flap female vaginal-flap urethroplasty: panel 1 shows a U-shaped anterior-vaginal-wall flap with a proximal pedicle outlined over a strictured urethra with a planned ventral 6 o'clock urethrotomy; panel 2 shows the flap inlaid as a ventral onlay over a 16 to 18 French Foley catheter, sutured to the opened native urethral plate; a cross-section inset shows the native dorsal plate above and the vaginal-flap ventral onlay below around the catheter lumen. Key notes it is a pedicled flap that preserves its vascular plexus, is best for distal and mid-urethral strictures, is contraindicated in lichen sclerosus, and that lateral-based variants reduce the retrusive-meatus problem.">
<defs>
<marker id="ab" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.arrow}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'blandy-u-flap.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
