## Context

The Hero component supports a dark overlay (via `overlayOpacity`) and renders a lower-left page-name label. Client feedback indicates the images look too dark and the label should be removed. The `/index` page should display the Hero image with no overlay transparency.

## Goals / Non-Goals

**Goals:**
- Reduce darkening on Hero images across the site.
- Set the `/index` Hero overlay to fully transparent (no dark overlay).
- Remove the lower-left page-name label from the Hero.

**Non-Goals:**
- Redesigning Hero layout, typography, or copy.
- Changing Hero media sourcing (images/videos) or data structures.
- Modifying any other page components beyond Hero presentation.

## Decisions

- **Overlay adjustment via existing prop**: Use the existing `overlayOpacity` mechanism to reduce default darkening (e.g., lower the default value) instead of introducing a new styling system. This keeps the change contained to the Hero component and avoids per-page custom CSS.
  - *Alternatives considered*: Per-page CSS overrides. Rejected because it fragments styling and is harder to maintain.

- **Index-specific override**: Set the `/index` Hero overlay opacity to `0` at the page configuration level (explicit prop) to guarantee a fully clear image without changing global defaults too aggressively.
  - *Alternatives considered*: Hardcode a conditional inside `Hero.astro` for `/index`. Rejected to keep the component generic and avoid coupling to route logic.

- **Remove lower-left label**: Remove the label element from the Hero render output (or make it opt-in and leave it disabled in all current uses). This eliminates the unwanted visual element without affecting core Hero content.
  - *Alternatives considered*: Hiding the label with CSS only. Rejected because it leaves dead UI logic and risks reappearing with style changes.

## Risks / Trade-offs

- **Risk**: Lowering default overlay may reduce text contrast on some images. → **Mitigation**: Validate readability on key pages; adjust per-page `overlayOpacity` when needed.
- **Risk**: Removing the label might remove information some pages relied on. → **Mitigation**: Confirm no page uses the label as primary context; if needed, move that information into existing headings.

## Migration Plan

- Update Hero defaults and `/index` usage.
- Remove label rendering from Hero.
- Visual QA on homepage and representative internal pages with Hero images.

## Open Questions

- Do any pages require a custom overlay opacity after the default is reduced?
- Is the label used anywhere outside the Hero component that must remain?
