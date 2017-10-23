window.addEventListener('load', function() {
	
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
		window.addEventListener('resize',function(event) {
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
		swipeContainer.on("swiperight swipeleft", function(event) {
			if(event.type==="swipeleft") {
				book.forward();
			} else if(event.type==="swiperight") {
				book.backward();
			}
		});
		
			
		//BUTTONS
		//large
		var forwardLarge = bookContainer.querySelector('#forward-large');
		var backwardLarge = bookContainer.querySelector('#backward-large');
		
		forwardLarge.addEventListener('click', function(event) {
			book.forward();
		}, false);

		backwardLarge.addEventListener('click', function(event) {
			book.backward();
		}, false);
		
		
		//TOC		
		var toc = bookContainer.querySelector('#toc');
		var openToc = bookContainer.querySelectorAll('.open-toc');
		
		for(var i=0; i<openToc.length; i++) {
			openToc[i].addEventListener('click', function() {
				toc.className = toc.className === "open" ? "" : "open";
			}, false);
		}
		
		toc.querySelector("#close-toc").addEventListener('click', function() {
			toc.className = "";
		}, false);
		
		//Close toc on click
		var tocLinks = toc.querySelectorAll('a');
		for(var i=0; i<tocLinks.length; i++) {
			tocLinks[i].addEventListener('click', function() {
				toc.className = "";
			}, false);
		}
		
		
		//TOC-LARGE-DEVICE
		var tocLarge = bookContainer.querySelector('#toc-large-device');
		var swingContainer = bookContainer.querySelector('#swing-container');
		var swingBar = bookContainer.querySelector('#swing-bar');
		//Toggle toc-large-device, swing-container, swing-bar
		bookContainer.querySelector('#toggle-toc-large-device').addEventListener('click', function(event) {
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
	
	
	
	
	var ajax = function(options, callback) {
		var method = options.method;
		var url = options.url;
		var data = options.data;
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if(this.readyState===4 && this.status===200) {
				callback(this.responseText);
			}
		}
		xmlhttp.open(method,url,true);
		xmlhttp.setRequestHeader("Content-type", "application/json");
		if(data) {
			xmlhttp.send(data);
		} else {
			xmlhttp.send();
		}
	}
	
	var url = location.pathname.replace(/\/books\//,'');
	var options = { method: 'GET', url: url + '.html' };
	var text = bookContainer.querySelector('[data-wb-text]');
	
	ajax(options, function(response) {
		var div = document.createElement('div');
		div.innerHTML = response;
		text.appendChild(div);
		init();
	});
	
		
}, false);
