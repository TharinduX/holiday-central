import express from 'express';
import { getAllAirports } from '../controllers/aitportController.js';
import { createAirport } from '../controllers/aitportController.js';

const router = express.Router();

router.get('/', getAllAirports);
router.post('/', createAirport);

export default router;
