var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = mongoose.Schema({
	local:{
		username: String,
		password: String,
		pin: String,
		yubiKey: String,
		mondayStartTime: Number,
		tuesdayStartTime: Number,
		wednesdayStartTime: Number,
		thursdayStartTime:Number,
		fridayStartTime:Number,
		saturdayStartTime: Number,
		mondayEndTime: Number,
		tuesdayEndTime: Number,
		wednesdayEndTime: Number,
		thursdayEndTime: Number,
		fridayEndTime: Number,
		saturdayEndTime: Number
		


	}
});

userSchema.methods.hashPassword = function(password){
	 return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	
	
}

userSchema.methods.checkPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
}

userSchema.methods.hashYubiKey = function(yubiKey){
	 return bcrypt.hashSync(yubiKey, bcrypt.genSaltSync(10));
	
	
}

userSchema.methods.checkYubiKey = function(yubiKey){
	 return bcrypt.compareSync(yubiKey, this.local.yubiKey);
	
	
}

userSchema.methods.hashPIN = function(pin){
	 return bcrypt.hashSync(pin, bcrypt.genSaltSync(10));
	
	
}

userSchema.methods.checkPIN = function(pin){
	 return bcrypt.compareSync(pin, this.local.pin);
	
	
}

module.exports = mongoose.model('User', userSchema);