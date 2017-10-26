//index.js
(function() {
	'use strict';
	
	window.addEventListener('hashchange', () => {
		if(location.hash.match(/#\/books\/.+[^\/]$/)) {
			if(window.innerWidth < 768) {
				utils.addClass("#nav-bar-top", "hidden");
			}
			utils.addClass('body', 'book');
		} else {
			utils.removeClass("#nav-bar-top", "hidden");
			
			utils.removeClass('body', 'book');
			utils.setHTML("#top-title", "");
		}
	}, false);
	
	window.addEventListener('load', (e) => {
		if(location.hash.match(/#\/books\/.+[^\/]$/)) {
			if(window.innerWidth < 768) {
				utils.addClass("#nav-bar-top", "hidden");
			}
			utils.addClass('body', 'book');
		}
	}, false);
	
	window.addEventListener('resize', () => {
		if(location.hash.match(/#\/books\/.+[^\/]$/) && window.innerWidth < 768) {
			utils.addClass("#nav-bar-top", "hidden");
		} else {
			utils.removeClass("#nav-bar-top", "hidden");
		}
	}, false);
	
})();
