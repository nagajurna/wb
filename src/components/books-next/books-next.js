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
	
	//insert template in container
	c.innerHTML = booksNextTemplate({ books: nvbs });
	let root = document.querySelector('#books-next-container');
	let slides = root.querySelectorAll('.slide');
	let dotContainer = root.querySelector('#dots');
	for(let i=0; i<slides.length; i++) {
		if(slides.length<2) {
			break;
		}
		let dot = document.createElement('span');
		dot.className = 'dot';
		dotContainer.appendChild(dot);
	}
	let dots = root.querySelectorAll('.dot');
	let index;
	let automatic;
	
	//SLIDER COMMANDS
	//Previous
	let prevSlide = event => {
		clearTimeout(automatic);
		automatic = undefined;
		if(index===0) {
			index=slides.length-1;
		} else {
			index-=1;
		}
		for(let i=0; i<slides.length; i++) {
			slides[i].style.display = 'none';
			utils.removeClass(dots[i], 'active');
		}
		slides[index].style.display='block';
		utils.addClass(dots[index], 'active');
		slider();
	};
	//Next
	let nextSlide = event => {
		clearTimeout(automatic);
		automatic = undefined;
		if(index===slides.length-1) {
			index=0;
		} else {
			index+=1;
		}
		for(let i=0; i<slides.length; i++) {
			slides[i].style.display = 'none';
			utils.removeClass(dots[i], 'active');
		}
		slides[index].style.display='block';
		utils.addClass(dots[index], 'active');
		slider();
	};
	
	//automatic
	let slider = () => {
		automatic = setTimeout(nextSlide,10000);
	};
	
	//dots
	for(let i=0; i<dots.length; i++) {
		dots[i].addEventListener('click', event => {
			clearTimeout(automatic);
			automatic = undefined;
			index = i;
			for(let j=0; j<slides.length; j++) {
				slides[j].style.display = 'none';
				utils.removeClass(dots[j], 'active');
			}
			clearTimeout(automatic);
			slides[index].style.display='block';
			utils.addClass(dots[index], 'active');
			slider();
		}, false);
	}
	
	root.querySelector('#previous').addEventListener('click', prevSlide, false);
	root.querySelector('#next').addEventListener('click', nextSlide, false);
	
	//window.innerWidth > 750 : slider
	if(window.innerWidth >= 750) {
		if(slides.length<2) {
			root.querySelector('#previous').style.display='none';
			root.querySelector('#next').style.display='none';
		} else {
			root.querySelector('#previous').style.display='block';
			root.querySelector('#next').style.display='block';
		}
		index = 0;
		slides[index].style.display = 'block';
		if(slides.length>1) {
			utils.addClass(dots[index], 'active');
			slider();
		}
	}
	//window on resize (innerWidth < 750 : list, otherwise: slider)
	window.addEventListener('resize', () => {
		clearTimeout(automatic);
		automatic = undefined;
		if(window.innerWidth < 750) {
			for(let i=0; i<slides.length; i++) {
				slides[i].style.display = 'block';
			}
		} else {
			for(let i=0; i<slides.length; i++) {
				slides[i].style.display = 'none';
			}
			if(index===undefined) {
				index=0;
			}
			slides[index].style.display = 'block';
			if(slides.length>1) {
				utils.addClass(dots[index], 'active');
				slider();
			}
			if(slides.length<2) {
				root.querySelector('#previous').style.display='none';
				root.querySelector('#next').style.display='none';
			} else {
				root.querySelector('#previous').style.display='block';
				root.querySelector('#next').style.display='block';
			}
		}
	})
	
	//MODAL (infos)
	//open infos
	let openInfos = event => {
		clearTimeout(automatic);
		automatic = undefined;
		let id = event.target.id.replace('open-', '');
		if(window.innerWidth < 750) {
			document.body.style.overflowY = 'hidden';
		}
		document.getElementById(id).style.display = 'block';
	};
	let openInfosBtns = root.querySelectorAll('.open-infos-btn');
	for(let i=0; i<openInfosBtns.length; i++) {
		openInfosBtns[i].addEventListener('click', openInfos, false);
	}
	//close infos
	let closeInfos = event => {
		clearTimeout(automatic);
		automatic = undefined;
		if(window.innerWidth >= 750) {
			slider();
		}
		let id = event.target.id.replace('close-', '');
		if(window.innerWidth < 750) {
			document.body.style.overflowY = 'auto';
		}
		document.getElementById(id).style.display = 'none';
	}
	let closeInfosBtns = root.querySelectorAll('.close-infos-btn');
	for(let i=0; i<closeInfosBtns.length; i++) {
		closeInfosBtns[i].addEventListener('click', closeInfos, false);
	}
	//to top button
	let toTopDisplay = () => {
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			if(window.innerWidth<750) {
				root.querySelector('#toTop').style.display = "block";
			}
		} else {
			root.querySelector('#toTop').style.display = "none";
		}
	}
	window.addEventListener('scroll', toTopDisplay, false);
	let toTop = () => {
		 document.body.scrollTop = 0;
		 document.documentElement.scrollTop = 0;
	}
	let toTopBtn = root.querySelector('#toTop');
	toTopBtn.addEventListener('click', toTop, false);
};

export default booksNext;

