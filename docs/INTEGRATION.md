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
| GET | `/ping` | Connection test. Returns `{ "operator": "Name" }`. |
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

## Not yet covered

Flight planning and NAIPS submission, weather and NOTAM briefings and their analysis are planned as a separate
`/briefing` service on the connector, since NAIPS access requires an Airservices account and server-side credentials.
The record and roster interfaces above are designed so that a planned flight (route, alternates, fuel plan) can be added
to the roster entry and carried into the flight record unchanged.
