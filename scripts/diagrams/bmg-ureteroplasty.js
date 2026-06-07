#!/usr/bin/env node
/**
 * WARWIKI original schematic — buccal mucosa graft (BMG) ureteroplasty.
 *
 * Non-transecting onlay repair of a complex ureteral stricture: a longitudinal
 * ureterotomy is opened across the stricture, a buccal mucosa graft is sewn in
 * as a ventral/dorsal onlay over a double-J stent to widen the caliber, and the
 * free graft is wrapped in omentum or perinephric fat for vascular take.
 *
 * Output: static/img/diagrams/bmg-ureteroplasty.svg
 */
const fs = require('fs');
const path = require('path');

const C = {
  ink: '#1E293B', muted: '#64748B', border: '#E2E8F0',
  wall: '#475569', lumen: '#E2ECF5', lumenEdge: '#7FA3C4',
  graft: '#EFC4BE', graftEdge: '#C77F77',      // buccal mucosa
  oment: '#F2E3B3', omentEdge: '#CBB668',       // omentum / fat
  stent: '#7C3AED', suture: '#185FA5',
  stric: '#B91C1C', arrow: '#0F766E', gain: '#15803D',
};
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 398;
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
push(txt(40, 36, 16, 700, C.ink, 'start', 'Buccal mucosa graft ureteroplasty', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'open the stricture longitudinally, patch it with an onlay graft over a stent, and wrap the free graft for vascular take', false));

const Y0 = 108, Y1 = 308, mid = (Y0 + Y1) / 2;

// ===== ZONE 1: stricture + longitudinal ureterotomy =======================
const z1 = 150;
push(`<path d="M ${z1 - 13} ${Y0} C ${z1 - 13} ${mid - 36} ${z1 - 5} ${mid - 14} ${z1 - 5} ${mid} C ${z1 - 5} ${mid + 14} ${z1 - 13} ${mid + 36} ${z1 - 13} ${Y1} L ${z1 + 13} ${Y1} C ${z1 + 13} ${mid + 36} ${z1 + 5} ${mid + 14} ${z1 + 5} ${mid} C ${z1 + 5} ${mid - 14} ${z1 + 13} ${mid - 36} ${z1 + 13} ${Y0} Z" fill="${C.lumen}" stroke="${C.lumenEdge}" stroke-width="2.4"/>`);
push(`<ellipse cx="${z1}" cy="${mid}" rx="20" ry="16" fill="none" stroke="${C.stric}" stroke-width="1.4" stroke-dasharray="3 3"/>`);
push(`<line x1="${z1}" y1="${mid - 40}" x2="${z1}" y2="${mid + 40}" stroke="${C.wall}" stroke-width="2.4"/>`);
push(`<line x1="${z1 - 4}" y1="${mid}" x2="${z1 - 26}" y2="${mid}" stroke="${C.arrow}" stroke-width="2" marker-end="url(#ah)"/>`);
push(`<line x1="${z1 + 4}" y1="${mid}" x2="${z1 + 26}" y2="${mid}" stroke="${C.arrow}" stroke-width="2" marker-end="url(#ah)"/>`);
push(txt(z1, mid - 52, 10, 700, C.stric, 'middle', 'stricture'));
push(txt(z1, Y1 + 26, 10.5, 600, C.ink, 'middle', 'longitudinal'));
push(txt(z1, Y1 + 39, 10.5, 600, C.ink, 'middle', 'ureterotomy'));
push(txt(z1, Y1 + 51, 8.5, 500, C.muted, 'middle', '(non-transecting)'));

// arrow to zone 2
push(`<line x1="218" y1="${mid}" x2="266" y2="${mid}" stroke="${C.arrow}" stroke-width="2.6" marker-end="url(#ah)"/>`);
push(txt(242, mid - 10, 10, 600, C.arrow, 'middle', 'onlay', false));

// ===== ZONE 2: BMG onlay over a stent =====================================
const z2 = 360;
// widened ureter (bulges at the patched segment)
push(`<path d="M ${z2 - 13} ${Y0} C ${z2 - 13} ${mid - 40} ${z2 - 26} ${mid - 24} ${z2 - 26} ${mid} C ${z2 - 26} ${mid + 24} ${z2 - 13} ${mid + 40} ${z2 - 13} ${Y1} L ${z2 + 13} ${Y1} C ${z2 + 13} ${mid + 40} ${z2 + 26} ${mid + 24} ${z2 + 26} ${mid} C ${z2 + 26} ${mid - 24} ${z2 + 13} ${mid - 40} ${z2 + 13} ${Y0} Z" fill="${C.lumen}" stroke="${C.lumenEdge}" stroke-width="2.4"/>`);
// buccal onlay patch (lens over the front of the widened segment)
push(`<path d="M ${z2} ${mid - 50} C ${z2 - 22} ${mid - 40} ${z2 - 22} ${mid + 40} ${z2} ${mid + 50} C ${z2 + 22} ${mid + 40} ${z2 + 22} ${mid - 40} ${z2} ${mid - 50} Z" fill="${C.graft}" stroke="${C.graftEdge}" stroke-width="2"/>`);
// suture ticks around the graft
for (let i = 0; i < 6; i++) {
  const a = -Math.PI / 2 + Math.PI * (i / 5);
  const gx = z2 + Math.cos(a) * 20, gy = mid + Math.sin(a) * 48;
  push(`<line x1="${f(gx - 5)}" y1="${f(gy)}" x2="${f(gx + 5)}" y2="${f(gy)}" stroke="${C.suture}" stroke-width="1.5"/>`);
}
// double-J stent through the lumen with a proximal curl
push(`<path d="M ${z2} ${Y1} L ${z2} ${Y0 + 14} C ${z2} ${Y0 + 2} ${z2 + 16} ${Y0 + 2} ${z2 + 16} ${Y0 + 14} C ${z2 + 16} ${Y0 + 24} ${z2 + 4} ${Y0 + 22} ${z2 + 6} ${Y0 + 30}" fill="none" stroke="${C.stent}" stroke-width="1.8" stroke-linecap="round"/>`);
push(txt(z2 - 64, mid - 28, 9.5, 700, C.graftEdge, 'middle', 'buccal'));
push(txt(z2 - 62, mid - 16, 9.5, 700, C.graftEdge, 'middle', 'onlay'));
push(txt(z2 - 62, mid - 4, 9.5, 700, C.graftEdge, 'middle', 'graft'));
leader(z2 - 44, mid - 14, z2 - 16, mid - 10);
push(txt(z2 + 64, mid + 18, 9.5, 700, C.stent, 'middle', 'double-J'));
push(txt(z2 + 62, mid + 30, 9.5, 700, C.stent, 'middle', 'stent'));
leader(z2 + 44, mid + 20, z2 + 8, mid + 20);
// caliber-gain bracket
push(`<path d="M ${z2 + 36} ${mid - 50} L ${z2 + 44} ${mid - 50} M ${z2 + 40} ${mid - 50} L ${z2 + 40} ${mid + 50} M ${z2 + 36} ${mid + 50} L ${z2 + 44} ${mid + 50}" fill="none" stroke="${C.gain}" stroke-width="1.3"/>`);
push(txt(z2, Y1 + 32, 10.5, 600, C.ink, 'middle', 'BMG onlay + stent'));

// ===== INSET: cross-section + omental wrap ================================
const ix = 600, iy = 222, ir = 40;
push(`<line x1="${ix - 70}" y1="86" x2="${ix - 70}" y2="368" stroke="${C.border}" stroke-width="1.3"/>`);
push(txt(ix - 56, 104, 12, 700, C.ink, 'start', 'Cross-section', false));
// omental/fat wrap (lobulated ring)
let wrap = '';
const lobes = 11;
for (let i = 0; i <= lobes; i++) {
  const a = (i / lobes) * Math.PI * 2;
  const rr = ir + 18 + (i % 2 ? 0 : 7);
  const px = ix + Math.cos(a) * rr, py = iy + Math.sin(a) * rr;
  wrap += (i === 0 ? `M ${f(px)} ${f(py)}` : ` L ${f(px)} ${f(py)}`);
}
push(`<path d="${wrap} Z" fill="${C.oment}" stroke="${C.omentEdge}" stroke-width="1.6"/>`);
// ureter wall + lumen
push(`<circle cx="${ix}" cy="${iy}" r="${ir}" fill="${C.wall}"/>`);
push(`<circle cx="${ix}" cy="${iy}" r="${ir - 9}" fill="${C.lumen}" stroke="${C.lumenEdge}" stroke-width="1.5"/>`);
// buccal graft arc replacing the dorsal wall
push(`<path d="M ${ix - 28} ${iy - 28} A ${ir} ${ir} 0 0 1 ${ix + 28} ${iy - 28}" fill="none" stroke="${C.graftEdge}" stroke-width="8" stroke-linecap="round"/>`);
push(`<path d="M ${ix - 28} ${iy - 28} A ${ir} ${ir} 0 0 1 ${ix + 28} ${iy - 28}" fill="none" stroke="${C.graft}" stroke-width="4.4" stroke-linecap="round"/>`);
push(txt(ix, iy - 56, 9, 700, C.graftEdge, 'middle', 'buccal graft'));
push(txt(ix, iy + 4, 8.5, 600, C.lumenEdge, 'middle', 'lumen'));
push(txt(ix, iy + ir + 40, 9.5, 700, C.omentEdge, 'middle', 'omental / fat wrap'));
push(txt(ix, iy + ir + 52, 8.5, 500, C.muted, 'middle', 'feeds the free graft'));
push(txt(ix, 354, 8.5, 500, C.muted, 'middle', 'dorsal or ventral onlay'));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Buccal mucosa graft ureteroplasty. On the left, a ureteral stricture is opened by a non-transecting longitudinal ureterotomy across the narrowing. In the middle, a buccal mucosa graft is sewn in as an onlay patch over a double-J stent, widening the caliber, with suture lines around the graft. The cross-section inset shows the buccal graft replacing the dorsal arc of the ureter wall around the lumen, the whole repair wrapped in a lobulated ring of omentum or perinephric fat that supplies the free graft; the graft may be placed as a dorsal or ventral onlay.">
<defs>
<marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.arrow}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'bmg-ureteroplasty.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
