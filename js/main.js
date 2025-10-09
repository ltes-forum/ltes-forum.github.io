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
                <h4>Context</h4>
                <p>As countries prepare their third round of Nationally Determined Contributions (NDCs 3.0) in 2025, effective coordination between energy, climate, and finance ministries has become essential. Long-term energy scenarios (LTES) provide the analytical foundation for climate strategies, but their impact depends on whether results are taken up in national decision-making processes.</p>
                <p>Alignment ensures consistency in assumptions (GDP growth, population, fuel prices), highlights synergies (energy access and emission reductions), and reveals trade-offs (e.g. fiscal impacts of fossil fuel subsidy reform). Importantly, LTES can quantify investment needs and provide indicative fiscal envelopes, creating entry points for finance ministries to integrate transition costs into annual and medium-term budgets.</p>

                <h4>Objective</h4>
                <p>To identify practical mechanisms that ensure LTES outputs are systematically aligned with NDCs, LT-LEDS, and budget processes, and to highlight lessons on cross-ministerial coordination that strengthen planning ecosystems and credibility of climate commitments.</p>

                <h4>Expected Outcomes</h4>
                <ul>
                    <li>Examples of mechanisms used by countries to integrate LTES into NDCs and LT-LEDS (e.g. inter-ministerial review, planning committees, budget hooks)</li>
                    <li>Lessons on how finance ministries can be engaged through scenario-based investment signals and fiscal envelopes</li>
                    <li>Identification of common institutional barriers to alignment and how international partners can help address them</li>
                    <li>Recommendations for how LTES can directly inform NDC 3.0 preparation in 2025</li>
                </ul>
            `,
            runOfShow: `
                <p><em>Detailed session agenda and discussion questions will be shared with participants closer to the event date.</em></p>
            `
        },
        '2': {
            number: '2',
            meta: 'Day 1 • 11:45-13:15',
            title: 'Turning Grid Planning into Bankable Grid Pipelines',
            cohost: 'Co-host: Brazil - GCEP',
            concept: `
                <h4>Context</h4>
                <p>Transmission and distribution networks are among the most cited bottlenecks to scaling renewables for the clean energy transition. Governments use LTES to map where and when new grid capacity will be needed, but investors need more than long-term projections: they require specific signals that reduce uncertainty i.e. which corridors will advance, what costs are expected, and how risks will be managed.</p>
                <p>This session will explore how scenario-informed grid planning can generate such signals and how they are operationalized through institutional arrangements and financial instruments. It will examine which risks, from currency exposure and off-taker creditworthiness to permitting and political uncertainty, most constrain capital, and how allocation mechanisms are evolving to address them.</p>

                <h4>Objective</h4>
                <p>To identify how scenario-based grid planning can be translated into investor-relevant signals and risk allocation frameworks, and to distill practical lessons that inform GCEP recommendations.</p>

                <h4>Expected Outcomes</h4>
                <ul>
                    <li>Practical lessons on how LTES-based grid planning informed investor signals and project pipelines</li>
                    <li>Shared understanding of which risks most constrain private investment in grids, and which allocation options are under consideration</li>
                    <li>Insights into institutional steps (regulatory, financial, governance) that help translate planning outputs into bankable projects</li>
                    <li>Inputs to GCEP Workstream 1 (Planning to Investment) and, strategically, to the COP30 Action Agenda's goal of bridging ambition with implementation</li>
                </ul>
            `,
            runOfShow: `
                <p><em>Detailed session agenda and discussion questions will be shared with participants closer to the event date.</em></p>
            `
        },
        '3': {
            number: '3',
            meta: 'Day 1 • 14:15-15:45',
            title: 'Communicating Scenarios to Build Strong Public and Political Support',
            cohost: 'Co-host: Natural Resources Canada',
            concept: `
                <h4>Context</h4>
                <p>Scenarios are powerful tools for decision-making, but their value depends on how results are communicated and understood. Too often, scenario outputs remain confined to technical audiences, leaving untapped opportunities to build broader public and political support. Governments and institutions are finding that linking scenario insights to everyday concerns—household costs, employment, reliability of supply—makes them more accessible and compelling.</p>
                <p>This session will focus on how countries and organizations have turned complex modelling results into narratives that resonate. It will highlight strategies for framing costs and benefits, emphasizing social and economic opportunities, and showing how scenarios anticipate and manage risks. It will also present IRENA's participatory planning toolkit, which provides practical methods for engaging diverse stakeholders in scenario processes and co-developing narratives that inspire action.</p>

                <h4>Objective</h4>
                <p>To identify practical approaches for using LTES outputs and participatory processes to build public trust, political support, and shared ownership of the energy transition.</p>

                <h4>Expected Outcomes</h4>
                <ul>
                    <li>Lessons on framing scenario results to emphasize affordability, jobs, and reliability</li>
                    <li>Practical approaches for translating technical outputs into compelling narratives that resonate with non-expert audiences</li>
                    <li>Examples of partnerships and communication channels that amplified the reach and impact of scenario messages</li>
                    <li>Insights into participatory methods that strengthen ownership and legitimacy of scenario outcomes</li>
                </ul>
            `,
            runOfShow: `
                <p><em>Detailed session agenda and discussion questions will be shared with participants closer to the event date.</em></p>
            `
        },
        '4': {
            number: '4',
            meta: 'Day 1 • 16:15-17:45',
            title: 'Institutional Considerations for Adopting Modelling Tools',
            cohost: 'Co-host: GET.transform',
            concept: `
                <h4>Context</h4>
                <p>Many governments face the challenge of sustaining modelling capacity: skilled staff move on, funding cycles are short, and tool deployment takes longer than policy timelines allow. While open-source tools can reduce costs and increase transparency, they require governance arrangements to ensure they are maintained and used consistently across ministries.</p>
                <p>This session will bring together country representatives and experts to share practical experiences of institutionalizing modelling tools in their planning processes. The emphasis will be on governance solutions, such as creating permanent modelling units, building inter-ministerial structures, or developing partnerships that sustain capacity. By exchanging lessons, participants will identify strategies for building sovereign, adaptive planning systems that can inform long-term energy scenarios.</p>

                <h4>Objective</h4>
                <p>To identify governance and institutional strategies that help countries adopt and sustain modelling tools as part of their national planning ecosystems, ensuring resilience, transparency, and agility in scenario development.</p>

                <h4>Expected Outcomes</h4>
                <ul>
                    <li>Practical guidance on institutionalizing modelling capacity beyond individual projects or experts</li>
                    <li>Strategies to build collaborative ecosystems where modelling results are shared across ministries</li>
                    <li>Peer-to-peer exchange of approaches to address staff turnover, funding gaps, and deployment delays</li>
                    <li>Contributions to LTES Network workstreams on strengthening sovereign planning capacity</li>
                </ul>
            `,
            runOfShow: `
                <p><em>Detailed session agenda and discussion questions will be shared with participants closer to the event date.</em></p>
            `
        },
        '5': {
            number: '5',
            meta: 'Day 2 • 9:30-11:00',
            title: 'Addressing Supply Chain Uncertainties',
            cohost: 'Co-host: European Commission JRC',
            concept: `
                <h4>Context</h4>
                <p>Global supply chains for critical energy technologies—batteries, solar modules, electrolyzers, wind turbines, and other components—are increasingly exposed to geopolitical risks, trade disputes, and market concentration. Disruptions or bottlenecks in these supply chains can stall deployment, increase costs, and undermine transition strategies.</p>
                <p>Scenario-based planning offers governments a way to anticipate such risks. By embedding supply chain assumptions into long-term energy scenarios, planners can stress-test pathways, identify vulnerabilities, and assess credible alternatives. These include diversifying import sources, developing regional manufacturing capacity, or maintaining strategic reserves. Research institutions have begun to design methodologies to capture these uncertainties, while some countries are experimenting with incorporating resilience considerations into national planning.</p>

                <h4>Objective</h4>
                <p>To examine how LTES frameworks can be used to stress-test supply chain assumptions and translate insights into strategies that strengthen resilience, industrial policy, and regional cooperation.</p>

                <h4>Expected Outcomes</h4>
                <ul>
                    <li>Practical lessons on incorporating supply chain risks into scenario frameworks</li>
                    <li>Insights from countries on how LTES-informed analysis supports planning under uncertainty</li>
                    <li>Examples of methodological advances from research institutions to stress-test resilience options</li>
                    <li>Guidance on how policymakers can use scenario evidence to balance cost, resilience, and domestic capability</li>
                </ul>
            `,
            runOfShow: `
                <p><em>Detailed session agenda and discussion questions will be shared with participants closer to the event date.</em></p>
            `
        },
        '6': {
            number: '6',
            meta: 'Day 2 • 11:30-13:00',
            title: 'Addressing the Future of Digitalization Through Demand-side Planning',
            cohost: '',
            concept: `
                <h4>Context</h4>
                <p>Digitalization is becoming a structural driver of electricity demand. Data centers, AI computing clusters, and digital industrial hubs are expanding rapidly, often with concentrated siting and steep load profiles. If not anticipated, these loads risk creating bottlenecks for grids and delaying renewable integration.</p>
                <p>LTES processes provide governments with a way to bring digitalization into national energy planning. By capturing demand signals from industrial policy, technology adoption, and market forecasts, scenarios can stress-test system adequacy and identify investment needs well before demand surges materialize. This ensures that grid expansion, flexibility options, and siting decisions are prepared in advance, avoiding delays and cost escalation.</p>

                <h4>Objective</h4>
                <p>To explore how national LTES can anticipate and integrate digitalization-driven demand growth, enabling early infrastructure planning and aligning digital expansion with system decarbonization.</p>

                <h4>Expected Outcomes</h4>
                <ul>
                    <li>Practical examples of how digitalization signals are captured and integrated into scenario frameworks</li>
                    <li>Insights into how scenarios are being used to provide early investment signals for grids, flexibility, and siting</li>
                    <li>Lessons on governance and planning measures that help countries manage demand growth without slowing the energy transition</li>
                    <li>Contributions to the LTES Network dialogue on evolving scenario content to include new structural drivers of demand</li>
                </ul>
            `,
            runOfShow: `
                <p><em>Detailed session agenda and discussion questions will be shared with participants closer to the event date.</em></p>
            `
        },
        '7': {
            number: '7',
            meta: 'Day 2 • 14:00-15:15',
            title: 'Governing AI in Energy Planning',
            cohost: '',
            concept: `
                <h4>Context</h4>
                <p>Artificial Intelligence (AI) is increasingly present and influencing energy modelling and planning workflows. Research institutions and international organizations have tested and piloted applications ranging from grid optimization to AI-enhanced geospatial data, automated scenario analysis, and AI bots for training and capacity building. These pilots show AI potential to accelerate analysis and broaden scenario exploration, but they also expose challenges of trust, validation, data privacy, data quality, and explainability.</p>
                <p>For governments, the key question is not whether AI has potential, but what institutional conditions must exist to make adoption feasible, responsible, and aligned with national planning mandates. This session will focus on translating the lessons from early pilots into insights for governments: what institutional mandates, procurement rules, data policies, and validation practices would be needed to adopt AI responsibly and sustainably.</p>

                <h4>Objective</h4>
                <p>To identify governance conditions and institutional prerequisites that governments would need to adopt AI responsibly in energy planning, drawing lessons from pilots by research institutions and international organizations.</p>

                <h4>Expected Outcomes</h4>
                <ul>
                    <li>Identification of enablers (mandates, procurement, partnerships) and barriers (data quality, trust, validation gaps) to AI adoption in planning</li>
                    <li>Insights from pilots illustrating opportunities and risks</li>
                    <li>Practical recommendations for governments on building institutional capacity and governance frameworks for responsible AI adoption</li>
                    <li>Contributions to LTES dialogues on how emerging digital tools can be integrated into national planning ecosystems</li>
                </ul>
            `,
            runOfShow: `
                <p><em>Detailed session agenda and discussion questions will be shared with participants closer to the event date.</em></p>
            `
        },
        '8': {
            number: '8',
            meta: 'Day 2 • 15:45-17:00',
            title: 'Embedding Just Transition in National Scenario Frameworks',
            cohost: 'Co-host: Brazil - GCEP',
            concept: `
                <h4>Context</h4>
                <p>The Global LTES Network has consistently highlighted the role of scenarios as decision-support tools for governments navigating complex transitions. In many countries, just transition has emerged as a political and economic imperative; requiring policy packages that address labor market shifts, regional economic impacts, and social protection. Recent UNFCCC Just Transition Work Programme dialogues, including the fourth dialogue in Addis Ababa, stressed that transition pathways must be nationally defined, equity-based, and fiscally viable, with active participation of workers, communities, and vulnerable groups.</p>
                <p>This session will focus on how scenario frameworks can serve as anticipatory governance tools to operationalize these priorities. By embedding socioeconomic and equity dimensions in long-term planning, LTES approaches can help governments identify impacts before they materialize, quantify fiscal needs, and design policy measures that maintain support across political cycles.</p>

                <h4>Objective</h4>
                <p>To explore how long-term energy scenarios can be applied to design just transition strategies that are aligned with national development priorities, anticipate socioeconomic impacts, and support equitable and fiscally sustainable transitions.</p>

                <h4>Expected Outcomes</h4>
                <ul>
                    <li>Practical approaches for using LTES to embed equity, labor market, and regional economic considerations in national planning</li>
                    <li>Lessons on how scenario analysis can inform predictable multi-year financing frameworks for just transition measures</li>
                    <li>Insights on how evidence from scenarios can build and sustain cross-sector coalitions (government, labor, industry, communities) that protect just transition policies from political shifts</li>
                    <li>Contributions to the GCEP workstreams on "Planning-to-Investment" and "Technical & Implementation Capacity" by showing how just transition priorities can be integrated into scenario-based planning ecosystems</li>
                </ul>
            `,
            runOfShow: `
                <p><em>Detailed session agenda and discussion questions will be shared with participants closer to the event date.</em></p>
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
