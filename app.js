const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config/constants');

app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes/user.route')(app);

mongoose.connect(
  config.mongoURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  err => {
    if (err) return console.log(err);
    // app.listen(config.port, () => {
    //   console.log(`App listening on port ${config.port}!`);
    // });
  }
);

module.exports = app;
