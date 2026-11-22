/* Optional plain-English briefing summary written by Claude. Only runs when ANTHROPIC_API_KEY is set and the SDK is
   installed. The prompt forbids anything that is not traceable to the quoted products, and the result is labelled as a
   draft for the pilot to check against the raw text, which is always shown alongside it. */
let Anthropic = null; try { Anthropic = require("@anthropic-ai/sdk"); } catch (e) { Anthropic = null; }
const MODEL = process.env.AEROE_SUMMARY_MODEL || "claude-opus-5-5";
async function summarise(briefing) {
  if (!process.env.ANTHROPIC_API_KEY || !Anthropic) return null;
  const client = new Anthropic();
  const products = (briefing.decoded.products || []).map(p => "[" + p.kind + (p.icao ? " " + p.icao : "") + "]\n" + p.text).join("\n\n").slice(0, 60000);
  const findings = JSON.stringify(briefing.evaluation.summary) + "\n" + [briefing.evaluation.destination, ...briefing.evaluation.alternates].flatMap(a => a.findings).concat(briefing.evaluation.departure.findings, briefing.evaluation.route).map(f => "- " + f.level.toUpperCase() + " " + f.aerodrome + " " + f.rule + ": " + f.text).join("\n");
  const system = "You write pre-flight briefing summaries for Australian pilots. You are given the raw NAIPS products (TAF, METAR, SPECI, TTF, NOTAM, SIGMET) and the findings of a rules engine. Write a short plain-English summary for the pilot in command.\nRules you must follow:\n1. State only what the quoted products say. Every operational statement must name the product it comes from, in brackets, e.g. [TAF YSCN] or [NOTAM C0123/26].\n2. Do not add weather or NOTAM information that is not in the products. If something is missing, say it is missing.\n3. Do not decide whether the flight is legal or safe; the pilot does. You may repeat the rules engine's requirements (alternate, holding) and say what they are based on.\n4. Use the sections: Departure, Destination, Alternates, En route, Requirements, Things to check. Keep it under 300 words.\n5. Write in plain Australian English, present tense, no bullet nesting.";
  const user = "Flight: " + briefing.plan.dep + " to " + briefing.plan.dest + (briefing.plan.altn && briefing.plan.altn.length ? " alternates " + briefing.plan.altn.join(", ") : "") + ", ETD " + briefing.plan.etd + "Z, EET " + briefing.plan.eetMin + " min.\n\nRULES ENGINE FINDINGS:\n" + findings + "\n\nRAW PRODUCTS:\n" + products;
  const res = await client.beta.messages.create({ model: MODEL, max_tokens: 2000, output_config: { effort: "medium" }, betas: ["server-side-fallback-2026-07-01"], fallbacks: "default", system, messages: [{ role: "user", content: user }] });
  if (res.stop_reason === "refusal") return null;
  return res.content.filter(b => b.type === "text").map(b => b.text).join("\n").trim() || null;
}
module.exports = { summarise, MODEL };
