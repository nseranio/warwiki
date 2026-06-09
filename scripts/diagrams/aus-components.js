#!/usr/bin/env node
/**
 * WARWIKI original schematic — artificial urinary sphincter (AMS 800).
 *
 * Three connected components on a coherent male pelvic sagittal: a cuff around
 * the bulbar urethra, a scrotal control pump, and a pressure-regulating balloon
 * (PRB) in the retropubic space of Retzius (behind the pubic symphysis, in front
 * of the bladder). The bulbar urethra passes beneath the subpubic arch.
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
const W = 860, H = 436;
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

// ============ sagittal pelvic anatomy (left) ============
// anterior is to the RIGHT: pubis is anterior, bladder postero-superior,
// the PRB nestles in the retropubic space between them.

// bladder (postero-superior, resting behind the pubis)
push(`<ellipse cx="214" cy="150" rx="54" ry="40" fill="${C.blad}" stroke="${C.bladEdge}" stroke-width="2"/>`);
push(txt(208, 150, 10, 700, C.bladEdge, 'middle', 'bladder'));

// urethra: bladder neck -> down -> forward UNDER the subpubic arch -> bulbar -> penis
const uPath = "M 220 188 C 226 224, 232 250, 250 270 C 274 296, 322 306, 364 312 C 398 316, 424 318, 446 320";
push(`<path d="${uPath}" fill="none" stroke="${C.uret}" stroke-width="9" stroke-linecap="round"/>`);
push(`<path d="${uPath}" fill="none" stroke="#FFFFFF" stroke-width="2.4" stroke-linecap="round"/>`);
push(txt(420, 338, 8.5, 600, C.uret, 'middle', 'bulbar urethra'));

// pubic symphysis (anterior bone, sectioned) — urethra passes beneath it,
// the PRB sits behind (deep to) it in the retropubic space
push(`<g transform="rotate(-10 312 250)">
  <rect x="298" y="214" width="28" height="74" rx="13" fill="${C.bone}" stroke="${C.boneEdge}" stroke-width="1.6"/>
  <line x1="305" y1="227" x2="305" y2="275" stroke="${C.boneEdge}" stroke-width="1" opacity="0.5"/>
</g>`);
push(`<line x1="324" y1="218" x2="338" y2="210" stroke="${C.border}" stroke-width="1"/>`);
push(txt(340, 210, 9, 600, C.boneEdge, 'start', 'pubic symphysis'));

// PRB — retropubic (space of Retzius): behind/deep to the pubis, in front of bladder
push(`<ellipse cx="261" cy="212" rx="22" ry="16" fill="${C.fluid}" stroke="${C.dev}" stroke-width="2.4"/>`);
push(txt(261, 216, 8.5, 700, C.dev, 'middle', 'PRB'));

// cuff around the bulbar urethra, just distal to the subpubic angle
push(`<g transform="rotate(-4 360 312)"><rect x="343" y="303" width="34" height="18" rx="9" fill="${C.fluid}" stroke="${C.dev}" stroke-width="4"/></g>`);
push(txt(360, 296, 9, 700, C.dev, 'middle', 'cuff'));

// scrotal pump
push(`<ellipse cx="378" cy="392" rx="20" ry="26" fill="${C.fluid}" stroke="${C.dev}" stroke-width="2.4"/>`);
push(`<ellipse cx="378" cy="390" rx="40" ry="30" fill="none" stroke="${C.boneEdge}" stroke-width="1.2" stroke-dasharray="3 3"/>`);
push(txt(378, 396, 8.5, 700, C.dev, 'middle', 'pump'));
push(txt(422, 392, 8.5, 600, C.muted, 'start', 'scrotum'));

// tubing: cuff <-> pump <-> PRB (closed hydraulic circuit)
push(`<path d="M 366 320 C 378 340, 378 356, 378 366" fill="none" stroke="${C.tube}" stroke-width="2" stroke-dasharray="1 4" stroke-linecap="round"/>`);
push(`<path d="M 378 366 C 330 322, 286 254, 270 228" fill="none" stroke="${C.tube}" stroke-width="2" stroke-dasharray="1 4" stroke-linecap="round"/>`);

// labels with leaders (right of anatomy)
function tag(x, y, s, sub) { push(txt(x, y, 9.5, 700, C.dev, 'start', s)); if (sub) push(txt(x, y + 12, 8.5, 500, C.muted, 'start', sub)); }
push(`<line x1="283" y1="210" x2="470" y2="196" stroke="${C.border}" stroke-width="1"/>`);
tag(474, 194, 'Pressure-reg. balloon', 'retropubic &#183; 61-70 cmH&#8322;O');
push(`<line x1="378" y1="312" x2="470" y2="250" stroke="${C.border}" stroke-width="1"/>`);
tag(474, 248, 'Cuff', 'occludes bulbar urethra');
push(`<line x1="398" y1="392" x2="470" y2="304" stroke="${C.border}" stroke-width="1"/>`);
tag(474, 302, 'Control pump', 'scrotal; squeeze to void');

// ============ how it cycles (right) ============
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


const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Artificial urinary sphincter AMS 800 on a male pelvic sagittal with its three fluid-connected components: a cuff occluding the bulbar urethra, a pressure-regulating balloon in the retropubic space of Retzius behind the pubic symphysis and in front of the bladder set to 61 to 70 centimeters of water, and a control pump in the scrotum. The bulbar urethra passes beneath the subpubic arch. A how-it-cycles panel: at rest the cuff is fluid-filled and the urethra is closed for continence; to void the patient squeezes the pump, moving fluid from the cuff to the balloon so the cuff opens; the balloon then auto-refills the cuff over one to three minutes to re-close it. Key: leave deactivated about 6 weeks before activation, always deactivate the cuff before any catheterization or cystoscopy, use a bladder-neck cuff for female, pediatric, or redo cases, and recognize urethral atrophy and erosion as the signature late failures.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'aus-components.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
