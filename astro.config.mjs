import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import clerk from '@clerk/astro';
import { esES } from '@clerk/localizations';

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
    integrations: [
        clerk({
            localization: esES,
            appearance: {
                variables: {
                    colorPrimary: '#ffaa00',
                    colorBackground: '#ffffff',
                    colorForeground: '#1d1e20',
                    colorInputBackground: '#ffffff',
                    colorInputText: '#1d1e20',
                    borderRadius: '18px',
                    fontFamily: 'Jost, sans-serif',
                    fontFamilyButtons: 'Jost, sans-serif'
                },
                elements: {
                    cardBox: 'club-auth-card-box',
                    card: 'club-auth-card',
                    formButtonPrimary: 'club-auth-primary-button',
                    footer: 'club-auth-footer'
                },
                captcha: {
                    theme: 'dark',
                    size: 'flexible',
                    language: 'es-ES'
                }
            }
        })
    ],
    devToolbar: {
        enabled: true
    }
});
