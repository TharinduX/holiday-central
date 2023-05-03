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
