#!/usr/bin/env node
/**
 * WARWIKI original schematic — sacrocolpopexy Y-mesh configuration.
 *
 * Sagittal pelvis: a Y-shaped mesh with an anterior and a posterior arm sutured
 * along the vaginal walls, joining into a single stem fixed to the anterior
 * longitudinal ligament at the sacral promontory (S1) — suspending the apex
 * tension-free along the natural vaginal axis.
 *
 * Output: static/img/diagrams/sacrocolpopexy.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', bone: '#ECE4D4', boneEdge: '#B6A98C',
  blad: '#E2ECF5', bladEdge: '#4F6F92', vag: '#F3DBDC', vagEdge: '#CF9DA3', rect: '#E8DFD2', rectEdge: '#B99873',
  mesh: '#185FA5', meshFill: '#DCE7F1', suture: '#B45309', arrow: '#0F766E', uret: '#64748B' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 860, H = 404;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 36, 16, 700, C.ink, 'start', 'Sacrocolpopexy &#8212; Y-mesh from vaginal vault to sacral promontory', false));
push(txt(40, 55, 12.5, 500, C.muted, 'start', 'sagittal view: anterior and posterior mesh arms join into one stem fixed to the anterior longitudinal ligament at S1', false));

// orientation
push(txt(96, 90, 10, 700, C.muted, 'middle', 'anterior', false));
push(`<line x1="138" y1="86" x2="172" y2="86" stroke="${C.muted}" stroke-width="1" marker-end="url(#sa)"/>`);
push(txt(250, 90, 10, 700, C.muted, 'middle', 'posterior &#8594;', false));

// ---- sacrum + promontory (posterior, right) ----
push(`<path d="M 560 132 C 612 150, 612 270, 556 360 L 590 372 C 660 280, 656 150, 600 120 Z" fill="${C.bone}" stroke="${C.boneEdge}" stroke-width="1.6" stroke-linejoin="round"/>`);
for (let i = 0; i < 4; i++) push(`<line x1="${572 + i * 4}" y1="${178 + i * 46}" x2="${598 + i * 4}" y2="${178 + i * 46}" stroke="${C.boneEdge}" stroke-width="0.9"/>`);
push(txt(636, 150, 9.5, 700, C.boneEdge, 'middle', 'sacrum'));
// promontory point
push(`<circle cx="560" cy="150" r="4" fill="${C.boneEdge}"/>`);
push(txt(560, 120, 9.5, 700, C.ink, 'middle', 'sacral promontory (S1)'));
push(txt(560, 134, 8.5, 500, C.muted, 'middle', 'ant. longitudinal lig.'));

// ---- pubic symphysis (anterior, lower-left) ----
push(`<ellipse cx="150" cy="312" rx="16" ry="26" fill="${C.bone}" stroke="${C.boneEdge}" stroke-width="1.4"/>`);
push(txt(150, 356, 9, 600, C.boneEdge, 'middle', 'pubis'));

// ---- bladder (anterior) ----
push(`<path d="M 196 268 C 188 210, 248 196, 286 214 C 300 222, 300 250, 286 270 C 262 292, 210 292, 196 268 Z" fill="${C.blad}" stroke="${C.bladEdge}" stroke-width="2" stroke-linejoin="round"/>`);
push(txt(238, 244, 10.5, 700, C.bladEdge, 'middle', 'bladder'));
// urethra
push(`<path d="M 214 286 C 200 312, 190 332, 182 350" fill="none" stroke="${C.uret}" stroke-width="6" stroke-linecap="round"/>`);
push(`<path d="M 214 286 C 200 312, 190 332, 182 350" fill="none" stroke="${C.lumen || '#FFFFFF'}" stroke-width="2" stroke-linecap="round"/>`);

// ---- rectum (posterior) ----
push(`<path d="M 470 168 C 506 220, 500 300, 470 348 C 462 360, 446 360, 442 350 C 470 300, 472 230, 440 188 C 444 172, 462 162, 470 168 Z" fill="${C.rect}" stroke="${C.rectEdge}" stroke-width="1.8" stroke-linejoin="round"/>`);
push(txt(486, 300, 10, 700, C.rectEdge, 'middle', 'rectum'));

// ---- vagina (vault to introitus), post-hysterectomy ----
// anterior wall and posterior wall as two lines; vault closed at top
const vaultA = [330, 214], vaultP = [372, 206], introA = [250, 360], introP = [300, 364];
push(`<path d="M ${vaultA[0]} ${vaultA[1]} C 300 270, 268 320, ${introA[0]} ${introA[1]} L ${introP[0]} ${introP[1]} C 332 320, 356 264, ${vaultP[0]} ${vaultP[1]} C 356 196, 344 196, ${vaultA[0]} ${vaultA[1]} Z" fill="${C.vag}" stroke="${C.vagEdge}" stroke-width="1.8" stroke-linejoin="round"/>`);
push(txt(305, 300, 10, 700, C.vagEdge, 'middle', 'vagina'));
push(txt(351, 192, 9, 600, C.muted, 'middle', 'vault'));

// ---- Y-mesh ----
// anterior arm along anterior vaginal wall
push(`<path d="M ${vaultA[0]} ${vaultA[1]} C 304 268, 276 314, 262 348" fill="none" stroke="${C.mesh}" stroke-width="5.5" stroke-linecap="round"/>`);
// posterior arm along posterior vaginal wall
push(`<path d="M ${vaultP[0]} ${vaultP[1]} C 360 258, 340 300, 326 330" fill="none" stroke="${C.mesh}" stroke-width="5.5" stroke-linecap="round"/>`);
// stem from vault up-and-back to promontory (suspended along the axis, bridging not tight)
push(`<path d="M 351 200 C 420 176, 500 160, 558 152" fill="none" stroke="${C.mesh}" stroke-width="6" stroke-linecap="round"/>`);
// fixation sutures at promontory
for (let i = 0; i < 2; i++) push(`<line x1="${540 + i * 12}" y1="146" x2="${540 + i * 12}" y2="160" stroke="${C.suture}" stroke-width="1.6"/>`);
// vaginal-wall mesh fixation ticks
for (const p of [[300, 268], [285, 300], [355, 262], [340, 296]]) push(`<line x1="${p[0] - 5}" y1="${p[1]}" x2="${p[0] + 5}" y2="${p[1]}" stroke="${C.suture}" stroke-width="1.4"/>`);
// labels for mesh parts
push(txt(262, 366, 9.5, 700, C.mesh, 'middle', 'anterior arm'));
push(txt(330, 348, 9.5, 700, C.mesh, 'middle', 'posterior arm'));
push(txt(456, 150, 9.5, 700, C.mesh, 'middle', 'sacral stem'));
push(txt(456, 163, 8.5, 500, C.muted, 'middle', '(no tension)'));


const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Sagittal pelvis showing sacrocolpopexy. A Y-shaped mesh has an anterior arm sutured along the anterior vaginal wall and a posterior arm along the posterior vaginal wall; the two arms join at the vault into a single stem that runs back and up to the sacral promontory, where it is fixed to the anterior longitudinal ligament just below S1. The bladder lies anterior, the rectum posterior. Key: gold-standard durable apical repair restoring the natural vaginal axis; suture to the anterior longitudinal ligament avoiding the left common iliac vein and middle sacral vessels; keep the mesh bridging not taut and re-peritonealize it.">
<defs>
<marker id="sa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.muted}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'sacrocolpopexy.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
