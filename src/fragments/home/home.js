//home.js
const home = function() {
	'use strict';
	//rootElement
	const root = document.querySelector("#home.content");
	//get books
	let options = { method: 'GET', url: '/books/' };
	utils.ajax(options)
	.then( response => {
		let books = JSON.parse(response);
		utils.repeat(books);
	});
	
};

