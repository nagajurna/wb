import dataStore from '../../services/dataStore';
import utils from '../../services/utils';
import css from './books.css';

let booksTemplate = require('./books.ejs');
//home.js
const books = function(container) {
	'use strict';
	
	let c = container;
	
	//Get books from dataStore
	let books = dataStore.getData('books');
	//insert template in container
	let sortedBooks = books.reverse();
	c.innerHTML = booksTemplate({ books: sortedBooks });
	books.reverse();
};

export default books;

