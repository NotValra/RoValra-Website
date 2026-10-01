/*
 * Renders a legal markdown document (privacy policy, terms of use).
 * The page's <main> carries data-doc="<markdown url>" and optional data-fallback.
 * Sections in the markdown are marked with `<!-- section:id:icon classes -->`
 * followed by a `## Title`.
 */
import { mountLayout } from '../components/layout.js';
import { initReveal } from '../components/reveal.js';
import { escapeHtml, onReady } from '../core/dom.js';
import { loadMarked } from '../core/markdown.js';

const SECTION_MARKER = /<!-- section:(.*?):(.*?) -->/;
const DATE_LINE = /^\*\*(?:Effective Date|Last Updated):\*\*\s*(.*)$/m;
const TITLE_LINE = /^(?:#\s+.*|\*\*[^*]+\*\*)\s*\n/;

function parse(markdown) {
    let text = markdown.replace(/\r\n/g, '\n');

    const date = text.match(DATE_LINE)?.[1]?.trim() ?? null;
    text = text.replace(DATE_LINE, '');

    const parts = text.split(new RegExp(SECTION_MARKER.source, 'g'));
    const intro = parts[0].trim().replace(TITLE_LINE, '').trim();

    const sections = [];
    for (let i = 1; i < parts.length; i += 3) {
        const content = parts[i + 2].trim();
        sections.push({
            id: parts[i],
            icon: parts[i + 1],
            title: content.match(/^##\s+(.*)/)?.[1] ?? 'Section',
            body: content.replace(/^##\s+.*\n?/, ''),
        });
    }
    return { date, intro, sections };
}

function sectionCard({ id, icon, title, body }, marked) {
    return `
    <section class="doc-card reveal" id="${escapeHtml(id)}">
        <header class="doc-card__head">
            <h2 class="doc-card__title"><i class="${escapeHtml(icon)}" aria-hidden="true"></i>${escapeHtml(title)}</h2>
        </header>
        <div class="prose">${marked.parse(body)}</div>
    </section>`;
}

onReady(async () => {
    mountLayout();

    const main = document.querySelector('[data-doc]');
    const container = main.querySelector('[data-doc-body]');
    const dateEl = document.querySelector('[data-doc-date]');

    try {
        const [marked, markdown] = await Promise.all([
            loadMarked(),
            fetch(main.dataset.doc).then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.text();
            }),
        ]);

        const { date, intro, sections } = parse(markdown);
        if (date && dateEl) dateEl.textContent = `Last updated ${date}`;

        container.innerHTML = [
            intro ? `<div class="doc-card reveal"><div class="prose">${marked.parse(intro)}</div></div>` : '',
            ...sections.map((section) => sectionCard(section, marked)),
        ].join('');

        initReveal(container);

        if (window.location.hash) {
            document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView();
        }
    } catch (error) {
        console.error('Error loading document:', error);
        const fallback = main.dataset.fallback
            ? ` You can also read it on <a href="${main.dataset.fallback}" target="_blank" rel="noopener noreferrer">GitHub</a>.`
            : '';
        container.innerHTML = `<div class="doc-status"><p>Could not load this document. Please try again later.${fallback}</p></div>`;
    }
});
