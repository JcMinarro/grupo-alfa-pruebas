import { createBillingPortalSession } from '../../lib/server/billing';
import { requireActiveMembership } from '../../lib/server/membership';

export async function POST({ locals, url }) {
    try {
        const membership = await requireActiveMembership(locals);

        if (!membership.stripeCustomerId) {
            return new Response('Missing Stripe customer id for this member', { status: 400 });
        }

        const session = await createBillingPortalSession({
            customerId: membership.stripeCustomerId,
            origin: url.origin
        });

        return Response.redirect(session.url, 303);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to create billing portal session';
        const status = message === '/join' ? 303 : 500;

        if (status === 303) {
            return Response.redirect(new URL('/join', url), status);
        }

        return new Response(message, { status });
    }
}
