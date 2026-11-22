# AeroE operator connector

A small Node.js service (no dependencies, Node 18 or later) that an operator runs between the AeroE Checklist app and
its own systems. It implements the interface in `../docs/INTEGRATION.md`:

| Endpoint | What it does |
|---|---|
| `GET /ping` | Connection test; reports whether NAIPS and summaries are configured. |
| `GET /roster?pilot=&date=` | The pilot's flights for the day from `data/roster.json` (replace with a query to your rostering system). |
| `GET /fleet` | Fleet pack from `data/fleet.json`: registrations, checklist customisations, standard weights, duty limit. |
| `POST /records`, `GET /records` | Stores each uploaded flight record as `data/records/<id>.json` and checks a signed record's fingerprint. |
| `GET /notices`, `POST /notices/:id/ack` | Company notices from `data/notices.json`; read receipts appended to `data/acks.json`. |
| `POST /briefing` | NAIPS location briefing for departure, destination and alternates (TAF, METAR/SPECI, TTF, NOTAM, SIGMET), decoded, run through the alternate/holding/NOTAM rules, with a fuel plan and an optional plain-English summary. |
| `POST /fpl` | Files an ICAO flight notification through NAIPS (`submit-icao-fn`) and returns the FPL text; `dryRun: true` returns the preview only. |
| `GET /naips/status` | Authenticates the NAIPS account and returns the account name and message of the day. |

## Setup

1. Register a NAIPS account at https://www.airservicesaustralia.com/naips/ (the operator's account, or the pilot's own).
   The NAIPS SOAP interface used here is the one published at `https://www.airservicesaustralia.com/naips/briefing-service?wsdl`
   and `.../flight-notification-service?wsdl`; the request shapes in `naips.js` follow its schema. Airservices asks
   that third-party use be arranged with them – check the NAIPS terms before putting this into service.
2. Copy `.env.example` to `.env`, set the tokens, the NAIPS account and the app origin, then start it:

```bash
set -a; . ./.env; set +a
node server.js
```

3. In the app, Status › Operator link: enter the connector address, the pilot's token and pilot ID, then Test connection.

Run it behind HTTPS (a reverse proxy such as Caddy or nginx), because the app is served over HTTPS and browsers block
mixed content. `ALLOWED_ORIGIN` must be the app's origin exactly.

## Briefing rules

`rules.js` applies the Australian aeroplane alternate and holding rules in a simple form: no TAF or a TAF not covering
ETA ± 30 min requires an alternate; forecast cloud more than SCT or visibility below the alternate minima (default
1,500 ft and 8 km, per aerodrome overrides in the request), thunderstorms, or crosswind/tailwind beyond the aircraft's
limits in the operative forecast require an alternate; TEMPO below minima carries 60 min holding, INTER 30 min, a bare
PROB 60 min; relevant NOTAMs (closures, lighting, navaid outages, fuel, obstacles) are flagged with the quoted text.
These are planning aids that the operator must align with its exposition and the current AIP; they are not a legal
determination and the raw products are always returned for the pilot to read.

## Summaries

With `ANTHROPIC_API_KEY` set and `npm install @anthropic-ai/sdk` done, `/briefing` adds a short plain-English summary
written by Claude (`claude-opus-5-5` by default). The prompt allows only statements traceable to the quoted products,
each tagged with its source, and the app shows the summary beside the raw text labelled as a draft.

## Tests

```bash
npm test
```

The tests run a mock NAIPS SOAP server and check the envelopes against the published schema, decode a sample briefing,
exercise the rules at several ETAs, and call the HTTP endpoints end to end.
