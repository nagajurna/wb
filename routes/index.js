const express = require('express');
const router = express.Router();
const Books = require('../Books');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WB', books: Books });
});

module.exports = router;
