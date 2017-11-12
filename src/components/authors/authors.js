import dataStore from '../../services/dataStore';
import utils from '../../services/utils';
import css from './authors.css';
let authorsTemplate = require('./authors.ejs');
//home.js
const authors = function(container) {
	'use strict';
	
	let c = container;
	
	//Get books from dataStore
	let as = dataStore.getData('authors');
	let bs = dataStore.getData('books');
	
	//go to book/read
	let readBk = event => {
		let b = dataStore.getData('books', event.currentTarget.id);
		location.hash = '#' + b.path + "/read";
	}
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
	c.innerHTML = authorsTemplate({ authors:as, books: bs });
	let root = document.querySelector('#authors-container');
    //link to book/read
	let bks = root.querySelectorAll('.book');
	for(let i=0; i<bks.length; i++) {
		bks[i].addEventListener('click', readBk, false);
	}
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

export default authors;

