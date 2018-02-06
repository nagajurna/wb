import utils from './services/utils';
import dataStore from './services/dataStore';
//home(controller)
import home from './components/home/home';
//search(controller)
import search from './components/search/search';
//books-next(controller)
import booksNext from './components/books-next/books-next';
//book-read (controller)
import bookRead from './components/book-read/book-read';
//authors (controller)
import authors from './components/authors/authors';
//adminLogin (controller)
import adminLogin from './components/adminLogin/adminLogin';
//admin (template - no controller)
let adminTemplate = require('./components/admin/admin.ejs');
//adminRouter (sub-router)
import adminRouter from './components/admin/adminRouter';

//routes.js
const router  = function() {
	'use strict';
	
	let routes = (oldhash, newhash) => {
		
		let container = document.querySelector('#container');
		
		//ROUTES
		if(newhash === '' || newhash === '#/') {
			//HOME
			home(container);
			
		} else if(newhash.match(/#\/search\?q=/)) {
			//SEARCH
			search(container);
		
		} else if(newhash === '#/tobepublished') {
			//TO BE PUBLISHED
			booksNext(container);
			
		} else if(newhash.match(/#\/[^\/]+\/read$/)) {
			//BOOK READ
			bookRead(container);
		
		} else if(newhash.match(/#\/authors\?(search=(A-Z))?/)) {
			//AUTHORS
			authors(container);
			
		} else if(newhash.match(/#\/admin/) && newhash !== '#/admin/login/') {
			//ADMIN : if admin not connected, redirect to /admin/login
			utils.checkRole()
			.then ( response => {//admin
				//Insert adminTemplate including #adminContainer for admin routes
				let user = response;
				container.innerHTML = "";//empty the container
				let div = document.createElement('div');
				div.innerHTML = adminTemplate();
				container.appendChild(div);
				utils.activeLink();//for adminLinks
				return user
			})
			.then ( user => {
				//ADMIN ROUTES : call to sub-router (admin routes)
				adminRouter(oldhash, newhash, user);
								
			})
			.catch( error => {//not admin
				location.hash = '#/admin/login/';
			})

			
		} else if(newhash === '#/admin/login/') {
			//ADMIN LOGIN : if admin already connected, redirect to /admin
			utils.checkRole()
			.then( admin => {//admin
				location.hash = '#/admin/';
			})
			.catch( error => {//not admin
				adminLogin(container);
			});
			
		
		} else {
			//FALLBACK
			location.hash = '#/';
		}
		
	};
	
	
	//ON LOAD (called by index.js)
	let oldhash, newhash;
	
	newhash = location.hash;
	dataStore.setData('location', { prevLocation: oldhash, newLocation: newhash });
	routes(oldhash, newhash);
	//active link
	utils.activeLink();
		

	window.addEventListener('hashchange', function() {
		oldhash = newhash;
		newhash = location.hash;
		//store prev and new location in dataStore
		dataStore.setData('location', { prevLocation: oldhash, newLocation: newhash });
		//call routes
		routes(oldhash, newhash);
		//gtag
		gtag('config', 'UA-113626382-1', {'page_path': '/' + newhash});
		//active link
		utils.activeLink();
	}, false);

};

export default router;
