# Writing an aircraft checklist data file

Each aircraft is one file `aircraft/<id>.js` that pushes one object onto `window.AIRCRAFT`.
Copy the structure of `aircraft/c208b.js` exactly. Validate with `node tools/validate.js aircraft/<id>.js`
and fix every ✗ before you finish.

## Top-level fields (all required strings unless noted)
- `id`: lowercase letters/digits/hyphens, equals the file name. e.g. `c172s`, `pa28-181`, `sr22`.
- `maker`, `model` (e.g. "172S Skyhawk"), `short` (cockpit shorthand, max 8 chars, e.g. "C172S").
- `category`: exactly one of `Single-engine piston`, `High-performance single`, `Multi-engine piston`, `Turboprop`.
  (High-performance single = retractable gear and/or constant-speed prop and/or >200 hp: Bonanza, SR22, Arrow, Mooney, C182, C206.)
- `engine`: e.g. "Lycoming IO-360-L2A, 180 hp".
- `seats`: e.g. "4".
- `basis`: one sentence on which variant/years the procedures follow, e.g. "Typical 172S (1998+) POH procedures; fuel-injected engine."
- `vspeeds`: array of `{k, v}`, at least Vr, Vx, Vy, Best glide, Vfe, Va, Vno, Vne, Vref/approach (plus Vle/Vlo for retractables, Vmc/Vyse/Vxse for twins, Vs/Vso). Values as strings with units, e.g. "74 KIAS".
- `normal`, `emergency`, `abnormal`: arrays of procedures.

## Procedure
`{id, name, cond?, land?, items}`
- `id`: lowercase/digits/hyphens, unique across ALL three modes in the file.
- `cond`: optional one-line entry condition shown under the title (emergency/abnormal).
- `land`: optional, exactly `"LAND IMMEDIATELY"`, `"LAND AS SOON AS POSSIBLE"` or `"LAND AS SOON AS PRACTICAL"`.

## Items (in order, in `items` arrays)
- `{c:"Challenge", r:"RESPONSE"}` – normal line. Response in CAPS for the action, lowercase detail in parentheses: `r:"ON (push in)"`.
- `{c, r, mem:true}` – memory item (boldface/recall item). Use for the first actions of time-critical emergencies only.
- `{c, r, sub:true}` – indented sub-line.
- `{note:"text", kind:"warn"|"caution"}` – non-actionable text (warnings, "do not attempt restart", etc.).
- `{branch:"Question?", opts:{"Option A":[items], "Option B":[items]}}` – conditional. Options are short labels, 2–3 of them, first word Yes/No where it fits. Max 2 levels of nesting. An empty array `[]` is fine for an option that needs no extra lines.
- `{defer:"text"}` – an item that rolls onto the pilot's Status page as a landing consideration (e.g. "Flaps inoperative – flaps-up landing, longer runway"). Use it at the end of abnormal procedures and any emergency branch where the flight continues.
- No other keys. No HTML. Plain text with real units (KIAS, RPM, psi, °C, in Hg, GPH, lb).

## Content expectations
- Normal: the full flight sequence as separate procedures in this order and with these ids: `pre` Before Start (include preflight complete, passenger brief), `start` Engine Start, `taxi` Before Taxi, `runup` Before Takeoff (run-up), `climb` After Takeoff / Climb, `cruise` Cruise, `desc` Descent, `land` Before Landing, `after` After Landing, `shut` Shutdown (secure). Twins add `ground-check` items inside runup rather than extra procedures. Aim for 60–100 lines total. Include the real numbers a pilot checks (mag drop, carb heat RPM drop, oil pressure, flap settings, approach speeds, prop cycling RPM, feather check for twins, CAPS/parachute checks for Cirrus, gear checks for retractables).
- Emergency (6–9 procedures): engine failure during takeoff roll, engine failure after takeoff, engine failure in flight (with a restart branch and a forced-landing section), engine fire in flight, engine fire during start, electrical/cabin fire, emergency descent, plus type-specific ones (CAPS deployment for Cirrus; engine failure after takeoff with gear down and one-engine-inoperative procedures for twins; emergency gear extension for retractables; spin recovery for trainers; inadvertent icing where relevant). Memory items on the first actions. `land` flags set.
- Abnormal (6–9 procedures): alternator/generator failure, low oil pressure, low voltage, high oil temperature/overheat, rough running/carb ice, fuel pressure/flow, flap failure, gear fails to extend/retract (retractables), door open in flight, vacuum/AHRS/PFD failure, propeller overspeed (constant speed), icing, static source blocked. Each with branches and a `defer` where the condition persists to landing.
- Use the real cockpit nomenclature of the type (e.g. "Fuel selector – BOTH" for Cessnas, "Fuel pump – ON" for Pipers, "CAPS handle – PULL" for Cirrus, "ECU test" for Diamond diesels, "Gear handle – DOWN, three green" for retractables).
- Values are typical published POH figures for the stated variant. Where variants differ, say so in parentheses or in `basis`. Do not invent precision you do not have: a range ("65–75 KIAS") is better than a wrong exact number.
- Keep the prototype notice at the top of the file (comment) exactly as in c208b.js.

## Weight and balance templates (`wb/<id>.js`)
Optional. A file sets `window.WB[<aircraft id>]` with: `verified`, `basis` (source text shown in the app), `units` (`weight` kg|lb, `arm` mm|in, `fuel` L|USgal), `fuelDensity`, `fuelArm`, `fuelCapacity` (usable), `limits` (`maxRamp`, `maxTakeoff`, `maxLanding`, `maxZeroFuel`; null when the POH gives none), `stations` (`id`, `name`, `arm`, `max`), `envelope` (`forward` and `aft` arrays of `[weight, arm]` points; limits are held constant beyond the first and last point), `notes`.
`testProfile` (optional) is a registration seeded once per device as a deletable example; give it `test: true`, a clearly fictitious `notes` line, and loads that reproduce the POH worked example so the result can be checked. Record every figure's source in REVIEW.md.
