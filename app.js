document.addEventListener('DOMContentLoaded', () => {
    // --- 0. Theme Toggle Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        });
    }
    // --- 1. SPA Routing Logic ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const views = document.querySelectorAll('.view');
    const navBrand = document.querySelector('.nav-brand');

    const isMobile = () => window.innerWidth <= 768;

    window.closeCaseStudy = function (instant = false) {
        if (isMobile()) document.body.style.overflow = '';
        const caseStudyView = document.getElementById('case-study');

        if (instant) {
            if (caseStudyView) {
                caseStudyView.style.display = 'none';
                caseStudyView.style.opacity = '0';
            }
            document.querySelectorAll('.grid').forEach(g => g.style.display = '');
            const projectsGrid = document.getElementById('projects-grid');
            if (projectsGrid) projectsGrid.style.display = 'flex';
            return;
        }

        if (caseStudyView) caseStudyView.style.opacity = '0';

        // Wait for fade out
        setTimeout(() => {
            if (caseStudyView) caseStudyView.style.display = 'none';
            document.querySelectorAll('.grid').forEach(g => g.style.display = '');
            const projectsGrid = document.getElementById('projects-grid');
            if (projectsGrid) projectsGrid.style.display = 'flex';
            window.scrollTo(0, 0);
        }, 400);
    };

    function navigateTo(viewId) {
        window.closeCaseStudy(true); // Close any open case study instantly
        if (isMobile()) {
            const targetView = document.getElementById(viewId);
            if (targetView) {
                targetView.scrollIntoView({ behavior: 'smooth' });
            }
            const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
            return;
        }

        // Hide all views
        views.forEach(view => {
            view.classList.remove('active');
        });

        // Show target view
        const targetView = document.getElementById(viewId);
        if (targetView) {
            targetView.classList.add('active');
        }

        // Update active nav link
        navLinks.forEach(link => {
            if (link.getAttribute('data-target') === viewId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Scroll to top on navigate
        window.scrollTo(0, 0);
    }

    // Attach click listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            navigateTo(target);
            // Update URL hash for simple state (optional, but good for linking)
            window.location.hash = target;
        });
    });

    // Handle initial load based on hash or default to 'home'
    const initialView = window.location.hash.replace('#', '') || 'home';
    if (isMobile()) {
        window.scrollTo(0, 0);
    } else {
        navigateTo(initialView);
    }

    // Clicking brand goes home
    if (navBrand) {
        navBrand.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('home');
            window.location.hash = 'home';
        });
    }

    // Handle "Call to Action" buttons navigating to other views
    document.querySelectorAll('[data-route]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = btn.getAttribute('data-route');
            navigateTo(target);
            if (!isMobile()) window.location.hash = target;
        });
    });

    // --- Mobile Specific Logic ---
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    if (mobileNavToggle && mobileMenuOverlay && mobileMenuClose) {
        mobileNavToggle.addEventListener('click', () => {
            mobileMenuOverlay.classList.add('active');
        });
        mobileMenuClose.addEventListener('click', () => {
            mobileMenuOverlay.classList.remove('active');
        });
    }

    document.querySelectorAll('#mobile-menu-overlay a[data-target]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            navigateTo(target);
        });
    });

    const mobileNavBrand = document.querySelector('.mobile-nav-brand-pc');
    window.addEventListener('scroll', () => {
        if (mobileNavBrand) {
            if (window.scrollY > 50) {
                mobileNavBrand.style.opacity = '0';
                mobileNavBrand.style.pointerEvents = 'none';
            } else {
                mobileNavBrand.style.opacity = '1';
                mobileNavBrand.style.pointerEvents = 'auto';
            } 
        }
    }, { passive: true });

    // Mobile Card Animations
    const cards = document.querySelectorAll('.card');
    const cardObserver = new IntersectionObserver((entries) => {
        if (!isMobile()) return;
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        cardObserver.observe(card);
    });

    window.handleCardClick = function (e, modalId, mobileUrl) {
        if (isMobile() && mobileUrl) {
            window.location.href = mobileUrl;
        } else {
            openCaseStudy(modalId);
        }
    };

    // --- 2. Secure Contact Form Logic ---
    const contactForm = document.getElementById('secure-contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // A. Anti-Spam Honeypot Verification
            const honeypot = document.getElementById('hp-field').value;
            if (honeypot !== '') {
                // Silently reject if honeypot is filled (bot detected)
                console.warn('Bot detected via honeypot.');
                return false;
            }

            // B. Submission Throttle / Rate Limiting (Stateful Cooldown via localStorage)
            const now = Date.now();
            const submissionDataStr = localStorage.getItem('contact_submissions');
            let submissionData = submissionDataStr ? JSON.parse(submissionDataStr) : { count: 0, firstTimestamp: now };

            // Reset if window passed (60 seconds)
            if (now - submissionData.firstTimestamp > 60000) {
                submissionData = { count: 0, firstTimestamp: now };
            }

            if (submissionData.count >= 2) {
                alert('Rate limit exceeded. Please wait 60 seconds before sending another message.');
                return false;
            }

            // C. Robust Injection Prevention / Sanitization
            const rawName = document.getElementById('name').value;
            const rawEmail = document.getElementById('email').value;
            const rawMessage = document.getElementById('message').value;

            // Simple client-side sanitizer (strips out <, >, and basic SQL injection patterns)
            const sanitize = (str) => {
                let sanitized = str.replace(/[<>]/g, ''); // Remove script tags
                sanitized = sanitized.replace(/(\b)(on\S+)(\s*)=|javascript:|(<\s*)(\/*)script/gi, ''); // Remove JS handlers
                sanitized = sanitized.replace(/UNION|SELECT|DROP|INSERT|DELETE|UPDATE|--/gi, '[REDACTED]'); // Basic SQLi strip
                return sanitized.trim();
            };

            const cleanName = sanitize(rawName);
            const cleanEmail = sanitize(rawEmail);
            const cleanMessage = sanitize(rawMessage);

            if (!cleanName || !cleanEmail || !cleanMessage) {
                alert('Veuillez remplir tous les champs correctement.');
                return false;
            }

            // Increment rate limit counter
            submissionData.count += 1;
            localStorage.setItem('contact_submissions', JSON.stringify(submissionData));

            // D. Send submission via FormSubmit to receive direct emails
            const payload = {
                name: cleanName,
                email: cleanEmail,
                message: cleanMessage
            };

            fetch('https://formsubmit.co/ajax/peter.chatzigianis@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            })
                .then(() => {
                    console.log('Secure Payload Delivered to Backend');
                    alert('Message transmis avec succès. Je vous répondrai dans les plus brefs délais.');
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error(error);
                    alert('Erreur lors de la transmission. Veuillez réessayer.');
                });
        });
    }

    // --- 3. Case Study Dynamic Logic ---
    const caseStudiesData = window.caseStudiesData;

    window.openDynamicCaseStudy = function (title, desc, img, tags) {
        if (isMobile()) document.body.style.overflow = 'hidden';
        document.getElementById('cs-title').innerHTML = title;
        document.getElementById('cs-image').src = img;
        document.getElementById('cs-problematic').innerText = desc;
        document.getElementById('cs-methodology').innerText = '';
        document.getElementById('cs-obstacles').innerText = '';
        document.getElementById('cs-solutions').innerText = '';

        const tagsContainer = document.getElementById('cs-tags');
        if (tagsContainer) tagsContainer.innerHTML = tags;

        const bottomBtn = document.getElementById('cs-bottom-close');
        if (bottomBtn) bottomBtn.style.display = isMobile() ? 'block' : 'none';

        showCaseStudyModal();
    };

    window.openCaseStudy = function (projectId) {
        if (isMobile()) document.body.style.overflow = 'hidden';
        const data = caseStudiesData[projectId];
        if (!data) return;

        document.getElementById('cs-title').innerText = data.title;
        document.getElementById('cs-image').src = data.image;
        document.getElementById('cs-problematic').innerText = data.problematic;
        document.getElementById('cs-methodology').innerText = data.methodology;
        document.getElementById('cs-obstacles').innerText = data.obstacles;
        document.getElementById('cs-solutions').innerText = data.solutions;

        const tagsContainer = document.getElementById('cs-tags');
        if (tagsContainer) {
            // Hardcode some tags for projects if they don't exist in data, or grab from DOM.
            tagsContainer.innerHTML = '';
        }

        const bottomBtn = document.getElementById('cs-bottom-close');
        if (bottomBtn) bottomBtn.style.display = isMobile() ? 'block' : 'none';

        showCaseStudyModal();
    };

    function showCaseStudyModal() {
        const grid = document.getElementById('projects-grid');
        const caseStudyView = document.getElementById('case-study');

        if (grid) grid.style.display = 'none';
        caseStudyView.style.display = 'block';

        setTimeout(() => {
            caseStudyView.style.opacity = '1';
        }, 50);

        window.scrollTo(0, 0);
    }

});
