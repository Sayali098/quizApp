import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get("http://localhost:5000/api/quizzes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuizzes(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchQuizzes();

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white p-6 mt-20 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <button
            onClick={logoutHandler}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <h3 className="text-xl font-semibold text-gray-700 mb-3">Available Quizzes</h3>
        {quizzes.length === 0 ? (
          <p className="text-gray-500">No quizzes available.</p>
        ) : (
          <ul className="space-y-2">
            {quizzes.map((quiz) => (
              <li key={quiz._id} className="bg-gray-200 p-3 rounded-lg hover:bg-gray-300 transition">
                <Link to={`/quiz/${quiz._id}`} className="text-blue-600 hover:underline">
                  {quiz.title}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {user && user.role === "admin" && (
          <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold text-gray-700">Admin Panel</h3>
            <div className="mt-2 flex flex-col gap-2">
              <Link
                to="/create-quiz"
                className="bg-blue-500 w-56 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-600 transition"
              >
                Create New Quiz
              </Link>
              <Link
                to="/admin"
                className="bg-green-500 w-56 text-white px-4 py-2 rounded-lg text-center hover:bg-green-600 transition"
              >
                Admin Dashboard
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


