## ADDED Requirements

### Requirement: Hero Content Positioning
The `/alfa-hunters` page Hero section SHALL position the title lower on the screen (bottom-aligned) to ensure visibility of the background video content, deviating from the standard centered alignment.

#### Scenario: Hero title visibility
- **WHEN** viewing the `/alfa-hunters` page hero section
- **THEN** the title is positioned near the bottom of the hero container
- **AND** the background video's key focal points are not obscured by the title
- **AND** no subtitle is displayed

#### Scenario: Configuration isolation
- **WHEN** viewing other pages using the Hero component
- **THEN** their hero titles remain vertically centered
- **AND** the `/alfa-hunters` specific positioning does not leak to other pages
