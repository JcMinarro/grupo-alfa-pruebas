## Context

The site currently uses static hero images across main landing pages. We will introduce streaming background videos referenced by external URLs (e.g., Pexels-hosted MP4s listed in `heros.txt`) without committing large binary files to the repository.

Stakeholders: frontend engineers, content editors, SEO/UX, and legal.

Constraints:
- Treat all video files as external resources. Do NOT download or commit them to the repo or CI artifacts.
- Must work on mobile and low-bandwidth conditions by using posters/fallbacks and avoiding autoplay penalties.

## Goals / Non-Goals

**Goals:**
- Provide a `HeroVideo` component that streams external video URLs with graceful fallbacks.
- Store and surface metadata needed for attribution and license tracking (source URL, author, license, poster).
- Ensure performance and accessibility (lazy load, muted by default, captions/alt text, keyboard controls).

**Non-Goals:**
- Hosting or serving video files from our infrastructure.

## Decisions

- Where to store external references: extend the content model with `hero.media` entries that include `type` (video/image), `url`, `poster`, `title`, `attribution`, `license`, and `variants` (array of {url, width, bitrate}). Rationale: keeps binary out of repo and allows editors to validate sources.

- Playback component: Build a React/Vue component (match repo stack) named `HeroVideo` with these behaviors:
  - Props: `sources` (array), `poster`, `title`, `attribution`, `license`, `autoplay` (default true for desktop), `muted` (default true), `playsInline` (mobile), `controls` (optional)
  - Behavior: lazy-load video element when in viewport (IntersectionObserver), choose source by devicePixelRatio and connection.effectiveType, fall back to poster image or static image source when video unsupported.
  - Accessibility: provide `aria-label` from `title`, expose pause/resume controls, ensure keyboard focus does not trap, include captions if provided.

- Source selection strategy: use `navigator.connection.effectiveType` and `deviceMemory` where available; prioritize lower-bitrate sources on '2g' or 'slow-2g'. Provide editorial overrides in CMS.

## Risks / Trade-offs

- Risk: External video host may remove/change URLs. Mitigation: require editors to provide attribution and a verification step; store a poster fallback and a status flag in CMS.
- Risk: Autoplay reduces performance/bandwidth on mobile. Mitigation: autoplay only on desktop or on good connections; default to poster on mobile/slow connections.

## Migration Plan

1. Add `hero.media` fields to content models and provide migration scripts to populate poster and attribution for existing hero entries.
2. Implement `HeroVideo` component and use it behind a feature flag on a single landing page for testing.
3. Monitor performance and rollback via feature flag if necessary.

## Open Questions

- Do we want to allow third-party embed providers (YouTube/Vimeo) or only direct MP4/WebM links? Recommendation: only direct files for consistent autoplay/background behavior.
- Should CI run a lightweight check to validate external URLs format and reachable status (without downloading large files)? Recommendation: optional liveness check that only queries headers.
