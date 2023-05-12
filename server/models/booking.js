import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  agent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  c_first_name: { type: String, required: true },
  c_last_name: { type: String, required: true },
  c_email: { type: String, required: true },
  c_phone: { type: String, required: true },
  meal_preference: { type: String, required: true },
  seat_preference: { type: String, required: true },
  passengers: { type: Number, required: true },
  total: { type: Number, required: true },
  booking_type: { type: String, required: true },
  booking_date: { type: Date, required: true },
  flight_booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
});

export default mongoose.model('Booking', bookingSchema);
