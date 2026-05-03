import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, adminOnly }) {
  let savedUser = localStorage.getItem('currentUser');
  
  if (!savedUser) {
    return <Navigate to="/login" replace />;
  }

  let user = JSON.parse(savedUser);

  if (adminOnly === true) {
    if (user.role !== 'admin') {
      return <Navigate to="/not-authorized" replace />;
    }
  }

  return children;
}
