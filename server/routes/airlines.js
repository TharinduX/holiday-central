import express from 'express';
import { getAirline } from '../controllers/airlineController.js';
import { createAirline } from '../controllers/airlineController.js';
const router = express.Router();

router.get('/', getAirline);
router.post('/', createAirline);

export default router;
