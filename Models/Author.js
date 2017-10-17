const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let authorSchema = new Schema({
	_id: Schema.Types.ObjectId,
	name: { type: String },
	firstname: { type: String },
	birth: { type: String },
	death: { type: String },
	bio: { type: String },
	created_at: { type: Date },
	updated_at: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Author', authorSchema);
