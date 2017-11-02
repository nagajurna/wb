import utils from '../../../../services/utils';
let adminEditTemplate = require('./adminEdit.ejs');
//home.js
const adminEdit = function(container,user) {
	'use strict';
	
	let adminContainer = container;
	
	//insert template in container
	adminContainer.innerHTML = adminEditTemplate();
	
	//rootElement
	const root = document.querySelector('#adminEdit');
	//form
	const form = root.querySelector('#adminEditForm');
	const inputs = form.querySelectorAll('input');
	let data = user;
	form.querySelector('[name=name]').value = data.name;
	form.querySelector('[name=email]').value = data.email;
	
	//clear errors on input
	function onInput(event) {
		utils.setHTML('#form-error', "");
		if(event.target.name === 'name') {
			utils.setHTML('#name .error', "");
		} else if(event.target.name === 'email') {
			utils.setHTML('#email .error', "");
		} else if(event.target.name === 'password') {
			utils.setHTML('#password .error', "");
		}
	}
	
	for(let i=0; i<inputs.length; i++) {
		inputs[i].addEventListener('input', onInput, false);
	}
	
	//submit
	function onSubmit(event) {
		event.preventDefault();
		utils.bind(form, {});
		let user = {};
		user.name = form.querySelector('[name=name]').value;
		user.email = form.querySelector('[name=email]').value;
		user.password = form.querySelector('[name=password]').value;
		let options = { method: 'PUT', url: '/users/' + data.id, data: JSON.stringify(user) };
		utils.ajax(options)
		.then( res => {
			let response = JSON.parse(res);
			if(response.errors) {
				utils.bind(form, response.errors);
			} else {
				location.hash = '#/admin/';
			}
		});
	}
	
	form.addEventListener('submit', onSubmit, false);
};

export default adminEdit;

