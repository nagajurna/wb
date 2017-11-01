import utils from '../../../../services/utils';
//home.js
const adminUser = function() {
	'use strict';
	let root = document.querySelector('#adminUser');
	let modal = root.querySelector('#modal');
	let div = root.querySelector('#user');
	let id = location.hash.replace(/^#\/admin\/users\//,'');
	
	//ajax get user
	let options = { method: 'GET', url: '/users/' + id };
	utils.ajax(options)
	.then( res => {
		let response = JSON.parse(res);
		if(response.error) {
			utils.bind(div, response, 'error');
		} else { 
			let user = response.user;
			utils.bind(root, user);
		}
		
	});
	
	let deleteUser = (event) => {
		let options = { method: 'DELETE', url: '/users/' + id };
		utils.ajax(options)
		.then( res => {
			let response = JSON.parse(res);
			if(response.error) {
				utils.bind(div, response, 'error');
				modal.style.display = 'none';
			} else {
				location.hash = '#/admin/users/';
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
	deleteBtn.addEventListener('click', deleteUser, false);
	
};

export default adminUser;

