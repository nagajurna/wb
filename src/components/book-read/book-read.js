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
		let tabOptions = bookContainer.querySelector('#tab-options');
		let options = bookContainer.querySelector('#options');
		let optionsMedium = bookContainer.querySelector('#options-medium');
		let fontSizesLarge = tabOptions.querySelectorAll('[name=fontSize]');
		let fontSizesMedium = optionsMedium.querySelectorAll('[name=fontSize]');
		let fontSizes = options.querySelectorAll('[name=fontSize]');
		let fontsLarge = tabOptions.querySelectorAll('[name=fontFamily]');
		let fontsMedium = optionsMedium.querySelectorAll('[name=fontFamily]');
		let fonts = options.querySelectorAll('[name=fontFamily]');
		let tabInfos = bookContainer.querySelector('#tab-infos');
		let bookCommands = bookContainer.querySelector('#book-commands');
		let bookNavBarBottom = bookContainer.querySelector('#book-nav-bar-bottom');
		let bookNavBarBottomSmall = bookContainer.querySelector('#book-nav-bar-bottom-small');
		let fontSizeValidLarge = bookContainer.querySelector('#font-size-valid-large');
		let fontSizeValid = bookContainer.querySelector('#font-size-valid');
		let cover = text.querySelector("#cover.wb-section");
		
		//DIMENSIONS
		let h, w, marginY, marginX, font, fontSize, lineHeight, top;
		
		//font-family
		font = localStore.getFont() ? localStore.getFont() : bk.styles.font;
		text.style.fontFamily = font;
		bookContainer.querySelector('#current-section-title').style.fontFamily = font;
		bookContainer.querySelector('#currentByTotal').style.fontFamily = font;
		
		//width (responsive)
		if(window.innerWidth >= 768) {
			utils.addClass('[data-wb-text-container]', 'w3-card-2');
			//max-height: 720
			if(window.innerHeight > 832) {//748 + navBarBottom height (1*44) + textContainer minimum top * 2 (2*20)
				h = 748;
				top = (window.innerHeight-748-44)/2;
				textContainer.style.top = top-15 + 'px';
				tocLarge.style.marginTop = top-15 + 'px';
				tabOptions.style.marginTop = top+33 + 'px';
				tabInfos.style.marginTop = top+80 + 'px';
				bookCommands.style.top = top-16 + 'px';
				bookNavBarBottom.style.marginTop = top-15 + 'px';
			} else {
				h = window.innerHeight-44-40;//navBarBottom height (1*44) + textContainer top * 2 (2*20)
				textContainer.style.top ='15px';
				tocLarge.style.marginTop = '15px';
				tabOptions.style.marginTop = '63px';
				tabInfos.style.marginTop = '111px';
				bookCommands.style.top = '15px';
				bookNavBarBottom.style.marginTop = '15px';
			}
			w = 550;
			fontSize = localStore.getFontSize('large') ? localStore.getFontSize('large') : 16;
			text.style.fontSize = fontSize+'px';
			cover.style.fontSize = '16px';
			if(window.innerWidth < 1366) {
				for(let i=0; i<fontSizesMedium.length; i++) {
					if(fontSizesMedium[i].value==fontSize) {
						fontSizesMedium[i].checked=true;
					}
				 }
				 for(let i=0; i<fontsMedium.length; i++) {
					if(fontsMedium[i].value==font) {
						fontsMedium[i].checked=true;
					}
				 }
				
			} else {
				for(let i=0; i<fontSizesLarge.length; i++) {
					if(fontSizesLarge[i].value==fontSize) {
						fontSizesLarge[i].checked=true;
					}
				 }
				 for(let i=0; i<fontsLarge.length; i++) {
					if(fontsLarge[i].value==font) {
						fontsLarge[i].checked=true;
					}
				 }
			}
		 } else {
			 utils.removeClass('[data-wb-text-container]', 'w3-card-2');
			 h = window.innerHeight-30;//30px = nav-bar-bottom-small height
			 w = window.innerWidth;
			 bookNavBarBottomSmall.style.width = w + 'px';
			 fontSize = localStore.getFontSize('small') ? localStore.getFontSize('small') : 14;
			 text.style.fontSize = fontSize+'px';
			 cover.style.fontSize = '14px';
			 font
			 for(let i=0; i<fontSizes.length; i++) {
				if(fontSizes[i].value==fontSize) {
					fontSizes[i].checked=true;
				}
			 }
			 for(let i=0; i<fonts.length; i++) {
				if(fonts[i].value==font) {
					fonts[i].checked=true;
				}
			 }
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
				utils.addClass('[data-wb-text-container]', 'w3-card-2');
				//max-height: 720
				if(window.innerHeight >= 832) {//748 + navBarBottom height (1*44) + textContainer minimum top * 2 (2*20)
					h = 748;
					top = (window.innerHeight-748-44)/2;
					textContainer.style.top = top-15 + 'px';
					tocLarge.style.marginTop = top-15 + 'px';
					tabOptions.style.marginTop = top+33 + 'px';
					tabInfos.style.marginTop = top+80 + 'px';
					bookCommands.style.top = top-16 + 'px';
					bookNavBarBottom.style.marginTop = top-15 + 'px';
				} else {
					h = window.innerHeight-44-40;//navBars height *2 (2*44) + textContainer top * 2 (2*20)
					textContainer.style.top ='15px';
					tocLarge.style.marginTop = '15px';
					tabInfos.style.marginTop = '63px';
					tabInfos.style.marginTop = '111px';
					bookCommands.style.top = '15px';
					bookNavBarBottom.style.marginTop = '15px';
				}
				w = 550;
				fontSize = localStore.getFontSize('large') ? localStore.getFontSize('large') : 16;
				text.style.fontSize = fontSize+'px';
				cover.style.fontSize = '16px';
				if(window.innerWidth < 1366) {
					for(let i=0; i<fontSizesMedium.length; i++) {
						if(fontSizesMedium[i].value==fontSize) {
							fontSizesMedium[i].checked=true;
						}
					 }
					
				} else {
					for(let i=0; i<fontSizesLarge.length; i++) {
						if(fontSizesLarge[i].value==fontSize) {
							fontSizesLarge[i].checked=true;
						}
					 }
				}
			} else {
				utils.removeClass('[data-wb-text-container]', 'w3-card-2');
				h = window.innerHeight-30;//30px = nav-bar-bottom-small height
				w = window.innerWidth;
				bookNavBarBottomSmall.style.width = w + 'px';
				fontSize = localStore.getFontSize('small') ? localStore.getFontSize('small') : 14;
				text.style.fontSize = fontSize+'px';
				cover.style.fontSize = '14px';
				for(let i=0; i<fontSizes.length; i++) {
					if(fontSizes[i].value==fontSize) {
						fontSizes[i].checked=true;
					}
				}
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
			} else if(event.type==="swiperight") {
				book.backward();
			}
		});
		
		//TOUCHES, forward, backward
		document.addEventListener('keydown', event => {
			if(event.which===39) {
				book.forward();
			} else if(event.which===37) {
				book.backward();
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
		}, false);

		backwardLarge.addEventListener('click', event => {
			book.backward();
		}, false);
		
		
		//TOC		
		let toc = bookContainer.querySelector('#toc');
		let openTocs = bookContainer.querySelectorAll('.open-toc');
		
		for(let i=0; i<openTocs.length; i++) {
			openTocs[i].addEventListener('click', event => {
				toc.className = toc.className === 'open' ? '' : 'open';
			}, false);
		}
		
		toc.querySelector("#close-toc").addEventListener('click', () => {
			toc.className = '';
		}, false);
		
		//Close toc on click
		let tocLinks = toc.querySelectorAll('a');
		for(let i=0; i<tocLinks.length; i++) {
			tocLinks[i].addEventListener('click', () => {
				toc.className = '';
			}, false);
		}
		
		//OPTIONS
		//small
		let optionsOpen = bookContainer.querySelector('#open-options');
		optionsOpen.addEventListener('click', () => {
			options.className = options.className === 'open' ? '' : 'open';
		});
		let optionsClose = bookContainer.querySelector('#close-options');
		optionsClose.addEventListener('click', () => {
			options.className='';
		});
		//medium
		let optionsMediumOpen = bookContainer.querySelector('#open-options-medium');
		optionsMediumOpen.addEventListener('click', () => {
			optionsMedium.className = optionsMedium.className === 'open' ? '' : 'open';
		});
		let optionsCloseMedium = bookContainer.querySelector('#close-options-medium');
		optionsCloseMedium.addEventListener('click', () => {
			optionsMedium.className='';
		});
		
		
		//TAB-CONTAINER
		let swingContainer = bookContainer.querySelector('#swing-container');
		let swingBar = bookContainer.querySelector('#swing-bar');
		let tabHome = bookContainer.querySelector('#tab-home-link');
		
		let toggleTocLarge = bookContainer.querySelector('#toggle-toc-large-device');
		let toggleTabOptions = bookContainer.querySelector('#toggle-tab-options');
		let toggleTabInfos = bookContainer.querySelector('#toggle-tab-infos');
		let closeTocLarge = bookContainer.querySelector('#close-toc-large-device');
		let closeTabOptions = bookContainer.querySelector('#close-tab-options');
		let closeTabInfos = bookContainer.querySelector('#close-tab-infos');
		//TOGGLE TOC-LARGE-DEVICE
		toggleTocLarge.addEventListener('click', event => {
			if(!tocLarge.className.match(/open/)) {
				if(tabInfos.className.match(/open/)) {
					tabInfos.style.zIndex='0';
					tocLarge.style.zIndex='1000';
					utils.removeClass('#tab-infos','open');
				} else if(tabOptions.className.match(/open/)) {
					tabOptions.style.zIndex='0';
					tocLarge.style.zIndex='1000';
					utils.removeClass('#tab-options','open');
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
		}, false);
		
		//CLOSE TOC-LARGE-DEVICE
		closeTocLarge.addEventListener('click', event => {
			utils.removeClass('#toc-large-device','open');
			utils.removeClass('#swing-container','left');
			utils.removeClass('#swing-bar','left');
			tocLarge.style.zIndex='0';
		}, false);
		
		//TOGGLE TAB-OPTIONS
		toggleTabOptions.addEventListener('click', event => {
			if(!tabOptions.className.match(/open/)) {
				if(tocLarge.className.match(/open/)) {
					tocLarge.style.zIndex='0';
					tabOptions.style.zIndex='1000';
					utils.removeClass('#toc-large-device','open');
				} else if(tabInfos.className.match(/open/)) {
					tabInfos.style.zIndex='0';
					tabOptions.style.zIndex='1000';
					utils.removeClass('#tab-infos','open');
				}
				utils.addClass('#tab-options','open');
				utils.addClass('#swing-container','left');
				utils.addClass('#swing-bar','left');
			} else {
				tabOptions.style.zIndex='0';
				utils.removeClass('#tab-options','open');
				utils.removeClass('#swing-container','left');
				utils.removeClass('#swing-bar','left');
			}
		}, false);
		
		//CLOSE TAB-INFOS
		closeTabOptions.addEventListener('click', event => {
			utils.removeClass('#tab-options','open');
			utils.removeClass('#swing-container','left');
			utils.removeClass('#swing-bar','left');
			tabOptions.style.zIndex='0';
		}, false);
		
		//TOGGLE TAB-INFOS
		toggleTabInfos.addEventListener('click', event => {
			if(!tabInfos.className.match(/open/)) {
				if(tocLarge.className.match(/open/)) {
					tocLarge.style.zIndex='0';
					tabInfos.style.zIndex='1000';
					utils.removeClass('#toc-large-device','open');
				} else if(tabOptions.className.match(/open/)) {
					tabOptions.style.zIndex='0';
					tabInfos.style.zIndex='1000';
					utils.removeClass('#tab-options','open');
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
				let prevLocation = dataStore.getData('location').prevLocation;
				location.hash = prevLocation ? prevLocation : '#/';
			}, false);
		}
		
		//BOOKMARK
		let addBookmarks = bookContainer.querySelectorAll('.add-bookmark');
		for(let i=0; i<addBookmarks.length; i++) {
			addBookmarks[i].addEventListener('click', event => {
				if(book.checkFirstPage()) { return; }
				let newBmrk = book.getBookmark();
				let bookmark = document.querySelector('#bookmark');
				let p = bookmark.querySelector('p');
				let msg;
				if(localStore.getBkmrk(bk.id)) {
					let oldBkmrk = localStore.getBkmrk(bk.id);
					if(oldBkmrk.sectionId===newBmrk.sectionId && oldBkmrk.el===newBmrk.el) {
						msg='Votre signet a bien été inséré.';
					} else {
						msg = 'Votre signet a bien été déplacé.';
					}
				} else {
					msg = 'Un signet a été ajouté.';
				}
				p.innerHTML = msg;
				localStore.setBkmrk(bk.id, newBmrk);
				bookmark.className = 'show';
				setTimeout(function(){ bookmark.className = bookmark.className.replace("show", ""); }, 2500);
			}, false);
		}
		
		//FONT-SIZE
		//large
		for(let i=0; i<fontSizesLarge.length; i++) {
			fontSizesLarge[i].addEventListener('click', event => {
				let size = event.target.value;
				localStore.setFontSize('large', size);
				//text opacity = 0
				text.style.opacity = '0';
				bookContainer.querySelector('#current-section-title').style.opacity = '0';
				bookContainer.querySelector('#currentByTotal').style.opacity = '0';
				utils.removeClass('#text-loader-container','hidden');
				setTimeout( () => {
					//marginY is relative to line-height (line-height : 1.5em)
					let lineHeight = size*1.5;
					let marginY = h%lineHeight!==0 ? lineHeight*2+((h%lineHeight)/2) : lineHeight*2;
					book.setMarginY(marginY);
					//text size
					text.style.fontSize = size + 'px';
					cover.style.fontSize = '16px';
					//book
					book.toBook();
					//end loader
					setTimeout( function() { 
						utils.addClass('#text-loader-container','hidden');
						text.style.opacity = '1';
						bookContainer.querySelector('#current-section-title').style.opacity = '1';
						bookContainer.querySelector('#currentByTotal').style.opacity = '1';
					}, 200);
				}, 100);
				
			}, false);
		}
		
		//medium
		for(let i=0; i<fontSizesMedium.length; i++) {
			fontSizesMedium[i].addEventListener('click', event => {
				let size = event.target.value;
				localStore.setFontSize('large', size);
				setTimeout( () => {
					optionsMedium.className = '';
					//close modal && text opacity = 0
					text.style.opacity = '0';
					bookContainer.querySelector('#current-section-title').style.opacity = '0';
					bookContainer.querySelector('#currentByTotal').style.opacity = '0';
					utils.removeClass('#text-loader-container','hidden');
					setTimeout( () => {
						//marginY is relative to line-height (line-height : 1.5em)
						let lineHeight = size*1.5;
						let marginY = h%lineHeight!==0 ? lineHeight*2+((h%lineHeight)/2) : lineHeight*2;
						book.setMarginY(marginY);
						//text size
						text.style.fontSize = size + 'px';
						cover.style.fontSize = '16px';
						//book
						book.toBook();
						//end loader
						setTimeout( function() { 
							utils.addClass('#text-loader-container','hidden');
							text.style.opacity = '1';
							bookContainer.querySelector('#current-section-title').style.opacity = '1';
							bookContainer.querySelector('#currentByTotal').style.opacity = '1';
						}, 200);
					}, 150);
				 }, 100);
				
			}, false);
		}
		
		//small
		for(let i=0; i<fontSizes.length; i++) {
			fontSizes[i].addEventListener('click', event => {
				let size = event.target.value;
				localStore.setFontSize('small', size);
				setTimeout( () => {
					//start loader and colose modal
					utils.removeClass('#text-loader-container','hidden');
					utils.removeClass('#options','open');
					document.body.style.overflow = 'hidden';
					setTimeout( () => {
						//marginY is relative to line-height (line-height : 1.5em)
						let lineHeight = size*1.5;
						let marginY = h%lineHeight!==0 ? lineHeight*2+((h%lineHeight)/2) : lineHeight*2;
						book.setMarginY(marginY);
						//text size
						text.style.fontSize = size + 'px';
						cover.style.fontSize = '14px';
						//book
						book.toBook();
						//end loader
						setTimeout( () => {
							document.body.style.overflow = 'visible'; 
							utils.addClass('#text-loader-container','hidden');
						}, 200);
					},300);
				 }, 100);
			}, false);
		}
		
		//FONT-FAMILY
		//large
		for(let i=0; i<fontsLarge.length; i++) {
			fontsLarge[i].addEventListener('click', event => {
				let font = event.target.value;
				localStore.setFont(font);
				//text opacity = 0
				text.style.opacity = '0';
				bookContainer.querySelector('#current-section-title').style.opacity = '0';
				bookContainer.querySelector('#currentByTotal').style.opacity = '0';
				utils.removeClass('#text-loader-container','hidden');
				setTimeout( () => {
					//text font
					text.style.fontFamily = font;
					bookContainer.querySelector('#current-section-title').style.fontFamily = font;
					bookContainer.querySelector('#currentByTotal').style.fontFamily = font;
					//book
					book.toBook();
					//end loader
					setTimeout( function() { 
						utils.addClass('#text-loader-container','hidden');
						text.style.opacity = '1';
						bookContainer.querySelector('#current-section-title').style.opacity = '1';
						bookContainer.querySelector('#currentByTotal').style.opacity = '1';
					}, 200);
				}, 100);
				
			}, false);
		}
		
		//medium
		for(let i=0; i<fontsMedium.length; i++) {
			fontsMedium[i].addEventListener('click', event => {
				let font = event.target.value;
				localStore.setFont(font);
				setTimeout( () => {
					optionsMedium.className = '';
					//close modal && text opacity = 0
					text.style.opacity = '0';
					bookContainer.querySelector('#current-section-title').style.opacity = '0';
					bookContainer.querySelector('#currentByTotal').style.opacity = '0';
					utils.removeClass('#text-loader-container','hidden');
					setTimeout( () => {
						//text font
						text.style.fontFamily = font;
						bookContainer.querySelector('#current-section-title').style.fontFamily = font;
					    bookContainer.querySelector('#currentByTotal').style.fontFamily = font;
						//book
						book.toBook();
						//end loader
						setTimeout( function() { 
							utils.addClass('#text-loader-container','hidden');
							text.style.opacity = '1';
							bookContainer.querySelector('#current-section-title').style.opacity = '1';
							bookContainer.querySelector('#currentByTotal').style.opacity = '1';
						}, 200);
					}, 150);
				 }, 100);
				
			}, false);
		}
		
		//small
		for(let i=0; i<fonts.length; i++) {
			fonts[i].addEventListener('click', event => {
				let font = event.target.value;
				localStore.setFont(font);
				setTimeout( () => {
					//start loader and close modal
					utils.removeClass('#text-loader-container','hidden');
					utils.removeClass('#options','open');
					document.body.style.overflow = 'hidden';
					setTimeout( () => {
						//text font
						text.style.fontFamily = font;
						bookContainer.querySelector('#current-section-title').style.fontFamily = font;
					    bookContainer.querySelector('#currentByTotal').style.fontFamily = font;
						//book
						book.toBook();
						//end loader
						setTimeout( () => {
							document.body.style.overflow = 'visible'; 
							utils.addClass('#text-loader-container','hidden');
						}, 200);
					},300);
				 }, 100);
			}, false);
		}	
		
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
	document.body.style.height = window.outerHeight + 'px';
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
