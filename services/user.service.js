(() => {
  'use strict';

  const User = require('../models/user.model');
  const bcrypt = require('bcrypt');

  const saltRounds = 10;

  module.exports = {
    create,
    get,
    update
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
      bcrypt.hash(data.password, saltRounds, function(err, hash) {
        data.password = hash;
        User.create(data, (err, newUser) => {
          if (err) return reject(err);
          resolve(newUser);
        });
      });
    });
  }

  function update(data) {
    return new Promise((resolve, reject) => {
      User.updateOne({ _id: data.id }, data).then((err, updatedUser) => {
        if (err) return reject(err);
        updatedUser(user);
      });
    });
  }
})();
