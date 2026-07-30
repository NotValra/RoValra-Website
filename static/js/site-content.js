/* Content registries and renderers for repeatable site sections. */
(function () {
    const faqItems = [
        { icon: 'fas fa-shield-alt', question: 'Is this extension malicious?', answer: 'No. But don\'t just take my word for it, read the <a href="https://github.com/NotValra/RoValra" target="_blank" rel="noopener noreferrer" class="text-info text-decoration-underline fw-bold">source code</a> yourself.' },
        { icon: 'fab fa-firefox-browser', question: 'Does this extension support Firefox?', answer: 'No, but it might be coming at some point. Any extension on the Firefox Store claiming to be RoValra is not official and are ports made by the community.' },
        { icon: 'fas fa-ban', question: 'Is it bannable to use the extension?', answer: "No. This extension follows Roblox's ToS. Roblox is well aware of the extension existing, and will never ban you for using it. Keep in mind the extension is not endorsed by Roblox." },
        { icon: 'fas fa-dollar-sign', question: 'Is everything free?', answer: 'Yes, every non-cosmetic feature is free and will forever be free.' },
        { icon: 'fas fa-gift', question: 'Why was this extension made?', answer: 'It was made as a project to learn and to make quality of life free for everyone.' },
        { icon: 'fas fa-lightbulb', question: 'I have a feature request, where do I request it?', answer: 'You can request it in the <a href="https://discord.gg/GHd5cSKJRk" target="_blank" rel="noopener noreferrer" class="text-info text-decoration-underline fw-bold">Discord Server</a>.' },
        { icon: 'fas fa-sync-alt', question: 'Is this extension being actively maintained?', answer: 'Yes, RoValra is actively being supported with many new features and bug fixes always coming.' },
        { icon: 'fas fa-comment', question: 'I have feedback where can I share it?', answer: 'You can share any feedback in our <a href="https://discord.gg/GHd5cSKJRk" target="_blank" rel="noopener noreferrer" class="text-info text-decoration-underline fw-bold">Discord Server</a> in the suggestions channel.' },
        { icon: 'fas fa-user-cog', question: 'Who is developing RoValra?', answer: 'Valra is the only maintainer for RoValra. But multiple people have contributed on GitHub.' },
        { icon: 'fas fa-toggle-off', question: "There's a feature I don't want, can I disable it?", answer: 'Yes, all features can be disabled in <a href="https://www.roblox.com/my/account?rovalra=info#!/info" target="_blank" rel="noopener noreferrer" class="text-info text-decoration-underline fw-bold">settings</a>.' },
        { icon: 'fas fa-check', question: 'Does RoValra work with other extensions?', answer: 'Yes! RoValra officially supports extensions like RoPro, BTRoblox, BetterBlox v1, RoGold, RoSeal, and RoQoL.' },
        { icon: 'fas fa-sync', question: 'Does the extension automatically update?', answer: 'Yes, but only if you installed it from the Chrome Web Store. It will automatically update unless specifically disabled.' }
    ];

    function renderFaqs(root, items) {
        if (!root) return;
        root.replaceChildren();
        items.forEach((item, index) => {
            const id = `faq${index + 1}`;
            const headingId = `${id}-heading`;
            const wrapper = document.createElement('div');
            wrapper.className = 'accordion-item';
            wrapper.innerHTML = `
                <h2 class="accordion-header" id="${headingId}">
                    <button class="accordion-button${index ? ' collapsed' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#${id}" aria-expanded="${index === 0}" aria-controls="${id}">
                        <i class="${item.icon} me-2" aria-hidden="true"></i>${item.question}
                    </button>
                </h2>
                <div id="${id}" class="accordion-collapse collapse${index === 0 ? ' show' : ''}" aria-labelledby="${headingId}" data-bs-parent="#${root.id}">
                    <div class="accordion-body">${item.answer}</div>
                </div>`;
            root.appendChild(wrapper);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        renderFaqs(document.querySelector('[data-faq-list="faq"]'), faqItems);
    });

    window.SiteContent = Object.freeze({ faqItems, renderFaqs });
})();
