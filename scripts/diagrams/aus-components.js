#!/usr/bin/env node
/**
 * WARWIKI original schematic — artificial urinary sphincter (AMS 800).
 *
 * Three connected components: a cuff around the bulbar urethra, a scrotal
 * control pump, and a pressure-regulating balloon (PRB) in the retropubic space.
 * At rest the cuff is fluid-filled and the urethra is closed; squeezing the pump
 * shifts fluid to the PRB, the cuff opens to void, then auto-refills over 1-3 min.
 *
 * Output: static/img/diagrams/aus-components.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', bone: '#ECE4D4', boneEdge: '#B6A98C',
  blad: '#E2ECF5', bladEdge: '#4F6F92', uret: '#94A3B8', dev: '#185FA5', fluid: '#CFE0F0',
  tube: '#185FA5', arrow: '#0F766E', step: '#15803D' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 860, H = 432;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Artificial urinary sphincter (AMS 800) &#8212; three components', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'cuff + scrotal pump + pressure-regulating balloon, all fluid-connected &#8212; the gold standard for male SUI', false));

// ---- sagittal silhouette (left) ----
// pubic symphysis
push(`<ellipse cx="160" cy="214" rx="16" ry="30" fill="${C.bone}" stroke="${C.boneEdge}" stroke-width="1.4"/>`);
push(txt(150, 256, 8.5, 600, C.boneEdge, 'middle', 'pubis'));
// bladder
push(`<path d="M 196 168 C 188 116, 268 104, 300 132 C 318 150, 312 184, 292 196 C 262 214, 210 200, 196 168 Z" fill="${C.blad}" stroke="${C.bladEdge}" stroke-width="2" stroke-linejoin="round"/>`);
push(txt(252, 150, 10, 700, C.bladEdge, 'middle', 'bladder'));
// urethra: bladder neck -> down -> forward through bulb -> penis
push(`<path d="M 232 196 C 224 230, 214 252, 220 280 C 226 308, 260 322, 320 326 C 360 328, 392 330, 420 332" fill="none" stroke="${C.uret}" stroke-width="9" stroke-linecap="round"/>`);
push(`<path d="M 232 196 C 224 230, 214 252, 220 280 C 226 308, 260 322, 320 326 C 360 328, 392 330, 420 332" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round"/>`);
push(txt(395, 348, 8.5, 600, C.uret, 'middle', 'bulbar urethra'));

// PRB (retropubic)
push(`<ellipse cx="250" cy="244" rx="24" ry="18" fill="${C.fluid}" stroke="${C.dev}" stroke-width="2.4"/>`);
push(txt(250, 248, 8.5, 700, C.dev, 'middle', 'PRB'));
// cuff around bulbar urethra (collar band)
push(`<rect x="244" y="302" width="38" height="18" rx="9" fill="${C.fluid}" stroke="${C.dev}" stroke-width="4"/>`);
push(txt(263, 294, 9, 700, C.dev, 'middle', 'cuff'));
// scrotal pump
push(`<ellipse cx="360" cy="392" rx="20" ry="26" fill="${C.fluid}" stroke="${C.dev}" stroke-width="2.4"/>`);
push(`<ellipse cx="360" cy="392" rx="40" ry="30" fill="none" stroke="${C.boneEdge}" stroke-width="1.2" stroke-dasharray="3 3"/>`);
push(txt(360, 396, 8.5, 700, C.dev, 'middle', 'pump'));
push(txt(404, 392, 8.5, 600, C.muted, 'start', 'scrotum'));
// tubing: cuff <-> pump <-> PRB
push(`<path d="M 274 318 C 320 340, 344 360, 354 368" fill="none" stroke="${C.tube}" stroke-width="2" stroke-dasharray="1 4" stroke-linecap="round"/>`);
push(`<path d="M 360 366 C 320 320, 268 280, 256 262" fill="none" stroke="${C.tube}" stroke-width="2" stroke-dasharray="1 4" stroke-linecap="round"/>`);

// labels with leaders (right of anatomy)
function tag(x, y, s, sub) { push(txt(x, y, 9.5, 700, C.dev, 'start', s)); if (sub) push(txt(x, y + 12, 8.5, 500, C.muted, 'start', sub)); }
push(`<line x1="274" y1="244" x2="430" y2="200" stroke="${C.border}" stroke-width="1"/>`);
tag(434, 198, 'Pressure-reg. balloon', '61-70 cmH&#8322;O');
push(`<line x1="282" y1="310" x2="430" y2="252" stroke="${C.border}" stroke-width="1"/>`);
tag(434, 250, 'Cuff', 'occludes bulbar urethra');
push(`<line x1="380" y1="392" x2="430" y2="304" stroke="${C.border}" stroke-width="1"/>`);
tag(434, 302, 'Control pump', 'scrotal; squeeze to void');

// ---- how it cycles (right) ----
const rx = 600, ry = 96;
push(`<rect x="${rx}" y="${ry}" width="222" height="248" rx="12" fill="#F0FAF3" stroke="#CDEBD7" stroke-width="1.3"/>`);
push(txt(rx + 16, ry + 24, 12.5, 700, '#166534', 'start', 'How it cycles', false));
const steps = [
  ['1. At rest', 'cuff is fluid-filled &#8594; urethra closed &#8594; continent'],
  ['2. To void', 'squeeze the pump &#8594; fluid moves cuff &#8594; PRB &#8594; cuff opens'],
  ['3. Auto-refill', 'PRB pushes fluid back over 1-3 min &#8594; cuff re-closes'],
];
steps.forEach(([h, d], i) => {
  const y = ry + 58 + i * 58;
  push(`<circle cx="${rx + 22}" cy="${y - 4}" r="9" fill="#DCFCE7" stroke="${C.step}" stroke-width="1.4"/>`);
  push(txt(rx + 22, y, 10, 700, '#166534', 'middle', `${i + 1}`));
  push(txt(rx + 40, y - 4, 10.5, 700, C.ink, 'start', h.replace(/^\d+\.\s/, '')));
  // wrap description into two short lines
  const words = d.split(' ');
  const mid = Math.ceil(words.length / 2);
  push(txt(rx + 40, y + 10, 9, 500, C.muted, 'start', words.slice(0, mid).join(' ')));
  push(txt(rx + 40, y + 22, 9, 500, C.muted, 'start', words.slice(mid).join(' ')));
});

// ---- key ----
push(`<line x1="40" y1="392" x2="820" y2="392" stroke="${C.border}" stroke-width="1"/>`);
push(txt(40, 411, 11, 600, C.ink, 'start', 'Leave the device deactivated for ~6 weeks before activation. Counsel that any future catheterization or cystoscopy requires deactivating the cuff first.', false));
push(txt(40, 428, 10.5, 500, C.muted, 'start', 'Bladder-neck cuff is the female / pediatric / redo site. Urethral atrophy and erosion are the signature late failures; tandem or transcorporal cuff are salvage options.', false));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Artificial urinary sphincter AMS 800 in sagittal view with its three fluid-connected components: a cuff occluding the bulbar urethra, a pressure-regulating balloon in the retropubic space set to 61 to 70 centimeters of water, and a control pump in the scrotum. A how-it-cycles panel: at rest the cuff is fluid-filled and the urethra is closed for continence; to void the patient squeezes the pump, moving fluid from the cuff to the balloon so the cuff opens; the balloon then auto-refills the cuff over one to three minutes to re-close it. Key: leave deactivated about 6 weeks before activation, always deactivate the cuff before any catheterization or cystoscopy, use a bladder-neck cuff for female, pediatric, or redo cases, and recognize urethral atrophy and erosion as the signature late failures.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'aus-components.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
