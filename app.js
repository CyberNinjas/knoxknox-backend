var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/knox-knox-users');

var app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use('/api', require('./routes/restAPI'));


app.listen(3000);
console.log("API is running");
