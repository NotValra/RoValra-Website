// Global ad toggle. Set to true to show the ad slots (.ads containers) and request ads for them.
// The AdSense script in each page's <head> and /ads.txt stay active either way for site verification.
window.ADS_ENABLED = false;

document.documentElement.classList.toggle('ads-off', !window.ADS_ENABLED);

if (window.ADS_ENABLED) {
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.ads .adsbygoogle').forEach(function () {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        });
    });
}
