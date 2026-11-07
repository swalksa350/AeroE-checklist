/* Pilatus PC-12/45 – checklist data.
   Prototype content. Verify against the operator's approved checklist and the POH/AFM. */
window.AIRCRAFT = window.AIRCRAFT || [];
window.AIRCRAFT.push({
  id: "pc12-45",
  maker: "Pilatus",
  model: "PC-12/45",
  short: "PC12/45",
  category: "Turboprop",
  engine: "Pratt & Whitney PT6A-67B, 1,200 shp (flat-rated)",
  seats: "1–2 crew + 6 to 9",
  basis: "Typical legacy PC-12/45 (1996–2005, PT6A-67B, 9,920 lb, 5.75 psi cabin, Bendix/King analogue panel with EFIS-40 and KFC 325, hydraulic gear) AFM procedures; no onboard electronic checklist. Battery 2 on later serials. Torque in psi as displayed; limits marked 'verify' should be checked against the aircraft's AFM.",
  vspeeds: [
    {k:"Vr", v:"80–85 KIAS (flaps 15, by weight)"},
    {k:"Vx", v:"110 KIAS"},
    {k:"Vy", v:"120 KIAS (flaps UP)"},
    {k:"Best glide", v:"approx 110–115 KIAS, prop feathered (approx 2.5 nm per 1,000 ft)"},
    {k:"Vfe", v:"165 / 130 / 120 KIAS (15° / 30° / 40°)"},
    {k:"Vlo", v:"180 KIAS extend / 180 KIAS retract"},
    {k:"Vle", v:"180 KIAS"},
    {k:"Va", v:"165 KIAS (9,920 lb)"},
    {k:"Vmo", v:"236 KIAS"},
    {k:"Vs / Vso", v:"approx 85–90 / 64–68 KIAS (9,920 lb, flaps 0 / 40 – verify)"},
    {k:"Vref", v:"80–90 KIAS (flaps 40, by weight; approx +10 KIAS flaps 15)"},
    {k:"Min icing speed", v:"approx 130 KIAS flaps UP (verify AFM placard)"}
  ],

  normal: [
    {id:"pre", name:"Before Start", items:[
      {c:"Preflight inspection", r:"COMPLETE (covers, engine inlet plugs, chocks removed; inertial separator / gear doors / boots inspected)"},
      {c:"Weight & balance / takeoff data", r:"COMPUTED (flap 15, Vr 80–85, Vx 110, Vy 120, torque 44.3 psi, field length)"},
      {c:"Passenger briefing", r:"COMPLETE (belts, airstair / cargo door, overwing exit, oxygen drop-out masks, no smoking)"},
      {c:"Seats, belts, shoulder harnesses", r:"ADJUST & LOCK"},
      {c:"Control lock", r:"REMOVED & STOWED"},
      {c:"Cabin door / cargo door", r:"CLOSED & LOCKED (handles flush, CAWS door lights out)"},
      {c:"Parking brake", r:"SET"},
      {c:"Landing gear selector", r:"DOWN"},
      {c:"Power control lever (PCL)", r:"IDLE (out of beta / reverse)"},
      {c:"Manual override (MOR) lever", r:"FULL AFT (OFF / stowed)"},
      {c:"Condition lever", r:"CUTOFF"},
      {c:"Fuel emergency shutoff (firewall valve)", r:"OPEN (guard closed)"},
      {c:"Cabin pressurisation", r:"NORMAL (not DUMP); ECS / bleed air OFF for start"},
      {c:"Avionics 1 / 2, inverters", r:"OFF"},
      {c:"Generator 1 / Generator 2 switches", r:"ON"},
      {c:"Bus tie", r:"NORMAL / closed"},
      {c:"Battery 1 (and Battery 2 if fitted)", r:"ON – voltage CHECK (approx 24–25 V; 24 V minimum for a battery start – verify)"},
      {c:"CAWS", r:"TEST (all annunciators, master warning / caution, aural tones) – then LAMP TEST"},
      {c:"Annunciators", r:"CHECK – only expected lights (GEN 1 / GEN 2 OFF, INVERTER, PROP LOW PITCH etc.)"},
      {c:"Fuel quantity", r:"CHECK L / R (approx 201 US gal usable per wing), balanced within 26 US gal"},
      {c:"Fuel pumps L / R", r:"AUTO"},
      {c:"Oxygen", r:"CHECK (bottle pressure, crew masks, passenger drop-out AUTO)"},
      {c:"Trims (pitch / rudder / aileron)", r:"CHECK indicators – SET for takeoff"},
      {c:"Beacon", r:"ON"},
    ]},
    {id:"start", name:"Engine Start", items:[
      {branch:"Power source for start?", opts:{
        "Battery":[
          {note:"Battery start: 24 V minimum. A weak battery means a hot, slow start – abort if Ng hangs below 13% or ITT rises rapidly.", kind:"caution"},
        ],
        "External power":[
          {c:"External power", r:"CONNECTED – EXT PWR switch ON, EXT PWR annunciator, bus approx 28 V"},
        ]
      }},
      {c:"Propeller area", r:"CLEAR"},
      {c:"Ignition", r:"AUTO"},
      {c:"Fuel pumps L / R", r:"AUTO (L / R FUEL PUMP advisories ON for start)"},
      {c:"Starter", r:"ON – STARTER annunciator ON; limits 30 sec ON / 1 min OFF, 30 min cool after 3 cycles"},
      {c:"Oil pressure", r:"RISING"},
      {c:"Ng", r:"13% MINIMUM, stable"},
      {c:"Condition lever", r:"GROUND IDLE"},
      {c:"ITT / Ng", r:"LIGHT-OFF within 10 sec, Ng accelerating; MONITOR ITT (1,000°C max for 5 sec)"},
      {note:"Abort start if no light-off within 10 sec, ITT approaches 1,000°C, or Ng hangs: condition lever CUTOFF, keep motoring until ITT falls, then starter OFF.", kind:"warn"},
      {c:"Starter", r:"AUTOMATIC CUT-OUT at approx 50% Ng (STARTER light out) – if not, starter OFF"},
      {c:"Ng – ground idle", r:"STABILISED (approx 60–66% – verify)"},
      {c:"Oil pressure", r:"CHECK (green; 90–135 psi normal, 60 psi min at idle – verify)"},
      {c:"Ignition", r:"AUTO (IGNITION light out)"},
      {c:"Generator 1", r:"ON LINE – GEN 1 OFF caution out, load / volts CHECK"},
      {c:"Generator 2", r:"ON LINE – GEN 2 OFF caution out, bus tie closed, approx 28 V"},
      {c:"External power", r:"OFF & DISCONNECTED (if used; EXT PWR light out)"},
      {c:"Inverter 1 / 2", r:"ON – INVERTER caution out; select each in turn, leave one ON"},
      {c:"Avionics 1 / 2", r:"ON"},
      {c:"ECS / bleed air", r:"ON (as required for cabin heating / cooling)"},
      {c:"Fuel pumps L / R", r:"AUTO (FUEL PUMP advisories out, FUEL PRESS out)"},
      {c:"Engine instruments / CAWS", r:"CHECK (ITT, torque, Ng, Np approx 1,000 RPM, oil pressure / temperature, fuel flow; no red lights)"},
    ]},
    {id:"taxi", name:"Before Taxi", items:[
      {c:"EFIS-40 / flight instruments / avionics", r:"CHECK & SET (ADI / EHSI no flags, standby instruments, altimeters SET, nav / com / GPS loaded)"},
      {c:"Stall warning / stick pusher", r:"TEST – hold test switch: shaker, then pusher pulse (column moves forward); PUSHER light sequence correct"},
      {c:"Pusher interrupt (control wheel)", r:"PRESS & HOLD during test – pusher interrupted"},
      {c:"Electric trims", r:"TEST (pitch both halves of split switch, rudder, aileron) – trim interrupt / A/P disconnect stops motion; SET for takeoff"},
      {c:"Autopilot (KFC 325)", r:"PREFLIGHT TEST complete (PFT) – ENGAGE, check disconnect (wheel button, trim); OFF"},
      {c:"Yaw damper", r:"OFF"},
      {c:"Pitot / static heat 1 & 2, stall warning / probe heat", r:"ON momentarily – cautions OUT, ammeter rise; then AS REQUIRED"},
      {c:"Propeller deice", r:"ON – PROP DE ICE light / ammeter CHECK; then AS REQUIRED"},
      {c:"Deice boots", r:"1 CYCLE – boots inflate / deflate, BOOTS lights; then OFF"},
      {c:"Windshield heat L / R", r:"ON – CHECK; then AS REQUIRED"},
      {c:"Inertial separator", r:"OPEN – INERT SEP OPEN advisory (approx 15 sec); then AS REQUIRED (OPEN for icing, contaminated or gravel surfaces)"},
      {c:"Ice light", r:"CHECK (night / icing)"},
      {c:"Flaps", r:"CYCLE 0 – 15 – 30 – 40, indicator CHECK; SET 15 for takeoff"},
      {c:"Cabin pressurisation controller", r:"SET (cruise altitude, rate as required); cabin NORMAL"},
      {c:"Brakes", r:"CHECK on initial roll (PCL into beta for speed control)"},
      {c:"Flight instruments", r:"CHECK in turns (EHSI / compass, turn coordinator)"},
    ]},
    {id:"runup", name:"Before Takeoff", items:[
      {c:"Parking brake", r:"SET"},
      {c:"Flight controls", r:"FREE & CORRECT"},
      {c:"Propeller overspeed governor", r:"TEST – hold PROP OVSP TEST, PCL advance: Np stabilises below 1,700 RPM at the test value (approx 1,500–1,600 RPM – verify); release, PCL IDLE"},
      {c:"Manual override (MOR)", r:"CHECK – advance slowly: Ng / ITT increase, then FULL AFT; PCL IDLE"},
      {c:"Engine instruments", r:"CHECK (oil temp in green, oil pressure 90–135 psi, ITT, Ng, torque, fuel flow)"},
      {c:"Fuel", r:"CHECK quantity / balance, pumps AUTO, FUEL PRESS out, emergency shutoff OPEN"},
      {c:"Electrical", r:"CHECK (GEN 1 / GEN 2 on line, loads within limits, bus tie closed, approx 28 V, inverter ON)"},
      {c:"Pressurisation / ECS", r:"Bleed air ON, ECS AUTO, cabin NORMAL, controller SET"},
      {c:"Condition lever", r:"FLIGHT IDLE"},
      {c:"Flaps", r:"15 – indicating"},
      {c:"Trims", r:"SET for takeoff (pitch per loading; rudder / aileron neutral)"},
      {c:"Ice protection", r:"AS REQUIRED (inertial separator OPEN below 5°C in visible moisture / contaminated runway – reduced torque available; pitot / static / probe heat ON)"},
      {c:"Yaw damper / autopilot", r:"OFF"},
      {c:"Oxygen", r:"CREW MASKS available; passenger system AUTO"},
      {c:"Lights", r:"AS REQUIRED"},
      {c:"Transponder", r:"ALT"},
      {c:"CAWS / doors", r:"NO RED OR AMBER; CABIN DOOR / CARGO DOOR lights out"},
      {c:"Takeoff briefing", r:"COMPLETE (abort before Vr 80–85; engine failure after takeoff: condition lever CUTOFF – feather, flaps, land ahead; limits 44.3 psi / 800°C / 1,700 RPM)"},
    ]},
    {id:"climb", name:"After Takeoff / Climb", items:[
      {c:"Landing gear", r:"UP (positive rate, below 180 KIAS) – 3 green out, gear lights out, HYDR pump stops"},
      {c:"Flaps", r:"UP (above 110 KIAS, clear of obstacles)"},
      {c:"Climb power", r:"SET (torque 36.9 psi max climb, ITT 760°C max, Np 1,700 RPM – verify)"},
      {c:"Airspeed", r:"120 KIAS (Vy) / 140–160 KIAS cruise climb"},
      {c:"Yaw damper", r:"ON"},
      {c:"Autopilot", r:"AS REQUIRED"},
      {c:"Pressurisation", r:"CHECK (cabin climbing per rate, differential increasing, 5.75 psi max)"},
      {c:"Ice protection / inertial separator", r:"AS REQUIRED (CLOSED when clear of icing / contaminated surfaces)"},
      {c:"Fuel pumps", r:"AUTO – FUEL PUMP advisories out"},
      {c:"Engine instruments / lights", r:"CHECK; landing / taxi lights OFF"},
    ]},
    {id:"cruise", name:"Cruise", items:[
      {c:"Cruise power", r:"SET (torque per chart, 36.9 psi max, ITT 760°C max, 1,700 RPM)"},
      {c:"Fuel", r:"CHECK quantity L / R; automatic balancing (heavy-side pump runs); imbalance within 26 US gal – balance manually with heavy-side pump ON if required"},
      {c:"Pressurisation", r:"CHECK (cabin altitude, rate, differential 5.75 psi max; CAB PRESS warning at 10,000 ft cabin)"},
      {c:"Oxygen", r:"CHECK (pressure, masks available)"},
      {c:"Engine instruments", r:"CHECK (oil 90–135 psi / temperature in green, ITT, Ng 104% max)"},
      {c:"Electrical", r:"CHECK (both generators on line, loads balanced, 28 V)"},
      {c:"Ice protection", r:"AS REQUIRED (inertial separator OPEN before entering icing; approx 130 KIAS minimum in icing; pusher ICE MODE with boots selected)"},
      {c:"Altimeters / OAT", r:"CHECK; cruise altitude vs cabin"},
    ]},
    {id:"desc", name:"Descent", items:[
      {c:"Altimeters", r:"SET"},
      {c:"Cabin pressurisation controller", r:"SET landing field elevation (rate approx 500 fpm or as required)"},
      {c:"ECS / bleed air", r:"ON – cabin temperature as required"},
      {c:"Ice protection / inertial separator", r:"AS REQUIRED (inertial separator OPEN for icing or contaminated runway)"},
      {c:"Windshield heat", r:"AS REQUIRED"},
      {c:"Fuel", r:"CHECK quantity / balance, pumps AUTO"},
      {c:"Approach briefing", r:"COMPLETE (Vref 80–90 flaps 40; flaps 15 / 30 / 40 below 165 / 130 / 120; gear below 180; missed approach)"},
      {c:"Seat belts / passenger briefing", r:"SECURE"},
    ]},
    {id:"land", name:"Before Landing", items:[
      {c:"Pressurisation", r:"CHECK (cabin at or above field elevation, differential approaching zero)"},
      {c:"Flaps", r:"15 (below 165 KIAS)"},
      {c:"Landing gear", r:"DOWN (below 180 KIAS) – 3 GREEN, gear unsafe light out, HYDR pump stops"},
      {c:"Yaw damper / autopilot", r:"OFF"},
      {c:"Condition lever", r:"FLIGHT IDLE"},
      {c:"Fuel pumps", r:"AUTO"},
      {c:"Ice protection", r:"AS REQUIRED (inertial separator OPEN for contaminated runway)"},
      {c:"Flaps", r:"30 (below 130 KIAS), then 40 (below 120 KIAS) when landing assured"},
      {c:"Airspeed", r:"Vref 80–90 KIAS flaps 40 (by weight); add approx 10 KIAS flaps 15"},
      {c:"Landing lights", r:"ON"},
      {c:"Landing gear", r:"3 GREEN – CONFIRMED on final"},
    ]},
    {id:"after", name:"After Landing", items:[
      {c:"PCL", r:"BETA / REVERSE as required (lift gate) – out of reverse by approx 40 KIAS"},
      {c:"Flaps", r:"UP"},
      {c:"Condition lever", r:"GROUND IDLE"},
      {c:"Trims", r:"RESET for takeoff"},
      {c:"Ice protection", r:"OFF (pitot / static / probe heat, prop deice, boots, windshield heat)"},
      {c:"Inertial separator", r:"AS REQUIRED (OPEN for taxi on contaminated / gravel surfaces)"},
      {c:"Transponder / lights", r:"STBY / AS REQUIRED"},
    ]},
    {id:"shut", name:"Shutdown", items:[
      {c:"Parking brake", r:"SET"},
      {c:"Avionics 1 / 2", r:"OFF"},
      {c:"ECS / bleed air", r:"OFF"},
      {c:"Ice protection / electrical load", r:"OFF"},
      {c:"Inverters", r:"OFF"},
      {c:"ITT", r:"STABILISED – 1 minute at GROUND IDLE"},
      {c:"Condition lever", r:"CUTOFF (propeller feathers during run-down)"},
      {c:"ITT / Ng", r:"MONITOR during run-down (no ITT rise)"},
      {c:"Fuel pumps L / R", r:"OFF"},
      {c:"Oxygen", r:"OFF"},
      {c:"Exterior lights / beacon", r:"OFF"},
      {c:"Battery 1 / 2", r:"OFF (after propeller stopped)"},
      {c:"Control lock", r:"INSTALL"},
      {c:"Inlet plugs / covers / chocks", r:"AS REQUIRED"},
    ]},
  ],
  emergency: [
    {id:"eng-fail-to", name:"Engine Failure During Takeoff Roll", cond:"On the runway, below Vr 80–85 KIAS", items:[
      {c:"PCL", r:"IDLE, then BETA / REVERSE as available", mem:true},
      {c:"Brakes", r:"MAXIMUM – stop straight ahead", mem:true},
      {c:"Condition lever", r:"CUTOFF (if stopping / fire suspected)"},
      {c:"Fuel emergency shutoff", r:"CLOSED (if fire suspected)"},
      {c:"Battery 1 / 2", r:"OFF after stop (if evacuating)"},
      {note:"Reverse is unavailable with the engine failed – plan on brakes only. Always stop below Vr.", kind:"warn"},
    ]},
    {id:"eng-fail-after-to", name:"Engine Failure After Takeoff", cond:"Airborne, insufficient runway remaining / altitude for a restart", land:"LAND IMMEDIATELY", items:[
      {c:"Condition lever", r:"CUTOFF (propeller FEATHERS)", mem:true},
      {c:"Airspeed", r:"110 KIAS flaps UP / 95–100 KIAS flaps 15 (minimum Vref +10)", mem:true},
      {c:"Flaps", r:"AS REQUIRED for the landing area (40 on short final if possible)", mem:true},
      {c:"Landing gear", r:"AS REQUIRED (DOWN for a prepared surface; UP for soft ground / water)", mem:true},
      {c:"Land", r:"STRAIGHT AHEAD – small heading changes only", mem:true},
      {c:"Fuel emergency shutoff", r:"CLOSED"},
      {c:"Fuel pumps", r:"OFF"},
      {c:"Cabin pressurisation", r:"DUMP"},
      {c:"Battery 1 / 2 / generators", r:"OFF before touchdown (when no longer required)"},
      {c:"Doors", r:"UNLATCHED before touchdown; brace passengers"},
      {note:"Do not attempt a turn back at low altitude. Feathered glide: approx 2.5 nm per 1,000 ft.", kind:"warn"},
    ]},
    {id:"eng-fail-flt", name:"Engine Failure in Flight", cond:"Loss of power with altitude available (torque / Ng / ITT dropping, PROP LOW PITCH)", land:"LAND AS SOON AS POSSIBLE", items:[
      {c:"Airspeed", r:"110–115 KIAS (best glide, approx 2.5 nm per 1,000 ft)", mem:true},
      {c:"PCL", r:"IDLE", mem:true},
      {c:"Condition lever", r:"CUTOFF (propeller FEATHERS)", mem:true},
      {c:"Landing site", r:"SELECT – turn toward it; ATC advise", mem:true},
      {c:"Cause", r:"CHECK (fuel quantity, FUEL PRESS, fuel pumps ON, emergency shutoff OPEN, ignition AUTO)"},
      {branch:"Restart practicable (no fire / mechanical damage, altitude and time available)?", opts:{
        "Yes – starter-assisted air start":[
          {c:"Airspeed / altitude", r:"WITHIN air start envelope (below approx 20,000 ft, 100–180 KIAS – verify)"},
          {c:"Electrical load", r:"REDUCE (ECS / bleed OFF, non-essential OFF – battery only)"},
          {c:"Condition lever", r:"CUTOFF – PCL IDLE"},
          {c:"Fuel emergency shutoff", r:"OPEN; fuel pumps ON"},
          {c:"Ignition", r:"ON"},
          {c:"Starter", r:"ON (observe limits: 30 sec ON / 1 min OFF)"},
          {c:"Ng", r:"13% MINIMUM"},
          {c:"Condition lever", r:"GROUND IDLE"},
          {c:"ITT", r:"LIGHT-OFF within 10 sec; MONITOR (1,000°C max 5 sec) – abort to CUTOFF if exceeded"},
          {c:"Starter", r:"CUT-OUT at approx 50% Ng (STARTER light out)"},
          {branch:"Engine restarted?", opts:{
            "Yes":[
              {c:"Condition lever", r:"FLIGHT IDLE after Ng stable; ignition AUTO"},
              {c:"Oil pressure / ITT / torque", r:"CHECK – power AS REQUIRED (gently)"},
              {c:"Generators / bleed air / fuel pumps", r:"CHECK on line / AUTO"},
              {defer:"Engine restarted after in-flight failure – land as soon as possible, maintenance investigation required."},
            ],
            "No":[
              {c:"Condition lever", r:"CUTOFF; starter OFF; ignition OFF"},
              {note:"Do not attempt further starts. Continue with the forced landing.", kind:"warn"},
            ]
          }},
        ],
        "No – forced landing":[]
      }},
      {note:"Forced landing without power (propeller feathered):", kind:"warn"},
      {c:"Passengers", r:"BRIEF – belts tight, brace; ATC / 7700"},
      {c:"Cabin pressurisation", r:"DUMP (equalise before touchdown)"},
      {c:"Fuel emergency shutoff", r:"CLOSED; fuel pumps OFF"},
      {branch:"Landing surface?", opts:{
        "Prepared / firm – gear DOWN":[
          {c:"Landing gear", r:"DOWN (below 180 KIAS; emergency hand pump if hydraulic pump unpowered – approx 25–40 strokes)"},
          {c:"Flaps", r:"15 downwind, 40 on final when landing assured"},
          {c:"Airspeed", r:"approx 100 KIAS on base, Vref 85–90 KIAS on final"},
        ],
        "Soft / water / unknown – gear UP":[
          {c:"Landing gear", r:"UP"},
          {c:"Flaps", r:"40 on final"},
          {c:"Airspeed", r:"Vref 85–90 KIAS; minimum sink at touchdown"},
        ]
      }},
      {c:"Battery 1 / 2 / generators", r:"OFF before touchdown (when no longer required)"},
      {c:"Doors", r:"UNLATCHED before touchdown"},
      {c:"Evacuation", r:"AFTER STOPPING – emergency exits, upwind"},
    ]},
    {id:"eng-fire-flt", name:"Engine Fire in Flight", cond:"FIRE warning (CAWS) and/or smoke, flames, ITT rise", land:"LAND IMMEDIATELY", items:[
      {c:"Condition lever", r:"CUTOFF (propeller FEATHERS)", mem:true},
      {c:"Fuel emergency shutoff", r:"CLOSED", mem:true},
      {c:"Fuel pumps", r:"OFF", mem:true},
      {c:"ECS / bleed air", r:"OFF (keep engine air out of the cabin)", mem:true},
      {c:"Cabin pressurisation", r:"DUMP (when below 10,000 ft cabin) – ram air / vents as required"},
      {c:"Oxygen masks", r:"DON 100% if smoke in cabin"},
      {c:"Airspeed", r:"110–115 KIAS (increase if fire persists – sideslip to keep flames away)"},
      {c:"Forced landing", r:"EXECUTE – Engine Failure in Flight forced-landing items; do not attempt restart"},
      {note:"No engine fire extinguisher is installed. Land on the nearest suitable surface; evacuate immediately after stopping.", kind:"warn"},
    ]},
    {id:"eng-fire-start", name:"Engine Fire on the Ground / During Start", cond:"FIRE warning, flames, or ITT rising rapidly past 1,000°C during start", items:[
      {c:"Condition lever", r:"CUTOFF", mem:true},
      {c:"Fuel emergency shutoff", r:"CLOSED", mem:true},
      {c:"Starter", r:"CONTINUE MOTORING to purge fuel / lower ITT (observe starter limits)", mem:true},
      {c:"Fuel pumps", r:"OFF"},
      {branch:"Fire out?", opts:{
        "Yes":[
          {c:"Starter", r:"OFF"},
          {c:"Battery 1 / 2 / external power", r:"OFF / DISCONNECTED"},
          {note:"Do not restart. Maintenance inspection required (hot section, inertial separator, cowling).", kind:"caution"},
        ],
        "No":[
          {c:"Starter", r:"OFF"},
          {c:"Battery 1 / 2", r:"OFF"},
          {c:"Aircraft", r:"EVACUATE through the cabin / cargo door, away from the fire; ground extinguisher at the engine inlet / exhaust"},
        ]
      }},
    ]},
    {id:"emer-desc", name:"Emergency Descent", items:[
      {c:"PCL", r:"IDLE", mem:true},
      {c:"Condition lever", r:"FLIGHT IDLE (propeller MAX RPM – drag)", mem:true},
      {branch:"Descent configuration?", opts:{
        "Gear DOWN (maximum rate, below 180 KIAS)":[
          {c:"Landing gear", r:"DOWN (below 180 KIAS)", mem:true},
          {c:"Flaps", r:"UP", mem:true},
          {c:"Airspeed", r:"180 KIAS (Vle)", mem:true},
        ],
        "Clean (smooth air, Vmo)":[
          {c:"Landing gear / flaps", r:"UP", mem:true},
          {c:"Airspeed", r:"236 KIAS Vmo (165 KIAS Va in turbulence)", mem:true},
        ]
      }},
      {c:"Autopilot / yaw damper", r:"OFF (or AP in VS / IAS mode if preferred)"},
      {c:"Oxygen", r:"CREW MASKS ON above 10,000 ft cabin; passenger oxygen as required"},
      {c:"ATC", r:"ADVISE – emergency descent, 7700 as required"},
      {c:"Level-off", r:"10,000 ft or MEA – power restored smoothly, gear UP below 180 KIAS if continuing"},
    ]},
    {id:"rapid-decomp", name:"Rapid Decompression / Cabin Altitude High", cond:"CAB PRESS warning (cabin above 10,000 ft), loud decompression, or passenger masks dropped (approx 13,500 ft cabin)", land:"LAND AS SOON AS PRACTICAL", items:[
      {c:"Crew oxygen masks", r:"DON – 100%; mic to OXY MASK", mem:true},
      {c:"Passenger oxygen", r:"ON / MANUAL DEPLOY if masks have not dropped", mem:true},
      {c:"Emergency descent", r:"INITIATE to 10,000 ft or MEA", mem:true},
      {c:"Crew / passenger communication", r:"ESTABLISH; check passengers on oxygen"},
      {c:"Cabin pressurisation", r:"CHECK (switch NORMAL not DUMP, bleed air ON, ECS AUTO, controller setting) – see Pressurisation Fault"},
      {c:"ATC", r:"ADVISE"},
      {branch:"Cabin pressurisation recovered?", opts:{
        "Yes":[{c:"Cabin altitude", r:"MONITOR – stay at an altitude the cabin can hold below 10,000 ft"},{defer:"Pressurisation fault – fly low, oxygen used, maintenance inspection."}],
        "No":[{c:"Altitude", r:"REMAIN at or below 10,000 ft (oxygen supply as required)"},{defer:"Unpressurised – remain at or below 10,000 ft, oxygen quantity limited."}]
      }},
    ]},
    {id:"smoke-fire", name:"Smoke / Fumes / Electrical Fire", land:"LAND AS SOON AS POSSIBLE", items:[
      {c:"Crew oxygen masks", r:"DON – 100% / EMER; mic to OXY MASK", mem:true},
      {c:"Smoke goggles", r:"ON (if carried)", mem:true},
      {branch:"Source of smoke?", opts:{
        "Electrical":[
          {c:"Affected equipment / circuit breaker", r:"OFF / PULL (if identified)"},
          {branch:"Source identified and smoke clearing?", opts:{
            "Yes":[{defer:"Electrical fire – affected circuit isolated, equipment unavailable."}],
            "No":[
              {c:"Generator 1 / 2", r:"OFF (battery power only)"},
              {c:"Non-essential bus / Avionics 2", r:"OFF – essential bus loads only"},
              {c:"Hand fire extinguisher", r:"USE as required; ventilate afterwards"},
              {c:"Electrical equipment", r:"RESTORE one item at a time, essential only, checking for smoke; generators back ON one at a time if clear"},
              {note:"Landing gear is electro-hydraulic and flaps are electric: on battery only, extend the gear early (emergency hand pump available) and plan a flaps-up or flaps 15 landing.", kind:"caution"},
              {defer:"Electrical fire – battery / essential bus only, limited endurance (approx 30 min), early or manual gear extension, reduced flap landing."},
            ]
          }},
        ],
        "ECS / bleed air (oily fumes, haze from vents)":[
          {c:"Bleed air", r:"OFF; ECS OFF"},
          {c:"Cabin pressurisation", r:"Cabin will depressurise – descend to keep cabin below 10,000 ft"},
          {c:"Ram air / vents", r:"OPEN to ventilate (below 10,000 ft)"},
          {defer:"Bleed air isolated – unpressurised, remain at or below 10,000 ft, maintenance (engine oil seal) inspection."},
        ],
        "Unknown":[
          {c:"Both isolations", r:"APPLY – electrical load shed and bleed air OFF"},
        ]
      }},
      {note:"Smoke / fume evacuation:", kind:"warn"},
      {c:"Descent", r:"TO 10,000 ft or below if practicable"},
      {c:"Cabin pressurisation", r:"DUMP (below 10,000 ft) to ventilate"},
      {c:"Fresh air / ram air", r:"MAXIMUM (bleed air ON if not the source)"},
      {c:"Passenger oxygen", r:"CONSIDER (masks do not protect from smoke)"},
    ]},
    {id:"pusher", name:"Stick Pusher / Stall Warning Malfunction", cond:"PUSHER caution, uncommanded pusher activation, or shaker / pusher not working as expected", land:"LAND AS SOON AS PRACTICAL", items:[
      {c:"Pusher interrupt (control wheel)", r:"PRESS & HOLD (uncommanded push)", mem:true},
      {c:"Control column", r:"HOLD / RECOVER – airspeed above 1.3 Vs", mem:true},
      {c:"Stick pusher / stall warning circuit breaker", r:"PULL (if uncommanded activation persists)"},
      {c:"Autopilot", r:"OFF if trim / pitch excursion"},
      {branch:"Pusher system condition?", opts:{
        "Uncommanded activation – pusher disabled":[
          {c:"Airspeed", r:"MAINTAIN Vref +10 KIAS minimum on approach; no steep turns at low speed"},
          {c:"Icing conditions", r:"AVOID (no pusher ICE MODE protection)"},
          {defer:"Stick pusher disabled – no stall protection; Vref +10 KIAS, avoid icing, flaps 15 or 40 as briefed."},
        ],
        "PUSHER caution – system failed, no activation":[
          {c:"Stall warning", r:"ASSUME INOPERATIVE – fly by airspeed; avoid icing"},
          {defer:"Stall warning / pusher inoperative – Vref +10 KIAS, avoid icing conditions."},
        ]
      }},
    ]},
    {id:"trim-runaway", name:"Trim Runaway", cond:"Uncommanded pitch / rudder / aileron trim movement, A/P TRIM warning", items:[
      {c:"Control column / rudder", r:"HOLD against the trim", mem:true},
      {c:"Trim interrupt / A/P disconnect (control wheel)", r:"PRESS & HOLD", mem:true},
      {c:"Autopilot", r:"OFF", mem:true},
      {c:"Affected trim circuit breaker (PITCH / RUDDER / AILERON TRIM)", r:"PULL"},
      {c:"Trim interrupt", r:"RELEASE – check trim stopped"},
      {branch:"Affected axis?", opts:{
        "Pitch":[
          {c:"Manual pitch trim wheel", r:"TRIM to relieve forces (electric pitch trim unavailable)"},
          {c:"Airspeed", r:"Reduce to approach speeds early; avoid large configuration changes"},
          {defer:"Electric pitch trim inoperative – manual trim wheel only, no autopilot; approach briefed."},
        ],
        "Rudder / aileron":[
          {c:"Trim", r:"LEAVE as is – counter with controls; power / speed to minimise forces"},
          {defer:"Rudder / aileron trim inoperative – out-of-trim landing, no autopilot."},
        ]
      }},
    ]},
    {id:"gear-manual", name:"Landing Gear Emergency Extension", cond:"Gear does not extend normally / HYDR caution / no three green", items:[
      {c:"Airspeed", r:"BELOW 180 KIAS (approx 130 KIAS eases pumping)"},
      {c:"Landing gear hydraulic pump circuit breaker", r:"PULL"},
      {c:"Landing gear selector", r:"DOWN"},
      {c:"Emergency gear extension hand pump (between seats)", r:"HANDLE OUT – PUMP until 3 GREEN, then until firm resistance (approx 25–40 strokes – verify)"},
      {c:"Landing gear indicator", r:"3 GREEN, gear unsafe light out"},
      {note:"Do not reset the hydraulic pump circuit breaker or move the gear selector in flight after an emergency extension. Leave the gear down.", kind:"warn"},
      {branch:"3 green obtained?", opts:{
        "Yes":[{defer:"Gear extended by hand pump – do not retract; normal landing, gear system inspection required."}],
        "No":[{note:"Use the Gear-Up / Gear Unsafe Landing procedure.", kind:"warn"},{defer:"Gear unsafe – gear-up / partial-gear landing, emergency services, evacuate after stopping."}]
      }},
    ]},
    {id:"gear-up-ldg", name:"Gear-Up / Gear Unsafe Landing", cond:"Gear cannot be extended or indication unsafe after emergency extension", items:[
      {c:"Runway", r:"LONGEST available, into wind; emergency services advised; burn off fuel if practical"},
      {c:"Passengers", r:"BRIEF – belts tight, brace position, exits"},
      {c:"Landing gear", r:"UP (or as it is – do not recycle) for a full gear-up landing"},
      {c:"Flaps", r:"40 (final approach)"},
      {c:"Airspeed", r:"Vref 80–90 KIAS – minimum speed at touchdown, shallow flare"},
      {c:"Cabin pressurisation", r:"DUMP; ECS / bleed air OFF"},
      {c:"Doors", r:"UNLATCHED on short final"},
      {c:"Condition lever", r:"CUTOFF on short final once landing assured (propeller feathers – reduces prop damage)"},
      {c:"Fuel emergency shutoff / fuel pumps", r:"CLOSED / OFF after touchdown assured"},
      {c:"Battery 1 / 2 / generators", r:"OFF after touchdown"},
      {c:"Evacuation", r:"AFTER STOPPING – upwind, clear of the aircraft"},
      {defer:"Gear-up landing – airfield closure, emergency services, evacuate after stopping."},
    ]},
    {id:"prop-overspeed", name:"Propeller Overspeed / Governor Failure", cond:"Np above 1,700 RPM and not responding (PROP LOW PITCH may show), noise / vibration", items:[
      {c:"PCL", r:"REDUCE to bring Np below 1,700 RPM", mem:true},
      {c:"Airspeed", r:"REDUCE (pitch up)", mem:true},
      {branch:"Np controllable at or below 1,700 RPM (overspeed governor holds approx 1,800 RPM)?", opts:{
        "Yes":[
          {c:"Power", r:"SET to keep Np within limits (1,700 max; 1,870 transient 20 sec – verify)"},
          {c:"Altitude / airspeed", r:"Choose a combination that limits Np; avoid high-speed descents"},
          {defer:"Primary governor fault – Np controlled with PCL and airspeed, land as soon as practical."},
        ],
        "No – Np uncontrollable above transient limit":[
          {c:"Condition lever", r:"CUTOFF (propeller FEATHERS) – Engine Failure in Flight"},
          {defer:"Engine shut down for prop overspeed – forced landing / glide, land as soon as possible."},
        ]
      }},
    ]},
  ],
  abnormal: [
    {id:"gen-fail", name:"Generator Failure (GEN 1 / GEN 2 OFF caution)", cond:"GEN 1 or GEN 2 caution, generator load zero", items:[
      {c:"Affected generator switch", r:"OFF, then RESET, then ON"},
      {branch:"Generator restored?", opts:{
        "Yes":[{c:"Loads / voltage", r:"MONITOR both generators"}],
        "No – one generator failed":[
          {c:"Affected generator switch", r:"OFF"},
          {c:"Electrical load", r:"REDUCE within remaining generator limit (Gen 2 is the smaller unit – shed heavy loads: windshield heat, prop deice, ECS as required)"},
          {c:"Bus tie", r:"CHECK closed – all buses powered"},
          {defer:"One generator inoperative – electrical load limited, land as soon as practical."},
        ],
        "No – both generators failed":[
          {c:"Both generator switches", r:"OFF"},
          {c:"Non-essential bus / Avionics 2", r:"OFF (battery only – approx 30 min endurance, less with Battery 1 only)"},
          {c:"Essential bus", r:"CHECK powered (ESNTL BUS warning out) – essential avionics only"},
          {c:"ECS / bleed air", r:"Cabin heating / pressurisation reduced; descend as required"},
          {c:"Landing gear", r:"PLAN early extension while battery power remains; emergency hand pump available"},
          {c:"Flaps", r:"SELECT early – electric; may be slow or unavailable"},
          {defer:"Both generators failed – battery only; extend gear and flaps early, land as soon as possible."},
        ]
      }},
    ]},
    {id:"inv-fail", name:"Inverter Failure (INVERTER caution)", items:[
      {c:"Inverter switch", r:"SELECT other inverter (1 / 2)"},
      {branch:"INVERTER caution out?", opts:{
        "Yes":[{c:"AC instruments", r:"CHECK (AC-powered flight instruments / EFIS-40 symbol generator)"},{defer:"One inverter inoperative – single AC source, maintenance required."}],
        "No – both failed":[
          {c:"Inverters", r:"OFF"},
          {c:"Flight instruments", r:"USE standby attitude / altimeter / airspeed and EFIS reversionary as available"},
          {c:"AC-powered avionics", r:"NOTE inoperative; autopilot may be unavailable"},
          {defer:"Both inverters failed – AC-powered instruments / autopilot inoperative, standby instruments only."},
        ]
      }},
    ]},
    {id:"oil", name:"Low Oil Pressure / Chip Detector", cond:"OIL PRESS warning / oil pressure below 90 psi above idle, OIL TEMP, or CHIP caution", items:[
      {branch:"Indication?", opts:{
        "Oil pressure low":[
          {c:"Oil pressure / temperature", r:"CROSS-CHECK (60–90 psi at idle only; below 60 psi red – verify)"},
          {branch:"Pressure below 60 psi or temperature rising?", opts:{
            "Yes":[
              {c:"Power", r:"REDUCE to minimum required for flight"},
              {c:"Landing", r:"NEAREST SUITABLE AIRPORT – expect engine seizure / failure; brief Engine Failure in Flight"},
              {defer:"Low oil pressure – land as soon as possible, forced landing possible."},
            ],
            "No – 60–90 psi":[
              {c:"Power", r:"REDUCE; monitor pressure and temperature"},
              {defer:"Oil pressure in caution range – land as soon as practical, maintenance check."},
            ]
          }},
        ],
        "CHIP caution":[
          {c:"Engine instruments", r:"MONITOR oil pressure / temperature, vibration, torque"},
          {c:"Power", r:"REDUCE to minimum practical"},
          {c:"Landing", r:"NEAREST SUITABLE AIRPORT – shut down and feather only if other indications confirm failure"},
          {defer:"Chip detector – land as soon as possible, engine inspection required."},
        ]
      }},
    ]},
    {id:"fuel", name:"Fuel Imbalance / Fuel Pump Failure / FUEL PRESS Low", cond:"FUEL PRESS caution, L / R FUEL PUMP fail, imbalance above 26 US gal, or L / R FUEL LOW", items:[
      {branch:"Indication?", opts:{
        "Fuel imbalance":[
          {c:"Fuel pump (heavy side)", r:"ON (manual balancing – engine draws from the pumped side)"},
          {c:"Fuel pump (light side)", r:"AUTO / OFF"},
          {c:"Fuel quantity", r:"MONITOR – pumps AUTO when balanced; max imbalance 26 US gal (verify)"},
          {branch:"Imbalance correctable?", opts:{
            "Yes":[{defer:"Automatic fuel balancing inoperative – manual balancing with fuel pumps, maintenance check."}],
            "No":[{c:"Landing", r:"PLAN with imbalance – aileron trim, into-wind wing heavy side if possible, longer runway"},{defer:"Fuel imbalance above limit – lateral trim, gentle manoeuvring, land as soon as practical."}]
          }},
        ],
        "FUEL PRESS caution":[
          {c:"Fuel pumps L / R", r:"ON (both)"},
          {c:"Fuel quantity", r:"CHECK both sides; emergency shutoff OPEN"},
          {branch:"FUEL PRESS caution out?", opts:{
            "Yes":[{c:"Fuel pumps", r:"LEAVE ON"},{defer:"Engine-driven fuel pump suspect – booster pumps on, land as soon as practical."}],
            "No":[{c:"Power", r:"REDUCE; expect fuel starvation – brief Engine Failure in Flight"},{defer:"Fuel pressure low with pumps on – land as soon as possible."}]
          }},
        ],
        "L / R FUEL PUMP fail or FUEL LOW":[
          {c:"Other side fuel pump", r:"ON to feed from the side with a serviceable pump"},
          {c:"Fuel quantity", r:"MONITOR (FUEL LOW approx 20 US gal per side – verify); avoid uncoordinated flight"},
          {defer:"Fuel pump / low fuel – land as soon as practical, fuel from one side only."},
        ]
      }},
    ]},
    {id:"press-fault", name:"Pressurisation Fault / Cabin Not Holding", cond:"Cabin altitude or rate not following the controller, differential abnormal, CAB PRESS warning", items:[
      {c:"Cabin pressurisation switch", r:"NORMAL (not DUMP)"},
      {c:"Bleed air / ECS", r:"ON / AUTO"},
      {c:"Controller", r:"RESELECT cabin altitude / rate"},
      {c:"Ng", r:"INCREASE if low in descent (more bleed air)"},
      {c:"Cabin differential", r:"CHECK – 5.75 psi max (safety valve relieves above)"},
      {branch:"Cabin response?", opts:{
        "Cabin following again":[{c:"Pressurisation", r:"MONITOR for remainder of flight"},{defer:"Pressurisation controller intermittent – maintenance check."}],
        "Cabin climbing":[
          {c:"Oxygen", r:"CREW MASKS ON if cabin above 10,000 ft; passenger oxygen as required"},
          {c:"Altitude", r:"DESCEND to keep cabin below 10,000 ft – Rapid Decompression procedure if CAB PRESS warning"},
          {defer:"Pressurisation failed – remain at or below 10,000 ft, oxygen as required."},
        ],
        "Differential too high":[
          {c:"Altitude", r:"DESCEND – reduce differential"},
          {c:"Bleed air", r:"OFF briefly to reduce inflow"},
          {c:"Before landing", r:"DUMP below 10,000 ft cabin so the cabin is depressurised at touchdown"},
          {defer:"Outflow valve fault – depressurise with DUMP before landing; do not open doors until differential is zero."},
        ]
      }},
    ]},
    {id:"bleed", name:"Bleed Air Leak / Overtemperature (BLEED AIR / ECS caution)", cond:"BLEED AIR caution, duct overheat, or hot air / burning smell from vents", items:[
      {c:"Bleed air", r:"OFF"},
      {c:"ECS", r:"OFF"},
      {c:"Cabin pressurisation", r:"MONITOR – cabin will climb; descend to keep below 10,000 ft"},
      {c:"Oxygen", r:"AS REQUIRED"},
      {branch:"Caution out and no fumes?", opts:{
        "Yes":[
          {c:"Bleed air", r:"May be re-selected ON after cooling if cabin pressure needed; monitor"},
          {defer:"Bleed air fault – limited pressurisation, lower cruise altitude, maintenance required."},
        ],
        "No":[
          {c:"Bleed air / ECS", r:"LEAVE OFF for the remainder of the flight"},
          {c:"Smoke / fumes", r:"Use Smoke / Fumes procedure if required"},
          {defer:"Bleed air off – unpressurised, remain at or below 10,000 ft, no cabin heat."},
        ]
      }},
    ]},
    {id:"ice-fail", name:"Ice Protection Failure (Inertial Separator / Boots / Prop Deice)", cond:"INERT SEP fail, BOOTS caution, PROP DE ICE caution, or ice accumulating with system selected", items:[
      {c:"Icing conditions", r:"EXIT – climb / descend / turn"},
      {c:"Airspeed", r:"approx 130 KIAS minimum flaps UP while ice remains"},
      {branch:"Failed system?", opts:{
        "Inertial separator":[
          {c:"Inertial separator switch", r:"RECYCLE once (approx 15 sec travel)"},
          {c:"Icing conditions", r:"AVOID – engine inlet unprotected; expect ITT rise / torque loss with ice ingestion"},
          {c:"Ignition", r:"ON in precipitation / icing (flame-out protection)"},
          {defer:"Inertial separator failed – avoid icing / contaminated runways, ignition ON in precipitation."},
        ],
        "Deice boots":[
          {c:"Boots switch", r:"OFF, then 1 CYCLE; check BOOTS lights"},
          {c:"Icing conditions", r:"EXIT – airframe ice will accumulate; pusher ICE MODE may not be active"},
          {c:"Landing", r:"FLAPS 15, Vref +10–15 KIAS, no abrupt pitch changes"},
          {defer:"Residual airframe ice – flaps 15 landing, Vref +10–15 KIAS, longer landing distance."},
        ],
        "Propeller deice":[
          {c:"Prop deice switch", r:"OFF then ON; circuit breaker CHECK"},
          {c:"Icing conditions", r:"EXIT – expect vibration from asymmetric ice; vary Np / power briefly to shed ice"},
          {defer:"Prop deice inoperative – avoid icing, expect vibration, maintenance required."},
        ]
      }},
    ]},
    {id:"pitot-fail", name:"Pitot / Static Heat Failure", cond:"PITOT 1 / 2 or STATIC HEAT caution with switch ON, or erratic airspeed / altitude in icing", items:[
      {c:"Pitot / static heat switches", r:"CHECK ON"},
      {c:"Pitot / static heat circuit breakers", r:"CHECK / RESET once"},
      {branch:"Caution out?", opts:{
        "Yes":[{c:"Flight", r:"CONTINUE, monitor"}],
        "No":[
          {c:"Icing conditions", r:"AVOID / EXIT"},
          {c:"Airspeed / altitude", r:"CROSS-CHECK pilot vs copilot vs GPS ground speed; fly by attitude and power if unreliable"},
          {c:"Alternate static source", r:"SELECT if static blockage suspected (altimeter / VSI / airspeed erratic)"},
          {defer:"Pitot / static heat failed – use opposite side indications, avoid icing, approach by attitude and power if unreliable."},
        ]
      }},
    ]},
    {id:"caws", name:"CAWS Caution Handling / CAWS Failure", cond:"Master caution with an amber light, or CAWS not responding to test", items:[
      {c:"Master caution", r:"PRESS to reset / acknowledge"},
      {c:"Annunciator", r:"IDENTIFY – confirm with the relevant gauge / switch position before acting"},
      {branch:"Situation?", opts:{
        "Single caution confirmed":[
          {c:"Procedure", r:"COMPLETE the matching abnormal checklist"},
        ],
        "Caution with normal indications":[
          {c:"Lamp test", r:"PRESS – verify the annunciator and sensor; treat as spurious only with a confirmed normal gauge"},
          {c:"System", r:"MONITOR closely for the remainder of the flight"},
          {defer:"Spurious / unconfirmed caution – monitor system directly, maintenance check."},
        ],
        "CAWS inoperative (no test response)":[
          {c:"Engine / system instruments", r:"MONITOR directly – no warning or caution protection (oil pressure, cabin altitude, fuel, gear)"},
          {c:"Altitude", r:"CONSIDER 10,000 ft or below (no cabin altitude warning)"},
          {defer:"CAWS inoperative – no annunciator protection, monitor gauges directly, maintenance required."},
        ]
      }},
    ]},
    {id:"hyd-gear", name:"Hydraulic Pressure Low / Gear Unsafe", cond:"HYDR caution (pump running continuously or low pressure), gear unsafe light, or fewer than 3 green", items:[
      {c:"Airspeed", r:"BELOW 180 KIAS"},
      {c:"Landing gear selector", r:"CONFIRM position; indicator bulbs CHECK (lamp test)"},
      {branch:"Situation?", opts:{
        "HYDR caution, gear up":[
          {c:"Landing gear", r:"PLAN emergency extension by hand pump (Landing Gear Emergency Extension) – do not rely on the electric pump"},
          {defer:"Hydraulic fault – emergency gear extension, no retraction after extension."},
        ],
        "HYDR caution, gear down":[
          {c:"Landing gear", r:"LEAVE DOWN – do not retract"},
          {c:"Airspeed", r:"180 KIAS maximum"},
          {defer:"Gear down for remainder of flight – 180 KIAS max, increased fuel burn."},
        ],
        "Gear unsafe after selection":[
          {c:"Landing gear selector", r:"RECYCLE once (UP then DOWN, below 180 KIAS)"},
          {c:"Gear warning", r:"CHECK – horn with PCL retarded and gear not down"},
          {branch:"3 green?", opts:{
            "Yes":[{defer:"Gear indication fault – do not retract after landing, maintenance inspection required."}],
            "No":[{note:"Use Landing Gear Emergency Extension; if still unsafe, Gear-Up / Gear Unsafe Landing.", kind:"warn"}]
          }},
        ]
      }},
    ]},
    {id:"flap-fail", name:"Flap Asymmetry / Flap Failure (FLAPS caution)", cond:"FLAPS caution (asymmetry protection has stopped the flaps), flaps not moving, or roll with flap selection", items:[
      {c:"Flap selector", r:"RETURN to the current indicated position – do not cycle"},
      {c:"Roll", r:"COUNTER with aileron / trim; airspeed below Vfe for the extended flap (165 / 130 / 120 KIAS)"},
      {c:"Flap circuit breaker", r:"CHECK – reset once only if no asymmetry"},
      {branch:"Flaps?", opts:{
        "Asymmetric – flaps stopped":[
          {c:"Flaps", r:"LEAVE as set for landing"},
          {c:"Approach speed", r:"Vref for the lesser flap +10 KIAS; longer runway"},
          {defer:"Flap asymmetry – flaps frozen, increased approach speed and landing distance, lateral trim required."},
        ],
        "Failed UP / 15 – symmetric":[
          {c:"Landing", r:"FLAPS UP: approx 100–105 KIAS approach; FLAPS 15: Vref +10 KIAS; longest runway"},
          {defer:"Flaps inoperative – flaps-up / 15 landing, increased landing distance."},
        ],
        "Operable after reset":[
          {c:"Flaps", r:"USE normally; monitor indicator for symmetry"},
          {defer:"Flap system reset in flight – maintenance check."},
        ]
      }},
    ]},
    {id:"yd-ap-fail", name:"Yaw Damper / Autopilot Failure (KFC 325)", cond:"A/P TRIM warning, autopilot disconnect, yaw damper off uncommanded, or abnormal autopilot behaviour", items:[
      {c:"Autopilot / yaw damper", r:"DISCONNECT (wheel button) – fly manually"},
      {c:"Trim", r:"CHECK – retrim manually; electric trim test if A/P TRIM warning (Trim Runaway if moving uncommanded)"},
      {branch:"Re-engagement after test?", opts:{
        "Normal – re-engaged":[{c:"Autopilot", r:"MONITOR closely; disconnect at the first anomaly"}],
        "Autopilot unavailable":[
          {c:"Flight", r:"HAND-FLY; reduce workload (radar vectors, simpler approach)"},
          {c:"Yaw damper", r:"OFF – expect yaw / Dutch roll tendency at altitude; use rudder trim"},
          {defer:"Autopilot / yaw damper inoperative – hand-flown approach, no coupled approach."},
        ]
      }},
    ]},
  ]
});
