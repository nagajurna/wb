const lodashId = require('lodash-id')
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

const adapter = new FileAsync('db.json');
const db = low(adapter)
.then ( db => {
	db._.mixin(lodashId);
	db.defaults({ users: [], books: [], authors: [] }).write();
	console.log('db ready');
	return db;
})

module.exports = db;

