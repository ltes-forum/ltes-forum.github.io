/**
 * IRENA LTES Forum - Main JavaScript
 * Professional interactions and functionality
 */

(function() {
    'use strict';

    // DOM Elements
    const mobileToggle = document.getElementById('mobileToggle');
    const navList = document.getElementById('navList');
    const navLinks = document.querySelectorAll('.nav__link');

    /**
     * Mobile Navigation Toggle
     */
    function initMobileNav() {
        if (!mobileToggle || !navList) return;

        mobileToggle.addEventListener('click', function() {
            const isActive = navList.classList.toggle('is-active');
            this.setAttribute('aria-expanded', isActive);
            this.querySelector('span').textContent = isActive ? '✕' : '☰';
        });

        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navList.classList.remove('is-active');
                if (mobileToggle) {
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    mobileToggle.querySelector('span').textContent = '☰';
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.header') && navList.classList.contains('is-active')) {
                navList.classList.remove('is-active');
                if (mobileToggle) {
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    mobileToggle.querySelector('span').textContent = '☰';
                }
            }
        });
    }

    /**
     * Smooth Scrolling for Anchor Links
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 72; // Header height
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    /**
     * Update Live Stream Badge
     */
    function updateLiveBadge() {
        const badge = document.querySelector('.video__badge span:last-child');
        if (!badge) return;

        const now = new Date();
        const eventStart = new Date('2025-10-29');
        const eventEnd = new Date('2025-10-30T23:59:59');

        if (now >= eventStart && now <= eventEnd) {
            badge.textContent = 'Live Now';
        } else if (now < eventStart) {
            badge.textContent = 'Upcoming';
        } else {
            badge.textContent = 'Replay Available';
        }
    }

    /**
     * Intersection Observer for Scroll Animations
     */
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe session cards
        document.querySelectorAll('.session, .speaker, .document, .theme').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    /**
     * Active Navigation Link
     */
    function initActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');

        function updateActiveLink() {
            let currentSection = '';
            const scrollPosition = window.pageYOffset + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('is-active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('is-active');
                }
            });
        }

        window.addEventListener('scroll', updateActiveLink);
        updateActiveLink(); // Initial check
    }

    /**
     * Speakers Carousel Navigation
     */
    function initSpeakersCarousel() {
        const carousel = document.getElementById('speakersCarousel');
        const leftBtn = document.getElementById('speakersScrollLeft');
        const rightBtn = document.getElementById('speakersScrollRight');

        if (!carousel || !leftBtn || !rightBtn) return;

        const scrollAmount = 320; // Card width (300px) + gap (20px)

        leftBtn.addEventListener('click', function() {
            carousel.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        rightBtn.addEventListener('click', function() {
            carousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Update button states based on scroll position
        function updateButtonStates() {
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;
            leftBtn.style.opacity = carousel.scrollLeft <= 0 ? '0.3' : '1';
            rightBtn.style.opacity = carousel.scrollLeft >= maxScroll - 1 ? '0.3' : '1';
            leftBtn.disabled = carousel.scrollLeft <= 0;
            rightBtn.disabled = carousel.scrollLeft >= maxScroll - 1;
        }

        carousel.addEventListener('scroll', updateButtonStates);
        updateButtonStates(); // Initial state
    }

    /**
     * Initialize all functions on DOM ready
     */
    function init() {
        initMobileNav();
        initSmoothScroll();
        updateLiveBadge();
        initScrollAnimations();
        initActiveNavLink();
        initSpeakersCarousel();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
