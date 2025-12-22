document.addEventListener('DOMContentLoaded', function() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
        }, { passive: true });
        
        navbarCollapse.addEventListener('hidden.bs.collapse', function() {});
    }
    
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 576 && navbarCollapse && navbarCollapse.classList.contains('show')) {
                try {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {toggle: false});
                    bsCollapse.hide();
                } catch (e) {
                    if (navbarCollapse) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            }
        }, { passive: true });
    });
    
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    const animatedElements = document.querySelectorAll('.feature-card, .svg-container');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 
        });
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
}); 