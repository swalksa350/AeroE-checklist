/* Cessna 208B Grand Caravan – checklist data.
   Prototype content. Verify against the operator's approved checklist and the POH/AFM. */
window.AIRCRAFT = window.AIRCRAFT || [];
window.AIRCRAFT.push({
  id: "c208b",
  maker: "Cessna",
  model: "208B Grand Caravan",
  short: "C208B",
  category: "Turboprop",
  engine: "Pratt & Whitney PT6A-114A, 675 shp",
  seats: "1 + 9 to 13",
  basis: "Typical 208B (PT6A-114A) procedures; operator checklist may differ.",
  vspeeds: [
    {k:"Vr", v:"70–75 KIAS"},
    {k:"Vx", v:"72 KIAS"},
    {k:"Vy", v:"104 KIAS"},
    {k:"Best glide", v:"95 KIAS"},
    {k:"Vfe", v:"175 / 150 / 125 KIAS (10° / 20° / 30°)"},
    {k:"Va", v:"148 KIAS (8,750 lb)"},
    {k:"Vmo", v:"175 KIAS"},
    {k:"Vref", v:"75–85 KIAS"}
  ],

  normal: [
    {id:"pre", name:"Before Start", items:[
      {c:"Preflight inspection", r:"COMPLETE"},
      {c:"Seats, belts, harnesses", r:"ADJUST & LOCK"},
      {c:"Brakes", r:"TEST & SET"},
      {c:"Fuel selectors", r:"BOTH ON"},
      {c:"Fuel shutoff", r:"ON (push in)"},
      {c:"Emergency power lever", r:"NORMAL"},
      {c:"Power lever", r:"IDLE"},
      {c:"Propeller control", r:"MAX"},
      {c:"Fuel condition lever", r:"CUTOFF"},
      {c:"Avionics switches", r:"OFF"},
      {c:"Bleed air heat", r:"OFF"},
      {c:"Battery switch", r:"ON"},
      {c:"Annunciators", r:"CHECK (no abnormal lights)"},
      {c:"Fuel quantity", r:"CHECK"},
      {c:"Beacon", r:"ON"},
    ]},
    {id:"start", name:"Engine Start", items:[
      {c:"Propeller area", r:"CLEAR"},
      {c:"Fuel boost", r:"ON"},
      {c:"Starter switch", r:"START"},
      {c:"Oil pressure", r:"CHECK rising"},
      {c:"Ng", r:"12% minimum (stable)"},
      {c:"Fuel condition lever", r:"LOW IDLE"},
      {c:"ITT", r:"MONITOR (1090°C max)"},
      {c:"Ng", r:"52% minimum"},
      {c:"Starter switch", r:"OFF"},
      {c:"Oil pressure", r:"CHECK in limits"},
      {c:"Starter annunciator", r:"OFF"},
      {c:"Generator", r:"CHECK charging"},
      {c:"Fuel boost", r:"NORM"},
      {c:"Avionics switches", r:"ON"},
      {c:"Engine instruments", r:"CHECK"},
    ]},
    {id:"taxi", name:"Before Taxi", items:[
      {c:"Inertial separator", r:"BYPASS (as required)"},
      {c:"Flight instruments / avionics", r:"CHECK & SET"},
      {c:"Altimeters", r:"SET"},
      {c:"Trims", r:"SET for takeoff"},
      {c:"Autopilot", r:"CHECK"},
      {c:"Brakes", r:"CHECK during taxi"},
    ]},
    {id:"runup", name:"Before Takeoff", items:[
      {c:"Flight controls", r:"FREE & CORRECT"},
      {c:"Overspeed governor", r:"CHECK"},
      {c:"Propeller", r:"EXERCISE"},
      {c:"Standby power", r:"CHECK"},
      {c:"Engine instruments", r:"CHECK"},
      {c:"Fuel selectors", r:"BOTH ON"},
      {c:"Fuel condition lever", r:"HIGH IDLE"},
      {c:"Wing flaps", r:"SET (10°–20°)"},
      {c:"Trims", r:"SET"},
      {c:"Inertial separator", r:"NORMAL (unless contaminated)"},
      {c:"Pitot heat", r:"AS REQUIRED"},
      {c:"Lights", r:"AS REQUIRED"},
      {c:"Transponder", r:"ALT"},
      {c:"Doors", r:"LOCKED"},
      {c:"Takeoff briefing", r:"COMPLETE"},
    ]},
    {id:"climb", name:"After Takeoff / Climb", items:[
      {c:"Wing flaps", r:"UP (above 85 KIAS)"},
      {c:"Climb power", r:"SET (torque / ITT / Ng in limits)"},
      {c:"Propeller", r:"1600–1900 RPM"},
      {c:"Fuel boost", r:"NORM"},
      {c:"Engine instruments", r:"CHECK"},
    ]},
    {id:"cruise", name:"Cruise", items:[
      {c:"Cruise power", r:"SET"},
      {c:"Fuel quantity / balance", r:"CHECK"},
      {c:"Engine instruments", r:"CHECK"},
      {c:"Pressure altitude / temperature", r:"NOTED"},
    ]},
    {id:"desc", name:"Descent", items:[
      {c:"Altimeters", r:"SET"},
      {c:"Fuel selectors", r:"BOTH ON"},
      {c:"Inertial separator", r:"AS REQUIRED"},
      {c:"Approach briefing", r:"COMPLETE"},
    ]},
    {id:"land", name:"Before Landing", items:[
      {c:"Fuel selectors", r:"BOTH ON"},
      {c:"Fuel boost", r:"NORM"},
      {c:"Propeller", r:"MAX"},
      {c:"Wing flaps", r:"AS REQUIRED (full for landing)"},
      {c:"Airspeed", r:"SET (ref 75–85 KIAS)"},
      {c:"Landing lights", r:"ON"},
    ]},
    {id:"after", name:"After Landing", items:[
      {c:"Wing flaps", r:"UP"},
      {c:"Trims", r:"SET"},
      {c:"Transponder", r:"STBY / as required"},
      {c:"Lights", r:"AS REQUIRED"},
      {c:"Inertial separator", r:"BYPASS"},
    ]},
    {id:"shut", name:"Shutdown", items:[
      {c:"Parking brake", r:"SET"},
      {c:"Avionics switches", r:"OFF"},
      {c:"Fuel boost", r:"OFF"},
      {c:"Propeller", r:"MAX"},
      {c:"Fuel condition lever", r:"CUTOFF"},
      {c:"ITT", r:"MONITOR during coast-down"},
      {c:"Propeller", r:"FEATHER (after Ng stops)"},
      {c:"Fuel shutoff", r:"OFF (pull out)"},
      {c:"Lights / battery", r:"OFF"},
      {c:"Control lock", r:"INSTALL"},
    ]},
  ],
  emergency: [
    {id:"eng-fail-to", name:"Engine Failure after Takeoff", cond:"Airborne, insufficient runway remaining", land:"LAND IMMEDIATELY", items:[
      {c:"Airspeed", r:"85 KIAS (flaps up) / 75 KIAS (flaps down)", mem:true},
      {c:"Power lever", r:"IDLE", mem:true},
      {c:"Propeller", r:"FEATHER", mem:true},
      {c:"Fuel condition lever", r:"CUTOFF", mem:true},
      {c:"Wing flaps", r:"AS REQUIRED", mem:true},
      {c:"Fuel shutoff", r:"OFF", mem:true},
      {c:"Battery switch", r:"OFF", mem:true},
      {note:"Land straight ahead with only small changes of direction. Do not attempt a turn back.", kind:"warn"},
    ]},
    {id:"eng-fail-flt", name:"Engine Failure in Flight", cond:"Loss of power with altitude available", land:"LAND AS SOON AS POSSIBLE", items:[
      {c:"Airspeed", r:"95 KIAS (best glide)", mem:true},
      {c:"Propeller", r:"FEATHER", mem:true},
      {c:"Emergency power lever", r:"NORMAL", mem:true},
      {branch:"Restart attempt practicable?", opts:{
        "Yes – restart":[
          {c:"Fuel condition lever", r:"CUTOFF"},
          {c:"Ignition", r:"ON"},
          {c:"Fuel boost", r:"ON"},
          {c:"Starter", r:"START (Ng 12% min)"},
          {c:"Fuel condition lever", r:"LOW IDLE"},
          {c:"ITT", r:"MONITOR"},
          {c:"Propeller", r:"MAX (once running)"},
          {branch:"Engine restarted?", opts:{
            "Yes":[{c:"Power", r:"AS REQUIRED"},{c:"Engine instruments", r:"MONITOR"},{defer:"Engine restarted after in-flight failure – land as soon as possible and report."}],
            "No":[{note:"Continue with forced landing.", kind:"warn"}]
          }},
        ],
        "No – forced landing":[]
      }},
      {note:"Forced landing without power:", kind:"warn"},
      {c:"Seats / belts / harnesses", r:"SECURE"},
      {c:"Wing flaps", r:"AS REQUIRED (full on final)"},
      {c:"Airspeed", r:"75–80 KIAS"},
      {c:"Fuel shutoff", r:"OFF"},
      {c:"Fuel condition lever", r:"CUTOFF"},
      {c:"Battery switch", r:"OFF (when no longer required)"},
      {c:"Doors", r:"UNLATCH before touchdown"},
    ]},
    {id:"eng-fire-flt", name:"Engine Fire in Flight", land:"LAND IMMEDIATELY", items:[
      {c:"Fuel condition lever", r:"CUTOFF", mem:true},
      {c:"Fuel shutoff", r:"OFF", mem:true},
      {c:"Propeller", r:"FEATHER", mem:true},
      {c:"Cabin heat", r:"OFF", mem:true},
      {c:"Bleed air heat", r:"OFF", mem:true},
      {c:"Airspeed", r:"95 KIAS (or higher if fire persists)"},
      {c:"Forced landing", r:"EXECUTE (do not attempt restart)"},
    ]},
    {id:"eng-fire-start", name:"Engine Fire During Start", items:[
      {c:"Starter", r:"CONTINUE cranking (purge)", mem:true},
      {c:"Fuel condition lever", r:"CUTOFF", mem:true},
      {c:"Fuel shutoff", r:"OFF", mem:true},
      {c:"Fuel boost", r:"OFF"},
      {c:"Starter", r:"OFF (after ITT decreases)"},
      {c:"Battery switch", r:"OFF"},
      {c:"Fire extinguisher", r:"OBTAIN"},
      {c:"Aircraft", r:"EVACUATE"},
    ]},
    {id:"cabin-fire", name:"Cabin / Electrical Fire", land:"LAND AS SOON AS POSSIBLE", items:[
      {c:"Battery switch", r:"OFF", mem:true},
      {c:"Avionics switches", r:"OFF", mem:true},
      {c:"Cabin heat / vents", r:"CLOSE"},
      {c:"Fire extinguisher", r:"ACTIVATE"},
      {note:"After discharge, ventilate the cabin.", kind:"warn"},
      {branch:"Fire out and electrical power required?", opts:{
        "Yes":[
          {c:"Circuit breakers", r:"CHECK – do not reset faulted"},
          {c:"Battery switch", r:"ON"},
          {c:"Avionics / electrical", r:"ON one at a time, check for smoke"},
          {defer:"Electrical fire – suspect circuits isolated, affected systems unavailable."},
        ],
        "No":[{note:"Continue with battery off. Standby instruments only.", kind:"caution"}]
      }},
    ]},
    {id:"emer-desc", name:"Emergency Descent", items:[
      {c:"Power lever", r:"IDLE", mem:true},
      {c:"Propeller", r:"MAX", mem:true},
      {c:"Wing flaps", r:"UP", mem:true},
      {c:"Airspeed", r:"175 KIAS (smooth air) / 148 KIAS (turbulence)", mem:true},
    ]},
  ],
  abnormal: [
    {id:"gen-off", name:"GENERATOR OFF annunciator", land:"", items:[
      {c:"Generator switch", r:"RESET then ON"},
      {branch:"Generator restored?", opts:{
        "Yes":[{c:"Generator load", r:"MONITOR"}],
        "No":[
          {c:"Generator switch", r:"TRIP"},
          {c:"Non-essential electrical load", r:"REDUCE"},
          {c:"Battery", r:"MONITOR (approx 30 min endurance)"},
          {defer:"Generator failed – on battery power, limited electrical endurance. Land as soon as practical."},
        ]
      }},
    ]},
    {id:"oil-press", name:"Low Oil Pressure", cond:"OIL PRESS LOW annunciator or indication below limits", items:[
      {c:"Oil pressure / temperature", r:"CHECK"},
      {branch:"Oil pressure confirmed low (below 85 psi)?", opts:{
        "Yes":[
          {c:"Power", r:"REDUCE to minimum required"},
          {c:"Engine", r:"MONITOR for seizure indications"},
          {defer:"Low oil pressure – land as soon as possible, expect possible engine failure."},
        ],
        "No – gauge fault":[{c:"Flight", r:"CONTINUE, monitor oil temperature"}]
      }},
    ]},
    {id:"fuel-press", name:"FUEL PRESS LOW annunciator", items:[
      {c:"Fuel boost", r:"ON"},
      {c:"Fuel selectors", r:"BOTH ON"},
      {c:"Fuel quantity", r:"CHECK"},
      {branch:"Annunciator extinguished?", opts:{
        "Yes":[{c:"Fuel boost", r:"LEAVE ON"},{defer:"Fuel boost pump on continuously – engine-driven pump suspect."}],
        "No":[{c:"Fuel contamination / exhaustion", r:"CONSIDER"},{c:"Land", r:"AS SOON AS POSSIBLE"}]
      }},
    ]},
    {id:"fuel-sel", name:"FUEL SELECT OFF annunciator", items:[
      {c:"Fuel selectors", r:"CHECK BOTH ON"},
      {c:"Fuel selector warning", r:"CHECK"},
    ]},
    {id:"ice", name:"Inadvertent Icing", items:[
      {c:"Pitot / static heat", r:"ON"},
      {c:"Inertial separator", r:"BYPASS"},
      {c:"Windshield / propeller anti-ice", r:"ON (if fitted)"},
      {c:"Exit icing conditions", r:"TURN / CLIMB / DESCEND"},
      {c:"Airspeed", r:"INCREASE (flaps-up landing)"},
      {c:"Wing flaps", r:"LIMIT to 10° for landing with residual ice"},
      {defer:"Residual airframe ice – flaps-up / 10° landing, increased approach speed."},
    ]},
    {id:"chip", name:"CHIP DETECTOR annunciator", items:[
      {c:"Engine instruments", r:"MONITOR closely"},
      {c:"Power", r:"REDUCE to minimum practical"},
      {defer:"Chip detector – land as soon as practical, maintenance inspection required."},
    ]},
    {id:"volt", name:"VOLTAGE LOW annunciator", items:[
      {c:"Generator", r:"CHECK ON / charging"},
      {c:"Electrical load", r:"REDUCE"},
      {branch:"Voltage recovered?", opts:{
        "Yes":[{c:"Flight", r:"CONTINUE, monitor"}],
        "No":[{note:"Refer to GENERATOR OFF procedure.", kind:"warn"}]
      }},
    ]},
    {id:"flap-fail", name:"Flap Failure", items:[
      {c:"Flap circuit breaker", r:"CHECK / RESET once"},
      {c:"Standby flap motor", r:"ON (if fitted)"},
      {branch:"Flaps operable?", opts:{
        "Yes":[{c:"Flap setting", r:"AS REQUIRED"}],
        "No":[{c:"Landing", r:"FLAPS UP – 95 KIAS approach, longer runway"},{defer:"Flaps inoperative – flaps-up landing, increased landing distance."}]
      }},
    ]},
  ]
});
