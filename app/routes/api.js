module.exports =  function(router, passport){
	
	router.get('/', function(req, res){
		res.json('api!')
	});

	
	router.post('/',  passport.authenticate('basic',  {
		session: false,
		failureRedirect: '/api/denied'
		
	 	
	 }),
	function(req, res){
		res.json('Authenticated!');
	});




	router.get('/authenticated', passport.authenticate('basic',  {session: false}), function(req, res){
		// if(!req.isAuthenticated())
		// 	res.redirect('/api/potato')
		res.json('Authenticated!')
	});	


	router.get('/denied', function(req, res){
		res.json('Denied!');
	});	


	

}