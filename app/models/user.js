var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//Local represents normal user
var userSchema = mongoose.Schema({
	local:{
		username: { type: String,
					lowercase: true
				},
		password: String,
		pin: String,
		yubiKey: String,
		attempts: Number,
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
		saturdayEndTime: Number,
		admin: { type: Boolean,
				default: false
			}
		


	}
	
});
//Hash and salt admin password
userSchema.methods.hashPassword = function(password){
	 return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
	
	
};
//Decrypt admin password
userSchema.methods.checkPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
};

//Hash and sal PIN
userSchema.methods.hashPIN = function(pin){
	 return bcrypt.hashSync(pin, bcrypt.genSaltSync(10));
	
	
};
//Decrypt PIN
userSchema.methods.checkPIN = function(pin){
	 return bcrypt.compareSync(pin, this.local.pin);
	
	
};



module.exports = mongoose.model('User', userSchema);