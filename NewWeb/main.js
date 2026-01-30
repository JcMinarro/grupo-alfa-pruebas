// SPA Router for Grupo Alfa
// ---------------------------------------------------------

/**
 * Progress Bar Control
 */
const nprogress = {
    start: () => {
        let bar = document.getElementById('nprogress');
        if (!bar) {
            bar = document.createElement('div');
            bar.id = 'nprogress';
            bar.innerHTML = '<div class="bar"></div>';
            document.body.appendChild(bar);
        }
        bar.style.display = 'block';
        bar.querySelector('.bar').style.width = '0%';
        setTimeout(() => {
            bar.querySelector('.bar').style.width = '70%';
        }, 10);
    },
    done: () => {
        const bar = document.getElementById('nprogress');
        if (bar) {
            bar.querySelector('.bar').style.width = '100%';
            setTimeout(() => {
                bar.style.display = 'none';
            }, 300);
        }
    }
};

/**
 * Global Initialization (animations, mobile menu, etc.)
 */
const initPageLogic = () => {
    // 1. Mobile Menu
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (menuToggle && navMenu) {
        // Remove old listeners to avoid duplicates
        const newToggle = menuToggle.cloneNode(true);
        menuToggle.parentNode.replaceChild(newToggle, menuToggle);

        newToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            newToggle.classList.toggle('active');
        });
    }

    // 2. Intersection Observer (Fade-in)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 3. Update Active Link in Header
    const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('.nav-menu a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '/' && href === '/')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 4. Close mobile menu on navigate
    if (navMenu) navMenu.classList.remove('active');
    if (menuToggle) menuToggle.classList.remove('active');
};

/**
 * SPA Router
 */
const router = {
    cache: new Map(),

    async navigate(url, addToHistory = true) {
        nprogress.start();

        try {
            // Normalize URL for fetching (in dev, /proyectos -> /proyectos.html)
            const fetchUrl = url === '/' ? '/index.html' : `${url.replace(/\/$/, '')}.html`;

            let html;
            if (this.cache.has(fetchUrl)) {
                html = this.cache.get(fetchUrl);
            } else {
                const response = await fetch(fetchUrl);
                if (!response.ok) throw new Error('Page not found');
                html = await response.text();
                this.cache.set(fetchUrl, html);
            }

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newMain = doc.querySelector('main').innerHTML;
            const newTitle = doc.title;

            // Sync Stylesheets
            const currentLinks = Array.from(document.head.querySelectorAll('link[rel="stylesheet"]'));
            const newLinks = Array.from(doc.head.querySelectorAll('link[rel="stylesheet"]'));

            newLinks.forEach(newLink => {
                const href = newLink.getAttribute('href');
                if (href && !currentLinks.some(link => link.getAttribute('href') === href)) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = href;
                    document.head.appendChild(link);
                }
            });

            // Update DOM
            document.querySelector('main').innerHTML = newMain;
            document.title = newTitle;

            if (addToHistory) {
                history.pushState({ url }, '', url);
            }

            window.scrollTo(0, 0);
            initPageLogic();

        } catch (error) {
            console.error('Navigation error:', error);
            // Fallback to normal navigation if fetch fails
            if (addToHistory) window.location.href = url;
        } finally {
            nprogress.done();
        }
    }
};

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    initPageLogic();

    // Intercept clicks
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const url = link.getAttribute('href');

        // Skip external links, hashes, and non-http protocols
        if (!url || url.startsWith('http') || url.startsWith('#') || url.startsWith('mailto')) {
            return;
        }

        e.preventDefault();
        router.navigate(url);
    });

    // Handle back/forward
    window.addEventListener('popstate', (e) => {
        const url = window.location.pathname;
        router.navigate(url, false);
    });
});

/**
 * Sticky Header
 */
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});
