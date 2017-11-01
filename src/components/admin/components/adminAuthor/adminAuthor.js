import utils from '../../../../services/utils';
//home.js
const adminAuthor = function() {
	'use strict';
	let root = document.querySelector('#adminAuthor');
	let modal = root.querySelector('#modal');
	let div = root.querySelector('#author');
	let id = location.hash.replace(/^#\/admin\/authors\//,'');
	
	
	//ajax get user
	let options = { method: 'GET', url: '/authors/' + id };
	utils.ajax(options)
	.then( res => {
		let response = JSON.parse(res);
		if(response.error) {
			utils.bind(div, response, 'error');
		} else {
			let author = response.author;
			utils.bind(root, author);
		}
		
	});
	
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
	
	let openModalBtn = div.querySelector('#open-modal-btn');
	openModalBtn.addEventListener('click', () => {
		modal.style.display = 'block';
	}, false);
	
	let closeModalBtn = modal.querySelector('#close-modal-btn');
	closeModalBtn.addEventListener('click', () => {
		modal.style.display = 'none';
	}, false);
	
	let deleteBtn = modal.querySelector('#delete-btn');
	deleteBtn.addEventListener('click', deleteAuthor, false);
	
	let editBtn = div.querySelector('#edit-btn');
	editBtn.addEventListener('click', () => {
		location.hash = '#/admin/authors/' + id +'/edit';
	}, false)
	
};

export default adminAuthor;

