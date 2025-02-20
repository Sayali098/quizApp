import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const QuizPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `http://localhost:5000/api/quizzes/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setQuiz(data);
        setAnswers(new Array(data.questions.length).fill(-1));
      } catch (err) {
        setError("Quiz not found");
      }
    };
    fetchQuiz();
  }, [id]);

  const handleOptionChange = (qIndex, optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const submitQuiz = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        `http://localhost:5000/api/quizzes/${id}/attempt`,
        { answers },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setScore(data);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data.message || err.message);
    }
  };

  if (error)
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  if (!quiz)
    return <div className="text-center text-gray-600 mt-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{quiz.title}</h2>

        {submitted ? (
          <div className="text-center">
            <h3 className="text-xl font-semibold text-green-600">
              Your Score: {score.score} / {score.total}
            </h3>
          </div>
        ) : (
          <div className="space-y-6">
            {quiz.questions.map((question, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
              >
                <h4 className="text-lg font-medium text-gray-700">
                  {index + 1}. {question.questionText}
                </h4>
                <div className="mt-2 space-y-2">
                  {question.options.map((option, oIndex) => (
                    <label
                      key={oIndex}
                      className="flex items-center gap-2 p-2 bg-white border rounded-lg shadow-sm cursor-pointer hover:bg-gray-100"
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={oIndex}
                        onChange={() => handleOptionChange(index, oIndex)}
                        checked={answers[index] === oIndex}
                        className="w-4 h-4 text-blue-500 focus:ring-blue-400"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={submitQuiz}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Submit Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;





