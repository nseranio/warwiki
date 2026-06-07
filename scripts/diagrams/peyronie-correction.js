#!/usr/bin/env node
/**
 * WARWIKI original schematic — Peyronie's curvature correction.
 *
 * The plaque sits on the concave (short) side. Two straightening strategies:
 * shorten the convex (long) side — plication / Nesbit — or lengthen the concave
 * side by incising the plaque and grafting the defect. Choice turns on curve
 * severity, penile length, and erectile rigidity.
 *
 * Output: static/img/diagrams/peyronie-correction.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', skin: '#F4E6DA', skinEdge: '#D8C3B6',
  plaque: '#B91C1C', suture: '#B45309', graft: '#185FA5', graftFill: '#DCE7F1', axis: '#94A3B8',
  ok: '#15803D', arrow: '#0F766E' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 860, H = 378;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}
const baseY = 312, topStraight = 122;

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', "Peyronie's curvature correction &#8212; shorten the long side or lengthen the short side", false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'the plaque is on the concave (short) side; straighten by plicating the convex side or grafting the concave side', false));

// ============ PANEL A: the deformity (curved) ============
const ax = 150;
// intended axis (dashed)
push(`<line x1="${ax}" y1="${baseY}" x2="${ax}" y2="${topStraight - 6}" stroke="${C.axis}" stroke-width="1.2" stroke-dasharray="4 4"/>`);
// curved shaft (bends left) - thick stroke
push(`<path d="M ${ax} ${baseY} Q ${ax} 210 ${ax - 36} 138" fill="none" stroke="${C.skin}" stroke-width="40" stroke-linecap="round"/>`);
push(`<path d="M ${ax} ${baseY} Q ${ax} 210 ${ax - 36} 138" fill="none" stroke="${C.skinEdge}" stroke-width="40" stroke-linecap="round" opacity="0.0"/>`);
// glans
push(`<circle cx="${ax - 36}" cy="134" r="15" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="1.4"/>`);
// plaque on concave (inner/left) side of the bend
push(`<path d="M ${ax - 20} 228 Q ${ax - 6} 196 ${ax - 26} 168" fill="none" stroke="${C.plaque}" stroke-width="6" stroke-linecap="round"/>`);
push(txt(ax - 44, 196, 9, 700, C.plaque, 'end', 'plaque'));
push(txt(ax - 44, 208, 8, 500, C.muted, 'end', '(concave /'));
push(txt(ax - 44, 219, 8, 500, C.muted, 'end', 'short side)'));
// convex side label
push(txt(ax + 30, 210, 9, 600, C.muted, 'start', 'convex /'));
push(txt(ax + 30, 221, 9, 600, C.muted, 'start', 'long side'));
// curvature angle
push(`<path d="M ${ax} 168 A 44 44 0 0 1 ${ax - 20} 150" fill="none" stroke="${C.axis}" stroke-width="1.2"/>`);
push(txt(ax + 6, 150, 9, 700, C.ink, 'start', 'curve'));
push(txt(ax, 338, 12, 700, C.ink, 'middle', '1. The deformity', false));

// ============ PANEL B: plication / Nesbit ============
const bx = 430;
push(`<path d="M ${bx} ${baseY} L ${bx} 150" fill="none" stroke="${C.skin}" stroke-width="40" stroke-linecap="round"/>`);
push(`<circle cx="${bx}" cy="150" r="15" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="1.4"/>`);
// plication sutures on the convex (right) side, shortening it
for (let i = 0; i < 3; i++) { const yy = 196 + i * 30; push(`<path d="M ${bx + 14} ${yy} q 12 6 0 12" fill="none" stroke="${C.suture}" stroke-width="2"/>`); push(`<circle cx="${bx + 18}" cy="${yy + 6}" r="2.4" fill="${C.suture}"/>`); }
push(`<line x1="${bx + 44}" y1="196" x2="${bx + 44}" y2="244" stroke="${C.suture}" stroke-width="1.2"/>`);
push(txt(bx + 50, 224, 9, 700, C.suture, 'start', 'convex side'));
push(txt(bx + 50, 235, 9, 700, C.suture, 'start', 'shortened'));
// straight result marker + "shorter"
push(`<line x1="${bx - 30}" y1="135" x2="${bx - 30}" y2="${baseY}" stroke="${C.ok}" stroke-width="1.2"/>`);
push(txt(bx - 36, 220, 10, 800, C.ok, 'end', '&#10003;'));
push(txt(bx, 338, 12, 700, C.ink, 'middle', '2. Plication / Nesbit', false));
push(txt(bx, 354, 9, 500, C.muted, 'middle', 'straight, slightly shorter', false));

// ============ PANEL C: incision + graft ============
const cx2 = 710;
push(`<path d="M ${cx2} ${baseY} L ${cx2} ${topStraight}" fill="none" stroke="${C.skin}" stroke-width="40" stroke-linecap="round"/>`);
push(`<circle cx="${cx2}" cy="${topStraight}" r="15" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="1.4"/>`);
// graft patch on the concave (left) side where plaque was incised
push(`<rect x="${cx2 - 24}" y="186" width="18" height="58" rx="6" fill="${C.graftFill}" stroke="${C.graft}" stroke-width="2.4"/>`);
for (let y = 196; y < 240; y += 12) push(`<line x1="${cx2 - 22}" y1="${y}" x2="${cx2 - 8}" y2="${y}" stroke="${C.graft}" stroke-width="0.9"/>`);
push(txt(cx2 - 30, 200, 9, 700, C.graft, 'end', 'graft'));
push(txt(cx2 - 30, 212, 8, 500, C.muted, 'end', 'lengthens'));
push(txt(cx2 - 30, 223, 8, 500, C.muted, 'end', 'concave side'));
push(txt(cx2 + 30, 215, 10, 800, C.ok, 'middle', '&#10003;'));
push(txt(cx2, 338, 12, 700, C.ink, 'middle', '3. Incision + graft', false));
push(txt(cx2, 354, 9, 500, C.muted, 'middle', 'straight, length preserved', false));

// ============ decision strip ============

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Peyronie's disease curvature correction in three panels. Panel 1, the deformity: the penis curves toward the plaque, which lies on the concave or short side, opposite the convex or long side. Panel 2, plication or Nesbit: sutures shorten the convex long side to match, straightening the penis but making it slightly shorter. Panel 3, incision plus graft: the plaque on the concave side is incised and the defect bridged with a graft, lengthening the short side and straightening the penis while preserving length. Decision: plication for curves up to about 60 degrees with good length and erections; incision or grafting for curves over about 60 degrees, hourglass deformity, or a short penis with good rigidity. Plication trades length for simplicity, grafting preserves length but raises de-novo erectile-dysfunction risk, and a penile prosthesis is added when erectile function is inadequate.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'peyronie-correction.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
