import router from './router';
import utils from './services/utils';
import css from './stylesheets/style.css';

//index.js
const index = (function() {
	'use strict';
	window.addEventListener('load', function() {
		let options = { method: 'GET', url: '/books/' };
		utils.ajax(options)
		.then( response => {
			let books = JSON.parse(response);
			router(books);
			location.hash = location.hash === "#/" ? '#/books/' : location.hash;
		});
	}, false);
	

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

})()
