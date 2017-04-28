//Redirect to Admin login if user tries to access home
module.exports =  function(router, passport){



router.get('/', function(req, res){
	res.redirect('/adminlogin');
});

};