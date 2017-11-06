import utils from '../../../../services/utils';
let adminBookTemplate = require('./adminBook.ejs');
//home.js
const adminBook = function(container) {
	'use strict';
		
	let id = location.hash.replace(/^#\/admin\/books\//,'');
	let c = container;
	
	//ajax get book
	let options = { method: 'GET', url: '/books/' + id };
	utils.ajax(options)
	.then( res => {
		let response = JSON.parse(res);
		if(response.error) {
			//insert template in container
			c.innerHTML = adminBookTemplate({ book: {}, error: response.error });
		} else {
			//insert template in container
			c.innerHTML = adminBookTemplate({ book: response.book, error: '' });
		
			let root = document.querySelector('#adminBook');
			let modal = root.querySelector('#modal');
			let div = root.querySelector('#book');
			
			let openModalBtn = div.querySelector('#open-modal-btn');
			openModalBtn.addEventListener('click', () => {
				modal.style.display = 'block';
			}, false);
			
			let closeModalBtn = modal.querySelector('#close-modal-btn');
			closeModalBtn.addEventListener('click', () => {
				modal.style.display = 'none';
			}, false);
			
			let deleteBook = event => {
				let options = { method: 'DELETE', url: '/books/' + id };
				utils.ajax(options)
				.then( res => {
					let response = JSON.parse(res);
					if(response.error) {
						utils.bind(div, response, 'error');
						modal.style.display = 'none';
					} else {
						location.hash = '#/admin/books/';
					}
				})
			}
			
			let deleteBtn = modal.querySelector('#delete-btn');
			deleteBtn.addEventListener('click', deleteBook, false);
		}
	});
}

export default adminBook;

