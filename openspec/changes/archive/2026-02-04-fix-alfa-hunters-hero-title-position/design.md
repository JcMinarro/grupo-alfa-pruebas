## Context

The `/alfa-hunters` page features a hero section with a background video. Currently, the hero title is vertically centered, which obscures important visual elements in the video. The goal is to move the title lower on this specific page without affecting the layout of other pages that use the shared `Hero` component.

## Goals / Non-Goals

**Goals:**
- Add a configuration option to the `Hero` component to control vertical content alignment.
- Update the `/alfa-hunters` page to use bottom alignment for its hero title.
- Ensure all other pages retain their current centered alignment.
- Maintain the "title-only" content structure on the `/alfa-hunters` page.

**Non-Goals:**
- Refactoring the entire `Hero` component beyond what is necessary for this alignment change.
- Changing the background video or other content on the `/alfa-hunters` page.

## Decisions

### 1. Add `contentAlignment` Prop to Hero Component

We will introduce a new optional prop `contentAlignment` to the `Hero` component.

- **Option A (Chosen):** Add `contentAlignment: "center" | "bottom" = "center"`.
  - **Rationale**: This is explicit, type-safe, and defaults to the current behavior ("center"), ensuring backward compatibility. It directly maps to Flexbox alignment classes (`items-center` vs `items-end`).
- **Option B**: Use a generic `class` prop override.
  - **Rationale**: While flexible, it requires consumers to know Tailwind utility classes and might conflict with existing layout classes if not carefully managed. A dedicated prop is cleaner for this specific structural variant.

### 2. Implementation Details

- The `Hero.astro` component uses Flexbox (`flex items-center justify-center`).
- If `contentAlignment` is "bottom", we will swap `items-center` for `items-end`.
- We will likely need to add `pb-20` (padding-bottom) or similar when bottom-aligned to ensure the text doesn't sit flush against the edge of the hero container.

## Risks / Trade-offs

- **Risk**: Layout shift on other pages.
  - **Mitigation**: The default value will be explicitly set to "center", matching the current implementation. We will verify other pages remain unchanged.
- **Risk**: Mobile responsiveness for bottom alignment.
  - **Mitigation**: We will ensure that even when bottom-aligned, there is sufficient padding so it looks good on mobile devices.

## Migration Plan

No migration needed for existing pages as the default prop value preserves current behavior. Only `/alfa-hunters` will be updated to use the new prop.
