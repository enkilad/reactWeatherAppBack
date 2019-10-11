const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  // formatted_address: String,
  // date: String,
  // weather: {
  //   dt_txt: String,
  //   temp: String,
  //   description: String
  // },
  city: String,
  createdAtTime: String,
  list: String,
  userId: String
});

module.exports = mongoose.model('history', historySchema);
