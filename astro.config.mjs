import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import clerk from '@clerk/astro';

// https://astro.build/config
export default defineConfig({
    output: 'server',
    i18n: {
        defaultLocale: 'es',
        locales: ['es', 'en'],
        routing: {
            prefixDefaultLocale: false
        }
    },
    adapter: node({
        mode: 'standalone'
    }),
    integrations: [clerk()],
    devToolbar: {
        enabled: true
    }
});
