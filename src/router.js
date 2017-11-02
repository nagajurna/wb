import utils from './services/utils';
import dataStore from './services/dataStore';
//home(controller)
import home from './components/home/home';
//book (controller)
import book from './components/book/book';
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
		if(newhash === '#/books/') {
			//HOME
			home(container);
			
		} else if(newhash.match(/#\/books\/[^\/]+\/read$/)) {
			//BOOK READ
			book(container);
			
		} else if(newhash.match(/#\/admin/) && newhash !== '#/admin/login/') {
			//ADMIN : if admin not connected, redirect to /admin/login
			utils.checkRole()
			.then ( response => {
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
			.catch( error => {
				location.hash = '#/admin/login/';
			})

			
		} else if(newhash === '#/admin/login/') {
			//ADMIN LOGIN : if admin already connected, redirect to /admin
			utils.checkRole()
			.then( user => {
				location.hash = '#/admin/';
			})
			.catch( error => {
				adminLogin();
			});
			
		
		} else {
			//FALLBACK
			location.hash = '#/books/';
		}
		
	};
	
	
	//ON LOAD (called by index.js)
	if(location.hash === "") { location.hash = "#/"; }
	
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
		//active link
		utils.activeLink();
	}, false);

};

export default router;
