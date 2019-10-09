const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  address: String,
  date: String,
  weather: {
    dt_txt: String,
    temp: String,
    description: String
  }
});

module.exports = mongoose.model('history', historySchema);