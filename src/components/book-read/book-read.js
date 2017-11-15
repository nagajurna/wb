import utils from '../../services/utils';
import dataStore from '../../services/dataStore';
import WebBook from '../../../lib/wb/WebBook';
import css from './book-read.css';
import Hammer from 'hammerjs';
let bookReadTemplate = require('./book-read.ejs');
//book.js
const book = function(container) {
	'use strict';
	
	let c = container;
		
	let init = function() {
		//DIMENSIONS
		let h, w, marginY, marginX, fontSize, lineHeight, top;
		
		//width (responsive)
		if(window.innerWidth >= 768) {
			//max-height: 720
			if(window.innerHeight > 876) {//748 + navBars height *2 (2*44) + textContainer minimum top * 2 (2*20)
				h = 748;
				top = (window.innerHeight-748-88)/2;
				textContainer.style.top = top-15 + 'px';
				tocLargeDevice.style.marginTop = top-15 + 'px';
				bookNavBarBottom.style.marginTop = top-15 + 'px';
			} else {
				h = window.innerHeight-88-40;//navBars height *2 (2*44) + textContainer top * 2 (2*20)
				textContainer.style.top ='15px';
				tocLargeDevice.style.marginTop = '15px';
				bookNavBarBottom.style.marginTop = '15px';
			}
			w = 550;
			fontSize = 15;
		 } else {
			 h = window.innerHeight;
			 w = window.innerWidth;
			 fontSize = 14;
			 textContainer.style.top ='0px';
		 }
		 
		 //marginY is relative to line-height
		 lineHeight = fontSize*1.5;
		 marginY = h%lineHeight!==0 ? lineHeight*2+((h%lineHeight)/2) : lineHeight*2;
		 
		//marginX : smaller for very small devices
		if(window.innerWidth > 420) {
			marginX = 50;
		} else {
			marginX = 25;
		}
		 
		
		//new Book
		let book = new WebBook(bookContainer, {
			 height: h,
			 maxWidth: w,
			 marginY: marginY,
			 marginX: marginX
		 });
		
		if(window.innerWidth >= 1366) {
			//Toc-large height
			bookContainer.querySelector("#toc-large-device div").style.maxHeight = h-30 + "px";
		}
						 
		//on resize
		window.addEventListener('resize', event => {
			if(window.innerWidth >= 768) {
				//max-height: 720
				if(window.innerHeight >= 876) {//748 + navBars height *2 (2*44) + textContainer minimum top * 2 (2*20)
					h = 748;
					top = (window.innerHeight-748-88)/2;
					textContainer.style.top = top-15 + 'px';
					tocLargeDevice.style.marginTop = top-15 + 'px';
					bookNavBarBottom.style.marginTop = top-15 + 'px';
				} else {
					h = window.innerHeight-88-40;//navBars height *2 (2*44) + textContainer top * 2 (2*20)
					textContainer.style.top ='15px';
					tocLargeDevice.style.marginTop = '15px';
					bookNavBarBottom.style.marginTop = '15px';
				}
				w = 550;
				fontSize = 15;
			} else {
				h = window.innerHeight;
				w = window.innerWidth;
				fontSize = 14;
				textContainer.style.top ='0px';
			}
			
			if(window.innerWidth >= 1366) {
				//Toc-large height
				bookContainer.querySelector("#toc-large-device div").style.maxHeight = h-30 + "px";
			}
			
			//marginY is relative to line-height
			lineHeight = fontSize*1.5;
			marginY = h%lineHeight!==0 ? lineHeight*2+((h%lineHeight)/2) : lineHeight*2;
			
			//marginX : smaller for very small devices
			if(window.innerWidth > 420) {
				marginX = 50;
			} else {
				marginX = 25;
			}
			
			//set new dimensions
			book.setHeight(h);
			book.setMaxWidth(w);
			book.setMarginY(marginY);
			book.setMarginX(marginX);
			
			if(book.col===true) {
				book.toBook();
			}
		
		}, false);
		
		
		//SWIPE - forward, backward on swipe left and right (hammer.js)
		// small devices
		let swipeContainer = new Hammer(bookContainer.querySelector('[data-wb-text-container]'));
		swipeContainer.on("swiperight swipeleft", event => {
			if(event.type==="swipeleft") {
				book.forward();
			} else if(event.type==="swiperight") {
				book.backward();
			}
		});
		
		//TOUCHES, forward, backward
		document.addEventListener('keydown', event => {
			if(event.which===39 || event.which===34) {
					book.forward();
			} else if(event.which===37 || event.which===33) {
				book.backward();
			} else if(event.which===36) {
				book.toFirstPage();
			} else if(event.which===35) {
				book.toLastPage();
			}
		}, false);
		
			
		//BUTTONS
		//large
		let forwardLarge = bookContainer.querySelector('#forward-large');
		let backwardLarge = bookContainer.querySelector('#backward-large');
		
		forwardLarge.addEventListener('click', event => {
			book.forward();
		}, false);

		backwardLarge.addEventListener('click', event => {
			book.backward();
		}, false);
		
		
		//TOC		
		let toc = bookContainer.querySelector('#toc');
		let openToc = bookContainer.querySelectorAll('.open-toc');
		
		for(let i=0; i<openToc.length; i++) {
			openToc[i].addEventListener('click', event => {
				toc.className = toc.className === "open" ? "" : "open";
			}, false);
		}
		
		toc.querySelector("#close-toc").addEventListener('click', () => {
			toc.className = "";
		}, false);
		
		//Close toc on click
		let tocLinks = toc.querySelectorAll('a');
		for(let i=0; i<tocLinks.length; i++) {
			tocLinks[i].addEventListener('click', () => {
				toc.className = "";
			}, false);
		}
		
		
		//TOC-LARGE-DEVICE
		let tocLarge = bookContainer.querySelector('#toc-large-device');
		let swingContainer = bookContainer.querySelector('#swing-container');
		let swingBar = bookContainer.querySelector('#swing-bar');
		//Toggle toc-large-device, swing-container, swing-bar
		bookContainer.querySelector('#toggle-toc-large-device').addEventListener('click', event => {
			if(!tocLarge.className.match(/open/)) {
				utils.addClass('#toc-large-device','open');
				utils.addClass('#swing-container','left');
				utils.addClass('#swing-bar','left');
			} else {
				utils.removeClass('#toc-large-device','open');
				utils.removeClass('#swing-container','left');
				utils.removeClass('#swing-bar','left');
			}
		}, false);
		
		
		//HOME LINK
		bookContainer.querySelector('#home').addEventListener('click', event => {
			event.preventDefault();
			let prevLocation = dataStore.getData('location').prevLocation;
			location.hash = prevLocation ? prevLocation : '#/';
		}, false);
		
		//end loader
		bookContainer.className = 'show';
		
	
	}
	
	//GET BOOK
	let books = dataStore.getData('books');
	let book;
	let loc = location.hash.replace(/(#|\/read)/g,'');
	for(let i = 0; i < books.length; i++) {
	  if(books[i].path===loc) {
		 book = books[i];
		 break;
	  }
	}
	
	//GET TEMPLATE ET PASS BOOK METADATA
	//pass metadata to nav-bar-top
	utils.bind(document.body,book);
	//insert template in container
	c.innerHTML = bookReadTemplate({book:book});
	
	//BOOK CONTAINER
	const bookContainer = document.querySelector('#bookContainer');
		
	//GET TEXT CONTENT
	let textContainer = bookContainer.querySelector('[data-wb-text-container]');
	let tocLargeDevice = bookContainer.querySelector('#toc-large-device');
	let bookNavBarBottom = bookContainer.querySelector('#book-nav-bar-bottom');
	let text = bookContainer.querySelector('[data-wb-text]');
	let options = { method: 'GET', url: '/books' + book.path + '.html' };
	
	utils.ajax(options).then( content => {
		let div = document.createElement('div');
		div.innerHTML = content;
		text.appendChild(div);
		init();
	});
	

};

export default book;
