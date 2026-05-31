// @ts-nocheck
import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const resolveFromRoot = (...segments: string[]) =>
  path.resolve(process.cwd(), ...segments);

const readFile = (...segments: string[]) =>
  fs.readFileSync(resolveFromRoot(...segments), "utf-8");

describe("Member benefits catalog", () => {
  it("defines the twelve Club Alfa services in a shared catalog", () => {
    const dataPath = resolveFromRoot("src", "data", "member-benefits.ts");

    expect(fs.existsSync(dataPath)).toBe(true);

    const source = readFile("src", "data", "member-benefits.ts");

    expect(source).toContain("export const memberBenefits");
    expect(source).toContain("export type MemberBenefit");

    [
      "personal-shopper-inmobiliario",
      "subastos",
      "espacio-diseno",
      "broker-hipotecario",
      "broker-bitcoin",
      "broker-asesor-financiero",
      "superseguros-alfa",
      "alfa-24k",
      "flip-art",
      "lujo-rent",
      "factura-movil-fibra-energia",
      "alarmas",
    ].forEach((slug) => {
      expect(source).toContain(`slug: "${slug}"`);
    });

    expect(source).toContain("https://subastos.grupoalfa.net/");
    expect(source).toContain("https://www.brokeralfa.com/contacto");
    expect(source).toContain("https://bitcoinbridgeacademy.com/seminario/");
    expect(source).not.toContain("pendiente");
    expect(source).not.toContain("próximamente");
  });

  it("renders the private benefits page as a navigable grid", () => {
    const source = readFile("src", "pages", "members", "benefits.astro");

    expect(source).toContain("requireActiveMembership");
    expect(source).toContain("ventajasClub");
    expect(source).toContain("/members/benefits/${benefit.slug}");
    expect(source).toContain("Ventajas exclusivas");
    expect(source).toContain("Todo el ecosistema Club Alfa en un solo lugar");
    expect(source).not.toContain("Futuros recursos premium");
  });

  it("adds a private dynamic detail page for each benefit", () => {
    const detailPath = resolveFromRoot(
      "src",
      "pages",
      "members",
      "benefits",
      "[slug].astro",
    );

    expect(fs.existsSync(detailPath)).toBe(true);

    const source = readFile("src", "pages", "members", "benefits", "[slug].astro");

    expect(source).toContain("requireActiveMembership");
    expect(source).toContain("Astro.params.slug");
    expect(source).toContain("ventajasClub.find");
    expect(source).toContain("Qué incluye");
    expect(source).toContain("Para quién es");
    expect(source).toContain("Cómo activarlo");
    expect(source).toContain('href="/members/benefits"');
    expect(source).toContain('activePath="/members/benefits"');
  });
});
