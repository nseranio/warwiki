#!/usr/bin/env node
/**
 * WARWIKI original schematic — the quilting stitch (graft fixation).
 *
 * A free graft has no blood supply of its own; it survives only pressed flat
 * against a vascularized bed (imbibition -> inosculation -> neovascularization).
 * Two panels: WITHOUT quilting a hematoma/seroma lifts the graft off the bed and
 * it starves; WITH quilting, multiple tacking sutures hold the graft in intimate
 * contact so plasma and new vessels reach it and it takes.
 *
 * Output: static/img/diagrams/quilting-stitch.svg
 */
const fs = require('fs');
const path = require('path');

const C = {
  ink: '#1E293B', muted: '#64748B', border: '#E2E8F0',
  graft: '#EFC4BE', graftEdge: '#C77F77',          // mucosal / skin graft
  graftDead: '#D8D2CE', graftDeadEdge: '#9C938C',  // starved graft
  bed: '#E7C9C2', bedEdge: '#C18B82',              // vascularized recipient bed
  vessel: '#B91C1C', blood: '#C0392B',
  suture: '#185FA5', feed: '#0F766E',
  bad: '#B91C1C', ok: '#15803D',
};
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 300;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.2" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}
// vascularized bed band with little vessels
function bed(x0, x1, y) {
  push(`<rect x="${x0}" y="${y}" width="${x1 - x0}" height="32" rx="7" fill="${C.bed}" stroke="${C.bedEdge}" stroke-width="2.2"/>`);
  for (let vx = x0 + 22; vx < x1 - 10; vx += 34) {
    push(`<path d="M ${vx} ${y + 26} q 6 -10 12 0" fill="none" stroke="${C.vessel}" stroke-width="1.5"/>`);
  }
}

// ===== frame + title =======================================================
push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'The quilting stitch &#8212; why a free graft lives or dies', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'a free graft has no blood supply; it survives only pressed flat on a vascularized bed (imbibition &#8594; inosculation &#8594; neovascularization)', false));

const BED = 182;

// ===== PANEL A: without quilting ==========================================
{
  const x0 = 64, x1 = 372, cx = (x0 + x1) / 2;
  bed(x0, x1, BED);
  // hematoma / seroma pocket lifting the graft off
  push(`<path d="M ${x0 + 30} ${BED} C ${cx - 30} ${BED - 34} ${cx + 30} ${BED - 34} ${x1 - 30} ${BED} Z" fill="${C.blood}" opacity="0.85"/>`);
  // graft floating above, edges curling up (dying / pale)
  push(`<path d="M ${x0 + 18} ${BED - 30} C ${x0 + 18} ${BED - 44} ${x0 + 40} ${BED - 46} ${x0 + 52} ${BED - 40} C ${cx} ${BED - 30} ${cx} ${BED - 30} ${x1 - 52} ${BED - 40} C ${x1 - 40} ${BED - 46} ${x1 - 18} ${BED - 44} ${x1 - 18} ${BED - 30} L ${x1 - 26} ${BED - 24} C ${cx} ${BED - 16} ${cx} ${BED - 16} ${x0 + 26} ${BED - 24} Z" fill="${C.graftDead}" stroke="${C.graftDeadEdge}" stroke-width="2"/>`);
  push(txt(cx, BED - 50, 10, 700, C.graftDeadEdge, 'middle', 'graft'));
  push(txt(cx, BED + 4, 9.5, 700, C.blood, 'middle', 'hematoma / seroma'));
  push(txt(cx, BED + 58, 10, 700, C.bedEdge, 'middle', 'vascularized bed'));
  push(txt(cx, BED + 86, 12, 700, C.bad, 'middle', '&#10007; lifts off &#8594; graft starves', false));
}

// ===== PANEL B: with quilting =============================================
{
  const x0 = 448, x1 = 756, cx = (x0 + x1) / 2;
  bed(x0, x1, BED);
  // graft pressed flat on the bed (intimate contact)
  push(`<rect x="${x0 + 16}" y="${BED - 22}" width="${x1 - x0 - 32}" height="20" rx="6" fill="${C.graft}" stroke="${C.graftEdge}" stroke-width="2.2"/>`);
  // quilting sutures tacking graft -> bed
  for (let sx = x0 + 40; sx < x1 - 20; sx += 46) {
    push(`<line x1="${sx}" y1="${BED - 26}" x2="${sx}" y2="${BED + 26}" stroke="${C.suture}" stroke-width="2"/>`);
    push(`<circle cx="${sx}" cy="${BED - 26}" r="2.2" fill="${C.suture}"/>`);
  }
  // plasma imbibition + vessel ingrowth (bed -> graft)
  for (let ax = x0 + 63; ax < x1 - 30; ax += 46) {
    push(`<line x1="${ax}" y1="${BED + 4}" x2="${ax}" y2="${BED - 16}" stroke="${C.feed}" stroke-width="1.8" marker-end="url(#fd)"/>`);
  }
  push(txt(cx, BED - 32, 10, 700, C.graftEdge, 'middle', 'graft quilted flat'));
  push(txt(x1 + 2, BED, 9, 700, C.suture, 'end', ''));
  push(txt(cx, BED + 58, 9, 600, C.feed, 'middle', 'plasma + new vessels reach the graft'));
  push(txt(cx, BED + 86, 12, 700, C.ok, 'middle', '&#10003; intimate contact &#8594; graft takes', false));
}

// divider + vs
push(`<line x1="410" y1="86" x2="410" y2="280" stroke="${C.border}" stroke-width="1.3"/>`);
push(`<circle cx="410" cy="${BED - 6}" r="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.3"/>`);
push(txt(410, BED - 2, 10, 700, C.muted, 'middle', 'vs', false));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="The quilting stitch and graft survival, two panels. A free graft has no blood supply of its own and survives only when pressed flat against a vascularized bed through plasmatic imbibition, inosculation, and neovascularization. Without quilting, a hematoma or seroma collects between the graft and the bed, lifting the pale graft off and curling its edges so it loses contact and starves. With quilting, multiple tacking sutures hold the graft in intimate contact with the bed, eliminating dead space, so plasma and new vessels reach the graft and it takes.">
<defs>
<marker id="fd" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.feed}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'quilting-stitch.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
