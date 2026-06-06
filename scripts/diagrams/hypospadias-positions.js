#!/usr/bin/env node
/**
 * WARWIKI original schematic — hypospadias meatal positions.
 *
 * Stylized lateral view of the penis / scrotum / perineum with the meatal
 * positions numbered along the ventral aspect (distal to proximal) and
 * colour-coded into the anterior / middle / posterior groups, with a grouped
 * legend carrying the approximate frequencies.
 *
 * Output: static/img/diagrams/hypospadias-positions.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', axis: '#334155', muted: '#64748B', border: '#E2E8F0', skin: '#F1F5F9', skinEdge: '#94A3B8',
  ant: '#16A34A', mid: '#D97706', post: '#DC2626' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 780, H = 432;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.2" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 40, 16, 700, C.ink, 'start', 'Hypospadias &#8212; classification by meatal position', false));
push(txt(40, 59, 12.5, 500, C.muted, 'start', 'graded by the final meatal location after chordee release (a distal-appearing meatus may prove more proximal)', false));

// ---- stylized lateral anatomy -------------------------------------------
push(`<path d="M 168 126 L 320 122 Q 384 120 386 154 Q 384 188 320 184 L 168 190 Z" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="1.8"/>`);
push(`<line x1="320" y1="124" x2="320" y2="182" stroke="${C.skinEdge}" stroke-width="1.2" stroke-dasharray="3 3"/>`);
push(`<ellipse cx="168" cy="232" rx="48" ry="54" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="1.8"/>`);
push(`<path d="M 136 276 Q 100 300 64 286 Q 96 260 146 256 Z" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="1.6"/>`);
push(txt(352, 110, 10.5, 500, C.muted, 'middle', 'glans', false));
push(txt(176, 301, 10.5, 500, C.muted, 'middle', 'scrotum', false));
push(txt(86, 301, 10.5, 500, C.muted, 'middle', 'perineum', false));

// ---- meatal-position dots ------------------------------------------------
const dots = [
  [1, 360, 172, C.ant], [2, 336, 180, C.ant], [3, 312, 186, C.ant],
  [4, 250, 188, C.mid],
  [5, 206, 188, C.post], [6, 180, 196, C.post], [7, 168, 266, C.post], [8, 96, 270, C.post],
];
for (const [n, x, y, c] of dots) {
  push(`<circle cx="${x}" cy="${y}" r="8.5" fill="${c}" stroke="#FFFFFF" stroke-width="1.8"/>`);
  push(txt(x, y + 3.6, 10.5, 700, '#FFFFFF', 'middle', String(n), false));
}

// ---- grouped legend (right) ---------------------------------------------
const lx = 448;
let ly = 116;
function group(color, title, pct, items) {
  push(`<circle cx="${lx + 6}" cy="${ly - 4}" r="6" fill="${color}"/>`);
  push(txt(lx + 20, ly, 12.5, 700, color, 'start', title, false));
  push(txt(lx + 250, ly, 12, 700, color, 'end', pct, false));
  ly += 20;
  for (const it of items) { push(txt(lx + 22, ly, 11.5, 500, C.axis, 'start', it, false)); ly += 18; }
  ly += 8;
}
group(C.ant, 'Anterior (distal)', '~70%', ['1  Glanular', '2  Coronal', '3  Subcoronal']);
group(C.mid, 'Middle', '~10%', ['4  Midshaft / penile']);
group(C.post, 'Posterior (proximal)', '~20%', ['5  Proximal penile', '6  Penoscrotal', '7  Scrotal', '8  Perineal']);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Stylized lateral view of the penis, scrotum and perineum with eight numbered hypospadias meatal positions along the ventral aspect, colour-coded into anterior, middle and posterior groups, with a grouped legend listing the positions and approximate frequencies.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'hypospadias-positions.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
