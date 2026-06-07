#!/usr/bin/env node
/**
 * WARWIKI original schematic — Psoas hitch vs Boari flap.
 *
 * Two bladder-based moves to bridge a distal-ureteral gap: the psoas hitch
 * fixes the bladder cephalad (reaches ~5-8 cm); the Boari flap tubularizes a
 * bladder-wall flap into a ureteral substitute (reaches ~10-15 cm). Both end in
 * a spatulated, antireflux (submucosal-tunnel) ureteroneocystostomy.
 *
 * Output: static/img/diagrams/boari-psoas.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', blad: '#E2ECF5', bladEdge: '#4F6F92',
  flap: '#DCE7F1', flapEdge: '#7FA3C4', muscle: '#E7D9CB', muscleEdge: '#B99873', ureter: '#185FA5',
  cut: '#334155', suture: '#185FA5', tunnel: '#0F766E', gain: '#15803D', stitch: '#B45309' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 860, H = 430;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.2" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Psoas hitch vs Boari flap &#8212; bridging a distal-ureteral gap', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'move bladder before stretching ureter &#8212; both end in a spatulated, antireflux ureteroneocystostomy', false));

// divider between panels
push(`<line x1="${W / 2}" y1="78" x2="${W / 2}" y2="372" stroke="${C.border}" stroke-width="1" stroke-dasharray="2 5"/>`);

// ============ PANEL A: psoas hitch ============
const aBy = 348, aCx = 175;
// bladder, with ipsilateral (right) shoulder elongated up toward psoas
push(`<path d="M ${aCx - 78} ${aBy - 4}
  C ${aCx - 90} ${aBy - 86}, ${aCx - 40} ${aBy - 118}, ${aCx + 4} ${aBy - 116}
  C ${aCx + 52} ${aBy - 116}, ${aCx + 86} ${aBy - 150}, ${aCx + 96} ${aBy - 178}
  C ${aCx + 110} ${aBy - 150}, ${aCx + 104} ${aBy - 96}, ${aCx + 80} ${aBy - 30}
  C ${aCx + 70} ${aBy + 8}, ${aCx - 66} ${aBy + 10}, ${aCx - 78} ${aBy - 4} Z"
  fill="${C.blad}" stroke="${C.bladEdge}" stroke-width="2.4" stroke-linejoin="round"/>`);
push(txt(aCx - 28, aBy - 44, 12, 700, C.bladEdge, 'middle', 'bladder'));
// psoas muscle band (right, hatched)
const pmx = aCx + 116;
push(`<rect x="${pmx}" y="150" width="22" height="172" rx="6" fill="${C.muscle}" stroke="${C.muscleEdge}" stroke-width="1.4"/>`);
for (let y = 162; y < 318; y += 16) push(`<line x1="${pmx + 2}" y1="${y}" x2="${pmx + 20}" y2="${y + 8}" stroke="${C.muscleEdge}" stroke-width="0.9"/>`);
push(txt(pmx + 11, 142, 10, 700, C.muscleEdge, 'middle', 'psoas'));
// hitch sutures: bladder shoulder -> psoas
for (let i = 0; i < 3; i++) {
  const yy = aBy - 168 + i * 26;
  push(`<line x1="${aCx + 98}" y1="${f(yy)}" x2="${pmx}" y2="${f(yy + 4)}" stroke="${C.stitch}" stroke-width="1.8"/>`);
  push(`<circle cx="${aCx + 99}" cy="${f(yy)}" r="2.2" fill="${C.stitch}"/>`);
}
push(txt(aCx + 60, aBy - 200, 10, 700, C.stitch, 'middle', 'hitch sutures'));
// ureter descending, reimplanted into hitched dome with submucosal tunnel
push(`<path d="M ${aCx + 70} 96 C ${aCx + 78} 130, ${aCx + 86} 150, ${aCx + 90} ${aBy - 182}" fill="none" stroke="${C.ureter}" stroke-width="3.4" stroke-linecap="round"/>`);
push(txt(aCx + 86, 90, 10.5, 700, C.ureter, 'middle', 'ureter'));
// submucosal tunnel (dashed) at entry
push(`<line x1="${aCx + 90}" y1="${aBy - 182}" x2="${aCx + 74}" y2="${aBy - 150}" stroke="${C.tunnel}" stroke-width="2" stroke-dasharray="3 3"/>`);
push(txt(aCx + 8, aBy - 150, 9.5, 600, C.tunnel, 'end', 'submucosal'));
push(txt(aCx + 8, aBy - 138, 9.5, 600, C.tunnel, 'end', 'tunnel'));
// reach bracket
push(`<path d="M 70 ${aBy - 182} L 62 ${aBy - 182} M 66 ${aBy - 182} L 66 96 M 70 96 L 62 96" fill="none" stroke="${C.gain}" stroke-width="1.3"/>`);
push(txt(54, (96 + aBy - 182) / 2 - 6, 10.5, 700, C.gain, 'middle', '~5&#8211;8', false));
push(txt(54, (96 + aBy - 182) / 2 + 7, 9, 600, C.gain, 'middle', 'cm', false));
push(txt(aCx, 392, 13, 700, C.ink, 'middle', 'Psoas hitch', false));
push(txt(aCx, 408, 10, 500, C.muted, 'middle', 'bladder fixed cephalad', false));

// ============ PANEL B: Boari flap ============
const bBy = 348, bCx = 600;
// bladder
push(`<path d="M ${bCx - 78} ${bBy - 4}
  C ${bCx - 92} ${bBy - 84}, ${bCx - 44} ${bBy - 116}, ${bCx} ${bBy - 116}
  C ${bCx + 30} ${bBy - 116}, ${bCx + 60} ${bBy - 110}, ${bCx + 78} ${bBy - 84}
  C ${bCx + 90} ${bBy - 40}, ${bCx + 78} ${bBy + 6}, ${bCx + 64} ${bBy + 8}
  C ${bCx - 60} ${bBy + 10}, ${bCx - 66} ${bBy + 8}, ${bCx - 78} ${bBy - 4} Z"
  fill="${C.blad}" stroke="${C.bladEdge}" stroke-width="2.4" stroke-linejoin="round"/>`);
push(txt(bCx - 18, bBy - 40, 12, 700, C.bladEdge, 'middle', 'bladder'));
// flap base outline on bladder (dashed cut) - where the tube is harvested
push(`<path d="M ${bCx + 6} ${bBy - 108} L ${bCx + 70} ${bBy - 74}" fill="none" stroke="${C.cut}" stroke-width="1.6" stroke-dasharray="4 3"/>`);
// tubularized flap (tapering tube) rising from anterolateral bladder to the ureter
push(`<path d="M ${bCx + 8} ${bBy - 110}
  C ${bCx + 36} ${bBy - 150}, ${bCx + 44} ${bBy - 200}, ${bCx + 40} 150
  L ${bCx + 68} 150
  C ${bCx + 78} ${bBy - 196}, ${bCx + 74} ${bBy - 140}, ${bCx + 72} ${bBy - 76} Z"
  fill="${C.flap}" stroke="${C.flapEdge}" stroke-width="2.2" stroke-linejoin="round"/>`);
// tubularization seam
push(`<path d="M ${bCx + 54} ${bBy - 92} C ${bCx + 58} ${bBy - 160}, ${bCx + 56} ${bBy - 210}, ${bCx + 54} 158" fill="none" stroke="${C.suture}" stroke-width="1.4" stroke-dasharray="2 3"/>`);
push(txt(bCx + 96, 250, 11, 700, C.flapEdge, 'start', 'tubularized'));
push(txt(bCx + 96, 264, 11, 700, C.flapEdge, 'start', 'bladder flap'));
// ureter to flap apex
push(`<path d="M ${bCx + 30} 96 C ${bCx + 44} 120, ${bCx + 52} 134, ${bCx + 54} 150" fill="none" stroke="${C.ureter}" stroke-width="3.4" stroke-linecap="round"/>`);
push(txt(bCx + 44, 90, 10.5, 700, C.ureter, 'middle', 'ureter'));
// anastomosis tunnel at apex
push(`<circle cx="${bCx + 54}" cy="152" r="5.5" fill="none" stroke="${C.tunnel}" stroke-width="1.8"/>`);
// reach bracket
push(`<path d="M ${bCx + 110} 150 L ${bCx + 118} 150 M ${bCx + 114} 150 L ${bCx + 114} ${bBy - 76} M ${bCx + 110} ${bBy - 76} L ${bCx + 118} ${bBy - 76}" fill="none" stroke="${C.gain}" stroke-width="1.3"/>`);
push(txt(bCx + 130, (150 + bBy - 76) / 2 - 6, 10.5, 700, C.gain, 'middle', '~10&#8211;15', false));
push(txt(bCx + 130, (150 + bBy - 76) / 2 + 7, 9, 600, C.gain, 'middle', 'cm', false));
push(txt(bCx, 392, 13, 700, C.ink, 'middle', 'Boari flap', false));
push(txt(bCx, 408, 10, 500, C.muted, 'middle', 'base &#8805; ~4 cm  &#183;  &#8804; 3:1 length-to-base', false));


const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Psoas hitch versus Boari flap for bridging a distal ureteral gap. Left panel: a psoas hitch fixes the bladder cephalad to the psoas with hitch sutures and a spatulated submucosal-tunnel ureteroneocystostomy, reaching about 5 to 8 centimeters. Right panel: a Boari flap tubularizes a bladder-wall flap into a ureteral substitute rising to meet the ureter at its apex, reaching about 10 to 15 centimeters, with a base at least 4 centimeters wide and a length-to-base ratio under 3 to 1. Key: often combined, add downward nephropexy for upper-ureteral reach, spatulate the ureter and tubularize over a stent.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'boari-psoas.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
