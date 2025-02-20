import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');

  if (!token || !storedUser) {
    return <Navigate to="/login" />;
  }

  const user = JSON.parse(storedUser);
  return user.role === 'admin' ? children : <Navigate to="/dashboard" />;
};

export default AdminRoute;
