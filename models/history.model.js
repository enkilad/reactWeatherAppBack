const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  city: String,
  createdAtTime: String,
  list: Array,
  userId: String
});

module.exports = mongoose.model('history', historySchema);
