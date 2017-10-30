import utils from '../../services/utils';
import dataStore from '../../services/dataStore';
//home.js
const home = function() {
	'use strict';
	//rootElement
	let books = dataStore.getData().books;
	utils.repeat(books);
	
};

export default home;

