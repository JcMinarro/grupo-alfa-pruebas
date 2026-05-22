// @ts-nocheck
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const resolveFromRoot = (...segments: string[]) =>
  path.resolve(process.cwd(), ...segments);

const readFile = (...segments: string[]) =>
  fs.readFileSync(resolveFromRoot(...segments), "utf-8");

describe("Club Alfa presence across the site", () => {
  it("adds a dedicated /club page wired into the shared layout", () => {
    const clubPagePath = resolveFromRoot("src", "pages", "club.astro");
    expect(fs.existsSync(clubPagePath)).toBe(true);

    const clubPageSource = readFile("src", "pages", "club.astro");
    expect(clubPageSource).toContain("<BaseLayout");
    expect(clubPageSource).toContain('activeNav="club"');
    expect(clubPageSource).toContain("backgroundVideo={heros.club}");
    expect(clubPageSource).toContain('href="/sign-up"');
  });

  it("adds Club to the shared header navigation", () => {
    const headerSource = readFile("src", "components", "Header.astro");
    const uiSource = readFile("src", "i18n", "ui.ts");

    expect(headerSource).toContain('{ id: "club", href: "/club", label: t("nav.club") }');
    expect(headerSource).toContain('{ id: "inicio", href: "/", label: t("nav.inicio") }');
    expect(headerSource).toContain('{ id: "proyectos", href: "/proyectos", label: t("nav.proyectos") }');
    expect(headerSource).toContain('{ id: "promotores", href: "/promotores", label: t("nav.promotores") }');
    expect(headerSource).toContain('{ id: "inversores", href: "/inversores", label: t("nav.inversores") }');
    expect(headerSource).toContain('{ id: "hunters", href: "/alfa-hunters", label: t("nav.hunters") }');
    expect(headerSource).toContain('{ id: "contacto", href: "/contacto", label: t("nav.contacto") }');
    expect(uiSource).toContain("'nav.club': 'CLUB'");
  });

  it("promotes Club Alfa from the homepage", () => {
    const indexSource = readFile("src", "pages", "index.astro");

    expect(indexSource).toContain('href="/club"');
    expect(indexSource).toContain('t("home.club.cta")');
  });

  it("includes the exclusive advantages block in Club benefits", () => {
    const clubPageSource = readFile("src", "pages", "club.astro");
    const uiSource = readFile("src", "i18n", "ui.ts");

    expect(clubPageSource).toContain('t("club.benefits.exclusive.title")');
    expect(clubPageSource).toContain('t("club.benefits.investments.title")');
    expect(clubPageSource).toContain('t("club.benefits.bank.title")');
    expect(uiSource).toContain("'club.benefits.exclusive.title': 'VENTAJAS EXCLUSIVAS'");
    expect(uiSource).toContain("'club.benefits.investments.title': 'INVERSIONES INTERNAS'");
    expect(uiSource).toContain("'club.benefits.bank.title': 'APOYO EN BANCA'");
    expect(uiSource).toContain('reducción de costes de intermediación');
  });

  it("shows approved annual pricing and a membership signup CTA on the Club page", () => {
    const clubPageSource = readFile("src", "pages", "club.astro");
    const uiSource = readFile("src", "i18n", "ui.ts");

    expect(clubPageSource).toContain('t("club.price.title")');
    expect(clubPageSource).toContain('t("club.cta.button")');
    expect(clubPageSource).toContain('href="/sign-up"');
    expect(clubPageSource).not.toContain('href="/contacto"');
    expect(uiSource).toContain("'club.price.title': '99€/Año'");
    expect(uiSource).toContain("'club.price.title': '99€/Year'");
  });

  it("uses the light component theme for Club page cards", () => {
    const themeSource = readFile("src", "styles", "theme.css");

    expect(themeSource).toContain(".club-page");
  });
});
