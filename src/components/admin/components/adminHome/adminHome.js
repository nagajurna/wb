import utils from '../../../../services/utils';
import dataStore from '../../../../services/dataStore';
//home.js
const adminHome = function(data) {
	'use strict';
	//rootElement
	const root = document.querySelector("#adminHome");
	if(!data) { return; }
	let user = data;
	utils.bind(root, user);
	
	function logout() {
		let options = { method: 'GET', url: '/users/logout' };
		utils.ajax(options)
		.then( response => {
			dataStore.setData('currentUser', JSON.parse(response).user);
			utils.removeClass('#admin-link', 'visible');
			location.hash = '#/books/';
		});
	}
	
	root.querySelector('#logout-btn').addEventListener('click', logout, false);
	
};

export default adminHome;

