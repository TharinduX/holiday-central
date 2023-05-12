import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema(
  {
    flight_number: { type: String, required: true },
    departure_destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Airport',
      required: true,
    },
    arrival_destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Airport',
      required: true,
    },
    departure_date: { type: Date, required: true },
    arrival_date: { type: Date, required: true },
    departure_time: { type: Date, required: true },
    arrival_time: { type: Date, required: true },
    available_seats: { type: Number, required: true },
    isDirect: { type: Boolean, required: true },
    stops: { type: Array },
    transit_time: { type: Number },
    isReturn: { type: Boolean, required: true },
    cabin_class_avaialble: { type: Array, required: true },
    airline: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Airline',
      required: true,
    },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    total_duration: { type: Number },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model('Flight', flightSchema);
