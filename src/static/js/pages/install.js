import { mountLayout } from '../components/layout.js';
import { LINKS } from '../core/config.js';
import { onReady } from '../core/dom.js';

const REDIRECT_SECONDS = 3;

onReady(() => {
    mountLayout();

    const countdown = document.querySelector('[data-countdown]');
    const status = document.querySelector('[data-install-status]');
    document.querySelector('[data-install-link]').href = LINKS.chromeStore;

    let remaining = REDIRECT_SECONDS;
    const timer = setInterval(() => {
        remaining -= 1;
        if (remaining > 0) {
            countdown.textContent = remaining;
            return;
        }

        clearInterval(timer);
        status.textContent = 'Redirecting...';
        window.location.replace(LINKS.chromeStore);
    }, 1000);
});
