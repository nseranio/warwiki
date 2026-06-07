#!/usr/bin/env node
/**
 * WARWIKI original schematic — pudendal nerve course.
 *
 * Posterolateral view of the right hemipelvis: the pudendal nerve (S2-S4)
 * exiting the greater sciatic foramen below piriformis, hooking around the
 * ischial spine / sacrospinous ligament, re-entering the lesser sciatic
 * foramen into Alcock's canal on the obturator internus, then dividing into
 * the inferior rectal, perineal, and dorsal nerves. Surgical risk zones flagged.
 *
 * Output: static/img/diagrams/pudendal-nerve.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', bone: '#E8E3D6', boneEdge: '#A89B80',
  lig: '#E3CFA8', ligEdge: '#BB9F68', muscle: '#E7C8C1', muscleEdge: '#C49A92', nerve: '#C98A04', nerveEdge: '#9A6A03',
  risk: '#B91C1C', lead: '#475569' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 840, H = 476;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.2" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}
function lead(x1, y1, x2, y2, col) { push(`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${col || C.lead}" stroke-width="1"/>`); push(`<circle cx="${f(x1)}" cy="${f(y1)}" r="1.8" fill="${col || C.lead}"/>`); }

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 38, 16, 700, C.ink, 'start', 'Pudendal nerve (S2&#8211;S4) &#8212; course and surgical risk zones', false));
push(txt(40, 57, 12.5, 500, C.muted, 'start', 'greater sciatic foramen &#8594; hook around the ischial spine &#8594; lesser sciatic foramen &#8594; Alcock&#8217;s canal &#8594; three branches', false));

// ---- landmarks (muted) ---------------------------------------------------
// sacrum
push(`<path d="M 96 92 L 168 98 L 154 268 L 120 272 Z" fill="${C.bone}" stroke="${C.boneEdge}" stroke-width="1.6"/>`);
push(txt(118, 84, 10.5, 600, C.muted, 'middle', 'sacrum', false));
// piriformis (nerve exits below it)
push(`<path d="M 150 128 C 230 118, 320 122, 372 140 L 360 162 C 300 150, 220 150, 152 156 Z" fill="${C.muscle}" stroke="${C.muscleEdge}" stroke-width="1.4"/>`);
push(txt(258, 134, 10, 600, '#9A6A62', 'middle', 'piriformis', false));
// sacrospinous ligament (sacrum/coccyx -> ischial spine)
push(`<path d="M 150 258 L 384 232 L 388 246 L 152 272 Z" fill="${C.lig}" stroke="${C.ligEdge}" stroke-width="1.4"/>`);
// sacrotuberous ligament (sacrum -> ischial tuberosity)
push(`<path d="M 138 268 L 402 352 L 392 366 L 130 282 Z" fill="${C.lig}" stroke="${C.ligEdge}" stroke-width="1.4"/>`);
// ischial spine (tip points medial/left = the hook)
push(`<path d="M 416 220 L 420 260 L 378 240 Z" fill="${C.bone}" stroke="${C.boneEdge}" stroke-width="1.6"/>`);
// ischial tuberosity
push(`<ellipse cx="402" cy="392" rx="24" ry="26" fill="${C.bone}" stroke="${C.boneEdge}" stroke-width="1.6"/>`);
push(txt(352, 404, 10, 500, C.muted, 'end', 'ischial tuberosity', false));
// obturator internus (Alcock's canal runs along its medial/upper surface)
push(`<path d="M 506 314 C 560 308, 602 330, 604 366 C 606 398, 566 414, 524 408 C 498 404, 492 374, 496 348 C 498 330, 498 320, 506 314 Z" fill="${C.muscle}" stroke="${C.muscleEdge}" stroke-width="1.4"/>`);
push(txt(550, 372, 10, 600, '#9A6A62', 'middle', 'obturator', false));
push(txt(550, 385, 10, 600, '#9A6A62', 'middle', 'internus', false));

// foramen labels
push(txt(304, 176, 10, 500, C.muted, 'middle', 'greater sciatic', false));
push(txt(304, 188, 10, 500, C.muted, 'middle', 'foramen', false));
push(txt(356, 304, 10, 500, C.muted, 'middle', 'lesser sciatic', false));
push(txt(356, 316, 10, 500, C.muted, 'middle', 'foramen', false));
push(txt(196, 250, 9.5, 500, C.ligEdge, 'middle', 'sacrospinous lig.', false));

// ---- pudendal nerve ------------------------------------------------------
// roots S2-S4
for (const [y, lab] of [[156, 'S2'], [186, 'S3'], [216, 'S4']]) {
  push(`<path d="M 162 ${y} C 200 ${y}, 222 ${(y + 200) / 2}, 246 200" fill="none" stroke="${C.nerve}" stroke-width="3" stroke-linecap="round"/>`);
  push(txt(150, y + 3, 9.5, 700, C.nerveEdge, 'end', lab, false));
}
// main trunk: greater foramen -> hook around ischial spine -> lesser foramen -> Alcock's canal
const trunk = 'M 246 200 C 300 210, 346 216, 372 226 C 390 232, 396 242, 386 250 C 396 258, 418 270, 450 282 C 500 300, 542 304, 568 308';
push(`<path d="${trunk}" fill="none" stroke="${C.nerveEdge}" stroke-width="6" stroke-linecap="round"/>`);
push(`<path d="${trunk}" fill="none" stroke="${C.nerve}" stroke-width="4" stroke-linecap="round"/>`);
// terminal branches
const branches = [
  ['M 568 308 C 542 334, 512 366, 488 398', 'inferior rectal n.', 484, 412, 'middle'],
  ['M 568 308 C 602 332, 626 352, 650 372', 'perineal n.', 668, 380, 'start'],
  ['M 568 308 C 612 304, 648 302, 684 300', 'dorsal n. of penis / clitoris', 690, 300, 'start'],
];
for (const [d, lab, lx, ly, anc] of branches) {
  push(`<path d="${d}" fill="none" stroke="${C.nerve}" stroke-width="3" stroke-linecap="round"/>`);
  const end = d.split(' ').slice(-2);
  push(`<circle cx="${end[0]}" cy="${end[1]}" r="3.2" fill="${C.nerve}"/>`);
  push(txt(lx, ly, 10, 600, C.nerveEdge, anc, lab));
}

// ---- risk callouts -------------------------------------------------------
lead(388, 240, 470, 150, C.risk); push(txt(476, 142, 11, 700, C.risk, 'start', 'ischial spine'));
push(txt(476, 156, 9.8, 500, C.muted, 'start', 'SSLF suture zone &amp; pudendal-block', false));
push(txt(476, 169, 9.8, 500, C.muted, 'start', 'landmark &#8212; NVB just lateral', false));
lead(498, 296, 560, 200, C.risk); push(txt(566, 192, 11, 700, C.risk, 'start', "Alcock's canal"));
push(txt(566, 206, 9.8, 500, C.muted, 'start', 'entrapment &#8594; pudendal neuralgia', false));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Posterolateral schematic of the pudendal nerve course: S2-S4 roots converge and exit the greater sciatic foramen below piriformis, hook around the ischial spine and sacrospinous ligament, re-enter the lesser sciatic foramen into Alcock's canal on the obturator internus, then divide into the inferior rectal, perineal, and dorsal nerves. The ischial spine (sacrospinous-fixation suture zone and pudendal-block landmark) and Alcock's canal (entrapment) are flagged as risk zones.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'pudendal-nerve.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
