import express from 'express';
import connect from './database.js';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import airlineRoutes from './routes/airlines.js';
import flightRoutes from './routes/flights.js';
import airportRoutes from './routes/airports.js';
import bookingRoutes from './routes/bookings.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 5000;

app.use(cookieParser());
app.use(cors());
app.use(express.json());

//Agent Routes
app.use('/api/auth', authRoutes);

//Airline Routes
app.use('/api/airlines', airlineRoutes);

//Airport Routes
app.use('/api/airports', airportRoutes);

//Flight Routes
app.use('/api/flights', flightRoutes);

//Booking Routes
app.use('/api/booking', bookingRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

const start = async () => {
  try {
    await connect();
    app.listen(PORT, () =>
      console.log(`Server running on port: http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
