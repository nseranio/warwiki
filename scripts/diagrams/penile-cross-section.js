#!/usr/bin/env node
/**
 * WARWIKI original schematic — penile transverse cross-section.
 *
 * Mid-shaft section (dorsal up): paired corpora cavernosa with their tunica
 * albuginea, deep cavernosal arteries and intercavernosal septum; the ventral
 * corpus spongiosum carrying the urethra; the dorsal neurovascular bundle
 * (deep dorsal vein, dorsal arteries, dorsal nerves); Buck's fascia and skin.
 *
 * Output: static/img/diagrams/penile-cross-section.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', skin: '#F8FAFC', skinEdge: '#94A3B8',
  erectile: '#FBE4E6', erectileEdge: '#C98A92', tunica: '#EFEADF', tunicaEdge: '#A89B80',
  bucks: '#0F766E', artery: '#DC2626', vein: '#2563EB', nerve: '#CA8A04', lumen: '#FFFFFF', lead: '#475569' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 760, H = 470;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.2" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}
function lead(x1, y1, x2, y2) { push(`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${C.lead}" stroke-width="1"/>`); push(`<circle cx="${f(x1)}" cy="${f(y1)}" r="1.8" fill="${C.lead}"/>`); }

const cx = 262, cy = 258;
push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 38, 16, 700, C.ink, 'start', 'Penile cross-section (mid-shaft)', false));
push(txt(40, 57, 12.5, 500, C.muted, 'start', 'dorsal up &#8212; the relationships that govern Peyronie&#8217;s, prosthesis, and nerve-sparing surgery', false));

// skin + Buck's fascia
push(`<circle cx="${cx}" cy="${cy}" r="124" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="1.8"/>`);
push(`<circle cx="${cx}" cy="${cy}" r="106" fill="none" stroke="${C.bucks}" stroke-width="2.4"/>`);

// corpora cavernosa (tunica + erectile + deep artery)
for (const dx of [-40, 40]) {
  push(`<circle cx="${cx + dx}" cy="${cy - 16}" r="45" fill="${C.tunica}" stroke="${C.tunicaEdge}" stroke-width="1.6"/>`);
  push(`<circle cx="${cx + dx}" cy="${cy - 16}" r="37" fill="${C.erectile}" stroke="${C.erectileEdge}" stroke-width="1.2"/>`);
  push(`<circle cx="${cx + dx}" cy="${cy - 16}" r="4.5" fill="${C.artery}"/>`);
}
// intercavernosal septum
push(`<line x1="${cx}" y1="${cy - 52}" x2="${cx}" y2="${cy + 20}" stroke="${C.tunicaEdge}" stroke-width="2.5" stroke-dasharray="4 3"/>`);

// corpus spongiosum + urethra (ventral)
push(`<circle cx="${cx}" cy="${cy + 62}" r="31" fill="${C.tunica}" stroke="${C.tunicaEdge}" stroke-width="1.6"/>`);
push(`<circle cx="${cx}" cy="${cy + 62}" r="24" fill="${C.erectile}" stroke="${C.erectileEdge}" stroke-width="1.2"/>`);
push(`<circle cx="${cx}" cy="${cy + 62}" r="6.5" fill="${C.lumen}" stroke="${C.erectileEdge}" stroke-width="1.6"/>`);

// dorsal neurovascular bundle (12 o'clock, just inside Buck's)
push(`<ellipse cx="${cx}" cy="${cy - 92}" rx="7" ry="5" fill="${C.vein}"/>`);
for (const dx of [-12, 12]) push(`<circle cx="${cx + dx}" cy="${cy - 90}" r="4" fill="${C.artery}"/>`);
for (const dx of [-21, 21]) push(`<circle cx="${cx + dx}" cy="${cy - 86}" r="3.5" fill="${C.nerve}"/>`);

// ---- labels (distributed around) ----------------------------------------
push(txt(cx, 96, 12.5, 700, C.ink, 'middle', 'dorsal neurovascular bundle'));
push(txt(cx, 111, 10, 500, C.muted, 'middle', 'deep dorsal vein &#183; dorsal arteries &#183; dorsal nerves'));
lead(cx, cy - 92, cx, 120);

lead(cx + 70, cy - 30, 470, 196); push(txt(476, 200, 11.5, 600, C.ink, 'start', 'corpus cavernosum (&#215;2)'));
lead(cx + 40, cy - 16, 470, 232); push(txt(476, 236, 11.5, 600, C.artery, 'start', 'deep cavernosal artery'));
lead(cx + 78, cy + 4, 470, 268); push(txt(476, 272, 11.5, 600, C.ink, 'start', 'tunica albuginea'));
lead(cx + 75, cy + 50, 470, 304); push(txt(476, 308, 11.5, 600, C.bucks, 'start', 'Buck&#8217;s fascia'));
lead(cx + 122, cy + 36, 470, 340); push(txt(476, 344, 11.5, 600, C.ink, 'start', 'skin'));

lead(cx, cy + 62, cx + 40, 418); push(txt(cx + 46, 422, 11.5, 600, C.ink, 'start', 'corpus spongiosum'));
lead(cx, cy + 62, cx - 30, 418); push(txt(cx - 36, 422, 11.5, 600, C.ink, 'end', 'urethra'));
lead(cx, cy - 12, 120, 214); push(txt(116, 218, 11, 600, C.ink, 'end', 'intercavernosal'));
push(txt(116, 232, 11, 600, C.ink, 'end', 'septum'));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Transverse mid-shaft penile cross-section with dorsal up: paired corpora cavernosa with tunica albuginea, deep cavernosal arteries and intercavernosal septum; ventral corpus spongiosum carrying the urethra; the dorsal neurovascular bundle of deep dorsal vein, dorsal arteries and dorsal nerves; Buck's fascia and skin.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'penile-cross-section.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
