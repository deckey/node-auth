var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var config = require('./config');
var User = require('./app/models/user');

var port = process.env.PORT || 3000;
mongoose.connect(config.db, function (err) {
  if (err) throw err;
  console.log('Connected to database');
});

server.set('nodejwtauth', config.secret);

// body parser for forms, POST and URL parameters
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// logging 
server.use(morgan('dev'));

// routes
var index = require('./routes/index');
server.use('/', index);
var api = require('./routes/api');
server.use('/api', api);

server.listen(port, function () {
  console.log('Express server running on port: ', port);
})
