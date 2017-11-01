import utils from '../../../../services/utils';
import dataStore from '../../../../services/dataStore';
//home.js
const adminBook = function() {
	'use strict';
	let root = document.querySelector('#adminBook');
	let div = root.querySelector('#book');
	let id = location.hash.replace(/^#\/admin\/books\//,'');
	let book = dataStore.getData('books', id);
	utils.bind(div, book);
}

export default adminBook;

