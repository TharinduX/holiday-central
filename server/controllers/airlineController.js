import Airline from '../models/Airline.js';

export const getAirline = async (req, res, next) => {
  try {
    const airline = await Airline.find();
    res.status(200).json(airline);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const createAirline = async (req, res) => {
  const airline = req.body;
  const newAirline = new Airline(airline);
  try {
    await newAirline.save();
    res.status(201).json(newAirline);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getOneAirLine = async (req, res, next) => {
  try {
    const airline = await Airline.findById(req.params.id);
    res.status(200).json(airline);
  } catch (err) {
    next(err);
  }
};

export  const deleteAirline  = async (req, res, next) => {
  try {
    const airlineId = req.params.id;
    const airline = await Airline.findByIdAndDelete(airlineId);
    if (!airline) {
      return res.status(404).json({ message: 'Airline not found' });
    }
    res.status(200).json({ message: 'Airline deleted', data: airline });
  } catch (err) {
    next(err);
  }
};

export const updateAirline  = async (req, res, next) => {
  try {
    const { id } = req.params;
    const airline = await Airline.findByIdAndUpdate(id, req.body,{ new: true });
    if (!airline) {
      return res.status(404).json({ message: 'Airline not found' });
    }
    res.status(200).json(airline);
  } catch (err) {
    next(err);
  }
};
