(() => {
  'use strict';

  const history = require('../models/history.model');

  module.exports = {
    getHistory,
    createHistory
  };

  async function getHistory(id) {
    try {
      return await history.find({ userId: id });
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
