import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

const ProtectedRouteAdmin = ({ element }) => {
  // Replace this with your actual authentication check
  const isAuthenticated = localStorage.getItem('apnavirsatoken') !== null; // Check if JWT token exists

  return isAuthenticated ? (
      <Outlet/>
  ) : (
    <Navigate to="/adminlogin" />
  );
};

export default ProtectedRouteAdmin;


