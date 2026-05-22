import { createCheckoutSession } from '../../lib/server/billing';
import { getCurrentUser, requireSignedInUser } from '../../lib/server/auth';

export async function GET({ url }) {
    return Response.redirect(new URL('/join', url), 303);
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
