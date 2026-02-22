/* ============================================
   RELAX DORSET — Script
   ============================================ */

(function () {
    'use strict';

    // ========================================
    // Slideshow
    // ========================================

    function initSlideshow(slideshowEl) {
        var images = slideshowEl.querySelectorAll('img');
        var dotsContainer = slideshowEl.parentElement.querySelector('.slideshow-dots');

        if (!images.length || !dotsContainer) return;

        var currentIndex = 0;
        var interval;

        // Create dot navigation
        images.forEach(function (_, i) {
            var dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', 'Go to image ' + (i + 1));
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', function () { goTo(i); });
            dotsContainer.appendChild(dot);
        });

        var dots = dotsContainer.querySelectorAll('.dot');

        // Show first image
        images[0].classList.add('active');

        function goTo(index) {
            images[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');
            currentIndex = index;
            images[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
            resetInterval();
        }

        function next() {
            goTo((currentIndex + 1) % images.length);
        }

        function resetInterval() {
            clearInterval(interval);
            interval = setInterval(next, 4500);
        }

        // Pause on hover
        slideshowEl.addEventListener('mouseenter', function () {
            clearInterval(interval);
        });
        slideshowEl.addEventListener('mouseleave', resetInterval);

        resetInterval();
    }


    // ========================================
    // Scroll Reveal
    // ========================================

    function initScrollReveal() {
        var elements = document.querySelectorAll('[data-reveal]');

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -40px 0px'
            }
        );

        elements.forEach(function (el) {
            observer.observe(el);
        });
    }


    // ========================================
    // Hero Parallax
    // ========================================

    function initHeroParallax() {
        var hero = document.querySelector('.hero');
        var heroContent = hero ? hero.querySelector('.hero-content') : null;

        if (!hero || !heroContent) return;

        var ticking = false;

        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(function () {
                    var scrollY = window.scrollY;
                    var heroHeight = hero.offsetHeight;

                    if (scrollY < heroHeight) {
                        var progress = scrollY / heroHeight;
                        hero.style.backgroundPositionY = (scrollY * 0.35) + 'px';
                        heroContent.style.transform = 'translateY(' + (scrollY * 0.12) + 'px)';
                        heroContent.style.opacity = 1 - progress * 1.1;
                    }

                    ticking = false;
                });
                ticking = true;
            }
        });
    }


    // ========================================
    // Init
    // ========================================

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.slideshow').forEach(initSlideshow);
        initScrollReveal();
        initHeroParallax();
    });

})();