const express = require('express');
const router = express.Router();
const db = require('../db');
const ERR = require('../utils/errMessages');

/* GET books - ONLY IF ADMIN*/
router.get('/', function(req, res, next) {
	
	db
	.then( db => {
		let books = db
			.get('books')
			.cloneDeep()
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
		
		return books;
	})
	.then( books => {
		//half day = 43200s;
		res.set('Cache-Control', 'public, max-age=43200, must-revalidate');
		res.json({ books: books });
	})
	.catch( err => {
		console.log(err);
		res.json({ error: ERR.SERVER });
	});
		
});

/* GET books/search */
router.get('/search', function(req, res, next) {
	if(req.query.q.length < 3) {
		return res.json({ books: [] });
	}

	let q = new RegExp(req.query.q, 'gi');
	
	db
	.then( db => {
		let books = db
			.get('books')
			.filter(function(o) { return o.title.match(q); } )
			.value();
		return books;
	})
	.then( books => {
		res.json({ books: books });
	})
	.catch( err => {
		console.log(err);
		res.json({ error: ERR.SERVER });
	});
});

/* GET BOOK*/
router.get('/:id', function(req, res, next) {
	let id = req.params.id;
	
	db
	.then( db => {
		let book = db
			.get('books')
			.find({ id: id})
			.cloneDeep()
			.value();
		return { db: db, book: book };
	})
	.then( resolve => {
		let db = resolve.db;
		let book = resolve.book;
		let authors = db
			.get('authors')
			.cloneDeep()
			.value();
		return { book: book, authors: authors }
	})
	.then ( resolve => {
		//populate
		let book = resolve.book;
		let authors = resolve.authors;
		for(let i=0; i<book.authors.length; i++) {
			let a = authors.find(function(author) { return author.id === book.authors[i]; })
			book.authors[i] = a;
		}
		
		for(let i=0; i<book.contribs.length; i++) {
			let a = authors.find(function(author) { return author.id === book.contribs[i].id; })
			a.role = book.contribs[i].role;
			book.contribs[i] = a;
		}
		
		return book;
	})
	.then ( book => {
		res.json({ book: book });
	})
	.catch( err => {
		console.log(err);
		return res.json({ error: ERR.SERVER });
	});
	
});

/* CREATE BOOKS - ONLY IF ADMIN*/
router.post('/', function(req, res, next) {
	let errors = {};
	
	let createBook = () => {
		
		//add errors.title to error
		if(!req.body.title) { 
			errors.title = ERR.REQUIRED;
		}
		
		//add errors.authorName to error
		if(!req.body.authorDisplay) { 
			errors.authorDisplay = ERR.REQUIRED;
		}
		
		//add errors.authors to error
		if(req.body.authors.length===0) { 
			errors.authors = ERR.REQUIRED;
		}
		
		//add errors.year to error
		if(!req.body.year) { 
			errors.year = ERR.REQUIRED;
		}
		
		//add errors.language to error
		if(!req.body.language) { 
			errors.language = ERR.REQUIRED;
		}
		
		//add errors.path to error
		if(!req.body.path) { 
			errors.path = ERR.REQUIRED;
		}
		
		if(errors.title || errors.authorDisplay || errors.authors || errors.year || errors.language || errors.path || errors.form) {
			res.json({ errors: errors });
			
		} else {
			
			let b = req.body;
			b.created_at = new Date(Date.now()).toLocaleString();
			b.updated_at = new Date(Date.now()).toLocaleString();
			
			db
			.then( db => {
				
				let book = db
					.get('books')
					.insert(b)
					.write();
				return book;
				
			})
			.then( book => {
				res.json({ book: book });
			})
			.catch( err => {
				console.log(err);
				errors.form = ERR.SERVER;
				return res.json({ errors: errors });
			});
		}
	}
	
	db
	.then( db => {
		let user = db
			.get('users')
			.find({ id: req.session.user })
			.value()
		return user;
	})
	.then( user => {
		if(!user || !user.admin) {
			errors.form = ERR.NONAUTH;
			return res.json({ errors: errors });
		} else {
			createBook();
		}
	})
	.catch( err => {
		console.log(err);
		errors.form = ERR.SERVER;
		return res.json({ errors: errors });
	});
});

/* UPDATE BOOKS - ONLY IF ADMIN*/
router.put('/:id', function(req, res, next) {
	let id = req.params.id;
	let errors = {};
	
	let updateBook = () => {
		
		//add errors.title to error
		if(!req.body.title) { 
			errors.title = ERR.REQUIRED;
		}
		
		//add errors.authorName to error
		if(!req.body.authorDisplay) { 
			errors.authorDisplay = ERR.REQUIRED;
		}
		
		//add errors.authors to error
		if(req.body.authors.length===0) { 
			errors.authors = ERR.REQUIRED;
		}
		
		//add errors.year to error
		if(!req.body.year) { 
			errors.year = ERR.REQUIRED;
		}
		
		//add errors.language to error
		if(!req.body.language) { 
			errors.language = ERR.REQUIRED;
		}
		
		//add errors.path to error
		if(!req.body.path) { 
			errors.path = ERR.REQUIRED;
		}
		
		if(errors.title || errors.authorDisplay || errors.authors || errors.year || errors.language || errors.path || errors.form) {
			res.json({ errors: errors });
			
		} else {
			
			let b = req.body;
			b.updated_at = new Date(Date.now()).toLocaleString();
			
			db
			.then( db => {
				
				let book = db
					.get('books')
					.find({ id: id })
					.assign(b)
					.write();
				return book;
				
			})
			.then( book => {
				res.json({ book: book });
			})
			.catch( err => {
				console.log(err);
				errors.form = ERR.SERVER;
				return res.json({ errors: errors });
			});
		}
	}
	
	db
	.then( db => {
		let user = db
			.get('users')
			.find({ id: req.session.user })
			.value()
		return user;
	})
	.then( user => {
		if(!user || !user.admin) {
			errors.form = ERR.NONAUTH;
			return res.json({ errors: errors });
		} else {
			updateBook();
		}
	})
	.catch( err => {
		console.log(err);
		errors.form = ERR.SERVER;
		return res.json({ errors: errors });
	});
});

/* DELETE BOOK : ONLY IF ADMIN */
router.delete('/:id', (req, res, next) => {
	let id = req.params.id;
	
	let deleteBook = () => {
		
		db
		.then( db => {
			
			db
			.get('books')
			.remove({ id: id })
			.write()
			
			return 'done';
		})
		.then( resolve => {
			res.json({ book: {} });
		})
		.catch( err => {
			console.log(err);
			res.json({ error: ERR.SERVER });
		});
	}
	
	db
	.then( db => {
		
		let user = db
			.get('users')
			.find({ id: req.session.user })
			.value();
			
		return user;
	})
	.then( user => {
		if(!user || !user.admin) {
			res.json({ error: ERR.NONAUTH });
		} else {
			deleteBook();
		}
	})
	.catch( err => {
		console.log(err);
		res.json({ error: ERR.SERVER });
	});
	
	
})

module.exports = router;
