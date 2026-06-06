#!/usr/bin/env node
/**
 * WARWIKI original schematic — ureteroenteric anastomosis: Bricker vs Wallace.
 *
 * Two panels. Bricker: each ureter anastomosed separately end-to-side to the
 * (closed) proximal ileum. Wallace: the ureters are spatulated and joined into
 * a single plate sewn to the open proximal ileal end.
 *
 * Output: static/img/diagrams/ureteroenteric-anastomosis.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', bowel: '#E9D6BE', bowelEdge: '#B89B7A',
  lumen: '#CDB69A', urWall: '#E7C3AE', urLumen: '#F7E7DC', urEdge: '#C99A7E', join: '#185FA5', lead: '#475569' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 432;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.2" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}
function lead(x1, y1, x2, y2) { push(`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${C.lead}" stroke-width="1"/>`); push(`<circle cx="${f(x1)}" cy="${f(y1)}" r="1.8" fill="${C.lead}"/>`); }
function ureter(d) { push(`<path d="${d}" fill="none" stroke="${C.urEdge}" stroke-width="14" stroke-linecap="round"/>`); push(`<path d="${d}" fill="none" stroke="${C.urLumen}" stroke-width="6" stroke-linecap="round"/>`); }

const ty = 182, by = 338, hw = 27;
function conduit(cx, open) {
  if (open) {
    push(`<path d="M ${cx - hw} ${ty} L ${cx - hw} ${by - 16} Q ${cx - hw} ${by} ${cx} ${by} Q ${cx + hw} ${by} ${cx + hw} ${by - 16} L ${cx + hw} ${ty}" fill="${C.bowel}" stroke="${C.bowelEdge}" stroke-width="1.8"/>`);
  } else {
    push(`<path d="M ${cx - hw} ${ty + 16} Q ${cx - hw} ${ty} ${cx} ${ty} Q ${cx + hw} ${ty} ${cx + hw} ${ty + 16} L ${cx + hw} ${by - 16} Q ${cx + hw} ${by} ${cx} ${by} Q ${cx - hw} ${by} ${cx - hw} ${by - 16} Z" fill="${C.bowel}" stroke="${C.bowelEdge}" stroke-width="1.8"/>`);
  }
  for (const y of [ty + 46, ty + 86, ty + 126]) push(`<path d="M ${cx - hw + 3} ${y} Q ${cx} ${y + 7} ${cx + hw - 3} ${y}" fill="none" stroke="${C.bowelEdge}" stroke-width="1" opacity="0.5"/>`);
  // stoma
  push(`<ellipse cx="${cx}" cy="${by + 8}" rx="13" ry="8" fill="${C.bowel}" stroke="${C.bowelEdge}" stroke-width="1.6"/>`);
  push(`<ellipse cx="${cx}" cy="${by + 8}" rx="5" ry="3" fill="${C.lumen}"/>`);
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 38, 16, 700, C.ink, 'start', 'Ureteroenteric anastomosis &#8212; Bricker vs Wallace', false));
push(txt(40, 57, 12.5, 500, C.muted, 'start', 'how the two ureters are joined to the ileal conduit', false));

// ---- Bricker (left) ------------------------------------------------------
const ax = 220;
ureter(`M ${ax - 96} 96 C ${ax - 92} 150, ${ax - 70} 196, ${ax - hw + 3} 218`);
ureter(`M ${ax + 96} 96 C ${ax + 92} 158, ${ax + 70} 214, ${ax + hw - 3} 244`);
conduit(ax, false);
for (const [jx, jy] of [[ax - hw + 2, 218], [ax + hw - 2, 244]]) { push(`<circle cx="${jx}" cy="${jy}" r="7" fill="none" stroke="${C.join}" stroke-width="2"/>`); }
push(txt(ax, 372, 14, 700, C.ink, 'middle', 'Bricker', false));
push(txt(ax, 391, 10.8, 500, C.muted, 'middle', 'each ureter sewn separately (end-to-side)', false));
push(txt(ax, 408, 11, 700, '#166534', 'middle', 'stricture ~3.7%', false));

// ---- Wallace (right) -----------------------------------------------------
const bx = 600;
ureter(`M ${bx - 96} 96 C ${bx - 86} 132, ${bx - 44} 150, ${bx - 13} 166`);
ureter(`M ${bx + 96} 96 C ${bx + 86} 132, ${bx + 44} 150, ${bx + 13} 166`);
// joined plate over the open end
push(`<path d="M ${bx - 16} 156 L ${bx + 16} 156 L ${bx + hw} ${ty} L ${bx - hw} ${ty} Z" fill="${C.urWall}" stroke="${C.urEdge}" stroke-width="1.6"/>`);
push(`<line x1="${bx}" y1="158" x2="${bx}" y2="${ty}" stroke="${C.urEdge}" stroke-width="1.5" stroke-dasharray="3 2"/>`);
conduit(bx, true);
push(`<ellipse cx="${bx}" cy="${ty}" rx="${hw}" ry="6" fill="none" stroke="${C.join}" stroke-width="2"/>`);
push(txt(bx, 372, 14, 700, C.ink, 'middle', 'Wallace', false));
push(txt(bx, 391, 10.8, 500, C.muted, 'middle', 'ureters spatulated + joined, sewn as one plate', false));
push(txt(bx, 408, 11, 700, '#991B1B', 'middle', 'stricture ~0% &#183; but bilateral if it occurs', false));

// ---- shared structure labels (on Bricker) -------------------------------
lead(ax - 92, 110, 150, 130); push(txt(146, 134, 10.5, 600, C.ink, 'end', 'ureters'));
lead(ax + hw, 290, ax + 92, 300); push(txt(ax + 96, 304, 10.5, 600, C.ink, 'start', 'ileal segment'));
lead(ax - hw + 2, 218, 138, 200); push(txt(134, 196, 10.5, 600, C.join, 'end', 'end-to-side'));
push(txt(134, 210, 10.5, 600, C.join, 'end', 'anastomosis'));
lead(ax, by + 8, ax - 70, 360); push(txt(ax - 74, 364, 10.5, 600, C.ink, 'end', 'stoma'));
lead(bx, ty, bx + 66, 198); push(txt(bx + 70, 202, 10.5, 600, C.join, 'start', 'single conjoined'));
push(txt(bx + 70, 216, 10.5, 600, C.join, 'start', 'anastomosis'));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Two panels of ureteroenteric anastomosis to an ileal conduit. Bricker: each ureter is anastomosed separately end-to-side to the closed proximal ileum. Wallace: the two ureters are spatulated and joined into a single plate sewn to the open proximal ileal end.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'ureteroenteric-anastomosis.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
