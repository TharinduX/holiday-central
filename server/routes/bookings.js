import express from 'express';
import { addBooking } from '../controllers/bookingController.js';
import { getBookings } from '../controllers/bookingController.js';
const router = express.Router();

router.post('/', addBooking);
router.get('/', getBookings);

export default router;
