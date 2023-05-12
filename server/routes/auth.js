import express from 'express';
import { agentRegister, agentLogin } from '../controllers/authController.js';
import { verifyToken, verifyAgent } from '../utils/verifyToken.js';
const router = express.Router();

// router.get('/checkauthetication', verifyToken, (req, res) => {
//   res.send('You are authenticated');
// });

// router.get('/checkagent/:id', verifyAgent, (req, res) => {
//   res.send('You are an agent');
// });

router.post('/register', agentRegister);
router.post('/login', agentLogin);

export default router;
