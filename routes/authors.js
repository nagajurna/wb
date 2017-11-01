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
			.value();
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

/* GET AUTHOR*/
router.get('/:id', function(req, res, next) {
	let id = req.params.id;
	
	db
	.then( db => {
		let author = db
			.get('authors')
			.find({ id: id})
			.value();
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
			
			let newAuthor = {
				name: req.body.name,
				firstName: req.body.firstName,
				nameAlpha: req.body.nameAlpha,
				birth: req.body.birth,
				death: req.body.death,
				description: req.body.description,
				created_at: new Date(Date.now()).toLocaleString(),
				updated_at: new Date(Date.now()).toLocaleString()
			}
			
			db
			.then( db => {
				
				let author = db
					.get('authors')
					.insert(newAuthor)
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
			
			db
			.then ( db => {
				let author = db
					.get('authors')
					.find({ id: id })
					.assign({ name: req.body.name, 
							  firstName: req.body.firstName,
							  nameAlpha: req.body.nameAlpha,
							  birth: req.body.birth,
							  death: req.body.death,
							  description: req.body.description,
							  updated_at: new Date(Date.now()).toLocaleString() })
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

/* DELETE AUTHOR : ONLY IF ADMIN */
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
			res.json({ user: {} });
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
			deleteAuthor();
		}
	})
	.catch( err => {
		console.log(err);
		res.json({ error: ERR.SERVER });
	});
	
	
})




module.exports = router;

