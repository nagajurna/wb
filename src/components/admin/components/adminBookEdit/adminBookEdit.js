import utils from '../../../../services/utils';
import dataStore from '../../../../services/dataStore';
let adminBookEditTemplate = require('./adminBookEdit.ejs');
let modalHeaderTemplate = require('./modalHeader.ejs');
let searchAuthorsResultsTemplate = require('./searchAuthorsResults.ejs');
let selectedAuthorsTemplate = require('./selectedAuthors.ejs');
let selectedContribsTemplate = require('./selectedContribs.ejs');
let selectedContribRoleTemplate = require('./selectedContribRole.ejs');
//home.js
const adminBooksNew = function(container) {
	'use strict';
	
	let id = location.hash.replace(/(#\/admin\/books\/|\/edit)/g,'');
	let c = container;
	
	let options = { method: 'GET', url: '/books/' + id };
	utils.ajax(options)
	.then( res => {
		let response = JSON.parse(res);
		if(response.error) {
			console.log(response.error);
		} else {
			let book = response.book;
			//SCOPE VARIABLES
			let authType = '';
			let json = "";//search : string json to compare with response
			let selectedAuthorsDisplay = [], selectedAuthors = [];
			let selectedContribsDisplay = [], selectedContribs = [];
			//init authors
			for(let i=0; i<book.authors.length; i++) {
				selectedAuthors.push(book.authors[i].id);
				selectedAuthorsDisplay.push(book.authors[i]);
			}
			//init contribs
			for(let i=0; i<book.contribs.length; i++) {
				selectedContribs.push(book.contribs[i]);
				selectedContribsDisplay.push(book.contribs[i]);
			}
			//insert template in container
			c.innerHTML = adminBookEditTemplate({ book: book, selectedAuthors: selectedAuthorsDisplay, selectedContribs: selectedContribsDisplay });
			//ELEMENTS
			//rootElement
			const root = document.querySelector('#adminBookEdit');
			//form
			const form = root.querySelector('#adminBookEditForm');
			const inputs = form.querySelectorAll('input');
			//modal
			const modal = root.querySelector('#modal');
			let searchInput = modal.querySelector('input');
			let results = modal.querySelector('#results');
			//authors, contribs containers
			let authorsContainer = root.querySelector('#authorsContainer');
			let contribsContainer = root.querySelector('#contribsContainer');
			//attach deleAuth to form
			let deleteBtns = form.querySelectorAll('.delete-btn')
			for(let i=0; i<deleteBtns.length; i++) {
				deleteBtns[i].addEventListener('click', deleteAuth, false);
			} 	
			
			//CLEAR ERRORS ON INPUT
			function onInput(event) {
				utils.setHTML('#form-error', "");
				if(event.target.name === 'title') {
					utils.setHTML('#title .error', "");
				} else if(event.target.name === 'authorDisplay') {
					utils.setHTML('#authorDisplay .error', "");
				} else if(event.target.name === 'year') {
					utils.setHTML('#year .error', "");
				} else if(event.target.name === 'language') {
					utils.setHTML('#language .error', "");
				} else if(event.target.name === 'path') {
					utils.setHTML('#path .error', "");
				}
			}
			
			for(let i=0; i<inputs.length; i++) {
				inputs[i].addEventListener('input', onInput, false);
			}
			
			//SUBMIT
			function onSubmit(event) {
				event.preventDefault();
				utils.bind(form, {});
				let book = {};
				book.source = {};
				book.cover = {};
				book.title = form.querySelector('[name=title]').value;
				book.subtitle1 = form.querySelector('[name=subtitle1]').value;
				book.subtitle2 = form.querySelector('[name=subtitle2]').value;
				book.authorDisplay = form.querySelector('[name=authorDisplay]').value;
				book.year = form.querySelector('[name=year]').value;
				book.language = form.querySelector('[name=language]').value;
				book.categories = form.querySelector('[name=categories]').value;
				book.source.publisher = form.querySelector('[name=source-publisher]').value;
				book.source.year = form.querySelector('[name=source-year]').value;
				book.source.origin = form.querySelector('[name=source-origin]').value;
				book.cover.background = form.querySelector('[name=cover-background').value;
				book.cover.textColor = form.querySelector('[name=cover-textColor').value;
				book.cover.textSize = form.querySelector('[name=cover-textSize').value;
				book.cover.textSpacing = form.querySelector('[name=cover-textSpacing').value;
				book.description = form.querySelector('[name=description]').value;
				book.path = form.querySelector('[name=path]').value;
				book.visible = form.querySelector('[name=visible]').checked ? true : false;
				book.authors = selectedAuthors;
				book.contribs = selectedContribs;
				let options = { method: 'PUT', url: '/books/' + id, data: JSON.stringify(book) };
				utils.ajax(options)
				.then( res => {
					let response = JSON.parse(res);
					if(response.errors) {
						utils.bind(form, response.errors);
					} else {
						location.hash = '#/admin/books/'+id;
					}
				});
			}
			
			form.addEventListener('submit', onSubmit, false);
			
			//SEARCH MODAL
			//open modal
			let openModal = event => {
				event.preventDefault();
				authType = event.target.id;
				document.querySelector('#modal h4').innerHTML = modalHeaderTemplate({ authType: authType });
				utils.removeClass('#search', 'hidden');
				modal.style.display = 'block';
			}
			
			
			let openModalBtns = root.querySelectorAll('.open-modal-btn');
			for(let i=0; i<openModalBtns.length; i++) {
				openModalBtns[i].addEventListener('click', openModal, false);
			}
			
			//close modal
			let closeModal = () => {
				modal.style.display = 'none';
				searchInput.value = '';
				results.innerHTML = '';
			}
			
			let closeModalBtn = modal.querySelector('#close-modal-btn');
			closeModalBtn.addEventListener('click', closeModal, false);
		
			//search
			function onkeyup(event) {
				let string = event.target.value;
				let options = { method: "GET", url: '/authors/search?q=' + string }
				utils.ajax(options)
				.then (res => {
					let response = JSON.parse(res);
					if(response.error) {
						utils.bind(modal,response,'error');
					} else {
						if(res !== json) {//compare JSON string
							json = res;
							results.innerHTML = searchAuthorsResultsTemplate({ authors: response.authors });
						}
						
						let addBtns = modal.querySelectorAll('.add-btn')
						for(let i=0; i<addBtns.length; i++) {
							addBtns[i].addEventListener('click',addAuth,false);
						}
					}
				})
				.catch( err => {
					console.log(err);
				})
			}
			
			searchInput.addEventListener('keyup',onkeyup,false);
			
			//ADD SELECTED AUTHORS/CONTRIBS
			function addAuth(event) {
				let id = event.target.parentElement.id;
				let name = event.target.parentElement.firstElementChild.innerHTML;
				
				if(authType==='auteur') {
					selectedAuthors.push(id);
					selectedAuthorsDisplay.push({ id: id, name: name });
					utils.setHTML('#authors .error', "");
					authorsContainer.innerHTML = selectedAuthorsTemplate({ selectedAuthors: selectedAuthorsDisplay });
					closeModal();
					let deleteBtns = authorsContainer.querySelectorAll('.delete-btn')
					for(let i=0; i<deleteBtns.length; i++) {
						deleteBtns[i].addEventListener('click', deleteAuth, false);
					} 	
				
				} else if(authType==='contributeur') {
					utils.addClass('#search', 'hidden');
					results.innerHTML = selectedContribRoleTemplate({ selectedContrib: { id: id, name: name } })
					results.querySelector('#add-contrib-role-btn').addEventListener( 'click', event => {
						let role = results.querySelector('[name=contrib-role]').value;
						selectedContribs.push({ id: id, role: role });
						selectedContribsDisplay.push({ id: id, name: name, role: role });
						contribsContainer.innerHTML = selectedContribsTemplate({ selectedContribs: selectedContribsDisplay });
						closeModal();
						let deleteBtns = contribsContainer.querySelectorAll('.delete-btn')
						for(let i=0; i<deleteBtns.length; i++) {
							deleteBtns[i].addEventListener('click', deleteAuth, false);
						} 
					}, false)
				}
			}
			
			//DELETE SELECTED AUTHORS/CONTRIBS
			function deleteAuth(event) {
				let index = event.target.parentElement.id;
				console.log(index);
				authType = event.target.id;
				if(authType==='auteur') {
					selectedAuthors.splice(index,1);
					selectedAuthorsDisplay.splice(index,1);
					authorsContainer.innerHTML = selectedAuthorsTemplate({ selectedAuthors: selectedAuthorsDisplay });
					let deleteBtns = authorsContainer.querySelectorAll('.delete-btn')
					for(let i=0; i<deleteBtns.length; i++) {
						deleteBtns[i].addEventListener('click', deleteAuth, false);
					}
				} else if(authType==='contributeur') {
					selectedContribs.splice(index,1);
					selectedContribsDisplay.splice(index,1);
					contribsContainer.innerHTML = selectedContribsTemplate({ selectedContribs: selectedContribsDisplay });
					let deleteBtns = contribsContainer.querySelectorAll('.delete-btn')
					for(let i=0; i<deleteBtns.length; i++) {
						deleteBtns[i].addEventListener('click', deleteAuth, false);
					}
				}
			}
			
		}
		
	})
	
};

export default adminBooksNew;

