import express from 'express';
import { verifyToken, verifyAgent } from '../utils/verifyToken.js';
import {
  addFlight,
  getFlights,
  getFlight,
  searchFlights,
  deleteFlight,
  updateFlight,
} from '../controllers/flightController.js';
const router = express.Router();

// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//   res.status(200).json({ success: true });
// });

router.post('/', addFlight);
router.get('/', verifyAgent, getFlights);
router.get('/search', verifyAgent, searchFlights);
router.get('/find/:id', getFlight);
router.delete('/:id', deleteFlight);
router.put('/:id', updateFlight);

export default router;
