#!/usr/bin/env node
/**
 * WARWIKI original schematic — Burch colposuspension (retropubic urethropexy).
 *
 * Retropubic (space of Retzius) view: 2 non-absorbable sutures per side through
 * the anterior vaginal wall lateral to the bladder neck, tied to Cooper's
 * (iliopectineal) ligament — elevating the bladder neck. Contrast: MMK anchors to
 * the pubic symphysis periosteum (osteitis-pubis risk).
 *
 * Output: static/img/diagrams/burch.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', bone: '#ECE4D4', boneEdge: '#B6A98C',
  coop: '#E0D4B4', coopEdge: '#B0995F', blad: '#E2ECF5', bladEdge: '#4F6F92', uret: '#64748B',
  vag: '#F3DBDC', vagEdge: '#CF9DA3', suture: '#185FA5', lift: '#15803D', mmk: '#B45309' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 365;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Burch colposuspension &#8212; lift the bladder neck to Cooper&#8217;s ligament', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'retropubic (space of Retzius) view: paravaginal sutures lateral to the bladder neck, tied to the iliopectineal ligament', false));

const cx = 330;
// back of pubic symphysis (top center)
push(`<rect x="${cx - 18}" y="118" width="36" height="40" rx="6" fill="${C.bone}" stroke="${C.boneEdge}" stroke-width="1.4"/>`);
push(txt(cx, 110, 9, 600, C.boneEdge, 'middle', 'pubic symphysis (back)'));
// superior pubic rami sweeping laterally + Cooper's ligament along each
for (const s of [-1, 1]) {
  push(`<path d="M ${cx + s * 16} 126 C ${cx + s * 70} 120, ${cx + s * 120} 132, ${cx + s * 150} 158" fill="none" stroke="${C.boneEdge}" stroke-width="12" stroke-linecap="round"/>`);
  push(`<path d="M ${cx + s * 24} 120 C ${cx + s * 74} 114, ${cx + s * 118} 124, ${cx + s * 146} 148" fill="none" stroke="${C.coopEdge}" stroke-width="5" stroke-linecap="round"/>`);
}
push(txt(cx - 150, 138, 9.5, 700, C.coopEdge, 'middle', "Cooper's"));
push(txt(cx - 150, 150, 9.5, 700, C.coopEdge, 'middle', 'ligament'));
push(txt(cx + 150, 138, 9.5, 700, C.coopEdge, 'middle', "Cooper's"));
push(txt(cx + 150, 150, 9.5, 700, C.coopEdge, 'middle', 'ligament'));

// bladder + bladder neck + urethra (midline, below symphysis)
push(`<path d="M ${cx - 56} 224 C ${cx - 64} 178, ${cx + 64} 178, ${cx + 56} 224 C ${cx + 46} 252, ${cx - 46} 252, ${cx - 56} 224 Z" fill="${C.blad}" stroke="${C.bladEdge}" stroke-width="1.8" stroke-linejoin="round"/>`);
push(txt(cx, 206, 10, 700, C.bladEdge, 'middle', 'bladder'));
push(`<rect x="${cx - 7}" y="248" width="14" height="62" rx="7" fill="${C.uret}"/>`);
push(`<rect x="${cx - 2.5}" y="248" width="5" height="62" rx="2.5" fill="#FFFFFF"/>`);
push(txt(cx + 14, 300, 8.5, 600, C.uret, 'start', 'urethra'));
push(txt(cx - 12, 262, 8.5, 700, C.uret, 'end', 'bladder neck'));

// anterior vaginal wall lateral to the urethra (two pads)
for (const s of [-1, 1]) push(`<ellipse cx="${cx + s * 40}" cy="276" rx="22" ry="16" fill="${C.vag}" stroke="${C.vagEdge}" stroke-width="1.6"/>`);
push(txt(cx, 312, 8.5, 700, C.vagEdge, 'middle', 'anterior vaginal wall (paravaginal)'));

// sutures: 2 per side from vaginal wall to Cooper's ligament + elevation arrows
for (const s of [-1, 1]) {
  for (let i = 0; i < 2; i++) {
    const vx = cx + s * (30 + i * 16), vy = 268 + i * 8;
    const coopx = cx + s * (96 + i * 22), coopy = 134 + i * 6;
    push(`<path d="M ${vx} ${vy} C ${cx + s * 70} 210, ${cx + s * 90} 170, ${coopx} ${coopy}" fill="none" stroke="${C.suture}" stroke-width="2" stroke-linecap="round"/>`);
    push(`<circle cx="${coopx}" cy="${coopy}" r="2.6" fill="${C.suture}"/>`);
  }
  // elevation arrow
  push(`<line x1="${cx + s * 44} " y1="262" x2="${cx + s * 52}" y2="244" stroke="${C.lift}" stroke-width="1.8" marker-end="url(#bu)"/>`);
}
push(txt(cx - 92, 214, 9, 700, C.suture, 'middle', '2 sutures'));
push(txt(cx - 92, 226, 9, 700, C.suture, 'middle', 'per side'));
push(txt(cx + 96, 210, 9, 700, C.lift, 'middle', 'elevate'));

// MMK contrast marker at the symphysis
push(`<circle cx="${cx}" cy="158" r="4" fill="none" stroke="${C.mmk}" stroke-width="1.8"/>`);
push(`<line x1="${cx}" y1="162" x2="${cx}" y2="246" stroke="${C.mmk}" stroke-width="1.2" stroke-dasharray="3 3"/>`);

// MMK note box
push(`<rect x="592" y="120" width="196" height="84" rx="10" fill="#FFF7ED" stroke="#F4D9B0" stroke-width="1.2"/>`);
push(txt(606, 142, 10.5, 700, C.mmk, 'start', 'vs MMK', false));
push(txt(606, 158, 9, 500, C.muted, 'start', 'Marshall-Marchetti-Krantz'));
push(txt(606, 172, 9, 500, C.muted, 'start', 'anchors to the symphysis'));
push(txt(606, 186, 9, 500, C.muted, 'start', 'periosteum &#8594; osteitis-pubis'));
push(txt(606, 198, 9, 500, C.muted, 'start', 'risk (Burch avoids this).'));


const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Burch colposuspension shown in a retropubic space-of-Retzius view. The back of the pubic symphysis is at top with the superior pubic rami sweeping laterally, each carrying Cooper's iliopectineal ligament. The bladder, bladder neck, and urethra lie in the midline. Two non-absorbable sutures per side pass through the anterior vaginal wall lateral to the bladder neck (paravaginal tissue) and are tied up to Cooper's ligament, elevating the bladder neck. A note contrasts the Marshall-Marchetti-Krantz procedure, which anchors to the pubic symphysis periosteum and risks osteitis pubis, which Burch avoids. Key: a mesh-free retropubic urethropexy with durable cure comparable to retropubic midurethral sling at 13 years, sutures tied snug and not over-corrected to avoid voiding dysfunction, best used at the time of sacrocolpopexy or in mesh-averse patients, with a higher posterior-prolapse rate than the midurethral sling, and cystoscopy is performed.">
<defs>
<marker id="bu" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.lift}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'burch.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
