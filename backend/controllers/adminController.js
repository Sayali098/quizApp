import Quiz from '../models/Quiz.js';
import User from '../models/User.js';
import Score from '../models/Score.js';

export const getDashboardData = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: admin only' });
  }
  try {
    const totalQuizzes = await Quiz.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalAttempts = await Score.countDocuments();
    res.json({ totalQuizzes, totalUsers, totalAttempts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
