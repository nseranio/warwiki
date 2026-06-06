#!/usr/bin/env node
/**
 * WARWIKI original schematic — perineal skin incisions for urethroplasty.
 *
 * Three panels, each a stylized perineal field (viewed from below, scrotum
 * anterior/top, anus posterior/bottom) with one incision geometry drawn over
 * a dashed midline reference: midline vertical, inverted-U, and lambda (LPI).
 * Panels are colour-coded by wound-complication rate.
 *
 * Output: static/img/diagrams/perineal-incisions.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', field: '#F8FAFC', fieldEdge: '#CBD5E1', mid: '#94A3B8', border: '#E2E8F0' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 432;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.2" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 40, 16, 700, C.ink, 'start', 'Perineal skin incisions for bulbar / posterior urethroplasty', false));
push(txt(40, 59, 12.5, 500, C.muted, 'start', 'the midline vertical incision is the contemporary default — lowest wound-complication rate, fewest neurovascular structures injured', false));

function panel(cx, color, name, incision, stat, preferred) {
  // perineal field
  push(`<ellipse cx="${cx}" cy="208" rx="66" ry="104" fill="${C.field}" stroke="${C.fieldEdge}" stroke-width="1.6"/>`);
  // dashed midline reference
  push(`<line x1="${cx}" y1="120" x2="${cx}" y2="296" stroke="${C.mid}" stroke-width="1" stroke-dasharray="3 4"/>`);
  // anus marker (posterior)
  push(`<circle cx="${cx}" cy="300" r="7" fill="#FFFFFF" stroke="${C.fieldEdge}" stroke-width="1.4"/>`);
  // incision
  push(`<path d="${incision}" fill="none" stroke="${color}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>`);
  // preferred chip
  if (preferred) {
    push(`<rect x="${cx - 34}" y="86" width="68" height="19" rx="9.5" fill="#DCFCE7" stroke="#16A34A" stroke-width="1"/>`);
    push(txt(cx, 99, 10.5, 700, '#166534', 'middle', 'preferred', false));
  }
  // labels below
  push(txt(cx, 350, 13.5, 700, color, 'middle', name));
  push(txt(cx, 369, 11, 500, C.muted, 'middle', stat));
}

const cxs = [178, 410, 642];
panel(cxs[0], '#16A34A', 'Midline vertical',
  `M ${cxs[0]} 132 L ${cxs[0]} 282`, 'SSI 1.9–3.1%', true);
panel(cxs[1], '#EA580C', 'Inverted-U',
  `M ${cxs[1] - 38} 282 L ${cxs[1] - 38} 168 Q ${cxs[1] - 38} 132 ${cxs[1]} 132 Q ${cxs[1] + 38} 132 ${cxs[1] + 38} 168 L ${cxs[1] + 38} 282`,
  'SSI 16–19%', false);
panel(cxs[2], '#DC2626', 'Lambda (LPI)',
  `M ${cxs[2]} 282 L ${cxs[2]} 190 L ${cxs[2] - 38} 140 M ${cxs[2]} 190 L ${cxs[2] + 38} 140`,
  'wound comp. ~23%', false);

// shared orientation note
push(txt(W / 2, 408, 11, 500, C.muted, 'middle', 'perineum viewed from below — anterior (scrotum) above, posterior (anus, &#9679;) below', false));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Three stylized perineal fields comparing the midline vertical, inverted-U, and lambda urethroplasty skin incisions, colour-coded by wound-complication rate, with the midline vertical marked preferred.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'perineal-incisions.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
