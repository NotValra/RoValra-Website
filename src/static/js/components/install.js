import { ASSETS, LINKS } from '../core/config.js';

const STORES = {
    chrome: { name: 'Chrome', store: 'Chrome Web Store', href: LINKS.chromeStore, button: ASSETS.installButton, icon: 'fab fa-chrome' },
    firefox: { name: 'Firefox', store: 'Firefox Add-ons', href: LINKS.firefoxStore, button: ASSETS.installButtonFirefox, icon: 'fab fa-firefox-browser' },
};

export const isFirefox = () => /firefox|fxios/i.test(navigator.userAgent);

export function mountInstallButtons(root = document) {
    const [primary, secondary] = isFirefox()
        ? [STORES.firefox, STORES.chrome]
        : [STORES.chrome, STORES.firefox];

    root.querySelectorAll('[data-install]').forEach((link) => {
        link.href = primary.href;
        link.setAttribute('aria-label', `Install RoValra from ${primary.store}`);
        link.querySelector('img').src = primary.button;
    });

    root.querySelectorAll('[data-install-alt]').forEach((link) => {
        link.href = secondary.href;
        link.title = `Install RoValra from ${secondary.store}`;
        link.innerHTML = `<i class="${secondary.icon}" aria-hidden="true"></i><span>Get it for ${secondary.name}</span>`;
    });
}
