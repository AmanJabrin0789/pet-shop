import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAdminAuthenticated") === "true";

  return isAuthenticated ? children : <Navigate to="/adminlogin" replace />;
};

export default ProtectedAdminRoute;