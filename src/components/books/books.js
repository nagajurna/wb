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
	
	let root = document.querySelector('#books-container');
	let bks = root.querySelectorAll('.book');
	for(let i=0; i<bks.length; i++) {
		bks[i].addEventListener('click', event => {
			let bk = dataStore.getData('books', event.currentTarget.id);
			location.hash = '#' + bk.path + "/read";
		}, false);
	}
	
};

export default books;

