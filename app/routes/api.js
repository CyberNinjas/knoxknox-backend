var restify = require('restify');

var day = new Date().getDay();

var time = new Date().getHours();


module.exports =  function(router, passport){

    router.get('/', function(req, res){
        res.send('api with restful send!');
    });


    // router.post('/',  passport.authenticate('apiCheck',  {
    //         session: false,
    //         failureRedirect: '/api/denied'
    //
    //
    //     }),
    //     function(req, res){
    //         res.json('Authenticated!');
    //     });

    router.post('/', function(req, res){
       res.send(req.body);
    });


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