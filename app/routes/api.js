var restify = require('restify');

//var day = new Date().getDay();

var time = new Date().getHours();

var User  = require('../models/user');

var Slack = require('slack-node');

var payload = '';

removeUser = function(user){
	User.findOneAndRemove({'local.yubiKey': user}, function(err, user){
    		
		});
	};
incrementAttempt = function(user, done){
	user.local.attempts = user.local.attempts + 1;
		user.save(function(err){

			if(err)
				throw err;
			return done(null, user);
		});	
		console.log('Attempts ' + user.local.attempts);

};




var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

//var textStringParser = bodyParser.text();

module.exports =  function(router, passport){
	
	router.get('/', jsonParser, function(req, res){
		res.send('api with restful send!');
	});

	router.post('/', function(req, res, done) {
		User.findOne({'local.yubiKey': req.body.yubiKey}, function(err, user){
			if(!user){
				res.send('[noack]*');
				return done(null, false);
			}
			if((Number(user.local.attempts) >= 2)){
					res.send('[noack]*');
					payload = "<!channel> " + user.local.username + " has reached their maximum failed attempts action needed to re-activate";
					slackNotify(payload, Slack);
					//removeUser(user.local.yubiKey);
					return done(null, false);

				}
			if(!user.checkPIN(req.body.pin)){
				console.log('Access Denied');
				incrementAttempt(user, done);
				
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
				          	payload = "<!channel> " + user.local.username + " is attempting to enter outside of their normal hours.\n They are allowed access from " + user.local.sundayStartTime + " to " + user.local.sundayEndTime;
				          	slackNotify(payload, Slack);
				          	incrementAttempt(user, done);

				        	return done(null, false);
				        }
				        break;
				    case 1:
				        day = "Monday";
				        console.log('In Monday Case. Start tiem = ' + user.local.mondayStartTime + ' End time = ' + user.local.mondayEndTime + ' Current time = ' + time);
				        if(!((user.local.mondayStartTime <= time) && (user.local.mondayEndTime > time))){
				        	res.send('[noack]*');
				        	payload = "<!channel> " + user.local.username + " is attempting to enter outside of their normal hours.\n They are allowed access from " + user.local.mondayStartTime + " to " + user.local.mondayEndTime;
				        	slackNotify(payload, Slack);
				        	incrementAttempt(user, done);

				        	return done(null, false);
				        }
				        break;
				    case 2:
				        day = "Tuesday";
				        console.log('Reached inside Tuesday case');
				        if(!((user.local.tuesdayStartTime <= time) && (user.local.tuesdayEndTime > time))){
				        	res.send('[noack]*');
				        	payload = "<!channel> " + user.local.username + " is attempting to enter outside of their normal hours.\n They are allowed access from " + user.local.tuesdayStartTime + " to " + user.local.tuesdayEndTime;
				        	slackNotify(payload, Slack);
				        	incrementAttempt(user, done);

				        	return done(null, false);
						}
				        break;
				    case 3:
				        day = "Wednesday";
				        if(!((user.local.wednesdayStartTime <= time) && (user.local.wednesdayEndTime > time))){
				        	res.send('[noack]*');
				        	payload = "<!channel> " + user.local.username + " is attempting to enter outside of their normal hours.\n They are allowed access from " + user.local.wednesdayStartTime + " to " + user.local.wednesdayEndTime;
				        	slackNotify(payload, Slack);
				        	incrementAttempt(user, done);

				        	return done(null, false);
				        }
				        break;
				    case 4:
				        day = "Thursday";
				        console.log('Inside Thursday case');
				          if(!((user.local.thursdayStartTime <= time) && (user.local.thursdayEndTime > time))){
				          	res.send('[noack]*');
				          	payload = "<!channel> " + user.local.username + " is attempting to enter outside of their normal hours.\n They are allowed access from " + user.local.thursdayStartTime + " to " + user.local.thursdayEndTime;
				          	slackNotify(payload, Slack);
				          	incrementAttempt(user, done);

				        	return done(null, false);
				        }
				        break;
				    case 5:
				    	day = "Friday";
				    	  if(!((user.local.fridayStartTime <= time) && (user.local.fridayEndTime > time))){
				    	  	res.send('[noack]*');
				    	  	payload = "<!channel> " + user.local.username + " is attempting to enter outside of their normal hours.\n They are allowed access from " + user.local.fridayStartTime + " to " + user.local.fridayEndTime;
				    	  	slackNotify(payload, Slack);
				    	  	incrementAttempt(user, done);

				        	return done(null, false);
				        }
				    
				        break;
				    case 6:
				        day = "Saturday";
				          if(!((user.local.saturdayStartTime <= time) && (user.local.saturdayEndTime > time))){
				          	res.send('[noack]*');
				          	payload = "<!channel> " + user.local.username + " is attempting to enter outside of their normal hours.\n They are allowed access from " + user.local.saturdayStartTime + " to " + user.local.saturdayEndTime;
				          	slackNotify(payload, Slack);
				          	incrementAttempt(user, done);

				        	return done(null, false);
				        }

  }				
  				user.local.attempts = 0;
					user.save(function(err){

						if(err)
							throw err;
						return done(null, user);
					});
					console.log('Attempts ' + user.local.attempts);

				


				payload = user.local.username + " has entered";
				slackNotify(payload, Slack);
				res.send('[ack]*');
				return done(null, user);
			



		});
	});


slackNotify = function(payload, slack){
	//Push notifications to slack
	webhookUri = "https://hooks.slack.com/services/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";

	slack = new Slack();
	slack.setWebhook(webhookUri);

	console.log(payload);
	 
	slack.webhook({
    channel: "#general",
    username: "Knox-Knox Bot",
    text: payload
	}, 
	function(err, response) {
   		console.log(response);
	});


};
  		


  router.get('/:username/:password', function (req, res) {
      var username = req.params.username;
      var password = req.params.password;
      var response = 'Username: ' + username + ' Password: ' + password;
      res.send(response);
   	  
    });
	

};