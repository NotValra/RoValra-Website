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
        <ul class="perk__toggles" aria-hidden="true">${v.items.map((item, i) => {
            const { label, robux } = typeof item === 'string' ? { label: item } : item;
            return `
            <li><span class="perk__toggle-label">${escapeHtml(label)}${robux ? robuxBalance(robux) : ''}</span><span class="perk__switch${i === 0 ? ' is-on' : ''}"></span></li>`;
        }).join('')}
        </ul>`,
};

const ROBUX_ICON = `
    <svg class="perk__robux-icon" viewBox="0 0 32 32" aria-hidden="true">
        <path fill="currentColor" d="M15.0762 7.29574C15.6479 6.96571 16.3521 6.96571 16.9238 7.29574L23.0762 10.8479C23.6479 11.1779 24 11.7878 24 12.4479V19.5521C24 20.2122 23.6479 20.8221 23.0762 21.1521L16.9238 24.7043C16.3521 25.0343 15.6479 25.0343 15.0762 24.7043L8.92376 21.1521C8.35214 20.8221 8 20.2122 8 19.5521V12.4479C8 11.7878 8.35214 11.1779 8.92376 10.8479L15.0762 7.29574ZM11.9998 13V19C11.9998 19.5523 12.4475 20 12.9998 20H18.9998C19.5521 20 19.9998 19.5523 19.9998 19V13C19.9998 12.4477 19.5521 12 18.9998 12H12.9998C12.4475 12 11.9998 12.4477 11.9998 13Z"/>
        <path fill="currentColor" d="M13.8556 2.56068C15.1825 1.81311 16.8175 1.81311 18.1444 2.56068L26.8556 7.46819C28.1825 8.21577 29 9.59734 29 11.0925V20.9075C29 22.4027 28.1825 23.7842 26.8556 24.5318L18.1444 29.4393C16.8175 30.1869 15.1825 30.1869 13.8556 29.4393L5.14444 24.5318C3.81746 23.7842 3 22.4027 3 20.9075V11.0925C3 9.59734 3.81746 8.21577 5.14444 7.46819L13.8556 2.56068ZM17.1628 4.30319C16.4452 3.89894 15.5548 3.89894 14.8372 4.30319L6.12611 9.2107C5.41362 9.61209 5 10.336 5 11.0925V20.9075C5 21.664 5.41362 22.3879 6.12611 22.7893L14.8372 27.6968C15.5548 28.1011 16.4452 28.1011 17.1628 27.6968L25.8739 22.7893C26.5864 22.3879 27 21.664 27 20.9075V11.0925C27 10.336 26.5864 9.61209 25.8739 9.2107L17.1628 4.30319Z"/>
    </svg>`;

function robuxBalance(amount) {
    return `
        <span class="perk__robux">${ROBUX_ICON}
            <span class="perk__robux-value">
                <span class="perk__robux-amount">${escapeHtml(amount)}</span>
                <span class="perk__robux-hidden">Hidden</span>
            </span>
        </span>`;
}

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
                <h3>${escapeHtml(perk.title)}</h3>
                <p>${escapeHtml(perk.text)}</p>
            </div>
            ${visual}
        </article>`;
    }).join('');
}
