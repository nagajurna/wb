import utils from '../../../../services/utils';
import dataStore from '../../../../services/dataStore';
//home.js
const adminUsers = function() {
	'use strict';
	let root = document.querySelector('#adminUsers');
	let list = root.querySelector('#users-list');
	
	//ajax get users
	let options = { method: 'GET', url: '/users/' };
	utils.ajax(options)
	.then( res => {
		let response = JSON.parse(res);
		if(response.error) {
			utils.bind(root,response,'error');
		} else {
			let users = response.users;
			dataStore.setData('users', users);
			utils.repeat(list, users);
		}
	});
};

export default adminUsers;

