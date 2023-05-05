import Airport from '../models/Airport.js';

export const getAllAirports = async (req, res, next) => {
  try {
    const airport = await Airport.find();
    res.status(200).json(airport);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const createAirport = async (req, res) => {
  const airport = req.body;
  const newAirport = new Airport(airport);
  try {
    await newAirport.save();
    res.status(201).json(newAirport);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getOneAirPort = async (req, res, next) => {
  try {
    const airport = await Airport.findById(req.params.id);
    res.status(200).json(airline);
  } catch (err) {
    next(err);
  }
};

export  const deleteAirPort   = async (req, res, next) => {
  try {
    const airportId = req.params.id;
    const airport = await Airport.findByIdAndDelete(airportId);
    if (!airport) {
      return res.status(404).json({ message: 'Airport not found' });
    }
    res.status(200).json({ message: 'Airport deleted', data: airline });
  } catch (err) {
    next(err);
  }
};

export const updateAirPort  = async (req, res, next) => {
  try {
    const { id } = req.params;
    const airport = await Airport.findByIdAndUpdate(id, req.body,{ new: true });
    if (!airport) {
      return res.status(404).json({ message: 'Airport not found' });
    }
    res.status(200).json(airline);
  } catch (err) {
    next(err);
  }
};
