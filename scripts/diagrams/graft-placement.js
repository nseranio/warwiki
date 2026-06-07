#!/usr/bin/env node
/**
 * WARWIKI original schematic — BMG graft-placement configurations (cross-section).
 *
 * Where the free oral-mucosa graft sits relative to the bulbar urethra decides
 * its bed: dorsal onlay (Barbagli) quilts to the tunica albuginea of the corpora;
 * ventral onlay rests on the corpus spongiosum; dorsal inlay (Asopa) reaches the
 * dorsal plate through ventral access. The rule: the graft must lie on
 * well-vascularized support, fixed without shear or dead space.
 *
 * Output: static/img/diagrams/graft-placement.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', corpora: '#E7D9CB', corporaEdge: '#B99873',
  spong: '#F3DEDF', spongEdge: '#CF9DA3', lumen: '#FFFFFF', lumenEdge: '#64748B', graft: '#185FA5',
  graftFill: '#DCE7F1', suture: '#B45309', open: '#94A3B8' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 880, H = 317;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.1" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'BMG graft placement &#8212; where the graft sits decides its bed', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'cross-section of the bulbar urethra (dorsal = toward corpora) &#8212; the graft must lie on well-vascularized support', false));

const cy = 188; // cross-section center y
// base anatomy (corpora cavernosa dorsal, corpus spongiosum ventral with lumen)
function base(cx) {
  // corpora cavernosa (dorsal, top)
  push(`<circle cx="${cx - 20}" cy="${cy - 56}" r="20" fill="${C.corpora}" stroke="${C.corporaEdge}" stroke-width="1.4"/>`);
  push(`<circle cx="${cx + 20}" cy="${cy - 56}" r="20" fill="${C.corpora}" stroke="${C.corporaEdge}" stroke-width="1.4"/>`);
  // corpus spongiosum (ventral, around the urethra)
  push(`<circle cx="${cx}" cy="${cy}" r="44" fill="${C.spong}" stroke="${C.spongEdge}" stroke-width="1.8"/>`);
}
function lumen(cx) {
  push(`<circle cx="${cx}" cy="${cy}" r="11" fill="${C.lumen}" stroke="${C.lumenEdge}" stroke-width="1.4"/>`);
}
// graft arc at given angle span (deg, 0=right, -90=top/dorsal, 90=bottom/ventral), radius r
function graftArc(cx, r, a0, a1) {
  const p = a => [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)];
  const s = p(a0), e = p(a1);
  push(`<path d="M ${f(s[0])} ${f(s[1])} A ${r} ${r} 0 0 1 ${f(e[0])} ${f(e[1])}" fill="none" stroke="${C.graft}" stroke-width="6" stroke-linecap="round"/>`);
}

// orientation marker (panel 1)
const o1 = 160;
push(txt(o1 - 84, cy - 54, 9.5, 700, C.muted, 'middle', 'dorsal'));
push(`<line x1="${o1 - 84}" y1="${cy - 46}" x2="${o1 - 84}" y2="${cy + 46}" stroke="${C.muted}" stroke-width="0.8" stroke-dasharray="2 3"/>`);
push(txt(o1 - 84, cy + 62, 9.5, 700, C.muted, 'middle', 'ventral'));

// ============ PANEL 1: dorsal onlay (Barbagli) ============
base(o1);
// graft on dorsal wall of lumen, quilted up to tunica/corpora
graftArc(o1, 11, 200, 340); // top arc of lumen (dorsal)
// quilting sutures from graft to tunica between corpora
for (const dx of [-7, 0, 7]) push(`<line x1="${o1 + dx}" y1="${cy - 12}" x2="${o1 + dx}" y2="${cy - 34}" stroke="${C.suture}" stroke-width="1.3"/>`);
lumen(o1);
push(txt(o1, cy + 78, 12.5, 700, C.ink, 'middle', 'Dorsal onlay', false));
push(txt(o1, cy + 94, 9.5, 500, C.muted, 'middle', 'Barbagli', false));
push(txt(o1, cy + 112, 9.5, 600, C.graft, 'middle', 'bed: tunica albuginea'));

// ============ PANEL 2: ventral onlay ============
const o2 = 440;
base(o2);
// graft on ventral wall of lumen, supported by spongiosum (spongioplasty over)
graftArc(o2, 11, 20, 160); // bottom arc of lumen (ventral)
for (const dx of [-7, 0, 7]) push(`<line x1="${o2 + dx}" y1="${cy + 12}" x2="${o2 + dx}" y2="${cy + 30}" stroke="${C.suture}" stroke-width="1.3"/>`);
lumen(o2);
push(txt(o2, cy + 78, 12.5, 700, C.ink, 'middle', 'Ventral onlay', false));
push(txt(o2, cy + 94, 9.5, 500, C.muted, 'middle', 'spongioplasty over graft', false));
push(txt(o2, cy + 112, 9.5, 600, C.graft, 'middle', 'bed: corpus spongiosum'));

// ============ PANEL 3: dorsal inlay (Asopa) ============
const o3 = 720;
base(o3);
// ventral access: a slit opening in the ventral spongiosum
push(`<path d="M ${o3 - 10} ${cy + 44} L ${o3} ${cy + 12} L ${o3 + 10} ${cy + 44}" fill="${C.lumen}" stroke="${C.open}" stroke-width="1.6" stroke-dasharray="3 3"/>`);
// graft inlaid into the dorsal plate (patch let into the dorsal lumen wall)
push(`<path d="M ${o3 - 11} ${cy - 4} A 11 11 0 0 1 ${o3 + 11} ${cy - 4}" fill="${C.graftFill}" stroke="${C.graft}" stroke-width="4"/>`);
lumen(o3);
push(`<line x1="${o3 + 30}" y1="${cy + 34}" x2="${o3 + 12}" y2="${cy + 20}" stroke="${C.open}" stroke-width="1.2"/>`);
push(txt(o3 + 34, cy + 38, 9, 600, C.open, 'start', 'ventral access'));
push(txt(o3, cy + 78, 12.5, 700, C.ink, 'middle', 'Dorsal inlay', false));
push(txt(o3, cy + 94, 9.5, 500, C.muted, 'middle', 'Asopa', false));
push(txt(o3, cy + 112, 9.5, 600, C.graft, 'middle', 'ventral access, dorsal bed'));

// shared anatomy labels (panel 1)
push(`<line x1="${o1 + 44}" y1="${cy - 56}" x2="${o1 + 70}" y2="${cy - 64}" stroke="${C.corporaEdge}" stroke-width="0.9"/>`);
push(txt(o1 + 72, cy - 62, 8.5, 600, C.corporaEdge, 'start', 'corpora'));
push(`<line x1="${o1 + 40}" y1="${cy + 24}" x2="${o1 + 66}" y2="${cy + 32}" stroke="${C.spongEdge}" stroke-width="0.9"/>`);
push(txt(o1 + 68, cy + 34, 8.5, 600, C.spongEdge, 'start', 'spongiosum'));


const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Buccal-mucosa graft placement configurations shown in cross-section of the bulbar urethra, with dorsal toward the corpora cavernosa and ventral toward the skin. Dorsal onlay (Barbagli): the graft lines the dorsal wall of the lumen and is quilted to the tunica albuginea of the corpora. Ventral onlay: the graft lines the ventral wall and is supported by the corpus spongiosum closed over it. Dorsal inlay (Asopa): the urethra is opened ventrally and the graft is inlaid into the dorsal plate. Key: no side always wins, dorsal is currently preferred for bulbar strictures about 66 to 34 percent, and the graft must be quilted to well-vascularized support to avoid shear, hematoma, and dead space.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'graft-placement.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
