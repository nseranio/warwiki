'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const registry = require('../../src/data/figures.json');
const {BOOI, pressureAtBoundary, classifyMaleBooi, zPlastyGain} = require('../diagrams/lib/quantitative');
const {withFigureMetadata} = require('../diagrams/lib/metadata');

test('every published diagram has an accessible versioned source record without invented sign-off', () => {
  const assets = fs.readdirSync(path.join(__dirname, '../../static/img/diagrams')).filter(x => x.endsWith('.svg')).map(x => x.slice(0,-4)).sort();
  assert.deepEqual(Object.keys(registry.figures).sort(), assets);
  assert.equal(assets.length,52);
  for (const id of assets) {
    const figure = registry.figures[id];
    assert.equal(figure.clinicalReview.status,'pending',id);
    assert.equal(figure.clinicalReview.reviewer,null,id);
    assert.equal(figure.clinicalReview.date,null,id);
    for (const field of ['title','textEquivalent','populationAndView','units','scale','limitations','author','license','version']) assert.ok(figure[field],`${id} ${field}`);
    assert.ok(figure.sourceIds.length,id);
    for(const key of figure.sourceIds) {
      const source = registry.sources[key];assert.ok(source?.url.startsWith('https://'),`${id} ${key}`);
      assert.ok(source.access && source.checkScope && source.checkedOn, `${id} source audit`);
    }
    const svg=fs.readFileSync(path.join(__dirname,'../../static/img/diagrams',id+'.svg'),'utf8');
    assert.match(svg,/<title id="figure-title">/);assert.match(svg,/<desc id="figure-description">/);assert.match(svg,/<metadata id="figure-registry">/);
    assert.ok(svg.indexOf('>')<1000,`${id}: keep root recognizable by image-size`);
    assert.ok(!svg.includes('66 to 34 percent')&&!svg.includes('least pain'),`${id} removed unsafe ranks`);
  }
});
test('male BOOI boundary values remain equivocal and match plotted boundaries', () => {
  for(const flow of [0,10,30]) {
    assert.equal(classifyMaleBooi(flow,pressureAtBoundary(flow,BOOI.lower)),'Equivocal');
    assert.equal(classifyMaleBooi(flow,pressureAtBoundary(flow,BOOI.upper)),'Equivocal');
    assert.equal(classifyMaleBooi(flow,pressureAtBoundary(flow,BOOI.lower)-0.01),'Unobstructed');
    assert.equal(classifyMaleBooi(flow,pressureAtBoundary(flow,BOOI.upper)+0.01),'Obstructed');
  }
});
test('equal-limb Z geometry is calculated rather than treating clinical gain as fixed', () => {
  assert.ok(Math.abs(zPlastyGain(60)-(Math.sqrt(3)-1)*100)<1e-8);
  assert.equal(Math.round(zPlastyGain(30)),24);assert.equal(Math.round(zPlastyGain(90)),124);
});
test('metadata escapes registry text and keeps the original scene below a short SVG root', () => {
  const svg=withFigureMetadata('<svg viewBox="0 0 800 300"><title>old</title><desc>old</desc><path id="scene"/></svg>', 'graft-placement');
  assert.equal((svg.match(/<title\b/g)||[]).length,1);
  assert.match(svg,/<path id="scene"\/>/);assert.match(svg,/clinical review pending/);
  assert.match(svg,/viewBox="0 0 800 396"/);
  assert.throws(()=>withFigureMetadata('<svg/>','unknown'),/Unregistered/);
});
test('the rendered Z-plasty limbs actually subtend the labeled 60 degrees', () => {
  const svg=fs.readFileSync(path.join(__dirname,'../../static/img/diagrams/z-plasty.svg'),'utf8');
  const lines=[...svg.matchAll(/<line\s+([^>]+)>/g)].map(m=>Object.fromEntries([...m[1].matchAll(/(x1|x2|y1|y2)="([^"]+)"/g)].map(a=>[a[1],Number(a[2])])));
  const arm=lines[1],central=lines[3];
  const v=[arm.x1-arm.x2,arm.y1-arm.y2],w=[central.x2-central.x1,central.y2-central.y1];
  const angle=Math.acos((v[0]*w[0]+v[1]*w[1])/(Math.hypot(...v)*Math.hypot(...w)))*180/Math.PI;
  assert.ok(Math.abs(angle-60)<0.1,`drawn angle ${angle}`);
});
