import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";
const root = resolve(import.meta.dirname, "..");
const library = JSON.parse(
  await readFile(resolve(root, "src/nutrient-library.json"), "utf8"),
);
const source = JSON.parse(
  await readFile(
    resolve(root, "resources/nutrients/source-snapshot.json"),
    "utf8",
  ),
);
assert.equal(library.items.length, 39);
assert.equal(
  new Set(library.items.map((n) => n.id)).size,
  39,
  "Ingredient IDs must be unique.",
);
assert.equal(library.selectionLimit, 7);
assert.equal(
  library.items.filter((n) => n.amount.status === "reference").length,
  35,
);
assert.equal(
  library.items.filter((n) => n.amount.status === "pending").length,
  4,
);
for (const n of library.items) {
  assert.match(n.id, /^[a-z0-9-]+$/);
  assert(
    !/melatonin|褪黑素/i.test(`${n.id} ${n.name} ${n.nameZh}`),
    "Excluded ingredient must not be selectable.",
  );
  assert(n.summary && n.description && n.category && n.nameZh);
  const profile = n.profile;
  assert(profile?.overview && profile.form && profile.source, `Incomplete nutrition card identity: ${n.id}`);
  assert(Array.isArray(profile.benefits) && profile.benefits.length > 0, `Missing ingredient functions: ${n.id}`);
  assert(profile.evidence && profile.considerations, `Missing evidence context: ${n.id}`);
  assert.equal(profile.supplierStatus, "unconfirmed", `Do not imply a confirmed supplier for ${n.id}`);
  assert.match(profile.reviewedAt, /^\d{4}-\d{2}-\d{2}$/);
  assert(profile.sources.length > 0, `Missing nutrition card references: ${n.id}`);
  for (const source of profile.sources) {
    assert(source.label && source.type);
    assert.equal(new URL(source.url).protocol, "https:");
  }
  assert.match(n.stripe, /^#[0-9a-f]{6}$/i);
  assert.equal(
    n.amount.vitaTapeAmount,
    null,
    "Reference amount must never silently become a VITA TAPE dose.",
  );
  await access(
    resolve(
      root,
      "public",
      n.artwork.replace(/^-?\//, "").replace("-art.png", "-art.webp"),
    ),
  );
  await access(
    resolve(root, "public/assets/03_VECTORS/icons", `${n.icon}.svg`),
  );
  if (n.amount.status === "reference") {
    const original = source.items.find((s) => s.name === n.reference.name);
    assert(original, `Missing source evidence for ${n.id}`);
    assert.equal(
      n.amount.raw,
      original.amount.split(" • ")[0],
      `Unit or amount drift for ${n.id}`,
    );
    assert.equal(n.reference.url, library.referenceUrl);
  } else {
    assert.equal(n.amount.raw, null);
    assert.equal(n.reference.url, null);
  }
}
assert.equal(
  library.items.find((n) => n.id === "hydrocurc").amount.raw,
  "95mg | 1mg",
);
assert.equal(
  library.items.find((n) => n.id === "probiotics").amount.raw,
  "200M CFU",
);
assert.equal(
  library.items.find((n) => n.id === "vitamin-d3").amount.raw,
  "2000IU",
);
await access(
  resolve(root, "public/assets/tape-realistic/material-preview.webp"),
);
console.log(
  "Nutrient library passed: 39 complete nutrition cards, 35 source quantities, 4 explicit pending values, all artwork/icons present, no excluded ingredient.",
);
