/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                primary: '#FFAA00',
                'bg-dark': '#1d1e20',
                light: '#ffffff',
                dark: '#1d1e20',
                'text-light': '#ffffff', // Kept for safety
                'text-dark': '#1d1e20', // Kept for safety
                'text-muted': 'rgba(255, 255, 255, 0.7)',
                'text-muted-dark': 'rgba(29, 30, 32, 0.7)',
                overlay: 'rgba(0, 0, 0, 0.5)',
            },
            fontFamily: {
                heading: ['DM Sans', 'sans-serif'],
                main: ['Jost', 'sans-serif'],
            },
            keyframes: {
                slideUpFade: {
                    '0%': { opacity: '0', transform: 'translateY(100px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            animation: {
                slideUpFade: 'slideUpFade 1.5s ease-out forwards 0.5s',
            },
        },
    },
    plugins: [],
}
