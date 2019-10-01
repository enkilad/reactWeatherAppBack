(() => {
  'use strict';

  const User = require('../schemas/user.schema');

  module.exports = {
    create,
    get
  };

  function get(query) {
    try {
      return User.find(query); // query = { email: 'test@mail.ru'}
    } catch (err) {
      console.log(err);
    }
  }

  function create(data) {
    return new Promise((resolve, reject) => {
      User.create(data, (err, newUser) => {
        if (err) return reject(err);
        resolve(newUser);
      });
    });
  }
})();
