import { getServerEnv } from './env';

function getSupabaseHeaders(serviceRoleKey, prefer) {
    return {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        ...(prefer ? { Prefer: prefer } : {})
    };
}

async function supabaseRequest({ method, table, query = '', body, prefer }) {
    const env = getServerEnv();

    if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
        return { data: null, error: null, skipped: true };
    }

    const response = await fetch(`${env.supabaseUrl}/rest/v1/${table}${query}`, {
        method,
        headers: getSupabaseHeaders(env.supabaseServiceRoleKey, prefer),
        body: body === undefined ? undefined : JSON.stringify(body)
    });
    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (!response.ok) {
        return { data: null, error: data ?? { message: response.statusText } };
    }

    return { data, error: null };
}

export function getSupabaseAdmin() {
    const env = getServerEnv();

    if (!env.supabaseUrl || !env.supabaseServiceRoleKey) {
        return null;
    }

    return {
        from(table) {
            return {
                upsert(payload, options = {}) {
                    const query = options.onConflict ? `?on_conflict=${encodeURIComponent(options.onConflict)}` : '';
                    return supabaseRequest({
                        method: 'POST',
                        table,
                        query,
                        body: payload,
                        prefer: 'resolution=merge-duplicates,return=minimal'
                    });
                },
                update(payload) {
                    const filters = [];

                    return {
                        eq(column, value) {
                            filters.push(`${encodeURIComponent(column)}=eq.${encodeURIComponent(value)}`);
                            return this;
                        },
                        select() {
                            return this;
                        },
                        async maybeSingle() {
                            const query = filters.length ? `?${filters.join('&')}` : '';
                            const { data, error } = await supabaseRequest({
                                method: 'PATCH',
                                table,
                                query,
                                body: payload,
                                prefer: 'return=representation'
                            });

                            return { data: Array.isArray(data) ? data[0] ?? null : data, error };
                        }
                    };
                }
            };
        }
    };
}
