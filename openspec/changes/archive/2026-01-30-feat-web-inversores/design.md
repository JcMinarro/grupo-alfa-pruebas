## Context

Restoration of the `/inversores` page.

## Goals / Non-Goals

**Goals:**
- Implement `NewWeb/inversores.html`.
- Parity and responsiveness.

**Non-Goals:**
- Backend logic for investment processing.

## Decisions

- **Location**: `NewWeb/inversores.html`.
- **Assets**: Extract/clone from source.
- **Charts/Tables**: Replicate using HTML/CSS for fidelity and performance.

## Risks / Trade-offs

- **[Risk] Complex data presentation** → Mitigation: Use simple but faithful HTML/CSS table structures.
 Maya require specific styling for "premium" financial feel.
 Maya need to handle PDF links if any are provided in the original.
