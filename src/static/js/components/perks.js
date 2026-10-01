export function renderPerks(root, perks) {
    if (!root) return;
    root.innerHTML = perks.map((perk, index) => `
        <div class="perk reveal" data-reveal-delay="${index * 70}">
            <span class="perk__icon"><i class="${perk.icon}" aria-hidden="true"></i></span>
            <h3>${perk.title}</h3>
            <p>${perk.text}</p>
        </div>`).join('');
}
