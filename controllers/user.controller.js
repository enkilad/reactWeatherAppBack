(() => {
  'use strict';

  const User = require('../services/user.service');
  const passport = require('passport');
  const jwt = require('jsonwebtoken');
  const bcrypt = require('bcrypt');
  require('../config/passport');

  module.exports = {
    create,
    login,
    getUser,
    updateUsername,
    updatePassword
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

  async function getUser(req, res, next) {
    const { _id } = req.payload;
    try {
      const user = await User.get(_id);

      if (user) {
        res.status(200).send(user); // { user }
      } else {
        throw new Error('There is no such user');
      }
    } catch (error) {
      next(error);
    }
  }

  async function updateUsername(req, res, next) {
    const { _id } = req.payload;
    try {
      const user = await User.get(_id);
      if (user) {
        if (user.username == req.body.newUsername) {
          console.log(user.username);
          console.log('req.body', req.body);
          throw new Error('newUsername = currentUsername');
        } else {
          user.username = req.body.newUsername;
        }
      }
      await user.save();
      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  }

  async function updatePassword(req, res, next) {
    const { _id } = req.payload;
    const { currentPassword, newPassword } = req.body;
    try {
      const user = await User.get(_id);
      if (user) {
        const res = bcrypt.compare(currentPassword, user.password);
        if (res) {
          user.password = await bcrypt.hash(newPassword, 10);
        } else {
          throw new Error('Bad update request!');
        }
      }
      await user.save();
      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  }
})();
