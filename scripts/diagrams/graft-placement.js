#!/usr/bin/env node
/** Original WARWIKI conceptual graft–bed interfaces. Regenerate; do not edit SVG. */
const fs = require('fs');
const path = require('path');
const W = 900, H = 360;
const ink = '#1E293B', muted = '#475569', graft = '#185FA5';
const el = [];
const text = (x,y,s,size=12,weight=500) => el.push(`<text x="${x}" y="${y}" text-anchor="middle" font-family="Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${ink}">${s}</text>`);
el.push(`<rect x="1" y="1" width="898" height="358" rx="14" fill="white" stroke="#E2E8F0"/>`);
text(450,32,'Buccal graft placement: show contact with the supporting bed',17,700);
text(450,54,'Simplified graft–bed interfaces; dorsal is up in every panel. Not a complete operative cross-section.',12);
for (const [i,cx] of [160,450,740].entries()) {
  // Enlarged interface: adjacent graft and bed deliberately have no intervening gap.
  el.push(`<ellipse cx="${cx}" cy="157" rx="66" ry="30" fill="#E7D9CB" stroke="#B99873"/>`);
  el.push(`<ellipse cx="${cx}" cy="212" rx="67" ry="57" fill="#F3DEDF" stroke="#CF9DA3"/>`);
  if (i !== 1) {
    el.push(`<path d="M${cx-34},191 H${cx+34} V218 A34,27 0 0 1 ${cx-34},218 Z" fill="white" stroke="${muted}"/>`);
    el.push(`<rect x="${cx-37}" y="178" width="74" height="10" fill="#E7D9CB" stroke="#B99873"/>`);
    el.push(`<path d="M${cx-35},189 H${cx+35}" stroke="${graft}" stroke-width="6"/>`);
    for (const dx of [-22,0,22]) el.push(`<path d="M${cx+dx-3},183 L${cx+dx+3},194" stroke="#92400E" stroke-width="1.8"/>`);
    text(cx,118,'Tunical supporting bed',12,700);
    if (i === 2) {
      el.push(`<path d="M${cx},245 V270" stroke="${muted}" stroke-dasharray="4 3" stroke-width="2"/>`);
      text(cx+56,275,'ventral access',10);
    }
  } else {
    el.push(`<path d="M${cx-34},230 H${cx+34} V205 A34,27 0 0 0 ${cx-34},205 Z" fill="white" stroke="${muted}"/>`);
    el.push(`<path d="M${cx-35},232 H${cx+35}" stroke="${graft}" stroke-width="6"/>`);
    el.push(`<path d="M${cx-37},236 Q${cx},270 ${cx+37},236" fill="#F3DEDF" stroke="#CF9DA3"/>`);
    for (const dx of [-22,0,22]) el.push(`<path d="M${cx+dx-3},228 L${cx+dx+3},240" stroke="#92400E" stroke-width="1.8"/>`);
    text(cx,118,'Spongiosum supports ventral graft',12,700);
  }
  text(cx,215,'lumen',11);
  text(cx,301,['Dorsal onlay (Barbagli)','Ventral onlay','Dorsal inlay (Asopa)'][i],14,700);
  text(cx,323,['Dorsal opening; graft on tunical bed','Graft covered by spongioplasty','Ventral access; dorsal graft bed'][i],11);
}
text(450,347,'Blue = graft; short brown lines = fixation. Bed contact supports take; no universal preferred side.',11);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Buccal graft placement interfaces">\n${el.join('\n')}\n</svg>\n`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'graft-placement.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, require('./lib/metadata').withFigureMetadata(svg, 'graft-placement'));
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out));
