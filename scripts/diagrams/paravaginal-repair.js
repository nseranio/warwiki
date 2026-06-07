#!/usr/bin/env node
/**
 * WARWIKI original schematic — paravaginal (lateral) defect and its repair.
 *
 * Axial view of anterior-compartment lateral support: the anterior vaginal
 * wall / pubocervical fascia is suspended between the two arcus tendineus
 * fasciae pelvis (ATFP, "white line"). A paravaginal defect = detachment from
 * the ATFP -> the lateral sulcus drops (lateral cystocele); paravaginal repair
 * re-suspends the lateral vaginal wall to the ATFP with sutures.
 *
 * Output: static/img/diagrams/paravaginal-repair.svg
 */
const fs = require('fs');
const path = require('path');

const C = {
  ink: '#1E293B', muted: '#64748B', border: '#E2E8F0',
  musc: '#E7C9C2', muscEdge: '#C18B82',          // levator / obturator internus
  atfp: '#F4F1E8', atfpEdge: '#A9A18C',          // arcus tendineus ("white line")
  fascia: '#C9A7B8', fasciaEdge: '#9A6B82',      // pubocervical fascia / vaginal wall
  bladder: '#CFE0F0', bladderEdge: '#7FA3C4',
  suture: '#185FA5', bad: '#B91C1C', ok: '#15803D',
};
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 396;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.2" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}
function leader(x1, y1, x2, y2) {
  push(`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${C.muted}" stroke-width="1"/>`);
}

// ===== frame + title =======================================================
push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Paravaginal defect and repair', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'axial view: the anterior vaginal wall hangs from the arcus tendineus (&#8220;white line&#8221;) on each pelvic sidewall', false));

const AY = 196; // ATFP level
function sidewalls(cx) {
  const lx = cx - 152, rx = cx + 152;
  push(`<path d="M ${lx} 120 C ${lx - 18} 200 ${lx - 4} 286 ${cx - 74} 320" fill="none" stroke="${C.musc}" stroke-width="14" stroke-linecap="round"/>`);
  push(`<path d="M ${rx} 120 C ${rx + 18} 200 ${rx + 4} 286 ${cx + 74} 320" fill="none" stroke="${C.musc}" stroke-width="14" stroke-linecap="round"/>`);
  return { lx: lx + 4, rx: rx - 4 };
}
function atfp(x) {
  push(`<circle cx="${x}" cy="${AY}" r="6.5" fill="${C.atfp}" stroke="${C.atfpEdge}" stroke-width="2"/>`);
}
function bladder(cx, sagLeft) {
  const dy = sagLeft ? 30 : 0;
  push(`<path d="M ${cx - 86} ${AY - 4} C ${cx - 92} ${AY - 64} ${cx + 92} ${AY - 64} ${cx + 86} ${AY - 4} C ${cx + 50} ${AY + 6} ${cx - 30} ${AY + 6 + dy} ${cx - 86} ${AY - 4 + dy * 0.6} Z" fill="${C.bladder}" fill-opacity="0.55" stroke="${C.bladderEdge}" stroke-width="1.8"/>`);
  push(txt(cx + 4, AY - 30, 9.5, 700, C.bladderEdge, 'middle', 'bladder'));
}

// ===== PANEL A: paravaginal defect ========================================
{
  const cx = 232;
  const { lx, rx } = sidewalls(cx);
  bladder(cx, true);
  // anterior vaginal wall: RIGHT attached, LEFT detached + drooping
  push(`<path d="M ${lx + 10} 250 C ${cx - 60} 252 ${cx - 30} 214 ${cx} 212 C ${cx + 36} 210 ${cx + 20} 200 ${rx - 4} ${AY}" fill="none" stroke="${C.fascia}" stroke-width="10" stroke-linecap="round"/>`);
  atfp(lx); atfp(rx);
  // detachment gap on the left
  push(`<path d="M ${lx + 4} ${AY + 6} L ${lx + 8} 244" fill="none" stroke="${C.bad}" stroke-width="1.6" stroke-dasharray="3 3"/>`);
  push(txt(lx - 8, 274, 9.5, 700, C.bad, 'middle', 'detached'));
  push(txt(lx + 2, 286, 9, 500, C.muted, 'middle', 'from ATFP'));
  push(txt(cx - 30, 286, 9.5, 700, C.bad, 'middle', 'lateral sulcus descends'));
  leader(cx - 30, 278, cx - 60, 250);
  push(txt(rx + 4, 176, 9, 700, C.ok, 'middle', 'intact'));
  push(txt(cx, 372, 12.5, 700, C.ink, 'middle', '1. Lateral (paravaginal) defect', false));
}

// ===== PANEL B: paravaginal repair ========================================
{
  const cx = 588;
  const { lx, rx } = sidewalls(cx);
  bladder(cx, false);
  // anterior vaginal wall re-suspended level to both ATFP
  push(`<path d="M ${lx + 8} ${AY + 2} C ${cx - 40} ${AY + 8} ${cx + 40} ${AY + 8} ${rx - 8} ${AY + 2}" fill="none" stroke="${C.fascia}" stroke-width="10" stroke-linecap="round"/>`);
  atfp(lx); atfp(rx);
  // re-attachment sutures (previously detached left side)
  for (let i = 0; i < 3; i++) {
    const sy = AY + 6 + i * 7;
    push(`<line x1="${lx + 2}" y1="${AY}" x2="${lx + 26}" y2="${sy}" stroke="${C.suture}" stroke-width="1.7"/>`);
    push(`<circle cx="${lx + 26}" cy="${sy}" r="1.8" fill="${C.suture}"/>`);
  }
  push(txt(lx - 6, 256, 9.5, 700, C.suture, 'middle', 'sutures:'));
  push(txt(lx + 6, 268, 9, 500, C.muted, 'middle', 'wall &#8594; ATFP'));
  push(txt(cx + 8, 262, 9.5, 700, C.ok, 'middle', 'lateral sulci restored'));
  push(txt(cx, 372, 12.5, 700, C.ink, 'middle', '2. Paravaginal repair', false));
}

// shared ATFP label across the top
push(txt(410, 92, 10.5, 700, C.atfpEdge, 'middle', 'arcus tendineus fascia pelvis ("white line")'));
push(txt(410, 105, 9, 500, C.muted, 'middle', 'the lateral anchor of the anterior vaginal wall'));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Paravaginal defect and repair in two axial panels. The anterior vaginal wall and pubocervical fascia normally hang between the two arcus tendineus fasciae pelvis, the white line, on each pelvic sidewall, supporting the bladder above. Panel 1: a paravaginal defect detaches the lateral vaginal wall from the ATFP on the left, so that lateral sulcus and the bladder descend as a lateral cystocele while the right side stays intact. Panel 2: paravaginal repair re-suspends the lateral vaginal wall to the ATFP with several sutures, restoring the lateral sulci and a level anterior wall.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'paravaginal-repair.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
