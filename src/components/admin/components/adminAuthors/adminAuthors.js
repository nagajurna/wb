import utils from '../../../../services/utils';
let adminAuthorsTemplate = require('./adminAuthors.ejs');
//home.js
const adminAuthors = function(container) {
	'use strict';
	
	//ajax get authors
	let options = { method: 'GET', url: '/authors/' };
	utils.ajax(options)
	.then( res => {
		let response = JSON.parse(res);
		if(response.error) {
			//insert template in container
			container.innerHTML = "";
			container.innerHTML = adminAuthorsTemplate({ authors: [], error: response.error });
		} else {
			//insert template in container
			container.innerHTML = "";
			container.innerHTML = adminAuthorsTemplate({ authors: response.authors, error: '' });
		}
	});
};

export default adminAuthors;

