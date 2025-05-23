import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedUserRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isUserAuthenticated") === "true";

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedUserRoute;


