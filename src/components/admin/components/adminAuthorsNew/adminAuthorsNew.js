import utils from '../../../../services/utils';
import dataStore from '../../../../services/dataStore';
let adminAuthorsNewTemplate = require('./adminAuthorsNew.ejs');
//home.js
const adminAuthorsNew = function(container) {
	'use strict';
	
	let c = container;
	
	//insert template in container
	c.innerHTML = adminAuthorsNewTemplate();
	
	//rootElement
	const root = document.querySelector('#adminAuthorsNew');
	//form
	const form = root.querySelector('#adminAuthorsNewForm');
	const inputs = form.querySelectorAll('input');
	
	//clear errors on input
	function onInput(event) {
		utils.setHTML('#form-error', "");
		if(event.target.name === 'name') {
			utils.setHTML('#name .error', "");
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
		let author = {};
		author.name = form.querySelector('[name=name]').value;
		author.nameAlpha = form.querySelector('[name=nameAlpha]').value;
		author.birth = form.querySelector('[name=birth]').value;
		author.death = form.querySelector('[name=death]').value;
		author.description = form.querySelector('[name=description]').value;
		author.visible = form.querySelector('[name=visible]').checked ? true : false;
		let options = { method: 'POST', url: '/authors/', data: JSON.stringify(author) };
		utils.ajax(options)
		.then( res => {
			let response = JSON.parse(res);
			if(response.errors) {
				utils.bind(form, response.errors);
			} else {
				dataStore.pushData('authors', response.author);
				location.hash = '#/admin/authors/';
			}
		});
	}
	
	form.addEventListener('submit', onSubmit, false);
};

export default adminAuthorsNew;

