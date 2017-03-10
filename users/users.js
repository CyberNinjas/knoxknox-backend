var restful = require('node-restful');
var mongoose = restful.mongoose;

var userSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	PIN: Number,
	startTime: Number,
	endTime: Number,
	yubiKey: String
});





module.exports = restful.model('Users', userSchema);