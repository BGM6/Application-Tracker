const {Schema, model} = require('mongoose');

const ApplicationSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users'
	},
	companyName: {
		type: String,
		required: true,
	},
	position: {
		type: String,
		required: true,
	},
	companyURL: {
		type: String,
	},
	jobPostURL: {
		type: String,
	},
	coverLetter: {
		type: Boolean,
		default: false
	},
	date: {
		type: Date,
		default: Date.now()
	}
});

const Application = model('Application', ApplicationSchema);

module.exports = Application;