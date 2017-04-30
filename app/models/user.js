// make mongoose Schema instance
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//export User model
module.exports = mongoose.model('User', new Schema({
  name: String,
  password: String,
  admin: Boolean
}));