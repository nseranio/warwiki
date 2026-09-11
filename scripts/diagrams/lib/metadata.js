'use strict';
const registry = require('../../../src/data/figures.json');
function escapeXml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
}
/** Attach the same source/review record used by the page to every exported vector. */
function withFigureMetadata(svg, id) {
  const figure = registry.figures[id];
  if (!figure) throw new Error(`Unregistered figure: ${id}`);
  const dimensions = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
  if (!dimensions) throw new Error(`Missing figure dimensions: ${id}`);
  const width = Number(dimensions[1]), originalHeight = Number(dimensions[2]);
  const sources = figure.sourceIds.map(key => registry.sources[key]);
  if (sources.some(source => !source)) throw new Error(`Missing source: ${id}`);
  const footerHeight = 64 + sources.length * 16;
  let body = svg.replace(/^.*?<svg\b[^>]*>/s, '').replace(/<\/svg>\s*$/, '');
  body = body.replace(/<(title|desc|metadata)\b[^>]*>[\s\S]*?<\/\1>/g, '');
  const desc = `${figure.textEquivalent} ${figure.limitations} View: ${figure.populationAndView}. Scale: ${figure.scale}. Units: ${figure.units}. Clinical review pending; no named clinician has signed off. Concept sources: ${sources.map(s => `${s.title} (${s.version}), ${s.url}; access: ${s.access}; ${s.checkScope}`).join(' ')} ${figure.author}. ${figure.license}`;
  const footText = (y, text, size = 11) => `<text x="20" y="${y}" font-family="Arial, sans-serif" font-size="${size}" fill="#334155">${escapeXml(text)}</text>`;
  const footer = `<g id="figure-provenance"><rect x="0" y="${originalHeight}" width="${width}" height="${footerHeight}" fill="#F8FAFC"/>${footText(originalHeight + 20, `WARWIKI · original schematic · v${figure.version} · clinical review pending`)}${footText(originalHeight + 37, figure.scale)}${sources.map((s,i) => `<a href="${escapeXml(s.url)}">${footText(originalHeight + 55 + i*16, `Concept source: ${s.title.length > 99 ? s.title.slice(0,96)+'…' : s.title}`, 10)}</a>`).join('')}</g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${originalHeight + footerHeight}" width="${width}" height="${originalHeight + footerHeight}" role="img" aria-labelledby="figure-title figure-description">\n<title id="figure-title">${escapeXml(figure.title)}</title>\n<desc id="figure-description">${escapeXml(desc)}</desc>\n<metadata id="figure-registry">${escapeXml(JSON.stringify({...figure, sources}))}</metadata>\n${body.trim()}\n${footer}\n</svg>\n`;
}
module.exports = {withFigureMetadata, escapeXml};
