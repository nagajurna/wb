import dataStore from '../../services/dataStore';
import utils from '../../services/utils';
import css from './home.css';
let homeTemplate = require('./home.ejs');
import screenfull from 'screenfull';
//home.js
const home = function(container) {
	'use strict';
	
	let c = container;
	
	//Get books from dataStore
	let bs = dataStore.getData('books');
	//get last 6 visible books reverse order
	let lBs = bs.filter(function(b) { return b.visible; }).reverse().slice(0,6);
	
	//insert template in container
	c.innerHTML = homeTemplate({ books:lBs, replaceLines: utils.replaceLines });
	utils.setHTML('title','&Eacute;quivoques');
	let root = document.querySelector('#home-container');
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
			slides[index].style.display='block';
			utils.addClass(dots[index], 'active');
			slider();
		}, false);
	}
	
	root.querySelector('#previous').addEventListener('click', prevSlide, false);
	root.querySelector('#next').addEventListener('click', nextSlide, false);
	
	//window.innerWidth > 750 : slider
	if(window.innerWidth >= 750) {
		if(dataStore.getData('location').prevLocation!==undefined && dataStore.getData('location').prevLocation.match(/\/read$/)) {
			let id= dataStore.getData('book');
			
			for(let i=0; i<slides.length; i++) {
				if(slides[i].id.replace(/slide_/,'')===id) {
					index = i;
					break;
				} else {
					index = 0;
				}
			}
		} else {
			index = 0;
		}

		slides[index].style.display = 'block';
		utils.addClass(dots[index], 'active');
		slider();
	} else {
		clearTimeout(automatic);
		automatic = undefined;
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
	
		
	//scroll after read (for list)
	if(dataStore.getData('location').prevLocation!==undefined && dataStore.getData('location').prevLocation.match(/\/read$/)) {
		let id= dataStore.getData('book');
		let el = document.getElementById(id);
		if(el) {
			el.scrollIntoView(true);
			let html = document.getElementsByTagName("html")[0];
			html.scrollTop = html.scrollTop-40;
		}
	}
	//go to book/read
	let readBk = event => {
		clearTimeout(automatic);
		automatic = undefined;
		let b = dataStore.getData('books', event.currentTarget.id);
		let path = b.path.replace(/^\/books\/[^\/]+/,'');
		//if (screenfull.enabled && window.innerWidth < 750 && !window.matchMedia('(display-mode: standalone)').matches) {
			//if(!screenfull.isFullscreen) {
				//screenfull.request();
			//}
		//}
		location.hash = '#' + path + "/read";
	}
	let bks = root.querySelectorAll('.book');
	for(let i=0; i<bks.length; i++) {
		bks[i].addEventListener('click', readBk, false);
	}
	
	
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

export default home;

