import dataStore from '../../services/dataStore';
import utils from '../../services/utils';
import css from './home.css';
let homeTemplate = require('./home.ejs');
//home.js
const home = function(container) {
	'use strict';
	
	let c = container;
	
	//Get books from dataStore
	let books = dataStore.getData('books');
	//insert template in container
	c.innerHTML = homeTemplate({ books:books });
	utils.addClass('#booksList', 'show')
};

export default home;

