import { ASSETS } from '../core/config.js';
import { escapeHtml } from '../core/dom.js';

const external = 'target="_blank" rel="noopener noreferrer"';

function card(item, index) {
    const eager = index < 2;
    return `
    <article class="feature-card reveal" data-reveal-delay="${(index % 2) * 90}">
        <div class="feature-card__media">
            <img src="${item.image}" alt="${escapeHtml(item.alt)}" width="1280" height="853" decoding="async"${eager ? '' : ' loading="lazy"'}>
        </div>
        <div class="feature-card__body">
            <span class="kicker">${escapeHtml(item.kicker)}</span>
            <h3 class="feature-card__title">${escapeHtml(item.title)}</h3>
            <p class="feature-card__desc">${escapeHtml(item.description)}</p>
        </div>
    </article>`;
}

function credit(c) {
    return `
    <p class="image-credit">
        <span>Images made by</span>
        <a href="${c.discord.href}" ${external}>${c.discord.name} <i class="fab fa-discord" aria-hidden="true"></i></a>
        <a href="${c.roblox.href}" ${external}>${c.roblox.name} <img src="${ASSETS.robloxIcon}" alt="Roblox"></a>
        <a href="${c.x}" ${external} aria-label="dookwork on X"><i class="fab fa-x-twitter" aria-hidden="true"></i></a>
        <a href="${c.tiktok}" ${external} aria-label="dookwork on TikTok"><i class="fab fa-tiktok" aria-hidden="true"></i></a>
    </p>`;
}

export function renderShowcase(root, items, imageCredit) {
    if (!root) return;
    root.innerHTML = `<div class="featured">${items.map(card).join('')}</div>${imageCredit ? credit(imageCredit) : ''}`;
}
