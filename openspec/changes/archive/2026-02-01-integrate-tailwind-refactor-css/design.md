# Design: Tailwind Integration and CSS Refactor

## Context
The application relies on a monolithic `theme.css` and scattered custom styles. We are migrating to Tailwind CSS to standardize styling, reduce CSS bundle size, and improve developer velocity. The integration must preserve the existing visual identity, which is defined by specific colors and fonts in `theme.css`.

## Goals / Non-Goals

**Goals:**
- Successfully install and configure Tailwind CSS in the Astro project.
- Replicate the exact color palette and typography from `theme.css` in `tailwind.config.mjs`.
- Refactor the shared `Layout`, `Header`, and `Footer` components to use Tailwind.
- Refactor at least one major page (Home) to validate the approach.
- Ensure 0 visual regression.

**Non-Goals:**
- Complete refactor of *every* single page in the application in one go (unless it's small enough). We will focus on the core system and critical paths first.
- Changing the design or layout; this is a strict refactor for parity.

## Decisions

### 1. Configuration Strategy
We will extend the default Tailwind theme to include our custom token values.
- **Colors**: We will map CSS variables or raw hex values from `theme.css` to Tailwind colors.
    - `primary`, `secondary`, `accent` will be top-level color tokens.
    - `base` (backgrounds) will be mapped to `bg-` utilities.
- **Fonts**:
    - `Inter` -> `font-sans`
    - `Outfit` -> `font-heading` (or a custom `font-display`)
- **Screens**: We will stick to Tailwind's default breakpoints unless `theme.css` uses radically different ones. If there are conflicts, we favor `theme.css` breakpoints to avoid breakage.

### 2. Migration Phase
We will adopt a "Hybrid" approach during the transition.
1.  **Install & Config**: Set up Tailwind and port tokens.
2.  **Global Refactor**: Replace `theme.css` globals (like body defaults) with Tailwind's `@base` styles or config.
3.  **Component Refactor**: Tackle components one by one.
    - `Header`: High priority as it affects all pages.
    - `Footer`: High priority.
    - `Layouts`: High priority.
4.  **Cleanup**: Comment out or delete ported styles from `theme.css` as we go to avoid duplicate rules.

### 3. Header Dynamic State
The header currently uses specific classes for its "scrolled" state (e.g., changing background opacity).
- **Decision**: We will continue to toggle a class (e.g., `scrolled` or `data-scrolled`) via JavaScript, but the *styling* of that state will be handled by Tailwind utilities using the `group` modifier or standard CSS selection if needed (e.g., `[.scrolled_&]:bg-white`).
- **Alternative**: Use purely Tailwind classes driven by JS state (e.g., conditionally rendering `bg-transparent` vs `bg-white`), but since we likely toggle a class on the `header` element already, hooking into that with Tailwind modifiers is cleaner.

## Risks / Trade-offs

- **Specificity Conflicts**: During the hybrid phase, `theme.css` styles might conflict with Tailwind utilities. We will mitigating this by removing the custom CSS as soon as the component is refactored.
- **Visual Regression**: Subtle differences in spacing or line-height might occur. We will visually verify each component.
