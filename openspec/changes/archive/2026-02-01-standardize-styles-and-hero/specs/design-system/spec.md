# Design System Spec

## Background
The current codebase uses multiple CSS files (`home.css`, `portfolio.css`, `hunters.css`, etc.) which often duplicate global styles such as colors, fonts, and layout utilities. This leads to inconsistency and difficult maintenance. A unified Design System is needed to centralize these tokens and utilities.

## Requirements

### 1. Global Variables (Tokens)

-   **Colors**: Define a strict palette based on existing styles.
    -   Primary: `#f9b200` (Alfa Yellow)
    -   Secondary: `#000000` (Black)
    -   Text: `#333333` (Dark Grey)
    -   Background: `#ffffff` (White)
    -   Accents/Sub-brands: Define colors for sub-brands (e.g., Hunters, Premises) if strictly necessary, or genericize them.
-   **Typography**:
    -   Primary Font: `'Jost', sans-serif`
    -   Heading Font: `'DM Sans', sans-serif`
    -   Sizes: Define fluid scales for `h1` through `h6` and body text.
-   **Spacing & Layout**:
    -   Container max-width (`1200px`).
    -   Standard spacing units (padding/margin).

### 2. Utility Classes

-   **Layout**:
    -   `.container`: Standard centered container.
    -   `.grid`: Common grid layouts.
    -   `.flex`: Common flex layouts (if not using a library like Tailwind, define essential helpers).
-   **Typography**:
    -   `.text-center`, `.text-left`, `.text-right`.
    -   `.font-bold`, `.font-light`.
    -   `.text-primary`, `.text-secondary`.
-   **Animations**:
    -   `.fade-in`: Standardize the scroll entry animation used across `index.astro` and others.

### 3. Component Styles

-   **Buttons**: Standardize button classes (`.btn`, `.btn-primary`, `.btn-outline`) to replace ad-hoc styles like `.btn-investor` or `.btn-portfolio-main` where possible.
-   **Forms**: Base styles for inputs, labels, and textareas (to support the new `ContactForm`).

### 4. Refactoring Strategy

-   Create `src/styles/theme.css` (or update `style.css`) as the single source of truth.
-   Remove global definitions from specific page CSS files (`home.css`, `investor.css`, etc.) and import the global theme.
