import { handleStripeWebhook } from '../../lib/server/billing';

export async function POST({ request }) {
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
        return new Response('Missing stripe-signature header', { status: 400 });
    }

    try {
        const payload = await request.text();
        const event = await handleStripeWebhook({ payload, signature });

        return new Response(JSON.stringify({ received: true, type: event.type }), {
            status: 200,
            headers: {
                'content-type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(error instanceof Error ? error.message : 'Invalid webhook payload', { status: 400 });
    }
}
