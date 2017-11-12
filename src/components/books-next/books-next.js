import dataStore from '../../services/dataStore';
import utils from '../../services/utils';
import css from './books-next.css';

let booksNextTemplate = require('./books-next.ejs');
//home.js
const booksNext = function(container) {
	'use strict';
	
	let c = container;
	
	//Get books from dataStore
	let bs = dataStore.getData('books');
	//get non-visible books
	let nvbs = bs.filter(function(b) { return b.visible===false; });
	//open infos
	let openInfos = event => {
		let id = event.target.id.replace('open-', '');
		document.getElementById(id).style.display = 'block';
	};
	//close infos
	let closeInfos = event => {
		let id = event.target.id.replace('close-', '');
		document.getElementById(id).style.display = 'none';
	}
	//insert template in container
	c.innerHTML = booksNextTemplate({ books: nvbs });
	let root = document.querySelector('#books-next-container');
	
	//modal (infos)
	//open
	let openInfosBtns = root.querySelectorAll('.open-infos-btn');
	for(let i=0; i<openInfosBtns.length; i++) {
		openInfosBtns[i].addEventListener('click', openInfos, false);
	}
	//close
	let closeInfosBtns = root.querySelectorAll('.close-infos-btn');
	for(let i=0; i<closeInfosBtns.length; i++) {
		closeInfosBtns[i].addEventListener('click', closeInfos, false);
	}
};

export default booksNext;

