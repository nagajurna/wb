import utils from '../../../../services/utils';
let adminEditPasswordTemplate = require('./adminEditPassword.ejs');
//home.js
const adminEditPassword = function(container, user) {
	'use strict';
	
	let adminContainer = container;
	let data = user;
	
	//insert template in container
	adminContainer.innerHTML = adminEditPasswordTemplate();
	
	//rootElement
	const root = document.querySelector('#adminEditPassword');
	//form
	const form = root.querySelector('#adminEditPasswordForm');
	const inputs = form.querySelectorAll('input');
	
	//clear errors on input
	function onInput(event) {
		utils.setHTML('#form-error', "");
		if(event.target.name === 'password') {
			utils.setHTML('#password .error', "");
		} else if(event.target.name === 'password_new') {
			utils.setHTML('#password_new .error', "");
		} else if(event.target.name === 'password_new_confirm') {
			utils.setHTML('#password_new_confirm .error', "");
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
		user.password = form.querySelector('[name=password]').value;
		user.password_new = form.querySelector('[name=password_new]').value;
		user.password_new_confirm = form.querySelector('[name=password_new_confirm]').value;
		let options = { method: 'PUT', url: '/users/password/' + data.id, data: JSON.stringify(user) };
		utils.ajax(options)
		.then( res => {
			let response = JSON.parse(res);
			if(response.errors) {
				utils.bind(form, response.errors);
			} else {
				form.querySelector('[name=password]').value = "";
				form.querySelector('[name=password_new]').value = "";
				form.querySelector('[name=password_new_confirm]').value = "";
				utils.bind(form, { message: 'Votre mot de passe a été changé.'});
				utils.addClass('#form-error','hidden');
				utils.removeClass('#form-succes','hidden');
			}
		});
	}
	
	form.addEventListener('submit', onSubmit, false);
	
};

export default adminEditPassword;

