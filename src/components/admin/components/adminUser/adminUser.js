import utils from '../../../../services/utils';
let adminUserTemplate = require('./adminUser.ejs');
//home.js
const adminUser = function(container) {
	'use strict';
	let id = location.hash.replace(/^#\/admin\/users\//,'');
	//ajax get user
	let options = { method: 'GET', url: '/users/' + id };
	utils.ajax(options)
	.then( res => {
		let response = JSON.parse(res);
		if(response.error) {
			//insert template in container
			container.innerHTML = "";
			container.innerHTML = adminUserTemplate({ user: {}, error: response.error });
		} else { 
			//insert template in container
			container.innerHTML = "";
			container.innerHTML = adminUserTemplate({ user: response.user, error: '' });
			
			let root = document.querySelector('#adminUser');
			let modal = root.querySelector('#modal');
			let div = root.querySelector('#user');		
			
			//Open modal
			let openModalBtn = div.querySelector('#open-modal-btn');
			openModalBtn.addEventListener('click', () => {
				modal.style.display = 'block';
			}, false);
			
			//Close modal
			let closeModalBtn = modal.querySelector('#close-modal-btn');
			closeModalBtn.addEventListener('click', () => {
				modal.style.display = 'none';
			}, false);	
			
			//Delete User
			let deleteUser = (event) => {
				let options = { method: 'DELETE', url: '/users/' + id };
				utils.ajax(options)
				.then( res => {
					let response = JSON.parse(res);
					if(response.error) {
						utils.bind(div, response);
						modal.style.display = 'none';
					} else {
						location.hash = '#/admin/users/';
					}
				})
			}
			
			let deleteBtn = modal.querySelector('#delete-btn');
			deleteBtn.addEventListener('click', deleteUser, false);
		}
		
	});
};

export default adminUser;

