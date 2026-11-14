/* Weight and balance template – GippsAero GA8 Airvan.
   Figures from the GA8 Owners and Pilots Information Manual GA-FM-04, Section 2 (limitations) and Section 6
   (loading trim sheets, figures 6-3a to 6-3d). Datum is the firewall (station 0), 1,057 mm forward of the wing
   leading edge; arms are millimetres aft of the datum. Transcribed by hand from the manual: confirm against the
   AFM and the aircraft's current weight and balance report before relying on a result. */
window.WB = window.WB || {};
window.WB.ga8 = {
  verified: false,
  basis: "GippsAero GA8 Airvan, GA-FM-04 Section 6 loading trim sheets (metric). Datum: firewall, station 0. Pax/freighter seat rows and freighter cargo zones are both listed – load whichever the aircraft is configured with.",
  units: { weight: "kg", arm: "mm", fuel: "L" },
  fuelDensity: 0.72,         // kg per litre, Avgas 100LL (the AFM trim sheet uses 230 kg for 324 L ≈ 0.71)
  fuelArm: 1715,             // mm (67.5 in), figure 6-3b
  fuelCapacity: 332,         // usable litres (87.7 US gal); total 349 L. Max lateral difference 100 L
  limits: { maxRamp: null, maxTakeoff: 1814, maxLanding: 1814, maxZeroFuel: null },
  stations: [
    { id: "row1",  name: "Row 1 – pilot and front passenger", arm: 965,  max: null },
    { id: "row2",  name: "Row 2 – seats or cargo",            arm: 1772, max: null },
    { id: "row3",  name: "Row 3 – seats or cargo",            arm: 2523, max: null },
    { id: "row4",  name: "Row 4 – seats or cargo",            arm: 3247, max: null },
    { id: "z1a",   name: "Cargo zone 1A (freighter)",         arm: 1524, max: null },
    { id: "z1b",   name: "Cargo zone 1B (freighter)",         arm: 1968, max: null },
    { id: "z1c",   name: "Cargo zone 1C (freighter)",         arm: 2861, max: null },
    { id: "shelf", name: "Cabin baggage shelf (zone 2)",      arm: 3768, max: 113 },
    { id: "bin",   name: "Aft luggage bin (zone 3)",          arm: 4623, max: 22 }
  ],
  /* Section 2.7: forward limit 1,219 mm (48 in) at 1,089 kg (2,400 lb) and below, straight line to 1,422 mm (56 in)
     at 1,814 kg (4,000 lb); aft limit 1,626 mm (64 in) at all weights. */
  envelope: {
    forward: [[700, 1219], [1089, 1219], [1814, 1422]],
    aft:     [[700, 1626], [1814, 1626]]
  },
  notes: [
    "Maximum take-off and landing weight 1,814 kg (4,000 lb). Main cargo area (zones 1A, 1B and 1C, or rows 2–4 as cargo) 680 kg (1,500 lb) combined – the app does not total this for you.",
    "Cabin baggage shelf 113 kg (250 lb); aft luggage bin 22 kg (50 lb).",
    "Fuel: 349 L total, 332 L usable in two wing tanks; maximum lateral difference 100 L (26.4 US gal). Avgas 100/130 or 100LL.",
    "Freighter zone arms are the zone mid-points used on the freighter trim sheet (1A 1,320–1,727 mm, 1B 1,727–2,210 mm, 1C 2,210–3,512 mm)."
  ],
  /* Seeded once as a deletable example so the W&B tab can be tried without a real aircraft. The empty weight and
     arm are NOT a real aircraft's: 980 kg is the AFM trim-sheet worked example and 1,150 mm reproduces its result
     (zero-fuel 1,580 kg at about 1,585 mm, take-off 1,810 kg within limits). Delete it from Edit profile. */
  testProfile: {
    rego: "VH-WSM", test: true,
    emptyWeight: 980, emptyArm: 1150, reportDate: "",
    notes: "TEST DATA – fictitious empty weight and arm taken from the AFM worked example, not from any aircraft's weight and balance report. Delete this registration before operational use.",
    loads: { row1: 160, row2: 110, row3: 120, row4: 160, shelf: 30, bin: 20 }, fuel: 324, taxi: null, burn: null
  }
};
