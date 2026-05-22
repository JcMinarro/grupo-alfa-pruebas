# Membership Admin Readiness

Phase 1 does not ship a staff admin UI. The data model preserves the operational fields needed for phase 2 workflows without changing the public onboarding model.

Supported readiness assumptions:

- Organizations and promo codes are stored independently so partner campaigns can be reviewed or edited later.
- Membership, billing event, promo, and referral history is retained for member support and manual investigation.
- `suspicious_activity_notes` records low-friction manual review notes without introducing high-friction identity verification.
- `organization_membership_report` and `referral_membership_report` provide the baseline reporting surface for partner and referral performance.
- Manual overrides, promo correction, and access review should be added as internal workflows on top of these records in phase 2.
