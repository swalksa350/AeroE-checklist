/* Fuel plan from the briefing requirements and the operator's policy. Units: whatever the aircraft burns (L or USgal).
   policy: {fixedReserveMin (30 day VFR / 45 IFR-night, per operator), variableReservePct (e.g. 10 for air transport), taxi, contingencyMin} */
function fuelPlan(p) {
  const flow = +p.fuelFlow || 0; const pol = Object.assign({ fixedReserveMin: 45, variableReservePct: 10, taxi: 0, contingencyMin: 0 }, p.policy || {});
  const trip = (p.eetMin || 0) / 60 * flow; const alternate = p.alternateRequired ? ((p.altEetMin || 0) / 60 * flow) : 0;
  const holding = (p.holdingMin || 0) / 60 * flow; const variable = trip * pol.variableReservePct / 100; const fixed = pol.fixedReserveMin / 60 * flow; const contingency = pol.contingencyMin / 60 * flow;
  const required = trip + alternate + holding + variable + fixed + contingency + (+pol.taxi || 0);
  const lines = [["Taxi", +pol.taxi || 0], ["Trip (" + (p.eetMin || 0) + " min)", trip], ["Alternate" + (p.alternateRequired ? " (" + (p.altEetMin || 0) + " min)" : " (not required)"), alternate], ["Holding (" + (p.holdingMin || 0) + " min)", holding], ["Variable reserve (" + pol.variableReservePct + " % of trip)", variable], ["Fixed reserve (" + pol.fixedReserveMin + " min)", fixed]];
  if (pol.contingencyMin) lines.push(["Contingency (" + pol.contingencyMin + " min)", contingency]);
  const onBoard = p.fuelOnBoard === undefined || p.fuelOnBoard === null ? null : +p.fuelOnBoard;
  return { flow, lines: lines.map(([k, v]) => [k, Math.round(v * 10) / 10]), required: Math.ceil(required), onBoard, sufficient: onBoard === null ? null : onBoard >= required, margin: onBoard === null ? null : Math.round((onBoard - required) * 10) / 10, enduranceMin: onBoard !== null && flow ? Math.round(onBoard / flow * 60) : null, policy: pol };
}
module.exports = { fuelPlan };
