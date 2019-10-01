(() => {
  'use strict';

  const userController = require('../controllers/user.controller');

  module.exports = app => {
    app.post('/register', userController.create);
    app.post('/login', userController.login);
  };
})();
