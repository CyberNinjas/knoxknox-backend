module.exports =  function(router, passport){
	router.use(function(req, res, next){
		if(req.isAuthenticated()){
	 		return next();
	 	} 
	 	
	 	res.redirect('/adminlogin');
	});

	router.get('/', function(req, res){
		res.json('User Control Page');
	});


	router.post('/', passport.authenticate('addUser', {
		session: false,
		successRedirect: '/usercontrol',
	 	failureRedirect: '/usercontrol/error'

	}));

	


	router.get('/error', function(req, res){
		res.json('Error Creating User')
	});
}



