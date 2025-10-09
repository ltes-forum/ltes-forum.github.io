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
     * Session Data - Content from session concept notes
     * Content should be populated from files in "Relevant info/01_Concept and Agenda/Session concept notes/"
     */
    const sessionData = {
        '1': {
            number: '1',
            meta: 'Day 1 • 9:30-11:15',
            title: 'Long-term Energy Scenarios Frameworks and NDC Alignment in Practice',
            cohost: 'Co-host: UNFCCC',
            concept: `
                <p>This session explores how countries integrate long-term energy scenario planning with their Nationally Determined Contributions (NDCs) and climate commitments.</p>
                <p>Practitioners will share experiences on aligning energy modeling frameworks with international climate goals, discussing challenges and best practices in creating coherent, actionable pathways for the energy transition.</p>
                <h4>Key Discussion Points:</h4>
                <ul>
                    <li>Integration of LTES with NDCs and long-term climate strategies</li>
                    <li>Methodological approaches for alignment</li>
                    <li>Case studies from member countries</li>
                    <li>Tools and frameworks for effective coordination</li>
                </ul>
            `,
            runOfShow: `
                <p><strong>Source file:</strong> Session 1_LTES frameworks and NDC alignment in practice_Agenda.docx</p>
                <p><em>Please populate this section with the run of show from the session file.</em></p>
            `
        },
        '2': {
            number: '2',
            meta: 'Day 1 • 11:45-13:15',
            title: 'Turning Grid Planning into Bankable Grid Pipelines',
            cohost: 'Co-host: Brazil - GCEP',
            concept: `
                <p>This session examines the critical bridge between energy scenario planning and investment mobilization.</p>
                <p>Focus on translating long-term grid expansion plans into concrete, financeable infrastructure projects that attract private and public investment.</p>
                <h4>Key Discussion Points:</h4>
                <ul>
                    <li>From planning to bankable projects</li>
                    <li>De-risking strategies for grid infrastructure</li>
                    <li>Engaging financial institutions</li>
                    <li>Success stories and lessons learned</li>
                </ul>
            `,
            runOfShow: `
                <p><strong>Source file:</strong> Session 2_Planning to Investment_Agenda.docx</p>
                <p><em>Please populate this section with the run of show from the session file.</em></p>
            `
        },
        '3': {
            number: '3',
            meta: 'Day 1 • 14:15-15:45',
            title: 'Communicating Scenarios to Build Strong Public and Political Support',
            cohost: 'Co-host: Natural Resources Canada',
            concept: `
                <p>This session addresses the challenge of effectively communicating complex energy scenarios to diverse stakeholders.</p>
                <p>Explores strategies for transparent communication, stakeholder engagement, and building public trust in energy transition pathways.</p>
                <h4>Key Discussion Points:</h4>
                <ul>
                    <li>Communication strategies for different audiences</li>
                    <li>Visualization and data presentation techniques</li>
                    <li>Stakeholder engagement best practices</li>
                    <li>Building trust and credibility</li>
                </ul>
            `,
            runOfShow: `
                <p><strong>Source file:</strong> Session 3_Communicating scenarios _Agenda.docx</p>
                <p><em>Please populate this section with the run of show from the session file.</em></p>
            `
        },
        '4': {
            number: '4',
            meta: 'Day 1 • 16:15-17:45',
            title: 'Institutional Considerations for Adopting Modelling Tools',
            cohost: 'Co-host: GET.transform',
            concept: `
                <p>This session discusses practical aspects of selecting and implementing energy modeling tools within government institutions.</p>
                <p>Focus on open-source solutions, capacity building, and creating sustainable in-house modeling capabilities.</p>
                <h4>Key Discussion Points:</h4>
                <ul>
                    <li>Tool selection criteria and considerations</li>
                    <li>Open-source vs. proprietary solutions</li>
                    <li>Capacity building strategies</li>
                    <li>Institutional arrangements for sustained modeling capabilities</li>
                </ul>
            `,
            runOfShow: `
                <p><strong>Source file:</strong> Session 4_Adopting Modelling Tools_Agenda.docx</p>
                <p><em>Please populate this section with the run of show from the session file.</em></p>
            `
        },
        '5': {
            number: '5',
            meta: 'Day 2 • 9:30-11:00',
            title: 'Addressing Supply Chain Uncertainties',
            cohost: 'Co-host: European Commission JRC',
            concept: `
                <p>This session explores how to incorporate supply chain risks and uncertainties into long-term energy planning.</p>
                <p>Addresses critical mineral dependencies, technology supply constraints, and strategies for building resilient energy supply chains.</p>
                <h4>Key Discussion Points:</h4>
                <ul>
                    <li>Critical materials and supply chain vulnerabilities</li>
                    <li>Modeling supply chain constraints</li>
                    <li>Diversification strategies</li>
                    <li>Building resilience into energy plans</li>
                </ul>
            `,
            runOfShow: `
                <p><strong>Source file:</strong> Session 5_Supply Chain Uncertainties_Agenda.docx</p>
                <p><em>Please populate this section with the run of show from the session file.</em></p>
            `
        },
        '6': {
            number: '6',
            meta: 'Day 2 • 11:30-13:00',
            title: 'Addressing the Future of Digitalization Through Demand-side Planning',
            cohost: '',
            concept: `
                <p>This session examines the rapidly evolving energy demand landscape driven by digitalization.</p>
                <p>Focus on integrating data centers, AI infrastructure, and smart systems into long-term scenario planning.</p>
                <h4>Key Discussion Points:</h4>
                <ul>
                    <li>Impact of digitalization on energy demand</li>
                    <li>Modeling AI and data center energy requirements</li>
                    <li>Demand-side management opportunities</li>
                    <li>Integration with supply-side planning</li>
                </ul>
            `,
            runOfShow: `
                <p><strong>Source file:</strong> Session 6_digitalization through demand-side planning_Agenda.docx</p>
                <p><em>Please populate this section with the run of show from the session file.</em></p>
            `
        },
        '7': {
            number: '7',
            meta: 'Day 2 • 14:00-15:15',
            title: 'Governing AI in Energy Planning',
            cohost: '',
            concept: `
                <p>This session discusses the opportunities and challenges of using artificial intelligence in energy scenario planning.</p>
                <p>Addresses governance frameworks, data quality requirements, and ensuring transparency in AI-assisted energy planning.</p>
                <h4>Key Discussion Points:</h4>
                <ul>
                    <li>AI applications in energy planning</li>
                    <li>Governance and transparency requirements</li>
                    <li>Data quality and validation</li>
                    <li>Ethical considerations and limitations</li>
                </ul>
            `,
            runOfShow: `
                <p><strong>Source file:</strong> Session 7_AI in Energy Planning_Agenda.docx</p>
                <p><em>Please populate this section with the run of show from the session file.</em></p>
            `
        },
        '8': {
            number: '8',
            meta: 'Day 2 • 15:45-17:00',
            title: 'Embedding Just Transition in National Scenario Frameworks',
            cohost: 'Co-host: Brazil - GCEP',
            concept: `
                <p>This session focuses on integrating social equity and just transition principles into energy scenario planning.</p>
                <p>Explores methodologies for assessing employment impacts, community effects, and ensuring inclusive energy transitions.</p>
                <h4>Key Discussion Points:</h4>
                <ul>
                    <li>Just transition frameworks and principles</li>
                    <li>Modeling employment and social impacts</li>
                    <li>Stakeholder engagement for inclusive planning</li>
                    <li>Policy measures to support affected communities</li>
                </ul>
            `,
            runOfShow: `
                <p><strong>Source file:</strong> Session 8_Just Transition_Agenda.docx</p>
                <p><em>Please populate this section with the run of show from the session file.</em></p>
            `
        }
    };

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
     * Session Modal
     */
    function initSessionModal() {
        const modal = document.getElementById('sessionModal');
        const modalOverlay = document.getElementById('sessionModalOverlay');
        const modalClose = document.getElementById('sessionModalClose');
        const sessionCards = document.querySelectorAll('.session--clickable');

        if (!modal || !sessionCards.length) return;

        // Open modal
        sessionCards.forEach(card => {
            card.addEventListener('click', function() {
                const sessionId = this.getAttribute('data-session');
                const session = sessionData[sessionId];

                if (!session) return;

                // Populate modal
                document.getElementById('sessionModalNumber').textContent = session.number;
                document.getElementById('sessionModalMeta').textContent = session.meta;
                document.getElementById('sessionModalTitle').textContent = session.title;

                const cohostElement = document.getElementById('sessionModalCohost');
                if (session.cohost) {
                    cohostElement.textContent = session.cohost;
                    cohostElement.style.display = 'block';
                } else {
                    cohostElement.style.display = 'none';
                }

                document.getElementById('sessionModalConcept').innerHTML = session.concept;
                document.getElementById('sessionModalRunOfShow').innerHTML = session.runOfShow;

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
        initSessionModal();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
