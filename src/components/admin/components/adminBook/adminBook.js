import utils from '../../../../services/utils';
let adminBookTemplate = require('./adminBook.ejs');
//home.js
const adminBook = function(container) {
	'use strict';
		
	let id = location.hash.replace(/^#\/admin\/books\//,'');
	let adminContainer = container;
	
	//ajax get book
	let options = { method: 'GET', url: '/books/' + id };
	utils.ajax(options)
	.then( res => {
		let response = JSON.parse(res);
		if(response.error) {
			//insert template in container
			adminContainer.innerHTML = adminBookTemplate({ book: {}, error: response.error });
		} else {
			//insert template in container
			adminContainer.innerHTML = adminBookTemplate({ book: response.book, error: '' });
		
			let root = document.querySelector('#adminBook');
			let div = root.querySelector('#book');
		}
	});
}

export default adminBook;

