import dataStore from '../../services/dataStore';
let homeTemplate = require('./home.ejs');
//home.js
const home = function(container) {
	'use strict';
	
	let c = container;
	
	//Get books from dataStore
	let books = dataStore.getData('books');
	//insert template in container
	c.innerHTML = homeTemplate({ books:books });
	
	console.log(dataStore.getData());

};

export default home;

