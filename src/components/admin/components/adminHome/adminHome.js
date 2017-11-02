import utils from '../../../../services/utils';
import dataStore from '../../../../services/dataStore';
let adminHomeTemplate = require('./adminHome.ejs')
//home.js
const adminHome = function(container, data) {
	'use strict';
	
	//User
	if(!data) { return; }
	let user = data;
	//insert template in container
	container.innerHTML = "";
	container.innerHTML = adminHomeTemplate({ user: user });
	
	function logout() {
		let options = { method: 'GET', url: '/users/logout' };
		utils.ajax(options)
		.then( response => {
			dataStore.setData('currentUser', JSON.parse(response).user);
			utils.removeClass('#admin-link', 'visible');
			location.hash = '#/books/';
		});
	}
	let root = document.querySelector("#adminHome");
	root.querySelector('#logout-btn').addEventListener('click', logout, false);
	
};

export default adminHome;

