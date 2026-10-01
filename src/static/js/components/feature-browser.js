import { escapeHtml } from '../core/dom.js';
import { getCategories, getFeatures } from '../core/feature-data.js';
import { inlineMarkdown } from '../core/markdown.js';
import { openFeatureDialog } from './feature-dialog.js';

const COLLAPSED_COUNT = 8;
const ALL = 'all';

export function mountFeatureBrowser(root) {
    if (!root) return;

    const categories = getCategories();
    const features = getFeatures(categories);
    const ui = {
        chips: root.querySelector('[data-chips]'),
        search: root.querySelector('[data-search]'),
        grid: root.querySelector('[data-grid]'),
        more: root.querySelector('[data-more]'),
    };
    const state = { category: ALL, query: '', expanded: false };

    if (!features.length) {
        ui.grid.innerHTML = '<p class="tile-empty">Features could not be loaded right now.</p>';
        ui.more.hidden = true;
        return;
    }

    renderChips();
    render();

    ui.chips.addEventListener('click', (event) => {
        const chip = event.target.closest('[data-category]');
        if (!chip) return;
        state.category = chip.dataset.category;
        ui.chips.querySelectorAll('[data-category]').forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
        render();
    });

    ui.search.addEventListener('input', () => {
        state.query = ui.search.value.trim().toLowerCase();
        render();
    });

    ui.more.addEventListener('click', () => {
        state.expanded = !state.expanded;
        render();
        if (!state.expanded) root.scrollIntoView({ block: 'start' });
    });

    ui.grid.addEventListener('click', (event) => {
        const tile = event.target.closest('[data-feature]');
        const feature = tile && features.find((f) => f.key === tile.dataset.feature);
        if (feature) openFeatureDialog(feature);
    });

    function renderChips() {
        const chip = (key, label, count, pressed) =>
            `<button class="chip" type="button" data-category="${key}" aria-pressed="${pressed}">${escapeHtml(label)}<span class="chip__count">${count}</span></button>`;

        ui.chips.innerHTML = chip(ALL, 'All', features.length, true)
            + categories.map((c) => chip(c.key, c.title, c.features.length, false)).join('');
    }

    function matches() {
        return features.filter((f) =>
            (state.category === ALL || f.category.key === state.category)
            && (!state.query || f.searchText.includes(state.query)));
    }

    function tile(feature, index) {
        return `
        <button class="tile" type="button" data-feature="${escapeHtml(feature.key)}" style="--tile-delay:${Math.min(index, 12) * 30}ms">
            <span class="tile__icon"><i class="${feature.category.icon}" aria-hidden="true"></i></span>
            <h4 class="tile__title">${escapeHtml(feature.label)}</h4>
            <p class="tile__desc">${inlineMarkdown(feature.summary, { links: false })}</p>
        </button>`;
    }

    function render() {
        const list = matches();
        const filtering = state.category !== ALL || state.query;
        const collapsible = list.length > COLLAPSED_COUNT;
        const visible = state.expanded || !collapsible ? list : list.slice(0, COLLAPSED_COUNT);

        if (!list.length) {
            ui.grid.innerHTML = '<p class="tile-empty">No features match that search.</p>';
        } else if (state.expanded && !filtering) {
            let index = 0;
            ui.grid.innerHTML = categories.map((c) =>
                `<h3 class="tile-group-title">${escapeHtml(c.title)}</h3>${c.features.map((f) => tile(f, index++)).join('')}`,
            ).join('');
        } else {
            ui.grid.innerHTML = visible.map(tile).join('');
        }

        ui.more.hidden = !collapsible;
        ui.more.querySelector('span').textContent = state.expanded ? 'Show less' : `Show all ${list.length} features`;
        ui.more.querySelector('i').className = `fa-solid fa-chevron-${state.expanded ? 'up' : 'down'}`;
    }
}
