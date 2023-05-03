import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema(
  {
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
    stops: { type: Array },
    transit_time: { type: Number },
    isReturn: { type: Boolean, required: true },
    cabin_class: { type: String, required: true },
    airline: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Airline',
      required: true,
    },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false }
);
export default mongoose.model('Flight', flightSchema);
