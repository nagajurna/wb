import utils from '../../../../services/utils';
let adminBooksTemplate = require('./adminBooks.ejs');
//home.js
const adminBooks = function(container) {
	'use strict';
	
	let adminContainer = container;
		
	//ajax get books
	let options = { method: 'GET', url: '/books/' };
	utils.ajax(options)
	.then( res => {
		let response = JSON.parse(res);
		if(response.error) {
			//insert template in container
			adminContainer.innerHTML = adminBooksTemplate({ books: [], error: response.error });
		} else {
			//insert template in container
			adminContainer.innerHTML = adminBooksTemplate({ books: response.books, error: '' });
		}
	})
	
};

export default adminBooks;

