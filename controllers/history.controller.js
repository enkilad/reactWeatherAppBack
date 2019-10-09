(() => {
  'use strict';

  const User = require('../models/user.model');
  const History = require('../models/history.model');

  function createHistory(req, res) {
    Promise.resolve()
      .then(() => {
        return User.get({
          _id: req.user.id
        });
      })
      .then(user => {
        const historyObject = {
          city: req.body.data.city,
          createdAtTime: new Date(),
          list: req.body.data.list,
          userId: user[0]._id
        };
        return History.create(historyObject);
      })
      .then(response => {
        res.status(200).send(response);
        return;
      });
  }

  function getHistory(req, res) {
    Promise.resolve()
      .then(() => {
        return User.get({
          _id: req.user.id
        });
      })
      .then(user => {
        return History.get({ userId: user[0]._id });
      })
      .then(response => {
        res.status(200).send(response);
        return;
      });
  }

  module.exports = {
    createHistory: createHistory,
    getHistory: getHistory
  };
})();
