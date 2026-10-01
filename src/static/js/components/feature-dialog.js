import { escapeHtml, fromHtml } from '../core/dom.js';
import { inlineMarkdown } from '../core/markdown.js';

let dialog;

function ensureDialog() {
    if (dialog) return dialog;

    dialog = fromHtml(`
    <dialog class="feature-dialog" aria-labelledby="featureDialogTitle">
        <div class="feature-dialog__inner">
            <button class="btn btn--ghost btn--icon btn--sm feature-dialog__close" type="button" aria-label="Close">
                <i class="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>
            <div class="feature-dialog__head">
                <span class="tile__icon"><i aria-hidden="true"></i></span>
                <div>
                    <span class="kicker"></span>
                    <h3 class="feature-dialog__title" id="featureDialogTitle"></h3>
                </div>
            </div>
            <div class="feature-dialog__body"></div>
        </div>
    </dialog>`);

    document.body.append(dialog);
    dialog.querySelector('.feature-dialog__close').addEventListener('click', () => dialog.close());
    // Clicking the backdrop (the dialog element itself, outside the inner box) closes it.
    dialog.addEventListener('click', (event) => event.target === dialog && dialog.close());
    return dialog;
}

function notice(kind, label, text) {
    return `<div class="notice notice--${kind}"><strong>${label}:</strong>${inlineMarkdown(text)}</div>`;
}

export function openFeatureDialog(feature) {
    const el = ensureDialog();

    el.querySelector('.tile__icon i').className = feature.category.icon;
    el.querySelector('.kicker').textContent = feature.category.title;
    el.querySelector('.feature-dialog__title').textContent = feature.label;

    const lines = feature.description.map((line) => `<li>${inlineMarkdown(line)}</li>`).join('');
    const options = feature.options.length
        ? `<p style="margin-top:1rem"><strong>Options</strong></p><ul>${feature.options.map((o) => `<li>${escapeHtml(o)}</li>`).join('')}</ul>`
        : '';

    el.querySelector('.feature-dialog__body').innerHTML = [
        feature.description.length > 1 ? `<ul>${lines}</ul>` : `<p>${inlineMarkdown(feature.summary)}</p>`,
        options,
        feature.beta ? notice('beta', 'Beta', feature.beta) : '',
        feature.experimental ? notice('experimental', 'Experimental', feature.experimental) : '',
    ].join('');

    el.showModal();
}
