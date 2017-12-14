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
	let auths = root.querySelectorAll('.auth');
	let slides;
	let index;
	
	//Previous
	let prevSlide = event => {
		let auth = event.target.parentElement.parentElement;
		slides = auth.querySelectorAll('.slide');
		for(let i=0; i<slides.length; i++) {
			if(slides[i].style.display==='block') {
				index = i;
				slides[index].style.display='none';
				break
			}
		}
		if(index===0) {
			index=slides.length-1;
		} else {
			index-=1;
		}
		
		slides[index].style.display='block';
	};
	//Next
	let nextSlide = event => {
		let auth = event.target.parentElement.parentElement;
		slides = auth.querySelectorAll('.slide');
		for(let i=0; i<slides.length; i++) {
			if(slides[i].style.display==='block') {
				index = i;
				slides[index].style.display='none';
				break
			}
		}
		if(index===slides.length-1) {
			index=0;
		} else {
			index+=1;
		}
		slides[index].style.display='block';
	};
	
	let previous = root.querySelectorAll('.previous')
	for(let i=0; i<previous.length; i++) {
		previous[i].addEventListener('click',prevSlide,false)
	}

	let nexts = root.querySelectorAll('.next')
	for(let i=0; i<nexts.length; i++) {
		nexts[i].addEventListener('click',nextSlide,false)
	}
	
	
	if(window.innerWidth >= 750) {
		for(let i=0; i<auths.length; i++) {
			slides = auths[i].querySelectorAll('.slide');
			if(slides.length<2) {
				auths[i].querySelectorAll('.previous')[0].style.display='none';
				auths[i].querySelectorAll('.next')[0].style.display='none';
			} else {
				auths[i].querySelectorAll('.previous')[0].style.display='block';
				auths[i].querySelectorAll('.next')[0].style.display='block';
			}
			
			if(dataStore.getData('location').prevLocation!==undefined && dataStore.getData('location').prevLocation.match(/\/read$/)) {
				let id= dataStore.getData('book');
				let ss = [].slice.call(slides);
				let slide = ss.filter(function(s) { return s.id.replace(/slide_/,'')===id; })[0];
				index = slide ? ss.indexOf(slide) : 0;
				slides[index].style.display = 'block';
			} else {
				index = 0;
				slides[index].style.display = 'block';
			}
		}
	}
	
	//window on resize (innerWidth < 750 : list, otherwise: slider)
	window.addEventListener('resize', () => {
		if(window.innerWidth < 750) {
			slides = root.querySelectorAll('.slide');
			for(let i=0; i<slides.length; i++) {
				slides[i].style.display = 'block';
			}
		} else {
			slides = root.querySelectorAll('.slide');
			for(let i=0; i<slides.length; i++) {
				slides[i].style.display = 'none';
			}
			for(let i=0; i<auths.length; i++) {
				slides = auths[i].querySelectorAll('.slide');
				if(slides.length<2) {
					auths[i].querySelectorAll('.previous')[0].style.display='none';
					auths[i].querySelectorAll('.next')[0].style.display='none';
				} else {
					auths[i].querySelectorAll('.previous')[0].style.display='block';
					auths[i].querySelectorAll('.next')[0].style.display='block';
				}
				index = 0;
				slides[index].style.display = 'block';
			}
		}
	})
	
	
	
	
	
	//scroll after read
	if(dataStore.getData('location').prevLocation!==undefined && dataStore.getData('location').prevLocation.match(/\/read$/)) {
		let id= dataStore.getData('book');
		let el = document.getElementById(id);
		el.scrollIntoView(true);
		let html = document.getElementsByTagName("html")[0];
		html.scrollTop = html.scrollTop-30;
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

