import { escapeHtml } from '../core/dom.js';

const MIN_ITEMS = 8;

const initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join('');

function renderCreator(creator, hidden) {
    const avatar = creator.avatar
        ? `<img src="${escapeHtml(creator.avatar)}" alt="" width="48" height="48" loading="lazy" decoding="async">`
        : `<span>${escapeHtml(initials(creator.name))}</span>`;
    return `
        <li class="creator"${hidden ? ' aria-hidden="true"' : ''}>
            <a href="${escapeHtml(creator.href)}" target="_blank" rel="noopener noreferrer"${hidden ? ' tabindex="-1"' : ''}>
                <span class="creator__avatar">${avatar}</span>
                <span class="creator__name">${escapeHtml(creator.name)}</span>
            </a>
        </li>`;
}

export function renderCreators(root, creators) {
    if (!root || !creators.length) return;
    const items = Array.from({ length: Math.ceil(MIN_ITEMS / creators.length) }, () => creators).flat();
    const list = (copy) => `
        <ul class="creators__list"${copy ? ' aria-hidden="true"' : ''}>${items.map((c, i) => renderCreator(c, copy || i >= creators.length)).join('')}
        </ul>`;
    root.innerHTML = `<div class="creators__track">${list(false)}${list(true)}</div>`;
    root.style.setProperty('--creators-duration', `${items.length * 5}s`);
}
