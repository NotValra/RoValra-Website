const STORAGE_KEY = 'rovalra-theme';
const CLASSIC = 'classic';
const FAVICONS = { default: '/static/img/GILBERT.png', classic: '/static/img/classic-logo-icon.png' };

export function isClassic() {
    return document.documentElement.dataset.theme === CLASSIC;
}

const FALLBACK_FONT = 'https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap';

export function syncThemeAssets() {
    const icon = document.querySelector('link[rel="icon"]');
    if (icon) icon.href = isClassic() ? FAVICONS.classic : FAVICONS.default;

    if (isClassic() && !document.querySelector(`link[href="${FALLBACK_FONT}"]`)) {
        document.head.append(Object.assign(document.createElement('link'), { rel: 'stylesheet', href: FALLBACK_FONT }));
    }
}

export function setClassic(enabled) {
    if (enabled) document.documentElement.dataset.theme = CLASSIC;
    else delete document.documentElement.dataset.theme;

    try {
        if (enabled) localStorage.setItem(STORAGE_KEY, CLASSIC);
        else localStorage.removeItem(STORAGE_KEY);
    } catch {}

    syncThemeAssets();
}

export function mountThemeToggle(el) {
    if (!el) return;

    el.dataset.themeToggle = '';
    el.tabIndex = 0;
    el.setAttribute('role', 'button');

    const toggle = () => {
        setClassic(!isClassic());
        el.setAttribute('aria-pressed', String(isClassic()));
        el.classList.remove('is-switching');
        void el.offsetWidth;
        el.classList.add('is-switching');
    };

    el.setAttribute('aria-pressed', String(isClassic()));
    el.addEventListener('click', toggle);
    el.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        toggle();
    });
    el.addEventListener('animationend', () => el.classList.remove('is-switching'));
}
