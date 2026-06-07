#!/usr/bin/env node
/**
 * WARWIKI original schematic — sacrospinous ligament fixation (SSLF).
 *
 * Posterior view of the right pelvic sidewall: the vaginal apex is suspended to
 * the sacrospinous ligament (coccygeus). Sutures go 1.5-2 cm (two fingerbreadths)
 * medial to the ischial spine to keep clear of the pudendal neurovascular bundle
 * (behind the spine) and the sciatic nerve (above).
 *
 * Output: static/img/diagrams/sslf.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', bone: '#ECE4D4', boneEdge: '#B6A98C',
  lig: '#E0D4B4', ligEdge: '#B0995F', musc: '#E7B6AC', muscEdge: '#C0705E', nerve: '#CA8A04',
  pud: '#B91C1C', vag: '#F3DBDC', vagEdge: '#CF9DA3', suture: '#185FA5', safe: '#15803D', danger: '#B91C1C' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 860, H = 382;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Sacrospinous ligament fixation (SSLF) &#8212; suspend the apex, spare the nerve', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'posterior view of the right pelvic sidewall: place sutures 1.5&#8211;2 cm medial to the ischial spine', false));

// ---- sacrum + coccyx (left, midline) ----
push(`<path d="M 130 96 C 188 110, 196 220, 176 296 L 150 318 L 124 296 C 110 220, 104 120, 130 96 Z" fill="${C.bone}" stroke="${C.boneEdge}" stroke-width="1.8" stroke-linejoin="round"/>`);
for (let i = 0; i < 3; i++) push(`<line x1="${138}" y1="${150 + i * 44}" x2="${162}" y2="${150 + i * 44}" stroke="${C.boneEdge}" stroke-width="0.9"/>`);
push(txt(150, 90, 9.5, 700, C.boneEdge, 'middle', 'sacrum'));
push(txt(150, 334, 8.5, 600, C.boneEdge, 'middle', 'coccyx'));

// ---- ischial spine (right) ----
push(`<path d="M 560 232 L 506 222 L 512 250 Z" fill="${C.bone}" stroke="${C.boneEdge}" stroke-width="1.6" stroke-linejoin="round"/>`);
push(`<path d="M 560 232 C 596 220, 604 264, 580 300 L 560 296 C 572 268, 568 246, 552 236 Z" fill="${C.bone}" stroke="${C.boneEdge}" stroke-width="1.6" stroke-linejoin="round"/>`);
push(txt(590, 214, 9.5, 700, C.ink, 'middle', 'ischial spine'));

// ---- sacrospinous ligament (coccygeus) from spine to sacrum/coccyx ----
push(`<path d="M 506 230 L 168 280 L 172 300 L 510 248 Z" fill="${C.lig}" stroke="${C.ligEdge}" stroke-width="1.6" stroke-linejoin="round"/>`);
push(txt(330, 256, 10, 700, C.ligEdge, 'middle', 'sacrospinous ligament'));
push(txt(330, 269, 8.5, 500, C.muted, 'middle', '(coccygeus muscle)'));

// ---- sciatic nerve (above, crossing greater sciatic foramen) ----
push(`<path d="M 470 110 C 520 140, 548 170, 556 210" fill="none" stroke="${C.nerve}" stroke-width="8" stroke-linecap="round"/>`);
push(txt(452, 104, 9, 700, C.nerve, 'middle', 'sciatic nerve'));

// ---- pudendal NV bundle: loops behind the ischial spine into Alcock's canal ----
push(`<path d="M 556 206 C 582 232, 580 270, 556 304 C 540 322, 520 326, 506 318" fill="none" stroke="${C.pud}" stroke-width="5" stroke-linecap="round"/>`);
push(txt(626, 300, 9, 700, C.pud, 'middle', 'pudendal'));
push(txt(626, 312, 9, 700, C.pud, 'middle', 'nerve &amp; vessels'));
// danger marker at the spine
push(`<circle cx="556" cy="246" r="16" fill="none" stroke="${C.danger}" stroke-width="1.6" stroke-dasharray="3 3"/>`);
push(txt(556, 332, 8.5, 700, C.danger, 'middle', 'danger zone'));

// ---- safe suture point: 1.5-2 cm medial to the spine ----
const sx = 452, sy = 244;
push(`<circle cx="${sx}" cy="${sy}" r="4.5" fill="${C.suture}"/>`);
push(`<circle cx="${sx}" cy="${sy}" r="11" fill="none" stroke="${C.safe}" stroke-width="1.6"/>`);
// distance bracket from spine to safe point
push(`<path d="M 506 222 L 506 206 M 506 214 L ${sx} 214 M ${sx} 222 L ${sx} 206" fill="none" stroke="${C.safe}" stroke-width="1.2"/>`);
push(txt((sx + 506) / 2, 200, 9, 700, C.safe, 'middle', '1.5&#8211;2 cm'));
push(txt((sx + 506) / 2, 189, 8, 500, C.muted, 'middle', '(2 fingerbreadths)'));

// ---- vaginal apex pulled to the safe point ----
push(`<path d="M 320 370 C 300 340, 320 320, 356 322 C 392 324, 404 348, 388 372 Z" fill="${C.vag}" stroke="${C.vagEdge}" stroke-width="1.8" stroke-linejoin="round"/>`);
push(txt(354, 360, 9.5, 700, C.vagEdge, 'middle', 'vaginal apex'));
// suspension sutures from apex to safe SSL point
push(`<path d="M 360 322 C 392 290, 428 262, ${sx - 4} ${sy + 4}" fill="none" stroke="${C.suture}" stroke-width="2.4" stroke-linecap="round"/>`);
push(`<path d="M 372 324 C 404 296, 432 270, ${sx + 2} ${sy + 6}" fill="none" stroke="${C.suture}" stroke-width="2.4" stroke-linecap="round"/>`);
push(txt(420, 300, 9, 700, C.suture, 'start', 'suspension'));
push(txt(420, 312, 9, 700, C.suture, 'start', 'sutures'));


const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Sacrospinous ligament fixation shown on a posterior view of the right pelvic sidewall. The sacrospinous ligament with its overlying coccygeus muscle runs from the ischial spine to the sacrum and coccyx. The pudendal nerve and vessels loop behind the ischial spine and the sciatic nerve passes above it, marking a danger zone at the spine. Suspension sutures from the vaginal apex are placed into the ligament 1.5 to 2 centimeters, about two fingerbreadths, medial to the ischial spine, in the safe zone. Key: a native-tissue apical repair usually done right-sided and unilateral; placing sutures too lateral risks the pudendal bundle and sciatic nerve causing gluteal pain; the repair pulls the apex posteriorly, raising later anterior-compartment recurrence compared with sacrocolpopexy.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'sslf.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
