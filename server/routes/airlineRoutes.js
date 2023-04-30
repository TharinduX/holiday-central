const express = require('express');
const { getAirline } = require('../controllers/airlineController');
const router = express.Router();

router.get('/', getAirline);

module.exports = router;
