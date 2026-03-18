/**
 * Coelum9 Website - Main JavaScript
 * Vanilla ES6+ | No jQuery
 * Following UI UX Pro Max guidelines
 */

(function () {
    'use strict';

    // ─── DOM Ready ───────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        initHeaderScroll();
        initMobileMenu();
        initSmoothScroll();
        initScrollAnimations();
        initTestimonialSlider();
        initActiveNavLink();
    }

    // ─── 1. Header Scroll Effect ─────────────────────────────────
    function initHeaderScroll() {
        const header = document.querySelector('.header');
        if (!header) return;

        const scrollThreshold = 50;

        function onScroll() {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // ─── 2. Mobile Menu Toggle ───────────────────────────────────
    function initMobileMenu() {
        const toggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!toggle || !navMenu) return;

        function toggleMenu() {
            toggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        }

        function closeMenu() {
            toggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }

        toggle.addEventListener('click', toggleMenu);

        navLinks.forEach((link) => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });

        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !toggle.contains(e.target)) {
                closeMenu();
            }
        });
    }

    // ─── 3. Smooth Scroll ────────────────────────────────────────
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('a[href^="#"]');

        navLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                if (targetId === '#') return;

                const targetEl = document.querySelector(targetId);
                if (!targetEl) return;

                e.preventDefault();

                const header = document.querySelector('.header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth',
                });
            });
        });
    }

    // ─── 4. Scroll Animations (Fade In) ──────────────────────────
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in');
        if (!animatedElements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px',
            }
        );

        animatedElements.forEach((el) => observer.observe(el));
    }

    // ─── 5. Testimonial Slider ───────────────────────────────────
    function initTestimonialSlider() {
        const cards = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.nav-dot');

        if (!cards.length) return;

        let currentIndex = 0;
        let autoPlayInterval;
        const autoPlayDelay = 5000;

        function goToSlide(index) {
            if (index < 0) index = cards.length - 1;
            if (index >= cards.length) index = 0;

            currentIndex = index;

            cards.forEach((card, i) => {
                card.classList.toggle('active', i === currentIndex);
            });

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetAutoPlay();
            });
        });

        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }

        goToSlide(0);
        startAutoPlay();
    }

    // ─── 6. Active Nav Link ──────────────────────────────────────
    function initActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        if (!sections.length || !navLinks.length) return;

        function updateActiveLink() {
            const scrollPosition = window.scrollY;
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 0;

            let currentSection = '';

            sections.forEach((section) => {
                const sectionTop = section.offsetTop - headerHeight - 100;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinks.forEach((link) => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveLink, { passive: true });
        updateActiveLink();
    }

})();
