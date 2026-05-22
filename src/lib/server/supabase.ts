import { createClient } from '@supabase/supabase-js';
import { getServerEnv } from './env';

let supabaseClient;

export function getSupabaseAdmin() {
    if (supabaseClient) {
        return supabaseClient;
    }

    const env = getServerEnv();

    if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
        return null;
    }

    supabaseClient = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });

    return supabaseClient;
}
