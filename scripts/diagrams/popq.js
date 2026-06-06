#!/usr/bin/env node
/**
 * WARWIKI original schematic — POP-Q six measurement points.
 *
 * Stylized midsagittal view (anterior left, superior up): the vaginal canal
 * with the six POP-Q points (Aa, Ba, C, D, Ap, Bp), the hymen as the zero
 * reference plane, the gh / pb / tvl landmarks, a "reading the points" key,
 * and a stage ruler relating leading-edge position to POP-Q stage.
 *
 * Output: static/img/diagrams/popq-points.svg
 */
const fs = require('fs');
const path = require('path');

const C = {
  blue: '#185FA5', ink: '#1E293B', axis: '#334155', muted: '#64748B',
  wall: '#475569', ctxFill: '#F8FAFC', ctxStroke: '#94A3B8',
  lumen: '#EEF3F8', hymen: '#C0392B', border: '#E2E8F0', panel: '#F8FAFC', panelBorder: '#EAEDF1',
};
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 900, H = 540;
const f = n => Number(n.toFixed(1));

const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.4" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}
function dot(x, y, label, lx, ly, anchor) {
  push(`<circle cx="${f(x)}" cy="${f(y)}" r="5" fill="${C.blue}" stroke="#FFFFFF" stroke-width="1.6"/>`);
  push(txt(lx, ly, 13, 700, C.blue, anchor, label));
}

// ---- card + titles -------------------------------------------------------
push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 40, 16, 700, C.ink, 'start', 'POP-Q &#8212; the six measurement points', false));
push(txt(40, 59, 12.5, 500, C.muted, 'start', 'all positions in cm relative to the hymen (0): negative = above (supported), positive = below (prolapsed)', false));

// ---- orientation ---------------------------------------------------------
push(txt(70, 100, 11.5, 600, C.muted, 'start', '&#8592; anterior', false));
push(txt(470, 100, 11.5, 600, C.muted, 'end', 'posterior &#8594;', false));

// ---- "reading the points" key (fills the upper-left, teaches) ------------
push(`<rect x="56" y="118" width="266" height="82" rx="8" fill="${C.panel}" stroke="${C.panelBorder}" stroke-width="1.2"/>`);
push(txt(70, 138, 11.5, 700, C.ink, 'start', 'Reading the points', false));
push(txt(70, 156, 10.8, 500, C.muted, 'start', 'Aa, Ap &#8212; fixed, 3 cm above hymen', false));
push(txt(70, 172, 10.8, 500, C.muted, 'start', 'Ba, Bp &#8212; lowest point, upper wall', false));
push(txt(70, 188, 10.8, 500, C.muted, 'start', 'C &#8212; cervix / cuff&#160;&#160;&#160;&#160;&#160;D &#8212; posterior fornix', false));

// ---- context anatomy (muted) --------------------------------------------
push(`<ellipse cx="178" cy="392" rx="15" ry="24" fill="${C.ctxFill}" stroke="${C.ctxStroke}" stroke-width="1.6"/>`);
push(txt(150, 392, 10.5, 500, C.muted, 'end', 'pubic', false));
push(txt(150, 405, 10.5, 500, C.muted, 'end', 'symphysis', false));
push(`<path d="M 205 392 C 201 408, 200 420, 200 431" fill="none" stroke="${C.ctxStroke}" stroke-width="3.4" stroke-linecap="round"/>`);
push(txt(193, 360, 10.5, 500, C.muted, 'end', 'urethra', false));
push(`<circle cx="322" cy="478" r="11" fill="${C.ctxFill}" stroke="${C.ctxStroke}" stroke-width="1.6"/>`);
push(txt(340, 482, 10.5, 500, C.muted, 'start', 'anus', false));

// ---- vaginal canal -------------------------------------------------------
const aWall = 'M 218 432 C 235 350, 270 250, 350 178';
const pWall = 'M 280 432 C 300 360, 330 250, 385 185';
const cervix = 'M 350 178 Q 367 162 385 185';
push(`<path d="M 218 432 C 235 350, 270 250, 350 178 Q 367 162 385 185 C 330 250, 300 360, 280 432 Z" fill="${C.lumen}" stroke="none"/>`);
push(`<path d="${aWall}" fill="none" stroke="${C.wall}" stroke-width="2.2" stroke-linecap="round"/>`);
push(`<path d="${pWall}" fill="none" stroke="${C.wall}" stroke-width="2.2" stroke-linecap="round"/>`);
push(`<path d="${cervix}" fill="none" stroke="${C.wall}" stroke-width="2.2" stroke-linecap="round"/>`);
push(txt(368, 146, 11, 600, C.muted, 'middle', 'cervix / cuff', false));

// ---- hymen reference plane ----------------------------------------------
push(`<line x1="168" y1="432" x2="600" y2="432" stroke="${C.hymen}" stroke-width="1.6" stroke-dasharray="6 4"/>`);
push(txt(174, 425, 11.5, 700, C.hymen, 'start', 'hymen = 0  (reference plane)'));

// ---- the six points ------------------------------------------------------
dot(239, 355, 'Aa', 224, 351, 'end');
dot(289, 249, 'Ba', 274, 245, 'end');
dot(350, 178, 'C', 342, 169, 'end');
dot(385, 185, 'D', 398, 181, 'start');
dot(301, 359, 'Ap', 316, 363, 'start');
dot(342, 253, 'Bp', 357, 249, 'start');

// ---- gh / pb / tvl landmarks --------------------------------------------
push(`<path d="M 200 447 L 200 453 L 280 453 L 280 447" fill="none" stroke="${C.axis}" stroke-width="1.3"/>`);
push(txt(240, 468, 11, 600, C.axis, 'middle', 'gh'));
push(`<path d="M 285 449 L 290 456 L 311 470" fill="none" stroke="${C.axis}" stroke-width="1.3" stroke-linejoin="round"/>`);
push(txt(305, 451, 11, 600, C.axis, 'start', 'pb'));
push(`<line x1="249" y1="430" x2="367" y2="183" stroke="${C.axis}" stroke-width="1.2" stroke-dasharray="3 3"/>`);
push(txt(322, 318, 11, 700, C.axis, 'start', 'tvl'));

// ---- stage ruler (right) -------------------------------------------------
const sx = 600, y0 = 432, cm = 19;
const yAt = v => y0 - v * cm;
const band = (vTop, vBot, fill, stroke, label, sub) => {
  const yt = yAt(vTop), yb = yAt(vBot);
  push(`<rect x="${sx - 14}" y="${f(yt)}" width="170" height="${f(yb - yt)}" fill="${fill}" opacity="0.6"/>`);
  push(txt(sx + 26, (yt + yb) / 2 - 4, 11.5, 700, stroke, 'start', label));
  push(txt(sx + 26, (yt + yb) / 2 + 11, 10, 500, C.muted, 'start', sub));
};
band(3.7, 1, '#DCFCE7', '#166534', 'Stage 0–I', 'above the hymen');
band(1, -1, '#FEF3C7', '#92400E', 'Stage II', 'within 1 cm of hymen');
band(-1, -2.7, '#FEE2E2', '#991B1B', 'Stage III–IV', 'at / beyond hymen');
push(`<line x1="${sx}" y1="${f(yAt(3.7))}" x2="${sx}" y2="${f(yAt(-2.7))}" stroke="${C.axis}" stroke-width="1.5"/>`);
for (let v = 3; v >= -2; v--) {
  const y = yAt(v);
  push(`<line x1="${sx - 4}" y1="${f(y)}" x2="${sx + 4}" y2="${f(y)}" stroke="${C.axis}" stroke-width="1.2"/>`);
  push(txt(sx - 9, y + 4, 10.5, v === 0 ? 700 : 400, v === 0 ? C.hymen : C.muted, 'end', v > 0 ? `+${v}` : String(v), false));
}
push(txt(sx, yAt(3.7) - 11, 10.5, 600, C.muted, 'middle', 'cm', false));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Stylized midsagittal schematic of the vaginal canal showing the six POP-Q points (Aa, Ba, C, D, Ap, Bp), the hymen as the zero reference plane, the genital hiatus, perineal body and total vaginal length landmarks, and a stage ruler relating leading-edge position to POP-Q stage.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'popq-points.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
