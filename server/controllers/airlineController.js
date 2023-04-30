const Airline = require('../models/airline');

const getAirline = async (req, res) => {
  try {
    const airline = await Airline.find();
    res.status(200).json(airline);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAirline };
