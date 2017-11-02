import utils from '../../../../services/utils';
let adminUsersTemplate = require('./adminUsers.ejs');
//home.js
const adminUsers = function(container) {
	'use strict';
	//ajax get users
	let options = { method: 'GET', url: '/users/' };
	utils.ajax(options)
	.then( res => {
		let response = JSON.parse(res);
		if(response.error) {
			//insert template in container
			container.innerHTML = "";
			container.innerHTML = adminUsersTemplate({ users: [], error: response.error });
		} else {
			//insert template in container
			container.innerHTML = "";
			container.innerHTML = adminUsersTemplate({ users: response.users, error: '' });
		}
	});
};

export default adminUsers;

