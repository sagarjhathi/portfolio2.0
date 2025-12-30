// DOM Elements
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links'); // This is the container
const navItems = document.querySelectorAll('.nav-links ol li a'); // Individual links
const sections = document.querySelectorAll('section');
const fadeTags = document.querySelectorAll('.fade-in-up');

// --- 0. Setup Global Effects (Spotlight) ---
function initSpotlight() {
    // Create the spotlight overlay
    const spotlight = document.createElement('div');
    spotlight.classList.add('spotlight-overlay');
    document.body.appendChild(spotlight);

    // Initial Mouse Position
    let mouseX = 0;
    let mouseY = 0;

    // Track Mouse
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Update CSS Variables for the gradient position
        document.documentElement.style.setProperty('--cursor-x', `${mouseX}px`);
        document.documentElement.style.setProperty('--cursor-y', `${mouseY}px`);

        // Reveal the spotlight
        spotlight.style.opacity = '1';

        // Also reveal individual card borders if they exist
        const cards = document.querySelectorAll('.project-card::before'); // Pseudo-elements can't be targeted directly via JS style, but the CSS var handles it
        // However, we want to control opacity of the card glow separately if we want to save performance, 
        // but with CSS vars it propagates automatically. 
        // We just need to make sure the CSS opacity rule is active.
    });

    // Handle "Leave Window"
    document.addEventListener('mouseleave', () => {
        spotlight.style.opacity = '0';
    });
}
initSpotlight();


// --- 1. Navbar Scroll Logic (Hide/Show) ---
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        header.classList.add('scrolled-down');
        header.classList.remove('scrolled-up');
    } else {
        header.classList.remove('scrolled-down');
        header.classList.add('scrolled-up');
    }

    if (window.scrollY < 10) {
        header.classList.remove('scrolled-up');
    }
    lastScrollY = window.scrollY;
    updateActiveLink();
});

// --- 2. Mobile Menu Toggle ---
hamburger.addEventListener('click', toggleMenu);

function toggleMenu() {
    navLinks.parentElement.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
    document.body.classList.toggle('no-scroll');
}

navItems.forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.parentElement.classList.contains('nav-active')) {
            toggleMenu();
        }
    });
});

// --- 3. Intersection Observer for Animations ---
const observerOptions = {
    root: null,
    threshold: 0.2,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe Elements
fadeTags.forEach(tag => observer.observe(tag));
sections.forEach(section => {
    section.classList.add('fade-in-up');
    observer.observe(section);
});


// --- 4. Smooth Scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// --- 5. Update Active Link ---
function updateActiveLink() {
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 300)) {
            currentSection = section.getAttribute('id');
        }
    });
    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}
