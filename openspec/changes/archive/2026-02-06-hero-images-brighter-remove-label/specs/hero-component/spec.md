## ADDED Requirements

### Requirement: Brighter default overlay
The Hero component SHALL default `overlayOpacity` to `0.3` when not provided by a page.

#### Scenario: Default overlay
- **WHEN** a page renders the Hero without an explicit `overlayOpacity`
- **THEN** the overlay opacity is `0.3`

### Requirement: Index overlay disabled
The `/index` page Hero configuration SHALL set `overlayOpacity` to `0`.

#### Scenario: Index hero overlay
- **WHEN** the `/index` page renders the Hero
- **THEN** the overlay is fully transparent (opacity `0`)

### Requirement: No lower-left page label
The Hero component SHALL NOT render a lower-left page-name label.

#### Scenario: Label removed
- **WHEN** the Hero renders on any page
- **THEN** no lower-left page-name label is present
