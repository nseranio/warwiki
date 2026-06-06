#!/usr/bin/env node
/**
 * WARWIKI original schematic — uroflowmetry curve shapes.
 *
 * Flow rate vs time: a normal smooth bell-shaped curve vs the low, prolonged
 * plateau ("box") of bladder outlet obstruction, with Qmax markers and the
 * >= 15 mL/s adult-male reference.
 *
 * Output: static/img/diagrams/uroflowmetry.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', axis: '#334155', muted: '#64748B', grid: '#EAEDF1', border: '#E2E8F0', norm: '#185FA5', obs: '#C0392B' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 760, H = 440;
const PL = 86, PR = 690, PT = 70, PB = 366;
const TMAX = 40, QMAX = 30;
const xOf = t => PL + (t / TMAX) * (PR - PL);
const yOf = q => PB - (q / QMAX) * (PB - PT);
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.4" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}
const sig = x => 1 / (1 + Math.exp(-x));
const normal = t => 25 * Math.exp(-((t - 9) ** 2) / (2 * 5.2 ** 2)) * sig((t - 1.8) / 0.9);
const obstr = t => 8 * sig((t - 4) / 1.0) * sig((35 - t) / 1.5);
const trace = fn => { const p = []; for (let t = 0; t <= TMAX; t += 0.5) p.push(`${f(xOf(t))},${f(yOf(fn(t)))}`); return p.join(' '); };

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(PL, 38, 16, 700, C.ink, 'start', 'Uroflowmetry &#8212; normal vs obstructed', false));
push(txt(PL, 57, 12.5, 500, C.muted, 'start', 'the shape matters as much as the number: a smooth bell vs a low, prolonged plateau', false));

// gridlines
for (let q = 0; q <= QMAX; q += 10) { const y = yOf(q); push(`<line x1="${PL}" y1="${f(y)}" x2="${PR}" y2="${f(y)}" stroke="${C.grid}" stroke-width="1"/>`); push(txt(PL - 9, y + 4, 10.5, 400, C.muted, 'end', String(q), false)); }
for (let t = 0; t <= TMAX; t += 10) { const x = xOf(t); push(`<line x1="${f(x)}" y1="${PB}" x2="${f(x)}" y2="${PB + 6}" stroke="${C.axis}" stroke-width="1"/>`); push(txt(x, PB + 22, 10.5, 400, C.muted, 'middle', String(t), false)); }

// >=15 reference
push(`<line x1="${PL}" y1="${f(yOf(15))}" x2="${PR}" y2="${f(yOf(15))}" stroke="${C.muted}" stroke-width="1.1" stroke-dasharray="4 4"/>`);
push(txt(PR - 4, yOf(15) - 6, 10, 500, C.muted, 'end', '&#8805; 15 mL/s = normal adult-male Qmax', false));

// curves
push(`<polyline fill="none" stroke="${C.obs}" stroke-width="2.6" stroke-linejoin="round" points="${trace(obstr)}"/>`);
push(`<polyline fill="none" stroke="${C.norm}" stroke-width="2.6" stroke-linejoin="round" points="${trace(normal)}"/>`);

// Qmax markers
push(`<circle cx="${f(xOf(9))}" cy="${f(yOf(25))}" r="4.5" fill="${C.norm}" stroke="#FFFFFF" stroke-width="1.5"/>`);
push(txt(xOf(9) + 8, yOf(25) - 6, 11.5, 700, C.norm, 'start', 'Normal &#183; smooth bell'));
push(txt(xOf(9) + 8, yOf(25) + 9, 10.5, 500, C.muted, 'start', 'Qmax ~25 mL/s'));
push(`<circle cx="${f(xOf(18))}" cy="${f(yOf(8))}" r="4.5" fill="${C.obs}" stroke="#FFFFFF" stroke-width="1.5"/>`);
push(txt(xOf(20), yOf(8) - 8, 11.5, 700, C.obs, 'start', 'Obstruction &#183; low plateau'));
push(txt(xOf(20), yOf(8) + 7, 10.5, 500, C.muted, 'start', 'Qmax ~8 mL/s, prolonged'));

// axes + titles
push(`<line x1="${PL}" y1="${PT}" x2="${PL}" y2="${PB}" stroke="${C.axis}" stroke-width="1.5"/>`);
push(`<line x1="${PL}" y1="${PB}" x2="${PR}" y2="${PB}" stroke="${C.axis}" stroke-width="1.5"/>`);
push(`<text transform="translate(${PL - 46},${(PT + PB) / 2}) rotate(-90)" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="600" fill="${C.axis}">Flow rate (mL/s)</text>`);
push(txt((PL + PR) / 2, PB + 44, 12, 600, C.axis, 'middle', 'Time (s)', false));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Uroflowmetry curves comparing a normal smooth bell-shaped flow tracing peaking near 25 mL per second against the low prolonged plateau of bladder outlet obstruction peaking near 8 mL per second, with the 15 mL per second normal reference.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'uroflowmetry.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
