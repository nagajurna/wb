const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookSchema = new Schema({
	_id: Schema.Types.ObjectId,
	title: { type: String },
	subtile: { type: String },
	authors: [{ type: Schema.Types.ObjectId, ref: 'Author' }],
	year: { type: String },
	source: { type: String },
	file: { type: String },
	intro: { type: String },
	category: [{type: Schema.Types.ObjectId, ref: 'Categorie' }],
	created_at: { type: Date },
	updated_at: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Book', bookSchema);
