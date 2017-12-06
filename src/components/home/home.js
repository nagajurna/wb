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
	let lBs = bs.filter(function(b) { return b.visible; }).reverse().slice(0,6);
	
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
	list.style.left = '0px';
	let slideEls = root.querySelectorAll('.slide');
	let slides = [].slice.call(slideEls);
	let left = 0;
	let step = 284;
	let pos;
	let test = 1;
	
	for(let i=0; i<slides.length; i++) {
		if(i==0 || i==1) {
			utils.addClass(slides[i], 'left');
		} else if(i===3 || i===4) {
			utils.addClass(slides[i], 'right');
		}
		slides[i].style.left = left + 'px';
		left+=step;
	}
	
	let moveSlides = event => {
		if(event.currentTarget.className.match(/right/)) {
			slides.unshift(slides.pop());
		} else if(event.currentTarget.className.match(/left/)) {
			slides.push(slides.shift());
		}
		
		for(let i=0; i<slides.length; i++) {
			utils.removeClass(slides[i], 'left');
			utils.removeClass(slides[i], 'right');
			if(i<=2) {
				utils.addClass(slides[i], 'left');
			} else if(i>=4) {
				utils.addClass(slides[i], 'right');
			}
			pos = (i*step)-(step*test);
			slides[i].style.left = pos + 'px';
			console.log(pos);
		}
		
		
		if(event.currentTarget.className.match(/right/)) {
			test-=test;
			let listPos = parseInt(list.style.left.replace('px',''));
			listPos-=step;
			list.style.left = listPos + 'px';
		} else if(event.currentTarget.className.match(/left/)) {
			test+=test;
			let listPos = parseInt(list.style.left.replace('px',''));
			listPos+=step;
			list.style.left = listPos + 'px';
		}
		

	};
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
		slides[i].addEventListener('click', moveSlides, false);
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

