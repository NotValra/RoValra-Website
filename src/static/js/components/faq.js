const HASH_PREFIX = '#support_';

export function renderFaq(root, items) {
    if (!root) return;

    root.innerHTML = items.map((item, index) => `
        <details class="faq__item" id="faq${index + 1}">
            <summary class="faq__question"><i class="${item.icon}" aria-hidden="true"></i><span>${item.question}</span></summary>
            <div class="faq__answer">${item.answer}</div>
        </details>`).join('');

    const details = [...root.querySelectorAll('details')];
    details.forEach((item) => {
        item.addEventListener('toggle', () => {
            if (!item.open) return;
            details.forEach((other) => other !== item && (other.open = false));
            history.replaceState(null, '', `${HASH_PREFIX}${item.id}`);
        });
    });

    openFromHash(root);
}

function openFromHash(root) {
    const { hash } = window.location;
    if (!hash.startsWith(HASH_PREFIX)) return;

    const target = root.querySelector(`#${CSS.escape(hash.slice(HASH_PREFIX.length))}`);
    if (!target) return;

    target.open = true;
    const scroll = () => target.scrollIntoView({ block: 'start', behavior: 'instant' });
    if (document.readyState === 'complete') requestAnimationFrame(scroll);
    else window.addEventListener('load', scroll, { once: true });
}
