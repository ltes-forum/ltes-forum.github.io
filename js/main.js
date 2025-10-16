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
     * Countdown Timer
     */
    function initCountdown() {
        const countdownEl = document.getElementById('countdown');
        if (!countdownEl) return;

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        const labelEl = countdownEl.querySelector('.countdown__label');

        // Event start date: October 29, 2025, 9:00 AM CET (UTC+1)
        // Note: October is in Standard Time (CET), not Daylight Time (CEST)
        const eventDate = new Date('2025-10-29T09:00:00+01:00');

        function updateCountdown() {
            const now = new Date();
            const diff = eventDate - now;

            if (diff <= 0) {
                // Event has started
                countdownEl.classList.add('countdown--finished');
                labelEl.textContent = 'Event is Live Now! 🎉';
                return;
            }

            // Calculate time remaining
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            // Update display with leading zeros
            daysEl.textContent = String(days).padStart(2, '0');
            hoursEl.textContent = String(hours).padStart(2, '0');
            minutesEl.textContent = String(minutes).padStart(2, '0');
            secondsEl.textContent = String(seconds).padStart(2, '0');
        }

        // Update immediately and then every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
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

        // Observe session cards (exclude speaker-card to avoid carousel interference)
        document.querySelectorAll('.session, .document, .theme, .publication').forEach(el => {
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
                <p>This session will examine institutional approaches for aligning LTES with NDCs, LT-LEDS, and financial planning. Presentations will set the scene with insights from Brazil (COP30 host), UNFCCC, and IRENA's new report on aligning LTES and LT-LEDS. Two panels will follow: one with countries sharing how they engage finance and environment ministries in scenario-driven planning, and one with international organizations reflecting on how to support countries in addressing bottlenecks and preparing NDC 3.0.</p>

                <h4>Objective</h4>
                <p>To identify practical mechanisms that ensure LTES outputs are systematically aligned with NDCs, LT-LEDS, and budget processes, and to highlight lessons on cross-ministerial coordination that strengthen planning ecosystems and credibility of climate commitments.</p>

                <h4>Expected Outcomes</h4>
                <ul>
                    <li>Examples of mechanisms used by countries to integrate LTES into NDCs and LT-LEDS (e.g. inter-ministerial review, planning committees, budget hooks).</li>
                    <li>Lessons on how finance ministries can be engaged through scenario-based investment signals and fiscal envelopes.</li>
                    <li>Identification of common institutional barriers to alignment and how international partners can help address them.</li>
                    <li>Recommendations for how LTES can directly inform NDC 3.0 preparation in 2025.</li>
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
                <p>The Global Coalition for Energy Planning (GCEP) consultation process identified three core investor needs that must be addressed to unlock private capital: speed (particularly in permitting and project approval), certainty (through long-term policy frameworks and clear regulatory signals), and bankability (via transparent risk allocation and revenue mechanisms). Grid infrastructure planning sits at the critical intersection between national energy scenarios and utility-level investment decisions—a gap that stakeholders identified as a major implementation barrier.</p>
                <p>A critical challenge in bridging this gap is translating the economic case for grid infrastructure, demonstrated through planning scenarios and cost-benefit analyses, into the investment case that financial actors require. While long-term energy scenarios establish the economic rationale for grid expansion, investors need this translated into specific financial models, risk-return profiles, revenue certainty, and bankable project structures.</p>
                <p>This session will explore how scenario-informed grid planning can generate these investor-relevant signals and how they are operationalized through institutional arrangements, risk allocation mechanisms, and financial instruments. It will examine which risks most constrain capital and how data transparency, coordination mechanisms, and innovative financing approaches are evolving to address them.</p>
                <p>The session will generate insights that inform the Global Coalition for Energy Planning's work on Planning to Investment. These outputs will also contribute to COP30 Action Agenda priorities under Axis 1 (Transitioning Energy, Industry and Transport), particularly the objectives of tripling renewables and mobilizing finance, and to cross-cutting enablers on climate finance and institutional strengthening.</p>

                <h4>Objective</h4>
                <p>To identify how scenario-based grid planning can be translated into investor-relevant signals and risk allocation frameworks, and to distill practical lessons that inform GCEP recommendations on bridging the gap between economic cases and investment cases.</p>

                <h4>Expected Outcomes</h4>
                <ul>
                    <li>Practical lessons on how LTES-based grid planning can be translated into the financial metrics and signals that investors require.</li>
                    <li>Shared understanding of which risks most constrain private investment in grids, how perceived risks differ from actual risks, and which allocation mechanisms are proving effective.</li>
                    <li>Insights into institutional coordination mechanisms (between planning agencies, grid operators, and financial authorities) that help translate planning outputs into bankable projects.</li>
                    <li>Understanding of how data transparency and outcome measurement can reduce investor uncertainty and conservative capital allocation.</li>
                    <li>Inputs to GCEP Workstream 1 (Planning to Investment) and, strategically, to the COP30 Action Agenda's goal of bridging ambition with implementation.</li>
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
                <p>Scenarios are powerful tools for decision-making, but their value depends on how results are communicated and understood. Yet before communicating scenarios, it is essential to recognize that both scenario developers and their audiences bring biases, preconceptions, and priorities that shape how scenarios are created and received. Too often, scenario outputs remain confined to technical audiences, leaving untapped opportunities to build broader public and political support. Governments and institutions are finding that by first acknowledging different perspectives and priorities, then linking scenario insights to everyday concerns—household costs, employment, reliability of supply—they make scenarios more accessible and compelling.</p>
                <p>This session will begin by exploring how to surface and address the assumptions, biases, and priorities that scenario developers bring to their work, as well as the diverse preconceptions and concerns that different stakeholder groups hold about the energy transition. It will then focus on how countries and organizations have turned complex modelling results into narratives that resonate. It will highlight strategies for framing costs and benefits, emphasizing social and economic opportunities, and showing how scenarios anticipate and manage risks. It will also present IRENA's participatory planning toolkit, which provides practical methods for engaging diverse stakeholders in scenario processes and co-developing narratives that inspire action.</p>

                <h4>Objective</h4>
                <p>To identify practical approaches for surfacing biases and priorities in scenario development, using LTES outputs and participatory processes to build public trust, political support, and shared ownership of the energy transition.</p>

                <h4>Expected Outcomes</h4>
                <ul>
                    <li>Methods for identifying and addressing biases, assumptions, and priorities among scenario developers and diverse stakeholder groups.</li>
                    <li>Lessons on framing scenario results to emphasize affordability, jobs, and reliability.</li>
                    <li>Practical approaches for translating technical outputs into compelling narratives that resonate with non-expert audiences.</li>
                    <li>Examples of partnerships and communication channels that amplified the reach and impact of scenario messages.</li>
                    <li>Insights into participatory methods that strengthen ownership and legitimacy of scenario outcomes.</li>
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
                <p>This roundtable will focus on how countries have embedded open-source and other modelling tools into their planning systems. Participants will share approaches to retain skills, manage staff turnover, and operationalize tools quickly enough to inform planning cycles. The discussion will emphasize governance and institutional ecosystems, i.e. how models are made permanent parts of planning.</p>

                <h4>Objective</h4>
                <p>To identify governance and institutional strategies that help countries adopt and sustain modelling tools as part of their national planning ecosystems, ensuring resilience, transparency, and agility in scenario development.</p>

                <h4>Expected Outcomes</h4>
                <ul>
                    <li>Practical guidance on institutionalizing modelling capacity beyond individual projects or experts.</li>
                    <li>Strategies to build collaborative ecosystems where modelling results are shared across ministries.</li>
                    <li>Peer-to-peer exchange of approaches to address staff turnover, funding gaps, and deployment delays.</li>
                    <li>Contributions to LTES Network workstreams on strengthening sovereign planning capacity.</li>
                </ul>
            `,
            runOfShow: `
                <p><em>Detailed session agenda and discussion questions will be shared with participants closer to the event date.</em></p>
            `
        },
        '5': {
            number: '5',
            meta: 'Day 2 • 9:45-11:15',
            title: 'Addressing Supply Chain Uncertainties',
            cohost: 'Co-host: European Commission JRC',
            concept: `
                <h4>Context</h4>
                <p>Global supply chains for critical energy technologies—batteries, solar modules, electrolyzers, wind turbines, and related components—are increasingly exposed to geopolitical risks, trade disputes, and market concentration. Disruptions or bottlenecks can delay deployment, raise costs, and undermine national transition strategies.</p>
                <p>Beneath these technology chains lies a deeper dependency on critical materials such as lithium, copper, nickel, and rare earth elements. While geological reserves are generally sufficient, refining and manufacturing are heavily concentrated in a few regions, and new capacity requires long lead times. These constraints make material supply a potential bottleneck for the speed of the transition rather than for energy security itself.</p>
                <p>Governments therefore need planning frameworks able to stress-test supply and technology pathways under different risk conditions. LTES processes can integrate supply-chain assumptions, assess timing mismatches, and explore strategic responses such as diversification of import sources, regional manufacturing, and circular-economy measures. Scenario results can also inform industrial and trade policies, investment prioritization, and regional cooperation strategies.</p>
                <p>The session will explore how scenario-based planning helps governments anticipate and manage supply-chain and critical-materials risks by embedding key assumptions into national transition pathways, stress-testing vulnerabilities, and identifying credible backup options. It will highlight how scenario results can inform industrial, trade, and investment policies, improve coordination across ministries, and support clear communication of resilience and cost trade-offs to decision-makers and the public.</p>

                <h4>Objective</h4>
                <p>To explore how long-term energy scenarios (LTES) can anticipate supply-chain and critical-materials risks and to translate these insights into policy choices on diversification, domestic capability, and regional cooperation.</p>

                <h4>Expected Outcomes</h4>
                <ul>
                    <li>Practical lessons on incorporating supply chain risks into scenario frameworks.</li>
                    <li>Insights from countries on how LTES-informed analysis supports planning under uncertainty.</li>
                    <li>Examples of methodological advances from research institutions to stress-test resilience options.</li>
                    <li>Guidance on how policymakers can use scenario evidence to balance cost, resilience, and domestic capability.</li>
                </ul>
            `,
            runOfShow: `
                <p><em>Detailed session agenda and discussion questions will be shared with participants closer to the event date.</em></p>
            `
        },
        '6': {
            number: '6',
            meta: 'Day 2 • 11:45-13:15',
            title: 'Addressing the Future of Digitalization Through Demand-side Planning',
            cohost: '',
            concept: `
                <h4>Context</h4>
                <p>Digitalization is becoming a structural driver of electricity demand. Data centers, AI computing clusters, and digital industrial hubs are expanding rapidly, often with concentrated siting and steep load profiles. If not anticipated, these loads risk creating bottlenecks for grids and delaying renewable integration.</p>
                <p>LTES processes provide governments with a way to bring digitalization into national energy planning. By capturing demand signals from industrial policy, technology adoption, and market forecasts, scenarios can stress-test system adequacy and identify investment needs well before demand surges materialize. This ensures that grid expansion, flexibility options, and siting decisions are prepared in advance, avoiding delays and cost escalation.</p>
                <p>This session will bring together experiences from countries and research institutions that have begun incorporating digitalization trends into their planning. The discussion will focus on what data and institutional processes are needed, what planning and governance measures are effective, and how scenario frameworks can keep pace with rapidly evolving digital sectors.</p>

                <h4>Objective</h4>
                <p>To explore how national LTES can anticipate and integrate digitalization-driven demand growth, enabling early infrastructure planning and aligning digital expansion with system decarbonization.</p>

                <h4>Expected Outcomes</h4>
                <ul>
                    <li>Practical examples of how digitalization signals are captured and integrated into scenario frameworks.</li>
                    <li>Insights into how scenarios are being used to provide early investment signals for grids, flexibility, and siting.</li>
                    <li>Lessons on governance and planning measures that help countries manage demand growth without slowing the energy transition.</li>
                    <li>Contributions to the LTES Network dialogue on evolving scenario content to include new structural drivers of demand.</li>
                </ul>
            `,
            runOfShow: `
                <p><em>Detailed session agenda and discussion questions will be shared with participants closer to the event date.</em></p>
            `
        },
        '7': {
            number: '7',
            meta: 'Day 2 • 14:15-15:30',
            title: 'Governing AI in Energy Planning',
            cohost: '',
            concept: `
                <h4>Context</h4>
                <p>Artificial Intelligence (AI) is increasingly present and influencing energy modelling and planning workflows. Research institutions and international organizations have tested and piloted applications ranging from grid optimization to AI-enhanced geospatial data, automated scenario analysis, and AI bots for training and capacity building. These pilots show AI potential to accelerate analysis and broaden scenario exploration, but they also expose challenges of trust, validation, data privacy, data quality, and explainability.</p>
                <p>For governments, the key question is not whether AI has potential, but what institutional conditions must exist to make adoption feasible, responsible, and aligned with national planning mandates. Different AI applications—from real-time grid operations to long-term scenario analysis—require different governance approaches, data standards, and validation practices. This session will focus on translating lessons from early pilots into actionable insights for governments: what institutional mandates, procurement rules, data policies, cross-ministerial coordination mechanisms, and validation practices would be needed to adopt AI responsibly and sustainably.</p>

                <h4>Objective</h4>
                <p>To identify governance conditions and institutional prerequisites that governments would need to adopt AI responsibly in energy planning, drawing lessons from pilots by research institutions and international organizations.</p>

                <h4>Expected Outcomes</h4>
                <ul>
                    <li>Identification of enablers (mandates, procurement, partnerships) and barriers (data quality, trust, validation gaps) to AI adoption in planning.</li>
                    <li>Insights from pilots illustrating opportunities and risks.</li>
                    <li>Practical recommendations for governments on building institutional capacity and governance frameworks for responsible AI adoption.</li>
                    <li>Contributions to LTES dialogues on how emerging digital tools can be integrated into national planning ecosystems.</li>
                </ul>
            `,
            runOfShow: `
                <p><em>Detailed session agenda and discussion questions will be shared with participants closer to the event date.</em></p>
            `
        },
        '8': {
            number: '8',
            meta: 'Day 2 • 16:00-17:15',
            title: 'Embedding Just Transition in National Scenario Frameworks',
            cohost: 'Co-host: Brazil - GCEP',
            concept: `
                <h4>Context</h4>
                <p>The Global LTES Network has consistently highlighted the role of scenarios as decision-support tools for governments navigating complex transitions. In many countries, just transition has emerged as a political and economic imperative; requiring policy packages that address labor market shifts, regional economic impacts, and social protection. Recent UNFCCC Just Transition Work Programme dialogues, including the fourth dialogue in Addis Ababa, stressed that transition pathways must be nationally defined, equity-based, and fiscally viable, with active participation of workers, communities, and vulnerable groups.</p>
                <p>This session will focus on how scenario frameworks can serve as anticipatory governance tools to operationalize these priorities. By embedding socioeconomic and equity dimensions in long-term planning, LTES approaches can help governments identify impacts before they materialize, quantify fiscal needs, and design policy measures that maintain support across political cycles. The discussion will link national scenario practice to broader just transition processes under the UNFCCC and provide inputs for the Global Coalition for Energy Planning (GCEP), which seeks to bridge planning with finance and inclusion.</p>

                <h4>Objective</h4>
                <p>To explore how long-term energy scenarios can be applied to design just transition strategies that are aligned with national development priorities, anticipate socioeconomic impacts, and support equitable and fiscally sustainable transitions.</p>

                <h4>Expected Outcomes</h4>
                <ul>
                    <li>Practical approaches for using LTES to embed equity, labor market, and regional economic considerations in national planning.</li>
                    <li>Lessons on how scenario analysis can inform predictable multi-year financing frameworks for just transition measures.</li>
                    <li>Insights on how evidence from scenarios can build and sustain cross-sector coalitions (government, labor, industry, communities) that protect just transition policies from political shifts.</li>
                    <li>Contributions to the GCEP workstreams on "Planning-to-Investment" and "Technical & Implementation Capacity" by showing how just transition priorities can be integrated into scenario-based planning ecosystems.</li>
                </ul>
            `,
            runOfShow: `
                <p><em>Detailed session agenda and discussion questions will be shared with participants closer to the event date.</em></p>
            `
        }
    };

    /**
     * Speaker Data - Complete bios for all speakers
     */
    const speakerData = {
        'adrian-gonzalez': {
            name: 'Adrian Gonzalez',
            title: 'Programme Officer Innovation and End-use sectors',
            institution: 'International Renewable Energy Agency IITC',
            bio: "Adrian Gonzalez works within the International Renewable Energy Agency, IRENA, as leading Programme Officer on Innovation and End-use sectors, where he promotes global accelerated deployment of renewable energy through systemic innovation. Adrian is a passionate energy transition professional, with background in electrical and industrial engineering, and holder of an Executive MBA on the energy sector. He became a power system expert by working +10 years as power system manager in the Spanish TSO, REE, and later as senior specialist for the European Network of the Transmission System Operators for Electricity (ENTSO-E). He also founded and led during 6 years the innovation and renewable energy consultancy firm Inaltaria."
        },
        'ali-ahmed-ali': {
            name: 'Ali Ahmed Ali',
            title: 'Director of International Cooperation Department',
            institution: 'Ministry of Electricity and Renewable Energy, Egypt',
            bio: "Mr. Ali Ahmed Ali is the Director of the International Cooperation Department at Egypt's Ministry of Electricity and Renewable Energy. With over 20 years of experience, he has built a multidisciplinary career in energy, renewable energy (RE), energy strategy, project finance, and international cooperation. Since 2008, Ali has contributed to Egypt's energy policy development as a member of the national energy strategy workgroup. He also serves as a lead expert in the IRENA/ADFD panel for project facilitation since 2018. In his role, Ali is actively involved in developing cooperation and financing networks for RE and energy efficiency projects, working with government, regional entities, and financial institutions. He also leads efforts in formulating and negotiating funding agreements for Egyptian electricity and renewable energy projects. In 2009, Ali co-founded the Egyptian Community for Energy Efficiency and Renewables (ECSEERE) to provide consultation, training, and awareness in RE and energy efficiency."
        },
        'alvin-jose': {
            name: 'Alvin Jose',
            title: 'Head, Energy Transition Planning and Energy Efficiency',
            institution: 'Sustainable Energy for All (SEforALL)',
            bio: "Alvin Jose is the Head of Energy Transition Planning & Energy Efficiency for SEforALL based in Vienna. Alvin has nearly 20 years of experience in Clean Energy technology deployment and policy making. Alvin started his career with Bureau of Energy Efficiency, Government of India and subsequently worked and led a wide range of technical assistance programs of Governments in Asia with UNEP, UNDP, TERI and Asian Institute of Technology. Alvin's role is currently leading SEforALL's global work on Energy Transition and Climate Action to support developing countries achieve universal energy access, triple renewable energy and double energy efficiency. He is leading SEforALL's technical assistance program for developing countries on energy transition pathways, planning and investments. Additionally, he leads the global technical advisory and engagements on energy efficiency, clean energy technologies and its enabling policy frameworks. Alvin holds a Master's in Energy Engineering and bachelor's in Electrical and Electronic Engineering."
        },
        'andrzej-ceglarz': {
            name: 'Andrzej Ceglarz',
            title: 'Director, Energy System',
            institution: 'Renewables Grid Initiative',
            bio: "Andrzej Ceglarz is a doctoral researcher at the Technical University of Munich and a project manager at the Renewables Grid Initiative (RGI), where he works in the Sustainable Energy Transitions Laboratory (SENTINEL) project. Before that he worked at the Potsdam Institute for Climate Impact Research (PIK) and he was a visiting fellow at Institute for Structural Research (Warsaw), Institute for European Studies (Brussels) and European University Institute (Florence). His research interests lie in climate and energy policies (with a focus on Poland, Germany and the EU), social acceptability of energy infrastructure, and transdisciplinarity in the field of energy."
        },
        'arnaldo-santos': {
            name: 'Arnaldo dos Santos Junior',
            title: 'Energy Planning Expert',
            institution: 'EPE Brazil',
            bio: "[Bio will be updated soon]"
        },
        'arturo-alarcon': {
            name: 'Arturo Alarcon',
            title: 'Senior Energy Specialist',
            institution: 'Inter-American Development Bank',
            bio: "Arturo is a Senior Energy Specialist at the Inter-American Development Bank (IDB) with over 20 years of experience leading energy projects, policy dialogues, and technical coordination across Latin America. His expertise covers renewable energy, hydropower, transmission and distribution, and regional energy integration, with a focus on accelerating the energy transition and achieving universal energy access by 2030. At the IDB, he leads the technical coordination of the Energy Division, oversees regional policy dialogues, and advances strategic initiatives in power transmission and distribution. As the focal point for hydropower, he drives efforts to modernize infrastructure, integrate digital solutions, and promote pumped storage for grid flexibility. Throughout his career, he has contributed to designing and implementing impactful energy solutions that strengthen energy security, sustainability, and economic growth across the region."
        },
        'aurora-gonzalez': {
            name: 'Aurora Recio González',
            title: 'Head of Energy Foresight and Statistics Unit',
            institution: 'Ministry for the Ecological Transition and the Demographic Challenge, Spain',
            bio: "[Bio will be updated soon]"
        },
        'carla-cannone': {
            name: 'Carla Cannone',
            title: 'Partner Engagement Lead',
            institution: 'Climate Compatible Growth (CCG)',
            bio: "Carla Cannone is a UN Official Liaison Officer at the UNESCO Category I Institute ICTP in Trieste (Italy), serving as Partner Engagement Coordinator in the International Partnerships Team of the Climate Compatible Growth (CCG) Programme. She is also a Visiting Fellow at Imperial College London. Carla holds a BSc, MSc, and PhD in energy and environment, and specialises in developing international relationships, advancing energy diplomacy, and strengthening capacity building initiatives to support equitable energy transitions in the Global South."
        },
        'carlos-ruiz': {
            name: 'Carlos Ruiz Sanchez',
            title: 'Programme Officer',
            institution: 'UNFCCC',
            bio: "[Bio will be updated soon]"
        },
        'charlie-heaps': {
            name: 'Charlie Heaps',
            title: 'Senior Scientist',
            institution: 'Stockholm Environment Institute',
            bio: "Charlie Heaps is a Senior Scientist at SEI US and developer of LEAP, the Low Emissions Analysis Platform. From 2006 through 2014, he was also US Center Director, followed by serving as Energy Modeling Program Director 2015 to 2024. Charlie has a degree in energy studies from Swansea University in Wales and a PhD in environmental technology from the Imperial College London."
        },
        'christopher-gross': {
            name: 'Christopher Gross',
            title: 'Team Lead',
            institution: 'GET.transform',
            bio: "Christopher is an Energy Specialist and Project Coordinator with extensive experience in energy, climate change, and environmental policy and regulation. He has worked closely with government institutions, including Ministries of Energy and Finance, regulatory bodies, energy agencies, NGOs, consulting firms, and utility companies. His expertise covers power system planning and operations, electricity markets, clean technologies, distributed energy resources, electrification, tariff design, and the evolving role of utilities in future energy systems."
        },
        'cornelia-schenke': {
            name: 'Cornelia Schenk',
            title: 'Clean Energy Finance and Investment Policy Analyst',
            institution: 'OECD',
            bio: "Cornelia Schenk has worked in the areas of sustainable energy and energy efficiency for over 12 years, previously having been an advisor at the Austrian Development Agency. She now works as a policy analyst on Energy Efficiency for Emerging Economies, Financing & ESCOs."
        },
        'david-mccollum': {
            name: 'David McCollum',
            title: 'Scientist',
            institution: 'University of Tennessee / Oak Ridge National Laboratory',
            bio: "David L. McCollum is Distinguished R&D Staff at Oak Ridge National Laboratory (ORNL), where he leads DecisionScience@ORNL and the Armada Research Program. His work focuses on global energy, transport, and climate policy, using systems and integrated assessment models. He previously held roles at IIASA, EPRI, and the IPCC, contributing to major climate reports. Recognized by Reuters as a top climate scientist, he holds a PhD from UC Davis and a BS in Chemical Engineering from the University of Tennessee."
        },
        'dennis-volk': {
            name: 'Dennis Volk',
            title: 'Head of Division, Emergency Preparedness, Resilience, Cybersecurity',
            institution: 'Bundesnetzagentur, Germany',
            bio: "Dennis worked at the German national energy regulator (BNetzA) on regulatory frameworks, large-scale investment planning, and the first regulation on renewable energy integration. Gained international experience at the IEA in Paris and IRENA in Abu Dhabi, advising on CCS, gas markets, renewable integration, and electricity market design, as well as supporting governments in Africa, Asia, and Central America. Returned to BNetzA to lead communication on long-term electricity infrastructure planning, and now head a division focused on energy system resilience, including cyber and physical security, crisis response, and grid restoration."
        },
        'edouard-clement': {
            name: 'Edouard Clément',
            title: 'Executive Director',
            institution: 'Energy Modelling Hub (EMH)',
            bio: "Edouard Clement is the Executive Director of the Energy Modelling Hub, a pan-Canadian independent centre that supports evidence-based energy policymaking by advancing open data, modelling tools, and collaboration across government, academia, and industry. Trained in Mechanical Engineering and Aeronautics at Polytechnique Montréal, Edouard has built his career at the intersection of technology, sustainability, and decision-support systems. Before leading the Energy Modelling Hub, he worked as a Research Associate at ÉTS and at General Electric's hydro division, then directed Polytechnique Montréal's CIRAIG, overseeing major Life Cycle Assessment projects for public and private clients. As an entrepreneur, he co-founded Quantis Canada and later Novisto, two ventures that helped shape how organisations integrate environmental and ESG data into strategy and reporting. With 25 years of experience bridging science, policy, and business, Edouard brings deep expertise in life cycle assessment, GHG accounting, and sustainable design to his leadership of Canada's energy modelling ecosystem."
        },
        'estefania-ardila': {
            name: 'Estefania Ardila Robles',
            title: 'Deputy Director of Country Engagement',
            institution: 'NDC Partnership',
            bio: "Estefanía Ardila Robles is the Deputy Director of Country Engagement at the NDC Partnership Support Unit. She has experience in climate change management with a focus on monitoring, reporting, and verification (MRV) in the context of NDC implementation. In her role, she supports countries in advancing their climate goals and strengthening coordination for effective NDC delivery."
        },
        'evangelos-panos': {
            name: 'Evangelos Panos',
            title: 'Head of Energy Systems Analysis Laboratory',
            institution: 'Paul Scherrer Institute (PSI)',
            bio: "Dr. Panos Evangelos holds a PhD in Operations Research and Software Engineering from the National Technical University of Athens and a degree in Computer Engineering and Informatics from the University of Patras, Greece. With over 15 years of experience in energy modelling and analysis, he has developed and applied a wide range of mathematical models, from stochastic and econometric frameworks to partial equilibrium and integrated assessment models. His expertise spans energy supply, conversion, and demand systems, with a focus on stochastic programming, risk analysis, and multi-criteria decision-making under uncertainty. At the Energy Economics Group of the Paul Scherrer Institute (PSI), Dr. Evangelos works with models such as GMM, STEM, BEM, and MERGE-ETL to support global and national energy scenario development and policy analysis."
        },
        'franziska-bock': {
            name: 'Franziska Bock',
            title: 'Doctoral Researcher',
            institution: 'Delft University of Technology',
            bio: "Franziska is a Doctoral Researcher and Advisor specializing in the responsible use of mathematical models in energy planning and climate policymaking. With an MSc in Economics and over 10 years of experience in international cooperation, policy advice, and research, particularly across Africa and Western Asia, she is dedicated to advancing science-informed policymaking and improving the accessibility and usability of models for climate-resilient development worldwide."
        },
        'gabriel-velasquez': {
            name: 'Gabriel Armando Velásquez',
            title: 'Technical Director of Energy and Mining Planning (UPEM)',
            institution: 'Ministry of Energy and Mines of Guatemala',
            bio: "Gabriel Velásquez is the Technical Director of Energy and Mining Planning (UPEM) at the Ministry of Energy and Mines of Guatemala, where he oversees national energy and mining policies and plans. He has over 13 years of experience across government, academia, and the private sector, specializing in public policy, energy planning, and higher education. Under his leadership, Guatemala has developed key policy and planning instruments including the National Energy Policy 2013–2027, Energy Policy 2019–2050, the National Energy Plan, and the Energy Efficiency Policy 2023–2050. Gabriel has represented Guatemala in regional and international forums, including SICA and the UN, and has collaborated with organizations such as IRENA, OLADE, ECLAC, IDB, and GIZ."
        },
        'gayathri-nair': {
            name: 'Gayathri Nair',
            title: 'Programme Officer, Technology and Infrastructure for Grid Integration',
            institution: 'International Renewable Energy Agency (IRENA) IITC',
            bio: "[Bio will be updated soon]"
        },
        'hanne-jersild': {
            name: 'Hanne Jersild',
            title: 'Deputy Director',
            institution: 'Ministry of Climate, Energy, Denmark',
            bio: "[Bio will be updated soon]"
        },
        'james-glynn': {
            name: 'James Glynn',
            title: 'CEO',
            institution: 'Energy Systems Modelling Analytics (ESMA)',
            bio: "Dr. James Glynn is the Founder and CEO of Energy Systems Modelling Analytics Ltd. (ESMA), an Ireland-based consultancy delivering independent, data-driven insights for clean energy planning using advanced open-source models in the IEA-ETSAP TIMES framework. From 2021 to 2024, he led the Energy Systems Modelling Analytics Program at Columbia University's Center on Global Energy Policy. With over 20 years of international experience, James has advised the European Commission, IEA, IAEA, IRENA, and national governments on decarbonisation, energy system resilience, and net-zero strategies. He holds a PhD in Energy Engineering (UCC) and degrees in science, environmental economics, and mechanical engineering."
        },
        'jean-francois-gagne': {
            name: 'Jean-François Gagne',
            title: 'Senior Advisor',
            institution: 'Clean Energy Ministerial',
            bio: "[Bio will be updated soon]"
        },
        'johanna-castellanos': {
            name: 'Johanna Castellanos',
            title: 'Deputy Director',
            institution: 'Mining and Energy Planning Unit(UPME), Colombia',
            bio: "[Bio will be updated soon]"
        },
        'juan-garcia': {
            name: 'Juan José García Méndez',
            title: 'Programme Officer,Clean Energy Transition Scenarios',
            institution: 'International Renewable Energy Agency (IRENA) IITC',
            bio: "Juan José García is a Programme Officer at the International Renewable Energy Agency (IRENA), leading the Global Long-Term Energy Scenarios (LTES) Network. With over 17 years of experience in renewable energy, energy policy, and long-term energy planning, he specializes in energy system modelling, policy development, and international collaboration for clean energy transitions."
        },
        'lars-jensen': {
            name: 'Lars Georg Jensen',
            title: 'Chief Advisor',
            institution: 'Danish Energy Agency, Ministry of Climate, Energy & Utilities, Denmark',
            bio: "Lars Georg Jensen is Chief Advisor in the Danish Energy Agency's Centre for Global Cooperation, part of the Danish Ministry of Climate, Energy & Utilities. He has until recently been Chief Advisor in the Agency's Centre for Systems Analysis, including serving as Chief Editor of publications such as the annual Danish Energy Outlook, Danish Climate and Energy Outlook and Denmarks Global Climate Impact – Global Report. Lars Georg Jensen has a number of years represented his country in the International Energy Agency's, IEA's Governing Board, Standing Group on Long-Term Co-operation (SLT) and Standing Group on Global Dialogue (SGD). Since 2023 he is Vice-Chair and currently Acting Chairman of the SLT. Lars Georg Jensen has also at seven occasions served as team leader of IEA In-Depth Review's of member countries energy policies. Previously, Lars Georg Jensen was deputy director in the secretariat of the Danish Commission on Climate Change Policy. Lars Georg Jensen participated in the early days of international negotiations on climate change and sustainable development, including more than 35 UN conferences on climate change, energy and/or sustainable development, 14 COPs to the UNFCCC as well as the 1992 United Nations Conference on Environment and Development in Rio de Janeiro.   Prior to joining the Danish Energy Agency in 2004, Lars Georg Jensen worked more than ten years for Non Governmental Organisations in the field of environment and development, including leading delegations to COPs. Lars Georg Jensen holds a Masters Degree in Political Science from the University of Copenhagen (1999)."
        },
        'lucas-oliveira': {
            name: 'Lucas Simões de Oliveira',
            title: 'Transmission Planning Team',
            institution: 'Global Coalition for Energy Planning',
            bio: "Lucas is an Electrical Engineer specialized in Power Systems, holding an MBA from Fundação Getulio Vargas (FGV) and currently pursuing a Master's degree in Production Engineering at the University of São Paulo (USP). He is responsible for developing techno-economic studies to support the expansion of Brazil's National Interconnected System (SIN) across the states of Rio de Janeiro, Espírito Santo, Minas Gerais, Goiás, Mato Grosso, Acre, and Rondônia."
        },
        'maike-groninger': {
            name: 'Maike Groninger',
            title: 'Technical Advisor',
            institution: 'GET.transform',
            bio: "[Bio will be updated soon]"
        },
        'marcela-jaramillo': {
            name: 'Marcela Jaramillo',
            title: 'Executive Director',
            institution: '2050 Pathways',
            bio: "Marcela Jaramillo has served as the Executive Director of the 2050 Pathways Platform since November 2024, after previously leading the Platform's programmes. She brings over 12 years of experience in climate policy and finance, with a strong record of supporting governments in long-term, net-zero planning and aligning public finance with climate goals. Before joining the Platform, Marcela worked at the Inter-American Development Bank, advising governments on fiscal and investment planning for climate alignment, and at E3G, focusing on climate finance and diplomacy. She holds a BSc in Mechanical Engineering and an MSc in Sustainable Energy Technologies."
        },
        'marija-miletic': {
            name: 'Marija Miletic',
            title: 'Energy Analyst',
            institution: 'European Commission JRC',
            bio: "[Bio will be updated soon]"
        },
        'mark-howells': {
            name: 'Mark Howells',
            title: 'Programme Director',
            institution: 'Climate Compatible Growth (CCG)',
            bio: "Mark Howells is the CCG Programme Director. He is jointly appointed at Loughborough University and Imperial College, London. Previously at the Royal Institute of Technology in Sweden, he set up their prestigious Energy Systems Analysis programme. He led the development of some of the world's premier open source energy, resource, and spatial electrification planning tools; published in several Nature Journals; coordinated the European Commission's think tank for Energy; is regularly used by the United Nations as a science-policy expert; and is a key contributor to UNDESA's 'Modelling Tools for Sustainable Development Policies' initiative. His work has contributed to efforts for NASA, IRENA, ABB, the World Bank, and others."
        },
        'matias-paredes': {
            name: 'Matías Paredes Vergara',
            title: 'Energy Planning and Climate Change Analyst, Planning and Climate Change Unit',
            institution: 'Ministry of Energy, Chile',
            bio: "Matías is an Analyst at the Ministry of Energy of Chile, where he leads the country's Long-Term Energy Planning process, identifying future infrastructure needs to ensure a secure, resilient, and cost-effective electricity supply. Committed to advancing Chile's sustainable energy transition, he combines technical expertise with a strong dedication to public service. His research focuses on incorporating deep uncertainty into long-term power system planning, fostering collaboration between stakeholders, modelers, and policymakers to develop informed and resilient energy strategies."
        },
        'maximilian-parzen': {
            name: 'Maximilian Parzen',
            title: 'CEO',
            institution: 'Open Energy Transition',
            bio: "[Bio will be updated soon]"
        },
        'mohamed-ben-ticha': {
            name: 'Mohamed Bassam Ben Ticha',
            title: 'Energy Systems Analyst',
            institution: 'International Atomic Energy Agency (IAEA)',
            bio: "[Bio will be updated soon]"
        },
        'mohammad-tahavori': {
            name: 'Mohammad Amin Tahavori',
            title: 'Researcher in Energy and Climate Modelling',
            institution: 'VITO',
            bio: "Mohammad Amin Tahavori, a researcher at VITO/EnergyVille, specializes sustainable energy system and policy design. His focus revolves around collaborative efforts with governmental bodies and research institutes in several countries in the global south, towards a sustainable long term energy planning and policy design. His contributes to this through helping countries with improving National Energy Information Systems, refining energy modeling capabilities, and facilitating climate communication. Currently, he is actively invovled in the development of NDC3.0 and LT-LEDS within multiple African countries including Mozambique and Malawi. His research extends to the critical topic of energy access, with a primary emphasis on understanding the dynamics of energy consumption and demand evolution in rural contexts."
        },
        'nadeem-goussous': {
            name: 'Nadeem Goussous',
            title: 'Associate Programme Officer, Clean Energy Transition Scenarios',
            institution: 'International Renewable Energy Agency (IRENA) IITC',
            bio: "Nadeem Goussous is an Associate Programme Officer at the International Renewable Energy Agency (IRENA), where he works in the team leading the Global Network on Long-term Energy Scenarios (LTES), engaging with countries and experts worldwide from diverse sectors to advance energy planning practices. He currently leads the workstream on participatory processes for energy scenario development, bringing together policymakers, researchers, industry representatives, and civil society stakeholders to enhance participatory energy planning. He has also led and contributed to several publications on energy and climate planning. His work focuses on developing best practices for robust and inclusive national energy transition pathways. Previously, Nadeem worked as an R&D Engineer in renewable energy resource assessment. He holds a Master's degree in Global Energy Transition and Governance and a Bachelor's degree in Electrical and Electronic Engineering."
        },
        'nicola-magnani': {
            name: 'Nicola Magnani',
            title: 'Joint Research Centre (JRC)',
            institution: 'European Commission',
            bio: "[Bio will be updated soon]"
        },
        'ricardo-aguiar': {
            name: 'Ricardo Aguiar',
            title: 'Senior Researcher, Division of Studies and Energy Sustainability',
            institution: 'Directorate-General for Energy and Geology (DGEG), Portugal',
            bio: "[Bio will be updated soon]"
        },
        'sebastian-sterl': {
            name: 'Sebastian Sterl',
            title: 'Energy Analyst',
            institution: 'Directorate-General for Energy (DG ENER), European Commission',
            bio: "Prof. Dr. Sebastian Sterl works as energy analyst at the Directorate-General for Energy (DG Energy) of the European Commission in Brussels. He focuses on conducting analyses on clean energy transition planning and how it can be harmonised with the need for economic prosperity and industrial competitiveness. Prior to his current roles, Sebastian worked at the World Resources Institute (WRI) in Addis Ababa, Ethiopia (2022-2024), and at the International Renewable Energy Agency (IRENA) in Bonn, Germany (2020-2022). In these roles, he specialised in capacity building on energy modelling with ministries and government agencies across the African continent to support the clean energy transition."
        },
        'sebastien-debia': {
            name: 'Sebastian Debia',
            title: 'Policy Analyst',
            institution: 'Natural Resources Canada',
            bio: "[Bio will be updated soon]"
        },
        'seoungho-lee': {
            name: 'Seoungho Lee',
            title: 'Associate Research Fellow',
            institution: 'Korea Energy Economics Institute (KEEI)',
            bio: "[Bio will be updated soon]"
        },
        'simon-benmarraze': {
            name: 'Simon Benmarraze',
            title: 'Head, Energy Transition Planning and Power Sector Transformation',
            institution: 'International Renewable Energy Agency (IRENA) IITC',
            bio: "Simon Benmarraze is the Senior Manager and Global Head of Energy Planning at the International Renewable Energy Agency (IRENA), based at the Innovation and Technology Centre in Bonn, Germany. With over 15 years of experience in advancing sustainable energy solutions across public and private sectors, he leads IRENA's efforts to translate strategic energy intelligence into actionable policies that accelerate the global transition toward net-zero emissions. Simon is also dedicated to mentoring the next generation of renewable energy professionals and fostering international collaboration for a resilient, inclusive, and sustainable energy future."
        },
        'stelios-grafakos': {
            name: 'Stelios Grafakos',
            title: 'Head of European Office, Principal Economist',
            institution: 'Global Green Growth Institute (GGGI)',
            bio: "Stelios is responsible for leading the Global Green Growth Institute's (GGGI) work on the macroeconomic dimensions of green growth, focusing on the employment impacts of national green growth strategies and low-carbon development plans. He also leads GGGI's support to governments in developing Low Emission Development Strategies (LEDS) and enhancing Nationally Determined Contributions (NDCs), with a particular emphasis on the economic analysis of climate policies and pathways toward decarbonization and climate resilience."
        },
        'tiina-koljonen': {
            name: 'Tiina Koljonen',
            title: 'Principal Scientist in Carbon Neutral Solutions',
            institution: 'VTT Finland',
            bio: "Tiina Koljonen has over 30 years' experience in sustainable energy systems and transition to carbon neutral societies. Her major duties include delivering climate, energy and RDI policy impact analysis for the Finnish Government and Parliament, European Commission, and Nordic Council of Ministers. She coordinates national research projects to support Finland's energy and climate strategy towards carbon neutrality by 2035."
        },
        'usman-ahmad': {
            name: 'Usman Ahmad',
            title: 'Energy Modeler & Data Management Specialist',
            institution: 'Energy Planning & Resource Center (EPRC), Energy Wing, Ministry of Planning, Development & Special Initiatives, Government of Pakistan',
            bio: "I am currently working with the Integrated Energy Planning (IEP) platform, where I oversee activities related to energy modelling. I have hands-on experience with STATA, LEAP, and MARKAL/TIMES energy modelling tools. In addition to modelling, I have extensive experience in energy data management, including data collection, refinement, and analysis, covering both trend and gap analysis. I hold BS and MS degrees in Information Technology (IT), and prior to my current role, I worked at Teradata and Jazz (a leading telecom company in Pakistan) as ETL & ERP developer and Business Intelligence (BI) reporting analyst, respectively."
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

        if (!track || !viewport || !prevBtn || !nextBtn || !dotsContainer) {
            console.log('Carousel init failed - missing elements:', {
                track: !!track,
                viewport: !!viewport,
                prevBtn: !!prevBtn,
                nextBtn: !!nextBtn,
                dotsContainer: !!dotsContainer
            });
            return;
        }

        console.log('Carousel initializing with', track.querySelectorAll('.speaker-card').length, 'cards');

        const cards = track.querySelectorAll('.speaker-card');
        if (cards.length === 0) return;

        let currentIndex = 0;
        let visibleCards = 1;
        let maxIndex = 0;
        let cardWidth = 0;

        // Touch/drag state
        let isDragging = false;
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID;

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

        function updateCarousel(smooth = true) {
            const offset = -currentIndex * cardWidth;
            if (smooth) {
                track.style.transition = 'transform 0.3s ease-out';
            } else {
                track.style.transition = 'none';
            }
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

        // Touch/drag event handlers
        function touchStart(e) {
            isDragging = true;
            startX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            prevTranslate = -currentIndex * cardWidth;
            track.style.transition = 'none';

            // Prevent default only for touch events to allow click events
            if (e.type.includes('touch')) {
                animationID = requestAnimationFrame(animation);
            }
        }

        function touchMove(e) {
            if (!isDragging) return;

            const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            const diff = currentX - startX;
            currentTranslate = prevTranslate + diff;

            // Add resistance at boundaries
            const minTranslate = -maxIndex * cardWidth;
            const maxTranslate = 0;

            if (currentTranslate > maxTranslate) {
                currentTranslate = maxTranslate + (currentTranslate - maxTranslate) * 0.3;
            } else if (currentTranslate < minTranslate) {
                currentTranslate = minTranslate + (currentTranslate - minTranslate) * 0.3;
            }

            track.style.transform = `translateX(${currentTranslate}px)`;
        }

        function touchEnd(e) {
            if (!isDragging) return;
            isDragging = false;
            cancelAnimationFrame(animationID);

            const movedBy = currentTranslate - prevTranslate;

            // If moved enough negative, go to next slide
            if (movedBy < -50 && currentIndex < maxIndex) {
                currentIndex += 1;
            }
            // If moved enough positive, go to previous slide
            else if (movedBy > 50 && currentIndex > 0) {
                currentIndex -= 1;
            }

            updateCarousel();
        }

        function animation() {
            if (isDragging) {
                requestAnimationFrame(animation);
            }
        }

        // Add event listeners for touch/drag
        viewport.addEventListener('touchstart', touchStart);
        viewport.addEventListener('touchmove', touchMove);
        viewport.addEventListener('touchend', touchEnd);
        viewport.addEventListener('mousedown', touchStart);
        viewport.addEventListener('mousemove', touchMove);
        viewport.addEventListener('mouseup', touchEnd);
        viewport.addEventListener('mouseleave', () => {
            if (isDragging) {
                isDragging = false;
                cancelAnimationFrame(animationID);
                updateCarousel();
            }
        });

        // Prevent context menu on long press
        viewport.addEventListener('contextmenu', (e) => {
            if (isDragging) {
                e.preventDefault();
            }
        });

        // Button navigation
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
     * Generate .ics Calendar File
     */
    function generateICS() {
        // Event venue
        const venue = "IRENA Innovation and Technology Center\\nThomas-Dehler-Haus\\nWilly-Brandt-Allee 20\\n53113 Bonn\\, Germany";
        const teamsLink = "https://events.teams.microsoft.com/event/451339e0-ec39-40a8-bbcd-3b5423a29ab7@ccddebb0-d2bb-44d0-984a-8e42a5c062b3";

        // All sessions with their details
        const sessions = [
            {
                title: "Badge Collection and Coffee",
                start: "2025-10-29T08:00:00",
                end: "2025-10-29T09:00:00",
                description: "Registration and welcome coffee"
            },
            {
                title: "Opening Session",
                start: "2025-10-29T09:00:00",
                end: "2025-10-29T09:30:00",
                description: "Welcome and opening remarks for the 6th LTES Forum"
            },
            {
                title: "Session 1: Long-term Energy Scenarios Frameworks and NDC Alignment in Practice",
                start: "2025-10-29T09:30:00",
                end: "2025-10-29T11:15:00",
                description: "Co-host: UNFCCC\\n\\nThis session explores how countries integrate long-term energy scenario planning with their Nationally Determined Contributions (NDCs) and climate commitments."
            },
            {
                title: "Coffee Break",
                start: "2025-10-29T11:15:00",
                end: "2025-10-29T11:45:00",
                description: "Morning coffee break"
            },
            {
                title: "Session 2: Turning Grid Planning into Bankable Grid Pipelines",
                start: "2025-10-29T11:45:00",
                end: "2025-10-29T13:15:00",
                description: "Co-host: Brazil - GCEP\\n\\nExamines the critical bridge between energy scenario planning and investment mobilization."
            },
            {
                title: "Lunch Break",
                start: "2025-10-29T13:15:00",
                end: "2025-10-29T14:15:00",
                description: "Lunch"
            },
            {
                title: "Session 3: Communicating Scenarios to Build Strong Public and Political Support",
                start: "2025-10-29T14:15:00",
                end: "2025-10-29T15:45:00",
                description: "Co-host: Natural Resources Canada\\n\\nAddresses the challenge of effectively communicating complex energy scenarios to diverse stakeholders."
            },
            {
                title: "Coffee Break",
                start: "2025-10-29T15:45:00",
                end: "2025-10-29T16:15:00",
                description: "Afternoon coffee break"
            },
            {
                title: "Session 4: Institutional Considerations for Adopting Modelling Tools",
                start: "2025-10-29T16:15:00",
                end: "2025-10-29T17:45:00",
                description: "Co-host: GET.transform\\n\\nDiscusses practical aspects of selecting and implementing energy modeling tools within government institutions."
            },
            {
                title: "Welcome Dinner",
                start: "2025-10-29T18:30:00",
                end: "2025-10-29T21:00:00",
                description: "Welcome dinner for all participants"
            },
            {
                title: "Coffee and Networking",
                start: "2025-10-30T08:00:00",
                end: "2025-10-30T09:15:00",
                description: "Morning coffee and networking"
            },
            {
                title: "Closed-door Session: LTES Network Members and Partners Strategic Meeting",
                start: "2025-10-30T08:00:00",
                end: "2025-10-30T09:00:00",
                description: "Strategic meeting for LTES Network members and partners only (concurrent with coffee and networking)"
            },
            {
                title: "Opening Presentation: Global and Regional Energy Outlooks",
                start: "2025-10-30T09:15:00",
                end: "2025-10-30T09:45:00",
                description: "Ricardo Gorini\\, IRENA"
            },
            {
                title: "Session 5: Addressing Supply Chain Uncertainties",
                start: "2025-10-30T09:45:00",
                end: "2025-10-30T11:15:00",
                description: "Co-host: European Commission JRC\\n\\nExplores how to incorporate supply chain risks and uncertainties into long-term energy planning."
            },
            {
                title: "Coffee Break",
                start: "2025-10-30T11:15:00",
                end: "2025-10-30T11:45:00",
                description: "Morning coffee break"
            },
            {
                title: "Session 6: Addressing the Future of Digitalization Through Demand-side Planning",
                start: "2025-10-30T11:45:00",
                end: "2025-10-30T13:15:00",
                description: "Examines the rapidly evolving energy demand landscape driven by digitalization\\, including data centers and AI infrastructure."
            },
            {
                title: "Lunch Break",
                start: "2025-10-30T13:15:00",
                end: "2025-10-30T14:15:00",
                description: "Lunch"
            },
            {
                title: "Session 7: Governing AI in Energy Planning",
                start: "2025-10-30T14:15:00",
                end: "2025-10-30T15:30:00",
                description: "Discusses the opportunities and challenges of using artificial intelligence in energy scenario planning."
            },
            {
                title: "Coffee Break",
                start: "2025-10-30T15:30:00",
                end: "2025-10-30T16:00:00",
                description: "Afternoon coffee break"
            },
            {
                title: "Session 8: Embedding Just Transition in National Scenario Frameworks",
                start: "2025-10-30T16:00:00",
                end: "2025-10-30T17:15:00",
                description: "Co-host: Brazil - GCEP\\n\\nFocuses on integrating social equity and just transition principles into energy scenario planning."
            },
            {
                title: "Closing Remarks",
                start: "2025-10-30T17:15:00",
                end: "2025-10-30T17:30:00",
                description: "Closing remarks and wrap-up of the 6th LTES Forum"
            },
            {
                title: "Farewell Reception",
                start: "2025-10-30T17:30:00",
                end: "2025-10-30T19:00:00",
                description: "Farewell reception for all participants"
            }
        ];

        // Helper function to format datetime for ICS
        function formatICSDate(dateStr) {
            const date = new Date(dateStr);
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        }

        // Build ICS content
        let icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//6th LTES Forum//Event Portal//EN',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'X-WR-CALNAME:6th LTES Forum - Full Agenda',
            'X-WR-TIMEZONE:Europe/Berlin'
        ];

        sessions.forEach((session, index) => {
            icsContent.push('BEGIN:VEVENT');
            icsContent.push(`UID:ltes2025-session-${index}@irena.org`);
            icsContent.push(`DTSTAMP:${formatICSDate(new Date().toISOString())}`);
            icsContent.push(`DTSTART:${formatICSDate(session.start)}`);
            icsContent.push(`DTEND:${formatICSDate(session.end)}`);
            icsContent.push(`SUMMARY:${session.title}`);
            icsContent.push(`DESCRIPTION:${session.description}\\n\\nVirtual Access: ${teamsLink}`);
            icsContent.push(`LOCATION:${venue}`);
            icsContent.push('STATUS:CONFIRMED');
            icsContent.push('SEQUENCE:0');
            icsContent.push('END:VEVENT');
        });

        icsContent.push('END:VCALENDAR');

        return icsContent.join('\r\n');
    }

    /**
     * Download ICS File
     */
    function downloadICS() {
        const icsContent = generateICS();
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = '6th-LTES-Forum-Full-Agenda.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }

    /**
     * Initialize Calendar Button
     */
    function initCalendarButton() {
        const calendarBtn = document.getElementById('addFullAgenda');
        if (!calendarBtn) return;

        calendarBtn.addEventListener('click', downloadICS);
    }

    /**
     * Initialize all functions on DOM ready
     */
    function init() {
        initMobileNav();
        initSmoothScroll();
        updateLiveBadge();
        initCountdown();
        initScrollAnimations();
        initActiveNavLink();
        initSpeakersCarousel();
        initSpeakerModal();
        initSessionModal();
        initCalendarButton();
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
