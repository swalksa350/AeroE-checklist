/* Weight and balance template – GippsAero GA8 Airvan.
   This template carries the station layout, units and weight limits only. The GA8 AFM gives station arms in
   millimetres from the datum and a CG envelope that the app needs; enter them from the AFM (Section 6) for the
   airframe when you set up a registration. Nothing is computed until they are present. */
window.WB = window.WB || {};
window.WB.ga8 = {
  verified: false,
  basis: "GippsAero GA8 Airvan. Station arms and the CG envelope are not provided by this template: enter them from the AFM Section 6 loading data for the airframe.",
  units: { weight: "kg", arm: "mm", fuel: "L" },
  fuelDensity: 0.72,         // kg per litre, Avgas 100LL (verify; 0.71–0.72)
  fuelArm: null,             // mm – enter from the AFM
  fuelCapacity: 332,         // usable litres (verify)
  limits: { maxRamp: null, maxTakeoff: 1814, maxLanding: 1814, maxZeroFuel: null },
  stations: [
    { id: "row1", name: "Pilot and front passenger (row 1)", arm: null, max: null },
    { id: "row2", name: "Row 2", arm: null, max: null },
    { id: "row3", name: "Row 3", arm: null, max: null },
    { id: "row4", name: "Row 4", arm: null, max: null },
    { id: "bag", name: "Baggage / cargo (rear)", arm: null, max: null }
  ],
  envelope: { forward: [], aft: [] },
  notes: [
    "Maximum take-off weight 1,814 kg (4,000 lb) for the GA8; the GA8-TC320 differs – verify for the airframe.",
    "Enter the forward and aft CG limits as weight/arm pairs from the AFM envelope; at least two points each."
  ]
};
