## Why

Hero sections are a high-visibility area on the site and currently use static imagery. Replacing or augmenting them with curated, streaming video backgrounds will increase user engagement and better communicate the product/service experience. We should reference externally hosted videos (not store large video files in the repo) to keep build size small and respect upstream licensing.

## What Changes

- Add support for referencing external hero videos (URLs) in the content model and admin/CMS.
- Implement a reusable `HeroVideo` component that streams remote MP4/WebM sources with sensible defaults (muted, looped, poster fallback, quality selection, and lazy loading).
- Add runtime logic to select an appropriate remote source by device / connection quality and to fall back to a poster image on unsupported devices or slow connections.
- Provide accessibility and controls: exposed captions/alt text, allow pausing, and ensure keyboard focus behavior.
- Create formal specs describing the external resource format, required metadata, and acceptable CDN/source providers (e.g., Pexels links listed in `heros.txt`) — do NOT download these files as part of the build; treat them as external resources.

## Capabilities

### New Capabilities
- `dynamic-hero`: Application-level capability to reference and render external hero videos with fallbacks and responsiveness.
- `hero-video-spec`: Contract describing the external video resource format and required metadata (URL, poster, title, attribution, license, width/height, bitrate hints).
- `hero-video-player`: Frontend component specification for playback behavior, lazy loading, and quality/connection-aware source selection.

### Modified Capabilities
- None — this change introduces new capabilities and does not change existing spec requirements.

## Impact

- Code: frontend `components/Hero` area (new `HeroVideo` component), site layout adjustments for autoplaying background media.
- Content: CMS/data model changes to store external video references and metadata; a small editorial workflow for validating remote sources and licenses.
- Build/Deployment: No large binary assets added to repo; videos are streamed from external hosts. Ensure CI/CD and static builds don't attempt to download remote videos.
- Performance: need connection-aware selection, lazy loading, and poster fallbacks to avoid mobile/slow-network penalties.
- Accessibility & Legal: must include captions/alt text and record source attribution/licensing (e.g., Pexels). See `heros.txt` for example external resources — these are references only.

Files to create next (unlocks): `design.md`, `specs/<capability>/spec.md` for each capability listed above.
