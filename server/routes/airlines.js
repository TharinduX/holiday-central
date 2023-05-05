import express from 'express';
import { getAirline } from '../controllers/airlineController.js';
import { createAirline, getOneAirLine, deleteAirline, updateAirline } from '../controllers/airlineController.js';
const router = express.Router();

router.get('/', getAirline);
router.post('/', createAirline);
router.get('/:id', getOneAirLine);
router.delete('/:id', deleteAirline);
router.put('/:id', updateAirline);

export default router;
