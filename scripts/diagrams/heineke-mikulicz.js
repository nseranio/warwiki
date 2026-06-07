#!/usr/bin/env node
/**
 * WARWIKI original schematic — Heineke-Mikulicz principle.
 *
 * A longitudinal incision across a short narrowing, closed transversely:
 * the caliber widens at the waist while the segment shortens slightly. The
 * geometric basis of the non-transecting (stricturoplasty) bulbar repair,
 * the Fenger pyeloplasty, transverse ureterotomy closure, and Y-V variants.
 *
 * Output: static/img/diagrams/heineke-mikulicz.svg
 */
const fs = require('fs');
const path = require('path');

const C = { ink: '#1E293B', muted: '#64748B', border: '#E2E8F0', wall: '#475569', wallFill: '#EEF2F7',
  lumen: '#E2ECF5', lumenEdge: '#7FA3C4', cut: '#334155', suture: '#185FA5', stric: '#B91C1C',
  arrow: '#0F766E', gain: '#15803D' };
const FONT = "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const W = 820, H = 372;
const f = n => Number(n.toFixed(1));
const el = [];
const push = s => el.push(s);
function txt(x, y, size, weight, fill, anchor, s, halo = true) {
  const h = halo ? ` paint-order="stroke" stroke="#FFFFFF" stroke-width="3.2" stroke-linejoin="round"` : '';
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${fill}"${h}>${s}</text>`;
}

push(`<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="#FFFFFF" stroke="${C.border}" stroke-width="1.5"/>`);
push(txt(40, 38, 16, 700, C.ink, 'start', 'Heineke-Mikulicz principle &#8212; incise long, close transverse', false));
push(txt(40, 57, 12.5, 500, C.muted, 'start', 'a longitudinal cut across a short narrowing, closed at 90&#176; &#8212; the waist widens, the segment shortens slightly', false));

const cy = 188;
// reusable: draw a strictured channel (lumen path that pinches to a waist), walls as slate edges
function channel(x0, x1, narrow) {
  const w = 46, nw = narrow; // half-heights at ends vs waist
  const xm = (x0 + x1) / 2;
  // top wall edge
  push(`<path d="M ${x0} ${cy - w} C ${xm - 56} ${cy - w}, ${xm - 30} ${cy - nw}, ${xm} ${cy - nw} C ${xm + 30} ${cy - nw}, ${xm + 56} ${cy - w}, ${x1} ${cy - w}" fill="none" stroke="${C.wall}" stroke-width="2.6" stroke-linecap="round"/>`);
  push(`<path d="M ${x0} ${cy + w} C ${xm - 56} ${cy + w}, ${xm - 30} ${cy + nw}, ${xm} ${cy + nw} C ${xm + 30} ${cy + nw}, ${xm + 56} ${cy + w}, ${x1} ${cy + w}" fill="none" stroke="${C.wall}" stroke-width="2.6" stroke-linecap="round"/>`);
  return { xm, w, nw };
}
// lumen fill helper
function lumenFill(x0, x1, narrow) {
  const w = 40, nw = narrow - 6;
  const xm = (x0 + x1) / 2;
  push(`<path d="M ${x0} ${cy - w} C ${xm - 56} ${cy - w}, ${xm - 30} ${cy - nw}, ${xm} ${cy - nw} C ${xm + 30} ${cy - nw}, ${xm + 56} ${cy - w}, ${x1} ${cy - w} L ${x1} ${cy + w} C ${xm + 56} ${cy + w}, ${xm + 30} ${cy + nw}, ${xm} ${cy + nw} C ${xm - 30} ${cy + nw}, ${xm - 56} ${cy + w}, ${x0} ${cy + w} Z" fill="${C.lumen}"/>`);
}

// ---- panel A: stricture + longitudinal incision -------------------------
const ax0 = 70, ax1 = 320, axm = (ax0 + ax1) / 2;
lumenFill(ax0, ax1, 12);
channel(ax0, ax1, 12);
// stricture marker at the waist
push(`<ellipse cx="${axm}" cy="${cy}" rx="34" ry="22" fill="none" stroke="${C.stric}" stroke-width="1.4" stroke-dasharray="3 3"/>`);
push(txt(axm, cy - 30, 10.5, 700, C.stric, 'middle', 'stricture'));
// longitudinal incision along the axis through the waist
push(`<line x1="${axm - 64}" y1="${cy}" x2="${axm + 64}" y2="${cy}" stroke="${C.cut}" stroke-width="3" stroke-linecap="round"/>`);
// traction arrows pulling the incision edges apart transversely (up/down at center)
push(`<line x1="${axm}" y1="${cy - 6}" x2="${axm}" y2="${cy - 40}" stroke="${C.arrow}" stroke-width="2.2" marker-end="url(#ah)"/>`);
push(`<line x1="${axm}" y1="${cy + 6}" x2="${axm}" y2="${cy + 40}" stroke="${C.arrow}" stroke-width="2.2" marker-end="url(#ah)"/>`);
push(txt(axm + 72, cy + 4, 10, 600, C.cut, 'start', 'longitudinal'));
push(txt(axm + 72, cy + 17, 10, 600, C.cut, 'start', 'incision'));
push(txt(axm, cy + 92, 13, 700, C.ink, 'middle', '1. Incise the narrowing', false));

// ---- transform arrow -----------------------------------------------------
push(`<line x1="350" y1="${cy}" x2="402" y2="${cy}" stroke="${C.arrow}" stroke-width="2.6" marker-end="url(#ah)"/>`);
push(txt(376, cy - 11, 10.5, 600, C.arrow, 'middle', 'rotate 90&#176;', false));

// ---- panel B: transverse closure (widened) ------------------------------
const bx0 = 430, bx1 = 690, bxm = (bx0 + bx1) / 2;
// widened lumen: no waist now (slight bulge at former stricture)
function widened(x0, x1) {
  const w = 40, bw = 50; const xm = (x0 + x1) / 2;
  push(`<path d="M ${x0} ${cy - w} C ${xm - 50} ${cy - w}, ${xm - 28} ${cy - bw}, ${xm} ${cy - bw} C ${xm + 28} ${cy - bw}, ${xm + 50} ${cy - w}, ${x1} ${cy - w} L ${x1} ${cy + w} C ${xm + 50} ${cy + w}, ${xm + 28} ${cy + bw}, ${xm} ${cy + bw} C ${xm - 28} ${cy + bw}, ${xm - 50} ${cy + w}, ${x0} ${cy + w} Z" fill="${C.lumen}"/>`);
  push(`<path d="M ${x0} ${cy - w} C ${xm - 50} ${cy - w}, ${xm - 28} ${cy - bw}, ${xm} ${cy - bw} C ${xm + 28} ${cy - bw}, ${xm + 50} ${cy - w}, ${x1} ${cy - w}" fill="none" stroke="${C.wall}" stroke-width="2.6" stroke-linecap="round"/>`);
  push(`<path d="M ${x0} ${cy + w} C ${xm - 50} ${cy + w}, ${xm - 28} ${cy + bw}, ${xm} ${cy + bw} C ${xm + 28} ${cy + bw}, ${xm + 50} ${cy + w}, ${x1} ${cy + w}" fill="none" stroke="${C.wall}" stroke-width="2.6" stroke-linecap="round"/>`);
}
widened(bx0, bx1);
// transverse suture line (vertical) at former waist + ticks
push(`<line x1="${bxm}" y1="${cy - 50}" x2="${bxm}" y2="${cy + 50}" stroke="${C.suture}" stroke-width="2.8" stroke-linecap="round"/>`);
for (let i = -2; i <= 2; i++) {
  const yy = cy + i * 20;
  push(`<line x1="${bxm - 8}" y1="${f(yy)}" x2="${bxm + 8}" y2="${f(yy)}" stroke="${C.suture}" stroke-width="1.4"/>`);
}
push(txt(bxm, cy - 64, 10, 600, C.suture, 'middle', 'transverse suture line'));
// caliber gain bracket
push(`<path d="M ${bx1 + 12} ${cy - 50} L ${bx1 + 20} ${cy - 50} M ${bx1 + 16} ${cy - 50} L ${bx1 + 16} ${cy + 50} M ${bx1 + 12} ${cy + 50} L ${bx1 + 20} ${cy + 50}" fill="none" stroke="${C.gain}" stroke-width="1.4"/>`);
push(txt(bx1 + 26, cy - 8, 11, 700, C.gain, 'start', 'wider'));
push(txt(bx1 + 26, cy + 8, 11, 700, C.gain, 'start', 'caliber'));
push(txt(bxm, cy + 92, 13, 700, C.ink, 'middle', '2. Close transversely', false));

// ---- key -----------------------------------------------------------------
push(`<line x1="40" y1="316" x2="780" y2="316" stroke="${C.border}" stroke-width="1"/>`);
push(txt(40, 337, 11, 600, C.ink, 'start', 'Best for short (&#8804; ~1 cm) narrowings: no tissue is removed and the lumen is never transected, so the spongiosal blood supply is preserved.', false));
push(txt(40, 356, 10.5, 500, C.muted, 'start', 'Trades a little length for caliber. Uses: non-transecting bulbar urethroplasty (stricturoplasty) · Fenger pyeloplasty · transverse ureterotomy closure.', false));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Heineke-Mikulicz principle: a longitudinal incision is made across a short luminal narrowing (panel 1) and then closed transversely at 90 degrees (panel 2), widening the caliber at the former stricture while slightly shortening the segment; key notes it preserves blood supply because no tissue is removed and the lumen is not transected, used for non-transecting bulbar urethroplasty, Fenger pyeloplasty, and transverse ureterotomy closure.">
<defs>
<marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${C.arrow}"/></marker>
</defs>
${el.join('\n')}
</svg>
`;
const out = path.join(__dirname, '..', '..', 'static', 'img', 'diagrams', 'heineke-mikulicz.svg');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, svg);
console.log('wrote', path.relative(path.join(__dirname, '..', '..'), out), `(${svg.length} bytes)`);
