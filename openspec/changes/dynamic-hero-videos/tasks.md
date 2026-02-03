## 1. Content model & CMS

- [ ] 1.1 Add `hero.media` schema fields: `type`, `url`, `poster`, `title`, `attribution`, `license`, `variants`
- [ ] 1.2 Add CMS validation to require `url` (HTTPS) and `license` for video entries
- [ ] 1.3 Create editorial checklist for validating remote sources (attribution + license)

## 2. Frontend Component

- [x] 2.1 Implement `HeroVideo` component with lazy loading and IntersectionObserver
- [x] 2.2 Implement source selection logic (connection.effectiveType / deviceMemory)
- [x] 2.3 Implement poster fallback and pause/resume controls
- [ ] 2.4 Add unit/visual tests for `HeroVideo` behavior

## 3. Integration & QA

- [ ] 3.1 Integrate `HeroVideo` into one landing page behind a feature flag
- [ ] 3.2 Run performance measurement (Lighthouse) and iterate
- [ ] 3.3 Accessibility audit (keyboard navigation, captions, ARIA labels)

## 4. Deployment & Monitoring

- [ ] 4.1 Feature flag rollout plan and monitoring (errors, perf)
- [ ] 4.2 Add optional CI header-only URL liveness check for external video refs
