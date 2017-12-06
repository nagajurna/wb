//utils.js
const utils = {
	//AJAX requests
	ajax: options => {
		'use strict';
		let promise = new Promise( (resolve,reject) => {
			let method = options.method;
			let url = options.url;
			let data = options.data;
			let xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = () => {
				if(xmlhttp.readyState===4) {
					if(xmlhttp.status===200) {
						resolve(xmlhttp.responseText);
					} else {
						reject(Error(xmlhttp.statusText));
					}
				}
			}
			
			xmlhttp.open(method,url,true);
			xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			xmlhttp.setRequestHeader("Accept", "text/json, text/html");
			//xmlhttp.setRequestHeader("Cache-Control", "public, max-age=86400, must-revalidate");//1 day = 86400s
						
			if(data) {
				xmlhttp.setRequestHeader("Content-type", "application/json");
				xmlhttp.send(data);
			} else {
				xmlhttp.send();
			}
		});
		
		return promise;
	},
	
	//check role admin			
	checkRole: () => {
		'use strict';
		let options = {method: 'GET', url: '/users/currentuser' }
		return utils.ajax(options).then( response => {
			let user = JSON.parse(response).user;
			return new Promise( (resolve, reject) => {
				if(user && user.admin===true) {
					resolve(user);
				} else {
					reject(Error('error'));
				}
			});
		});
	},
		
	//active link : change class
	activeLink: () => {
		'use strict';
		//index (nav-bar-top) links
		let root = document.querySelector("#navigation");
		let links = root.querySelectorAll("a");
		for(let i=0; i<links.length; i++) {
			
			if(links[i].id==='home-link' || links[i].id==='menu-home-link') {
				if(location.href.match(/#\/[^\/]+\/read$/)) {
					utils.addClass("#" + links[i].id, "w3-text-gray");
					utils.removeClass("#" + links[i].id, "w3-text-black");
				} else {
					utils.addClass("#" + links[i].id, "w3-text-black");
					utils.removeClass("#" + links[i].id, "w3-text-gray");
				}
				
			} else if(links[i].id==='last-link' || links[i].id==='menu-last-link') {
				if(location.hash==='' || location.hash==='#/') {
					utils.addClass("#" + links[i].id, "w3-text-black");
					utils.removeClass("#" + links[i].id, "w3-text-gray");
				} else {
					utils.addClass("#" + links[i].id, "w3-text-gray");
					utils.removeClass("#" + links[i].id, "w3-text-black");
				}
				
			} else if(links[i].id==='authors-link' || links[i].id==='menu-authors-link') {
				if(location.hash.match(/#\/authors/)) {
					utils.addClass("#" + links[i].id, "w3-text-black");
					utils.removeClass("#" + links[i].id, "w3-text-gray");
				} else {
					utils.addClass("#" + links[i].id, "w3-text-gray");
					utils.removeClass("#" + links[i].id, "w3-text-black");
				}
				
			} else {
			
				if(location.href===links[i].href) {
					utils.addClass("#" + links[i].id, "w3-text-black");
					utils.removeClass("#" + links[i].id, "w3-text-gray");
				} else {
					utils.addClass("#" + links[i].id, "w3-text-gray");
					utils.removeClass("#" + links[i].id, "w3-text-black");
				}
				
				//admin-link
				if(location.hash.match(/#\/admin/)) {
					if(links[i].href.match(/#\/admin/)) {
						utils.addClass("#" + links[i].id, "w3-text-black");
						utils.removeClass("#" + links[i].id, "w3-text-gray");
					} else {
						utils.addClass("#" + links[i].id, "w3-text-gray");
						utils.removeClass("#" + links[i].id, "w3-text-black");
					}
				}
			}
		}
		
		//admin (admin-nav-bar-top) links
		if(!document.querySelector("#admin-nav-bar-top")) { return; }
		let adminRoot = document.querySelector("#admin-nav-bar-top");
		let adminLinks = adminRoot.querySelectorAll("a");
		for(let i=0; i<adminLinks.length; i++) {
			if(location.href===adminLinks[i].href) {
				utils.addClass("#" + adminLinks[i].id, "w3-text-black");
				utils.removeClass("#" + adminLinks[i].id, "w3-text-gray");
			} else {
				utils.addClass("#" + adminLinks[i].id, "w3-text-gray");
				utils.removeClass("#" + adminLinks[i].id, "w3-text-black");
			}
			
			//admin-books
			if(location.hash.match(/#\/admin\/books\//)) {
				if(adminLinks[i].href.match(/#\/admin\/books\//)) {
					utils.addClass("#" + adminLinks[i].id, "w3-text-black");
					utils.removeClass("#" + adminLinks[i].id, "w3-text-gray");
				} else {
					utils.addClass("#" + adminLinks[i].id, "w3-text-gray");
					utils.removeClass("#" + adminLinks[i].id, "w3-text-black");
				}
				
			//admin-authors	
			} else if(location.hash.match(/#\/admin\/authors\//)) {
				if(adminLinks[i].href.match(/#\/admin\/authors\//)) {
					utils.addClass("#" + adminLinks[i].id, "w3-text-black");
					utils.removeClass("#" + adminLinks[i].id, "w3-text-gray");
				} else {
					utils.addClass("#" + adminLinks[i].id, "w3-text-gray");
					utils.removeClass("#" + adminLinks[i].id, "w3-text-black");
				}
			//admin-users	
			} else if(location.hash.match(/#\/admin\/users\//)) {
				if(adminLinks[i].href.match(/#\/admin\/users\//)) {
					utils.addClass("#" + adminLinks[i].id, "w3-text-black");
					utils.removeClass("#" + adminLinks[i].id, "w3-text-gray");
				} else {
					utils.addClass("#" + adminLinks[i].id, "w3-text-gray");
					utils.removeClass("#" + adminLinks[i].id, "w3-text-black");
				}
			//admin-home	
			} else if(location.hash.match(/#\/admin\/.+/)) {
				if(adminLinks[i].hash==='#/admin/') {
					utils.addClass("#" + adminLinks[i].id, "w3-text-black");
					utils.removeClass("#" + adminLinks[i].id, "w3-text-gray");
				} else {
					utils.addClass("#" + adminLinks[i].id, "w3-text-gray");
					utils.removeClass("#" + adminLinks[i].id, "w3-text-black");
				}
			}
			
		}
		
		
	},
	
	setHTML: (selector,content) => {
		let elements = document.querySelectorAll(selector);
		if(!elements) { return; }
		for(let i=0; i< elements.length; i++) {
			if(content) {
				elements[i].innerHTML = content;
			} else {
				elements[i].innerHTML = '';
			}
		}
	},
	
	bind: (container, object, className) => {
		let elements;
		if(className) {
			elements = container.querySelectorAll('[data-utils-bind].' + className);
		} else {
			elements = container.querySelectorAll('[data-utils-bind]');
		}
		//get template and props for each repeat element
		for(let i=0; i< elements.length; i++) {
			let brackets = [];
			let props = [];
			let content = elements[i].getAttribute('data-utils-bind');
			let newContent = '';
			
			if(content.match(/{{[^{]+}}/g)) {
				brackets = content.match(/{{[^{]+}}/g);
			}
			
			//replace each bracket of element
			for(let j=0; j<brackets.length; j++) {
				let prop = brackets[j].replace(/({|})/g,'').trim();
				props.push(prop);
				let pattern = new RegExp(brackets[j], 'g');
				if(object[prop]) {
					newContent = content.replace(pattern,object[prop]);
					content = newContent;
				} else {
					newContent = content.replace(pattern,'');
					content = newContent;
				}
			}
			
			if(elements[i].nodeName==='INPUT' || elements[i].nodeName==='TEXTAREA') {
				elements[i].value = content;
			} else {
				elements[i].innerHTML = content;
			}
		}
	},
	
	addClass: (selector, className) => {
		let elements = [];
		if(selector.nodeName) {
			elements.push(selector);
		} else {
			elements = document.querySelectorAll(selector);
		}
		let name, array
		for(let i=0; i< elements.length; i++) {
			name = className;
			array = elements[i].className.split(" ");
			if (array.indexOf(name) == -1) {
				elements[i].className += " " + className;
			}
		}
	},
	
	removeClass: (selector, className) => {
		let elements = [];
		if(selector.nodeName) {
			elements.push(selector);
		} else {
			elements = document.querySelectorAll(selector);
		}
		let name;
		for(let i=0; i< elements.length; i++) {
			name = className;
			let pattern = new RegExp(className, 'g');
			elements[i].className = elements[i].className.replace(pattern, "");
		}
	}
}

export default utils;
