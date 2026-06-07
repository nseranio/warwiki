#!/usr/bin/env node
/**
 * WARWIKI original schematic — Yang-Monti catheterizable channel.
 *
 * The transverse-retubularization trick: a short (~2-2.5 cm) ileal segment is
 * opened along its length, then re-rolled the *perpendicular* way over a small
 * catheter. The old circumference becomes the new length, so a 2 cm segment
 * yields a ~5-6 cm channel; a double (spiral) Monti yields ~10-12 cm.
 *
 * Output: static/img/diagrams/yang-monti.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', bowel: '#F3DBD2', bowelEdge: '#CC9079',
  lumen: '#E2ECF5', mes: '#E7D9CB', mesEdge: '#B99873', cath: '#0F766E', suture: '#185FA5',
  arrow: '#0F766E', gain: '#15803D', axis: '#94A3B8' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 880, H = 344;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.1" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Yang-Monti channel &#8212; re-tubularize the perpendicular way', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'a short ileal segment opened and re-rolled across its axis: the old circumference becomes the new length', false));

const cy = 196;
// ============ A: short ileal segment ============
const ax = 150;
// mesentery
push(`<path d="M ${ax - 46} ${cy + 30} L ${ax + 46} ${cy + 30} L ${ax + 20} ${cy + 86} L ${ax - 20} ${cy + 86} Z" fill="${C.mes}" stroke="${C.mesEdge}" stroke-width="1.2"/>`);
for (const dx of [-18, 0, 18]) push(`<line x1="${ax + dx}" y1="${cy + 34}" x2="${ax + dx * 0.5}" y2="${cy + 82}" stroke="${C.mesEdge}" stroke-width="0.9"/>`);
push(txt(ax, cy + 100, 9, 600, C.mesEdge, 'middle', 'mesentery'));
// short fat cylinder (segment along horizontal axis)
push(`<rect x="${ax - 44}" y="${cy - 30}" width="88" height="60" rx="8" fill="${C.bowel}" stroke="${C.bowelEdge}" stroke-width="2"/>`);
push(`<ellipse cx="${ax - 44}" cy="${cy}" rx="10" ry="30" fill="${C.lumen}" stroke="${C.bowelEdge}" stroke-width="2"/>`);
push(`<ellipse cx="${ax + 44}" cy="${cy}" rx="10" ry="30" fill="${C.bowel}" stroke="${C.bowelEdge}" stroke-width="2"/>`);
// length bracket
push(`<path d="M ${ax - 44} ${cy - 44} L ${ax - 44} ${cy - 50} L ${ax + 44} ${cy - 50} L ${ax + 44} ${cy - 44}" fill="none" stroke="${C.muted}" stroke-width="1.2"/>`);
push(txt(ax, cy - 58, 10, 700, C.ink, 'middle', '~2&#8211;2.5 cm', false));
push(txt(ax, cy + 132, 12, 700, C.ink, 'middle', '1. Short ileal segment', false));

// arrow A->B
push(`<line x1="218" y1="${cy}" x2="262" y2="${cy}" stroke="${C.arrow}" stroke-width="2.4" marker-end="url(#ym)"/>`);
push(txt(240, cy - 10, 9, 600, C.arrow, 'middle', 'open', false));

// ============ B: opened sheet, re-roll perpendicular ============
const bx = 370;
push(`<rect x="${bx - 70}" y="${cy - 34}" width="140" height="68" rx="5" fill="${C.bowel}" stroke="${C.bowelEdge}" stroke-width="2"/>`);
// mesentery edge (bottom)
push(`<rect x="${bx - 70}" y="${cy + 30}" width="140" height="8" fill="${C.mes}" stroke="${C.mesEdge}" stroke-width="1"/>`);
// original bowel axis (dashed, horizontal) vs new roll (curl top & bottom together)
push(`<line x1="${bx - 60}" y1="${cy}" x2="${bx + 60}" y2="${cy}" stroke="${C.axis}" stroke-width="1.1" stroke-dasharray="3 4"/>`);
push(txt(bx, cy + 4, 8, 600, C.axis, 'middle', 'old bowel axis'));
// curl arrows (top edge down, bottom edge up) -> roll around the long axis
push(`<path d="M ${bx - 86} ${cy - 30} C ${bx - 100} ${cy - 6}, ${bx - 100} ${cy + 6}, ${bx - 86} ${cy + 30}" fill="none" stroke="${C.suture}" stroke-width="1.8" marker-end="url(#ym2)"/>`);
push(txt(bx, cy - 48, 9.5, 700, C.suture, 'middle', 're-roll the long way'));
// width bracket = circumference (becomes new length)
push(`<path d="M ${bx - 70} ${cy + 50} L ${bx - 70} ${cy + 56} L ${bx + 70} ${cy + 56} L ${bx + 70} ${cy + 50}" fill="none" stroke="${C.gain}" stroke-width="1.2"/>`);
push(txt(bx, cy + 70, 9.5, 700, C.gain, 'middle', 'circumference &#8594; new length'));
push(txt(bx, cy + 132, 12, 700, C.ink, 'middle', '2. Detubularize', false));

// arrow B->C
push(`<line x1="460" y1="${cy}" x2="504" y2="${cy}" stroke="${C.arrow}" stroke-width="2.4" marker-end="url(#ym)"/>`);
push(txt(482, cy - 10, 9, 600, C.arrow, 'middle', 'roll', false));

// ============ C: long narrow channel over catheter ============
const cx0 = 540, cx1 = 720;
push(`<rect x="${cx0}" y="${cy - 13}" width="${cx1 - cx0}" height="26" rx="13" fill="${C.bowel}" stroke="${C.bowelEdge}" stroke-width="2"/>`);
// re-tubularization seam
push(`<line x1="${cx0 + 6}" y1="${cy - 13}" x2="${cx1 - 6}" y2="${cy - 13}" stroke="${C.suture}" stroke-width="1.6" stroke-dasharray="3 3"/>`);
// catheter through it
push(`<line x1="${cx0 - 14}" y1="${cy}" x2="${cx1 + 14}" y2="${cy}" stroke="${C.cath}" stroke-width="3" stroke-dasharray="2 4" stroke-linecap="round"/>`);
// length bracket
push(`<path d="M ${cx0} ${cy + 24} L ${cx0} ${cy + 30} L ${cx1} ${cy + 30} L ${cx1} ${cy + 24}" fill="none" stroke="${C.gain}" stroke-width="1.2"/>`);
push(txt((cx0 + cx1) / 2, cy + 44, 10, 700, C.gain, 'middle', '~5&#8211;6 cm  (12&#8211;14 Fr)', false));
push(txt((cx0 + cx1) / 2, cy - 24, 9, 600, C.cath, 'middle', 'over catheter'));
push(txt((cx0 + cx1) / 2, cy + 132, 12, 700, C.ink, 'middle', '3. Re-tubularize', false));
// double-monti note
push(txt((cx0 + cx1) / 2, cy + 64, 9, 500, C.muted, 'middle', 'double (spiral) Monti &#8594; ~10&#8211;12 cm', false));


const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Yang-Monti catheterizable channel construction in three steps. Step 1: a short 2 to 2.5 centimeter ileal segment on its mesentery. Step 2: the segment is opened (detubularized) into a flat sheet and re-rolled the perpendicular way, so the bowel circumference becomes the new tube length. Step 3: re-tubularized over a 12 to 14 French catheter into a long narrow channel about 5 to 6 centimeters, or about 10 to 12 centimeters as a double spiral Monti. Key: a Mitrofanoff alternative when the appendix is unusable, sparing bowel and the ileocecal valve, implanted with a flap-valve continence mechanism, with the bowel-loop end prone to stomal stenosis.">
<defs>
<marker id="ym" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.arrow}"/></marker>
<marker id="ym2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.suture}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'yang-monti.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
