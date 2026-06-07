#!/usr/bin/env node
/**
 * WARWIKI original schematic — surgical shunts for ischemic priapism.
 *
 * One longitudinal penile schematic (proximal crus at left -> glans at right)
 * marking the shunt families: the distal corporoglanular shunt + Burnett
 * "snake" maneuver (first-line), and the proximal Quackels (cavernosum ->
 * spongiosum) and Grayhack (cavernosum -> saphenous vein) shunts (historical).
 * An inset compares the four distal tunical windows, smallest to largest.
 *
 * Output: static/img/diagrams/priapism-shunts.svg
 */
const fs = require('fs');
const path = require('path');

const C = {
  ink: '#1E293B', muted: '#64748B', border: '#E2E8F0',
  wall: '#475569',
  cc: '#6E3D4C', ccEdge: '#4A2733',      // corpus cavernosum, ischemic blood
  cs: '#F4E3D7', csEdge: '#C28E6A',      // corpus spongiosum / glans
  vein: '#2F6DB3', steel: '#64748B',
  blood: '#B91C1C', cut: '#334155',
  gain: '#15803D',
};
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 430;
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
push(txt(40, 36, 16, 700, C.ink, 'start', 'Surgical shunts for ischemic priapism', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'drainage routes from the congested corpus cavernosum, drawn on one organ &#8212; proximal crus (left) to glans (right)', false));

// ===== longitudinal penile anatomy ========================================
const ccY0 = 104, ccY1 = 150, ccCy = (ccY0 + ccY1) / 2;     // corpus cavernosum band
const csY0 = 160, csY1 = 190, csCy = (csY0 + csY1) / 2;     // corpus spongiosum band
const xL = 156, xR = 632;                                    // shaft extent

// crus taper (proximal CC) + bulb (proximal CS)
push(`<path d="M ${xL} ${ccY0} L ${xL} ${ccY1} L 104 ${ccCy + 14} C 96 ${ccCy + 6} 96 ${ccCy - 6} 104 ${ccCy - 16} Z" fill="${C.cc}" stroke="${C.ccEdge}" stroke-width="2"/>`);
push(`<ellipse cx="${xL + 4}" cy="${csCy}" rx="20" ry="17" fill="${C.cs}" stroke="${C.csEdge}" stroke-width="2"/>`);
push(txt(96, ccCy - 24, 10, 600, C.muted, 'middle', 'crus'));

// corpus spongiosum band + urethra
push(`<rect x="${xL}" y="${csY0}" width="${xR - xL}" height="${csY1 - csY0}" rx="15" fill="${C.cs}" stroke="${C.csEdge}" stroke-width="2.2"/>`);
push(`<line x1="${xL + 6}" y1="${csCy}" x2="${xR + 70}" y2="${csCy}" stroke="${C.csEdge}" stroke-width="1.6" stroke-dasharray="2 3"/>`);

// corpus cavernosum band (ischemic, dark)
push(`<rect x="${xL}" y="${ccY0}" width="${xR - xL}" height="${ccY1 - ccY0}" rx="23" fill="${C.cc}" stroke="${C.ccEdge}" stroke-width="2.2"/>`);

// glans cap (merges distal CC + CS)
push(`<ellipse cx="678" cy="${(ccCy + csCy) / 2}" rx="46" ry="50" fill="${C.cs}" stroke="${C.csEdge}" stroke-width="2.2"/>`);
push(`<path d="M 636 ${(ccCy + csCy) / 2 - 40} C 648 ${(ccCy + csCy) / 2} 648 ${(ccCy + csCy) / 2} 636 ${(ccCy + csCy) / 2 + 40}" fill="none" stroke="${C.csEdge}" stroke-width="1.4"/>`);
push(`<circle cx="722" cy="${(ccCy + csCy) / 2}" r="3" fill="${C.csEdge}"/>`);
push(txt(700, csY1 + 24, 10.5, 700, C.ink, 'middle', 'glans'));

// anatomy labels
push(txt(312, 100, 10.5, 700, C.cc, 'middle', 'corpus cavernosum (ischemic)'));
push(txt(345, csY1 + 24, 10.5, 600, C.csEdge, 'middle', 'corpus spongiosum / urethra'));

// ===== distal corporoglanular shunt + blood egress ========================
push(`<rect x="624" y="${ccCy - 11}" width="16" height="22" rx="3" fill="#FBE4E4" stroke="${C.blood}" stroke-width="1.6"/>`);
push(`<line x1="640" y1="${ccCy}" x2="664" y2="${ccCy}" stroke="${C.blood}" stroke-width="2.4" marker-end="url(#bld)"/>`);
push(txt(636, 80, 10.5, 700, C.blood, 'middle', 'distal corporoglanular shunt'));
leader(636, 84, 632, ccCy - 12);

// ===== Burnett snake maneuver: Hegar dilator down the corpus ==============
push(`<rect x="200" y="${ccCy - 7}" width="424" height="14" rx="7" fill="${C.steel}" opacity="0.85"/>`);
push(`<line x1="206" y1="${ccCy}" x2="178" y2="${ccCy}" stroke="${C.steel}" stroke-width="3" marker-end="url(#stl)"/>`);
push(txt(415, 82, 10.5, 700, C.steel, 'middle', 'snake maneuver &#8212; Hegar dilator passed to the crus'));
leader(415, 86, 415, ccY0 - 2);

// ===== Quackels: CC -> CS side-to-side window (proximal shaft) =============
const qx = 250;
push(`<rect x="${qx - 7}" y="${ccY1 - 2}" width="14" height="${csY0 - ccY1 + 4}" fill="#FBE4E4" stroke="${C.blood}" stroke-width="1.6"/>`);
push(txt(qx, 230, 10, 700, C.ink, 'middle', 'Quackels'));
push(txt(qx, 242, 9, 500, C.muted, 'middle', 'cavernosum &#8594; spongiosum'));
leader(qx, 222, qx, csY0 + 2);

// ===== Grayhack: saphenous vein graft to proximal CC ======================
const gPath = `M 70 234 C 124 234 150 200 170 168 C 186 142 196 126 210 ${ccY0 + 2}`;
push(`<path d="${gPath}" fill="none" stroke="${C.vein}" stroke-width="7" stroke-linecap="round"/>`);
push(`<path d="${gPath}" fill="none" stroke="#FFFFFF" stroke-width="1.6" stroke-dasharray="1 8" stroke-linecap="round"/>`);
push(txt(96, 224, 10, 700, C.vein, 'middle', 'Grayhack'));
push(txt(110, 236, 9, 500, C.muted, 'middle', 'saphenous vein'));

// ===== inset: distal tunical windows, smallest -> largest ==================
push(`<line x1="40" y1="248" x2="${W - 40}" y2="248" stroke="${C.border}" stroke-width="1.3"/>`);
push(txt(40, 270, 12, 700, C.ink, 'start', 'Distal tunical windows', false));
push(txt(196, 270, 11, 500, C.muted, 'start', '&#8212; smallest to largest opening', false));

const iy = 312, isz = 44;
function patch(cx, drawWin, name, sub) {
  push(`<rect x="${cx - isz / 2}" y="${iy - isz / 2}" width="${isz}" height="${isz}" rx="7" fill="#F8FAFC" stroke="${C.wall}" stroke-width="2"/>`);
  drawWin(cx, iy);
  push(txt(cx, iy + 42, 10.5, 700, C.ink, 'middle', name));
  push(txt(cx, iy + 55, 9, 500, C.muted, 'middle', sub));
}
patch(150, (x, y) => push(`<circle cx="${x}" cy="${y}" r="3.4" fill="${C.cc}"/>`), 'Winter', 'needle core');
patch(320, (x, y) => push(`<line x1="${x}" y1="${y - 9}" x2="${x}" y2="${y + 9}" stroke="${C.cc}" stroke-width="3.4" stroke-linecap="round"/>`), 'Ebbehoj', 'blade stab');
patch(490, (x, y) => { push(`<line x1="${x}" y1="${y - 10}" x2="${x}" y2="${y + 10}" stroke="${C.cc}" stroke-width="3.4" stroke-linecap="round"/>`); push(`<line x1="${x - 10}" y1="${y}" x2="${x + 10}" y2="${y}" stroke="${C.cc}" stroke-width="3.4" stroke-linecap="round"/>`); }, 'T-shunt', 'cruciate, 90&#176;');
patch(660, (x, y) => push(`<circle cx="${x}" cy="${y}" r="11" fill="#FBE4E4" stroke="${C.blood}" stroke-width="2.6"/>`), 'Al-Ghorab', 'excised disc');
// progression arrow
push(`<line x1="200" y1="${iy + 70}" x2="610" y2="${iy + 70}" stroke="${C.gain}" stroke-width="2.4" marker-end="url(#gn)"/>`);
push(txt(405, iy + 64, 9.5, 600, C.gain, 'middle', 'larger, more durable, lower reoperation', false));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Surgical shunts for ischemic priapism on one longitudinal penile schematic from proximal crus on the left to glans on the right. The corpus cavernosum is drawn dark with ischemic blood; the corpus spongiosum and urethra run ventrally to the glans. A distal corporoglanular shunt opens a window at the corpus-cavernosum-to-glans junction draining dark blood out; the Burnett snake maneuver passes a Hegar dilator from that distal window down the corpus to the crus. Proximally, the Quackels shunt opens a cavernosum-to-spongiosum window and the Grayhack shunt grafts a saphenous vein to the corpus cavernosum. An inset compares the four distal tunical windows from smallest to largest: Winter needle core, Ebbehoj blade stab, T-shunt cruciate, and Al-Ghorab excised disc.">
<defs>
<marker id="bld" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.blood}"/></marker>
<marker id="stl" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.steel}"/></marker>
<marker id="gn" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.gain}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'priapism-shunts.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
