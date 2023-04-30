const express = require('express');
const connect = require('./database');
const cors = require('cors');
const bodyParser = require('body-parser');
const agentRoutes = require('./routes/agentRoutes');
const airlineRoutes = require('./routes/airlineRoutes');
const flightRoutes = require('./routes/flightRoutes');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

//Agent Routes
app.use('/api/agents', agentRoutes);

//Airline Routes
app.use('/api/airlines', airlineRoutes);

//Flight Routes
app.use('/api/flights', flightRoutes);

const start = async () => {
  try {
    await connect();
    app.listen(PORT, () =>
      console.log(`Server running on port: http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
