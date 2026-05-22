import { createClerkClient } from '@clerk/backend';
import { getSupabaseAdmin } from './supabase';
import { getServerEnv } from './env';

export const ACTIVE_MEMBERSHIP_STATUSES = ['active', 'trialing'];

export function getMembershipMetadata(user) {
    return {
        publicMetadata: user?.publicMetadata ?? {},
        privateMetadata: user?.privateMetadata ?? {}
    };
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
        initialAcquisitionSource: metadata.privateMetadata.initialAcquisitionSource ?? 'direct'
    };
}

export async function requireActiveMembership(locals) {
    const membership = await getMembershipContext(locals);

    if (!ACTIVE_MEMBERSHIP_STATUSES.includes(membership.membershipStatus)) {
        throw new Error('/join');
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
