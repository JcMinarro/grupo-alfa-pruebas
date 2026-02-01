# Specification: i18n Standard

## Requirements

### R1: Default Language
The application must default to Spanish (Spain) (`es`). The URL structure should support the default language at the root (e.g., `/` for Spanish).

### R2: Support for English
The architecture must allow adding English (`en`) translations easily. When implemented, English pages should be available under the `/en/` prefix.

### R3: Text Extraction
All user-visible text literals must be extracted from `.astro` files and centralized. No hardcoded strings should remain in the templates.

### R4: Literal Consistency
The text literals must remain exactly the same as they are currently in the implementation. No translation or wording changes are allowed in this phase.

### R5: Meta Tags and SEO
Page titles, meta descriptions, and `alt` tags for images must also be internationalized.

## Configuration

Astro i18n configuration:
- `defaultLocale: 'es'`
- `locales: ['es', 'en']`
- `routing: 'prefix-other-locales'` (or similar strategy that keeps `/` as `es`)
