

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        injectNavbar();
        injectFooter();
        initNavigationScrollEffect();
    });


    function injectNavbar() {
        if (document.querySelector('.nav-wrapper')) return;

        if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
            document.body.classList.add('is-home');
        }

        const navbarHTML = `
        <div class="nav-wrapper">
            <nav class="nav-island" id="mainNav">
                <a href="/">
                    <img src="/static/img/logo-base.svg" class="nav-logo-img" alt="RoValra" width="120" height="30">
                </a>
                <ul class="nav-links">
                    <li><a href="/#featuresSection" class="nav-text-link">Features</a></li>
                    <li><a href="/#supportSection" class="nav-text-link">Support</a></li>
                    <li><a href="/changelogs/" class="nav-text-link">Changelogs</a></li>
                    <li>
                        <a href="https://discord.gg/aw6rEnFSjV" target="_blank" rel="noopener noreferrer" title="Discord">
                            <i class="fab fa-discord"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/NotValra/RoValra" target="_blank" rel="noopener noreferrer" title="GitHub">
                            <i class="fab fa-github"></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://chromewebstore.google.com/detail/rovalra-roblox-improved/njcickgebhnpgmoodjdgohkclfplejli" target="_blank" rel="noopener noreferrer" class="fancy-button nav-install-btn">
                            <img src="/static/img/install-button-icon.svg" class="icon" alt="Install" width="100" height="24">
                        </a>
                    </li>
                </ul>
            </nav>
            <button class="scroll-top-btn" id="scrollTopBtn" title="Scroll to top">
                <i class="fas fa-chevron-up"></i>
            </button>
            <a href="/" class="back-home-btn" id="backHomeBtn" title="Back to Home">
                <i class="fas fa-home"></i>
            </a>
        </div>
        `;

        document.body.insertAdjacentHTML('afterbegin', navbarHTML);

        const scrollTopBtn = document.getElementById('scrollTopBtn');
        const featuresSection = document.getElementById('featuresSection');

        const handleScroll = () => {
            if (!scrollTopBtn) return;
            const triggerPoint = featuresSection ? featuresSection.offsetTop - 100 : 400;
            scrollTopBtn.classList.toggle('show', window.scrollY > triggerPoint);
        };

        scrollTopBtn?.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', handleScroll);
    }

  
    function injectFooter() {
        if (document.querySelector('.footer-minimal')) return;

        const currentYear = new Date().getFullYear();
        
        const footerHTML = `
        <footer class="footer-minimal">
            <div class="container" style="max-width: 900px;">
                <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
                    <div class="opacity-50" style="font-size: 0.85rem;">
                        © ${currentYear} RoValra. Not affiliated with Roblox Corporation.
                    </div>
                    <div class="d-flex gap-4">
                        <a href="/privacy/" class="text-white opacity-50 text-decoration-none" style="font-size: 0.85rem;">Privacy Policy</a>
                        <a href="/tou/" class="text-white opacity-50 text-decoration-none" style="font-size: 0.85rem;">Terms of Use</a>
                    </div>
                </div>
            </div>
        </footer>
        `;

        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }


    function initNavigationScrollEffect() {
        document.body.classList.add('scrolled');
        
    }

    window.SharedComponents = {
        injectNavbar: injectNavbar,
        injectFooter: injectFooter,
        initNavigationScrollEffect: initNavigationScrollEffect
    };

})();