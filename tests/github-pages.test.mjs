import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
  githubPagesRoutes,
  prepareGithubPages,
} from "../scripts/prepare-github-pages.mjs";

test("GitHub Pages serves all six routes with the unchanged built app shell", async () => {
  const clientDir = await mkdtemp(join(tmpdir(), "vita-pages-"));
  try {
    const shell = '<!doctype html><html><head><link href="/assets/app.css" rel="stylesheet"></head><body><div id="root"></div><script src="/assets/app.js" type="module"></script></body></html>';
    await writeFile(join(clientDir, "index.html"), shell);
    await mkdir(join(clientDir, "assets"));
    await writeFile(join(clientDir, "assets/app.js"), "/* existing bundle */");

    await prepareGithubPages(clientDir);
    await prepareGithubPages(clientDir);

    assert.deepEqual(githubPagesRoutes, [
      "about-us",
      "build-your-tape",
      "our-science",
      "reviews",
      "ingredient-library",
      "find-out-what-you-need",
    ]);
    for (const route of githubPagesRoutes) {
      assert.equal(await readFile(join(clientDir, route, "index.html"), "utf8"), shell);
    }
    assert.equal(await readFile(join(clientDir, "404.html"), "utf8"), shell);
    assert.equal(await readFile(join(clientDir, "index.html"), "utf8"), shell);
    assert.equal(await readFile(join(clientDir, ".nojekyll"), "utf8"), "");
    assert.equal(await readFile(join(clientDir, "assets/app.js"), "utf8"), "/* existing bundle */");
  } finally {
    await rm(clientDir, { recursive: true, force: true });
  }
});

test("GitHub Pages preparation fails before writing if the Vite index is missing", async () => {
  const clientDir = await mkdtemp(join(tmpdir(), "vita-pages-missing-"));
  try {
    await assert.rejects(prepareGithubPages(clientDir), { code: "ENOENT" });
    assert.deepEqual(await readdir(clientDir), []);
  } finally {
    await rm(clientDir, { recursive: true, force: true });
  }
});
