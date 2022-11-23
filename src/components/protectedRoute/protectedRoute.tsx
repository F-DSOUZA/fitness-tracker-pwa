import React from 'react';
import { Navigate } from 'react-router-dom';
import { Navigation } from '../navigation';
import { useAuthContext } from '../../utils/AuthContext/authContext';

function ProtectedRoute({
  children,
}: {
  token: string;
  children: React.ReactNode;
}) {
  const { token } = useAuthContext();

  if (token) {
    //check if valid token in if statement before i render data otherwise its just checking if a string exists
    //maybe use the loader fn to check
    return <Navigate to="/auth" replace />;
  } else {
    return (
      <>
        <Navigation />
        {children}
      </>
    );
  }
}

export default ProtectedRoute;
