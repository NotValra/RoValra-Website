import { mountFooter } from './footer.js';
import { mountNav } from './nav.js';
import { initReveal } from './reveal.js';
import { syncThemeAssets } from '../core/theme.js';

export function mountLayout() {
    document.documentElement.classList.add('js');
    mountNav();
    mountFooter();
    initReveal();
    syncThemeAssets();
}
