import { LINKS } from '../core/config.js';

export const PERKS = [
    {
        layout: 'hero',
        title: 'Free forever',
        text: 'Every non-cosmetic feature is free, and will remain free.',
        visual: { type: 'price', value: '$0', unit: '/ month', crossed: ['Subscriptions', 'Locked features'] },
    },
    {
        layout: 'wide',
        title: 'Open source',
        text: 'The full source code is available on GitHub for anyone to review or contribute to.',
        visual: { type: 'link', href: LINKS.github, label: 'View on GitHub' },
    },
    {
        title: 'Compatible',
        text: 'Officially supported alongside:',
        visual: { type: 'tags', items: ['RoPro', 'RoSeal', 'RoQoL'] },
    },
    {
        title: 'Fully configurable',
        text: 'Any feature can be turned off from the settings page.',
        visual: { type: 'toggles', items: ['Quick Play', { label: 'Streamer mode', robux: '12,345' }] },
    },
];
