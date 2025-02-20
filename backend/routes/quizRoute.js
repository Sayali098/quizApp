 import express from 'express';

import { protect } from '../middleware/authMiddleware.js';
import {
  createQuiz,
  getQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  attemptQuiz,
  getUserScore,
  getAllScores,
}  from '../controllers/quizController.js';

const router = express.Router();

// Admin Routes – only admin can create, update, delete
router.post('/', protect, createQuiz);
router.put('/:id', protect, updateQuiz);
router.delete('/:id', protect, deleteQuiz);

// All authenticated users can view quizzes
router.get('/', protect, getQuizzes);
router.get('/:id', protect, getQuizById);

// User attempts quiz and gets score
router.post('/:id/attempt', protect, attemptQuiz);
router.get('/:id/score', protect, getUserScore);

// Admin view all scores
router.get('/scores/all', protect, getAllScores);


export default router;
