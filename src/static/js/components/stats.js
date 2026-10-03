import { CHROME_EXTENSION_ID } from '../core/config.js';
import { prefersReducedMotion } from '../core/dom.js';

const SHIELDS = 'https://img.shields.io/chrome-web-store';

async function badgeLabel(kind, pattern) {
    const svg = await fetch(`${SHIELDS}/${kind}/${CHROME_EXTENSION_ID}`).then((r) => r.text());
    return svg.match(pattern)?.[1] ?? null;
}

export async function loadStoreStats(root = document) {
    const set = (name, value) => {
        const el = root.querySelector(`[data-stat="${name}"]`);
        if (el && value) el.textContent = value;
    };

    const [rating, reviews, users] = await Promise.allSettled([
        badgeLabel('rating', /aria-label="rating: ([0-9.]+)\/5"/),
        badgeLabel('rating-count', /aria-label="rating: ([^"]+) total"/),
        badgeLabel('users', /aria-label="users: ([^"]+)"/),
    ]);

    if (rating.value) set('rating', rating.value);
    if (reviews.value) set('reviews', `${reviews.value}+ reviews`);
    if (users.value) set('users', `${users.value}+`);
}

export function countUp(el, target, { suffix = '', duration = 1400 } = {}) {
    if (!el || !Number.isFinite(target)) return;

    const finish = () => { el.textContent = `${target}${suffix}`; };
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return finish();

    const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        let done = false;
        const start = performance.now();
        const tick = (now) => {
            if (done) return;
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = `${Math.round(target * eased)}${suffix}`;
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        setTimeout(() => { done = true; finish(); }, duration + 100);
    }, { rootMargin: '0px 0px 15% 0px' });
    observer.observe(el);
}
