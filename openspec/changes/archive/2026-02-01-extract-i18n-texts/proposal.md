# Proposal: Extracting Texts for i18n Support

The objective of this change is to centralize all hardcoded texts in the application into translation files. This will allow the project to support multiple languages, starting with Spanish (Spain) as the default language and leaving the architecture ready for English.

## User Review Required

> [!IMPORTANT]
> This change involves modifying almost every component and page to replace hardcoded strings with translation keys. While the visual output will remain identical, the code structure for handling text will change significantly.

> [!NOTE]
> We will use Astro's native i18n support which is robust and well-integrated.

## Proposed Changes

### Core Configuration
- Update `astro.config.mjs` to enable i18n routing and configuration.
- Define `es` (Spanish) as the default locale and `en` (English) as a supported locale.

### Translation Files
- Create `src/i18n/` directory.
- Create `src/i18n/ui.ts` to define the UI strings.
- Create `src/i18n/utils.ts` to provide a helper function for getting translations in components.

### Component & Page Updates
- Refactor all `.astro` files in `src/components/` and `src/pages/` to use the translation helper.
- Ensure `BaseLayout` correctly handles the `lang` attribute and page titles.

## Verification Plan

### Automated Tests
- Build the project to ensure no broken references.
- Check that the output HTML contains the same text literals as before.

### Manual Verification
- Browse the site in Spanish to verify all texts are correctly displayed.
- Verify that the `<html>` tag has the correct `lang="es"` attribute.
