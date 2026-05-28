import Stripe from 'stripe';
import { sendMembershipEmail } from './email';
import { getServerEnv, assertServerEnv } from './env';
import {
    recordBillingEvent,
    syncClerkMembershipMetadata,
    updateMembershipBySubscription,
    upsertMembershipRecord,
    upsertMembershipUser
} from './membership';

let stripeClient;

async function getPromotionCodeCoupon(stripe, promotionCode) {
    let coupon = promotionCode.coupon ?? promotionCode.promotion?.coupon;

    if (coupon && typeof coupon === 'object') {
        return coupon;
    }

    if (stripe.promotionCodes?.retrieve) {
        const expandedPromotionCode = await stripe.promotionCodes.retrieve(promotionCode.id, {
            expand: ['coupon', 'promotion']
        });

        coupon = expandedPromotionCode.coupon ?? expandedPromotionCode.promotion?.coupon ?? coupon;
    }

    if (coupon && typeof coupon === 'object') {
        return coupon;
    }

    if (typeof coupon === 'string' && stripe.coupons?.retrieve) {
        return stripe.coupons.retrieve(coupon);
    }

    return coupon;
}

export function getCheckoutDiscountParams(resolvedDiscount) {
    if (!resolvedDiscount.stripePromotionCodeId) {
        return {};
    }

    return {
        discounts: [{ promotion_code: resolvedDiscount.stripePromotionCodeId }]
    };
}

export function getStripe() {
    if (!stripeClient) {
        const env = getServerEnv();
        assertServerEnv(['STRIPE_SECRET_KEY']);
        stripeClient = new Stripe(env.stripeSecretKey);
    }

    return stripeClient;
}

export async function resolveDiscountCode(stripe, discountCode) {
    const normalizedCode = `${discountCode ?? ''}`.trim().toUpperCase();

    if (!normalizedCode) {
        return {
            stripePromotionCodeId: undefined,
            sourceType: 'direct',
            organizationCode: '',
            referralCode: ''
        };
    }

    const promotionCodes = await stripe.promotionCodes.list({
        code: normalizedCode,
        active: true,
        limit: 1,
        expand: ['data.coupon', 'data.promotion']
    });
    const promotionCode = promotionCodes.data[0];

    if (!promotionCode) {
        throw new Error('The code entered is not valid or is no longer active.');
    }

    const coupon = await getPromotionCodeCoupon(stripe, promotionCode);
    const couponMetadata = coupon && typeof coupon === 'object' && 'metadata' in coupon ? coupon.metadata ?? {} : {};
    const promotionMetadata = promotionCode.metadata ?? {};
    const metadata = {
        ...couponMetadata,
        ...promotionMetadata
    };
    const sourceType = promotionMetadata.sourceType ?? metadata.sourceType ?? 'direct';

    return {
        stripePromotionCodeId: promotionCode.id,
        coupon,
        sourceType,
        organizationCode: promotionMetadata.organizationCode ?? metadata.organizationCode ?? '',
        referralCode: promotionMetadata.referralCode ?? metadata.referralCode ?? ''
    };
}

export function getCouponDiscountPreview(coupon) {
    if (!coupon || typeof coupon !== 'object') {
        return {
            hasPricePreview: false,
            discountLabel: 'Stripe discount',
            originalAmount: 9900,
            finalAmount: undefined,
            originalPrice: '99.00 EUR',
            finalPrice: undefined
        };
    }

    const annualAmount = 9900;
    const discountAmount = coupon.percent_off
        ? Math.round((annualAmount * coupon.percent_off) / 100)
        : Math.min(coupon.amount_off ?? 0, annualAmount);
    const finalAmount = Math.max(annualAmount - discountAmount, 0);

    return {
        hasPricePreview: true,
        discountLabel: coupon.percent_off ? `${coupon.percent_off}%` : `${(discountAmount / 100).toFixed(2)} EUR`,
        originalAmount: annualAmount,
        finalAmount,
        originalPrice: `${(annualAmount / 100).toFixed(2)} EUR`,
        finalPrice: `${(finalAmount / 100).toFixed(2)} EUR`
    };
}

export async function previewDiscountCode(discountCode) {
    const stripe = getStripe();
    const normalizedCode = `${discountCode ?? ''}`.trim().toUpperCase();
    const resolvedDiscount = await resolveDiscountCode(stripe, normalizedCode);
    const preview = getCouponDiscountPreview(resolvedDiscount.coupon);

    return {
        code: normalizedCode,
        sourceType: resolvedDiscount.sourceType,
        ...preview
    };
}

export async function createCheckoutSession({ user, origin, discountCode }) {
    const env = getServerEnv();
    assertServerEnv(['STRIPE_SECRET_KEY', 'STRIPE_ANNUAL_PRICE_ID', 'PUBLIC_APP_URL']);

    const stripe = getStripe();
    const successUrl = `${origin ?? env.publicAppUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${origin ?? env.publicAppUrl}/membership?payment_required=1`;
    const resolvedDiscount = await resolveDiscountCode(stripe, discountCode);

    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        success_url: successUrl,
        cancel_url: cancelUrl,
        line_items: [
            {
                price: env.stripeAnnualPriceId,
                quantity: 1
            }
        ],
        client_reference_id: user.id,
        customer_email: user.primaryEmailAddress?.emailAddress,
        ...getCheckoutDiscountParams(resolvedDiscount),
        metadata: {
            clerkUserId: user.id,
            membershipType: 'annual',
            sourceType: resolvedDiscount.sourceType,
            organizationCode: resolvedDiscount.organizationCode,
            referralCode: resolvedDiscount.referralCode,
            isInitialPurchase: 'true'
        }
    });

    return session;
}

export async function createBillingPortalSession({ customerId, origin }) {
    const env = getServerEnv();
    assertServerEnv(['STRIPE_SECRET_KEY', 'PUBLIC_APP_URL']);

    const stripe = getStripe();

    return stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: `${origin ?? env.publicAppUrl}/members/membership`
    });
}

async function persistCompletedCheckoutSession(session, { sendWelcomeEmail = false } = {}) {
    await upsertMembershipUser({
        clerk_user_id: session.metadata?.clerkUserId,
        stripe_customer_id: session.customer,
        primary_email: session.customer_details?.email ?? session.customer_email
    });
    await upsertMembershipRecord({
        clerk_user_id: session.metadata?.clerkUserId,
        stripe_customer_id: session.customer,
        stripe_subscription_id: typeof session.subscription === 'object' ? session.subscription.id : session.subscription,
        plan_type: session.metadata?.membershipType ?? 'annual',
        status: 'active',
        initial_acquisition_source: session.metadata?.sourceType ?? 'direct',
        initial_promo_code: session.metadata?.organizationCode || null,
        initial_referral_code: session.metadata?.referralCode || null
    });
    await syncClerkMembershipMetadata(session.metadata?.clerkUserId, {
        membershipStatus: 'active',
        membershipType: session.metadata?.membershipType ?? 'annual',
        organizationCode: session.metadata?.organizationCode || null,
        referralCodeUsed: session.metadata?.referralCode || null,
        stripeCustomerId: session.customer,
        stripeSubscriptionId: typeof session.subscription === 'object' ? session.subscription.id : session.subscription,
        initialAcquisitionSource: session.metadata?.sourceType ?? 'direct'
    });

    if (sendWelcomeEmail) {
        await sendMembershipEmail({
            type: 'membership_welcome',
            to: session.customer_details?.email ?? session.customer_email,
            attributes: {
                membershipStatus: 'active',
                initialAcquisitionSource: session.metadata?.sourceType ?? 'direct'
            }
        });
    }
}

export async function activateMembershipFromCheckoutSession({ sessionId, clerkUserId }) {
    if (!sessionId || !clerkUserId) {
        return { activated: false };
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['subscription']
    });

    if (session.metadata?.clerkUserId !== clerkUserId) {
        return { activated: false };
    }

    if (session.status !== 'complete') {
        return { activated: false };
    }

    await persistCompletedCheckoutSession(session);
    return { activated: true };
}

export async function handleStripeWebhook({ payload, signature }) {
    const env = getServerEnv();
    assertServerEnv(['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET']);

    const stripe = getStripe();
    const event = stripe.webhooks.constructEvent(payload, signature, env.stripeWebhookSecret);

    await recordBillingEvent({
        event_type: event.type,
        stripe_event_id: event.id,
        payload: event,
        processed_at: new Date().toISOString()
    });

    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object;
            await persistCompletedCheckoutSession(session, { sendWelcomeEmail: true });
            break;
        }
        case 'invoice.paid': {
            const invoice = event.data.object;
            const { membership } = await updateMembershipBySubscription(invoice.subscription, {
                stripe_customer_id: invoice.customer,
                status: 'active'
            });
            if (membership?.clerk_user_id) {
                await syncClerkMembershipMetadata(membership.clerk_user_id, {
                    membershipStatus: 'active',
                    membershipType: membership.plan_type,
                    organizationCode: membership.initial_promo_code,
                    referralCodeUsed: membership.initial_referral_code,
                    stripeCustomerId: membership.stripe_customer_id,
                    stripeSubscriptionId: membership.stripe_subscription_id,
                    initialAcquisitionSource: membership.initial_acquisition_source
                });
            }
            await sendMembershipEmail({
                type: 'membership_renewal',
                to: invoice.customer_email,
                attributes: { membershipStatus: 'active' }
            });
            break;
        }
        case 'invoice.payment_failed': {
            const invoice = event.data.object;
            const { membership } = await updateMembershipBySubscription(invoice.subscription, {
                stripe_customer_id: invoice.customer,
                status: 'past_due'
            });
            if (membership?.clerk_user_id) {
                await syncClerkMembershipMetadata(membership.clerk_user_id, {
                    membershipStatus: 'past_due',
                    membershipType: membership.plan_type,
                    organizationCode: membership.initial_promo_code,
                    referralCodeUsed: membership.initial_referral_code,
                    stripeCustomerId: membership.stripe_customer_id,
                    stripeSubscriptionId: membership.stripe_subscription_id,
                    initialAcquisitionSource: membership.initial_acquisition_source
                });
            }
            await sendMembershipEmail({
                type: 'payment_failed',
                to: invoice.customer_email,
                attributes: { membershipStatus: 'past_due' }
            });
            break;
        }
        case 'customer.subscription.deleted': {
            const subscription = event.data.object;
            const { membership } = await updateMembershipBySubscription(subscription.id, {
                stripe_customer_id: subscription.customer,
                status: 'canceled'
            });
            if (membership?.clerk_user_id) {
                await syncClerkMembershipMetadata(membership.clerk_user_id, {
                    membershipStatus: 'canceled',
                    membershipType: membership.plan_type,
                    organizationCode: membership.initial_promo_code,
                    referralCodeUsed: membership.initial_referral_code,
                    stripeCustomerId: membership.stripe_customer_id,
                    stripeSubscriptionId: membership.stripe_subscription_id,
                    initialAcquisitionSource: membership.initial_acquisition_source
                });
            }
            await sendMembershipEmail({
                type: 'membership_canceled',
                to: subscription.customer_email,
                attributes: { membershipStatus: 'canceled' }
            });
            break;
        }
        default:
            break;
    }

    return event;
}
