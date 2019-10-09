(function() {
  'use strict';

  const historyController = require('../controllers/history.controller');

  module.exports = app => {
    app.get('/history', historyController.getHistory);
    app.post('/history', historyController.createHistory);
  };
})();
