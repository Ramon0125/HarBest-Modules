import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Alert,Res } from './GlobalComponents';

export const ProtectedRoute = ({ children }) => {
  
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) 
  {    
    Alert('Debe iniciar sesion primero', Res.E, 3000);
    
    return <Navigate to="/" replace />;
  }

  return children;
};
