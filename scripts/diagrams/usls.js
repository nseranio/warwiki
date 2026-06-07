#!/usr/bin/env node
/**
 * WARWIKI original schematic — uterosacral ligament suspension (USLS).
 *
 * Superior (bird's-eye) view: the vaginal vault is suspended bilaterally to the
 * intermediate uterosacral ligaments (at the ischial-spine level) and drawn back
 * toward the sacrum. The ureter runs ~1-2 cm lateral to the ligament — the
 * signature risk — so intraoperative cystoscopy is mandatory.
 *
 * Output: static/img/diagrams/usls.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', bone: '#ECE4D4', boneEdge: '#B6A98C',
  lig: '#E0D4B4', ligEdge: '#B0995F', vag: '#F3DBDC', vagEdge: '#CF9DA3', ureter: '#B91C1C',
  suture: '#185FA5', safe: '#15803D', spine: '#94A3B8' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 432;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Uterosacral ligament suspension (USLS) &#8212; mind the ureter', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', "bird&#8217;s-eye pelvic view: suspend the vault to the intermediate uterosacral ligaments &#8212; the ureter runs ~1&#8211;2 cm lateral", false));

const cx = 360; // midline
// orientation
push(txt(cx, 84, 9, 700, C.muted, 'middle', 'posterior (sacrum)', false));
push(txt(cx, 360, 9, 700, C.muted, 'middle', 'anterior (bladder)', false));

// sacrum (posterior, top)
push(`<path d="M ${cx - 70} 96 C ${cx - 30} 84, ${cx + 30} 84, ${cx + 70} 96 C ${cx + 50} 120, ${cx - 50} 120, ${cx - 70} 96 Z" fill="${C.bone}" stroke="${C.boneEdge}" stroke-width="1.6" stroke-linejoin="round"/>`);
push(txt(cx, 102, 8.5, 700, C.boneEdge, 'middle', 'sacrum (S2-4)'));

// ischial spines (lateral landmarks)
for (const s of [-1, 1]) {
  push(`<path d="M ${cx + s * 150} 214 l ${s * -16} -7 l ${s * 2} 16 z" fill="${C.bone}" stroke="${C.boneEdge}" stroke-width="1.3"/>`);
  push(txt(cx + s * 168, 214, 8, 600, C.spine, 'middle', 'ischial'));
  push(txt(cx + s * 168, 225, 8, 600, C.spine, 'middle', 'spine'));
}

// vaginal vault (anterior, bottom-center)
push(`<ellipse cx="${cx}" cy="312" rx="40" ry="24" fill="${C.vag}" stroke="${C.vagEdge}" stroke-width="2"/>`);
push(txt(cx, 316, 9.5, 700, C.vagEdge, 'middle', 'vaginal vault'));

// uterosacral ligaments: from vault posterolateral toward the sacrum
for (const s of [-1, 1]) {
  push(`<path d="M ${cx + s * 30} 296 C ${cx + s * 96} 240, ${cx + s * 70} 150, ${cx + s * 36} 116" fill="none" stroke="${C.ligEdge}" stroke-width="9" stroke-linecap="round"/>`);
}
push(txt(cx + 96, 250, 9, 700, C.ligEdge, 'middle', 'uterosacral'));
push(txt(cx + 96, 262, 9, 700, C.ligEdge, 'middle', 'ligament'));

// ureters: run ~1-2 cm lateral to the USL, coursing anteriorly toward the bladder
for (const s of [-1, 1]) {
  push(`<path d="M ${cx + s * 132} 120 C ${cx + s * 150} 190, ${cx + s * 120} 268, ${cx + s * 64} 322" fill="none" stroke="${C.ureter}" stroke-width="3.2" stroke-linecap="round" stroke-dasharray="9 4"/>`);
}
push(txt(cx - 150, 150, 9, 700, C.ureter, 'middle', 'ureter'));
push(txt(cx - 150, 162, 8, 500, C.muted, 'middle', '~1-2 cm lateral'));

// suspension sutures at the intermediate USL (ischial-spine level) -> vault
for (const s of [-1, 1]) {
  const px = cx + s * 70, py = 212; // suture point on USL near ischial-spine level
  push(`<circle cx="${px}" cy="${py}" r="4.5" fill="${C.suture}"/>`);
  push(`<circle cx="${px}" cy="${py}" r="11" fill="none" stroke="${C.safe}" stroke-width="1.5"/>`);
  push(`<path d="M ${cx + s * 26} 300 C ${cx + s * 50} 260, ${px - s * 4} ${py + 16}, ${px} ${py + 6}" fill="none" stroke="${C.suture}" stroke-width="2.2" stroke-linecap="round"/>`);
}
push(txt(cx, 196, 9, 700, C.safe, 'middle', 'intermediate USL'));
push(txt(cx, 207, 8, 500, C.muted, 'middle', '(ischial-spine level)'));
push(txt(cx - 96, 300, 8.5, 700, C.suture, 'middle', 'suspension'));
push(txt(cx - 96, 311, 8.5, 700, C.suture, 'middle', 'sutures'));

// cystoscopy reminder
push(`<rect x="556" y="120" width="232" height="86" rx="10" fill="#FEF2F2" stroke="#F3C6C6" stroke-width="1.3"/>`);
push(txt(572, 142, 11.5, 700, C.ureter, 'start', 'Cystoscopy is mandatory', false));
push(txt(572, 160, 9.5, 500, C.muted, 'start', 'confirm ureteral jets after suture', false));
push(txt(572, 174, 9.5, 500, C.muted, 'start', 'placement; ureteral kinking is the', false));
push(txt(572, 188, 9.5, 500, C.muted, 'start', 'signature USLS complication.', false));

// ---- key ----
push(`<line x1="40" y1="384" x2="780" y2="384" stroke="${C.border}" stroke-width="1"/>`);
push(txt(40, 403, 11, 600, C.ink, 'start', 'Native-tissue apical repair anchoring the vault into the strong intermediate uterosacral ligament &#8212; a more midline vaginal axis than SSLF.', false));
push(txt(40, 421, 10.5, 500, C.muted, 'start', 'Equally effective to SSLF (OPTIMAL trial). Place sutures medial/cephalad on the ligament and release any that obstruct a ureter; high USLS is intraperitoneal.', false));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Uterosacral ligament suspension shown in a bird's-eye pelvic view with the sacrum posterior at top and the bladder anterior at bottom. The vaginal vault is suspended by sutures to the intermediate portion of each uterosacral ligament at the ischial-spine level and drawn back toward the sacrum. The ureters run about 1 to 2 centimeters lateral to the ligaments, the signature danger, so intraoperative cystoscopy is mandatory to confirm ureteral jets after suture placement; ureteral kinking is the characteristic complication. Key: a native-tissue apical repair equally effective to sacrospinous ligament fixation in the OPTIMAL trial, restoring a near-midline vaginal axis, placing sutures medial and cephalad on the ligament and releasing any suture that obstructs a ureter.">
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'usls.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
