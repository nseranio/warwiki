#!/usr/bin/env node
/**
 * WARWIKI original schematic — Indiana pouch (continent cutaneous diversion).
 *
 * Detubularized right colon (cecum + ascending colon) forms a low-pressure
 * reservoir; the terminal ileum is tapered (~14 Fr) and brought to a
 * catheterizable umbilical stoma, its continence supplied by the ileocecal valve
 * + ileal-limb plication + low pouch pressure. Ureters reimplanted into the pouch.
 *
 * Output: static/img/diagrams/indiana-pouch.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', skin: '#F4E6DA', skinEdge: '#D8C3B6',
  bowel: '#F3DBD2', bowelEdge: '#CC9079', lumen: '#FBEFE9', ureter: '#185FA5', cath: '#0F766E',
  valve: '#B45309', seam: '#185FA5', step: '#15803D' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 840, H = 381;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Indiana pouch &#8212; continent cutaneous diversion', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'detubularized right colon reservoir + tapered ileal limb to a catheterizable stoma; the ileocecal valve gives continence', false));

const cx = 250;
// abdominal wall + umbilical catheterizable stoma
push(`<rect x="80" y="92" width="320" height="16" rx="4" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="1.4"/>`);
push(txt(96, 86, 9, 600, C.skinEdge, 'start', 'abdominal wall'));
push(`<ellipse cx="${cx}" cy="100" rx="10" ry="6.5" fill="#FFFFFF" stroke="${C.bowelEdge}" stroke-width="1.8"/>`);
push(txt(cx, 78, 9.5, 700, C.ink, 'middle', 'catheterizable stoma'));
push(txt(cx, 126, 8.5, 500, C.muted, 'middle', '(umbilicus)', false));
push(`<line x1="${cx}" y1="62" x2="${cx}" y2="96" stroke="${C.cath}" stroke-width="3" stroke-dasharray="2 3" stroke-linecap="round"/>`);
push(txt(cx + 46, 64, 9, 600, C.cath, 'start', 'CIC q4-6h'));

// tapered terminal ileum (efferent limb) - narrow tube
push(`<path d="M ${cx} 108 C ${cx + 4} 150, ${cx - 4} 196, ${cx} 224" fill="none" stroke="${C.bowelEdge}" stroke-width="12" stroke-linecap="round"/>`);
push(`<path d="M ${cx} 108 C ${cx + 4} 150, ${cx - 4} 196, ${cx} 224" fill="none" stroke="${C.lumen}" stroke-width="5" stroke-linecap="round"/>`);
push(txt(cx + 70, 168, 9, 700, C.bowelEdge, 'middle', 'tapered terminal'));
push(txt(cx + 70, 180, 9, 700, C.bowelEdge, 'middle', 'ileum (~14 Fr)'));

// ileocecal valve (continence) at reservoir entry
push(`<ellipse cx="${cx}" cy="236" rx="20" ry="12" fill="${C.bowel}" stroke="${C.valve}" stroke-width="2.4"/>`);
for (const dx of [-9, 0, 9]) push(`<line x1="${cx + dx}" y1="230" x2="${cx + dx}" y2="242" stroke="${C.valve}" stroke-width="1.4"/>`);
push(txt(cx + 70, 232, 9, 700, C.valve, 'middle', 'ileocecal valve'));
push(txt(cx + 70, 244, 8, 500, C.muted, 'middle', '+ plication = continence'));

// reservoir: detubularized right colon, reconfigured pouch
push(`<path d="M ${cx - 100} 332 C ${cx - 112} 256, ${cx - 30} 244, ${cx} 248 C ${cx + 30} 244, ${cx + 112} 256, ${cx + 100} 332 C ${cx + 86} 378, ${cx - 86} 378, ${cx - 100} 332 Z" fill="${C.bowel}" stroke="${C.bowelEdge}" stroke-width="2.2" stroke-linejoin="round"/>`);
// detubularized/reconfigured seams
push(`<path d="M ${cx - 88} 300 Q ${cx} 286 ${cx + 88} 300" fill="none" stroke="${C.seam}" stroke-width="1.4" stroke-dasharray="3 3"/>`);
push(`<path d="M ${cx - 80} 340 Q ${cx} 356 ${cx + 80} 340" fill="none" stroke="${C.seam}" stroke-width="1.4" stroke-dasharray="3 3"/>`);
push(txt(cx, 322, 10.5, 700, C.bowelEdge, 'middle', 'detubularized'));
push(txt(cx, 338, 10.5, 700, C.bowelEdge, 'middle', 'right colon'));
// ureters reimplanted into the reservoir
for (const s of [-1, 1]) {
  push(`<path d="M ${cx + s * 150} 196 C ${cx + s * 120} 230, ${cx + s * 96} 256, ${cx + s * 70} 274" fill="none" stroke="${C.ureter}" stroke-width="3.4" stroke-linecap="round"/>`);
  push(`<circle cx="${cx + s * 70}" cy="274" r="5" fill="none" stroke="${C.ureter}" stroke-width="1.8"/>`);
}
push(txt(cx - 150, 188, 9, 700, C.ureter, 'middle', 'ureters'));

// ---- note box ----
const bxr = 560, byr = 110;
push(`<rect x="${bxr}" y="${byr}" width="236" height="208" rx="12" fill="#F8FAFC" stroke="#EAEDF1" stroke-width="1.2"/>`);
push(txt(bxr + 16, byr + 24, 12, 700, C.ink, 'start', 'Continent, no bag', false));
const items = [
  ['Reservoir', 'detubularized right colon = low pressure'],
  ['Continence', 'ileocecal valve + tapered/plicated ileum'],
  ['Emptying', 'self-catheterize the stoma every 4-6 h'],
  ['vs neobladder', 'cutaneous stoma, not voided per urethra'],
];
items.forEach(([h, d], i) => {
  const y = byr + 52 + i * 38;
  push(`<circle cx="${bxr + 22}" cy="${y - 4}" r="3.4" fill="${C.step}"/>`);
  push(txt(bxr + 32, y, 10.5, 700, C.ink, 'start', h));
  push(txt(bxr + 32, y + 13, 9, 500, C.muted, 'start', d));
});


const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Indiana pouch continent cutaneous urinary diversion. A low-pressure reservoir is built from detubularized right colon (cecum and ascending colon). The terminal ileum is tapered to about 14 French and brought to a catheterizable umbilical stoma; continence is supplied by the ileocecal valve plus plication of the ileal limb plus low reservoir pressure. The ureters are reimplanted into the pouch. The patient self-catheterizes the stoma every 4 to 6 hours and wears no external bag, in contrast to an orthotopic neobladder that is voided per urethra. Key: chosen for continent diversion when the patient is not an orthotopic-neobladder candidate due to positive urethral margin, sphincter damage, or prior pelvic radiation; continence is about 89 percent at 3 years; lifelong vitamin B12 and metabolic-acidosis surveillance is needed after ileocecal resection, and stomal stenosis and pouch stones are common late issues.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'indiana-pouch.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
