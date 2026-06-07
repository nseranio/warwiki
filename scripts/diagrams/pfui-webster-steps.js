#!/usr/bin/env node
/**
 * WARWIKI original schematic — Webster progressive perineal maneuvers (PFUI).
 *
 * The stepwise elaboration that shortens the route from the mobilized bulbar
 * urethra to the prostatic apex across a posterior distraction defect:
 *  1 bulbar mobilization, 2 corporal splitting, 3 inferior pubectomy,
 *  4 supracrural rerouting. Do the least that yields a tension-free anastomosis.
 *
 * Output: static/img/diagrams/pfui-webster-steps.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', bone: '#ECE4D4', boneEdge: '#B6A98C',
  crus: '#F3DBDC', crusEdge: '#CF9DA3', apex: '#E7D2A6', apexEdge: '#C29B52', uret: '#185FA5',
  gap: '#B91C1C', gain: '#15803D', arrow: '#0F766E', warn: '#B45309' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 900, H = 432;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Webster progressive perineal maneuvers &#8212; closing a posterior distraction defect', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'each step shortens the route from the mobilized bulbar urethra to the prostatic apex &#8212; do the least that achieves a tension-free anastomosis', false));

const apexY = 110, pubY = 142, crusY = 184, bulbBase = 250;
// draws shared base; opts: {notch, split, rerouteEnd, bulbTop, gapTop}
function panel(px, n, title, opts) {
  // prostatic apex (target)
  push(`<ellipse cx="${px}" cy="${apexY}" rx="16" ry="11" fill="${C.apex}" stroke="${C.apexEdge}" stroke-width="1.6"/>`);
  push(`<circle cx="${px}" cy="${apexY}" r="4" fill="#FFFFFF" stroke="${C.apexEdge}" stroke-width="1.4"/>`);
  // pubic bone block (with optional inferior notch for pubectomy)
  if (opts.notch) {
    push(`<path d="M ${px - 36} ${pubY - 12} L ${px + 36} ${pubY - 12} L ${px + 36} ${pubY + 4} L ${px + 12} ${pubY + 4} L ${px} ${pubY + 16} L ${px - 12} ${pubY + 4} L ${px - 36} ${pubY + 4} Z" fill="${C.bone}" stroke="${C.boneEdge}" stroke-width="1.4" stroke-linejoin="round"/>`);
    push(txt(px, pubY + 30, 8.5, 700, C.warn, 'middle', 'wedge out'));
  } else {
    push(`<rect x="${px - 36}" y="${pubY - 12}" width="72" height="22" rx="6" fill="${C.bone}" stroke="${C.boneEdge}" stroke-width="1.4"/>`);
  }
  // crura (corpora cavernosa) attached below pubis; split = separated laterally
  const sep = opts.split ? 12 : 0;
  for (const s of [-1, 1]) push(`<ellipse cx="${px + s * (20 + sep)}" cy="${crusY}" rx="13" ry="19" fill="${C.crus}" stroke="${C.crusEdge}" stroke-width="1.5"/>`);
  if (opts.split) for (const s of [-1, 1]) push(`<line x1="${px + s * 8}" y1="${crusY}" x2="${px + s * 20}" y2="${crusY}" stroke="${C.arrow}" stroke-width="1.6" marker-end="url(#pw)"/>`);
  // bulbar urethra coming up from the perineum
  if (opts.reroute) {
    // rerouted around the left crus up to the apex
    push(`<path d="M ${px} ${bulbBase} L ${px} ${crusY + 24} C ${px - 30} ${crusY}, ${px - 30} ${apexY + 10}, ${px} ${apexY + 12}" fill="none" stroke="${C.uret}" stroke-width="6" stroke-linecap="round"/>`);
  } else {
    push(`<line x1="${px}" y1="${bulbBase}" x2="${px}" y2="${opts.bulbTop}" stroke="${C.uret}" stroke-width="6" stroke-linecap="round"/>`);
  }
  push(`<circle cx="${px}" cy="${bulbBase}" r="3.5" fill="${C.uret}"/>`);
  // gap indicator (red) between bulbar end and apex; closed -> green check
  if (opts.gapTop != null) {
    push(`<line x1="${px + 28}" y1="${apexY + 12}" x2="${px + 28}" y2="${opts.bulbTop}" stroke="${C.gap}" stroke-width="3" stroke-linecap="round"/>`);
    push(txt(px + 34, (apexY + 12 + opts.bulbTop) / 2 + 3, 8.5, 700, C.gap, 'start', 'gap'));
  } else {
    push(txt(px + 24, apexY + 24, 12, 800, C.gain, 'start', '&#10003;'));
  }
  // step badge + title
  push(`<circle cx="${px - 52}" cy="282" r="11" fill="#EAF1F8" stroke="${C.uret}" stroke-width="1.5"/>`);
  push(txt(px - 52, 286, 11, 800, C.uret, 'middle', `${n}`, false));
  push(txt(px - 34, 286, 11.5, 700, C.ink, 'start', title));
}

panel(150, 1, 'Mobilize bulb', { bulbTop: 196, gapTop: true });
panel(370, 2, 'Split corpora', { split: true, bulbTop: 172, gapTop: true });
panel(590, 3, 'Inferior pubectomy', { split: true, notch: true, bulbTop: 150, gapTop: true });
panel(810, 4, 'Supracrural reroute', { split: true, notch: true, reroute: true });

// step descriptions
const desc = [
  [150, 'free the bulbar urethra distally'],
  [370, 'separate the crura in the midline'],
  [590, 'wedge-resect the inferior pubis'],
  [810, 'route around a penile crus'],
];
desc.forEach(([px, d]) => push(txt(px - 34, 300, 9, 500, C.muted, 'start', d)));

// anatomy labels on panel 1
push(txt(150, apexY - 16, 8.5, 600, C.apexEdge, 'middle', 'prostatic apex'));
push(txt(96, crusY + 2, 8.5, 600, C.crusEdge, 'middle', 'crura'));
push(txt(150, bulbBase + 14, 8.5, 600, C.uret, 'middle', 'bulbar urethra'));

// ---- key ----
push(`<line x1="40" y1="350" x2="860" y2="350" stroke="${C.border}" stroke-width="1"/>`);
push(txt(40, 372, 11, 600, C.ink, 'start', 'Climb the ladder only as far as a tension-free, mucosa-to-mucosa anastomosis requires; partial inferior pubectomy is preferred (total pubectomy is abandoned).', false));
push(txt(40, 392, 10.5, 500, C.warn, 'start', 'Supracrural rerouting (step 4) underperforms: Kizer 2007 found ~75% restenosis vs ~80% success with the abdominoperineal repair &#8212; prefer it over rerouting.', false));
push(txt(40, 412, 10.5, 500, C.muted, 'start', 'A high / above-the-inferior-pubic-margin proximal stump on MRI strongly predicts needing pubectomy or an abdominoperineal repair.', false));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Webster progressive perineal maneuvers for a posterior urethral distraction defect, shown as four escalating steps that shorten the route from the mobilized bulbar urethra to the prostatic apex. Step 1, mobilize the bulbar urethra distally. Step 2, split the corpora by separating the crura in the midline. Step 3, inferior pubectomy, wedge-resecting the lower pubis to create a subpubic tunnel. Step 4, supracrural rerouting around a penile crus, which closes the gap but underperforms. Key: climb the ladder only as far as a tension-free mucosa-to-mucosa anastomosis requires; partial inferior pubectomy is preferred over abandoned total pubectomy; supracrural rerouting has about 75 percent restenosis in Kizer 2007 versus about 80 percent success with the abdominoperineal approach; a high proximal stump above the inferior pubic margin on MRI predicts needing pubectomy or an abdominoperineal repair.">
<defs>
<marker id="pw" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.arrow}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'pfui-webster-steps.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
