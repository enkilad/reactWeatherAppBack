(() => {
  'use strict';

  const User = require('../services/user.service');
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

  // function getHistory(req, res) {
  //   console.log(User, User.get);
  //   Promise.resolve()
  //     .then(() => {
  //       return User.get({
  //         _id: req.payload.id // _id: req.query.user.id
  //       });
  //     })
  //     .then(user => {
  //       console.log(user);
  //       return History.findHistory({ user_id: id });
  //     })
  //     .then(response => {
  //       res.status(200).send(response);
  //       return;
  //     });
  // }

  module.exports = {
    createHistory: createHistory,
    getHistory: getHistory
  };
})();
