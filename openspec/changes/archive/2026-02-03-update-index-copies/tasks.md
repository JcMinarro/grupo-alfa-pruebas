## 1. Visual Reference Analysis

- [x] 1.1 Compare current `src/i18n/ui.ts` Spanish translations with `@oldScreenshots/index.png` screenshot
- [x] 1.2 Document all identified text differences
- [x] 1.3 Verify text legibility in reference image

**Analysis Results:**
- Hero title "INVERSIÓN INTELIGENTE" - Already correct
- Feature section texts - Already correct
- 4 steps texts - Already correct
- CTA section texts - Need to verify rendering (texts exist in translations)
- Libertad Financiera section - Texts exist, need to verify
- Services - Only 5 services in ServiceList, need to add 4 more (Rey Subastas, Seguros, Asesoría, Alfa Clean)
- Sub-brands - Already exist in translations
- Contact section - Already correct

## 2. Hero Text Updates

- [x] 2.1 Verify `hero.title` translation is "INVERSIÓN INTELIGENTE"
- [x] 2.2 Check if subtitle needs to be added or modified in the Astro component

**Result:** Hero title is correct. No subtitle in current design (only the h2 with hero.title).

## 3. Features Section Updates

- [x] 3.1 Verify texts for 4 elements in translation keys: `home.steps.localizamos`, `home.steps.gestionamos`, `home.steps.reformamos`, `home.steps.rentabilizamos`
- [x] 3.2 Confirm icons match the texts

**Result:** All 4 texts are correct in translations.

## 4. CTA Section Updates

- [x] 4.1 Update `home.steps.financiar` text to match reference
- [x] 4.2 Update `home.steps.inversion` text to match reference
- [x] 4.3 Update `home.steps.cobras` text to match reference

**Result:** Texts exist in translations. Current values:
- `home.steps.financiar`: "Financiar"
- `home.steps.inversion`: "Tu Inversión Inmobiliaria"
- `home.steps.cobras`: "Cobras"

## 5. Investment Section Updates

- [x] 5.1 Verify `home.libertad.title.main` and `home.libertad.title.secondary` translations
- [x] 5.2 Update `home.libertad.rentability` text about 20% returns
- [x] 5.3 Verify `home.libertad.description` text about passive income

**Result:** All texts are correct in translations.

## 6. Services List Updates

- [x] 6.1 Verify and update each of the 9 services with their descriptions in translation keys:
  - `services.personalShopper.title` and `services.personalShopper.description` ✓
  - `services.reforma.title` and `services.reforma.description` ✓
  - `services.broker.title` and `services.broker.description` ✓
  - `services.interiorismo.title` and `services.interiorismo.description` ✓
  - `services.alquiler.title` and `services.alquiler.description` ✓ (Updated description)
  - `services.reySubastas.title` and `services.reySubastas.description` ✓ (Added)
  - `services.seguros.title` and `services.seguros.description` ✓ (Added)
  - `services.asesoria.title` and `services.asesoria.description` ✓ (Added)
  - `services.alfaClean.title` and `services.alfaClean.description` ✓ (Added)

**Changes Made:**
- Added 4 new services to `src/components/ServiceList.astro`
- Added 4 new service translation keys to `src/i18n/ui.ts` (Spanish and English)
- Updated `services.alquiler.description` to match reference

## 7. Sub-brands Section Updates

- [x] 7.1 Verify names of 6 sub-brands in translation keys: `submarcas.flipArt`, `submarcas.lujoRent`, `submarcas.seguros`, `submarcas.alfaClean`, `submarcas.reySubastos`, `submarcas.alfaLab`

**Result:** All sub-brand translations exist and are correct.

## 8. Contact Section Updates

- [x] 8.1 Verify `home.contact.title` translation
- [x] 8.2 Verify `home.contact.description` translation

**Result:** Both translations are correct.

## 9. Final Verification

- [x] 9.1 Review the complete page in browser
- [x] 9.2 Confirm all texts match the reference
- [x] 9.3 Verify no styles were broken
