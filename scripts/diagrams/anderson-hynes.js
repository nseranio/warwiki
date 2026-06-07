#!/usr/bin/env node
/**
 * WARWIKI original schematic — Anderson-Hynes dismembered pyeloplasty.
 *
 * The reference operation for ureteropelvic junction obstruction: excise the
 * diseased UPJ, spatulate the ureter laterally, trim the redundant pelvis,
 * and rebuild a dependent funnel anastomosis transposed anterior to any
 * lower-pole crossing vessel. Three panels: obstructed -> dismember/spatulate
 * -> dependent-funnel anastomosis over a double-J stent.
 *
 * Output: static/img/diagrams/anderson-hynes.svg
 */
const fs = require('fs');
const path = require('path');

const C = {
  ink: '#1E293B', muted: '#64748B', border: '#E2E8F0',
  wall: '#475569', kidney: '#EFF2F6',
  lumen: '#E2ECF5', lumenEdge: '#7FA3C4',
  cut: '#334155', suture: '#185FA5',
  vessel: '#B91C1C', excise: '#FBE4E4', exciseEdge: '#C0504D',
  arrow: '#0F766E', gain: '#15803D', stent: '#7C3AED',
};
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 408;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.2" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

// shared vertical levels
const TOP = 112, NECK = 214, BOT = 322;

// faint kidney mass behind the pelvis
function kidney(cx) {
  push(`<ellipse cx="${cx}" cy="158" rx="86" ry="74" fill="${C.kidney}"/>`);
}

// renal pelvis funnel: dome top, sides converging to a neck (the UPJ)
function pelvis(cx, halfW, neckHalf, fill, edge, dash) {
  const TL = cx - halfW, TR = cx + halfW, nL = cx - neckHalf, nR = cx + neckHalf;
  const d = `M ${TL} ${TOP}
    C ${cx - halfW} ${TOP - 24} ${cx + halfW} ${TOP - 24} ${TR} ${TOP}
    C ${TR} ${TOP + 36} ${nR + 16} ${NECK - 28} ${nR} ${NECK}
    L ${nL} ${NECK}
    C ${nL - 16} ${NECK - 28} ${TL} ${TOP + 36} ${TL} ${TOP} Z`;
  const da = dash ? ` stroke-dasharray="5 4"` : '';
  push(`<path d="${d}" fill="${fill}" stroke="${edge}" stroke-width="2.4" stroke-linejoin="round"${da}/>`);
  // two calyx hints on the dome
  push(`<ellipse cx="${cx - 30}" cy="${TOP - 8}" rx="13" ry="9" fill="${fill}" stroke="${edge}" stroke-width="1.8"/>`);
  push(`<ellipse cx="${cx + 30}" cy="${TOP - 8}" rx="13" ry="9" fill="${fill}" stroke="${edge}" stroke-width="1.8"/>`);
}

// straight ureter tube from y0 to y1
function ureter(cx, y0, y1, half, fill, edge) {
  push(`<rect x="${cx - half}" y="${y0}" width="${2 * half}" height="${y1 - y0}" fill="${fill}" stroke="none"/>`);
  push(`<line x1="${cx - half}" y1="${y0}" x2="${cx - half}" y2="${y1}" stroke="${edge}" stroke-width="2.2"/>`);
  push(`<line x1="${cx + half}" y1="${y0}" x2="${cx + half}" y2="${y1}" stroke="${edge}" stroke-width="2.2"/>`);
}

// spatulated ureter: wide fish-mouth at top tapering to a tube
function spatula(cx, mouthHalf, tubeHalf, y0, y1, fill, edge) {
  const taper = y0 + 56;
  const d = `M ${cx - mouthHalf} ${y0}
    C ${cx - mouthHalf} ${y0 + 30} ${cx - tubeHalf} ${taper - 18} ${cx - tubeHalf} ${taper}
    L ${cx - tubeHalf} ${y1}
    L ${cx + tubeHalf} ${y1}
    L ${cx + tubeHalf} ${taper}
    C ${cx + tubeHalf} ${taper - 18} ${cx + mouthHalf} ${y0 + 30} ${cx + mouthHalf} ${y0} Z`;
  push(`<path d="${d}" fill="${fill}" stroke="${edge}" stroke-width="2.2" stroke-linejoin="round"/>`);
}

// crossing lower-pole vessel (gentle diagonal red tube)
function vessel(cx, behind) {
  const op = behind ? 0.55 : 1;
  push(`<path d="M ${cx - 96} ${NECK + 26} C ${cx - 40} ${NECK + 14} ${cx + 34} ${NECK - 16} ${cx + 96} ${NECK - 30}" fill="none" stroke="${C.vessel}" stroke-width="9" stroke-linecap="round" opacity="${op}"/>`);
  push(`<path d="M ${cx - 96} ${NECK + 26} C ${cx - 40} ${NECK + 14} ${cx + 34} ${NECK - 16} ${cx + 96} ${NECK - 30}" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-dasharray="1 9" opacity="${op}"/>`);
}

function scissors(x, y, rot) {
  return `<g transform="translate(${x} ${y}) rotate(${rot})" stroke="${C.cut}" stroke-width="1.7" fill="none" stroke-linecap="round">
    <circle cx="-6.5" cy="9.5" r="4.2"/><circle cx="6.5" cy="9.5" r="4.2"/>
    <path d="M -6.5 5.5 L 7 -15"/><path d="M 6.5 5.5 L -7 -15"/></g>`;
}

function arrow(x1, x2, y, label) {
  push(`<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${C.arrow}" stroke-width="2.6" marker-end="url(#ah)"/>`);
  push(txt((x1 + x2) / 2, y - 10, 10.5, 600, C.arrow, 'middle', label, false));
}

// ===== frame + title =======================================================
push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Anderson-Hynes dismembered pyeloplasty', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'excise the diseased junction, spatulate the ureter, and rebuild a dependent funnel anterior to the crossing vessel', false));

const AX = 150, BX = 410, CX = 668;

// ===== Panel A: obstructed UPJ ============================================
kidney(AX);
pelvis(AX, 72, 6, C.lumen, C.lumenEdge, false);
ureter(AX, NECK, BOT, 8, C.lumen, C.lumenEdge);
vessel(AX, false);
// pinched UPJ marker
push(`<ellipse cx="${AX}" cy="${NECK}" rx="26" ry="18" fill="none" stroke="${C.vessel}" stroke-width="1.4" stroke-dasharray="3 3"/>`);
push(txt(AX, TOP - 24, 11, 700, C.ink, 'middle', 'dilated pelvis'));
push(txt(AX + 30, NECK + 44, 10, 600, C.vessel, 'middle', 'crossing vessel'));
push(txt(AX, NECK + 70, 10.5, 700, C.vessel, 'middle', 'obstructed UPJ'));

// ===== Panel B: dismember + spatulate =====================================
kidney(BX);
// trimmed-back pelvis (neck removed); dashed trim line low on the pelvis
pelvis(BX, 70, 30, C.lumen, C.lumenEdge, false);
push(`<line x1="${BX - 58}" y1="${NECK - 8}" x2="${BX + 58}" y2="${NECK - 8}" stroke="${C.cut}" stroke-width="1.7" stroke-dasharray="6 4"/>`);
push(txt(BX, NECK - 16, 9.5, 600, C.cut, 'middle', 'trim redundant pelvis'));
// excised diseased segment (faded, hatched) sitting in the gap
push(`<rect x="${BX - 14}" y="${NECK + 6}" width="28" height="34" rx="5" fill="${C.excise}" stroke="${C.exciseEdge}" stroke-width="1.4" stroke-dasharray="4 3"/>`);
push(txt(BX + 70, NECK + 18, 9.5, 600, C.exciseEdge, 'middle', 'excise'));
push(txt(BX + 70, NECK + 30, 9.5, 600, C.exciseEdge, 'middle', 'diseased UPJ'));
push(scissors(BX - 40, NECK + 12, -28));
// spatulated ureter below the excision
spatula(BX, 24, 8, NECK + 52, BOT, C.lumen, C.lumenEdge);
// lateral spatulation cut line
push(`<line x1="${BX - 22}" y1="${NECK + 56}" x2="${BX - 9}" y2="${NECK + 104}" stroke="${C.cut}" stroke-width="1.8"/>`);
push(txt(BX - 56, NECK + 86, 9.5, 600, C.cut, 'middle', 'spatulate'));
push(txt(BX - 52, NECK + 98, 9.5, 600, C.cut, 'middle', 'laterally'));

// ===== Panel C: dependent funnel anastomosis ==============================
kidney(CX);
vessel(CX, true); // vessel now posterior
// trimmed dependent pelvis: smaller body, wide funnel neck
pelvis(CX, 52, 26, C.lumen, C.lumenEdge, false);
// spatulated ureter meeting the funnel — anastomosis zone
spatula(CX, 25, 8, NECK + 2, BOT, C.lumen, C.lumenEdge);
// suture ticks across the funnel-to-spatula join
const aZ = NECK + 6;
for (let i = 0; i < 6; i++) {
  const t = i / 5;
  const px = CX - 25 + 50 * t;
  const py = aZ + Math.sin(t * Math.PI) * 6;
  push(`<line x1="${f(px)}" y1="${f(py - 5)}" x2="${f(px)}" y2="${f(py + 5)}" stroke="${C.suture}" stroke-width="1.8"/>`);
}
// apical stitch highlighted at the dependent corner
push(`<circle cx="${CX}" cy="${NECK + 16}" r="4.6" fill="${C.suture}"/>`);
push(`<line x1="${CX + 6}" y1="${NECK + 16}" x2="${CX + 52}" y2="${NECK + 30}" stroke="${C.suture}" stroke-width="1.1"/>`);
push(txt(CX + 56, NECK + 33, 9.5, 700, C.suture, 'start', 'apical stitch'));
// double-J stent: pigtail curl in pelvis + line down ureter
push(`<path d="M ${CX - 4} ${BOT} L ${CX - 4} ${TOP + 22} C ${CX - 4} ${TOP + 6} ${CX + 16} ${TOP + 6} ${CX + 16} ${TOP + 22} C ${CX + 16} ${TOP + 34} ${CX + 2} ${TOP + 32} ${CX + 4} ${TOP + 40}" fill="none" stroke="${C.stent}" stroke-width="1.8" stroke-linecap="round"/>`);
push(txt(CX - 60, TOP + 6, 9.5, 700, C.stent, 'middle', 'double-J'));
push(txt(CX - 58, TOP + 18, 9.5, 700, C.stent, 'middle', 'stent'));
// vessel-transposition note
push(txt(CX, NECK + 70, 9.5, 600, C.vessel, 'middle', 'ureter anterior'));
push(txt(CX, NECK + 81, 9.5, 600, C.vessel, 'middle', 'to vessel'));

// ===== transform arrows + step labels =====================================
arrow(228, 300, NECK, 'dismember');
arrow(498, 588, NECK, 'reconstruct');

push(txt(AX, 372, 12.5, 700, C.ink, 'middle', '1. Obstructed UPJ', false));
push(txt(BX, 372, 12.5, 700, C.ink, 'middle', '2. Dismember &#38; spatulate', false));
push(txt(CX, 372, 12.5, 700, C.ink, 'middle', '3. Dependent-funnel anastomosis', false));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Anderson-Hynes dismembered pyeloplasty in three panels. Panel 1: an obstructed ureteropelvic junction with a dilated renal pelvis, a pinched UPJ, and a lower-pole crossing vessel compressing it. Panel 2: the diseased UPJ segment is excised, the redundant pelvis trimmed along a dashed line, and the ureter spatulated along its lateral wall. Panel 3: a dependent funnel anastomosis is sewn from the spatulated ureter to the most dependent corner of the trimmed pelvis with an apical stitch, drained by a double-J stent, with the ureter transposed anterior to the crossing vessel.">
<defs>
<marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.arrow}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'anderson-hynes.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
