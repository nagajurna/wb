import dataStore from '../../services/dataStore';
import utils from '../../services/utils';
import css from './books-next.css';

let booksNextTemplate = require('./books-next.ejs');
//home.js
const booksNext = function(container) {
	'use strict';
	
	let c = container;
	
	//Get books from dataStore
	let books = dataStore.getData('books');
	//insert template in container
	let sortedBooks = books.reverse();
	c.innerHTML = booksNextTemplate({ books: sortedBooks });
	books.reverse();
};

export default booksNext;

