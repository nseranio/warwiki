#!/usr/bin/env node
/**
 * WARWIKI original schematic — anatomical enucleation of the prostate.
 *
 * The principle shared by HoLEP / ThuLEP / bipolar enucleation and open /
 * robotic simple prostatectomy: the transition-zone adenoma is shelled out
 * along the plane against the compressed peripheral-zone "surgical capsule,"
 * which is left behind. Axial cross-section (the plane) + sagittal landmarks
 * (verumontanum, bladder neck, apex, enucleation direction).
 *
 * Output: static/img/diagrams/prostate-enucleation.svg
 */
const fs = require('fs');
const path = require('path');

const C = {
  ink: '#1E293B', muted: '#64748B', border: '#E2E8F0',
  caps: '#ECECE8', capsEdge: '#9AA3AD',      // surgical capsule (fibrous)
  aden: '#E8D0B6', adenEdge: '#C19A6B',       // transition-zone adenoma
  lumen: '#E2ECF5', lumenEdge: '#7FA3C4',     // urethra / bladder
  plane: '#334155', perf: '#B91C1C',
  tool: '#0F766E', sphinc: '#15803D',
};
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 412;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.2" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}
function leader(x1, y1, x2, y2) {
  push(`<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${C.muted}" stroke-width="1"/>`);
}

// ===== frame + title =======================================================
push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Anatomical enucleation of the prostate', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'shell the transition-zone adenoma off the compressed peripheral-zone &#8220;surgical capsule&#8221;, which stays behind', false));

// ===== PANEL A: axial cross-section (the plane) ============================
const ax = 248, ay = 232;
// surgical capsule ring
push(`<ellipse cx="${ax}" cy="${ay}" rx="142" ry="108" fill="${C.caps}" stroke="${C.capsEdge}" stroke-width="2.6"/>`);
// adenoma (two lateral lobes), inset from capsule leaving the plane gap
push(`<ellipse cx="${ax}" cy="${ay}" rx="120" ry="88" fill="${C.aden}" stroke="${C.adenEdge}" stroke-width="2.2"/>`);
// anterior midline cleft (between lateral lobes)
push(`<path d="M ${ax} ${ay - 88} L ${ax} ${ay - 14}" fill="none" stroke="${C.caps}" stroke-width="5"/>`);
push(`<path d="M ${ax} ${ay - 88} L ${ax} ${ay - 14}" fill="none" stroke="${C.adenEdge}" stroke-width="1" stroke-dasharray="3 3"/>`);
// median lobe bump (posterior)
push(`<ellipse cx="${ax}" cy="${ay + 70}" rx="34" ry="26" fill="${C.aden}" stroke="${C.adenEdge}" stroke-width="2"/>`);
// compressed urethra (central slit)
push(`<ellipse cx="${ax}" cy="${ay}" rx="7" ry="22" fill="${C.lumen}" stroke="${C.lumenEdge}" stroke-width="1.8"/>`);
// enucleation plane (dashed ring in the gap)
push(`<ellipse cx="${ax}" cy="${ay}" rx="131" ry="98" fill="none" stroke="${C.plane}" stroke-width="1.6" stroke-dasharray="6 4"/>`);
// perforating vessels crossing the plane
[[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sy]) => {
  push(`<line x1="${ax + sx * 110}" y1="${ay + sy * 80}" x2="${ax + sx * 136}" y2="${ay + sy * 100}" stroke="${C.perf}" stroke-width="1.8"/>`);
});
// instrument tip developing the plane (right)
push(`<path d="M ${ax + 150} ${ay - 4} L ${ax + 128} ${ay} L ${ax + 150} ${ay + 4} Z" fill="${C.tool}"/>`);
push(`<line x1="${ax + 150}" y1="${ay}" x2="${ax + 184}" y2="${ay}" stroke="${C.tool}" stroke-width="2.4"/>`);
// labels A
push(txt(ax, ay - 132, 10.5, 700, C.capsEdge, 'middle', 'surgical capsule (leave behind)'));
leader(ax, ay - 126, ax - 60, ay - 100);
push(txt(96, 150, 10, 700, C.adenEdge, 'middle', 'adenoma'));
push(txt(108, 162, 8.5, 500, C.muted, 'middle', 'transition zone'));
leader(120, 158, 168, 196);
push(txt(96, 300, 9.5, 700, C.lumenEdge, 'middle', 'compressed'));
push(txt(96, 312, 9.5, 700, C.lumenEdge, 'middle', 'urethra'));
leader(120, 306, ax - 8, ay + 8);
push(txt(ax, ay + 112, 9.5, 700, C.adenEdge, 'middle', 'median lobe'));
push(txt(ax + 196, ay - 12, 9.5, 700, C.tool, 'start', 'develop'));
push(txt(ax + 196, ay, 9.5, 700, C.tool, 'start', 'the plane'));
push(txt(ax + 150, ay + 86, 9, 600, C.perf, 'middle', 'perforating vessels'));
leader(ax + 150, ay + 80, ax + 124, ay + 92);
push(txt(ax, 392, 12, 700, C.ink, 'middle', 'Axial &#8212; the enucleation plane', false));

// ===== PANEL B: sagittal landmarks ========================================
const bx = 620;
push(`<line x1="498" y1="86" x2="498" y2="378" stroke="${C.border}" stroke-width="1.3"/>`);
// bladder
push(`<path d="M ${bx - 56} 132 C ${bx - 56} 92 ${bx + 56} 92 ${bx + 56} 132 C ${bx + 56} 162 ${bx - 56} 162 ${bx - 56} 132 Z" fill="${C.lumen}" stroke="${C.lumenEdge}" stroke-width="2.2"/>`);
push(txt(bx, 116, 9.5, 700, C.lumenEdge, 'middle', 'bladder'));
// prostate body (capsule) around the urethra
push(`<ellipse cx="${bx}" cy="244" rx="70" ry="74" fill="${C.caps}" stroke="${C.capsEdge}" stroke-width="2.4"/>`);
// adenoma inside, plane dashed
push(`<ellipse cx="${bx}" cy="242" rx="52" ry="58" fill="${C.aden}" stroke="${C.adenEdge}" stroke-width="2"/>`);
push(`<ellipse cx="${bx}" cy="243" rx="61" ry="66" fill="none" stroke="${C.plane}" stroke-width="1.5" stroke-dasharray="6 4"/>`);
// prostatic urethra channel through it
push(`<path d="M ${bx} 158 L ${bx} 330" fill="none" stroke="${C.lumenEdge}" stroke-width="2" stroke-dasharray="2 3"/>`);
// verumontanum bump
push(`<path d="M ${bx} 270 q 9 6 0 14" fill="${C.adenEdge}"/>`);
push(`<circle cx="${bx + 8}" cy="277" r="3" fill="${C.adenEdge}"/>`);
push(txt(bx + 70, 280, 9, 700, C.ink, 'start', 'verumontanum'));
push(txt(bx + 74, 292, 8, 500, C.muted, 'start', 'distal landmark'));
leader(bx + 66, 278, bx + 12, 277);
// external sphincter below apex
push(`<path d="M ${bx - 12} 332 L ${bx + 12} 332" fill="none" stroke="${C.sphinc}" stroke-width="4" stroke-linecap="round"/>`);
push(txt(bx + 70, 336, 9, 700, C.sphinc, 'start', 'sphincter'));
leader(bx + 66, 334, bx + 14, 332);
// bladder neck + apex tags
push(txt(bx - 74, 168, 8.5, 600, C.muted, 'end', 'bladder neck'));
leader(bx - 70, 168, bx - 6, 168);
push(txt(bx - 74, 322, 8.5, 600, C.muted, 'end', 'apex'));
leader(bx - 70, 322, bx - 8, 322);
// enucleation direction arrow (apex -> bladder neck, retrograde)
push(`<line x1="${bx - 30} " y1="318" x2="${bx - 30}" y2="180" stroke="${C.tool}" stroke-width="2.4" marker-end="url(#ah)"/>`);
push(txt(bx - 34, 250, 9, 700, C.tool, 'end', 'enucleate'));
push(txt(bx - 34, 262, 8.5, 500, C.muted, 'end', 'apex &#8594; neck'));
push(txt(bx, 392, 12, 700, C.ink, 'middle', 'Sagittal &#8212; landmarks', false));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Anatomical enucleation of the prostate in two panels. The axial cross-section shows the transition-zone adenoma as two lateral lobes plus a posterior median lobe compressing the central urethra, all enclosed by the fibrous surgical capsule; a dashed enucleation plane runs between adenoma and capsule, with perforating vessels crossing it and an instrument developing the plane, the capsule left behind. The sagittal panel shows the bladder, bladder neck, prostate, prostatic urethra with the verumontanum as the distal safety landmark, the external sphincter below the apex, and a retrograde arrow enucleating from apex toward the bladder neck.">
<defs>
<marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.tool}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'prostate-enucleation.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
