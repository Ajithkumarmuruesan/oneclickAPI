const mongoose = require('mongoose');

const User = mongoose.model('Users', {
  name:String,
  username: String,
  password: String
});

module.exports = User;