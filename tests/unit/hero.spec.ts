// @ts-nocheck
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const resolveFromRoot = (...segments: string[]) =>
  path.resolve(process.cwd(), ...segments);

const readFile = (...segments: string[]) =>
  fs.readFileSync(resolveFromRoot(...segments), "utf-8");

describe("Hero overlay defaults and label removal", () => {
  it("defaults overlayOpacity to 0.3 in Hero component", () => {
    const heroSource = readFile("src", "components", "Hero.astro");
    expect(heroSource).toContain("overlayOpacity = 0.3");
  });

  it("sets overlayOpacity={0} on /index hero", () => {
    const indexSource = readFile("src", "pages", "index.astro");
    expect(indexSource).toContain("overlayOpacity={0}");
  });

  it("does not render the lower-left hero label", () => {
    const heroSource = readFile("src", "components", "Hero.astro");
    const heroVideoSource = readFile("src", "components", "HeroVideo.astro");
    const labelPattern = "absolute left-4 bottom-4";
    expect(heroSource).not.toContain(labelPattern);
    expect(heroVideoSource).not.toContain(labelPattern);
  });
});
