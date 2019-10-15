(() => {
  'use strict';

  const history = require('../models/history.model');

  module.exports = {
    findHistory,
    createHistory
  };

  async function findHistory(query) {
    try {
      return await history.find(query);
    } catch (error) {
      throw error;
    }
  }

  function createHistory(body, id) {
    return history.create({
      city: body.city,
      createdAtTime: new Date(),
      list: body.weatherList,
      userId: id
    });
  }
})();
