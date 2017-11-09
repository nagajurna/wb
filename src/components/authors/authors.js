import dataStore from '../../services/dataStore';
import utils from '../../services/utils';
import css from './authors.css';
let authorsTemplate = require('./authors.ejs');
//home.js
const authors = function(container) {
	'use strict';
	
	let c = container;
	
	//Get books from dataStore
	let authors = dataStore.getData('authors');
	//insert template in container
	c.innerHTML = authorsTemplate({ authors:authors });
};

export default authors;

