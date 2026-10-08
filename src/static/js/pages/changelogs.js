import { mountLayout } from '../components/layout.js';
import { initReveal } from '../components/reveal.js';
import { escapeHtml, onReady } from '../core/dom.js';
import { loadMarked } from '../core/markdown.js';

const SOURCE = '/static/json/changelogs.json';
const external = 'target="_blank" rel="noopener noreferrer"';

function pill(href, label, icon, title) {
    return `<a class="btn btn--ghost btn--sm" href="${escapeHtml(href)}" ${external} title="${title}">${escapeHtml(label)}<i class="${icon}" aria-hidden="true"></i></a>`;
}

function releaseCard(release, marked) {
    const pills = [
        release.chrome_url && release.chrome_release_date ? pill(release.chrome_url, release.chrome_release_date, 'fab fa-chrome', 'View on Web Store') : '',
        release.firefox_url && release.firefox_release_date ? pill(release.firefox_url, release.firefox_release_date, 'fab fa-firefox-browser', 'View on Firefox Add-ons') : '',
        release.url ? pill(release.url, release.published_date, 'fab fa-github', 'View on GitHub') : '',
    ].join('');

    return `
    <article class="doc-card reveal" id="${escapeHtml(release.tag_name)}">
        <header class="doc-card__head">
            <h2 class="doc-card__title">${escapeHtml(release.name)}</h2>
            <div class="doc-card__meta">${pills}</div>
        </header>
        <div class="prose">${marked.parse(release.body || '')}</div>
    </article>`;
}

onReady(async () => {
    mountLayout();

    const container = document.querySelector('[data-changelog]');
    try {
        const [marked, data] = await Promise.all([
            loadMarked(),
            fetch(SOURCE).then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json();
            }),
        ]);
        container.innerHTML = data.releases.map((release) => releaseCard(release, marked)).join('');
        initReveal(container);
    } catch (error) {
        console.error('Error loading changelogs:', error);
        container.innerHTML = '<div class="doc-status"><p>Unable to load changelogs at this time.</p></div>';
    }
});
