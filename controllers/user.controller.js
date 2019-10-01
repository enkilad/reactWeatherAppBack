(() => {
  'use strict';

  const User = require('../models/user.model');

  module.exports = {
    create
  };

  async function create(req, res, next) {
    try {
      console.log('test');
      console.log('req.body', req.body);
      const result = await User.create(req.body);
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
    }
  }
})();
