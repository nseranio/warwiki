#!/usr/bin/env node
/**
 * WARWIKI original schematic — Studer orthotopic ileal neobladder.
 *
 * ~40-60 cm of ileum: the distal segment is detubularized and cross-folded into
 * a spherical low-pressure reservoir anastomosed to the urethra at its most
 * dependent point; the proximal ~10-15 cm stays intact as an isoperistaltic
 * afferent (Studer) limb that receives the ureters. Inset: why detubularize.
 *
 * Output: static/img/diagrams/studer-neobladder.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', bowel: '#F3DBD2', bowelEdge: '#CC9079',
  lumen: '#FBEFE9', ureter: '#185FA5', urethra: '#64748B', seam: '#185FA5', press: '#B91C1C',
  ok: '#15803D', arrow: '#0F766E' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 860, H = 390;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Studer orthotopic ileal neobladder', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'detubularized ileum cross-folded into a low-pressure sphere; an intact afferent limb takes the ureters', false));

// ---- assembled neobladder (left) ----
const px = 270, py = 250;
// ureters from above
for (const s of [-1, 1]) push(`<path d="M ${px + s * 60} 96 C ${px + s * 48} 130, ${px + 24} 150, ${px + 30} 162" fill="none" stroke="${C.ureter}" stroke-width="3.4" stroke-linecap="round"/>`);
push(txt(px - 60, 90, 9, 700, C.ureter, 'middle', 'ureters'));
// afferent (Studer) limb - intact ileum off the top
push(`<path d="M ${px + 30} 162 C ${px + 36} 188, ${px + 30} 200, ${px + 24} 208" fill="none" stroke="${C.bowelEdge}" stroke-width="15" stroke-linecap="round"/>`);
push(`<path d="M ${px + 30} 162 C ${px + 36} 188, ${px + 30} 200, ${px + 24} 208" fill="none" stroke="${C.lumen}" stroke-width="7" stroke-linecap="round"/>`);
push(txt(px + 96, 168, 9, 700, C.bowelEdge, 'middle', 'afferent'));
push(txt(px + 96, 180, 9, 700, C.bowelEdge, 'middle', '(Studer) limb'));
// ureteroenteric anastomosis marker
push(`<circle cx="${px + 30}" cy="162" r="6" fill="none" stroke="${C.ureter}" stroke-width="1.8"/>`);
// reservoir sphere (detubularized, cross-folded)
push(`<ellipse cx="${px}" cy="${py}" rx="92" ry="76" fill="${C.bowel}" stroke="${C.bowelEdge}" stroke-width="2.2"/>`);
// cross-fold seam lines (reconfiguration)
push(`<path d="M ${px - 80} ${py - 20} Q ${px} ${py - 36} ${px + 80} ${py - 16}" fill="none" stroke="${C.seam}" stroke-width="1.6" stroke-dasharray="3 3"/>`);
push(`<path d="M ${px - 84} ${py + 18} Q ${px} ${py + 36} ${px + 82} ${py + 16}" fill="none" stroke="${C.seam}" stroke-width="1.6" stroke-dasharray="3 3"/>`);
push(txt(px, py - 2, 11, 700, C.bowelEdge, 'middle', 'detubularized'));
push(txt(px, py + 14, 11, 700, C.bowelEdge, 'middle', 'reservoir'));
// urethral anastomosis at most dependent point
push(`<path d="M ${px} ${py + 76} L ${px} ${py + 104}" fill="none" stroke="${C.urethra}" stroke-width="8" stroke-linecap="round"/>`);
push(`<path d="M ${px} ${py + 76} L ${px} ${py + 104}" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round"/>`);
push(`<circle cx="${px}" cy="${py + 78}" r="5" fill="none" stroke="${C.urethra}" stroke-width="1.8"/>`);
push(txt(px - 8, py + 100, 9, 700, C.urethra, 'end', 'urethra'));
push(txt(px - 8, py + 112, 8, 500, C.muted, 'end', '(most dependent point)'));

// ---- inset: why detubularize ----
const ix = 560, iy = 110;
push(`<rect x="${ix - 14}" y="${iy - 18}" width="278" height="208" rx="12" fill="#F8FAFC" stroke="#EAEDF1" stroke-width="1.2"/>`);
push(txt(ix, iy + 2, 12.5, 700, C.ink, 'start', 'Why detubularize?', false));
// state 1: intact tube -> high pressure contraction wave
push(`<rect x="${ix + 6}" y="${iy + 22}" width="120" height="26" rx="13" fill="${C.bowel}" stroke="${C.bowelEdge}" stroke-width="1.8"/>`);
push(`<path d="M ${ix + 30} ${iy + 35} q 14 -12 28 0 q 14 12 28 0" fill="none" stroke="${C.press}" stroke-width="2"/>`);
push(txt(ix + 140, iy + 32, 9.5, 700, C.press, 'start', 'intact tube'));
push(txt(ix + 140, iy + 44, 8.5, 500, C.muted, 'start', 'peristaltic pressure spikes'));
// arrow down
push(`<line x1="${ix + 66}" y1="${iy + 54}" x2="${ix + 66}" y2="${iy + 74}" stroke="${C.arrow}" stroke-width="1.8" marker-end="url(#sn)"/>`);
// state 2: opened + folded sphere -> low pressure
push(`<circle cx="${ix + 66}" cy="${iy + 104}" r="26" fill="${C.bowel}" stroke="${C.bowelEdge}" stroke-width="1.8"/>`);
push(`<line x1="${ix + 44}" y1="${iy + 98}" x2="${ix + 88}" y2="${iy + 100}" stroke="${C.seam}" stroke-width="1.3" stroke-dasharray="2 3"/>`);
push(txt(ix + 140, iy + 98, 9.5, 700, C.ok, 'start', 'folded sphere'));
push(txt(ix + 140, iy + 110, 8.5, 500, C.muted, 'start', 'big radius, broken waves'));
push(txt(ix + 140, iy + 122, 8.5, 500, C.muted, 'start', '&#8594; low pressure (Laplace)'));
push(txt(ix + 6, iy + 156, 9, 500, C.muted, 'start', 'Low storage pressure protects the kidneys'));
push(txt(ix + 6, iy + 168, 9, 500, C.muted, 'start', 'and is what makes daytime continence possible.'));


const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Studer orthotopic ileal neobladder. The distal ileum is detubularized and cross-folded into a spherical low-pressure reservoir, which is anastomosed to the urethra at its most dependent point; the proximal ileum stays intact as an isoperistaltic afferent Studer limb that receives both ureters. An inset explains why detubularization matters: an intact tube generates peristaltic pressure spikes, but opening and folding it into a large-radius sphere breaks the contraction waves and lowers pressure by the law of Laplace, which protects the kidneys and enables daytime continence. Key: continent orthotopic diversion to the native urethra needs a competent rhabdosphincter and a tumor-free urethral margin, is emptied by Valsalva plus scheduled clean intermittent catheterization, the afferent limb gives a low-grade antireflux effect, and lifelong vitamin B12 and metabolic-acidosis surveillance is required after ileal resection with common early nocturnal enuresis.">
<defs>
<marker id="sn" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.arrow}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'studer-neobladder.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
