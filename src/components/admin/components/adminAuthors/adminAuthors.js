import utils from '../../../../services/utils';
import dataStore from '../../../../services/dataStore';
//home.js
const adminAuthors = function() {
	'use strict';
	let root = document.querySelector('#adminAuthors');
	let list = root.querySelector('#authors-list');
	
	//ajax get users
	let options = { method: 'GET', url: '/authors/' };
	utils.ajax(options)
	.then( res => {
		let response = JSON.parse(res);
		if(response.error) {
			utils.bind(root, response, 'error');
		} else {
			let authors = response.authors;
			dataStore.setData('authors', authors);
			utils.repeat(list, authors);
		}
	});
};

export default adminAuthors;

