// Global Logic for Grupo Alfa
// ---------------------------------------------------------

/**
 * Progress Bar Control (Optional, can be used for async tasks if needed)
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
 * Page Initialization Logic
 */
const initPageLogic = () => {
    // 1. Mobile Menu
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.onclick = () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        };
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
};

// Listen for Astro's page load event
document.addEventListener('astro:page-load', () => {
    initPageLogic();
});

// Sticky Header Logic (Global)
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
