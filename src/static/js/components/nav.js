import { ASSETS, LINKS } from '../core/config.js';
import { fromHtml } from '../core/dom.js';

const NAV_ITEMS = [
    { label: 'Features', href: '/#features' },
    { label: 'FAQ', href: '/#support' },
    { label: 'Changelogs', href: '/changelogs/' },
];

const external = 'target="_blank" rel="noopener noreferrer"';

function template() {
    const path = window.location.pathname;
    const items = NAV_ITEMS.map(({ label, href }) => {
        const current = !href.includes('#') && path.startsWith(href) ? ' aria-current="page"' : '';
        return `<li><a class="site-nav__link" href="${href}"${current}>${label}</a></li>`;
    }).join('');

    return `
    <header class="site-nav" id="siteNav">
        <nav class="site-nav__bar" aria-label="Main">
            <a class="site-nav__logo" href="/" aria-label="RoValra home">
                <img src="${ASSETS.logo}" alt="RoValra" width="97" height="17">
            </a>
            <button class="site-nav__toggle" type="button" aria-expanded="false" aria-controls="siteNavLinks" aria-label="Toggle menu">
                <i class="fa-solid fa-bars" aria-hidden="true"></i>
            </button>
            <ul class="site-nav__links" id="siteNavLinks">
                ${items}
                <li><a class="site-nav__link site-nav__link--icon" href="${LINKS.discord}" ${external} title="Discord"><i class="fab fa-discord" aria-hidden="true"></i><span class="label">Discord</span></a></li>
                <li><a class="site-nav__link site-nav__link--icon" href="${LINKS.github}" ${external} title="GitHub"><i class="fab fa-github" aria-hidden="true"></i><span class="label">GitHub</span></a></li>
                <li class="site-nav__install">
                    <a class="btn-install" href="${LINKS.install}" ${external} aria-label="Install RoValra">
                        <img src="${ASSETS.installButton}" alt="" width="136" height="30">
                    </a>
                </li>
            </ul>
        </nav>
    </header>`;
}

export function mountNav() {
    if (document.getElementById('siteNav')) return;

    const nav = fromHtml(template());
    document.body.prepend(nav);

    const toggle = nav.querySelector('.site-nav__toggle');
    const setOpen = (open) => {
        nav.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.firstElementChild.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    };

    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    nav.querySelectorAll('.site-nav__links a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (event) => event.key === 'Escape' && setOpen(false));
}
