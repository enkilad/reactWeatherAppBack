(() => {
  'use strict';

  const User = require('../services/user.service');
  const passport = require('passport');
  const jwt = require('jsonwebtoken');
  require('../config/passport');

  module.exports = {
    create,
    login
  };

  const sendJSONresponse = (res, status, content) => {
    res.status(status);
    res.json(content);
  };

  async function create(req, res, next) {
    try {
      const result = await User.create(req.body);
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
    }
  }

  async function login(req, res, next) {
    passport.authenticate('local', async (err, user, info) => {
      // console.log(user);
      let token;
      let refreshToken;
      let decoded;

      if (err) {
        sendJSONresponse(res, 404, err);
        return;
      }

      if (user) {
        token = user.generateJwt();
        decoded = jwt.decode(token);
        refreshToken = user.generateRefreshJwt();
        user.refreshToken = refreshToken;
        User.update(user);
        sendJSONresponse(res, 200, {
          token: token,
          refreshToken: refreshToken,
          exp: decoded.exp
        });
      } else {
        sendJSONresponse(res, 401, info);
      }
    })(req, res);
  }
})();
