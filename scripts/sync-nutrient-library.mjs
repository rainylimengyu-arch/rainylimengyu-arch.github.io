import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
const root = resolve(import.meta.dirname, "..");
const library = JSON.parse(
  await readFile(resolve(root, "src/nutrient-library.json"), "utf8"),
);
const csvCell = (v) => '"' + String(v ?? "").replaceAll('"', '""') + '"';
const columns = [
  "id",
  "name",
  "name_zh",
  "category",
  "summary",
  "description",
  "reference_amount",
  "reference_nrv",
  "amount_status",
  "vita_tape_amount",
  "artwork",
  "icon",
  "source_url",
  "ingredient_form",
  "ingredient_source",
  "ingredient_functions",
  "evidence_notes",
  "ingredient_considerations",
  "profile_source_urls",
  "profile_reviewed_at",
];
const rows = library.items.map((n) => [
  n.id,
  n.name,
  n.nameZh,
  n.category,
  n.summary,
  n.description,
  n.amount.raw,
  n.amount.sourceNrv,
  n.amount.status,
  n.amount.vitaTapeAmount,
  n.artwork,
  n.icon,
  n.reference.url,
  n.profile.form,
  n.profile.source,
  n.profile.benefits.join(" | "),
  n.profile.evidence,
  n.profile.considerations,
  n.profile.sources.map((source) => source.url).join(" | "),
  n.profile.reviewedAt,
]);
const csv =
  "\ufeff" +
  [columns, ...rows].map((r) => r.map(csvCell).join(",")).join("\r\n") +
  "\r\n";
for (const dir of ["resources/nutrients", "public/resources/nutrients"]) {
  await mkdir(resolve(root, dir), { recursive: true });
  await writeFile(
    resolve(root, dir, "catalog.json"),
    JSON.stringify(library, null, 2) + "\n",
  );
  await writeFile(resolve(root, dir, "catalog.csv"), csv);
}
console.log(
  `Synchronized ${library.items.length} nutrient records and CSV exports.`,
);
