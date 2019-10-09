(() => {
  'use strict';

  // const config = require('./config/constants');
  const app = require('../app');
  const history = app.main.model('history');

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
      const history = await history.create(historyParams);

      return history;
    } catch (e) {
      throw e;
    }
  }
})();
