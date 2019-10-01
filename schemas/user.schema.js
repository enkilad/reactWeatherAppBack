const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 6
  },
  email: {
    type: String,
    required: true,
    minlength: 6
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
