import {
  ingredientProfiles,
  pairRules,
  restrictedIngredients,
  starterRainbows,
} from "./pairing-library.js";

const known = new Set(ingredientProfiles.map((item) => item.id));
export const starterIds = (starter) => starter.ingredients.map(([id]) => id);

export function evaluateFormula(ids, { amounts = {} } = {}) {
  const issues = [];
  if (ids.length > 7)
    issues.push({
      id: "capacity",
      kind: "capacity",
      label: "Your rainbow has room for 7",
      members: [],
      sourceIds: [],
      message:
        "Remove an ingredient before adding another. A shorter rainbow is welcome too.",
    });
  if (new Set(ids).size !== ids.length)
    issues.push({
      id: "duplicate",
      kind: "invalid",
      label: "Repeated ingredient",
      members: [],
      sourceIds: [],
      message: "Each ingredient can appear only once.",
    });
  if (ids.some((id) => !known.has(id)))
    issues.push({
      id: "unknown",
      kind: "invalid",
      label: "Unrecognised ingredient",
      members: [],
      sourceIds: [],
      message: "This ingredient needs a library review before it can be used.",
    });
  const set = new Set(ids);
  for (const rule of [...restrictedIngredients, ...pairRules]) {
    if (!rule.members.every((id) => set.has(id))) continue;
    if (rule.threshold) {
      const dose = amounts[rule.threshold.ingredient];
      const isFinal =
        dose?.status === "final" &&
        dose.unit === rule.threshold.unit &&
        Number.isFinite(dose.value) &&
        dose.value >= 0;
      if (isFinal && dose.value < rule.threshold.value) continue;
      issues.push({
        ...rule,
        doseStatus: isFinal ? "threshold-met" : "unknown",
        message: isFinal ? rule.confirmedMessage : rule.message,
      });
    } else issues.push(rule);
  }
  return {
    ok: issues.length === 0,
    issues,
    status: issues.length ? "needs-attention" : "no-listed-conflict",
    releaseStatus: "not-cleared",
  };
}

export function additionDecision(ids, id, options) {
  if (ids.includes(id)) return { ok: true, issues: [], action: "remove" };
  return { ...evaluateFormula([...ids, id], options), action: "add" };
}

export function alternativesFor(ids, attemptedId, options) {
  if (ids.length >= 7) return [];
  const attemptRules = additionDecision(ids, attemptedId, options).issues;
  const candidates = [
    ...new Set(attemptRules.flatMap((r) => r.alternatives || [])),
  ];
  return candidates
    .filter(
      (id) =>
        id !== attemptedId &&
        !ids.includes(id) &&
        additionDecision(ids, id, options).ok,
    )
    .slice(0, 3);
}

// Revalidate the whole next formula, including replacement templates and hydrated drafts.
export function validateStarter(id, options) {
  const starter = starterRainbows.find((item) => item.id === id);
  return starter
    ? evaluateFormula(starterIds(starter), options)
    : { ok: false, issues: [{ id: "unknown-starter" }] };
}
