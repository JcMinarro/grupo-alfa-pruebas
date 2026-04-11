## Context

Grupo Alfa uses a simple Astro site architecture with shared global navigation, a commercial homepage, and several business pages built from repeatable structures based on `Hero`, `InfoGrid`, and `GridItem`. This change affects multiple coordinated surfaces: a new `Club` page, the primary navigation, and the homepage, so the content, entry-point, and reuse decisions should be fixed before implementation.

The client needs a fast response because offline acquisition is already running. They have also explicitly approved an epic, community-driven tone that must remain in place, including terms such as `manada` and `tribu`, while excluding unconfirmed promises such as lifetime pricing, certifications, or future member tier hierarchies.

## Goals / Non-Goals

**Goals:**
- Create a new `Club Alfa` page aligned with the requested commercial tone and a clear value proposition.
- Make `Club` visible as a first-level entry in the global navigation.
- Reinforce the homepage so it routes traffic to `Club Alfa` and presents it as a prominent offer.
- Maximize reuse of existing components and visual patterns to accelerate implementation and preserve consistency.
- Support acquisition with clear CTAs without introducing new dependencies or payment flows in this phase.

**Non-Goals:**
- Implement checkout, online payments, or membership management.
- Create new CRM automations or specialized forms outside the existing contact flow.
- Redesign the homepage or the site visual system from scratch.
- Introduce commercial promises that the client has not confirmed.

## Decisions

### Decision: Treat `Club Alfa` as a first-level page
It will be implemented as a dedicated route at `src/pages/club.astro` instead of as an internal homepage section.

Rationale:
- External advertising needs a clear URL and a page focused on conversion.
- The current primary navigation already organizes the offer into equivalent business pages.
- It gives the club stronger prominence without overloading the homepage with all details.

Alternatives considered:
- Keep the club only as a homepage block: faster, but insufficient to explain the offer and absorb campaign traffic.
- Create a subpage under another existing area: reduces commercial clarity and dilutes the product.

### Decision: Reuse the existing business-page visual pattern
The Club page will reuse `BaseLayout`, `Hero`, `InfoGrid`, and `GridItem`, combining a hero, benefit blocks, covered areas, pricing, and a closing CTA.

Rationale:
- Reduces delivery time.
- Preserves consistency with `inversores`, `promotores`, and `alfa-hunters`.
- Makes it possible to build a rich commercial page without introducing new complexity.

Alternatives considered:
- Create new Club-specific components: more flexible, but unnecessary for this phase.
- Copy ad hoc HTML without reuse: slightly faster short-term, but worse for maintenance.

### Decision: Preserve the epic tone while anchoring conversion in concrete benefits
The copy will keep terms such as `manada`, `tribu`, and `entorno`, but the page structure will prioritize clarity: what it is, what it includes, covered areas, seminars, pricing, and CTA.

Rationale:
- Matches the client's explicit preference.
- Prevents the page from becoming purely aspirational branding.
- Makes the intense tone compatible with an orderly commercial reading experience.

Alternatives considered:
- Lower the tone toward a more corporate presentation: conflicts with the direction approved by the client.
- Push the entire page into aggressive language without structure: harms clarity and credibility.

### Decision: Use the existing contact flow as the initial conversion mechanism
Club CTAs will route to contact or reuse the current acquisition flow without adding direct payment or automated membership signup in this iteration.

Rationale:
- The repository already has a working contact flow.
- Avoids blocking launch on payment or back-office integrations.
- Makes it possible to validate demand before expanding operations.

Alternatives considered:
- Directly collect 99 EUR from the website: increases functional and legal complexity.
- Create a dedicated form with new logic: useful, but not necessary for a fast publication.

### Decision: Reinforce the homepage instead of replacing its current message
The homepage will add a more visible entry toward `Club Alfa`, but it will keep its broader role as Grupo Alfa's general showcase.

Rationale:
- The homepage already serves a broad brand and business presentation role.
- It allows Club prioritization without breaking the rest of the business lines.
- It minimizes visual and content regression risk.

Alternatives considered:
- Rewrite the homepage entirely around Club: stronger prominence, but also larger scope and more risk for an urgent need.

## Risks / Trade-offs

- [The epic tone may feel less premium to part of the audience] -> Structure the page around concrete benefits, visible pricing, and clear functional copy.
- [Conversion without checkout may introduce friction] -> Use direct, visible CTAs to reduce the distance between interest and contact.
- [The homepage may still feel secondary if the client later wants absolute Club dominance] -> Make the new page the main destination and concentrate the detailed commercial story there.
- [Client content may change quickly while the campaign evolves] -> Centralize the content in i18n keys to support fast adjustments.

## Migration Plan

1. Add the new `Club Alfa` page and the approved copy.
2. Update the header and links to include `Club` on desktop and mobile.
3. Add a visible homepage block or CTA that points to `/club`.
4. Verify navigation, responsive behavior, and content consistency.

Rollback:
- Remove the `Club` link from the header.
- Unpublish or disconnect the new `/club` route.
- Revert the homepage promotional block without affecting the rest of the pages.

## Open Questions

- Whether the primary `Club Alfa` CTA should point to `/contacto`, to a specific homepage block, or to a dedicated form inside the Club page.
- Whether the `99 EUR/year` price should appear only once as a closing commercial block or also in the hero and final CTA.
- Whether a direct payment flow for members will be added later.
