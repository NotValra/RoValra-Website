import { MARKED_URL } from './config.js';
import { escapeHtml } from './dom.js';

const SAFE_URL = /^(https?:|mailto:|\/|#)/i;

export function inlineMarkdown(text, { links = true } = {}) {
    return escapeHtml(text)
        .replace(/\{\{\s*([\s\S]*?)\s+\w+\s*\}\}/g, '$1')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\[(.*?)\]\((.*?)\)/g, (_, label, href) => {
            if (!links || !SAFE_URL.test(href)) return label;
            return `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
        });
}

let markedPromise;
export function loadMarked() {
    markedPromise ??= import(MARKED_URL).then(({ marked }) => {
        marked.setOptions({ gfm: true, breaks: true });
        return marked;
    });
    return markedPromise;
}
