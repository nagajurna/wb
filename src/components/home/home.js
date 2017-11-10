import dataStore from '../../services/dataStore';
import utils from '../../services/utils';
import css from './home.css';
let homeTemplate = require('./home.ejs');
//home.js
const home = function(container) {
	'use strict';
	
	let c = container;
	let lastBooks = [];
	
	//Get books from dataStore
	let books = dataStore.getData('books');
	//Get last published
	let count = 0;
	for(let i=0; i<books.length; i++) {
		if(books[i].visible) {
			count+=1
		}
		if(count<=4) {
			lastBooks.push(books[i]);
		} else {
			break;
		}
	}
	//insert template in container
	c.innerHTML = homeTemplate({ books:lastBooks });
};

export default home;

