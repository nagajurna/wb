//book.js
const book = function() {
	'use strict';
	
	
	
		var bookContainer = document.querySelector('#bookContainer');
		
		var init = function() {
			//DIMENSIONS
			var h, w, marginY, fontSize, lineHeight;
			
			//width (responsive)
			if(window.innerWidth >= 768) {
				h = window.innerHeight-88-60;//navBars height *2 (2*44) + textContainer top * 2 (2*30)
				w = 640;
				fontSize = 16;
			 } else {
				 h = window.innerHeight;
				 w = window.innerWidth;
				 fontSize = 14;
			 }
			 
			 //marginY is relative to line-height
			 lineHeight = fontSize*1.5;
			 marginY = h%lineHeight!==0 ? lineHeight*2+((h%lineHeight)/2) : lineHeight*3;
			
			//new Book
			var book = new WebBook(bookContainer, {
				 height: h,
				 maxWidth: w,
				 marginY: 45});
			
			if(window.innerWidth >= 1366) {
				//Toc-large height
				document.querySelector("#toc-large-device div").style.maxHeight = h-30 + "px";
			}
							 
			//on resize
			window.addEventListener('resize', event => {
				if(window.innerWidth >= 768) {
					h = window.innerHeight-88-60;
					w = 640;
					fontSize = 16;
				} else {
					h = window.innerHeight;
					w = window.innerWidth;
					fontSize = 14;
				}
				
				if(window.innerWidth >= 1366) {
					//Toc-large height
					document.querySelector("#toc-large-device div").style.maxHeight = h-30 + "px";
				}
				
				//marginY is relative to line-height
				lineHeight = fontSize*1.5;
				marginY = h%lineHeight!==0 ? lineHeight*2+((h%lineHeight)/2) : lineHeight*3;
				
				//set new dimensions
				book.setHeight(h);
				book.setMaxWidth(w);
				book.setMarginY(marginY);
				
				if(book.col===true) {
					book.toBook();
				}
			
			}, false);
			
			
			//SWIPE - forward, backward on swipe left and right (hammer.js)
			// small devices
			var swipeContainer = new Hammer(bookContainer.querySelector('[data-wb-text-container]'));
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
			var forwardLarge = bookContainer.querySelector('#forward-large');
			var backwardLarge = bookContainer.querySelector('#backward-large');
			
			forwardLarge.addEventListener('click', event => {
				book.forward();
			}, false);

			backwardLarge.addEventListener('click', event => {
				book.backward();
			}, false);
			
			
			//TOC		
			var toc = bookContainer.querySelector('#toc');
			var openToc = bookContainer.querySelectorAll('.open-toc');
			
			for(var i=0; i<openToc.length; i++) {
				openToc[i].addEventListener('click', event => {
					toc.className = toc.className === "open" ? "" : "open";
				}, false);
			}
			
			toc.querySelector("#close-toc").addEventListener('click', () => {
				toc.className = "";
			}, false);
			
			//Close toc on click
			var tocLinks = toc.querySelectorAll('a');
			for(var i=0; i<tocLinks.length; i++) {
				tocLinks[i].addEventListener('click', () => {
					toc.className = "";
				}, false);
			}
			
			
			//TOC-LARGE-DEVICE
			var tocLarge = bookContainer.querySelector('#toc-large-device');
			var swingContainer = bookContainer.querySelector('#swing-container');
			var swingBar = bookContainer.querySelector('#swing-bar');
			//Toggle toc-large-device, swing-container, swing-bar
			bookContainer.querySelector('#toggle-toc-large-device').addEventListener('click', event => {
				if(!tocLarge.className.match(/open/)) {
					tocLarge.className += " open";
					swingContainer.className += " left";
					swingBar.className += " left";
				} else {
					tocLarge.className = tocLarge.className.replace(/ open/,'');
					swingContainer.className = swingContainer.className.replace(/ left/,'');
					swingBar.className = swingContainer.className.replace(/ left/,'');
				}
			}, false);
			
			//end loader
			bookContainer.className = 'show';
		
		}
		
		var url = location.hash.replace(/#/,'');
		var options = { method: 'GET', url: url };
		var text = bookContainer.querySelector('[data-wb-text]');
		
		utils.ajax(options).then( response => {
			let meta = JSON.parse(response).book;
			let content = meta.author + '&ensp;&mdash;&ensp;' + meta.title;
			utils.setHTML("#top-title", content);
			utils.setHTML("#toc-title p:nth-child(1)", meta.author);
			utils.setHTML("#toc-title p:nth-child(2)", meta.title);
			utils.setHTML("#toc-large-device p:nth-child(1)", meta.author);
			utils.setHTML("#toc-large-device p:nth-child(2)", meta.title);
			return utils.ajax({ method: 'GET', url: meta.path + '.html' })
		}).then( book => {
			var div = document.createElement('div');
			div.innerHTML = book;
			text.appendChild(div);
			init();
		})
	

};
