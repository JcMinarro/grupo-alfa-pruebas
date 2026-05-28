import { createClerkClient } from '@clerk/backend';
import Stripe from 'stripe';
import { getSupabaseAdmin } from './supabase';
import { getServerEnv } from './env';

export const ACTIVE_MEMBERSHIP_STATUSES = ['active', 'trialing'];

export function getMembershipMetadata(user) {
    return {
        publicMetadata: user?.publicMetadata ?? {},
        privateMetadata: user?.privateMetadata ?? {}
    };
}

export function isMembershipPeriodExpired(currentPeriodEnd, now = new Date()) {
    if (!currentPeriodEnd) {
        return false;
    }

    const periodEnd = new Date(currentPeriodEnd);
    return Number.isFinite(periodEnd.getTime()) && periodEnd <= now;
}

export function shouldRefreshMembershipFromStripe(membership, now = new Date()) {
    return Boolean(
        ACTIVE_MEMBERSHIP_STATUSES.includes(membership.membershipStatus) &&
        membership.stripeSubscriptionId &&
        (!membership.currentPeriodEnd || isMembershipPeriodExpired(membership.currentPeriodEnd, now))
    );
}

function getStripeTimestampIso(timestamp) {
    return timestamp ? new Date(timestamp * 1000).toISOString() : null;
}

function mapStripeSubscriptionStatus(status) {
    return ACTIVE_MEMBERSHIP_STATUSES.includes(status) ? status : status ?? 'inactive';
}

export async function getMembershipContext(locals) {
    const user = locals.currentUser ? await locals.currentUser() : null;
    const metadata = getMembershipMetadata(user);
    const membershipStatus = metadata.publicMetadata.membershipStatus ?? 'inactive';
    const membershipType = metadata.publicMetadata.membershipType ?? 'annual';

    return {
        user,
        membershipStatus,
        membershipType,
        organizationCode: metadata.publicMetadata.organizationCode ?? null,
        referralCodeUsed: metadata.publicMetadata.referralCodeUsed ?? null,
        stripeCustomerId: metadata.privateMetadata.stripeCustomerId ?? null,
        stripeSubscriptionId: metadata.privateMetadata.stripeSubscriptionId ?? null,
        currentPeriodEnd: metadata.privateMetadata.currentPeriodEnd ?? null,
        cancelAtPeriodEnd: metadata.privateMetadata.cancelAtPeriodEnd ?? false,
        initialAcquisitionSource: metadata.privateMetadata.initialAcquisitionSource ?? 'direct'
    };
}

async function refreshMembershipFromStripe(membership) {
    const env = getServerEnv();

    if (!membership.stripeSubscriptionId || !env.stripeSecretKey) {
        return membership;
    }

    const stripe = new Stripe(env.stripeSecretKey);
    const subscription = await stripe.subscriptions.retrieve(membership.stripeSubscriptionId);
    const refreshedMembership = {
        ...membership,
        membershipStatus: mapStripeSubscriptionStatus(subscription.status),
        stripeCustomerId: typeof subscription.customer === 'string' ? subscription.customer : subscription.customer?.id,
        stripeSubscriptionId: subscription.id,
        currentPeriodEnd: getStripeTimestampIso(subscription.current_period_end),
        cancelAtPeriodEnd: subscription.cancel_at_period_end ?? false
    };

    await updateMembershipBySubscription(subscription.id, {
        stripe_customer_id: refreshedMembership.stripeCustomerId,
        status: refreshedMembership.membershipStatus,
        current_period_end: refreshedMembership.currentPeriodEnd,
        cancel_at_period_end: refreshedMembership.cancelAtPeriodEnd
    });
    await syncClerkMembershipMetadata(membership.user?.id, refreshedMembership);

    return refreshedMembership;
}

export async function requireActiveMembership(locals) {
    let membership = await getMembershipContext(locals);

    if (!ACTIVE_MEMBERSHIP_STATUSES.includes(membership.membershipStatus)) {
        throw new Error('/membership?payment_required=1');
    }

    if (shouldRefreshMembershipFromStripe(membership)) {
        membership = await refreshMembershipFromStripe(membership);
    }

    if (
        !ACTIVE_MEMBERSHIP_STATUSES.includes(membership.membershipStatus) ||
        isMembershipPeriodExpired(membership.currentPeriodEnd)
    ) {
        throw new Error('/membership?payment_required=1');
    }

    return membership;
}

export async function upsertMembershipUser(payload) {
    const supabase = getSupabaseAdmin();

    if (!supabase || !payload.clerk_user_id) {
        return { persisted: false };
    }

    const { error } = await supabase.from('membership_users').upsert(payload, {
        onConflict: 'clerk_user_id'
    });

    if (error) {
        throw error;
    }

    return { persisted: true };
}

export async function upsertMembershipRecord(payload) {
    const supabase = getSupabaseAdmin();

    if (!supabase) {
        return { persisted: false };
    }

    const { error } = await supabase.from('memberships').upsert(payload, {
        onConflict: 'stripe_subscription_id'
    });

    if (error) {
        throw error;
    }

    return { persisted: true };
}

export async function updateMembershipBySubscription(subscriptionId, payload) {
    const supabase = getSupabaseAdmin();

    if (!supabase || !subscriptionId) {
        return { persisted: false };
    }

    const { data, error } = await supabase
        .from('memberships')
        .update(payload)
        .eq('stripe_subscription_id', subscriptionId)
        .select('*')
        .maybeSingle();

    if (error) {
        throw error;
    }

    return { persisted: true, membership: data };
}

export async function syncClerkMembershipMetadata(clerkUserId, metadata) {
    const env = getServerEnv();

    if (!clerkUserId || !env.clerkSecretKey) {
        return { synced: false };
    }

    const clerk = createClerkClient({ secretKey: env.clerkSecretKey });

    await clerk.users.updateUserMetadata(clerkUserId, {
        publicMetadata: {
            membershipStatus: metadata.membershipStatus,
            membershipType: metadata.membershipType ?? 'annual',
            organizationCode: metadata.organizationCode ?? null,
            referralCodeUsed: metadata.referralCodeUsed ?? null
        },
        privateMetadata: {
            stripeCustomerId: metadata.stripeCustomerId ?? null,
            stripeSubscriptionId: metadata.stripeSubscriptionId ?? null,
            currentPeriodEnd: metadata.currentPeriodEnd ?? null,
            cancelAtPeriodEnd: metadata.cancelAtPeriodEnd ?? false,
            initialAcquisitionSource: metadata.initialAcquisitionSource ?? 'direct'
        }
    });

    return { synced: true };
}

export async function recordBillingEvent(payload) {
    const supabase = getSupabaseAdmin();

    if (!supabase) {
        return { persisted: false };
    }

    const { error } = await supabase.from('billing_events').upsert(payload, {
        onConflict: 'stripe_event_id'
    });

    if (error) {
        throw error;
    }

    return { persisted: true };
}
