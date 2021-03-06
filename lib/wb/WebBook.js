import $ from 'jquery/src/core';
import 'jquery/src/offset';
import Promise from 'promise';

export default class WebBook {
	constructor(bookContainer, options) {
		//containers
		this._bookContainer = bookContainer;
		this._textContainer = bookContainer.querySelector('[data-wb-text-container]');
		this._text = bookContainer.querySelector('[data-wb-text]');
		//options height, width, marginX, marginY
		this._height = options.height;
		this._width = options.maxWidth;
		this._marginX = options.marginX===undefined ? 35 : options.marginX;
		this._marginY = options.marginY===undefined ? 20 : options.marginY;
		//init position, col ,containerWidth, bookmark, startPage, sectionsIndex, parentSection, pages_total
		this._position = 0;
		this.col = true;//default true = toBook()
		this._bookmark = null;
		this._containerWidth = 0;
		this._startPage = 0;
		this._sectionsIndex = 0;
		this._parentSection = null;
		this._pages_total = 0;
		//this._lastElement is used as landmark
		this._lastElement = document.createElement('DIV');
		this._lastElement.className = 'wb-section wb-no-toc';
		this._lastElement.id = 'wb-last';
		let p = document.createElement('P');
		p.innerHTML = '&nbsp;';//not empty (for mozColumns)
		this._lastElement.appendChild(p);
		//options text
		this._div = document.createElement("DIV");
		this._div.id = 'wb_div';
		this._div.innerHTML = options.text;
		this._div.appendChild(this._lastElement);
		//div container
		this._divContainer = document.createElement('DIV');
		this._divContainer.appendChild(this._div);
		//SECTIONS
		//main sections
		this._sections = this._divContainer.querySelectorAll('#wb_div > .wb-section');
		//main sections + nested sections
		this._sectionsToc = this._div.querySelectorAll('.wb-section');
		//sections without wb-no-toc
		this._tocSections = [];
		for(let i=0; i<this._sectionsToc.length; i++) {
			if(!this._sectionsToc[i].className.match(/wb-no-toc/)) {
				this._tocSections.push(this._sectionsToc[i]);
			}
		}
		//TOCS CONTAINER + TOCS INIT
		this._tocs = this._bookContainer.querySelectorAll('[data-wb-toc]');
		//getTocs before querying this.elPageNumbers
		this.getTocs();
		//INFOS CONTAINERS
		this._currentPages = this._bookContainer.querySelectorAll('.wb-current-page');
		this._totalPages = this._bookContainer.querySelectorAll('.wb-total-pages');
		this._currentTotalPages = this._bookContainer.querySelectorAll('.wb-currentByTotal-pages');
		this._elPageNumbers = this._bookContainer.querySelectorAll('[data-wb-element-page-number]');
		this._sectionTitles = this._bookContainer.querySelectorAll('.wb-current-section-title');
		//set bookContainer links : replace default with goToElement
		this.setBookLinks();
	}
	
	init(infos) {
		this._tableInfos = infos;
		let promise = new Promise( (resolve,reject) => {
			if('webkitColumnWidth' in document.body.style || 'mozColumnWidth' in document.body.style || 'columnWidth'  in document.body.style) {
				
				let sections = this._sectionsToc;
				//sections breaks			
				//for(let i=0; i<sections.length; i++) {
					//sections[i].style.display='none';
					//if(!sections[i].className.match(/wb-no-break/) && sections[i].style.marginBottom!=="300%") {//possibly, for nested sections
						//sections[i].style.marginBottom = "300%";
					//}
					////hack firefox (pour offsetLeft) : minHeight = 10%
					//if(sections[i].style.minHeight!=="10%" && sections[i].style.minHeight!=="10%") {
						//sections[i].style.minHeight = "10%";
					//}
					//sections[i].style.display='block';
				//}
				this._text.style.display = 'none';
				this.emptyNode(this._text);
				this._text.appendChild(this._div);
				this.toBook();
				this._elPageNumbers = this._bookContainer.querySelectorAll('[data-wb-element-page-number]');
				if(this._tableInfos===undefined) {
					
					
								
					//pagination start
					this._startPage = this.getPageStart();
					//book total number of pages
					this.pages_total = this.getBookTotalPages();
					//array : for each section, starting page;
					this._sections_page_start = [];
					this._toc_sections_page_start = [];
					for(let i=0; i<sections.length; i++) {
						let item = {};
						item.id = sections[i].id;
						item.page_start = this.elementPageNumber(item.id);
						if(!sections[i].parentElement.className.match(/wb-section/)) {
							this._sections_page_start.push(item);
						}
						this._toc_sections_page_start.push(item);
					}
					
					
					for(let i=0; i<this._elPageNumbers.length; i++) {
						let item = {};
						let id = this._elPageNumbers[i].getAttribute('data-wb-element-page-number');
						let el = this._text.querySelector('#' + id);
						
						if(!el.className.match(/wb-section/)) {//non sections refs
							item.id = id;
							item.page_start = this.elementPageNumber(id);
							this._toc_sections_page_start.push(item);
						}
					}
					
				} else {
					this._startPage = this._tableInfos.startPage;
					this.pages_total = this._tableInfos.totalPages;
					this._sections_page_start = this._tableInfos.sectionsPageStart;
					this._toc_sections_page_start = this._tableInfos.tocSectionsPageStart;
				}
								
				//containers data-wb-element-page-number
				for(let i=0; i<this._elPageNumbers.length; i++) {
					let id = this._elPageNumbers[i].getAttribute('data-wb-element-page-number');
					let pageNumber = this._toc_sections_page_start.filter( o => {
							return o.id===id;
						})[0].page_start;
					
					if(pageNumber < 1) {
						this._elPageNumbers[i].innerHTML = "";
					} else if(this._elPageNumbers[i].innerHTML!=pageNumber) {
						this._elPageNumbers[i].innerHTML = pageNumber;
					}
				}
					
				if(this._bookmark) {
					this.goToBookmark(this._bookmark);
					this._position = Math.round($(this._text).position().left);
				} else {
					this.nextSection(this._sectionsIndex);
				}
				this.refresh();
				this._text.style.display = 'block';
				let tableInfos = { startPage: this._startPage, 
							  totalPages: this.pages_total, 
							  sectionsPageStart: this._sections_page_start,
							  tocSectionsPageStart: this._toc_sections_page_start };
				
				resolve(tableInfos);		
			
			} else {
				
				reject('no column');
			}
			
		});
		
		return promise;
	}

	toBook() {
		this.col = true;
		let marginX = this.getMarginX();
		let marginY = this.getMarginY();
		
		//text-container
		let cs = this._textContainer.style;
		cs.display = "none";
		cs.boxSizing = "border-box";
		cs.webkitBoxSizing = "border-box";
		cs.overflow = "hidden";
		cs.position = "relative";
		cs.padding = "0px";
		cs.height = this.getHeight() + "px";
		cs.maxWidth = this.getMaxWidth() + "px";//maxWidth : responsive
		cs.display = "block";
		//this._containerWidth = this._textContainer.clientWidth;//responsive
		this._containerWidth = this.getMaxWidth();
		//text
		let ts = this._text.style;
		ts.display = "none";
		ts.boxSizing = "border-box";
		ts.webkitBoxSizing = "border-box";
		ts.position = "absolute";
		ts.left = 0;
		ts.top = 0;	
		ts.height = "100%";
		ts.width = "100%";
		ts.paddingRight = marginX + "px";
		ts.paddingLeft = marginX + "px";
		ts.paddingTop = marginY + "px";
		ts.paddingBottom = marginY + "px";
		ts.webkitColumnFill = "auto";//important !!!
		ts.mozColumnFill = "auto";//important !!!
		ts.columnFill = "auto";//important !!!		
		ts.webkitColumnWidth = this._containerWidth + "px";
		ts.mozColumnWidth = this._containerWidth + "px";
		ts.columnWidth = this._containerWidth + "px";
		ts.mozColumnGap = marginX*2 + "px";
		ts.webkitColumnGap = marginX*2 + "px";
		ts.columnGap = marginX*2 + "px";
		ts.display = "block";
		
		//if(cb) {
			//if(window.requestAnimationFrame) {
				//this._raf = window.requestAnimationFrame(cb);
			//} else {
				//setTimeout(cb,50);
			//}
		//}
	}

	//toScroll() {
		//'use strict';
		//this.col = false;
		//let cs = this._textContainer.style;
		//let ts = this._text.style;
		////container
		//cs.height = "auto";
		//cs.maxWidth = this.getMaxWidth() + "px";
		//cs.overflow = "visible";
		////text
		//ts.position = "static";
		//ts.height = "auto";
		//cs.paddingRight = this.getMarginX() + "px";
		//cs.paddingLeft = this.getMarginX() + "px";
		//cs.paddingTop = this.getMarginY() + "px";
		//cs.paddingBottom = this.getMarginY() + "px";

		//if('webkitColumnWidth' in document.body.style || 'mozColumnWidth' in document.body.style || 'columnWidth'  in document.body.style) {
			//ts.webkitColumns = "auto auto";
			//ts.mozColumns = "auto auto";
			//ts.columns = "auto auto";
		//}
		

		////Sections (for mozColumns)
		//for(let i=0; i<this._sections.length; i++) {
			//this._sections[i].style.minHeight = "0";
		//}
		////last element
		//this._lastElement.style.marginBottom = "0px";
		
		////wb-total-pages empty
		//for(let i=0; i<this._totalPages.length; i++) {
			//this._totalPages[i].innerHTML = "";
		//}
		////data-wb-element-page-number empty
		//for(let i=0; i<this._elPageNumbers.length; i++) {
			//this._elPageNumbers[i].innerHTML = "";
		//}

		//this.refresh();
	//};

	setMaxWidth(w) {
		this._width = w;
		return this;
	}

	getMaxWidth() {
		return this._width;
	}

	setHeight(h) {
		this._height = h;
		return this;
	}

	getHeight() {
		return this._height;
	}

	setMarginX(m) {
		this._marginX = m;
		return this;
	}

	getMarginX() {
		return this._marginX;
	}

	setMarginY(m) {
		this._marginY = m;
		return this;
	}

	getMarginY() {
		return this._marginY;
	}
	
	emptyNode(el) {
		var child = el.firstChild;
		while(child) {
			el.removeChild(child);
			child = el.firstChild;
		}
	}
	
	setBookLinks() {
		let links = this._bookContainer.querySelectorAll('.wb-link');
		for(let i=0; i<links.length; i++) {
			links[i].addEventListener('click', e => {
				if(this.col===true) {
					e.preventDefault();
					let href = e.currentTarget.getAttribute('href');
					let id = href.replace(/^#/,"");
					this.goToElement(id);
				}
			}, false)
		}
	}
	
	setSectionLinks() {
		let section = this._text.querySelectorAll('.wb-section')[0];
		let links = section.querySelectorAll('.wb-link');
		for(let i=0; i<links.length; i++) {
			links[i].addEventListener('click', e => {
				if(this.col===true) {
					e.preventDefault();
					let href = e.currentTarget.getAttribute('href');
					let id = href.replace(/^#/,"");
					this.goToElement(id);
				}
			}, false)
		}
	}
	
	nextSection(index) {
		if(this._sections[index].id==='wb-last') { return; }
		this._sectionsIndex = index;
		this.emptyNode(this._text);
		this._text.appendChild(this._sections[this._sectionsIndex].cloneNode(true));
		this._text.appendChild(this._lastElement.cloneNode(true));
		this.setSectionLinks();
		if(this._tableInfos) {
			this.toBook();
		}
		this.goToPage(this.elementPageNumber(this._sections[index].id));
		//this._position = 0;
		//this._text.style.left = this._position + "px";
		this.refresh();
	}
	
	prevSection(index) {
		if(index<0) { return; }
		this._sectionsIndex = index;
		this.emptyNode(this._text);
		this._text.appendChild(this._sections[this._sectionsIndex].cloneNode(true));
		this._text.appendChild(this._lastElement.cloneNode(true));
		this.setSectionLinks();
		if(this._tableInfos) {
			this.toBook();
		}
		this.goToPage(this.getSectionTotalPages()-this._startPage);
		this.refresh();
	}
	
	goToElement(id) {
		for(let i=0; i<this._sections.length; i++) {
			if(this._sections[i].id===id) {
				this.nextSection(i);
				break;
			} else if(this._sections[i].querySelector('#' + id)) {
				this._sectionsIndex = i;
				if(this._sections[this._sectionsIndex].id!==this._text.querySelectorAll('.wb-section')[0].id) {
					this.emptyNode(this._text);
					this._text.appendChild(this._sections[this._sectionsIndex].cloneNode(true));
					this._text.appendChild(this._lastElement.cloneNode(true));
					this.setSectionLinks();
					if(this._tableInfos) {
						this.toBook();
					}
				}
				this.goToPage(this.elementPageNumber(id));
				this.refresh();
				break;
			} 
		}
	}
	
	getParentSectionId() {
		let sections = this._text.querySelectorAll('.wb-section');
		return sections[0].id;
	}

	forward() {
		if(this.getSectionTotalPages() === this.getPageNumber()) {
			this.nextSection(this._sectionsIndex+1);
		} else {
			this._position = Math.round($(this._text).position().left);
			this._position -= this._containerWidth;
			this._text.style.left = this._position + "px";
			this.refresh();
		}
	}

	backward() {
		if(this.getPageNumber()==1) {
			this.prevSection(this._sectionsIndex-1);
		} else {
			this._position = Math.round($(this._text).position().left);
			this._position += this._containerWidth;
			this._text.style.left = this._position + "px";
			this.refresh();
		}
	}

	toFirstPage() {
		this.nextSection(0);
		this.refresh();
	}

	toLastPage() {
		this.prevSection(this._sections.length-2);
		this.refresh();
	}
	
	getPageStart() {
		let index, startIndex, startPage;
		for(let i=0; i< this._sections.length; i++) {
			if(this._sections[i] && this._sections[i].className.match(/wb-no-page/)) {
				index = i;
			} else {
				if(index!==undefined && startIndex===undefined) {
					if(!this._sections[i].className.match(/wb-no-page/)) {
						startIndex = i;
						let id = this._sections[startIndex].id;
						let el = this._text.querySelector('#' + id + ' p:first-child');
						let elPosition = Math.round($(el).position().left) - this.getMarginX();
						elPosition = (elPosition%this._containerWidth!==0 ? elPosition-elPosition%this._containerWidth : elPosition);//always at a page beginning
						startPage = elPosition/this._containerWidth;
						break;
					}
				}
			}
		}
		startPage = startPage ? startPage : 0;
		return startPage;
	}
	
	checkFirstPage() {
		let check = this._position===0 ? true : false;
		return check;
	}

	getPageNumber() {
		//this._position/this._containerWidth is start of a page : start 0 is page 1,... (so : +1)
		let pageNumber = Math.abs(Math.floor(this._position/this._containerWidth))+1;
		//this._startPage (pagination start)
		pageNumber = pageNumber;
		return pageNumber;
	}

	getSectionTotalPages() {
		let totalPages = Math.floor(Math.round($(this._text.lastElementChild).position().left)/this._containerWidth);
		totalPages = totalPages;
		return totalPages;
	}
	
	getBookTotalPages() {
		let totalPages = Math.floor(Math.round($(this._lastElement).position().left)/this._containerWidth);
		totalPages = totalPages-this._startPage;
		return totalPages;
	}

	goToPage(number) {
		//number = number<1-this._startPage ? 1-this._startPage : number;
		//number= number>this.getTotalPages() ? this.getTotalPages() : number;
		number = number + this._startPage;
		let position = this._containerWidth*(number-1);
		this._text.style.left = -position + "px";
		this._position = Math.round($(this._text).position().left);
	}
	
	getElementPosition(element) {
		let pos = Math.round($(element).position().left)-this.getMarginX();
		pos = (pos%this._containerWidth!==0 ? pos-pos%this._containerWidth : pos);//always at a page beginning
		return pos;
	}

	elementPageNumber(id) {
		let el;
		if(this._text.querySelector('#' + id).className.match(/wb-section/)) {
			el = this._text.querySelector('#' + id + ' p:first-child');
		} else if(this._text.querySelector('#' + id)) {
			el = this._text.querySelector('#' + id);
		}
		if(!el) { return ''; }
		let elPosition = this.getElementPosition(el);
		let elPageNumber = (elPosition/this._containerWidth) + 1;//elPosition/this._containerWidth is position of a page : position 0 is page 1,...
		elPageNumber = elPageNumber-(this._startPage);
		return elPageNumber;
	}

	getSectionTitle() {
		let title = "";
		let section = this._text.querySelectorAll('.wb-section')[0];
		if(section.querySelectorAll('.wb-section').length!==0 && this._text.querySelectorAll('.wb-section-title').length!==0) {//nested sections
			let sects = this._text.querySelectorAll('.wb-section-title');
			let sections = [].slice.call(sects);
			sections.push(this._lastElement);
			for(let i=0; i<sections.length; i++) {
				let id = sections[i].id;
				if(this.getPageNumber()<(this.elementPageNumber(id)+this._startPage)) {
					if(this.getPageNumber()===(this.elementPageNumber(sections[i-1].id)+this._startPage)) {
						title = "";
					} else {
						title = sections[i-1].getAttribute('data-wb-title') ? sections[i-1].getAttribute('data-wb-title') : sections[i-1].title;
					}
					break;
				}
			}
		} else {//non nested sections
			if(this.getPageNumber()==1) {
				title = "";
			} else {
				if(!section.className.match(/wb-no-title/)) {
					title = section.getAttribute('data-wb-title') ? section.getAttribute('data-wb-title') : section.title;
				} else {
					title = "";
				}
			}
		}
		
		return title;
	}
	
	getTocs() {
		if(this._tocs.length===0) { return; }
		
		
			let toc = this._tocs[0];
			if(toc.getAttribute('data-wb-toc')) {
				let tocTitle = document.createElement('p');
				tocTitle.setAttribute('class','wb-toc-title');
				tocTitle.innerHTML = toc.getAttribute('data-wb-toc');
				toc.appendChild(tocTitle);
			}
			let content = document.createElement('div');
			let list = document.createElement('ul');
			list.setAttribute('class','wb-toc-list');
			for(let i=0; i<this._tocSections.length; i++) {
				let section = this._tocSections[i];
				let item = document.createElement('li');
				item.setAttribute('class','wb-toc-item');
				let link = document.createElement('a');
				link.setAttribute('href', '#' + section.id);
				link.setAttribute('class', 'wb-link');
				item.appendChild(link);
				let title = document.createElement('span');
				if(section.getAttribute('data-wb-class')) {
					title.setAttribute('class','wb-toc-item-title ' + section.getAttribute('data-wb-class'));
				} else {
					title.setAttribute('class','wb-toc-item-title');
				}
				title.innerHTML = section.getAttribute('data-wb-title-toc') ? section.getAttribute('data-wb-title-toc') : section.title;
				link.appendChild(title);
				if(!section.className.match(/wb-toc-no-page-number/)) {
					let page = document.createElement('span');
					page.setAttribute('class','wb-toc-item-page-number');	
					page.setAttribute('data-wb-element-page-number', section.id);
					link.appendChild(page);
				}
				list.appendChild(item);
				
			}
			content.appendChild(list);
			toc.appendChild(content);
		
			if(this._tocs[1]) {
				for(let j=1; j<this._tocs.length; j++) {
					if(this._tocs[j].getAttribute('data-wb-toc')) {
						let tocTitle = document.createElement('p');
						tocTitle.setAttribute('class','wb-toc-title');
						tocTitle.innerHTML = this._tocs[j].getAttribute('data-wb-toc');
						this._tocs[j].appendChild(tocTitle);
					}
					this._tocs[j].appendChild(content.cloneNode(true));
				}
			}
	}
	
	getTocsCurrentSection() {
		let currentSection;
		let section = this._text.querySelectorAll('.wb-section')[0];
		if(section.querySelectorAll('.wb-section').length!==0) {//nested sections
			let sects = this._text.querySelectorAll('[data-wb-active-section]');
			let sections = [].slice.call(sects);
			sections.push(this._lastElement);
			for(let i=0; i<sections.length; i++) {
				let id = sections[i].id;
				if(this.getPageNumber()<(this.elementPageNumber(id)+this._startPage)) {
					currentSection = sections[i-1];
					break;
				}
			}
		} else {//non-nested sections
			currentSection = section;
		}
		
		if(currentSection) {
			for(let i=0; i<this._tocs.length; i++) {
				let toc = this._tocs[i];
				let links = toc.querySelectorAll('a');
				for(let j=0; j<links.length; j++) {
					let id = currentSection.getAttribute('data-wb-active-section') ? currentSection.getAttribute('data-wb-active-section') : currentSection.id;
					if(links[j].getAttribute('href').replace(/^#/,'')===id) {
						if(!links[j].parentElement.className.match(/current/)) {
							links[j].parentElement.className+=' current';
						}
					} else if(links[j].parentElement.className.match(/current/)) {
						links[j].parentElement.className = links[i].parentElement.className.replace(/ current/,'');
					}
				}
			}
		}
	}

	insertBookmark() {
		let currentSection = this._text.querySelectorAll('.wb-section')[0];
		if(currentSection) {
			let elements = currentSection.querySelectorAll(':not(.wb-section)');
			let position = Math.abs(this._position);
			let elPosition;
			for(let i=0; i<elements.length; i++) {
				let elPosition = this.getElementPosition(elements[i]);
				if(elPosition===position) {
					if(currentSection.id==='wb-last') {
						this._bookmark = { sectionId: currentSection.id, el: elements.length-1 };
						break;
					}
					this._bookmark = { sectionId: currentSection.id, el: i };
					break;
				} else if(elPosition > position) {
					this._bookmark = { sectionId: currentSection.id, el: i-1 };
					break;
				}
			}
		}
	}
	
	goToBookmark(bookmark) {	
		for(let i=0; i<this._sections.length; i++) {
			if(this._sections[i].id===bookmark.sectionId) {
				//if(i===0) { 
					//this._position = Math.round($(this._text).position().left);
					//return; 
				//}
				this._sectionsIndex = i;
				this.emptyNode(this._text);
				this._text.appendChild(this._sections[this._sectionsIndex].cloneNode(true));
				this._text.appendChild(this._lastElement.cloneNode(true));
				this.setSectionLinks();
				this.toBook();
				let currentSection = this._text.querySelectorAll('.wb-section')[0];
				let elements = currentSection.querySelectorAll(':not(.wb-section)');
				let element = elements[bookmark.el];
				//position : offsetLeft of element relative to text
				let position = this.getElementPosition(element);
				//text position = -position
				this._text.style.left = -position + "px";
				this._position = Math.round($(this._text).position().left);
				this.refresh();
				break;
			}
		}
	}
	
	getBookmark() {
		return this._bookmark;
	}
	
	setBookmark(bookmark) {
		this._bookmark = bookmark;
	}
	
	getCover() {
		if(this._sectionsIndex===0 && this.getPageNumber()==1) {
			if(!this._text.className.match(/cover/)) {
				this._text.className+=' cover_active';
			}
		} else {
			if(this._text.className.match(/cover/)) {
				this._text.className = this._text.className.replace(/ cover/,'');
			}
		}
	}

	refresh() {
		this.insertBookmark();
		this.getCover();

		if(this.col===false) {
			
			for(let i=0; i<this._currentPages.length; i++) {
				this._currentPages[i].innerHTML = "";
			}

			for(let i=0; i<this._currentTotalPages.length; i++) {
				this._currentTotalPages[i].innerHTML = "";
			}		

			for(let i=0; i<this._sectionTitles.length; i++) {
				this._sectionTitles[i].innerHTML = "";
			}
			
		} else {
			
			if(this._tocs.length!==0) {
				this.getTocsCurrentSection();
			}	
			//containers wb-current-page
			for(let i=0; i<this._currentPages.length; i++) {
				let pageNumber = this._sections_page_start[this._sectionsIndex].page_start + this.getPageNumber()-1;
				if(pageNumber < 1) {
					this._currentPages[i].innerHTML = "";
				} else if(this._currentPages[i].innerHTML!==pageNumber) {
					this._currentPages[i].innerHTML = pageNumber;
				}
			}
			//containers wbcurrentByTotal-pages
			for(let i=0; i<this._currentTotalPages.length; i++) {
				let section = this._text.querySelectorAll('.wb-section')[0];
				let pageNumber = this._sections_page_start[this._sectionsIndex].page_start + this.getPageNumber()-1;
				if(pageNumber < 1 || section.className.match(/wb-page-no-display/)) {
					this._currentTotalPages[i].innerHTML = "";
				} else if(this._currentTotalPages[i].innerHTML!== pageNumber + "/" + this.pages_total) {
					this._currentTotalPages[i].innerHTML = pageNumber + "/" + this.pages_total;
				}
			}
			//containers wb-current-section-title
			for(let i=0; i<this._sectionTitles.length; i++) {
				if(this._sectionTitles[i].innerHTML!=this.getSectionTitle()) {
					this._sectionTitles[i].innerHTML = this.getSectionTitle();
				}
			}

		}
	}
}
