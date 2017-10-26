//home.js
const home = function() {
	'use strict';
	//rootElement
	//let books;
	const root = document.querySelector("#home.content");
	w3.hide("#books-list");
	//get books
	let options = { method: 'GET', url: '/books/' };
	utils.ajax(options)
	.then( response => {
		let books = JSON.parse(response);
		w3.displayObject('books-list', books);
		w3.show("#books-list");
	});

};

