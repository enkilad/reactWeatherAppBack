(() => {
  'use strict';

  const jwt = require('express-jwt');
  const userController = require('../controllers/user.controller');

  const auth = jwt({
    secret: 'comp',
    userProperty: 'payload'
  });

  module.exports = app => {
    app.post('/register', userController.create);
    app.post('/login', userController.login);

    app.get('/user', auth, userController.getUser);
  };
})();
