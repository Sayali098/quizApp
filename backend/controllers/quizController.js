import Quiz from '../models/Quiz.js';
import Score from '../models/Score.js';

export const createQuiz = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admin can create quiz' });
  }
  const { title, description, timer, questions } = req.body;
  try {
    const quiz = await Quiz.create({ title, description, timer, questions });
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (quiz) {
      res.json(quiz);
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateQuiz = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admin can update quiz' });
  }
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (quiz) {
      quiz.title = req.body.title || quiz.title;
      quiz.description = req.body.description || quiz.description;
      quiz.timer = req.body.timer || quiz.timer;
      quiz.questions = req.body.questions || quiz.questions;
      const updatedQuiz = await quiz.save();
      res.json(updatedQuiz);
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteQuiz = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admin can delete quiz' });
  }
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (quiz) {
      await quiz.remove();
      res.json({ message: 'Quiz removed' });
    } else {
      res.status(404).json({ message: 'Quiz not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const attemptQuiz = async (req, res) => {
  const { answers } = req.body;
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    const existingScore = await Score.findOne({
      user: req.user._id,
      quiz: quiz._id,
    });
    if (existingScore) {
      return res
        .status(400)
        .json({ message: 'You have already attempted this quiz' });
    }
    let scoreCount = 0;
    const total = quiz.questions.length;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.answer) {
        scoreCount++;
      }
    });
    const scoreRecord = await Score.create({
      user: req.user._id,
      quiz: quiz._id,
      score: scoreCount,
      total: total,
    });
    res.json({ score: scoreCount, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserScore = async (req, res) => {
  try {
    const score = await Score.findOne({
      user: req.user._id,
      quiz: req.params.id,
    });
    if (score) {
      res.json(score);
    } else {
      res
        .status(404)
        .json({ message: 'Score not found, quiz not attempted yet' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllScores = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admin can view all scores' });
  }
  try {
    const scores = await Score.find()
      .populate('user', 'name email')
      .populate('quiz', 'title');
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
