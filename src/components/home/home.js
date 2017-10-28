import utils from '../../services/utils';
//home.js
const home = function(data) {
	'use strict';
	//rootElement
	if(!data) { return; }
	let books = data;
	utils.repeat(books);
	
};

export default home;

