import utils from '../../services/utils';
import dataStore from '../../services/dataStore';
//home.js
const adminLogin = function() {
	'use strict';
	//rootElement
	const root = document.querySelector('#adminLogin');
	//form
	const form = root.querySelector('#adminLoginForm');
	const inputs = form.querySelectorAll('input');
	
	//clear errors on input
	function onInput(event) {
		utils.setHTML('#form-error', "");
		if(event.target.name === 'email') {
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
		utils.setHTML('#form-error', "");
		utils.setHTML('#email .error', "");
		utils.setHTML('#password .error', "");
		let user = {};
		user.email = form.querySelector('[name=email]').value;
		user.password = form.querySelector('[name=password]').value;
		let options = { method: 'POST', url: '/users/login', data: JSON.stringify(user) };
		utils.ajax(options)
		.then( res => {
			let response = JSON.parse(res);
			if(response.errors) {
				utils.setHTML('#form-error', response.errors.form);
				utils.setHTML('#email .error', response.errors.email);
				utils.setHTML('#password .error', response.errors.password);
			} else {
				dataStore.setData('currentUser', response.user);
				if(response.user.admin===true) {
					utils.addClass('#admin-link', 'visible');
					location.hash = '#/admin/';
				} else {
					utils.setHTML('#form-error', "Vous n'avez pas le droit d'accéder à l'espace administration.");
				}
			}
		});
	}
	
	form.addEventListener('submit', onSubmit, false);
	
	
};

export default adminLogin;

