const mongoose = require('mongoose');

const airlineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  airline_id: { type: String, required: true },
});

module.exports = mongoose.model('Airline', airlineSchema);
