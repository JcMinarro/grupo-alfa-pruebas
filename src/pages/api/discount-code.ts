import { previewDiscountCode } from '../../lib/server/billing';
import { requireSignedInUser } from '../../lib/server/auth';

export async function POST({ request, locals }) {
    try {
        requireSignedInUser(locals, { returnBackUrl: '/join' });
        const { discountCode } = await request.json();
        const preview = await previewDiscountCode(discountCode);

        return new Response(JSON.stringify(preview), {
            status: 200,
            headers: { 'content-type': 'application/json' }
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unable to validate code';

        return new Response(JSON.stringify({ error: message }), {
            status: 400,
            headers: { 'content-type': 'application/json' }
        });
    }
}
