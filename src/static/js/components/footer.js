import { ASSETS, LINKS } from '../core/config.js';
import { fromHtml } from '../core/dom.js';

const FOOTER_LINKS = [
    { label: 'Features', href: '/#features' },
    { label: 'FAQ', href: '/#support' },
    { label: 'Changelogs', href: '/changelogs/' },
    { label: 'Privacy Policy', href: '/privacy/' },
    { label: 'Terms of Use', href: '/tou/' },
    { label: 'GitHub', href: LINKS.github, external: true },
    { label: 'Discord', href: LINKS.discord, external: true },
];

export function mountFooter() {
    if (document.querySelector('.site-footer')) return;

    const links = FOOTER_LINKS.map(({ label, href, external }) =>
        `<a href="${href}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>`,
    ).join('');

    document.body.append(fromHtml(`
    <footer class="site-footer">
        <div class="site-footer__inner">
            <a class="site-footer__logo" href="/" aria-label="RoValra home">
                <img src="${ASSETS.logo}" alt="RoValra" width="69" height="12">
            </a>
            <nav class="site-footer__links" aria-label="Footer">${links}</nav>
            <p class="site-footer__copy">© ${new Date().getFullYear()} RoValra. Not affiliated with Roblox Corporation.</p>
        </div>
    </footer>`));
}
