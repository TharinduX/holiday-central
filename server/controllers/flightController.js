import Flight from '../models/Flight.js';

export const addFlight = async (req, res, next) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(200).json(flight);
  } catch (err) {
    next(err);
  }
};

export const getFlights = async (req, res) => {};
