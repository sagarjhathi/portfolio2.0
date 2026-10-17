(function () {
    document.documentElement.classList.add('js');

    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('in');
                    io.unobserve(e.target);
                }
            });
        }, { threshold: 0.08 });
        reveals.forEach(function (el) { io.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add('in'); });
    }

    var links = document.querySelectorAll('.pp-toc a[href^="#"]');
    var map = [];
    links.forEach(function (a) {
        var s = document.querySelector(a.getAttribute('href'));
        if (s) map.push({ a: a, s: s });
    });
    if (!map.length) return;

    function spy() {
        var y = window.scrollY + 140;
        var cur = null;
        map.forEach(function (m) { if (m.s.offsetTop <= y) cur = m; });
        links.forEach(function (a) { a.classList.remove('active'); });
        if (cur) {
            cur.a.classList.add('active');
            var box = cur.a.parentElement;
            box.scrollLeft = cur.a.offsetLeft - box.clientWidth / 2 + cur.a.clientWidth / 2;
        }
    }
    window.addEventListener('scroll', spy, { passive: true });
    spy();
})();
