const Agent = require('../models/Agent');

const addAgent = async (req, res) => {
  try {
    const agent = await Agent.create(req.body);
    res.status(200).json(agent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addAgent };
