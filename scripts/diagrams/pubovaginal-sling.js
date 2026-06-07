#!/usr/bin/env node
/**
 * WARWIKI original schematic — autologous fascial pubovaginal sling (PVS).
 *
 * Sagittal: a strip of the patient's own fascia (rectus abdominis or fascia lata)
 * is placed as a hammock under the BLADDER NECK; its arms pass retropubically and
 * are tied over the rectus sheath. A cough compresses the urethra against the
 * pubis. Mesh-free; sits proximal to the synthetic midurethral sling (MUS).
 *
 * Output: static/img/diagrams/pubovaginal-sling.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', bone: '#ECE4D4', boneEdge: '#B6A98C',
  blad: '#E2ECF5', bladEdge: '#4F6F92', uret: '#64748B', fascia: '#E0D4B4', fasciaEdge: '#B0995F',
  sling: '#185FA5', mus: '#94A3B8', suture: '#B45309', cough: '#0F766E' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 420;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Autologous fascial pubovaginal sling (PVS)', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'sagittal: the patient&#8217;s own fascia slung under the bladder neck, arms tied over the rectus sheath &#8212; mesh-free', false));

// anterior rectus fascia (top) - harvest + tie point
push(`<rect x="86" y="96" width="280" height="18" rx="5" fill="${C.fascia}" stroke="${C.fasciaEdge}" stroke-width="1.4"/>`);
push(txt(96, 90, 9, 600, C.fasciaEdge, 'start', 'anterior rectus fascia (harvest + tie)'));
// harvest defect (sutured closed)
for (let x = 150; x <= 250; x += 14) push(`<line x1="${x}" y1="100" x2="${x + 6}" y2="110" stroke="${C.fasciaEdge}" stroke-width="0.9"/>`);

// pubic symphysis
push(`<ellipse cx="226" cy="258" rx="16" ry="32" fill="${C.bone}" stroke="${C.boneEdge}" stroke-width="1.4"/>`);
push(txt(208, 300, 8.5, 600, C.boneEdge, 'middle', 'pubis'));

// bladder
push(`<path d="M 300 150 C 300 118, 390 110, 420 142 C 442 166, 432 206, 404 220 C 366 238, 312 224, 300 196 C 296 182, 296 164, 300 150 Z" fill="${C.blad}" stroke="${C.bladEdge}" stroke-width="2" stroke-linejoin="round"/>`);
push(txt(372, 168, 10.5, 700, C.bladEdge, 'middle', 'bladder'));
// bladder neck + urethra
push(`<path d="M 312 218 C 300 244, 296 270, 292 300 C 290 318, 288 330, 288 340" fill="none" stroke="${C.uret}" stroke-width="9" stroke-linecap="round"/>`);
push(`<path d="M 312 218 C 300 244, 296 270, 292 300 C 290 318, 288 330, 288 340" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round"/>`);
push(txt(300, 250, 8.5, 700, C.uret, 'start', 'bladder neck'));
push(txt(266, 336, 8.5, 600, C.uret, 'middle', 'urethra'));

// fascial sling hammock under the bladder neck + retropubic arms to the rectus fascia
push(`<path d="M 250 280 C 280 296, 312 296, 336 282" fill="none" stroke="${C.sling}" stroke-width="6" stroke-linecap="round"/>`);
// arms up behind the pubis to the fascia tie points
push(`<path d="M 252 280 C 230 240, 214 170, 196 114" fill="none" stroke="${C.sling}" stroke-width="4" stroke-linecap="round"/>`);
push(`<path d="M 334 282 C 320 230, 270 168, 226 114" fill="none" stroke="${C.sling}" stroke-width="4" stroke-linecap="round"/>`);
// tie knots over the rectus fascia
push(`<circle cx="196" cy="110" r="4" fill="${C.suture}"/>`);
push(`<circle cx="226" cy="110" r="4" fill="${C.suture}"/>`);
push(txt(150, 150, 9.5, 700, C.sling, 'middle', 'autologous'));
push(txt(150, 162, 9.5, 700, C.sling, 'middle', 'fascial sling'));
push(txt(150, 174, 8, 500, C.muted, 'middle', '(rectus / fascia lata)'));
push(txt(300, 296, 8.5, 700, C.sling, 'middle', 'hammock at bladder neck'));
// cough -> compress urethra against pubis
push(`<line x1="360" y1="260" x2="320" y2="282" stroke="${C.cough}" stroke-width="2.4" marker-end="url(#ps)"/>`);
push(txt(392, 256, 9, 600, C.cough, 'middle', 'cough &#8594; compress'));
push(txt(392, 268, 9, 600, C.cough, 'middle', 'urethra vs pubis'));

// ---- level comparison inset (PVS vs MUS) ----
const ix = 560, iy = 110;
push(`<rect x="${ix - 12}" y="${iy - 16}" width="226" height="150" rx="12" fill="#F8FAFC" stroke="#EAEDF1" stroke-width="1.2"/>`);
push(txt(ix, iy + 2, 11.5, 700, C.ink, 'start', 'Where it sits', false));
// mini urethra
push(`<line x1="${ix + 30}" y1="${iy + 22}" x2="${ix + 30}" y2="${iy + 110}" stroke="${C.uret}" stroke-width="7" stroke-linecap="round"/>`);
push(txt(ix + 30, iy + 18, 8, 600, C.muted, 'middle', 'bladder neck'));
push(txt(ix + 30, iy + 122, 8, 600, C.muted, 'middle', 'meatus'));
// PVS at bladder neck (proximal)
push(`<line x1="${ix + 18}" y1="${iy + 36}" x2="${ix + 42}" y2="${iy + 36}" stroke="${C.sling}" stroke-width="5" stroke-linecap="round"/>`);
push(txt(ix + 50, iy + 39, 9, 700, C.sling, 'start', 'PVS &#8212; bladder neck'));
push(txt(ix + 50, iy + 51, 8, 500, C.muted, 'start', 'autologous, compressive'));
// MUS at midurethra
push(`<line x1="${ix + 18}" y1="${iy + 74}" x2="${ix + 42}" y2="${iy + 74}" stroke="${C.mus}" stroke-width="5" stroke-linecap="round"/>`);
push(txt(ix + 50, iy + 77, 9, 700, C.mus, 'start', 'MUS &#8212; midurethra'));
push(txt(ix + 50, iy + 89, 8, 500, C.muted, 'start', 'synthetic, supportive'));

// ---- key ----
push(`<line x1="40" y1="360" x2="780" y2="360" stroke="${C.border}" stroke-width="1"/>`);
push(txt(40, 380, 11, 600, C.ink, 'start', 'AUA/SUFU-preferred for ISD, a fixed urethra, mesh-averse patients, prior radiation, and concurrent urethral reconstruction (diverticulum / fistula).', false));
push(txt(40, 398, 10.5, 500, C.muted, 'start', 'Combined vaginal + abdominal approach; set tension just snug, not obstructive. Mesh-free and durable, with more early retention / urgency than MUS.', false));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Autologous fascial pubovaginal sling in sagittal view. A strip of the patient's own fascia, from the rectus abdominis or fascia lata, is placed as a hammock beneath the bladder neck; its two arms pass retropubically behind the pubic symphysis and are tied over the anterior rectus fascia, where the graft was harvested and the defect closed. A cough compresses the urethra against the pubis. An inset compares where slings sit: the pubovaginal sling is autologous and compressive at the bladder neck, while the synthetic midurethral sling is supportive at the midurethra. Key: AUA/SUFU prefers the pubovaginal sling for intrinsic sphincter deficiency, a fixed urethra, mesh-averse patients, prior radiation, and concurrent urethral reconstruction; it uses a combined vaginal and abdominal approach with tension set just snug, is durable and mesh-free, but has higher early retention and de novo urgency than the midurethral sling.">
<defs>
<marker id="ps" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.cough}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'pubovaginal-sling.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
