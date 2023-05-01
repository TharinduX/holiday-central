import mongoose from 'mongoose';

const airportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  code: { type: String, required: true },
  country: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

export default mongoose.model('Airport', airportSchema);
