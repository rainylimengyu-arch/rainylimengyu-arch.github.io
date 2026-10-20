#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const githubPagesRoutes = [
  "about-us",
  "build-your-tape",
  "our-science",
  "reviews",
  "ingredient-library",
  "find-out-what-you-need",
];

// GitHub Pages serves directory indexes rather than applying the Sites worker's
// SPA rewrite. Keep an identical app shell at each supported route so direct
// visits, reloads and shared questionnaire/builder links work without a server.
export async function prepareGithubPages(clientDir) {
  const index = await readFile(resolve(clientDir, "index.html"));
  for (const route of githubPagesRoutes) {
    const routeDir = resolve(clientDir, route);
    await mkdir(routeDir, { recursive: true });
    await writeFile(resolve(routeDir, "index.html"), index);
  }
  await writeFile(resolve(clientDir, "404.html"), index);
  await writeFile(resolve(clientDir, ".nojekyll"), "");
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const clientDir = resolve(import.meta.dirname, "../dist/client");
  await prepareGithubPages(clientDir);
  console.log(
    `Prepared GitHub Pages: ${githubPagesRoutes.length} route indexes, 404.html and .nojekyll.`,
  );
}
