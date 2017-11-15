import dataStore from '../../services/dataStore';
import utils from '../../services/utils';
import css from './search.css';
let searchTemplate = require('./search.ejs');

//authors.js
const search = function(container) {
	'use strict';
	
	let c = container;
	
	let search = location.hash.replace(/#\/search\?q\=/,'').replace('\'','’');
	let nores = '';
	if(search.split('').length < 3) {
		nores = 'Aucun résultat.'
		c.innerHTML = searchTemplate({ books: [], nores: nores });
		return;
	}
	let q = new RegExp(search, 'gi');
	
	//get visible books from dataStore
	let bs = dataStore.getData('books').filter(function(b) { return b.visible===true; });
	//get search books
	let sbs = bs.filter(function(b) { return b.title.replace('&nbsp;',' ').match(q); });
	//get visible authors from dataStore
	let as = dataStore.getData('authors').filter(function(a) { return a.visible===true; });
	//get search authors
	let sas = as.filter(function(a) { return a.name.replace('&nbsp;',' ').match(q);});
	for(let i=0; i<sas.length; i++) {
		let a = sas[i];
		for(let j=0; j<a.contribs.length; j++) {
			let ab = a.contribs[j].book;
			let ba = bs.filter(function(b) { return b.id===ab.id });
			sbs.push(ba[0]);
		}
		for(let j=0; j<a.books.length; j++) {
			let ab = a.books[j];
			let ba = bs.filter(function(b) { return b.id===ab.id });
			sbs.push(ba[0]);
		}
	}
	
	if(sbs.length===0) {
		nores = 'Aucun résultat.'
		c.innerHTML = searchTemplate({ books: [], nores: nores });
		return;
	}
	
	//go to book/read
	let readBk = event => {
		let bk = dataStore.getData('books', event.currentTarget.id);
		location.hash = '#' + bk.path + "/read";
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
	c.innerHTML = searchTemplate({ books: sbs.reverse(), nores: nores });
	let root = document.querySelector('#search-container');
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

export default search;
