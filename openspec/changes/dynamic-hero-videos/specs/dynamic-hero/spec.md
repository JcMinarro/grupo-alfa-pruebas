## ADDED Requirements

### Requirement: Hero video metadata format
The system SHALL accept external video references for hero media with the following metadata fields: `url` (absolute HTTPS), `poster` (optional image URL), `title`, `attribution`, `license`, and optional `variants` (array of objects containing `url`, `width`, `bitrate`).

#### Scenario: Valid metadata accepted
- **WHEN** an editor adds a hero media entry with all required fields and a valid HTTPS `url`
- **THEN** the CMS accepts the entry and stores it in the `hero.media` field

### Requirement: Use external URLs only
The system SHALL NOT store video binary blobs in the repository or primary CDN; videos referenced in `hero.media` MUST be external URLs and treated as external resources.

#### Scenario: Editor attempts to upload video file
- **WHEN** an editor attempts to upload a video file to the repo-backed asset store for hero media
- **THEN** the system rejects the upload and prompts the editor to provide an external URL and poster instead

### Requirement: Source attribution and license tracking
The CMS SHALL store `attribution` and `license` fields for each hero video and surface them in the admin UI for editorial review.

#### Scenario: Display attribution
- **WHEN** a hero video is referenced on a page
- **THEN** the rendered component includes visible or inspectable attribution and license details (e.g., in page footer or an accessible metadata panel)

### Requirement: Playback fallback behavior
The frontend SHALL fallback to a poster image if the video cannot be played (unsupported format, slow connection, or blocked autoplay).

#### Scenario: Slow connection fallback
- **WHEN** the user's `navigator.connection.effectiveType` is `2g` or `slow-2g`
- **THEN** the `HeroVideo` component renders the poster image instead of initiating video playback

### Requirement: Quality-aware source selection
The `HeroVideo` player SHALL select the lowest appropriate `variant` bitrate when the connection is poor, and higher bitrate when connection is good. Editors can override automatic selection via the CMS.

#### Scenario: Connection-based selection
- **WHEN** a page loads on a connection with `effectiveType` `4g`
- **THEN** the player chooses the highest `variant` bitrate available
