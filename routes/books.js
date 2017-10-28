const express = require('express');
const router = express.Router();
const Books = require('../Books');

/* GET books */
router.get('/', function(req, res, next) {
	res.json(Books);
});

module.exports = router;
