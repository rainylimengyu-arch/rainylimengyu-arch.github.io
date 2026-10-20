import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  hasTranslation,
  languageStorageKey,
  normalizeText,
  readLanguage,
  translateText,
} from "../src/i18n-core.js";
import {
  pairRules,
  restrictedIngredients,
  starterRainbows,
} from "../src/pairing-library.js";
import { evaluateFormula } from "../src/pairing-engine.js";

const loadJson = (path) =>
  JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
const science = loadJson("../src/science-content.json");
const library = loadJson("../src/nutrient-library.json");

function scienceEntries() {
  return [
    ["science.disclaimer", science.disclaimer],
    ...science.sections.flatMap((section) => [
      [`science.${section.id}.title`, section.title],
      ...(section.subtitle
        ? [[`science.${section.id}.subtitle`, section.subtitle]]
        : []),
      ...section.blocks.flatMap((block, index) =>
        block.type === "list"
          ? block.items.map((text, item) => [
              `science.${section.id}.blocks[${index}].items[${item}]`,
              text,
            ])
          : [[`science.${section.id}.blocks[${index}].text`, block.text]],
      ),
    ]),
  ];
}

function nutrientEntries() {
  // Bibliographic source titles, brand marks and measurement units retain their
  // official spellings intentionally. The displayed explanatory copy must translate.
  return [
    ["library.quantityNotice", library.quantityNotice],
    ...library.items.flatMap((nutrient) => [
      ...["summary", "description", "detail", "artworkAlt", "artworkNote"].map(
        (field) => [`nutrient.${nutrient.id}.${field}`, nutrient[field]],
      ),
      ...["overview", "form", "source", "evidence", "considerations"].map(
        (field) => [
          `nutrient.${nutrient.id}.profile.${field}`,
          nutrient.profile[field],
        ],
      ),
      ...nutrient.profile.benefits.map((text, index) => [
        `nutrient.${nutrient.id}.profile.benefits[${index}]`,
        text,
      ]),
      ...(nutrient.profile.quantityNote
        ? [
            [
              `nutrient.${nutrient.id}.profile.quantityNote`,
              nutrient.profile.quantityNote,
            ],
          ]
        : []),
    ]),
  ];
}

function ruleEntries() {
  return [...pairRules, ...restrictedIngredients].flatMap((rule) =>
    ["label", "message", "evidence", "confirmedMessage"]
      .filter((field) => rule[field])
      .map((field) => [`rule.${rule.id}.${field}`, rule[field]]),
  );
}

function starterEntries() {
  return starterRainbows.flatMap((starter) => [
    ...[
      "title",
      "time",
      "kicker",
      "description",
      "rationale",
      "food",
      "caveat",
    ].map((field) => [`starter.${starter.id}.${field}`, starter[field]]),
    ...starter.ingredients.map(([, role], index) => [
      `starter.${starter.id}.ingredients[${index}].role`,
      role,
    ]),
  ]);
}

function assertChineseCoverage(entries, { unchanged = new Set() } = {}) {
  const gaps = [];
  for (const [path, source] of entries) {
    if (typeof source !== "string" || !source.trim()) {
      gaps.push(`${path}: source text is missing`);
      continue;
    }
    const translated = translateText(source, "zh");
    if (!hasTranslation(source))
      gaps.push(`${path}: no translation for ${source}`);
    else if (
      !unchanged.has(source) &&
      (normalizeText(translated) === normalizeText(source) ||
        !/\p{Script=Han}/u.test(translated))
    ) {
      gaps.push(`${path}: Chinese output still falls back to ${source}`);
    }
  }
  assert.deepEqual(gaps, [], `Translation coverage gaps:\n${gaps.join("\n")}`);
}

test("English remains the original source across science, nutrients, rules and starters", () => {
  const entries = [
    ...scienceEntries(),
    ...nutrientEntries(),
    ...ruleEntries(),
    ...starterEntries(),
    ...library.items.map((nutrient) => [nutrient.id, nutrient.name]),
  ];
  assert.ok(entries.length > 600, "verify the complete live source corpus");
  for (const [path, source] of entries) {
    assert.equal(translateText(source), source, path);
    assert.equal(translateText(source, "en"), source, path);
  }
});

test("Chinese navigation, language control and shared actions have translated labels", () => {
  assertChineseCoverage(
    [
      "Home",
      "Build Your Tape",
      "Our Science",
      "Reviews",
      "Why VITA TAPE",
      "Find Out What You Need",
      "Website language",
      "Main navigation",
      "Open navigation",
      "Close navigation",
      "Close dialog",
      "Search ingredients",
      "View saved formula",
      "Choose your flavor",
      "Learn more",
    ].map((source) => [source, source]),
  );
});

test("interpolation supports values, zero counts, translated names and rendered source strings", () => {
  assert.equal(
    translateText("Add {name}", "en", { name: "Vitamin C" }),
    "Add Vitamin C",
  );
  assert.equal(
    translateText("{count} of 7 nutrients selected", "en", { count: 0 }),
    "0 of 7 nutrients selected",
  );
  assert.match(
    translateText("{count} of 7 nutrients selected", "zh", { count: 0 }),
    /0.*7/,
  );
  const name = translateText("Vitamin C", "zh");
  assert.match(name, /维生素/);
  const withValues = translateText("Add {name}", "zh", { name });
  assert.ok(withValues.includes(name));
  assert.ok(hasTranslation("Add Vitamin C"));
  assert.equal(translateText("Add Vitamin C", "zh"), withValues);
  assert.ok(hasTranslation("Nutrition card for Vitamin C"));
  assert.ok(translateText("Nutrition card for Vitamin C", "zh").includes(name));
  assert.equal(
    translateText("Unknown template: {count}", "en", { count: 0 }),
    "Unknown template: 0",
  );
  assert.equal(translateText("Unknown {value}", "zh"), "Unknown {value}");
});

test("unknown user notes, formula names and filenames retain their original text", () => {
  const values = [
    "My personal note: Vitamin C after breakfast. 私人备注。",
    "Private health report 2026-10.pdf",
    "Good sleep notes — final.png",
    "My family formula 你好 123",
    "  Preserve these user spaces  ",
  ];
  for (const value of values) {
    assert.equal(hasTranslation(value), false, value);
    assert.equal(translateText(value, "zh"), value, value);
    assert.equal(translateText(value, "en"), value, value);
  }
  assert.equal(translateText(null, "zh"), "");
  assert.equal(translateText(undefined), "");
  assert.equal(translateText(0, "zh"), 0);
});

test("language preferences tolerate missing, blocked and corrupt storage", () => {
  const queried = [];
  assert.equal(
    readLanguage({
      getItem: (key) => {
        queried.push(key);
        return "zh";
      },
    }),
    "zh",
  );
  assert.deepEqual(queried, [languageStorageKey]);
  for (const value of [
    null,
    undefined,
    "",
    "en",
    "ZH",
    "zh-CN",
    '"zh"',
    "garbage",
    "{broken",
  ]) {
    assert.equal(readLanguage({ getItem: () => value }), "en", String(value));
  }
  assert.equal(readLanguage(undefined), "en");
  assert.equal(readLanguage(null), "en");
  assert.equal(readLanguage({}), "en");
  assert.equal(
    readLanguage({
      getItem: () => {
        throw new Error("Storage blocked");
      },
    }),
    "en",
  );
});

test("every science section, subtitle, list item and academic disclaimer has Chinese copy", () => {
  assert.equal(science.sections.length, 10);
  assertChineseCoverage(scienceEntries());
  const multiline = science.sections
    .flatMap((section) => section.blocks)
    .find((block) => block.text?.includes("\n")).text;
  assert.equal(
    translateText(multiline, "zh"),
    translateText(multiline.replace(/\s+/g, " "), "zh"),
  );
  assert.match(translateText(science.disclaimer, "zh"), /学术创业模拟/);
});

test("all 39 canonical nutrient names use their existing Chinese names", () => {
  assert.equal(library.items.length, 39);
  for (const nutrient of library.items) {
    assert.equal(hasTranslation(nutrient.name), true, nutrient.id);
    assert.equal(
      translateText(nutrient.name, "zh"),
      nutrient.nameZh,
      nutrient.id,
    );
    assert.equal(
      translateText(nutrient.name, "en"),
      nutrient.name,
      nutrient.id,
    );
  }
});

test("all 39 nutrient summaries, technical profiles, safety notes and artwork descriptions translate", () => {
  assertChineseCoverage(nutrientEntries());
});

test("all active pairing rules translate reasons, evidence and final-dose variants", () => {
  assertChineseCoverage(ruleEntries());
  const invalidFormulas = [
    [...library.items.slice(0, 8).map((nutrient) => nutrient.id)],
    ["vitamin-c", "vitamin-c"],
    ["ingredient-not-in-library"],
  ];
  const entries = invalidFormulas.flatMap((ids) =>
    evaluateFormula(ids).issues.flatMap((issue) => [
      [`engine.${issue.id}.label`, issue.label],
      [`engine.${issue.id}.message`, issue.message],
    ]),
  );
  assertChineseCoverage(entries);
});

test("every starter theme, narrative, ingredient role and precaution has Chinese copy", () => {
  assert.equal(starterRainbows.length, 7);
  // The literal age-group name is deliberately identical in both languages.
  assertChineseCoverage(starterEntries(), { unchanged: new Set(["60+"]) });
});
