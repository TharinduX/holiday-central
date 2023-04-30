const mongoose = require('mongoose');
require('dotenv').config();

function connect() {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log('Database connected');
    });
}

module.exports = connect;
