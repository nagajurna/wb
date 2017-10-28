import utils from './services/utils';
//home
import home from './components/home/home.js';
var homeTemplate = require('./components/home/home.html');
//book
import book from './components/book/book.js';
var  bookTemplate = require('./components/book/book.html');

//routes.js
const router  = function(data) {
	'use strict';
	
	//ROUTES
	let routes = (oldhash, newhash, data) => {
		
		var container = document.querySelector('#container');
		
		//ROUTES
		if(newhash === '#/') {
			//HOME
			utils.getTemplate(container, homeTemplate, home)
			.then( controller => { controller(data); });
			
		} else if(newhash.match(/#\/books\/.+[^\/]\/read$/)) {
			//BOOK READ
			utils.getTemplate(container, bookTemplate, book)
			.then( controller => { controller(data); });
		
		} else {
			//FALLBACK
			location.hash = '#/';
		}
		
	};
	
	if(location.hash === "") { location.hash = "#/"; }
	
	let oldhash, newhash;
	let books = data ? data : null;
	
	newhash = location.hash;
	routes(oldhash, newhash, books);
	//active link
	utils.activeLink();
		

	window.addEventListener('hashchange', function() {
		oldhash = newhash;
		newhash = location.hash;
		routes(oldhash, newhash, books);
		//active link
		utils.activeLink();
	}, false);

};

export default router;
