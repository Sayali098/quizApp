import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [quizzes, setQuizzes] = useState([]);
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role !== "admin") {
        navigate("/dashboard");
      }
    }

    const token = localStorage.getItem("token");

    const fetchDashboardData = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDashboardData(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchQuizzes = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/quizzes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuizzes(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchScores = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/quizzes/scores/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setScores(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDashboardData();
    fetchQuizzes();
    fetchScores();
  }, [navigate]);

  // Logout function
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Delete Quiz
  const handleDeleteQuiz = async (quizId) => {
    const token = localStorage.getItem("token");
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        await axios.delete(`http://localhost:5000/api/quizzes/${quizId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
      } catch (error) {
        console.error("Error deleting quiz:", error);
      }
    }
  };

  // Edit Quiz
  const handleEditQuiz = (quizId) => {
    navigate(`/edit-quiz/${quizId}`);
  };

  return (
    <div className="min-h-screen  bg-gray-100 py-6 px-20">
      <div className="w-full mx-auto bg-white p-8 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
          <button
            onClick={logoutHandler}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Summary Section */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold text-gray-700">Summary</h3>
          <p className="text-gray-600">Total Quizzes: {dashboardData.totalQuizzes}</p>
          <p className="text-gray-600">Total Users: {dashboardData.totalUsers}</p>
          <p className="text-gray-600">Total Attempts: {dashboardData.totalAttempts}</p>
        </div>

        {/* Manage Quizzes Section */}
        <div className="mb-6">
          <h3 className="text-xl  font-semibold text-gray-700 mb-7">Manage Quizzes</h3>
          <Link
            to="/create-quiz"
            className="bg-blue-500 text-white  px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Create New Quiz
          </Link>
          <ul className="mt-8 space-y-2">
            {quizzes.map((quiz) => (
              <li key={quiz._id} className="bg-gray-200 p-3 rounded-lg flex justify-between items-center">
                <span className="text-gray-800 font-medium">{quiz.title}</span>
                <span className="text-sm text-gray-600">Timer: {quiz.timer} sec</span>
                <div className="flex gap-3">
                
                  <button
                    onClick={() => handleEditQuiz(quiz._id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteQuiz(quiz._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* User Scores Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-3">User Scores</h3>
          <ul className="space-y-2">
            {scores.map((score) => (
              <li key={score._id} className="bg-gray-100 p-3 rounded-lg">
                <p>
                  <strong className="text-gray-800">User:</strong> {score.user.name} (<em>{score.user.email}</em>)
                </p>
                <p>
                  <strong className="text-gray-800">Quiz:</strong> {score.quiz.title}
                </p>
                <p>
                  <strong className="text-gray-800">Score:</strong> {score.score} / {score.total}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


