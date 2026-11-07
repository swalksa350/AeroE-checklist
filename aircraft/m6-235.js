/* Maule M-6-235 – checklist data.
   Prototype content. Verify against the operator's approved checklist and the POH/AFM. */
window.AIRCRAFT = window.AIRCRAFT || [];
window.AIRCRAFT.push({
  id: "m6-235",
  maker: "Maule",
  model: "M-6-235 Super Rocket",
  short: "M6-235",
  category: "High-performance single",
  engine: "Lycoming O-540-J1A5D (carbureted) or IO-540-W1A5D (fuel-injected), 235 hp",
  seats: "4–5",
  basis: "Typical M-6-235 (1980s) POH procedures: the shorter-fuselage predecessor of the M-7 with the long 30 ft 10 in wing, large manual flaps -7° reflex / 0° / 24° / 40° / 48° and 2,500 lb gross weight; conventional (tailwheel) gear on oleo-spring main legs with a spring tailwheel, constant-speed propeller; 2 × 20 gal main tanks (approx 40 gal) with a LEFT/RIGHT/OFF fuel selector, plus optional 2 × 15 gal auxiliary wing tanks transferred into the mains by electric transfer pumps. Carburettor-heat items apply to the O-540 only; alternate induction air to the IO-540. Figures are KIAS approximations of a POH written in MPH and vary by sub-model and year – verify against the aircraft's own POH. Floats or skis, if fitted, have their own supplement and are not covered here.",
  vspeeds: [
    {k:"Vr", v:"40–50 KIAS (STOL technique, tail-low, flaps 24°–40°; 50–55 KIAS normal) – verify"},
    {k:"Vx", v:"approx 55–60 KIAS"},
    {k:"Vy", v:"approx 75 KIAS"},
    {k:"Best glide", v:"approx 70 KIAS"},
    {k:"Vs / Vso", v:"approx 43 / 35 KIAS (verify in POH)"},
    {k:"Vfe", v:"approx 90 KIAS (24°) / 85 KIAS (40°) / 80 KIAS (48°) – verify; -7° reflex has no separate limit"},
    {k:"Va", v:"approx 110 KIAS (2,500 lb)"},
    {k:"Vno", v:"approx 135 KIAS"},
    {k:"Vne", v:"approx 160 KIAS"},
    {k:"Approach", v:"65–70 KIAS flaps 24° / 55–60 KIAS flaps 40° / 50–55 KIAS flaps 48° short field (three-point)"}
  ],

  normal: [
    {id:"pre", name:"Before Start", items:[
      {c:"Preflight inspection", r:"COMPLETE (oleo-spring main gear – strut extension even, no leaks; tailwheel tyre, leaf spring, steering chains & springs; brake lines; flap and strut attach points; fuel vents)"},
      {c:"Fuel quantity", r:"CHECK visually – mains 2 × 20 gal (approx 40 gal) and aux tanks 2 × 15 gal if installed; gauges cross-checked"},
      {c:"Fuel sumps", r:"DRAINED (mains, aux, gascolator)"},
      {c:"Oil quantity", r:"CHECK (12 qt max; add if below 8 qt)"},
      {c:"Cargo / baggage", r:"SECURED, weight & balance checked (2,500 lb gross; aft CG limits with rear load)"},
      {c:"Passenger briefing", r:"COMPLETE (belts & shoulder harnesses, door latches – both front doors and right-side rear cargo door, tail-low attitude on ground, sterile cockpit)"},
      {c:"Seats, belts, shoulder harnesses", r:"ADJUST & LOCK (harnesses on, all occupants)"},
      {c:"Doors", r:"CLOSED & LATCHED – left front, right front, rear cargo door (check from inside and out)"},
      {c:"Brakes", r:"TEST & SET"},
      {c:"Control lock", r:"REMOVE"},
      {c:"Electrical equipment / avionics master", r:"OFF"},
      {c:"Fuel selector", r:"LEFT or RIGHT (fullest main) – never OFF for start"},
      {c:"Aux fuel transfer switches", r:"OFF"},
      {c:"Flaps", r:"0° (check -7° reflex detent and full travel to 48°)"},
      {c:"Master switch", r:"ON"},
    ]},
    {id:"start", name:"Engine Start", items:[
      {c:"Throttle", r:"OPEN approx 1/4 inch"},
      {c:"Propeller", r:"HIGH RPM (full forward)"},
      {c:"Mixture", r:"IDLE CUTOFF (IO-540) / RICH (O-540)"},
      {c:"Beacon", r:"ON"},
      {c:"Propeller area", r:"CLEAR (tail-low – check nose-high blind area)"},
      {c:"Fuel boost pump", r:"ON"},
      {c:"Prime", r:"IO-540: mixture RICH until fuel flow indicates (3–5 s) then IDLE CUTOFF; O-540: primer 2–3 strokes (cold), locked"},
      {c:"Ignition switch", r:"START (release when engine fires; max 10 s cranking)"},
      {c:"Mixture", r:"ADVANCE smoothly to RICH when engine fires (IO-540)"},
      {c:"Throttle", r:"ADJUST 1,000 RPM"},
      {c:"Oil pressure", r:"CHECK rising within 30 s (60 s cold) – if not, SHUT DOWN"},
      {c:"Fuel boost pump", r:"OFF (fuel pressure steady)"},
      {c:"Ammeter / voltmeter", r:"CHECK charging"},
      {c:"Avionics master", r:"ON"},
    ]},
    {id:"taxi", name:"Before Taxi", items:[
      {c:"Altimeter", r:"SET"},
      {c:"Radios / transponder / GPS", r:"SET"},
      {c:"Tailwheel steering", r:"CHECK – tailwheel follows rudder through steering springs, full-swivel releases only with brake and full rudder"},
      {c:"Parking brake", r:"RELEASE"},
      {c:"Brakes", r:"CHECK during initial taxi (differential braking available)"},
      {c:"Flight controls for wind", r:"POSITIONED – climb into headwind (stick back, aileron into wind), dive away from tailwind (stick forward, aileron away); long wing is sensitive to gusts"},
      {c:"Taxi speed", r:"SLOW – S-turns for forward visibility, no sudden braking (nose-over risk)"},
    ]},
    {id:"runup", name:"Before Takeoff", items:[
      {c:"Parking brake", r:"SET (aircraft into wind, stick HELD BACK during run-up)"},
      {c:"Seats, belts, shoulder harnesses", r:"CHECK SECURE"},
      {c:"Doors / windows", r:"CLOSED & LATCHED (both front doors, rear cargo door)"},
      {c:"Flight controls", r:"FREE & CORRECT"},
      {c:"Fuel quantity", r:"CHECK both mains"},
      {c:"Fuel selector", r:"FULLEST MAIN (do not change tanks just before takeoff)"},
      {c:"Aux fuel transfer switches", r:"OFF"},
      {c:"Mixture", r:"RICH (lean for field elevation above approx 3,000 ft)"},
      {c:"Elevator trim", r:"TAKEOFF"},
      {c:"Throttle", r:"1,800–2,000 RPM"},
      {c:"Magnetos", r:"CHECK L / R / BOTH (max drop 175 RPM, max 50 RPM differential)", sub:true},
      {c:"Propeller", r:"CYCLE high to low RPM 2–3 times (RPM drop approx 300–500, oil pressure recovers)", sub:true},
      {c:"Carb heat (O-540)", r:"CHECK RPM drop, then COLD", sub:true},
      {c:"Alternate air (IO-540)", r:"CHECK operation (if fitted), then CLOSED", sub:true},
      {c:"Engine instruments", r:"CHECK (oil press 55–95 psi, oil temp green, fuel press / flow steady)", sub:true},
      {c:"Suction", r:"CHECK green (approx 4.5–5.5 in Hg)", sub:true},
      {c:"Throttle", r:"1,000 RPM"},
      {c:"Fuel boost pump", r:"ON"},
      {c:"Tailwheel", r:"ALIGNED straight"},
      {c:"Radios / transponder", r:"SET / ALT"},
      {c:"Flaps", r:"SET – 0° or 24° normal; 24°–40° short / soft field (verify POH)"},
      {c:"Takeoff briefing", r:"COMPLETE (directional control with rudder, tail up or tail-low, rotate 40–55 KIAS by technique, abort / EFATO plan)"},
      {branch:"Takeoff type?", opts:{
        "Normal":[
          {c:"Technique", r:"TAIL-LOW, lift off approx 50–55 KIAS, accelerate to 75 KIAS (Vy)"},
        ],
        "Short field (STOL)":[
          {c:"Flaps", r:"24° (40° for shortest ground roll, if POH permits)"},
          {c:"Technique", r:"BRAKES HELD to full power, release, stick back, lift off approx 40–50 KIAS, climb at approx 55–60 KIAS (Vx) until clear, then flaps up in stages above 65 KIAS"},
        ],
        "Soft / rough field":[
          {c:"Flaps", r:"24°–40°"},
          {c:"Technique", r:"STICK FULL BACK initially, keep rolling, lift off at minimum speed, accelerate in ground effect, flaps up in stages above 65 KIAS"},
        ]
      }},
    ]},
    {id:"climb", name:"After Takeoff / Climb", items:[
      {c:"Airspeed", r:"75 KIAS (Vy) / 55–60 KIAS (Vx, obstacles); cruise climb 80–85 KIAS"},
      {c:"Flaps", r:"0° (retract in stages above 65 KIAS, clear of obstacles – expect sink as 40° comes up)"},
      {c:"Fuel boost pump", r:"OFF (above approx 1,000 ft AGL; check fuel pressure / flow steady)"},
      {c:"Power", r:"FULL THROTTLE / full RPM to 1,000 ft, then approx 25 in Hg / 2,400 RPM (verify red line – 2,400 RPM rated on both engines)"},
      {c:"Mixture", r:"RICH (lean above approx 3,000 ft per EGT / fuel flow)"},
    ]},
    {id:"cruise", name:"Cruise", items:[
      {c:"Power", r:"SET (typical 2,300–2,400 RPM / 22–24 in Hg, approx 65–75%)"},
      {c:"Flaps", r:"-7° REFLEX for cruise (raises cruise speed; return to 0° before slowing below approx 80 KIAS)"},
      {c:"Mixture", r:"LEAN per EGT / fuel flow (approx 12–14 GPH at 65–75%)"},
      {c:"Fuel selector", r:"CHANGE MAINS at intervals (approx every 30–60 min) to keep balance; boost pump ON during change"},
      {c:"Aux fuel transfer (if installed)", r:"TRANSFER SWITCH ON for the side whose main is below approx 1/2; OFF when main full or aux empty (avoid venting overboard)"},
      {c:"Fuel quantity / endurance", r:"CHECK mains and aux against plan (approx 40 gal mains + 30 gal aux)"},
    ]},
    {id:"desc", name:"Descent", items:[
      {c:"Altimeter", r:"SET"},
      {c:"Flaps", r:"0° (out of reflex before slowing)"},
      {c:"Power", r:"REDUCE gradually (avoid rapid cooling)"},
      {c:"Carb heat (O-540)", r:"ON for low-power descent"},
      {c:"Mixture", r:"ENRICH progressively"},
      {c:"Approach briefing", r:"COMPLETE (wind, wheel or three-point landing, flap setting, go-around)"},
    ]},
    {id:"land", name:"Before Landing", items:[
      {c:"Seats, belts, shoulder harnesses", r:"SECURE"},
      {c:"Fuel selector", r:"FULLEST MAIN"},
      {c:"Aux fuel transfer switches", r:"OFF"},
      {c:"Fuel boost pump", r:"ON"},
      {c:"Mixture", r:"RICH"},
      {c:"Propeller", r:"HIGH RPM (full forward)"},
      {c:"Carb heat (O-540)", r:"ON (COLD for go-around)"},
      {c:"Tailwheel", r:"STEERING ENGAGED / straight"},
      {c:"Flaps", r:"24° below approx 90 KIAS, 40° below approx 85 KIAS, 48° below approx 80 KIAS"},
      {branch:"Landing type?", opts:{
        "Three-point":[
          {c:"Airspeed", r:"55–60 KIAS (flaps 40°) / 50–55 KIAS (flaps 48°, short field), power as required"},
          {c:"Touchdown", r:"ALL THREE WHEELS together, stick FULL BACK after touchdown, rudder for direction, brakes as required"},
        ],
        "Wheel landing":[
          {c:"Airspeed", r:"65–70 KIAS (flaps 24°–40°), slight power into the flare"},
          {c:"Touchdown", r:"MAIN WHEELS tail-up, stick FORWARD slightly to pin mains (oleo legs – do not bounce), let tail settle as speed decays, then stick BACK"},
        ],
        "Soft / rough field":[
          {c:"Airspeed", r:"55 KIAS (flaps 40°–48°), power on"},
          {c:"Touchdown", r:"THREE-POINT or tail-low at minimum speed, stick FULL BACK, minimum braking"},
        ]
      }},
      {note:"Flaps 48° give a steep, draggy approach with high sink rate – carry power and plan the go-around early; retract to 24° if power is applied for a go-around.", kind:"caution"},
      {c:"Crosswind", r:"WING LOW into wind, upwind wheel first, full aileron into wind as speed decays (reduce flap in strong crosswind)"},
    ]},
    {id:"after", name:"After Landing", items:[
      {note:"Keep flying the aircraft until stopped – the landing is not over until the tailwheel is on the ground and the aircraft is at taxi speed. Any swing: immediate rudder, go-around or power if needed.", kind:"caution"},
      {c:"Directional control", r:"RUDDER first, brakes sparingly – stick FULL BACK, aileron into wind"},
      {c:"Flaps", r:"0° (after clear of runway, at taxi speed)"},
      {c:"Carb heat (O-540)", r:"COLD"},
      {c:"Fuel boost pump", r:"OFF"},
      {c:"Strobe / landing lights", r:"OFF / AS REQUIRED"},
    ]},
    {id:"shut", name:"Shutdown", items:[
      {c:"Parking brake", r:"SET (into wind, stick back)"},
      {c:"Electrical equipment / pitot heat / avionics master", r:"OFF"},
      {c:"Mixture", r:"IDLE CUTOFF (pull full out)"},
      {c:"Ignition switch", r:"OFF (key removed)"},
      {c:"Master switch", r:"OFF"},
      {c:"Aux fuel transfer switches", r:"OFF"},
      {c:"Fuel selector", r:"LEFT or RIGHT (OFF only for extended parking, per operator)"},
      {c:"Control lock", r:"INSTALL (or stick secured back with belt)"},
      {c:"Tie-downs / tail", r:"SECURE (tail tie-down in wind – long wing, light tail)"},
    ]},
  ],
  emergency: [
    {id:"eng-fail-roll", name:"Engine Failure During Takeoff Roll", cond:"On the runway", items:[
      {c:"Throttle", r:"IDLE", mem:true},
      {c:"Directional control", r:"RUDDER, stick BACK", mem:true},
      {c:"Brakes", r:"APPLY (smoothly – avoid nose-over)", mem:true},
      {c:"Mixture", r:"IDLE CUTOFF"},
      {c:"Fuel selector", r:"OFF"},
      {c:"Ignition switch", r:"OFF"},
      {c:"Master switch", r:"OFF"},
    ]},
    {id:"eng-fail-to", name:"Engine Failure After Takeoff", cond:"Airborne, insufficient runway remaining", land:"LAND IMMEDIATELY", items:[
      {c:"Airspeed", r:"70 KIAS flaps 0° / 55–60 KIAS flaps 24°–40°", mem:true},
      {c:"Mixture", r:"IDLE CUTOFF", mem:true},
      {c:"Fuel selector", r:"OFF", mem:true},
      {c:"Ignition switch", r:"OFF", mem:true},
      {c:"Flaps", r:"AS REQUIRED (40°–48° once landing assured)", mem:true},
      {c:"Master switch", r:"OFF", mem:true},
      {c:"Doors", r:"UNLATCH"},
      {c:"Touchdown", r:"THREE-POINT, minimum speed, stick back"},
      {note:"Land straight ahead with only small heading changes. Do not attempt to turn back to the runway.", kind:"warn"},
    ]},
    {id:"eng-fail-flt", name:"Engine Failure in Flight", cond:"Loss of power with altitude available", land:"LAND AS SOON AS POSSIBLE", items:[
      {c:"Airspeed", r:"70 KIAS (best glide), flaps 0°", mem:true},
      {c:"Propeller", r:"LOW RPM (full aft – reduces drag)", mem:true},
      {c:"Fuel selector", r:"CHANGE MAIN (check quantity; transfer aux if mains low)", mem:true},
      {c:"Fuel boost pump", r:"ON", mem:true},
      {c:"Mixture", r:"RICH (if no restart: IDLE CUTOFF, then advance slowly)", mem:true},
      {c:"Carb heat (O-540) / alternate air (IO-540)", r:"ON / OPEN", mem:true},
      {c:"Ignition switch", r:"BOTH (START if propeller has stopped)", mem:true},
      {branch:"Engine restarted?", opts:{
        "Yes":[
          {c:"Propeller", r:"HIGH RPM, then as required"},
          {c:"Power", r:"AS REQUIRED (minimum needed)"},
          {c:"Fuel boost pump", r:"LEAVE ON if pressure fluctuates, else OFF"},
          {c:"Engine instruments", r:"MONITOR"},
          {defer:"Engine restarted after in-flight failure – land as soon as possible; suspect fuel starvation (tank selection / aux transfer), carb ice or ignition."},
        ],
        "No – forced landing":[]
      }},
      {note:"Forced landing without engine power:", kind:"warn"},
      {c:"Field / wind", r:"SELECT & PLAN (into wind; the long wing and 48° flaps allow a very slow, steep arrival – avoid ditches and soft ground that could nose it over)"},
      {c:"Mayday / 7700", r:"TRANSMIT (time permitting)"},
      {c:"Passengers", r:"BRIEF – brace, exits (both front doors, rear cargo door)"},
      {c:"Seats, belts, shoulder harnesses", r:"SECURE"},
      {c:"Airspeed", r:"70 KIAS flaps 0° / 55 KIAS flaps 40°–48°"},
      {c:"Mixture", r:"IDLE CUTOFF"},
      {c:"Fuel selector", r:"OFF"},
      {c:"Aux fuel transfer switches", r:"OFF"},
      {c:"Ignition switch", r:"OFF"},
      {c:"Flaps", r:"40°–48° when landing assured"},
      {c:"Master switch", r:"OFF"},
      {c:"Doors", r:"UNLATCH prior to touchdown"},
      {c:"Touchdown", r:"THREE-POINT, minimum speed, stick FULL BACK"},
      {c:"Brakes", r:"AS REQUIRED (gently – nose-over risk on soft ground)"},
    ]},
    {id:"eng-fire-start", name:"Engine Fire During Start", items:[
      {c:"Cranking", r:"CONTINUE (draw flames into engine)", mem:true},
      {branch:"Engine started?", opts:{
        "Yes":[
          {c:"Power", r:"1,800 RPM for a few minutes"},
          {c:"Engine", r:"SHUT DOWN & INSPECT for damage"},
        ],
        "No":[
          {c:"Throttle", r:"FULL OPEN"},
          {c:"Mixture", r:"IDLE CUTOFF"},
          {c:"Cranking", r:"CONTINUE"},
          {c:"Fuel boost pump", r:"OFF"},
          {c:"Fuel selector", r:"OFF"},
          {c:"Ignition switch", r:"OFF"},
          {c:"Master switch", r:"OFF"},
          {c:"Fire extinguisher", r:"OBTAIN & USE"},
          {c:"Aircraft", r:"EVACUATE, inspect for damage"},
        ]
      }},
    ]},
    {id:"eng-fire-flt", name:"Engine Fire in Flight", land:"LAND IMMEDIATELY", items:[
      {c:"Mixture", r:"IDLE CUTOFF", mem:true},
      {c:"Fuel selector", r:"OFF", mem:true},
      {c:"Fuel boost pump / aux transfer switches", r:"OFF", mem:true},
      {c:"Master switch", r:"OFF", mem:true},
      {c:"Cabin heat / air", r:"OFF (wing-root vents open)", mem:true},
      {c:"Airspeed", r:"100 KIAS (increase if fire persists until extinguished)", mem:true},
      {note:"Do not attempt an engine restart.", kind:"warn"},
      {c:"Forced landing", r:"EXECUTE (see Engine Failure in Flight)"},
    ]},
    {id:"elec-fire", name:"Electrical Fire in Flight", land:"LAND AS SOON AS POSSIBLE", items:[
      {c:"Master switch", r:"OFF", mem:true},
      {c:"Avionics master", r:"OFF", mem:true},
      {c:"Vents / cabin air / heat", r:"CLOSED", mem:true},
      {c:"Fire extinguisher", r:"ACTIVATE"},
      {c:"All other electrical switches (except ignition)", r:"OFF"},
      {note:"After discharging the extinguisher, ventilate the cabin.", kind:"caution"},
      {branch:"Fire out and electrical power necessary?", opts:{
        "Yes":[
          {c:"Master switch", r:"ON"},
          {c:"Circuit breakers", r:"CHECK – do not reset a faulted breaker"},
          {c:"Avionics master", r:"ON, then radios one at a time with delay, check for smoke"},
          {c:"Vents / cabin air", r:"OPEN when fire is completely out"},
          {defer:"Electrical fire – faulted circuit isolated, affected equipment unavailable."},
        ],
        "No":[
          {note:"Continue with master off. Manual flaps still available; no radios, fuel gauges, boost pump or aux transfer pumps – fly on main-tank fuel only.", kind:"caution"},
          {defer:"Electrical power off – no radio, no fuel gauges, no boost pump or aux transfer; main-tank fuel only."},
        ]
      }},
    ]},
    {id:"cabin-fire", name:"Cabin Fire", land:"LAND AS SOON AS POSSIBLE", items:[
      {c:"Master switch", r:"OFF", mem:true},
      {c:"Vents / cabin air / heat", r:"CLOSED", mem:true},
      {c:"Fire extinguisher", r:"ACTIVATE"},
      {c:"Cabin", r:"VENTILATE after fire is out"},
      {c:"Land", r:"AS SOON AS POSSIBLE, inspect for damage"},
    ]},
    {id:"emer-desc", name:"Emergency Descent", items:[
      {c:"Throttle", r:"IDLE", mem:true},
      {c:"Propeller", r:"HIGH RPM (full forward – maximum drag)", mem:true},
      {c:"Mixture", r:"RICH", mem:true},
      {c:"Flaps", r:"0°", mem:true},
      {c:"Airspeed", r:"approx 135 KIAS smooth air (Vno) / approx 110 KIAS turbulence (Va)", mem:true},
      {c:"Power", r:"CLEAR ENGINE periodically"},
      {note:"Alternative with structural damage suspected: flaps 40° and approx 85 KIAS maximum (48° / 80 KIAS gives the steepest path at low speed).", kind:"caution"},
    ]},
    {id:"ground-loop", name:"Loss of Directional Control / Ground Loop on Landing", cond:"Swing developing on landing roll or takeoff roll", items:[
      {c:"Rudder", r:"FULL OPPOSITE to swing, immediately", mem:true},
      {c:"Stick", r:"BACK (three-point) – keep tailwheel loaded; aileron into wind", mem:true},
      {branch:"Swing controllable?", opts:{
        "Yes":[
          {c:"Brakes", r:"DIFFERENTIAL as required, smoothly"},
          {c:"Roll-out", r:"CONTINUE, taxi clear, inspect oleo legs, tailwheel spring and steering chains"},
        ],
        "No – airborne speed available":[
          {c:"Throttle", r:"FULL POWER, go around, flaps as set (reduce 48° to 24°–40° when climbing)"},
          {c:"Directional control", r:"RIGHT RUDDER for power swing"},
        ],
        "No – too slow":[
          {c:"Throttle", r:"IDLE"},
          {c:"Mixture", r:"IDLE CUTOFF, ignition OFF if departure from the runway is certain"},
          {c:"Stick", r:"FULL BACK, brakes as the swing dictates – accept the loop rather than nose over"},
        ]
      }},
    ]},
  ],
  abnormal: [
    {id:"alt-fail", name:"Alternator Failure / Low Voltage", cond:"Ammeter discharge, low-voltage light or voltmeter low", items:[
      {c:"Alternator / field circuit breaker", r:"CHECK IN"},
      {c:"Master switch (ALT half, if split)", r:"OFF, then ON"},
      {c:"Ammeter / voltmeter", r:"CHECK"},
      {branch:"Charging restored?", opts:{
        "Yes":[{c:"Ammeter / voltmeter", r:"MONITOR"}],
        "No":[
          {c:"Alternator", r:"OFF"},
          {c:"Non-essential electrical equipment", r:"OFF (lights, second radio, pitot heat if not needed)"},
          {c:"Aux fuel", r:"TRANSFER NOW if needed – transfer pumps are electric"},
          {defer:"Alternator failed – battery only, limited endurance. Land as soon as practical; flaps are manual, but fuel gauges, boost pump and aux transfer will be lost."},
        ]
      }},
    ]},
    {id:"oil-press", name:"Low Oil Pressure", cond:"Oil pressure below 55 psi green arc", items:[
      {c:"Oil pressure / oil temperature", r:"CHECK"},
      {branch:"Oil temperature also rising?", opts:{
        "Yes":[
          {c:"Power", r:"REDUCE to minimum required"},
          {c:"Propeller", r:"EXPECT governor loss – RPM may rise to high-RPM stop"},
          {c:"Engine failure", r:"EXPECT – plan a precautionary landing (suitable field, three-point, flaps 40°–48°)"},
          {defer:"Low oil pressure with high temperature – land as soon as possible, expect engine failure."},
        ],
        "No – temp normal":[
          {c:"Flight", r:"CONTINUE to nearest suitable airport, monitor"},
          {defer:"Low oil pressure indication – land as soon as practical, maintenance check before further flight."},
        ]
      }},
    ]},
    {id:"oil-temp", name:"High Oil Temperature / CHT", cond:"Oil temperature or CHT approaching red line", items:[
      {c:"Mixture", r:"RICH"},
      {c:"Power", r:"REDUCE"},
      {c:"Airspeed", r:"INCREASE (lower nose, 85–95 KIAS in climb)"},
      {c:"Oil pressure", r:"MONITOR"},
      {branch:"Temperature returning to green arc?", opts:{
        "Yes":[{c:"Flight", r:"CONTINUE, monitor"}],
        "No":[{defer:"High engine temperature – land as soon as practical, minimum power."}]
      }},
    ]},
    {id:"rough", name:"Rough Running / Carb Ice / Fuel Pressure", cond:"Rough engine, RPM or manifold pressure decay, fuel pressure fluctuating", items:[
      {c:"Fuel boost pump", r:"ON"},
      {c:"Mixture", r:"ADJUST for smooth operation"},
      {c:"Fuel selector", r:"CHANGE MAIN (check quantity)"},
      {branch:"Engine variant?", opts:{
        "O-540 (carbureted)":[
          {c:"Carb heat", r:"FULL ON – expect initial roughness as ice clears, leave on until smooth, then COLD (partial heat not recommended)"},
        ],
        "IO-540 (injected)":[
          {c:"Alternate induction air", r:"OPEN / CHECK (if fitted) – suspect induction icing or filter blockage"},
        ]
      }},
      {branch:"Running smooth?", opts:{
        "Yes":[{c:"Fuel boost pump", r:"OFF when pressure stable (ON again if fluctuation returns)"}],
        "No":[
          {c:"Magnetos", r:"CHECK L / R / BOTH, select smoothest"},
          {defer:"Rough running engine – land as soon as practical, boost pump on, be ready for engine failure."},
        ]
      }},
    ]},
    {id:"prop-over", name:"Propeller Overspeed", cond:"RPM above red line (approx 2,400 RPM – verify) and not responding to propeller control", items:[
      {c:"Throttle", r:"RETARD"},
      {c:"Oil pressure", r:"CHECK"},
      {c:"Propeller control", r:"DECREASE RPM (full aft; reset if governor responds)"},
      {c:"Airspeed", r:"REDUCE"},
      {c:"Throttle", r:"AS REQUIRED to keep RPM below red line"},
      {defer:"Propeller governor failed – RPM controlled with throttle and airspeed only; land as soon as practical."},
    ]},
    {id:"aux-transfer", name:"Aux Fuel Will Not Transfer / Fuel Imbalance", cond:"Main not filling with transfer switch on, aux gauge not falling, or heavy wing", items:[
      {c:"Transfer pump circuit breaker", r:"CHECK IN"},
      {c:"Main tank quantity", r:"CHECK – transfer stops when the 20 gal main is full; wait for room"},
      {c:"Other side transfer switch", r:"TRY (if that aux has fuel)"},
      {branch:"Transfer working?", opts:{
        "Yes":[{c:"Fuel plan", r:"REVISE – keep mains balanced, select heavy side"}],
        "No":[
          {c:"Usable fuel", r:"RECOMPUTE on MAINS ONLY (approx 40 gal) – aux fuel is unusable"},
          {c:"Fuel selector", r:"HEAVY SIDE to reduce imbalance"},
          {defer:"Aux fuel unusable – endurance on main tanks only; divert if required, expect lateral imbalance."},
        ]
      }},
    ]},
    {id:"flap-fail", name:"Flap Handle Jammed / Asymmetry", cond:"Manual flap handle will not move or flaps asymmetric", items:[
      {c:"Airspeed", r:"REDUCE below approx 80 KIAS (less load on the handle)"},
      {c:"Flap handle", r:"RETRY – positive detent engagement, do not force"},
      {branch:"Flaps operable?", opts:{
        "Yes":[{c:"Flap setting", r:"AS REQUIRED"}],
        "No – stuck at 0° or -7°":[
          {c:"Approach", r:"FLAPS 0° – 70–75 KIAS, wheel landing recommended, longer runway"},
          {defer:"Flaps inoperative – flaps-up landing at 70–75 KIAS, increased landing distance."},
        ],
        "No – stuck down / asymmetric":[
          {c:"Airspeed", r:"KEEP BELOW Vfe for the position (80 KIAS if 48°); aileron / rudder to hold wings level"},
          {c:"Approach", r:"POWER-ON, shallow, minimal bank"},
          {defer:"Flaps stuck extended – speed limited to Vfe, possible roll tendency; land as soon as practical."},
        ]
      }},
    ]},
    {id:"door-open", name:"Door Open in Flight", cond:"Front door or rear cargo door unlatched", items:[
      {c:"Airspeed", r:"REDUCE (approx 75–80 KIAS)"},
      {c:"Aircraft", r:"CONTROL – open door has little effect on handling"},
      {branch:"Which door?", opts:{
        "Front door (left or right)":[
          {c:"Window / vents", r:"OPEN (equalise pressure), then door CLOSE & LATCH"},
        ],
        "Rear cargo door":[
          {c:"Door", r:"LEAVE – do not attempt to close in flight; passengers belted, away from door"},
          {c:"Loose articles", r:"SECURE"},
          {defer:"Rear cargo door open – reduced airspeed, land as soon as practical."},
        ]
      }},
    ]},
    {id:"icing", name:"Inadvertent Icing / Vacuum Failure", cond:"Airframe ice, or suction low / gyros unreliable", items:[
      {c:"Pitot heat", r:"ON"},
      {c:"Exit icing conditions", r:"TURN BACK / CHANGE ALTITUDE"},
      {c:"Cabin heat / windshield defrost", r:"FULL ON"},
      {c:"Carb heat (O-540)", r:"ON / alternate air (IO-540) OPEN"},
      {c:"Power / propeller RPM", r:"INCREASE to minimise propeller ice"},
      {c:"Suction gauge", r:"CHECK – if low, disregard attitude / heading indicators, partial panel, exit IMC"},
      {c:"Airspeed on approach", r:"INCREASE (flaps 0°–24° max with residual ice; wheel landing)"},
      {defer:"Residual airframe ice / gyro loss – flaps 0°–24° landing, approach 10 KIAS faster, VMC only."},
    ]},
  ]
});
