const express = require('express');
const router = express.Router();
const db = require('../db');
const ERR = require('../utils/errMessages');


/*SET TABLE*/
router.post('/new', (req, res, next) => {
	
	if(isNaN(req.body.table.totalPages)) {
		res.json({ message: "table not correct" });
	} else {
		db
		.then ( db => {
			let table = db
				.get('tables')
				.find({ id: req.body.id, 
						agent: req.body.agent, 
						width: req.body.width,
						height: req.body.height,
						font: req.body.font,
						fontSize: req.body.fontSize })
				.value();
			return { db: db, table: table };
		})
		.then( resolve => {
			if(resolve.table) {
				res.json({ message: "table already existing" });
			} else {
				let t = req.body;
				t.created_at = new Date(Date.now()).toLocaleString();
				let db = resolve.db;
				let table = db
					.get('tables')
					.insert(t)
					.write();
				return table;
			}
		})
		.then ( table => {
			if(table) {
				res.json({ message: "table recorded" });
			}
		})
		.catch( err => {
			console.log(err);
			res.json({ error: ERR.SERVER });
		});
	}
	
});

module.exports = router;
