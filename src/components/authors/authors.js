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
	let books = dataStore.getData('books');
	//insert template in container
	c.innerHTML = authorsTemplate({ authors:authors, books: books });
	
	let root = document.querySelector('#authors-container');
	let bks = root.querySelectorAll('.book');
	for(let i=0; i<bks.length; i++) {
		bks[i].addEventListener('click', event => {
			let bk = dataStore.getData('books', event.currentTarget.id);
			location.hash = '#' + bk.path + "/read";
		}, false);
	}
	
	//modal (infos)
	//open
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

export default authors;

