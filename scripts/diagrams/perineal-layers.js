#!/usr/bin/env node
/**
 * WARWIKI original schematic — layered architecture of the urogenital perineum.
 *
 * Coronal slice through the urogenital triangle: skin -> Colles' fascia ->
 * superficial perineal pouch (erectile bodies + their muscles) -> perineal
 * membrane -> deep perineal pouch (sphincter) -> levator ani. Each layer is
 * tagged with the reconstructive plane it defines.
 *
 * Output: static/img/diagrams/perineal-layers.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0',
  bone: '#ECE4D4', boneEdge: '#B6A98C', skin: '#F4E6DA', skinEdge: '#D8C3B6',
  fascia: '#E3D2BE', fasciaEdge: '#C2A883', pouch: '#FBF5EF', pouchEdge: '#E5D8CB',
  erect: '#F3DBDC', erectEdge: '#CF9DA3', musc: '#E7B6AC', muscEdge: '#C0705E',
  memb: '#E0D4B4', membEdge: '#B0995F', lumen: '#FFFFFF', lumenEdge: '#475569',
  blue: '#185FA5', lev: '#E7B6AC', levEdge: '#C0705E' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 880, H = 470;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Layered architecture of the urogenital perineum &#8212; skin to pelvic floor', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'coronal slice: two fascial pouches separated by the perineal membrane &#8212; each layer is a surgical plane', false));

// coronal frame: ischiopubic rami (side bars) + horizontal layer bands
const xL = 170, xR = 440, cx = (xL + xR) / 2;
// rami
push(`<path d="M ${xL - 18} 372 L ${xL - 2} 372 L ${xL + 6} 96 L ${xL - 10} 96 Z" fill="${C.bone}" stroke="${C.boneEdge}" stroke-width="1.4"/>`);
push(`<path d="M ${xR + 18} 372 L ${xR + 2} 372 L ${xR - 6} 96 L ${xR + 10} 96 Z" fill="${C.bone}" stroke="${C.boneEdge}" stroke-width="1.4"/>`);
push(txt(xL - 30, 240, 9, 700, C.boneEdge, 'middle', 'ischio-'));
push(txt(xL - 30, 251, 9, 700, C.boneEdge, 'middle', 'pubic'));
push(txt(xL - 30, 262, 9, 700, C.boneEdge, 'middle', 'ramus'));

// band helper
function band(y0, y1, fill, edge) {
  push(`<rect x="${xL}" y="${y0}" width="${xR - xL}" height="${y1 - y0}" fill="${fill}" stroke="${edge}" stroke-width="1.2"/>`);
}
// layers (top -> bottom)
const LEV0 = 100, LEV1 = 150, DP0 = 158, DP1 = 214, PM0 = 216, PM1 = 232, SP0 = 234, SP1 = 326, CF0 = 328, CF1 = 338, SK0 = 340, SK1 = 364;
// levator ani (muscle, with midline hiatus)
push(`<path d="M ${xL} ${LEV1} L ${xL} ${LEV0} L ${cx - 16} ${LEV0} Q ${cx} ${LEV0 + 26} ${cx - 14} ${LEV1} Z" fill="${C.lev}" stroke="${C.levEdge}" stroke-width="1.3"/>`);
push(`<path d="M ${xR} ${LEV1} L ${xR} ${LEV0} L ${cx + 16} ${LEV0} Q ${cx} ${LEV0 + 26} ${cx + 14} ${LEV1} Z" fill="${C.lev}" stroke="${C.levEdge}" stroke-width="1.3"/>`);
// deep pouch
band(DP0, DP1, C.pouch, C.pouchEdge);
// perineal membrane (fibrous, hatched)
band(PM0, PM1, C.memb, C.membEdge);
for (let x = xL + 8; x < xR; x += 14) push(`<line x1="${x}" y1="${PM0 + 2}" x2="${x + 8}" y2="${PM1 - 2}" stroke="${C.membEdge}" stroke-width="0.8"/>`);
// superficial pouch
band(SP0, SP1, C.pouch, C.pouchEdge);
// Colles fascia
band(CF0, CF1, C.fascia, C.fasciaEdge);
// skin
band(SK0, SK1, C.skin, C.skinEdge);

// --- deep pouch contents: membranous urethra + rhabdosphincter ---
const dpc = (DP0 + DP1) / 2;
push(`<circle cx="${cx}" cy="${dpc}" r="17" fill="${C.musc}" stroke="${C.muscEdge}" stroke-width="2"/>`);
push(`<circle cx="${cx}" cy="${dpc}" r="7" fill="${C.lumen}" stroke="${C.lumenEdge}" stroke-width="1.4"/>`);

// --- superficial pouch contents: bulb (mid) + crura (lateral) + muscles ---
const spc = SP0 + 50;
// crura on the rami (ischiocavernosus over each)
for (const sx of [xL + 44, xR - 44]) {
  push(`<ellipse cx="${sx}" cy="${spc}" rx="24" ry="20" fill="${C.erect}" stroke="${C.erectEdge}" stroke-width="1.6"/>`);
  push(`<path d="M ${sx - 24} ${spc} A 24 20 0 0 1 ${sx + 24} ${spc}" fill="none" stroke="${C.muscEdge}" stroke-width="3.5"/>`);
}
// bulb (corpus spongiosum) midline + bulbospongiosus
push(`<ellipse cx="${cx}" cy="${spc + 8}" rx="34" ry="26" fill="${C.erect}" stroke="${C.erectEdge}" stroke-width="1.8"/>`);
push(`<path d="M ${cx - 34} ${spc + 8} A 34 26 0 0 0 ${cx + 34} ${spc + 8}" fill="none" stroke="${C.muscEdge}" stroke-width="3.5"/>`);
push(`<circle cx="${cx}" cy="${spc + 8}" r="7" fill="${C.lumen}" stroke="${C.lumenEdge}" stroke-width="1.4"/>`);
push(txt(cx, spc - 22, 8, 700, C.erectEdge, 'middle', 'bulb'));
push(txt(xL + 44, spc - 24, 8, 700, C.erectEdge, 'middle', 'crus'));
push(txt(xR - 44, spc - 24, 8, 700, C.erectEdge, 'middle', 'crus'));
// urethra continuity label
push(txt(cx + 12, spc + 12, 7.5, 600, C.lumenEdge, 'start', 'urethra'));

// ============ right-side legend (layer -> surgical plane) ============
const lx = 478;
function leg(yc, name, sub, planeColor, labelY) {
  const ly = labelY || yc;
  // leader from band right edge to legend (angled if labelY offset)
  push(`<line x1="${xR}" y1="${yc}" x2="${lx - 8}" y2="${ly}" stroke="${C.border}" stroke-width="1"/>`);
  push(`<circle cx="${lx - 8}" cy="${ly}" r="2.2" fill="${C.muted}"/>`);
  push(txt(lx, ly - 2, 11.5, 700, C.ink, 'start', name));
  push(txt(lx, ly + 12, 9.5, 500, planeColor || C.muted, 'start', sub));
}
leg((LEV0 + LEV1) / 2, 'Levator ani (pelvic floor)', 'roof; interface with intrapelvic surgery');
leg(dpc, 'Deep perineal pouch', 'rhabdosphincter / striated UG sphincter — PFUI plane', C.blue);
leg((PM0 + PM1) / 2 + 2, 'Perineal membrane', 'roof of superficial / floor of deep; AUS landmark', C.blue);
leg(spc + 8, 'Superficial perineal pouch', 'bulb + crura + muscles — bulbar urethroplasty, AUS', C.blue);
leg((CF0 + CF1) / 2, "Colles' fascia", "Fournier's spread plane; → dartos / Scarpa", C.blue, 326);
leg((SK0 + SK1) / 2, 'Skin', 'perineal incision', C.muted, 360);

// ============ key ============
push(`<line x1="40" y1="392" x2="840" y2="392" stroke="${C.border}" stroke-width="1"/>`);
push(txt(40, 412, 11, 600, C.ink, 'start', 'The perineal membrane is the hinge of perineal surgery: roof of the superficial pouch, floor of the deep pouch, and the transcorporal-AUS landmark.', false));
push(txt(40, 430, 10.5, 500, C.muted, 'start', "Colles' fascia continues into scrotal/labial dartos and abdominal Scarpa's fascia — the Fournier's-gangrene route. Posterior structures lie out of this coronal plane.", false));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Coronal section of the urogenital perineum showing its layered architecture between the two ischiopubic rami. From top to bottom: levator ani (pelvic floor) with a midline hiatus; the deep perineal pouch containing the membranous urethra ringed by the rhabdosphincter (the pelvic-fracture urethroplasty plane); the fibrous perineal membrane (roof of the superficial pouch, floor of the deep pouch, and AUS transcorporal landmark); the superficial perineal pouch containing the midline bulb and two lateral crura with their bulbospongiosus and ischiocavernosus muscles (the plane of bulbar urethroplasty and AUS); Colles' fascia (the Fournier's-gangrene spread plane, continuous with dartos and Scarpa's fascia); and skin. A legend tags each layer with its surgical plane.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'perineal-layers.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
