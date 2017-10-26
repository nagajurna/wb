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
			xmlhttp.setRequestHeader("Content-type", "application/json");
			if(data) {
				xmlhttp.send(data);
			} else {
				xmlhttp.send();
			}
		});
		
		return promise;
	},
		
	//get HTML fragment, container, controller	
	getFragment: (template, container, controller) => {
		'use strict';
		container.innerHTML = "";
		let options = { method: 'GET', url: template }
		return utils.ajax(options).then( response => {
			return new Promise( (resolve) => {
				let div = document.createElement('div');
				div.innerHTML = response;
				container.appendChild(div);
				resolve(controller);
			});
		});
	},
	
	//active link : change class
	activeLink: () => {
		'use strict';
		let root = document.querySelector("#nav-bar-top");
		let links = root.querySelectorAll("a");
		for(let i=0; i<links.length; i++) {
			if(location.href===links[i].href) {
				utils.addClass("#" + links[i].id, "w3-text-black");
				utils.removeClass("#" + links[i].id, "w3-text-gray");
			} else {
				utils.addClass("#" + links[i].id, "w3-text-gray");
				utils.removeClass("#" + links[i].id, "w3-text-black");
			}
		}
	},
	
	setHTML: (selector,content) => {
		let elements = document.querySelectorAll(selector);
		for(let i=0; i< elements.length; i++) {
			elements[i].innerHTML = content;
		}
	},
	
	repeat: (array) => {
		//replace each prop of array item
		let rpc = (content,brackets,props,item,index) => {
			if(props.length===0) {
				return content;
			}
			let newContent = '';
			for(let i=0; i<props.length; i++) {
				let prop = props[i];
				let bracket = brackets[i];
				let pattern = new RegExp(bracket, "g");
				if(prop==='#item') {
					newContent = content.replace(pattern,item);
				} else if (prop==='#index') {
					newContent = content.replace(pattern,index);
				} else {
					newContent = content.replace(pattern,item[prop]);
				}
				content = newContent;
			}
			return newContent;
		}
		
		//repeat for each item of array
		let rpt = (element,content,array,brackets,props) => {
			
			for(let i=0; i<array.length; i++) {
				let newContent = rpc(content,brackets,props,array[i],i)
				let el = document.createElement(element.nodeName);
				el.innerHTML = newContent;
				element.parentElement.insertBefore(el,element);
			}
			
			//remove element
			element.parentElement.removeChild(element);
		}
		//get template and props for each repeat element
		let elements = document.querySelectorAll('[data-jin-repeat]');
		for(let i=0; i< elements.length; i++) {
			let brackets = [];
			let props = [];
			let content = elements[i].getAttribute('data-jin-repeat');
			
			if(content.match(/{{[^{]+}}/g)) {
				brackets = content.match(/{{[^{]+}}/g);
			}
			
			for(let j=0; j<brackets.length; j++) {
				props.push(brackets[j].replace(/({|})/g,'').trim());
			}
			
			rpt(elements[i],content,array,brackets,props);
			
		}
	},
	
	bind: (object) => {
		let elements = document.querySelectorAll('[data-jin-bind]');
		//get template and props for each repeat element
		for(let i=0; i< elements.length; i++) {
			let brackets = [];
			let props = [];
			let content = elements[i].getAttribute('data-jin-bind');
			let newContent = '';
			
			if(content.match(/{{[^{]+}}/g)) {
				brackets = content.match(/{{[^{]+}}/g);
			}
			//replace each bracket of element
			for(let j=0; j<brackets.length; j++) {
				let prop = brackets[j].replace(/({|})/g,'').trim();
				props.push(prop);
				let pattern = new RegExp(brackets[j], 'g');
				newContent = content.replace(pattern,object[prop]);
				content = newContent;
			}
			
			elements[i].innerHTML = content;
		}
	},
	
	addClass: (selector, className) => {
		let elements = document.querySelectorAll(selector);
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
		let elements = document.querySelectorAll(selector);
		let name;
		for(let i=0; i< elements.length; i++) {
			name = className;
			let pattern = new RegExp(className, 'g');
			elements[i].className = elements[i].className.replace(pattern, "");
		}
	},
		
	hide: (selector) => {
		let elements = document.querySelectorAll(selector);
		for(let i=0; i< elements.length; i++) {
			elements[i].style.display = 'none';
		}
	}
}
