/* Cirrus SR20 – checklist data.
   Prototype content. Verify against the operator's approved checklist and the POH/AFM. */
window.AIRCRAFT = window.AIRCRAFT || [];
window.AIRCRAFT.push({
  id: "sr20",
  maker: "Cirrus",
  model: "SR20 G3 / G6",
  short: "SR20",
  category: "Single-engine piston",
  engine: "Continental IO-360-ES, 200 hp (G3) / Lycoming IO-390-C3B6, 215 hp (G6)",
  seats: "4 (G6: 5)",
  basis: "Typical SR20 G3 (IO-360-ES, Avidyne or Perspective) and G6 (IO-390, Perspective+) POH procedures; speeds are G3 figures, G6 differs by a few knots.",
  vspeeds: [
    {k:"Vr", v:"65–70 KIAS (flaps 50%)"},
    {k:"Vx", v:"81 KIAS"},
    {k:"Vy", v:"96 KIAS"},
    {k:"Best glide", v:"87–88 KIAS"},
    {k:"Vfe", v:"119 KIAS (50%) / 104 KIAS (100%)"},
    {k:"Va", v:"130 KIAS (3,050 lb)"},
    {k:"Vno", v:"163 KIAS"},
    {k:"Vne", v:"200 KIAS"},
    {k:"Vpd (CAPS max demonstrated)", v:"133 KIAS"},
    {k:"Vs / Vso", v:"65 / 56 KIAS"},
    {k:"Vref", v:"75–80 KIAS (flaps 100%)"}
  ],

  normal: [
    {id:"pre", name:"Before Start", items:[
      {c:"Preflight inspection", r:"COMPLETE (fuel drains, oil 6–8 qt, pitot cover removed)"},
      {c:"CAPS handle safety pin", r:"REMOVED (handle cover closed, pin stowed)"},
      {c:"Passenger briefing", r:"COMPLETE (belts, doors, CAPS location & use, exits)"},
      {c:"Seats, belts, harnesses", r:"ADJUST & LOCK"},
      {c:"Doors", r:"LATCHED (both handles)"},
      {c:"Brakes", r:"TEST & SET (parking brake)"},
      {c:"Fuel selector", r:"FULLER TANK (LEFT or RIGHT)"},
      {c:"Power lever", r:"IDLE"},
      {c:"Mixture", r:"CUTOFF"},
      {c:"Alternate induction air", r:"CLOSED (pushed in)"},
      {c:"Bat 2", r:"ON – check volts 23–25 V"},
      {c:"Bat 1", r:"ON"},
      {c:"Avionics", r:"OFF (Perspective: avionics master OFF)"},
      {c:"Annunciators / CAS", r:"CHECK (no red)"},
      {c:"Fuel quantity", r:"CHECK (vs visual check)"},
      {c:"Flaps", r:"CHECK operation (50%, 100%), set UP"},
      {c:"Strobes / nav lights", r:"ON"},
    ]},
    {id:"start", name:"Engine Start", items:[
      {c:"Propeller area", r:"CLEAR"},
      {c:"Power lever", r:"FULL FORWARD"},
      {c:"Mixture", r:"FULL RICH"},
      {c:"Fuel pump", r:"PRIME (hold 2–3 s cold, none when hot), then BOOST"},
      {c:"Power lever", r:"OPEN 1/4 in"},
      {c:"Ignition", r:"START (max 20 s, release when engine fires)"},
      {c:"Power lever", r:"1,000 RPM"},
      {c:"Oil pressure", r:"CHECK within 30 s (green 30–60 psi)"},
      {c:"Alt 1 / Alt 2", r:"ON – check charging, no ALT 1 / ALT 2 caution"},
      {c:"Fuel pump", r:"BOOST (leave on until after takeoff)"},
      {c:"Avionics", r:"ON"},
      {c:"Engine instruments", r:"CHECK"},
      {c:"Pitot heat", r:"TEST then OFF"},
    ]},
    {id:"taxi", name:"Before Taxi", items:[
      {c:"Flight instruments / PFD", r:"CHECK & SET (altimeter, HSI, CDI)"},
      {c:"Radios / transponder", r:"SET"},
      {c:"Trim", r:"SET for takeoff (neutral mark)"},
      {c:"Flaps", r:"50%"},
      {c:"Parking brake", r:"RELEASE"},
      {c:"Brakes", r:"CHECK immediately after moving"},
      {note:"Nosewheel is free-castoring: steer with differential braking at low speed. Avoid prolonged brake drag – brake overheat is a fire risk.", kind:"caution"},
      {c:"HSI / turn indication", r:"CHECK during turns"},
    ]},
    {id:"runup", name:"Before Takeoff", items:[
      {c:"Parking brake", r:"SET"},
      {c:"Doors", r:"LATCHED"},
      {c:"CAPS handle", r:"VERIFY pin removed, cover closed"},
      {c:"Seat belts / harnesses", r:"SECURE"},
      {c:"Flight controls", r:"FREE & CORRECT"},
      {c:"Fuel selector", r:"FULLER TANK"},
      {c:"Fuel pump", r:"BOOST"},
      {c:"Mixture", r:"FULL RICH (lean for field elevation above 3,000 ft)"},
      {c:"Power lever", r:"1,700 RPM"},
      {c:"Alt 1 / Alt 2", r:"CHECK positive amps, Ess Bus / Main Bus volts green"},
      {c:"Magnetos", r:"CHECK L / R (max drop 150 RPM, max diff 75 RPM)"},
      {c:"Engine instruments", r:"CHECK green (oil temp min 100°F for takeoff)"},
      {c:"Power lever", r:"IDLE check (600–800 RPM), then 1,000 RPM"},
      {c:"Flaps", r:"50% (check indication)"},
      {c:"Trim", r:"SET takeoff"},
      {c:"Autopilot", r:"CHECK / disconnect"},
      {c:"Pitot heat / lights", r:"AS REQUIRED"},
      {c:"Transponder", r:"ALT"},
      {c:"Takeoff briefing", r:"COMPLETE (Vr 65–70, Vy 96, abort point, CAPS available above approx 600 ft AGL)"},
    ]},
    {id:"climb", name:"After Takeoff / Climb", items:[
      {c:"Airspeed", r:"Vy 96 KIAS (obstacles: Vx 81 KIAS)"},
      {c:"Flaps", r:"UP (above 80 KIAS, positive rate)"},
      {c:"Fuel pump", r:"OFF above 1,000 ft AGL (BOOST if fuel flow fluctuates)"},
      {c:"Power", r:"FULL (cruise climb 110–120 KIAS)"},
      {c:"Mixture", r:"FULL RICH (lean per fuel flow placard above 3,000 ft)"},
      {c:"Engine instruments", r:"CHECK (CHT max 460°F, oil temp max 240°F)"},
    ]},
    {id:"cruise", name:"Cruise", items:[
      {c:"Power", r:"SET (typ. 55–75%, 2,500–2,700 RPM)"},
      {c:"Mixture", r:"LEAN (per power table / lean-assist, 50°F rich of peak or LOP as approved)"},
      {c:"Fuel pump", r:"OFF (BOOST if fuel flow fluctuates or hot/high)"},
      {c:"Fuel selector", r:"SWITCH tanks every 30 min, keep within 10 gal imbalance"},
      {c:"Fuel quantity / totalizer", r:"CHECK vs flight plan"},
      {c:"Engine instruments", r:"CHECK"},
    ]},
    {id:"desc", name:"Descent", items:[
      {c:"Altimeter", r:"SET"},
      {c:"Mixture", r:"ENRICH as altitude decreases"},
      {c:"Power", r:"REDUCE gradually (keep CHT above 250°F)"},
      {c:"Fuel selector", r:"FULLER TANK"},
      {c:"Approach briefing", r:"COMPLETE (ATIS, approach, speeds)"},
    ]},
    {id:"land", name:"Before Landing", items:[
      {c:"Seats / belts", r:"SECURE"},
      {c:"Fuel selector", r:"FULLER TANK"},
      {c:"Fuel pump", r:"BOOST"},
      {c:"Mixture", r:"FULL RICH (as required for altitude)"},
      {c:"Flaps", r:"50% below 119 KIAS, 100% below 104 KIAS"},
      {c:"Airspeed", r:"FINAL 75–80 KIAS (100%), 80–85 KIAS (50%)"},
      {c:"Autopilot", r:"OFF"},
      {c:"Landing light", r:"ON"},
    ]},
    {id:"after", name:"After Landing", items:[
      {c:"Flaps", r:"UP"},
      {c:"Fuel pump", r:"OFF"},
      {c:"Pitot heat", r:"OFF"},
      {c:"Transponder", r:"STBY / as required"},
      {c:"Lights", r:"AS REQUIRED"},
      {c:"Power lever", r:"1,000 RPM taxi"},
    ]},
    {id:"shut", name:"Shutdown", items:[
      {c:"Parking brake", r:"SET"},
      {c:"Power lever", r:"IDLE, 1 min cool-down"},
      {c:"Avionics", r:"OFF"},
      {c:"Mixture", r:"CUTOFF"},
      {c:"Ignition", r:"OFF (after prop stops), key removed"},
      {c:"Alt 1 / Alt 2", r:"OFF"},
      {c:"Bat 1 / Bat 2", r:"OFF"},
      {c:"CAPS handle safety pin", r:"INSERT"},
      {c:"Fuel selector", r:"LEFT or RIGHT (leave on a tank)"},
      {c:"Pitot cover / chocks / tie-downs", r:"INSTALL"},
    ]},
  ],
  emergency: [
    {id:"caps", name:"CAPS Deployment", cond:"Loss of control, mid-air collision, structural failure, pilot incapacitation, or engine failure where a safe forced landing is not assured", items:[
      {c:"Airspeed", r:"MINIMISE (below 133 KIAS, as slow as practical)", mem:true},
      {c:"CAPS handle", r:"PULL straight down, both hands, full stroke (approx 45 lb)", mem:true},
      {c:"Mixture", r:"CUTOFF", mem:true},
      {c:"Fuel selector", r:"OFF", mem:true},
      {c:"Bat 1 / Bat 2 / Alt 1 / Alt 2", r:"OFF", mem:true},
      {c:"Seat belts / harnesses", r:"TIGHT", mem:true},
      {c:"Brace", r:"ASSUME emergency landing body position (arms crossed, hands on shoulders)", mem:true},
      {note:"CAPS is the primary response to loss of control, mid-air collision, structural failure, pilot incapacitation and engine failure over terrain where a safe forced landing is not assured. Recommended decision altitude 2,000 ft AGL; minimum demonstrated deployment from a loss of control 920 ft AGL, from level flight approx 400 ft AGL. Below the minimum, deploy anyway – it is still the best option.", kind:"warn"},
      {c:"Ignition / fuel pump", r:"OFF (if time permits)"},
      {c:"ELT", r:"ON (if time permits)"},
      {c:"Descent", r:"EXPECT approx 1,700 ft/min, 8 s to full canopy, hard landing (approx 3 g)"},
      {c:"After touchdown", r:"EVACUATE upwind if canopy drags, aircraft may be dragged by wind"},
    ]},
    {id:"eng-fail-roll", name:"Engine Failure During Takeoff Roll", items:[
      {c:"Power lever", r:"IDLE", mem:true},
      {c:"Brakes", r:"APPLY (differential for directional control)", mem:true},
      {c:"Flaps", r:"UP"},
      {c:"Mixture", r:"CUTOFF"},
      {c:"Fuel selector", r:"OFF"},
      {c:"Ignition", r:"OFF"},
      {c:"Bat 1 / Bat 2 / Alt 1 / Alt 2", r:"OFF"},
    ]},
    {id:"eng-fail-to", name:"Engine Failure after Takeoff", cond:"Airborne, insufficient runway remaining", land:"LAND IMMEDIATELY", items:[
      {c:"Airspeed", r:"BEST GLIDE or landing speed (80 KIAS flaps 50%)", mem:true},
      {c:"Mixture", r:"FULL RICH", mem:true},
      {c:"Fuel selector", r:"SWITCH tanks", mem:true},
      {c:"Fuel pump", r:"BOOST", mem:true},
      {c:"Alternate induction air", r:"OPEN", mem:true},
      {c:"Ignition", r:"BOTH (check)", mem:true},
      {note:"Below approx 600 ft AGL land straight ahead with only small heading changes – do not turn back. Above approx 600 ft AGL CAPS deployment is an option if a safe landing area is not available.", kind:"warn"},
      {branch:"Safe landing area ahead?", opts:{
        "Yes – land ahead":[
          {c:"Flaps", r:"100% when landing assured"},
          {c:"Mixture", r:"CUTOFF"},
          {c:"Fuel selector", r:"OFF"},
          {c:"Ignition", r:"OFF"},
          {c:"Bat 1 / Bat 2 / Alt 1 / Alt 2", r:"OFF"},
          {c:"Doors", r:"UNLATCH before touchdown"},
        ],
        "No – CAPS":[{note:"Deploy CAPS – see CAPS Deployment procedure.", kind:"warn"}]
      }},
    ]},
    {id:"eng-fail-flt", name:"Engine Failure in Flight", cond:"Loss of power with altitude available", land:"LAND AS SOON AS POSSIBLE", items:[
      {c:"Airspeed", r:"88 KIAS (best glide)", mem:true},
      {c:"Mixture", r:"FULL RICH", mem:true},
      {c:"Fuel selector", r:"SWITCH tanks", mem:true},
      {c:"Fuel pump", r:"BOOST", mem:true},
      {c:"Alternate induction air", r:"OPEN", mem:true},
      {c:"Ignition", r:"BOTH (cycle L / R / BOTH)", mem:true},
      {c:"Landing site", r:"SELECT, turn towards it"},
      {branch:"Restart attempt practicable?", opts:{
        "Yes – restart":[
          {c:"Power lever", r:"1/2 in open"},
          {c:"Mixture", r:"FULL RICH, then lean slowly"},
          {c:"Ignition", r:"START if propeller stopped"},
          {branch:"Engine restarted?", opts:{
            "Yes":[{c:"Power", r:"AS REQUIRED (minimum needed)"},{c:"Engine instruments", r:"MONITOR"},{defer:"Engine restarted after in-flight failure – land as soon as possible, suspect fuel or induction problem."}],
            "No":[{note:"Continue with forced landing or CAPS.", kind:"warn"}]
          }},
        ],
        "No – forced landing / CAPS":[]
      }},
      {branch:"Safe forced landing assured?", opts:{
        "Yes – forced landing":[
          {c:"Mayday / 7700", r:"TRANSMIT"},
          {c:"Seats / belts", r:"SECURE"},
          {c:"Flaps", r:"100% when landing assured"},
          {c:"Airspeed", r:"75–80 KIAS on final"},
          {c:"Mixture", r:"CUTOFF"},
          {c:"Fuel selector", r:"OFF"},
          {c:"Ignition", r:"OFF"},
          {c:"Bat 1 / Bat 2 / Alt 1 / Alt 2", r:"OFF"},
          {c:"Doors", r:"UNLATCH before touchdown"},
        ],
        "No – deploy CAPS":[{note:"Deploy CAPS before descending through 2,000 ft AGL – see CAPS Deployment procedure.", kind:"warn"}]
      }},
    ]},
    {id:"eng-fire-flt", name:"Engine Fire in Flight", land:"LAND IMMEDIATELY", items:[
      {c:"Mixture", r:"CUTOFF", mem:true},
      {c:"Fuel pump", r:"OFF", mem:true},
      {c:"Fuel selector", r:"OFF", mem:true},
      {c:"Power lever", r:"IDLE", mem:true},
      {c:"Ignition", r:"OFF", mem:true},
      {c:"Cabin heat / defrost", r:"OFF", mem:true},
      {c:"Airspeed", r:"INCREASE (sideslip to keep flames from cabin)"},
      {branch:"Fire extinguished and landing area within gliding range?", opts:{
        "Yes":[{c:"Forced landing", r:"EXECUTE (do not attempt restart)"}],
        "No":[{note:"Deploy CAPS – see CAPS Deployment procedure.", kind:"warn"}]
      }},
    ]},
    {id:"eng-fire-start", name:"Engine Fire During Start", items:[
      {c:"Mixture", r:"CUTOFF", mem:true},
      {c:"Fuel pump", r:"OFF", mem:true},
      {c:"Fuel selector", r:"OFF", mem:true},
      {c:"Power lever", r:"FULL FORWARD", mem:true},
      {c:"Ignition", r:"CONTINUE cranking (draw fire into engine)", mem:true},
      {c:"Ignition / Bat / Alt", r:"OFF when fire out"},
      {c:"Fire extinguisher", r:"OBTAIN"},
      {c:"Aircraft", r:"EVACUATE"},
    ]},
    {id:"cabin-fire", name:"Cabin / Electrical Fire", land:"LAND AS SOON AS POSSIBLE", items:[
      {c:"Bat 1 / Bat 2", r:"OFF", mem:true},
      {c:"Alt 1 / Alt 2", r:"OFF", mem:true},
      {c:"Avionics", r:"OFF", mem:true},
      {c:"Cabin heat / fresh air", r:"CLOSE"},
      {c:"Fire extinguisher", r:"ACTIVATE"},
      {note:"After discharge, open fresh air vents / crack a door to ventilate once fire is out.", kind:"warn"},
      {branch:"Fire out and electrical power required?", opts:{
        "Yes":[
          {c:"Circuit breakers", r:"CHECK – do not reset tripped breakers"},
          {c:"Bat 2 / Alt 2", r:"ON (essential bus first)"},
          {c:"Bat 1 / Alt 1 / avionics", r:"ON one at a time, check for smoke"},
          {defer:"Electrical fire – suspect circuits isolated, affected systems unavailable."},
        ],
        "No":[{note:"Continue with electrics off. Standby instruments and magnetic compass only; no flaps, no electric trim.", kind:"caution"},{defer:"All electrics off – flaps-up landing approx 90 KIAS, no radios, no trim."}]
      }},
    ]},
    {id:"emer-desc", name:"Emergency Descent", items:[
      {c:"Power lever", r:"IDLE", mem:true},
      {c:"Mixture", r:"AS REQUIRED", mem:true},
      {c:"Flaps", r:"UP", mem:true},
      {c:"Airspeed", r:"163 KIAS smooth air / 130 KIAS turbulence", mem:true},
    ]},
    {id:"spin", name:"Inadvertent Spin Entry", items:[
      {c:"CAPS handle", r:"PULL immediately", mem:true},
      {note:"The SR20 is not approved for spins and no spin recovery has been demonstrated – CAPS deployment is the only approved recovery. Minimum demonstrated deployment 920 ft AGL.", kind:"warn"},
      {c:"Power lever", r:"IDLE"},
      {c:"Controls", r:"NEUTRAL"},
      {c:"After deployment", r:"CONTINUE CAPS Deployment procedure"},
    ]},
  ],
  abnormal: [
    {id:"alt1-fail", name:"ALT 1 Failure", cond:"ALT 1 caution, Main Bus volts low / amps zero", items:[
      {c:"ALT 1 circuit breaker", r:"CHECK IN"},
      {c:"Alt 1", r:"OFF, then ON (reset once)"},
      {branch:"ALT 1 restored?", opts:{
        "Yes":[{c:"Electrical load", r:"MONITOR"}],
        "No":[
          {c:"Alt 1", r:"OFF"},
          {c:"Non-essential loads", r:"OFF (Alt 2 supplies approx 20 A to the essential bus only)"},
          {c:"Bat 1", r:"MONITOR – powers main bus until depleted (approx 30 min)"},
          {defer:"ALT 1 failed – main bus on battery, limited endurance; flaps once on final, land as soon as practical."},
        ]
      }},
    ]},
    {id:"alt2-fail", name:"ALT 2 Failure", cond:"ALT 2 caution, Ess Bus amps zero", items:[
      {c:"ALT 2 circuit breaker", r:"CHECK IN"},
      {c:"Alt 2", r:"OFF, then ON (reset once)"},
      {branch:"ALT 2 restored?", opts:{
        "Yes":[{c:"Electrical load", r:"MONITOR"}],
        "No":[{c:"Alt 2", r:"OFF"},{c:"Flight", r:"CONTINUE – Alt 1 supplies both buses"},{defer:"ALT 2 failed – no electrical redundancy, avoid IMC / night if practical, land as soon as practical."}]
      }},
    ]},
    {id:"low-volts", name:"Low Volts / Both Alternators Failed", cond:"LOW VOLTS warning on Main and Ess bus", items:[
      {c:"Alt 1 / Alt 2", r:"OFF then ON (reset once)"},
      {branch:"Voltage recovered?", opts:{
        "Yes":[{c:"Electrical load", r:"MONITOR"}],
        "No":[
          {c:"Alt 1 / Alt 2", r:"OFF"},
          {c:"Bat 1", r:"OFF (save Bat 2 for essential bus)"},
          {c:"Non-essential loads", r:"OFF"},
          {note:"Bat 2 powers the essential bus (PFD, standby attitude, COM1, NAV1) for approx 30 min. Flaps and trim are on the main bus – turn Bat 1 ON briefly for flaps on final.", kind:"caution"},
          {defer:"Both alternators failed – battery only, flaps once on final with Bat 1 ON, land as soon as possible."},
        ]
      }},
    ]},
    {id:"oil-press", name:"Low Oil Pressure", cond:"OIL PRESS warning or indication below 30 psi (10 psi idle)", items:[
      {c:"Oil pressure / temperature", r:"CHECK both"},
      {branch:"Oil temperature rising or pressure below 10 psi?", opts:{
        "Yes":[
          {c:"Power", r:"REDUCE to minimum required"},
          {c:"Landing site", r:"SELECT, expect engine failure; CAPS if no safe site"},
          {defer:"Low oil pressure – land as soon as possible, engine failure possible."},
        ],
        "No – temperature normal":[{c:"Flight", r:"CONTINUE, monitor closely"},{defer:"Suspect oil pressure indication – land as soon as practical."}]
      }},
    ]},
    {id:"oil-temp", name:"High Oil Temperature / CHT", cond:"Oil temperature above 240°F or CHT above 460°F", items:[
      {c:"Mixture", r:"ENRICH"},
      {c:"Airspeed", r:"INCREASE (lower nose)"},
      {c:"Power", r:"REDUCE"},
      {c:"Oil pressure", r:"CHECK"},
      {branch:"Temperature returning to green?", opts:{
        "Yes":[{c:"Flight", r:"CONTINUE, monitor"}],
        "No":[{c:"Power", r:"MINIMUM practical"},{defer:"Engine overheating – land as soon as practical, expect possible power loss."}]
      }},
    ]},
    {id:"rough", name:"Rough Running / Loss of Power", items:[
      {c:"Fuel pump", r:"BOOST"},
      {c:"Mixture", r:"ADJUST (richer, then leaner)"},
      {c:"Fuel selector", r:"SWITCH tanks"},
      {c:"Alternate induction air", r:"OPEN (induction icing or blockage)"},
      {c:"Ignition", r:"CHECK L / R individually, BOTH"},
      {branch:"Engine running smoothly?", opts:{
        "Yes":[{c:"Configuration", r:"KEEP the working combination"},{defer:"Engine ran rough – land as soon as practical, maintenance check."}],
        "No":[{c:"Power", r:"REDUCE to smoothest setting"},{c:"Land", r:"AS SOON AS POSSIBLE (prepare for engine failure / CAPS)"}]
      }},
    ]},
    {id:"fuel-flow", name:"Low Fuel Flow / Fuel Flow Fluctuation", cond:"Fuel flow fluctuating, FUEL PRESS or low fuel caution", items:[
      {c:"Fuel pump", r:"BOOST"},
      {c:"Fuel selector", r:"SWITCH to fuller tank"},
      {c:"Mixture", r:"FULL RICH"},
      {c:"Fuel quantity", r:"CHECK both tanks"},
      {branch:"Fuel flow steady?", opts:{
        "Yes":[{c:"Fuel pump", r:"LEAVE ON BOOST"},{defer:"Fuel pump on BOOST continuously – engine-driven pump or vapour suspect."}],
        "No":[{c:"Land", r:"AS SOON AS POSSIBLE, expect engine failure"}]
      }},
    ]},
    {id:"flap-fail", name:"Flap Failure", items:[
      {c:"FLAPS circuit breaker", r:"CHECK / RESET once"},
      {c:"Flap switch", r:"CYCLE (UP / 50% / 100%)"},
      {branch:"Flaps operable?", opts:{
        "Yes":[{c:"Flap setting", r:"AS REQUIRED"}],
        "No":[{c:"Approach", r:"FLAPS UP 85–90 KIAS / 50% 80–85 KIAS, flat approach"},{defer:"Flaps inoperative – flaps-up landing, increased approach speed and landing distance."}]
      }},
    ]},
    {id:"door-open", name:"Door Open in Flight", items:[
      {c:"Airspeed", r:"REDUCE below 119 KIAS"},
      {c:"Door", r:"DO NOT attempt to close – hold shut if practical"},
      {note:"A door open in flight is noisy and causes buffet; the aircraft remains controllable.", kind:"caution"},
      {c:"Loose objects / belts", r:"SECURE"},
      {defer:"Door open – land as soon as practical, keep speed below 119 KIAS."},
    ]},
    {id:"pfd-fail", name:"PFD / AHRS / ADC Failure", items:[
      {c:"Display backup (red button)", r:"PRESS – reversionary mode on MFD"},
      {c:"Standby instruments", r:"USE (airspeed, attitude, altimeter, compass)"},
      {c:"Autopilot", r:"OFF if AHRS failed"},
      {c:"PFD / AHRS circuit breakers", r:"CHECK"},
      {branch:"Flight in IMC?", opts:{
        "Yes":[{c:"ATC", r:"ADVISE, request radar assistance / nearest VMC"},{defer:"Primary flight display failed – partial panel, request vectors, avoid IMC."}],
        "No":[{defer:"PFD / AHRS failed – standby instruments only."}]
      }},
    ]},
    {id:"static", name:"Static Source Blocked / Erroneous Airspeed", items:[
      {c:"Pitot heat", r:"ON"},
      {c:"Alternate static source", r:"OPEN (valve under panel, left of pilot)"},
      {c:"Airspeed / altitude", r:"CROSS-CHECK with GPS ground speed and standby altimeter"},
      {c:"Attitude / power", r:"FLY known pitch and power settings"},
      {defer:"Pitot-static unreliable – fly attitude and power, add margin to approach speed."},
    ]},
  ]
});
