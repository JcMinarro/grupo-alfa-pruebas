# Implementation Design

## Proposed Architecture

### 1. Design System (CSS)
We will transition from multiple page-specific CSS files to a unified **Design System**.
-   **Core File**: `src/styles/theme.css` (or updated `style.css`).
-   **Tokens**: CSS Variables for colors (`--color-primary`, `--color-bg`, etc.), typography, and spacing.
-   **Utilities**: Common classes (`.container`, `.text-center`, `.fade-in`, `.grid`).
-   **Legacy CSS**: Existing page CSS files (e.g., `investor.css`) will be refactored to remove global overrides, eventually deprecated as components take over.

### 2. Component Architecture
We will introduce a set of "Smart" UI components to replace repetitive HTML.

#### A. Core Components
-   **`Hero.astro`**: Handles background media (img/video), overlays, and typography. Replaces manual `section` implementations.
-   **`Footer.astro`**: Standardized. Removes `customStyle` prop. Always dark theme. Uses correct Logo asset.
-   **`ContactForm.astro`**: Unified form. Accepts props for `showPhone`, `showPrivacy`, `action`.

#### B. Content Components
-   **`InfoGrid.astro`**: Generic grid layout container.
-   **`GridItem.astro`**: Standard card for steps/benefits. Supports `icon`, `number`, `title`, `description`.

#### C. Project Components
-   **`ProjectDetails.astro`**: Grid for property distinctives.
-   **`ProjectFinancials.astro`**: Table for cost breakdown.
-   **`ProjectROI.astro`**: Sale/Rent profitability cards.

### 3. File Structure
```
src/
  components/
    Hero.astro
    Footer.astro (Update)
    ContactForm.astro (Update)
    InfoGrid.astro
    GridItem.astro
    project/
      ProjectDetails.astro
      ProjectFinancials.astro
      ProjectROI.astro
  styles/
    theme.css (New/Refactored)
    ...
```

### 4. Migration Strategy
1.  **Foundation**: Setup `theme.css`.
2.  **Components**: Build the component library.
3.  **Refactor**: Go page by page (`index`, `proyectos`, `inversores`, project sub-pages) replacing HTML with components.
4.  **Cleanup**: Remove unused CSS and assets (invalid logo).

## Verification Plan
### Automated Tests
-   Build check: `npm run build` to ensure no regression in Astro build.

### Manual Verification
-   **Visual Regression**: Compare `/index` footer with original. Verify Hero animations.
-   **Forms**: Test submission on Home vs Contact (check validation).
-   **Responsiveness**: Check Grids and Tables on Mobile.
-   **Assets**: Confirm no 404s for the new logo.
