create table if not exists membership_users (
    id uuid primary key default gen_random_uuid(),
    clerk_user_id text not null unique,
    primary_email text,
    stripe_customer_id text unique,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists organizations (
    id uuid primary key default gen_random_uuid(),
    code text not null unique,
    name text not null,
    status text not null default 'active',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists promo_codes (
    id uuid primary key default gen_random_uuid(),
    organization_id uuid references organizations(id),
    code text not null unique,
    stripe_promotion_code_id text,
    first_purchase_only boolean not null default true,
    active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists memberships (
    id uuid primary key default gen_random_uuid(),
    clerk_user_id text not null references membership_users(clerk_user_id),
    stripe_customer_id text,
    stripe_subscription_id text not null unique,
    plan_type text not null default 'annual',
    status text not null default 'inactive',
    initial_acquisition_source text not null default 'direct',
    initial_promo_code text,
    initial_referral_code text,
    organization_id uuid references organizations(id),
    current_period_end timestamptz,
    cancel_at_period_end boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists referral_codes (
    id uuid primary key default gen_random_uuid(),
    owner_clerk_user_id text not null references membership_users(clerk_user_id),
    code text not null unique,
    stripe_promotion_code_id text,
    active boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create table if not exists referral_usages (
    id uuid primary key default gen_random_uuid(),
    referral_code_id uuid references referral_codes(id),
    code text not null,
    referrer_clerk_user_id text references membership_users(clerk_user_id),
    referred_clerk_user_id text not null references membership_users(clerk_user_id),
    stripe_checkout_session_id text,
    stripe_subscription_id text,
    created_at timestamptz not null default now()
);

create table if not exists billing_events (
    id uuid primary key default gen_random_uuid(),
    stripe_event_id text not null unique,
    event_type text not null,
    clerk_user_id text,
    stripe_customer_id text,
    stripe_subscription_id text,
    payload jsonb not null,
    processed_at timestamptz not null default now()
);

create table if not exists suspicious_activity_notes (
    id uuid primary key default gen_random_uuid(),
    clerk_user_id text references membership_users(clerk_user_id),
    stripe_customer_id text,
    promo_code text,
    referral_code text,
    note text not null,
    reviewed_by text,
    created_at timestamptz not null default now()
);

create index if not exists memberships_clerk_user_id_idx on memberships(clerk_user_id);
create index if not exists memberships_status_idx on memberships(status);
create index if not exists memberships_initial_acquisition_source_idx on memberships(initial_acquisition_source);
create index if not exists billing_events_event_type_idx on billing_events(event_type);
create index if not exists billing_events_stripe_subscription_id_idx on billing_events(stripe_subscription_id);
create index if not exists referral_usages_referred_clerk_user_id_idx on referral_usages(referred_clerk_user_id);
create index if not exists suspicious_activity_notes_clerk_user_id_idx on suspicious_activity_notes(clerk_user_id);

create or replace view organization_membership_report as
select
    o.code as organization_code,
    count(m.id) as signups,
    count(m.id) filter (where m.status in ('active', 'trialing')) as conversions,
    count(be.id) filter (where be.event_type = 'invoice.paid') as renewals,
    count(be.id) filter (where be.event_type = 'customer.subscription.deleted') as cancellations
from organizations o
left join memberships m on m.organization_id = o.id or m.initial_promo_code = o.code
left join billing_events be on be.stripe_subscription_id = m.stripe_subscription_id
group by o.code;

create or replace view referral_membership_report as
select
    rc.code as referral_code,
    rc.owner_clerk_user_id as referrer_clerk_user_id,
    ru.referred_clerk_user_id,
    ru.stripe_subscription_id,
    m.status as resulting_membership_status
from referral_codes rc
left join referral_usages ru on ru.referral_code_id = rc.id or ru.code = rc.code
left join memberships m on m.stripe_subscription_id = ru.stripe_subscription_id;
