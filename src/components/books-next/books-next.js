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
		index = 0;
		slides[index].style.display = 'block';
		utils.addClass(dots[index], 'active');
		slider();
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
			utils.addClass(dots[index], 'active');
			slider();
		}
	})
	
	//MODAL (infos)
	//open infos
	let openInfos = event => {
		clearTimeout(automatic);
		automatic = undefined;
		let id = event.target.id.replace('open-', '');
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
		slider();
		let id = event.target.id.replace('close-', '');
		document.getElementById(id).style.display = 'none';
	}
	let closeInfosBtns = root.querySelectorAll('.close-infos-btn');
	for(let i=0; i<closeInfosBtns.length; i++) {
		closeInfosBtns[i].addEventListener('click', closeInfos, false);
	}
};

export default booksNext;

