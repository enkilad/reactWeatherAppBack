const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const mongooseHidden = require('mongoose-hidden')();

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 4
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 4
  },
  password: {
    type: String,
    required: true,
    minlength: 4
  }
});

userSchema.plugin(mongooseHidden, { hidden: { _id: false, password: true } });

userSchema.methods.generateJwt = function() {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      exp: parseInt(expiry.getTime() / 1000)
    },
    'comp'
  );
};

userSchema.methods.generateRefreshJwt = () => {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 60);

  return jwt.sign(
    {
      _id: this._id,
      exp: parseInt(expiry.getTime() / 1000)
    },
    'comp'
  );
};

const User = mongoose.model('User', userSchema);

module.exports = User;
