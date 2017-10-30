import router from './router';
import utils from './services/utils';
import css from './stylesheets/style.css';

//index.js
const index = (function() {
	'use strict';
	window.addEventListener('load', function() {
		//redirect to /books/ or location.hash
		location.hash = location.hash === "#/" ? '#/books/' : location.hash;
		//ajax get books
		let books, user;
		let options = { method: 'GET', url: '/books/' };
		utils.ajax(options)
		.then( response => {
			books = JSON.parse(response).books;
			//call router and pass data
			router(books);
			let options = { method: 'GET', url: '/users/currentuser' };
			return utils.ajax(options)
		}).then ( response => {
			user = JSON.parse(response).user;
			if(user.admin && user.admin===true) {
				console.log(user);
				utils.addClass('#admin-link', 'visible');
			} else {
				utils.removeClass('#admin-link', 'visible');
			}
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
