var User  = require('../models/user');


module.exports =  function(router, passport){
	router.use(function(req, res, next){
		if(req.isAuthenticated()){
	 		return next();
	 	} 
	 	
	 	res.redirect('/adminlogin');
	});

	router.get('/', function(req, res) {
	    User.find({}, function(err, users) {
	    var userMap = {};

	    users.forEach(function(user) {
	       userMap[user.local.username] = user.local.yubiKey;

	    });

	    res.send(userMap);  
	    });
	  });

	router.delete('/', function(req, res){
		User.findOneAndRemove(req.body.yubiKey, function(err, user){
			var response = {
        		message: "User removed",
        		yubikey: user.local.yubiKey
    		};
    		res.send(response);
    		//res.redirect('/')
		});
	});

	


	router.post('/', passport.authenticate('addUser', {
		session: false,
		successRedirect: '/usercontrol',
	 	failureRedirect: '/usercontrol/error'

	}));

	


	router.get('/error', function(req, res){
		res.json('Error Creating User')
	});


};



