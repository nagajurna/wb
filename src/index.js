import router from './router';
import dataStore from './services/dataStore';
import utils from './services/utils';

//index.js
var index = (function() {
	'use strict';
	let root;
	
	let init = () => {
		//if book/id/read 
		if(location.hash.match(/#\/books\/[^\/]+\/read$/)) {//if small device
			if(window.innerWidth < 768) {
				utils.addClass("#nav-bar-top", "hidden");
				utils.addClass('body', 'book');//body background
			}
			utils.addClass('body', 'book');//body background
			utils.addClass("#top-links", "hidden");
			utils.addClass("#menu-open", "hidden");
		} else {
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
		
		//HOME-LINK
		root.querySelector('#home-link').addEventListener('click', event => {
			event.preventDefault();
			if(location.hash.match(/#\/books\/[^\/]+\/read$/)) {
				let prevLocation = dataStore.getData('location').prevLocation;
				location.hash = prevLocation ? prevLocation : '#/';
			} else {
				location.hash = '#/';
			}
		}, false);
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
		})
		.catch( error => {
			console.log(error);
		});
	}
	
	window.addEventListener('DOMContentLoaded', (e) => {
		init();
		getData();
		
		window.addEventListener('hashchange', () => {
			if(location.hash.match(/#\/books\/[^\/]+\/read$/)) {
				if(window.innerWidth < 768) {
					utils.addClass("#nav-bar-top", "hidden");
				}
				utils.addClass('body', 'book');
				utils.addClass("#top-links", "hidden");
				utils.addClass("#top-links-small", "hidden");
			} else {
				utils.removeClass("#nav-bar-top", "hidden");
				utils.removeClass('body', 'book');
				utils.setHTML("#top-title", "");
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
			if(location.hash.match(/#\/books\/[^\/]+\/read$/)) {
				if(window.innerWidth < 768) {
					utils.addClass("#nav-bar-top", "hidden");
				} else {
					utils.removeClass("#nav-bar-top", "hidden");
				}
				
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
		
	}, false);

})();
