import utils from '../../../../services/utils';
let adminAuthorEditTemplate = require('./adminAuthorEdit.ejs');
//home.js
const adminAuthorEdit = function(container) {
	'use strict';
	
	let id = location.hash.replace(/(#\/admin\/authors\/|\/edit)/g,'');
	let adminContainer = container;
	
	//AJAX
	let options = { method: 'GET', url: '/authors/' + id };
	utils.ajax(options)
	.then( res => {
		let response = JSON.parse(res);
		if(response.error) {
			//insert template in container
			console.log(error);
		} else {
			//insert template in container
			adminContainer.innerHTML = adminAuthorEditTemplate({ author: response.author });
			
			//rootElement
			const root = document.querySelector('#adminAuthorEdit');
			//form
			const form = root.querySelector('#adminAuthorEditForm');
			const inputs = form.querySelectorAll('input');
			
			utils.bind(form, response.author, 'author');
			
			//clear errors on input
			function onInput(event) {
				utils.setHTML('#form-error', "");
				if(event.target.name === 'name') {
					utils.setHTML('#name .error', "");
				} else if(event.target.name === 'firstName') {
					utils.setHTML('#firstName .error', "");
				} else if(event.target.name === 'nameAlpha') {
					utils.setHTML('#nameAlpha .error', "");
				} else if(event.target.name === 'birth') {
					utils.setHTML('#birth .error', "");
				} else if(event.target.name === 'death') {
					utils.setHTML('#death .error', "");
				}
			}
			
			for(let i=0; i<inputs.length; i++) {
				inputs[i].addEventListener('input', onInput, false);
			}
			
			//submit
			function onSubmit(event) {
				event.preventDefault();
				utils.bind(form, {}, 'error');
				let user = {};
				user.name = form.querySelector('[name=name]').value;
				user.firstName = form.querySelector('[name=firstName]').value;
				user.nameAlpha = form.querySelector('[name=nameAlpha]').value;
				user.birth = form.querySelector('[name=birth]').value;
				user.death = form.querySelector('[name=death]').value;
				user.description = form.querySelector('[name=description]').value;
				let options = { method: 'PUT', url: '/authors/' + id, data: JSON.stringify(user) };
				utils.ajax(options)
				.then( res => {
					let response = JSON.parse(res);
					if(response.errors) {
						utils.bind(form, response.errors, 'error');
					} else {
						location.hash = '#/admin/authors/' + id;
					}
				});
			}
	
			form.addEventListener('submit', onSubmit, false);
			
		}
	});
};

export default adminAuthorEdit;

