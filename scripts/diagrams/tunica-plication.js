#!/usr/bin/env node
/**
 * WARWIKI original schematic — tunica plication mechanics for Peyronie's.
 *
 * Three ways to shorten the convex (long) side of the tunica albuginea opposite
 * the plaque, all close-ups of the tunica itself: Nesbit (excise a wedge and
 * close), 16-dot plication (infold with sutures, no excision), and Yachia
 * (longitudinal incision closed transversely). Complements the strategy-level
 * Peyronie correction figure (convex-shorten vs concave-lengthen/graft).
 *
 * Output: static/img/diagrams/tunica-plication.svg
 */
const fs = require('fs');
const path = require('path');

const C = {
  ink: '#1E293B', muted: '#64748B', border: '#E2E8F0',
  tun: '#ECE6D8', tunEdge: '#B6A98A',         // tunica albuginea (whitish-fibrous)
  excise: '#FBE4E4', exciseEdge: '#C0504D',
  suture: '#185FA5', cut: '#334155',
  short: '#15803D', plaque: '#7A4A3A',
};
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 360;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.2" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}
function shortenArrows(cx, y) {
  push(`<line x1="${cx - 70}" y1="${y}" x2="${cx - 40}" y2="${y}" stroke="${C.short}" stroke-width="2.2" marker-end="url(#sh)"/>`);
  push(`<line x1="${cx + 70}" y1="${y}" x2="${cx + 40}" y2="${y}" stroke="${C.short}" stroke-width="2.2" marker-end="url(#sh)"/>`);
}

// ===== frame + title =======================================================
push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Tunica plication mechanics for Peyronie&#8217;s', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'three ways to shorten the convex (long) side of the tunica opposite the plaque &#8212; close-ups of the tunica', false));

// orienting glyph: curved corpus, plaque on concave side, operate on convex side
const gx = 96, gy = 250;
push(`<path d="M ${gx} ${gy + 40} C ${gx - 14} ${gy} ${gx - 14} ${gy - 30} ${gx} ${gy - 70}" fill="none" stroke="${C.tunEdge}" stroke-width="10" stroke-linecap="round"/>`);
push(`<path d="M ${gx + 26} ${gy + 40} C ${gx + 40} ${gy} ${gx + 40} ${gy - 30} ${gx + 26} ${gy - 70}" fill="none" stroke="${C.tunEdge}" stroke-width="10" stroke-linecap="round"/>`);
push(`<rect x="${gx - 18}" y="${gy - 18}" width="10" height="22" rx="3" fill="${C.plaque}"/>`);
push(txt(gx + 6, gy + 66, 9, 600, C.plaque, 'middle', 'plaque'));
push(txt(gx + 40, gy - 24, 9, 700, C.short, 'start', 'convex'));
push(txt(gx + 40, gy - 12, 9, 700, C.short, 'start', 'side'));

// generic tunica strip
function strip(cx, y) {
  push(`<rect x="${cx - 78}" y="${y - 26}" width="156" height="52" rx="9" fill="${C.tun}" stroke="${C.tunEdge}" stroke-width="2.2"/>`);
}

// ===== PANEL 1: Nesbit (excise) ===========================================
{
  const cx = 290, y = 196;
  strip(cx, y);
  // excised wedge lifted out above the strip
  push(`<ellipse cx="${cx}" cy="${y - 56}" rx="16" ry="11" fill="${C.excise}" stroke="${C.exciseEdge}" stroke-width="1.6" stroke-dasharray="4 3"/>`);
  push(`<path d="M ${cx - 8} ${y - 26} L ${cx - 8} ${y - 46} M ${cx + 8} ${y - 26} L ${cx + 8} ${y - 46}" fill="none" stroke="${C.exciseEdge}" stroke-width="1" stroke-dasharray="3 3"/>`);
  // closed suture line at the defect
  for (let i = -2; i <= 2; i++) push(`<line x1="${cx - 7}" y1="${y + i * 9}" x2="${cx + 7}" y2="${y + i * 9}" stroke="${C.suture}" stroke-width="1.6"/>`);
  push(`<line x1="${cx}" y1="${y - 24}" x2="${cx}" y2="${y + 24}" stroke="${C.suture}" stroke-width="2"/>`);
  shortenArrows(cx, y);
  push(txt(cx, y - 74, 9.5, 700, C.exciseEdge, 'middle', 'excise wedge'));
  push(txt(cx, y + 58, 12, 700, C.ink, 'middle', 'Nesbit'));
  push(txt(cx, y + 72, 9, 500, C.muted, 'middle', 'excise + close'));
}

// ===== PANEL 2: 16-dot plication (infold) =================================
{
  const cx = 500, y = 196;
  // strip with an inward pleat (infold) in the middle
  push(`<path d="M ${cx - 78} ${y - 26} L ${cx - 20} ${y - 26} C ${cx - 8} ${y - 10} ${cx + 8} ${y - 10} ${cx + 20} ${y - 26} L ${cx + 78} ${y - 26} L ${cx + 78} ${y + 26} L ${cx + 20} ${y + 26} C ${cx + 8} ${y + 10} ${cx - 8} ${y + 10} ${cx - 20} ${y + 26} L ${cx - 78} ${y + 26} Z" fill="${C.tun}" stroke="${C.tunEdge}" stroke-width="2.2"/>`);
  // plicating suture dots + tie across the pleat
  [-1, 1].forEach(s => {
    push(`<circle cx="${cx + s * 18}" cy="${y - 14}" r="2.4" fill="${C.suture}"/>`);
    push(`<circle cx="${cx + s * 18}" cy="${y + 14}" r="2.4" fill="${C.suture}"/>`);
  });
  push(`<line x1="${cx - 18}" y1="${y - 14}" x2="${cx + 18}" y2="${y - 14}" stroke="${C.suture}" stroke-width="1.5"/>`);
  push(`<line x1="${cx - 18}" y1="${y + 14}" x2="${cx + 18}" y2="${y + 14}" stroke="${C.suture}" stroke-width="1.5"/>`);
  shortenArrows(cx, y);
  push(txt(cx, y - 40, 9.5, 700, C.suture, 'middle', 'plicating sutures'));
  push(txt(cx, y + 58, 12, 700, C.ink, 'middle', '16-dot plication'));
  push(txt(cx, y + 72, 9, 500, C.muted, 'middle', 'infold &#8212; no excision'));
}

// ===== PANEL 3: Yachia (incise) ===========================================
{
  const cx = 700, y = 196;
  strip(cx, y);
  // longitudinal incision (vertical) closed transversely (horizontal sutures)
  push(`<line x1="${cx}" y1="${y - 20}" x2="${cx}" y2="${y + 20}" stroke="${C.cut}" stroke-width="2" stroke-dasharray="4 3"/>`);
  for (let i = -2; i <= 2; i++) push(`<line x1="${cx - 16}" y1="${y + i * 9}" x2="${cx + 16}" y2="${y + i * 9}" stroke="${C.suture}" stroke-width="1.6"/>`);
  shortenArrows(cx, y);
  push(txt(cx, y - 40, 9, 700, C.cut, 'middle', 'longitudinal cut,'));
  push(txt(cx, y - 29, 9, 700, C.suture, 'middle', 'transverse close'));
  push(txt(cx, y + 58, 12, 700, C.ink, 'middle', 'Yachia'));
  push(txt(cx, y + 72, 9, 500, C.muted, 'middle', 'Heineke-Mikulicz'));
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Tunica plication mechanics for Peyronie's disease, shown as close-ups of the tunica albuginea on the convex long side opposite the plaque. A small orienting glyph shows the curved corpus with the plaque on the concave side and the maneuvers applied to the convex side. Nesbit: an elliptical wedge of tunica is excised and the defect closed with sutures, shortening the convex side. 16-dot plication: plicating sutures infold and pleat the tunica without removing tissue. Yachia: a longitudinal incision in the tunica is closed transversely by the Heineke-Mikulicz principle. Green arrows in each panel show shortening of the convex side.">
<defs>
<marker id="sh" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.short}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'tunica-plication.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
