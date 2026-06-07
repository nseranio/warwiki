#!/usr/bin/env node
/**
 * WARWIKI original schematic — transabdominal VVF repair: extravesical vs O'Conor.
 *
 * Both transperitoneal, both excise the tract, close bladder and vagina as
 * separate layers, and interpose omentum. The defining difference: the
 * extravesical approach dissects the vesicovaginal space from OUTSIDE the
 * bladder (no cystotomy); the O'Conor transvesical approach bivalves the
 * bladder sagittally down to the fistula for intravesical exposure.
 *
 * Output: static/img/diagrams/vvf-abdominal.svg
 */
const fs = require('fs');
const path = require('path');

const C = {
  ink: '#1E293B', muted: '#64748B', border: '#E2E8F0',
  wall: '#475569', lumen: '#E2ECF5', lumenEdge: '#7FA3C4',
  vag: '#E0C7D0', vagEdge: '#A87E92',
  oment: '#F2E3B3', omentEdge: '#CBB668',
  suture: '#185FA5', fistula: '#B91C1C', cut: '#334155', tool: '#0F766E',
};
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 412;
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
function omentum(cx, y0, y1) {
  let d = `M ${cx - 12} ${y0}`;
  const n = 4, step = (y1 - y0) / n;
  for (let i = 1; i <= n; i++) d += ` Q ${cx - 20} ${y0 + step * (i - 0.5)} ${cx - 12} ${y0 + step * i}`;
  d += ` L ${cx + 12} ${y1}`;
  for (let i = n; i >= 1; i--) d += ` Q ${cx + 20} ${y0 + step * (i - 0.5)} ${cx + 12} ${y0 + step * (i - 1)}`;
  d += ' Z';
  push(`<path d="${d}" fill="${C.oment}" stroke="${C.omentEdge}" stroke-width="1.6"/>`);
}
function vagina(cx, y) {
  push(`<path d="M ${cx - 88} ${y} C ${cx - 60} ${y - 18} ${cx + 60} ${y - 18} ${cx + 88} ${y} C ${cx + 60} ${y + 18} ${cx - 60} ${y + 18} ${cx - 88} ${y} Z" fill="${C.vag}" stroke="${C.vagEdge}" stroke-width="2.2"/>`);
}
function sutureRow(cx, y, half) {
  for (let i = -2; i <= 2; i++) push(`<line x1="${cx + i * (half / 2.2)}" y1="${y - 4}" x2="${cx + i * (half / 2.2)}" y2="${y + 4}" stroke="${C.suture}" stroke-width="1.6"/>`);
}

// ===== frame + title =======================================================
push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Transabdominal VVF repair: extravesical vs O&#8217;Conor', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'both excise the tract, close bladder and vagina as separate layers, and interpose omentum &#8212; the difference is the access', false));

// ===== PANEL A: extravesical (no cystotomy) ===============================
{
  const cx = 224;
  // closed bladder
  push(`<ellipse cx="${cx}" cy="170" rx="82" ry="60" fill="${C.lumen}" stroke="${C.wall}" stroke-width="2.6"/>`);
  push(txt(cx, 150, 10, 700, C.lumenEdge, 'middle', 'bladder'));
  push(txt(cx, 163, 8.5, 500, C.muted, 'middle', '(not opened)'));
  // bladder-base closure
  sutureRow(cx, 232, 40);
  // omentum interposed between bladder base and vagina
  omentum(cx, 238, 280);
  // vagina, closed
  vagina(cx, 300);
  sutureRow(cx, 300, 30);
  push(txt(cx, 322, 9.5, 700, C.vagEdge, 'middle', 'vagina'));
  // extravesical dissection arrow into the VV space from outside (posterior)
  push(`<path d="M ${cx + 116} 196 C ${cx + 80} 210 ${cx + 50} 244 ${cx + 22} 258" fill="none" stroke="${C.tool}" stroke-width="2.4" marker-end="url(#th)"/>`);
  push(txt(cx + 92, 188, 9.5, 700, C.tool, 'middle', 'dissect from'));
  push(txt(cx + 96, 200, 9.5, 700, C.tool, 'middle', 'outside'));
  push(txt(cx + 70, 270, 8.5, 500, C.muted, 'middle', 'vesicovaginal space'));
  push(txt(cx, 392, 12.5, 700, C.ink, 'middle', 'Extravesical &#8212; no cystotomy', false));
}

// ===== PANEL B: transvesical (O'Conor) ====================================
{
  const cx = 590;
  // bivalved bladder: opened cup (retracted halves) exposing the lumen
  push(`<path d="M ${cx - 80} 120 C ${cx - 96} 200 ${cx - 56} 244 ${cx} 246 C ${cx + 56} 244 ${cx + 96} 200 ${cx + 80} 120" fill="${C.lumen}" stroke="${C.wall}" stroke-width="2.6" stroke-linejoin="round"/>`);
  // cut edges of the sagittal cystotomy (retracted)
  push(`<line x1="${cx - 80} " y1="120" x2="${cx - 66}" y2="138" stroke="${C.cut}" stroke-width="2"/>`);
  push(`<line x1="${cx + 80}" y1="120" x2="${cx + 66}" y2="138" stroke="${C.cut}" stroke-width="2"/>`);
  // ureteral orifices visualized inside
  push(`<circle cx="${cx - 26}" cy="214" r="3.2" fill="none" stroke="${C.lumenEdge}" stroke-width="2"/>`);
  push(`<circle cx="${cx + 26}" cy="214" r="3.2" fill="none" stroke="${C.lumenEdge}" stroke-width="2"/>`);
  push(txt(cx + 104, 196, 9, 700, C.lumenEdge, 'middle', 'ureteral'));
  push(txt(cx + 104, 208, 9, 700, C.lumenEdge, 'middle', 'orifices'));
  leader(cx + 80, 206, cx + 30, 214);
  push(txt(cx, 110, 9.5, 700, C.cut, 'middle', 'sagittal cystotomy (bivalved)'));
  // fistula at the base, then closure + omentum + vagina
  push(`<circle cx="${cx}" cy="248" r="4.5" fill="none" stroke="${C.fistula}" stroke-width="1.8"/>`);
  push(txt(cx - 96, 250, 9, 700, C.fistula, 'middle', 'fistula'));
  leader(cx - 80, 250, cx - 6, 248);
  omentum(cx, 256, 290);
  vagina(cx, 308);
  sutureRow(cx, 308, 30);
  push(txt(cx, 330, 9.5, 700, C.vagEdge, 'middle', 'vagina'));
  push(txt(cx, 392, 12.5, 700, C.ink, 'middle', 'O&#8217;Conor &#8212; bivalve the bladder', false));
}

// shared omentum label between panels
push(txt(410, 300, 9.5, 700, C.omentEdge, 'middle', 'omental'));
push(txt(410, 312, 9.5, 700, C.omentEdge, 'middle', 'interposition'));
leader(388, 300, 300, 262);
leader(432, 300, 560, 272);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Transabdominal vesicovaginal fistula repair comparing two approaches. The extravesical panel shows the bladder left intact and unopened while the vesicovaginal space is dissected from outside, the tract excised, and the bladder base and vagina closed as separate layers with omentum interposed between them. The O'Conor transvesical panel shows the bladder bivalved by a sagittal cystotomy down to the fistula, exposing both ureteral orifices and the fistula from inside, before separate layered closure of vagina and bladder with omental interposition. Both interpose omentum between the non-overlapping suture lines.">
<defs>
<marker id="th" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.tool}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'vvf-abdominal.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
