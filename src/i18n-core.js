import chinese from "./i18n-translations.js";

export const languageStorageKey = "vita-tape.language.v1";
export const normalizeText = (text) => String(text).replace(/\s+/g, " ").trim();
const entries = new Map(
  Object.entries(chinese).map(([key, value]) => [normalizeText(key), value]),
);
const escapePattern = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const patterns = [...entries]
  .filter(([source]) => /\{\w+\}/.test(source))
  .map(([source, translated]) => {
    const keys = [];
    let position = 0;
    let regex = "^";
    for (const match of source.matchAll(/\{(\w+)\}/g)) {
      regex += escapePattern(source.slice(position, match.index)) + "(.+?)";
      keys.push(match[1]);
      position = match.index + match[0].length;
    }
    regex += escapePattern(source.slice(position)) + "$";
    return {
      regex: new RegExp(regex),
      keys,
      translated,
      specificity: source.replace(/\{\w+\}/g, "").length,
    };
  })
  .sort((a, b) => b.specificity - a.specificity);
const interpolate = (text, values) =>
  text.replace(/\{(\w+)\}/g, (token, key) =>
    values[key] == null ? token : String(values[key]),
  );

export function translateText(text, language = "en", values = {}) {
  if (text == null) return "";
  if (typeof text !== "string") return text;
  if (language !== "zh") return interpolate(text, values);
  const source = normalizeText(text);
  const exact = entries.get(source);
  if (exact !== undefined) return interpolate(exact, values);
  for (const pattern of patterns) {
    const match = source.match(pattern.regex);
    if (!match) continue;
    const captured = Object.fromEntries(
      pattern.keys.map((key, index) => [
        key,
        entries.get(normalizeText(match[index + 1])) ?? match[index + 1],
      ]),
    );
    return interpolate(pattern.translated, { ...captured, ...values });
  }
  return interpolate(text, values);
}

export function hasTranslation(text) {
  const source = normalizeText(text);
  return (
    entries.has(source) ||
    patterns.some((pattern) => pattern.regex.test(source))
  );
}

export function readLanguage(storage) {
  try {
    return storage?.getItem(languageStorageKey) === "zh" ? "zh" : "en";
  } catch {
    return "en";
  }
}
