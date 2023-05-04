import { query } from 'express';
import Flight from '../models/Flight.js';

export const addFlight = async (req, res, next) => {
  try {
    const flight = await Flight.create({
      total_duration: req.body.duration + req.body.transit_time,
      ...req.body,
    });
    res.status(200).json(flight);
  } catch (err) {
    next(err);
  }
};

export const getFlights = async (req, res, next) => {
  const query = {};
  const sort = {};

  if (req.query.sortBy) {
    const str = req.query.sortBy.split(':');
    sort[str[0]] = str[1] === 'desc' ? -1 : 1;
  }

  if (req.query.airline && req.query.airline !== 'all') {
    query.airline = req.query.airline;
  }

  if (req.query.from) {
    query.departure_destination = req.query.from;
  }

  if (req.query.to) {
    query.arrival_destination = req.query.to;
  }

  if (req.query.departure_date) {
    query.departure_date = { $gte: req.query.departure_date };
  }

  if (req.query.arrival_date) {
    query.arrival_date = { $lte: req.query.arrival_date };
  }

  if (req.query.pax) {
    query.available_seats = { $gte: req.query.pax };
  }

  if (req.query.isDirect && req.query.isDirect !== 'all') {
    query.isDirect = req.query.isDirect;
  }

  if (req.query.isReturn && req.query.isReturn !== 'all') {
    query.isReturn = req.query.isReturn;
  }

  if (req.query.class && req.query.class !== 'all') {
    query.cabin_class_avaialble = {
      $in: req.query.class.toLowerCase().split(','),
    };
  }

  if (req.query.duration) {
    query.total_duration = { $lte: req.query.duration };
  }

  try {
    const flights = await Flight.find(query)
      .limit(req.query.limit || 0)
      .skip(req.query.skip || 0)
      .sort(req.query.sort || sort)
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
    const flights = await Flight.findById(req.params.id)
    .populate('airline')
    .populate('departure_destination')
    .populate('arrival_destination');
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

export  const deleteFlight = async (req, res, next) => {
  try {
    const flightId = req.params.id;
    const flight = await Flight.findByIdAndDelete(flightId);

    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }

    res.status(200).json({ message: 'Flight deleted', data: flight });
  } catch (err) {
    next(err);
  }
};

export const updateFlight = async (req, res, next) => {
  try {
    console.log(req);
    const { id } = req.params;
    const flight = await Flight.findByIdAndUpdate(id, req.body,{ new: true });
    if (!flight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.status(200).json(flight);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
