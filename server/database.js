import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

function connect() {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log('Database connected');
    });
}

export default connect;
