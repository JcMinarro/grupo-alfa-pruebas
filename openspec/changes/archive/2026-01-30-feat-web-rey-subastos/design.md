## Context

Restoration of the `/rey-subastos` page.

## Goals / Non-Goals

**Goals:**
- Implement `NewWeb/rey-subastos.html`.
- Authoritative parity and responsiveness.

**Non-Goals:**
- Backend logic for auction bidding or real-time data.

## Decisions

- **Location**: `NewWeb/rey-subastos.html`.
- **Assets**: Replicate auction-themed assets.
- **Styling**: Specific authoritative accents (gold/bold/contrast) in CSS.

## Risks / Trade-offs

- **[Risk] High-urgency visual elements** → Mitigation: Replicate using standard CSS transitions.
 Maya require specific handling for auction alert boxes.
 Maya need to handle "Join the Auction" CTAs.
 Maya handle specific auction-themed icons (gavel, etc.).
 Maya handle responsive grid for auction listings.
 Maya ensure typography conveys authority and urgency.
 Maya handle specific layouts for large auction tables or lists.
 Maya handle specific colors for BID buttons.
 Maya verify all internal links to auction platforms.
 Maya handle specific imagery of premium properties.
