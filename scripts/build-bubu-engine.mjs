import { build } from 'esbuild';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
await build({
  stdin: { contents: `
    import flow from './resources/bubu-source/engine/flow-v6.js';
    import recommendations from './resources/bubu-source/engine/recommendations-v6.js';
    import base from './resources/bubu-source/engine/recommendations-v5.js';
    import data from './resources/bubu-source/data/questions-v6.js';
    import intake from './resources/bubu-source/engine/intake-screening.js';
    export const { buildQuestionPlan, validateStep, getSafetyDisposition, normalizeMultiAnswer } = flow;
    export const { buildRecommendationReport, getReportSource } = recommendations;
    export const { buildPlanReport } = base;
    export const { QUESTIONS } = data;
    export const { NUTRIENTS } = intake;
  `, resolveDir: root, sourcefile: 'bubu-entry.js' },
  outfile: `${root}src/bubu/engine.js`, bundle: true, format: 'esm', platform: 'browser',
  banner: { js: '// Generated from the user-authorized BUBU snapshot. Rebuild: node scripts/build-bubu-engine.mjs' },
});
