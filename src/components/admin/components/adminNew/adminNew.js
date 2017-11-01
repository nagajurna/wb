import utils from '../../../../services/utils';
import dataStore from '../../../../services/dataStore';
//home.js
const adminNew = function(data) {
	'use strict';
	//rootElement
	const root = document.querySelector('#adminNew');
	//form
	const form = root.querySelector('#adminRegisterForm');
	const inputs = form.querySelectorAll('input');
	
	//clear errors on input
	function onInput(event) {
		utils.setHTML('#form-error', "");
		if(event.target.name === 'name') {
			utils.setHTML('#name .error', "");
		} else if(event.target.name === 'email') {
			utils.setHTML('#email .error', "");
		} else if(event.target.name === 'password') {
			utils.setHTML('#password .error', "");
		} else if(event.target.name === 'password_confirm') {
			utils.setHTML('#password_confirm .error', "");
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
		user.password_confirm = form.querySelector('[name=password_confirm]').value;
		let options = { method: 'POST', url: '/users/admin/new', data: JSON.stringify(user) };
		utils.ajax(options)
		.then( res => {
			let response = JSON.parse(res);
			if(response.errors) {
				utils.bind(form, response.errors);
			} else {
				location.hash = '#/admin/users/';
			}
		});
	}
	
	form.addEventListener('submit', onSubmit, false);
	
};

export default adminNew;

