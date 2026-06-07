#!/usr/bin/env node
/**
 * WARWIKI original schematic — Hautmann W-configuration ileal neobladder.
 *
 * 60-70 cm of distal ileum, detubularized along the antimesenteric border and
 * folded into a four-limb W (the defining feature vs the Studer U + afferent
 * limb), then closed anteriorly into a near-spherical low-pressure reservoir
 * anastomosed to the urethra at its most dependent point; ureters reimplanted
 * proximally (Le Duc-Camey trough or chimney).
 *
 * Output: static/img/diagrams/hautmann-neobladder.svg
 */
const fs = require('fs');
const path = require('path');

const C = {
  ink: '#1E293B', muted: '#64748B', border: '#E2E8F0',
  bowel: '#F3DBD2', bowelEdge: '#CC9079', lumen: '#FBEFE9',
  ureter: '#185FA5', urethra: '#64748B', seam: '#185FA5',
  ok: '#15803D', arrow: '#0F766E',
};
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 408;
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
function tube(d, w, fill, edge) {
  push(`<path d="${d}" fill="none" stroke="${edge}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`);
  push(`<path d="${d}" fill="none" stroke="${fill}" stroke-width="${w - 3.6}" stroke-linecap="round" stroke-linejoin="round"/>`);
}
function ticks(x1, y1, x2, y2, n, col) {
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n, mx = x1 + (x2 - x1) * t, my = y1 + (y2 - y1) * t;
    const dx = (y2 - y1), dy = -(x2 - x1), L = Math.hypot(dx, dy) || 1;
    const ux = dx / L * 4.5, uy = dy / L * 4.5;
    push(`<line x1="${f(mx - ux)}" y1="${f(my - uy)}" x2="${f(mx + ux)}" y2="${f(my + uy)}" stroke="${col}" stroke-width="1.6"/>`);
  }
}

// ===== frame + title =======================================================
push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Hautmann W-configuration ileal neobladder', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'detubularized ileum folded into a four-limb W and closed into a low-pressure sphere, voiding per urethra', false));

// ===== PANEL 1: detubularize + fold into a W ==============================
const yTop = 134, yBot = 220, limb = [120, 182, 244, 306];
const a = limb[0], b = limb[1], c = limb[2], d = limb[3];
const wPath = `M ${a} ${yTop} L ${a} ${yBot} Q ${(a + b) / 2} ${yBot + 26} ${b} ${yBot} L ${b} ${yTop} Q ${(b + c) / 2} ${yTop - 26} ${c} ${yTop} L ${c} ${yBot} Q ${(c + d) / 2} ${yBot + 26} ${d} ${yBot} L ${d} ${yTop}`;
tube(wPath, 44, C.lumen, C.bowelEdge);
// suture seams between adjacent limbs
[(a + b) / 2, (b + c) / 2, (c + d) / 2].forEach(sx => ticks(sx, yTop + 2, sx, yBot - 2, 5, C.seam));
// antimesenteric "opened" hint along the limb crowns
push(txt(213, 112, 10, 600, C.bowelEdge, 'middle', 'opened along antimesenteric border'));
push(txt(213, 254, 11, 700, C.ink, 'middle', 'fold into a four-limb W'));
push(txt(213, 268, 9.5, 500, C.muted, 'middle', '60&#8211;70 cm detubularized ileum'));
push(txt(150, 178, 9, 600, C.seam, 'middle', 'seams'));
leader(150, 184, 151, 200);
push(txt(213, 388, 12.5, 700, C.ink, 'middle', '1. Detubularize &#38; fold (W)', false));

// ===== transition arrow ====================================================
push(`<line x1="372" y1="186" x2="426" y2="186" stroke="${C.arrow}" stroke-width="2.6" marker-end="url(#ah)"/>`);
push(txt(399, 176, 10, 600, C.arrow, 'middle', 'close', false));

// ===== PANEL 2: close into a low-pressure sphere ==========================
const cx = 600, cy = 196, r = 80;
push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.lumen}" stroke="${C.bowelEdge}" stroke-width="2.6"/>`);
// W-seams visible on the reservoir surface
[-40, 0, 40].forEach(off => {
  push(`<path d="M ${cx + off} ${cy - r + 10} C ${cx + off - 8} ${cy} ${cx + off + 8} ${cy} ${cx + off} ${cy + r - 10}" fill="none" stroke="${C.seam}" stroke-width="1.6" stroke-dasharray="4 3"/>`);
});
push(txt(cx, cy + 4, 10.5, 700, C.bowelEdge, 'middle', 'low-pressure'));
push(txt(cx, cy + 18, 10.5, 700, C.bowelEdge, 'middle', 'sphere'));
push(txt(cx, cy + 32, 8.5, 500, C.muted, 'middle', 'Laplace: P = 2T/r'));
// ureters reimplanted at the top (posterior)
tube(`M ${cx - 30} 92 C ${cx - 26} 116 ${cx - 22} 128 ${cx - 18} ${cy - r + 6}`, 9, '#DCE8F4', C.ureter);
tube(`M ${cx + 30} 92 C ${cx + 26} 116 ${cx + 22} 128 ${cx + 18} ${cy - r + 6}`, 9, '#DCE8F4', C.ureter);
ticks(cx - 22, cy - r + 2, cx - 14, cy - r + 12, 2, C.ureter);
ticks(cx + 14, cy - r + 2, cx + 22, cy - r + 12, 2, C.ureter);
push(txt(cx, 80, 10, 700, C.ureter, 'middle', 'ureters'));
push(txt(cx + 92, 104, 9, 500, C.muted, 'middle', 'Le Duc-Camey'));
push(txt(cx + 96, 116, 9, 500, C.muted, 'middle', 'or chimney'));
leader(cx + 60, 110, cx + 22, 120);
// urethra at the most dependent point
tube(`M ${cx} ${cy + r - 6} L ${cx} ${cy + r + 46}`, 13, '#EDEFF2', C.urethra);
ticks(cx - 10, cy + r - 4, cx + 10, cy + r - 4, 3, C.urethra);
push(txt(cx, cy + r + 64, 9.5, 700, C.urethra, 'middle', 'urethra'));
push(txt(cx, cy + r + 76, 8.5, 500, C.muted, 'middle', 'most dependent point'));
push(txt(cx, 388, 12.5, 700, C.ink, 'middle', '2. Close into a sphere', false));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Hautmann W-configuration ileal neobladder in two panels. Panel 1: 60 to 70 cm of distal ileum is opened along the antimesenteric border and folded into a four-limb W, the adjacent limb edges joined by suture seams to form the posterior plate. Panel 2: the plate is closed anteriorly into a near-spherical low-pressure reservoir (Laplace P equals 2T over r), with the ureters reimplanted at the top by a Le Duc-Camey trough or chimney and the urethra anastomosed at the most dependent point for voiding per urethra.">
<defs>
<marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.arrow}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'hautmann-neobladder.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
