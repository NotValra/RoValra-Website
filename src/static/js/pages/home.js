import { mountCarousel } from '../components/carousel.js';
import { renderCreators } from '../components/creators.js';
import { mountFeatureBrowser } from '../components/feature-browser.js';
import { renderFaq } from '../components/faq.js';
import { mountLayout } from '../components/layout.js';
import { renderPerks } from '../components/perks.js';
import { renderShowcase } from '../components/showcase.js';
import { countUp, loadStoreStats } from '../components/stats.js';
import { onReady } from '../core/dom.js';
import { getFeatureCount } from '../core/feature-data.js';
import { mountThemeToggle } from '../core/theme.js';
import { CREATORS } from '../data/creators.js';
import { FAQ_ITEMS } from '../data/faq.js';
import { PERKS } from '../data/perks.js';
import { POWERED_PROJECTS } from '../data/powered.js';
import { IMAGE_CREDIT, SHOWCASE_ITEMS } from '../data/showcase.js';

onReady(() => {
    mountCarousel(document.querySelector('[data-carousel]'), SHOWCASE_ITEMS);
    renderCreators(document.querySelector('[data-creators]'), CREATORS);
    renderCreators(document.querySelector('[data-powered]'), POWERED_PROJECTS);
    renderShowcase(document.querySelector('[data-showcase]'), SHOWCASE_ITEMS, IMAGE_CREDIT);
    renderPerks(document.querySelector('[data-perks]'), PERKS);
    renderFaq(document.querySelector('[data-faq]'), FAQ_ITEMS);
    mountFeatureBrowser(document.querySelector('[data-feature-browser]'));

    const count = getFeatureCount();
    if (count) {
        document.querySelectorAll('[data-feature-count]').forEach((el) => { el.textContent = `${count}+`; });
        countUp(document.querySelector('[data-stat="features"]'), count, { suffix: '+' });
    }

    mountLayout();
    mountThemeToggle(document.querySelector('.hero__wordmark'));
    loadStoreStats().catch((error) => console.error('Error loading stats', error));
});
