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
	
	//modal (infos)
	//open
	let root = document.querySelector('#books-next-container');
	let openInfosBtns = root.querySelectorAll('.open-infos-btn');
	for(let i=0; i<openInfosBtns.length; i++) {
		openInfosBtns[i].addEventListener('click', event => {
			let id = event.target.id.replace('open-', '');
			document.getElementById(id).style.display = 'block';
		}, false);
	}
	//close
	let closeInfosBtns = root.querySelectorAll('.close-infos-btn');
	for(let i=0; i<closeInfosBtns.length; i++) {
		closeInfosBtns[i].addEventListener('click', event => {
			let id = event.target.id.replace('close-', '');
			document.getElementById(id).style.display = 'none';
		}, false);
	}
	
	
};

export default booksNext;

