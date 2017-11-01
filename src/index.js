import router from './router';
import dataStore from './services/dataStore';
import utils from './services/utils';
import css from './stylesheets/style.css';

//index.js
var index = function() {
	'use strict';
	//VARIABLES
	let currentUser;
	let books;
	
	//GET DATA
	window.addEventListener('load', () => {
		//redirect to /books/ or location.hash
		location.hash = location.hash === "#/" ? '#/books/' : location.hash;
		
		//ajax get currentUser
		let options = { method: 'GET', url: '/users/currentuser' };
		utils.ajax(options)
		.then( response => {
			currentUser = JSON.parse(response).user;
			//pass currentUser to store
			dataStore.setData('currentUser', currentUser);
			//check role : if admin => admin-link
			if(currentUser.admin && currentUser.admin===true) {
				utils.addClass('#admin-link', 'visible');
			} else {
				utils.removeClass('#admin-link', 'visible');
			}
			
			//ajax get books
			let options = { method: 'GET', url: '/books/' };
			return utils.ajax(options)
		})
		.then ( response => {
			books = JSON.parse(response).books;
			//pass books to store
			dataStore.setData('books', books);
			return 'done';
		})
		.then ( resolve => {
			//call router
			router();
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

};

index.call();
