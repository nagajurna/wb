import utils from '../../services/utils';
import dataStore from '../../services/dataStore';
//home.js
const home = function() {
	'use strict';
	let root = document.querySelector('#home');
	let list = root.querySelector('#books-list');
	let books = dataStore.getData('books');
	utils.repeat(list,books);
	
};

export default home;

