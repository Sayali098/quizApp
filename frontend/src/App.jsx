import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import QuizPage from "./pages/QuizPage";
import CreateQuiz from "./pages/CreateQuiz";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import EditQuiz from "./pages/EditQuiz";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz/:id"
          element={
            <PrivateRoute>
              <QuizPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/create-quiz"
          element={
            <PrivateRoute>
              <CreateQuiz />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
            <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route path="/edit-quiz/:id" element={<EditQuiz />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
