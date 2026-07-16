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

  it("includes the current client-approved member advantage copy", () => {
    const source = readFile("src", "data", "member-benefits.ts");

    expect(source).toContain("15% de descuento y acceso preferente a pujas en grupo");
    expect(source).toContain("Spazio Alfa");
    expect(source).toContain("hasta un 33% si contratas a nuestro equipo de expertos reformistas");
    expect(source).toContain("15% de descuento en nuestro servicio de bróker hipotecario");
    expect(source).toContain("15% de descuento en nuestro servicio y formaciones");
    expect(source).toContain("Hasta un 30% de descuento en nuestros seguros");
    expect(source).toContain("50% descuento en grabar texto en lingotes");
    expect(source).toContain("hasta un 33% si se contrata a nuestro equipo de interiorismo");
    expect(source).toContain("Inversión de 3000€ a 12000€ en la vivienda sin coste alguno para el propietario");
    expect(source).toContain("Revisión anual a inicio de cada año de sus facturas en energia, fibra y móvil");
    expect(source).toContain("Descuento del 15% en la contratación de tu sistema de alarma");
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
