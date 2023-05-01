import express from 'express';
import { addFlight } from '../controllers/flightController.js';
const router = express.Router();

router.post('/', addFlight);

export default router;
