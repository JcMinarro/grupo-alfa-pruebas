## Context

The current Grupo Alfa website was built using a desktop-first approach, leading to layout overflows and poor readability on mobile devices. The header is particularly affected, with navigation links exceeding the screen width on devices narrower than 768px. This design outlines the transition to a **mobile-first** architecture and the implementation of a responsive navigation system.

## Goals / Non-Goals

**Goals:**
- Implement a mobile-first responsive header with a functional burger menu.
- Ensure all pages are fully responsive and visually consistent on mobile devices (375px+).
- Standardize the use of Tailwind's responsive prefixes (`md:`, `lg:`, etc.) across the project.
- Fix any horizontally scrolling elements or overflowing text on small screens.

**Non-Goals:**
- Redesigning the desktop layout (only refactoring its implementation to be mobile-first compatible).
- Adding complex animations beyond standard slide-in or fade-in for the mobile menu.

## Decisions

### 1. Mobile-First Refactoring
**Decision:** All components will be refactored to use base Tailwind classes for mobile, moving existing desktop styles behind the `md:` prefix.
**Rationale:** This follows industry best practices and ensures that the "lightest" styles are loaded first, providing a better experience on mobile.

### 2. Header Architecture
**Decision:** The `Header.astro` will contain both the desktop navigation (hidden on mobile) and a mobile navigation drawer (sliding in from the right/top).
**Rationale:** Separate structures allow for better control over mobile-specific interactions (like full-screen overlays) without cluttering the desktop CSS.

### 3. Navigation Toggle Logic
**Decision:** Use a lightweight JavaScript snippet in `src/scripts/main.js` to toggle a `menu-open` class on the `<body>` or the menu container.
**Rationale:** Provides a consistent interaction method while allowing for simple CSS-based animations.

### 4. Global Responsiveness Audit
**Decision:** Systematic review of all sections using `flex-wrap`, `grid-cols-1`, and `max-w-full` to prevent horizontal overflow.
**Rationale:** Ensures that even custom components developed previously adhere to the new responsiveness standards.

## Risks / Trade-offs

- **[Risk]** Breaking existing desktop styles during refactoring. → **Mitigation**: Perform side-by-side visual tests during implementation.
- **[Risk]** JS failing to load for the mobile menu. → **Mitigation**: Ensure basic navigation links are accessible or use a `:target` based CSS fallback if necessary (non-essential for now).
- **[Risk]** Viewport height (`vh`) issues in mobile browsers due to address bars. → **Mitigation**: Use `dvh` (dynamic viewport height) where supported or standard padding to avoid cut-offs.

## Open Questions

- Should we implement a "glassmorphism" effect for the mobile menu overlay to match the premium aesthetic? (Decision: Yes, for consistency with the "scrolled" header state).
