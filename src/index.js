import router from './router';
import dataStore from './services/dataStore';
import utils from './services/utils';

//index.js
var index = (function() {
	'use strict';
	
	let root;
	
	let searchInput = () => {
		//MODAL SEARCH (small devices)
		//search open
		root.querySelector("#search-open").addEventListener("click", event => {
			event.preventDefault();
			root.querySelector('#search-modal').style.display = 'block';
		}, false);
		//search close
		root.querySelector("#search-close").addEventListener("click", event => {
			root.querySelector('#search-modal').style.display = 'none';
		}, false);
		//search valid
		root.querySelector("#search-form").addEventListener("submit", event => {
			event.preventDefault();
			let search = root.querySelector('[name=search]').value;
			if(search!=='') {
				location.hash = '#/search?q=' + search;
			}
			root.querySelector('#search-modal').style.display = 'none';
			root.querySelector('[name=search]').value = '';
		}, false);
		
	}
	
	let init = () => {
		//if book/id/read 
		if(location.hash.match(/#\/[^\/]+\/read$/)) {
			utils.addClass("#nav-bar-top", "hidden");//hide nav-bar-top
		} else {
			utils.removeClass("#nav-bar-top", "hidden");
			if(window.innerWidth < 768) {
				utils.addClass("#top-links", "hidden");
				utils.removeClass("#menu-open", "hidden");
			} else {
				utils.removeClass("#top-links", "hidden");
				utils.addClass("#menu-open", "hidden");
			}
		}
		
		root = document.querySelector("#navigation");
		//MODAL MENU (small devices)
		//open modal
		root.querySelector("#menu-open").addEventListener("click", () => {
			root.querySelector('#menu').style.display='block';
		}, false);
		//close modal
		root.querySelector("#menu-close").addEventListener("click", () => {
			root.querySelector('#menu').style.display='none';
		}, false);
		//menu links : close modal on click
		let links = root.querySelectorAll("#menu a");
		for(let i=0; i<links.length; i++) {
			links[i].addEventListener("click", () => {
				setTimeout(() => {
					root.querySelector('#menu').style.display='none';
				},100);
			}, false);
		}
		
		searchInput();
		
	}
	
	//function getData
	let getData = () => {
		//check if user && user===admin
		let options = { method: 'GET', url: '/users/currentuser' };
		utils.ajax(options)
		.then( response => {
			let currentUser = JSON.parse(response).user;
			//pass currentUser to store
			dataStore.setData('currentUser', currentUser);
			//check role : if admin => admin-link
			if(currentUser.admin && currentUser.admin===true) {
				utils.removeClass('#admin-item', 'hidden');
				utils.removeClass('#menu-admin-item', 'hidden');
			} else {
				utils.addClass('#admin-item', 'hidden');
				utils.addClass('#menu-admin-item', 'hidden');
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
			utils.addClass('#screen', 'hidden');
		})
		.catch( error => {
			console.log(error);
		});
	}
	
	window.addEventListener('DOMContentLoaded', (e) => {
		init();
		getData();
		
		window.addEventListener('hashchange', () => {
			if(location.hash.match(/#\/[^\/]+\/read$/)) {
				utils.addClass("#nav-bar-top", "hidden");
			} else {
				utils.removeClass("#nav-bar-top", "hidden");
				if(window.innerWidth < 768) {
					utils.addClass("#top-links", "hidden");
					utils.removeClass("#menu-open", "hidden");
				} else {
					utils.removeClass("#top-links", "hidden");
					utils.addClass("#menu-open", "hidden");
				}
			}
			
		}, false);

		window.addEventListener('resize', () => {
			//utils.removeClass("#nav-bar-top", "hidden");
			if(window.innerWidth < 768) {
				utils.addClass("#top-links", "hidden");
				utils.removeClass("#menu-open", "hidden");
			} else {
				utils.removeClass("#top-links", "hidden");
				utils.addClass("#menu-open", "hidden");
			}
		}, false);
		
	}, false);

})();
