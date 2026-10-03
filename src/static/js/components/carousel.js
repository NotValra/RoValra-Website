import { escapeHtml, prefersReducedMotion } from '../core/dom.js';

const INTERVAL = 4500;

export function mountCarousel(root, items) {
    if (!root || items.length < 2) return;

    const track = root.querySelector('[data-carousel-track]');
    const existing = new Set([...track.querySelectorAll('img')].map((img) => img.getAttribute('src')));

    items.filter((item) => !existing.has(item.image)).forEach((item) => {
        track.insertAdjacentHTML('beforeend', `
            <div class="carousel__slide">
                <img src="${item.image}" alt="${escapeHtml(item.alt)}" loading="lazy" decoding="async">
            </div>`);
    });

    const slides = [...track.children];
    const dots = root.querySelector('[data-carousel-dots]');
    dots.innerHTML = slides.map((slide, i) =>
        `<button class="carousel__dot" type="button" aria-label="Show image ${i + 1} of ${slides.length}"></button>`,
    ).join('');
    root.style.setProperty('--carousel-interval', `${INTERVAL}ms`);

    const autoplay = !prefersReducedMotion();
    let index = 0;
    let timer = null;
    let remaining = INTERVAL;
    let startedAt = 0;
    let paused = false;

    const show = (next) => {
        index = (next + slides.length) % slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;
        slides.forEach((slide, i) => slide.setAttribute('aria-hidden', String(i !== index)));
        [...dots.children].forEach((dot, i) => {
            dot.setAttribute('aria-current', String(i === index));
            dot.classList.remove('is-progress');
        });

        if (!autoplay) return;
        const active = dots.children[index];
        void active.offsetWidth;
        active.classList.add('is-progress');
        remaining = INTERVAL;
        schedule();
    };

    function schedule() {
        clearTimeout(timer);
        if (paused) return;
        startedAt = performance.now();
        timer = setTimeout(() => show(index + 1), remaining);
    }

    const pause = () => {
        if (!autoplay || paused) return;
        paused = true;
        clearTimeout(timer);
        remaining = Math.max(0, remaining - (performance.now() - startedAt));
        root.classList.add('is-paused');
    };

    const resume = () => {
        if (!autoplay || !paused) return;
        paused = false;
        root.classList.remove('is-paused');
        schedule();
    };

    dots.addEventListener('click', (event) => {
        const dot = event.target.closest('.carousel__dot');
        if (dot) show([...dots.children].indexOf(dot));
    });

    root.addEventListener('mouseenter', pause);
    root.addEventListener('mouseleave', resume);
    root.addEventListener('focusin', pause);
    root.addEventListener('focusout', resume);
    document.addEventListener('visibilitychange', () => (document.hidden ? pause() : resume()));

    show(0);
}
