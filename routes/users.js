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

/* GET users */
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
			return user
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
	});
	
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
})

module.exports = router;
