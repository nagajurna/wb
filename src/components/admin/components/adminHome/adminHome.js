import utils from '../../../../services/utils';
//home.js
const adminHome = function(data) {
	'use strict';
	//rootElement
	const root = document.querySelector("#adminHome");
	if(!data) { return; }
	let user = data;
	utils.bind(root, user);
	
};

export default adminHome;

