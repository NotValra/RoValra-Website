import { LINKS } from '../core/config.js';

export const PERKS = [
    {
        layout: 'hero',
        icon: 'fa-solid fa-gift',
        title: 'Free forever',
        text: 'Every non-cosmetic feature is free, and will remain free.',
        visual: { type: 'price', value: '$0', unit: '/ month', crossed: ['Subscriptions', 'Locked features'] },
    },
    {
        layout: 'wide',
        icon: 'fa-brands fa-github',
        title: 'Open source',
        text: 'The full source code is available on GitHub for anyone to review or contribute to.',
        visual: { type: 'link', href: LINKS.github, label: 'View on GitHub' },
    },
    {
        icon: 'fa-solid fa-puzzle-piece',
        title: 'Compatible',
        text: 'Officially supported alongside:',
        visual: { type: 'tags', items: ['RoPro', 'RoSeal', 'RoQoL'] },
    },
    {
        icon: 'fa-solid fa-sliders',
        title: 'Fully configurable',
        text: 'Any feature can be turned off from the settings page.',
        visual: { type: 'toggles', items: ['Quick Play', 'Streamer mode'] },
    },
];
