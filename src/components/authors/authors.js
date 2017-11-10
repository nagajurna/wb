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
	
	let root = document.querySelector('#authors-container');
	let bks = root.querySelectorAll('.book');
	for(let i=0; i<bks.length; i++) {
		bks[i].addEventListener('click', event => {
			let bk = dataStore.getData('books', event.currentTarget.id);
			location.hash = '#' + bk.path + "/read";
		}, false);
	}
	
};

export default authors;

