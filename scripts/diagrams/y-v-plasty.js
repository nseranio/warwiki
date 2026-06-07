#!/usr/bin/env node
/**
 * WARWIKI original schematic — Y-V plasty geometry.
 *
 * Y -> V advancement: a Y-shaped incision whose triangular flap slides distally
 * along the stem (without being lifted off its base), converting the wound to a
 * V and lengthening the tissue by the advancement distance x. Companion to the
 * Z-plasty figure.
 *
 * Output: static/img/diagrams/y-v-plasty.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', cut: '#334155', flap: '#DCE7F1', flapEdge: '#7FA3C4',
  suture: '#185FA5', axis: '#94A3B8', gain: '#15803D', arrow: '#0F766E' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 335;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.2" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 38, 16, 700, C.ink, 'start', 'Y-V plasty &#8212; advancement geometry', false));
push(txt(40, 57, 12.5, 500, C.muted, 'start', 'the triangular flap slides along the stem &#8212; the Y becomes a V and the tissue lengthens', false));

// ---- panel A: Y incision -------------------------------------------------
const ax = 188, cy = 168;
const AL = [ax - 50, cy - 54], AR = [ax + 50, cy - 54], J = [ax, cy], S = [ax, cy + 84];
// stem axis (dashed reference)
push(`<line x1="${ax}" y1="${cy - 78}" x2="${ax}" y2="${cy + 96}" stroke="${C.axis}" stroke-width="1" stroke-dasharray="3 4"/>`);
// flap
push(`<polygon points="${AL[0]},${AL[1]} ${AR[0]},${AR[1]} ${J[0]},${J[1]}" fill="${C.flap}" stroke="none"/>`);
// Y incision
push(`<path d="M ${AL[0]} ${AL[1]} L ${J[0]} ${J[1]} L ${AR[0]} ${AR[1]} M ${J[0]} ${J[1]} L ${S[0]} ${S[1]}" fill="none" stroke="${C.cut}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`);
push(txt(ax, cy - 30, 11, 700, C.flapEdge, 'middle', 'flap'));
push(txt(ax + 8, cy + 56, 10.5, 600, C.muted, 'start', 'stem'));
push(txt(ax, cy + 116, 13, 700, C.ink, 'middle', 'Y incision', false));

// ---- advancement arrow ---------------------------------------------------
push(`<line x1="312" y1="${cy}" x2="362" y2="${cy}" stroke="${C.arrow}" stroke-width="2.4" marker-end="url(#ar)"/>`);
push(txt(337, cy - 12, 10.5, 600, C.arrow, 'middle', 'advance', false));

// ---- panel B: V closure --------------------------------------------------
const bx = 500;
const x = 42; // advancement distance
const TL = [bx - 50, cy - 54], TR = [bx + 50, cy - 54], P = [bx, cy + x];
// original junction level (reference) + gain bracket
push(`<line x1="${bx - 70}" y1="${cy}" x2="${bx + 86}" y2="${cy}" stroke="${C.axis}" stroke-width="1" stroke-dasharray="3 4"/>`);
push(`<line x1="${bx}" y1="${cy - 78}" x2="${bx}" y2="${cy + 96}" stroke="${C.axis}" stroke-width="1" stroke-dasharray="3 4"/>`);
// advanced flap (now a V, inlaid lower)
push(`<polygon points="${TL[0]},${TL[1]} ${TR[0]},${TR[1]} ${P[0]},${P[1]}" fill="${C.flap}" stroke="none"/>`);
// V suture lines
push(`<path d="M ${TL[0]} ${TL[1]} L ${P[0]} ${P[1]} L ${TR[0]} ${TR[1]}" fill="none" stroke="${C.suture}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`);
push(`<path d="M ${P[0]} ${P[1]} L ${P[0]} ${cy + 84}" fill="none" stroke="${C.suture}" stroke-width="2.6" stroke-linecap="round"/>`);
// suture ticks along the V
for (let t = 0.25; t <= 0.8; t += 0.27) {
  const lx = TL[0] + (P[0] - TL[0]) * t, ly = TL[1] + (P[1] - TL[1]) * t;
  push(`<line x1="${f(lx - 4)}" y1="${f(ly - 4)}" x2="${f(lx + 4)}" y2="${f(ly + 4)}" stroke="${C.suture}" stroke-width="1.3"/>`);
  const rx = TR[0] + (P[0] - TR[0]) * t, ry = TR[1] + (P[1] - TR[1]) * t;
  push(`<line x1="${f(rx + 4)}" y1="${f(ry - 4)}" x2="${f(rx - 4)}" y2="${f(ry + 4)}" stroke="${C.suture}" stroke-width="1.3"/>`);
}
// lengthening bracket (gain x)
push(`<path d="M ${bx + 78} ${cy} L ${bx + 86} ${cy} M ${bx + 82} ${cy} L ${bx + 82} ${cy + x} M ${bx + 78} ${cy + x} L ${bx + 86} ${cy + x}" fill="none" stroke="${C.gain}" stroke-width="1.4"/>`);
push(txt(bx + 92, cy + x / 2 + 4, 11.5, 700, C.gain, 'start', '+ x'));
push(txt(bx, cy + 116, 13, 700, C.ink, 'middle', 'V closure', false));


const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Y-V plasty geometry: a Y-shaped incision with a triangular flap (panel A) whose flap advances distally along the stem so the wound closes as a V and the tissue lengthens by the advancement distance x (panel B), with a key noting it lengthens without undermining and is used for bladder-neck contracture, VUAS, Foley pyeloplasty, and meatoplasty.">
<defs>
<marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.arrow}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'y-v-plasty.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
