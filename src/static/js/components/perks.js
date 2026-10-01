import { escapeHtml } from '../core/dom.js';

const VISUALS = {
    price: (v) => `
        <div class="perk__price">
            <p class="perk__price-tag">
                <span class="perk__price-value accent">${escapeHtml(v.value)}</span>
                <span class="perk__price-unit">${escapeHtml(v.unit)}</span>
            </p>
            <ul class="perk__crossed" aria-label="Not included">${v.crossed.map((item) => `
                <li><i class="fa-solid fa-xmark" aria-hidden="true"></i><s>${escapeHtml(item)}</s></li>`).join('')}
            </ul>
        </div>`,
    link: (v) => `
        <a class="perk__link" href="${escapeHtml(v.href)}" target="_blank" rel="noopener noreferrer">
            ${escapeHtml(v.label)} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
        </a>`,
    tags: (v) => `
        <ul class="perk__tags">${v.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`,
    toggles: (v) => `
        <ul class="perk__toggles" aria-hidden="true">${v.items.map((item, i) => `
            <li><span>${escapeHtml(item)}</span><span class="perk__switch${i === 0 ? ' is-on' : ''}"></span></li>`).join('')}
        </ul>`,
};

function trackPointer(root) {
    let frame = 0;
    let last = null;

    const update = () => {
        frame = 0;
        root.querySelectorAll('.perk').forEach((card) => {
            const rect = card.getBoundingClientRect();
            const x = last.clientX - rect.left;
            const y = last.clientY - rect.top;
            const clamp = (n) => Math.max(-1, Math.min(1, n));
            card.style.setProperty('--mx', `${x}px`);
            card.style.setProperty('--my', `${y}px`);
            card.style.setProperty('--dx', clamp((x / rect.width) * 2 - 1).toFixed(3));
            card.style.setProperty('--dy', clamp((y / rect.height) * 2 - 1).toFixed(3));
        });
    };

    root.addEventListener('pointermove', (event) => {
        last = event;
        frame ||= requestAnimationFrame(update);
    });

    root.addEventListener('pointerleave', () => {
        root.querySelectorAll('.perk').forEach((card) => {
            card.style.setProperty('--dx', '0');
            card.style.setProperty('--dy', '0');
        });
    });
}

export function renderPerks(root, perks) {
    if (!root) return;
    trackPointer(root);
    root.innerHTML = perks.map((perk, index) => {
        const visual = perk.visual ? VISUALS[perk.visual.type]?.(perk.visual) ?? '' : '';
        return `
        <article class="perk perk--${perk.layout || 'default'} reveal" data-reveal-delay="${index * 70}">
            <div class="perk__body">
                <span class="perk__icon"><i class="${perk.icon}" aria-hidden="true"></i></span>
                <h3>${escapeHtml(perk.title)}</h3>
                <p>${escapeHtml(perk.text)}</p>
            </div>
            ${visual}
        </article>`;
    }).join('');
}
