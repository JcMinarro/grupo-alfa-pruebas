# Feature flag rollout plan

1. Merge feature branch to `staging` with `FEATURE_DYNAMIC_HERO=true` enabled on staging only.
2. Validate one landing page visually and run Lighthouse + accessibility checks.
3. Monitor errors and performance for 48 hours; if OK, enable feature flag for 10% of traffic.
4. After 7 days of stable metrics, gradually increase rollout to 100%.

Monitoring:
- Add monitoring for JS errors (Sentry) and custom metric for `hero.video.load` failures.
- Monitor bandwidth and first-contentful-paint metrics post-rollout.
