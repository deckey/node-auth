var express = require('express');
var app = express();
var User = require('../app/models/user');
var jwt = require('jsonwebtoken');

// authentication route
app.post('/auth', function (req, res) {
  // find User
  User.findOne({ name: req.body.name }, function (err, user) {
    if (err) {
      return res.json({ error: err });
    };
    // no user in db
    if (!user) {
      return res.json({ success: false, msg: 'No user found in database' });
    }
    if (user) {
      // check password
      if (user.password != req.body.password) {
        return res.json({ success: false, msg: 'Invalid password' });
      }
      // all ok, user exists and passwords match
      // create token
      var token = jwt.sign(user, app.get('nodejwtauth'));
      res.json({success: true, msg: 'Authenticated succesfully!', token:token });
    }
  });
});

// api routes middleware
app.use(function (req, res, next) {
  var token = req.body.token || req.headers['x-access-token'];
  //decode token
  if (token) {
    jwt.verify(token, app.get('nodejwtauth'), function (err, decoded) {
      if (err) {
        return res.json({ success: false, msg: 'Failed to auth token!' });
      } else {
        req.decoded = decoded;
        next();
      }
    })
  }else{
    // no token
    return res.status(403).send({success: false, msg: 'No token provided'});
  }
})


// main api route
app.get('/', function (req, res) {
  res.json({ msg: 'Main API route' });
})

app.get('/users', function (req, res) {
  User.find({}, function (err, users) {
    res.json(users);
  })
})


module.exports = app;