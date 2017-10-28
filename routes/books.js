const express = require('express');
const router = express.Router();
const Books = require('../Books');

/* GET books */
router.get('/', function(req, res, next) {
	//1 day = 86400s;
	res.set('Cache-Control', 'public, max-age=86400, must-revalidate');
	res.json(Books);
});

module.exports = router;
