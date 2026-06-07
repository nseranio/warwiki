#!/usr/bin/env node
/**
 * WARWIKI original schematic — antireflux ureteral reimplantation techniques.
 *
 * Three classic submucosal-tunnel designs that build the flap-valve:
 *  - Cohen cross-trigonal (intravesical): tunnel across the trigone to the
 *    contralateral wall.
 *  - Politano-Leadbetter (intravesical): new superolateral hiatus, tunnel down
 *    to a trigonal neo-orifice.
 *  - Lich-Gregoir (extravesical): detrusor trough closed over the ureter at the
 *    native orifice.
 * All share the ~4-5:1 tunnel-length-to-ureter-diameter antireflux target.
 *
 * Output: static/img/diagrams/reimplant-techniques.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', blad: '#F2F6FA', bladEdge: '#4F6F92',
  trig: '#E2ECF5', trigEdge: '#9DB6CE', tunnel: '#DCE7F1', tunnelEdge: '#7FA3C4', ureter: '#185FA5',
  detr: '#E7D9CB', detrEdge: '#B99873', muc: '#C6485B', suture: '#B45309', x: '#B91C1C', neck: '#64748B' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 880, H = 392;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.1" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Antireflux ureteral reimplantation &#8212; three classic tunnels', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'each builds a submucosal flap-valve to a ~4&#8211;5:1 tunnel-length-to-ureter-diameter target', false));

const topY = 84, botY = 312;
// reusable bladder + trigone (interior posterior-wall view)
function bladderTrigone(cx) {
  push(`<path d="M ${cx - 92} ${botY - 30} C ${cx - 104} ${topY + 30}, ${cx - 50} ${topY}, ${cx} ${topY} C ${cx + 50} ${topY}, ${cx + 104} ${topY + 30}, ${cx + 92} ${botY - 30} C ${cx + 80} ${botY + 12}, ${cx - 80} ${botY + 12}, ${cx - 92} ${botY - 30} Z" fill="${C.blad}" stroke="${C.bladEdge}" stroke-width="2.2" stroke-linejoin="round"/>`);
  // trigone triangle: orifices top corners, bladder neck apex bottom
  const oL = [cx - 50, topY + 64], oR = [cx + 50, topY + 64], neck = [cx, botY - 8];
  push(`<polygon points="${oL[0]},${oL[1]} ${oR[0]},${oR[1]} ${neck[0]},${neck[1]}" fill="${C.trig}" stroke="${C.trigEdge}" stroke-width="1.3" stroke-dasharray="4 3"/>`);
  // bladder neck
  push(`<circle cx="${neck[0]}" cy="${neck[1]}" r="6" fill="#FFFFFF" stroke="${C.neck}" stroke-width="1.6"/>`);
  push(txt(neck[0], neck[1] + 20, 9, 500, C.muted, 'middle', 'bladder neck'));
  return { oL, oR, neck };
}
function orifice(p, label, side) {
  push(`<circle cx="${p[0]}" cy="${p[1]}" r="5" fill="#FFFFFF" stroke="${C.ureter}" stroke-width="1.8"/>`);
  if (label) push(txt(p[0] + (side === 'L' ? -10 : 10), p[1] - 9, 8.5, 600, C.muted, side === 'L' ? 'end' : 'start', label));
}

// ============ PANEL 1: Cohen cross-trigonal ============
const c1 = 168;
const t1 = bladderTrigone(c1);
// left orifice native
orifice(t1.oL, 'native', 'L');
// ureter entering at right hiatus then crossing to a new contralateral orifice
const neo1 = [c1 - 64, t1.oR[1] + 18];
push(`<path d="M ${t1.oR[0]} ${t1.oR[1]} Q ${c1} ${t1.oR[1] - 18}, ${neo1[0]} ${neo1[1]}" fill="none" stroke="${C.tunnelEdge}" stroke-width="12" stroke-linecap="round" opacity="0.55"/>`);
push(`<path d="M ${t1.oR[0]} ${t1.oR[1]} Q ${c1} ${t1.oR[1] - 18}, ${neo1[0]} ${neo1[1]}" fill="none" stroke="${C.ureter}" stroke-width="2.6" stroke-linecap="round"/>`);
push(`<path d="M ${t1.oR[0] + 26} ${t1.oR[1] - 22} Q ${t1.oR[0] + 6} ${t1.oR[1] - 6}, ${t1.oR[0]} ${t1.oR[1]}" fill="none" stroke="${C.ureter}" stroke-width="2.6" stroke-linecap="round"/>`);
orifice(neo1, '', 'L');
push(txt(neo1[0] - 8, neo1[1] + 4, 8.5, 600, C.muted, 'end', 'neo-orifice'));
push(txt(c1, t1.oR[1] - 30, 9.5, 700, C.tunnelEdge, 'middle', 'cross-trigonal tunnel'));
push(txt(c1, 350, 13, 700, C.ink, 'middle', 'Cohen', false));
push(txt(c1, 366, 9.5, 500, C.muted, 'middle', 'cross-trigonal (intravesical)', false));

// ============ PANEL 2: Politano-Leadbetter ============
const c2 = 440;
const t2 = bladderTrigone(c2);
orifice(t2.oL, 'native', 'L');
// old right orifice closed (x)
push(txt(t2.oR[0] + 2, t2.oR[1] + 1, 12, 800, C.x, 'middle', '&#215;'));
push(txt(t2.oR[0] + 10, t2.oR[1] - 9, 8.5, 600, C.x, 'start', 'old hiatus'));
// new superolateral hiatus (higher, lateral)
const hiat2 = [c2 + 70, topY + 28];
push(`<circle cx="${hiat2[0]}" cy="${hiat2[1]}" r="4.5" fill="#FFFFFF" stroke="${C.ureter}" stroke-width="1.8"/>`);
push(txt(hiat2[0] + 8, hiat2[1] - 4, 8.5, 600, C.muted, 'start', 'new hiatus'));
// tunnel down to a trigonal neo-orifice (medial/inferior)
const neo2 = [c2 + 8, t2.oR[1] + 30];
push(`<path d="M ${hiat2[0]} ${hiat2[1]} Q ${c2 + 50} ${t2.oR[1]}, ${neo2[0]} ${neo2[1]}" fill="none" stroke="${C.tunnelEdge}" stroke-width="12" stroke-linecap="round" opacity="0.55"/>`);
push(`<path d="M ${hiat2[0]} ${hiat2[1]} Q ${c2 + 50} ${t2.oR[1]}, ${neo2[0]} ${neo2[1]}" fill="none" stroke="${C.ureter}" stroke-width="2.6" stroke-linecap="round"/>`);
// ureter entering at new hiatus from outside
push(`<path d="M ${hiat2[0] + 24} ${hiat2[1] - 18} Q ${hiat2[0] + 6} ${hiat2[1] - 6}, ${hiat2[0]} ${hiat2[1]}" fill="none" stroke="${C.ureter}" stroke-width="2.6" stroke-linecap="round"/>`);
orifice(neo2, '', 'R');
push(txt(neo2[0] - 6, neo2[1] + 14, 8.5, 600, C.muted, 'middle', 'neo-orifice'));
push(txt(c2 + 64, t2.oR[1] + 4, 9.5, 700, C.tunnelEdge, 'middle', 'tunnel'));
push(txt(c2, 350, 13, 700, C.ink, 'middle', 'Politano-Leadbetter', false));
push(txt(c2, 366, 9.5, 500, C.muted, 'middle', 'new hiatus, intravesical', false));

// ============ PANEL 3: Lich-Gregoir (extravesical) ============
const c3 = 712;
// bladder seen from OUTSIDE
push(`<path d="M ${c3 - 92} ${botY - 30} C ${c3 - 104} ${topY + 30}, ${c3 - 50} ${topY}, ${c3} ${topY} C ${c3 + 50} ${topY}, ${c3 + 104} ${topY + 30}, ${c3 + 92} ${botY - 30} C ${c3 + 80} ${botY + 12}, ${c3 - 80} ${botY + 12}, ${c3 - 92} ${botY - 30} Z" fill="${C.blad}" stroke="${C.bladEdge}" stroke-width="2.2" stroke-linejoin="round"/>`);
push(txt(c3 - 44, topY + 30, 9, 500, C.muted, 'middle', 'serosa'));
// detrusor trough (incision), ureter lying in it, detrusor closed over distal half
const tx0 = c3 - 18, ty0 = topY + 36, ty1 = botY - 36;
// open detrusor edges (upper half)
push(`<path d="M ${tx0 - 16} ${ty0} L ${tx0 - 16} ${ty0 + 80}" fill="none" stroke="${C.detrEdge}" stroke-width="2"/>`);
push(`<path d="M ${tx0 + 16} ${ty0} L ${tx0 + 16} ${ty0 + 80}" fill="none" stroke="${C.detrEdge}" stroke-width="2"/>`);
push(`<rect x="${tx0 - 16}" y="${ty0}" width="32" height="80" fill="${C.muc}" opacity="0.18"/>`);
// ureter laid in the trough
push(`<path d="M ${tx0 + 30} ${topY + 6} Q ${tx0 + 6} ${ty0 + 14}, ${tx0} ${ty0 + 40} L ${tx0} ${ty1}" fill="none" stroke="${C.ureter}" stroke-width="3" stroke-linecap="round"/>`);
push(txt(tx0 + 40, topY + 8, 9.5, 700, C.ureter, 'start', 'ureter'));
// detrusor closed over distal ureter (lower half) with suture ticks
push(`<rect x="${tx0 - 17}" y="${ty0 + 80}" width="34" height="${ty1 - ty0 - 80}" rx="6" fill="${C.detr}" stroke="${C.detrEdge}" stroke-width="1.6"/>`);
for (let y = ty0 + 96; y < ty1 - 4; y += 18) push(`<line x1="${tx0 - 6}" y1="${y}" x2="${tx0 + 6}" y2="${y}" stroke="${C.suture}" stroke-width="1.4"/>`);
push(txt(tx0 - 24, ty0 + 102, 9, 600, C.detrEdge, 'end', 'detrusor'));
push(txt(tx0 - 24, ty0 + 114, 9, 600, C.detrEdge, 'end', 'closed over'));
push(txt(c3, 350, 13, 700, C.ink, 'middle', 'Lich-Gregoir', false));
push(txt(c3, 366, 9.5, 500, C.muted, 'middle', 'detrusorrhaphy (extravesical)', false));

// cross-section inset (flap valve), clear of the trough labels
const ix = c3 + 62, iy = topY + 154;
push(`<circle cx="${ix}" cy="${iy}" r="20" fill="${C.tunnel}"/>`);
push(`<path d="M ${ix - 20} ${iy} A 20 20 0 0 1 ${ix + 20} ${iy}" fill="none" stroke="${C.detrEdge}" stroke-width="5" stroke-linecap="round"/>`);
push(`<path d="M ${ix - 20} ${iy} A 20 20 0 0 0 ${ix + 20} ${iy}" fill="none" stroke="${C.muc}" stroke-width="4" stroke-linecap="round"/>`);
push(`<circle cx="${ix}" cy="${iy}" r="5" fill="#FFFFFF" stroke="${C.ureter}" stroke-width="1.6"/>`);
push(txt(ix, iy - 26, 8.5, 700, C.detrEdge, 'middle', 'detrusor'));
push(txt(ix, iy + 34, 8.5, 700, C.muc, 'middle', 'mucosa'));
push(txt(ix, iy + 46, 8, 500, C.muted, 'middle', 'flap-valve', false));


const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Three antireflux ureteral reimplantation techniques shown on the bladder trigone. Cohen cross-trigonal: an intravesical submucosal tunnel carries the ureter across the trigone to a neo-orifice on the contralateral wall. Politano-Leadbetter: a new superolateral hiatus is created and the ureter tunnels down to a trigonal neo-orifice while the old hiatus is closed. Lich-Gregoir: an extravesical detrusor trough is closed over the ureter at the native orifice, with a cross-section inset showing the detrusor-over-mucosa flap valve. All target a 4 to 5 to 1 tunnel-length to ureter-diameter ratio. Key compares intravesical versus extravesical morbidity and each technique's main penalty.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'reimplant-techniques.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
