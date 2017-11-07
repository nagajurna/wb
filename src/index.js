import router from './router';
import dataStore from './services/dataStore';
import utils from './services/utils';

//index.js
var index = (function() {
	'use strict';
	
	window.addEventListener('DOMContentLoaded', (e) => {
		
		//if book/id/read 
		if(location.hash.match(/#\/books\/[^\/]+\/read$/)) {//if small device
			if(window.innerWidth < 768) {
				utils.addClass("#nav-bar-top", "hidden");
			}
			utils.addClass('body', 'book');//body background
			utils.addClass('#nav-bar-top', 'w3-border-bottom');//nav-bar-top border
		}
		
		//GET DATA
		//check if user && user===admin
		let options = { method: 'GET', url: '/users/currentuser' };
		utils.ajax(options)
		.then( response => {
			let currentUser = JSON.parse(response).user;
			//pass currentUser to store
			dataStore.setData('currentUser', currentUser);
			//check role : if admin => admin-link
			if(currentUser.admin && currentUser.admin===true) {
				utils.addClass('#admin-link', 'visible');
			} else {
				utils.removeClass('#admin-link', 'visible');
			}
			
			//get authors
			let options = { method: 'GET', url: '/authors/' };
			return utils.ajax(options)
		})
		.then( response => {
			let authors = JSON.parse(response).authors;
			//pass authors to store
			dataStore.setData('authors', authors);
			
			//get books
			let options = { method: 'GET', url: '/books/' };
			return utils.ajax(options)
		})
		.then( response => {
			let books = JSON.parse(response).books;
			//pass books to store
			dataStore.setData('books', books);
			return 'done';
		})
		.then( resolve => {
			//call router
			router();
			//redirect to /books/ or location.hash
			location.hash = location.hash === "#/" ? '#/books/' : location.hash;
		})
		.catch( error => {
			console.log(error);
		});
	
	}, false);
		

	window.addEventListener('hashchange', () => {
		if(location.hash.match(/#\/books\/.+[^\/]$/)) {
			if(window.innerWidth < 768) {
				utils.addClass("#nav-bar-top", "hidden");
			}
			utils.addClass('body', 'book');
			utils.addClass('#nav-bar-top', 'w3-border-bottom');
		} else {
			utils.removeClass("#nav-bar-top", "hidden");
			
			utils.removeClass('body', 'book');
			utils.removeClass('#nav-bar-top', 'w3-border-bottom');
			utils.setHTML("#top-title", "");
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
