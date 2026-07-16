const requiredKeys = [
    'PUBLIC_CLERK_PUBLISHABLE_KEY',
    'CLERK_SECRET_KEY',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'STRIPE_ANNUAL_PRICE_ID',
    'PUBLIC_APP_URL',
    'SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    'RESEND_API_KEY'
];

export function getServerEnv() {
    return {
        publicAppUrl: import.meta.env.PUBLIC_APP_URL,
        clerkPublishableKey: import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY,
        clerkSecretKey: import.meta.env.CLERK_SECRET_KEY,
        stripeSecretKey: import.meta.env.STRIPE_SECRET_KEY,
        stripeWebhookSecret: import.meta.env.STRIPE_WEBHOOK_SECRET,
        stripeAnnualPriceId: import.meta.env.STRIPE_ANNUAL_PRICE_ID,
        supabaseUrl: import.meta.env.SUPABASE_URL,
        supabaseServiceRoleKey: import.meta.env.SUPABASE_SERVICE_ROLE_KEY,
        resendApiKey: import.meta.env.RESEND_API_KEY,
        resendFromEmail: import.meta.env.RESEND_FROM_EMAIL ?? 'Club Alfa <members@grupoalfa.net>'
    };
}

export function listMissingServerEnv() {
    return requiredKeys.filter((key) => !import.meta.env[key]);
}

export function assertServerEnv(keys) {
    const missing = keys.filter((key) => !import.meta.env[key]);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
}
