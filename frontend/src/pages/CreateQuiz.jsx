import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [timer, setTimer] = useState(60);
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState(0);
  const navigate = useNavigate();

  const addQuestion = () => {
    const newQuestion = { questionText, options, answer };
    setQuestions([...questions, newQuestion]);
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setAnswer(0);
  };

  const submitQuiz = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/quizzes",
        { title, description, timer, questions },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("quiz created successfully")
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Quiz</h2>
        <form onSubmit={submitQuiz} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Timer (seconds)"
            value={timer}
            onChange={(e) => setTimer(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          />

          {/* Add Questions */}
          <div className=" p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Add Question</h3>
            <input
              type="text"
              placeholder="Question Text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 mb-2"
            />
            {options.map((opt, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index] = e.target.value;
                    setOptions(newOptions);
                  }}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}
            <div>
              <label className="text-gray-700 font-medium">Correct Answer Index (0-3): </label>
              <input
                type="number"
                value={answer}
                onChange={(e) => setAnswer(parseInt(e.target.value))}
                required
                min="0"
                max="3"
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="button"
              onClick={addQuestion}
              className="mt-3 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Add Question
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Create Quiz
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuiz;



