let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let User = require('../models/users');
let md5 = require('md5');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    function(username, password, done) {
      User.findOne({ email: username }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: 'Incorrect login.'
          });
        }
        if (user.password !== md5(password)) {
          return done(null, false, {
            message: 'Incorrect password.'
          });
        }
        return done(null, user);
      });
    }
  )
);
