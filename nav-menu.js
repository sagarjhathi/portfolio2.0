// Mobile navigation: open/close, backdrop, Escape key, scroll lock.
// Shared by the homepage and the project pages.
(function () {
    var burger = document.querySelector('.hamburger');
    var navbar = document.querySelector('.navbar');
    if (!burger || !navbar) return;

    var backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);

    function isOpen() {
        return navbar.classList.contains('nav-active');
    }

    function setOpen(open) {
        navbar.classList.toggle('nav-active', open);
        burger.classList.toggle('toggle', open);
        burger.setAttribute('aria-expanded', String(open));
        document.body.classList.toggle('no-scroll', open);
        backdrop.classList.toggle('show', open);
    }

    burger.addEventListener('click', function () {
        setOpen(!isOpen());
    });

    burger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen(!isOpen());
        }
    });

    backdrop.addEventListener('click', function () {
        setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isOpen()) {
            setOpen(false);
            burger.focus();
        }
    });

    document.querySelectorAll('.nav-links a').forEach(function (link) {
        link.addEventListener('click', function () {
            if (isOpen()) setOpen(false);
        });
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && isOpen()) setOpen(false);
    });
})();
