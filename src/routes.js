//routes.js
(function() {
	'use strict';
	if(location.hash === "") { location.hash = "#/"; }
	
	let oldhash, newhash;

	window.addEventListener('DOMContentLoaded', () => {
			newhash = location.hash;
			router(oldhash, newhash);
		}, false);

	window.addEventListener('hashchange', () => {
			oldhash = newhash;
			newhash = location.hash;
			router(oldhash, newhash);
		}, false);


	let router = (oldhash, newhash) => {
		
		var container = document.querySelector('#container');
		
		//ROUTES
		if(newhash === '#/') {
			//HOME
			utils.getFragment('/fragments/home/home.html', container, home)
			.then( controller => { controller(); });
		
		 } else if(newhash.match(/#\/books\/.+[^\/]$/)) {
			 //BOOK
			 utils.getFragment('/fragments/book/book.html', container, book)
			 .then( controller => { controller(); });
		
		} else {
			//FALLBACK
			location.hash = '#/';
		}
		
		//active link
		utils.activeLink();
	};

})();
