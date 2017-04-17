var restify = require('restify');

var day = new Date().getDay();

var time = new Date().getHours();


//var bodyParser = require('body-parser');


//var jsonParser = bodyParser.json();


module.exports =  function(router, passport){

    router.get('/', function(req, res){
        res.send('api with restful send!');
    });

    router.post('/', function(req, res){
        res.send(req.body);
    });

    // router.post('/', function(req, res, next) {
    //  		passport.authenticate('apiCheck', function(req, err, user, info) {
    //  			console.print(req.body);
    // 	    if (err) {
    // 	      return next(err); // will generate a 500 error
    // 	    }
    // 	    // Generate a JSON response reflecting authentication status
    // 	    if (! user) {
    // 	      return res.send('Denied! Data from arduino: ' + data);
    // 	    }

    // 	      return res.send('Authenticated! Data from arduino: ' + data);

    // 	  })(req, res, next);
    // 	});


    router.get('/:username/:password', function (req, res) {
        var username = req.params.username;
        var password = req.params.password;
        var response = 'Username: ' + username + ' Password: ' + password;
        res.send(response);

    });




    router.get('/authenticated', passport.authenticate('basic',  {session: false}), function(req, res){
        // if(!req.isAuthenticated())
        // 	res.redirect('/api/potato')
        res.json('Authenticated!')
    });


    router.get('/denied', function(req, res){
        res.json('Denied! The day is ' + day + ' The hour is ' + time);
    });




};