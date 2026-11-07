/* Piper PA-46R-350T Matrix – checklist data.
   Prototype content. Verify against the operator's approved checklist and the POH/AFM. */
window.AIRCRAFT = window.AIRCRAFT || [];
window.AIRCRAFT.push({
  id: "pa46r-350t",
  maker: "Piper",
  model: "PA-46R-350T Matrix",
  short: "MATRIX",
  category: "High-performance single",
  engine: "Lycoming TIO-540-AE2A, turbocharged and intercooled, 350 hp",
  seats: "6",
  basis: "Typical PA-46R-350T Matrix (2008+, TIO-540-AE2A, 4,340 lb, unpressurised Mirage airframe, hydraulic gear) POH procedures. Written for either the Avidyne Entegra (2008–10, S-TEC 55X) or Garmin G1000 (2010+, GFC 700) panel; ice protection and built-in oxygen where fitted.",
  vspeeds: [
    {k:"Vr", v:"70–75 KIAS (liftoff)"},
    {k:"Vx", v:"85 KIAS"},
    {k:"Vy", v:"110 KIAS"},
    {k:"Best glide", v:"approx 95 KIAS (gear & flaps up, prop low RPM)"},
    {k:"Vfe", v:"165 KIAS (10°) / 130 KIAS (20°) / 116 KIAS (36° full)"},
    {k:"Vlo", v:"165 KIAS extend / 130 KIAS retract"},
    {k:"Vle", v:"165 KIAS"},
    {k:"Va", v:"133 KIAS (4,340 lb)"},
    {k:"Vno", v:"170 KIAS"},
    {k:"Vne", v:"198 KIAS"},
    {k:"Vs / Vso", v:"approx 69 / 59 KIAS (max weight)"},
    {k:"Vref", v:"80–85 KIAS final (full flaps); approx 78 KIAS short field"},
    {k:"Emergency descent", v:"165 KIAS gear down / 133 KIAS in turbulence"}
  ],

  normal: [
    {id:"pre", name:"Before Start", items:[
      {c:"Preflight inspection", r:"COMPLETE (fuel sumps, deice boots and static wicks, tyres, cowl and turbo area, oxygen bottle pressure)"},
      {c:"Weight & balance / takeoff data", r:"COMPUTED (4,340 lb max takeoff)"},
      {c:"Passenger briefing", r:"COMPLETE (belts, airstair door, emergency exit, oxygen masks / cannulas, no smoking)"},
      {c:"Seats, belts, shoulder harnesses", r:"ADJUST & LOCK"},
      {c:"Cabin door (upper & lower) / baggage doors", r:"CLOSED & LATCHED (DOOR AJAR annunciator out once power is on)"},
      {c:"Parking brake", r:"SET"},
      {c:"Landing gear selector", r:"DOWN"},
      {c:"Emergency gear extension lever", r:"NORMAL / STOWED (floor, between front seats)"},
      {c:"Throttle / propeller / mixture", r:"CLOSED / FULL FORWARD / IDLE CUTOFF"},
      {c:"Fuel selector", r:"FULLEST TANK (LEFT or RIGHT – OFF is detented, there is no BOTH)"},
      {c:"Avionics master", r:"OFF"},
      {c:"Battery master", r:"ON – voltage CHECK (approx 24 V)"},
      {c:"Fuel quantity", r:"CHECK both tanks (120 gal usable total)"},
      {c:"Annunciators / PFD alerts", r:"TEST / REVIEW (gear lights three green)"},
      {c:"Standby instruments / backup battery", r:"TEST (standby attitude indicator erect, backup battery test passes)"},
      {c:"Oxygen", r:"CHECK pressure (approx 1,850 psi full) and duration for planned altitude; masks / cannulas available"},
      {c:"Alternate static source", r:"OFF (normal)"},
      {c:"Beacon", r:"ON"},
    ]},
    {id:"start", name:"Engine Start", items:[
      {c:"Propeller area", r:"CLEAR"},
      {c:"Throttle", r:"APPROX 1/2 in OPEN"},
      {c:"Propeller", r:"FULL FORWARD (high RPM)"},
      {c:"Mixture", r:"FULL RICH"},
      {c:"Fuel pump", r:"HI until fuel flow indicates (approx 3–5 sec prime), then OFF"},
      {branch:"Engine hot or flooded?", opts:{
        "No":[],
        "Yes":[{c:"Mixture", r:"IDLE CUTOFF"},{c:"Throttle", r:"FULL OPEN"},{c:"Mixture", r:"ADVANCE to FULL RICH as engine fires, throttle to idle"}]
      }},
      {c:"Starter", r:"ENGAGE (release when engine fires; 30 sec max, then cool)"},
      {c:"Throttle", r:"1,000 RPM"},
      {c:"Oil pressure", r:"25 psi within 30 sec (normal 55–95 psi)"},
      {c:"Alternator 1 & 2 switches", r:"ON – ALT 1 / ALT 2 INOP annunciators out, voltage approx 28 V"},
      {c:"Fuel pump", r:"OFF (LO if fuel flow fluctuates)"},
      {c:"Avionics master", r:"ON"},
      {c:"PFD / MFD", r:"CHECK (AHRS aligned, no red X's, engine page displayed, database current)"},
      {c:"Engine instruments", r:"CHECK (oil pressure, oil temp rising, fuel flow, TIT, CHT)"},
    ]},
    {id:"taxi", name:"Before Taxi", items:[
      {c:"Brakes", r:"CHECK on initial roll"},
      {c:"PFD / MFD / standby instruments", r:"CHECK & SET (altimeters agree, heading, attitude erect, HSI turns correctly in turns)"},
      {c:"Flight plan / avionics", r:"LOADED & SET"},
      {c:"Autopilot / electric trim", r:"PREFLIGHT TEST – disconnect checks, trim both directions – OFF"},
      {c:"Pitot heat / stall warning heat", r:"ON momentarily – CHECK (annunciator out, load rise), then AS REQUIRED"},
      {c:"Propeller deice", r:"ON – PROP HEAT indication, then AS REQUIRED (if fitted)"},
      {c:"Windshield heat", r:"ON – CHECK, then AS REQUIRED (if fitted)"},
      {c:"Surface deice (boots)", r:"SINGLE CYCLE – boots inflate / deflate, pressure indication (if fitted)"},
      {c:"Elevator / rudder trim", r:"SET for takeoff"},
      {c:"Fuel selector", r:"CHECK fullest tank (LEFT or RIGHT)"},
      {c:"Flaps", r:"SET for takeoff (0° normal; 10° short field) – indicator CHECK"},
    ]},
    {id:"runup", name:"Before Takeoff", items:[
      {c:"Parking brake", r:"SET"},
      {c:"Flight controls", r:"FREE & CORRECT"},
      {c:"Mixture", r:"FULL RICH"},
      {c:"Throttle", r:"2,000 RPM"},
      {c:"Magnetos", r:"CHECK L & R (175 RPM max drop, 50 RPM max difference)"},
      {c:"Propeller", r:"CYCLE 2–3 times (RPM drops, then returns)"},
      {c:"Engine instruments", r:"CHECK (oil pressure 55–95 psi, oil temp in green, fuel flow steady, TIT / CHT)"},
      {c:"Alternators", r:"CHECK both charging, loads shared, voltage approx 28 V"},
      {c:"Throttle", r:"IDLE check, then 1,000 RPM"},
      {c:"Fuel selector", r:"FULLEST TANK (feel for detent)"},
      {c:"Fuel pump", r:"LO"},
      {c:"Oxygen", r:"SET for climb (ON above 12,500 ft; masks / cannulas connected if cruising high)"},
      {c:"Propeller", r:"FULL FORWARD"},
      {c:"Flaps", r:"SET & INDICATING (0° or 10°)"},
      {c:"Trim", r:"SET takeoff range"},
      {c:"Landing gear selector", r:"DOWN – three green"},
      {c:"Ice protection / pitot heat", r:"AS REQUIRED"},
      {c:"Lights", r:"AS REQUIRED"},
      {c:"Transponder", r:"ALT"},
      {c:"Doors & windows", r:"LATCHED (DOOR AJAR out)"},
      {c:"PFD / MFD", r:"NO ALERTS; standby instruments CHECK"},
      {c:"Takeoff briefing", r:"COMPLETE (abort point; throttle slowly to 42 in Hg / 2,500 RPM, fuel flow approx 36–38 GPH; gear up with positive rate and no usable runway, below 130 KIAS)"},
    ]},
    {id:"climb", name:"After Takeoff / Climb", items:[
      {c:"Takeoff power", r:"FULL THROTTLE applied slowly – 42 in Hg max, 2,500 RPM, fuel flow approx 36–38 GPH"},
      {c:"Landing gear", r:"UP (positive rate, no usable runway, below 130 KIAS) – lights out, HYD PUMP light out"},
      {c:"Flaps", r:"UP (above approx 85 KIAS, obstacles cleared)"},
      {c:"Climb power", r:"REDUCE SLOWLY to approx 35 in Hg / 2,500 RPM (cruise climb) above 1,000 ft AGL"},
      {c:"Mixture", r:"FULL RICH / climb fuel flow per POH schedule (TIT below 1,650°F)"},
      {c:"Fuel pump", r:"OFF above 1,000 ft AGL (LO if fuel flow fluctuates)"},
      {c:"Airspeed", r:"110 KIAS (Vy) / 120–130 KIAS cruise climb for cooling"},
      {c:"Oxygen", r:"ON passing 12,500 ft – flow checked at each station (masks above 18,000 ft)"},
      {c:"Engine instruments", r:"CHECK (CHT, TIT, oil temp 245°F max, oil pressure)"},
      {c:"Ice protection", r:"AS REQUIRED"},
      {c:"Landing / taxi lights", r:"OFF"},
    ]},
    {id:"cruise", name:"Cruise", items:[
      {c:"Cruise power", r:"SET (approx 2,400 RPM / 30–32 in Hg, 75% max recommended) – change power slowly"},
      {c:"Mixture", r:"LEAN SLOWLY per POH cruise table – TIT 1,650°F max recommended cruise (1,750°F red line)"},
      {c:"Fuel selector", r:"ALTERNATE LEFT / RIGHT to keep tanks balanced – note time"},
      {c:"Fuel pump", r:"LO if fuel flow fluctuates (vapour suppression at altitude / hot fuel), otherwise OFF"},
      {c:"Fuel quantity / flow", r:"CHECK against plan (MFD fuel totaliser cross-checked with gauges)"},
      {c:"Oxygen", r:"CHECK flow at each station, pressure and remaining duration; pulse oximeter as available"},
      {c:"Engine instruments", r:"CHECK (oil 55–95 psi / 245°F max, CHT, TIT)"},
      {c:"Ice protection", r:"AS REQUIRED"},
      {c:"PFD / MFD", r:"CHECK (no alerts, altimeter set, heading / GPS agree)"},
    ]},
    {id:"desc", name:"Descent", items:[
      {c:"Altimeters", r:"SET (PFD and standby)"},
      {c:"Power", r:"REDUCE SLOWLY (approx 1 in Hg per minute) – avoid rapid cooling"},
      {c:"Mixture", r:"ENRICH progressively (TIT / CHT monitored)"},
      {c:"Fuel selector", r:"FULLEST TANK (LEFT or RIGHT)"},
      {c:"Oxygen", r:"OFF below 12,500 ft (after cannulas / masks removed)"},
      {c:"Windshield heat / ice protection", r:"AS REQUIRED"},
      {c:"Airspeed", r:"BELOW 170 KIAS (Vno); plan below 165 KIAS before gear extension"},
      {c:"Approach briefing", r:"COMPLETE (Vref 80–85, flap setting, go-around power applied slowly)"},
      {c:"Seat belts / harnesses", r:"SECURE"},
    ]},
    {id:"land", name:"Before Landing", items:[
      {c:"Fuel selector", r:"FULLEST TANK (LEFT or RIGHT)"},
      {c:"Fuel pump", r:"LO"},
      {c:"Mixture", r:"FULL RICH (as required at high field elevation)"},
      {c:"Airspeed", r:"BELOW 165 KIAS"},
      {c:"Landing gear", r:"DOWN – three green, HYD PUMP light out"},
      {c:"Flaps", r:"10° below 165 KIAS; 20° below 130 KIAS; 36° on final below 116 KIAS"},
      {c:"Propeller", r:"FULL FORWARD (on final)"},
      {c:"Autopilot / yaw damper", r:"OFF"},
      {c:"Airspeed", r:"80–85 KIAS final (full flaps; approx 78 KIAS short field; add 10–15 KIAS with residual ice)"},
      {c:"Landing light", r:"ON"},
      {c:"Landing gear", r:"THREE GREEN – CONFIRMED on final"},
    ]},
    {id:"after", name:"After Landing", items:[
      {c:"Flaps", r:"UP"},
      {c:"Fuel pump", r:"OFF"},
      {c:"Ice protection", r:"OFF (pitot heat, prop deice, windshield heat, boots)"},
      {c:"Landing light / strobes", r:"AS REQUIRED"},
      {c:"Transponder", r:"STBY / as required (GND on G1000)"},
      {c:"Trim", r:"SET takeoff"},
    ]},
    {id:"shut", name:"Shutdown", items:[
      {c:"Parking brake", r:"SET"},
      {c:"Throttle", r:"1,000 RPM – turbocharger cool-down 3–5 min (TIT stabilised / falling)"},
      {c:"Avionics master", r:"OFF"},
      {c:"Electrical equipment / lights", r:"OFF"},
      {c:"Oxygen", r:"OFF"},
      {c:"Mixture", r:"IDLE CUTOFF"},
      {c:"Magnetos", r:"OFF (after propeller stops)"},
      {c:"Alternator 1 & 2 / battery master", r:"OFF"},
      {c:"Control lock", r:"INSTALL"},
      {c:"Chocks / tiedowns / covers", r:"AS REQUIRED"},
    ]},
  ],
  emergency: [
    {id:"eng-fail-roll", name:"Engine Failure During Takeoff Roll", items:[
      {c:"Throttle", r:"CLOSED", mem:true},
      {c:"Brakes", r:"AS REQUIRED – stop straight ahead", mem:true},
      {c:"Mixture", r:"IDLE CUTOFF"},
      {c:"Fuel selector", r:"OFF"},
      {c:"Magnetos", r:"OFF"},
      {c:"Battery master / alternators", r:"OFF"},
    ]},
    {id:"eng-fail-to", name:"Engine Failure After Takeoff", cond:"Airborne at low altitude", land:"LAND IMMEDIATELY", items:[
      {c:"Airspeed", r:"95 KIAS (best glide, gear & flaps up); 80–85 KIAS with gear / flaps down", mem:true},
      {c:"Fuel pump", r:"HI (if fuel flow low); fuel selector SWITCH TANKS if time permits", mem:true},
      {branch:"Runway remaining to land on?", opts:{
        "Yes":[
          {c:"Landing gear", r:"DOWN (if retracted)"},
          {c:"Flaps", r:"AS REQUIRED"},
          {c:"Land", r:"STRAIGHT AHEAD"},
        ],
        "No – land ahead off-field":[
          {c:"Landing gear", r:"DOWN on firm surface / UP on rough terrain or water"},
          {c:"Flaps", r:"DOWN (36°) when landing assured"},
          {c:"Fuel selector", r:"OFF"},
          {c:"Mixture", r:"IDLE CUTOFF"},
          {c:"Magnetos", r:"OFF"},
          {c:"Battery master", r:"OFF (after gear position set)"},
          {note:"Land straight ahead with only small changes of direction. Do not attempt a turn back.", kind:"warn"},
        ]
      }},
    ]},
    {id:"eng-fail-flt", name:"Engine Failure in Flight", cond:"Loss of power with altitude available", land:"LAND AS SOON AS POSSIBLE", items:[
      {c:"Airspeed", r:"95 KIAS (best glide, gear & flaps up)", mem:true},
      {c:"Fuel selector", r:"SWITCH TANKS (feel for detent)", mem:true},
      {c:"Fuel pump", r:"LO; HI if fuel flow reads zero (lean if engine floods)", mem:true},
      {c:"Mixture", r:"FULL RICH, then lean as required", mem:true},
      {c:"Propeller", r:"FULL AFT (low RPM) to extend glide", mem:true},
      {c:"Oxygen", r:"ON / CONFIRM if above 12,500 ft"},
      {branch:"Restart attempt practicable?", opts:{
        "Yes – restart":[
          {c:"Magnetos", r:"BOTH – check"},
          {c:"Alternate induction air", r:"CHECK (automatic door; ALT AIR indication if induction icing)"},
          {c:"Throttle", r:"1/4 OPEN"},
          {c:"Starter", r:"ENGAGE if propeller has stopped"},
          {branch:"Engine restarted?", opts:{
            "Yes":[{c:"Power", r:"AS REQUIRED – apply slowly"},{c:"Fuel pump", r:"LO if required"},{defer:"Engine restarted after in-flight failure – land as soon as possible, suspect fuel or induction system."}],
            "No":[{note:"Continue with forced landing.", kind:"warn"}]
          }},
        ],
        "No – forced landing":[]
      }},
      {note:"Forced landing without power:", kind:"warn"},
      {c:"ATC / ELT", r:"MAYDAY, squawk 7700 (MFD nearest airport)"},
      {c:"Seats / belts / harnesses", r:"SECURE; passengers briefed"},
      {c:"Landing gear", r:"DOWN on firm surface (below 165 KIAS; emergency extension if hydraulic pump fails) / UP on rough terrain or water"},
      {c:"Flaps", r:"DOWN when landing assured"},
      {c:"Airspeed", r:"80–85 KIAS on final"},
      {c:"Fuel selector", r:"OFF"},
      {c:"Mixture", r:"IDLE CUTOFF"},
      {c:"Magnetos", r:"OFF"},
      {c:"Battery master / alternators", r:"OFF (after gear and flaps set)"},
      {c:"Cabin door", r:"UNLATCH before touchdown"},
    ]},
    {id:"eng-fire-flt", name:"Engine Fire in Flight", land:"LAND IMMEDIATELY", items:[
      {c:"Fuel selector", r:"OFF", mem:true},
      {c:"Mixture", r:"IDLE CUTOFF", mem:true},
      {c:"Fuel pump", r:"OFF", mem:true},
      {c:"Throttle", r:"CLOSED", mem:true},
      {c:"Cabin heat / defroster / vents", r:"OFF / CLOSED", mem:true},
      {c:"Oxygen", r:"OFF unless needed for smoke (oxygen feeds fire)"},
      {c:"Airspeed", r:"INCREASE (up to 165 KIAS) to help extinguish fire"},
      {c:"Landing gear", r:"DOWN while battery power remains (emergency extension if needed)"},
      {c:"Forced landing", r:"EXECUTE (do not attempt restart)"},
    ]},
    {id:"eng-fire-start", name:"Engine Fire During Start", items:[
      {c:"Starter", r:"CONTINUE CRANKING", mem:true},
      {branch:"Engine starts?", opts:{
        "Yes":[{c:"Throttle", r:"1,700 RPM for a few minutes"},{c:"Engine", r:"SHUT DOWN and inspect for damage"}],
        "No":[
          {c:"Mixture", r:"IDLE CUTOFF"},
          {c:"Throttle", r:"FULL OPEN"},
          {c:"Fuel pump", r:"OFF"},
          {c:"Fuel selector", r:"OFF"},
          {c:"Starter", r:"CONTINUE CRANKING to draw fire into engine"},
          {c:"Magnetos", r:"OFF"},
          {c:"Battery master / alternators", r:"OFF"},
          {c:"Fire extinguisher", r:"OBTAIN / USE"},
          {c:"Aircraft", r:"EVACUATE"},
        ]
      }},
    ]},
    {id:"cabin-fire", name:"Electrical / Cabin Fire and Smoke", land:"LAND AS SOON AS POSSIBLE", items:[
      {c:"Battery master / alternator 1 & 2", r:"OFF", mem:true},
      {c:"Avionics master", r:"OFF", mem:true},
      {c:"Cabin heat / defroster / vents", r:"OFF / CLOSED"},
      {c:"Fire extinguisher", r:"ACTIVATE (then ventilate cabin)"},
      {c:"Oxygen", r:"CREW MASKS ON if smoke persists (keep oxygen away from flames)"},
      {note:"With electrical power off the PFD and MFD are dark: fly on the standby instruments (backup battery).", kind:"caution"},
      {branch:"Fire out and electrical power required?", opts:{
        "Yes":[
          {c:"Circuit breakers", r:"CHECK – do not reset faulted"},
          {c:"Battery master", r:"ON"},
          {c:"Alternators / avionics / equipment", r:"ON one at a time, check for smoke"},
          {defer:"Electrical fire – suspect circuits isolated, affected systems unavailable."},
        ],
        "No":[
          {note:"Landing gear hydraulic pump and flaps are electric: plan an emergency free-fall gear extension and a flaps-up landing.", kind:"caution"},
          {defer:"Electrical power off – standby instruments only, emergency gear extension, flaps-up landing, no landing light or gear lights."},
        ]
      }},
      {note:"Smoke evacuation:", kind:"warn"},
      {c:"Fresh air vents / storm window", r:"OPEN"},
      {c:"Descent", r:"TO lower altitude if practicable"},
    ]},
    {id:"emer-desc", name:"Emergency Descent", items:[
      {c:"Throttle", r:"CLOSED (reduce smoothly if time permits)", mem:true},
      {c:"Propeller", r:"FULL FORWARD", mem:true},
      {c:"Landing gear", r:"DOWN (below 165 KIAS)", mem:true},
      {c:"Flaps", r:"10° (below 165 KIAS)", mem:true},
      {c:"Airspeed", r:"165 KIAS (smooth air) / 133 KIAS (turbulence)", mem:true},
      {c:"Oxygen", r:"ON if above 12,500 ft"},
      {c:"Mixture", r:"ENRICH as required"},
      {c:"ATC", r:"ADVISE – emergency descent"},
      {c:"Level-off", r:"10,000 ft or MEA – restore power slowly; gear up below 130 KIAS if continuing"},
    ]},
    {id:"hypoxia", name:"Hypoxia Symptoms / Oxygen System Failure", cond:"Above 12,500 ft: headache, euphoria, tingling, blue lips, poor judgement, low oxygen flow or pressure", land:"LAND AS SOON AS PRACTICAL", items:[
      {c:"Oxygen mask", r:"DON – oxygen ON, flow CHECK (mask in place of cannula)", mem:true},
      {c:"Descent", r:"INITIATE immediately to 12,500 ft or below (10,000 ft preferred) – Emergency Descent if symptoms severe", mem:true},
      {c:"Autopilot", r:"ON – altitude / heading, to protect against incapacitation", mem:true},
      {c:"ATC", r:"ADVISE – request lower"},
      {c:"Passengers", r:"CHECK responsive; masks on"},
      {c:"Oxygen system", r:"CHECK pressure, flow indicators, connections, bottle valve ON, lines not kinked"},
      {branch:"Oxygen flow restored?", opts:{
        "Yes":[{c:"Altitude", r:"REMAIN below 12,500 ft until symptoms clear; monitor with pulse oximeter"},{defer:"Hypoxia event – remain low, oxygen system suspect; medical check for occupants."}],
        "No":[{c:"Altitude", r:"REMAIN at or below 12,500 ft for the rest of the flight (10,000 ft with passengers)"},{defer:"Oxygen system failed – no flight above 12,500 ft, replan route / altitude."}]
      }},
    ]},
    {id:"pfd-fail", name:"PFD Failure – Revert to Standby Instruments", cond:"PFD blank, frozen, or red X's on attitude / airspeed / altitude", items:[
      {c:"Standby instruments", r:"FLY attitude, airspeed, altimeter (standby attitude indicator on backup battery)", mem:true},
      {c:"Autopilot", r:"OFF if attitude or flight director lost (G1000 GFC 700 requires AHRS / PFD)", mem:true},
      {c:"Display reversion", r:"SELECT (G1000: DISPLAY BACKUP – PFD data on MFD; Avidyne: MFD and standby instruments)"},
      {c:"PFD circuit breaker / dimming", r:"CHECK (brightness, breaker in)"},
      {c:"Navigation / communication", r:"USE MFD / second GPS-nav-com; ATC advised"},
      {c:"IMC", r:"EXIT / AVOID; request VMC approach or vectors"},
      {branch:"PFD data recovered (on PFD or MFD reversion)?", opts:{
        "Yes":[{c:"Autopilot", r:"RE-ENGAGE if attitude source valid"},{defer:"PFD fault – display reversion in use, maintenance required."}],
        "No":[{c:"Approach", r:"VISUAL preferred; standby instruments and GPS for a non-precision approach"},{defer:"PFD failed – standby instruments only, no autopilot, visual approach preferred."}]
      }},
    ]},
    {id:"gear-manual", name:"Emergency Gear Extension (Free Fall)", cond:"Gear does not extend hydraulically / HYD PUMP light stays on", items:[
      {c:"Airspeed", r:"REDUCE to approx 100 KIAS (below 165 KIAS Vle; slower aids free fall)"},
      {c:"Hydraulic pump circuit breaker", r:"PULL"},
      {c:"Landing gear selector", r:"DOWN"},
      {c:"Emergency gear extension lever", r:"PULL / EMERGENCY position (floor, between front seats) – hydraulic pressure released, gear free-falls"},
      {c:"Aircraft", r:"YAW left and right to assist gear into locks"},
      {c:"Landing gear indicator", r:"THREE GREEN"},
      {note:"Do not reset the hydraulic pump circuit breaker or move the gear selector up after an emergency extension. Leave the lever in the emergency position and the gear down.", kind:"warn"},
      {branch:"Three green obtained?", opts:{
        "Yes":[{defer:"Gear extended by free fall – do not retract; gear and hydraulic system inspection required."}],
        "No":[{note:"Continue to Gear-Up / Partial Gear Landing.", kind:"warn"}]
      }},
    ]},
    {id:"gear-up-landing", name:"Gear-Up / Partial Gear Landing", cond:"Gear cannot be confirmed down", items:[
      {c:"Runway", r:"LONGEST HARD SURFACE available, emergency services advised"},
      {c:"Passenger briefing", r:"COMPLETE (belts tight, brace, exits)"},
      {c:"Landing gear", r:"UP (or as it is – do not cycle)"},
      {c:"Flaps", r:"DOWN (36°)"},
      {c:"Approach", r:"NORMAL, 80–85 KIAS"},
      {c:"Fuel pump", r:"OFF"},
      {c:"Cabin door", r:"UNLATCHED"},
      {note:"On short final:", kind:"warn"},
      {c:"Mixture", r:"IDLE CUTOFF"},
      {c:"Fuel selector", r:"OFF"},
      {c:"Magnetos", r:"OFF"},
      {c:"Battery master / alternators", r:"OFF"},
      {c:"Touchdown", r:"MINIMUM SPEED, slightly nose high, wings level"},
      {c:"Aircraft", r:"EVACUATE once stopped"},
    ]},
    {id:"icing-emer", name:"Inadvertent Icing Beyond Capability", cond:"Ice accumulating faster than the ice protection clears it, or aircraft not approved for icing", land:"LAND AS SOON AS PRACTICAL", items:[
      {c:"Pitot heat / stall warning heat", r:"ON", mem:true},
      {c:"Propeller deice / windshield heat", r:"ON (if fitted)", mem:true},
      {c:"Surface deice (boots)", r:"CYCLE at first sign of ice – repeat as required (if fitted)", mem:true},
      {c:"Exit icing", r:"TURN BACK / CLIMB / DESCEND – ATC advised, request new altitude", mem:true},
      {c:"Power", r:"INCREASE to hold airspeed; manifold pressure monitored (alternate air door opens automatically on induction ice)"},
      {c:"Autopilot", r:"OFF – hand fly, note control feel and trim"},
      {c:"Airspeed", r:"MAINTAIN higher than normal; no abrupt pitch changes"},
      {c:"Cabin heat / defroster", r:"FULL ON for forward view"},
      {branch:"Residual ice on airframe for landing?", opts:{
        "No":[{c:"Ice protection", r:"OFF when clear"}],
        "Yes":[
          {c:"Flaps", r:"10° maximum for landing"},
          {c:"Approach speed", r:"INCREASE 10–15 KIAS (approx 95–100 KIAS); expect stall warning unreliable"},
          {c:"Landing", r:"LONGER RUNWAY, minimal flare, no steep turns"},
          {defer:"Residual airframe ice – flaps 10°, approach 95–100 KIAS, longer landing distance."},
        ]
      }},
    ]},
    {id:"spin", name:"Spin Recovery", cond:"Intentional spins prohibited – inadvertent spin entry", items:[
      {c:"Throttle", r:"IDLE", mem:true},
      {c:"Ailerons", r:"NEUTRAL", mem:true},
      {c:"Rudder", r:"FULL OPPOSITE to rotation", mem:true},
      {c:"Control wheel", r:"FULL FORWARD (release back pressure)", mem:true},
      {c:"Rudder", r:"NEUTRAL as rotation stops", mem:true},
      {c:"Recovery", r:"SMOOTH pull-out from dive; do not exceed 198 KIAS (Vne) or load limits"},
      {c:"Flaps / gear", r:"UP during recovery if extended"},
      {c:"Power", r:"RESTORE slowly once in level flight"},
    ]},
  ],
  abnormal: [
    {id:"alt-fail", name:"Alternator 1 / 2 Failure", cond:"ALT 1 INOP or ALT 2 INOP annunciator, load shift to one alternator, or low voltage", items:[
      {c:"Affected alternator switch", r:"OFF, then ON (reset)"},
      {c:"Alternator field circuit breaker", r:"CHECK / RESET once"},
      {branch:"Alternator restored?", opts:{
        "Yes":[{c:"Alternator loads / voltage", r:"MONITOR both"}],
        "No – one alternator failed":[
          {c:"Affected alternator switch", r:"OFF"},
          {c:"Electrical load", r:"REDUCE within the remaining alternator's capacity (windshield heat, prop deice, air conditioning OFF as needed)"},
          {defer:"One alternator inoperative – electrical load limited, no flight into icing; land as soon as practical."},
        ],
        "No – both alternators failed":[
          {c:"Both alternator switches", r:"OFF"},
          {c:"Non-essential electrical load", r:"OFF (battery only – approx 30 min; one display, one nav-com, transponder, pitot heat)"},
          {c:"Standby instruments / backup battery", r:"CONFIRM available"},
          {c:"Landing gear", r:"EXTEND EARLY while battery power remains (free-fall extension if the pump fails)"},
          {defer:"Both alternators failed – battery only; extend gear early, flaps may fail, displays may go dark – standby instruments; land as soon as possible."},
        ]
      }},
    ]},
    {id:"oil-press", name:"Low Oil Pressure", cond:"Oil pressure below 55 psi at cruise power (25 psi min idle)", items:[
      {c:"Oil pressure / oil temperature", r:"CHECK and cross-check (engine page / standby indication)"},
      {branch:"Oil temperature rising or pressure below 25 psi?", opts:{
        "Yes – genuine":[
          {c:"Power", r:"REDUCE to minimum required (turbocharger is oil-lubricated – expect failure)"},
          {c:"Airport", r:"DIVERT to nearest suitable, stay within glide of a landing area"},
          {c:"Altitude", r:"HOLD altitude as long as practicable for glide range"},
          {defer:"Low oil pressure – land as soon as possible, expect possible engine failure."},
        ],
        "No – gauge suspect":[{c:"Flight", r:"CONTINUE, monitor oil temperature and pressure"},{defer:"Oil pressure indication suspect – maintenance check required."}]
      }},
    ]},
    {id:"turbo-fail", name:"Turbocharger Failure / Manifold Pressure Loss", cond:"Manifold pressure falls or cannot be obtained, fuel flow high for the MP, rough running, possible exhaust smell", items:[
      {c:"Throttle", r:"REDUCE, then re-set smoothly"},
      {c:"Mixture", r:"LEAN to smooth running at the manifold pressure available (fuel flow too high for MP)"},
      {c:"Engine instruments", r:"CHECK (TIT, CHT, oil pressure and temperature)"},
      {c:"Exhaust leak indications", r:"CHECK (smell, smoke, cabin CO) – exhaust gas in cowling is a fire hazard"},
      {branch:"Exhaust leak or fire suspected?", opts:{
        "Yes":[
          {c:"Power", r:"MINIMUM required"},
          {c:"Cabin heat", r:"OFF (CO risk)"},
          {c:"Landing", r:"NEAREST SUITABLE AIRPORT – be ready for Engine Fire in Flight"},
          {defer:"Turbocharger / exhaust failure – fire hazard, land as soon as possible, no go-around."},
        ],
        "No – power loss only":[
          {c:"Altitude", r:"DESCEND to where naturally-aspirated power is adequate (approx 28 in Hg available near sea level, less with altitude)"},
          {c:"Oxygen", r:"AS REQUIRED while descending from high altitude"},
          {defer:"Turbocharger failed – reduced power, low altitude only, longer takeoff distance; land as soon as practical."},
        ]
      }},
    ]},
    {id:"high-tit", name:"High TIT / Overboost", cond:"TIT above 1,750°F red line or manifold pressure above 42 in Hg", items:[
      {branch:"Indication?", opts:{
        "Overboost (MP above 42 in Hg)":[
          {c:"Throttle", r:"REDUCE below 42 in Hg, re-apply slowly"},
          {c:"Oil temperature", r:"CHECK (cold oil slows the density controller – warm up before full power)"},
          {note:"Momentary overboost of approx 1 in Hg for a few seconds is tolerated; sustained or large overboost requires a maintenance inspection before further flight.", kind:"caution"},
          {defer:"Overboost occurred – record peak MP and duration, maintenance inspection required."},
        ],
        "High TIT":[
          {c:"Mixture", r:"ENRICH until TIT below 1,650°F"},
          {c:"Throttle", r:"REDUCE if TIT remains high"},
          {c:"Fuel flow", r:"CHECK against POH for the power set (low flow – fuel pump LO)"},
          {branch:"TIT within limits?", opts:{
            "Yes":[{c:"Flight", r:"CONTINUE, richer mixture"}],
            "No":[{c:"Power", r:"REDUCE to the highest setting that keeps TIT below 1,650°F"},{defer:"High TIT – reduced power, suspect fuel system or TIT probe; maintenance check."}]
          }},
        ]
      }},
    ]},
    {id:"fuel-flow", name:"Fuel Flow Fluctuation / Low Fuel Pressure", items:[
      {c:"Fuel pump", r:"LO (vapour suppression); HI only if fuel flow is very low – may flood engine at low power"},
      {c:"Fuel selector", r:"SWITCH TANKS (check quantity in the tank being used)"},
      {c:"Mixture", r:"ADJUST for smooth running"},
      {c:"Engine instruments", r:"CHECK (fuel flow, TIT, CHT)"},
      {branch:"Fuel flow steady and engine smooth?", opts:{
        "Yes":[{defer:"Fuel flow fluctuation cleared – leave fuel pump LO; report to maintenance."}],
        "No":[{c:"Power", r:"REDUCE to smoothest setting; lower altitude helps vapour"},{defer:"Fuel flow unstable – land as soon as practical at nearest suitable airport."}]
      }},
    ]},
    {id:"gear-unsafe", name:"Landing Gear Unsafe / Fails to Retract or Extend", cond:"Red gear warning light, fewer than three green, or HYD PUMP light stays on", items:[
      {c:"Airspeed", r:"BELOW 165 KIAS (below 130 KIAS to retract)"},
      {c:"Gear indicator bulbs", r:"CHECK (press to test) – navigation lights dim the gear lights"},
      {c:"Hydraulic pump circuit breaker", r:"CHECK / RESET once"},
      {c:"Landing gear selector", r:"CYCLE once to the desired position"},
      {branch:"Gear in desired position?", opts:{
        "Yes":[{c:"Gear indication", r:"CONFIRM three green / lights out"},{defer:"Gear system fault – do not retract after landing; hydraulic / gear inspection required."}],
        "No – failed to retract":[{c:"Landing gear selector", r:"DOWN – leave down"},{c:"Hydraulic pump", r:"If HYD PUMP light stays on, PULL hydraulic pump circuit breaker (pump running against a leak)"},{c:"Airspeed", r:"BELOW 165 KIAS"},{defer:"Gear will not retract – gear down, 165 KIAS max, reduced range; land as soon as practical."}],
        "No – failed to extend":[{note:"Use Emergency Gear Extension (Free Fall).", kind:"warn"}]
      }},
    ]},
    {id:"flap-fail", name:"Flap Failure / Asymmetry", items:[
      {c:"Flap selector", r:"STOP at current position – do not continue extension"},
      {c:"Flap circuit breaker", r:"CHECK / RESET once"},
      {branch:"Flaps operable and symmetric?", opts:{
        "Yes":[{c:"Flap setting", r:"AS REQUIRED"}],
        "No":[{c:"Landing", r:"AT CURRENT FLAP SETTING – approach approx 90–95 KIAS flaps up, longer runway"},{defer:"Flaps inoperative / asymmetric – flaps-up or partial-flap landing, approach approx 90–95 KIAS, increased landing distance."}]
      }},
    ]},
    {id:"prop-overspeed", name:"Propeller Overspeed", cond:"RPM above 2,500 and not responding to the prop lever", items:[
      {c:"Throttle", r:"REDUCE"},
      {c:"Propeller", r:"FULL AFT (low RPM)"},
      {c:"Airspeed", r:"REDUCE (pitch up) to bring RPM within limits"},
      {c:"Oil pressure", r:"CHECK (governor uses engine oil)"},
      {c:"Power", r:"SET minimum that keeps RPM at or below 2,500"},
      {defer:"Propeller governor fault – control RPM with throttle and airspeed, land as soon as practical."},
    ]},
    {id:"door-open", name:"Door Open in Flight", cond:"DOOR AJAR annunciator or door noise / buffet", items:[
      {c:"Aircraft", r:"CONTROLLABLE – fly the airplane"},
      {c:"Airspeed", r:"REDUCE to approx 110–120 KIAS"},
      {c:"Belts / loose items", r:"SECURE; passengers away from the door"},
      {note:"Do not attempt to close or re-latch the door in flight. Expect noise and buffet; the upper door may trail open.", kind:"caution"},
      {defer:"Cabin door unlatched – return and land as soon as practical, normal approach speed."},
    ]},
    {id:"oxy-low", name:"Oxygen Quantity Low / No Flow", cond:"Oxygen pressure low, flow indicator not showing flow, or duration insufficient for planned cruise", items:[
      {c:"Oxygen bottle valve / system switch", r:"CHECK ON"},
      {c:"Masks / cannulas / connections", r:"CHECK seated, lines not kinked, flow indicators"},
      {c:"Remaining duration", r:"COMPUTE for occupants at current altitude"},
      {branch:"Oxygen sufficient to continue above 12,500 ft?", opts:{
        "Yes":[{c:"Flow", r:"MONITOR every 15 min; descend before pressure reaches minimum"},{defer:"Oxygen quantity limited – descend below 12,500 ft before supply exhausted."}],
        "No":[
          {c:"Descent", r:"INITIATE to 12,500 ft or below (10,000 ft with passengers) before supply runs out"},
          {c:"Crew", r:"MONITOR for hypoxia symptoms (Hypoxia procedure)"},
          {defer:"Oxygen exhausted / failed – remain at or below 12,500 ft, replan route and altitude."},
        ]
      }},
    ]},
    {id:"avionics-fail", name:"MFD / AHRS / Air Data Failure", cond:"MFD blank, AHRS alignment lost (red X attitude / heading), or ADC failure (red X airspeed / altitude)", items:[
      {branch:"Failed unit?", opts:{
        "MFD":[
          {c:"Display reversion", r:"SELECT (G1000: DISPLAY BACKUP – engine data on PFD; Avidyne: PFD and standby engine indications)"},
          {c:"Engine monitoring", r:"USE reversionary engine strip; set power conservatively"},
          {c:"Navigation", r:"CONTINUE on PFD / second GPS-nav-com"},
          {defer:"MFD failed – reversionary engine display, reduced moving-map / traffic / weather; maintenance required."},
        ],
        "AHRS":[
          {c:"Standby attitude indicator / compass", r:"FLY attitude and heading"},
          {c:"Autopilot", r:"OFF (attitude source lost); re-engage only with valid attitude"},
          {c:"AHRS re-alignment", r:"ALLOW – straight and level, wings level, approx 1 min"},
          {c:"IMC", r:"EXIT / AVOID until attitude restored"},
          {defer:"AHRS failed – standby attitude indicator, no autopilot, visual approach preferred."},
        ],
        "Air data (ADC)":[
          {c:"Standby airspeed / altimeter", r:"FLY from standby instruments"},
          {c:"Pitot heat", r:"ON (icing may be the cause)"},
          {c:"Autopilot altitude / speed modes", r:"DO NOT USE; transponder altitude may be lost – ATC advised"},
          {defer:"Air data failed – standby airspeed / altimeter, no altitude reporting; approach by attitude and power."},
        ]
      }},
    ]},
    {id:"pitot-static", name:"Pitot / Static Source Blockage", cond:"Airspeed erratic or zero, altimeter / VSI frozen (PFD and standby agree, so not a display fault)", items:[
      {c:"Pitot heat", r:"ON"},
      {c:"Attitude and power", r:"FLY KNOWN pitch / power settings; GPS ground speed as cross-check"},
      {branch:"Static system blocked?", opts:{
        "Yes":[
          {c:"Alternate static source", r:"ON (cabin); expect small altimeter / airspeed errors; vents and storm window closed"},
          {defer:"Static source blocked – alternate static in use, altimeter error on approach."},
        ],
        "No – pitot only":[
          {c:"Airspeed indicator", r:"DISREGARD until heat clears the blockage; use attitude, power and GPS"},
          {defer:"Airspeed unreliable – approach by attitude and power, add margin, longer runway."},
        ]
      }},
    ]},
    {id:"ice", name:"Icing Conditions / Ice Accumulation", cond:"Ice forming on wing leading edge / ice light inspection", items:[
      {c:"Pitot heat / stall warning heat", r:"ON"},
      {c:"Propeller deice", r:"ON (if fitted)"},
      {c:"Windshield heat", r:"ON (if fitted)"},
      {c:"Surface deice (boots)", r:"CYCLE at first sign of ice – repeat as required (if fitted)"},
      {c:"Autopilot", r:"DISCONNECT periodically – check for trim / control changes"},
      {c:"Exit icing", r:"CLIMB / DESCEND / TURN as required (aircraft without ice protection must leave icing immediately)"},
      {branch:"Residual ice on airframe for landing?", opts:{
        "No":[{c:"Ice protection", r:"OFF when clear"}],
        "Yes":[
          {c:"Flaps", r:"10° maximum for landing"},
          {c:"Approach speed", r:"INCREASE 10–15 KIAS; no abrupt pitch changes"},
          {defer:"Residual airframe ice – flaps 10°, approach 95–100 KIAS, longer landing distance."},
        ]
      }},
    ]},
  ]
});
