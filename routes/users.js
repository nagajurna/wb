const express = require('express');
const router = express.Router();
const bCrypt = require('bcrypt');
const db = require('../db');
const ERR = require('../utils/errMessages');
const emailRegExp = require('../utils/emailReg');

const createHash = string => {
	 return bCrypt.hashSync(string, bCrypt.genSaltSync(10), null);
};

const validPassword = (user, string) => {
	 return bCrypt.compareSync(string, user.password);
};

/* GET USERS - ONLY IF ADMIN*/
router.get('/', function(req, res, next) {
	
	let getUsers = () => {
		
		db
		.then( db => {
			let users = db
				.get('users')
				.value();
			return users
		})
		.then ( users => {
			res.json({ users: users });
		})
		.catch( err => {
			console.log(err);
			return res.json({ error: ERR.SERVER });
		});
	}
	
	//ONLY IF ADMIN
	db
	.then( db => {
		let user = db
			.get('users')
			.find({ id: req.session.user })
			.value()
		return user
	})
	.then( user => {
		if(!user | !user.admin) {
			return res.json({ error: ERR.NONAUTH });
		} else {
			getUsers();
		}
	})
	.catch( err => {
		console.log(err);
		return res.json({ error: ERR.SERVER });
	});
		
});

/* CREATE ADMIN - ONLY IF ADMIN */
router.post('/admin/new', function(req, res, next) {
	let errors = {};
	
	let createAdmin = () => {
	
		//add errors.name to error
		if(!req.body.name) { 
			errors.name = ERR.REQUIRED;
		} else if(req.body.name.length>25) { 
			errors.name = ERR.NAMEMAX;
		}
		
		//add errors.email to error
		if(!req.body.email) { 
			errors.email = ERR.REQUIRED;
		} else if(!req.body.email.match(emailRegExp)) { 
			errors.email = ERR.MAILINVALID;
		}
		
		//add errors.password to error
		if(!req.body.password) { 
			errors.password = ERR.REQUIRED;
		} else if(req.body.password.length<6) { 
			errors.password = ERR.PASSMIN;
		}
		
		//add errors.password_confirm to error
		if(!req.body.password_confirm) { 
			errors.password_confirm = ERR.REQUIRED;
		} else if(req.body.password_confirm !== req.body.password) { 
			errors.password_confirm = ERR.PASSMISMATCH;
		}
		
		//send errors
		if(errors.name || errors.email || errors.password || errors.password_confirm) {
			res.json({ errors: errors });
		} else {
			
			db
			.then ( db => {
				let user = db
					.get('users')
					.find({ email: req.body.email })
					.value();
					return { db: db, user: user }
			})
			.then ( resolve => {
				if(resolve.user) {
					errors.email = ERR.MAILUNIQUE;
					res.json({ errors: errors });
				} else {
					
					let profile = {
						name: req.body.name,
						email: req.body.email,
						password: createHash(req.body.password),
						admin: true,
						created_at: new Date(Date.now()).toLocaleString(),
						updated_at: new Date(Date.now()).toLocaleString()
					}
					
					let db = resolve.db;
					let newUser = db
						.get('users')
						.insert(profile)
						.write();
					return newUser
				}
			})
			.then( newUser => {
				let currentUser = {};
				currentUser.id = newUser.id;
				currentUser.name = newUser.name;
				currentUser.email = newUser.email;
				currentUser.admin = newUser.admin;
				currentUser.created_at = newUser.created_at;
				currentUser.updated_at = newUser.updated_at;
				res.json({ user: currentUser });
			})
			.catch( err => {
				console.log(err);
				errors.form = ERR.SERVER;
				return res.json({ errors: errors });
			});
		}
	}
	
	//ONLY IF ADMIN
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
			errors.form = ERR.NONAUTH;
			res.json({ errors: errors });
		} else {
			createAdmin();
		}
	})
	.catch( err => {
		console.log(err);
		errors.form = ERR.SERVER;
		res.json({ errors: errors });
	});
		
});

/* LOGIN */
router.post('/login', function(req, res, next) {
	let errors = {};
	
	if(!req.body.email) { 
		errors.email = ERR.REQUIRED;
	}
	
	if(!req.body.password) { 
		errors.password = ERR.REQUIRED;
	}
	
	if(errors.email || errors.password) {
		res.json({ errors: errors });
	} else {
	
		db
		.then( db => {
			let user = db
				.get('users')
				.find({ email: req.body.email })
				.value();
			return user;
		})
		.then ( user => {
			if(!user || !validPassword(user, req.body.password)) {
				errors.form = ERR.MISMATCH;
				res.json({ errors: errors });
			} else {
				req.session.user = user.id;
				let currentUser = {};
				currentUser.id = user.id;
				currentUser.name = user.name;
				currentUser.email = user.email;
				currentUser.admin = user.admin;
				res.json({ user: currentUser });
			}
		})
		.catch( err => {
			console.log(err);
			errors.form = ERR.SERVER;
			return res.json({ errors: errors });
		});
	}
	
});

/* UPDATE USER : ONLY IF USER HIMSELF */
router.put('/:id', (req, res, next) => {
	let id = req.params.id;
	let errors = {};
	
	//ONLY IF USER HIMSELF
	if(id!==req.session.user) {
		errors.form = ERR.NONAUTH;
	}
	
	//add errors.name to error
	if(!req.body.name) { 
		errors.name = ERR.REQUIRED;
	} else if(req.body.name.length>25) { 
		errors.name = ERR.NAMEMAX;
	}
	
	//add errors.email to error
	if(!req.body.email) { 
		errors.email = ERR.REQUIRED;
	} else if(!req.body.email.match(emailRegExp)) { 
		errors.email = ERR.MAILINVALID;
	}
	
	//add errors.password to error
	if(!req.body.password) { 
		errors.password = ERR.REQUIRED;
	}
	
	if(errors.name || errors.email || errors.password || errors.form) {
		res.json({ errors: errors });
	} else {
		
		db
		.then ( db => {
			let user = db
				.get('users')
				.find({ email: req.body.email })
				.value();
				return { db: db, user: user }
		})
		.then ( resolve => {
			if(resolve.user && resolve.user.id!==id) {
				errors.email = ERR.MAILUNIQUE;
				res.json({ errors: errors });
			} else {
				let db = resolve.db;
				let user = db
					.get('users')
					.find({ id: id })
					.value();
					return { db: db, user: user };
			}	
		})
		.then( resolve => {
			if(!resolve.user) {
				errors.form = ERR.NONAUTH;
				res.json({ errors: errors });
			} else if(!validPassword(resolve.user, req.body.password)) {
				errors.form = ERR.MISMATCH;
				res.json({ errors: errors });
			} else {
				let db = resolve.db;
				let user = db
					.get('users')
					.find({ id: id })
					.assign({ name: req.body.name, email: req.body.email, updated_at: new Date(Date.now()).toLocaleString() })
					.write();
					return user;
			}
		})
		.then( user => {
			if(user===undefined) { return; }//if nothing's returned, means that res already sent
			res.json({ user: user });
		})
		.catch( err => {
			console.log(err);
			errors.form = ERR.SERVER;
			return res.json({ errors: errors });
		});
	}
	
})

/* UPDATE USER PASSWORD : ONLY IF USER HIMSELF */
router.put('/password/:id', (req, res, next) => {
	let id = req.params.id;
	let errors = {};
	
	//ONLY IF USER HIMSELF
	if(id!==req.session.user) {
		errors.form = ERR.NONAUTH;
	}
	
	//add errors.password to error
	if(!req.body.password) { 
		errors.password = ERR.REQUIRED;
	}
	
	//add errors.password_new to error
	if(!req.body.password_new) { 
		errors.password_new = ERR.REQUIRED;
	} else if(req.body.password_new.length<6) { 
		errors.password_new = ERR.PASSMIN;
	}
	
	//add errors.password_new_confirm to error
	if(!req.body.password_new_confirm) { 
		errors.password_new_confirm = ERR.REQUIRED;
	} else if(req.body.password_new_confirm !== req.body.password_new) { 
		errors.password_new_confirm = ERR.PASSMISMATCH;
	}
	
	if(errors.password || errors.password_new || errors.password_new_confirm || errors.form) {
		res.json({ errors: errors });
	} else {
		
		db
		.then ( db => {
			
			let user = db
				.get('users')
				.find({ id: id })
				.value();
			return { db: db, user: user };
		})
		.then( resolve => {
			if(!resolve.user) {
				errors.form = ERR.NONAUTH;
				res.json({ errors: errors });
			} else if(!validPassword(resolve.user, req.body.password)) {
				errors.form = ERR.MISMATCH;
				res.json({ errors: errors });
			} else {
				let db = resolve.db;
				let user = db
					.get('users')
					.find({ id: id })
					.assign({ password: createHash(req.body.password_new) })
					.write();
				return user;
			}
		})
		.then ( user => {
			if(user===undefined) { return; }//if nothing's returned, means that res already sent
			res.json({ user: user });
		})
		.catch( err => {
			console.log(err);
			errors.form = ERR.SERVER;
			return res.json({ errors: errors });
		});
	}
	
});

/* LOGOUT */
router.get('/logout', (req, res, next) => {
	req.session.destroy();
	res.clearCookie('_liber.sid');
	res.json({ user: {} });
	
});

/* GET CURRENT USER */
router.get('/currentuser', (req, res, next) => {
	if(req.session.user) {
		
		db
		.then ( db => {
			let user = db
				.get('users')
				.find({ id: req.session.user })
				.value();
				return user
		})
		.then ( user => {
			
			if(!user) {
				res.json({ user: {} });
			} else {
				let currentUser = {};
				currentUser.id = user.id;
				currentUser.name = user.name;
				currentUser.email = user.email;
				currentUser.admin = user.admin;
				res.json({ user: currentUser });
			}
			
		});
		
	} else {
		
		res.json({ user: {} });
	}
});

/* GET USER : ONLY IF USER HIMSELF OR ADMIN */
router.get('/:id', (req, res, next) => {
		
	let getUser = () => {
		db
		.then( db => {
			let user = db
				.get('users')
				.find({ id: id })
				.value()
				return user
		})
		.then ( user => {
			res.json({ user: user });
		})
		.catch( err => {
			console.log(err);
			errors.form = ERR.SERVER;
			return res.json({ errors: errors });
		});
	}
	
	//ONLY IF USER HIMSELF OR ADMIN
	let id = req.params.id;
	
	if(id!==req.session.user) {
		db
		.then( db => {
			let user = db
				.get('users')
				.find({ id: req.session.user })
				.value()
			return user
		})
		.then( user => {
			if(!user || !user.admin) {
				res.json({ error: ERR.NONAUTH });
			} else {
				getUser();
			}
		})
		.catch( err => {
			console.log(err);
			res.json({ error: ERR.SERVER });
		});
	
	} else {
		getUser();
	}
	
});

/* DELETE USER : ONLY IF ADMIN */
router.delete('/:id', (req, res, next) => {
	let id = req.params.id;
	
	let deleteUser = () => {
		
		db
		.then( db => {
			
			db
			.get('users')
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
	
	//ONLY IF USER HIMSELF OR ADMIN
	db
	.then( db => {
		
		let user = db
			.get('users')
			.find({ id: req.session.user })
			.value();
			
		return user;
	})
	.then( user => {
		if(!user || !user.admin || id===req.session.user) {
			res.json({ error: ERR.NONAUTH });
		} else {
			deleteUser();
		}
	})
	.catch( err => {
		console.log(err);
		res.json({ error: ERR.SERVER });
	});
	
	
})

module.exports = router;
