# Footer Component Spec

## Background
The current `Footer.astro` component accepts a `customStyle` prop which is used to override the background on various pages (e.g., `/proyectos`), causing visual inconsistency. Additionally, the footer currently uses an incorrect logo asset (`logo-grupo-alfa-cabeza-negra...`). The user has stated that the footer as it appears on the `/index` page (default dark style) is the correct standard.

## Requirements

### 1. Styling & Consistency
-   **Standardize Appearance**: The footer must look identical to the `/index` page footprint across all pages.
-   **Remove Overrides**: 
    -   Remove or deprecate the `customStyle` prop support for background changes. 
    -   Ensure the background is consistently the dark layout defined in `footer.css` (or the new Design System theme).
    -   Address specific pages like `proyectos.astro`, `inversores.astro`, etc., to stop passing `footerStyle` overrides.

### 2. Logo Update
-   **Correct Asset**: Replace the incorrect logo image source (`logo-grupo-alfa-cabeza-negra-mv02n2ZjzOc5pE3k.png`) with a valid asset used on the Index page, such as `logo-alfa-wolf.png` or `logo-alfa-horizontal.png` (appropriately styled/filtered for the dark background).
-   **Asset Cleanup**: Remove the invalid asset `logo-grupo-alfa-cabeza-negra-mv02n2ZjzOc5pE3k.png` from the codebase.

### 3. Usage
-   The component should simply be `<Footer />` without style props.
-   It should continue to reside in `src/layouts/BaseLayout.astro`.

### 4. Structure
-   Retain the existing 4-column grid layout (Logo, Contact Link/Address, Emails, Social Icons).
-   Ensure Social Icons use consistent SVG or asset paths.
