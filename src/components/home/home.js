import utils from '../../services/utils';
import dataStore from '../../services/dataStore';
let homeTemplate = require('./home.ejs');
//home.js
const home = function(container) {
	'use strict';
	//get books from dataStore
	let books = dataStore.getData('books');
	//insert template in container
	container.innerHTML = "";
	container.innerHTML = homeTemplate({books:books});
};

export default home;

