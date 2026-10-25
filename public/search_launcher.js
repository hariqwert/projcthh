/**
 * Universal Search Launcher Helper
 * Enables Ctrl+K / Cmd+K and '/' quick-focus for search inputs across pages.
 */
(function () {
    'use strict';
    window.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key && e.key.toLowerCase() === 'k') {
            var searchInput = document.getElementById('searchInput') || document.getElementById('liveNowSearch') || document.getElementById('musicSearchInput');
            if (searchInput) {
                e.preventDefault();
                searchInput.focus();
                if (typeof searchInput.select === 'function') searchInput.select();
            }
        }
    });
})();
