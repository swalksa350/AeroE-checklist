/* Weight and balance template – Cessna 208B Grand Caravan (G1000), from the POH 208BPHBUS-00 Section 6.
   Datum: station 0.0 (100.0 in forward of the firewall face). Arms in inches aft of datum, weights in pounds.
   Sources: Figure 6-3 sheet 2 (maximum structural weights, cabin and pod zone centroids), Figure 6-11 sheet 3 (seat
   positions), the Maximum Zone/Compartment Loadings table (page 6-22), the sample loading problem (Figure 6-16, fuel
   moment) and the Center of Gravity Limits chart (Figure 6-17, read from the graph: Section 2 of the POH, which states
   the limits in words, was not available – confirm the forward limit figures there). */
window.WB = window.WB || {};
window.WB.c208b = {
  verified: false,
  basis: "Cessna 208B G1000 POH 208BPHBUS-00 Section 6: seat and cargo-zone arms, zone limits and maximum weights from the manual; CG envelope read from the Figure 6-17 chart (confirm against Section 2).",
  units: { weight: "lb", arm: "in", fuel: "USgal" },
  fuelDensity: 6.7,          // lb per US gallon (POH weight and balance basis; Jet A at 15 °C)
  fuelArm: 203.1,            // in – from the POH sample loading problem (2,224 lb usable fuel, moment 451,700 lb·in)
  fuelCapacity: 332,         // usable US gallons (335.6 total, 3.6 unusable)
  limits: { maxRamp: 8785, maxTakeoff: 8750, maxLanding: 8500, maxZeroFuel: null },
  stations: [
    { id: "pilot",  name: "Pilot (seat 1, FS 135.5)",                     arm: 135.5, max: null },
    { id: "copilot",name: "Front passenger (seat 2, FS 135.5)",           arm: 135.5, max: null },
    { id: "row2",   name: "Commuter seats 3 and 4 (FS 173.9)",            arm: 173.9, max: null },
    { id: "row3",   name: "Commuter seats 5 and 6 (FS 209.9)",            arm: 209.9, max: null },
    { id: "row4",   name: "Commuter seats 7 and 8 (FS 245.9)",            arm: 245.9, max: null },
    { id: "row5",   name: "Commuter seats 9 and 10 (FS 281.9)",           arm: 281.9, max: null },
    { id: "z1",     name: "Cabin cargo zone 1 (FS 155.4–188.7)",          arm: 172.1, max: 1780 },
    { id: "z2",     name: "Cabin cargo zone 2 (FS 188.7–246.8)",          arm: 217.8, max: 3100 },
    { id: "z3",     name: "Cabin cargo zone 3 (FS 246.8–282.0)",          arm: 264.4, max: 1900 },
    { id: "z4",     name: "Cabin cargo zone 4 (FS 282.0–307.0)",          arm: 294.5, max: 1380 },
    { id: "z5",     name: "Cabin cargo zone 5 (FS 307.0–332.0)",          arm: 319.5, max: 1270 },
    { id: "z6",     name: "Cabin cargo zone 6 (FS 332.0–356.0)",          arm: 344.0, max: 320 },
    { id: "podA",   name: "Cargo pod zone A (FS 100.0–154.75)",           arm: 132.4, max: 230 },
    { id: "podB",   name: "Cargo pod zone B (FS 154.75–209.35)",          arm: 182.1, max: 310 },
    { id: "podC",   name: "Cargo pod zone C (FS 209.35–257.35)",          arm: 233.4, max: 270 },
    { id: "podD",   name: "Cargo pod zone D (FS 257.35–332.0)",           arm: 287.6, max: 280 }
  ],
  /* Figure 6-17: forward limit 179.6 in at 5,500 lb and below, straight lines to about 193.0 in at 8,000 lb and
     197.3 in at 8,500 lb (take-off and landing), and 199.0 in at 8,750 lb (take-off only). Aft limit 204.35 in
     (40.33 % MAC) at all weights; the POH shades 38.33–40.33 % MAC as a caution area for cargo loadings. */
  envelope: {
    forward: [[4000, 179.6], [5500, 179.6], [8000, 193.0], [8500, 197.3], [8750, 199.0]],
    aft:     [[4000, 204.35], [8750, 204.35]]
  },
  notes: [
    "Maximum ramp 8,785 lb, take-off 8,750 lb, landing 8,500 lb. Maximum cabin cargo 3,400 lb in total; maximum cargo pod load 1,090 lb (30 lb/sq ft floor loading).",
    "Cabin zone maxima are the POH figures for cargo secured by tie-downs; cargo held only by partition nets is limited to 415 / 860 / 495 / 340 / 315 / 245 lb for zones 1–6. If zone 5 carries more than 400 lb, see the POH limits on zone 6.",
    "Commuter seat rows are the 10-place arrangement (Figure 6-11 sheet 3); the 11-place and aft-passenger arrangements have other arms, so set the station arms to match the airframe. Pilot and front passenger arm 135.5 in is for the seat locking pin at FS 145.0 (range 133.5–146.5).",
    "Fuel: 332 US gal usable at 6.7 lb/gal = 2,224 lb; the POH fuel moment varies slightly with quantity (loading graph) – 203.1 in is the full-fuel figure.",
    "Loadings in the aft caution area (38.33–40.33 % MAC, about 202.3–204.35 in) should only be used when the CG has been determined accurately."
  ],
  /* Seeded once as a deletable example: the POH sample loading problem airplane (basic empty weight 5,005 lb at
     185.69 in). Not a real aircraft. Its loads reproduce the POH sample: ramp 8,785 lb, take-off 8,750 lb at about
     199.2 in, inside the envelope; a 40 gal trip burn is added so the landing weight is within its limit. */
  testProfile: {
    rego: "VH-SMP", test: true,
    emptyWeight: 5005, emptyArm: 185.69, reportDate: "",
    notes: "TEST DATA – the POH sample loading problem airplane (5,005 lb at 185.69 in), not a real aircraft's weight and balance report. Delete this registration before operational use.",
    loads: { pilot: 170, z1: 120, z2: 416, z3: 200, z4: 200, z5: 200, z6: 50, podA: 50, podB: 50, podC: 50, podD: 50 }, fuel: 331.9, taxi: 5.3, burn: 40
  }
};
