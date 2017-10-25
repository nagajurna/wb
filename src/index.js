//index.js
(function() {
	'use strict';
	
	window.addEventListener('hashchange', () => {
		if(location.hash.match(/#\/books\/.+[^\/]$/)) {
			if(window.innerWidth < 768) {
				w3.addClass("#nav-bar-top", "hidden");
			}
			document.querySelector('body').className="book";
		} else {
			w3.removeClass("#nav-bar-top", "hidden");
			document.querySelector('body').className="";
			utils.setHTML("#top-title", "");
		}
	}, false);
	
	window.addEventListener('load', (e) => {
		if(location.hash.match(/#\/books\/.+[^\/]$/) && window.innerWidth < 768) {
			w3.addClass("#nav-bar-top", "hidden");
			
		}
	}, false);
	
	window.addEventListener('resize', () => {
		if(location.hash.match(/#\/books\/.+[^\/]$/) && window.innerWidth < 768) {
			w3.addClass("#nav-bar-top", "hidden");
		} else {
			w3.removeClass("#nav-bar-top", "hidden");
		}
	}, false);
	
	//window.addEventListener('scroll', function() {
		//if(document.body.scrollTop > 10 || document.querySelector("html").scrollTop > 10) {
			//document.querySelector('#nav-bar-top').className = 'scrolled';
		//} else {
			//document.querySelector('#nav-bar-top').className = '';
		//}
	//}, false);
	
})();
