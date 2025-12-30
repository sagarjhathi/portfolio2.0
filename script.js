// DOM Elements
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links'); // This is the container
const navItems = document.querySelectorAll('.nav-links ol li a'); // Individual links
const sections = document.querySelectorAll('section');
const fadeTags = document.querySelectorAll('.fade-in-up');

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
    
    // Reset if at top
    if (window.scrollY < 10) {
        header.classList.remove('scrolled-up');
    }

    lastScrollY = window.scrollY;
    
    // Update Active Link State
    updateActiveLink();
});

// --- 2. Mobile Menu Toggle ---
hamburger.addEventListener('click', toggleMenu);

function toggleMenu() {
    navLinks.parentElement.classList.toggle('nav-active');
    hamburger.classList.toggle('toggle');
    document.body.classList.toggle('no-scroll'); // Optional: prevent body scroll when menu is open
}

// Close menu when a link is clicked
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
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Observe Hero elements immediately
fadeTags.forEach(tag => {
    observer.observe(tag);
});

// Observe Sections for "Slide Up" effect
sections.forEach(section => {
    section.classList.add('fade-in-up'); // Ensure standard class is there
    observer.observe(section);
});


// --- 4. Smooth Scroll for Anchor Links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// --- 5. Update Active Link on Scroll ---
function updateActiveLink() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
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
