'use strict';

let config = {
    is_block: false
};
const handler = () => {
    return {cancel: config.is_block}
};

initialize();

/**
 * Get current status and set browser icon.
 */
function initialize() {
    browser.storage.local.get().then((conf) => {
        config = conf;
        toggleImageListener();
        reloadIcon();
    });
}

/**
 * On Click, toggle Image Enable/Disable.
 */
browser.browserAction.onClicked.addListener(() => {
    config.is_block = !config.is_block;
    browser.storage.local.set(config);
    toggleImageListener();
    reloadIcon();
});

/**
 * EventListener toggle
 */
function toggleImageListener() {
    if (!config.is_block) {
        browser.webRequest.onBeforeRequest.removeListener(handler);
    }
    else {
        browser.webRequest.onBeforeRequest.addListener(
            handler,
            {urls: ['<all_urls>'], types:['image', 'imageset', 'media']},
            ['blocking']
        );
    }
}

/**
 * Reload toolbar icon.
 */
function reloadIcon() {
    if (config.is_block) {
        browser.browserAction.setIcon({path: 'icons/icon_blocked.svg'});
    }
    else {
        browser.browserAction.setIcon({path: 'icons/icon.svg'});
    }
}