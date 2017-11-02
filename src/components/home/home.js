import utils from '../../services/utils';
import dataStore from '../../services/dataStore';
let homeTemplate = require('./home.ejs');
//home.js
const home = function(container) {
	'use strict';
	
	let viewContainer = container;
	
	//get books from dataStore
	let books = dataStore.getData('books');
	//insert template in container
	viewContainer.innerHTML = homeTemplate({books:books});
};

export default home;

