var localStrategy = require('passport-local').Strategy;
var basicStrategy = require('passport-http').BasicStrategy;
var User  = require('../app/models/user');


module.exports = function(passport) {

//Serialize User
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});
//Deserialize user
	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user);
		});
	});

	//Passport only supports userNameField and passwordField
	passport.use('addAdmin', new localStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	},
	//Create new user.
	function(req, username, password, done){
		process.nextTick(function(){
			User.findOne({'local.username': username}, function(err, user){
				if(err)
					return done(err);
				if(user){
					return done(null, false, req.flash('signupMessage', 'That username is already taken'));
				} else {
					var newUser = new User();
					newUser.local.username = username;
					newUser.local.password = newUser.hashPassword(password);
					newUser.save(function(err){
						if(err)
							throw err;
						return done(null, newUser);
					})
				}
			})

		});
	}));

	//Add non admin user (IE door access)
	passport.use('addUser', new localStrategy({
		usernameField: 'yubiKey',
		passwordField: 'pin',
		passReqToCallback: true
	},
	//Create new user.
	function(req, yubiKey, pin, done){
		process.nextTick(function(){
			User.findOne({'local.yubiKey': yubiKey}, function(err, user){
				if(err)
					return done(err);
				if(user){
					return done(null, false, req.flash('signupMessage', 'That username is already taken'));
				} else {
					
					var newUser = new User();
					newUser.local.yubiKey = yubiKey;
					newUser.local.pin = newUser.hashPIN(pin);
					newUser.local.mondaStartTime = req.body.mondayStartTime;
					newUser.local.tuesdayStartTime = req.body.tuesdayStartTime;
					newUser.local.wednesdayStartTime = req.body.wednesdayStartTime;
					newUser.local.thursdayStartTime = req.body.thursdayStartTime;
					newUser.local.fridayStartTime = req.body.fridayStartTime;
					newUser.local.saturdayStartTime = req.body.saturdayStartTime;
					newUser.local.sundayStartTime = req.body.sundayStartTime;

					newUser.local.mondayEndTime = req.body.mondayEndTime;
					newUser.local.tuesdayEndTime = req.body.tuesdayEndTime;
					newUser.local.wednesdayEndTime = req.body.wednesdayEndTime;
					newUser.local.thursdayEndTime = req.body.thursdayEndTime;
					newUser.local.fridayEndTime = req.body.fridayEndTime;
					newUser.local.saturdayEndTime = req.body.saturdayEndTime;
					newUser.local.sundayEndTime = req.body.sundayEndTime;

					
					newUser.save(function(err){

						if(err)
							throw err;
						return done(null, newUser);
					})
				}
			})

		});
	}));


	passport.use('local-login', new localStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true

	},
	

	//check that admin usernmae and passord are valid
	function(req, username, password, done){
		process.nextTick(function(){
			User.findOne({'local.username': username}, function(err, user){
				if(err){
					return done(err);
				}
				if (!user){
					//console.log('Access Denied');
					return done(null, false, req.flash('loginMessage', 'No user found, please creae a new user'));
					
				}
				if(!user.checkPassword(password)){
					console.log('Access Denied');
					return done(null, false, req.flash('loginMessage', 'Password is incorrect'));
					
				}
				console.log('User Authenticated!');
				return done(null, user);
			});
		})
	}


	));
	passport.use(new basicStrategy(
	{
		usernameField: 'yubiKey',
		passwordField: 'pin',
		passReqToCallback: true

	},
	

	//check that yubikey, pin and time are valid
	function(req, yubiKey, pin, done){

		process.nextTick(function(){
			User.findOne({'local.yubiKey': yubiKey}, function(err, user){
				if(err){
					return done(err);
				}
				if (!user){
					console.log('Access Denied');
					return done(null, false, req.flash('loginMessage', 'No user found, please creae a new user'));
					
				}
				if(!user.checkPIN(pin)){
					console.log('Access Denied');
					return done(null, false, req.flash('loginMessage', 'Password is incorrect'));
					
				}

				var time = Number(new Date().getHours());
				var day = String;

				switch (new Date().getDay()) {
				    case 0:
				        day = "Sunday";
				          if(!((user.local.sundayStartTime <= time) && (user.local.sundayEndTime > time))){
				        	return done(null, false);
				        }
				        break;
				    case 1:
				        day = "Monday";
				        if(!((user.local.mondayStartTime <= time) && (user.local.mondayEndTime > time))){
				        	return done(null, false);
				        }
				        break;
				    case 2:
				        day = "Tuesday";
				        console.log('Reached inside Tuesday case');
				        if(!((user.local.tuesdayStartTime <= time) && (user.local.tuesdayEndTime > time))){
				        	return done(null, false);
						}
				        break;
				    case 3:
				        day = "Wednesday";
				        if(!((user.local.wednesdayStartTime <= time) && (user.local.wednesdayEndTime > time))){
				        	return done(null, false);
				        }
				        break;
				    case 4:
				        day = "Thursday";
				        console.log('Inside Thursday case');
				          if(!((user.local.thursdayStartTime <= time) && (user.local.thursdayEndTime > time))){
				        	return done(null, false);
				        }
				        break;
				    case 5:
				    	day = "Friday";
				    	  if(!((user.local.fridayStartTime <= time) && (user.local.fridayEndTime > time))){
				        	return done(null, false);
				        }
				    
				        break;
				    case 6:
				        day = "Saturday";
				          if(!((user.local.saturdayStartTime <= time) && (user.local.saturdayEndTime > time))){
				        	return done(null, false);
				        }

  }				//Debugging Statements
 			// 	console.log('Current time ' + new Date().getHours());
				// console.log('Teusday Start Time ' + user.local.tuesdayStartTime);
				// console.log('Teusday End Time ' + user.local.tuesdayEndTime);
				//console.log('User Authenticated! The day is: ' + day);

				return done(null, user);
			});
		})
	}


	));



};