import utils from '../../services/utils';
import dataStore from '../../services/dataStore';
import localStore from '../../services/localStore';
import WebBook from '../../../lib/wb/WebBook';
import css from './book-read.css';
import Hammer from 'hammerjs';
let bookReadTemplate = require('./book-read.ejs');
//book.js
const book = function(container) {
	'use strict';
	
	let c = container;
		
	let init = function() {
		let textContainer = bookContainer.querySelector('[data-wb-text-container]');
		let tocLarge = bookContainer.querySelector('#toc-large-device');
		let tabInfos = bookContainer.querySelector('#tab-infos');
		let bookCommands = bookContainer.querySelector('#book-commands');
		let bookNavBarBottom = bookContainer.querySelector('#book-nav-bar-bottom');
		
		//DIMENSIONS
		let h, w, marginY, marginX, fontSize, lineHeight, top;
		
		
		//width (responsive)
		if(window.innerWidth >= 768) {
			//max-height: 720
			if(window.innerHeight > 832) {//748 + navBarBottom height (1*44) + textContainer minimum top * 2 (2*20)
				h = 748;
				top = (window.innerHeight-748-44)/2;
				textContainer.style.top = top-15 + 'px';
				tocLarge.style.marginTop = top-15 + 'px';
				tabInfos.style.marginTop = top+32 + 'px';
				bookCommands.style.top = top-16 + 'px';
				bookNavBarBottom.style.marginTop = top-15 + 'px';
			} else {
				h = window.innerHeight-44-40;//navBarBottom height (1*44) + textContainer top * 2 (2*20)
				textContainer.style.top ='15px';
				tocLarge.style.marginTop = '15px';
				tabInfos.style.marginTop = '63px';
				bookCommands.style.top = '15px';
				bookNavBarBottom.style.marginTop = '15px';
			}
			w = 550;
			fontSize = 16;
		 } else {
			 h = window.innerHeight;
			 w = window.innerWidth;
			 fontSize = 14;
			 textContainer.style.top ='0px';
		 }
		 
		 //marginY is relative to line-height (line-height : 1.5em)
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
		 
		 if(localStore.getBkmrk(bk.id)) {
			 book.goToBookmark(localStore.getBkmrk(bk.id));
		 }
		
		if(window.innerWidth >= 1366) {
			//Toc-large height
			bookContainer.querySelector("#toc-large-device div").style.maxHeight = h + "px";
		}
						 
		//on resize
		window.addEventListener('resize', event => {
			if(window.innerWidth >= 768) {
				//max-height: 720
				if(window.innerHeight >= 832) {//748 + navBarBottom height (1*44) + textContainer minimum top * 2 (2*20)
					h = 748;
					top = (window.innerHeight-748-44)/2;
					textContainer.style.top = top-15 + 'px';
					tocLarge.style.marginTop = top-15 + 'px';
					tabInfos.style.marginTop = top+32 + 'px';
					bookCommands.style.top = top-16 + 'px';
					bookNavBarBottom.style.marginTop = top-15 + 'px';
				} else {
					h = window.innerHeight-44-40;//navBars height *2 (2*44) + textContainer top * 2 (2*20)
					textContainer.style.top ='15px';
					tocLarge.style.marginTop = '15px';
					tabInfos.style.marginTop = '63px';
					bookCommands.style.top = '15px';
					bookNavBarBottom.style.marginTop = '15px';
				}
				w = 550;
				fontSize = 16;
			} else {
				h = window.innerHeight;
				w = window.innerWidth;
				fontSize = 14;
				textContainer.style.top ='0px';
			}
			
			if(window.innerWidth >= 1366) {
				//Toc-large height
				bookContainer.querySelector("#toc-large-device div").style.maxHeight = h + "px";
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
				//bookmark
				localStore.pushBkmrk(bk.id, book.getBookmark());
			} else if(event.type==="swiperight") {
				book.backward();
				//bookmark
				localStore.pushBkmrk(bk.id, book.getBookmark());
			}
		});
		
		//TOUCHES, forward, backward
		document.addEventListener('keydown', event => {
			if(event.which===39) {
				book.forward();
				//bookmark
				localStore.pushBkmrk(bk.id, book.getBookmark());
			} else if(event.which===37) {
				book.backward();
				//bookmark
				localStore.pushBkmrk(bk.id, book.getBookmark());
			} else if(event.which===36) {
				book.toFirstPage();
			} else if(event.which===35) {
				book.toLastPage();
			}
		}, false);
			
		//BUTTONS FORWARD/BACKWARD
		//large
		let forwardLarge = bookContainer.querySelector('#forward-large');
		let backwardLarge = bookContainer.querySelector('#backward-large');
		
		forwardLarge.addEventListener('click', event => {
			book.forward();
			//bookmark
			localStore.pushBkmrk(bk.id, book.getBookmark());
		}, false);

		backwardLarge.addEventListener('click', event => {
			book.backward();
			//bookmark
			localStore.pushBkmrk(bk.id, book.getBookmark());
		}, false);
		
		
		//TOC		
		let toc = bookContainer.querySelector('#toc');
		let openTocs = bookContainer.querySelectorAll('.open-toc');
		
		for(let i=0; i<openTocs.length; i++) {
			openTocs[i].addEventListener('click', event => {
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
			//bookmark
			localStore.pushBkmrk(bk.id, book.getBookmark());
		}
		
		//TAB-CONTAINER
		let swingContainer = bookContainer.querySelector('#swing-container');
		let swingBar = bookContainer.querySelector('#swing-bar');
		let tabHome = bookContainer.querySelector('#tab-home-link');
		
		let toggleTocLarge = bookContainer.querySelector('#toggle-toc-large-device');
		
		let toggleTabInfos = bookContainer.querySelector('#toggle-tab-infos');
		let closeTocLarge = bookContainer.querySelector('#close-toc-large-device');
		let closeTabInfos = bookContainer.querySelector('#close-tab-infos');
		//TOGGLE TOC-LARGE-DEVICE
		toggleTocLarge.addEventListener('click', event => {
			if(!tocLarge.className.match(/open/)) {
				if(tabInfos.className.match(/open/)) {
					tabInfos.style.zIndex='0';
					tocLarge.style.zIndex='1000';
					utils.removeClass('#tab-infos','open');
				}
				utils.addClass('#toc-large-device','open');
				utils.addClass('#swing-container','left');
				utils.addClass('#swing-bar','left');
				
			} else {
				tocLarge.style.zIndex='0';
				utils.removeClass('#toc-large-device','open');
				utils.removeClass('#swing-container','left');
				utils.removeClass('#swing-bar','left');
			}
			//bookmark
			localStore.pushBkmrk(bk.id, book.getBookmark());
		}, false);
		
		//CLOSE TOC-LARGE-DEVICE
		closeTocLarge.addEventListener('click', event => {
			utils.removeClass('#toc-large-device','open');
			utils.removeClass('#swing-container','left');
			utils.removeClass('#swing-bar','left');
			tocLarge.style.zIndex='0';
			//bookmark
			localStore.pushBkmrk(bk.id, book.getBookmark());
		}, false);
		
		//TOGGLE TAB-INFOS
		toggleTabInfos.addEventListener('click', event => {
			if(!tabInfos.className.match(/open/)) {
				if(tocLarge.className.match(/open/)) {
					tocLarge.style.zIndex='0';
					tabInfos.style.zIndex='1000';
					utils.removeClass('#toc-large-device','open');
				}
				utils.addClass('#tab-infos','open');
				utils.addClass('#swing-container','left');
				utils.addClass('#swing-bar','left');
			} else {
				tabInfos.style.zIndex='0';
				utils.removeClass('#tab-infos','open');
				utils.removeClass('#swing-container','left');
				utils.removeClass('#swing-bar','left');
			}
		}, false);
		
		//CLOSE TAB-INFOS
		closeTabInfos.addEventListener('click', event => {
			utils.removeClass('#tab-infos','open');
			utils.removeClass('#swing-container','left');
			utils.removeClass('#swing-bar','left');
			tabInfos.style.zIndex='0';
		}, false);
		
		
		//HOME
		let homeLinks = bookContainer.querySelectorAll('.home');
		
		for(let i=0; i<homeLinks.length; i++) {
			homeLinks[i].addEventListener('click', event => {
				event.preventDefault();
				//save bookmark on leaving the page
				localStore.pushBkmrk(bk.id, book.getBookmark());
				let prevLocation = dataStore.getData('location').prevLocation;
				location.hash = prevLocation ? prevLocation : '#/';
			}, false);
		}
		
		//save bookmark on unload
		window.addEventListener('unload', function() {
			//bookmark
			localStore.pushBkmrk(bk.id, book.getBookmark());
		}, false)
		
		
		//end loader
		document.body.style.overflow = 'visible';
		setTimeout( function() { 
			utils.addClass('#book-loader-container', 'hidden');
		}, 800);
		
		//show book
		setTimeout( function() { 
			bookContainer.className = 'show';
		}, 800);
		
	
	}
	
	
	//GET BOOK
	let bks = dataStore.getData('books');
	let bk;
	let loc = location.hash.replace(/(#|\/read)/g,'');
	let title = '';
	for(let i = 0; i < bks.length; i++) {
		title = bks[i].path.replace(/^\/books\/[^\/]+/,'');
	  if(title===loc) {
		 bk = bks[i];
		 break;
	  }
	}
	
	//GET TEMPLATE ET START LOADER
	//insert template in container
	document.body.style.height = window.innerHeight + 'px';
	document.body.style.overflow = 'hidden';
	c.innerHTML = bookReadTemplate({ book:bk });
	//START LOADER
	utils.removeClass('#book-loader-container','hidden');
	
	//BOOK CONTAINER
	const bookContainer = document.querySelector('#bookContainer');
		
	//GET TEXT CONTENT
	let text = bookContainer.querySelector('[data-wb-text]');
	let options = { method: 'GET', url: bk.path + '.css' };
	utils.ajax(options).then( content => {
		let head = document.querySelector('head');
		if(dataStore.getData('book')) {
			head.lastChild.innerHTML = content;
		} else {
			let style = document.createElement('style');
			style.setAttribute('type','text/css');
			style.innerHTML = content;
			head.appendChild(style);
		}
		dataStore.setData('book',bk.id);
		options = { method: 'GET', url: bk.path + '.html' };
		return utils.ajax(options);
	})
	.then( content => {
		let div = document.createElement('div');
		div.innerHTML = content;
		text.appendChild(div);
		init();
	});
	
	

};

export default book;
