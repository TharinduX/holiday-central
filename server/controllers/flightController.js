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

export const getFlight = async (req, res, next) => {
  try {
    const flights = await Flight.findById(req.params.id);
    res.status(200).json(flights);
  } catch (err) {
    next(err);
  }
};

export const searchFlights = async (req, res, next) => {
  try {
    const departureDate = req.query.departure_date;
    const arrivalDate = req.query.arrival_date;
    const seats = req.query.pax;
    const flights = await Flight.find({
      departure_destination: req.query.from,
      arrival_destination: req.query.to,
      $and: [
        { departure_date: { $gte: new Date(departureDate).toISOString() } },
        { arrival_date: { $lte: new Date(arrivalDate).toISOString() } },
      ],
      available_seats: { $gte: parseInt(seats) },
    })
      .populate('airline')
      .populate('departure_destination')
      .populate('arrival_destination');
    res.status(200).json(flights);
  } catch (err) {
    next(err);
  }
};
