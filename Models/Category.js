const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categorySchema = new Schema({
	_id: Schema.Types.ObjectId,
	name: { type: String },
	created_at: { type: Date },
	updated_at: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Category', categorySchema);
