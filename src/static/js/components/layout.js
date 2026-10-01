import { mountFooter } from './footer.js';
import { mountNav } from './nav.js';
import { initReveal } from './reveal.js';

/** Shared chrome for every page: nav, footer and scroll reveals. */
export function mountLayout() {
    document.documentElement.classList.add('js');
    mountNav();
    mountFooter();
    initReveal();
}
