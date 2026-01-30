import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// Helper to get all HTML files in the root directory
const getHtmlEntries = () => {
    const entries = {};
    const files = fs.readdirSync(__dirname);
    files.forEach(file => {
        if (file.endsWith('.html')) {
            const name = file.replace('.html', '');
            entries[name] = resolve(__dirname, file);
        }
    });
    return entries;
};

export default defineConfig({
    root: '.',
    build: {
        rollupOptions: {
            input: getHtmlEntries(),
        },
    },
    server: {
        // Handle clean URLs in dev mode: /proyectos -> /proyectos.html
        proxy: {
            '^/(?!.*\\.\\w+$|@vite|@fs|src|public|assets|node_modules).*$': {
                target: 'http://localhost:5173',
                rewrite: (path) => {
                    const cleanPath = path.split('?')[0].split('#')[0];
                    if (cleanPath === '/') return '/index.html';
                    const filePath = resolve(__dirname, `${cleanPath.slice(1)}.html`);
                    if (fs.existsSync(filePath)) {
                        return `${cleanPath}.html`;
                    }
                    return path;
                },
            },
        },
    },
});
