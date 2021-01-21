/* eslint-env mocha */
const path = require("path");
const fs = require("fs/promises");
const assert = require("assert");
const pathologist = require("..");

describe("pathologist", async () => {
  const SAMPLES = path.join(__dirname, "samples");
  const dirs = await fs.readdir(SAMPLES);
  dirs.forEach((dir) => {
    (/-SOLO$/.test(dir) ? it.only : it)(dir, async () => {
      const filenames = ["input.svg", "output.svg", "paths.json"];
      const [input, output, paths] = (
        await Promise.all(
          filenames.map((name) =>
            fs.readFile(path.join(SAMPLES, dir, name), "utf-8")
          )
        )
      ).map((v) => v.trim());

      assert.strictEqual(pathologist.transform(input), output);
      assert.deepStrictEqual(pathologist.parse(input).paths, JSON.parse(paths));
    });
  });
});
