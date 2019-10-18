(() => {
  'use strict';

  const History = require('../services/history.service');

  function createHistory(req, res) {
    Promise.resolve()
      .then(() => History.createHistory(req.body, req.payload._id))
      .then(history => {
        res.status(200).send(history);
      })
      .catch(err => console.log(err));
  }

  function getHistory(req, res) {
    Promise.resolve()
      .then(() => History.getHistory(req.payload._id))
      .then(history => {
        res.status(200).send(history);
      })
      .catch(err => console.log(err));
  }

  module.exports = {
    createHistory: createHistory,
    getHistory: getHistory
  };
})();
