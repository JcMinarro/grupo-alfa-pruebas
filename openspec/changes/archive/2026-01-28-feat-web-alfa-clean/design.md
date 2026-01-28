## Context

The Grupo Alfa website restoration project continues with the implementation of the `/alfa-clean` page. This page details a specific service or program and needs to match the visual language of the rest of the site while being a faithful clone of the original.

## Goals / Non-Goals

**Goals:**
- Implement `NewWeb/alfa-clean.html` with accurate content and layout.
- Ensure visual parity with `https://grupoalfa.net/alfa-clean`.
- Maintain responsiveness across all devices.

**Non-Goals:**
- Implementing any backend logic (the page is static).
- Changing the design or content from the original version.

## Decisions

- **File Location**: The page will be `NewWeb/alfa-clean.html`.
- **Styling**: Reuse `style.css` for common elements (nav, footer) and extend it or use a specific `clean.css` if the page has unique complex layouts.
- **Image Assets**: Extract assets from the original page or recreate them if necessary.

## Risks / Trade-offs

- **[Risk] Layout Complexity**: The "Alfa Clean" page might have specific interactive elements or unique layouts.
- **[Mitigation]**: Carefully analyze the original DOM structure and replicate using modern CSS (Flexbox/Grid).
- **[Risk] Font Matching**: Exact font files may not be available.
- **[Mitigation]**: Use the closest matching Google Fonts identified during analysis.
