import express from 'express';
import { getAllAirports } from '../controllers/aitportController.js';
import { createAirport,updateAirPort,getOneAirPort,deleteAirPort } from '../controllers/aitportController.js';

const router = express.Router();

router.get('/', getAllAirports);
router.post('/', createAirport);
router.get('/:id', getOneAirPort);
router.delete('/:id', deleteAirPort);
router.put('/:id', updateAirPort);

export default router;
