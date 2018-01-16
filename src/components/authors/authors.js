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
	let ws = dataStore.getData('books');
	let works = [];
	let bs, cs;
	for(let i=0; i<sas.length; i++) {
		let author = sas[i];
		//books
		bs = ws.filter(function(w) { 
			for(let i=0; i<w.authors.length; i++) {
					return w.authors[i].id===author.id;
					break;
				}
			});
		
		works = works.concat(bs);
		
		//contribs
		cs = ws.filter(function(w) { 
			for(let i=0; i<w.contribs.length; i++) {
					return w.contribs[i].id===author.id;
					break;
				}
			});
			
		works = works.concat(cs);
		author.works = works;
		works = [];
	}
	
	//insert template in container
	c.innerHTML = authorsTemplate({ authors:sas });
	let root = document.querySelector('#authors-container');
	
	let acc = document.querySelectorAll(".accordion");
	let panels = document.querySelectorAll('.books-list');
	if(sas.length===1) {
		panels[0].style.display = 'block';
	}
	
	for(let i = 0; i < acc.length; i++) {
		acc[i].addEventListener("click", function(e) {
			
			for(let j = 0; j < panels.length; j++) {
				if(panels[j] === e.target.nextElementSibling) {
					panels[j].style.display = panels[j].style.display === 'block' ? 'none' : 'block';
				} else if(panels[j].style.display === "block") {
					panels[j].style.display = "none";
				}
				
				if(e.target.nextElementSibling.style.display==='block') {
					e.target.nextElementSibling.scrollIntoView(true);
					let html = document.getElementsByTagName("html")[0];
					html.scrollTop = html.scrollTop-48;
				}
			}

		});
	} 
	
	//scroll after read
	if(dataStore.getData('location').prevLocation!==undefined && dataStore.getData('location').prevLocation.match(/\/read$/)) {
		let id= dataStore.getData('book');
		let el = document.getElementById('book_' + id);
		el.parentElement.style.display = 'block';
		el.scrollIntoView(true);
		let html = document.getElementsByTagName("html")[0];
		html.scrollTop = html.scrollTop-48;
	}
	//get active letter link
	let ls = root.querySelectorAll('#letters a');
	for(let i=0; i<ls.length; i++) {
		if(ls[i].innerHTML===search) {
			utils.addClass('#' + ls[i].id, 'active')
		} else {
			utils.removeClass('#' + ls[i].id, 'active');
		}
	}
    //link to book/read
	let readBk = event => {
		let b = dataStore.getData('books', event.currentTarget.id);
		if(!b.visible) { return; }
		let path = b.path.replace(/^\/books\/[^\/]+/,'');
		location.hash = '#' + path + "/read";
	}
	let bks = root.querySelectorAll('.book');
	for(let i=0; i<bks.length; i++) {
		bks[i].addEventListener('click', readBk, false);
	}
	//modal (infos)
	//open
	let openInfos = event => {
		let id = event.target.id.replace('open-', '');
		document.getElementById(id).style.display = 'block';
	};
	let openInfosBtns = root.querySelectorAll('.open-infos-btn');
	for(let i=0; i<openInfosBtns.length; i++) {
		openInfosBtns[i].addEventListener('click', openInfos, false);
	}
	//close
	let closeInfos = event => {
		let id = event.target.id.replace('close-', '');
		document.getElementById(id).style.display = 'none';
	}
	let closeInfosBtns = root.querySelectorAll('.close-infos-btn');
	for(let i=0; i<closeInfosBtns.length; i++) {
		closeInfosBtns[i].addEventListener('click', closeInfos, false);
	}
	
	
};

export default authors;

