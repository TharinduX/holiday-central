import Flight from '../models/Flight.js';

export const addFlight = async (req, res, next) => {
  try {
    const flight = await Flight.create(req.body);
    res.status(200).json(flight);
  } catch (err) {
    next(err);
  }
};

export const getFlights = async (req, res, next) => {
  try {
    const flights = await Flight.find()
      .populate('airline')
      .populate('departure_destination')
      .populate('arrival_destination');
    res.status(200).json(flights);
  } catch (err) {
    next(err);
  }
};
