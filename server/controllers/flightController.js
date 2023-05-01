import Flight from '../models/Flight.js';

export const addFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(200).json(flight);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getFlights = async (req, res) => {};
