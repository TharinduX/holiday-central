import express from 'express';
import { addBooking } from '../controllers/bookingController.js';
import { getBookings } from '../controllers/bookingController.js';
import { getSingleBooking } from '../controllers/bookingController.js';
import { verifyToken, verifyAgent } from '../utils/verifyToken.js';
import { deleteBooking } from '../controllers/bookingController.js';
const router = express.Router();

router.post('/', verifyAgent, addBooking);
router.get('/', verifyAgent, getBookings);
router.delete('/:id', verifyAgent, deleteBooking);
router.get('/:id', verifyAgent, getSingleBooking);

export default router;
