#!/usr/bin/env node
/**
 * WARWIKI original schematic — buccal mucosa graft harvest.
 *
 * Intraoral view of the right inner cheek: the graft is taken from the central
 * buccal mucosa, staying clear of Stensen's (parotid) duct papilla — opposite
 * the 2nd maxillary molar — and the oral commissure, with ~1 cm margins from the
 * gingiva. The workhorse substitution graft of urethral reconstruction.
 *
 * Output: static/img/diagrams/bmg-harvest.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', muc: '#F2C9CE', mucEdge: '#D88A95',
  tooth: '#F6F1E7', toothEdge: '#D6CBB2', gum: '#E59AA4', duct: '#B91C1C', graft: '#185FA5',
  graftFill: '#DCE7F1', warn: '#B91C1C', ok: '#15803D', margin: '#0F766E' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 366;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Buccal mucosa graft harvest &#8212; the workhorse urethroplasty graft', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'intraoral view of the cheek: harvest centrally, clear of Stensen&#8217;s duct and the oral commissure', false));

// cheek mucosa field
const mx0 = 90, mx1 = 600, my0 = 96, my1 = 326;
push(`<rect x="${mx0}" y="${my0}" width="${mx1 - mx0}" height="${my1 - my0}" rx="40" fill="${C.muc}" stroke="${C.mucEdge}" stroke-width="1.6"/>`);
// upper gingiva + teeth (top)
push(`<rect x="${mx0 + 20}" y="${my0 + 4}" width="${mx1 - mx0 - 40}" height="20" rx="8" fill="${C.gum}"/>`);
for (let i = 0; i < 8; i++) { const tx = mx0 + 50 + i * 56; push(`<rect x="${tx}" y="${my0 + 16}" width="30" height="22" rx="5" fill="${C.tooth}" stroke="${C.toothEdge}" stroke-width="1"/>`); }
push(txt((mx0 + mx1) / 2, my0 - 2, 9, 600, C.muted, 'middle', 'upper teeth / gingiva'));
// lower gingiva + teeth (bottom)
push(`<rect x="${mx0 + 20}" y="${my1 - 24}" width="${mx1 - mx0 - 40}" height="20" rx="8" fill="${C.gum}"/>`);
for (let i = 0; i < 8; i++) { const tx = mx0 + 50 + i * 56; push(`<rect x="${tx}" y="${my1 - 38}" width="30" height="22" rx="5" fill="${C.tooth}" stroke="${C.toothEdge}" stroke-width="1"/>`); }
push(txt((mx0 + mx1) / 2, my1 + 16, 9, 600, C.muted, 'middle', 'lower teeth / gingiva'));
// oral commissure (anterior, left)
push(`<path d="M ${mx0 + 2} ${(my0 + my1) / 2 - 28} C ${mx0 - 18} ${(my0 + my1) / 2}, ${mx0 - 18} ${(my0 + my1) / 2}, ${mx0 + 2} ${(my0 + my1) / 2 + 28}" fill="none" stroke="${C.mucEdge}" stroke-width="2.4"/>`);
push(txt(mx0 + 4, my0 - 2, 9, 700, C.warn, 'start', 'commissure (avoid)'));

// Stensen's (parotid) duct papilla, opposite the 2nd maxillary molar
const dx = mx0 + 50 + 1.5 * 56 + 15, dy = my0 + 58;
push(`<circle cx="${dx}" cy="${dy}" r="6" fill="#FFFFFF" stroke="${C.duct}" stroke-width="2.2"/>`);
push(`<line x1="${mx0 + 30}" y1="${dy + 14}" x2="${mx1 - 30}" y2="${dy + 14}" stroke="${C.duct}" stroke-width="1.4" stroke-dasharray="5 4"/>`);
push(txt(dx + 12, dy - 6, 9.5, 700, C.duct, 'start', "Stensen's (parotid) duct"));
push(txt(dx + 12, dy + 6, 8.5, 500, C.muted, 'start', 'opposite the 2nd upper molar &#8212; stay below'));

// graft outline (central cheek, below the duct line, off the commissure)
const gx = 350, gy = 232;
push(`<ellipse cx="${gx}" cy="${gy}" rx="118" ry="46" fill="${C.graftFill}" stroke="${C.graft}" stroke-width="2.6" stroke-dasharray="7 4"/>`);
push(txt(gx, gy - 2, 11, 700, C.graft, 'middle', 'graft'));
push(txt(gx, gy + 14, 9, 500, C.muted, 'middle', 'up to ~2.5 cm wide &#215; needed length'));
// margins
push(`<path d="M ${gx - 118} ${gy + 46} l 0 14 M ${gx - 118} ${gy + 53} l -34 0" fill="none" stroke="${C.margin}" stroke-width="1.2"/>`);
push(txt(gx - 160, gy + 57, 8.5, 600, C.margin, 'end', '~1 cm margin'));


const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Buccal mucosa graft harvest shown as an intraoral view of the cheek, framed by the upper and lower teeth and gingiva with the oral commissure anteriorly. Stensen's parotid duct papilla sits high on the cheek opposite the second maxillary molar, with a dashed line marking the stay-below boundary. The graft is outlined as an ellipse in the central cheek below the duct line and clear of the commissure, up to about 2.5 centimeters wide by the needed length, with roughly 1 centimeter margins from the gingiva. Key: non-keratinized epithelium with thin lamina propria gives excellent graft take; mark with the cheek tented, infiltrate, and harvest at partial thickness; spare Stensen's duct, the commissure, and the lip; open versus closed donor closure gives similar pain; use bilateral cheeks or add lingual or labial mucosa for long or panurethral grafts.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'bmg-harvest.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
