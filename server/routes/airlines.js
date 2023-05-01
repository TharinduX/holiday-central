import express from 'express';
import { getAirline } from '../controllers/airlineController.js';
const router = express.Router();

router.get('/', getAirline);

export default router;
