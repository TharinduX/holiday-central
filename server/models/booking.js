import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  agent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  booking_type: { type: String, required: true },
  booking_date: { type: Date, required: true },
  flight_booking_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
});

export default mongoose.model('Booking', bookingSchema);
