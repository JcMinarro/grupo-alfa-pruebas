## Context

Restoration of the main homepage `/`.

## Goals / Non-Goals

**Goals:**
- Update `NewWeb/index.html`.
- Visual and functional parity with `https://grupoalfa.net/`.
- Ensure all navigation links point to the correctly restored local pages.

**Non-Goals:**
- Backend for contact forms (use existing placeholder logic).

## Decisions

- **Location**: `NewWeb/index.html`.
- **Assets**: Reuse existing shared assets. Use `photo-1521780171415-783b1cb576e73d83.jpg` for Hero background.
- **Styling**: `style.css` + `src/home.css`.
- **Structure**: Ensure `index.html` is the default landing page and all internal links point to relative `.html` files.

## Risks / Trade-offs

- **[Risk] Broken links** → Mitigation: meticulous check of all anchor tags against created pages.
- **[Risk] Missing assets** → mitigation: verify all referenced images exist in `public/assets`.
