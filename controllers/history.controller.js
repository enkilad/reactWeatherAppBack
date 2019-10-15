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
        console.log('Юзер ДО', user);
        const historyObject = {
          city: req.body.city,
          createdAtTime: new Date(),
          list: req.body.list,
          userId: user._id
        };
        console.log('Юзер ПОСЛЕ', user);
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
