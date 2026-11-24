# AeroE Checklist – operator connector interface

AeroE runs on the pilot's device with no server of its own. An operator who wants rostering, record keeping and
notices integrated runs a small **connector** web service that implements the JSON interface below in front of its own
systems (Air Maestro, Leon, FL3XX, a records database, or a spreadsheet). Pilots enter the connector address, a
per-pilot token and their pilot ID under Status › Operator link.

All requests carry `Authorization: Bearer <token>` and expect JSON. The app is served from
`https://swalksa350.github.io` (or the native app's origin), so the connector must answer CORS pre-flight requests:
`Access-Control-Allow-Origin: <app origin>`, `Access-Control-Allow-Headers: Authorization, Content-Type`,
`Access-Control-Allow-Methods: GET, POST, OPTIONS`.

| Method | Path | Purpose |
|---|---|---|
| GET | `/ping` | Connection test. Returns `{ "operator", "naips", "personalNaips", "caps": { roster, fleet, notices, records, briefing, fpl, winds } }`; the app hides roster and fleet features when their flag is false. |
| GET | `/roster?pilot=<id>&date=YYYY-MM-DD` | The pilot's flights for the day (see below). |
| GET | `/fleet` | Fleet pack: per-type customisations, W&B registrations, standard weights, duty limit. |
| POST | `/records` | A flight record (manifest, W&B, performance, sign-off). Returns `{ "id": "<your reference>" }`. |
| GET | `/notices?pilot=<id>` | Company notices for the pilot. |
| POST | `/notices/<id>/ack` | Read receipt `{ "pilotId": "...", "at": "ISO time" }`. |

## Roster

```json
{ "flights": [ {
  "ref": "FLT123", "date": "2026-11-16", "std": "09:30",
  "aircraftType": "c208b", "rego": "VH-ABC", "from": "YSBK", "to": "YSCN", "pic": "A Pilot",
  "pax": [ { "name": "J Smith", "role": "pax", "weight": 84, "std": false, "station": "row2" } ],
  "cargo": [ { "desc": "2 bags", "weight": 30, "station": "z2" } ] } ] }
```

`aircraftType` is the AeroE type id (`c208b`, `ga8`, …) or its short name. `station` ids are those of the
registration's W&B profile; unknown ids fall back to the first seat or the baggage station. `weight` may be omitted when
the pilot will weigh passengers; `std: true` marks a standard weight.

## Fleet pack

```json
{ "aircraft": { "c208b": { "version": 2, "approach": null, "overrides": {}, "wb": { "VH-ABC": { "...W&B profile..." } } } },
  "standardWeights": { "adult": 86, "child": 32, "infant": 10 },
  "duty": { "maxHours": 11 } }
```

Each `aircraft` entry has the same shape as the app's *Export customisations* text for that type, so an operator can
build a pack by exporting from a configured device. Applying a pack replaces that type's customisations and
registrations on the device (progress through checklists is reset).

## Routes

`GET /routes?dep=YSBK&dest=YBTH` returns `{ "routes": [ { "route": "BTH H65 CUL", "note": "company standard" } ] }` – the operator's
preferred routes for a city pair, shown in the planner beside the routes the pilot has used before. The reference server reads
`data/routes.json`: `[ { "dep", "dest", "route", "note" } ]`.

Fleet pack extras: `"mapLayers": [ { "name", "url", "type": "base"|"overlay", "wms": false, "layers", "attribution" } ]` (up to three
chart sources the operator licenses, e.g. tiles or a WMS) is applied to every pilot's map.

## Flight record

`POST /records` body: `{ "aeroe": "flight-record", "version": 1, "pilotId": "...", "record": { ... } }` where `record`
is the same object the app exports as JSON (see *Export records (JSON)*): `id`, `savedAt`, `aircraft`, `rego`,
`flight` (date, from, to, pic, ref, block and air times, landings, fuel uplift), `manifest` (people with seat, weight,
dangerous-goods and briefing flags; freight), `wb` (every item's weight and arm, the four conditions against their
limits, verdict), `perf` (take-off and landing inputs and results), `mr` (maintenance release hours before and after),
and `signoff` (name, licence, time, statement, SHA-256 fingerprint of the record as accepted). Records are immutable
once signed; a connector should store them as received and may verify the fingerprint by hashing the canonical JSON
of the record with the `signoff` key removed (keys sorted, no whitespace).

Uploads are queued on the device until there is signal; the same record may be posted again after a failure, so treat
`record.id` as idempotent.

## Notices

```json
{ "notices": [ { "id": "n42", "title": "Runway 11/29 works at YSCN", "body": "…", "date": "2026-11-16", "requiresAck": true } ] }
```

## Briefing

`POST /briefing` with `{ "dep": "YSBK", "dest": "YSCN", "altn": ["YBTH"], "etd": "2026-11-22T22:30:00Z", "eetMin": 35,
"altEetMin": 30, "fuelFlow": 60, "fuelOnBoard": 320, "policy": { "fixedReserveMin": 45, "variableReservePct": 10, "taxi": 5 },
"aircraft": { "maxCrosswind": 20, "maxTailwind": 5, "runwayHdg": { "YSCN": 240 } }, "minima": { "YSCN": { "ceiling": 1500, "vis": 8000 } },
"areas": ["21"], "summary": true }` returns `{ fetched, plan, decoded: { taf, metar, ttf, notam, sigmet, products }, evaluation:
{ summary: { alternateRequired, holdingMinutes, alternatesSuitable, alternatesUnsuitable, eta }, departure, destination,
alternates, route }, fuel: { lines, required, onBoard, sufficient, margin }, summary (text or null), rawContent }`. Each
finding is `{ level: "alternate" | "holding" | "warning" | "info", aerodrome, rule, text, quote, holdMin }` and quotes the
product it rests on. The reference connector gets the products from NAIPS; another connector may use any briefing source
as long as it returns the same shape.

## Flight plan

`POST /fpl` with the ICAO fields `{ acid, atyp, wtc, reg, rules, flightType, equip: ["S","G"], surv: ["S"], adep, etd, ades,
eetMinutes, altn: [], route: { speed: "N0120", level: "A050", segments: [{ waypoint: "WOL" }] }, other: { pbn, rmk, ... },
suppl: { endurance (min), pob, pilotName, pilotPhone, colour, ... }, sartime, sartimeLocation, dryRun }` returns
`{ filed, status, info, fplText: [], preview }`. `preview` is the FPL as text for the record; `fplText` is NAIPS's own
rendering when filed. The app stores both with the flight record.

Route `segments[].waypoint` entries are aerodrome codes or ICAO lat/long tokens such as `3340S15110E` (turning points added from the map); they go into the NAIPS route as waypoints.

## Charts

`POST /charts` with `{ category? }` (GAF, GPWT, SIGWX, WIND_TEMP, OTHER) returns `{ charts: [{ code, name, from, till, format, category, variants }] }`
from NAIPS's chart directory; `POST /chart` with `{ key, variant? }` returns `{ products: [{ type, variant, data (base64) }] }`.
Both accept the personal `naips` login like the briefing.

Fleet pack `minima` entries may carry `toCeiling`, `toVis`, `elev` and `approaches: [{ type, da, vis }]` as well as `ceiling`, `vis` and `note`.

## Winds and personal NAIPS accounts

The installed iOS/Android app reaches NAIPS directly and only uses the connector for roster, fleet, notices and records; a browser uses the connector for everything.

`POST /winds` with `{ dep, dest, etd, tas }` returns the NAIPS wind and temperature profile for the stage as text plus
the wind groups the connector could parse (`winds: [{ alt, dir, spd, temp }]`). Any of `/briefing`, `/winds`, `/fpl` and
`POST /naips/status` may carry `"naips": { "user", "pass" }`; the connector then uses that NAIPS account for the request
instead of its own and does not store it. This lets a pilot use a personal NAIPS login through a connector that has no
operator account at all.

## Not yet covered

Departure and arrival messages after filing (SARTIME cancellation, delay, revision) and NOTAM proposals are not
exposed yet; the NAIPS service has operations for them (`revise-active-fn`, `submit-sar-fn`).

## Maintenance in the fleet pack

`GET /fleet` may carry a `maint` object keyed by registration. Items replace the pilot's list on each fetch; hours are
merged; `email` is the address Share uses for defect reports when there is no connector.

```json
"maint": {
  "VH-WSM": {
    "email": "maintenance@example.com",
    "hours": { "airframe": 1200.4, "basis": "tacho", "tacho": 1234.5, "landings": 2400, "engines": [{ "tsn": 850.2, "tso": 120.7, "cycles": null }], "asAt": "2026-11-20" },
    "items": [
      { "id": "100h", "name": "100-hourly inspection", "basis": "airframe", "due": 1250, "interval": 100 },
      { "id": "elt", "name": "ELT battery", "basis": "date", "dueDate": "2027-03-01" },
      { "id": "prop", "name": "Propeller overhaul", "basis": "engine1", "due": 2000 }
    ]
  }
}
```

`basis` is `airframe` (hours), `engineN` (hours), `engineNc` (engine cycles), `landings` or `date`. `hours.basis` is `tacho`, `air` or `block` (what each completed flight adds to the airframe total). Defect reports arrive as `POST /defects` with
`{aeroe:"defect", rego, pilotId, defect:{id,t,title,severity:"aog"|"deferred"|"monitor",category,desc,readings,actions,melRef,status,photos:[dataURL],hoursAt,pilot,place,flight}}`;
trend readings as `POST /trend` with `{aeroe:"trend", rego, pilotId, reading:{id,t,flight,pa,oat,ias,engines:[{...}],note}}`.
