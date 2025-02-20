import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="h-screen bg-gray-50">
      <nav className="flex justify-between items-center px-6 py-4 bg-gray-500 text-white shadow-md">
        <h1 className="text-2xl font-bold">Quiz App</h1>

        <Link
          to="/login"
          className="px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-gray-200"
        >
          Login
        </Link>
      </nav>

      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to the Quiz App
        </h1>
      </div>
    </div>
  );
};

export default Home;
