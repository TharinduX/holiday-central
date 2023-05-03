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
