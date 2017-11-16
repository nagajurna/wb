import dataStore from '../../services/dataStore';
import utils from '../../services/utils';
import css from './authors.css';
let authorsTemplate = require('./authors.ejs');
//authors.js
const authors = function(container) {
	'use strict';
	
	let c = container;
	
	let search = location.hash.replace(/#\/authors\?q\=/,''); 
	
	//get authors from dataStore
	let as = dataStore.getData('authors');
	//get searched authors
	let sas = as.filter(function(a) { return a.nameAlpha.split("")[0].toUpperCase()===search  });
	//get books
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
	c.innerHTML = authorsTemplate({ authors:sas, books: bs });
	let root = document.querySelector('#authors-container');
	//get active letter link
	let ls = root.querySelectorAll('#letters a');
	for(let i=0; i<ls.length; i++) {
		if(ls[i].innerHTML===search) {
			utils.removeClass('#' + ls[i].id, 'w3-text-gray');
			utils.addClass('#' + ls[i].id, 'w3-text-black')
		} else {
			utils.removeClass('#' + ls[i].id, 'w3-text-black');
			utils.addClass('#' + ls[i].id, 'w3-text-gray')
		}
	}
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

