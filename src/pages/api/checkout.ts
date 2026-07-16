import { createCheckoutSession } from '../../lib/server/billing';
import { getAuthRedirect, getCurrentUser, requireSignedInUser } from '../../lib/server/auth';

export async function GET({ locals, url }) {
    try {
        requireSignedInUser(locals, { returnBackUrl: `/api/checkout${url.search}` });
        const user = await getCurrentUser(locals);

        if (!user) {
            return Response.redirect(new URL(`/sign-in?redirect_url=${encodeURIComponent(`/api/checkout${url.search}`)}`, url), 303);
        }

        const discountCode = `${url.searchParams.get('ref') ?? url.searchParams.get('promo') ?? ''}`.trim();
        const session = await createCheckoutSession({
            user,
            origin: url.origin,
            discountCode
        });

        if (!session.url) {
            return new Response('Checkout session created without URL', { status: 500 });
        }

        return Response.redirect(session.url, 303);
    } catch (error) {
        const authRedirect = error instanceof Error ? getAuthRedirect(error.message) : null;
        if (authRedirect) {
            return Response.redirect(new URL(authRedirect, url), 303);
        }

        if (error instanceof Error && error.message.includes('not valid or is no longer active')) {
            return Response.redirect(new URL('/membership?checkout_error=invalid_code', url), 303);
        }

        return Response.redirect(new URL('/membership?payment_required=1', url), 303);
    }
}

export async function POST({ request, locals, url }) {
    try {
        requireSignedInUser(locals, { returnBackUrl: '/join' });
        const user = await getCurrentUser(locals);

        if (!user) {
            return Response.redirect(new URL('/sign-in?redirect_url=%2Fjoin', url), 303);
        }

        const formData = await request.formData();
        const discountCode = `${formData.get('discountCode') ?? ''}`.trim();

        const session = await createCheckoutSession({
            user,
            origin: url.origin,
            discountCode
        });

        if (!session.url) {
            return new Response('Checkout session created without URL', { status: 500 });
        }

        return Response.redirect(session.url, 303);
    } catch (error) {
        if (error instanceof Error && error.message.includes('not valid or is no longer active')) {
            return Response.redirect(new URL('/join?checkout_error=invalid_code', url), 303);
        }

        return new Response(error instanceof Error ? error.message : 'Unable to create checkout session', {
            status: 500
        });
    }
}
