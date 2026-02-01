# Design System Spec

## Purpose
Unified Design System to centralize tokens, utilities, and component styles for consistency and maintainability across the Grupo Alfa website.

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
    -   `.flex`: Common flex layouts.
-   **Typography**:
    -   `.text-center`, `.text-left`, `.text-right`.
    -   `.font-bold`, `.font-light`.
    -   `.text-primary`, `.text-secondary`.
-   **Animations**:
    -   `.fade-in`: Standardize the scroll entry animation used across `index.astro` and others.

### 3. Component Styles

-   **Buttons**: Standardize button classes (`.btn`, `.btn-primary`, `.btn-outline`) to replace ad-hoc styles.
-   **Forms**: Base styles for inputs, labels, and textareas.

### 4. Architecture

-   **Source of Truth**: `tailwind.config.mjs` (Tokens) and `src/styles/theme.css` (Base/Global styles).
-   **Strategy**: Use Tailwind CSS utility-first approach. Custom CSS in `theme.css` should be limited to global resets, variable definitions, and complex animations that cannot be reasonably handled by Tailwind's arbitrary values.
-   **Brand Colors**:
    -   `primary`: #FFAA00
    -   `bg-dark`: #1d1e20
    -   `light`: #ffffff
    -   `dark`: #1d1e20
    -   `text-muted`: rgba(255, 255, 255, 0.7)
