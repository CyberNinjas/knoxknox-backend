var restify = require('restify');

var day = new Date().getDay();

var time = new Date().getHours();

var User  = require('../models/user');

var Slack = require('slack-node');




var bodyParser = require('body-parser');


var jsonParser = bodyParser.json();

//var textStringParser = bodyParser.text();

module.exports =  function(router, passport){
	
	router.get('/', function(req, res){
		res.send('api with restful send!');
	});

 	// router.post('/', textStringParser, function(req, res){
  //       res.send(' Length: ' + req.get('Content-Length') + ' Content-Type: ' + req.get('Content-Type') + 'Payload: ' + req.body);



  //   });


	router.post('/', jsonParser, function(req, res, done) {
		User.findOne({'local.yubiKey': req.body.yubiKey}, function(err, user){
			if(!user){
				res.send('[noack]*');
				return done(null, false);
			}
			if(!user.checkPIN(req.body.pin)){
				console.log('Access Denied');
				res.send('[noack]*');
				return done(null, false);
					
				}
			    var time = Number(new Date().getHours());
				var day = String;

				switch (new Date().getDay()) {
				    case 0:
				        day = "Sunday";
				          if(!((user.local.sundayStartTime <= time) && (user.local.sundayEndTime > time))){
				          	res.send('[noack]*');
				        	return done(null, false);
				        }
				        break;
				    case 1:
				        day = "Monday";
				        console.log('In Monday Case. Start tiem = ' + user.local.mondayStartTime + ' End time = ' + user.local.mondayEndTime + ' Current time = ' + time);
				        if(!((user.local.mondayStartTime <= time) && (user.local.mondayEndTime > time))){
				        	res.send('[noack]*');
				        	return done(null, false);
				        }
				        break;
				    case 2:
				        day = "Tuesday";
				        console.log('Reached inside Tuesday case');
				        if(!((user.local.tuesdayStartTime <= time) && (user.local.tuesdayEndTime > time))){
				        	res.send('[noack]*');
				        	return done(null, false);
						}
				        break;
				    case 3:
				        day = "Wednesday";
				        if(!((user.local.wednesdayStartTime <= time) && (user.local.wednesdayEndTime > time))){
				        	res.send('[noack]*');
				        	return done(null, false);
				        }
				        break;
				    case 4:
				        day = "Thursday";
				        console.log('Inside Thursday case');
				          if(!((user.local.thursdayStartTime <= time) && (user.local.thursdayEndTime > time))){
				          	res.send('[noack]*');
				        	return done(null, false);
				        }
				        break;
				    case 5:
				    	day = "Friday";
				    	  if(!((user.local.fridayStartTime <= time) && (user.local.fridayEndTime > time))){
				    	  	res.send('[noack]*');
				        	return done(null, false);
				        }
				    
				        break;
				    case 6:
				        day = "Saturday";
				          if(!((user.local.saturdayStartTime <= time) && (user.local.saturdayEndTime > time))){
				          	res.send('[noack]*');
				        	return done(null, false);
				        }

  }				


  			//Push notifications to slack
  			webhookUri = "https://hooks.slack.com/services/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";
 
			slack = new Slack();
			slack.setWebhook(webhookUri);

			var payload = user.local.username + " has entered";
			console.log(payload);
			 
			slack.webhook({
		    channel: "#general",
		    username: "Knox-Knox Bot",
		    text: payload
			}, 
			function(err, response) {
		   		console.log(response);
			});
 
			
  				//Debugging Statements
 			// 	console.log('Current time ' + new Date().getHours());
				 //console.log('Teusday Start Time ' + user.local.yubiKey);
				// console.log('Teusday End Time ' + user.local.tuesdayEndTime);
				//console.log('User Authenticated! The day is: ' + day);
				res.send('[ack]*');
				return done(null, user);
			



		});
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