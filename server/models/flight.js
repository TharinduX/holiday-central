const mongoose = require('mongoose');
const airlineSchema = require('./airline').schema;

const flightSchema = new mongoose.Schema(
  {
    departure_destination: { type: String, required: true },
    arrival_destination: { type: String, required: true },
    departure_date: { type: Date, required: true },
    arrival_date: { type: Date, required: true },
    departure_time: { type: Date, required: true },
    arrival_time: { type: Date, required: true },
    stops: { type: Array },
    transit_time: { type: Number },
    isReturn: { type: Boolean, required: true },
    cabin_class: { type: String, required: true },
    airline: airlineSchema,
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Flight', flightSchema);
