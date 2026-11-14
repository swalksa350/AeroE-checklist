/* Weight and balance template – Cessna 208B Grand Caravan.
   UNVERIFIED: station arms, fuel arm and CG limits below were entered from memory of POH Section 6 for a
   standard commuter configuration. They are a starting point only. Verify every figure against the POH and the
   airframe's current weight and balance report before use. Datum: 100 in forward of the firewall. */
window.WB = window.WB || {};
window.WB.c208b = {
  verified: false,
  basis: "Cessna 208B (PT6A-114A), standard commuter seating, cargo pod fitted. Arms and limits from memory of POH Section 6 – verify against the POH for the airframe.",
  units: { weight: "lb", arm: "in", fuel: "USgal" },
  fuelDensity: 6.7,          // lb per US gallon, Jet A-1 (verify; 6.7–6.8 typical)
  fuelArm: 203.4,            // in – fuel CG moves only slightly with quantity (approx 201–204 in); verify
  fuelCapacity: 332,         // usable US gallons (verify)
  limits: { maxRamp: 8785, maxTakeoff: 8750, maxLanding: 8500, maxZeroFuel: null },
  stations: [
    { id: "row1", name: "Pilot and front passenger", arm: 135.5, max: null },
    { id: "row2", name: "Seats 3–4", arm: 173.0, max: null },
    { id: "row3", name: "Seats 5–6", arm: 208.0, max: null },
    { id: "row4", name: "Seats 7–8", arm: 243.0, max: null },
    { id: "row5", name: "Seats 9–10", arm: 278.0, max: null },
    { id: "row6", name: "Seats 11–12 (aft)", arm: 313.0, max: null },
    { id: "cab1", name: "Cabin zone 1 (FS 155–190)", arm: 172.8, max: 1370 },
    { id: "cab2", name: "Cabin zone 2 (FS 190–240)", arm: 215.0, max: 1500 },
    { id: "cab3", name: "Cabin zone 3 (FS 240–288)", arm: 264.0, max: 1500 },
    { id: "cab4", name: "Cabin zone 4 (FS 288–332)", arm: 310.0, max: 1100 },
    { id: "cab5", name: "Cabin zone 5 (FS 332–345, aft)", arm: 338.0, max: 230 },
    { id: "podA", name: "Cargo pod zone A", arm: 132.4, max: 230 },
    { id: "podB", name: "Cargo pod zone B", arm: 182.0, max: 370 },
    { id: "podC", name: "Cargo pod zone C", arm: 233.0, max: 370 },
    { id: "podD", name: "Cargo pod zone D", arm: 287.0, max: 140 }
  ],
  /* CG limits as [weight, arm] pairs; the app interpolates between points. */
  envelope: {
    forward: [[4500, 179.6], [8750, 186.0]],
    aft: [[4500, 204.35], [8750, 204.35]]
  },
  notes: [
    "Forward limit 179.6 in up to about 4,500 lb, moving aft linearly to about 186 in at 8,750 lb – verify the breakpoints in POH Section 2.",
    "Aft limit 204.35 in at all weights – verify.",
    "Cargo zone maxima are floor-loading limits from memory – verify, and respect the per-seat and tie-down limits."
  ]
};
