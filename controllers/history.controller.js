(() => {
  'use strict';

  const User = require('../services/user.service');
  const History = require('../services/history.service');

  function createHistory(req, res) {
    Promise.resolve()
      .then(() => {
        return User.get({
          _id: req.body.user.id
        });
      })
      .then(user => {
        const historyObject = {
          city: req.body.data.city,
          createdAtTime: new Date(),
          list: req.body.data.list,
          userId: user[0]._id
        };
        return History.createHistory(historyObject);
      })
      .then(response => {
        res.status(200).send(response);
        return;
      });
  }

  function getHistory(req, res) {
    console.log(User, User.get);
    Promise.resolve()
      .then(() => {
        return User.get({
          _id: req.body.user.id // _id: req.query.user.id
        });
      })
      .then(user => {
        console.log(user);
        return History.findHistory({ userId: user[0]._id });
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
