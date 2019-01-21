import utils from '../../../../services/utils';
import dataStore from '../../../../services/dataStore';
let adminBooksNewTemplate = require('./adminBooksNew.ejs');
let modalHeaderTemplate = require('./modalHeader.ejs');
let searchAuthorsResultsTemplate = require('./searchAuthorsResults.ejs');
let selectedAuthorsTemplate = require('./selectedAuthors.ejs');
let selectedContribsTemplate = require('./selectedContribs.ejs');
let selectedContribRoleTemplate = require('./selectedContribRole.ejs');
let sourcesTemplate = require('./sources.ejs');
let filesTemplate = require('./files.ejs');
//home.js
const adminBooksNew = function(container) {
	'use strict';
	
	//INSERT TEMPLATE IN CONTAINER
	let c = container;
	c.innerHTML = adminBooksNewTemplate();
	
	//ELEMENTS
	//rootElement
	const root = document.querySelector('#adminBooksNew');
	//form
	const form = root.querySelector('#adminBooksNewForm');
	const inputs = form.querySelectorAll('input');
	//modal
	const modal = root.querySelector('#modal');
	let searchInput = modal.querySelector('input');
	let results = modal.querySelector('#results');
	//source modal
	const sourceModal = root.querySelector('#source_modal');
	//authors, contribs containers
	let authorsContainer = root.querySelector('#authorsContainer');
	let contribsContainer = root.querySelector('#contribsContainer');
	
	//SCOPE VARIABLES
	let authType = '';
	let selectedAuthorsDisplay = [], selectedAuthors = [];
	let selectedContribsDisplay = [], selectedContribs = [];
	let sources = [];
	let files = [];
	let json = "";//search : string json to compare with response
		
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
		//book.source = {};
		book.styles = {};
		book.title = form.querySelector('[name=title]').value;
		book.subtitle1 = form.querySelector('[name=subtitle1]').value;
		book.subtitle2 = form.querySelector('[name=subtitle2]').value;
		book.authorDisplay = form.querySelector('[name=authorDisplay]').value;
		book.year = form.querySelector('[name=year]').value;
		book.language = form.querySelector('[name=language]').value;
		book.categories = form.querySelector('[name=categories]').value;
		book.collection = form.querySelector('[name=collection]').value;
		book.sources = sources;
		book.files = files;
		book.styles.color = form.querySelector('[name=styles-color').value;
		book.styles.image = form.querySelector('[name=styles-image').value;
		book.styles.font = form.querySelector('[name=styles-font').value;
		book.styles.cover = form.querySelector('[name=styles-cover').value;
		book.styles.author = form.querySelector('[name=styles-author').value;
		book.styles.title = form.querySelector('[name=styles-title').value;
		book.styles.subtitle1 = form.querySelector('[name=styles-subtitle1').value;
		book.styles.subtitle2 = form.querySelector('[name=styles-subtitle2').value;
		book.styles.logo = form.querySelector('[name=styles-logo').value;
		book.description = form.querySelector('[name=description]').value;
		book.path = form.querySelector('[name=path]').value;
		book.visible = form.querySelector('[name=visible]').checked ? true : false;
		book.authors = selectedAuthors;
		book.contribs = selectedContribs;
		let options = { method: 'POST', url: '/books/', data: JSON.stringify(book) };
		utils.ajax(options)
		.then( res => {
			let response = JSON.parse(res);
			if(response.errors) {
				utils.bind(form, response.errors);
			} else {
				location.hash = '#/admin/books/';
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
	
	//SOURCE MODAL
	//open source modal
	let openSourceModal = event => {
		event.preventDefault();
		sourceModal.style.display = 'block';
	}
	
	let openSourceModalBtn = document.querySelector('#open-source-modal-btn');
	openSourceModalBtn.addEventListener('click', openSourceModal,false);
	
	//close source modal
	let closeSourceModal = event => {
		sourceModal.style.display = 'none';
	}
	
	let closeSourceModalBtn = document.querySelector('#close-source-modal-btn');
	closeSourceModalBtn.addEventListener('click', closeSourceModal,false);
	
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
	
	//ADD SOURCE
	function addSource(event) {
		let src = sourceModal.querySelector('[name=source]').value;
		sources.push(src);
		sourcesContainer.innerHTML = sourcesTemplate({ sources: sources });
		let deleteSourceBtn = sourcesContainer.querySelectorAll('.delete-source-btn')
		for(let i=0; i<deleteSourceBtn.length; i++) {
			deleteSourceBtn[i].addEventListener('click', deleteSource, false);
		} 	
	}
	
	let addSourceBtn = document.querySelector('#add-source-btn');
	addSourceBtn.addEventListener('click', addSource, false);
	
	//DELETE SOURCE
	function deleteSource(event) {
		let index = event.target.parentElement.id;
		sources.splice(index,1);
		sourcesContainer.innerHTML = sourcesTemplate({ sources: sources });
		let deleteSourceBtn = sourcesContainer.querySelectorAll('.delete-source-btn')
		for(let i=0; i<deleteSourceBtn.length; i++) {
			deleteSourceBtn[i].addEventListener('click', deleteSource, false);
		} 	
	}
	
	//DELETE FILE
	function deleteFile(event) {
		let index = event.target.parentElement.id;
		let file = files[index];
		console.log(file);
		let options = { method: 'POST', url: '/books/filedelete/', data: JSON.stringify({filename: file}) };
		utils.ajax(options)
		.then( res => {
			let response = JSON.parse(res);
			if(response.error) {
				utils.bind(form, response.errors);
			} else {
				files.splice(index,1);
				filesContainer.innerHTML = filesTemplate({ files: files });
				let deleteFileBtn = filesContainer.querySelectorAll('.delete-file-btn')
				for(let i=0; i<deleteFileBtn.length; i++) {
					deleteFileBtn[i].addEventListener('click', deleteFile, false);
				} 	
			}
		});
		
	}
		
	//UPLOAD FILE
	function uploadBook(event) {
		event.preventDefault();
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				let response = JSON.parse(this.responseText);
				if(response.error) {
					utils.bind(form, response.errors);
				} else {
					let file = response.file;
					files.push(file);
					filesContainer.innerHTML = filesTemplate({ files: files });
					let deletefileBtn = filesContainer.querySelectorAll('.delete-file-btn')
					for(let i=0; i<deletefileBtn.length; i++) {
						deletefileBtn[i].addEventListener('click', deleteFile, false);
					} 
				}
			}
		};
		let input = document.getElementById("book_file");
		if(!input.files[0]) {
			return;
		}
		let file = input.files[0];
		var formData = new FormData();
		formData.append('book', file);
		xhttp.open("POST", "/books/fileupload/", true);
		xhttp.send(formData);
	}
	
	let bookUploadBtn = document.querySelector('#book_upload_btn');
	bookUploadBtn.addEventListener('click', uploadBook, false);

	
	
};

export default adminBooksNew;

