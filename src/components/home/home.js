import dataStore from '../../services/dataStore';
import utils from '../../services/utils';
import css from './home.css';
let homeTemplate = require('./home.ejs');
//home.js
const home = function(container) {
	'use strict';
	
	let c = container;
	
	//Get books from dataStore
	let bs = dataStore.getData('books');
	//get last 12 visible books reverse order
	let lBs = bs.filter(function(b) { return b.visible; }).reverse().slice(0,7);
	
	//go to book/read
	let readBk = event => {
		let b = dataStore.getData('books', event.currentTarget.id);
		let path = b.path.replace(/^\/books\/[^\/]+/,'');
		location.hash = '#' + path + "/read";
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
	c.innerHTML = homeTemplate({ books:lBs });
	let root = document.querySelector('#home-container');
	let list = root.querySelector('#booksList');
	let slideEls = root.querySelectorAll('.slide');
	let slides = [].slice.call(slideEls);
	
	
	for(let i=0; i<slides.length; i++) {
		if(i==-0) {
			utils.addClass(slides[i], 'prev3');
		} else if(i===1) {
			utils.addClass(slides[i], 'prev2');
		} else if(i===2) {
			utils.addClass(slides[i], 'prev1');
		} else if(i==3) {
			utils.addClass(slides[i], 'middle');
		} else if(i===4) {
			utils.addClass(slides[i], 'next1');
		} else if(i===5) {
			utils.addClass(slides[i], 'next2');
		} else if(i===6) {
			utils.addClass(slides[i], 'next3');
		}
	}
	
	let moveSlides = event => {
		if(event.currentTarget.id==='move-prev') {
			let l = slides.pop();
			utils.addClass(l,'prev-hide');
			slides.unshift(l);
		} else if(event.currentTarget.id==='move-next') {
			let f = slides.shift();
			utils.addClass(f,'next-hide');
			slides.push(f);
		}
		
		for(let i=0; i<slides.length; i++) {
			utils.removeClass(slides[i], 'prev3');
			utils.removeClass(slides[i], 'prev2');
			utils.removeClass(slides[i], 'prev1');
			utils.removeClass(slides[i], 'middle');
			utils.removeClass(slides[i], 'next1');
			utils.removeClass(slides[i], 'next2');
			utils.removeClass(slides[i], 'next3');
			if(i===0) {
				setTimeout( () => {
					utils.removeClass(slides[i], 'prev-hide');
					utils.addClass(slides[i], 'prev3');
				}, 100)
			
			} else if(i===1) {
				utils.addClass(slides[i], 'prev2');
			} else if(i===2) {
				utils.addClass(slides[i], 'prev1');
			} else if(i==3) {
				utils.addClass(slides[i], 'middle');
			} else if(i==4) {
				utils.addClass(slides[i], 'next1');
			} else if(i==5) {
				utils.addClass(slides[i], 'next2');
			} else if(i===6) {
				setTimeout( () => {
					utils.removeClass(slides[i], 'next-hide');
					utils.addClass(slides[i], 'next3');
				}, 100)
			}
		}
	};
	
	root.querySelector('#move-prev').addEventListener('click', moveSlides, false);
	root.querySelector('#move-next').addEventListener('click', moveSlides, false);
	
		
	//scroll after read
	if(dataStore.getData('location').prevLocation!==undefined && dataStore.getData('location').prevLocation.match(/\/read$/)) {
		let id= dataStore.getData('book');
		let el = document.getElementById(id);
		el.scrollIntoView(true);
		let html = document.getElementsByTagName("html")[0];
		html.scrollTop = html.scrollTop-30;
	}
	//link to book/read
	let bks = root.querySelectorAll('.book');
	for(let i=0; i<slides.length; i++) {
		//bks[i].addEventListener('click', readBk, false);
		//slides[i].addEventListener('click', moveSlides, false);
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

export default home;

