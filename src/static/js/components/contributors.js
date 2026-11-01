import { escapeHtml } from '../core/dom.js';

const CONTRIBUTORS_URL = 'https://api.github.com/repos/NotValra/RoValra/contributors?per_page=100';

async function fetchContributors() {
    const res = await fetch(CONTRIBUTORS_URL, { headers: { Accept: 'application/vnd.github+json' } });
    if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
    const data = await res.json();
    return data.filter((c) => c.type === 'User');
}

function renderContributor(c) {
    const label = `${c.login} · ${c.contributions} contribution${c.contributions === 1 ? '' : 's'}`;
    return `
        <li class="contributor">
            <a href="${escapeHtml(c.html_url)}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(label)}" aria-label="${escapeHtml(label)}">
                <img src="${escapeHtml(`${c.avatar_url}&s=96`)}" alt="" width="48" height="48" loading="lazy" decoding="async">
            </a>
        </li>`;
}

export async function loadContributors(root) {
    if (!root) return;
    const section = root.closest('section');
    try {
        const contributors = await fetchContributors();
        if (!contributors.length) throw new Error('No contributors');
        root.innerHTML = contributors.map(renderContributor).join('');
        const count = section?.querySelector('[data-contributor-count]');
        if (count) count.textContent = contributors.length;
    } catch (error) {
        if (section) section.hidden = true;
        throw error;
    }
}
