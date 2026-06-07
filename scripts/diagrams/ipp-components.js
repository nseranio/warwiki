#!/usr/bin/env node
/**
 * WARWIKI original schematic — three-piece inflatable penile prosthesis.
 *
 * Paired corporal cylinders + scrotal pump + retropubic reservoir, fluid-linked.
 * Squeezing the pump moves fluid reservoir -> cylinders (erection); the
 * deflation valve returns it cylinders -> reservoir (flaccid). Cross-section
 * shows the cylinders in the corpora cavernosa, urethra spared ventrally.
 *
 * Output: static/img/diagrams/ipp-components.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', bone: '#ECE4D4', boneEdge: '#B6A98C',
  skin: '#F4E6DA', skinEdge: '#D8C3B6', corp: '#F3DBDC', corpEdge: '#CF9DA3', dev: '#185FA5', fluid: '#CFE0F0',
  uret: '#94A3B8', tube: '#185FA5', step: '#15803D' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 860, H = 420;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Three-piece inflatable penile prosthesis', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'paired corporal cylinders + scrotal pump + retropubic reservoir, fluid-linked &#8212; an on-demand hydraulic erection', false));

// ---- lateral schematic ----
// pubic bone
push(`<ellipse cx="150" cy="276" rx="16" ry="30" fill="${C.bone}" stroke="${C.boneEdge}" stroke-width="1.4"/>`);
push(txt(150, 318, 8.5, 600, C.boneEdge, 'middle', 'pubis'));
// reservoir (space of Retzius, behind pubis)
push(`<ellipse cx="132" cy="214" rx="26" ry="20" fill="${C.fluid}" stroke="${C.dev}" stroke-width="2.4"/>`);
push(txt(132, 217, 8.5, 700, C.dev, 'middle', 'reservoir'));
push(txt(132, 184, 8, 500, C.muted, 'middle', '65-100 mL'));
// penis (shaft + glans), angled up-right
push(`<path d="M 188 262 L 360 150 A 22 22 0 0 1 388 178 L 214 296 A 18 18 0 0 1 188 262 Z" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="1.8" stroke-linejoin="round"/>`);
// corpus / cylinder inside (one shown laterally) with proximal + distal tips
push(`<path d="M 206 268 L 358 168" fill="none" stroke="${C.corpEdge}" stroke-width="14" stroke-linecap="round"/>`);
push(`<path d="M 206 268 L 358 168" fill="none" stroke="${C.dev}" stroke-width="7" stroke-linecap="round"/>`);
push(`<circle cx="206" cy="268" r="6" fill="${C.dev}"/>`);
push(txt(300, 150, 9.5, 700, C.dev, 'middle', 'cylinder'));
push(txt(196, 252, 8, 600, C.muted, 'middle', 'rear tip'));
// glans
push(txt(384, 196, 8.5, 600, C.skinEdge, 'middle', 'glans'));
// scrotum + pump
push(`<ellipse cx="232" cy="338" rx="40" ry="30" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="1.6"/>`);
push(`<ellipse cx="232" cy="338" rx="16" ry="20" fill="${C.fluid}" stroke="${C.dev}" stroke-width="2.4"/>`);
push(txt(232, 342, 8.5, 700, C.dev, 'middle', 'pump'));
push(txt(232, 378, 8.5, 600, C.muted, 'middle', 'scrotum'));
// tubing reservoir<->pump<->cylinder
push(`<path d="M 150 228 C 180 280, 210 310, 224 322" fill="none" stroke="${C.tube}" stroke-width="2" stroke-dasharray="1 4" stroke-linecap="round"/>`);
push(`<path d="M 224 322 C 212 300, 208 282, 208 272" fill="none" stroke="${C.tube}" stroke-width="2" stroke-dasharray="1 4" stroke-linecap="round"/>`);
// ---- cross-section inset (penis) ----
const ix = 470, iy = 150;
push(txt(ix, iy - 36, 10.5, 700, C.ink, 'middle', 'Cross-section', false));
push(`<circle cx="${ix}" cy="${iy}" r="40" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="1.6"/>`);
// two corpora cavernosa (dorsal) with cylinders
for (const s of [-1, 1]) {
  push(`<circle cx="${ix + s * 16}" cy="${iy - 6}" r="17" fill="${C.corp}" stroke="${C.corpEdge}" stroke-width="1.6"/>`);
  push(`<circle cx="${ix + s * 16}" cy="${iy - 6}" r="8" fill="${C.fluid}" stroke="${C.dev}" stroke-width="2"/>`);
}
// corpus spongiosum + urethra (ventral)
push(`<circle cx="${ix}" cy="${iy + 26}" r="11" fill="${C.corp}" stroke="${C.corpEdge}" stroke-width="1.4"/>`);
push(`<circle cx="${ix}" cy="${iy + 26}" r="4" fill="#FFFFFF" stroke="${C.uret}" stroke-width="1.4"/>`);
push(txt(ix + 50, iy - 8, 8.5, 700, C.dev, 'start', 'cylinders'));
push(txt(ix + 50, iy + 4, 8, 500, C.muted, 'start', 'in corpora cavernosa'));
push(txt(ix + 50, iy + 28, 8.5, 600, C.uret, 'start', 'urethra spared'));

// ---- cycle callout (right) ----
const rx = 600, ry = 92;
push(`<rect x="${rx}" y="${ry}" width="222" height="170" rx="12" fill="#F0FAF3" stroke="#CDEBD7" stroke-width="1.3"/>`);
push(txt(rx + 16, ry + 24, 12.5, 700, '#166534', 'start', 'On demand', false));
const steps = [
  ['Inflate', 'squeeze the pump &#8594; fluid reservoir &#8594; cylinders &#8594; rigid'],
  ['Deflate', 'press the deflation valve &#8594; cylinders &#8594; reservoir &#8594; flaccid'],
];
steps.forEach(([h, d], i) => {
  const y = ry + 60 + i * 56;
  push(`<circle cx="${rx + 22}" cy="${y - 4}" r="9" fill="#DCFCE7" stroke="${C.step}" stroke-width="1.4"/>`);
  push(txt(rx + 22, y, 10, 700, '#166534', 'middle', `${i + 1}`));
  push(txt(rx + 40, y - 4, 10.5, 700, C.ink, 'start', h));
  const words = d.split(' '); const mid = Math.ceil(words.length / 2);
  push(txt(rx + 40, y + 10, 9, 500, C.muted, 'start', words.slice(0, mid).join(' ')));
  push(txt(rx + 40, y + 22, 9, 500, C.muted, 'start', words.slice(mid).join(' ')));
});

// ---- key ----
push(`<line x1="40" y1="380" x2="820" y2="380" stroke="${C.border}" stroke-width="1"/>`);
push(txt(40, 399, 11, 600, C.ink, 'start', 'Highest-satisfaction ED therapy after medical options fail. Antibiotic/hydrophilic coatings + the no-touch technique drive infection &#8804; ~1-3%.', false));
push(txt(40, 415, 10.5, 500, C.muted, 'start', 'Two-piece (no separate reservoir) and malleable (semirigid, no pump) variants exist; reservoir may be ectopic when the retropubic space is hostile.', false));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Three-piece inflatable penile prosthesis in lateral view: paired cylinders implanted in the corpora cavernosa of the penis, a control pump in the scrotum, and a fluid reservoir of 65 to 100 milliliters in the retropubic space, all linked by tubing. A penile cross-section shows the two cylinders within the corpora cavernosa with the urethra spared ventrally in the spongiosum. On demand: squeezing the pump moves fluid from the reservoir to the cylinders for a rigid erection; pressing the deflation valve returns fluid to the reservoir for flaccidity. Key: highest-satisfaction ED therapy after medical options fail, with coatings and no-touch technique keeping infection around 1 to 3 percent; two-piece and malleable variants exist and the reservoir may be placed ectopically.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'ipp-components.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
