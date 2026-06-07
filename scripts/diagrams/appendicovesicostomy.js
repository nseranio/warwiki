#!/usr/bin/env node
/**
 * WARWIKI original schematic — appendicovesicostomy (Mitrofanoff).
 *
 * The appendix on its mesoappendix is left attached to the cecum at one end,
 * tunneled submucosally into the bladder (flap-valve continence), and brought to
 * the skin (umbilicus or RLQ) as a catheterizable, continent stoma. Cross-section
 * inset: bladder filling compresses the channel in its tunnel, resisting leak.
 *
 * Output: static/img/diagrams/appendicovesicostomy.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', skin: '#F4E6DA', skinEdge: '#D8C3B6',
  app: '#F3DBD2', appEdge: '#CC9079', appLumen: '#FBEFE9', mes: '#E7D9CB', mesEdge: '#B99873',
  blad: '#E2ECF5', bladEdge: '#4F6F92', muc: '#C6485B', cath: '#0F766E', tunnel: '#0F766E', vessel: '#B91C1C' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 390;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Appendicovesicostomy (Mitrofanoff) &#8212; a continent catheterizable channel', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'appendix on its mesoappendix: tunneled into the bladder for a flap-valve, brought to the skin as a dry, catheterizable stoma', false));

// ---- abdominal wall + stoma (top) ----
push(`<rect x="70" y="92" width="360" height="16" rx="4" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="1.4"/>`);
push(txt(90, 86, 9, 600, C.skinEdge, 'start', 'abdominal wall'));
// stoma opening (umbilicus / RLQ)
push(`<ellipse cx="250" cy="100" rx="11" ry="7" fill="#FFFFFF" stroke="${C.appEdge}" stroke-width="1.8"/>`);
push(txt(250, 78, 9.5, 700, C.ink, 'middle', 'catheterizable stoma'));
push(txt(250, 126, 8.5, 500, C.muted, 'middle', 'umbilicus or RLQ', false));
// catheter (CIC) going in
push(`<line x1="250" y1="70" x2="250" y2="96" stroke="${C.cath}" stroke-width="3" stroke-dasharray="2 3" stroke-linecap="round"/>`);
push(txt(298, 92, 8.5, 600, C.cath, 'start', 'CIC catheter'));

// ---- appendix channel (stoma -> bladder) ----
push(`<path d="M 250 108 C 252 160, 244 210, 250 250" fill="none" stroke="${C.appEdge}" stroke-width="16" stroke-linecap="round"/>`);
push(`<path d="M 250 108 C 252 160, 244 210, 250 250" fill="none" stroke="${C.appLumen}" stroke-width="8" stroke-linecap="round"/>`);
push(txt(196, 180, 9.5, 700, C.appEdge, 'middle', 'appendix'));
// mesoappendix (vessels) along the channel
push(`<path d="M 268 120 C 300 160, 296 210, 274 244" fill="none" stroke="${C.mesEdge}" stroke-width="1.6"/>`);
for (let i = 0; i < 3; i++) push(`<line x1="${262 + i}" y1="${150 + i * 34}" x2="${288}" y2="${150 + i * 34}" stroke="${C.vessel}" stroke-width="1.2"/>`);
push(txt(316, 188, 8.5, 600, C.mesEdge, 'middle', 'mesoappendix'));
push(txt(316, 199, 8, 500, C.vessel, 'middle', '(blood supply)'));

// ---- bladder + submucosal tunnel reimplant ----
push(`<path d="M 120 360 C 108 280, 200 256, 250 258 C 300 256, 392 280, 380 360 C 368 396, 132 396, 120 360 Z" fill="${C.blad}" stroke="${C.bladEdge}" stroke-width="2.2" stroke-linejoin="round"/>`);
push(txt(180, 330, 11, 700, C.bladEdge, 'middle', 'bladder'));
// submucosal tunnel where the appendix enters (flap-valve)
push(`<path d="M 250 256 C 250 278, 244 296, 232 308" fill="none" stroke="${C.tunnel}" stroke-width="2.4" stroke-dasharray="4 3"/>`);
push(txt(300, 280, 9, 700, C.tunnel, 'start', 'submucosal'));
push(txt(300, 292, 9, 700, C.tunnel, 'start', 'tunnel (flap-valve)'));

// ---- flap-valve cross-section inset ----
const ix = 560, iy = 250;
push(`<rect x="${ix - 90}" y="${iy - 96}" width="200" height="210" rx="12" fill="#F8FAFC" stroke="#EAEDF1" stroke-width="1.2"/>`);
push(txt(ix + 10, iy - 74, 11.5, 700, C.ink, 'middle', 'Flap-valve', false));
push(txt(ix + 10, iy - 59, 9, 500, C.muted, 'middle', 'continence = passive', false));
// bladder wall slab
push(`<rect x="${ix - 70}" y="${iy - 34}" width="160" height="30" fill="${C.blad}" stroke="${C.bladEdge}" stroke-width="1.4"/>`);
push(txt(ix - 60, iy - 40, 8, 600, C.bladEdge, 'start', 'detrusor'));
// mucosa layer
push(`<rect x="${ix - 70}" y="${iy - 4}" width="160" height="8" fill="${C.muc}" opacity="0.5"/>`);
push(txt(ix + 86, iy + 4, 8, 600, C.muc, 'end', 'mucosa'));
// channel in the submucosal tunnel (compressed)
push(`<ellipse cx="${ix}" cy="${iy - 10}" rx="22" ry="7" fill="${C.appLumen}" stroke="${C.appEdge}" stroke-width="2"/>`);
push(`<line x1="${ix - 7}" y1="${iy - 10}" x2="${ix + 7}" y2="${iy - 10}" stroke="${C.appEdge}" stroke-width="1.6"/>`);
// bladder-pressure arrows compressing it
for (const dx of [-22, 0, 22]) push(`<line x1="${ix + dx}" y1="${iy - 50}" x2="${ix + dx}" y2="${iy - 24}" stroke="${C.bladEdge}" stroke-width="1.6" marker-end="url(#av)"/>`);
push(txt(ix + 10, iy + 40, 9, 500, C.muted, 'middle', 'a full bladder presses the', false));
push(txt(ix + 10, iy + 52, 9, 500, C.muted, 'middle', 'channel flat against the wall', false));
push(txt(ix + 10, iy + 70, 9, 500, C.muted, 'middle', '&#8594; stays dry between caths', false));


const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Appendicovesicostomy or Mitrofanoff continent catheterizable channel. The appendix, kept on its mesoappendix blood supply, runs from a catheterizable skin stoma at the umbilicus or right lower quadrant down to the bladder, where it is reimplanted through a submucosal tunnel that creates a flap-valve. A cross-section inset shows the flap-valve: the channel lies in a submucosal tunnel between the detrusor and the mucosa, and a full bladder presses it flat against the wall so the patient stays dry between catheterizations. Key: it is the first-line catheterizable channel needing about a 4 to 5 to 1 tunnel-to-diameter ratio; the appendix is end-arterial so protect the mesoappendix; if the appendix is absent or used for a MACE, build a Yang-Monti channel instead; stomal stenosis is the commonest late problem and umbilical stomas tend to fare better.">
<defs>
<marker id="av" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.bladEdge}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'appendicovesicostomy.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
