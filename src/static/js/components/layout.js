import { mountFooter } from './footer.js';
import { mountInstallButtons } from './install.js';
import { mountNav } from './nav.js';
import { initReveal } from './reveal.js';
import { syncThemeAssets } from '../core/theme.js';

export function mountLayout() {
    document.documentElement.classList.add('js');
    mountNav();
    mountFooter();
    mountInstallButtons();
    initReveal();
    syncThemeAssets();
}
