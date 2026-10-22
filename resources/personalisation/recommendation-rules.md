# Comprehensive BUBU questionnaire and report

Updated: 2026-10-20. This replaces the former three-nutrient shortlist. User requested the BUBU mini-program questionnaire/report, comprehensive nutrient coverage and a review of competing quiz formats.

## Actual source reuse

The user-authorized snapshot is `resources/bubu-source/` with SHA-256 provenance. It contains the BUBU v6 question plan, validations, v5 source-coverage assessment and v6 goal-based recommendations, not a re-creation from screenshots. `node scripts/build-bubu-engine.mjs` bundles that snapshot into `src/bubu/engine.js`. Tests compare the generated engine against the snapshot.

The website adapter preserves canonical answer IDs and adds the energy/protein/water/salt baseline, adult-only eligibility, stricter review of contradictory vegan records, fluid restrictions, the existing VITA TAPE exclusion of melatonin, and 39 live-catalog decisions. Height and weight are not collected. Report input is deep-copied; stale answers to hidden follow-up questions are pruned.

## Coverage and actual recommendations

- 13 vitamin rows: A, C, D, E, K and B1/B2/B3/B5/B6/B7/B9/B12.
- 14 mineral assessment rows: calcium, magnesium, potassium, iron, zinc, iodine, selenium, copper, manganese, phosphorus, sodium/chloride together, molybdenum, chromium and fluoride. Chromium and fluoride do not trigger routine supplementation; the limits of questionnaire assessment are explicit.
- 10 other nutrition/food rows: choline, EPA/DHA, fibre, protein, carbohydrate, total fat, omega-6, ALA, water and food energy.
- These total 37 review directions. Source presence is not proof of adequate intake or absorption. No food-frequency answer is converted into a precise nutrient deficit. The optional calcium-label calculation concerns only the labelled drink, never total dietary adequacy.
- The BUBU candidate families include B12, D, calcium, magnesium, EPA/DHA, C, basic iron-free multi, creatine, protein, hydration/electrolytes, magnesium bisglycinate, L-theanine, ginseng, turmeric/curcumin, psyllium and optional collagen discussion. Conditions, preferences, existing products and evidence determine which appear. They are not all recommended to every person.
- Goals alone do not diagnose deficiencies. Sleep, persistent symptoms, botanical consent, training stability, swallowing/obstruction context, food practicality and existing ingredient records affect matching. The full source table remains available even when automatic supplementation is paused or no candidates match.
- All 39 current Tape catalog ingredients receive a decision with a reason and source. A related nutrient/form match is not proof that a final branded Tape preparation, amount, carrier or combination is appropriate. Off-catalog supplement types are identified explicitly. AREDS2 is not inferred from screen time; probiotic strains are not inferred from a general gut goal; 5-HTP remains held for review.

## Safety and interaction boundaries

Urgent symptom answers stop the supplement report; under-18s do not receive the adult plan. Medicines, relevant health/life-stage context, abnormal tests, uncertain product/allergy information, fluid restrictions and contradictory diet records pause personal candidate selection for professional review. Actual dietary restrictions are retained. Existing known ingredients are not suggested again.

Within the discussion shortlist, sleep alternatives and a basic multi versus overlapping singles require an explicit choice. A conflicting click leaves the prior selection unchanged and displays the reason at the clicked card; nothing is silently replaced. This is not a dose-complete combined Tape formula or a clinical interaction clearance. No ingredients are automatically added to the builder and no order is created.

Standard completes independently without an email or upload. Plus files are optional, kept only in page memory and excluded from Standard reports. File names and user notes are preserved, not translated or interpreted. No file OCR, lab interpretation, reviewer identity, professional approval or actual review submission is fabricated. Plus sign-off remains pending.

## Research used

Full comparison and direct links are in `questionnaire-research-2026-10-20.md`. Nutrient links come from NIH ODS; functional claims are bounded by the referenced primary studies / official evidence pages. The rules, screening portions and product forms have not been independently clinically validated. No personal supplement amount or treatment duration is generated.
