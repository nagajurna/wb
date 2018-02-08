const express = require('express');
const router = express.Router();
const db = require('../db');
const ERR = require('../utils/errMessages');

/* GET books and authors */
router.get('/init', function(req, res, next) {
	
	db
	.then( db => {
		let books = db
			.get('books')
			.cloneDeep()
			.sortBy('nameAlpha')
			.value();
		return { db: db, books: books };
	})
	.then( resolve => {
		let db = resolve.db;
		let books = resolve.books;
		let authors = db
			.get('authors')
			.cloneDeep()
			.value();
		return { books: books, authors: authors };
	})
	.then( resolve => {
		//populate
		let books = resolve.books;
		let authors = resolve.authors;
		
		for(let i=0; i<books.length; i++) {
			let book = books[i];
			for(let i=0; i<book.authors.length; i++) {
				let a = authors.find(function(author) { return author.id === book.authors[i]; })
				book.authors[i] = a;
			}
			
			for(let i=0; i<book.contribs.length; i++) {
				let a = authors.find(function(author) { return author.id === book.contribs[i].id; })
				a.role = book.contribs[i].role;
				book.contribs[i] = a;
			}
		}
		
		return { books: books, authors: authors };
	})
	.then( resolve => {
		let books = resolve.books;
		let authors = resolve.authors;
		//half day = 43200s;
		res.set('Cache-Control', 'public, max-age=43200, must-revalidate');
		res.json({ books: books, authors: authors });
	})
	.catch( err => {
		console.log(err);
		res.json({ error: ERR.SERVER });
	});
		
});

module.exports = router;
