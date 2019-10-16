(() => {
  'use strict';

  const jwt = require('express-jwt');
  const historyController = require('../controllers/history.controller');

  const auth = jwt({
    secret: 'comp',
    userProperty: 'payload'
  });

  module.exports = app => {
    app.get('/history', auth, historyController.getHistory);
    app.post('/history', auth, historyController.createHistory);
  };
})();
