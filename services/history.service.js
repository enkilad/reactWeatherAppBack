(() => {
  'use strict';

  // const config = require('./config/constants');
  // const app = require('../app');
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

  async function createHistory(historyParams) {
    try {
      const history2 = await history.create(historyParams);

      return history2;
    } catch (e) {
      throw e;
    }
  }
})();
