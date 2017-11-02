import utils from '../../../../services/utils';
let adminAuthorTemplate = require('./adminAuthor.ejs');
//home.js
const adminAuthor = function(container) {
	'use strict';
	
	let id = location.hash.replace(/^#\/admin\/authors\//,'');
	let adminContainer = container;
		
	//ajax get author
	let options = { method: 'GET', url: '/authors/' + id };
	utils.ajax(options)
	.then( res => {
		let response = JSON.parse(res);
		if(response.error) {
			//insert template in container
			adminContainer.innerHTML = adminAuthorTemplate({ author: {}, error: response.error });
		} else {
			//insert template in container
			adminContainer.innerHTML = adminAuthorTemplate({ author: response.author, error: '' });
		
			let root = document.querySelector('#adminAuthor');
			let modal = root.querySelector('#modal');
			let div = root.querySelector('#author');
			
			let openModalBtn = div.querySelector('#open-modal-btn');
			openModalBtn.addEventListener('click', () => {
				modal.style.display = 'block';
			}, false);
			
			let closeModalBtn = modal.querySelector('#close-modal-btn');
			closeModalBtn.addEventListener('click', () => {
				modal.style.display = 'none';
			}, false);
			
			let deleteAuthor = (event) => {
				let options = { method: 'DELETE', url: '/authors/' + id };
				utils.ajax(options)
				.then( res => {
					let response = JSON.parse(res);
					if(response.error) {
						utils.bind(div, response, 'error');
						modal.style.display = 'none';
					} else {
						location.hash = '#/admin/authors/';
					}
				})
			}
			
			let deleteBtn = modal.querySelector('#delete-btn');
			deleteBtn.addEventListener('click', deleteAuthor, false);
		}
	});
	
};

export default adminAuthor;

