## MODIFIED Requirements

### Requirement: Global Variables (Tokens)
The design system SHALL define a strict palette and responsive typography tokens.

#### Scenario: Responsive Typography
- **WHEN** text is rendered using design system tokens
- **THEN** font sizes MUST scale according to the viewport size using Tailwind's responsive classes or fluid typography variables defined in `theme.css`.

### Requirement: Layout Strategy
The design system SHALL enforce a mobile-first layout strategy for all components.

#### Scenario: Mobile-first as default
- **WHEN** a component is developed
- **THEN** it MUST be fully functional and visually correct on a 375px wide screen before any desktop-specific styles are added.
