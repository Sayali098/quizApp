import express from 'express';

import { protect }  from '../middleware/authMiddleware.js';
import { getDashboardData } from '../controllers/adminController.js';
const router = express.Router();

router.use(protect);
router.get('/dashboard', getDashboardData);


export default router;
