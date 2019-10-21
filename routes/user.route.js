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
    // app.post('/updateUsername', auth, userController.updateUsername);
    // app.post('/updatePassword', auth, userController.updatePassword);

    app.get('/user', auth, userController.getUser);
  };
})();
