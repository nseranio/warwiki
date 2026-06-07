#!/usr/bin/env node
/**
 * WARWIKI original schematic — Kock pouch continent cutaneous diversion.
 *
 * A detubularized low-pressure ileal reservoir with two intussuscepted nipple
 * valves: an afferent (antireflux) valve receiving the ureters and an efferent
 * (continence) valve leading to a catheterizable stoma. Inset: how an
 * intussuscepted nipple acts as a one-way valve under reservoir pressure.
 *
 * Output: static/img/diagrams/kock-pouch.svg
 */
const fs = require('fs');
const path = require('path');

const C = {
  ink: '#1E293B', muted: '#64748B', border: '#E2E8F0',
  bowel: '#F3DBD2', bowelEdge: '#CC9079', lumen: '#FBEFE9',
  ureter: '#185FA5', seam: '#185FA5', press: '#B91C1C',
  stoma: '#64748B', ok: '#15803D', arrow: '#0F766E',
};
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 420;
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
  push(`<path d="${d}" fill="none" stroke="${fill}" stroke-width="${w - 3.2}" stroke-linecap="round" stroke-linejoin="round"/>`);
}

// ===== frame + title =======================================================
push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Kock pouch &#8212; continent cutaneous diversion', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'a low-pressure ileal reservoir guarded by two intussuscepted nipple valves: antireflux in, continence out', false));

// ===== MAIN: assembled pouch ==============================================
const rx = 270, ry = 228, rRx = 126, rRy = 84;
push(`<ellipse cx="${rx}" cy="${ry}" rx="${rRx}" ry="${rRy}" fill="${C.lumen}" stroke="${C.bowelEdge}" stroke-width="2.6"/>`);
// detubularization seam
push(`<path d="M ${rx - 96} ${ry - 8} Q ${rx} ${ry + 34} ${rx + 96} ${ry - 8}" fill="none" stroke="${C.seam}" stroke-width="1.5" stroke-dasharray="4 3"/>`);
push(txt(rx, ry - 40, 10.5, 700, C.bowelEdge, 'middle', 'detubularized'));
push(txt(rx, ry - 27, 10.5, 700, C.bowelEdge, 'middle', 'reservoir'));

// --- afferent nipple valve (left) + ureters ---
// ureters converging to the afferent limb outside the reservoir
tube(`M 70 96 C 86 140 104 168 132 196`, 8, '#DCE8F4', C.ureter);
tube(`M 100 92 C 110 134 120 168 138 198`, 8, '#DCE8F4', C.ureter);
push(txt(72, 84, 10, 700, C.ureter, 'middle', 'ureters'));
// afferent limb stub into the reservoir wall
tube(`M 132 200 L 162 208`, 16, C.bowel, C.bowelEdge);
// intussuscepted afferent nipple protruding into the lumen
push(`<path d="M 160 196 L 214 206 Q 224 212 214 220 L 160 224 Z" fill="${C.bowel}" stroke="${C.bowelEdge}" stroke-width="1.8"/>`);
push(`<line x1="166" y1="210" x2="208" y2="212" stroke="${C.lumen}" stroke-width="2.4"/>`);
push(txt(150, 126, 10, 700, C.ink, 'middle', 'afferent valve'));
push(txt(150, 138, 8.5, 500, C.muted, 'middle', '(antireflux)'));
leader(160, 142, 188, 206);

// --- efferent nipple valve (bottom) + stoma ---
// intussuscepted efferent nipple protruding up into the lumen
push(`<path d="M 290 300 L 300 250 Q 306 240 312 250 L 322 300 Z" fill="${C.bowel}" stroke="${C.bowelEdge}" stroke-width="1.8"/>`);
push(`<line x1="304" y1="296" x2="306" y2="256" stroke="${C.lumen}" stroke-width="2.4"/>`);
// efferent limb to a flush catheterizable stoma
tube(`M 306 300 C 330 330 386 344 432 350`, 16, C.bowel, C.bowelEdge);
push(`<line x1="446" y1="330" x2="458" y2="372" stroke="${C.stoma}" stroke-width="3.4" stroke-linecap="round"/>`);
push(`<circle cx="436" cy="350" r="6" fill="${C.lumen}" stroke="${C.bowelEdge}" stroke-width="2"/>`);
push(txt(250, 350, 10, 700, C.ink, 'middle', 'efferent valve'));
push(txt(250, 362, 8.5, 500, C.muted, 'middle', '(continence)'));
leader(278, 350, 300, 290);
push(txt(470, 360, 10, 700, C.stoma, 'start', 'catheterizable'));
push(txt(470, 372, 10, 700, C.stoma, 'start', 'stoma'));

// ===== INSET: nipple-valve mechanism ======================================
const ix = 560, iw = 230;
push(`<line x1="${ix - 16}" y1="86" x2="${ix - 16}" y2="372" stroke="${C.border}" stroke-width="1.3"/>`);
push(txt(ix, 100, 12, 700, C.ink, 'start', 'Nipple-valve mechanism', false));
push(txt(ix, 116, 9.5, 500, C.muted, 'start', 'intussuscepted bowel = one-way valve', false));

const nx = ix + 110, wallY = 320;
// reservoir wall (floor) the nipple rises through
push(`<rect x="${ix}" y="${wallY}" width="${iw - 20}" height="14" rx="4" fill="${C.bowel}" stroke="${C.bowelEdge}" stroke-width="2"/>`);
push(txt(ix + 6, wallY + 38, 9, 500, C.muted, 'start', 'reservoir wall'));
// intussuscepted nipple: double-walled finger rising into the lumen
push(`<path d="M ${nx - 26} ${wallY} L ${nx - 26} 178 Q ${nx - 26} 150 ${nx} 150 Q ${nx + 26} 150 ${nx + 26} 178 L ${nx + 26} ${wallY}" fill="${C.bowel}" stroke="${C.bowelEdge}" stroke-width="2.2"/>`);
// central channel (compressed)
push(`<path d="M ${nx} ${wallY + 6} L ${nx} 184" fill="none" stroke="${C.lumen}" stroke-width="4"/>`);
push(`<path d="M ${nx} ${wallY + 6} L ${nx} 184" fill="none" stroke="${C.bowelEdge}" stroke-width="0.8" stroke-dasharray="3 3"/>`);
// limb continuing below the wall
tube(`M ${nx} ${wallY + 8} L ${nx} ${wallY + 40}`, 12, C.lumen, C.bowelEdge);
// reservoir pressure arrows compressing the nipple
[210, 244, 278].forEach(yy => {
  push(`<line x1="${nx - 70}" y1="${yy}" x2="${nx - 30}" y2="${yy}" stroke="${C.press}" stroke-width="2.2" marker-end="url(#pr)"/>`);
  push(`<line x1="${nx + 70}" y1="${yy}" x2="${nx + 30}" y2="${yy}" stroke="${C.press}" stroke-width="2.2" marker-end="url(#pr)"/>`);
});
push(txt(nx, 168, 9.5, 700, C.press, 'middle', 'pouch pressure'));
push(txt(nx, 360, 9.5, 700, C.ok, 'middle', 'valve held shut'));
push(txt(nx, 372, 8.5, 500, C.muted, 'middle', 'continence + antireflux'));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Kock pouch continent cutaneous urinary diversion. The main drawing shows a detubularized low-pressure ileal reservoir with two intussuscepted nipple valves: an afferent antireflux valve on the left receiving both ureters, and an efferent continence valve at the bottom leading through the efferent limb to a flush catheterizable stoma emptied by self-catheterization. An inset shows the nipple-valve mechanism: bowel intussuscepted into the reservoir forms a double-walled finger whose central channel is compressed shut by rising pouch pressure, making it a one-way valve that provides continence and prevents reflux.">
<defs>
<marker id="pr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.press}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'kock-pouch.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
