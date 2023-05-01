import express from 'express';
import { addFlight } from '../controllers/flightController.js';
import { verifyToken } from '../utils/verifyToken.js';
const router = express.Router();

// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//   res.status(200).json({ success: true });
// });

router.post('/', addFlight);

export default router;
