import utils from './services/utils';
import dataStore from './services/dataStore';
//home
import home from './components/home/home';
var homeTemplate = require('./components/home/home.html');
//book
import book from './components/book/book';
var  bookTemplate = require('./components/book/book.html');
//adminLogin
import adminLogin from './components/adminLogin/adminLogin';
var adminLoginTemplate = require('./components/adminLogin/adminLogin.html');
//admin
import admin from './components/admin/admin';
var adminTemplate = require('./components/admin/admin.html');
//adminRouter
import adminRouter from './components/admin/adminRouter';

//routes.js
const router  = function() {
	'use strict';
	
	let routes = (oldhash, newhash) => {
		
		let container = document.querySelector('#container');
		
		//ROUTES
		if(newhash === '#/books/') {
			//HOME
			utils.getTemplate(container, homeTemplate, home)
			.then( controller => { controller(); });
			
		} else if(newhash.match(/#\/books\/[^\/]+\/read$/)) {
			//BOOK READ
			utils.getTemplate(container, bookTemplate, book)
			.then( controller => { controller(); });
			
		} else if(newhash.match(/#\/admin/) && newhash !== '#/admin/login/') {
			//ADMIN LOGIN : if admin not connected, redirect to /admin/login
			let user;
			utils.checkRole()
			.then ( response => {
				user = response;
				return utils.getTemplate(container, adminTemplate, admin)
			})
			.then( controller => { 
				utils.activeLink();//for admin links
				controller(user); 
			})
			.then ( resolve => {
				
				//ADMIN ROUTES
				adminRouter(oldhash, newhash, user);
								
			})
			.catch( error => {
				location.hash = '#/admin/login/';
			})

			
		} else if(newhash === '#/admin/login/') {
			//ADMIN HOME : if admin not connected, redirect to /books
			let user;
			utils.checkRole()
			.then( user => {
				location.hash = '#/admin/';
			})
			.catch( error => {
				utils.getTemplate(container, adminLoginTemplate, adminLogin)
				.then( controller => { controller(); });
			});
			
		
		} else {
			//FALLBACK
			location.hash = '#/books/';
		}
		
	};
	
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
		dataStore.setData('location', { prevLocation: oldhash, newLocation: newhash });
		routes(oldhash, newhash);
		//active link
		utils.activeLink();
	}, false);

};

export default router;
