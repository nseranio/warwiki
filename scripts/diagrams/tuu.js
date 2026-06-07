#!/usr/bin/env node
/**
 * WARWIKI original schematic — transureteroureterostomy (TUU).
 *
 * The donor ureter is mobilized and brought retroperitoneally across the midline
 * — cephalad to the IMA / aortic bifurcation, through a window in the sigmoid
 * mesentery — to a tension-free, gently curved end-to-side anastomosis with the
 * healthy recipient ureter. Never jeopardize the one good ureter.
 *
 * Output: static/img/diagrams/tuu.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', kidney: '#F3DBD2', kidneyEdge: '#CC9079',
  donor: '#185FA5', recip: '#0F766E', vessel: '#C2728A', blad: '#E2ECF5', bladEdge: '#4F6F92',
  anast: '#B45309', warn: '#B91C1C', ok: '#15803D' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 398;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Transureteroureterostomy (TUU) &#8212; cross to the good ureter', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'anterior view: the donor ureter crosses the midline above the IMA to an end-to-side anastomosis with the healthy recipient', false));

const cx = 330;
// faint great vessels (aorta + IVC) with bifurcation
push(`<path d="M ${cx - 12} 96 L ${cx - 12} 250 L ${cx - 40} 320" fill="none" stroke="${C.vessel}" stroke-width="7" stroke-linecap="round" opacity="0.45"/>`);
push(`<path d="M ${cx + 12} 96 L ${cx + 12} 250 L ${cx + 40} 320" fill="none" stroke="${C.vessel}" stroke-width="7" stroke-linecap="round" opacity="0.3"/>`);
push(txt(cx, 90, 8.5, 600, C.vessel, 'middle', 'aorta / IVC'));
// IMA branch
push(`<line x1="${cx - 12}" y1="224" x2="${cx - 44}" y2="232" stroke="${C.vessel}" stroke-width="3" opacity="0.5"/>`);
push(txt(cx - 60, 232, 8, 600, C.vessel, 'end', 'IMA'));
// bifurcation marker + "cross cephalad to this" line
push(`<line x1="${cx - 70}" y1="246" x2="${cx + 70}" y2="246" stroke="${C.muted}" stroke-width="1" stroke-dasharray="3 4"/>`);
push(txt(cx + 74, 250, 8, 600, C.muted, 'start', 'aortic bifurcation'));

// kidneys (top)
for (const s of [-1, 1]) {
  const kx = cx + s * 150;
  push(`<path d="M ${kx + s * 12} 96 C ${kx + s * 30} 104, ${kx + s * 30} 150, ${kx + s * 10} 158 C ${kx - s * 12} 162, ${kx - s * 16} 110, ${kx + s * 12} 96 Z" fill="${C.kidney}" stroke="${C.kidneyEdge}" stroke-width="1.6" stroke-linejoin="round"/>`);
}
push(txt(cx - 150, 84, 8.5, 600, C.kidneyEdge, 'middle', 'kidney'));
push(txt(cx + 150, 84, 8.5, 600, C.kidneyEdge, 'middle', 'kidney'));

// bladder (bottom)
push(`<path d="M ${cx - 64} 392 C ${cx - 72} 344, ${cx + 72} 344, ${cx + 64} 392 C ${cx + 54} 414, ${cx - 54} 414, ${cx - 64} 392 Z" fill="${C.blad}" stroke="${C.bladEdge}" stroke-width="2" stroke-linejoin="round"/>`);
push(txt(cx, 384, 10, 700, C.bladEdge, 'middle', 'bladder'));

// recipient ureter (left, healthy, intact to bladder)
push(`<path d="M ${cx - 140} 156 C ${cx - 120} 210, ${cx - 70} 250, ${cx - 40} 320 C ${cx - 28} 350, ${cx - 22} 364, ${cx - 18} 372" fill="none" stroke="${C.recip}" stroke-width="4" stroke-linecap="round"/>`);
push(txt(cx - 150, 300, 9.5, 700, C.recip, 'middle', 'recipient'));
push(txt(cx - 150, 312, 9.5, 700, C.recip, 'middle', 'ureter'));
push(txt(cx - 150, 324, 8, 500, C.muted, 'middle', '(healthy)'));

// donor ureter (right): from right kidney down, then crosses midline above bifurcation
const anx = cx - 64, any = 232; // anastomosis point on recipient
push(`<path d="M ${cx + 140} 156 C ${cx + 120} 188, ${cx + 96} 206, ${cx + 60} 214 C ${cx + 10} 224, ${cx - 30} 226, ${anx} ${any}" fill="none" stroke="${C.donor}" stroke-width="4" stroke-linecap="round"/>`);
push(txt(cx + 116, 176, 9.5, 700, C.donor, 'middle', 'donor ureter'));
// donor distal stump (diseased segment removed) - ligated
push(`<path d="M ${cx + 140} 156 C ${cx + 138} 200, ${cx + 110} 250, ${cx + 84} 300" fill="none" stroke="${C.donor}" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 5" opacity="0.6"/>`);
push(`<line x1="${cx + 92} " y1="288" x2="${cx + 108}" y2="294" stroke="${C.warn}" stroke-width="2"/>`);
push(txt(cx + 120, 320, 8, 600, C.warn, 'middle', 'diseased distal'));
push(txt(cx + 120, 331, 8, 600, C.warn, 'middle', 'ureter excluded'));
// end-to-side anastomosis marker
push(`<circle cx="${anx}" cy="${any}" r="7" fill="none" stroke="${C.anast}" stroke-width="2.2"/>`);
push(txt(anx - 12, any - 10, 9, 700, C.anast, 'end', 'end-to-side'));
push(txt(anx - 12, any + 2, 9, 700, C.anast, 'end', 'anastomosis'));
// gentle-curve callout
push(txt(cx + 30, 196, 9, 700, C.ok, 'middle', 'gentle curve'));
push(txt(cx + 30, 207, 8, 500, C.muted, 'middle', 'no tension, no kink'));


const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Transureteroureterostomy in anterior view. The donor ureter from the affected side is mobilized and brought across the midline, cephalad to the inferior mesenteric artery and aortic bifurcation through a window in the sigmoid mesentery, in a gentle tension-free curve to an end-to-side anastomosis with the healthy recipient ureter, which continues intact to the bladder; the diseased distal donor ureter is excluded. Key: a salvage option when a long distal ureteral defect cannot reach the bladder and bladder-based repair is exhausted; contraindicated when disease threatens the recipient ureter such as stones, reflux, urothelial cancer, prior pelvic radiation, or retroperitoneal fibrosis, because the one good ureter must never be risked.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'tuu.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
