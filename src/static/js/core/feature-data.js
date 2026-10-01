/*
 * Adapter over `featuresData`, the global generated from the extension's
 * settingConfig.js by main.py (static/js/features.js). Everything else reads
 * features through here so the raw config shape only matters in one file.
 */

const EXCLUDED_FROM_LIST = new Set(['Developer', 'FunStuff']);
const PRIORITY_KEYS = ['SaveLotsRobuxEnabled', 'PreferredRegionEnabled', 'privateGameDetectionEnabled'];

const CATEGORY_ICONS = {
    Marketplace: 'fa-solid fa-store',
    Games: 'fa-solid fa-gamepad',
    Profile: 'fa-solid fa-user',
    Home: 'fa-solid fa-house',
    Communities: 'fa-solid fa-users',
    Avatar: 'fa-solid fa-shirt',
    transactions: 'fa-solid fa-receipt',
    Trading: 'fa-solid fa-right-left',
    Plus: 'fa-solid fa-plus',
    Navigation: 'fa-solid fa-compass',
    Miscellaneous: 'fa-solid fa-shapes',
    AntiAccountTracking: 'fa-solid fa-user-shield',
    WebsiteCustomization: 'fa-solid fa-palette',
    PublicDeveloper: 'fa-solid fa-code',
};
const DEFAULT_ICON = 'fa-solid fa-puzzle-piece';

const raw = () => (typeof featuresData !== 'undefined' ? featuresData : null); // eslint-disable-line no-undef

const isVisible = (setting) => setting && !setting.deprecated && !setting.hidden;
const firstOf = (value) => (Array.isArray(value) ? value[0] : value) || '';
const asList = (value) => (Array.isArray(value) ? value : value ? [value] : []);

function toFeature(key, setting, category) {
    const description = asList(setting.description);
    const options = Object.values(setting.childSettings || {})
        .filter(isVisible)
        .map((child) => firstOf(child.label))
        .filter(Boolean);

    return {
        key,
        label: firstOf(setting.label),
        description,
        summary: description[0] || '',
        options,
        beta: setting.beta || null,
        experimental: setting.experimental || null,
        category,
        searchText: [firstOf(setting.label), ...description].join(' ').toLowerCase(),
    };
}

/** Categories that are shown in the public feature list, each with its visible features. */
export function getCategories() {
    const data = raw();
    if (!data) return [];

    return Object.entries(data)
        .filter(([key, category]) => !EXCLUDED_FROM_LIST.has(key) && !category.hidden)
        .map(([key, category]) => {
            const meta = { key, title: category.title || key, icon: CATEGORY_ICONS[key] || DEFAULT_ICON };
            const features = Object.entries(category.settings || {})
                .filter(([, setting]) => isVisible(setting))
                .map(([settingKey, setting]) => toFeature(settingKey, setting, meta));
            return { ...meta, features };
        })
        .filter((category) => category.features.length > 0);
}

/** All listed features, flagship ones first. */
export function getFeatures(categories = getCategories()) {
    const all = categories.flatMap((category) => category.features);
    const priority = PRIORITY_KEYS.map((key) => all.find((f) => f.key === key)).filter(Boolean);
    return [...priority, ...all.filter((f) => !PRIORITY_KEYS.includes(f.key))];
}

/** Headline feature count (everything except developer-only settings). */
export function getFeatureCount() {
    const data = raw();
    if (!data) return null;

    return Object.entries(data)
        .filter(([key]) => key !== 'Developer')
        .reduce((sum, [, category]) => sum + Object.values(category.settings || {}).filter(isVisible).length, 0);
}
