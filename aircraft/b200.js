/* Beechcraft King Air B200 – checklist data.
   Prototype content. Verify against the operator's approved checklist and the POH/AFM. */
window.AIRCRAFT = window.AIRCRAFT || [];
window.AIRCRAFT.push({
  id: "b200",
  maker: "Beechcraft",
  model: "King Air B200 / 200",
  short: "B200",
  category: "Turboprop",
  engine: "2× Pratt & Whitney PT6A-42, 850 shp (PT6A-41 on the 200)",
  seats: "2 crew + 6 to 13",
  basis: "Typical B200 (PT6A-42, 6.5 psi cabin, hydraulic gear) AFM procedures, 12,500 lb; 200 / early B200 differences (750°C ITT, electric gear) noted in parentheses. Written for either the analogue panel or Pro Line 21.",
  vspeeds: [
    {k:"V1 / Vr", v:"94 KIAS (12,500 lb, flaps UP)"},
    {k:"V2", v:"approx 103 KIAS"},
    {k:"Vmca", v:"86 KIAS"},
    {k:"Vsse", v:"104 KIAS (intentional one-engine-inop)"},
    {k:"Vx / Vxse", v:"100 / 115 KIAS"},
    {k:"Vy / Vyse", v:"125 / 121 KIAS (blue line 121)"},
    {k:"Best glide", v:"approx 135 KIAS (both props feathered)"},
    {k:"Vfe", v:"200 KIAS (APPROACH) / 157 KIAS (DOWN)"},
    {k:"Vlo", v:"182 KIAS extend / 163 KIAS retract"},
    {k:"Vle", v:"182 KIAS"},
    {k:"Va", v:"181 KIAS (12,500 lb)"},
    {k:"Vmo", v:"259 KIAS"},
    {k:"Vs / Vso", v:"99 / 75 KIAS (12,500 lb)"},
    {k:"Vref", v:"approx 103 KIAS (flaps DOWN, max landing weight)"},
    {k:"Min icing speed", v:"140 KIAS (sustained icing)"}
  ],

  normal: [
    {id:"pre", name:"Before Start", items:[
      {c:"Preflight inspection", r:"COMPLETE (covers, tie-downs, chocks removed; control locks REMOVED)"},
      {c:"Weight & balance / takeoff data", r:"COMPUTED (flap setting, V1/Vr 94, V2 103, Vyse 121, field length)"},
      {c:"Passenger briefing", r:"COMPLETE (belts, airstair door, emergency exit, oxygen masks, no smoking)"},
      {c:"Seats, belts, shoulder harnesses", r:"ADJUST & LOCK"},
      {c:"Cabin door / cargo door", r:"CLOSED, LOCKED (handle stowed, CABIN DOOR annunciator out)"},
      {c:"Parking brake", r:"SET"},
      {c:"Landing gear control", r:"DOWN"},
      {c:"Power levers", r:"IDLE"},
      {c:"Propeller levers", r:"FULL FORWARD (FEATHER permitted for cold-weather start)"},
      {c:"Condition levers", r:"FUEL CUTOFF"},
      {c:"Autofeather", r:"OFF"},
      {c:"Avionics master / inverters / generators", r:"OFF"},
      {c:"Bleed air valves", r:"OPEN"},
      {c:"Oxygen", r:"CHECK (supply pressure, duration for passengers, crew masks)"},
      {c:"Battery", r:"ON – voltage CHECK (approx 24 V; 23 V min for battery start)"},
      {c:"Annunciators", r:"PRESS TO TEST (all lights and master warning / caution)"},
      {c:"Fuel quantity", r:"CHECK main and aux (both sides)"},
      {c:"Firewall shutoff valves", r:"OPEN (guards down)"},
      {c:"Aux transfer", r:"AUTO (both)"},
      {c:"Crossfeed", r:"AUTO (centre / OFF if no auto crossfeed)"},
      {c:"Standby pumps", r:"ON (L / R FUEL PRESS lights OUT)"},
      {c:"Beacon", r:"ON"},
    ]},
    {id:"start", name:"Engine Start", items:[
      {branch:"Power source for start?", opts:{
        "Battery":[
          {note:"Start the right engine first (airstair / cabin door side kept clear). Battery start: 23 V minimum.", kind:"caution"},
        ],
        "External power":[
          {c:"External power", r:"CONNECTED (EXT PWR annunciator) – switch ON, bus voltage approx 28 V"},
        ]
      }},
      {c:"Propeller area", r:"CLEAR (both sides)"},
      {c:"Ignition and engine start switch", r:"ON (START) – starter limits 40 sec ON / 60 sec OFF"},
      {c:"Oil pressure", r:"RISING"},
      {c:"N1 (Ng)", r:"12% MINIMUM, stable"},
      {c:"Condition lever", r:"LOW IDLE"},
      {c:"ITT / N1", r:"LIGHT-OFF within 10 sec, N1 accelerating; MONITOR ITT (1000°C max, 5 sec)"},
      {note:"Abort start if no light-off within 10 sec, ITT approaches 1000°C, or N1 hangs: condition lever FUEL CUTOFF, continue motoring until ITT falls, then starter OFF.", kind:"warn"},
      {c:"Ignition and engine start switch", r:"OFF at approx 50% N1"},
      {c:"N1 – low idle", r:"approx 52–58% (stable)"},
      {c:"Oil pressure", r:"CHECK (60 psi min at idle; 100–135 psi normal)"},
      {c:"Propeller", r:"UNFEATHERED (prop lever full forward)"},
      {c:"Generator", r:"RESET, then ON (loadmeter / voltage check)"},
      {branch:"Second engine start method?", opts:{
        "Cross-generator":[
          {c:"Condition lever (running engine)", r:"HIGH IDLE (approx 70% N1)"},
          {c:"Generator load", r:"BELOW 50% before engaging starter"},
        ],
        "External power":[
          {c:"External power", r:"ON until second engine running"},
        ]
      }},
      {c:"Second engine", r:"START – repeat sequence (N1 12% min, LOW IDLE, ITT 1000°C max, starter OFF 50%)"},
      {c:"Second generator", r:"RESET, then ON"},
      {c:"External power", r:"OFF & DISCONNECTED (if used; EXT PWR light out)"},
      {c:"Condition levers", r:"LOW IDLE (HIGH IDLE if bleed air / icing ops required)"},
      {c:"Standby pumps", r:"OFF (FUEL PRESS lights remain out)"},
      {c:"Inverter", r:"No. 1 ON – INVERTER light OUT; select No. 2 – CHECK; leave one ON"},
      {c:"Avionics master", r:"ON"},
      {c:"Engine instruments / annunciators", r:"CHECK both engines (ITT, torque, N1, oil pressure / temperature, fuel flow; no red lights)"},
    ]},
    {id:"taxi", name:"Before Taxi", items:[
      {c:"Flight instruments / EFIS / avionics", r:"CHECK & SET (AHRS aligned on Pro Line 21; no flags; altimeters set; FMS loaded)"},
      {c:"Autopilot / electric trim", r:"TEST (trim both halves of split switch, disconnect, AP disengage) – OFF"},
      {c:"Pitot heat / stall warning heat / fuel vent heat", r:"ON momentarily – CHECK (loadmeter rise), then AS REQUIRED"},
      {c:"Propeller deice", r:"AUTO – ammeter 14–18 A; MANUAL inner / outer CHECK; then AS REQUIRED"},
      {c:"Surface deice (boots)", r:"SINGLE cycle – WING and TAIL DEICE lights, pressure, boots inflate / deflate"},
      {c:"Windshield anti-ice", r:"NORMAL – CHECK; HI in flight only"},
      {c:"Brake deice", r:"CHECK (if fitted) – OFF; do not use above 15°C"},
      {c:"Engine anti-ice (ice vanes)", r:"AS REQUIRED (ON below 5°C in visible moisture; ENG ANTI-ICE lights)"},
      {c:"Pressurisation", r:"TEST (condition levers HIGH IDLE, bleed air OPEN, switch to TEST – cabin pressurises, rate indicates descent; return to PRESS)"},
      {c:"Flaps", r:"SET for takeoff (UP or APPROACH) – indicator CHECK"},
      {c:"Trims", r:"SET for takeoff (elevator per loading; rudder / aileron neutral)"},
      {c:"Brakes", r:"CHECK on initial roll (power levers in BETA for speed control)"},
      {c:"Flight instruments", r:"CHECK in turns (HSI / compass, turn coordinator)"},
    ]},
    {id:"runup", name:"Before Takeoff", items:[
      {c:"Parking brake", r:"SET"},
      {c:"Flight controls", r:"FREE & CORRECT"},
      {c:"Overspeed governors", r:"TEST – hold PROP GOV TEST, advance power levers: props stabilise 1830–1910 RPM; release"},
      {c:"Primary governors", r:"EXERCISE – power to approx 1800 RPM, prop levers aft to detent (RPM decreases), then FULL FORWARD"},
      {c:"Rudder boost", r:"ON – TEST: one power lever up to approx 1000 ft-lb, other idle; pedal on the high-power side moves forward; repeat other side"},
      {c:"Autofeather", r:"TEST – hold TEST, power levers approx 500 ft-lb: retard one lever – opposite light OUT at approx 400 ft-lb, both OUT and prop feathers at approx 200 ft-lb; repeat other side"},
      {c:"Autofeather", r:"ARM (lights illuminate above approx 90% N1 on takeoff roll)"},
      {c:"Engine instruments", r:"CHECK (oil temp 10°C min, oil pressure 100–135 psi, ITT, N1, fuel flow)"},
      {c:"Fuel panel", r:"CHECK (firewall valves OPEN, aux transfer AUTO, crossfeed AUTO, standby pumps OFF / as required, NO FUEL TRANSFER out)"},
      {c:"Electrical", r:"CHECK (both generators ON, loads balanced, inverter ON, voltage 28 V)"},
      {c:"Pressurisation", r:"Bleed air valves OPEN, switch PRESS, controller SET (cruise altitude + 500 ft, rate approx 500 fpm)"},
      {c:"Propeller levers", r:"FULL FORWARD (2000 RPM)"},
      {c:"Propeller sync / yaw damp", r:"OFF"},
      {c:"Condition levers", r:"LOW IDLE (HIGH IDLE per operator SOP / icing / bleed air required)"},
      {c:"Flaps / trims", r:"SET & INDICATING (flaps UP or APPROACH)"},
      {c:"Ice protection", r:"AS REQUIRED (engine anti-ice ON below 5°C in visible moisture – reduced torque available; pitot heat ON)"},
      {c:"Lights", r:"AS REQUIRED"},
      {c:"Transponder / TCAS", r:"ALT / TA-RA"},
      {c:"Annunciators / doors", r:"CHECK (no red / amber; CABIN DOOR light out)"},
      {c:"Takeoff briefing", r:"COMPLETE (abort below V1 94; after V1: autofeather, gear UP, V2 103 to obstacle height, 121 KIAS; Vmca 86; 2230 ft-lb / 800°C limits)"},
    ]},
    {id:"climb", name:"After Takeoff / Climb", items:[
      {c:"Landing gear", r:"UP (positive rate, below 163 KIAS) – 3 green out, handle light out"},
      {c:"Flaps", r:"UP (clear of obstacles, above 121 KIAS)"},
      {c:"Autofeather", r:"ARMED (both lights ON)"},
      {c:"Climb power", r:"SET (torque per chart, ITT 800°C max – 750°C on PT6A-41, 1900–2000 RPM)"},
      {c:"Airspeed", r:"140 KIAS (normal climb) / 160 KIAS (cruise climb); 125 KIAS best rate"},
      {c:"Yaw damp", r:"ON (required above 17,000 ft)"},
      {c:"Propeller sync", r:"ON"},
      {c:"Pressurisation", r:"CHECK (cabin climbing per rate, differential increasing, 6.5 psi max)"},
      {c:"Engine anti-ice / ice protection", r:"AS REQUIRED"},
      {c:"Engine instruments / lights", r:"CHECK both engines; landing / taxi lights OFF"},
    ]},
    {id:"cruise", name:"Cruise", items:[
      {c:"Cruise power", r:"SET (torque per chart, 1700–1800 RPM, ITT within limits)"},
      {c:"Propeller sync", r:"ON (props matched)"},
      {c:"Autofeather", r:"AS REQUIRED (OFF in cruise is common; must be ARMED for takeoff and landing)"},
      {c:"Fuel", r:"CHECK quantity main / aux, NO FUEL TRANSFER out, imbalance within 1000 lb; crossfeed as required"},
      {c:"Pressurisation", r:"CHECK (cabin altitude, rate, differential 6.5 psi max)"},
      {c:"Oxygen", r:"CHECK (pressure, masks available)"},
      {c:"Engine instruments", r:"CHECK (oil 100–135 psi / 0–99°C, ITT, N1 101.5% max)"},
      {c:"Ice protection", r:"AS REQUIRED (140 KIAS min in icing)"},
    ]},
    {id:"desc", name:"Descent", items:[
      {c:"Altimeters", r:"SET"},
      {c:"Pressurisation controller", r:"SET (destination field elevation + 500 ft; rate as required)"},
      {c:"Windshield anti-ice", r:"NORMAL (as required below 10,000 ft)"},
      {c:"Ice protection / engine anti-ice", r:"AS REQUIRED"},
      {c:"Fuel", r:"CHECK (crossfeed AUTO / OFF, standby pumps as required, aux transfer AUTO)"},
      {c:"Power", r:"REDUCE as required (ITT / torque, avoid N1 below approach setting)"},
      {c:"Approach briefing", r:"COMPLETE (Vref approx 103, flap setting, single-engine go-around point)"},
      {c:"Seat belts / passenger briefing", r:"SECURE"},
      {c:"Landing / taxi lights", r:"AS REQUIRED"},
    ]},
    {id:"land", name:"Before Landing", items:[
      {c:"Autofeather", r:"ARM"},
      {c:"Pressurisation", r:"CHECK (cabin altitude at or above field elevation; differential approaching zero)"},
      {c:"Airspeed", r:"BELOW 200 KIAS"},
      {c:"Flaps", r:"APPROACH (below 200 KIAS)"},
      {c:"Landing gear", r:"DOWN (below 182 KIAS) – 3 GREEN, handle light out (HYD FLUID LOW out)"},
      {c:"Propeller sync", r:"OFF"},
      {c:"Yaw damp", r:"OFF"},
      {c:"Condition levers", r:"LOW IDLE (HIGH IDLE per operator SOP / icing)"},
      {c:"Propeller levers", r:"FULL FORWARD (2000 RPM) on final"},
      {c:"Flaps", r:"DOWN (below 157 KIAS) when landing assured"},
      {c:"Airspeed", r:"Vref approx 103 KIAS (flaps DOWN); add approx 10–15 KIAS flaps UP / APPROACH"},
      {c:"Landing lights", r:"ON"},
      {c:"Landing gear", r:"3 GREEN – CONFIRMED on final"},
    ]},
    {id:"after", name:"After Landing", items:[
      {c:"Power levers", r:"BETA / REVERSE as required – out of reverse by 40 KIAS"},
      {c:"Flaps", r:"UP"},
      {c:"Trims", r:"SET for takeoff"},
      {c:"Autofeather", r:"OFF"},
      {c:"Ice protection", r:"OFF (pitot / stall / vent heat, prop deice, windshield heat, brake deice as required)"},
      {c:"Engine anti-ice (ice vanes)", r:"AS REQUIRED (ON for ground operation below 5°C in visible moisture)"},
      {c:"Landing / strobe lights", r:"AS REQUIRED"},
      {c:"Transponder", r:"STBY / as required"},
      {c:"Condition levers", r:"LOW IDLE (HIGH IDLE if air conditioning / bleed air required)"},
    ]},
    {id:"shut", name:"Shutdown", items:[
      {c:"Parking brake", r:"SET"},
      {c:"Avionics master", r:"OFF"},
      {c:"Inverter", r:"OFF"},
      {c:"Ice and rain protection", r:"OFF"},
      {c:"Air conditioning / cabin lights / electrical load", r:"OFF / REDUCE"},
      {c:"Standby pumps / crossfeed", r:"OFF / AUTO"},
      {c:"ITT", r:"STABILISED – 1 minute at LOW IDLE"},
      {c:"Condition levers", r:"FUEL CUTOFF"},
      {c:"Propeller levers", r:"FEATHER"},
      {c:"ITT / N1", r:"MONITOR during run-down (no ITT rise)"},
      {c:"Exterior lights / beacon", r:"OFF"},
      {c:"Battery", r:"OFF (after propellers stopped)"},
      {c:"Oxygen", r:"OFF"},
      {c:"Control locks", r:"INSTALL"},
      {c:"Chocks / covers / tie-downs", r:"AS REQUIRED"},
    ]},
  ],
  emergency: [
    {id:"eng-fail-to", name:"Engine Failure During Takeoff (below V1)", cond:"On the runway, below 94 KIAS / decision speed", items:[
      {c:"Power levers", r:"IDLE (both)", mem:true},
      {c:"Brakes", r:"MAXIMUM – stop straight ahead", mem:true},
      {c:"Power levers", r:"GROUND FINE / REVERSE as required (operating engine – anticipate yaw)", mem:true},
      {c:"Condition levers", r:"FUEL CUTOFF (if stopping / fire suspected)"},
      {c:"Firewall shutoff valves", r:"CLOSED (if fire suspected)"},
      {c:"Battery / generators", r:"OFF after stop (if evacuating)"},
      {note:"Below Vmca (86 KIAS) directional control cannot be maintained with full power on one engine. Below V1 always stop.", kind:"warn"},
    ]},
    {id:"eng-fail-liftoff", name:"Engine Failure After V1 / Liftoff", cond:"At or above V1 (94 KIAS), committed to fly", land:"LAND AS SOON AS POSSIBLE", items:[
      {c:"Power", r:"MAXIMUM ALLOWABLE (2230 ft-lb / 800°C – 750°C PT6A-41)", mem:true},
      {c:"Airspeed", r:"TAKEOFF SPEED to V2 103 KIAS until clear of obstacles", mem:true},
      {c:"Landing gear", r:"UP (positive rate)", mem:true},
      {c:"Propeller", r:"VERIFY AUTOFEATHERED – if not: identify, verify, prop lever FEATHER", mem:true},
      {c:"Airspeed", r:"121 KIAS (Vyse) once clear of obstacles", mem:true},
      {c:"Flaps", r:"UP (above 121 KIAS, obstacles cleared)", mem:true},
      {c:"Bank / rudder", r:"3–5° toward operating engine, ball half out (rudder boost assists)"},
      {c:"Trim", r:"RUDDER & AILERON for straight flight"},
      {c:"Climb", r:"121 KIAS to safe altitude, then Engine Failure in Flight – securing items"},
      {defer:"One engine inoperative after takeoff – single-engine approach and landing, no go-around once flaps DOWN."},
    ]},
    {id:"eng-fail-flt", name:"Engine Failure in Flight / Engine Securing", cond:"Loss of power on one engine at altitude", land:"LAND AS SOON AS POSSIBLE", items:[
      {c:"Power", r:"AS REQUIRED (max 2230 ft-lb / 800°C)", mem:true},
      {c:"Airspeed", r:"121 KIAS (Vyse) minimum", mem:true},
      {c:"Inoperative engine", r:"IDENTIFY – dead foot, dead engine (torque / N1 / ITT)", mem:true},
      {c:"Inoperative engine power lever", r:"VERIFY – retard, no change", mem:true},
      {c:"Inoperative engine condition lever", r:"FUEL CUTOFF", mem:true},
      {c:"Inoperative engine propeller lever", r:"FEATHER (confirm autofeather / manual)", mem:true},
      {c:"Firewall shutoff valve (inop side)", r:"CLOSED", mem:true},
      {c:"Generator (inop side)", r:"OFF"},
      {c:"Autofeather", r:"OFF"},
      {c:"Propeller sync", r:"OFF"},
      {c:"Bleed air valve (inop side)", r:"ENVIR OFF (INSTR & ENVIR OFF if contamination suspected)"},
      {c:"Standby pump (inop side)", r:"OFF"},
      {c:"Electrical load", r:"MONITOR (single generator, 100% max)"},
      {c:"Rudder boost", r:"ON – CHECK operating"},
      {c:"Trim", r:"RUDDER & AILERON (3–5° bank toward operating engine)"},
      {c:"Crossfeed", r:"AS REQUIRED (standby pump on supplying side ON)"},
      {c:"Pressurisation", r:"MONITOR (single-engine bleed; cabin altitude may rise)"},
      {branch:"Cause known and no damage – attempt air start?", opts:{
        "Yes – air start":[
          {note:"Use the Air Start procedure. If unsuccessful, leave the engine secured.", kind:"caution"},
        ],
        "No – engine secured":[
          {c:"ATC", r:"ADVISE – nearest suitable airport, drift-down altitude check"},
          {defer:"One engine inoperative – single-engine approach and landing, crossfeed as required, no go-around once flaps DOWN."},
        ]
      }},
    ]},
    {id:"air-start", name:"Air Start", cond:"Engine secured, cause known, no fire or mechanical damage", items:[
      {c:"Cabin temperature mode", r:"OFF"},
      {c:"Electrical load", r:"REDUCE (single generator)"},
      {c:"Condition lever", r:"FUEL CUTOFF"},
      {c:"Firewall shutoff valve", r:"OPEN"},
      {c:"Standby pump", r:"ON"},
      {c:"Power lever", r:"IDLE"},
      {branch:"Air start method?", opts:{
        "Starter-assisted (any altitude)":[
          {c:"Propeller lever", r:"FEATHER"},
          {c:"Ignition and engine start switch", r:"ON (START) – observe starter limits"},
          {c:"N1", r:"12% MINIMUM"},
        ],
        "Windmilling (below 20,000 ft, 140 KIAS min)":[
          {c:"Propeller lever", r:"FULL FORWARD (unfeather – prop windmills)"},
          {c:"N1", r:"12% MINIMUM (use starter if less)"},
          {c:"Ignition and engine start switch", r:"ON"},
        ]
      }},
      {c:"Condition lever", r:"LOW IDLE"},
      {c:"ITT", r:"LIGHT-OFF within 10 sec; MONITOR (1000°C max)"},
      {c:"Ignition and engine start switch", r:"OFF at approx 50% N1"},
      {branch:"Engine restarted?", opts:{
        "Yes":[
          {c:"Oil pressure", r:"CHECK"},
          {c:"Propeller lever", r:"FULL FORWARD / AS REQUIRED (match RPM)"},
          {c:"Generator", r:"RESET, then ON"},
          {c:"Bleed air valve", r:"OPEN"},
          {c:"Standby pump", r:"OFF (FUEL PRESS out)"},
          {c:"Power", r:"AS REQUIRED after warm-up (ITT / torque in limits)"},
          {defer:"Engine restarted in flight – land as soon as practical, maintenance investigation required."},
        ],
        "No":[
          {c:"Condition lever", r:"FUEL CUTOFF"},
          {c:"Ignition and engine start switch", r:"OFF"},
          {c:"Propeller lever", r:"FEATHER"},
          {c:"Firewall shutoff valve", r:"CLOSED"},
          {c:"Standby pump", r:"OFF"},
          {note:"Do not attempt further starts. Complete the Engine Securing items.", kind:"warn"},
          {defer:"One engine inoperative – single-engine approach and landing."},
        ]
      }},
    ]},
    {id:"eng-fire-flt", name:"Engine Fire in Flight", cond:"FIRE annunciator / visual fire", land:"LAND IMMEDIATELY", items:[
      {c:"Condition lever (affected)", r:"FUEL CUTOFF", mem:true},
      {c:"Propeller lever (affected)", r:"FEATHER", mem:true},
      {c:"Firewall shutoff valve (affected)", r:"CLOSED", mem:true},
      {c:"Fire extinguisher (if fitted)", r:"PUSH TO ARM / DISCHARGE", mem:true},
      {c:"Generator (affected)", r:"OFF"},
      {c:"Bleed air valve (affected)", r:"INSTR & ENVIR OFF"},
      {c:"Standby pump (affected)", r:"OFF"},
      {c:"Autofeather / propeller sync", r:"OFF"},
      {c:"Airspeed", r:"121 KIAS minimum (increase if fire persists)"},
      {c:"Electrical load / crossfeed", r:"AS REQUIRED"},
      {note:"Do not attempt a restart. Land at the nearest suitable airport; if fire persists or structure is involved, land immediately on any suitable surface.", kind:"warn"},
      {defer:"Engine fire – single-engine landing, evacuation on landing, fire services required."},
    ]},
    {id:"eng-fire-start", name:"Engine Fire on the Ground / During Start", items:[
      {c:"Condition lever", r:"FUEL CUTOFF", mem:true},
      {c:"Firewall shutoff valve", r:"CLOSED", mem:true},
      {c:"Ignition and engine start switch", r:"CONTINUE MOTORING (starter) to purge fuel / lower ITT", mem:true},
      {c:"Fire extinguisher (if fitted)", r:"PUSH TO ARM / DISCHARGE"},
      {c:"Standby pumps", r:"OFF"},
      {branch:"Fire out?", opts:{
        "Yes":[
          {c:"Ignition and engine start switch", r:"OFF (observe starter limits)"},
          {c:"Other engine", r:"SHUT DOWN – condition lever FUEL CUTOFF, props FEATHER"},
          {c:"Battery / generators", r:"OFF"},
          {note:"Do not restart. Maintenance inspection required.", kind:"caution"},
        ],
        "No":[
          {c:"Ignition and engine start switch", r:"OFF"},
          {c:"Other engine", r:"SHUT DOWN – condition lever FUEL CUTOFF"},
          {c:"Battery / generators", r:"OFF"},
          {c:"Aircraft", r:"EVACUATE (away from the fire side), ground extinguisher"},
        ]
      }},
    ]},
    {id:"emer-desc", name:"Emergency Descent", items:[
      {c:"Power levers", r:"IDLE", mem:true},
      {c:"Propeller levers", r:"FULL FORWARD", mem:true},
      {c:"Flaps", r:"APPROACH (below 200 KIAS)", mem:true},
      {c:"Landing gear", r:"DOWN (below 182 KIAS)", mem:true},
      {c:"Airspeed", r:"181 KIAS (Va)", mem:true},
      {c:"Oxygen", r:"AS REQUIRED (crew masks ON above 10,000 ft cabin)"},
      {c:"ATC", r:"ADVISE – emergency descent"},
      {c:"Level-off", r:"10,000 ft or MEA – restore power smoothly, gear up below 163 KIAS if continuing"},
    ]},
    {id:"rapid-decomp", name:"Rapid Decompression / Cabin Altitude Warning", cond:"CABIN ALT / ALT WARN annunciator (cabin above 12,500 ft) or loud decompression", land:"LAND AS SOON AS PRACTICAL", items:[
      {c:"Crew oxygen masks", r:"DON – 100%; mic switch OXY MASK", mem:true},
      {c:"Passenger oxygen", r:"ON (passenger manual override PULL if masks have not dropped)", mem:true},
      {c:"Emergency descent", r:"INITIATE to 10,000 ft or MEA", mem:true},
      {c:"Passenger / crew communication", r:"ESTABLISH"},
      {c:"Cabin pressurisation", r:"CHECK (bleed air valves OPEN, switch PRESS, controller set) – see Pressurisation Loss"},
      {c:"ATC", r:"ADVISE"},
      {branch:"Cabin pressurisation recovered?", opts:{
        "Yes":[{c:"Cabin altitude", r:"MONITOR; stay at an altitude the cabin can hold"},{defer:"Pressurisation fault – fly at low altitude, oxygen used, maintenance inspection."}],
        "No":[{c:"Altitude", r:"REMAIN at or below 10,000 ft (oxygen supply as required)"},{defer:"Unpressurised – remain at or below 10,000 ft, oxygen quantity limited."}]
      }},
    ]},
    {id:"press-loss", name:"Pressurisation Loss / Cabin Altitude Climbing", cond:"Cabin altitude rising uncommanded, CABIN ALT warning not yet active", items:[
      {c:"Cabin pressurisation switch", r:"PRESS (not DUMP / TEST)"},
      {c:"Bleed air valves", r:"OPEN (both)"},
      {c:"Pressurisation controller", r:"CHECK setting (cabin altitude selected below flight altitude; rate increase)"},
      {c:"Condition levers", r:"HIGH IDLE (if N1 low in descent – more bleed air)"},
      {c:"Cabin door / BL AIR FAIL annunciators", r:"CHECK"},
      {c:"Oxygen", r:"CREW MASKS ON if cabin above 10,000 ft"},
      {branch:"Cabin altitude controlled?", opts:{
        "Yes":[{c:"Flight", r:"CONTINUE at an altitude the cabin maintains below 10,000 ft"},{defer:"Pressurisation degraded – limit cruise altitude, maintenance inspection."}],
        "No":[{c:"Descent", r:"INITIATE – before cabin reaches 12,500 ft; Rapid Decompression procedure if warning activates"},{defer:"Unpressurised – remain at or below 10,000 ft."}]
      }},
    ]},
    {id:"smoke-fire", name:"Smoke / Fume Elimination / Electrical Fire", land:"LAND AS SOON AS POSSIBLE", items:[
      {c:"Crew oxygen masks", r:"DON – 100% / EMER; mic switch OXY MASK", mem:true},
      {c:"Smoke goggles", r:"ON (if fitted)", mem:true},
      {branch:"Source of smoke?", opts:{
        "Electrical":[
          {c:"Affected equipment / circuit", r:"OFF – circuit breaker PULL (if identified)"},
          {branch:"Source identified and smoke clearing?", opts:{
            "Yes":[{defer:"Electrical fire – affected circuit isolated, equipment unavailable."}],
            "No":[
              {c:"Generators", r:"OFF (battery only – essential loads via triple-fed bus)"},
              {c:"Avionics master / non-essential load", r:"OFF"},
              {c:"Hand fire extinguisher", r:"USE as required"},
              {c:"Electrical equipment", r:"RESTORE one item at a time, essential only, checking for smoke"},
              {note:"Landing gear is electro-hydraulic: plan a manual gear extension and a flaps-up landing if electrical power cannot be restored.", kind:"caution"},
              {defer:"Electrical fire – battery only / minimum equipment, manual gear extension and flaps-up landing possible."},
            ]
          }},
        ],
        "Environmental / bleed air":[
          {c:"Bleed air valves", r:"ENVIR OFF one at a time to identify, then INSTR & ENVIR OFF on affected side"},
          {c:"Cabin temperature mode", r:"OFF"},
          {c:"Altitude", r:"DESCEND to maintain cabin below 10,000 ft (single bleed source)"},
          {defer:"Bleed air source isolated – reduced pressurisation, lower cruise altitude."},
        ],
        "Unknown":[
          {c:"Both procedures", r:"APPLY – electrical isolation and bleed air isolation"},
        ]
      }},
      {note:"Smoke / fume evacuation:", kind:"warn"},
      {c:"Descent", r:"TO 10,000 ft or below if practicable"},
      {c:"Cabin pressurisation switch", r:"DUMP (below 10,000 ft) to ventilate"},
      {c:"Cabin air / fresh air", r:"MAXIMUM (bleed air OPEN if not the source)"},
      {c:"Passenger oxygen", r:"CONSIDER (does not protect from smoke – masks are diluter type)"},
    ]},
    {id:"gear-manual", name:"Landing Gear Manual Extension", cond:"Gear does not extend normally / HYD FLUID LOW", items:[
      {c:"Airspeed", r:"BELOW 182 KIAS (reduce to approx 130 KIAS to ease pumping)"},
      {c:"Landing gear relay circuit breaker", r:"PULL (right subpanel)"},
      {c:"Landing gear control", r:"DOWN"},
      {branch:"Gear system?", opts:{
        "Hydraulic (B200)":[
          {c:"Emergency extension handle", r:"UNSTOW (floor, left of pilot seat) – PUMP up and down until 3 GREEN, then until resistance"},
          {c:"Emergency extension handle", r:"LEAVE in position – do not stow until gear inspected"},
        ],
        "Electric (200 / early B200)":[
          {c:"Hand crank", r:"ENGAGE (floor behind pedestal) – TURN CLOCKWISE to stop (approx 50 turns) – 3 GREEN"},
          {c:"Hand crank", r:"DISENGAGE & STOW"},
        ]
      }},
      {c:"Landing gear indicator", r:"3 GREEN, handle light out"},
      {note:"Do not reset the landing gear circuit breaker or move the gear control in flight after a manual extension. Leave the gear down.", kind:"warn"},
      {branch:"3 green obtained?", opts:{
        "Yes":[{defer:"Gear extended manually – do not retract; gear system inspection required."}],
        "No":[{c:"Landing", r:"GEAR UNSAFE – longest runway, emergency services, flaps DOWN, minimum speed, fuel cutoff before touchdown"},{defer:"Gear unsafe landing – emergency services, evacuate after stopping."}]
      }},
    ]},
    {id:"se-landing", name:"Single-Engine Approach, Landing & Go-Around", cond:"One engine secured and feathered", items:[
      {c:"Inoperative engine", r:"SECURED (condition lever CUTOFF, prop FEATHER, firewall valve CLOSED, generator OFF)"},
      {c:"Autofeather", r:"OFF (inoperative with one engine)"},
      {c:"Rudder boost", r:"ON"},
      {c:"Crossfeed", r:"AS REQUIRED (balance for approach; standby pump supplying side ON)"},
      {c:"Electrical load", r:"WITHIN single generator limit (100%)"},
      {c:"Pressurisation", r:"SET destination + 500 ft (cabin may not hold – oxygen as required)"},
      {c:"Airspeed", r:"121 KIAS (Vyse) until landing assured"},
      {c:"Flaps", r:"APPROACH (below 200 KIAS)"},
      {c:"Landing gear", r:"DOWN when landing assured (below 182 KIAS) – 3 GREEN"},
      {c:"Propeller lever (operating)", r:"FULL FORWARD"},
      {c:"Flaps", r:"DOWN only when landing assured (short final, below 157 KIAS)"},
      {c:"Airspeed", r:"Vref approx 103–110 KIAS on short final"},
      {c:"Power lever (operating)", r:"REDUCE progressively – anticipate yaw change; rudder trim toward neutral"},
      {branch:"Go-around required?", opts:{
        "No":[
          {c:"Touchdown", r:"NORMAL – BETA / REVERSE on operating engine with caution (asymmetric), brakes as required"},
        ],
        "Yes – above decision height":[
          {c:"Power (operating)", r:"MAXIMUM ALLOWABLE (2230 ft-lb / 800°C)"},
          {c:"Flaps", r:"APPROACH (from DOWN)"},
          {c:"Landing gear", r:"UP (positive climb)"},
          {c:"Airspeed", r:"121 KIAS (Vyse) minimum; bank 3–5° toward operating engine"},
          {c:"Flaps", r:"UP (clear of obstacles, above 121 KIAS)"},
          {note:"A single-engine go-around with flaps DOWN or below approx 200 ft AGL should not be attempted – single-engine climb performance is marginal at high weight / altitude / temperature.", kind:"warn"},
        ]
      }},
    ]},
  ],
  abnormal: [
    {id:"gen-fail", name:"Generator Failure (L / R DC GEN annunciator)", cond:"DC GEN light, loadmeter zero", items:[
      {c:"Affected generator switch", r:"OFF, then RESET, then ON"},
      {branch:"Generator restored?", opts:{
        "Yes":[{c:"Loadmeters / voltage", r:"MONITOR both"}],
        "No – one generator failed":[
          {c:"Affected generator switch", r:"OFF"},
          {c:"Electrical load", r:"REDUCE below 100% on remaining generator"},
          {c:"Air conditioning / brake deice / windshield HI", r:"CONSIDER OFF"},
          {defer:"One generator inoperative – electrical load limited, land as soon as practical."},
        ],
        "No – both generators failed":[
          {c:"Both generator switches", r:"OFF"},
          {c:"Non-essential electrical load", r:"OFF (battery only – approx 30 min endurance)"},
          {c:"Avionics", r:"ESSENTIAL only (one nav / com, one inverter)"},
          {c:"Landing gear", r:"PLAN early extension while battery power remains; manual extension available"},
          {defer:"Both generators failed – battery only; extend gear early, flaps may be slow, land as soon as possible."},
        ]
      }},
    ]},
    {id:"inv-fail", name:"Inverter Failure (INVERTER annunciator)", items:[
      {c:"Inverter switch", r:"SELECT other inverter (No. 1 / No. 2)"},
      {branch:"INVERTER light out?", opts:{
        "Yes":[{c:"AC instruments", r:"CHECK (torque meters, AC-powered avionics)"},{defer:"One inverter inoperative – single AC source, maintenance required."}],
        "No – both failed":[
          {c:"Inverter", r:"OFF"},
          {c:"Power setting", r:"USE ITT, N1 and fuel flow – torque meters inoperative (analogue panel)"},
          {c:"AC-powered avionics / instruments", r:"NOTE inoperative; use standby instruments"},
          {defer:"Both inverters failed – torque indication / AC avionics inoperative, set power by ITT and N1."},
        ]
      }},
    ]},
    {id:"oil", name:"Low Oil Pressure / Chip Detector", cond:"Oil pressure below 100 psi above idle, OIL PRESS or CHIP DETECT annunciator", items:[
      {branch:"Indication?", opts:{
        "Oil pressure low":[
          {c:"Oil pressure / temperature", r:"CROSS-CHECK (60–100 psi at idle only; below 60 psi unsafe)"},
          {branch:"Pressure below 60 psi or temperature rising?", opts:{
            "Yes":[
              {c:"Affected engine power", r:"REDUCE to minimum required"},
              {c:"Engine", r:"SHUT DOWN & FEATHER before seizure if terrain / altitude allow (Engine Failure in Flight)"},
              {defer:"Low oil pressure – precautionary shutdown, single-engine landing, land as soon as possible."},
            ],
            "No – 60–100 psi":[
              {c:"Power", r:"REDUCE; monitor pressure and temperature"},
              {defer:"Oil pressure in caution range – land as soon as practical, maintenance check."},
            ]
          }},
        ],
        "CHIP DETECT light":[
          {c:"Engine instruments (affected)", r:"MONITOR oil pressure / temperature, vibration"},
          {c:"Power", r:"REDUCE to minimum practical"},
          {c:"Engine", r:"SHUT DOWN & FEATHER if any other abnormal indication"},
          {defer:"Chip detector – land as soon as practical, engine inspection required."},
        ]
      }},
    ]},
    {id:"fuel", name:"Fuel Pressure Low / Crossfeed / No Fuel Transfer", cond:"L / R FUEL PRESS or NO FUEL TRANSFER annunciator", items:[
      {branch:"Annunciator?", opts:{
        "FUEL PRESS (one side)":[
          {c:"Standby pump (affected side)", r:"ON"},
          {branch:"FUEL PRESS light out?", opts:{
            "Yes":[{c:"Standby pump", r:"LEAVE ON"},{defer:"Engine-driven boost pump failed – standby pump on; operation without boost pump limited to 10 hours cumulative."}],
            "No":[
              {c:"Crossfeed", r:"SELECT toward affected engine (FUEL CROSSFEED light); standby pump supplying side ON"},
              {c:"Fuel quantity", r:"MONITOR both sides (both engines on one side's fuel)"},
              {c:"Firewall shutoff valve (affected)", r:"CHECK OPEN"},
              {defer:"Crossfeed in use – fuel from one side only, monitor quantity; land as soon as practical."},
            ]
          }},
        ],
        "NO FUEL TRANSFER":[
          {c:"Aux transfer switch (affected)", r:"OVERRIDE"},
          {branch:"Light out / aux quantity decreasing?", opts:{
            "Yes":[{c:"Aux transfer", r:"LEAVE in OVERRIDE"},{defer:"Aux transfer in override – maintenance check required."}],
            "No":[{c:"Aux fuel (affected side)", r:"CONSIDER UNUSABLE – replan fuel on main tanks, crossfeed to balance"},{defer:"Aux fuel not transferring – reduced usable fuel, imbalance within 1000 lb."}]
          }},
        ]
      }},
    ]},
    {id:"af-fail", name:"Autofeather Failure / Not Armed", cond:"Autofeather lights not illuminated with power set, or AUTOFEATHER OFF annunciator", items:[
      {c:"Autofeather switch", r:"CHECK ARM"},
      {c:"Power levers", r:"ABOVE approx 90% N1 (arming requires both power levers forward)"},
      {branch:"Both autofeather lights ON?", opts:{
        "Yes":[{c:"System", r:"ARMED – continue"}],
        "No":[
          {c:"Autofeather switch", r:"OFF"},
          {note:"Autofeather must be armed for takeoff and landing. On the ground: do not take off. In flight: brief manual identify / verify / feather for an engine failure.", kind:"warn"},
          {defer:"Autofeather inoperative – manual feathering required if an engine fails; approach briefed accordingly."},
        ]
      }},
    ]},
    {id:"rb-fail", name:"Rudder Boost Failure (RUDDER BOOST OFF annunciator)", items:[
      {c:"Rudder boost switch", r:"OFF, then ON"},
      {c:"Bleed air valves", r:"CHECK OPEN (rudder boost uses bleed air pressure differential)"},
      {branch:"Rudder boost restored?", opts:{
        "Yes":[{c:"System", r:"ON – continue"}],
        "No":[
          {c:"Rudder boost switch", r:"OFF"},
          {defer:"Rudder boost inoperative – expect full rudder force required on an engine failure; Vmca unchanged."},
        ],
        "Uncommanded rudder input":[
          {c:"Rudder boost switch", r:"OFF"},
          {c:"Rudder trim", r:"ADJUST for straight flight"},
          {defer:"Rudder boost off after uncommanded input – full rudder forces on an engine failure."},
        ]
      }},
    ]},
    {id:"prop-overspeed", name:"Propeller Overspeed", cond:"Prop RPM above 2000 and not responding to the prop lever", items:[
      {c:"Affected power lever", r:"REDUCE"},
      {c:"Affected propeller lever", r:"AFT toward minimum RPM / FEATHER detent"},
      {c:"Airspeed", r:"REDUCE"},
      {branch:"RPM controllable at or below 2000 (overspeed governor holds approx 2080)?", opts:{
        "Yes":[
          {c:"Power", r:"SET to keep RPM within limits (2000 max; 2200 transient 5 sec)"},
          {c:"Propeller sync", r:"OFF"},
          {defer:"Primary governor fault – RPM controlled with power lever and airspeed, land as soon as practical."},
        ],
        "No – RPM above 2200 or uncontrollable":[
          {c:"Affected engine", r:"SHUT DOWN & FEATHER (Engine Failure in Flight)"},
          {defer:"Engine shut down for prop overspeed – single-engine landing, land as soon as possible."},
        ]
      }},
    ]},
    {id:"bleed-fail", name:"Bleed Air Failure (L / R BL AIR FAIL annunciator)", cond:"Bleed air line rupture / leak sensed", items:[
      {c:"Bleed air valve (affected side)", r:"INSTR & ENVIR OFF"},
      {c:"Brake deice", r:"OFF"},
      {c:"Pressurisation", r:"MONITOR (single bleed source; cabin may climb at high altitude / low power)"},
      {c:"Condition levers", r:"HIGH IDLE if required in descent to maintain cabin"},
      {branch:"Cabin altitude maintained?", opts:{
        "Yes":[{defer:"One bleed air source off – reduced pressurisation and rudder boost / surface deice capacity, maintenance required."}],
        "No":[{c:"Altitude", r:"DESCEND to hold cabin below 10,000 ft"},{defer:"Bleed air failure – limited pressurisation, lower cruise altitude, maintenance required."}]
      }},
    ]},
    {id:"press-ctrl", name:"Pressurisation Controller Failure / Cabin Not Following", cond:"Cabin altitude or rate not following controller; differential abnormal", items:[
      {c:"Cabin pressurisation switch", r:"PRESS"},
      {c:"Bleed air valves", r:"OPEN"},
      {c:"Controller", r:"RESELECT cabin altitude / rate; cycle rate knob"},
      {c:"Cabin differential", r:"CHECK – 6.5 psi max (safety valve relieves above; 6.0 psi on the 200)"},
      {branch:"Cabin response?", opts:{
        "Cabin following again":[{c:"Pressurisation", r:"MONITOR closely for remainder of flight"},{defer:"Pressurisation controller intermittent – maintenance check."}],
        "Cabin climbing":[
          {c:"Altitude", r:"DESCEND to keep cabin below 10,000 ft; oxygen if cabin above 10,000 ft"},
          {note:"Use Pressurisation Loss / Rapid Decompression if the cabin continues to climb.", kind:"warn"},
          {defer:"Pressurisation controller failed – unpressurised or limited altitude, oxygen as required."},
        ],
        "Differential too high":[
          {c:"Altitude", r:"DESCEND – reduce differential"},
          {c:"Condition levers", r:"LOW IDLE; one bleed air valve ENVIR OFF to reduce inflow"},
          {c:"Before landing", r:"CABIN PRESSURISATION switch DUMP below 10,000 ft so cabin is depressurised at touchdown"},
          {defer:"Outflow valve fault – depressurise with DUMP before landing; do not open the door until differential is zero."},
        ]
      }},
    ]},
    {id:"ice", name:"Icing Conditions / Ice Accumulation", items:[
      {c:"Engine anti-ice (ice vanes)", r:"ON (below 5°C in visible moisture) – ENG ANTI-ICE lights; expect lower torque"},
      {c:"Pitot heat / stall warning heat / fuel vent heat", r:"ON"},
      {c:"Propeller deice", r:"AUTO (ammeter 14–18 A); MANUAL if AUTO fails"},
      {c:"Windshield anti-ice", r:"NORMAL (HI if required in flight)"},
      {c:"Surface deice (boots)", r:"SINGLE cycle at first sign of ice – repeat as required"},
      {c:"Brake deice", r:"ON before landing if required (OFF within 10 min after gear retraction)"},
      {c:"Airspeed", r:"140 KIAS MINIMUM in sustained icing"},
      {c:"Autopilot", r:"DISCONNECT periodically – check for trim / control changes"},
      {c:"Exit icing", r:"CLIMB / DESCEND / TURN as required"},
      {branch:"Residual ice on airframe for landing?", opts:{
        "No":[{c:"Ice protection", r:"OFF when clear"}],
        "Yes":[
          {c:"Flaps", r:"APPROACH only for landing"},
          {c:"Approach speed", r:"INCREASE approx 10–15 KIAS; no abrupt pitch changes"},
          {c:"Engine anti-ice", r:"LEAVE ON until shutdown"},
          {defer:"Residual airframe ice – APPROACH flaps, Vref +10–15 KIAS, longer landing distance."},
        ]
      }},
    ]},
    {id:"pitot-fail", name:"Pitot / Static Heat Failure", cond:"L / R PITOT HEAT annunciator with switch ON, or erratic airspeed in icing", items:[
      {c:"Pitot heat switches", r:"CHECK ON (annunciator indicates heater failed or switch OFF)"},
      {c:"Pitot heat circuit breakers", r:"CHECK / RESET once"},
      {branch:"Annunciator out?", opts:{
        "Yes":[{c:"Flight", r:"CONTINUE, monitor"}],
        "No":[
          {c:"Airspeed indications", r:"CROSS-CHECK pilot vs copilot vs GPS ground speed; use the unaffected side (ADC reversion on Pro Line 21)"},
          {c:"Icing conditions", r:"AVOID / EXIT"},
          {c:"Pilot's emergency static source", r:"SELECT if static blockage suspected (altimeter / VSI erratic)"},
          {defer:"Pitot heat failed one side – use opposite airspeed source; avoid icing; approach by attitude and power if unreliable."},
        ]
      }},
    ]},
    {id:"hyd-gear", name:"HYD FLUID LOW / Landing Gear Unsafe", cond:"HYD FLUID LOW annunciator, gear handle red light stays on, or fewer than 3 green", items:[
      {c:"Airspeed", r:"BELOW 182 KIAS"},
      {c:"Landing gear control", r:"CONFIRM position selected; indicator bulbs CHECK (press to test / swap)"},
      {c:"Landing gear relay circuit breaker", r:"CHECK IN"},
      {branch:"Situation?", opts:{
        "HYD FLUID LOW, gear up":[
          {c:"Landing gear", r:"PLAN manual extension (Landing Gear Manual Extension) – do not rely on normal extension"},
          {defer:"Hydraulic fluid low – manual gear extension, no retraction after extension."},
        ],
        "HYD FLUID LOW, gear down":[
          {c:"Landing gear", r:"LEAVE DOWN – do not retract"},
          {c:"Airspeed", r:"182 KIAS maximum"},
          {defer:"Gear down for remainder of flight – 182 KIAS max, increased fuel burn."},
        ],
        "Gear unsafe after selection":[
          {c:"Landing gear control", r:"RECYCLE once (UP then DOWN, below 163 KIAS)"},
          {c:"Gear horn / lights", r:"CHECK – landing gear warning horn with power levers retarded"},
          {branch:"3 green?", opts:{
            "Yes":[{defer:"Gear indication fault – do not retract after landing, maintenance inspection required."}],
            "No":[{note:"Use Landing Gear Manual Extension; if still unsafe, plan a gear-unsafe landing (longest runway, emergency services).", kind:"warn"}]
          }},
        ]
      }},
    ]},
  ]
});
