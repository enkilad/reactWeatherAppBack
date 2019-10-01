const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../schemas/user.schema');
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    function(username, password, done) {
      User.findOne({ email: username }, async function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, {
            message: 'Incorrect login.'
          });
        }
        try {
          const res = await bcrypt.compare(password, user.password);
          if (!res) {
            return done(null, false, {
              message: 'Incorrect password.'
            });
          } else {
            return done(null, user);
          }
        } catch (error) {
          console.log(error);
        }
      });
    }
  )
);
