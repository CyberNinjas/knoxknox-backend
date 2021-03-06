var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var cookieParser = require('cookie-parser');
var expressSession = require('express-Session');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var dbConfig = require('./config/database.js');


//connect to database. Easy to change DB URL
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url);
module.exports.User = require("./app/models/user");
require('./config/passport')(passport);



app.use(morgan('dev'));
app.use(cookieParser());
app.use(expressSession({secret: 'zentornog&b ', saveUninitialized: true, resave: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());




app.set('view engine', 'ejs');

//Seperate files for each route
var admin = express.Router();
require('./app/routes/adminlogin')(admin, passport);
app.use('/adminlogin', admin);

var usercontrol = express.Router();
require('./app/routes/usercontrol')(usercontrol, passport);
app.use('/usercontrol', usercontrol); 

var api = express.Router();
require('./app/routes/api')(api, passport);
app.use('/api', api);

var home = express.Router();
require('./app/routes/home')(home, passport);
app.use('/', home);





app.listen(port);
console.log('Server Running');