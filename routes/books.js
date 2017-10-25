const express = require('express');
const router = express.Router();
const Books = require('../Books');

/* GET books */
router.get('/', function(req, res, next) {
	res.status(200);
	res.json({ books: Books });
});

/* GET book. */
router.get('/:path', function(req, res, next) {
  let book;

  for(let i = 0; i < Books.length; i++) {
	  if(Books[i].path.replace(/\/books\//,'')===req.params.path) {
		 book = Books[i];
		 break;
	  }
  }
 
  res.json({ book: book });
});

module.exports = router;
