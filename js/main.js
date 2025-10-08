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
        document.querySelectorAll('.session, .speaker-card, .document, .theme').forEach(el => {
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
     * Speaker Data - Add bios and details here
     */
    const speakerData = {
        'carlos-ruiz': {
            name: 'Carlos Ruiz Sanchez',
            title: 'Climate Action Expert',
            institution: 'UNFCCC',
            bio: 'Carlos Ruiz Sanchez is a leading expert in climate action and NDC implementation at the United Nations Framework Convention on Climate Change. He has extensive experience in supporting countries to align their energy planning with climate commitments and develop robust long-term strategies for the energy transition.'
        },
        'juan-garcia': {
            name: 'Juan Jose Garcia',
            title: 'Senior Energy Analyst',
            institution: 'IRENA',
            bio: 'Juan Jose Garcia leads IRENA\'s work on long-term energy scenarios and planning frameworks. He has been instrumental in developing the Global LTES Network and supporting countries in building capacity for scenario-based energy planning. His expertise spans renewable energy integration, policy analysis, and strategic planning.'
        },
        'stelios-grafakos': {
            name: 'Stelios Grafakos',
            title: 'Senior Climate Policy Advisor',
            institution: 'Global Green Growth Institute (GGGI)',
            bio: 'Dr. Stelios Grafakos specializes in climate policy and sustainable urban development. At GGGI, he works with governments to develop integrated climate and energy strategies that balance economic growth with environmental sustainability.'
        },
        'charlie-heaps': {
            name: 'Charlie Heaps',
            title: 'Director, Energy and Materials Program',
            institution: 'Stockholm Environment Institute',
            bio: 'Charlie Heaps leads SEI\'s Energy and Materials Program and is the principal developer of the LEAP energy planning software. He has over 30 years of experience in energy modeling and has trained thousands of energy planners worldwide in scenario-based energy planning methodologies.'
        },
        'sebastian-debia': {
            name: 'Sebastien Debia',
            title: 'Senior Energy Scenario Analyst',
            institution: 'Natural Resources Canada',
            bio: 'Sebastien Debia works on Canada\'s long-term energy scenarios and climate modeling frameworks. He specializes in stakeholder engagement and communication strategies for energy scenarios, ensuring that complex technical analysis translates into actionable policy insights.'
        },
        'lars-jensen': {
            name: 'Lars Georg Jensen',
            title: 'Chief Energy Analyst',
            institution: 'Danish Energy Agency',
            bio: 'Lars Georg Jensen leads Denmark\'s energy scenario development and modeling activities. He has played a key role in developing Denmark\'s pathway to 100% renewable energy and brings extensive experience in integrating just transition principles into long-term energy planning.'
        }
    };

    /**
     * Speakers Carousel Navigation
     */
    function initSpeakersCarousel() {
        const track = document.getElementById('speakersTrack');
        const viewport = track?.parentElement;
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const dotsContainer = document.getElementById('carouselDots');

        if (!track || !viewport || !prevBtn || !nextBtn) return;

        const cards = track.querySelectorAll('.speaker-card');
        if (cards.length === 0) return;

        let currentIndex = 0;
        let visibleCards = 1;
        let maxIndex = 0;
        let cardWidth = 0;

        function calculateDimensions() {
            const viewportWidth = viewport.offsetWidth;
            // Card is 220px + 24px gap (1.5rem)
            cardWidth = 220 + 24;
            visibleCards = Math.max(1, Math.floor(viewportWidth / cardWidth));
            maxIndex = Math.max(0, cards.length - visibleCards);
        }

        function createDots() {
            dotsContainer.innerHTML = ''; // Clear existing dots
            const numDots = Math.ceil(cards.length / visibleCards);
            for (let i = 0; i < numDots; i++) {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i * visibleCards));
                dotsContainer.appendChild(dot);
            }
        }

        function updateCarousel() {
            const offset = -currentIndex * cardWidth;
            track.style.transform = `translateX(${offset}px)`;

            // Update dots
            const dots = dotsContainer.querySelectorAll('.carousel-dot');
            const activeDotIndex = Math.floor(currentIndex / visibleCards);
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeDotIndex);
            });

            // Update button states
            prevBtn.style.opacity = currentIndex <= 0 ? '0.5' : '1';
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
            prevBtn.disabled = currentIndex <= 0;
            nextBtn.disabled = currentIndex >= maxIndex;
        }

        function goToSlide(index) {
            currentIndex = Math.max(0, Math.min(index, maxIndex));
            updateCarousel();
        }

        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - visibleCards);
        });

        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + visibleCards);
        });

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                calculateDimensions();
                createDots();
                currentIndex = Math.min(currentIndex, maxIndex);
                updateCarousel();
            }, 250);
        });

        // Initialize
        calculateDimensions();
        createDots();
        updateCarousel();
    }

    /**
     * Speaker Modal
     */
    function initSpeakerModal() {
        const modal = document.getElementById('speakerModal');
        const modalOverlay = document.getElementById('modalOverlay');
        const modalClose = document.getElementById('modalClose');
        const speakerCards = document.querySelectorAll('.speaker-card');

        if (!modal || !speakerCards.length) return;

        // Open modal
        speakerCards.forEach(card => {
            card.addEventListener('click', function() {
                const speakerId = this.getAttribute('data-speaker');
                const speaker = speakerData[speakerId];

                if (!speaker) return;

                // Populate modal
                document.getElementById('modalName').textContent = speaker.name;
                document.getElementById('modalTitle').textContent = speaker.title;
                document.getElementById('modalInstitution').textContent = speaker.institution;
                document.getElementById('modalBio').innerHTML = `<p>${speaker.bio}</p>`;

                // Handle image
                const img = this.querySelector('.speaker-card__image img');
                const modalImg = document.getElementById('modalImage');
                const modalPlaceholder = document.getElementById('modalPlaceholder');

                if (img && img.style.display !== 'none') {
                    modalImg.src = img.src;
                    modalImg.alt = img.alt;
                    modalImg.style.display = 'block';
                    modalPlaceholder.style.display = 'none';
                } else {
                    const placeholder = this.querySelector('.speaker-card__placeholder');
                    modalImg.style.display = 'none';
                    modalPlaceholder.textContent = placeholder.textContent;
                    modalPlaceholder.style.display = 'flex';
                }

                // Show modal
                modal.classList.add('is-open');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close modal
        function closeModal() {
            modal.classList.remove('is-open');
            document.body.style.overflow = '';
        }

        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('is-open')) {
                closeModal();
            }
        });
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
        initSpeakerModal();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
