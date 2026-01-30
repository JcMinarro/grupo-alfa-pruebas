## ADDED Requirements

### Requirement: Visual Parity with Original Footer
The footer in all web pages must match the design, layout, and content of the original `https://grupoalfa.net` footer.

#### Scenario: Verify Footer Structure
- **WHEN** the user navigates to any page (e.g., `/`, `/proyectos`)
- **THEN** they should see the footer with the specific four-column layout: Logo, Contact Infos, Company Links, and Social Icons.
- **AND** the background color should be dark (#1d1e20 or similar from original design).
- **AND** the typography should usage the brand font (Jost/DM Sans).

### Requirement: Consistent Styling
The footer must use the global CSS variables defined in `style.css` where applicable, but define specific overrides to match the dark theme of the original footer.

#### Scenario: Check Link Hover Effects
- **WHEN** the user hovers over contact emails or social links
- **THEN** strict design parity with the original site (e.g., color shift to primary orange #FFAA00) must be observed.

### Requirement: Content Precision
All contact information must be accurate and hardcoded if necessary to match the screenshot.

#### Scenario: Verify Content
- **WHEN** reading the footer content
- **THEN** the address should be "C/ Conde del Valle de San Juan, 1\n30004, Murcia".
- **AND** the email should be "info@grupoalfa.net".
- **AND** the social links should point to the correct placeholders or URLs if known.

### Requirement: Responsiveness
The footer must adapt layout for mobile devices.

#### Scenario: Mobile View
- **WHEN** viewing on a screen width < 768px
- **THEN** the footer columns should stack vertically with appropriate spacing (gap ~40px).
