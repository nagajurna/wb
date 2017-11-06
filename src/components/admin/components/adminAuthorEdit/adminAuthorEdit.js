import utils from '../../../../services/utils';
let adminAuthorEditTemplate = require('./adminAuthorEdit.ejs');
//home.js
const adminAuthorEdit = function(container) {
	'use strict';
	
	let id = location.hash.replace(/(#\/admin\/authors\/|\/edit)/g,'');
	let c = container;
	
	//AJAX
	let options = { method: 'GET', url: '/authors/' + id };
	utils.ajax(options)
	.then( res => {
		let response = JSON.parse(res);
		if(response.error) {
			console.log(error);
		} else {
			//insert template in container
			c.innerHTML = adminAuthorEditTemplate({ author: response.author });
			
			//rootElement
			const root = document.querySelector('#adminAuthorEdit');
			//form
			const form = root.querySelector('#adminAuthorEditForm');
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
				utils.bind(form, {}, 'error');
				let author = {};
				author.name = form.querySelector('[name=name]').value;
				author.nameAlpha = form.querySelector('[name=nameAlpha]').value;
				author.birth = form.querySelector('[name=birth]').value;
				author.death = form.querySelector('[name=death]').value;
				author.description = form.querySelector('[name=description]').value;
				author.visible = form.querySelector('[name=visible]').checked ? true : false;
				let options = { method: 'PUT', url: '/authors/' + id, data: JSON.stringify(author) };
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

