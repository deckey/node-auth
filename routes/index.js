var express = require('express');
var app = express();
var User = require('../app/models/user');

app.get('/', function (req, res) {
  res.send('Index route');
})

app.post('/create', function (req, res) {
  return createUser(req, res);
})

function createUser(req, res) {
  var newUser = new User({
    name: req.body.name,
    password: req.body.password,
    admin: req.body.admin
  })
  User.findOne({ name: req.body.name }, function (err, user) {
    if (!user) {
      newUser.save(function (err) {
        if (err) throw err;
        res.json({ success: true, msg: 'User ' + req.body.name + ' saved to database' });
      });
    } else {
      res.json({ success: false, msg: 'User ' + req.body.name + ' already exists' });
    }
  });
}

module.exports = app;