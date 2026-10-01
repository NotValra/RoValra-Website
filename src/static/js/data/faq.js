import { LINKS } from '../core/config.js';

const link = (href, text) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}</a>`;
const DISCORD_FEEDBACK = 'https://discord.gg/GHd5cSKJRk';

/* `answer` is trusted HTML authored here. Order matters: ids are faq1, faq2, ... */
export const FAQ_ITEMS = [
    { icon: 'fas fa-shield-alt', question: 'Is this extension malicious?', answer: `No. But don't just take my word for it, read the ${link(LINKS.github, 'source code')} yourself.` },
    { icon: 'fab fa-firefox-browser', question: 'Does this extension support Firefox?', answer: 'No, but it might be coming at some point. Any extension on the Firefox Store claiming to be RoValra is not official and are ports made by the community.' },
    { icon: 'fas fa-ban', question: 'Is it bannable to use the extension?', answer: "No. This extension follows Roblox's ToS. Roblox is well aware of the extension existing, and will never ban you for using it. Keep in mind the extension is not endorsed by Roblox." },
    { icon: 'fas fa-dollar-sign', question: 'Is everything free?', answer: 'Yes, every non-cosmetic feature is free and will forever be free.' },
    { icon: 'fas fa-gift', question: 'Why was this extension made?', answer: 'It was made as a project to learn and to make quality of life free for everyone.' },
    { icon: 'fas fa-lightbulb', question: 'I have a feature request, where do I request it?', answer: `You can request it in the ${link(DISCORD_FEEDBACK, 'Discord Server')}.` },
    { icon: 'fas fa-sync-alt', question: 'Is this extension being actively maintained?', answer: 'Yes, RoValra is actively being supported with many new features and bug fixes always coming.' },
    { icon: 'fas fa-comment', question: 'I have feedback where can I share it?', answer: `You can share any feedback in our ${link(DISCORD_FEEDBACK, 'Discord Server')} in the suggestions channel.` },
    { icon: 'fas fa-user-cog', question: 'Who is developing RoValra?', answer: 'Valra is the only maintainer for RoValra. But multiple people have contributed on GitHub.' },
    { icon: 'fas fa-toggle-off', question: "There's a feature I don't want, can I disable it?", answer: `Yes, all features can be disabled in ${link(LINKS.settings, 'settings')}.` },
    { icon: 'fas fa-check', question: 'Does RoValra work with other extensions?', answer: 'Yes! RoValra officially supports extensions like RoPro, BetterBlox v1, RoSeal, and RoQoL.' },
    { icon: 'fas fa-sync', question: 'Does the extension automatically update?', answer: 'Yes, but only if you installed it from the Chrome Web Store. It will automatically update unless specifically disabled.' },
];
