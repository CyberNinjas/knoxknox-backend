var User  = require('../models/user');

//Redirect to admin login if admin is not logged in
module.exports =  function(router, passport){
	// router.use(function(req, res, next){
	// 	if(req.isAuthenticated()){
	//  		return next();
	//  	}
	//
	//  	res.redirect('/adminlogin');
	// });
//List all useres and their assigned yubiKey ID
	router.get('/', function(req, res) {
	    User.find({}, function(err, users) {
	    var userMap = {};

	    users.forEach(function(user) {
	       userMap[user.local.username] = user.local.yubiKey;

	    });

	    res.send(userMap);  
	    });
	  });

	//Delete specified user based on yubiKey ID

	router.delete('/', function(req, res){
		User.findOneAndRemove({'local.yubiKey': req.body.yubiKey}, function(err, user){

    		res.redirect('/usercontrol')
		});
	});

	


	
//Can only add new admin if a current admin is logged in

 router.post('/signup', passport.authenticate('addAdmin', {
	 	successRedirect: '/usercontrol',
	 	failureRedirect: '/adminlogin/fail'
	 	
	 }));
	 // router.post('/signup', function(req, res, done){
	 // 	process.nextTick(function(){
	 // 	User.findOne({'admin.username' : req.body.username}, function(err, user){
		// 		if(err)
		// 			return done(err);
		// 		if(user){
		// 			console.log('Not finding user');
		// 			return done(null, false);
		// 		} else {
		// 			var newUser = new User();
		// 			newUser.admin.username = req.body.username;
		// 			newUser.admin.password = newUser.hashPassword(req.body.password);
		// 			newUser.save(function(err){
		// 				if(err)
		// 					throw err;
		// 				return done(null, newUser);
		// 			})
		// 		}
		// 	})
	 // 	res.json('User Created');
	 // });
	 // });




	router.post('/', passport.authenticate('addUser', {
		session: false,
		successRedirect: '/usercontrol',
	 	failureRedirect: '/usercontrol/error'

	}));

	


	router.get('/error', function(req, res){
		res.json('Error Creating User')
	});


};



