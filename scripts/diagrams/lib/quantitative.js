'use strict';
// ICS adult male terminology §5.12. Boundary values 20 and 40 are equivocal.
const BOOI = {lower: 20, upper: 40, flowCoefficient: 2};
const pressureAtBoundary = (flow, index) => BOOI.flowCoefficient * flow + index;
const booi = (flow, pressure) => pressure - BOOI.flowCoefficient * flow;
function classifyMaleBooi(flow, pressure) {
  const index = booi(flow, pressure);
  return index > BOOI.upper ? 'Obstructed' : index < BOOI.lower ? 'Unobstructed' : 'Equivocal';
}
// Equal-limb planar Z geometry. Living tissue will not attain this value reliably.
const zPlastyGain = degrees => (Math.sqrt(5 - 4 * Math.cos(degrees * Math.PI / 180)) - 1) * 100;
module.exports = {BOOI, pressureAtBoundary, booi, classifyMaleBooi, zPlastyGain};
