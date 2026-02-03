## Context

The homepage (`src/pages/index.astro`) uses a translation system where all text content is stored in `src/i18n/ui.ts`. The current Spanish translations do not match the original design shown in the reference screenshot. The texts need to be updated to maintain visual and brand consistency.

The translation system uses keys like:
- `hero.title` - Hero section title
- `home.steps.*` - Features section texts
- `home.libertad.*` - Investment section texts
- `services.*` - Services descriptions
- `submarcas.*` - Sub-brand names
- `home.contact.*` - Contact section texts

## Goals / Non-Goals

**Goals:**
- Update all Spanish translations in `src/i18n/ui.ts` to match the visual reference exactly
- Maintain the existing translation key structure
- Preserve all current CSS styles and HTML structure
- Ensure texts maintain the meaning and purpose of the original design

**Non-Goals:**
- Do not modify the Astro component structure (`src/pages/index.astro`)
- Do not change CSS styles
- Do not modify English translations
- Do not add new translation keys (unless necessary)

## Decisions

### Decision 1: Update translation file only
**Choice**: Only modify the `src/i18n/ui.ts` file, specifically the Spanish (`es`) translations.
**Rationale**: The Astro component dynamically loads translations using the `t()` function. Updating the translation file is the correct approach.

### Decision 2: Use screenshot as source of truth
**Choice**: The screenshot `@oldScreenshots/index.png` is the authoritative reference for the texts.
**Rationale**: It represents the desired state of the design.

## Risks / Trade-offs

- **[Risk]** Some text in the image may not be fully legible → **Mitigation**: Use context and common sense to infer the correct text, or ask for clarification if critical.
- **[Risk]** Updated text may not fit visually if longer/shorter → **Mitigation**: Verify that texts maintain similar lengths to the originals.
