#!/usr/bin/env node
/**
 * WARWIKI original schematic — vesicovaginal fistula layered closure.
 *
 * Cross-section through the vesicovaginal septum: a fistula (left) repaired by
 * wide mobilization and tension-free multilayer closure (right), with the
 * bladder and vaginal suture lines deliberately OFFSET (non-overlapping) and an
 * optional well-vascularized interposition flap between them.
 *
 * Output: static/img/diagrams/vvf-layered-closure.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', bladLumen: '#E2ECF5', bladWall: '#E7B6AC',
  bladEdge: '#C0705E', vagLumen: '#F3DBDC', vagWall: '#E6A6B0', vagEdge: '#CF7F8D', fistula: '#B91C1C',
  s1: '#185FA5', s2: '#0F766E', flap: '#F3E2A0', flapEdge: '#C6A53A', arrow: '#0F766E', ok: '#15803D' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 412;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Vesicovaginal fistula &#8212; tension-free, non-overlapping layered closure', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'cross-section of the vesicovaginal septum: mobilize widely, then close in layers with the suture lines offset', false));

const blY0 = 96, blY1 = 124, blW1 = 146, vgW0 = 196, vgW1 = 218, vgY1 = 250;
function lumens(cx, x0, x1) {
  // bladder lumen + vagina lumen labels handled by caller
  push(`<rect x="${x0}" y="${blY0}" width="${x1 - x0}" height="${blY1 - blY0}" fill="${C.bladLumen}"/>`);
  push(`<rect x="${x0}" y="${vgW1}" width="${x1 - x0}" height="${vgY1 - vgW1}" fill="${C.vagLumen}"/>`);
}

// ============ PANEL A: fistula ============
const ax0 = 70, ax1 = 320, axc = (ax0 + ax1) / 2;
lumens(axc, ax0, ax1);
// bladder wall with central gap (fistula)
push(`<rect x="${ax0}" y="${blY1}" width="${axc - 16 - ax0}" height="${blW1 - blY1}" fill="${C.bladWall}" stroke="${C.bladEdge}" stroke-width="1.2"/>`);
push(`<rect x="${axc + 16}" y="${blY1}" width="${ax1 - axc - 16}" height="${blW1 - blY1}" fill="${C.bladWall}" stroke="${C.bladEdge}" stroke-width="1.2"/>`);
// vaginal wall with central gap
push(`<rect x="${ax0}" y="${vgW0}" width="${axc - 16 - ax0}" height="${vgW1 - vgW0}" fill="${C.vagWall}" stroke="${C.vagEdge}" stroke-width="1.2"/>`);
push(`<rect x="${axc + 16}" y="${vgW0}" width="${ax1 - axc - 16}" height="${vgW1 - vgW0}" fill="${C.vagWall}" stroke="${C.vagEdge}" stroke-width="1.2"/>`);
// fistula tract connecting both lumens
push(`<rect x="${axc - 16}" y="${blY0}" width="32" height="${vgY1 - blY0}" fill="#FFFFFF" stroke="${C.fistula}" stroke-width="1.6" stroke-dasharray="4 3"/>`);
push(txt(axc, (blW1 + vgW0) / 2 + 4, 9.5, 700, C.fistula, 'middle', 'fistula'));
push(txt(axc, 74, 9.5, 700, C.bladEdge, 'middle', 'BLADDER lumen'));
push(txt(axc, vgY1 + 18, 9.5, 700, C.vagEdge, 'middle', 'VAGINA lumen'));
push(txt(axc, 286, 12.5, 700, C.ink, 'middle', '1. Fistula + freshen edges', false));

// ============ arrow ============
push(`<line x1="338" y1="172" x2="384" y2="172" stroke="${C.arrow}" stroke-width="2.6" marker-end="url(#vv)"/>`);

// ============ PANEL B: layered closure ============
const bx0 = 408, bx1 = 668, bxc = (bx0 + bx1) / 2;
lumens(bxc, bx0, bx1);
// bladder wall closed (continuous) + 2 suture layers near center
push(`<rect x="${bx0}" y="${blY1}" width="${bx1 - bx0}" height="${blW1 - blY1}" fill="${C.bladWall}" stroke="${C.bladEdge}" stroke-width="1.2"/>`);
// vaginal wall closed (continuous)
push(`<rect x="${bx0}" y="${vgW0}" width="${bx1 - bx0}" height="${vgW1 - vgW0}" fill="${C.vagWall}" stroke="${C.vagEdge}" stroke-width="1.2"/>`);
// optional interposition flap between the layers
push(`<ellipse cx="${bxc - 6}" cy="${(blW1 + vgW0) / 2}" rx="56" ry="14" fill="${C.flap}" stroke="${C.flapEdge}" stroke-width="1.4" stroke-dasharray="4 3"/>`);
push(txt(bxc - 6, (blW1 + vgW0) / 2 + 3.5, 8, 600, C.flapEdge, 'middle', '&#177; interposition flap'));
// bladder suture lines (2 layers) at center
push(`<line x1="${bxc - 28}" y1="${blY1 + 9}" x2="${bxc + 28}" y2="${blY1 + 9}" stroke="${C.s1}" stroke-width="2.4"/>`);
for (let x = bxc - 20; x <= bxc + 20; x += 13) push(`<line x1="${x}" y1="${blY1 + 5}" x2="${x}" y2="${blY1 + 13}" stroke="${C.s1}" stroke-width="1.2"/>`);
push(`<line x1="${bxc - 34}" y1="${blY1 + 18}" x2="${bxc + 34}" y2="${blY1 + 18}" stroke="${C.s2}" stroke-width="2" stroke-dasharray="3 2"/>`);
// vaginal suture line OFFSET laterally (non-overlapping with bladder line)
push(`<line x1="${bxc + 6}" y1="${vgW0 + 11}" x2="${bxc + 84}" y2="${vgW0 + 11}" stroke="${C.s1}" stroke-width="2.4"/>`);
for (let x = bxc + 16; x <= bxc + 74; x += 13) push(`<line x1="${x}" y1="${vgW0 + 7}" x2="${x}" y2="${vgW0 + 15}" stroke="${C.s1}" stroke-width="1.2"/>`);
// offset indicator
push(`<line x1="${bxc}" y1="${blW1 + 2}" x2="${bxc}" y2="${vgW0 - 2}" stroke="${C.muted}" stroke-width="1" stroke-dasharray="2 3"/>`);
push(`<line x1="${bxc + 45}" y1="${blW1 + 2}" x2="${bxc + 45}" y2="${vgW0 - 2}" stroke="${C.muted}" stroke-width="1" stroke-dasharray="2 3"/>`);
push(txt(bxc + 22, blW1 + 14, 8, 600, C.ok, 'middle', 'offset'));
// wide mobilization arrows
push(`<line x1="${bx0 - 4}" y1="${blW1 + 2}" x2="${bx0 + 30}" y2="${blW1 + 2}" stroke="${C.arrow}" stroke-width="1.6" marker-start="url(#vv)"/>`);
push(`<line x1="${bx1 + 4}" y1="${blW1 + 2}" x2="${bx1 - 30}" y2="${blW1 + 2}" stroke="${C.arrow}" stroke-width="1.6" marker-start="url(#vv)"/>`);
push(txt(bxc, 74, 9.5, 700, C.bladEdge, 'middle', 'BLADDER lumen'));
push(txt(bxc, vgY1 + 18, 9.5, 700, C.vagEdge, 'middle', 'VAGINA lumen'));
push(txt(bxc, 286, 12.5, 700, C.ink, 'middle', '2. Layered, offset closure', false));

// ============ key ============
push(`<line x1="40" y1="320" x2="780" y2="320" stroke="${C.border}" stroke-width="1"/>`);
push(txt(40, 340, 11, 600, C.ink, 'start', 'Mobilize ≥1-2 cm beyond the defect for a tension-free repair; close the bladder and vagina as independent layers with the suture lines NOT stacked.', false));
push(txt(40, 358, 10.5, 500, C.muted, 'start', 'Watertight first layer (knots intravesical) + an imbricating second layer. Offsetting the seams avoids a through-and-through weak point and re-fistulization.', false));
push(txt(40, 376, 10.5, 500, C.muted, 'start', 'A vascularized interposition (Martius / peritoneal / omental flap) is added for recurrent, radiated, or large fistulae &#8212; not mandatory for a simple primary repair.', false));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Vesicovaginal fistula repair shown in cross-section through the vesicovaginal septum. Left panel: a fistula tract connects the bladder lumen above to the vagina lumen below through gaps in both the bladder and vaginal walls, with edges freshened. Right panel: after wide mobilization, the bladder and vaginal walls are closed as independent layers with a watertight first layer and an imbricating second layer, and the bladder and vaginal suture lines are deliberately offset so they do not stack; an optional vascularized interposition flap lies between the layers. Key: mobilize at least 1 to 2 centimeters beyond the defect for a tension-free repair, offset the seams to avoid a through-and-through weak point and re-fistulization, and add a Martius, peritoneal, or omental interposition for recurrent, radiated, or large fistulae though it is not mandatory for a simple primary repair.">
<defs>
<marker id="vv" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.arrow}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'vvf-layered-closure.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
