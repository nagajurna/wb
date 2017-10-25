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
		let options = { method: 'GET', url: template }
		return utils.ajax(options).then( response => {
			return new Promise( (resolve) => {
				container.innerHTML = response;
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
				w3.addClass("#" + links[i].id, "w3-text-black");
				w3.removeClass("#" + links[i].id, "w3-text-gray");
			} else {
				w3.addClass("#" + links[i].id, "w3-text-gray");
				w3.removeClass("#" + links[i].id, "w3-text-black");
			}
			
			if(location.hash.match(/#\/admin/)) {
				if(links[i].href.match(/#\/admin/)) {
					links[i].className = "clicked";
				} else {
					links[i].className = ""; 
				}
			}
		}
	},
	
	setHTML: (selector,content) => {
		document.querySelector(selector).innerHTML = content;
	}
}
