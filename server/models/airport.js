const mongoose = require('mongoose');

const airportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

module.exports = mongoose.model('Airport', airportSchema);
