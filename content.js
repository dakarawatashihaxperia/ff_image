o = new MutationObserver(() => {
    browser.storage.local.get().then((conf) => {
        if (conf.is_block) {
            const i = document.querySelectorAll('img');
            const v = document.querySelectorAll('video');
            
            i.forEach(e => {
                e.style.visibility = 'hidden';
            });
            v.forEach(e => {
                e.style.visibility = 'hidden';
            });
        }
	});
});

o.observe(document.querySelector('html'), {childList: true, subtree: true, attributes: false});
