## 1. Content model & CMS

 - [x] 1.1 Add `hero.media` schema fields: `type`, `url`, `poster`, `title`, `attribution`, `license`, `variants` (cms/schemas/heroMedia.schema.js)
 - [x] 1.2 Add CMS validation to require `url` (HTTPS) and `license` for video entries (validation rules in schema)
 - [x] 1.3 Create editorial checklist for validating remote sources (attribution + license) (openspec/changes/dynamic-hero-videos/editorial-checklist.md)
  - [x] example schema file: `cms/schemas/heroMedia.schema.js`
  - [x] migration scaffold: `scripts/migrate_hero_media.js` (produces tmp/hero-media-migration.json)

## 2. Frontend Component

- [x] 2.1 Implement `HeroVideo` component with lazy loading and IntersectionObserver
- [x] 2.2 Implement source selection logic (connection.effectiveType / deviceMemory)
- [x] 2.3 Implement poster fallback and pause/resume controls
 - [x] 2.4 Add unit/visual tests for `HeroVideo` behavior (basic scaffolds added)
   - [x] tests/unit/hero.spec.ts (unit scaffold)
   - [x] tests/visual/hero.snapshot.md (visual scaffold)

## 3. Integration & QA

 - [x] 3.1 Integrate `HeroVideo` into one landing page behind a feature flag (pages wrapped with `FEATURE_DYNAMIC_HERO` guard)
   - [x] Wrap integration using `FEATURE_DYNAMIC_HERO` env flag
 - [x] 3.2 Run performance measurement (Lighthouse) and iterate (report: openspec/changes/dynamic-hero-videos/lighthouse-report.md)
 - [x] 3.3 Accessibility audit (keyboard navigation, captions, ARIA labels) (report: openspec/changes/dynamic-hero-videos/accessibility-audit.md)

## 4. Deployment & Monitoring

 - [x] 4.1 Feature flag rollout plan and monitoring (errors, perf) (see openspec/changes/dynamic-hero-videos/rollout-plan.md)
 - [x] 4.2 Add optional CI header-only URL liveness check for external video refs
   - [x] CI workflow: .github/workflows/check-remote-assets.yml (header-only with retries)
