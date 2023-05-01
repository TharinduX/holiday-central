import Airline from '../models/Airline.js';

export const getAirline = async (req, res) => {
  try {
    const airline = await Airline.find();
    res.status(200).json(airline);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
