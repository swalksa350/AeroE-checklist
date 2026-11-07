/* Piper PA-28R-201 Arrow III/IV – checklist data.
   Prototype content. Verify against the operator's approved checklist and the POH/AFM. */
window.AIRCRAFT = window.AIRCRAFT || [];
window.AIRCRAFT.push({
  id: "pa28r-201",
  maker: "Piper",
  model: "PA-28R-201 Arrow III/IV",
  short: "ARROW",
  category: "High-performance single",
  engine: "Lycoming IO-360-C1C6, 200 hp",
  seats: "4",
  basis: "Typical Arrow III (1977+) / Arrow IV POH procedures; fuel-injected, constant-speed prop, retractable gear, 2,750 lb MTOW. Automatic gear extension system where still fitted.",
  vspeeds: [
    {k:"Vr", v:"60–70 KIAS"},
    {k:"Vx", v:"78 KIAS"},
    {k:"Vy", v:"90 KIAS"},
    {k:"Best glide", v:"79 KIAS"},
    {k:"Vfe", v:"103 KIAS"},
    {k:"Vle", v:"129 KIAS"},
    {k:"Vlo", v:"107 KIAS retract / 129 KIAS extend"},
    {k:"Va", v:"118 KIAS (2,750 lb) / 96 KIAS (1,801 lb)"},
    {k:"Vno", v:"146 KIAS"},
    {k:"Vne", v:"183 KIAS"},
    {k:"Vs / Vso", v:"60 / 55 KIAS"},
    {k:"Approach", v:"75 KIAS (flaps 40°); 72 KIAS short field"}
  ],

  normal: [
    {id:"pre", name:"Before Start", items:[
      {c:"Preflight inspection", r:"COMPLETE"},
      {c:"Fuel quantity", r:"CHECK visually (36 gal usable per tank, 72 total)"},
      {c:"Baggage door", r:"CLOSED & LOCKED"},
      {c:"Passenger brief", r:"COMPLETE (belts, door, exits, sterile cockpit)"},
      {c:"Seats, belts, harnesses", r:"ADJUST & LOCK"},
      {c:"Door", r:"CLOSED & LATCHED (top and side)"},
      {c:"Parking brake", r:"SET"},
      {c:"Gear selector", r:"DOWN"},
      {c:"Emergency gear lever", r:"NEUTRAL (not in override)"},
      {c:"Avionics master", r:"OFF"},
      {c:"Electrical switches", r:"OFF"},
      {c:"Circuit breakers", r:"CHECK IN"},
      {c:"Alternate static source", r:"OFF (closed)"},
      {c:"Fuel selector", r:"FULLER TANK"},
      {c:"Propeller control", r:"FULL FORWARD (high RPM)"},
      {c:"Alternate air", r:"OFF (closed)"},
    ]},
    {id:"start", name:"Engine Start", items:[
      {c:"Master switch", r:"ON"},
      {c:"Gear lights", r:"THREE GREEN"},
      {c:"Beacon", r:"ON"},
      {c:"Throttle", r:"FULL OPEN (prime)"},
      {c:"Mixture", r:"FULL RICH"},
      {c:"Electric fuel pump", r:"ON until fuel flow indicates, then OFF"},
      {c:"Mixture", r:"IDLE CUT-OFF"},
      {c:"Throttle", r:"OPEN 1/2 inch"},
      {c:"Propeller area", r:"CLEAR"},
      {c:"Starter", r:"ENGAGE (10 s max, then 30 s cool-down)"},
      {c:"Mixture", r:"ADVANCE to FULL RICH as engine fires"},
      {c:"Throttle", r:"ADJUST 800–1,000 RPM"},
      {c:"Oil pressure", r:"CHECK rising within 30 s (55–95 psi green)"},
      {c:"Ammeter / alternator", r:"CHECK charging"},
      {c:"Electric fuel pump", r:"OFF (fuel pressure check 14–45 psi)"},
      {c:"Avionics master", r:"ON"},
      {note:"Hot start: throttle 1/2 inch, mixture idle cut-off, pump OFF; advance mixture as engine fires. Flooded: throttle full, mixture idle cut-off, crank; retard throttle and advance mixture as engine fires.", kind:"caution"},
    ]},
    {id:"taxi", name:"Before Taxi", items:[
      {c:"Flight instruments / avionics", r:"CHECK & SET"},
      {c:"Altimeter", r:"SET"},
      {c:"Heading indicator", r:"SET to compass"},
      {c:"Transponder", r:"STBY / as required"},
      {c:"Parking brake", r:"RELEASE"},
      {c:"Brakes", r:"CHECK during initial roll"},
      {c:"Steering", r:"CHECK (nosewheel steering with rudder pedals)"},
      {c:"Gyros", r:"CHECK during turns (turn coordinator, DG, attitude)"},
    ]},
    {id:"runup", name:"Before Takeoff", items:[
      {c:"Parking brake", r:"SET"},
      {c:"Flight controls", r:"FREE & CORRECT"},
      {c:"Fuel selector", r:"FULLER TANK"},
      {c:"Mixture", r:"FULL RICH"},
      {c:"Propeller control", r:"FULL FORWARD"},
      {c:"Throttle", r:"2,000 RPM"},
      {c:"Magnetos", r:"CHECK (max drop 175 RPM, max difference 50 RPM)"},
      {c:"Propeller", r:"CYCLE 2–3 times (RPM drop approx 300–500, oil pressure steady), then FULL FORWARD"},
      {c:"Alternate air", r:"CHECK (slight RPM drop), then OFF"},
      {c:"Vacuum", r:"4.8–5.2 in Hg"},
      {c:"Oil pressure / temperature", r:"CHECK GREEN (55–95 psi)"},
      {c:"Fuel pressure", r:"CHECK GREEN (14–45 psi)"},
      {c:"Ammeter", r:"CHECK charging"},
      {c:"Annunciator panel", r:"PRESS TO TEST"},
      {c:"Throttle", r:"IDLE check (500–700 RPM), then 1,000 RPM"},
      {c:"Electric fuel pump", r:"ON"},
      {c:"Flaps", r:"SET (0° normal / 25° short field)"},
      {c:"Trim", r:"SET for takeoff (neutral)"},
      {c:"Gear lights", r:"THREE GREEN, gear selector DOWN"},
      {c:"Emergency gear lever", r:"NEUTRAL (override only if briefed)"},
      {c:"Seat belts / harnesses", r:"FASTENED"},
      {c:"Door", r:"LATCHED (top and side)"},
      {c:"Pitot heat / lights", r:"AS REQUIRED"},
      {c:"Transponder", r:"ALT"},
      {c:"Takeoff briefing", r:"COMPLETE (abort point, EFATO plan, gear-up point)"},
    ]},
    {id:"climb", name:"After Takeoff / Climb", items:[
      {c:"Airspeed", r:"90 KIAS (Vy) / 78 KIAS (Vx, obstacles)"},
      {c:"Landing gear", r:"UP (positive rate, below 107 KIAS, no usable runway)"},
      {c:"Gear lights", r:"OUT, gear-unsafe light OUT"},
      {c:"Flaps", r:"RETRACT (if used, when clear of obstacles)"},
      {c:"Electric fuel pump", r:"OFF (at safe altitude, check fuel pressure)"},
      {c:"Power", r:"FULL THROTTLE / 2,700 RPM (25 in Hg / 2,500 RPM cruise climb at 104 KIAS)"},
      {c:"Mixture", r:"FULL RICH (lean above 5,000 ft)"},
      {c:"Engine instruments", r:"CHECK"},
      {c:"Landing light", r:"OFF (as desired)"},
    ]},
    {id:"cruise", name:"Cruise", items:[
      {c:"Power", r:"SET (2,300–2,500 RPM, manifold pressure per chart, 75% max)"},
      {c:"Mixture", r:"LEAN (per power chart / fuel flow)"},
      {c:"Fuel selector", r:"CHANGE TANKS every 30–60 min (pump ON during change)"},
      {c:"Engine instruments", r:"CHECK"},
      {c:"Fuel quantity", r:"CHECK against plan"},
    ]},
    {id:"desc", name:"Descent", items:[
      {c:"Altimeter", r:"SET"},
      {c:"Mixture", r:"ENRICHEN as altitude decreases"},
      {c:"Power", r:"REDUCE gradually (keep manifold pressure above approx 15 in Hg)"},
      {c:"Fuel selector", r:"FULLER TANK"},
      {c:"Airspeed", r:"BELOW 129 KIAS before gear extension"},
      {c:"Approach briefing", r:"COMPLETE"},
    ]},
    {id:"land", name:"Before Landing", items:[
      {c:"Seat belts / harnesses", r:"FASTENED"},
      {c:"Fuel selector", r:"FULLER TANK"},
      {c:"Electric fuel pump", r:"ON"},
      {c:"Mixture", r:"FULL RICH"},
      {c:"Propeller control", r:"FULL FORWARD (on final)"},
      {c:"Landing gear", r:"DOWN (below 129 KIAS)"},
      {c:"Gear lights", r:"THREE GREEN, nose gear in mirror"},
      {c:"Flaps", r:"SET (below 103 KIAS; 40° normal landing)"},
      {c:"Airspeed", r:"75 KIAS final (flaps 40°)"},
      {c:"Landing light", r:"ON"},
      {c:"Gear", r:"RECHECK THREE GREEN on final"},
    ]},
    {id:"after", name:"After Landing", items:[
      {c:"Flaps", r:"RETRACT"},
      {c:"Electric fuel pump", r:"OFF"},
      {c:"Transponder", r:"STBY / as required"},
      {c:"Lights", r:"AS REQUIRED"},
    ]},
    {id:"shut", name:"Shutdown", items:[
      {c:"Parking brake", r:"SET"},
      {c:"Avionics master", r:"OFF"},
      {c:"Electrical switches", r:"OFF"},
      {c:"Propeller control", r:"FULL FORWARD"},
      {c:"Throttle", r:"1,000 RPM"},
      {c:"Mixture", r:"IDLE CUT-OFF"},
      {c:"Magnetos", r:"OFF (after prop stops)"},
      {c:"Master switch", r:"OFF"},
      {c:"Fuel selector", r:"OFF (if parking overnight / as per operator)"},
      {c:"Control lock / chocks", r:"INSTALL"},
    ]},
  ],
  emergency: [
    {id:"eng-fail-roll", name:"Engine Failure During Takeoff Roll", cond:"Loss of power before rotation", items:[
      {c:"Throttle", r:"CLOSED", mem:true},
      {c:"Brakes", r:"APPLY, stop straight ahead", mem:true},
      {c:"Mixture", r:"IDLE CUT-OFF"},
      {c:"Magnetos", r:"OFF"},
      {c:"Master switch", r:"OFF"},
      {c:"Fuel selector", r:"OFF"},
    ]},
    {id:"eng-fail-to", name:"Engine Failure After Takeoff", cond:"Airborne, insufficient runway remaining", land:"LAND IMMEDIATELY", items:[
      {c:"Airspeed", r:"79 KIAS (best glide)", mem:true},
      {c:"Landing area", r:"SELECT straight ahead (small heading changes only)", mem:true},
      {branch:"Altitude and time available for a restart attempt?", opts:{
        "Yes":[
          {c:"Fuel selector", r:"SWITCH to other tank"},
          {c:"Electric fuel pump", r:"CHECK ON"},
          {c:"Mixture", r:"FULL RICH"},
          {c:"Alternate air", r:"ON"},
        ],
        "No – commit to landing":[]
      }},
      {branch:"Landing surface?", opts:{
        "Prepared – gear down":[{c:"Landing gear", r:"DOWN (emergency lever if needed)"}],
        "Rough / water – gear up":[{c:"Landing gear", r:"UP"},{c:"Emergency gear lever", r:"OVERRIDE (prevent auto-extension)"}]
      }},
      {c:"Flaps", r:"AS REQUIRED"},
      {c:"Fuel selector", r:"OFF"},
      {c:"Mixture", r:"IDLE CUT-OFF"},
      {c:"Magnetos", r:"OFF"},
      {c:"Master switch", r:"OFF (before touchdown)"},
      {c:"Door", r:"UNLATCH before touchdown"},
      {note:"Do not attempt to turn back to the runway at low altitude.", kind:"warn"},
    ]},
    {id:"eng-fail-flt", name:"Engine Failure in Flight", cond:"Loss of power with altitude available", land:"LAND AS SOON AS POSSIBLE", items:[
      {c:"Airspeed", r:"79 KIAS (best glide)", mem:true},
      {c:"Propeller control", r:"FULL AFT (low RPM, extends glide)", mem:true},
      {c:"Fuel selector", r:"SWITCH to tank containing fuel", mem:true},
      {c:"Electric fuel pump", r:"ON", mem:true},
      {c:"Mixture", r:"FULL RICH", mem:true},
      {c:"Alternate air", r:"ON", mem:true},
      {c:"Emergency gear lever", r:"OVERRIDE (prevent auto-extension while gliding)"},
      {c:"Engine gauges", r:"CHECK for cause (fuel pressure, fuel flow, oil, RPM)"},
      {branch:"Propeller stopped (not windmilling)?", opts:{
        "Yes – crank":[
          {c:"Magnetos", r:"BOTH"},
          {c:"Throttle", r:"OPEN 1/2 inch"},
          {c:"Starter", r:"ENGAGE"},
        ],
        "No – windmilling":[
          {c:"Magnetos", r:"CHECK BOTH (try L / R individually)"},
          {c:"Throttle", r:"CYCLE, then set as required"},
          {c:"Mixture", r:"LEAN slightly if flooded"},
        ]
      }},
      {branch:"Engine restarted?", opts:{
        "Yes":[{c:"Propeller control", r:"AS REQUIRED"},{c:"Power", r:"REDUCE to minimum required"},{c:"Engine instruments", r:"MONITOR"},{defer:"Engine restarted after in-flight failure – land as soon as possible, suspect fuel system or induction cause."}],
        "No – forced landing":[]
      }},
      {note:"Forced landing without power:", kind:"warn"},
      {c:"Landing area", r:"SELECT, plan approach into wind"},
      {c:"Transponder / radio", r:"7700, MAYDAY (position, intentions)"},
      {c:"Seat belts / harnesses", r:"SECURE"},
      {branch:"Landing surface?", opts:{
        "Prepared – gear down":[{c:"Landing gear", r:"DOWN (free-fall with emergency lever if needed), three green"}],
        "Rough / water – gear up":[{c:"Landing gear", r:"UP, emergency lever in OVERRIDE"}]
      }},
      {c:"Flaps", r:"AS REQUIRED (full on final)"},
      {c:"Airspeed", r:"75 KIAS final (flaps 40°)"},
      {c:"Fuel selector", r:"OFF"},
      {c:"Mixture", r:"IDLE CUT-OFF"},
      {c:"Magnetos", r:"OFF"},
      {c:"Master switch", r:"OFF (when no longer required)"},
      {c:"Door", r:"UNLATCH before touchdown"},
    ]},
    {id:"eng-fire-flt", name:"Engine Fire in Flight", land:"LAND IMMEDIATELY", items:[
      {c:"Fuel selector", r:"OFF", mem:true},
      {c:"Throttle", r:"CLOSED", mem:true},
      {c:"Mixture", r:"IDLE CUT-OFF", mem:true},
      {c:"Electric fuel pump", r:"CHECK OFF", mem:true},
      {c:"Cabin heat / defroster", r:"OFF", mem:true},
      {c:"Airspeed", r:"INCREASE to blow out fire (do not exceed 146 KIAS)"},
      {c:"Propeller control", r:"FULL AFT once fire is out"},
      {c:"Forced landing", r:"EXECUTE (do not attempt restart)"},
      {c:"Landing gear", r:"DOWN if surface permits (emergency lever)"},
      {c:"Master switch", r:"OFF before touchdown"},
    ]},
    {id:"eng-fire-start", name:"Engine Fire During Start", items:[
      {c:"Starter", r:"CONTINUE CRANKING (draw fire into engine)", mem:true},
      {c:"Mixture", r:"IDLE CUT-OFF", mem:true},
      {c:"Throttle", r:"FULL OPEN", mem:true},
      {c:"Electric fuel pump", r:"OFF"},
      {c:"Fuel selector", r:"OFF"},
      {branch:"Fire continues?", opts:{
        "Yes":[{c:"Magnetos / master", r:"OFF"},{c:"Aircraft", r:"EVACUATE, fire extinguisher"}],
        "No":[{c:"Engine", r:"SHUT DOWN, inspect before further flight"}]
      }},
    ]},
    {id:"elec-fire", name:"Electrical / Cabin Fire", land:"LAND AS SOON AS POSSIBLE", items:[
      {c:"Master switch", r:"OFF", mem:true},
      {c:"Avionics master", r:"OFF", mem:true},
      {c:"Cabin heat / defroster", r:"OFF", mem:true},
      {c:"Vents", r:"OPEN"},
      {c:"Fire extinguisher", r:"USE (if fire in cabin)"},
      {note:"After discharge, ventilate the cabin before landing.", kind:"warn"},
      {branch:"Fire out and electrical power essential?", opts:{
        "Yes":[
          {c:"Circuit breakers", r:"CHECK, do not reset tripped breakers"},
          {c:"Master switch", r:"ON"},
          {c:"Electrical items", r:"ON one at a time, watch for smoke"},
          {defer:"Electrical fire – faulted circuit isolated. Verify gear and flap operation; use emergency gear extension if needed."},
        ],
        "No":[{note:"Master off: gear must be extended with the emergency gear lever (free-fall); no gear lights, no electric flaps.", kind:"caution"},{defer:"Master off – emergency (free-fall) gear extension, flaps-up landing, no gear lights."}]
      }},
    ]},
    {id:"emer-desc", name:"Emergency Descent", items:[
      {c:"Throttle", r:"CLOSED", mem:true},
      {c:"Propeller control", r:"FULL FORWARD", mem:true},
      {c:"Mixture", r:"FULL RICH", mem:true},
      {c:"Landing gear", r:"DOWN (below 129 KIAS)", mem:true},
      {c:"Flaps", r:"UP", mem:true},
      {c:"Airspeed", r:"129 KIAS (gear down) / 118 KIAS turbulent", mem:true},
    ]},
    {id:"gear-emer-ext", name:"Emergency Gear Extension", cond:"Gear fails to extend with selector, or no three green", items:[
      {c:"Master switch", r:"ON"},
      {c:"Gear circuit breaker", r:"CHECK IN"},
      {c:"Panel lights", r:"OFF (daytime, to check gear lights)"},
      {c:"Gear light bulbs", r:"CHECK (swap bulbs if one is out)"},
      {c:"Airspeed", r:"BELOW 87 KIAS"},
      {c:"Gear selector", r:"DOWN"},
      {c:"Emergency gear lever", r:"DOWN (emergency down / free-fall position), hold"},
      {branch:"Three green?", opts:{
        "Yes":[{c:"Emergency gear lever", r:"LEAVE DOWN, do not retract"},{defer:"Gear extended by free-fall – leave emergency lever down, do not retract gear, normal landing."}],
        "No":[
          {c:"Aircraft", r:"YAW side to side (rudder) to help gear lock"},
          {c:"Airspeed", r:"REDUCE further (approach stall margin)"},
          {branch:"Three green now?", opts:{
            "Yes":[{defer:"Gear extended by free-fall after yawing – leave emergency lever down, normal landing."}],
            "No":[{note:"Proceed to Gear-Up / Partial Gear Landing.", kind:"warn"}]
          }},
        ]
      }},
    ]},
    {id:"gear-up-land", name:"Gear-Up / Partial Gear Landing", cond:"Gear cannot be extended or locked", items:[
      {c:"Runway", r:"LONGEST available, emergency services notified (soft surface not required)"},
      {c:"Fuel", r:"BURN DOWN to minimum practical"},
      {c:"Seat belts / harnesses", r:"TIGHT"},
      {c:"Loose items", r:"SECURE"},
      {branch:"Gear condition?", opts:{
        "All up":[{c:"Gear selector", r:"UP"},{c:"Emergency gear lever", r:"OVERRIDE (prevent auto-extension)"}],
        "Partial – one or two legs":[{c:"Gear", r:"RETRACT if possible; otherwise land on extended wheels, hold unsafe side off with aileron"}]
      }},
      {c:"Approach", r:"NORMAL, flaps 40°, 75 KIAS, power to touchdown"},
      {c:"Electric fuel pump", r:"OFF"},
      {c:"Mixture", r:"IDLE CUT-OFF (short final, landing assured)"},
      {c:"Magnetos", r:"OFF"},
      {c:"Fuel selector", r:"OFF"},
      {c:"Master switch", r:"OFF"},
      {c:"Door", r:"UNLATCH"},
      {c:"Touchdown", r:"MINIMUM speed, nose slightly high, then full aft"},
      {c:"Aircraft", r:"EVACUATE when stopped"},
    ]},
  ],
  abnormal: [
    {id:"gear-unsafe", name:"Gear Fails to Retract / Gear Unsafe Light", cond:"Red gear-unsafe light or gear horn after selecting UP", items:[
      {c:"Airspeed", r:"BELOW 107 KIAS (Vlo retract)"},
      {c:"Emergency gear lever", r:"CHECK NEUTRAL (lever in override prevents normal auto operation; auto-extension system lowers gear below approx 95–105 KIAS at low power)"},
      {c:"Gear selector", r:"RECYCLE DOWN, three green, then UP"},
      {branch:"Gear retracts, lights out?", opts:{
        "Yes":[{c:"Flight", r:"CONTINUE, monitor on next extension"}],
        "No":[
          {c:"Gear selector", r:"DOWN"},
          {c:"Gear lights", r:"THREE GREEN"},
          {c:"Airspeed", r:"BELOW 129 KIAS"},
          {defer:"Gear left down – limit speed to 129 KIAS, reduced climb and range. Land as soon as practical."},
        ]
      }},
    ]},
    {id:"gear-horn", name:"Gear Warning Horn", cond:"Horn with gear up: throttle below approx 14 in Hg, or auto-extension speed, or flaps beyond 10°", items:[
      {c:"Gear position", r:"CHECK"},
      {branch:"Intentional gear-up (e.g. descent, override)?", opts:{
        "Yes":[{c:"Horn", r:"EXPECT; extend gear before landing"},{c:"Gear", r:"DOWN before final, three green"}],
        "No – landing":[{c:"Landing gear", r:"DOWN, three green"},{c:"Emergency gear lever", r:"CHECK NEUTRAL"}]
      }},
    ]},
    {id:"alt-fail", name:"Alternator Failure", cond:"Ammeter zero / discharge, ALT annunciator", items:[
      {c:"Ammeter", r:"CHECK (zero output)"},
      {c:"ALT circuit breaker", r:"CHECK, RESET once"},
      {c:"ALT switch", r:"OFF, then ON"},
      {branch:"Alternator restored?", opts:{
        "Yes":[{c:"Ammeter", r:"MONITOR"}],
        "No":[
          {c:"ALT switch", r:"OFF"},
          {c:"Electrical load", r:"REDUCE to minimum (one radio, transponder)"},
          {c:"Battery", r:"CONSERVE for gear extension (approx 30 min)"},
          {c:"Landing gear", r:"EXTEND early; use emergency lever if battery is depleted"},
          {defer:"Alternator failed – limited battery; extend gear early (free-fall if needed), expect no gear lights / electric flaps late in flight."},
        ]
      }},
    ]},
    {id:"oil-press", name:"Low Oil Pressure", cond:"Indication below 25 psi at idle / below 55 psi in flight", items:[
      {c:"Oil pressure / temperature", r:"CROSS-CHECK"},
      {branch:"Oil temperature rising with low pressure?", opts:{
        "Yes – real":[
          {c:"Power", r:"REDUCE to minimum required"},
          {c:"Landing site", r:"SELECT, prepare for engine failure (prop may not respond to control)"},
          {defer:"Low oil pressure – land as soon as possible, expect engine failure and loss of prop governing."},
        ],
        "No – gauge suspect":[{c:"Flight", r:"CONTINUE to nearest suitable airport, monitor"},{defer:"Oil pressure indication unreliable – land as soon as practical."}]
      }},
    ]},
    {id:"oil-temp", name:"High Oil Temperature", cond:"Indication above 245°F / in the red", items:[
      {c:"Mixture", r:"ENRICHEN"},
      {c:"Power", r:"REDUCE"},
      {c:"Airspeed", r:"INCREASE (lower nose)"},
      {c:"Oil pressure", r:"CHECK"},
      {branch:"Temperature decreasing?", opts:{
        "Yes":[{c:"Flight", r:"CONTINUE, monitor"}],
        "No":[{defer:"Engine overheat – land as soon as possible, expect possible engine failure."}]
      }},
    ]},
    {id:"rough", name:"Rough Running / Loss of Power", cond:"Rough engine, fluctuating fuel flow or RPM", items:[
      {c:"Electric fuel pump", r:"ON"},
      {c:"Fuel selector", r:"SWITCH TANKS"},
      {c:"Mixture", r:"ADJUST for smoothest running"},
      {c:"Alternate air", r:"ON (induction icing / blockage)"},
      {c:"Magnetos", r:"CHECK L / R / BOTH (operate on best if one is faulty)"},
      {branch:"Engine smooth again?", opts:{
        "Yes":[{c:"Settings", r:"LEAVE as found"},{defer:"Rough running cleared – pump on / alternate air on; land as soon as practical and investigate."}],
        "No":[{c:"Power", r:"REDUCE to smoothest setting"},{defer:"Rough-running engine – land as soon as possible; expect engine failure."}]
      }},
    ]},
    {id:"fuel-press", name:"Low Fuel Pressure / Fuel Flow", cond:"Fuel pressure below 14 psi or fluctuating fuel flow", items:[
      {c:"Electric fuel pump", r:"ON"},
      {c:"Fuel selector", r:"SWITCH to fuller tank"},
      {c:"Mixture", r:"FULL RICH"},
      {branch:"Pressure restored?", opts:{
        "Yes":[{c:"Electric fuel pump", r:"LEAVE ON"},{defer:"Electric fuel pump on continuously – engine-driven pump suspect. Land as soon as practical."}],
        "No":[{c:"Fuel exhaustion", r:"CONSIDER"},{note:"Prepare for engine failure – see Engine Failure in Flight.", kind:"warn"}]
      }},
    ]},
    {id:"prop-over", name:"Propeller Overspeed", cond:"RPM above 2,700 and not responding to prop control", items:[
      {c:"Throttle", r:"RETARD"},
      {c:"Oil pressure", r:"CHECK"},
      {c:"Propeller control", r:"FULL DECREASE RPM, then set if any control remains"},
      {c:"Airspeed", r:"REDUCE"},
      {c:"Throttle", r:"AS REQUIRED to keep RPM at or below 2,700"},
      {defer:"Prop governor failed – control RPM with throttle and airspeed; land as soon as practical."},
    ]},
    {id:"flap-fail", name:"Flap Failure", items:[
      {c:"Flap circuit breaker", r:"CHECK, RESET once"},
      {c:"Flap switch", r:"RECYCLE"},
      {branch:"Flaps operable?", opts:{
        "Yes":[{c:"Flaps", r:"AS REQUIRED"}],
        "No":[{c:"Approach", r:"80–85 KIAS, flaps-up landing"},{defer:"Flaps inoperative – flaps-up landing at 80–85 KIAS, longer landing distance."}]
      }},
    ]},
    {id:"door", name:"Door Open in Flight", items:[
      {c:"Airspeed", r:"SLOW to approx 89 KIAS"},
      {c:"Storm window", r:"OPEN (cabin vent / overhead vent closed)"},
      {c:"Door", r:"PULL CLOSED, latch side then top"},
      {branch:"Door latched?", opts:{
        "Yes":[{c:"Flight", r:"CONTINUE"}],
        "No":[{note:"Aircraft is controllable with door unlatched. Expect noise and some yaw.", kind:"caution"},{defer:"Door unlatched – land normally, secure door on the ground."}]
      }},
    ]},
    {id:"vac-fail", name:"Vacuum Failure", cond:"Vacuum below 4.8 in Hg / gyros drifting", items:[
      {c:"Vacuum gauge", r:"CHECK"},
      {c:"Attitude indicator / DG", r:"CROSS-CHECK against turn coordinator and compass, then COVER"},
      {c:"IMC", r:"EXIT, request no-gyro assistance if needed"},
      {defer:"Vacuum failed – no attitude indicator / DG. Avoid IMC; partial-panel landing."},
    ]},
    {id:"static", name:"Static Source Blocked", cond:"Airspeed / altimeter / VSI erratic", items:[
      {c:"Pitot heat", r:"ON"},
      {c:"Alternate static source", r:"OPEN (valve under left side of panel)"},
      {c:"Storm window / vents", r:"CLOSED (for calibration accuracy)"},
      {note:"Airspeed and altimeter read slightly high with alternate static; see POH correction table.", kind:"caution"},
      {defer:"Alternate static in use – small airspeed/altimeter errors; gear/flap speeds by indication."},
    ]},
    {id:"ice", name:"Inadvertent Icing", items:[
      {c:"Pitot heat", r:"ON"},
      {c:"Alternate air", r:"ON"},
      {c:"Cabin heat / defroster", r:"ON (windshield)"},
      {c:"Exit icing conditions", r:"TURN / CLIMB / DESCEND"},
      {c:"Airspeed", r:"INCREASE, avoid abrupt maneuvers"},
      {c:"Flaps", r:"LIMIT (flaps-up or 10° landing with residual ice)"},
      {defer:"Residual airframe ice – flaps-up / 10° landing at increased speed, longer runway; extend gear early."},
    ]},
  ]
});
