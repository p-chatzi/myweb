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
        
        const targetView = document.getElementById(viewId);
        if (!targetView) return;
        
        const flow = targetView.getAttribute('data-flow');

        // Hide all views first
        views.forEach(view => {
            view.classList.remove('active');
        });

        if (isMobile() && flow && flow !== 'gateway') {
            // Mobile flow: show all sections belonging to the flow, plus contact
            document.querySelectorAll(`.view[data-flow="${flow}"]`).forEach(view => {
                view.classList.add('active');
            });
            const contact = document.getElementById('contact');
            if (contact) contact.classList.add('active');

            setTimeout(() => {
                targetView.scrollIntoView({ behavior: 'smooth' });
            }, 50);

            const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
            if (mobileMenuOverlay) mobileMenuOverlay.classList.remove('active');
        } else {
            // Desktop or Gateway: show only the specific view
            targetView.classList.add('active');
            window.scrollTo(0, 0);
        }

        // Update active nav link
        navLinks.forEach(link => {
            if (link.getAttribute('data-target') === viewId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Update active state in mobile submenu
        document.querySelectorAll('.mobile-menu-content a').forEach(link => {
             if (link.getAttribute('data-target') === viewId) {
                 link.classList.add('active');
             } else {
                 link.classList.remove('active');
             }
        });
    }

    // Attach click listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('data-target');
            if (!target) return; // Allow normal navigation for links without data-target
            e.preventDefault();
            navigateTo(target);
            // Update URL hash for simple state (optional, but good for linking)
            window.location.hash = target;
        });
    });

    // Handle initial load based on hash or default to 'gateway'
    const initialView = window.location.hash.replace('#', '') || 'gateway';
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

    // =====================================================================
    // CYBER NEWS AGGREGATOR
    // =====================================================================

    const FEEDS = [
        { name: "The Hacker News",      url: "https://feeds.feedburner.com/TheHackersNews",                 site: "https://thehackernews.com",       active: true  },
        { name: "BleepingComputer",     url: "https://www.bleepingcomputer.com/feed/",                       site: "https://www.bleepingcomputer.com", active: true, categoryFilter: "Security" },
        { name: "Google Project Zero",  url: "https://projectzero.google/feed.xml",                          site: "https://projectzero.google/",     active: true  },
        { name: "Threat Intelligence",  url: "https://feeds.feedburner.com/threatintelligence/pvexyqv7v0v",  site: "https://cloud.google.com/blog/topics/threat-intelligence/", active: false },
        { name: "PortSwigger Research", url: "https://portswigger.net/research/rss",                         site: "https://portswigger.net/research", active: false },
    ];

    try {
        const savedFeeds = JSON.parse(localStorage.getItem('newsActiveFeeds'));
        if (savedFeeds) {
            FEEDS.forEach(f => {
                if (savedFeeds[f.name] !== undefined) f.active = savedFeeds[f.name];
            });
        }
    } catch(e) {}

    const RAW_PROXIES = [
        u => `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(u)}`,
        u => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
        u => `https://corsproxy.io/?url=${encodeURIComponent(u)}`,
    ];

    const PER_FEED_LIMIT = 5;
    const TOTAL_LIMIT     = 30;
    const SNIPPET_LEN     = 180;

    const $ = sel => document.querySelector(sel);
    const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    function el(tag, cls, text) {
        const n = document.createElement(tag);
        if (cls) n.className = cls;
        if (text != null) n.textContent = text;
        return n;
    }
    function safeUrl(u) { return (typeof u === "string" && /^https?:\/\//i.test(u.trim())) ? u.trim() : null; }
    function stripHtml(html) {
        if (!html) return "";
        const doc = new DOMParser().parseFromString(html, "text/html");
        return (doc.body.textContent || "").replace(/\s+/g, " ").trim();
    }
    function truncate(s, n) { return s.length > n ? s.slice(0, n).replace(/\s+\S*$/, "") + "…" : s; }
    function timeAgo(date) {
        if (!date || isNaN(date)) return "";
        const s = (Date.now() - date.getTime()) / 1000;
        if (s < 60)      return "just now";
        if (s < 3600)    return Math.floor(s / 60) + "m ago";
        if (s < 86400)   return Math.floor(s / 3600) + "h ago";
        if (s < 604800)  return Math.floor(s / 86400) + "d ago";
        return date.toLocaleDateString();
    }

    function imageFromHtml(html) {
        if (!html) return null;
        const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
        return m ? safeUrl(m[1]) : null;
    }

    async function viaRss2json(feed) {
        const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}&count=${PER_FEED_LIMIT}`;
        const res = await fetch(api);
        if (!res.ok) throw new Error("rss2json HTTP " + res.status);
        const data = await res.json();
        if (data.status !== "ok" || !Array.isArray(data.items)) throw new Error("rss2json " + (data.message || data.status));
        return data.items.filter(it => {
            if (!feed.categoryFilter) return true;
            return it.categories && it.categories.some(c => c.toLowerCase() === feed.categoryFilter.toLowerCase());
        }).map(it => ({
            source: feed.name,
            title: (it.title || "").trim(),
            link: safeUrl(it.link),
            date: it.pubDate ? new Date(it.pubDate.replace(" ", "T")) : null,
            snippet: truncate(stripHtml(it.description || it.content), SNIPPET_LEN),
            image: safeUrl(it.thumbnail) || safeUrl(it.enclosure && it.enclosure.link) || imageFromHtml(it.content || it.description),
        })).filter(x => x.title && x.link);
    }

    async function viaRawProxy(feed, build) {
        const res = await fetch(build(feed.url), { headers: { "Accept": "application/xml, text/xml, */*" } });
        if (!res.ok) throw new Error("HTTP " + res.status);
        const text = await res.text();
        if (!text || !text.includes("<")) throw new Error("non-xml response");
        const items = parseFeed(text, feed);
        if (!items.length) throw new Error("0 items parsed");
        return items;
    }

    async function fetchItems(feed) {
        const attempts = [
            () => viaRss2json(feed),
            ...RAW_PROXIES.map(b => () => viaRawProxy(feed, b)),
        ];
        let lastErr;
        for (const run of attempts) {
            try { const items = await run(); if (items.length) return items; }
            catch (e) { lastErr = e; }
        }
        throw lastErr || new Error("all sources failed");
    }

    function pickImage(item) {
        for (const tag of ["enclosure", "media:content", "media:thumbnail"]) {
            const els = item.getElementsByTagName(tag);
            for (const e of els) {
                const u = safeUrl(e.getAttribute("url"));
                const type = (e.getAttribute("type") || "").toLowerCase();
                if (u && (tag !== "enclosure" || type.startsWith("image"))) return u;
            }
        }
        for (const tag of ["content:encoded", "description", "content", "summary"]) {
            const e = item.getElementsByTagName(tag)[0];
            if (e && e.textContent && e.textContent.includes("<img")) {
                const m = e.textContent.match(/<img[^>]+src=["']([^"']+)["']/i);
                if (m) { const u = safeUrl(m[1]); if (u) return u; }
            }
        }
        return null;
    }

    function parseFeed(xmlText, feed) {
        const doc = new DOMParser().parseFromString(xmlText, "text/xml");
        if (doc.querySelector("parsererror")) return [];
        const isAtom = doc.getElementsByTagName("entry").length > 0 &&
                       doc.getElementsByTagName("item").length === 0;
        const nodes = isAtom ? doc.getElementsByTagName("entry") : doc.getElementsByTagName("item");
        const items = [];
        for (const node of nodes) {
            const get = t => { const e = node.getElementsByTagName(t)[0]; return e ? e.textContent.trim() : ""; };

            let link = "";
            if (isAtom) {
                const links = node.getElementsByTagName("link");
                let chosen = null;
                for (const l of links) {
                    const rel = l.getAttribute("rel");
                    if (!rel || rel === "alternate") { chosen = l; break; }
                    if (!chosen) chosen = l;
                }
                link = chosen ? (chosen.getAttribute("href") || "") : "";
            } else {
                link = get("link");
            }

            const title = get("title");

            if (feed.categoryFilter) {
                let hasCategory = false;
                const cats = node.getElementsByTagName("category");
                for (let i = 0; i < cats.length; i++) {
                    if (cats[i].textContent.trim().toLowerCase() === feed.categoryFilter.toLowerCase()) {
                        hasCategory = true;
                        break;
                    }
                }
                if (!hasCategory) continue;
            }
            const rawDesc = isAtom ? (get("summary") || get("content")) : (get("description") || get("content:encoded"));
            const dateStr = isAtom ? (get("updated") || get("published")) : (get("pubDate") || get("dc:date"));
            const date = dateStr ? new Date(dateStr) : null;

            if (!title || !safeUrl(link)) continue;
            items.push({
                source: feed.name,
                title,
                link: safeUrl(link),
                date: (date && !isNaN(date)) ? date : null,
                snippet: truncate(stripHtml(rawDesc), SNIPPET_LEN),
                image: pickImage(node),
            });
        }
        return items.slice(0, PER_FEED_LIMIT);
    }

    function buildCard(item) {
        const card = el("article", "card news-card");

        const imgWrap = el("div", "card-image-wrapper");
        if (item.image) {
            const img = document.createElement("img");
            img.loading = "lazy"; img.alt = ""; img.src = item.image;
            img.onerror = () => { imgWrap.innerHTML = ""; imgWrap.appendChild(buildFallback(item.source)); };
            imgWrap.appendChild(img);
        } else {
            imgWrap.appendChild(buildFallback(item.source));
        }
        imgWrap.appendChild(el("div", "card-image-overlay"));
        const imgLink = el("a"); imgLink.href = item.link; imgLink.target = "_blank"; imgLink.rel = "noopener";
        imgLink.appendChild(imgWrap);
        card.appendChild(imgLink);

        const wrap = el("div", "card-content-wrapper");
        const meta = el("div", "news-meta");
        meta.appendChild(el("span", "tech-tag news-source", item.source));
        const d = el("span", "news-date", timeAgo(item.date));
        if (item.date) d.title = item.date.toLocaleString();
        meta.appendChild(d);
        wrap.appendChild(meta);

        const h3 = el("h3");
        const a = el("a", null, item.title);
        a.href = item.link; a.target = "_blank"; a.rel = "noopener";
        h3.appendChild(a);
        wrap.appendChild(h3);

        if (item.snippet) wrap.appendChild(el("p", "news-snippet", item.snippet));

        const more = el("a", "btn btn-secondary btn-sm news-readmore", "Read more →");
        more.href = item.link; more.target = "_blank"; more.rel = "noopener";
        wrap.appendChild(more);

        card.appendChild(wrap);
        return card;
    }
    function buildFallback(label) { return el("div", "card-image-fallback", label); }

    function renderSkeleton(n = 6) {
        const grid = $("#news-grid");
        if (!grid) return;
        grid.innerHTML = "";
        for (let i = 0; i < n; i++) {
            const c = el("div", "card skeleton");
            c.appendChild(el("div", "card-image-wrapper"));
            const w = el("div", "card-content-wrapper");
            w.appendChild(el("div", "sk-line short"));
            w.appendChild(el("div", "sk-line")); w.appendChild(el("div", "sk-line"));
            w.appendChild(el("div", "sk-line short"));
            c.appendChild(w); grid.appendChild(c);
        }
    }

    function renderSourceList() {
        const ul = $("#rss-sources");
        if (!ul) return;
        ul.innerHTML = "";
        
        const activeFeeds = FEEDS.filter(f => f.active);
        const inactiveFeeds = FEEDS.filter(f => !f.active);
        
        const renderFeedRow = (f, isActive) => {
            const li = el("li", "source-row"); li.id = "src-" + slug(f.name);
            if (!isActive) li.style.opacity = "0.6"; // visually dim inactive rows
            
            li.appendChild(el("span", isActive ? "source-dot loading" : "source-dot fail"));
            
            const name = el("span", "source-name");
            const a = el("a", null, f.name); a.href = f.site; a.target = "_blank"; a.rel = "noopener";
            name.appendChild(a); li.appendChild(name);
            
            li.appendChild(el("span", "source-url", f.url));
            
            const stateSpan = el("span", "source-state", isActive ? "loading…" : "(Not selected)");
            if (!isActive) stateSpan.style.color = "var(--danger, #ef4444)";
            li.appendChild(stateSpan);
            
            ul.appendChild(li);
        };
        
        activeFeeds.forEach(f => renderFeedRow(f, true));
        inactiveFeeds.forEach(f => renderFeedRow(f, false));
    }

    function setSourceState(feed, ok, info) {
        const li = document.getElementById("src-" + slug(feed.name));
        if (!li) return;
        li.querySelector(".source-dot").className = "source-dot " + (ok ? "ok" : "fail");
        li.querySelector(".source-state").textContent = info;
    }

    let allNewsItems = [];
    let feedsDataMap = {};
    let cardsPerLoad = parseInt(localStorage.getItem('newsCardsPerLoad')) || 9;
    let currentDisplayCount = cardsPerLoad;
    const CACHE_KEY = "newsItemsCache";

    function updateAllNewsItemsFromMap() {
        let all = [];
        const activeFeedNames = FEEDS.filter(f => f.active).map(f => f.name);
        Object.entries(feedsDataMap).forEach(([sourceName, items]) => {
            if (activeFeedNames.includes(sourceName)) {
                all.push(...items);
            }
        });
        all.sort((a, b) => (b.date ? b.date.getTime() : 0) - (a.date ? a.date.getTime() : 0));
        allNewsItems = all.slice(0, TOTAL_LIMIT);
        renderNewsItems();
        try { localStorage.setItem(CACHE_KEY, JSON.stringify(feedsDataMap)); } catch(e){}
    }

    let isFetchingNews = false;
    let lastFetchTime = 0;

    async function loadNews(forceRefresh = false) {
        if (!$("#news-grid")) return;
        const active = FEEDS.filter(f => f.active);
        currentDisplayCount = cardsPerLoad;
        
        if (active.length === 0) {
            allNewsItems = [];
            renderNewsItems();
            renderSourceList();
            $("#news-status").textContent = "0 headlines · 0 feeds selected";
            return;
        }
        
        // 1. Stale-While-Revalidate (SWR)
        let hasCache = false;
        try {
            const cached = localStorage.getItem(CACHE_KEY);
            if (cached && Object.keys(feedsDataMap).length === 0) {
                const parsed = JSON.parse(cached);
                for (let source in parsed) {
                    parsed[source] = parsed[source].map(it => ({ ...it, date: it.date ? new Date(it.date) : null }));
                }
                feedsDataMap = parsed;
                hasCache = true;
            } else if (Object.keys(feedsDataMap).length > 0) {
                hasCache = true;
            }
        } catch(e) {}

        updateAllNewsItemsFromMap();
        renderSourceList();

        // Determine which feeds actually need fetching
        let feedsToFetch = active;
        if (!forceRefresh) {
            feedsToFetch = active.filter(f => !feedsDataMap[f.name] || feedsDataMap[f.name].length === 0);
        }

        if (feedsToFetch.length === 0) {
            $("#news-status").innerHTML = "<strong>" + allNewsItems.length + "</strong> headlines loaded.";
            return; // No need to hit the network
        }

        // 2. Anti-Spam Check for Network Requests
        const now = Date.now();
        if (isFetchingNews || now - lastFetchTime < 10000) {
            if (hasCache) {
                $("#news-status").innerHTML = "<strong>" + allNewsItems.length + "</strong> headlines (cached) · Wait a moment to refresh.";
            }
            return;
        }

        isFetchingNews = true;
        lastFetchTime = now;

        if (!hasCache || forceRefresh) {
            $("#news-status").textContent = "Updating feeds…";
        }
        if (forceRefresh) {
            renderSkeleton();
        }

        let okFeeds = active.length - feedsToFetch.length;
        let errors = [];
        let completedFeeds = 0;
        
        const checkDone = () => {
            completedFeeds++;
            if (completedFeeds === feedsToFetch.length) {
                isFetchingNews = false;
                if (allNewsItems.length === 0 && errors.length > 0) {
                    showErrorState(errors, active.length);
                } else {
                    $("#news-status").innerHTML =
                        "<strong>" + allNewsItems.length + "</strong> headlines · " +
                        okFeeds + "/" + active.length + " feeds updated · " + new Date().toLocaleTimeString();
                }
            }
        };

        const fetchAndProcess = async (feed) => {
            try {
                const items = await fetchItems(feed);
                feedsDataMap[feed.name] = items;
                okFeeds++;
                setSourceState(feed, true, items.length + " items");
                updateAllNewsItemsFromMap();
            } catch (err) {
                const msg = err.message || "failed";
                setSourceState(feed, false, msg);
                errors.push(feed.name + " — " + msg);
            } finally {
                checkDone();
            }
        };

        // 4. Fetch Prioritization
        const primarySources = ["The Hacker News", "BleepingComputer"];
        const primaryFeeds = feedsToFetch.filter(f => primarySources.includes(f.name));
        const secondaryFeeds = feedsToFetch.filter(f => !primarySources.includes(f.name));

        // 3. Progressive Rendering
        primaryFeeds.forEach(fetchAndProcess);
        
        if (secondaryFeeds.length > 0) {
            setTimeout(() => {
                secondaryFeeds.forEach(fetchAndProcess);
            }, 300);
        }
    }

    function showErrorState(errors, totalFeeds) {
        const grid = $("#news-grid");
        if (!grid) return;
        grid.innerHTML = "";
        
        const sandbox = errors.some(e => /failed to fetch|networkerror|load failed|content security/i.test(e));
        const empty = el("div", "card");
        empty.appendChild(el("h3", null, "No headlines loaded"));
        empty.appendChild(el("p", null, sandbox
            ? "Requests were blocked before reaching any proxy — that's an app/preview sandbox stopping outbound fetches (CSP). Open this file in a real browser tab or on your deployed GitHub Pages and it should load. The permanent fix is your own Cloudflare Worker proxy."
            : "Public proxies are often rate-limited"));
        if (errors.length) {
            const diag = el("p", null, errors.join("   •   "));
            diag.style.cssText = "font-family:ui-monospace,monospace;font-size:0.78rem;opacity:0.7;margin-bottom:1.25rem;";
            empty.appendChild(diag);
        }
        const btn = el("button", "btn btn-primary btn-sm", "Retry");
        btn.onclick = () => loadNews(true); empty.appendChild(btn);
        grid.appendChild(empty);
        $("#news-status").textContent = "0 headlines · " + 0 + "/" + totalFeeds + " feeds ok";
        
        const loadMoreContainer = $("#load-more-container");
        if (loadMoreContainer) loadMoreContainer.style.display = 'none';
    }

    function renderNewsItems() {
        const grid = $("#news-grid");
        if (!grid) return;
        
        grid.innerHTML = "";
        const itemsToRender = allNewsItems.slice(0, currentDisplayCount);
        itemsToRender.forEach(it => grid.appendChild(buildCard(it)));
        
        const loadMoreContainer = $("#load-more-container");
        if (loadMoreContainer) {
            if (currentDisplayCount < allNewsItems.length) {
                loadMoreContainer.style.display = 'block';
            } else {
                loadMoreContainer.style.display = 'none';
            }
        }
    }

    const refreshBtn = $("#refresh-btn");
    if (refreshBtn) refreshBtn.addEventListener("click", () => loadNews(true));

    const filterBtn = $("#filter-btn");
    const filterPanel = $("#filter-panel");
    const cancelFilterBtn = $("#cancel-filter-btn");
    const applyFilterBtn = $("#apply-filter-btn");
    const filterCheckboxes = $("#filter-checkboxes");
    const cardsPerLoadSelect = $("#cards-per-load");

    if (filterBtn && filterPanel) {
        filterBtn.addEventListener("click", () => {
            filterPanel.style.display = filterPanel.style.display === "none" ? "block" : "none";
            if (filterPanel.style.display === "block") {
                filterCheckboxes.innerHTML = "";
                FEEDS.forEach((f, i) => {
                    const lbl = document.createElement("label");
                    lbl.style.cssText = "display: flex; align-items: center; gap: 0.5rem; cursor: pointer;";
                    const cb = document.createElement("input");
                    cb.type = "checkbox"; cb.checked = f.active; cb.dataset.idx = i;
                    lbl.appendChild(cb);
                    lbl.appendChild(document.createTextNode(f.name));
                    filterCheckboxes.appendChild(lbl);
                });
                if (cardsPerLoadSelect) cardsPerLoadSelect.value = cardsPerLoad;
            }
        });

        cancelFilterBtn.addEventListener("click", () => { filterPanel.style.display = "none"; });

        applyFilterBtn.addEventListener("click", () => {
            const cbs = filterCheckboxes.querySelectorAll("input[type=checkbox]");

            const savedFeeds = {};
            cbs.forEach(cb => {
                const idx = parseInt(cb.dataset.idx);
                FEEDS[idx].active = cb.checked;
                savedFeeds[FEEDS[idx].name] = cb.checked;
            });
            localStorage.setItem('newsActiveFeeds', JSON.stringify(savedFeeds));
            
            if (cardsPerLoadSelect) {
                cardsPerLoad = parseInt(cardsPerLoadSelect.value);
                localStorage.setItem('newsCardsPerLoad', cardsPerLoad);
            }
            
            filterPanel.style.display = "none";
            loadNews();
        });
    }

    const loadMoreBtn = $("#load-more-btn");
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", () => {
            currentDisplayCount += cardsPerLoad;
            renderNewsItems();
        });
    }

    // Check if we start on the news view to load immediately, or bind to nav link clicks
    if (window.location.hash === '#news') {
        loadNews();
    }

    // We also should load news when navigating to the news tab
    const newsLinks = document.querySelectorAll('a[data-target="news"]');
    let loadedNews = false;
    newsLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!loadedNews) {
                loadNews();
                loadedNews = true;
            }
        });
    });

});
