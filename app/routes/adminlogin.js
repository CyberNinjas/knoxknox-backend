
module.exports = function(router, passport){


	 

	 router.get('/', function(req, res) {
	 	res.json("Admin Login");
	 });

	 

	 router.post('/', function(req, res, next){
	 	console.log(req.body);
	 	next();
	 });

	 router.post('/', passport.authenticate('local-login', {
	 	successRedirect: '/usercontrol',
	 	failureRedirect: '/adminlogin/fail'
	 	
	 }));



	 

//Redirect home after logout
	 router.get('/logout', function(req, res){
	 	req.logout();
	 	res.redirect('/');
	 });

	 router.get('/fail', function(req, res){
	 	res.json("Failed!");
	 });

};


	 