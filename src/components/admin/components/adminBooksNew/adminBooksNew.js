import utils from '../../../../services/utils';
import dataStore from '../../../../services/dataStore';
//home.js
const adminBooksNew = function(data) {
	'use strict';
	//rootElement
	const root = document.querySelector('#adminBooksNew');
	//form
	const form = root.querySelector('#adminBooksNewForm');
	const inputs = form.querySelectorAll('input');
	
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
		utils.bind(form, {});
		let user = {};
		user.name = form.querySelector('[name=name]').value;
		user.firstName = form.querySelector('[name=firstName]').value;
		user.nameAlpha = form.querySelector('[name=nameAlpha]').value;
		user.birth = form.querySelector('[name=birth]').value;
		user.death = form.querySelector('[name=death]').value;
		user.description = form.querySelector('[name=description]').value;
		let options = { method: 'POST', url: '/authors/', data: JSON.stringify(user) };
		utils.ajax(options)
		.then( res => {
			let response = JSON.parse(res);
			if(response.errors) {
				utils.bind(form, response.errors);
			} else {
				location.hash = '#/admin/authors/';
			}
		});
	}
	
	form.addEventListener('submit', onSubmit, false);
	
};

export default adminBooksNew;

