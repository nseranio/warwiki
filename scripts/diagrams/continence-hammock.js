#!/usr/bin/env node
/**
 * WARWIKI original schematic — DeLancey hammock hypothesis of stress continence.
 *
 * Axial section at the midurethra: the urethra rests on a supportive layer
 * (anterior vaginal wall + endopelvic fascia) anchored laterally to the arcus
 * tendineus and levator ani. With a stable backboard, a cough compresses the
 * urethra closed (continent). When the lateral support fails, the hammock sags,
 * the urethra is not compressed, and stress leakage results.
 *
 * Output: static/img/diagrams/continence-hammock.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', uret: '#185FA5', uretFill: '#E2ECF5',
  ham: '#C29B52', hamFill: '#EBDCB8', vag: '#F3DBDC', vagEdge: '#CF9DA3', lev: '#E7B6AC', levEdge: '#C0705E',
  cough: '#0F766E', leak: '#B91C1C', ok: '#15803D', tear: '#B91C1C' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 860, H = 344;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'The hammock hypothesis &#8212; why a cough does (or doesn&#8217;t) stay dry', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'axial section at the midurethra: continence depends on the support beneath the urethra, not the urethra itself', false));

const levTextY = 300;
// levator / sidewall anchors at each side
function sidewalls(cx) {
  for (const s of [-1, 1]) {
    push(`<path d="M ${cx + s * 150} 120 C ${cx + s * 170} 180, ${cx + s * 168} 240, ${cx + s * 140} 280" fill="none" stroke="${C.levEdge}" stroke-width="9" stroke-linecap="round"/>`);
  }
}

// ============ PANEL A: normal (continent) ============
const ax = 232;
sidewalls(ax);
// taut hammock (anterior vaginal wall + endopelvic fascia), straight, anchored both sides
push(`<path d="M ${ax - 140} 196 L ${ax + 140} 196" fill="none" stroke="${C.ham}" stroke-width="7" stroke-linecap="round"/>`);
// intact lateral attachments (solid)
for (const s of [-1, 1]) push(`<line x1="${ax + s * 140} " y1="196" x2="${ax + s * 150}" y2="200" stroke="${C.ok}" stroke-width="3"/>`);
// vagina below the hammock
push(`<path d="M ${ax - 56} 214 Q ${ax} 250 ${ax + 56} 214 Q ${ax} 236 ${ax - 56} 214 Z" fill="${C.vag}" stroke="${C.vagEdge}" stroke-width="1.6"/>`);
// urethra compressed against the firm hammock -> flattened, slit lumen
push(`<ellipse cx="${ax}" cy="184" rx="26" ry="13" fill="${C.uretFill}" stroke="${C.uret}" stroke-width="2.4"/>`);
push(`<line x1="${ax - 9}" y1="184" x2="${ax + 9}" y2="184" stroke="${C.uret}" stroke-width="2.2"/>`);
// cough arrow
push(`<line x1="${ax}" y1="120" x2="${ax}" y2="160" stroke="${C.cough}" stroke-width="3" marker-end="url(#ch)"/>`);
push(txt(ax, 112, 10.5, 700, C.cough, 'middle', 'cough &#8593; abd. pressure'));
push(txt(ax, 274, 12.5, 700, C.ok, 'middle', 'Continent', false));
push(txt(ax, 290, 9.5, 500, C.muted, 'middle', 'urethra compressed &#8594; lumen closes', false));

// ============ PANEL B: SUI ============
const bx = 628;
sidewalls(bx);
// detached attachment (left torn) -> sagging hammock
push(`<path d="M ${bx - 140} 198 C ${bx - 60} 236, ${bx + 60} 236, ${bx + 140} 200" fill="none" stroke="${C.ham}" stroke-width="7" stroke-linecap="round"/>`);
// torn left attachment
push(`<line x1="${bx - 150}" y1="206" x2="${bx - 138}" y2="198" stroke="${C.tear}" stroke-width="3" stroke-dasharray="3 3"/>`);
push(txt(bx - 150, 188, 8.5, 700, C.tear, 'middle', 'detached'));
// vagina sagging
push(`<path d="M ${bx - 50} 230 Q ${bx} 264 ${bx + 50} 226 Q ${bx} 248 ${bx - 50} 230 Z" fill="${C.vag}" stroke="${C.vagEdge}" stroke-width="1.6"/>`);
// urethra descended/rotated, NOT compressed -> round, open lumen
push(`<circle cx="${bx - 6}" cy="210" r="18" fill="${C.uretFill}" stroke="${C.uret}" stroke-width="2.4"/>`);
push(`<circle cx="${bx - 6}" cy="210" r="6" fill="#FFFFFF" stroke="${C.uret}" stroke-width="1.6"/>`);
// cough arrow rolls the urethra off the lax support
push(`<line x1="${bx}" y1="120" x2="${bx - 4}" y2="186" stroke="${C.cough}" stroke-width="3" marker-end="url(#ch)"/>`);
push(txt(bx, 112, 10.5, 700, C.cough, 'middle', 'cough &#8593; abd. pressure'));
// leak drips
for (let i = 0; i < 3; i++) push(`<circle cx="${bx - 18 + i * 12}" cy="${244 + (i % 2) * 6}" r="2.6" fill="${C.leak}"/>`);
push(txt(bx, 274, 12.5, 700, C.leak, 'middle', 'Stress leak', false));
push(txt(bx, 290, 9.5, 500, C.muted, 'middle', 'lax hammock &#8594; no compression', false));

// shared labels (panel A)
push(txt(ax - 150, 196 - 12, 9, 600, C.ham, 'middle', 'hammock'));
push(txt(ax + 96, 184, 8.5, 600, C.uret, 'start', 'urethra'));
push(txt(ax - 128, 248, 8.5, 600, C.levEdge, 'middle', 'levator ani'));
push(txt(ax - 128, 260, 8, 500, C.muted, 'middle', '/ arcus tendineus'));
push(txt(ax, 230, 8.5, 600, C.vagEdge, 'middle', 'vagina'));


const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="DeLancey hammock hypothesis of stress continence shown in axial section at the midurethra. Left panel, normal: the urethra rests on a taut supportive layer (anterior vaginal wall plus endopelvic fascia) anchored on both sides to the levator ani and arcus tendineus; a cough raises abdominal pressure and compresses the urethra against this stable backboard so the lumen closes and the patient stays continent. Right panel, stress incontinence: a lateral attachment is detached so the hammock sags, the urethra descends and rotates, and a cough no longer compresses it, so the lumen stays open and urine leaks. Key: continence depends on a stable suburethral backboard rather than a tighter urethra, which is why a midurethral sling restores the backboard; intrinsic sphincter deficiency is a separate mechanism.">
<defs>
<marker id="ch" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.cough}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'continence-hammock.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
