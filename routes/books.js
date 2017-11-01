const express = require('express');
const router = express.Router();
const Books = require('../Books');
const db = require('../db');
const ERR = require('../utils/errMessages');

/* GET books - ONLY IF ADMIN*/
router.get('/', function(req, res, next) {
	//1 day = 86400s;
	res.set('Cache-Control', 'public, max-age=86400, must-revalidate');
	res.json({ books: Books });
	
	
});

/* GET books */
router.post('/', function(req, res, next) {
	res.end();
});

router.get('/search', function(req, res, next) {
	if(req.query.q.length < 3) {
		return res.json({ books: [] });
	}

	let q = new RegExp(req.query.q, 'i');
	
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

module.exports = router;
