// Header behaviour for the project pages: hide on scroll down, show on scroll up,
// and a scroll progress bar. (The homepage does this in script.js.)
(function () {
    var header = document.querySelector('.header');
    if (!header) return;

    var progress = document.getElementById('scrollProgress');
    var last = window.scrollY;

    function onScroll() {
        var y = window.scrollY;

        if (y > last && y > 100) {
            header.classList.add('scrolled-down');
            header.classList.remove('scrolled-up');
            document.body.classList.remove('header-shown');
        } else {
            header.classList.remove('scrolled-down');
            header.classList.add('scrolled-up');
            document.body.classList.add('header-shown');
        }

        if (y < 10) {
            header.classList.remove('scrolled-up');
            document.body.classList.remove('header-shown');
        }

        last = y;

        if (progress) {
            var max = document.documentElement.scrollHeight - window.innerHeight;
            progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();
