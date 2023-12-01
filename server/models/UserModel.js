var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
}, {timestamps: true});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel