#!/usr/bin/env node
/**
 * WARWIKI original schematic — urethral cross-section: normal vs spongiofibrosis.
 *
 * Two transverse sections of the anterior urethra. Normal: open lumen lined by
 * epithelium within the vascular corpus spongiosum. Stricture: spongiofibrosis
 * (scar) encases and compresses the lumen — the depth of which (Devine) drives
 * severity.
 *
 * Output: static/img/diagrams/urethral-cross-section.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', spongio: '#FBE4E6', spongioEdge: '#C98A92',
  sinusoid: '#F3C6CC', epi: '#B0815A', lumen: '#FFFFFF', scar: '#9AA3AE', scarEdge: '#6B7280', lead: '#475569' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 410;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.2" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}
function lead(x1, y1, x2, y2) { push(`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${C.lead}" stroke-width="1"/>`); push(`<circle cx="${f(x2)}" cy="${f(y2)}" r="1.8" fill="${C.lead}"/>`); }

// sinusoid stipple positions (shared)
const stip = [[-34, -12], [-22, 22], [16, -30], [30, 14], [-8, 34], [38, -10], [-38, 8], [6, -40], [-18, -34], [24, 34]];

function section(cx, cy, stricture) {
  // corpus spongiosum + tunica
  push(`<circle cx="${cx}" cy="${cy}" r="64" fill="${C.spongio}" stroke="${C.spongioEdge}" stroke-width="2"/>`);
  for (const [dx, dy] of stip) push(`<circle cx="${cx + dx}" cy="${cy + dy}" r="3" fill="${C.sinusoid}"/>`);
  if (!stricture) {
    // open stellate lumen lined by epithelium
    push(`<path d="M ${cx} ${cy - 17} L ${cx + 7} ${cy - 4} L ${cx + 18} ${cy} L ${cx + 7} ${cy + 4} L ${cx} ${cy + 17} L ${cx - 7} ${cy + 4} L ${cx - 18} ${cy} L ${cx - 7} ${cy - 4} Z" fill="${C.lumen}" stroke="${C.epi}" stroke-width="3"/>`);
  } else {
    // spongiofibrosis ring encasing a pinhole lumen
    push(`<circle cx="${cx}" cy="${cy}" r="30" fill="${C.scar}" stroke="${C.scarEdge}" stroke-width="1.5" fill-opacity="0.92"/>`);
    push(`<circle cx="${cx}" cy="${cy}" r="30" fill="url(#hatch)"/>`);
    push(`<circle cx="${cx}" cy="${cy}" r="4.5" fill="${C.lumen}" stroke="${C.epi}" stroke-width="2"/>`);
  }
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 40, 16, 700, C.ink, 'start', 'Urethral cross-section &#8212; normal vs spongiofibrosis', false));
push(txt(40, 59, 12.5, 500, C.muted, 'start', 'a stricture is scar within the corpus spongiosum that encases and compresses the lumen', false));

const ax = 232, bx = 580, cy = 212;
section(ax, cy, false);
section(bx, cy, true);

// panel titles
push(txt(ax, 320, 13, 700, '#166534', 'middle', 'Normal'));
push(txt(bx, 320, 13, 700, '#991B1B', 'middle', 'Stricture (spongiofibrosis)'));

// normal labels
lead(ax, cy, ax - 78, cy - 64); push(txt(ax - 80, cy - 66, 11, 600, C.ink, 'end', 'urethral lumen'));
lead(ax + 14, cy - 8, ax + 92, cy - 52); push(txt(ax + 96, cy - 54, 11, 600, C.ink, 'start', 'epithelium'));
lead(ax + 44, cy + 30, ax + 96, cy + 58); push(txt(ax + 96, cy + 62, 11, 600, C.ink, 'start', 'corpus spongiosum'));
lead(ax, cy - 64, ax - 70, cy + 6); push(txt(ax - 74, cy + 10, 11, 600, C.ink, 'end', 'tunica'));

// stricture labels
lead(bx + 21, cy - 21, bx + 86, cy - 54); push(txt(bx + 90, cy - 56, 11, 600, '#991B1B', 'start', 'spongiofibrosis'));
lead(bx, cy, bx - 70, cy + 50); push(txt(bx - 74, cy + 54, 11, 600, C.ink, 'end', 'pinhole lumen'));

// devine note
push(txt(W / 2, 384, 11.5, 500, C.muted, 'middle', 'the depth of spongiofibrosis (Devine classification) determines severity and favors open reconstruction over endoscopic repair', false));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Two transverse urethral cross-sections. Normal: an open stellate lumen lined by epithelium within the vascular corpus spongiosum and tunica. Stricture: a ring of spongiofibrosis scar encases and compresses the lumen to a pinhole.">
<defs>
<pattern id="hatch" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="0" y2="7" stroke="#6B7280" stroke-width="1" opacity="0.45"/></pattern>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'urethral-cross-section.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
