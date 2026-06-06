#!/usr/bin/env node
/**
 * WARWIKI original schematic — ICS / Abrams-Griffiths pressure-flow nomogram.
 *
 * Pdet@Qmax (y) vs Qmax (x) with the obstructed / equivocal / unobstructed
 * zones defined by the bladder outlet obstruction index
 * (BOOI = Pdet@Qmax - 2*Qmax; >=40 obstructed, <20 unobstructed), plus three
 * worked example points.
 *
 * Output: static/img/diagrams/pressure-flow-nomogram.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', axis: '#334155', muted: '#64748B', grid: '#EAEDF1', border: '#E2E8F0' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 760, H = 460;
const PL = 92, PR = 688, PT = 70, PB = 388;
const QMAX = 30, PMAX = 120;
const xOf = q => PL + (q / QMAX) * (PR - PL);
const yOf = p => PB - (p / PMAX) * (PB - PT);
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.4" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}
const pt = (q, p) => `${f(xOf(q))},${f(yOf(p))}`;

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(PL, 38, 16, 700, C.ink, 'start', 'Pressure-flow nomogram (ICS / Abrams-Griffiths)', false));
push(txt(PL, 57, 12.5, 500, C.muted, 'start', 'BOOI = Pdet@Qmax &#8722; 2 &#215; Qmax   ·   &#8805; 40 obstructed   ·   &lt; 20 unobstructed', false));

// zones (boundaries: Pdet = 2Q+40 and 2Q+20)
push(`<polygon points="${pt(0,0)} ${pt(30,0)} ${pt(30,80)} ${pt(0,20)}" fill="#DCFCE7" opacity="0.7"/>`);
push(`<polygon points="${pt(0,20)} ${pt(30,80)} ${pt(30,100)} ${pt(0,40)}" fill="#FEF3C7" opacity="0.7"/>`);
push(`<polygon points="${pt(0,40)} ${pt(30,100)} ${pt(30,120)} ${pt(0,120)}" fill="#FEE2E2" opacity="0.7"/>`);

// gridlines
for (let p = 0; p <= PMAX; p += 20) { const y = yOf(p); push(`<line x1="${PL}" y1="${f(y)}" x2="${PR}" y2="${f(y)}" stroke="${C.grid}" stroke-width="1"/>`); push(txt(PL - 9, y + 4, 10.5, 400, C.muted, 'end', String(p), false)); }
for (let q = 0; q <= QMAX; q += 5) { const x = xOf(q); push(`<line x1="${f(x)}" y1="${PB}" x2="${f(x)}" y2="${PB + 6}" stroke="${C.axis}" stroke-width="1"/>`); push(txt(x, PB + 22, 10.5, 400, C.muted, 'middle', String(q), false)); }

// boundary lines
push(`<line x1="${pt(0,40).split(',')[0]}" y1="${pt(0,40).split(',')[1]}" x2="${pt(30,100).split(',')[0]}" y2="${pt(30,100).split(',')[1]}" stroke="#B45309" stroke-width="1.6" stroke-dasharray="6 4"/>`);
push(`<line x1="${pt(0,20).split(',')[0]}" y1="${pt(0,20).split(',')[1]}" x2="${pt(30,80).split(',')[0]}" y2="${pt(30,80).split(',')[1]}" stroke="#15803D" stroke-width="1.6" stroke-dasharray="6 4"/>`);
push(txt(xOf(24.5), yOf(99), 10.5, 700, '#B45309', 'start', 'BOOI 40'));
push(txt(xOf(24.5), yOf(79), 10.5, 700, '#15803D', 'start', 'BOOI 20'));

// zone labels
push(txt(xOf(5.2), yOf(96), 13, 700, '#991B1B', 'start', 'Obstructed'));
push(txt(xOf(2.6), yOf(50), 13, 700, '#92400E', 'start', 'Equivocal'));
push(txt(xOf(15.5), yOf(20), 13, 700, '#166534', 'start', 'Unobstructed'));

// example points
const ex = [[7, 88, '#DC2626'], [12, 52, '#D97706'], [23, 30, '#16A34A']];
for (const [q, p, c] of ex) push(`<circle cx="${f(xOf(q))}" cy="${f(yOf(p))}" r="5.5" fill="${c}" stroke="#FFFFFF" stroke-width="1.6"/>`);

// axes + titles
push(`<line x1="${PL}" y1="${PT}" x2="${PL}" y2="${PB}" stroke="${C.axis}" stroke-width="1.5"/>`);
push(`<line x1="${PL}" y1="${PB}" x2="${PR}" y2="${PB}" stroke="${C.axis}" stroke-width="1.5"/>`);
push(`<text transform="translate(${PL - 46},${(PT + PB) / 2}) rotate(-90)" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="600" fill="${C.axis}">Pdet at Qmax (cm H&#8322;O)</text>`);
push(txt((PL + PR) / 2, PB + 44, 12, 600, C.axis, 'middle', 'Qmax (mL/s)', false));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="ICS Abrams-Griffiths pressure-flow nomogram plotting detrusor pressure at maximum flow against maximum flow rate, with obstructed, equivocal and unobstructed zones bounded by the BOOI 40 and BOOI 20 lines, and three example patient points.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'pressure-flow-nomogram.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
