import router from './router';
import dataStore from './services/dataStore';
import localStore from './services/localStore';
import utils from './services/utils';
import screenfull from 'screenfull';

//index.js
var index = (function() {
	'use strict';
	
	let root;
	
	//let searchInput = () => {
		////MODAL SEARCH (small devices)
		////search open
		//root.querySelector("#search-open").addEventListener("click", event => {
			//event.preventDefault();
			//root.querySelector('#search-modal').style.display = 'block';
		//}, false);
		////search close
		//root.querySelector("#search-close").addEventListener("click", event => {
			//root.querySelector('#search-modal').style.display = 'none';
		//}, false);
		////search valid
		//root.querySelector("#search-form").addEventListener("submit", event => {
			//event.preventDefault();
			//let search = root.querySelector('[name=search]').value;
			//if(search!=='') {
				//location.hash = '#/search?q=' + search;
			//}
			//root.querySelector('#search-modal').style.display = 'none';
			//root.querySelector('[name=search]').value = '';
		//}, false);
		
	//}
	
	let init = () => {
		root = document.querySelector("body");
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
		//HEADER, NAV-BAR-TOP, MENU-OPEN
		//on hashchange
		window.addEventListener('hashchange', () => {
			if(location.hash.match(/#\/[^\/]+\/read$/)) {
				utils.addClass("#header", "hidden");
				utils.addClass("#nav-bar-top", "hidden");
			} else {
				utils.removeClass("#header", "hidden");
				utils.removeClass("#nav-bar-top", "hidden");
				if(window.innerWidth < 750) {
					utils.addClass("#nav-bar-top", "hidden");
					utils.removeClass("#menu-open", "hidden");
				} else {
					utils.removeClass("#nav-bar-top", "hidden");
					utils.addClass("#menu-open", "hidden");
				}
			}
			
		}, false);
		//on resize
		window.addEventListener('resize', () => {
			if(!location.hash.match(/#\/[^\/]+\/read$/)) {
				if(window.innerWidth < 750) {
					utils.addClass("#nav-bar-top", "hidden");
					utils.removeClass("#menu-open", "hidden");
				} else {
					utils.removeClass("#nav-bar-top", "hidden");
					utils.addClass("#menu-open", "hidden");
				}
			}
		}, false);
		//CHECK USERAGENT (for tableInfos)
		let ua = window.navigator.userAgent;
		let localUa = localStore.getUserAgent();
		if(!localUa || localUa!==ua) {
			localStore.removeTableInfos();
			localStore.setUserAgent(ua);
		}
		//FULLSCREEN
		let fs = document.querySelector('#fullscreen');
		let fsexit = document.querySelector('#fullscreenexit');
		if (!screenfull.enabled || window.matchMedia('(display-mode: standalone)').matches) {
			utils.removeClass(fs,'show');
		}
		
		fs.addEventListener('click', event => {
			if (screenfull.enabled) {
				screenfull.request();
			}
			utils.removeClass(fs,'show');
			utils.addClass(fsexit,'show');
		}, false);
		
		fsexit.addEventListener('click', event => {
			if (screenfull.enabled) {
				screenfull.exit();
			}
			utils.addClass(fs,'show');
			utils.removeClass(fsexit,'show');
		}, false);
	}
	
	//function getData
	let getData = () => {
		if(!location.hash.match(/#\/[^\/]+\/read$/)) {
			if(window.innerWidth < 750) {
				utils.addClass("#nav-bar-top", "hidden");
				utils.removeClass("#menu-open", "hidden");
			} else {
				utils.removeClass("#nav-bar-top", "hidden");
				utils.addClass("#menu-open", "hidden");
			}
		}
		//get authors and books
		let options = { method: 'GET', url: '/init' };
		return utils.ajax(options)
		.then( response => {
			let books = JSON.parse(response).books;
			let authors = JSON.parse(response).authors;
			//pass books to store
			dataStore.setData('books', books);
			//pass authors to store
			dataStore.setData('authors', authors);
			//check if user && user===admin
			let options = { method: 'GET', url: '/users/currentuser' };
			return utils.ajax(options)
		})
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
			return 'done';
		})
		.then( resolve => {
			//call router
			router();
			return 'done';
		})
		.then( resolve => {
			//init
			init();
			return 'done';
		})
		.catch( error => {
			dataStore.setData('currentUser', {});
			utils.addClass('#admin-item', 'hidden');
			utils.addClass('#menu-admin-item', 'hidden');
			//call router
			router();
			//init
			init();
			console.log(error);
		});
	}
	
	window.addEventListener('DOMContentLoaded', () => {
		getData();
	}, false);

})();
