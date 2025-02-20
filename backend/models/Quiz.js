import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: Number, required: true }, // index of correct answer
});

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    timer: { type: Number, required: true }, // in seconds
    questions: [questionSchema],
  },
  { timestamps: true }
);

const Quiz= mongoose.model('Quiz', quizSchema);

export default Quiz;