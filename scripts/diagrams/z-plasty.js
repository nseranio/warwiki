#!/usr/bin/env node
/**
 * WARWIKI original schematic — Z-plasty geometry.
 *
 * The classic 60-degree Z-plasty: central limb along the scar, two equal limbs
 * forming triangular flaps that transpose to lengthen the central axis and
 * rotate the scar 90 degrees, with an angle -> lengthening reference.
 *
 * Output: static/img/diagrams/z-plasty.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', axis: '#334155', muted: '#64748B', border: '#E2E8F0', scar: '#185FA5', flapA: '#DCE7F1', flapB: '#FCE9CD', limb: '#475569', arrow: '#0F766E' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 760, H = 430;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.3" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 40, 16, 700, C.ink, 'start', 'Z-plasty &#8212; transposition geometry', false));
push(txt(40, 59, 12.5, 500, C.muted, 'start', 'two triangular flaps swap across the central limb: the scar reorients 90&#176; and the central axis lengthens', false));

// ---- geometry ------------------------------------------------------------
const a = 92, cx = 240, cy = 236;
const B = [cx, cy - a / 2], Cc = [cx, cy + a / 2];
const A = [cx - 0.866 * a, cy - a], D = [cx + 0.866 * a, cy + a];
const P = p => `${f(p[0])},${f(p[1])}`;

// original contracture axis (dashed, vertical through central limb)
push(`<line x1="${cx}" y1="${cy - a - 18}" x2="${cx}" y2="${cy + a + 18}" stroke="${C.muted}" stroke-width="1" stroke-dasharray="3 4"/>`);

// flaps
push(`<polygon points="${P(A)} ${P(B)} ${P(Cc)}" fill="${C.flapA}" stroke="none"/>`);
push(`<polygon points="${P(B)} ${P(Cc)} ${P(D)}" fill="${C.flapB}" stroke="none"/>`);
// limbs
push(`<line x1="${P(A).split(',')[0]}" y1="${P(A).split(',')[1]}" x2="${P(B).split(',')[0]}" y2="${P(B).split(',')[1]}" stroke="${C.limb}" stroke-width="2.4" stroke-linecap="round"/>`);
push(`<line x1="${P(Cc).split(',')[0]}" y1="${P(Cc).split(',')[1]}" x2="${P(D).split(',')[0]}" y2="${P(D).split(',')[1]}" stroke="${C.limb}" stroke-width="2.4" stroke-linecap="round"/>`);
// central limb (scar)
push(`<line x1="${cx}" y1="${f(B[1])}" x2="${cx}" y2="${f(Cc[1])}" stroke="${C.scar}" stroke-width="3.4" stroke-linecap="round"/>`);

// flap labels + angle
push(txt(A[0] + 18, (A[1] + B[1]) / 2 - 4, 13, 700, C.scar, 'middle', 'a'));
push(txt(D[0] - 18, (Cc[1] + D[1]) / 2 + 8, 13, 700, '#B45309', 'middle', 'b'));
push(txt(B[0] - 12, B[1] + 20, 11, 600, C.muted, 'end', '60&#176;'));
push(txt(Cc[0] + 12, Cc[1] - 12, 11, 600, C.muted, 'start', '60&#176;'));
push(txt(cx + 8, cy + 3, 10.5, 600, C.scar, 'start', 'central limb'));
push(txt(cx + 8, cy + 17, 10, 500, C.muted, 'start', '(the scar)'));

// transposition arrows (flaps swap across the central limb)
push(`<path d="M ${f(A[0] + 14)} ${f(A[1] + 26)} C ${f(cx - 4)} ${f(cy - 30)}, ${f(cx + 36)} ${f(cy - 34)}, ${f(cx + 30)} ${f(cy - 12)}" fill="none" stroke="${C.arrow}" stroke-width="1.6" marker-end="url(#az)"/>`);
push(`<path d="M ${f(D[0] - 14)} ${f(D[1] - 26)} C ${f(cx + 4)} ${f(cy + 30)}, ${f(cx - 36)} ${f(cy + 34)}, ${f(cx - 30)} ${f(cy + 12)}" fill="none" stroke="${C.arrow}" stroke-width="1.6" marker-end="url(#az)"/>`);

// result note under the design
push(txt(cx, cy + a + 40, 11.5, 600, C.arrow, 'middle', 'flaps transpose &#8594; scar rotates 90&#176;,'));
push(txt(cx, cy + a + 56, 11.5, 600, C.arrow, 'middle', 'central axis lengthens'));

// ---- angle -> lengthening reference (right) ------------------------------
const rx = 470, ry = 110;
push(`<rect x="${rx}" y="${ry}" width="252" height="206" rx="10" fill="#F8FAFC" stroke="#EAEDF1" stroke-width="1.2"/>`);
push(txt(rx + 20, ry + 28, 12.5, 700, C.ink, 'start', 'Limb angle &#8594; lengthening', false));
push(txt(rx + 20, ry + 44, 10.5, 500, C.muted, 'start', 'theoretical gain along the central axis', false));
const rows = [['30&#176;', '25%'], ['45&#176;', '50%'], ['60&#176;', '75%'], ['75&#176;', '100%'], ['90&#176;', '120%']];
rows.forEach((r, i) => {
  const y = ry + 70 + i * 24;
  const hot = r[0].startsWith('60');
  if (hot) push(`<rect x="${rx + 12}" y="${y - 15}" width="228" height="22" rx="5" fill="#DCFCE7"/>`);
  push(txt(rx + 26, y, 12, hot ? 700 : 500, hot ? '#166534' : C.axis, 'start', r[0], false));
  push(txt(rx + 120, y, 12, hot ? 700 : 500, hot ? '#166534' : C.axis, 'start', r[1], false));
});
push(txt(rx + 20, ry + 196, 10, 500, C.muted, 'start', '60&#176; is the workhorse (50&#8211;70% clinically)', false));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Z-plasty geometry: a central limb along the scar with two 60-degree triangular flaps that transpose across it, rotating the scar 90 degrees and lengthening the central axis, with a reference table of limb angle versus theoretical lengthening.">
<defs>
<marker id="az" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.arrow}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'z-plasty.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
