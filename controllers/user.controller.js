(() => {
  'use strict';

  const User = require('../services/user.service');
  const passport = require('passport');
  const jwt = require('jsonwebtoken');
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
      const user = await User.get({ _id });
      // console.log(user[0].username);

      if (user) {
        // user[0]
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
      const user = await User.get({ _id });
      if (user && user[0]) {
        if (user[0].username === req.payload.newUsername) {
          console.log(user[0].username);
          console.log('req.payload', req.payload);
          throw new Error('newUsername = currentUsername');
        } else {
          user[0].username = req.payload.newUsername;
        }
      }
      await user[0].save();
      res.status(200).send(user[0]);
    } catch (err) {
      next(err);
    }
  }

  async function updatePassword(req, res, next) {
    const { _id } = req.payload;
    try {
      const user = await User.get({ _id });
      if (user) {
        if (user.password === req.payload.currentPassword) {
          throw new Error('newPassword = currentPassword');
        } else {
          user.password = req.payload.newPassword;
        }
      }
      await user.save();
      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  }

  // async function updateUserData(req, res, next) {
  //   try {
  //     if (req.userId) {
  //       const user = await UserService.findUsers({ _id: req.userId });

  //       if (user) {
  //         if (req.body.username) {
  //           user[0].username = req.body.username;
  //         }
  //         if (req.body.password) {
  //           const hashPassword = CheckPassword._generateHash(req.body.password);
  //           user[0].password = hashPassword;
  //         }
  //         await user[0].save();

  //         res.status(200).send(user[0]);
  //       } else {
  //         throw new Error('user not found');
  //       }
  //     } else {
  //       throw new Error('bad auth token');
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }
})();
