#!/usr/bin/env node
/**
 * WARWIKI original schematic — ileal ureter replacement.
 *
 * Two panels. (1) Harvest a 15-25 cm ileal segment on its mesentery and
 * restore bowel continuity with an ileoileostomy over the freed loop.
 * (2) Interpose the segment isoperistaltically between the renal pelvis
 * (ileopyelostomy) and the bladder (refluxing ileovesical anastomosis).
 *
 * Output: static/img/diagrams/ileal-ureter.svg
 */
const fs = require('fs');
const path = require('path');

const C = {
  ink: '#1E293B', muted: '#64748B', border: '#E2E8F0',
  wall: '#475569', kidney: '#EFF2F6',
  bowel: '#EAD0AE', bowelEdge: '#B58050',          // native ileum (serosa)
  seg: '#DCE8F4', segEdge: '#6E97BD',              // urinary segment (carries urine)
  mes: '#FBEEDD', mesVes: '#C98A52',               // mesentery + arcades
  lumen: '#E2ECF5', lumenEdge: '#7FA3C4',
  suture: '#185FA5', cut: '#B91C1C', flow: '#0F766E',
};
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 432;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.2" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}
function leader(x1, y1, x2, y2) {
  push(`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${C.muted}" stroke-width="1"/>`);
}
// outlined tube along a path
function tube(d, w, fill, edge) {
  push(`<path d="${d}" fill="none" stroke="${edge}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`);
  push(`<path d="${d}" fill="none" stroke="${fill}" stroke-width="${w - 3.4}" stroke-linecap="round" stroke-linejoin="round"/>`);
}
function sutureTicks(cx, cy, n, span, vert) {
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const p = -span / 2 + span * t;
    if (vert) push(`<line x1="${f(cx - 5)}" y1="${f(cy + p)}" x2="${f(cx + 5)}" y2="${f(cy + p)}" stroke="${C.suture}" stroke-width="1.6"/>`);
    else push(`<line x1="${f(cx + p)}" y1="${f(cy - 5)}" x2="${f(cx + p)}" y2="${f(cy + 5)}" stroke="${C.suture}" stroke-width="1.6"/>`);
  }
}

// ===== frame + title =======================================================
push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Ileal ureter replacement', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'a vascularized ileal segment bridges long-segment ureteral loss between the renal pelvis and the bladder', false));

// ===== PANEL 1: harvest + restore continuity ==============================
// reconnected native ileum (tan) with an ileoileostomy bridge over the gap
tube('M 78 168 L 184 168 Q 224 142 264 168 L 388 168', 18, C.bowel, C.bowelEdge);
sutureTicks(224, 152, 4, 22, false);
push(txt(224, 130, 10.5, 700, C.ink, 'middle', 'ileoileostomy'));
push(txt(224, 142, 9, 500, C.muted, 'middle', 'restores bowel continuity'));
// freed segment (blue, urinary) hanging below on its mesentery
tube('M 186 176 C 178 214 200 262 224 264 C 248 262 270 214 262 176', 18, C.seg, C.segEdge);
// cut marks where the segment was divided from the bowel
push(`<line x1="180" y1="168" x2="192" y2="180" stroke="${C.cut}" stroke-width="2"/>`);
push(`<line x1="180" y1="180" x2="192" y2="168" stroke="${C.cut}" stroke-width="2"/>`);
push(`<line x1="256" y1="168" x2="268" y2="180" stroke="${C.cut}" stroke-width="2"/>`);
push(`<line x1="256" y1="180" x2="268" y2="168" stroke="${C.cut}" stroke-width="2"/>`);
// mesentery fan from root to the freed loop + arcades
push(`<path d="M 224 330 L 198 258 Q 224 250 250 258 Z" fill="${C.mes}" stroke="${C.mesVes}" stroke-width="1.2"/>`);
push(`<path d="M 224 330 C 214 296 210 278 206 262" fill="none" stroke="${C.mesVes}" stroke-width="1"/>`);
push(`<path d="M 224 330 C 234 296 238 278 242 262" fill="none" stroke="${C.mesVes}" stroke-width="1"/>`);
push(txt(316, 300, 9.5, 600, C.mesVes, 'middle', 'mesenteric'));
push(txt(312, 312, 9.5, 600, C.mesVes, 'middle', 'pedicle'));
leader(286, 304, 248, 280);
push(txt(128, 250, 10, 700, C.segEdge, 'middle', 'isolated'));
push(txt(112, 262, 10, 700, C.segEdge, 'middle', 'segment'));
push(txt(126, 274, 9, 500, C.muted, 'middle', '15&#8211;25 cm'));
leader(150, 258, 192, 230);
push(txt(224, 400, 12.5, 700, C.ink, 'middle', '1. Harvest &#38; restore continuity', false));

// ===== transition arrow ====================================================
push(`<line x1="402" y1="220" x2="448" y2="220" stroke="${C.flow}" stroke-width="2.6" marker-end="url(#fl)"/>`);
push(txt(425, 210, 10, 600, C.flow, 'middle', 'interpose', false));

// ===== PANEL 2: isoperistaltic interposition ==============================
// kidney + renal pelvis
push(`<ellipse cx="512" cy="120" rx="44" ry="56" fill="${C.kidney}"/>`);
push(`<path d="M 528 92 C 556 96 560 120 552 138 L 540 172 L 528 172 L 522 138 C 516 120 520 100 528 92 Z" fill="${C.lumen}" stroke="${C.lumenEdge}" stroke-width="2"/>`);
push(txt(486, 78, 10, 600, C.muted, 'middle', 'renal pelvis'));
// ileal ureter (blue segment) from pelvis to bladder
const segPath = 'M 534 172 C 548 220 590 248 622 296';
tube(segPath, 20, C.seg, C.segEdge);
// mesentery pedicle to the segment (from midline at right)
push(`<path d="M 786 226 L 632 250 Q 624 264 636 278 Z" fill="${C.mes}" stroke="${C.mesVes}" stroke-width="1.2"/>`);
push(`<path d="M 786 226 C 728 236 686 244 648 256" fill="none" stroke="${C.mesVes}" stroke-width="1"/>`);
push(txt(770, 214, 9.5, 600, C.mesVes, 'middle', 'mesentery'));
// isoperistaltic flow arrow along the segment
push(`<line x1="556" y1="206" x2="582" y2="240" stroke="${C.flow}" stroke-width="2.2" marker-end="url(#fl)"/>`);
push(txt(540, 232, 9.5, 700, C.flow, 'middle', 'isoperistaltic'));
push(txt(556, 244, 8.5, 500, C.muted, 'middle', 'oral &#8594; aboral'));
push(txt(600, 214, 10, 700, C.segEdge, 'middle', 'ileal ureter'));
// bladder
push(`<path d="M 568 348 C 568 308 712 308 712 348 C 712 392 568 392 568 348 Z" fill="${C.lumen}" stroke="${C.wall}" stroke-width="2.4"/>`);
push(txt(640, 372, 10.5, 700, C.ink, 'middle', 'bladder'));
// proximal anastomosis (ileopyelostomy)
sutureTicks(534, 172, 3, 16, false);
push(txt(486, 150, 9.5, 700, C.suture, 'middle', 'ileopyelostomy'));
leader(500, 156, 530, 172);
// distal anastomosis (ileovesical, refluxing)
sutureTicks(624, 312, 3, 16, false);
push(txt(704, 286, 9.5, 700, C.suture, 'middle', 'ileovesical'));
push(txt(706, 298, 8.5, 500, C.muted, 'middle', '(refluxing)'));
leader(672, 296, 632, 308);
push(txt(620, 400, 12.5, 700, C.ink, 'middle', '2. Interpose isoperistaltically', false));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Ileal ureter replacement in two panels. Panel 1: a 15 to 25 cm ileal segment is isolated from the small bowel on its mesenteric pedicle, shown hanging below as a urinary segment, while bowel continuity is restored above by an ileoileostomy bridging the gap. Panel 2: the segment is interposed isoperistaltically, with its oral end sewn to the renal pelvis as an ileopyelostomy and its aboral end implanted into the bladder as a refluxing ileovesical anastomosis, peristalsis carrying urine antegrade from kidney to bladder.">
<defs>
<marker id="fl" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.flow}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'ileal-ureter.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
