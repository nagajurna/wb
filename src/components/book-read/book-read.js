import utils from '../../services/utils';
import dataStore from '../../services/dataStore';
import localStore from '../../services/localStore';
import WebBook from '../../../lib/wb/WebBook';
import css from './book-read.css';
//import Hammer from 'hammerjs';
import ZingTouch from 'zingtouch';

let bookReadTemplate = require('./book-read.ejs');
//book.js
const book = function(container) {
	'use strict';
	let c = container;
	
	let init = function(content) {
		let textContainer = bookContainer.querySelector('[data-wb-text-container]');
		let text = bookContainer.querySelector('[data-wb-text]');
		let tocLarge = bookContainer.querySelector('#toc-large-device');
		let tabOptions = bookContainer.querySelector('#tab-options');
		let options = bookContainer.querySelector('#options');
		let optionsMedium = bookContainer.querySelector('#options-medium');
		let fontSizesLarge = tabOptions.querySelectorAll('[name=fontSize]');
		let fontSizesMedium = optionsMedium.querySelectorAll('[name=fontSize]');
		let fontSizes = options.querySelectorAll('[name=fontSize]');
		let tabInfos = bookContainer.querySelector('#tab-infos');
		let bookCommands = bookContainer.querySelector('#book-commands');
		let bookNavBarBottom = bookContainer.querySelector('#book-nav-bar-bottom');
		let bookNavBarBottomSmall = bookContainer.querySelector('#book-nav-bar-bottom-small');
		let fontSizeValidLarge = bookContainer.querySelector('#font-size-valid-large');
		let fontSizeValid = bookContainer.querySelector('#font-size-valid');
		
		//DIMENSIONS
		let h, w, marginY, marginX, font, fontSize, lineHeight, top;
		let ww = window.innerWidth;
		let wh = window.innerHeight;
		
		//font-family
		font = bk.styles.font;
		text.style.fontFamily = font;
		bookContainer.querySelector('#current-section-title').style.fontFamily = font;
		bookContainer.querySelector('#currentByTotal').style.fontFamily = font;
		
		//width (responsive)
		if(ww >= 768) {
			utils.addClass('[data-wb-text-container]', 'card-4');
			//max-height: 720
			if(wh > 832) {//748 + navBarBottom height (1*44) + textContainer minimum top * 2 (2*20)
				h = 748;
				top = (wh-748-44)/2;
				textContainer.style.top = top-15 + 'px';
				tocLarge.style.marginTop = top-15 + 'px';
				tabOptions.style.marginTop = top+33 + 'px';
				tabInfos.style.marginTop = top+80 + 'px';
				bookCommands.style.top = top-16 + 'px';
				bookNavBarBottom.style.marginTop = top-15 + 'px';
			} else {
				h = wh-44-40;//navBarBottom height (1*44) + textContainer top * 2 (2*20)
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
			//cover.style.fontSize = '16px';
			if(ww < 1366) {
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
			 utils.removeClass('[data-wb-text-container]', 'card-4');
			 h = wh-30;//30px = nav-bar-bottom-small height
			 w = ww;
			 bookNavBarBottomSmall.style.width = w + 'px';
			 fontSize = localStore.getFontSize('small') ? localStore.getFontSize('small') : 14;
			 text.style.fontSize = fontSize+'px';
			 //cover.style.fontSize = '14px';
			 //font
			 for(let i=0; i<fontSizes.length; i++) {
				if(fontSizes[i].value==fontSize) {
					fontSizes[i].checked=true;
				}
			 }
			 textContainer.style.top ='0px';
		 }
		 
		 //marginY is relative to line-height (line-height : 1.5em)
		 lineHeight = fontSize*1.5;
		 marginY = h%lineHeight!==0 ? lineHeight*2+((h%lineHeight)/2) : lineHeight*2;
		 
		//marginX : smaller for very small devices
		if(ww > 420) {
			marginX = 50;
		} else {
			marginX = 25;
		}
		 
  
		let settings = () => {
			
			if(ww >= 1366) {
				//Toc-large height
				let div = bookContainer.querySelector("#toc-large-device div");
				if(div) {
					div.style.maxHeight = h + "px";
				}
			}
			
			let resizeBook = () => {
				utils.addClass('#book','fixed');
				ww = window.innerWidth;
				wh = window.innerHeight;
				if(!location.hash.match(/#\/[^\/]+\/read$/)) { return; }
				if(ww >= 768) {
					utils.addClass('[data-wb-text-container]', 'card-4');
					//max-height: 720
					if(wh >= 832) {//748 + navBarBottom height (1*44) + textContainer minimum top * 2 (2*20)
						h = 748;
						top = (wh-748-44)/2;
						textContainer.style.top = top-15 + 'px';
						tocLarge.style.marginTop = top-15 + 'px';
						tabOptions.style.marginTop = top+33 + 'px';
						tabInfos.style.marginTop = top+80 + 'px';
						bookCommands.style.top = top-16 + 'px';
						bookNavBarBottom.style.marginTop = top-15 + 'px';
					} else {
						h = wh-44-40;//navBars height *2 (2*44) + textContainer top * 2 (2*20)
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
					//cover.style.fontSize = '16px';
					if(ww < 1366) {
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
					utils.removeClass('[data-wb-text-container]', 'card-4');
					h = wh-30;//30px = nav-bar-bottom-small height
					w = ww;
					bookNavBarBottomSmall.style.width = w + 'px';
					fontSize = localStore.getFontSize('small') ? localStore.getFontSize('small') : 14;
					text.style.fontSize = fontSize+'px';
					//cover.style.fontSize = '14px';
					for(let i=0; i<fontSizes.length; i++) {
						if(fontSizes[i].value==fontSize) {
							fontSizes[i].checked=true;
						}
					}
					textContainer.style.top ='0px';
				}
				
				if(ww >= 1366) {
					//Toc-large height
					let div = bookContainer.querySelector("#toc-large-device div");
					if(div) {
						div.style.maxHeight = h + "px";
					}
				}
				
				//marginY is relative to line-height
				lineHeight = fontSize*1.5;
				marginY = h%lineHeight!==0 ? lineHeight*2+((h%lineHeight)/2) : lineHeight*2;
				
				//marginX : smaller for very small devices
				if(ww > 420) {
					marginX = 50;
				} else {
					marginX = 25;
				}
				
				//set new dimensions
				book.setHeight(h);
				book.setMaxWidth(w);
				book.setMarginY(marginY);
				book.setMarginX(marginX);
				
				//tableInfos
				let tableInfos = localStore.getTableInfos({ id: bk.id,
															path: bk.path,
															dim: w + 'x' + h,
															font: font,
															fontSize: fontSize });
				
				book.init(tableInfos)
				.then( resolve => {
					utils.removeClass('#book','fixed');
					localStore.setTableInfos({ id: bk.id,
											   path: bk.path,	
											   dim: w + 'x' + h,
									           font: font,
									           fontSize: fontSize,
									           tableInfos: resolve });
				});
				
				
			}
						 
			//on resize
			//let rtime;
			//let timeout = false;
			//let delta = 600;
			//window.addEventListener('resize', event => {
				//if(!location.hash.match(/#\/[^\/]+\/read$/)) { return; }
				//rtime = new Date();
				//if (timeout === false) {
					//timeout = true;
					//setTimeout(resizeend, delta);
				//}
			
			//}, false);
			
			//function resizeend() {
				//if (new Date() - rtime < delta) {
					//setTimeout(resizeend, delta);
				//} else {
					//timeout = false;
					//resizeBook();
				//}               
			//}
			
			window.addEventListener('resize', resizeBook, false);
		
			//SWIPE - forward, backward on swipe left and right (hammer.js)
			// all sizes
			const myRegion = new ZingTouch.Region(textContainer, false, false);
			myRegion.bind(textContainer, 'swipe', function(e){
				let dir = e.detail.data[0].currentDirection;
				if(dir > 135 && dir < 225) {
					book.forward();
				} else if(dir < 45 || dir > 315) {
					book.backward();
				}
			});		
		
			//TOUCHES, forward, backward (medium and large sizes)
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
		
			//CLOSE TAB-OPTIONS
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
		
			//HOME (all sizes)
			let homeLinks = bookContainer.querySelectorAll('.home');
			for(let i=0; i<homeLinks.length; i++) {
				homeLinks[i].addEventListener('click', event => {
					event.preventDefault();
					let prevLocation = dataStore.getData('location').prevLocation;
					prevLocation = prevLocation && prevLocation.match(/#\/[^\/]+\/read$/) ? '#/' : prevLocation;
					location.hash = prevLocation ? prevLocation : '#/';
				}, false);
			}
			
			//BOOKMARK (all sizes)
			let addBookmarks = bookContainer.querySelectorAll('.add-bookmark');
			for(let i=0; i<addBookmarks.length; i++) {
				addBookmarks[i].addEventListener('click', event => {
					let newBmrk = book.getBookmark();
					let bookmark = document.querySelector('#bookmark');
					localStore.setBkmrk(bk.id, bk.path, newBmrk);
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
						//cover.style.fontSize = '16px';
						//book
						book.init()
						.then( resolve => {
							//end loader
							utils.addClass('#text-loader-container','hidden');
							text.style.opacity = '1';
							bookContainer.querySelector('#current-section-title').style.opacity = '1';
							bookContainer.querySelector('#currentByTotal').style.opacity = '1';
						})
						.catch( error => {
							utils.addClass('#text-loader-container','hidden');
							text.style.opacity = '1';
							bookContainer.querySelector('#current-section-title').style.opacity = '1';
							bookContainer.querySelector('#currentByTotal').style.opacity = '1';
						});
					}, 100);
				}, false);
			}
		
			//medium
			for(let i=0; i<fontSizesMedium.length; i++) {
				fontSizesMedium[i].addEventListener('click', event => {
					let size = event.target.value;
					localStore.setFontSize('large', size);
					//close modal && text opacity = 0
					optionsMedium.className = '';
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
						//cover.style.fontSize = '16px';
						//book
						book.init()
						.then( resolve => {
							//end loader
							utils.addClass('#text-loader-container','hidden');
							text.style.opacity = '1';
							bookContainer.querySelector('#current-section-title').style.opacity = '1';
							bookContainer.querySelector('#currentByTotal').style.opacity = '1';
						})
						.catch( error => {
							utils.addClass('#text-loader-container','hidden');
							text.style.opacity = '1';
							bookContainer.querySelector('#current-section-title').style.opacity = '1';
							bookContainer.querySelector('#currentByTotal').style.opacity = '1';
						});
					}, 100);
				}, false);
			}
			
			//small
			for(let i=0; i<fontSizes.length; i++) {
				fontSizes[i].addEventListener('click', event => {
					let size = event.target.value;
					localStore.setFontSize('small', size);
					//start loader and close modal
					text.style.opacity = '0';
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
						//cover.style.fontSize = '14px';
						//book
						book.init()
						.then(resolve => {
							//end loader
							document.body.style.overflow = 'visible'; 
							utils.addClass('#text-loader-container','hidden');
							text.style.opacity = '1';
						})
						.catch( error => {
							document.body.style.overflow = 'visible'; 
							utils.addClass('#text-loader-container','hidden');
							text.style.opacity = '1';
						});		
					 },100);
				}, false);
			}
		}
		
		//new Book
		let book = new WebBook(bookContainer, {
			 height: h,
			 maxWidth: w,
			 marginY: marginY,
			 marginX: marginX,
			 text: content
		 });
		 
		tableInfos
		let tableInfos = localStore.getTableInfos({ id: bk.id,
													path: bk.path,
													dim: w + 'x' + h,
													font: font,
													fontSize: fontSize });
		 
		 book.init(tableInfos)
		 .then( table => {
			 //document.body.style.height = window.innerHeight + 'px';
			 if(localStore.getBkmrk(bk.id, bk.path)) {
				let bkmrk = localStore.getBkmrk(bk.id, bk.path);
				book.goToBookmark(bkmrk);
			 }
			
			return table;
			
		 })
		 .then( table => {
			settings();
			return table;
		 })
		 .then (table => {
			utils.addClass('#book-loader-container', 'hidden');
			bookContainer.className = 'show';
			return table;
		})
		.then (table => {
			localStore.setTableInfos({ id: bk.id,
										path: bk.path,
									    dim: w + 'x' + h,
									    font: font,
									    fontSize: fontSize,
									    tableInfos: table });
			//ajax post
			//let data = { id: bk.id,
						 //agent: window.navigator.userAgent,
						 //width: w,
						 //height: h,
						 //font: font,
						 //fontSize: fontSize,
						 //table: table }
		    //let options = { method: 'POST', url: '/tables/new', data: JSON.stringify(data) };
		    //return utils.ajax(options);
		//})
		//.then ( response => {
			//let res = JSON.parse(response);
			//if(res.error) {
				//console.log(res.error);
			//} else {
				//console.log(res.message);
			//}
		})
		.catch(error => {
			 console.log(error);
			 return;
		 });	
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

	//METAS
	let titleElement, contentTitle;
	if(bk.subtitle1 && bk.subtitle2) {
		titleElement = bk.authorDisplay + ' : ' + bk.title + ' ; ' + bk.subtitle1 + ' (' + bk.subtitle2 + ')' + '&ensp;&ndash;&ensp;&Eacute;quivoques';
		contentTitle = bk.title + ' ; ' + bk.subtitle1 + ' (' + bk.subtitle2 + ')';
	} else if(bk.subtitle1) {
		titleElement = bk.authorDisplay + ' : ' + bk.title + ' ; ' + bk.subtitle1 + '&ensp;&ndash;&ensp;&Eacute;quivoques';
		contentTitle = bk.title + ' ; ' + bk.subtitle1;
	} else {
		titleElement = bk.authorDisplay + ' : '  + bk.title + '&ensp;&ndash;&ensp;&Eacute;quivoques';
		contentTitle = bk.title;
	}
	utils.setHTML('title', titleElement);
	utils.setAttributeContent('[name=title]', 'content', contentTitle);
	utils.setAttributeContent('[name=description]', 'content', bk.description);
	utils.setAttributeContent('[name=author]', 'content', bk.authorDisplay);
	//INSERT TEMPLATE
	c.innerHTML = bookReadTemplate({ book:bk });
	//START LOADER
	utils.removeClass('#book-loader-container','hidden');
	
	//BOOK CONTAINER
	const bookContainer = document.querySelector('#bookContainer');
	const book = document.querySelector('#book');
		
	//GET TEXT CONTENT
	let options = { method: 'GET', url: bk.path + '.css' };
	utils.ajax(options)
	.then( content => {
		let style = document.getElementById('custom_rules');
		style.innerHTML = content;
		options = { method: 'GET', url: bk.path + '.html' };
		return utils.ajax(options);
	})
	.then( content => {
		dataStore.setData('book',bk.id);
		init(content);	
	})
	.catch( error => {
		console.log(error);
		utils.addClass('#book-loader-container', 'hidden');
		location.hash = '#/';
	});
	
	

};

export default book;
