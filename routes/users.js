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

/* GET USERS */
router.get('/', function(req, res, next) {
	db
	.then( db => {
		let users = db
			.get('users')
			.value();
			return users
	})
	.then ( users => {
		res.json({ users: users });
	});
	
});

/* POST USERS */
router.post('/', function(req, res, next) {
	let errors = {};
	
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
					created_at: Date.now(),
					updated_at: Date.now()
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
			req.session.user = newUser.id;
			let currentUser = {};
			currentUser.id = newUser.id;
			currentUser.name = newUser.name;
			currentUser.email = newUser.email;
			currentUser.admin = newUser.admin;
			currentUser.created_at = newUser.created_at;
			currentuser.updated_at = newUser.updated_at;
			res.json({ user: currentUser });
		})
		.catch( err => {
			console.log(err);
			errors.form = ERR.SERVER;
			return res.json({ errors: errors });
		});
	}
	
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
	}
	
	db
	.then( db => {
		let user = db
			.get('users')
			.find({ email: req.body.email })
			.value();
		return user;
	})
	.then ( user => {
		if(!user || user.password !== req.body.password) {
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
	
});

/* LOGOUT */
router.get('/logout', (req, res, next) => {
	req.session.destroy();
	res.clearCookie('_liber.sid');
	res.json({ user: {} });
	
})

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
})

module.exports = router;
