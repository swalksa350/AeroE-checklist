/* Cirrus SR22 (G3 / G5) – checklist data.
   Prototype content. Verify against the operator's approved checklist and the POH/AFM. */
window.AIRCRAFT = window.AIRCRAFT || [];
window.AIRCRAFT.push({
  id: "sr22",
  maker: "Cirrus",
  model: "SR22 G3 / G5",
  short: "SR22",
  category: "High-performance single",
  engine: "Continental IO-550-N, 310 hp",
  seats: "4 (G3) / 5 (G5)",
  basis: "Typical normally-aspirated SR22 G3 (3,400 lb) and G5 (3,600 lb) POH procedures with Perspective avionics; where the two differ both figures are given (G3 / G5).",
  vspeeds: [
    {k:"Vr", v:"70 KIAS (G3) / 73 KIAS (G5), flaps 50%"},
    {k:"Vx", v:"78 KIAS (G3) / 81 KIAS (G5)"},
    {k:"Vy", v:"101 KIAS (G3) / 108 KIAS (G5)"},
    {k:"Best glide", v:"88 KIAS (G3) / 92 KIAS (G5)"},
    {k:"Vfe", v:"50%: 119 KIAS (G3) / 150 KIAS (G5); 100%: 104 KIAS (G3) / 110 KIAS (G5)"},
    {k:"Va", v:"133 KIAS at 3,400 lb (G3) / 140 KIAS at 3,600 lb (G5)"},
    {k:"Vno", v:"178 KIAS (G3) / 177 KIAS (G5)"},
    {k:"Vne", v:"204 KIAS (G3) / 201 KIAS (G5)"},
    {k:"Vpd (max CAPS deploy, demonstrated)", v:"133 KIAS (G3) / 140 KIAS (G5)"},
    {k:"Vs / Vso", v:"approx 73 / 60 KIAS (max weight)"},
    {k:"Vref", v:"flaps 100%: 77–80 KIAS (G3) / 80–85 KIAS (G5); flaps 50%: 85–90 KIAS"}
  ],

  normal: [
    {id:"pre", name:"Before Start", items:[
      {c:"Preflight inspection", r:"COMPLETE"},
      {c:"CAPS handle safety pin", r:"REMOVED (handle cover in place, pin stowed)"},
      {c:"Passenger briefing", r:"COMPLETE (belts / airbags, doors, egress, CAPS – who pulls and when)"},
      {c:"Seats, belts, shoulder harnesses", r:"ADJUST & LOCK"},
      {c:"Doors", r:"CLOSED & LATCHED"},
      {c:"Parking brake", r:"SET"},
      {c:"Fuel selector", r:"FULLEST TANK (LEFT or RIGHT)"},
      {c:"Avionics power", r:"OFF"},
      {c:"Bat 2 master", r:"ON – voltage CHECK (approx 24 V on essential bus)"},
      {c:"Bat 1 master", r:"ON"},
      {c:"Alt 1 / Alt 2 masters", r:"OFF until after start"},
      {c:"Annunciators / CAS messages", r:"CHECK"},
      {c:"Fuel quantity", r:"CHECK (gauge and visual)"},
      {c:"Flaps", r:"UP (check indicator)"},
      {c:"Strobe lights", r:"ON"},
    ]},
    {id:"start", name:"Engine Start", items:[
      {c:"Brakes", r:"HOLD"},
      {c:"Propeller area", r:"CLEAR"},
      {c:"Power lever", r:"FULL OPEN"},
      {c:"Mixture", r:"FULL RICH"},
      {c:"Fuel pump", r:"PRIME until fuel flow peaks (approx 2–3 sec), then BOOST"},
      {c:"Power lever", r:"1/4 OPEN (approx 1/4 in)"},
      {branch:"Engine hot or flooded?", opts:{
        "No":[],
        "Yes":[{c:"Fuel pump", r:"BOOST (do not prime)"},{c:"Mixture", r:"IDLE CUTOFF if flooded – advance to FULL RICH as engine fires"},{c:"Power lever", r:"1/2 OPEN if flooded, then idle as engine fires"}]
      }},
      {c:"Ignition switch", r:"START (release when engine fires)"},
      {c:"Power lever", r:"1000 RPM"},
      {c:"Oil pressure", r:"CHECK rising within 30 sec (30–60 psi green; 10 psi min idle)"},
      {c:"Alt 1 master", r:"ON"},
      {c:"Alt 2 master", r:"ON"},
      {c:"Avionics power", r:"ON"},
      {c:"Alternator output / voltage", r:"CHECK both alternators charging (approx 28 V)"},
      {c:"Engine instruments", r:"CHECK"},
      {c:"Fuel pump", r:"BOOST (leave on for taxi and takeoff)"},
    ]},
    {id:"taxi", name:"Before Taxi", items:[
      {c:"Flaps", r:"UP"},
      {c:"PFD / MFD", r:"SET (baro, nav, flight plan) – compare altimeters"},
      {c:"Fuel pump", r:"BOOST"},
      {c:"Brakes", r:"CHECK on initial roll"},
      {c:"Flight instruments", r:"CHECK during taxi (HSI turns correct, slip-skid, standby instruments agree)"},
      {c:"Autopilot / electric trim", r:"CHECK & disconnect"},
      {c:"Cabin heat / defrost", r:"AS REQUIRED"},
    ]},
    {id:"runup", name:"Before Takeoff", items:[
      {c:"Doors", r:"LATCHED"},
      {c:"Seats / belts / harnesses", r:"SECURE"},
      {c:"Fuel selector", r:"FULLEST TANK"},
      {c:"Fuel pump", r:"BOOST"},
      {c:"Flaps", r:"50%"},
      {c:"Trim", r:"TAKEOFF (elevator and rudder trim indicators in takeoff range)"},
      {c:"Flight controls", r:"FREE & CORRECT"},
      {c:"Mixture", r:"FULL RICH (lean per fuel-flow placard above approx 5,000 ft elevation)"},
      {c:"Power lever", r:"1700 RPM"},
      {c:"Alt 1 / Alt 2", r:"CHECK charging (ammeters positive, voltage approx 28 V)"},
      {c:"Pitot heat", r:"CHECK (current rise), then as required"},
      {c:"Magnetos", r:"CHECK L & R (150 RPM max drop, 75 RPM max difference)"},
      {c:"Engine instruments", r:"CHECK (oil pressure 30–60 psi, oil temp 100–240°F, CHT in green)"},
      {c:"Power lever", r:"IDLE check, then 1000 RPM"},
      {c:"Avionics / autopilot", r:"SET – autopilot OFF, flight director as required"},
      {c:"Transponder", r:"ALT"},
      {c:"Lights", r:"AS REQUIRED (landing light ON)"},
      {c:"Takeoff briefing", r:"COMPLETE (abort point; engine failure below approx 500 ft AGL – land ahead; above – CAPS available)"},
    ]},
    {id:"climb", name:"After Takeoff / Climb", items:[
      {c:"Flaps", r:"UP (above 80–85 KIAS, positive rate)"},
      {c:"Climb power", r:"FULL THROTTLE / 2700 RPM"},
      {c:"Mixture", r:"LEAN per fuel-flow placard with altitude"},
      {c:"Fuel pump", r:"BOOST"},
      {c:"Airspeed", r:"120 KIAS (cruise climb) / Vy 101 (G3) 108 (G5) for best rate"},
      {c:"Engine instruments", r:"CHECK (CHT below 420°F)"},
      {c:"Landing light", r:"OFF above pattern altitude (as required)"},
    ]},
    {id:"cruise", name:"Cruise", items:[
      {c:"Cruise power", r:"SET (55–85% per POH cruise table)"},
      {c:"Mixture", r:"LEAN per POH cruise table / lean assist"},
      {c:"Fuel pump", r:"OFF (BOOST when switching tanks or if fuel flow fluctuates)"},
      {c:"Fuel selector", r:"SWITCH TANKS to keep within 10 gal imbalance – note time"},
      {c:"Fuel quantity / totaliser", r:"CHECK against plan"},
      {c:"Engine instruments", r:"CHECK (oil temp 240°F max, CHT in green)"},
      {c:"Electrical", r:"CHECK (Alt 1 / Alt 2 ammeters, essential bus voltage)"},
      {c:"Altimeter / heading", r:"CHECK"},
    ]},
    {id:"desc", name:"Descent", items:[
      {c:"Altimeter", r:"SET"},
      {c:"Fuel selector", r:"FULLEST TANK"},
      {c:"Fuel pump", r:"BOOST"},
      {c:"Mixture", r:"ENRICH as required"},
      {c:"Power", r:"REDUCE gradually (keep CHT in green)"},
      {c:"Approach briefing", r:"COMPLETE"},
      {c:"Seat belts / harnesses", r:"SECURE"},
    ]},
    {id:"land", name:"Before Landing", items:[
      {c:"Fuel selector", r:"FULLEST TANK"},
      {c:"Fuel pump", r:"BOOST"},
      {c:"Mixture", r:"FULL RICH (or as required for field elevation)"},
      {c:"Flaps", r:"50% below 119 (G3) / 150 (G5) KIAS; 100% below 104 (G3) / 110 (G5) KIAS"},
      {c:"Autopilot", r:"OFF (no later than minimums / short final)"},
      {c:"Airspeed", r:"flaps 100%: 77–80 KIAS (G3) / 80–85 KIAS (G5); flaps 50%: 85–90 KIAS"},
      {c:"Landing light", r:"ON"},
      {c:"Transponder", r:"ALT"},
    ]},
    {id:"after", name:"After Landing", items:[
      {c:"Flaps", r:"UP"},
      {c:"Fuel pump", r:"OFF"},
      {c:"Pitot heat", r:"OFF"},
      {c:"Landing light / strobes", r:"AS REQUIRED"},
      {c:"Transponder", r:"STBY / as required"},
    ]},
    {id:"shut", name:"Shutdown", items:[
      {c:"Parking brake", r:"SET"},
      {c:"Fuel pump", r:"OFF"},
      {c:"Avionics power", r:"OFF"},
      {c:"Power lever", r:"IDLE"},
      {c:"Mixture", r:"IDLE CUTOFF"},
      {c:"Ignition switch", r:"OFF (after propeller stops)"},
      {c:"Lights", r:"OFF"},
      {c:"Alt 1 / Alt 2 / Bat 1 / Bat 2 masters", r:"OFF"},
      {c:"CAPS handle safety pin", r:"INSTALLED"},
      {c:"Chocks / tiedowns / pitot cover", r:"AS REQUIRED"},
    ]},
  ],
  emergency: [
    {id:"eng-fail-roll", name:"Engine Failure During Takeoff Roll", items:[
      {c:"Power lever", r:"IDLE", mem:true},
      {c:"Brakes", r:"AS REQUIRED – stop straight ahead", mem:true},
      {c:"Mixture", r:"IDLE CUTOFF"},
      {c:"Fuel selector", r:"OFF"},
      {c:"Ignition switch", r:"OFF"},
      {c:"Bat 1 / Bat 2 masters", r:"OFF"},
    ]},
    {id:"eng-fail-to", name:"Engine Failure Immediately After Takeoff", cond:"Airborne at low altitude", land:"LAND IMMEDIATELY", items:[
      {c:"Airspeed", r:"88 KIAS (G3) / 92 KIAS (G5) best glide", mem:true},
      {branch:"Altitude above approx 500 ft AGL?", opts:{
        "No – land straight ahead":[
          {c:"Landing site", r:"STRAIGHT AHEAD with small heading changes only"},
          {c:"Flaps", r:"100% when landing assured"},
          {c:"Mixture", r:"IDLE CUTOFF"},
          {c:"Fuel selector", r:"OFF"},
          {c:"Ignition switch", r:"OFF"},
          {c:"Bat 1 / Bat 2 masters", r:"OFF (after flaps set)"},
          {note:"Do not attempt a turn back to the runway.", kind:"warn"},
        ],
        "Yes – CAPS available":[
          {note:"If a safe landing straight ahead is not assured, deploy CAPS now – do not wait for a better position. See CAPS Deployment.", kind:"warn"},
          {c:"CAPS handle", r:"PULL (if landing ahead not assured)"},
        ]
      }},
    ]},
    {id:"eng-fail-flt", name:"Engine Failure in Flight", cond:"Loss of power with altitude available", land:"LAND AS SOON AS POSSIBLE", items:[
      {c:"Airspeed", r:"88 KIAS (G3) / 92 KIAS (G5) best glide", mem:true},
      {c:"Fuel selector", r:"SWITCH TANKS", mem:true},
      {c:"Fuel pump", r:"BOOST", mem:true},
      {c:"Mixture", r:"FULL RICH, then lean as required", mem:true},
      {c:"Alternate induction air", r:"ON", mem:true},
      {c:"Ignition switch", r:"BOTH – check", mem:true},
      {branch:"Restart attempt practicable?", opts:{
        "Yes – restart":[
          {c:"Power lever", r:"1/2 OPEN"},
          {c:"Ignition switch", r:"START if propeller has stopped"},
          {branch:"Engine restarted?", opts:{
            "Yes":[{c:"Power", r:"AS REQUIRED"},{c:"Fuel pump", r:"BOOST"},{defer:"Engine restarted after in-flight failure – land as soon as possible, suspect fuel system."}],
            "No":[{note:"Continue below: forced landing or CAPS.", kind:"warn"}]
          }},
        ],
        "No":[]
      }},
      {branch:"Safe forced-landing site assured within glide?", opts:{
        "Yes – forced landing":[
          {c:"Seats / belts / harnesses", r:"SECURE"},
          {c:"Flaps", r:"100% when landing assured"},
          {c:"Airspeed", r:"80–85 KIAS on final"},
          {c:"Mixture", r:"IDLE CUTOFF"},
          {c:"Fuel selector", r:"OFF"},
          {c:"Ignition switch", r:"OFF"},
          {c:"Bat 1 / Bat 2 masters", r:"OFF (after flaps set)"},
          {c:"Touchdown", r:"MINIMUM SPEED, wings level"},
        ],
        "No – deploy CAPS":[
          {note:"CAPS is the primary response to engine failure over terrain where a safe forced landing is not assured. Deploy above the 2,000 ft AGL decision altitude where possible – see CAPS Deployment.", kind:"warn"},
          {c:"CAPS handle", r:"PULL"},
        ]
      }},
    ]},
    {id:"caps", name:"CAPS Deployment", cond:"Loss of control, mid-air collision, structural failure, pilot incapacitation, or engine failure over terrain where a safe forced landing is not assured", items:[
      {c:"Airspeed", r:"MINIMISE (below Vpd 133 KIAS G3 / 140 KIAS G5 if possible)", mem:true},
      {c:"CAPS handle", r:"PULL – remove cover, pull straight down with both hands, full force", mem:true},
      {c:"Mixture", r:"IDLE CUTOFF", mem:true},
      {c:"Fuel selector", r:"OFF", mem:true},
      {c:"Bat 1 / Bat 2 / Alt 1 / Alt 2 masters", r:"OFF", mem:true},
      {c:"Seat belts / harnesses", r:"TIGHT", mem:true},
      {c:"Brace", r:"EMERGENCY LANDING BODY POSITION (hands on legs or arms crossed, chin down)", mem:true},
      {note:"CAPS is the primary response to loss of control, mid-air collision, structural failure, pilot incapacitation and engine failure over terrain where a safe forced landing is not assured. Deploy without hesitation in these cases.", kind:"warn"},
      {note:"Altitude: minimum demonstrated deployment 400 ft AGL in level flight; recovery from loss of control demonstrated at 920 ft AGL. Recommended decision altitude 2,000 ft AGL. Below these altitudes deployment may still be the best option – pull anyway.", kind:"caution"},
      {note:"Do not deploy for engine failure at altitude when a safe forced landing site is assured – but do not delay below 2,000 ft AGL if it is not. Expect a touchdown about 1,700 ft/min descent; some structural damage is normal.", kind:"caution"},
      {c:"After touchdown – doors", r:"UNLATCH / OPEN"},
      {c:"Aircraft", r:"EVACUATE once stopped (beware of canopy dragging in wind)"},
      {c:"ELT", r:"ON (if not automatic)"},
    ]},
    {id:"spin", name:"Inadvertent Spin / Loss of Control", cond:"Spin entry or departure from controlled flight", items:[
      {c:"CAPS handle", r:"PULL", mem:true},
      {note:"CAPS is the only approved and demonstrated spin recovery method for the SR22. Do not delay to attempt conventional recovery – altitude is being lost at approx 900 ft/turn.", kind:"warn"},
      {c:"Power lever", r:"IDLE"},
      {c:"Flight controls", r:"NEUTRAL"},
      {c:"Complete", r:"CAPS Deployment procedure"},
    ]},
    {id:"eng-fire-flt", name:"Engine Fire in Flight", land:"LAND IMMEDIATELY", items:[
      {c:"Mixture", r:"IDLE CUTOFF", mem:true},
      {c:"Fuel selector", r:"OFF", mem:true},
      {c:"Fuel pump", r:"OFF", mem:true},
      {c:"Power lever", r:"IDLE", mem:true},
      {c:"Cabin heat / defrost", r:"OFF"},
      {c:"Airspeed", r:"INCREASE (approx 100 KIAS or more) to help extinguish fire"},
      {c:"Ignition switch", r:"OFF"},
      {branch:"Fire out?", opts:{
        "Yes":[{c:"Forced landing", r:"EXECUTE – do not attempt restart (Engine Failure in Flight, forced landing section)"}],
        "No":[{c:"CAPS handle", r:"PULL if fire persists and altitude permits (CAPS Deployment)"},{c:"Bat 1 / Bat 2 masters", r:"OFF after flaps set"}]
      }},
    ]},
    {id:"eng-fire-start", name:"Engine Fire During Start", items:[
      {c:"Mixture", r:"IDLE CUTOFF", mem:true},
      {c:"Fuel pump", r:"OFF", mem:true},
      {c:"Fuel selector", r:"OFF", mem:true},
      {c:"Power lever", r:"FULL OPEN", mem:true},
      {c:"Ignition switch", r:"CONTINUE CRANKING to draw fire into engine", mem:true},
      {branch:"Fire out?", opts:{
        "Yes":[{c:"Ignition switch", r:"OFF"},{c:"Engine", r:"INSPECT before any further start attempt"}],
        "No":[
          {c:"Ignition switch", r:"OFF"},
          {c:"Bat 1 / Bat 2 masters", r:"OFF"},
          {c:"Fire extinguisher", r:"OBTAIN / USE"},
          {c:"Aircraft", r:"EVACUATE"},
        ]
      }},
    ]},
    {id:"cabin-fire", name:"Cabin / Electrical Fire or Smoke", land:"LAND AS SOON AS POSSIBLE", items:[
      {c:"Bat 1 / Bat 2 / Alt 1 / Alt 2 masters", r:"OFF", mem:true},
      {c:"Cabin heat / vents", r:"OFF / CLOSED", mem:true},
      {c:"Fire extinguisher", r:"ACTIVATE (then ventilate cabin)"},
      {branch:"Fire out and electrical power required?", opts:{
        "Yes":[
          {c:"Circuit breakers", r:"CHECK – do not reset faulted"},
          {c:"Bat 2 master", r:"ON (essential bus – PFD, standby power)"},
          {c:"Bat 1 / Alt 1 / Alt 2 masters", r:"ON one at a time, check for smoke"},
          {c:"Avionics power", r:"ON if required"},
          {defer:"Electrical fire – suspect circuits isolated, affected systems unavailable."},
        ],
        "No":[
          {note:"Flaps are electric: without main bus power plan a flaps-up landing (approach 90–95 KIAS, longer runway). Standby instruments and glide-range planning only.", kind:"caution"},
          {defer:"Electrical power off – flaps-up landing, no landing light, standby instruments."},
        ]
      }},
    ]},
    {id:"emer-desc", name:"Emergency Descent", items:[
      {c:"Power lever", r:"IDLE", mem:true},
      {c:"Mixture", r:"AS REQUIRED", mem:true},
      {c:"Flaps", r:"UP", mem:true},
      {c:"Airspeed", r:"178 KIAS G3 / 177 KIAS G5 (smooth air); 133 / 140 KIAS (turbulence)", mem:true},
    ]},
  ],
  abnormal: [
    {id:"alt-fail", name:"Alternator Failure (ALT 1 / ALT 2 caution)", items:[
      {c:"Affected alternator master", r:"OFF, then ON (reset once)"},
      {c:"Ammeter / voltage", r:"CHECK"},
      {branch:"Which alternator failed?", opts:{
        "Alt 1 (main bus)":[
          {c:"Alt 1 master", r:"OFF"},
          {c:"Non-essential load", r:"REDUCE – Alt 2 alone is small (approx 20 A on G3; larger on G5)"},
          {c:"Essential bus voltage", r:"MONITOR"},
          {defer:"Alt 1 failed – reduced electrical load on Alt 2, land as soon as practical."},
        ],
        "Alt 2 (essential bus)":[
          {c:"Alt 2 master", r:"OFF"},
          {c:"Essential bus", r:"CONFIRM fed from main bus / Alt 1"},
          {defer:"Alt 2 failed – essential bus on Alt 1 only, land as soon as practical."},
        ],
        "Both":[
          {c:"Alt 1 / Alt 2 masters", r:"OFF"},
          {c:"Non-essential load", r:"SHED (landing light, air conditioning, non-essential avionics)"},
          {c:"Battery endurance", r:"PLAN approx 30 min at reduced load"},
          {defer:"Both alternators failed – battery only, land as soon as possible, flaps before battery depleted."},
        ]
      }},
    ]},
    {id:"oil-press", name:"Low Oil Pressure", cond:"OIL PRESS warning or indication below 30 psi", items:[
      {c:"Oil pressure / oil temperature", r:"CHECK and cross-check"},
      {branch:"Oil temperature rising or pressure below 10 psi?", opts:{
        "Yes – genuine":[
          {c:"Power", r:"REDUCE to minimum required"},
          {c:"Airport", r:"DIVERT to nearest suitable – stay within glide of a landing area"},
          {c:"CAPS", r:"PLAN deployment if engine fails over unsuitable terrain"},
          {defer:"Low oil pressure – land as soon as possible, expect possible engine failure."},
        ],
        "No – gauge suspect":[{c:"Flight", r:"CONTINUE, monitor oil temperature and pressure"},{defer:"Oil pressure indication suspect – maintenance check required."}]
      }},
    ]},
    {id:"oil-temp", name:"High Oil / Cylinder Head Temperature", items:[
      {c:"Mixture", r:"ENRICH"},
      {c:"Airspeed", r:"INCREASE (lower pitch attitude)"},
      {c:"Power", r:"REDUCE"},
      {branch:"Temperature returning to green?", opts:{
        "Yes":[{c:"Flight", r:"CONTINUE, monitor"}],
        "No":[{c:"Oil pressure", r:"MONITOR for drop"},{defer:"High engine temperature – land as soon as practical, cooling / baffling check required."}]
      }},
    ]},
    {id:"rough-fuel", name:"Rough Running / Fuel Flow Fluctuation", items:[
      {c:"Fuel pump", r:"BOOST"},
      {c:"Fuel selector", r:"SWITCH TANKS"},
      {c:"Mixture", r:"ADJUST for smooth running"},
      {c:"Alternate induction air", r:"ON"},
      {c:"Magnetos", r:"CHECK L / R individually, then BOTH"},
      {c:"Engine instruments", r:"CHECK (CHT, EGT, fuel flow)"},
      {branch:"Engine running smoothly?", opts:{
        "Yes":[{defer:"Rough running cleared – leave fuel pump BOOST; report to maintenance."}],
        "No":[{c:"Power", r:"REDUCE to smoothest setting"},{c:"CAPS", r:"PLAN deployment if engine fails over unsuitable terrain"},{defer:"Engine rough – land as soon as practical at nearest suitable airport."}]
      }},
    ]},
    {id:"flap-fail", name:"Flap Failure", items:[
      {c:"Flap switch", r:"CYCLE once to the desired position"},
      {c:"Flap circuit breaker", r:"CHECK / RESET once"},
      {branch:"Flaps operable?", opts:{
        "Yes":[{c:"Flap setting", r:"AS REQUIRED"}],
        "No":[{c:"Landing", r:"AT CURRENT FLAP SETTING – flaps up approach 90–95 KIAS, longer runway"},{defer:"Flaps inoperative – flaps-up or partial-flap landing, increased landing distance."}]
      }},
    ]},
    {id:"door-open", name:"Door Open in Flight", items:[
      {c:"Aircraft", r:"CONTROLLABLE – fly the airplane"},
      {c:"Airspeed", r:"REDUCE to approx 100–110 KIAS"},
      {c:"Belts / loose items", r:"SECURE"},
      {note:"Do not attempt to close the door while flying the airplane. Expect increased noise; handling is essentially normal.", kind:"caution"},
      {defer:"Door unlatched – return and land as soon as practical, normal approach speed."},
    ]},
    {id:"pfd-fail", name:"PFD / AHRS / Air Data Failure", cond:"Red X on attitude, airspeed, altitude or heading", items:[
      {c:"Standby instruments", r:"CROSS-CHECK and FLY (standby attitude, airspeed, altimeter, compass)"},
      {c:"Display reversion", r:"SELECT (MFD shows PFD data) if PFD screen failed"},
      {c:"AHRS / ADC source", r:"SWAP to the second unit if fitted (Perspective sensor key)"},
      {c:"Autopilot", r:"OFF if misbehaving (may disconnect automatically)"},
      {c:"Pitot heat", r:"ON (if airspeed suspect)"},
      {c:"IMC", r:"EXIT / AVOID"},
      {defer:"Flight display / sensor failure – partial panel; prefer VMC approach."},
    ]},
    {id:"icing", name:"Inadvertent Icing", items:[
      {c:"Pitot heat", r:"ON"},
      {c:"Ice protection (TKS)", r:"MAX / HIGH if fitted"},
      {c:"Exit icing conditions", r:"TURN / CLIMB / DESCEND"},
      {c:"Alternate induction air", r:"ON (if induction icing suspected)"},
      {c:"Power", r:"INCREASE to maintain airspeed"},
      {c:"Autopilot", r:"OFF (monitor control forces)"},
      {c:"Landing", r:"FLAPS 50% maximum, approach speed +10–15 KIAS, longer runway"},
      {defer:"Residual airframe ice – flaps 50% landing, increased approach speed and landing distance."},
    ]},
    {id:"static-block", name:"Static Source Blocked", cond:"Altimeter / VSI frozen or airspeed erratic", items:[
      {c:"Pitot heat", r:"ON"},
      {c:"Alternate static source", r:"ON (valve under instrument panel)"},
      {note:"With alternate static selected, expect small airspeed and altimeter errors; cabin vents and heater affect the readings.", kind:"caution"},
      {c:"Standby instruments / GPS altitude", r:"CROSS-CHECK"},
      {defer:"Alternate static in use – allow for airspeed and altimeter error on approach."},
    ]},
  ]
});
