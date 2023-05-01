import mongoose from 'mongoose';

const airlineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logo: { type: String, required: true },
  },
  { _id: false }
);

export default mongoose.model('Airline', airlineSchema);
