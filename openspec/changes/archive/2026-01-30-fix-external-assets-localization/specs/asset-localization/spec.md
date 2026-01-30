## ADDED Requirements

### Requirement: Identification of External Assets
The system SHALL identify all asset references (images, stylesheets, fonts, icons, videos) that point to the `grupoalfa.net` domain or any other external domain where the asset is intended to be part of the local project.

#### Scenario: Scan HTML files
- **WHEN** the audit process is run across all `.html` files in `NewWeb/`
- **THEN** it SHALL generate a list of all `src`, `href`, and `srcset` attributes containing external URLs to `grupoalfa.net`.

#### Scenario: Scan CSS files
- **WHEN** the audit process is run across all `.css` files in `NewWeb/src/`
- **THEN** it SHALL generate a list of all `url()` functions containing external URLs to `grupoalfa.net`.

### Requirement: Localization of Assets
The system SHALL download all identified external assets and store them within the project's local directory structure, specifically under `NewWeb/public/assets/`, maintaining a clean and organized folder hierarchy.

#### Scenario: Successful asset download
- **WHEN** an external asset URL is processed
- **THEN** the asset SHALL be downloaded and saved to a corresponding path in `NewWeb/public/assets/`.

### Requirement: Codified Reference Updates
The system SHALL update all instances of identified external asset URLs in the source code to point to their new local paths.

#### Scenario: Update HTML references
- **WHEN** an asset has been localized
- **THEN** all `<img>`, `<link>`, and other relevant HTML tags in `NewWeb/` SHALL be updated to use the local path.

#### Scenario: Update CSS references
- **WHEN** an asset has been localized
- **THEN** all `url()` references in `NewWeb/src/` CSS files SHALL be updated to use the local path.
