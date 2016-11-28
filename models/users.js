/**
 * this code block use mongolass
 */


var User = require('../lib/mongo').User;

module.exports = {
  // 注册一个用户
  create: function create(user) {
    return User.create(user).exec();
  }
}


// ------------------------------------------------------------------

/**
 * change it into mongoose
 */

/*
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  name: String,
  password: String
})

var User = mongoose.model('User', UserSchema);

module.exports = User;
*/