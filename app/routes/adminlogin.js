//var User = require('./models/user');
//var express = require('express');

var path = require('path');



module.exports = function(router, passport){


	 

	 router.get('/', function(req, res) {
	 	res.json("Admin Login");
	 	//res.sendFile(path.join( __dirname, '../public', 'Login.html' ));	
	 });

	 

	 // router.post('/', function(req, res, next){
	 // 	console.log(req.body);
	 // 	next();
	 // });

	 router.post('/', passport.authenticate('local-login', {
	 	successRedirect: '/usercontrol',
	 	failureRedirect: '/adminlogin/fail',
	 	
	 }));

	 router.get('/signup', function(req, res){
	 	res.json('SignupPage')
	 });

	 router.post('/signup', passport.authenticate('addAdmin', {
	 	successRedirect: '/',
	 	failureRedirect: '/adminlogin/fail',
	 	failureFlash: true
	 }));


	 

//Redirect home after logout
	 router.get('/logout', function(req, res){
	 	req.logout();
	 	res.redirect('/');
	 })

	 router.get('/fail', function(req, res){
	 	res.json("Failed!");
	 });

};


	 