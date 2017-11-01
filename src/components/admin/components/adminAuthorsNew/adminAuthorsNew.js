import utils from '../../../../services/utils';
import dataStore from '../../../../services/dataStore';
//home.js
const adminAuthorsNew = function(data) {
	'use strict';
	//rootElement
	const root = document.querySelector('#adminAuthorsNew');
	//modal
	const modal = root.querySelector('#modal');
	let searchInput = modal.querySelector('input');
	let results = modal.querySelector('#results');
	let selectedBooks = [];
	let booksContainer = root.querySelector('#booksContainer');
	//form
	const form = root.querySelector('#adminAuthorsNewForm');
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
	
	//search modal
	let openModalBtn = root.querySelector('#open-modal-btn');
	openModalBtn.addEventListener('click', (event) => {
		event.preventDefault();
		modal.style.display = 'block';
	}, false);
	
	let closeModalBtn = modal.querySelector('#close-modal-btn');
	closeModalBtn.addEventListener('click', () => {
		modal.style.display = 'none';
		searchInput.value = '';
		results.innerHTML = '';
	}, false);
	
	function onkeyup(event) {
		let string = event.target.value;
		if(!string) {
			results.innerHTML = '';
			return;
		}
		let options = { method: "GET", url: '/books/search?q=' + string }
		utils.ajax(options)
		.then (res => {
			let response = JSON.parse(res);
			if(response.error) {
				utils.bind(modal,response,'error');
			} else {
				results.innerHTML = '';
				let p = '<p id={{ id }}><span>{{ title }} ({{ author }})</span>' + 
						'<span><button type="button" class="add-btn w3-button w3-display-right">Ajouter</button></span></p>';
				let li = document.createElement('LI');
				li.className = 'w3-display-container';
				li.setAttribute('data-utils-repeat', p);
				results.appendChild(li);
				utils.repeat(modal,response.books);
				
				let addBtns = modal.querySelectorAll('.add-btn')
				for(let i=0; i<addBtns.length; i++) {
					addBtns[i].addEventListener('click',addBooks,false);
				}
				
			}
		})
		.catch( err => {
			console.log(err);
		})
	}
	
	searchInput.addEventListener('keyup',onkeyup,false);
	
	//remove books
	function removeBooks(event) {
		let id = event.target.parentElement.parentElement.id;
		console.log(id);
	}
	
	//add books
	function addBooks(event) {
		let id = event.target.parentElement.parentElement.id;
		console.log(id);
		selectedBooks.push(id);
		let name = event.target.parentElement.parentElement.firstElementChild.innerHTML;
		console.log(name);
		let p = document.createElement('P');
		p.id = id;
		let spanA = document.createElement('SPAN');
		spanA.innerHTML = name;
		let spanB = document.createElement('SPAN');
		let button = document.createElement('BUTTON');
		button.className = "remove-btn w3-button w3-display-right";
		button.setAttribute('type', 'button');
		button.innerHTML = 'Supprimer';
		button.addEventListener('click',removeBooks,false);
		spanB.appendChild(button);
		p.appendChild(spanA)
		p.appendChild(spanB);
		let li = document.createElement('LI');
		li.className = 'w3-display-container';
		li.appendChild(p);
		booksContainer.appendChild(li);
		modal.style.display = 'none';		
	}
	
	
	
};

export default adminAuthorsNew;

