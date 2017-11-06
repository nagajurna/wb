const express = require('express');
const router = express.Router();
const db = require('../db');
const ERR = require('../utils/errMessages');

/* GET AUTHORS*/
router.get('/', function(req, res, next) {
	
	db
	.then( db => {
		let authors = db
			.get('authors')
			.cloneDeep()
			.value();
		return { db: db, authors: authors };
	})
	.then( resolve => {
		let db = resolve.db;
		let authors = resolve.authors;
		let books = db
			.get('books')
			.cloneDeep()
			.value();
		return { authors: authors, books: books }
	})
	.then( resolve => {
		//populate
		let authors = resolve.authors;
		let books = resolve.books;
		for(let i=0; i<authors.length; i++) {
			let author = authors[i];
			let authorsArray = books.filter(function(book) { return book.authors.indexOf(author.id) >=0; })
			let contribsArray = books.filter(function(book) { 
				let contrib = book.contribs.find(function(contrib) { return contrib.id === author.id;});
				if(contrib) {
					return true ; 
				}
			});
			
			author.books = authorsArray;
			let contribs = [];
			for(let i=0; i<contribsArray.length; i++) {
				let b = contribsArray[i];
				for(let j=0; j<b.contribs.length; j++) {
					let c = b.contribs[j];
					if(c.id===author.id) {
						contribs.push({ role: c.role, book: b });
					}
				}
			}
			author.contribs = contribs;
		}
		
		return authors;
	})
	.then ( authors => {
		res.json({ authors: authors });
	})
	.catch( err => {
		console.log(err);
		return res.json({ error: ERR.SERVER });
	});
	
	
});

/* GET AUTHOR SEARCH */
router.get('/search', function(req, res, next) {
	if(req.query.q.length < 3) {
		return res.json({ authors: [] });
	}

	let q = new RegExp(req.query.q, 'gi');
	
	db
	.then( db => {
		let authors = db
			.get('authors')
			.filter(function(o) { return o.name.match(q); } )
			.value();
		return authors;
	})
	.then( authors => {
		res.json({ authors: authors });
	})
	.catch( err => {
		console.log(err);
		res.json({ error: ERR.SERVER });
	});
});

/* GET AUTHOR*/
router.get('/:id', function(req, res, next) {
	let id = req.params.id;
	
	db
	.then( db => {
		let author = db
			.get('authors')
			.cloneDeep()
			.find({ id: id})
			.value();
		return { db: db, author: author };
	})
	.then( resolve => {
		let db = resolve.db;
		let author = resolve.author;
		let books = db
			.get('books')
			.cloneDeep()
			.value();
		return { author: author, books: books }
	})
	.then( resolve => {
		//populate
		let author = resolve.author;
		let books = resolve.books;
		let authorsArray = books.filter(function(book) { return book.authors.indexOf(author.id) >=0; })
		let contribsArray = books.filter(function(book) { 
			let contrib = book.contribs.find(function(contrib) { return contrib.id === author.id;});
			if(contrib) {
				return true ; 
			}
		});
		
		author.books = authorsArray;
		let contribs = [];
		for(let i=0; i<contribsArray.length; i++) {
			let b = contribsArray[i];
			for(let j=0; j<b.contribs.length; j++) {
				let c = b.contribs[j];
				if(c.id===author.id) {
					contribs.push({ role: c.role, book: b });
				}
			}
		}
		author.contribs = contribs;
		
		return author;
	})
	.then ( author => {
		res.json({ author: author });
	})
	.catch( err => {
		console.log(err);
		return res.json({ error: ERR.SERVER });
	});
	
	
});

/* CREATE AUTHORS - ONLY IF ADMIN*/
router.post('/', function(req, res, next) {
	let errors = {};
	
	let createAuthor = () => {
	
		//add errors.name to error
		if(!req.body.name) { 
			errors.name = ERR.REQUIRED;
		}
		
		//add errors.nameAlpha to error
		if(!req.body.nameAlpha) { 
			errors.nameAlpha = ERR.REQUIRED;
		}
		
		//add errors.nameAlpha to error
		if(!req.body.birth) { 
			errors.birth = ERR.REQUIRED;
		}
		
		if(errors.name || errors.nameAlpha || errors.form) {
			res.json({ errors: errors });
			
		} else {
			
			let a = req.body;
			a.created_at = new Date(Date.now()).toLocaleString();
			a.updated_at = new Date(Date.now()).toLocaleString();
						
			db
			.then( db => {
				
				let author = db
					.get('authors')
					.insert(a)
					.write();
				return author;
				
			})
			.then( author => {
				res.json({ author: author });
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
			createAuthor();
		}
	})
	.catch( err => {
		console.log(err);
		errors.form = ERR.SERVER;
		return res.json({ errors: errors });
	});
	
	
});


/* UPDATE AUTHOR - ONLY IF ADMIN */
router.put('/:id', (req, res, next) => {
	let id = req.params.id;
	let errors = {};
	
	let updateAuthor = () => {
	
		//add errors.name to error
		if(!req.body.name) { 
			errors.name = ERR.REQUIRED;
		}
		
		//add errors.nameAlpha to error
		if(!req.body.nameAlpha) { 
			errors.nameAlpha = ERR.REQUIRED;
		}
		
		if(errors.name || errors.nameAlpha) {
			res.json({ errors: errors });
			
		} else {
			
			let a = req.body;
			a.updated_at = new Date(Date.now()).toLocaleString();
			
			
			db
			.then ( db => {
				let author = db
					.get('authors')
					.find({ id: id })
					.assign(a)
					.write();
				return author;
			})
			.then( author => {
				res.json({ author: author });
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
			updateAuthor();
		}
	})
	.catch( err => {
		console.log(err);
		errors.form = ERR.SERVER;
		return res.json({ errors: errors });
	});
	
})

/* DELETE AUTHOR : ONLY IF ADMIN AND NOT IN ANY BOOK */
router.delete('/:id', (req, res, next) => {
	let id = req.params.id;
	
	let deleteAuthor = () => {
		
		db
		.then( db => {
			
			db
			.get('authors')
			.remove({ id: id })
			.write()
			
			return 'done';
		})
		.then( resolve => {
			res.json({ author: {} });
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
			
		return { db: db, user: user };
	})
	.then( resolve => {
		let db = resolve.db;
		let user = resolve.user;
		let books = db
			.get('books')
			.cloneDeep()
			.value();
		return  { db: db, user: user, books: books };
	})
	.then( resolve => {
		let db = resolve.db;
		let user = resolve.user;
		let books = resolve.books;
		//check if author in authors or contribs of any book
		let authorsArray = books.filter(function(book) { return book.authors.indexOf(id) >=0; })
		let contribsArray = books.filter(function(book) { 
			let contrib = book.contribs.find(function(contrib) { return contrib.id === id;});
			if(contrib) {
				return true ; 
			}
		});
		
		let array = authorsArray.concat(contribsArray);
		
		if(array.length > 0) {
			res.json({ error: 'Vous ne pouvez pas supprimer cet auteur (présent dans un ou plusieurs livres).' });
		} else {
			return user
		}
		
	})
	.then( user => {
		if(user===undefined) { return; }
		
		if(!user || !user.admin) {
			res.json({ error: ERR.NONAUTH });		
		} else {
			deleteAuthor();
		}
	})
	.catch( err => {
		console.log(err);
		res.json({ error: ERR.SERVER });
	});
});




module.exports = router;

