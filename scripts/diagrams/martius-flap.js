#!/usr/bin/env node
/**
 * WARWIKI original schematic — Martius labial fat-pad flap.
 *
 * A fibrofatty flap from the labium majus, raised on one of its dual pedicles
 * (anterior = external pudendal, posterior = internal pudendal), tunneled
 * subcutaneously to the midline and interposed over a repair. Pedicle rule:
 * preserve the POSTERIOR pedicle for anterior/urethral targets (VVF, diverticulum),
 * the ANTERIOR pedicle for posterior targets (RVF).
 *
 * Output: static/img/diagrams/martius-flap.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', skin: '#F4E6DA', skinEdge: '#D8C3B6',
  minora: '#EAD7DC', minoraEdge: '#CBA7B2', fat: '#F3E2A0', fatEdge: '#C6A53A', vag: '#F3DBDC', vagEdge: '#CF9DA3',
  ped: '#B91C1C', cut: '#334155', suture: '#185FA5', tunnel: '#0F766E', arrow: '#0F766E' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 830, H = 382;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}
// vulva base (frontal): labia majora, minora, introitus, meatus, clitoris
function vulva(cx) {
  const cy = 244;
  // labia majora
  for (const s of [-1, 1]) push(`<ellipse cx="${cx + s * 52}" cy="${cy}" rx="24" ry="86" fill="${C.skin}" stroke="${C.skinEdge}" stroke-width="1.6"/>`);
  // labia minora
  for (const s of [-1, 1]) push(`<path d="M ${cx + s * 6} ${cy - 42} C ${cx + s * 24} ${cy - 20}, ${cx + s * 24} ${cy + 30}, ${cx + s * 8} ${cy + 56}" fill="none" stroke="${C.minoraEdge}" stroke-width="2.4"/>`);
  // introitus
  push(`<ellipse cx="${cx}" cy="${cy + 18}" rx="14" ry="46" fill="${C.vag}" stroke="${C.vagEdge}" stroke-width="1.6"/>`);
  // urethral meatus
  push(`<ellipse cx="${cx}" cy="${cy - 44}" rx="5" ry="3.4" fill="#FFFFFF" stroke="${C.cut}" stroke-width="1.4"/>`);
  // clitoral hood
  push(`<path d="M ${cx - 8} ${cy - 70} Q ${cx} ${cy - 80} ${cx + 8} ${cy - 70}" fill="none" stroke="${C.skinEdge}" stroke-width="2"/>`);
  return cy;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Martius flap &#8212; labial fat-pad interposition', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'fibrofatty flap from the labium majus, tunneled to the midline as a vascularized buttress over a repair', false));

// ============ PANEL A: harvest ============
const ax = 200;
const acy = vulva(ax);
// right labium opened: incision + fat pad on dual pedicles
push(`<line x1="${ax + 52}" y1="${acy - 74}" x2="${ax + 52}" y2="${acy + 74}" stroke="${C.cut}" stroke-width="1.8" stroke-dasharray="5 3"/>`);
push(`<ellipse cx="${ax + 52}" cy="${acy}" rx="15" ry="64" fill="${C.fat}" stroke="${C.fatEdge}" stroke-width="1.8"/>`);
push(txt(ax + 52, acy, 8.5, 700, C.fatEdge, 'middle', 'fat'));
push(txt(ax + 52, acy + 12, 8.5, 700, C.fatEdge, 'middle', 'pad'));
// dual pedicles
push(`<circle cx="${ax + 52}" cy="${acy - 70}" r="4" fill="${C.ped}"/>`);
push(`<circle cx="${ax + 52}" cy="${acy + 70}" r="4" fill="${C.ped}"/>`);
push(txt(ax + 70, acy - 78, 8.5, 600, C.ped, 'start', 'anterior pedicle'));
push(txt(ax + 70, acy - 67, 8, 500, C.muted, 'start', '(external pudendal)'));
push(txt(ax + 70, acy + 74, 8.5, 600, C.ped, 'start', 'posterior pedicle'));
push(txt(ax + 70, acy + 85, 8, 500, C.muted, 'start', '(internal pudendal)'));
// anatomy labels
push(txt(ax - 52, acy - 96, 8.5, 600, C.skinEdge, 'middle', 'labium majus'));
push(txt(ax, acy + 78, 8.5, 600, C.vagEdge, 'middle', 'introitus'));
push(txt(ax, 350, 12.5, 700, C.ink, 'middle', '1. Harvest from labium', false));

// arrow A -> B
push(`<line x1="318" y1="244" x2="362" y2="244" stroke="${C.arrow}" stroke-width="2.6" marker-end="url(#mf)"/>`);
push(txt(340, 234, 9, 600, C.arrow, 'middle', 'rotate', false));

// ============ PANEL B: transposition ============
const bx = 560;
const bcy = vulva(bx);
// keep posterior pedicle (target is anterior/urethral); harvest site at right labium
push(`<circle cx="${bx + 52}" cy="${bcy + 70}" r="4" fill="${C.ped}"/>`);
push(txt(bx + 60, bcy + 82, 8.5, 600, C.ped, 'start', 'posterior'));
push(txt(bx + 60, bcy + 93, 8.5, 600, C.ped, 'start', 'pedicle kept'));
// subcutaneous tunnel from labium to midline
push(`<path d="M ${bx + 50} ${bcy + 40} Q ${bx + 30} ${bcy + 4} ${bx + 2} ${bcy - 18}" fill="none" stroke="${C.tunnel}" stroke-width="1.8" stroke-dasharray="4 3"/>`);
push(txt(bx + 40, bcy + 60, 8.5, 600, C.tunnel, 'middle', 'tunnel'));
// flap now over the midline repair (anterior vaginal wall / VVF)
push(`<ellipse cx="${bx}" cy="${bcy - 18}" rx="20" ry="30" fill="${C.fat}" stroke="${C.fatEdge}" stroke-width="1.8"/>`);
// repair suture line beneath the flap
push(`<line x1="${bx}" y1="${bcy - 34}" x2="${bx}" y2="${bcy - 2}" stroke="${C.suture}" stroke-width="2" stroke-dasharray="3 2"/>`);
push(txt(bx, bcy - 46, 8.5, 700, C.fatEdge, 'middle', 'flap over repair'));
push(txt(bx, 350, 12.5, 700, C.ink, 'middle', '2. Interpose over repair', false));


const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Martius labial fat-pad flap shown on a frontal vulva in two steps. Step 1, harvest: a vertical incision over the right labium majus exposes the fibrofatty pad, which has a dual blood supply — an anterior pedicle from the external pudendal artery and a posterior pedicle from the internal pudendal artery. Step 2, interposition: the flap is raised on one pedicle, tunneled subcutaneously to the midline, and laid over the repair as a vascularized buttress. Key: keep the posterior pedicle for anterior or urethral targets such as vesicovaginal fistula, urethral diverticulum, and female urethroplasty; keep the anterior pedicle for posterior targets such as rectovaginal fistula. The right labium is the default for its greater vascular density; the skin is preserved and no drain is needed.">
<defs>
<marker id="mf" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.arrow}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'martius-flap.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
