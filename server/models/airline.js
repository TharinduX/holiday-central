const mongoose = require('mongoose');

const airlineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logo: { type: String, required: true },
  },
  { _id: false }
);

module.exports = mongoose.model('Airline', airlineSchema);
