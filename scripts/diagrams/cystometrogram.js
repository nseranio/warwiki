#!/usr/bin/env node
/**
 * WARWIKI original schematic — multichannel filling cystometrogram.
 *
 * Diagrams-as-code: this script emits a self-contained, copyright-free SVG in
 * the WARWIKI house style (white figure card, brand-blue primary, muted axes,
 * white-haloed labels, leader-line callouts). Edit the channel models /
 * annotations below and re-run `node scripts/diagrams/cystometrogram.js`.
 *
 * Output: static/img/diagrams/cystometrogram.svg
 */
const fs = require('fs');
const path = require('path');

// ---- house-style palette -------------------------------------------------
const C = {
  ves: '#185FA5',      // Pves — WARWIKI brand blue (primary channel)
  abd: '#6B7280',      // Pabd — slate gray (reference channel)
  det: '#C0392B',      // Pdet — brick red (the diagnostic channel)
  grid: '#EAEDF1',
  axis: '#334155',
  muted: '#64748B',
  milestone: '#AEB7C2',
  border: '#E2E8F0',
  ink: '#1E293B',
};
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const HALO = '#FFFFFF';

// ---- geometry ------------------------------------------------------------
const W = 820, H = 480;
const PL = 98, PR = 760, PT = 72, PB = 398;   // plot box
const VMAX = 500, PMAX = 60;                   // axis ranges (mL, cmH2O)
const xOf = v => PL + (v / VMAX) * (PR - PL);
const yOf = p => PB - (p / PMAX) * (PB - PT);
const f = n => Number(n.toFixed(1));
const gauss = (v, c, w, a) => a * Math.exp(-((v - c) ** 2) / (2 * w * w));

// ---- channel models over filling volume ----------------------------------
// Pabd: stable baseline + respiration + a single cough provocation at 120 mL.
const pabd = v => 16 + v * 0.004 + 1.4 * Math.sin(v / 9) + gauss(v, 120, 6, 17);
// Pdet: normal compliance (gentle rise) + one phasic detrusor-overactivity wave.
const pdet = v => 2.8 + v * 0.005 + gauss(v, 384, 26, 20);
// Pves is what the bladder catheter measures = Pabd + Pdet.
const pves = v => pabd(v) + pdet(v);

const VEND = 480;                              // cystometric capacity
const trace = fn => {
  const pts = [];
  for (let v = 0; v <= VEND; v += 2) pts.push(`${f(xOf(v))},${f(yOf(fn(v)))}`);
  return pts.join(' ');
};

// ---- text + leader helpers ----------------------------------------------
const el = [];
const push = s => el.push(s);
// white-haloed text so labels stay legible over any trace
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="${HALO}" stroke-width="3.4" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}
// leader line drawn with a white casing first, then the colored stroke + arrow
function leader(d, color, marker) {
  return `<path d="${d}" fill="none" stroke="${HALO}" stroke-width="4.5" stroke-linecap="round"/>`
       + `<path d="${d}" fill="none" stroke="${color}" stroke-width="1.4" stroke-linecap="round" marker-end="url(#${marker})"/>`;
}

// ---- card + titles -------------------------------------------------------
push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(PL, 40, 16, 700, C.ink, 'start', 'Multichannel filling cystometrogram', false));
push(txt(PL, 59, 12.5, 600, C.muted, 'start', 'Pves &#8722; Pabd = Pdet', false));

// ---- gridlines + axes ----------------------------------------------------
for (let p = 0; p <= PMAX; p += 10) {
  const y = yOf(p);
  push(`<line x1="${PL}" y1="${f(y)}" x2="${PR}" y2="${f(y)}" stroke="${C.grid}" stroke-width="1"/>`);
  push(txt(PL - 10, y + 4, 11, 400, C.muted, 'end', String(p), false));
}
push(`<text transform="translate(${PL - 44},${(PT + PB) / 2}) rotate(-90)" text-anchor="middle" font-family="${FONT}" font-size="12" font-weight="600" fill="${C.axis}">Pressure (cm H&#8322;O)</text>`);
for (let v = 0; v <= VMAX; v += 100) {
  const x = xOf(v);
  push(`<line x1="${f(x)}" y1="${PB}" x2="${f(x)}" y2="${PB + 6}" stroke="${C.axis}" stroke-width="1"/>`);
  push(txt(x, PB + 22, 11, 400, C.muted, 'middle', String(v), false));
}
push(txt((PL + PR) / 2, PB + 44, 12, 600, C.axis, 'middle', 'Infused volume (mL)', false));
push(`<line x1="${PL}" y1="${PT}" x2="${PL}" y2="${PB}" stroke="${C.axis}" stroke-width="1.5"/>`);
push(`<line x1="${PL}" y1="${PB}" x2="${PR}" y2="${PB}" stroke="${C.axis}" stroke-width="1.5"/>`);

// ---- sensory milestones --------------------------------------------------
const miles = [[150, 'FSF'], [250, 'FDV'], [350, 'SDV'], [VEND, 'capacity']];
for (const [v, lab] of miles) {
  const x = xOf(v);
  push(`<line x1="${f(x)}" y1="${PT}" x2="${f(x)}" y2="${PB}" stroke="${C.milestone}" stroke-width="1" stroke-dasharray="2 4"/>`);
  push(txt(x, PT - 7, lab === 'capacity' ? 10.5 : 11, 600, C.muted, 'middle', lab));
}

// ---- traces --------------------------------------------------------------
push(`<polyline fill="none" stroke="${C.abd}" stroke-width="2" stroke-linejoin="round" points="${trace(pabd)}"/>`);
push(`<polyline fill="none" stroke="${C.det}" stroke-width="2.4" stroke-linejoin="round" points="${trace(pdet)}"/>`);
push(`<polyline fill="none" stroke="${C.ves}" stroke-width="2.4" stroke-linejoin="round" points="${trace(pves)}"/>`);

// channel end-labels (haloed)
push(txt(PR + 8, yOf(pves(VEND)) + 4, 13, 700, C.ves, 'start', 'Pves'));
push(txt(PR + 8, yOf(pabd(VEND)) - 6, 13, 700, C.abd, 'start', 'Pabd'));
push(txt(PR + 8, yOf(pdet(VEND)) + 5, 13, 700, C.det, 'start', 'Pdet'));

// ---- callout: cough (artifact rejected by subtraction) -------------------
push(leader(`M ${f(xOf(120))} 148 L ${f(xOf(120))} ${f(yOf(pves(120)) - 5)}`, C.muted, 'arrowMut'));
push(txt(150, 112, 12, 700, C.ink, 'start', 'Cough'));
push(txt(150, 127, 10.5, 400, C.muted, 'start', 'Pves &amp; Pabd rise together &#8212;'));
push(txt(150, 140, 10.5, 400, C.muted, 'start', 'Pdet stays flat (artifact rejected)'));

// ---- callout: detrusor overactivity --------------------------------------
const doApexX = xOf(384), doApexY = yOf(pdet(384));
push(leader(`M 582 134 C 598 172, 604 224, ${f(doApexX)} ${f(doApexY - 6)}`, C.det, 'arrowDet'));
push(txt(470, 112, 12, 700, C.det, 'start', 'Detrusor overactivity'));
push(txt(470, 127, 10.5, 400, C.muted, 'start', 'involuntary phasic Pdet rise &#177; urgency'));

// ---- assemble ------------------------------------------------------------
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Schematic multichannel filling cystometrogram showing Pves, Pabd and Pdet channels, sensory milestones, a cough artifact rejected by pressure subtraction, and a phasic detrusor-overactivity wave on Pdet.">
<defs>
<marker id="arrowMut" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.muted}"/></marker>
<marker id="arrowDet" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.det}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;

const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'cystometrogram.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
