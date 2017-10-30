const express = require('express');
const router = express.Router();
const Books = require('../Books');
const db = require('../db');

/* GET books */
router.get('/', function(req, res, next) {
	//1 day = 86400s;
	res.set('Cache-Control', 'public, max-age=86400, must-revalidate');
	res.json({ books: Books });
});

module.exports = router;
