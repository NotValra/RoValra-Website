// Global ad toggle. Set to true to request ads for the ad units (ins.adsbygoogle) on the page.
// The AdSense script in each page's <head> and /ads.txt stay active either way for site verification.
window.ADS_ENABLED = false;

if (window.ADS_ENABLED) {
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('ins.adsbygoogle').forEach(function () {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        });
    });
}
