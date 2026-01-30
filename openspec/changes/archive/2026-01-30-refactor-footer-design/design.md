## Context
The current footer in `NewWeb/index.html` is a placeholder that does not reflect the premium brand identity or the information architecture of the original Grupo Alfa website. We need to refactor it to achieve visual parity.

## Goals / Non-Goals

**Goals:**
- Implement a 4-column footer layout (Logo/Address, Contact, Links, Social).
- Match the visual style (Dark background #1d1e20, Text colors, Hover effects).
- Ensure responsiveness (stacking on mobile).
- Update the HTML in `NewWeb/index.html` (and potentially other pages if they share the footer, though currently focusing on index).

**Non-Goals:**
- Backend integration for the contact form (handled separately).
- Changing the top navigation or other page sections.

## Decisions

### 1. Modular CSS Strategy
**Decision:** Create a dedicated stylesheet `src/footer.css` and import it in `index.html`.
**Rationale:** The project structure already utilizes modular CSS files (e.g., `promoters.css`, `hunters.css`). Isolating footer styles makes maintenance easier and prevents pollution of `style.css`. `style.css` will be used for global variables and utilities.

### 2. Layout Implementation
**Decision:** Use CSS Grid for the main footer container.
**Rationale:** Grid allows for easy 3-column layout creation and simple adaptation to a single column on mobile media queries.

### 3. Hardcoded Content
**Decision:** Hardcode the address, email, and links directly in the HTML.
**Rationale:** The content is static and unlikely to change frequently. No CMS or dynamic injection is required for this scope.

## Risks / Trade-offs
[Risk] Style Conflicts -> Mitigation: Use specific class names (e.g., `.footer-column`, `.footer-social-link`) to avoid clashing with global generic styles.
