//book.js
const book = function() {
	'use strict';
	
	//rootElement
	const root = document.querySelector("#home.content");

	const bookContainer = document.querySelector('#bookContainer');
	
	let init = function() {
		//DIMENSIONS
		let h, w, marginY, fontSize, lineHeight;
		
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
		let book = new WebBook(bookContainer, {
			 height: h,
			 maxWidth: w,
			 marginY: 45});
		
		if(window.innerWidth >= 1366) {
			//Toc-large height
			bookContainer.querySelector("#toc-large-device div").style.maxHeight = h-30 + "px";
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
				bookContainer.querySelector("#toc-large-device div").style.maxHeight = h-30 + "px";
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
		
		//end loader
		bookContainer.className = 'show';
	
	}
	
	let url = location.hash.replace(/#/,'');
	let options = { method: 'GET', url: url };
	let text = bookContainer.querySelector('[data-wb-text]');
	
	utils.ajax(options).then( response => {
		let meta = JSON.parse(response).book;
		utils.bind(meta);
		return utils.ajax({ method: 'GET', url: meta.path + '.html' })
	}).then( book => {
		let div = document.createElement('div');
		div.innerHTML = book;
		text.appendChild(div);
		init();
	})
	

};
