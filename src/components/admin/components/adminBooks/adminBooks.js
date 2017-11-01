import utils from '../../../../services/utils';
import dataStore from '../../../../services/dataStore';
//home.js
const adminBooks = function() {
	'use strict';
	let root = document.querySelector('#adminBooks');
	let list = root.querySelector('#books-list');
	
	//ajax get books
	let options = { method: 'GET', url: '/books/' };
	utils.ajax(options)
	.then( response => {
		let books = JSON.parse(response).books;
		utils.repeat(list, books);
		dataStore.setData('books', books);
	})
	
};

export default adminBooks;

