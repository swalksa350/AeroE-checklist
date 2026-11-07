/* Cessna 441 Conquest II – checklist data.
   Prototype content. Verify against the operator's approved checklist and the POH/AFM. */
window.AIRCRAFT = window.AIRCRAFT || [];
window.AIRCRAFT.push({
  id: "c441",
  maker: "Cessna",
  model: "441 Conquest II",
  short: "C441",
  category: "Turboprop",
  engine: "2× Honeywell (Garrett) TPE331-8-401S/-402S or TPE331-10N (Dash 10 conversion), 636 shp flat-rated",
  seats: "1–2 crew + up to 9 passengers",
  basis: "Typical 441 Conquest II (9,850 lb MTOW, 9,360 lb MLW) AFM procedures; TPE331 single-shaft engine with start locks, NTS and SRL. Condition levers are called speed levers in some manuals; autofeather is not fitted to all airframes. Dash 10 conversions share limits unless the STC supplement differs.",
  vspeeds: [
    {k:"Vmca", v:"91 KIAS"},
    {k:"Vr", v:"95–100 KIAS (weight dependent)"},
    {k:"V2", v:"approx 110 KIAS (108–112 by weight)"},
    {k:"Vxse", v:"109 KIAS"},
    {k:"Vyse", v:"118 KIAS (blue line; best single-engine rate of climb)"},
    {k:"Vy", v:"approx 130 KIAS; cruise climb 150–160 KIAS"},
    {k:"Vfe", v:"174 KIAS (APPROACH 15°) / 140 KIAS (LAND 30°)"},
    {k:"Vlo / Vle", v:"175 KIAS"},
    {k:"Va", v:"approx 170 KIAS (9,850 lb)"},
    {k:"Vmo / Mmo", v:"245 KIAS / 0.52 M"},
    {k:"Vs / Vso", v:"approx 85–90 / 75–80 KIAS (max weight)"},
    {k:"Vref", v:"95–105 KIAS (flaps LAND, weight dependent)"},
    {k:"Max differential", v:"6.3 psi; max operating altitude 35,000 ft"}
  ],

  normal: [
    {id:"pre", name:"Before Start", items:[
      {c:"Preflight inspection", r:"COMPLETE (prop start locks engaged – blades flat, not feathered)"},
      {c:"Passenger briefing", r:"COMPLETE (belts, cabin door / emergency exit, oxygen masks, no smoking)"},
      {c:"Seats, belts, shoulder harnesses", r:"ADJUST & LOCK"},
      {c:"Cabin door / emergency exit", r:"CLOSED & LOCKED (door light out)"},
      {c:"Parking brake", r:"SET"},
      {c:"Control lock", r:"REMOVED"},
      {c:"Landing gear switch", r:"DOWN"},
      {c:"Power levers", r:"GROUND IDLE"},
      {c:"Condition levers", r:"EMERGENCY SHUTOFF (aft)"},
      {c:"Avionics power", r:"OFF"},
      {c:"Bleed air switches", r:"OFF"},
      {c:"Ice protection switches", r:"OFF"},
      {c:"Firewall fuel shutoff switches", r:"OPEN (guards down, lights out)"},
      {c:"Fuel crossfeed", r:"OFF"},
      {c:"Battery switch", r:"ON (24 V minimum; external power as required)"},
      {c:"Inverter", r:"1 (or 2) – AC power check"},
      {c:"Annunciator panel", r:"PRESS TO TEST – all lights illuminate"},
      {c:"Fuel quantity", r:"CHECK both sides against plan (475 gal / approx 3,180 lb usable)"},
      {c:"Oxygen", r:"ON – pressure checked (approx 1,800 psi full), crew masks tested"},
      {c:"Cabin pressurisation", r:"CONTROLLER SET (cruise altitude, rate approx 500 fpm), dump switch NORMAL"},
      {c:"Beacon", r:"ON"},
    ]},
    {id:"start", name:"Engine Start", items:[
      {c:"Propeller area", r:"CLEAR (both sides)"},
      {c:"Fuel boost pumps", r:"ON (L & R) – FUEL PRESS LOW lights out"},
      {c:"Power lever", r:"GROUND IDLE"},
      {c:"Condition lever", r:"LOW (forward of EMERGENCY SHUTOFF detent)"},
      {c:"Ignition", r:"NORMAL"},
      {c:"Start switch", r:"START (release – sequence is automatic)"},
      {c:"Fuel / ignition", r:"ON at approx 10% RPM (fuel flow indicated)"},
      {c:"Light-off", r:"EGT RISE within 10 sec – if none, abort (condition lever EMERGENCY SHUTOFF)"},
      {c:"EGT", r:"MONITOR – 770°C maximum during start"},
      {c:"NTS light", r:"ILLUMINATES during spool-up, then OUT (NTS check)"},
      {c:"Oil pressure", r:"RISING (40 psi minimum at idle)"},
      {c:"Starter", r:"CUT OUT approx 60% RPM (start light out)"},
      {c:"RPM", r:"STABILISED approx 65–75% (ground idle, LOW)"},
      {c:"Start locks", r:"RELEASE – power lever momentarily into REVERSE, then GROUND IDLE"},
      {c:"Propeller", r:"OFF LOCKS (blade angle / torque change noted)"},
      {c:"Generator", r:"ON – GEN OFF light out, charging"},
      {c:"Second engine", r:"REPEAT start sequence"},
      {c:"External power", r:"DISCONNECTED (if used)"},
      {c:"Engine instruments", r:"CHECK both (oil pressure 70–120 psi warm, oil temp 55–110°C, EGT, fuel flow)"},
      {c:"Avionics power", r:"ON"},
      {note:"Starter limits per AFM: allow the starter to cool between attempts; three consecutive battery starts maximum. A start with a feathered propeller (locks not engaged) is a hot, high-load start – use the unfeather pump to bring the blades flat first, or follow the AFM feathered-start procedure.", kind:"caution"},
    ]},
    {id:"taxi", name:"Before Taxi", items:[
      {c:"Bleed air switches", r:"ON (both) – cabin temperature as required"},
      {c:"Inverter", r:"CHECK 1 and 2 (select each, AC instruments powered)"},
      {c:"Flight instruments", r:"CHECK & SET (altimeters, HSI, attitude indicators, standby instruments)"},
      {c:"Avionics / GPS / radios", r:"SET"},
      {c:"Electric pitch trim", r:"CHECK (each half of split switch alone – no motion; together – motion; disconnect stops trim)"},
      {c:"Autopilot / yaw damper", r:"TEST, ENGAGE, OVERPOWER & DISCONNECT – then OFF"},
      {c:"Trims (pitch, rudder, aileron)", r:"SET for takeoff"},
      {c:"Condition levers", r:"LOW (taxi RPM approx 65–75%)"},
      {c:"Brakes", r:"CHECK on initial roll"},
      {c:"Power levers", r:"GROUND IDLE / BETA as required – REVERSE only at taxi speeds"},
    ]},
    {id:"runup", name:"Before Takeoff", items:[
      {c:"Parking brake", r:"SET"},
      {c:"Flight controls", r:"FREE & CORRECT"},
      {c:"Condition levers", r:"HIGH – 100% RPM both (check within 1%)"},
      {c:"SRL computers", r:"CHECK – switch OFF: SRL OFF light ON, EGT indication decreases; switch ON: light OUT"},
      {c:"Overspeed governor / NTS", r:"CHECK per AFM (or NTS lights checked during start)"},
      {c:"Autofeather (if installed)", r:"TEST, then ARM"},
      {c:"Engine instruments", r:"CHECK both (oil 70–120 psi, EGT stable, fuel flow matched, torque matched)"},
      {c:"Generators", r:"CHECK both charging, voltage 28 V, load balanced"},
      {c:"Ice protection", r:"CHECK (prop deice ammeter cycles, surface deice one cycle, windshield heat, pitot / stall heat) – then AS REQUIRED"},
      {c:"Engine inlet anti-ice", r:"ON if OAT below 5°C in visible moisture (expect EGT rise)"},
      {c:"Ignition", r:"NORMAL (CONTINUOUS for standing water, heavy rain or icing)"},
      {c:"Fuel boost pumps", r:"ON both; crossfeed OFF; FUEL PRESS LOW lights out"},
      {c:"Firewall fuel shutoffs", r:"OPEN"},
      {c:"Bleed air", r:"ON both; cabin pressurisation controller SET"},
      {c:"Wing flaps", r:"UP or APPROACH (15°) per performance"},
      {c:"Trims", r:"SET takeoff"},
      {c:"Landing gear switch", r:"DOWN – three green"},
      {c:"Pitot / static heat", r:"ON"},
      {c:"Lights", r:"AS REQUIRED"},
      {c:"Transponder", r:"ALT"},
      {c:"Cabin door / exit", r:"LOCKED – lights out"},
      {c:"Takeoff briefing", r:"COMPLETE (Vmca 91 / Vr 95–100 / V2 110 / Vyse 118; abort before rotation; after liftoff gear up, confirm NTS / feather)"},
      {c:"Condition levers", r:"HIGH (100%) for takeoff"},
      {c:"Power levers", r:"SET TAKEOFF TORQUE – do not exceed 100% torque or 770°C EGT"},
    ]},
    {id:"climb", name:"After Takeoff / Climb", items:[
      {c:"Landing gear", r:"UP (positive rate, below 175 KIAS) – lights out"},
      {c:"Wing flaps", r:"UP (above V2 / 110 KIAS)"},
      {c:"Climb power", r:"SET – torque within limits, EGT 770°C max, 100% RPM"},
      {c:"Airspeed", r:"130 KIAS (best rate) / 150–160 KIAS cruise climb"},
      {c:"Autofeather (if installed)", r:"OFF above safe altitude per AFM"},
      {c:"Yaw damper / autopilot", r:"AS REQUIRED (above minimum engagement altitude)"},
      {c:"Cabin pressurisation", r:"CHECK climbing approx 500 fpm, differential increasing – 6.3 psi max"},
      {c:"Engine instruments", r:"CHECK both"},
      {c:"Ice protection", r:"AS REQUIRED"},
      {c:"Altimeters", r:"SET standard at transition"},
    ]},
    {id:"cruise", name:"Cruise", items:[
      {c:"Condition levers", r:"96–100% RPM as desired (96% typical cruise)"},
      {c:"Cruise power", r:"SET per AFM table – torque / EGT (770°C max, 650–700°C typical) / fuel flow"},
      {c:"Propellers", r:"SYNCHRONISE (synchrophaser ON if fitted)"},
      {c:"Fuel quantity / balance", r:"CHECK both sides against plan – crossfeed to balance as required"},
      {c:"Cabin pressurisation", r:"CHECK cabin altitude / differential (6.3 psi max), rate zero"},
      {c:"Oxygen", r:"PRESSURE CHECK (above FL250 crew mask within reach / per regulations)"},
      {c:"Engine instruments", r:"CHECK both (oil pressure / temperature, EGT, torque, RPM)"},
      {c:"Electrical", r:"CHECK generator loads balanced, inverter"},
      {c:"Ice protection", r:"AS REQUIRED (engine anti-ice ON in visible moisture below 5°C)"},
    ]},
    {id:"desc", name:"Descent", items:[
      {c:"Altimeters", r:"SET"},
      {c:"Cabin pressurisation", r:"SET landing field elevation, rate approx 500 fpm"},
      {c:"Power", r:"REDUCE as required – power levers never below FLIGHT IDLE in flight"},
      {c:"Airspeed", r:"BELOW 245 KIAS / 0.52 M; plan below 175 KIAS for gear"},
      {c:"Fuel crossfeed", r:"OFF (balanced)"},
      {c:"Ice protection", r:"AS REQUIRED (engine anti-ice ON in visible moisture below 5°C)"},
      {c:"Approach briefing", r:"COMPLETE (incl. single-engine go-around decision point)"},
      {c:"Seat belts / harnesses", r:"SECURE – passengers briefed"},
    ]},
    {id:"land", name:"Before Landing", items:[
      {c:"Fuel boost pumps", r:"ON both; crossfeed OFF"},
      {c:"Condition levers", r:"HIGH (100% RPM)"},
      {c:"Ignition", r:"CONTINUOUS if standing water / heavy precipitation"},
      {c:"Airspeed", r:"BELOW 175 KIAS"},
      {c:"Landing gear", r:"DOWN – three green, hydraulic pressure normal"},
      {c:"Wing flaps", r:"APPROACH (15°) below 174 KIAS; LAND (30°) below 140 KIAS"},
      {c:"Cabin pressurisation", r:"CHECK differential near zero before touchdown"},
      {c:"Autopilot / yaw damper", r:"OFF before landing"},
      {c:"Airspeed", r:"Vref 95–105 KIAS (flaps LAND)"},
      {c:"Landing lights", r:"ON"},
      {c:"Landing gear", r:"THREE GREEN – confirmed on final"},
    ]},
    {id:"after", name:"After Landing", items:[
      {c:"Power levers", r:"GROUND IDLE (lift over flight-idle gate) – REVERSE as required, idle below taxi speed"},
      {c:"Condition levers", r:"LOW"},
      {c:"Wing flaps", r:"UP"},
      {c:"Ice protection / pitot heat", r:"OFF"},
      {c:"Ignition", r:"NORMAL"},
      {c:"Landing / strobe lights", r:"AS REQUIRED"},
      {c:"Transponder", r:"STBY / as required"},
      {c:"Trims", r:"SET takeoff"},
    ]},
    {id:"shut", name:"Shutdown", items:[
      {c:"Parking brake", r:"SET"},
      {c:"Power levers", r:"GROUND IDLE"},
      {c:"Condition levers", r:"LOW – 1 minute cool-down, EGT stabilised"},
      {c:"Avionics power", r:"OFF"},
      {c:"Bleed air / environmental", r:"OFF"},
      {c:"Ice protection / lights", r:"OFF"},
      {c:"Condition levers", r:"EMERGENCY SHUTOFF (fuel cutoff)"},
      {c:"Power levers", r:"REVERSE as RPM decays – hold until propellers stop (engages start locks)"},
      {c:"NTS lights", r:"ILLUMINATE during coast-down (NTS check)"},
      {c:"Propellers", r:"STOPPED on start locks – blades flat, not feathered"},
      {c:"Power levers", r:"GROUND IDLE"},
      {c:"Fuel boost pumps", r:"OFF"},
      {c:"Generators / inverter", r:"OFF"},
      {c:"Battery switch", r:"OFF"},
      {c:"Control lock", r:"INSTALL"},
      {c:"Chocks / covers", r:"AS REQUIRED"},
      {note:"If the start locks did not engage the propeller feathers as it stops. Note it for the next start (unfeather pump or AFM feathered-start procedure).", kind:"caution"},
    ]},
  ],
  emergency: [
    {id:"eng-fail-to", name:"Engine Failure / Abort During Takeoff", cond:"Before rotation, or airborne with runway remaining", items:[
      {c:"Power levers", r:"GROUND IDLE then REVERSE (both)", mem:true},
      {c:"Brakes", r:"MAXIMUM – stop straight ahead", mem:true},
      {branch:"Airborne?", opts:{
        "No – on the runway":[
          {c:"Condition levers", r:"EMERGENCY SHUTOFF (both) once stopped or if fire"},
          {c:"Firewall fuel shutoffs", r:"CLOSED"},
          {c:"Fuel boost pumps", r:"OFF"},
          {c:"Battery / generators", r:"OFF"},
        ],
        "Yes – runway remaining":[
          {c:"Land", r:"STRAIGHT AHEAD, gear down", mem:true},
          {c:"Power levers", r:"GROUND IDLE / REVERSE after touchdown"},
          {c:"Condition levers / firewall shutoffs", r:"EMERGENCY SHUTOFF / CLOSED after stop"},
        ],
        "Yes – no runway remaining":[
          {note:"Go to Engine Failure After Liftoff.", kind:"warn"},
        ]
      }},
      {note:"Below Vmca (91 KIAS) directional control cannot be assured with takeoff power on one engine. Reverse on one engine only produces a strong yaw – use symmetric reverse or none.", kind:"warn"},
    ]},
    {id:"eng-fail-liftoff", name:"Engine Failure After Liftoff", cond:"Airborne, insufficient runway to land ahead", land:"LAND AS SOON AS POSSIBLE", items:[
      {c:"Power levers", r:"MAXIMUM TORQUE (do not exceed 770°C EGT)", mem:true},
      {c:"Condition levers", r:"HIGH (100%)", mem:true},
      {c:"Landing gear", r:"UP", mem:true},
      {c:"Airspeed", r:"V2 110 KIAS to clear obstacles, then Vyse 118 KIAS – never below 91 KIAS", mem:true},
      {c:"NTS / autofeather", r:"CONFIRM – inoperative propeller moving toward feather (yaw controllable)", mem:true},
      {c:"Inoperative engine", r:"IDENTIFY – dead foot, dead engine", mem:true},
      {c:"Inoperative engine power lever", r:"VERIFY – retard, no change", mem:true},
      {c:"Inoperative engine condition lever", r:"EMERGENCY SHUTOFF (feather / fuel cutoff)", mem:true},
      {c:"Wing flaps", r:"UP (above 110 KIAS)"},
      {c:"Bank", r:"3–5° toward operating engine, ball half out"},
      {c:"Trim", r:"RUDDER & AILERON for straight flight"},
      {c:"Climb", r:"118 KIAS to safe altitude, then Engine Failure in Flight (secure items)"},
      {note:"NTS only reduces drag – it does not fully feather the propeller. Feather with the condition lever once the failed engine is confirmed.", kind:"warn"},
      {defer:"One engine inoperative after takeoff – single-engine approach and landing, no go-around once committed."},
    ]},
    {id:"eng-fail-flt", name:"Engine Failure in Flight", cond:"Loss of power on one engine at altitude", land:"LAND AS SOON AS POSSIBLE", items:[
      {c:"Power levers", r:"AS REQUIRED (within torque / EGT limits)", mem:true},
      {c:"Condition levers", r:"HIGH (100%)", mem:true},
      {c:"Airspeed", r:"118 KIAS (Vyse) minimum; gear and flaps UP", mem:true},
      {c:"Inoperative engine", r:"IDENTIFY – dead foot, dead engine", mem:true},
      {c:"Inoperative engine power lever", r:"VERIFY – retard, no change", mem:true},
      {c:"Inoperative engine condition lever", r:"EMERGENCY SHUTOFF (feather / fuel cutoff)", mem:true},
      {c:"Inoperative engine firewall fuel shutoff", r:"CLOSED"},
      {c:"Inoperative engine fuel boost pump", r:"OFF"},
      {c:"Inoperative engine generator", r:"OFF"},
      {c:"Inoperative engine bleed air", r:"OFF"},
      {c:"Inoperative engine ice protection", r:"OFF (prop deice, inlet anti-ice)"},
      {c:"Propeller synchrophaser", r:"OFF (if fitted)"},
      {c:"Electrical load", r:"REDUCE (single generator)"},
      {c:"Fuel crossfeed", r:"AS REQUIRED to use fuel from the dead-engine side"},
      {c:"Bank / rudder / trim", r:"3–5° toward operating engine, ball half out, trimmed"},
      {c:"Cabin pressurisation", r:"CHECK – single bleed source, differential may reduce"},
      {branch:"Cause known (fuel / inadvertent shutoff) and within air-start envelope?", opts:{
        "Yes – attempt air start":[
          {note:"Use the Air Start (Starter Assisted) procedure. If unsuccessful, leave the engine secured.", kind:"caution"},
        ],
        "No – leave secured":[
          {c:"ATC", r:"ADVISE – nearest suitable airport, drift-down altitude checked"},
        ]
      }},
      {defer:"One engine inoperative – single-engine approach and landing, single generator / bleed source, no go-around once committed."},
    ]},
    {id:"eng-fire-flt", name:"Engine Fire in Flight", cond:"FIRE warning light or visible fire", land:"LAND IMMEDIATELY", items:[
      {c:"Affected engine condition lever", r:"EMERGENCY SHUTOFF (feather / fuel cutoff)", mem:true},
      {c:"Affected engine firewall fuel shutoff", r:"CLOSED", mem:true},
      {c:"Affected engine fuel boost pump", r:"OFF", mem:true},
      {c:"Affected engine bleed air", r:"OFF", mem:true},
      {c:"Fire extinguisher (if installed)", r:"DISCHARGE to affected engine", mem:true},
      {c:"Affected engine generator", r:"OFF"},
      {c:"Affected engine power lever", r:"FLIGHT IDLE"},
      {c:"Affected engine ice protection", r:"OFF"},
      {c:"Airspeed", r:"118 KIAS or higher – increase if fire persists"},
      {c:"Cabin pressurisation / air", r:"CHECK for smoke – dump / descend as required"},
      {c:"Landing", r:"NEAREST SUITABLE AIRPORT – do not attempt restart"},
      {defer:"Engine fire – engine secured, single-engine landing, fire services requested."},
    ]},
    {id:"eng-fire-ground", name:"Engine Fire During Start / On the Ground", items:[
      {c:"Condition lever", r:"EMERGENCY SHUTOFF", mem:true},
      {c:"Firewall fuel shutoff", r:"CLOSED", mem:true},
      {c:"Starter", r:"CONTINUE CRANKING to purge fuel / lower EGT (if engine turning)", mem:true},
      {c:"Fuel boost pumps", r:"OFF"},
      {c:"Fire extinguisher (if installed)", r:"DISCHARGE"},
      {c:"Other engine", r:"SHUT DOWN (condition lever EMERGENCY SHUTOFF)"},
      {c:"Battery / generators", r:"OFF"},
      {c:"Aircraft", r:"EVACUATE – portable extinguisher on the fire from upwind"},
      {note:"Do not attempt another start after a fire until the engine has been inspected.", kind:"warn"},
    ]},
    {id:"air-start", name:"Air Start (Starter Assisted)", cond:"Restart attempt with cause identified; within envelope (typically below 20,000 ft, 120–150 KIAS)", items:[
      {note:"The TPE331 is a single-shaft engine: a feathered propeller will not windmill it to starting RPM. Every air start is starter assisted. No unassisted windmilling restart exists.", kind:"warn"},
      {c:"Airspeed / altitude", r:"WITHIN AIR-START ENVELOPE (approx 120–150 KIAS, below 20,000 ft)"},
      {c:"Firewall fuel shutoff", r:"OPEN"},
      {c:"Fuel boost pump", r:"ON"},
      {c:"Generator (affected engine)", r:"OFF"},
      {c:"Electrical load", r:"REDUCE (starter draws from battery / other generator)"},
      {c:"Power lever", r:"FLIGHT IDLE"},
      {c:"Condition lever", r:"LOW (out of EMERGENCY SHUTOFF)"},
      {c:"Unfeather pump", r:"ON until propeller leaves feather / RPM rising"},
      {c:"Start switch", r:"START"},
      {c:"Ignition / fuel", r:"ON automatically at approx 10% RPM"},
      {c:"EGT", r:"MONITOR – 770°C maximum; abort if no light-off within 10 sec or EGT rising through limit"},
      {c:"Starter", r:"CUTS OUT approx 60% RPM – unfeather pump OFF"},
      {branch:"Engine running normally?", opts:{
        "Yes":[
          {c:"Condition lever", r:"HIGH (match RPM) after oil pressure / temperature normal"},
          {c:"Power lever", r:"ADVANCE slowly – match torque"},
          {c:"Generator / bleed air / ice protection", r:"ON as required"},
          {c:"Fuel crossfeed", r:"AS REQUIRED to rebalance"},
          {defer:"Engine restarted in flight – land as soon as practical, cause investigation required."},
        ],
        "No":[
          {c:"Condition lever", r:"EMERGENCY SHUTOFF"},
          {c:"Start switch / unfeather pump", r:"OFF"},
          {c:"Firewall fuel shutoff / boost pump", r:"CLOSED / OFF"},
          {note:"Leave the engine secured – complete Engine Failure in Flight. Allow starter cooling before any further attempt.", kind:"warn"},
        ]
      }},
    ]},
    {id:"emer-desc", name:"Emergency Descent", items:[
      {c:"Power levers", r:"FLIGHT IDLE", mem:true},
      {c:"Condition levers", r:"HIGH (100%)", mem:true},
      {c:"Landing gear", r:"DOWN (below 175 KIAS)", mem:true},
      {c:"Wing flaps", r:"UP", mem:true},
      {c:"Airspeed", r:"175 KIAS gear down; up to 245 KIAS / 0.52 M clean if structure not in doubt", mem:true},
      {c:"Autopilot", r:"OFF"},
      {c:"Oxygen masks", r:"ON if cabin altitude above 10,000 ft"},
      {c:"ATC", r:"ADVISE"},
      {c:"Level-off", r:"10,000 ft or MEA – power as required"},
    ]},
    {id:"decompression", name:"Rapid Decompression / CABIN ALT Warning", cond:"CABIN ALT light, cabin altitude above 10,000 ft or rapid differential loss", land:"LAND AS SOON AS PRACTICAL", items:[
      {c:"Crew oxygen masks", r:"ON – 100%", mem:true},
      {c:"Microphone", r:"OXYGEN MASK", mem:true},
      {c:"Passenger oxygen", r:"ON / masks deployed – passengers don masks", mem:true},
      {c:"Emergency descent", r:"INITIATE to 10,000 ft or MEA", mem:true},
      {c:"Cabin pressurisation", r:"CHECK controller mode, dump switch NORMAL, bleed air switches ON"},
      {branch:"Cabin pressure recoverable (controller / bleed fault)?", opts:{
        "Yes":[
          {c:"Pressurisation", r:"MANUAL mode / other bleed source as required"},
          {c:"Altitude", r:"LIMIT to keep cabin altitude below 10,000 ft"},
          {defer:"Pressurisation fault – fly unpressurised or on manual control, oxygen used; maintenance required."},
        ],
        "No – structural / door":[
          {c:"Altitude", r:"10,000 ft or MEA; airspeed reduced if structural damage suspected"},
          {c:"Oxygen", r:"MONITOR supply duration"},
          {defer:"Unpressurised with possible structural damage – land as soon as possible, reduced airspeed."},
        ]
      }},
    ]},
    {id:"smoke-fire", name:"Smoke / Electrical Fire", land:"LAND AS SOON AS POSSIBLE", items:[
      {c:"Crew oxygen masks", r:"ON – 100%, microphone to mask", mem:true},
      {c:"Avionics power", r:"OFF", mem:true},
      {c:"Non-essential electrical", r:"OFF", mem:true},
      {branch:"Smoke source?", opts:{
        "Electrical":[
          {c:"Fire extinguisher", r:"USE on source"},
          {c:"Circuit breakers", r:"IDENTIFY & PULL affected circuit"},
          {branch:"Fire out?", opts:{
            "Yes":[{c:"Essential electrical / avionics", r:"ON one at a time, watching for smoke"},{defer:"Electrical fire – suspect circuits isolated, affected systems unavailable."}],
            "No":[{c:"Battery & generators", r:"OFF"},{c:"Inverter", r:"OFF"},{note:"Standby instruments only. Gear by emergency hand pump, flaps inoperative – plan a flaps-up landing with no landing lights.", kind:"warn"},{defer:"Electrical power off – emergency gear extension, flaps-up landing, no radios / lights."}]
          }},
        ],
        "Environmental / bleed air":[
          {c:"Bleed air switches", r:"OFF one at a time to identify source"},
          {c:"Suspect bleed air", r:"OFF – pressurise on remaining engine"},
          {defer:"Bleed air smoke – one bleed source off, reduced pressurisation / heating."},
        ]
      }},
      {c:"Smoke removal", r:"DESCEND below 10,000 ft, pressurisation DUMP / cabin air open as required"},
    ]},
    {id:"gear-emer", name:"Emergency Gear Extension", cond:"Gear does not extend hydraulically / HYD PRESS LOW", items:[
      {c:"Airspeed", r:"BELOW 175 KIAS – reduce to approx 140 KIAS"},
      {c:"Landing gear circuit breaker / hydraulic pump", r:"PULL / OFF (per AFM)"},
      {c:"Landing gear switch", r:"DOWN"},
      {c:"Emergency gear extension valve / release", r:"EMERGENCY (if fitted – gear free-falls partially)"},
      {c:"Emergency hand pump", r:"PUMP until three green and pressure felt (handle in pedestal / floor)"},
      {c:"Landing gear indicator", r:"THREE GREEN"},
      {c:"Hand pump handle", r:"STOW"},
      {note:"Do not reset the hydraulic pump breaker or move the gear switch after an emergency extension. Leave the gear down.", kind:"warn"},
      {branch:"Three green obtained?", opts:{
        "Yes":[{defer:"Gear extended by emergency means – do not retract; gear / hydraulic inspection required."}],
        "No":[
          {c:"Runway", r:"LONGEST available, emergency services advised"},
          {c:"Landing", r:"FLAPS LAND, minimum speed, condition levers EMERGENCY SHUTOFF and firewall shutoffs CLOSED just before touchdown, battery OFF"},
          {defer:"Gear-up / partial gear landing – longest runway, engines shut down on short final, evacuate after stopping."},
        ]
      }},
    ]},
    {id:"se-landing", name:"Single-Engine Approach, Landing & Go-Around", cond:"One engine secured", items:[
      {c:"Operating engine fuel boost pump", r:"ON; crossfeed as required, then OFF for landing"},
      {c:"Operating engine condition lever", r:"HIGH (100%)"},
      {c:"Operating engine bleed air", r:"ON (pressurisation on single source)"},
      {c:"Airspeed", r:"118 KIAS (Vyse) until landing assured"},
      {c:"Approach", r:"NORMAL glidepath or slightly high – avoid low, flat approaches"},
      {c:"Landing gear", r:"DOWN when landing assured – three green"},
      {c:"Wing flaps", r:"APPROACH (15°) when landing assured; LAND (30°) on short final only"},
      {c:"Airspeed", r:"REDUCE below 118 KIAS only on short final – Vref 95–105 KIAS"},
      {c:"Power lever", r:"REDUCE smoothly – anticipate yaw change with power"},
      {branch:"Go-around required?", opts:{
        "No":[
          {c:"Landing", r:"NORMAL – reverse NOT recommended (asymmetric); brakes as required"},
          {c:"After stop", r:"Clear runway on one engine only if controllable, otherwise shut down and await tow"},
        ],
        "Yes – above decision height":[
          {c:"Operating engine power lever", r:"MAXIMUM TORQUE (770°C EGT max)"},
          {c:"Wing flaps", r:"APPROACH (15°) then UP above 110 KIAS"},
          {c:"Landing gear", r:"UP (positive climb)"},
          {c:"Airspeed", r:"118 KIAS (Vyse)"},
          {c:"Bank", r:"3–5° toward operating engine"},
          {note:"A single-engine go-around below approx 200 ft AGL, or once LAND flaps are extended, should not be attempted.", kind:"warn"},
        ]
      }},
    ]},
    {id:"prop-overspeed", name:"Propeller Overspeed / Uncontrolled RPM", cond:"RPM above 101% and not responding to the condition lever", land:"LAND AS SOON AS POSSIBLE", items:[
      {c:"Affected engine power lever", r:"REDUCE", mem:true},
      {c:"Affected engine condition lever", r:"LOW", mem:true},
      {c:"Airspeed", r:"REDUCE (lower pitch attitude load on the propeller)", mem:true},
      {c:"Oil pressure (affected engine)", r:"CHECK – governor is oil operated"},
      {branch:"RPM controllable at or below 100%?", opts:{
        "Yes":[
          {c:"Power", r:"SET minimum that keeps RPM in limits; condition lever as required"},
          {c:"Propeller synchrophaser", r:"OFF"},
          {defer:"Propeller governor fault – RPM controlled by power lever and airspeed, land as soon as possible."},
        ],
        "No – RPM above 105% / uncontrolled":[
          {c:"Affected engine condition lever", r:"EMERGENCY SHUTOFF (feather)"},
          {c:"Engine", r:"SECURE per Engine Failure in Flight"},
          {note:"Expect high drag if the propeller does not feather. Maintain 118 KIAS or above.", kind:"warn"},
          {defer:"Engine shut down for propeller overspeed – single-engine landing, possible unfeathered propeller drag."},
        ]
      }},
    ]},
  ],
  abnormal: [
    {id:"gen-fail", name:"Generator Failure (GEN OFF light)", cond:"L or R GEN OFF annunciator, loadmeter zero", items:[
      {c:"Affected generator switch", r:"RESET, then ON"},
      {branch:"Generator restored?", opts:{
        "Yes":[{c:"Loadmeters / voltmeter", r:"MONITOR both"}],
        "No – one generator failed":[
          {c:"Affected generator switch", r:"OFF"},
          {c:"Electrical load", r:"REDUCE to within one generator's capacity (ice protection, air conditioning)"},
          {defer:"One generator inoperative – electrical load reduced, land as soon as practical."},
        ],
        "No – both failed":[
          {c:"Both generator switches", r:"OFF"},
          {c:"Non-essential electrical", r:"OFF – battery only, approx 30 min endurance"},
          {c:"Inverter", r:"ONE only"},
          {c:"Landing gear", r:"PLAN early extension while battery power remains (hand pump if needed)"},
          {defer:"Both generators failed – battery only; extend gear early, flaps may be unavailable, land as soon as possible."},
        ]
      }},
    ]},
    {id:"inv-fail", name:"Inverter Failure (INVERTER / AC light)", items:[
      {c:"Inverter select switch", r:"OTHER INVERTER (1 to 2 or 2 to 1)"},
      {c:"AC-powered instruments", r:"CHECK restored (attitude / HSI / flight director as applicable)"},
      {branch:"AC power restored?", opts:{
        "Yes":[{defer:"One inverter failed – no AC backup; land as soon as practical."}],
        "No":[
          {c:"Standby attitude indicator / magnetic compass", r:"USE – cross-check with GPS"},
          {c:"Autopilot", r:"OFF if coupled to failed instruments"},
          {c:"IMC", r:"EXIT / AVOID"},
          {defer:"Both inverters failed – partial panel, no AC instruments; prefer VMC approach."},
        ]
      }},
    ]},
    {id:"oil-press", name:"Low Oil Pressure (one engine)", cond:"OIL PRESS LOW light or pressure below 70 psi above idle (40 psi minimum)", items:[
      {c:"Oil pressure / oil temperature", r:"CHECK and cross-check the affected engine"},
      {branch:"Pressure below 40 psi, falling, or oil temperature rising?", opts:{
        "Yes – genuine":[
          {c:"Affected engine power", r:"REDUCE to minimum required"},
          {c:"Engine", r:"SHUT DOWN & FEATHER before seizure if altitude and terrain allow (Engine Failure in Flight)"},
          {note:"A seizing TPE331 may not feather – shut down early while oil pressure remains.", kind:"warn"},
          {defer:"Low oil pressure – precautionary shutdown, single-engine landing, land as soon as possible."},
        ],
        "No – indication suspect":[{c:"Flight", r:"CONTINUE, monitor pressure and temperature"},{defer:"Oil pressure indication suspect – maintenance check required."}]
      }},
    ]},
    {id:"chip", name:"CHIP DETECTOR light", items:[
      {c:"Affected engine oil pressure / temperature", r:"MONITOR closely"},
      {c:"Affected engine power", r:"REDUCE to minimum practical"},
      {branch:"Other abnormal indications (vibration, oil pressure, temperature)?", opts:{
        "No":[{defer:"Chip detector – land as soon as practical, maintenance inspection required."}],
        "Yes":[{c:"Engine", r:"SHUT DOWN & FEATHER if altitude and terrain allow"},{defer:"Chip detector with secondary indications – precautionary shutdown, land as soon as possible."}]
      }},
    ]},
    {id:"fuel-press", name:"FUEL PRESS LOW / Crossfeed", cond:"L or R FUEL PRESS LOW light, or fuel imbalance", items:[
      {c:"Affected side fuel boost pump", r:"CHECK ON (switch / breaker)"},
      {c:"Fuel quantity", r:"CHECK both sides"},
      {branch:"Light extinguished?", opts:{
        "Yes":[{defer:"Fuel boost pump cycled – pump suspect, maintenance check."}],
        "No – pump failed, fuel available":[
          {c:"Fuel crossfeed", r:"ON – engine fed from other side's pump"},
          {c:"Altitude", r:"LIMIT per AFM (engine-driven pump suction feed) if crossfeed not used"},
          {defer:"Fuel boost pump failed – crossfeed in use, monitor balance."},
        ],
        "No – fuel low on that side":[
          {c:"Fuel crossfeed", r:"ON to balance"},
          {c:"Fuel endurance", r:"RECOMPUTE – divert as required"},
          {defer:"Fuel imbalance / low – crossfeed used, land with crossfeed OFF where possible."},
        ]
      }},
      {note:"Crossfeed is for balancing and single-engine operation: do not take off or land with crossfeed ON unless required.", kind:"caution"},
    ]},
    {id:"nts-inop", name:"NTS / Autofeather Inoperative Indication", cond:"NTS light fails to illuminate on start or shutdown, or NTS light ON in flight", items:[
      {branch:"When?", opts:{
        "On the ground – check failed":[
          {c:"Engine", r:"SHUT DOWN – do not fly without a satisfactory NTS check"},
          {note:"Without NTS an engine failure leaves a nearly flat-pitch windmilling propeller with very high drag until manually feathered.", kind:"warn"},
        ],
        "In flight – NTS light ON":[
          {c:"Affected engine torque / EGT / RPM", r:"CHECK – NTS light means negative torque (engine not producing power)"},
          {c:"Affected engine", r:"IF FAILED: condition lever EMERGENCY SHUTOFF (Engine Failure in Flight)"},
          {c:"If engine normal", r:"POWER LEVER ADVANCE slightly (light may show at flight idle in descent)"},
          {defer:"NTS light in flight – if engine normal, system check required after landing."},
        ],
        "In flight – autofeather inoperative light":[
          {c:"Autofeather switch", r:"OFF then ARM (reset once)"},
          {c:"Engine failure plan", r:"MANUAL FEATHER with condition lever – brief for approach"},
          {defer:"Autofeather inoperative – manual feather required on engine failure."},
        ]
      }},
    ]},
    {id:"bleed-press", name:"Bleed Air / Pressurisation Fault", cond:"BLEED AIR FAIL / overheat light, cabin altitude climbing or differential high", items:[
      {branch:"Indication?", opts:{
        "Bleed air fail / overheat light":[
          {c:"Affected bleed air switch", r:"OFF"},
          {c:"Pressurisation", r:"CHECK maintained on remaining bleed source"},
          {defer:"One bleed source off – reduced pressurisation / heating capacity, maintenance check."},
        ],
        "Cabin not holding – altitude climbing":[
          {c:"Bleed air switches", r:"CHECK both ON"},
          {c:"Pressurisation controller", r:"MANUAL – control outflow valve to hold cabin"},
          {c:"Cabin dump switch", r:"CHECK NORMAL"},
          {c:"Descent", r:"INITIATE to keep cabin altitude below 10,000 ft; oxygen if required"},
          {defer:"Pressurisation on manual / limited – altitude restricted."},
        ],
        "Differential above 6.3 psi":[
          {c:"Pressurisation controller", r:"MANUAL – open outflow valve to reduce differential"},
          {c:"Bleed air", r:"ONE SOURCE OFF if differential still high"},
          {c:"Descent", r:"INITIATE"},
          {defer:"Over-pressurisation event – structural inspection required."},
        ]
      }},
    ]},
    {id:"srl-off", name:"SRL OFF light / SRL Failure in Flight", cond:"SRL OFF annunciator on, or EGT indication erratic", items:[
      {c:"SRL switch (affected engine)", r:"OFF then ON (reset once)"},
      {branch:"SRL OFF light out and EGT indication normal?", opts:{
        "Yes":[{c:"EGT", r:"MONITOR – compare with other engine"}],
        "No – SRL OFF light stays on":[
          {c:"SRL switch", r:"OFF"},
          {c:"EGT limit", r:"REDUCED – use the SRL-OFF EGT chart / placard (indicated EGT is uncompensated; approx 650°C typical)"},
          {c:"Power", r:"SET by torque, respecting the reduced EGT limit – expect less power available at altitude"},
          {defer:"SRL inoperative – reduced EGT limit, reduced power available including for a go-around."},
        ],
        "No – EGT erratic without light":[
          {c:"SRL switch", r:"OFF – SRL OFF light ON"},
          {c:"EGT limit", r:"REDUCED per SRL-OFF chart / placard"},
          {c:"Torque / fuel flow", r:"CROSS-CHECK with other engine for power setting"},
          {defer:"SRL switched off for erratic EGT – reduced EGT limit, maintenance required."},
        ]
      }},
    ]},
    {id:"icing", name:"Icing", cond:"Ice accretion or visible moisture below 5°C", items:[
      {c:"Engine inlet anti-ice", r:"ON both (EGT rise expected – adjust power)"},
      {c:"Ignition", r:"CONTINUOUS"},
      {c:"Pitot / static / stall warning heat", r:"ON"},
      {c:"Propeller deice", r:"ON – ammeter cycling"},
      {c:"Windshield anti-ice", r:"ON"},
      {c:"Surface deice", r:"CYCLE when approx 1/2 in ice has formed"},
      {c:"Autopilot", r:"OFF periodically to feel control forces"},
      {c:"Exit icing", r:"CLIMB / DESCEND / TURN"},
      {branch:"Residual ice on airframe?", opts:{
        "No":[{c:"Ice protection", r:"AS REQUIRED"}],
        "Yes":[
          {c:"Approach", r:"FLAPS APPROACH (15°) maximum, Vref + 10–15 KIAS, longer runway"},
          {c:"Stall warning", r:"UNRELIABLE – avoid steep turns and low speed"},
          {defer:"Residual airframe ice – 15° flap landing, increased approach speed and landing distance."},
        ]
      }},
    ]},
    {id:"pitot-fail", name:"Pitot Heat Failure", cond:"PITOT HEAT light or airspeed disagreement in icing", items:[
      {c:"Pitot heat switch / circuit breaker", r:"CHECK ON / RESET once"},
      {c:"Airspeed indications", r:"CROSS-CHECK left / right and GPS groundspeed"},
      {branch:"Airspeed reliable?", opts:{
        "Yes":[{c:"Icing conditions", r:"AVOID"},{defer:"Pitot heat inoperative one side – avoid icing, cross-check airspeed."}],
        "No":[
          {c:"Autopilot / flight director", r:"OFF if driven by failed air data"},
          {c:"Pitch / power", r:"FLY KNOWN SETTINGS – use other side airspeed, GPS, attitude"},
          {c:"Exit icing", r:"IMMEDIATELY"},
          {defer:"Airspeed unreliable – fly known pitch / power settings, Vref + 10 KIAS on the good side."},
        ]
      }},
    ]},
    {id:"hyd-low", name:"Hydraulic Pressure Low", cond:"HYD PRESS LOW light or pressure below normal", items:[
      {c:"Hydraulic pump circuit breaker", r:"CHECK / RESET once"},
      {c:"Landing gear", r:"LEAVE in present position"},
      {branch:"Pressure restored?", opts:{
        "Yes":[{c:"Hydraulic pressure", r:"MONITOR"},{defer:"Hydraulic pressure fluctuation – maintenance check."}],
        "No":[
          {c:"Gear extension", r:"PLAN Emergency Gear Extension (hand pump) early on approach"},
          {c:"Brakes", r:"NORMAL (independent system) – check pedal pressure"},
          {defer:"Hydraulic pressure lost – emergency gear extension, do not retract after extension."},
        ]
      }},
    ]},
    {id:"gear-unsafe", name:"Gear Unsafe / In-Transit Light", cond:"Red gear light remains on after retraction or extension", items:[
      {c:"Airspeed", r:"BELOW 175 KIAS"},
      {c:"Gear switch / circuit breaker", r:"CHECK position / RESET once"},
      {c:"Landing gear", r:"CYCLE once to the desired position"},
      {branch:"Gear indication?", opts:{
        "Three green – unsafe light out":[{defer:"Gear fault indication – do not retract after landing; maintenance inspection required."}],
        "Will not retract – down and locked":[
          {c:"Landing gear switch", r:"DOWN – leave down"},
          {c:"Airspeed", r:"BELOW 175 KIAS"},
          {defer:"Gear will not retract – gear down, reduced range and single-engine performance, land as soon as practical."},
        ],
        "Will not indicate down":[
          {c:"Gear indicator bulbs", r:"CHECK (press to test / swap bulb if possible)"},
          {c:"Emergency gear extension", r:"PERFORM (hand pump)"},
          {c:"Tower", r:"REQUEST visual check if available"},
          {defer:"Gear position unconfirmed – emergency extension performed, soft touchdown on longest runway."},
        ]
      }},
    ]},
  ]
});
