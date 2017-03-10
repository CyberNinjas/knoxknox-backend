var express = require('express');
var router = express.Router();

var User = require('../users/users');

User.methods(['get', 'put', 'post', 'delete']);
User.register(router, '/users');


module.exports = router;